'use strict';

// Feature: pragya-path-improvements
const { validateInquiry, stripHtml } = require('../validator');
const fc = require('fast-check');

// ---------------------------------------------------------------------------
// Unit tests — stripHtml
// ---------------------------------------------------------------------------

describe('stripHtml', () => {
  test('removes a simple tag', () => {
    expect(stripHtml('<b>hello</b>')).toBe('hello');
  });

  test('removes multiple tags', () => {
    expect(stripHtml('<p>Hello <strong>world</strong></p>')).toBe('Hello world');
  });

  test('leaves plain text unchanged', () => {
    expect(stripHtml('no tags here')).toBe('no tags here');
  });

  test('returns empty string for empty input', () => {
    expect(stripHtml('')).toBe('');
  });

  test('handles self-closing tags', () => {
    expect(stripHtml('line1<br/>line2')).toBe('line1line2');
  });

  test('handles non-string input gracefully', () => {
    expect(stripHtml(null)).toBe('');
    expect(stripHtml(undefined)).toBe('');
  });
});

// ---------------------------------------------------------------------------
// Unit tests — validateInquiry
// ---------------------------------------------------------------------------

describe('validateInquiry', () => {
  const validBody = {
    name: 'Sita Sharma',
    email: 'sita@example.com',
    phone: '+977 9800000000',
    message: 'I would like to join the 200-hour RYT program.',
  };

  // --- Happy path ---

  test('returns valid:true for a fully valid submission', () => {
    const result = validateInquiry(validBody);
    expect(result.valid).toBe(true);
    expect(result.values).toBeDefined();
    expect(result.errors).toBeUndefined();
  });

  test('returns valid:true when phone is omitted', () => {
    const { phone, ...body } = validBody;
    const result = validateInquiry(body);
    expect(result.valid).toBe(true);
  });

  test('returns valid:true when phone is empty string', () => {
    const result = validateInquiry({ ...validBody, phone: '' });
    expect(result.valid).toBe(true);
  });

  test('sanitized values have HTML stripped', () => {
    const result = validateInquiry({
      name: '<b>Sita</b>',
      email: 'sita@example.com',
      message: 'I want to join the program today!',
      phone: '',
    });
    expect(result.valid).toBe(true);
    expect(result.values.name).toBe('Sita');
  });

  // --- Name validation ---

  test('rejects name shorter than 2 chars', () => {
    const result = validateInquiry({ ...validBody, name: 'A' });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBe('Name must be between 2 and 100 characters');
  });

  test('rejects empty name', () => {
    const result = validateInquiry({ ...validBody, name: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  test('accepts name of exactly 2 chars', () => {
    const result = validateInquiry({ ...validBody, name: 'Ab' });
    expect(result.valid).toBe(true);
  });

  test('accepts name of exactly 100 chars', () => {
    const result = validateInquiry({ ...validBody, name: 'A'.repeat(100) });
    expect(result.valid).toBe(true);
  });

  test('rejects name of 101 chars', () => {
    const result = validateInquiry({ ...validBody, name: 'A'.repeat(101) });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
  });

  // --- Email validation ---

  test('rejects empty email', () => {
    const result = validateInquiry({ ...validBody, email: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBe('Please enter a valid email address');
  });

  test('rejects email without @', () => {
    const result = validateInquiry({ ...validBody, email: 'notanemail' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  test('rejects email without domain TLD', () => {
    const result = validateInquiry({ ...validBody, email: 'user@domain' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeDefined();
  });

  test('accepts valid email with subdomain', () => {
    const result = validateInquiry({ ...validBody, email: 'user@mail.example.com' });
    expect(result.valid).toBe(true);
  });

  // --- Message validation ---

  test('rejects message shorter than 10 chars', () => {
    const result = validateInquiry({ ...validBody, message: 'Short' });
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBe('Message must be between 10 and 2000 characters');
  });

  test('accepts message of exactly 10 chars', () => {
    const result = validateInquiry({ ...validBody, message: 'A'.repeat(10) });
    expect(result.valid).toBe(true);
  });

  test('accepts message of exactly 2000 chars', () => {
    const result = validateInquiry({ ...validBody, message: 'A'.repeat(2000) });
    expect(result.valid).toBe(true);
  });

  test('rejects message of 2001 chars', () => {
    const result = validateInquiry({ ...validBody, message: 'A'.repeat(2001) });
    expect(result.valid).toBe(false);
    expect(result.errors.message).toBeDefined();
  });

  // --- Phone validation ---

  test('rejects phone with letters', () => {
    const result = validateInquiry({ ...validBody, phone: 'abc1234567' });
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBe(
      'Phone number must be 7–20 characters and contain only digits, spaces, +, -, (, )'
    );
  });

  test('rejects phone shorter than 7 chars', () => {
    const result = validateInquiry({ ...validBody, phone: '12345' });
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  test('rejects phone longer than 20 chars', () => {
    const result = validateInquiry({ ...validBody, phone: '1'.repeat(21) });
    expect(result.valid).toBe(false);
    expect(result.errors.phone).toBeDefined();
  });

  test('accepts phone with allowed special chars', () => {
    const result = validateInquiry({ ...validBody, phone: '+1 (800) 555-1234' });
    expect(result.valid).toBe(true);
  });

  // --- Multiple errors ---

  test('returns errors for every failing field', () => {
    const result = validateInquiry({ name: 'A', email: 'bad', message: 'short', phone: 'abc' });
    expect(result.valid).toBe(false);
    expect(result.errors.name).toBeDefined();
    expect(result.errors.email).toBeDefined();
    expect(result.errors.message).toBeDefined();
    expect(result.errors.phone).toBeDefined();
  });
});

// ---------------------------------------------------------------------------
// Property-Based Tests
// ---------------------------------------------------------------------------

// Helpers

// Generates a string of printable non-whitespace chars with the given length bounds.
// This avoids strings that trim to below the minimum length.
const nonBlankString = (minLength, maxLength) =>
  fc.stringMatching(new RegExp(`^[a-zA-Z0-9!@#$%^&*_=,.?]{${minLength},${maxLength}}$`));

const validEmail = () =>
  fc.tuple(
    fc.stringMatching(/^[a-zA-Z0-9]{1,10}$/),
    fc.stringMatching(/^[a-zA-Z0-9]{1,10}$/),
    fc.stringMatching(/^[a-zA-Z]{2,6}$/)
  ).map(([local, domain, tld]) => `${local}@${domain}.${tld}`);

const validPhone = () =>
  fc.oneof(
    fc.constant(''),
    fc.stringMatching(/^[0-9]{7,20}$/)
  );

const validInquiry = () =>
  fc.record({
    name: nonBlankString(2, 100),
    email: validEmail(),
    message: nonBlankString(10, 2000),
    phone: validPhone(),
  });

// ---------------------------------------------------------------------------
// Property 1 — Validator correctly classifies all inquiry inputs
// Feature: pragya-path-improvements, Property 1: Validator correctly classifies all inquiry inputs
// Validates: Requirements 2.1, 2.2, 2.3, 2.4, 2.5
// ---------------------------------------------------------------------------

describe('Property 1 — Validator correctly classifies all inquiry inputs', () => {
  test('valid inputs always produce valid:true', () => {
    fc.assert(
      fc.property(validInquiry(), (body) => {
        const result = validateInquiry(body);
        return result.valid === true;
      }),
      { numRuns: 100 }
    );
  });

  test('invalid name always produces an error for name', () => {
    fc.assert(
      fc.property(
        fc.record({
          // name with length < 2 or > 100
          name: fc.oneof(
            fc.constant(''),
            fc.constant('A'),
            fc.string({ minLength: 101, maxLength: 200 })
          ),
          email: validEmail(),
          message: fc.string({ minLength: 10, maxLength: 2000 }),
          phone: fc.constant(''),
        }),
        (body) => {
          const result = validateInquiry(body);
          return result.valid === false && typeof result.errors.name === 'string' && result.errors.name.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('invalid message always produces an error for message', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 2, maxLength: 100 }),
          email: validEmail(),
          // message with length < 10 or > 2000
          message: fc.oneof(
            fc.constant(''),
            fc.string({ minLength: 1, maxLength: 9 }),
            fc.string({ minLength: 2001, maxLength: 2100 })
          ),
          phone: fc.constant(''),
        }),
        (body) => {
          const result = validateInquiry(body);
          return result.valid === false && typeof result.errors.message === 'string' && result.errors.message.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  test('invalid phone (when non-empty) always produces an error for phone', () => {
    fc.assert(
      fc.property(
        fc.record({
          name: fc.string({ minLength: 2, maxLength: 100 }),
          email: validEmail(),
          message: fc.string({ minLength: 10, maxLength: 2000 }),
          // phone with letters (always invalid)
          phone: fc.stringMatching(/^[a-zA-Z]{7,15}$/),
        }),
        (body) => {
          const result = validateInquiry(body);
          return result.valid === false && typeof result.errors.phone === 'string' && result.errors.phone.length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 2 — HTML stripping is idempotent
// Feature: pragya-path-improvements, Property 2: HTML stripping is idempotent
// Validates: Requirements 2.6
// ---------------------------------------------------------------------------

describe('Property 2 — HTML stripping is idempotent', () => {
  test('stripHtml(stripHtml(s)) === stripHtml(s) for arbitrary strings', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        return stripHtml(stripHtml(s)) === stripHtml(s);
      }),
      { numRuns: 100 }
    );
  });
});

// ---------------------------------------------------------------------------
// Property 3 — Sanitized values contain no HTML tags
// Feature: pragya-path-improvements, Property 3: Sanitized values contain no HTML tags
// Validates: Requirements 2.6
// ---------------------------------------------------------------------------

describe('Property 3 — Sanitized values contain no HTML tags', () => {
  test('stripHtml output never contains /<[^>]+>/', () => {
    fc.assert(
      fc.property(fc.string(), (s) => {
        const result = stripHtml(s);
        return !/<[^>]+>/.test(result);
      }),
      { numRuns: 100 }
    );
  });
});
