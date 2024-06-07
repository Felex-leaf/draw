import { uniqWith, isEqual } from 'lodash';
import { Position } from './components/chess-piece';

export function generateAllCombinations(baseCoordinates: number[], stop?: boolean): Position[] {
  const combinations: Position[] = [];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 2; j++) {
      const x = i % 2 === 0 ? baseCoordinates[0] : -baseCoordinates[0];
      const y = j % 2 === 0 ? baseCoordinates[1] : -baseCoordinates[1];
      combinations.push({ x, y });
    }
  }
  return uniqWith([...combinations, ...(stop ? [] : generateAllCombinations([baseCoordinates[1], baseCoordinates[0]], true))], isEqual);
}
