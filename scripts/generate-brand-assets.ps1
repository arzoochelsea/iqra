param(
  [Parameter(Mandatory = $true)][string]$FullLogo,
  [Parameter(Mandatory = $true)][string]$IconMaster
)

Add-Type -AssemblyName System.Drawing

$brandingDirectory = Join-Path $PSScriptRoot "..\public\branding"
$iconsDirectory = Join-Path $PSScriptRoot "..\public\icons"
New-Item -ItemType Directory -Force -Path $brandingDirectory, $iconsDirectory | Out-Null

$fullLogoDestination = Join-Path $brandingDirectory "iqra-logo.png"
if ((Resolve-Path -LiteralPath $FullLogo).Path -ne (Resolve-Path -LiteralPath $fullLogoDestination -ErrorAction SilentlyContinue).Path) {
  Copy-Item -LiteralPath $FullLogo -Destination $fullLogoDestination -Force
}
Copy-Item -LiteralPath $IconMaster -Destination (Join-Path $brandingDirectory "iqra-icon-master.png") -Force

function Export-SquarePng {
  param([string]$Source, [string]$Destination, [int]$Size)

  $inputImage = [System.Drawing.Image]::FromFile($Source)
  try {
    $canvas = New-Object System.Drawing.Bitmap($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    try {
      $canvas.SetResolution(96, 96)
      $graphics = [System.Drawing.Graphics]::FromImage($canvas)
      try {
        $graphics.Clear([System.Drawing.Color]::FromArgb(255, 250, 246, 237))
        $graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $graphics.DrawImage($inputImage, 0, 0, $Size, $Size)
      } finally {
        $graphics.Dispose()
      }
      $canvas.Save($Destination, [System.Drawing.Imaging.ImageFormat]::Png)
    } finally {
      $canvas.Dispose()
    }
  } finally {
    $inputImage.Dispose()
  }
}

$icon192 = Join-Path $iconsDirectory "iqra-icon-192.png"
$icon512 = Join-Path $iconsDirectory "iqra-icon-512.png"
$maskable512 = Join-Path $iconsDirectory "iqra-icon-maskable-512.png"
$appleTouch = Join-Path $brandingDirectory "apple-touch-icon.png"
$faviconPng = Join-Path $brandingDirectory "favicon-32.png"

Export-SquarePng -Source $IconMaster -Destination $icon192 -Size 192
Export-SquarePng -Source $IconMaster -Destination $icon512 -Size 512
Export-SquarePng -Source $IconMaster -Destination $maskable512 -Size 512
Export-SquarePng -Source $IconMaster -Destination $appleTouch -Size 180
Export-SquarePng -Source $IconMaster -Destination $faviconPng -Size 32

# ICO container with an embedded lossless 32x32 PNG.
$pngBytes = [System.IO.File]::ReadAllBytes($faviconPng)
$stream = New-Object System.IO.MemoryStream
$writer = New-Object System.IO.BinaryWriter($stream)
try {
  $writer.Write([uint16]0)
  $writer.Write([uint16]1)
  $writer.Write([uint16]1)
  $writer.Write([byte]32)
  $writer.Write([byte]32)
  $writer.Write([byte]0)
  $writer.Write([byte]0)
  $writer.Write([uint16]1)
  $writer.Write([uint16]32)
  $writer.Write([uint32]$pngBytes.Length)
  $writer.Write([uint32]22)
  $writer.Write($pngBytes)
  $writer.Flush()
  [System.IO.File]::WriteAllBytes((Join-Path $PSScriptRoot "..\src\app\favicon.ico"), $stream.ToArray())
} finally {
  $writer.Dispose()
  $stream.Dispose()
}

Remove-Item -LiteralPath $faviconPng
