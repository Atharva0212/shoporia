import { PageNotFound } from '../../Components/PageNotFound';
import { ProductDetailsContent } from './Components/ProductDetailsContent';

export default async function Page({params}:{params:Promise<{slug:string|undefined}>}) {
  const {slug}=await params;
  
  if(!slug){
    return(
      <PageNotFound/>
    )
  }
  return (
    <ProductDetailsContent slug={slug}/>
  )
}
