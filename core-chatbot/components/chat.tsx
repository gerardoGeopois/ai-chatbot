'use client';

import { useState } from 'react';
import { Messages } from './messages';
import { MultimodalInput } from './multimodal-input';
import { generateUUID } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';

export function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [status, setStatus] = useState<'ready' | 'streaming' | 'submitted'>('ready');

  const sendMessage = async (message: { role: string; content: string }) => {
    const userMessage: ChatMessage = {
      id: generateUUID(),
      role: 'user',
      content: message.content,
    };

    setMessages(prev => [...prev, userMessage]);
    setStatus('streaming');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('No response body');
      }

      const assistantMessage: ChatMessage = {
        id: generateUUID(),
        role: 'assistant',
        content: '',
      };

      setMessages(prev => [...prev, assistantMessage]);

      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;

        if (value) {
          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              try {
                const data = JSON.parse(line.slice(6));
                if (data.text) {
                  setMessages(prev => {
                    const newMessages = [...prev];
                    const lastMessage = newMessages[newMessages.length - 1];
                    if (lastMessage && lastMessage.role === 'assistant') {
                      lastMessage.content += data.text;
                    }
                    return newMessages;
                  });
                }
              } catch (e) {
                // Ignore parsing errors
              }
            }
          }
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: ChatMessage = {
        id: generateUUID(),
        role: 'assistant',
        content: 'Sorry, there was an error processing your message.',
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setStatus('ready');
    }
  };

  const stop = () => {
    setStatus('ready');
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Messages 
        messages={messages}
        status={status}
      />
      
      <MultimodalInput
        input={input}
        setInput={setInput}
        status={status}
        stop={stop}
        sendMessage={sendMessage}
        messages={messages}
      />
    </div>
  );
}
