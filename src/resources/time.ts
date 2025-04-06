import { ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { DateTime } from 'luxon';

export const timeResource = {
  name: 'time',
  template: new ResourceTemplate('time://{timezone}', {
    list: undefined,
    complete: {
      timezone: async (value: string) => {
        const zones = DateTime.local().setZone(value).isValid
          ? [value]
          : [DateTime.local().zoneName];
        return zones;
      }
    }
  }),
  handler: async (uri: URL, variables: { [key: string]: string | string[] }) => {
    const timezone = variables.timezone as string;
    const now = DateTime.now().setZone(timezone);
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify({
          timezone,
          currentTime: now.toISO(),
          isDST: now.isInDST,
          offset: now.offset
        }, null, 2)
      }]
    };
  }
}; 