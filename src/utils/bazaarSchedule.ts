// Weekly "Virtual Bazaar" event schedule — always Thursday 18:00 to Saturday 18:00,
// Asia/Amman time, regardless of the visitor's own timezone.
//
// Jordan has used a fixed UTC+3 offset with no DST since Feb 2023, but we still
// derive the offset from Intl on every call instead of hardcoding it, so this
// keeps working correctly if that ever changes.

const TIME_ZONE = 'Asia/Amman';

// JS Date.getDay() convention: Sun=0 … Sat=6
const WEEKDAY_INDEX: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

const OPEN_START_MIN = 4 * 1440 + 18 * 60; // Thursday 18:00
const OPEN_END_MIN   = 6 * 1440 + 18 * 60; // Saturday 18:00

interface AmmanParts {
  weekday: number;
  hour: number;
  minute: number;
  year: number;
  month: number;
  day: number;
}

function getAmmanParts(date: Date): AmmanParts {
  const dtf = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    hourCycle: 'h23',
    weekday: 'short',
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
  const parts: Record<string, string> = {};
  for (const p of dtf.formatToParts(date)) {
    if (p.type !== 'literal') parts[p.type] = p.value;
  }
  return {
    weekday: WEEKDAY_INDEX[parts.weekday],
    hour: Number(parts.hour),
    minute: Number(parts.minute),
    year: Number(parts.year),
    month: Number(parts.month),
    day: Number(parts.day),
  };
}

// Minutes such that ammanLocalTime = utcTime + offset
function getAmmanOffsetMinutes(date: Date): number {
  const p = getAmmanParts(date);
  const asUTC = Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, 0);
  return Math.round((asUTC - date.getTime()) / 60000);
}

function weekMinutes(p: AmmanParts): number {
  return p.weekday * 1440 + p.hour * 60 + p.minute;
}

// Builds a real Date for a given weekday/hour/minute in the Amman-local week
// containing `now`, offset by `weeksAhead` whole weeks.
function ammanLocalToDate(now: Date, weekday: number, hour: number, minute: number, weeksAhead: number): Date {
  const p = getAmmanParts(now);
  const offsetMin = getAmmanOffsetMinutes(now);
  const localNowMs = now.getTime() + offsetMin * 60000;
  const local = new Date(localNowMs);
  const localMidnightToday = Date.UTC(local.getUTCFullYear(), local.getUTCMonth(), local.getUTCDate());
  const localWeekStart = localMidnightToday - p.weekday * 86400000;
  const targetLocalMs = localWeekStart + (weekday + weeksAhead * 7) * 86400000 + hour * 3600000 + minute * 60000;
  return new Date(targetLocalMs - offsetMin * 60000);
}

export function isBazaarOpen(now: Date = new Date()): boolean {
  const wm = weekMinutes(getAmmanParts(now));
  return wm >= OPEN_START_MIN && wm < OPEN_END_MIN;
}

// The next Thursday 18:00 Amman time — whether the bazaar is currently
// closed (upcoming) or currently open (the *next* one, after this one ends).
export function nextOpening(now: Date = new Date()): Date {
  const wm = weekMinutes(getAmmanParts(now));
  const weeksAhead = wm < OPEN_START_MIN ? 0 : 1;
  return ammanLocalToDate(now, 4, 18, 0, weeksAhead);
}

// The Saturday 18:00 Amman time that ends the *currently open* window.
// Only meaningful while isBazaarOpen(now) is true.
export function currentClosing(now: Date = new Date()): Date {
  return ammanLocalToDate(now, 6, 18, 0, 0);
}

export interface Countdown {
  days: number;
  hours: number;
  minutes: number;
}

export function getCountdown(target: Date, now: Date = new Date()): Countdown {
  const diffMs = Math.max(0, target.getTime() - now.getTime());
  const totalMinutes = Math.floor(diffMs / 60000);
  return {
    days: Math.floor(totalMinutes / 1440),
    hours: Math.floor((totalMinutes % 1440) / 60),
    minutes: totalMinutes % 60,
  };
}

function toUTCStamp(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
}

// Google Calendar "quick add" link for the next bazaar window — opens directly
// in the visitor's calendar with the weekly Thu 18:00 → Sat 18:00 recurrence
// pre-filled, no file download involved.
export function buildGoogleCalendarLink(now: Date = new Date()): string {
  const start = nextOpening(now);
  const end = new Date(start.getTime() + 48 * 60 * 60 * 1000); // Thu 18:00 + 48h = Sat 18:00
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'البازار الافتراضي - ستات بيوت',
    dates: `${toUTCStamp(start)}/${toUTCStamp(end)}`,
    details: 'بازار أسبوعي داخل تطبيق ستات بيوت، مفتوح من الخميس 6:00 مساءً حتى السبت 6:00 مساءً بتوقيت عمّان.',
    recur: 'RRULE:FREQ=WEEKLY;BYDAY=TH',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
