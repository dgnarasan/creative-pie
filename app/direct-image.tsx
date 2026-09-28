import type { CSSProperties } from "react";
import { ResponsiveImage } from "./responsive-image";

type DirectImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
};

export function DirectImage({ src, alt, priority = false, className = "", style }: DirectImageProps) {
  return (
    // Sites serves these static assets directly; bypassing an image proxy avoids the prior blank-media failure.
    // eslint-disable-next-line @next/next/no-img-element
    <ResponsiveImage
      className={`fill-media${className ? ` ${className}` : ""}`}
      src={src}
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      style={style}
    />
  );
}
