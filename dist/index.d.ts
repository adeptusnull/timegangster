import { z } from 'zod';
import { Tool } from '@modelcontextprotocol/sdk/types.js';
export declare const timezoneSchema: z.ZodString;
export declare const timeSchema: z.ZodString;
export declare const getCurrentTimeTool: Tool;
export declare const convertTimeTool: Tool;
export declare function main(): Promise<void>;
