export type MessageMetadata = {
  createdAt: string;
};

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  metadata?: MessageMetadata;
}

export interface Attachment {
  name: string;
  url: string;
  contentType: string;
}
