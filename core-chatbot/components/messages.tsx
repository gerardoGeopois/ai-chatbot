'use client';

import { memo, useEffect, useRef } from 'react';
import { Message } from './message';
import { Greeting } from './greeting';
import type { ChatMessage } from '@/lib/types';

interface MessagesProps {
  messages: ChatMessage[];
  status: 'ready' | 'streaming' | 'submitted';
}

function PureMessages({ messages, status }: MessagesProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (status === 'streaming' || status === 'submitted') {
      scrollToBottom();
    }
  }, [messages.length, status]);

  return (
    <div className="flex-1 overflow-y-auto p-4">
      <div className="max-w-4xl mx-auto space-y-4">
        {messages.length === 0 && <Greeting />}
        
        {messages.map((message, index) => (
          <Message
            key={message.id}
            message={message}
            isLoading={
              status === 'streaming' && 
              index === messages.length - 1 && 
              message.role === 'assistant'
            }
          />
        ))}
        
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
}

export const Messages = memo(PureMessages);
