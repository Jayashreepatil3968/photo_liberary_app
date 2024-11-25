import { LOCATIONS, PEOPLE } from "./constants";

export const generateRandomLocation = () => {
    return LOCATIONS[Math.floor(Math.random() * LOCATIONS.length)];
};

export const generateRandomPerson = () => {
    return PEOPLE[Math.floor(Math.random() * PEOPLE.length)];
};

export const getUniqueValues = (items, key) => {
    return [...new Set(items.map(item => item[key]))].sort();
};