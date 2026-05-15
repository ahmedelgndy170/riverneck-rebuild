export const IMPORTANT_RULES_NOTE = {
  title: "Important Note",
  body: "All guests must sign a liability waiver before riding. River Neck Acres reserves the right to update rules, refuse admission, and remove anyone who violates park policies. Riding is at your own risk. Alcohol must be consumed responsibly, and unsafe or reckless behavior will not be tolerated.",
};

export const EVENT_WEEKENDS = [
  {
    name: "Annual Spring Fling",
    dates: "March 2 – 8, 2026",
    hours: "Extended event hours — 8:00 AM to 11:00 PM daily",
  },
  {
    name: "Easter Weekend",
    dates: "April 3 – 5, 2026",
    hours: "Extended event hours — 8:00 AM to 11:00 PM daily",
  },
  {
    name: "Annual Summer Kick Off",
    dates: "May 11 – 17, 2026",
    hours: "Extended event hours — 8:00 AM to 11:00 PM daily",
  },
  {
    name: "Memorial Day Weekend",
    dates: "May 22 – 25, 2026",
    hours: "Extended event hours — 8:00 AM to 11:00 PM daily",
  },
  {
    name: "4th of July Weekend",
    dates: "July 3 – 5, 2026",
    hours: "Extended event hours — 8:00 AM to 11:00 PM daily",
  },
  {
    name: "Labor Day Weekend",
    dates: "September 4 – 7, 2026",
    hours: "Extended event hours — 8:00 AM to 11:00 PM daily",
  },
  {
    name: "Annual Fall Bash",
    dates: "November 13 – 15, 2026",
    hours: "Extended event hours — 8:00 AM to 11:00 PM daily",
  },
] as const;

export const MEMBERSHIP_EXTRAS = [
  "Unlimited day riding for 1 full year",
  "Dry camping included",
  "Access to all trails Access to all trails",
  "Valid for 2 people and 1 machine",
  "Does not include entry to the four major annual events"
] as const;

export type AboutTab =
  | "about"
  | "hours"
  | "pricing"
  | "rules"
  | "contact";

export function isAboutTab(value: string | null): value is AboutTab {
  return (
    value === "about" ||
    value === "hours" ||
    value === "pricing" ||
    value === "rules" ||
    value === "contact"
  );
}
