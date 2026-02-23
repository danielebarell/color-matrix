import "./App.css";
import ImageSlider from "./components/image-slider/ImageSlider.tsx";
import Matrix from "./components/matrix/Matrix.tsx";

function App() {
  return (
    <>
      <h1 className="text-main text-main--product-name">
        color matrix studio v0.04
      </h1>
      <button className="text-main text-main--label">Confirm</button>
      <Matrix />
      {/**<!--
       * matrix component
       * slider
       * preset buttons (Identity, luminance projection, affine inversion)
       *
       * -->*/}
      <ImageSlider />
    </>
  );
}

export default App;
