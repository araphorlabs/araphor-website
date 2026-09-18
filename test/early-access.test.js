import assert from 'node:assert/strict';
import test from 'node:test';

import handler from '../api/early-access.js';

function responseRecorder() {
  return {
    headers: {},
    statusCode: 200,
    body: undefined,
    setHeader(name, value) {
      this.headers[name] = value;
    },
    status(statusCode) {
      this.statusCode = statusCode;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    },
    end() {
      return this;
    },
  };
}

test('early-access requests validate and notify the configured inbox', async (context) => {
  const invalidResponse = responseRecorder();
  await handler({ method: 'POST', body: { email: 'not-an-email' } }, invalidResponse);
  assert.equal(invalidResponse.statusCode, 400);

  const originalEnvironment = {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EARLY_ACCESS_FROM_EMAIL: process.env.EARLY_ACCESS_FROM_EMAIL,
    EARLY_ACCESS_TO_EMAIL: process.env.EARLY_ACCESS_TO_EMAIL,
  };
  context.after(() => Object.assign(process.env, originalEnvironment));
  Object.assign(process.env, {
    RESEND_API_KEY: 'test-key',
    EARLY_ACCESS_FROM_EMAIL: 'Araphor <website@araphor.com>',
    EARLY_ACCESS_TO_EMAIL: 'founder@example.com',
  });

  context.mock.method(globalThis, 'fetch', async (_url, options) => {
    const notification = JSON.parse(options.body);
    assert.deepEqual(notification.to, ['founder@example.com']);
    assert.equal(notification.reply_to, 'Founder@Example.org');
    return { ok: true };
  });

  const validResponse = responseRecorder();
  await handler({ method: 'POST', body: { email: ' Founder@Example.org ' } }, validResponse);
  assert.equal(validResponse.statusCode, 200);
  assert.deepEqual(validResponse.body, { ok: true });
});
