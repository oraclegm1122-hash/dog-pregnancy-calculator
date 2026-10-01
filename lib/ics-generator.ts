// lib/ics-generator.ts
import { format } from 'date-fns';
import { Milestone } from './calculator-logic';

export function formatICSDate(date: Date): string {
  return format(date, 'yyyyMMdd');
}

export function generateICS(milestones: Milestone[], dogName?: string): string {
  const calName = dogName ? `${dogName}'s Whelping Calendar` : 'Dog Pregnancy Calendar';
  const calendar = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//WhelpWise//Dog Pregnancy Calculator//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    `X-WR-CALNAME:${calName}`,
    'X-WR-TIMEZONE:UTC',
  ];

  for (const milestone of milestones) {
    const dateStr = formatICSDate(milestone.date);
    // RFC 5545 full-day event
    calendar.push(
      'BEGIN:VEVENT',
      `DTSTART;VALUE=DATE:${dateStr}`,
      `DTEND;VALUE=DATE:${dateStr}`,
      `SUMMARY:${milestone.icon} [Day ${milestone.day}] ${milestone.title}`,
      `DESCRIPTION:${milestone.description.replace(/\n/g, '\\n')}`,
      `CATEGORIES:${milestone.category.toUpperCase()}`,
      `UID:milestone-day-${milestone.day}-${dateStr}@whelpwise.com`,
      'STATUS:CONFIRMED',
      'TRANSP:TRANSPARENT',
      'END:VEVENT'
    );
  }

  calendar.push('END:VCALENDAR');
  return calendar.join('\r\n');
}

export function downloadICS(milestones: Milestone[], dogName?: string): void {
  if (typeof window === 'undefined') return;
  const icsContent = generateICS(milestones, dogName);
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const fileName = dogName
    ? `${dogName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-whelping-calendar.ics`
    : 'dog-pregnancy-whelping-calendar.ics';
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
