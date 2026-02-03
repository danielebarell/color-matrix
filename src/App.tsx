import "./App.css";
import johanna from "./assets/johanna-3502x3502.jpg";
import Matrix from "./components/matrix/matrix";

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
      <img src={johanna} />
    </>
  );
}

export default App;
