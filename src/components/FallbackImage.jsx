import React from "react";

export default function FallbackImage({ src, alt, ...props }) {
  return (
    <img
      src={src || "/fallback-recipe.jpg"}
      alt={alt}
      onError={e => { e.target.src = "/fallback-recipe.jpg"; }}
      {...props}
    />
  );
} 