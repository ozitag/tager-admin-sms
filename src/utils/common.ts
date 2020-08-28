export function capitalizeWord(word: string): string {
  const letters = [...word.toLowerCase()];
  letters[0] = letters[0].toUpperCase();

  return letters.join('');
}
