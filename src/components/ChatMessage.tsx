
import React from 'react';
import { cn } from '@/lib/utils';
import { FileText, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ChatMessageProps = {
  message: string;
  isUserMessage: boolean;
  timestamp?: string;
  file?: {
    name: string;
    type: string;
    size: number;
  };
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUserMessage, timestamp, file }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' bytes';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className={cn('flex', {
      'justify-end': isUserMessage,
      'justify-start': !isUserMessage,
    })}>
      <div className={cn('max-w-3xl rounded-lg px-4 py-3 mb-2', {
        'bg-primary/90 text-primary-foreground': isUserMessage,
        'bg-muted text-foreground': !isUserMessage,
      })}>
        {file && (
          <div className="flex items-center gap-2 p-2 bg-background/20 rounded mb-3">
            <div className="bg-rose-500/90 text-white p-2 rounded">
              <FileText className="h-5 w-5" />
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs opacity-70">{file.type} • {formatFileSize(file.size)}</p>
            </div>
          </div>
        )}
        <p className="text-sm whitespace-pre-wrap">{message}</p>
        {timestamp && (
          <span className="text-xs text-muted-foreground block mt-1">
            {timestamp}
          </span>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
