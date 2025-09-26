#!/bin/bash

# EVH Legal Frontend Deployment Script

echo "🚀 Deploying EVH Legal Frontend..."

# Build the Docker image
echo "📦 Building Docker image..."
docker build -t evh-legal-frontend .

if [ $? -eq 0 ]; then
    echo "✅ Docker build successful!"
    
    # Stop and remove existing container if it exists
    echo "🧹 Cleaning up existing container..."
    docker stop evh-legal-frontend 2>/dev/null || true
    docker rm evh-legal-frontend 2>/dev/null || true
    
    # Run the new container
    echo "🏃 Starting new container..."
    docker run -d \
        --name evh-legal-frontend \
        -p 3000:3000 \
        -e OPENAI_API_KEY="${OPENAI_API_KEY}" \
        -e PHOENIX_API_URL="${PHOENIX_API_URL:-http://localhost:4000}" \
        evh-legal-frontend
    
    if [ $? -eq 0 ]; then
        echo "✅ Container started successfully!"
        echo "🌐 Application is running at: http://localhost:3000"
        echo "📊 View logs with: docker logs evh-legal-frontend"
        echo "🛑 Stop with: docker stop evh-legal-frontend"
    else
        echo "❌ Failed to start container"
        exit 1
    fi
else
    echo "❌ Docker build failed"
    exit 1
fi
