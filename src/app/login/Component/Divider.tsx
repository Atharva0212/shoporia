export function Divider() {
  return (
    <div className="flex items-center gap-4 my-6">
      <DividerLine />
      <div>OR</div>
      <DividerLine />
    </div>
  );
}

function DividerLine() {
  return <div className="flex-1 border-t border-divider-400"></div>;
}
