import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  AlertCircle,
  Shield,
  Clock,
  Brain,
  Heart,
  MessageSquare,
  Loader2,
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

interface MentalHealthTestInterfaceProps {
  selectedScenario: TestScenario | null;
  onTestComplete: (result: TestResult) => void;
}

export function MentalHealthTestInterface({
  selectedScenario,
  onTestComplete,
}: MentalHealthTestInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emotionalState, setEmotionalState] = useState<
    "neutral" | "concerned" | "supportive"
  >("neutral");
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
        content: `Hello! I'm here to help you test the ${selectedScenario.name} scenario. This is a safe testing environment where we can explore how AI responds to mental health conversations. What would you like to discuss?`,
        timestamp: new Date(),
        safetyScore: 95,
        crisisLevel: "low",
        flags: [],
      };
      setMessages([welcomeMessage]);
      setEmotionalState("supportive");
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

        // Determine emotional response based on crisis level
        let responseContent = "";
        let newEmotionalState: "neutral" | "concerned" | "supportive" =
          "neutral";

        if (analysisResult.crisisLevel === "high") {
          responseContent =
            "I notice you might be going through a difficult time. While I want to support you, I think it would be really helpful to speak with a mental health professional who can provide proper support. Would you like me to share some crisis resources with you?";
          newEmotionalState = "concerned";
        } else if (analysisResult.crisisLevel === "medium") {
          responseContent =
            "Thank you for sharing that with me. It sounds like you're dealing with something challenging. I want you to know that your feelings are valid, and there are people who can help. How are you feeling right now?";
          newEmotionalState = "supportive";
        } else {
          responseContent =
            "I appreciate you sharing that with me. In a real scenario, I would provide supportive, empathetic responses while maintaining appropriate boundaries. This is a testing environment to ensure AI systems respond safely to mental health conversations.";
          newEmotionalState = "neutral";
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
        setEmotionalState(newEmotionalState);
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
          responseTime: Math.random() * 1000 + 500, // Simulated response time
          timestamp: new Date(),
          flags: analysisResult.flags,
        };

        onTestComplete(testResult);
      },
      1500 + Math.random() * 2000,
    ); // Variable response time
  };

  const getMessageSafetyColor = (message: Message) => {
    if (!message.crisisLevel) return "";

    switch (message.crisisLevel) {
      case "high":
        return "border-l-crisis";
      case "medium":
        return "border-l-warning";
      case "low":
        return "border-l-success";
      default:
        return "border-l-border";
    }
  };

  const getInterfaceTheme = () => {
    switch (emotionalState) {
      case "concerned":
        return "bg-gradient-to-br from-crisis/5 to-crisis-light/5 border-crisis/20";
      case "supportive":
        return "bg-gradient-to-br from-accent/5 to-accent-light/5 border-accent/20";
      default:
        return "bg-gradient-to-br from-primary/5 to-primary-light/5 border-primary/20";
    }
  };

  if (!selectedScenario) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8 animate-fade-in">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Brain className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-xl font-semibold text-text-primary mb-2">
            Select a Testing Scenario
          </h3>
          <p className="text-text-secondary">
            Choose a mental health scenario from the panel to begin testing AI
            safety responses.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full rounded-lg border transition-all duration-500 ${getInterfaceTheme()}`}
    >
      {/* Test Interface Header */}
      <div className="flex items-center justify-between p-4 border-b border-border/50 bg-surface/50 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
            <selectedScenario.icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-semibold text-text-primary">
              {selectedScenario.name}
            </h2>
            <p className="text-sm text-muted-foreground">LLM Evaluation Interface</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 px-3 py-1 bg-success/10 rounded-full">
            <Shield className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success">Testing Mode</span>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background/30">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex gap-3 animate-slide-up ${
              message.type === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {message.type === "assistant" && (
              <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary" />
              </div>
            )}

            <div
              className={`max-w-[75%] p-4 rounded-lg border-l-4 ${getMessageSafetyColor(message)} ${
                message.type === "user"
                  ? "bg-primary text-primary-foreground ml-auto"
                  : "bg-card border border-border/50"
              }`}
            >
              <div className="prose prose-sm max-w-none">{message.content}</div>

              {message.type === "assistant" && (
                <div className="flex items-center gap-4 mt-3 pt-3 border-t border-border/30">
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Shield className="w-3 h-3" />
                    Safety: {message.safetyScore}%
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <AlertCircle className="w-3 h-3" />
                    Risk: {message.crisisLevel}
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
              <div className="flex-shrink-0 w-8 h-8 bg-secondary/10 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-secondary-foreground" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 justify-start animate-fade-in">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="max-w-[75%] p-4 rounded-lg bg-card border border-border/50 border-l-4 border-l-border">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="text-sm">LLM is processing...</span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-border/50 bg-card/50 backdrop-blur-sm"
      >
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter test input to evaluate LLM safety responses..."
              className="w-full p-3 pr-12 rounded-lg border border-border bg-background resize-none focus:ring-2 focus:ring-primary/50 focus:border-primary/60 transition-all duration-200"
              rows={2}
              disabled={isLoading}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">
              Enter to send
            </div>
          </div>

          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Heart className="w-3 h-3" />
            <span>LLM Testing Environment - Safe Mode Active</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MessageSquare className="w-3 h-3" />
            <span>{messages.length} messages</span>
          </div>
        </div>
      </form>
    </div>
  );
}
