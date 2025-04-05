import { ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { DateTime } from "luxon";

export const timeResource = {
  name: "time",
  template: new ResourceTemplate("time://{timezone}", {
    list: undefined,
    complete: {
      timezone: async (value: string) => {
        const zones = DateTime.local().setZone(value).isValid
          ? [value]
          : DateTime.local().zoneNames;
        return zones;
      }
    }
  }),
  handler: async (uri: URL, { timezone }: { timezone: string }) => {
    const now = DateTime.now().setZone(timezone);
    return {
      contents: [{
        uri: uri.href,
        text: JSON.stringify({
          timezone: timezone,
          currentTime: now.toISO(),
          isDST: now.isInDST,
          offset: now.offset
        }, null, 2)
      }]
    };
  }
}; 