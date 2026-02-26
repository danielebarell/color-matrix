import type { DataImage, VectorImage } from "../../../data/data-images";
import type { PicturePointerEvent } from "../ImageSlider";
import SVGWrapper from "../SVGWrapper";
export type ImageItemProps = {
  dataImage: DataImage;
  filterId: string;
  onPicturePointerDown: (event: PicturePointerEvent) => void;
  onPicturePointerUp: (event: PicturePointerEvent) => void;
};
import styles from "../preview.module.css";

export default function ImageItem({
  dataImage,
  filterId,
  onPicturePointerDown,
  onPicturePointerUp,
}: ImageItemProps) {
  const { type } = dataImage;
  if (type === "vector") {
    const vectorImage: VectorImage = dataImage;
    return (
      <SVGWrapper
        filterId={filterId}
        viewBox="0 0 256 256"
        className={styles["preview-item"]}
        data-image-id={vectorImage.id}
        onPointerDown={onPicturePointerDown}
        onPointerUp={onPicturePointerUp}
      >
        <img
          className={styles["picture-item"]}
          alt={vectorImage.id}
          src={vectorImage.svgImage}
        />
      </SVGWrapper>
    );
  }
  return (
    <SVGWrapper
      filterId={filterId}
      viewBox="0 0 128 128"
      className={styles["preview-item"]}
      data-image-id={dataImage.id}
      onPointerDown={onPicturePointerDown}
      onPointerUp={onPicturePointerUp}
    >
      <picture style={{ width: "100%", height: "100%", display: "block" }}>
        <source
          srcSet={`${dataImage.x1.avif} 1x, ${dataImage.x2.avif} 2x`}
          type="image/avif"
        />
        <source
          srcSet={`${dataImage.x1.webp} 1x, ${dataImage.x2.webp} 2x`}
          type="image/webp"
        />
        <img
          className={styles["picture-item"]}
          alt={dataImage.id}
          src={dataImage.fallback}
        />
      </picture>
    </SVGWrapper>
  );
}
