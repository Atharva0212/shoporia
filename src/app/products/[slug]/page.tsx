import { PageNotFound } from '../../Components/PageNotFound';
import { ProductContent } from './Components/ProductContent';

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
