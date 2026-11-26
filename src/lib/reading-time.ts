// Velite assumes 265 words per minute, too fast for posts that mix prose, code and music.
const WORDS_PER_MINUTE = 100;

export function readingMinutes(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}
