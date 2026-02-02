import "./App.css";
import johanna from "./assets/johanna-3502x3502.jpg";

function App() {
  return (
    <>
      <h1 className="text-main text-main--product-name">
        color matrix studio v0.04
      </h1>
      <h6>styles</h6>
      <button className="text-main text-main--label">Confirm</button>
      <p className="text-main text-main--message">
        Ipse lorum sit ament oppossum eccetera
      </p>
      <span className="text-main text-main--tooltip">Luminance inversion</span>
      <code className="text-code">0,234</code>
      <code className="text-code text-code--12">0,234</code>
      {/**<!--
       * CSS Reset
       * CSS Colors
       * CSS Measure
       * CSS Typography
       *
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
