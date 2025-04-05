import { z } from "zod";
import { DateTime } from "luxon";

export const convertTimeTool = {
  name: "convert-time",
  schema: {
    sourceTimezone: z.string(),
    targetTimezone: z.string(),
    datetime: z.string()
  },
  handler: async ({ sourceTimezone, targetTimezone, datetime }: {
    sourceTimezone: string;
    targetTimezone: string;
    datetime: string;
  }) => {
    const sourceTime = DateTime.fromISO(datetime).setZone(sourceTimezone);
    if (!sourceTime.isValid) {
      throw new Error(`Invalid source timezone: ${sourceTimezone}`);
    }

    const targetTime = sourceTime.setZone(targetTimezone);
    if (!targetTime.isValid) {
      throw new Error(`Invalid target timezone: ${targetTimezone}`);
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify({
          source: {
            timezone: sourceTimezone,
            datetime: sourceTime.toISO(),
            isDST: sourceTime.isInDST,
            offset: sourceTime.offset
          },
          target: {
            timezone: targetTimezone,
            datetime: targetTime.toISO(),
            isDST: targetTime.isInDST,
            offset: targetTime.offset
          },
          difference: targetTime.diff(sourceTime).toObject()
        }, null, 2)
      }]
    };
  }
}; 