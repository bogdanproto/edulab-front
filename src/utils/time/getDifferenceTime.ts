import { differenceInMinutes } from 'date-fns';

export const getDifferenceTime = (pastTime: Date | number | string): string => {
  const timeDifference = differenceInMinutes(new Date(), new Date(pastTime));

  const minutesInHour = 60;
  const hoursInDay = 24;
  const daysInWeek = 7;

  if (timeDifference < minutesInHour) {
    return `${timeDifference}m`;
  } else if (timeDifference < minutesInHour * hoursInDay) {
    return `${Math.floor(timeDifference / minutesInHour)}h`;
  } else if (timeDifference < minutesInHour * hoursInDay * daysInWeek) {
    return `${Math.floor(timeDifference / (minutesInHour * hoursInDay))}d`;
  } else {
    return `${Math.floor(timeDifference / (minutesInHour * hoursInDay * daysInWeek))}w`;
  }
};
