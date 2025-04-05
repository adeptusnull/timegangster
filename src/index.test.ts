/**
 * Basic test for TimeGangster
 */
import { main } from './index.js';

test('should run without errors', async () => {
  // Save original console.log
  const originalLog = console.log;
  
  // Mock console.log
  const logs: string[] = [];
  console.log = (...args: unknown[]) => {
    logs.push(args.join(' '));
  };
  
  try {
    // Run the main function
    await main();
    
    // Verify it logged something about time and timezone
    expect(logs.some(log => log.includes('Current time:'))).toBe(true);
    expect(logs.some(log => log.includes('Timezone:'))).toBe(true);
  } finally {
    // Restore console.log
    console.log = originalLog;
  }
});