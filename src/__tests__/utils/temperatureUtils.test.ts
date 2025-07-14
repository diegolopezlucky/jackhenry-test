import { categorizeTemperature } from '../../utils/temperatureUtils';

describe('categorizeTemperature', () => {
  it('should return "cold" for temperatures <= 50', () => {
    expect(categorizeTemperature(40)).toBe('cold');
    expect(categorizeTemperature(50)).toBe('cold');
  });

  it('should return "hot" for temperatures >= 85', () => {
    expect(categorizeTemperature(90)).toBe('hot');
    expect(categorizeTemperature(85)).toBe('hot');
  });

  it('should return "moderate" for temperatures between 51 and 84', () => {
    expect(categorizeTemperature(70)).toBe('moderate');
  });
});
