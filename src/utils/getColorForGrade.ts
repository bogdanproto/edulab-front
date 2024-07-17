export const getColorForGrade = (
  value: number
): 'primary' | 'success' | 'warning' | 'error' => {
  if (value >= 90) {
    return 'success';
  } else if (value >= 70) {
    return 'primary';
  } else if (value >= 50) {
    return 'warning';
  } else {
    return 'error';
  }
};
