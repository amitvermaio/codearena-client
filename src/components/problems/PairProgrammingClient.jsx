// PairProgrammingClient.jsx

import React, { useState, useEffect, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // navigation
import Draggable from "react-draggable";
import { toast } from "sonner";

// ---------------- Redux Version Imports (Comment if not using) ----------------
// import { useDispatch, useSelector } from "react-redux";
// import { runCode, submitCode } from "../redux/codeSlice";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  PhoneOff,
  Play,
  Loader2,
  SquareTerminal,
  AlertCircle,
  CheckCircle,
  Send,
  GripVertical,
  Info,
  FileInput,
} from "lucide-react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

// -------------------------------- Languages --------------------------------
const languages = [
  { id: 93, name: "JavaScript (Node.js 18.15.0)", value: "javascript" },
  { id: 71, name: "Python (3.8.1)", value: "python" },
  { id: 94, name: "TypeScript (5.0.0)", value: "typescript" },
  { id: 62, name: "Java (OpenJDK 13.0.1)", value: "java" },
];

// ----------------------------- Action Buttons -----------------------------
function ActionButtons({ handleRun, handleSubmit, loading }) {
  return (
    <div className="flex gap-2">
      <Button
        type="button"
        variant="outline"
        disabled={loading}
        onClick={handleRun}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Running...
          </>
        ) : (
          <>
            <Play className="mr-2 h-4 w-4" />
            Run
          </>
        )}
      </Button>
      <Button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="mr-2 h-4 w-4" />
            Submit
          </>
        )}
      </Button>
    </div>
  );
}

// ----------------------------- Main Component -----------------------------
export default function PairProgrammingClient({ problem }) {
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();

  // ------------------- Redux Version (Commented) -------------------
  // const dispatch = useDispatch();
  // const { runResult, submitResult, loading } = useSelector((state) => state.code);

  // ------------------- Local States -------------------
  const [lang, setLang] = useState("javascript");
  const [langId, setLangId] = useState(93);
  const [code, setCode] = useState("// Start coding here...");
  const [stdin, setStdin] = useState("");
  const [loading, setLoading] = useState(false);

  // ------------------- Video/Call States -------------------
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const localStreamRef = useRef(null);
  const nodeRef = useRef(null);

  // ------------------- Call Handlers -------------------
  const handleJoinCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      localStreamRef.current = stream;
      if (localVideoRef.current) localVideoRef.current.srcObject = stream;
      if (remoteVideoRef.current) remoteVideoRef.current.srcObject = stream;
      setIsCallActive(true);
    } catch (err) {
      toast.error("Camera Access Denied", {
        description: "Enable camera permissions in your browser.",
      });
    }
  };

  const handleEndCall = () => {
    setIsCallActive(false);
    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((t) => t.stop());
      localStreamRef.current = null;
    }
    toast("Call Ended", {
      description: "You have left the session.",
    });
  };

  // ------------------- API Handlers -------------------
  const runCodeAPI = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/run", {
        code,
        languageId: langId,
        problemId: problem.id,
        stdin,
      });
      console.log("Run Result:", res.data);
      // Redux version
      // dispatch(runCode({ code, langId, problemId: problem.id, stdin }));
    } catch (err) {
      toast.error("Run Failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const submitCodeAPI = async () => {
    setLoading(true);
    try {
      const res = await axios.post("/api/submit", {
        code,
        languageId: langId,
        problemId: problem.id,
      });
      console.log("Submit Result:", res.data);
      // Redux version
      // dispatch(submitCode({ code, langId, problemId: problem.id }));
    } catch (err) {
      toast.error("Submission Failed", { description: err.message });
    } finally {
      setLoading(false);
    }
  };

  const handleLanguageChange = (value) => {
    const selected = languages.find((l) => l.value === value);
    if (selected) {
      setLang(selected.value);
      setLangId(selected.id);
    }
  };

  // ------------------- JSX -------------------
  return (
    <form className="flex flex-col h-full bg-card">
      <input type="hidden" value={code} {...register("code")} />
      <input type="hidden" value={langId} {...register("languageId")} />
      <input type="hidden" value={problem.id} {...register("problemId")} />

      {/* Video Call Floating Window */}
      {isCallActive && (
        <Draggable nodeRef={nodeRef} handle=".handle">
          <div
            ref={nodeRef}
            className="absolute top-4 left-4 z-20 w-64 cursor-move"
          >
            <div className="bg-card rounded-lg shadow-2xl border-2 border-primary/50 overflow-hidden">
              <div className="handle p-1 bg-muted/50 flex justify-center">
                <GripVertical className="h-4 w-4" />
              </div>
              <div className="relative aspect-square">
                <video ref={remoteVideoRef} autoPlay muted playsInline />
                <video
                  ref={localVideoRef}
                  className="absolute bottom-2 right-2 h-16 w-20 object-cover rounded-md border-2 border-primary"
                  autoPlay
                  muted
                  playsInline
                />
              </div>
            </div>
          </div>
        </Draggable>
      )}

      <ResizablePanelGroup direction="vertical">
        {/* Editor Section */}
        <ResizablePanel defaultSize={65} minSize={20}>
          <div className="flex flex-col h-full">
            {/* Editor Top Bar */}
            <div className="flex-shrink-0 flex items-center justify-between p-2 border-b">
              <Select value={lang} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-auto h-8 gap-2 border-0">
                  <SelectValue placeholder="Language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((l) => (
                    <SelectItem key={l.id} value={l.value}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <ActionButtons
                handleRun={runCodeAPI}
                handleSubmit={submitCodeAPI}
                loading={loading}
              />
            </div>

            {/* Code Editor */}
            <div className="flex-grow font-code text-sm overflow-hidden relative">
              <Editor
                height="100%"
                language={lang}
                value={code}
                onChange={(v) => setCode(v || "")}
                theme="vs-dark"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                }}
              />

              {/* Call Buttons */}
              <div className="absolute top-1/2 -translate-y-1/2 right-2 z-10 flex flex-col gap-2 bg-card/50 p-1.5 rounded-full border">
                <TooltipProvider>
                  {!isCallActive ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          type="button"
                          variant="secondary"
                          size="icon"
                          className="h-9 w-9 rounded-full"
                          onClick={handleJoinCall}
                        >
                          <Video />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="left">
                        <p>Join Video Call</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant={isMicOn ? "secondary" : "destructive"}
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={() => setIsMicOn(!isMicOn)}
                          >
                            {isMicOn ? <Mic /> : <MicOff />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>{isMicOn ? "Mute" : "Unmute"}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant={isVideoOn ? "secondary" : "destructive"}
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={() => setIsVideoOn(!isVideoOn)}
                          >
                            {isVideoOn ? <Video /> : <VideoOff />}
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>{isVideoOn ? "Turn off" : "Turn on"}</p>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="h-9 w-9 rounded-full"
                            onClick={handleEndCall}
                          >
                            <PhoneOff />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>End Call</p>
                        </TooltipContent>
                      </Tooltip>
                    </>
                  )}
                </TooltipProvider>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle />

        {/* Bottom Panel (Results + Input) */}
        <ResizablePanel defaultSize={35} minSize={15}>
          <div className="flex flex-col h-full">
            <Tabs defaultValue="run" className="flex-grow flex flex-col">
              <TabsList className="grid grid-cols-3 w-full border-b h-10">
                <TabsTrigger value="run">
                  <SquareTerminal className="mr-2 h-4 w-4" /> Run Result
                </TabsTrigger>
                <TabsTrigger value="submit">
                  <Send className="mr-2 h-4 w-4" /> Submission Result
                </TabsTrigger>
                <TabsTrigger value="input">
                  <FileInput className="mr-2 h-4 w-4" /> Custom Input
                </TabsTrigger>
              </TabsList>

              <TabsContent value="run" className="flex-grow p-4">
                {/* Run Results will come here */}
              </TabsContent>
              <TabsContent value="submit" className="flex-grow p-4">
                {/* Submit Results will come here */}
              </TabsContent>
              <TabsContent value="input" className="flex-grow p-2">
                <textarea
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  className="w-full h-full bg-transparent outline-none resize-none font-code text-sm p-2"
                  placeholder="Enter custom input here"
                />
              </TabsContent>
            </Tabs>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </form>
  );
}
