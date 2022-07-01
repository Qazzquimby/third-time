import { DateTime, Duration } from 'luxon'
import type { TimerMode } from './constants'
import { REST_MODE, STOP_MODE, WORK_MODE } from './constants'

export const now = useNow({ interval: 1000 })

export interface StoredState {
  timerMode: TimerMode
  previousTimerMode: TimerMode

  oldStoredRestSeconds: number
  oldTotalWorkSeconds: number

  workRestRatio: number
  dailyGoalHours: number
}

export const storage = useStorage<StoredState>('third-time-state', {
  timerMode: STOP_MODE,
  previousTimerMode: STOP_MODE,
  oldStoredRestSeconds: 0,
  oldTotalWorkSeconds: 0,

  workRestRatio: 3,
  dailyGoalHours: 5,
})

export const lastModeChangeTime = useStorage('third-time-last-mode-change-time', DateTime.now(), undefined, {
  serializer: {
    read: (v: string) => DateTime.fromISO(v),
    write: (v: DateTime) => v.toISO(),
  },
})

export const minutesSinceModeChange = computed({
  get() {
    return Math.floor(
      DateTime.fromJSDate(now.value).diff(lastModeChangeTime.value, 'minutes').minutes,
    )
  },
  set(value: number) {
    lastModeChangeTime.value = DateTime.fromJSDate(now.value).minus({ minutes: value })
    if (storage.value.previousTimerMode === WORK_MODE) {
      storage.value.oldTotalWorkSeconds -= 60 * value
    }
  },
},
)

const timeSinceModeChange = computed(() => {
  return Math.ceil(
    DateTime.fromJSDate(now.value).diff(lastModeChangeTime.value, ['seconds']).seconds,
  )
})

export const currentSessionDurationSeconds = computed(() => {
  if (storage.value.timerMode === WORK_MODE) {
    return timeSinceModeChange.value
  }
  else {
    return 0
  }
})
const newEarnedRest = computed(() => {
  if (storage.value.timerMode === WORK_MODE) {
    return currentSessionDurationSeconds.value / storage.value.workRestRatio
  }
  else {
    return 0
  }
})
const newSpentRest = computed(() => {
  if (storage.value.timerMode === REST_MODE || storage.value.timerMode === STOP_MODE) {
    return timeSinceModeChange.value
  }
  else {
    return 0
  }
})
export const storedRestSeconds = computed(() => {
  let result
      = storage.value.oldStoredRestSeconds + newEarnedRest.value - newSpentRest.value
  if (storage.value.timerMode === STOP_MODE) {
    result = Math.max(0, result)
  }
  return result
})

export const totalWorkSeconds = computed(() => {
  return storage.value.oldTotalWorkSeconds + currentSessionDurationSeconds.value
})

export function setTimerMode(newMode: TimerMode) {
  if (storage.value.timerMode === newMode) {
    return
  }
  storage.value.previousTimerMode = storage.value.timerMode
  storage.value.oldTotalWorkSeconds = totalWorkSeconds.value
  storage.value.oldStoredRestSeconds = storedRestSeconds.value
  lastModeChangeTime.value = DateTime.now()
  storage.value.timerMode = newMode
}
export function start() {
  setTimerMode(WORK_MODE)
}
export function pause() {
  setTimerMode(REST_MODE)
}
export function stop() {
  setTimerMode(STOP_MODE)
}
export function reset() {
  stop()
  storage.value.oldStoredRestSeconds = 0
  storage.value.oldTotalWorkSeconds = 0
}

export function isWorking() {
  return storage.value.timerMode === WORK_MODE
}

export function isResting() {
  return storage.value.timerMode === REST_MODE
}

export function isStopped() {
  return storage.value.timerMode === STOP_MODE
}

export function formatTime(inputSeconds: number): string {
  const duration = Duration.fromMillis(inputSeconds * 1000)
  let { hours = 0, minutes = 0, seconds = 0 } = duration.shiftTo('hours', 'minutes', 'seconds').toObject()

  hours = Math.abs(hours)
  minutes = Math.abs(minutes)
  seconds = Math.abs(seconds)

  const minusSign = duration.milliseconds < 0 ? '-' : ''
  const hoursString = hours ? `${hours}:` : ''
  const minutesString = `${minutes && minutes < 10 ? '0' : ''}${minutes}:`
  const secondsString = `${seconds && seconds < 10 ? '0' : ''}${seconds.toFixed(0)}`

  return `${minusSign}${hoursString}${minutesString}${secondsString}`
}
