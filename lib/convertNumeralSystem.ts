const BASE_LENGTH = 62;

const convert10to62 = (decimal: number) => {
  const baseChars = process.env.BASE62_CHARS;
  if (!baseChars) throw new Error('BASE62_CHARS is not defined');
  const length = baseChars.length;
  if (length !== BASE_LENGTH)
    throw new Error('BASE62_CHARS length must be ' + BASE_LENGTH);

  let result = '';
  if (decimal === 0) {
    return baseChars[0];
  }
  while (decimal > 0) {
    result = baseChars[decimal % length] + result;
    decimal = Math.floor(decimal / length);
  }
  return result;
};

const convert62to10 = (base62: string) => {
  const baseChars = process.env.BASE62_CHARS;
  if (!baseChars) throw new Error('BASE62_CHARS is not defined');
  const length = baseChars.length;
  if (length !== BASE_LENGTH)
    throw new Error('BASE62_CHARS length must be ' + BASE_LENGTH);

  let result = 0;
  for (let i = 0; i < base62.length; i++) {
    result = result * length + baseChars.indexOf(base62[i]);
  }
  return result;
};

export { convert10to62, convert62to10 };
