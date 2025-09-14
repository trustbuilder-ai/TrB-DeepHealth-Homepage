import { Users, Brain } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/ui/status-badge";
import { useTheme } from "@/hooks/useTheme";
import { Conversation } from "@/data/mockData";

interface ConversationsSectionProps {
  conversations: Conversation[];
}

const ConversationsSection = ({ conversations }: ConversationsSectionProps) => {
  const { theme } = useTheme();

  return (
    <section
      id="conversations"
      className="py-20"
      aria-labelledby="conversations-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2
            id="conversations-heading"
            className={`h2-style font-bold ${theme.text} mb-4`}
            tabIndex={-1}
          >
            Research Conversations
          </h2>
          <p
            className={`text-xl ${theme.textSecondary} max-w-3xl mx-auto leading-relaxed`}
          >
            Review actual test conversations and their safety, empathy, and bias
            metrics.
          </p>
        </div>

        <div className="grid gap-8">
          {conversations.map((conversation) => (
            <Card
              key={conversation.id}
              className={`group card-glow transition-all duration-300 ${theme.surface} ${theme.border}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className={`text-xl ${theme.text} mb-2`}>
                      {conversation.scenario}
                    </CardTitle>
                    <div className="flex items-center gap-4 text-sm">
                      <span className={`font-medium ${theme.textSecondary}`}>
                        Model: {conversation.model}
                      </span>
                      <StatusBadge
                        variant={
                          conversation.status.includes("Excellent")
                            ? "success"
                            : conversation.status.includes("Flagged")
                              ? "warning"
                              : "info"
                        }
                        size="sm"
                      >
                        {conversation.status}
                      </StatusBadge>
                      <span className={`text-xs ${theme.textMuted}`}>
                        {conversation.metrics.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Metrics Display */}
                  <div className="flex gap-4">
                    <div className="text-center">
                      <div
                        className={`text-lg font-bold ${
                          conversation.metrics.safety >= 95
                            ? "text-green-600"
                            : conversation.metrics.safety >= 90
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {conversation.metrics.safety}
                      </div>
                      <div className={`text-xs ${theme.textMuted}`}>Safety</div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-lg font-bold ${
                          conversation.metrics.empathy >= 90
                            ? "text-green-600"
                            : conversation.metrics.empathy >= 80
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {conversation.metrics.empathy}
                      </div>
                      <div className={`text-xs ${theme.textMuted}`}>
                        Empathy
                      </div>
                    </div>
                    <div className="text-center">
                      <div
                        className={`text-lg font-bold ${
                          conversation.metrics.bias >= 95
                            ? "text-green-600"
                            : conversation.metrics.bias >= 90
                              ? "text-yellow-600"
                              : "text-red-600"
                        }`}
                      >
                        {conversation.metrics.bias}
                      </div>
                      <div className={`text-xs ${theme.textMuted}`}>
                        Bias Score
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {conversation.messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 ${
                      message.role === "assistant" ? "ml-6" : ""
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          message.role === "user"
                            ? `${theme.primarySolid} text-white`
                            : `${theme.accent} ${theme.textSecondary}`
                        }`}
                      >
                        {message.role === "user" ? (
                          <Users className="w-4 h-4 icon-dynamic" />
                        ) : (
                          <Brain className="w-4 h-4 icon-dynamic" />
                        )}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div
                        className={`px-4 py-3 rounded-lg ${
                          message.role === "user"
                            ? `${theme.primary} bg-opacity-10 border-l-4 border-opacity-50`
                            : `${theme.surface} border`
                        } ${theme.border}`}
                      >
                        <p
                          className={`text-sm leading-relaxed ${theme.textSecondary}`}
                        >
                          {message.content}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConversationsSection;
