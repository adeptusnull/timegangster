/**
 * Basic test for TimeGangster
 */
import { describe, beforeEach, it, expect, jest } from '@jest/globals';
import { main, getCurrentTimeTool, convertTimeTool } from './index.js';
describe('TimeGangster', () => {
    beforeEach(() => {
        // Save original console.log
        jest.spyOn(console, 'log').mockImplementation(() => { });
    });
    it('should run main function without errors', async () => {
        // Run the main function
        await main();
        // Verify it logged something
        expect(console.log).toHaveBeenCalledWith(expect.stringContaining('MCP server started'));
    });
    it('should get current time', async () => {
        const handler = getCurrentTimeTool.handler;
        const response = await handler({ timezone: 'Europe/Warsaw' });
        expect(response).toHaveProperty('timezone');
        expect(response).toHaveProperty('datetime');
        expect(response).toHaveProperty('is_dst');
    });
    it('should convert time between timezones', async () => {
        const handler = convertTimeTool.handler;
        const response = await handler({
            source_timezone: 'America/New_York',
            time: '16:30',
            target_timezone: 'Asia/Tokyo'
        });
        expect(response).toHaveProperty('source');
        expect(response).toHaveProperty('target');
        expect(response).toHaveProperty('time_difference');
    });
});
