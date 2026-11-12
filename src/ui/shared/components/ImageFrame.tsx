import type { ImageSource } from "@/lib/images/getImage";

interface ImageFrameProps {
  image: ImageSource;
  decorative?: boolean;
  priority?: boolean;
}

export function ImageFrame({ image, decorative = false, priority = false }: ImageFrameProps) {
  return (
    <>
      <div
        className="media-image-bg"
        style={{ backgroundImage: `url("${image.src}")` }}
        aria-hidden="true"
      />
      <img
        src={image.src}
        alt={decorative ? "" : image.alt}
        aria-hidden={decorative || undefined}
        className="media-image-fg"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
      />
    </>
  );
}
