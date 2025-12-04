import Image from "next/image";
import { categories } from "../Constants/categories";
import Link from "next/link";
import { SectionHeading } from "./SectionHeading";
import { Layout } from "./Layout";

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

function CategoryList() {
  const categoryKeys = Object.keys(categories) as Array<
    keyof typeof categories
  >;
  return (
    <div className="@container">
      <div className="grid gap-4 grid-cols-2 @min-xs:grid-cols-3 @min-xl:grid-cols-6">
        {categoryKeys.map((key, index) => (
          <CategoryPill key={index} categoryKey={key} />
        ))}
      </div>
    </div>
  );
}
function CategoryPill({
  categoryKey,
}: {
  categoryKey: keyof typeof categories;
}) {
  const category = categories[categoryKey];

  return (
    <Link
      className="bg-inverse flex flex-col items-center justify-center gap-2 rounded-2xl py-2 hover:scale-105 transition-transform duration-300 ease-in-out"
      href={"#"}
    >
      <div className="w-6 h-6 @min-xl:w-8 @min-xl:h-8">
        <Image
          src={category["image"]}
          alt={category["name"]}
          width={24}
          height={24}
          className="w-full h-full"
        />
      </div>
      <p className="text-body  text-center text-text-100">{category["name"]}</p>
    </Link>
  );
}
