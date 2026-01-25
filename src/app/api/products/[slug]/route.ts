import { ProductDetails } from "@/src/app/products/[slug]/types";
import { DataApiResponse } from "@/src/Types/response";
import { NextRequest, NextResponse } from "next/server";
import { AUTH_TOKEN_COOKIE } from "../../auth/Constants/auth";
import { verifyUserToken } from "@/src/utils/jwt";
import { fetchProductDetails } from "@/src/app/products/[slug]/lib/fetchProductDetails";

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }): Promise<NextResponse<DataApiResponse<ProductDetails>>> {
    try {
        const { slug } = await params;
        const token = req.cookies.get(AUTH_TOKEN_COOKIE)?.value;
        let loggedInUserId;
        if (token) {
            const tokenResult = verifyUserToken(token);
            if (tokenResult.success) {
                loggedInUserId = tokenResult.userId;
            }
        }
        const productDetails = await fetchProductDetails({ slug, userId: loggedInUserId });
        
        if (!productDetails.success) {
            const { error, status } = productDetails;
            return NextResponse.json({ success: false, error }, { status });
        };
        
        return NextResponse.json({success:true,responseData:productDetails.data})

    } catch {
        return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 });
    }
}