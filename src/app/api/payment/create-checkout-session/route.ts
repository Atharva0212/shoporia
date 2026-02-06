import { getConnectionModel } from "@/src/lib/db/connection";
import { DataApiResponse } from "@/src/Types/response";
import { parseNumber } from "@/src/utils/parseNumber";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

type CheckoutSessionData = { checkoutUrl: string };

export type CreateCheckoutSessionResponse = DataApiResponse<CheckoutSessionData>

export async function POST(req: NextRequest): Promise<NextResponse<CreateCheckoutSessionResponse>> {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

        const { productId, sku, quantity,pathName }: { productId?: string, sku?: string, quantity?: number,pathName?:string } = await req.json();
        if (!productId || !sku) {
            return NextResponse.json({ success: false, error: "Required fields not found" }, { status: 400 });
        }

        const Product = await getConnectionModel("Product");
        const productRecord = await Product.findById(productId);
        if (!productRecord) {
            return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
        }
        const { variants, name, thumbnail } = productRecord;
        const selectedVariant = variants.find(variant => variant.sku === sku);
        if (!selectedVariant) {
            return NextResponse.json({ success: false, error: "Product variant not found" }, { status: 404 });
        }

        const baseUrl =await getBaseUrl();

        const redirectUrl = `${baseUrl}${pathName??""}`
        console.log(redirectUrl);
        
        const { price } = selectedVariant;

        const session = await stripe.checkout.sessions.create({
            mode: "payment",
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name,
                            images: [thumbnail],
                        },
                        unit_amount: price * 100, // ₹ -> paise
                    },
                    quantity: parseNumber(quantity, 1),
                },
            ],
            success_url: redirectUrl,
            cancel_url: redirectUrl,
        });
        const checkoutUrl = session.url;
        if (!checkoutUrl) {
            return NextResponse.json({ success: false, error: "Payment failed. Please try again." }, { status: 500 });
        }
        return NextResponse.json({ success: true, responseData: { checkoutUrl } }, { status: 200 });
    } catch {
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}

async function getBaseUrl() {
    const h = await headers();
    const protocol = h.get("x-forwarded-proto") ?? "http";
    const host = h.get("x-forwarded-host") ?? h.get("host");
    return `${protocol}://${host}`;;
}