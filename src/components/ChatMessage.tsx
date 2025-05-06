
import React from 'react';
import { cn } from '@/lib/utils';

type ChatMessageProps = {
  message: string;
  isUserMessage: boolean;
  timestamp?: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isUserMessage, timestamp }) => {
  return (
    <div className={cn('flex', {
      'justify-end': isUserMessage,
      'justify-start': !isUserMessage,
    })}>
      <div className={cn('max-w-md rounded-lg px-4 py-2 mb-2', {
        'bg-primary text-primary-foreground': isUserMessage,
        'bg-muted': !isUserMessage,
      })}>
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
