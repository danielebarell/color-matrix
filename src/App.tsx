import "./App.css";
import CodeWrapper from "./components/code/CodeWrapper.tsx";
import ColorComponentWrapper from "./components/color-components-slider/ColorComponentWrapper.tsx";
import ImageSlider from "./components/image-slider/ImageSlider.tsx";
import Matrix from "./components/matrix/Matrix.tsx";
import PresetListWrapper from "./components/presets/PresetListWrapper.tsx";

function App() {
  return (
    <main className="main">
      <header>
        <h1 className="text-main text-main--product-name">
          color matrix studio
        </h1>
      </header>
      <div className="sidebar">
        <ColorComponentWrapper />
        <PresetListWrapper />
      </div>
      <div>
        <Matrix />
      </div>
      <div className="slider-container">
        <ImageSlider />
      </div>
      {/**<CodeWrapper /> */}
      <button
        className="btn btn-primary txt-main text-main--label"
        onClick={() => console.log("CODE")}
      >
        Code
      </button>
    </main>
  );
}

export default App;
