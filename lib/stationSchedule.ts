export type StationTrackKind = "jazz" | "techno";

export function getScheduledTrack(date: Date): StationTrackKind {
  const day = date.getDay();
  const hour = date.getHours();
  const weekend = day === 0 || day === 6;
  const jazzIsOnAir = weekend
    ? hour >= 5 && hour < 13
    : hour >= 6 && hour < 20;

  return jazzIsOnAir ? "jazz" : "techno";
}
