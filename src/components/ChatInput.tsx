
import React, { useState, useRef } from 'react';
import { Send, X, MessageSquarePlus } from 'lucide-react';
import FileUpload from './FileUpload';
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  onFileUpload: (file: File) => void;
};

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, onFileUpload }) => {
  const [message, setMessage] = useState('');
  const [showUpload, setShowUpload] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() || uploadedFile) {
      onSendMessage(message.trim());
      if (uploadedFile) {
        onFileUpload(uploadedFile);
        setUploadedFile(null);
      }
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleFileSelect = (file: File) => {
    setUploadedFile(file);
    setShowUpload(false);
  };

  const handleTextareaInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const removeFile = () => {
    setUploadedFile(null);
  };

  return (
    <div className="border-t bg-background p-4">
      {showUpload && (
        <div className="mb-4">
          <FileUpload onFileSelect={handleFileSelect} />
        </div>
      )}
      
      {uploadedFile && (
        <div className="mb-4 flex items-center gap-2 p-2 bg-muted rounded">
          <X className="h-5 w-5 text-primary" />
          <div className="overflow-hidden flex-1">
            <p className="text-sm font-medium truncate">{uploadedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {uploadedFile.type} • {(uploadedFile.size / 1024).toFixed(1)} KB
            </p>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={removeFile}
            className="h-8 w-8 rounded-full"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="relative">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleTextareaInput}
          onKeyDown={handleKeyDown}
          placeholder="What can I help with?"
          className="min-h-[60px] pr-16 resize-none py-5 pl-14 rounded-xl bg-muted"
          rows={1}
        />
        
        <div className="absolute left-4 bottom-4 flex items-center">
          <Button
            type="button"
            onClick={() => setShowUpload(!showUpload)}
            variant="ghost"
            size="icon"
            className="rounded-full"
          >
            <MessageSquarePlus className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="absolute right-3 bottom-3 flex space-x-2">
          <Button
            type="submit"
            className="rounded-full h-9 w-9 p-0 flex items-center justify-center bg-primary/90 text-white hover:bg-primary"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInput;
