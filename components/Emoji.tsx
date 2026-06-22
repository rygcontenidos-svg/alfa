const TWEMOJI_CDN =
  "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

export default function Emoji({
  emoji,
  className = "",
}: {
  emoji: string;
  className?: string;
}) {
  const codepoints = [...emoji]
    .map((c) => c.codePointAt(0)!.toString(16))
    .join("-");
  return (
    <img
      src={`${TWEMOJI_CDN}/${codepoints}.svg`}
      alt={emoji}
      className={`inline-block ${className}`}
      draggable={false}
    />
  );
}
