$ErrorActionPreference = 'Stop'
$ffmpegPath = 'ffmpeg'
try { Get-Command ffmpeg | Out-Null } catch {
    $localAppData = [Environment]::GetFolderPath('LocalApplicationData')
    $ffmpegPath = "$localAppData\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_marmeladema\ffmpeg-9.0.2-full_build\bin\ffmpeg.exe"
}

$videos = @(
  'IMG_2187.mp4',
  'IMG_6688.mp4',
  'IMG_6714.mp4',
  'IMG_7228.mov',
  'IMG_7631.mov',
  'IMG_7676.mov',
  'IMG_7744.mp4',
  'Megha.mp4',
  'video-output-54052EC5-E234-4E60-874D-1E7959F50EF3-1.mov'
)

foreach ($vid in $videos) {
    $src = "public\assets\Vedios\$vid"
    $base = [System.IO.Path]::GetFileNameWithoutExtension($src)
    $dest = "public\assets\Vedios\$base-opt.mp4"
    
    if (Test-Path $src) {
        Write-Host "Compressing $src..."
        & $ffmpegPath -y -i $src -c:v libx264 -crf 26 -preset fast -c:a aac -b:a 128k $dest
        if ($LASTEXITCODE -eq 0) {
            Remove-Item $src -Force
            Rename-Item $dest "$base.mp4" -Force
        }
    }
}

if (Test-Path "public\assets\Vedios\IMG_7676-test.mp4") { Remove-Item "public\assets\Vedios\IMG_7676-test.mp4" -Force }
if (Test-Path "public\assets\Vedios\IMG_9723.mp4") { Remove-Item "public\assets\Vedios\IMG_9723.mp4" -Force }
