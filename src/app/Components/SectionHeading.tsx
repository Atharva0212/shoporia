import { PropsWithChildren } from "react";

function SectionHeadingContainer({ children }: PropsWithChildren) {
  return <div>{children}</div>;
}

type TitleProps = {
  children: React.ReactNode;
  textAlign?: "center" | "left" | "right";
};

function Title({ children, textAlign = "center" }: TitleProps) {
  return (
    <h2 className={`text-h4 text-${textAlign} mb-2 font-bold`}>{children}</h2>
  );
}

type SubTitleProps = {
  children: React.ReactNode;
  textAlign?: "center" | "left" | "right";
};

function SubTitle({ children, textAlign = "center" }: SubTitleProps) {
  return (
    <p className={`text-body text-${textAlign} mb-4 text-text-500`}>
      {children}
    </p>
  );
}

type SectionHeadingType = typeof SectionHeadingContainer & {
  Title: typeof Title;
  SubTitle: typeof SubTitle;
};

const SectionHeading = SectionHeadingContainer as SectionHeadingType;
SectionHeading.Title = Title;
SectionHeading.SubTitle = SubTitle;

export { SectionHeading };
