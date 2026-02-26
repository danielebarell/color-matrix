import { getStyleDimension, type DataImage } from "../../../data/data-images";
import { useRef, useState } from "react";
import SVGWrapper from "../SVGWrapper";
import useImageDraggable from "../../../hooks/useImageDraggable";
import PanelImage from "./PanelImage";
import styles from "./image-panel.module.css";

type ImagePanelProps = {
  onExit: () => void;
  dataImage: DataImage;
  filterId: string;
};

export default function ImagePanel({
  onExit,
  dataImage,
  filterId,
}: ImagePanelProps) {
  const boundsRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  // Initialize draggable behavior
  useImageDraggable(containerRef, boundsRef);
  //init filter
  const [currentFilter, setCurrentFilter] = useState(filterId);
  function toggleFilter() {
    setCurrentFilter((prev) => (prev ? "" : filterId));
  }
  return (
    <div className={styles["image-modal"]}>
      <nav className={styles["image-nav"]}>
        <button onClick={onExit}>&times;</button>
        <button onClick={toggleFilter}>Toggle filter</button>
      </nav>
      <div ref={boundsRef} className={styles["image-bounds"]}>
        <div ref={containerRef} style={getStyleDimension(dataImage)}>
          <SVGWrapper
            filterId={currentFilter}
            width="100%"
            height={dataImage.dimension.height}
          >
            <PanelImage dataImage={dataImage} />
          </SVGWrapper>
        </div>
      </div>
    </div>
  );
}
