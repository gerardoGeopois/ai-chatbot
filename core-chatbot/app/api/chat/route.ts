import { streamText } from 'ai';
import { gateway } from '@ai-sdk/gateway';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const result = streamText({
      model: gateway.languageModel('xai/grok-2-vision-1212'),
      messages: messages.map((msg: any) => ({
        role: msg.role,
        content: msg.content
      })),
    });

    return result.toTextStreamResponse();
  } catch (error) {
    console.error('Chat API Error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
