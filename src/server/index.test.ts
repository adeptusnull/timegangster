import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { MockTransport } from "./mock-transport.js";

describe('MCP Server', () => {
  let server: McpServer;
  let transport: MockTransport;

  beforeEach(async () => {
    server = new McpServer({
      name: "TimeGangster",
      version: "1.0.0"
    });

    // Add test tool
    server.tool(
      "test",
      { message: z.string() },
      async ({ message }) => ({
        content: [{ type: "text", text: `Test successful: ${message}` }]
      })
    );

    // Connect to transport
    transport = new MockTransport();
    await server.connect(transport);
  });

  afterEach(async () => {
    await server.close();
  });

  it('should handle test tool correctly', async () => {
    const testMessage = "Hello, World!";
    const response = await transport.sendRequest({
      jsonrpc: "2.0",
      id: "1",
      method: "tools/call",
      params: {
        name: "test",
        arguments: { message: testMessage }
      }
    });
    
    expect(response).toBeDefined();
    expect(response).toHaveProperty('result');
    expect(response.result).toHaveProperty('content');
    expect(response.result.content[0].text).toBe(`Test successful: ${testMessage}`);
  });
}); 