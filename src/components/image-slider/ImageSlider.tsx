import "./image-slider.css";
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

gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

export type PicturePointerEvent = React.PointerEvent<HTMLElement | SVGElement>;
/**
 * Minimum pixel movement to distinguish drag from click
 */
const PIXEL_THRESHOLD = 6;

function ImageSlider() {
  /**
   * hack for Safari and Firefox incorrect behaviour
   */
  const ua = navigator.userAgent;
  const isFirefox = ua.includes("Firefox");
  const isSafari =
    ua.includes("Safari") && !ua.includes("Android") && !ua.includes("Chrome");
  /**
   * Holds the selected image for the panel.
   * If null → panel is closed.
   */
  const [panelSelectedImage, setPanelSelectedImage] =
    useState<DataImage | null>(null);
  const container = useRef<HTMLDivElement | null>(null);
  const wrapper = useRef<HTMLDivElement | null>(null);
  /**
   * Stores initial pointer X position
   * (useRef avoids unnecessary re-renders)
   */
  const startX = useRef(0);
  useGSAP(
    () => {
      //check sulla presenza di container current
      if (!container.current || !wrapper.current) return;
      if (isSafari || isFirefox) {
        console.log("SCROLL");
        wrapper.current.classList.add("native-scroll");
        return;
      }
      // ⚠️ TEMP: attivo su desktop per sviluppo.
      // In produzione usare "(max-width: 1023px)"
      let mm = gsap.matchMedia();
      mm.add("(min-width: 1024px)", () => {
        console.log("DRAGGABLE");
        const draggable = Draggable.create(container.current, {
          type: "x",
          inertia: true,
          lockAxis: true,
          allowNativeTouchScrolling: false,
          dragResistance: 0.1,
          minimumMovement: PIXEL_THRESHOLD,
          bounds: wrapper.current,
        })[0];
        // Cleanup draggable instance
        return () => draggable.kill();
      });
      // Cleanup media
      return () => mm.revert();
    },
    { scope: container },
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
  /**
   * Pointer Down → store initial X
   */
  const handlePicturePointerDown = useCallback((event: PicturePointerEvent) => {
    startX.current = event.clientX;
  }, []);
  /**
   * Pointer Up → detect if it's a click or drag
   */
  const handlePicturePointerUp = useCallback(
    (event: PicturePointerEvent) => {
      const deltaX = Math.abs(event.clientX - startX.current);
      if (deltaX > PIXEL_THRESHOLD) return;
      const target = event.target as HTMLElement | SVGElement;
      const svgItem = target.closest<SVGElement>("[data-image-id]");
      if (!svgItem?.dataset.imageId) return;
      const { imageId } = svgItem.dataset;
      onItemSelect(imageId);
    },
    [onItemSelect],
  );
  //
  return (
    <>
      <svg id="filter" width="0" height="0" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="myFilter">
            <feColorMatrix
              values="
                                    1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 1
                                    0 0 0 1 0"
            />
          </filter>
        </defs>
      </svg>
      <section>
        <div className="preview-wrapper" ref={wrapper}>
          <div className="preview-container" ref={container}>
            {images.map((value) => (
              <ImageItem
                key={value.id}
                filterId="myFilter"
                dataImage={value}
                onPicturePointerDown={handlePicturePointerDown}
                onPicturePointerUp={handlePicturePointerUp}
              />
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
