import type { DataImage, VectorImage } from "../../../data/data-images";
export type ImageItemProps = {
  dataImage: DataImage;
};
import styles from "../preview.module.css";

export default function ImageItem({ dataImage }: ImageItemProps) {
  const { type } = dataImage;
  if (type === "vector") {
    const vectorImage: VectorImage = dataImage;
    return (
      <img
        data-image-id={dataImage.id}
        className={styles["vector-item"]}
        alt={vectorImage.id}
        src={vectorImage.svgImage}
      />
    );
  }
  return (
    <picture className={styles["picture-item"]}>
      <source
        srcSet={`${dataImage.x1.avif} 1x, ${dataImage.x2.avif} 2x`}
        type="image/avif"
      />
      <source
        srcSet={`${dataImage.x1.webp} 1x, ${dataImage.x2.webp} 2x`}
        type="image/webp"
      />
      <img
        alt={dataImage.id}
        src={dataImage.fallback}
        data-image-id={dataImage.id}
      />
    </picture>
  );
}
