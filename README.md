# MCP TimeGangster

A Node.js MCP (Model Context Protocol) server for time-related functionalities and timezone conversions. This package allows LLMs to:

1. Get the current time in any timezone
2. Convert times between different timezones

## Features

- Get current time in any timezone
- Convert time between different timezones
- Support for DST (Daylight Saving Time) awareness
- ISO 8601 compliant datetime output

## Installation

```bash
# Install globally
npm install -g mcp-timegangster

# Or as a dependency in your project
npm install mcp-timegangster
```

## Usage

### As a CLI tool

```bash
# Start the MCP server
timegangster
```

### As a module in your project

```javascript
import { main, getCurrentTimeTool, convertTimeTool } from 'mcp-timegangster';

// Start the MCP server
main();

// Or use the tools directly in your own MCP server
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';

const server = new McpServer({
  name: 'your-server-name',
  version: '1.0.0',
  tools: [getCurrentTimeTool, convertTimeTool]
});
```

## Available Tools

### 1. get_current_time

Get the current time in a specified timezone.

```json
{
  "name": "get_current_time",
  "arguments": {
    "timezone": "Europe/Warsaw"  // Optional
  }
}
```

**Output:**
```json
{
  "timezone": "Europe/Warsaw",
  "datetime": "2025-04-05T15:30:45.123+02:00",
  "is_dst": true
}
```

### 2. convert_time

Convert time between different timezones.

```json
{
  "name": "convert_time",
  "arguments": {
    "source_timezone": "America/New_York",
    "time": "16:30",
    "target_timezone": "Asia/Tokyo"
  }
}
```

**Output:**
```json
{
  "source": {
    "timezone": "America/New_York",
    "datetime": "2025-04-05T16:30:00.000-04:00",
    "is_dst": true
  },
  "target": {
    "timezone": "Asia/Tokyo",
    "datetime": "2025-04-06T05:30:00.000+09:00", 
    "is_dst": false
  },
  "time_difference": "+13.0h"
}
```

## Development

### Building

```bash
npm run build
```

### Testing

```bash
npm test
```

### Linting

```bash
npm run lint
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.