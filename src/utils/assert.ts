export function assert(
  condition: any,
  message: Error | Response | string = 'Assertion failed',
): asserts condition {
  if (typeof condition === 'function' ? condition() : condition) {
    return;
  }

  if (message instanceof Error || message instanceof Response) {
    throw message;
  }

  throw new Error(message);
}
