'use client';

import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { SendIcon, StopIcon } from './icons';
import { cn } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';

interface MultimodalInputProps {
  input: string;
  setInput: (value: string) => void;
  status: 'ready' | 'streaming' | 'submitted';
  stop: () => void;
  sendMessage: (message: any) => void;
  messages: ChatMessage[];
}

export function MultimodalInput({
  input,
  setInput,
  status,
  stop,
  sendMessage,
  messages,
}: MultimodalInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'ready' || !input.trim()) return;

    sendMessage({
      role: 'user',
      content: input,
    });

    setInput('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e as any);
    }
  };

  const handleStop = () => {
    stop();
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [input]);

  const isStreaming = status === 'streaming' || status === 'submitted';

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="flex gap-2 items-end">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message..."
              className={cn(
                'min-h-[44px] max-h-[200px] resize-none',
                'focus:ring-blue-500 focus:border-blue-500'
              )}
              rows={1}
              disabled={isStreaming}
            />
          </div>
          
          {isStreaming ? (
            <Button
              type="button"
              onClick={handleStop}
              variant="outline"
              size="icon"
              className="h-[44px] w-[44px] shrink-0"
            >
              <StopIcon size={16} />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={!input.trim() || isStreaming}
              size="icon"
              className="h-[44px] w-[44px] shrink-0"
            >
              <SendIcon size={16} />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
