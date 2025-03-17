function convert10to64(decimal: number) {
  console.log('10to64');
  const base64Chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = '';
  if (decimal === 0) {
    return 'A'; // 0에 대한 특별한 처리
  }
  while (decimal > 0) {
    result = base64Chars[decimal % 64] + result;
    decimal = Math.floor(decimal / 64);
  }
  return result;
}

function convert64to10(base64: string) {
  console.log('64to10');
  const base64Chars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  let result = 0;
  for (let i = 0; i < base64.length; i++) {
    result = result * 64 + base64Chars.indexOf(base64[i]);
  }
  return result;
}

export { convert10to64, convert64to10 };
