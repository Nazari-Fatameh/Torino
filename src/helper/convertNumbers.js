export function toPersianNumber(number) {
  const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/\d/g, (digit) => persianDigits[digit]);
}

export function convertToRial(amount) {

  if (typeof amount !== "number") return amount;
  return Math.round(amount); 
}
export function randomDigit() {
  const min = 100_000_000;
  const max = 999_999_999;

  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint32Array(1);
    crypto.getRandomValues(array);

    return (min + (array[0] % (max - min + 1))).toString();
  }

  return Math.floor(Math.random() * (max - min + 1) + min).toString();
}
