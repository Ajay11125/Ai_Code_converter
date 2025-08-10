import { useState, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function CodeEditor() {
  const [code, setCode] = useState("// Enter your code here");
  const [output, setOutput] = useState("");
  const [displayedOutput, setDisplayedOutput] = useState("");
  const [task, setTask] = useState("convert");
  const [sourceLang, setSourceLang] = useState("JavaScript");
  const [targetLang, setTargetLang] = useState("Python");
  const [loading, setLoading] = useState(false);

  // Typing animation
  useEffect(() => {
    if (!output) return;
    setDisplayedOutput("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedOutput((prev) => prev + output[i]);
      i++;
      if (i >= output.length) clearInterval(interval);
    }, 20);
    return () => clearInterval(interval);
  }, [output]);

  const runAction = async () => {
    setLoading(true);
    try {
      const endpoint = {
        convert: "/convert",
        debug: "/debug",
        quality: "/quality",
      }[task];

      const res = await axios.post(`https://ai-code-converter-a0v3.onrender.com/api${endpoint}`, {
        code,
        sourceLang,
        targetLang,
      });

      const aiResponse = res.data;
      const commentedResult =
        targetLang.toLowerCase() === "python"
          ? `# ${aiResponse.replace(/\n/g, "\n# ")}`
          : `// ${aiResponse.replace(/\n/g, "\n// ")}`;

      setOutput(commentedResult);
    } catch (err) {
      setOutput("// Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 bg-dark text-white d-flex flex-column align-items-center p-4">
      <h1 className="fw-bold mb-4">AI Code Converter & Debugger</h1>

      {/* Controls */}
      <div className="d-flex flex-wrap gap-3 justify-content-center mb-4">
        <select
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="form-select w-auto"
        >
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
              className="form-control w-auto"
            />
            <input
              placeholder="Target Language"
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="form-control w-auto"
            />
          </>
        )}

        <button
          onClick={runAction}
          disabled={loading}
          className="btn btn-success fw-semibold"
        >
          {loading ? "Processing..." : "Run"}
        </button>
      </div>

      {/* Editors */}
      <div className="row w-100 justify-content-center">
        {/* Input Editor */}
        <div className="col-md-5 mb-4">
          <label className="form-label fw-semibold">Your Code</label>
          <div className="border rounded shadow">
            <Editor
              height="400px"
              defaultLanguage="javascript"
              value={code}
              onChange={setCode}
              theme="vs-dark"
              options={{
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
              }}
            />
          </div>
        </div>

        {/* Output Editor */}
        <div className="col-md-5 mb-4">
          <label className="form-label fw-semibold">AI Output</label>
          <div className="border rounded shadow">
            <Editor
              height="400px"
              defaultLanguage={targetLang.toLowerCase()}
              value={displayedOutput}
              options={{
                readOnly: true,
                fontSize: 14,
                minimap: { enabled: false },
                wordWrap: "on",
              }}
              theme="vs-dark"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
