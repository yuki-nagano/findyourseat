const TARGET_DATE = process.env.REACT_APP_BABY_REVEAL_DATE
  ? new Date(process.env.REACT_APP_BABY_REVEAL_DATE)
  : new Date('2026-09-18T18:10:00-07:00');

export const BABY_REVEAL_DATE = TARGET_DATE;
export const isBabyRegistryReady = new Date() >= TARGET_DATE;
