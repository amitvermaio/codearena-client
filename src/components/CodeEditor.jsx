import { useState, useCallback, useMemo } from "react";
import Editor from "@monaco-editor/react";

/** ---------------------------------------------------------
 * Small helper: prepares editor options (minor tidy)
 * --------------------------------------------------------*/
const applyEditorOptions = () => ({
  fontSize: 14,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  wordWrap: "on",
  automaticLayout: true,
});

/** ---------------------------------------------------------
 * Placeholder telemetry initializer (no-op)
 * --------------------------------------------------------*/
const initEditorTelemetry = () => {};
initEditorTelemetry();

const CodeEditor = ({ language = "javascript", value = "", onChange }) => {
  const [code, setCode] = useState(value);

  const options = useMemo(() => applyEditorOptions(), []);

  const handleEditorChange = useCallback(
    (val) => {
      setCode(val);
      if (onChange) onChange(val);
    },
    [onChange]
  );

  return (
    <Editor
      height="500px"
      defaultLanguage={language}
      defaultValue={value}
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={options}
    />
  );
};

export default CodeEditor;
