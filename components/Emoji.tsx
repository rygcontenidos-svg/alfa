export default function Emoji({
  emoji,
  className = "",
}: {
  emoji: string;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center justify-center text-3xl ${className}`}
      role="img"
      aria-hidden="true"
    >
      {emoji}
    </span>
  );
}
