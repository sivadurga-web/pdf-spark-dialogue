
import React from 'react';
import { cn } from '@/lib/utils';
import { File } from 'lucide-react';

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
      <div className={cn('max-w-md rounded-lg px-4 py-2 mb-2', {
        'bg-primary text-primary-foreground': isUserMessage,
        'bg-muted': !isUserMessage,
      })}>
        {file && (
          <div className="flex items-center gap-2 p-2 bg-background/20 rounded mb-2">
            <File className="h-5 w-5" />
            <div className="overflow-hidden">
              <p className="text-sm font-medium truncate">{file.name}</p>
              <p className="text-xs opacity-70">{formatFileSize(file.size)}</p>
            </div>
          </div>
        )}
        <p className="text-sm">{message}</p>
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
