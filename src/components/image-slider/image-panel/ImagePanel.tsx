import { getImageDimension, type DataImage } from "../../../data/data-images";
import { useRef, useState } from "react";
import useImageDraggable from "../../../hooks/useImageDraggable";
import PanelImage from "./PanelImage";
import styles from "./image-panel.module.css";
import Switcher from "../../switcher/Switcher";
import useNarrowMediaQuery from "../../../hooks/useNarrowMediaQuery";
import { LAYOUT_BREAKPOINT } from "../../../constants";

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
  const isNarrow = useNarrowMediaQuery(LAYOUT_BREAKPOINT);
  const styleDimensions = getImageDimension(dataImage.dimension, {
    width: isNarrow ? 320 : 720,
    height: window.innerHeight,
  });
  return (
    <div className={styles["image-modal"]}>
      <nav className={styles["image-nav"]}>
        <button onClick={onExit} className="btn-exit">
          &times;
        </button>
        <Switcher label="Filter" toggleFilter={toggleFilter} />
      </nav>
      <div ref={boundsRef} className={styles["image-bounds"]}>
        <div
          ref={containerRef}
          style={{
            WebkitFilter: `url(#${currentFilter})`,
            filter: `url(#${currentFilter})`,
            ...styleDimensions,
          }}
        >
          <PanelImage dataImage={dataImage} imageDimension={styleDimensions} />
        </div>
      </div>
    </div>
  );
}
