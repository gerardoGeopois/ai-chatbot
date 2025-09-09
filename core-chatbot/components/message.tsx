'use client';

import { memo } from 'react';
import { SparklesIcon } from './icons';
import { cn, getTextFromMessage } from '@/lib/utils';
import type { ChatMessage } from '@/lib/types';

interface MessageProps {
  message: ChatMessage;
  isLoading?: boolean;
}

function PureMessage({ message, isLoading }: MessageProps) {
  const isUser = message.role === 'user';
  const content = getTextFromMessage(message);

  return (
    <div className="w-full group/message">
      <div
        className={cn('flex items-start gap-3 w-full', {
          'justify-end': isUser,
          'justify-start': !isUser,
        })}
      >
        {!isUser && (
          <div className="flex justify-center items-center rounded-full border border-gray-200 size-8 shrink-0 bg-white">
            <SparklesIcon size={14} />
          </div>
        )}

        <div
          className={cn('flex flex-col', {
            'max-w-[80%]': isUser,
            'w-full': !isUser,
          })}
        >
          <div
            className={cn('p-3 rounded-lg', {
              'bg-blue-600 text-white': isUser,
              'bg-gray-100 text-gray-900': !isUser,
            })}
          >
            {content}
            {isLoading && (
              <span className="inline-block w-2 h-5 ml-1 bg-current animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export const Message = memo(PureMessage);
