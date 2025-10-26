
export function calculateTourDuration(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffTime = Math.abs(end - start);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const nights = diffDays - 1;

  const persianStart = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(start);

  const persianEnd = new Intl.DateTimeFormat("fa-IR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(end);

  const startMonthName = new Intl.DateTimeFormat("fa-IR", {
    month: "long",
  }).format(start);

  return {
    days: diffDays,
    nights: nights > 0 ? nights : 0,
    startDatePersian: persianStart.replace(/،/g, " / "),
    endDatePersian: persianEnd.replace(/،/g, " / "),
    startMonthName: `${startMonthName}‌ماه`,
  };
}


export function formatPersianDate(dateString) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}


export function formatPersianDateNumeric(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);

  const formattedDate = new Intl.DateTimeFormat("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);

  const formattedTime = new Intl.DateTimeFormat("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

  return `${formattedDate.replaceAll("‎", "").replaceAll(" ", "")} - ${formattedTime}`;
}
