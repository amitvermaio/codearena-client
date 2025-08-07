import { useParams } from "react-router-dom";
import CodeEditor from "../../components/CodeEditor";

const ProblemDetails = () => {
  const { problemId } = useParams();

  const handleCodeChange = (newCode) => {
    console.log("Updated Code:", newCode);
  };

  return (
    <div className="px-6 py-4">
      <h2 className="text-2xl font-bold mb-4">Problem ID: {problemId}</h2>
      
      {/* Problem description content here */}

      <CodeEditor
        language="javascript"
        value={`// Write your solution here`}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default ProblemDetails;
