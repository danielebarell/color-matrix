import "./App.css";
import Code from "./components/code/Code.tsx";
import CodeWrapper from "./components/code/CodeWrapper.tsx";
import ColorComponentWrapper from "./components/color-components-slider/ColorComponentWrapper.tsx";
import ImageSlider from "./components/image-slider/ImageSlider.tsx";
import Matrix from "./components/matrix/Matrix.tsx";
import PresetListWrapper from "./components/presets/PresetListWrapper.tsx";

function App() {
  return (
    <>
      <h1 className="text-main text-main--product-name">color matrix studio</h1>
      <CodeWrapper />
      <ColorComponentWrapper />
      <Matrix />
      <ImageSlider />
      <PresetListWrapper />
    </>
  );
}

export default App;
