export const cityMap = {
  Tehran: "تهران",
  Sanandaj: "سنندج",
  Mashhad: "مشهد",
  Isfahan: "اصفهان",
  Shiraz: "شیراز",
  Madrid: "مادرید",
  Sulaymaniyah: "سلیمانیه",
  Hewler: "هولر",
  Mazandaran: "مازندران",
  Italy: "ایتالیا",
};

export function cityToPersian(city) {
  return cityMap[city] || city;
}
