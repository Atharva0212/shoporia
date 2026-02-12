export function Avatar({
  initial,
  avatarBg,
}: {
  initial: string;
  avatarBg: string;
}) {
  return (
    <div
      className="w-12 h-12 rounded-full flex items-center justify-center"
      style={{ backgroundColor: `${avatarBg}66` }}
    >
      {initial.toUpperCase()}
    </div>
  );
}

