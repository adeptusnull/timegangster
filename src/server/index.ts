import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { timeResource } from '../resources/time.js';
import { convertTimeTool } from '../tools/convert-time.js';
import { timeQueryPrompt } from '../prompts/time-query.js';

// Create an MCP server
const server = new McpServer({
  name: 'TimeGangster',
  version: '1.0.0'
});

// Register resources
server.resource(
  timeResource.name,
  timeResource.template,
  timeResource.handler
);

// Register tools
server.tool(
  convertTimeTool.name,
  convertTimeTool.schema,
  async (args) => {
    try {
      const result = await convertTimeTool.handler(args);
      return {
        content: result.content.map(item => ({
          type: 'text' as const,
          text: item.text
        }))
      };
    } catch (error) {
      console.error('Error in convert time tool:', error);
      throw error;
    }
  }
);

// Register prompts
server.prompt(
  timeQueryPrompt.name,
  timeQueryPrompt.schema,
  async (args) => {
    try {
      const result = await timeQueryPrompt.handler(args);
      return {
        messages: result.messages.map(msg => ({
          role: msg.role as 'user' | 'assistant',
          content: {
            type: 'text' as const,
            text: msg.content.text
          }
        }))
      };
    } catch (error) {
      console.error('Error in time query prompt:', error);
      throw error;
    }
  }
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport);