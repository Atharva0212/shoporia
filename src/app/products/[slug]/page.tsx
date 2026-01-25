import { cookies } from 'next/headers';
import { PageNotFound } from '../../Components/PageNotFound';
import { ProductContent } from './Components/ProductContent'
import { AUTH_TOKEN_COOKIE } from '../../api/auth/Constants/auth';
import { fetchProductDetails } from './lib/fetchProductDetails';
import { verifyUserToken } from '@/src/utils/jwt';

export default async function Page({params}:{params:Promise<{slug:string|undefined}>}) {
  const {slug}=await params;
  
  if(!slug){
    return(
      <PageNotFound/>
    )
  }
  return (
    <ProductContent slug={slug}/>
  )
}
