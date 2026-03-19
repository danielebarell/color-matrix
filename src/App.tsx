import "./App.css";
import CodeWrapper from "./components/code/CodeWrapper.tsx";
/**import CodeWrapper from "./components/code/CodeWrapper.tsx";**/
import ColorComponentWrapper from "./components/color-components-slider/ColorComponentWrapper.tsx";
import ImageSlider from "./components/image-slider/ImageSlider.tsx";
import Matrix from "./components/matrix/Matrix.tsx";
import PresetListWrapper from "./components/presets/PresetListWrapper.tsx";

function App() {
  return (
    <main className="main">
      <header className="header">
        <h1 className="text-main text-main--product-name">
          color matrix studio
        </h1>
      </header>
      <div className="sidebar">
        <ColorComponentWrapper />
        <PresetListWrapper />
      </div>
      <div className="matrix">
        <Matrix />
        <ImageSlider />
      </div>
      <div className="code-container">
        <CodeWrapper />
      </div>
    </main>
  );
}

export default App;
