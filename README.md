# MCP Time Dancer

A Model Context Protocol (MCP) server that provides time-related functionalities, including fetching the current time in specified timezones and converting time between different timezones.

## Features

- Get current time in any timezone
- Convert time between different timezones
- Support for DST (Daylight Saving Time) awareness
- ISO 8601 compliant datetime output

## Installation

```bash
npm install
```

## Usage

### Starting the Server

```bash
# Start with default settings
npm start

# Start with custom timezone
LOCAL_TIMEZONE=America/New_York npm start

# Start with custom host and port
MCP_HOST=0.0.0.0 MCP_PORT=3000 npm start
```

### Available Tools

#### Get Current Time

```json
{
  "name": "get_current_time",
  "arguments": {
    "timezone": "Europe/Warsaw"  // Optional
  }
}
```

Response:
```json
{
  "timezone": "Europe/Warsaw",
  "datetime": "2024-01-01T13:00:00+01:00",
  "is_dst": false
}
```

#### Convert Time

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

Response:
```json
{
  "source": {
    "timezone": "America/New_York",
    "datetime": "YYYY-MM-DDTH16:30:00-05:00",
    "is_dst": false
  },
  "target": {
    "timezone": "Asia/Tokyo",
    "datetime": "YYYY-MM-DDTH06:30:00+09:00",
    "is_dst": false
  },
  "time_difference": "+14.0h"
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

## License

ISC