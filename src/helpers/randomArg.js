import randomInteger from './randomInteger';

export default (...rest) => rest[randomInteger(0, rest.length - 1)];
