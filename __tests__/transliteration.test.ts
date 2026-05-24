import { transliterate } from '../lib/transliteration';

describe('transliterate', () => {
  it('transliterates simple english text to telugu using library rules', () => {
    expect(transliterate('namaste')).toBe('నమస్తే');
    expect(transliterate('telugu')).toBe('తేలుగు');
  });

  it('returns an empty string for blank input', () => {
    expect(transliterate('')).toBe('');
  });

  it('preserves spaces and punctuation', () => {
    const result = transliterate('hello world.');
    expect(result).toContain(' ');
    expect(result).toContain('।');
  });
});
