import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeEmail } from '../utils/email.js';

test('normalizeEmail trims and lowercases email addresses', () => {
  assert.equal(normalizeEmail('  User@Example.COM  '), 'user@example.com');
  assert.equal(normalizeEmail('user@example.com'), 'user@example.com');
});
