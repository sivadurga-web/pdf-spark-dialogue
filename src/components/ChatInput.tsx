
import React, { useState } from 'react';
import { Send } from 'lucide-react';
import FileUpload from './FileUpload';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');
  const [showUpload, setShowUpload] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleFileSelect = (file: File) => {
    onFileUpload(file);
    setShowUpload(false);
  };

  return (
    <div className="border-t bg-background p-4">
      {showUpload && (
        <div className="mb-4">
          <FileUpload onFileSelect={handleFileSelect} />
        </div>
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => setShowUpload(!showUpload)}
          className="p-2 rounded-full hover:bg-muted transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-gray-500"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
            <polyline points="17 8 12 3 7 8"></polyline>
            <line x1="12" y1="3" x2="12" y2="15"></line>
          </svg>
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow rounded-full border border-input px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
        <button
          type="submit"
          className="p-2 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors"
          disabled={!message.trim()}
        >
          <Send className="h-5 w-5" />
        </button>
      </form>
    </div>
  );
};

export default ChatInput;
