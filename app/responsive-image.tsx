import type { ImgHTMLAttributes } from "react";
import media from "./responsive-media.json";

export const transparentImage = "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=";
export const campaignImageSizes = "(max-width: 600px) 40vw, (max-width: 900px) 30vw, 360px";
export const heroImageSizes = "(max-width: 600px) 150px, 360px";

export function imageDetails(src: string) {
  return (media as Record<string, { width: number; height: number; srcSet: string }>)[src];
}

type Props = ImgHTMLAttributes<HTMLImageElement> & { src: string; alt: string; hiddenMedia?: string };

export function ResponsiveImage({ src, alt, sizes = "(max-width: 900px) 100vw, 60vw", hiddenMedia, loading = "lazy", fetchPriority = "auto", ...props }: Props) {
  const asset = imageDetails(src);
  const img = <img {...props} src={src} srcSet={asset?.srcSet} sizes={asset ? sizes : undefined} width={props.width ?? asset?.width} height={props.height ?? asset?.height} alt={alt} loading={loading} fetchPriority={fetchPriority} decoding="async" />;
  // A CSS-hidden eager img still downloads. The nonmatching layout gets a tiny
  // inline source instead; the visible layout is selectable before hydration.
  return hiddenMedia ? <picture style={{ display: "contents" }}><source media={hiddenMedia} srcSet={transparentImage} />{img}</picture> : img;
}
