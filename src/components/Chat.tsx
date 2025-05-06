
import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { Message } from '@/types/message';
import { useToast } from '@/components/ui/use-toast';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: 'Hello! Upload an invoice PDF or ask me a question about invoices.',
      isUserMessage: false,
      timestamp: new Date().toLocaleTimeString(),
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      isUserMessage: true,
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    processUserMessage(content);
  };

  const processUserMessage = (content: string) => {
    // Simulate AI response after a short delay
    setTimeout(() => {
      const responseMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I received your question: "${content}". Let me analyze that for you.`,
        isUserMessage: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, responseMessage]);
    }, 1000);
  };

  const handleFileUpload = (file: File) => {
    // Create message for file upload
    const fileMessage: Message = {
      id: Date.now().toString(),
      content: `Uploaded invoice for processing`,
      isUserMessage: true,
      timestamp: new Date().toLocaleTimeString(),
      file: {
        name: file.name,
        type: file.type,
        size: file.size,
      },
    };

    setMessages((prev) => [...prev, fileMessage]);
    toast({
      title: "Invoice uploaded",
      description: `${file.name} has been uploaded for processing.`,
    });

    // Simulate processing response
    setTimeout(() => {
      const processingMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I'm analyzing the invoice "${file.name}". Here's what I found:
        
Invoice #: INV-2023-001
Date: May 5, 2025
Amount: $1,250.00
Vendor: ABC Company
        
Would you like me to extract more details or explain any part of this invoice?`,
        isUserMessage: false,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, processingMessage]);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-w-2 scrollbar-thumb-blue scrollbar-track-blue-lighter scrollbar-thumb-rounded">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message.content}
            isUserMessage={message.isUserMessage}
            timestamp={message.timestamp}
            file={message.file}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <ChatInput 
        onSendMessage={handleSendMessage} 
        onFileUpload={handleFileUpload} 
      />
    </div>
  );
};

export default Chat;
