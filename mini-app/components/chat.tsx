"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Chat() {
  const [messages, setMessages] = useState<
    { id: number; text: string; sender: "user" | "bot" }[]
  >([]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), text: input, sender: "user" as const };
    setMessages((prev) => [...prev, userMsg]);

    // Simple echo bot response
    const botMsg = {
      id: Date.now() + 1,
      text: `You said: ${input}`,
      sender: "bot" as const,
    };
    setMessages((prev) => [...prev, botMsg]);

    setInput("");
  };

  return (
    <Card className="w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Chat Anywhere</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <ScrollArea className="h-64 rounded-md border p-2">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-md p-2 ${
                  msg.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </CardContent>
    </Card>
  );
}
