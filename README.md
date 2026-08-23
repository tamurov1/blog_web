Personal website, check it out.

## Grek Station hosting

The production track is served from the public `grek-station-media` Vercel Blob store. The local `grek_station` directory is ignored by Git and can hold source tracks for future uploads without adding large media files to application deployments.

Set the deployed Blob URL with:

```bash
NEXT_PUBLIC_GREK_STATION_AUDIO_URL="https://cdn.example.com/Jazz.mp3"
```

To replace the song while keeping the current URL, overwrite the stable `grek-station/Jazz.mp3` Blob pathname. The media host must support byte-range requests and allow cross-origin requests from the website domain so seeking and the audio visualizer continue to work.
