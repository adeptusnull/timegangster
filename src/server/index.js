"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mcp_js_1 = require("@modelcontextprotocol/sdk/server/mcp.js");
var stdio_js_1 = require("@modelcontextprotocol/sdk/server/stdio.js");
var time_js_1 = require("../resources/time.js");
var convert_time_js_1 = require("../tools/convert-time.js");
var time_query_js_1 = require("../prompts/time-query.js");
// Create an MCP server
var server = new mcp_js_1.McpServer({
    name: "TimeGangster",
    version: "1.0.0"
});
// Basic error handling
server.on('error', function (error) {
    console.error('Server error:', error);
});
// Register resources
server.resource(time_js_1.timeResource.name, time_js_1.timeResource.template, time_js_1.timeResource.handler);
// Register tools
server.tool(convert_time_js_1.convertTimeTool.name, convert_time_js_1.convertTimeTool.schema, convert_time_js_1.convertTimeTool.handler);
// Register prompts
server.prompt(time_query_js_1.timeQueryPrompt.name, time_query_js_1.timeQueryPrompt.schema, time_query_js_1.timeQueryPrompt.handler);
// Start receiving messages on stdin and sending messages on stdout
var transport = new stdio_js_1.StdioServerTransport();
await server.connect(transport);
