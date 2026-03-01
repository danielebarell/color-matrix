import { useCallback, useRef, useState } from "react";
import images, {
  getDataImagebyId,
  type DataImage,
} from "../../data/data-images";
import ImagePanel from "./panel/ImagePanel";
import ImageItem from "./image-item/ImageItem";
import { Draggable } from "gsap/all";
import InertiaPlugin from "gsap/InertiaPlugin";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { createPortal } from "react-dom";
import {
  PIXEL_THRESHOLD,
  DRAG_RESISTENCE,
  EDGE_RESISTENCE,
} from "../../constants";
import styles from "./preview.module.css";
import useColorMatrixSelector from "../../hooks/useColormatrixSelector";

gsap.registerPlugin(Draggable, InertiaPlugin);

export type PicturePointerEvent = React.PointerEvent<HTMLElement | SVGElement>;
//
function ImageSlider() {
  /**
   * matrix value as string beacause SVG feColorMatrix wants a string attribute
   */
  const matrixValue = useColorMatrixSelector(
    (state) => state.colorMatrix.matrix,
  ).reduce((previous, current) => previous + " " + current, "");
  /**
   * Holds the selected image for the panel.
   * If null → panel is closed.
   */
  const [panelSelectedImage, setPanelSelectedImage] =
    useState<DataImage | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);
  useGSAP(
    () => {
      if (!container.current || !wrapper.current) return;
      // ⚠️ TEMP: attivo su desktop per sviluppo.
      // In produzione usare "(max-width: 1023px)"
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        const draggable = Draggable.create(container.current, {
          type: "x",
          inertia: true,
          dragResistance: DRAG_RESISTENCE,
          edgeResistance: EDGE_RESISTENCE,
          minimumMovement: PIXEL_THRESHOLD,
          bounds: {
            minX: wrapper.current!.offsetWidth - container.current!.scrollWidth,
            maxX: 0,
          },
          onClick(event) {
            const target = event.target as
              | HTMLImageElement
              | HTMLPictureElement;
            if (!target.dataset.imageId) return;
            const { imageId } = target.dataset;
            onItemSelect(imageId);
          },
        })[0];
        // Cleanup draggable instance
        return () => draggable.kill();
      });
      // Cleanup media
      return () => mm.revert();
    },
    { scope: wrapper },
  );
  /** --- Gestione apertura pannello -- */
  const onItemSelect = useCallback((imageId: string) => {
    const dataImage = getDataImagebyId(imageId);
    if (!dataImage) return;
    setPanelSelectedImage(dataImage);
  }, []);
  /**
   * Close panel handler
   */
  const handleClosePanel = useCallback(() => {
    setPanelSelectedImage(null);
  }, []);
  //
  return (
    <>
      <svg
        id="filter"
        width="0"
        height="0"
        className={styles.svgfilter}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="myFilter">
            <feColorMatrix values={matrixValue} />
          </filter>
        </defs>
      </svg>
      <section>
        <div className={styles["preview-wrapper"]} ref={wrapper}>
          <div
            className={styles["preview-container"]}
            style={{
              filter: "url(#myFilter)",
              WebkitFilter: "url(#myFilter)",
            }}
            ref={container}
          >
            {images.map((value) => (
              <ImageItem key={value.id} dataImage={value} />
            ))}
          </div>
        </div>
      </section>
      {panelSelectedImage &&
        createPortal(
          <ImagePanel
            filterId="myFilter"
            dataImage={panelSelectedImage}
            onExit={handleClosePanel}
          />,
          document.body,
        )}
    </>
  );
}

export default ImageSlider;
