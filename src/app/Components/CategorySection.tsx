import { CategoryList } from "./CategoryList";
import { Layout } from "./Layout";
import { SectionHeading } from "./SectionHeading";

export function CategorySection() {
  return (
      <Layout backgroundColor="surface">
      <SectionHeading>
        <SectionHeading.Title>Shop by Category</SectionHeading.Title>
        <SectionHeading.SubTitle>
          Explore our curated collections
        </SectionHeading.SubTitle>
      </SectionHeading>
      <CategoryList />
      </Layout>
  );
}

