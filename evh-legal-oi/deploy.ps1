# EVH Legal Frontend Deployment Script (PowerShell)

Write-Host "🚀 Deploying EVH Legal Frontend..." -ForegroundColor Green

# Build the Docker image
Write-Host "📦 Building Docker image..." -ForegroundColor Yellow
docker build -t evh-legal-frontend .

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Docker build successful!" -ForegroundColor Green
    
    # Stop and remove existing container if it exists
    Write-Host "🧹 Cleaning up existing container..." -ForegroundColor Yellow
    docker stop evh-legal-frontend 2>$null
    docker rm evh-legal-frontend 2>$null
    
    # Run the new container
    Write-Host "🏃 Starting new container..." -ForegroundColor Yellow
    docker run -d `
        --name evh-legal-frontend `
        -p 3000:3000 `
        -e OPENAI_API_KEY="$env:OPENAI_API_KEY" `
        -e PHOENIX_API_URL="$env:PHOENIX_API_URL" `
        evh-legal-frontend
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Container started successfully!" -ForegroundColor Green
        Write-Host "🌐 Application is running at: http://localhost:3000" -ForegroundColor Cyan
        Write-Host "📊 View logs with: docker logs evh-legal-frontend" -ForegroundColor Gray
        Write-Host "🛑 Stop with: docker stop evh-legal-frontend" -ForegroundColor Gray
    } else {
        Write-Host "❌ Failed to start container" -ForegroundColor Red
        exit 1
    }
} else {
    Write-Host "❌ Docker build failed" -ForegroundColor Red
    exit 1
}
