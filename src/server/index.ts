import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "TimeGangster",
  version: "1.0.0"
});

// Basic error handling
server.on('error', (error) => {
  console.error('Server error:', error);
});

// Add a simple test tool
server.tool(
  "test",
  { message: z.string() },
  async ({ message }) => ({
    content: [{ type: "text", text: `Test successful: ${message}` }]
  })
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport); 