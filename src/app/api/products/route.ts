import { getConnectionModel } from "@/src/lib/db/connection";
import { DataApiResponse } from "@/src/Types/response";
import { parseNumber } from "@/src/utils/parseNumber";
import { NextRequest, NextResponse } from "next/server";
import { CategoryItem, categoryOptions } from "../../Constants/categories";
import { toMongoObjectId } from "@/src/utils/objectId";
import { PaginatedProductCards, ProductCard, RawProductCard } from "../../products/ProductListing/types";

export async function GET(req: NextRequest): Promise<NextResponse<DataApiResponse<PaginatedProductCards>>> {
    try {

        const { searchParams } = new URL(req.url);
        const updatedAtStr = searchParams.get("updatedAt");

        const updatedAtTimestamp = parseNumber(updatedAtStr, null);

        const updatedAt = updatedAtTimestamp
            ? new Date(updatedAtTimestamp)
            : new Date();


        const id = searchParams.get("id");
        const categoryParam = searchParams.get("category");
        const rawCategories = categoryParam ? categoryParam.split(",") : [];
        const validCategories = rawCategories.length > 0 ? getValidCategories(rawCategories) : null;
        const query = searchParams.get("query");
        const maxPrice = parseNumber(searchParams.get("maxPrice"), null);
        const priceRange = maxPrice ? { minPrice: 0, maxPrice } : undefined
        const productCards = await fetchProductCards({ cursor: { updatedAt, id }, category: validCategories, priceRange, query })
        return NextResponse.json({ success: true, responseData: productCards }, { status: 200 });
    } catch(e) {
        console.error(e);
        
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

function getValidCategories(categoryParams: string[]): CategoryItem["value"][] | null {
    const valid = categoryParams.reduce<CategoryItem["value"][]>((acc, curr) => {
        if (categoryOptions.some(option => option.value === curr)) {
            acc.push(curr as CategoryItem["value"])
        }
        return acc
    }, [])
    return valid.length > 0 ? valid : null
}

async function fetchProductCards({ cursor, category, priceRange, query }: { cursor: { updatedAt: Date, id: string | null }, category: CategoryItem["value"][] | null, priceRange?: { minPrice: number, maxPrice: number }, query: string | null }): Promise<PaginatedProductCards> {
    
    const LIMIT = 10;
    const { updatedAt, id } = cursor;
    const filter = {
        updatedAt: { $lt: updatedAt },
        ...(id ? { _id: { $lt: toMongoObjectId(id) } } : {}),
        ...(category ? { category: { $in: category } } : {}),
        ...(priceRange
            ? {
                minPrice: { $lte: priceRange.maxPrice },
                maxPrice: { $gte: priceRange.minPrice },
            }
            : {}),
        ...(query ? { $text: { $search: query } } : {}),
    };
    
    const Product = await getConnectionModel("Product");
    const productRecords = await Product.aggregate<RawProductCard>([
        {
            $match: filter,
        },
        {
            $sort: { updatedAt: -1, _id: -1 },
        },
        {
            $limit: LIMIT,
        },
        {
            $sort: { averageRating: -1, reviewCount: -1, viewCount: -1 },
        },
        {
            $project: {
                _id: 1,
                slug:1,
                name: 1,
                variants: 1,
                minPrice: 1,
                maxPrice: 1,
                images: 1,
                category: 1,
                brand: 1,
                badge: 1,
                averageRating: 1,
                reviewCount: 1,
                updatedAt: 1,
            }
        }
    ]);
    
    return buildProductCards(productRecords, LIMIT);
}

function buildProductCards(productRecords: RawProductCard[], LIMIT: number): PaginatedProductCards {
    if (productRecords.length === 0) {
        return {
            data: [],
            paginationState: {
                hasMore: false,
            }
        }
    }

    const lastProduct = productRecords[productRecords.length - 1];

    const productCards: ProductCard[] = productRecords.map(product => {
        const {
            _id,
            slug,
            name,
            variants,
            minPrice,
            maxPrice,
            images,
            category,
            brand,
            badge,
            averageRating,
            reviewCount
        } = product;
        return {
            productId: _id.toString(),
            slug,
            name,
            variants: variants.map(variant => ({
                price: variant.price,
                originalPrice: variant.originalPrice,
                sku:variant.sku,
                isPrimary: variant.isPrimary,
                attributes:variant.attributes,
                stock:variant.stock,
            })),
            minPrice,
            maxPrice,
            image: images.filter(image => image.isPrimary)[0].url,
            category,
            brand,
            badge,
            averageRating,
            reviews: reviewCount,
        }
    })
    
    return {
        data: productCards,
        paginationState: {
            cursor: {
                updatedAt: lastProduct.updatedAt.getTime(),
                id: lastProduct._id.toString(),
            },
            hasMore: productCards.length === LIMIT
        }
    }
}



