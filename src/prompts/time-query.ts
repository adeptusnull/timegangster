import { z } from 'zod';

export const timeQueryPrompt = {
  name: 'time-query',
  schema: {
    query: z.string(),
    timezone: z.string().optional()
  },
  handler: ({ query, timezone }: { query: string; timezone?: string }) => ({
    messages: [{
      role: 'user',
      content: {
        type: 'text',
        text: `Please help me with this time-related query: '${query}'${
          timezone ? ` in the timezone ${timezone}` : ''
        }.`
      }
    }]
  })
};