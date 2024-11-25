import { generateRandomLocation, generateRandomPerson, getUniqueValues } from '../utils/photoHelpers';
import { LOCATIONS, PEOPLE } from '../utils/constants';

describe('Photo Helper Functions', () => {
    test('generateRandomLocation returns valid location', () => {
        const location = generateRandomLocation();
        expect(LOCATIONS).toContain(location);
    });

    test('generateRandomPerson returns valid person', () => {
        const person = generateRandomPerson();
        expect(PEOPLE).toContain(person);
    });

    test('getUniqueValues returns unique sorted array', () => {
        const items = [
            { id: 1, category: 'A' },
            { id: 2, category: 'B' },
            { id: 3, category: 'A' },
        ];
        const unique = getUniqueValues(items, 'category');
        expect(unique).toEqual(['A', 'B']);
    });
});
