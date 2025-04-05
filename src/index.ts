import { DateTime } from 'luxon';
import { z } from 'zod';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { Tool } from '@modelcontextprotocol/sdk/types.js';

// Zod schemas for input validation
export const timezoneSchema = z.string().regex(/^[A-Za-z_]+\/[A-Za-z_]+$/);
export const timeSchema = z.string().regex(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/);

// Get current time tool
export const getCurrentTimeTool: Tool = {
  name: 'get_current_time',
  description: 'Get the current time in a specified timezone',
  inputSchema: {
    type: 'object',
    properties: {
      timezone: {
        type: 'string',
        description: 'Timezone identifier (e.g., "Europe/Warsaw")',
        pattern: '^[A-Za-z]+/[A-Za-z_]+$'
      }
    },
    required: []
  },
  handler: async (params: { timezone?: string }) => {
    const timezone = params.timezone || DateTime.local().zoneName;
    const now = DateTime.now().setZone(timezone);
    
    return {
      timezone,
      datetime: now.toISO(),
      is_dst: now.isInDST
    };
  }
};

// Convert time tool
export const convertTimeTool: Tool = {
  name: 'convert_time',
  description: 'Convert time between different timezones',
  inputSchema: {
    type: 'object',
    properties: {
      source_timezone: {
        type: 'string',
        description: 'Source timezone identifier',
        pattern: '^[A-Za-z]+/[A-Za-z_]+$'
      },
      time: {
        type: 'string',
        description: 'Time in HH:MM format',
        pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
      },
      target_timezone: {
        type: 'string',
        description: 'Target timezone identifier',
        pattern: '^[A-Za-z]+/[A-Za-z_]+$'
      }
    },
    required: ['source_timezone', 'time', 'target_timezone']
  },
  handler: async (params: { source_timezone: string; time: string; target_timezone: string }) => {
    const [hours, minutes] = params.time.split(':').map(Number);
    const today = DateTime.now().setZone(params.source_timezone);
    const sourceTime = today.set({ hour: hours, minute: minutes });
    const targetTime = sourceTime.setZone(params.target_timezone);
    const diffHours = targetTime.diff(sourceTime, 'hours').hours;
    
    return {
      source: {
        timezone: params.source_timezone,
        datetime: sourceTime.toISO(),
        is_dst: sourceTime.isInDST
      },
      target: {
        timezone: params.target_timezone,
        datetime: targetTime.toISO(),
        is_dst: targetTime.isInDST
      },
      time_difference: `${diffHours >= 0 ? '+' : ''}${diffHours.toFixed(1)}h`
    };
  }
};

// Create and start MCP server
export async function main(): Promise<void> {
  try {
    const server = new McpServer({
      name: 'mcp-time-dancer',
      version: '1.0.0',
      tools: [getCurrentTimeTool, convertTimeTool]
    });

    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.log('MCP server started successfully');
  } catch (error) {
    console.error('Failed to start MCP server:', error);
    process.exit(1);
  }
}

// Run as MCP server if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}