import { useEffect, useState } from "react";
/**
 *
 * @param layoutWidth breakpoint width under witch the sreen is narrow
 * @returns a boolean wheather the screen is narrow
 */
export default function useNarrowMediaQuery(layoutWidth: number) {
  const narrowQuery = window.matchMedia(`(width < ${layoutWidth}px)`);
  const [isNarrow, setIsNarrow] = useState(narrowQuery.matches);
  useEffect(() => {
    const listener = () => setIsNarrow(narrowQuery.matches);
    narrowQuery.addEventListener("change", listener);
    return () => narrowQuery.removeEventListener("change", listener);
  }, [narrowQuery, setIsNarrow]);
  return isNarrow;
}
