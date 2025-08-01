import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const [code, setCode] = useState("// Enter your code here");
  const [output, setOutput] = useState("");
  const [task, setTask] = useState("convert");
  const [sourceLang, setSourceLang] = useState("JavaScript");
  const [targetLang, setTargetLang] = useState("Python");
  const [loading, setLoading] = useState(false);

  const runAction = async () => {
    setLoading(true);
    try {
      const endpoint = {
        convert: "/convert",
        debug: "/debug",
        quality: "/quality",
      }[task];

      const res = await axios.post(`http://localhost:8080/api${endpoint}`, {
        code,
        sourceLang,
        targetLang,
      });
      console.log(res)
      setOutput(res.data);
    } catch (err) {
      setOutput("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Code Conversion, Debugging & Quality Checker</h2>

      <div style={{ marginBottom: "10px" }}>
        <select value={task} onChange={(e) => setTask(e.target.value)}>
          <option value="convert">Convert Code</option>
          <option value="debug">Debug Code</option>
          <option value="quality">Quality Check</option>
        </select>

        {task === "convert" && (
          <>
            <input
              placeholder="Source Language"
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
            <input
              placeholder="Target Language"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              style={{ marginLeft: "10px" }}
            />
          </>
        )}

        <button onClick={runAction} style={{ marginLeft: "10px" }}>
          {loading ? "Processing..." : "Run"}
        </button>
      </div>

      <Editor
        height="300px"
        defaultLanguage="javascript"
        value={code}
        onChange={setCode}
        theme="vs-dark"
      />

      <h3>Result:</h3>
      <pre style={{ background: "#f0f0f0", padding: "10px" }}>{output}</pre>
    </div>
  );
};

export default CodeEditor;
