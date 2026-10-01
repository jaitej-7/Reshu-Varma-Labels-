$ErrorActionPreference = 'Stop'
$ffmpegPath = "ffmpeg"
try { Get-Command ffmpeg | Out-Null } catch {
    $localAppData = [Environment]::GetFolderPath('LocalApplicationData')
    $ffmpegPath = "$localAppData\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_marmeladema\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
}

Write-Host "Compressing IMG_9723.mp4 to hero-compressed.webm..."
& $ffmpegPath -y -i "IMG_9723.mp4" -c:v libvpx-vp9 -crf 30 -b:v 0 -vf scale=1280:-2 -cpu-used 4 -row-mt 1 -an -t 15 "hero-compressed.webm"
