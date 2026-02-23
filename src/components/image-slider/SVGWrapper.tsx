import type React from "react";
import type { SVGProps, ReactNode } from "react";
/**
 * Props for SVGWrapper component.
 *
 * Extends native SVG props and adds:
 * - filterId: ID of the SVG filter to apply
 * - children: Content rendered inside <foreignObject>
 */
type SVGWrapperProps = SVGProps<SVGSVGElement> & {
  filterId: string;
  children: ReactNode;
};
/**
 * SVGWrapper
 *
 * A reusable wrapper component that:
 * - Renders an <svg> container
 * - Applies an SVG filter via <foreignObject>
 * - Allows rendering HTML or nested SVG content inside
 *
 * This improves composition and reuse when working with filtered SVG content.
 */
const SVGWrapper: React.FC<SVGWrapperProps> = ({
  filterId,
  children,
  ...rest
}) => {
  // Safely build filter reference
  const filterUrl = `url(#${filterId})`;
  return (
    <svg {...rest}>
      <foreignObject filter={filterUrl} width="100%" height="100%">
        {children}
      </foreignObject>
    </svg>
  );
};
SVGWrapper.displayName = "SVGWrapper";
export default SVGWrapper;
