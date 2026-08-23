param(
  [string]$JazzFilePath = (Join-Path $PSScriptRoot "..\grek_station\Jazz.mp3"),
  [string]$TechnoFilePath = (Join-Path $PSScriptRoot "..\grek_station\Techno.mp3")
)

$stationTracks = @(
  @{ Name = "Jazz"; Path = $JazzFilePath },
  @{ Name = "Techno"; Path = $TechnoFilePath }
)
$environmentFile = Join-Path $PSScriptRoot "..\.env.local"

if (-not (Test-Path -LiteralPath $environmentFile)) {
  throw "Missing .env.local. Run 'npx vercel@latest env pull .env.local --yes' first."
}

$oidcLine = Get-Content -LiteralPath $environmentFile |
  Where-Object { $_ -like "VERCEL_OIDC_TOKEN=*" } |
  Select-Object -First 1

if (-not $oidcLine) {
  throw "VERCEL_OIDC_TOKEN is missing. Run 'npx vercel@latest env pull .env.local --yes' first."
}

$env:VERCEL_OIDC_TOKEN = $oidcLine.Substring($oidcLine.IndexOf("=") + 1).Trim().Trim('"')
$env:BLOB_STORE_ID = "store_PDKONoWrwg3aYJ5g"

foreach ($stationTrack in $stationTracks) {
  $resolvedTrackPath = Resolve-Path -LiteralPath $stationTrack.Path -ErrorAction Stop

  & npx --yes vercel@latest blob put $resolvedTrackPath.Path `
    --pathname "grek-station/$($stationTrack.Name).mp3" `
    --access public `
    --content-type audio/mpeg `
    --cache-control-max-age 300 `
    --allow-overwrite `
    --multipart

  if ($LASTEXITCODE -ne 0) {
    throw "$($stationTrack.Name) upload failed with exit code $LASTEXITCODE."
  }
}
