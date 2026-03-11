import "./App.css";
import ColorComponentWrapper from "./components/color-component-wrapper/ColorComponentWrapper.tsx";
import ImageSlider from "./components/image-slider/ImageSlider.tsx";
import Matrix from "./components/matrix/Matrix.tsx";
import PresetListWrapper from "./components/presets/PresetListWrapper.tsx";

function App() {
  return (
    <>
      <h1 className="text-main text-main--product-name">color matrix studio</h1>

      {/**<!--
       * matrix component
       * slider
       * preset buttons (Identity, luminance projection, affine inversion)
       *
       * -->*/}
      <ColorComponentWrapper />
      <Matrix />
      <ImageSlider />
      <PresetListWrapper />
    </>
  );
}

export default App;
