import { transliterate } from '../lib/transliteration';

describe('transliterate', () => {
  it('transliterates simple english text to telugu', () => {
    expect(transliterate('namaste')).toContain('న');
    expect(transliterate('namaste')).toContain('మ');
  });

  it('returns an empty string for blank input', () => {
    expect(transliterate('')).toBe('');
  });

  it('preserves spaces and punctuation', () => {
    expect(transliterate('hello world.')).toContain(' ');
    expect(transliterate('hello world.')).toContain('।');
  });
});
