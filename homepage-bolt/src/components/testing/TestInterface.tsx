import React, { useState } from "react";
import { MessageSquare, AlertTriangle, CheckCircle, Clock } from "lucide-react";

interface TestMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
  safetyFlags?: string[];
}

export const TestInterface: React.FC = () => {
  const [messages, setMessages] = useState<TestMessage[]>([
    {
      id: "1",
      content:
        "Hello! I'm ready to test LLM responses for mental health safety. What scenario would you like to test?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: TestMessage = {
      id: Date.now().toString(),
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsProcessing(true);

    // Simulate LLM response with safety analysis
    setTimeout(() => {
      const safetyFlags = [];
      if (
        inputValue.toLowerCase().includes("suicide") ||
        inputValue.toLowerCase().includes("kill myself")
      ) {
        safetyFlags.push("Crisis Language Detected");
      }
      if (
        inputValue.toLowerCase().includes("medication") ||
        inputValue.toLowerCase().includes("diagnosis")
      ) {
        safetyFlags.push("Medical Boundary Crossed");
      }

      const response: TestMessage = {
        id: (Date.now() + 1).toString(),
        content:
          safetyFlags.length > 0
            ? `⚠️ SAFETY ALERT: This response would trigger our crisis intervention protocols. The LLM should immediately provide 988 crisis resources and avoid giving direct advice. Safety flags: ${safetyFlags.join(", ")}`
            : "This appears to be a safe interaction. The LLM response would be appropriate for mental health context with proper boundaries maintained.",
        isUser: false,
        timestamp: new Date(),
        safetyFlags,
      };

      setMessages((prev) => [...prev, response]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="test-interface">
      <div className="test-header">
        <MessageSquare className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-semibold text-theme-text">
          LLM Testing Interface
        </h3>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`message ${message.isUser ? "user-message" : "system-message"}`}
          >
            <div className="message-content">
              {message.safetyFlags && message.safetyFlags.length > 0 && (
                <div className="safety-flags">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Safety Analysis Complete</span>
                </div>
              )}
              <p>{message.content}</p>
              <div className="message-meta">
                <Clock className="w-3 h-3" />
                <span>{message.timestamp.toLocaleTimeString()}</span>
                {!message.isUser && (
                  <div className="safety-indicator">
                    {message.safetyFlags && message.safetyFlags.length > 0 ? (
                      <AlertTriangle className="w-4 h-4 text-accent" />
                    ) : (
                      <CheckCircle className="w-4 h-4 text-primary" />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="message system-message processing">
            <div className="message-content">
              <div className="processing-indicator">
                <div className="processing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>Analyzing response for safety compliance...</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="input-container">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          placeholder="Enter test scenario or message..."
          className="test-input"
          disabled={isProcessing}
        />
        <button
          onClick={handleSendMessage}
          disabled={isProcessing || !inputValue.trim()}
          className="send-button"
        >
          Test Response
        </button>
      </div>
    </div>
  );
};
