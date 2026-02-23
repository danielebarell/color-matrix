import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/all";
import InertiaPlugin from "gsap/InertiaPlugin";
gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin);

export default function useImageDraggable(
  target: React.RefObject<HTMLDivElement | null>,
  wrapper: React.RefObject<HTMLDivElement | null>,
) {
  useGSAP(
    () => {
      if (!(target.current && wrapper.current)) return;
      //create Draggable
      const draggableInstance = Draggable.create(target.current, {
        type: "x,y",
        inertia: true,
        bounds: wrapper.current,
      });
      //exit Draggable instance -> avoid memory leaks
      return () => draggableInstance.forEach((d) => d.kill());
    },
    { scope: target },
  );
}
