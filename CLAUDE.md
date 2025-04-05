# MCP TypeScript SDK Guide

## Build & Test Commands
```bash
npm run build        # Build ESM and CJS versions
npm run lint         # Run ESLint
npm test             # Run all tests
npx jest path/to/file.test.ts  # Run specific test file
npx jest -t "test name"        # Run tests matching pattern
```

## Code Style Guidelines
- **TypeScript**: Strict type checking, ES modules, explicit return types
- **Naming**: PascalCase for classes/types, camelCase for functions/variables
- **Files**: Lowercase with hyphens, test files with `.test.ts` suffix
- **Imports**: ES module style, include `.js` extension, group imports logically
- **Error Handling**: Use TypeScript's strict mode, explicit error checking in tests
- **Formatting**: 2-space indentation, semicolons required, single quotes preferred
- **Testing**: Co-locate tests with source files, use descriptive test names
- **Comments**: JSDoc for public APIs, inline comments for complex logic

## Project Structure
- `/src`: Source code with MCP server implementation
- Tests alongside source files with `.test.ts` suffix

## Dependencies and API
- `@modelcontextprotocol/sdk`: Core MCP server implementation
- `luxon`: For robust date, time, and timezone manipulation
- `zod`: For input validation
- `typescript`: For type safety
- `@types/node`: For Node.js type definitions
- `ts-node`: For running TypeScript directly

## MCP Server Implementation
- Use `@modelcontextprotocol/sdk` for server implementation
- Implement MCP tool discovery (`tools/list`) and invocation (`tools/call`)
- Define tools with clear input/output schemas using Zod
- Handle timezone operations using Luxon
- Support ISO 8601 compliant date/time formats

## Architecture Guidelines
- No web frameworks (Express, Koa, Next.js, etc.)
- Pure MCP server implementation using `@modelcontextprotocol/sdk`
- Focus on tool-based architecture for time operations
- Implement proper error handling and validation
- Support timezone-aware operations
- Ensure thread safety for concurrent tool invocations

## Testing Strategy
- Unit tests for individual tools
- Integration tests for MCP server functionality
- Use MCP inspector for end-to-end testing
- Test timezone edge cases and DST transitions
- Validate ISO 8601 compliance

## Documentation Requirements
- JSDoc comments for all public APIs
- Clear tool descriptions and examples
- Timezone handling documentation
- Error handling guidelines
- Testing procedures

## MCP Server Functionality
- Get current time and date based on the MCP server host's timezone
- Support timezone conversion and manipulation
- Provide ISO 8601 compliant time representations
- Handle daylight saving time transitions

# Architecture Review Decisions
Log the project status, app desciscion changes, status updates, and the overall structure.
Log this file in /logs/ard/ardlog.md
Use  logs/ard/template.md for format requirements.




