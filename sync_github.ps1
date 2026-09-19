<#
.SYNOPSIS
  Sincroniza y sube automáticamente los cambios del juego de BajoTerra a GitHub.
.DESCRIPTION
  Agrega todos los archivos nuevos/modificados, realiza un commit y empuja hacia el repositorio traderxael/bajoterra.
#>
param(
  [string]$Mensaje = "Actualización del juego BajoTerra: mejoras de batalla, activos y mecánicas"
)

Write-Host "🐌 [BajoTerra] Iniciando sincronización con GitHub..." -ForegroundColor Cyan

# Comprobar estado de git
$status = git status --porcelain
if (-not $status) {
  Write-Host "✓ No hay cambios pendientes por subir. Tu repositorio está al día." -ForegroundColor Green
  exit 0
}

Write-Host "📦 Agregando archivos al control de versiones..." -ForegroundColor Yellow
git add .

Write-Host "📝 Creando commit con el mensaje: '$Mensaje'..." -ForegroundColor Yellow
git commit -m "$Mensaje"

Write-Host "🚀 Empujando cambios a origin main (GitHub)..." -ForegroundColor Magenta
git push origin main

if ($LASTEXITCODE -eq 0) {
  Write-Host "🎉 ¡Sincronización completada exitosamente en GitHub!" -ForegroundColor Green
  Write-Host "🔗 Repositorio: https://github.com/traderxael/bajoterra" -ForegroundColor Cyan
} else {
  Write-Host "⚠️ Hubo un detalle al hacer push. Por favor verifica tus credenciales SSH." -ForegroundColor Red
}
