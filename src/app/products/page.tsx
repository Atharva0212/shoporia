import { Footer } from '../Components/Footer';
import { ProductListingClientBoundary } from './ProductListing/ProductListingClientBoundary';

export default function Page() {
    const updatedAtCursor=new Date().getTime();
  return (
    <>
    <ProductListingClientBoundary updatedAtCursor={updatedAtCursor}/>
    <Footer />
    </>
  )
}
