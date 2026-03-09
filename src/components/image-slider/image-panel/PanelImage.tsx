import type { DataImage } from "../../../data/data-images";

type PanelImageProps = { dataImage: DataImage };

export default function PanelImage({ dataImage }: PanelImageProps) {
  if (dataImage.type === "raster")
    return (
      <picture>
        <source
          srcSet={`${dataImage.x1.avif} 1x, ${dataImage.x2.avif} 2x`}
          type="image/avif"
        />
        <source
          srcSet={`${dataImage.x1.webp} 1x, ${dataImage.x2.webp} 2x`}
          type="image/webp"
        />
        <img
          className="panel-image"
          alt="tulipani"
          src={dataImage.fallback}
          style={{ minWidth: "1024px" }}
        />
      </picture>
    );
  return (
    <img alt={dataImage.id} src={dataImage.svgImage} className="panel-image" />
  );
}
