import { Layout } from "../Layout";
import { SectionHeading } from "../SectionHeading";
import { FeaturedProductsList } from "./FeaturedProductsList";

export function FeaturedProducts() {
  return (
    <Layout className="max-w-5xl mx-auto" backgroundColor="surface">
      <FeaturedProductsHeading />
      <FeaturedProductsList />
    </Layout>
  );
}

function FeaturedProductsHeading() {
  return (
    <SectionHeading>
      <SectionHeading.Title textAlign="left">
        Featured Products
      </SectionHeading.Title>
      <SectionHeading.SubTitle textAlign="left">
        Discover our handpicked selection
      </SectionHeading.SubTitle>
    </SectionHeading>
  );
}
