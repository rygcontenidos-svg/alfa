"use client";

import { useState } from "react";

const TWEMOJI = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg";

function toCodepoint(emoji: string): string {
  return [...emoji].map((c) => c.codePointAt(0)!.toString(16)).join("-");
}

export default function Emoji({
  emoji,
  className = "",
}: {
  emoji: string;
  className?: string;
}) {
  const [fallo, setFallo] = useState(false);
  const src = `${TWEMOJI}/${toCodepoint(emoji)}.svg`;

  if (fallo) {
    return (
      <span className={`inline-flex items-center justify-center ${className}`} role="img">
        {emoji}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt={emoji}
      className={`inline-block ${className}`}
      draggable={false}
      onError={() => setFallo(true)}
    />
  );
}
