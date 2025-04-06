import { Transport } from '@modelcontextprotocol/sdk/shared/transport.js';
import { JSONRPCMessage } from '@modelcontextprotocol/sdk/types.js';

export class MockTransport implements Transport {
  private isStarted = false;
  private responsePromise: Promise<JSONRPCMessage> | undefined;
  private resolveResponse: ((message: JSONRPCMessage) => void) | undefined;

  async start(): Promise<void> {
    this.isStarted = true;
  }

  async send(message: JSONRPCMessage): Promise<void> {
    if (this.resolveResponse) {
      this.resolveResponse(message);
      this.resolveResponse = undefined;
      this.responsePromise = undefined;
    }
  }

  async close(): Promise<void> {
    this.isStarted = false;
    this.onclose?.();
  }

  onclose?: () => void;
  onerror?: (error: Error) => void;
  onmessage?: (message: JSONRPCMessage) => void;
  sessionId?: string = 'test-session';

  // Helper method for tests
  async sendRequest(request: JSONRPCMessage): Promise<JSONRPCMessage> {
    if (!this.isStarted) {
      throw new Error('Transport not started');
    }

    this.responsePromise = new Promise((resolve) => {
      this.resolveResponse = resolve;
    });

    this.onmessage?.(request);
    return this.responsePromise;
  }
} 