import { Duration } from 'luxon';

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export function makeTimeString(seconds: number): string {
  const duration = Duration.fromObject({ seconds: Math.floor(seconds) })
    .shiftTo('hours', 'minutes', 'seconds')
    .toObject();
  if (duration.hours) {
    return `${duration.hours}h ${duration.minutes}m ${duration.seconds}s`;
  } else {
    return `${duration.minutes}m ${duration.seconds}s`;
  }
}
