import dayjs from "dayjs";

export const createDatePickerDates = () => {
  const currentYear = dayjs().year();
  const years = Array.from(
    { length: currentYear - 2020 + 10 },
    (_, i) => `${2020 + i}`
  );
  const months = Array.from(
    { length: 12 },
    (_, i) => `${(i + 1).toString().padStart(2, "0")}`
  );
  const days = Array.from(
    { length: 31 },
    (_, i) => `${(i + 1).toString().padStart(2, "0")}`
  );

  return { years, months, days };
};
