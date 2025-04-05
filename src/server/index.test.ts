import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { MockTransport } from "./mock-transport.js";
import { timeResource } from "../resources/time.js";
import { convertTimeTool } from "../tools/convert-time.js";
import { timeQueryPrompt } from "../prompts/time-query.js";

describe('MCP Server', () => {
  let server: McpServer;
  let transport: MockTransport;

  beforeEach(async () => {
    server = new McpServer({
      name: "TimeGangster",
      version: "1.0.0"
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

    // Connect to transport
    transport = new MockTransport();
    await server.connect(transport);
  });

  afterEach(async () => {
    await server.close();
  });

  it('should handle time resource correctly', async () => {
    const response = await transport.sendRequest({
      jsonrpc: "2.0",
      id: "1",
      method: "resources/read",
      params: {
        uri: "time://UTC"
      }
    });
    
    expect(response).toBeDefined();
    expect(response).toHaveProperty('result');
    expect(response.result).toHaveProperty('contents');
    const content = JSON.parse(response.result.contents[0].text);
    expect(content.timezone).toBe("UTC");
    expect(content).toHaveProperty('currentTime');
    expect(content).toHaveProperty('isDST');
    expect(content).toHaveProperty('offset');
  });

  it('should handle time conversion tool correctly', async () => {
    const response = await transport.sendRequest({
      jsonrpc: "2.0",
      id: "1",
      method: "tools/call",
      params: {
        name: "convert-time",
        arguments: {
          sourceTimezone: "UTC",
          targetTimezone: "America/New_York",
          datetime: "2024-01-01T12:00:00Z"
        }
      }
    });
    
    expect(response).toBeDefined();
    expect(response).toHaveProperty('result');
    expect(response.result).toHaveProperty('content');
    const content = JSON.parse(response.result.content[0].text);
    expect(content.source.timezone).toBe("UTC");
    expect(content.target.timezone).toBe("America/New_York");
    expect(content).toHaveProperty('difference');
  });

  it('should handle time query prompt correctly', async () => {
    const response = await transport.sendRequest({
      jsonrpc: "2.0",
      id: "1",
      method: "prompts/get",
      params: {
        name: "time-query",
        arguments: {
          query: "What time is it?",
          timezone: "UTC"
        }
      }
    });
    
    expect(response).toBeDefined();
    expect(response).toHaveProperty('result');
    expect(response.result).toHaveProperty('messages');
    expect(response.result.messages[0].content.text).toContain("What time is it?");
    expect(response.result.messages[0].content.text).toContain("UTC");
  });
}); 