// =============================
// Imports (Grouped by Image)
// =============================
//----tulips
import tulips_fallback from "../assets/images/tulipani-colori-fallback.jpg";
import tulips_x1_small_w from "../assets/images/tulipani-colori-x1-small.webp";
import tulips_x1_small_a from "../assets/images/tulipani-colori-x1-small.avif";
import tulips_x2_small_w from "../assets/images/tulipani-colori-x2-small.webp";
import tulips_x2_small_a from "../assets/images/tulipani-colori-x2-small.avif";
import tulips_x1_w from "../assets/images/tulipani-colori-x1.webp";
import tulips_x1_a from "../assets/images/tulipani-colori-x1.avif";
import tulips_x2_w from "../assets/images/tulipani-colori-x2.webp";
import tulips_x2_a from "../assets/images/tulipani-colori-x2.avif";
//----johanna
import johanna_fallback from "../assets/images/johanna-fallback.jpg";
import johanna_x1_small_w from "../assets/images/johanna-x1-small.webp";
import johanna_x1_small_a from "../assets/images/johanna-x1-small.avif";
import johanna_x2_small_w from "../assets/images/johanna-x2-small.webp";
import johanna_x2_small_a from "../assets/images/johanna-x2-small.avif";
import johanna_x1_w from "../assets/images/johanna-x1.webp";
import johanna_x1_a from "../assets/images/johanna-x1.avif";
import johanna_x2_w from "../assets/images/johanna-x2.webp";
import johanna_x2_a from "../assets/images/johanna-x2.avif";
//----tempest
import tempest_fallback from "../assets/images/tempesta-fallback.jpg";
import tempest_x1_small_w from "../assets/images/tempesta-1x-small.webp";
import tempest_x1_small_a from "../assets/images/tempesta-1x-small.avif";
import tempest_x2_small_w from "../assets/images/tempesta-2x-small.webp";
import tempest_x2_small_a from "../assets/images/tempesta-2x-small.avif";
import tempest_x1_w from "../assets/images/tempesta-1x.webp";
import tempest_x1_a from "../assets/images/tempesta-1x.avif";
import tempest_x2_w from "../assets/images/tempesta-2x.webp";
import tempest_x2_a from "../assets/images/tempesta-2x.avif";
//----bride
import bride_fallback from "../assets/images/sposa-fallback.jpg";
import bride_x1_small_w from "../assets/images/sposa-1x-small.webp";
import bride_x1_small_a from "../assets/images/sposa-1x-small.avif";
import bride_x2_small_w from "../assets/images/sposa-2x-small.webp";
import bride_x2_small_a from "../assets/images/sposa-2x-small.avif";
import bride_x1_w from "../assets/images/sposa-1x.webp";
import bride_x1_a from "../assets/images/sposa-1x.avif";
import bride_x2_w from "../assets/images/sposa-2x.webp";
import bride_x2_a from "../assets/images/sposa-2x.avif";
//----valey
import valey_fallback from "../assets/images/valli-fallback.jpg";
import valey_x1_small_w from "../assets/images/valli-1x-small.webp";
import valey_x1_small_a from "../assets/images/valli-1x-small.avif";
import valey_x2_small_w from "../assets/images/valli-2x-small.webp";
import valey_x2_small_a from "../assets/images/valli-2x-small.avif";
import valey_x1_w from "../assets/images/valli-1x.webp";
import valey_x1_a from "../assets/images/valli-1x.avif";
import valey_x2_w from "../assets/images/valli-2x.webp";
import valey_x2_a from "../assets/images/valli-2x.avif";
//----vector
import no_signal from "../assets/images/no_signal.svg";
import type React from "react";
// =============================
// Image Type Definitions
// =============================
type ImageType = "raster" | "vector";
type RasterType = { avif: string; webp: string };

export interface BaseImage {
  id: string;
  type: ImageType;
  dimension: { width: number; height: number };
}
export interface RasterImage extends BaseImage {
  type: "raster";
  x1: RasterType;
  x2: RasterType;
  smallx1: RasterType;
  smallx2: RasterType;
  fallback: string;
}
export interface VectorImage extends BaseImage {
  type: "vector";
  svgImage: string;
}
export type DataImage = RasterImage | VectorImage;
// =============================
// Utility Factory
// Eliminates repetitive object structure
// =============================
function createRasterImage(config: Omit<RasterImage, "type">): RasterImage {
  return {
    ...config,
    type: "raster",
  };
}
//
const tulips = createRasterImage({
  id: "tulips",
  dimension: { width: 1024, height: 1536 },
  fallback: tulips_fallback,
  x1: { avif: tulips_x1_a, webp: tulips_x1_w },
  x2: { avif: tulips_x2_a, webp: tulips_x2_w },
  smallx1: { avif: tulips_x1_small_a, webp: tulips_x1_small_w },
  smallx2: { avif: tulips_x2_small_a, webp: tulips_x2_small_w },
});
const johanna = createRasterImage({
  id: "johanna",
  dimension: { width: 1024, height: 1024 },
  fallback: johanna_fallback,
  x1: { avif: johanna_x1_a, webp: johanna_x1_w },
  x2: { avif: johanna_x2_a, webp: johanna_x2_w },
  smallx1: { avif: johanna_x1_small_a, webp: johanna_x1_small_w },
  smallx2: { avif: johanna_x2_small_a, webp: johanna_x2_small_w },
});
const bride = createRasterImage({
  id: "bride",
  dimension: { width: 1024, height: 1558 },
  fallback: bride_fallback,
  x1: { avif: bride_x1_a, webp: bride_x1_w },
  x2: { avif: bride_x2_a, webp: bride_x2_w },
  smallx1: { avif: bride_x1_small_a, webp: bride_x1_small_w },
  smallx2: { avif: bride_x2_small_a, webp: bride_x2_small_w },
});
const tempest = createRasterImage({
  id: "tempest",
  dimension: { width: 1536, height: 1024 },
  fallback: tempest_fallback,
  x1: { avif: tempest_x1_a, webp: tempest_x1_w },
  x2: { avif: tempest_x2_a, webp: tempest_x2_w },
  smallx1: { avif: tempest_x1_small_a, webp: tempest_x1_small_w },
  smallx2: { avif: tempest_x2_small_a, webp: tempest_x2_small_w },
});
const valey = createRasterImage({
  id: "valey",
  dimension: { width: 1536, height: 1024 },
  fallback: valey_fallback,
  x1: { avif: valey_x1_a, webp: valey_x1_w },
  x2: { avif: valey_x2_a, webp: valey_x2_w },
  smallx1: { avif: valey_x1_small_a, webp: valey_x1_small_w },
  smallx2: { avif: valey_x2_small_a, webp: valey_x2_small_w },
});
const nosignal: VectorImage = {
  id: "nosignal",
  type: "vector",
  dimension: { width: 1835, height: 1024 },
  svgImage: no_signal,
};
// =============================
// Image Registry (Better than Array.find)
// O(1) lookup instead of O(n)
// =============================
const imageRegistry: Readonly<Record<string, DataImage>> = {
  johanna,
  tulips,
  bride,
  tempest,
  valey,
  nosignal,
};
// =============================
// Public API
// =============================
const images: DataImage[] = Object.values(imageRegistry);
export default images;
//
export function getDataImagebyId(id: string): DataImage | undefined {
  const image = imageRegistry[id];
  if (!image) console.warn(`Non esiste immagine per id=${id}`);
  return image;
}
export function getStyleDimension(dataImage: DataImage): React.CSSProperties {
  const style = {
    width: `${dataImage.dimension.width}px`,
    height: `${dataImage.dimension.height}px`,
  };
  return style;
}
