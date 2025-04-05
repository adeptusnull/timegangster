import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { timeResource } from "../resources/time.js";
import { convertTimeTool } from "../tools/convert-time.js";
import { timeQueryPrompt } from "../prompts/time-query.js";

// Create an MCP server
const server = new McpServer({
  name: "TimeGangster",
  version: "1.0.0"
});

// Basic error handling
server.on('error', (error) => {
  console.error('Server error:', error);
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
  convertTimeTool.handler
);

// Register prompts
server.prompt(
  timeQueryPrompt.name,
  timeQueryPrompt.schema,
  timeQueryPrompt.handler
);

// Start receiving messages on stdin and sending messages on stdout
const transport = new StdioServerTransport();
await server.connect(transport); 