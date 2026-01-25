import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductDetails } from "../products/[slug]/types";
import { DataApiResponse } from "@/src/Types/response";

export const productApi =createApi({
    reducerPath:"productsApi",
    baseQuery:fetchBaseQuery({
        baseUrl:'/api/products',
        credentials:"include"
    }),
    endpoints:(builder)=>({
        getProductBySlug:builder.query<ProductDetails,string,DataApiResponse<ProductDetails>>({
            query(slug) {
                return `/${slug}`;
            },
           transformResponse(baseQueryReturnValue) {
              if(!baseQueryReturnValue.success){
                throw new Error(baseQueryReturnValue.error)
              };
              return baseQueryReturnValue.responseData;
           },
        }),
        updateReviewById:builder.mutation<ProductDetails["reviewData"]["data"][number],ProductDetails["reviewData"]["data"][number]&{productId:string},undefined>({
            query({productId,...body}){
                return{
                    url:`/review/updateKaro/${productId}`,
                    method:"POST",
                    body,
                }
            },
            async onQueryStarted({productId,...patch}, {dispatch,queryFulfilled}) {
                const patchRequest=dispatch(productApi.util.updateQueryData("getProductBySlug",productId,(draft)=>{
                    const r=draft.reviewData.data.push(patch)
                }))
                try{
                    await queryFulfilled;
                }catch{
                    patchRequest.undo()
                }
            },
        })
    })
})

export const {useGetProductBySlugQuery}=productApi;