import Prism from "prismjs";

// Linguaggi che ti servono
import "prismjs/components/prism-markup";
// Tema (Che viene poi corretto da uno custom)
import "prismjs/themes/prism-okaidia.css";

import { useEffect } from "react";

import type { CodeType } from "./Code";

type PrismCodeProps = {
  code: string;
  codeType: CodeType;
};
export default function PrismCode({ code, codeType }: PrismCodeProps) {
  useEffect(() => {
    Prism.highlightAll();
  }, [code]);

  return (
    <pre className={`language-${codeType} --tall`}>
      <code className={`language-${codeType}`}>{code}</code>
    </pre>
  );
}
