import { Footer } from '../Components/Footer';
import { Navbar } from '../Components/Navbar/Navbar';
import { ProductListingClientBoundary } from './ProductListing/ProductListingClientBoundary';

export default function Page() {
    const updatedAtCursor=new Date().getTime();
  return (
    <>
    <Navbar/>
    <ProductListingClientBoundary updatedAtCursor={updatedAtCursor}/>
    <Footer />
    </>
  )
}
