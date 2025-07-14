export function categorizeTemperature(temp: number): 'hot' | 'cold' | 'moderate' {
  if (temp >= 85) return 'hot';
  if (temp <= 50) return 'cold';
  return 'moderate';
}
