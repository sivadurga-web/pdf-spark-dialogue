import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message } from '@/types/message';
import { useToast } from '@/components/ui/use-toast';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (content: string, file?: File) => {
    console.log("Preparing to send message...");
    if (!content && !file) return;

    // Add user message
    const newMessage: Message = {
      id: Date.now().toString(),
      content: content || "Uploaded invoice for processing",
      isUserMessage: true,
      timestamp: new Date().toLocaleTimeString(),
      file: file ? {
        name: file.name,
        type: file.type,
        size: file.size,
      } : undefined,
    };

    setMessages((prev) => [...prev, newMessage]);

    if (file) {
      toast({
        title: "Invoice uploaded",
        description: `${file.name} has been uploaded for processing.`,
      });
    }

    // Call API and handle response
    try {
      const formData = new FormData();
      formData.append("text", content);
      if (file) {
        formData.append("document", file);
      }

      console.log("Calling API with formData...");
      const response = await fetch("http://localhost:8000/api/process_invoice", {
        method: "POST",
        body: formData,
      });
      console.log("API response status:", response.status, response.body);
      if (!response.ok) {
        throw new Error("Failed to fetch response from API");
      }

      const data = await response.json();
      console.log("Received response from API:", data);

      // Add API response message
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message || "Received response from API",
        isUserMessage: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages((prev) => [...prev, responseMessage]);
    } catch (error) {
      console.error("Error sending to API:", error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-w-2 scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-thumb-rounded">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center">
            <h2 className="text-3xl font-semibold text-white/70">What can I help with?</h2>
          </div>
        ) : (
          messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message.content}
              isUserMessage={message.isUserMessage}
              timestamp={message.timestamp}
              file={message.file}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default Chat;
