
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

  const handleSendMessage = (content: string, file?: File) => {
    if (!content && !file) return;
    
    // Create a single message with both text and file
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
    
    // Generate AI response
    setTimeout(() => {
      let responseContent = '';
      
      if (file) {
        responseContent = `I'm analyzing the invoice "${file.name}". Here's what I found:
        
Invoice #: INV-2023-001
Date: May 5, 2025
Amount: $1,250.00
Vendor: ABC Company
        
Would you like me to extract more details or explain any part of this invoice?`;
      } else {
        responseContent = `I received your question: "${content}". Let me analyze that for you.`;
      }
      
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        isUserMessage: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      
      setMessages((prev) => [...prev, responseMessage]);
    }, 1500);
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
