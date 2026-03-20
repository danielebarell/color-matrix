import { useEffect, useState } from "react";
import "./App.css";
import CodeWrapper from "./components/code/CodeWrapper.tsx";
/**import CodeWrapper from "./components/code/CodeWrapper.tsx";**/
import ColorComponentWrapper from "./components/color-components-slider/ColorComponentWrapper.tsx";
import ImageSlider from "./components/image-slider/ImageSlider.tsx";
import Matrix from "./components/matrix/Matrix.tsx";
import PresetListWrapper from "./components/presets/PresetListWrapper.tsx";
import { LAYOUT_BREAKPOINT } from "./constants.ts";
import useNarrowMediaQuery from "./hooks/useNarrowMediaQuery.ts";
import Actions from "./components/actions/Actions.tsx";

function App() {
  const isNarrow = useNarrowMediaQuery(LAYOUT_BREAKPOINT);

  return (
    <main className="main">
      <header className="header">
        <h1 className="text-main text-main--product-name">
          color matrix studio
        </h1>
      </header>
      {!isNarrow && (
        <div className="sidebar">
          <ColorComponentWrapper />
          <PresetListWrapper />
        </div>
      )}
      <div className="matrix">
        <Matrix />
        <ImageSlider />
      </div>
      {isNarrow ? (
        <Actions></Actions>
      ) : (
        <div className="code-container">
          <CodeWrapper />
        </div>
      )}
    </main>
  );
}

export default App;
