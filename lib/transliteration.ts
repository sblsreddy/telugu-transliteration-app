import Sanscript from 'sanscript';

const fallbackMap: [string, string][] = [
  ['aa', 'ఆ'],
  ['ai', 'ఐ'],
  ['au', 'ఔ'],
  ['ee', 'ఈ'],
  ['oo', 'ఊ'],
  ['kh', 'ఖ'],
  ['gh', 'ఘ'],
  ['ch', 'చ'],
  ['jh', 'ఝ'],
  ['th', 'థ'],
  ['dh', 'ధ'],
  ['ph', 'ఫ'],
  ['bh', 'భ'],
  ['sh', 'శ'],
  ['ss', 'ష'],
  ['ng', 'ఙ'],
  ['ny', 'ఞ'],
  ['ksh', 'క్ష'],
  ['q', 'క'],
  ['x', 'క్స'],
  ['a', 'అ'],
  ['b', 'బ'],
  ['c', 'క'],
  ['d', 'ద'],
  ['e', 'ఎ'],
  ['f', 'ఫ'],
  ['g', 'గ'],
  ['h', 'హ'],
  ['i', 'ఇ'],
  ['j', 'జ'],
  ['k', 'క'],
  ['l', 'ల'],
  ['m', 'మ'],
  ['n', 'న'],
  ['o', 'ఓ'],
  ['p', 'ప'],
  ['r', 'ర'],
  ['s', 'స'],
  ['t', 'ట'],
  ['u', 'ఉ'],
  ['v', 'వ'],
  ['w', 'వ'],
  ['y', 'య'],
  ['z', 'జ'],
  [' ', ' '],
  ['.', '।'],
  [',', ','],
];

const fallbackSorted = fallbackMap.sort((a, b) => b[0].length - a[0].length);

function fallbackTransliterate(text: string): string {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return '';

  let result = '';
  let index = 0;

  while (index < normalized.length) {
    let matched = false;

    for (const [latin, telugu] of fallbackSorted) {
      if (normalized.startsWith(latin, index)) {
        result += telugu;
        index += latin.length;
        matched = true;
        break;
      }
    }

    if (!matched) {
      result += normalized[index];
      index += 1;
    }
  }

  return result;
}

export function transliterate(text: string): string {
  const normalized = text.trim();
  if (!normalized) return '';

  try {
    const result = Sanscript.t(normalized, 'itrans', 'telugu');
    if (/[\u0C00-\u0C7F]/.test(result)) {
      return result;
    }

    return fallbackTransliterate(normalized);
  } catch (error) {
    console.error('Transliteration library failed:', error);
    return fallbackTransliterate(normalized);
  }
}
