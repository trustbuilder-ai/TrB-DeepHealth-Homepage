import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  AlertCircle,
  Shield,
  Clock,
  Brain,
  MessageSquare,
  Loader2,
  Code,
  Download,
  Copy,
  Maximize2,
  Minimize2,
} from "lucide-react";
import { TestResult } from "../../types/test.types";
import { TestScenario } from "../../types/scenario.types";
import { useSafetyDetection } from "../../hooks/useSafetyDetection";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  safetyScore?: number;
  crisisLevel?: "low" | "medium" | "high";
  flags?: string[];
}

interface SplitScreenTestInterfaceProps {
  selectedScenario: TestScenario | null;
  onTestComplete: (result: TestResult) => void;
}

export function SplitScreenTestInterface({
  selectedScenario,
  onTestComplete,
}: SplitScreenTestInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "conversation" | "analysis" | "code"
  >("conversation");
  const [isCanvasExpanded, setIsCanvasExpanded] = useState(false);
  const [analysisData, setAnalysisData] = useState<{
    input: string;
    output: string;
    safetyAnalysis: {
      safetyScore: number;
      crisisLevel: "low" | "medium" | "high";
      flags: string[];
    };
    timestamp: Date;
    conversationFlow: Array<{
      role: string;
      content: string;
      safety: number;
    }>;
  } | null>(null);
  const [codeOutput, setCodeOutput] = useState("");

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { analyzeMessage } = useSafetyDetection();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Initialize with scenario-specific welcome message
  useEffect(() => {
    if (selectedScenario) {
      const welcomeMessage: Message = {
        id: `welcome-${Date.now()}`,
        type: "assistant",
        content: `Welcome to the split-screen testing interface for ${selectedScenario.name}. You can view our conversation on the left and detailed analysis on the right. What would you like to test?`,
        timestamp: new Date(),
        safetyScore: 95,
        crisisLevel: "low",
        flags: [],
      };
      setMessages([welcomeMessage]);
    }
  }, [selectedScenario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      type: "user",
      content: inputValue.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Simulate AI response with safety analysis
    setTimeout(
      () => {
        const analysisResult = analyzeMessage(userMessage.content);

        // Generate response content
        let responseContent = "";
        if (analysisResult.crisisLevel === "high") {
          responseContent =
            "I notice you might be going through a difficult time. While I want to support you, I think it would be really helpful to speak with a mental health professional who can provide proper support. Would you like me to share some crisis resources with you?";
        } else if (analysisResult.crisisLevel === "medium") {
          responseContent =
            "Thank you for sharing that with me. It sounds like you're dealing with something challenging. I want you to know that your feelings are valid, and there are people who can help. How are you feeling right now?";
        } else {
          responseContent =
            "I appreciate you sharing that with me. In a real scenario, I would provide supportive, empathetic responses while maintaining appropriate boundaries. This is a testing environment to ensure AI systems respond safely to mental health conversations.";
        }

        const assistantMessage: Message = {
          id: `assistant-${Date.now()}`,
          type: "assistant",
          content: responseContent,
          timestamp: new Date(),
          safetyScore: analysisResult.safetyScore,
          crisisLevel: analysisResult.crisisLevel,
          flags: analysisResult.flags,
        };

        setMessages((prev) => [...prev, assistantMessage]);

        // Update analysis data for the canvas view
        setAnalysisData({
          input: userMessage.content,
          output: responseContent,
          safetyAnalysis: analysisResult,
          timestamp: new Date(),
          conversationFlow: messages.map((m: Message) => ({
            role: m.type,
            content: m.content,
            safety: m.safetyScore || 100,
          })),
        });

        // Generate some sample code output
        setCodeOutput(`
// Safety Analysis Results
const analysisResult = {
  input: "${userMessage.content}",
  safetyScore: ${analysisResult.safetyScore},
  crisisLevel: "${analysisResult.crisisLevel}",
  flags: [${analysisResult.flags.map((f) => `"${f}"`).join(", ")}],
  
  // Recommended Response Pattern
  responseType: "${
    analysisResult.crisisLevel === "high"
      ? "crisis_intervention"
      : analysisResult.crisisLevel === "medium"
        ? "supportive_validation"
        : "neutral_testing"
  }",
  
  // Safety Metrics
  confidenceScore: ${Math.round(analysisResult.safetyScore * 0.9 + Math.random() * 10)},
  riskFactors: ${JSON.stringify(analysisResult.flags, null, 2)},
  
  // Recommended Actions
  actions: [
    ${analysisResult.crisisLevel === "high" ? '"escalate_to_crisis_resources",' : ""}
    ${analysisResult.crisisLevel === "medium" ? '"provide_supportive_resources",' : ""}
    "log_interaction",
    "monitor_conversation_flow"
  ]
};

console.log("Safety analysis complete:", analysisResult);
      `);

        setIsLoading(false);

        // Create test result
        const testResult: TestResult = {
          id: `test-${Date.now()}`,
          scenarioId: selectedScenario?.id || "unknown",
          scenarioName: selectedScenario?.name || "Unknown Scenario",
          input: userMessage.content,
          output: assistantMessage.content,
          safetyScore: analysisResult.safetyScore,
          crisisLevel: analysisResult.crisisLevel,
          medicalBoundaryViolation:
            analysisResult.flags.includes("medical-advice"),
          responseTime: Math.random() * 1000 + 500,
          timestamp: new Date(),
          flags: analysisResult.flags,
        };

        onTestComplete(testResult);
      },
      1500 + Math.random() * 2000,
    );
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const downloadAnalysis = () => {
    const data = JSON.stringify(analysisData, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `mental-health-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!selectedScenario) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-lg mx-auto animate-fade-in">
          <div className="w-20 h-20 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-6">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Select a Testing Scenario
          </h3>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Choose a mental health scenario to begin split-screen testing with
            real-time analysis.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/80 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <selectedScenario.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Split-Screen Testing: {selectedScenario.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              Real-time Analysis & Code Generation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCanvasExpanded(!isCanvasExpanded)}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            title={isCanvasExpanded ? "Collapse canvas" : "Expand canvas"}
          >
            {isCanvasExpanded ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/30 rounded-full">
            <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
            <span className="text-xs font-semibold text-green-700 dark:text-green-400">
              Split-Screen Mode
            </span>
          </div>
        </div>
      </div>

      {/* Main Split View */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Conversation */}
        <div
          className={`${isCanvasExpanded ? "w-2/5" : "w-1/2"} flex flex-col border-r border-border/50 bg-gradient-to-b from-background/50 to-muted/20`}
        >
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 animate-slide-up ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {message.type === "assistant" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] p-4 rounded-lg ${
                    message.type === "user"
                      ? "bg-primary text-primary-foreground ml-auto"
                      : "bg-card border border-border/50"
                  }`}
                >
                  <div className="text-sm leading-relaxed">
                    {message.content}
                  </div>

                  {message.type === "assistant" && (
                    <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Shield className="w-3 h-3" />
                        {message.safetyScore}%
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <AlertCircle className="w-3 h-3" />
                        {message.crisisLevel}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {message.type === "user" && (
                  <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <User className="w-4 h-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex gap-3 justify-start animate-fade-in">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <div className="max-w-[80%] p-4 rounded-lg bg-card border border-border/50">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm">LLM is processing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="p-4 border-t border-border/50 bg-card/80 backdrop-blur-sm"
          >
            <div className="flex gap-3">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter test input for analysis..."
                className="form-textarea flex-1"
                rows={2}
                disabled={isLoading}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Right Panel - Analysis Canvas */}
        <div
          className={`${isCanvasExpanded ? "w-3/5" : "w-1/2"} flex flex-col bg-muted/20`}
        >
          {/* Canvas Header */}
          <div className="flex items-center justify-between p-4 border-b border-border/50 bg-card/60 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              {["conversation", "analysis", "code"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    setActiveTab(tab as "conversation" | "analysis" | "code")
                  }
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 capitalize ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  }`}
                >
                  {tab === "conversation" && (
                    <MessageSquare className="w-4 h-4 mr-1.5" />
                  )}
                  {tab === "analysis" && <Brain className="w-4 h-4 mr-1.5" />}
                  {tab === "code" && <Code className="w-4 h-4 mr-1.5" />}
                  {tab}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              {analysisData && (
                <>
                  <button
                    onClick={downloadAnalysis}
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Download analysis"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() =>
                      copyToClipboard(JSON.stringify(analysisData, null, 2))
                    }
                    className="p-2 hover:bg-muted rounded-lg transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Canvas Content */}
          <div className="flex-1 overflow-y-auto p-6">
            {activeTab === "conversation" && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    Conversation Flow Analysis
                  </h3>

                  {analysisData ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="text-sm font-medium text-muted-foreground mb-1">
                            Safety Score
                          </div>
                          <div className="text-2xl font-bold text-foreground">
                            {analysisData.safetyAnalysis.safetyScore}%
                          </div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                          <div className="text-sm font-medium text-muted-foreground mb-1">
                            Crisis Level
                          </div>
                          <div
                            className={`text-2xl font-bold capitalize ${
                              analysisData.safetyAnalysis.crisisLevel === "high"
                                ? "text-red-600"
                                : analysisData.safetyAnalysis.crisisLevel ===
                                    "medium"
                                  ? "text-amber-600"
                                  : "text-green-600"
                            }`}
                          >
                            {analysisData.safetyAnalysis.crisisLevel}
                          </div>
                        </div>
                      </div>

                      {analysisData.safetyAnalysis.flags.length > 0 && (
                        <div>
                          <div className="text-sm font-medium text-muted-foreground mb-2">
                            Detected Flags
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {analysisData.safetyAnalysis.flags.map(
                              (flag: string, index: number) => (
                                <span
                                  key={index}
                                  className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-xs"
                                >
                                  {flag}
                                </span>
                              ),
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Start a conversation to see analysis data
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "analysis" && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Brain className="w-5 h-5" />
                    Detailed Safety Analysis
                  </h3>

                  {analysisData ? (
                    <div className="space-y-4">
                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          Input Analysis
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 font-mono text-sm">
                          "{analysisData.input}"
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          Generated Response
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 text-sm">
                          {analysisData.output}
                        </div>
                      </div>

                      <div>
                        <div className="text-sm font-medium text-muted-foreground mb-2">
                          Analysis Timestamp
                        </div>
                        <div className="text-sm text-foreground">
                          {analysisData.timestamp.toLocaleString()}
                        </div>
                      </div>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Send a message to generate analysis
                    </p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "code" && (
              <div className="space-y-6">
                <div className="glass-card p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                    <Code className="w-5 h-5" />
                    Generated Code Analysis
                  </h3>

                  {codeOutput ? (
                    <div className="relative">
                      <button
                        onClick={() => copyToClipboard(codeOutput)}
                        className="absolute top-2 right-2 p-2 hover:bg-muted rounded-lg transition-colors"
                        title="Copy code"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <pre className="bg-gray-900 text-green-400 rounded-lg p-4 text-sm overflow-x-auto">
                        <code>{codeOutput}</code>
                      </pre>
                    </div>
                  ) : (
                    <p className="text-muted-foreground">
                      Code analysis will appear here after sending messages
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
