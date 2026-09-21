export function shuffleForDisplay<T>(values: readonly T[], random: () => number = Math.random): T[] {
  const shuffled = [...values];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    const currentValue = shuffled[index];
    const swapValue = shuffled[swapIndex];

    if (currentValue !== undefined && swapValue !== undefined) {
      shuffled[index] = swapValue;
      shuffled[swapIndex] = currentValue;
    }
  }

  return shuffled;
}