export const calculateDaysSinceNow = (inputDate: Date): number => {
  const currentDate = new Date();
  const timeDifference = inputDate.getTime() - currentDate.getTime();

  // (ms * min * h * 24) = day
  const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  return daysDifference;
};
