const mapping: [string, string][] = [
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
  ['q', 'క'],
  ['r', 'ర'],
  ['s', 'స'],
  ['t', 'ట'],
  ['u', 'ఉ'],
  ['v', 'వ'],
  ['w', 'వ'],
  ['x', 'క్ష'],
  ['y', 'య'],
  ['z', 'జ'],
  [' ', ' '],
  ['.', '।'],
  [',', ',' ],
];

export function transliterate(text: string): string {
  const normalized = text.trim().toLowerCase();
  if (!normalized) return '';

  let result = '';
  let index = 0;

  while (index < normalized.length) {
    let matched = false;
    for (const [latin, telugu] of mapping) {
      if (latin.length === 0) continue;
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
