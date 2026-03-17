import type { ColorMatrix } from "./presets-data";

export const getCss = () => {
  return `.colorFilter{
        filter: url(URL_TO_MY_SVG#myFilter)
    }`;
};

export const getSvg = (values: ColorMatrix) => {
  const valuesTxt = values.join(" ");
  return `<svg width="100%" height="100%">
    <defs>
        <filter id="red">
            <feColorMatrix
              type="matrix"
              values="${valuesTxt}"
            ></feColorMatrix>
        </filter>
    </defs>
</svg>`;
};
