import { useState } from "react";
import Editor from "@monaco-editor/react";

const CodeEditor = ({ language = "javascript", value = "", onChange }) => {
  const [code, setCode] = useState(value);

  const handleEditorChange = (value) => {
    setCode(value);
    if (onChange) onChange(value);
  };

  return (
    <Editor
      height="500px"
      defaultLanguage={language}
      defaultValue={value}
      value={code}
      onChange={handleEditorChange}
      theme="vs-dark"
      options={{
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
};

export default CodeEditor;
