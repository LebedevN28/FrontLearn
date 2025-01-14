// utils/pointsCalculator.ts
export const calculatePoints = (difficulty: string | undefined): number => {
  if (!difficulty) return 0;
  switch (difficulty) {
    case 'easy':
      return 10;
    case 'medium':
      return 20;
    case 'hard':
      return 30;
    default:
      return 0;
  }
};
