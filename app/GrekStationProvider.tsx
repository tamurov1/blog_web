"use client";

import { createContext, useContext, useState } from "react";
import GrekStation from "./GrekStation";

export const grekStationPlaybackEvent = "grek-station:playback-change";

type GrekStationContextValue = {
  stationPlaying: boolean;
};

const GrekStationContext = createContext<GrekStationContextValue>({
  stationPlaying: false,
});

export function useGrekStation() {
  return useContext(GrekStationContext);
}

export default function GrekStationProvider({ children }: { children: React.ReactNode }) {
  const [stationPlaying, setStationPlaying] = useState(false);

  const handlePlaybackChange = (playing: boolean, origin?: { x: number; y: number }) => {
    setStationPlaying(playing);
    window.dispatchEvent(new CustomEvent(grekStationPlaybackEvent, {
      detail: { origin, playing },
    }));
  };

  return (
    <GrekStationContext.Provider value={{ stationPlaying }}>
      {children}
      <GrekStation onPlaybackChange={handlePlaybackChange} />
    </GrekStationContext.Provider>
  );
}
