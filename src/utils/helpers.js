import {
  differenceInDays,
  eachDayOfInterval,
  formatDistance,
  parseISO,
  subDays,
} from "date-fns";
import { format } from "date-fns/format";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const subtractTimes = (timeStr1, timeStr2) =>
  differenceInDays(parseISO(String(timeStr1)), parseISO(String(timeStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    // today.setUTCHours(23, 59, 59, 999);
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const getYesterday = function (options = {}) {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (options?.end) yesterday.setUTCHours(23, 59, 59, 999);
  else yesterday.setUTCHours(0, 0, 0, 0);
  return yesterday.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const getTodayNoTime = function (addDays = 0) {
  let today = new Date().toISOString();
  today = subDays(today, addDays).toISOString();
  today = today.slice(0, 10);
  return today;
};

export const formatDate = function (date) {
  // May 05
  return format(parseISO(date), "MMM dd");
};

export const getDateNoTime = function () {
  const date = new Date().toISOString().split("T")[0];
  return date; // 2021-09-01
};

export const subDaysNoTime = function (date, days) {
  return subDays(date, days).toISOString().slice(0, 10);
};

export const eachDayOfIntervalNoTime = function ({ start, end }) {
  const days = eachDayOfInterval({ start, end });
  return days.map((day) => day.toISOString().slice(0, 10));
};

export const isSameDayNoTime = function (date1, date2) {
  // console.log(date1); // 2024-05-05
  // console.log(date2); // 2024-05-09
  if (date1 === date2) return true;
  return false;
};
