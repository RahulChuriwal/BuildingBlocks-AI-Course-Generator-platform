"use client";

import React, { useState } from "react";
import { SendHorizonal } from "lucide-react";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";

function AiToolsPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Service not available. Please try again later.",
        },
      ]);
      setLoading(false);
    }, 500);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-orange-500">Ask Our AI Assistant</h2>

      <div className="bg-white rounded-xl border shadow-md h-[600px] p-4 flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.role === "user"
                  ? "bg-orange-100 self-end"
                  : "bg-gray-100 self-start"
              }`}
            >
              {msg.content}
            </div>
          ))}
          {loading && <div className="text-sm text-gray-500">Thinking...</div>}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask me anything..."
            className="flex-1"
          />
          <Button className="bg-orange-500 text-white" onClick={handleSend}>
            <SendHorizonal className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AiToolsPage;
