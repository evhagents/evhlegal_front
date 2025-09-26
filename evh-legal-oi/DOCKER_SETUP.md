# Docker Setup for EVH Legal

## Why Docker?

✅ **Solves Current Issues:**
- Eliminates dependency conflicts and file system issues
- Consistent builds across environments
- No more 404 deployment errors

✅ **Future Phoenix Integration:**
- Easy service orchestration with docker-compose
- Isolated environments for frontend/backend
- Simplified deployment and scaling

## Quick Start

### 1. Build and Run Frontend Only
```bash
# Build the Docker image
docker build -t evh-legal-frontend .

# Run the container
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key_here \
  evh-legal-frontend
```

### 2. Full Stack with Docker Compose
```bash
# Copy environment variables
cp .env.example .env
# Edit .env with your actual values

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f frontend
```

## Services

### Frontend (Next.js)
- **Port:** 3000
- **Environment:** Production optimized
- **Features:** AI document analysis, compliance dashboard

### Phoenix Backend (Future)
- **Port:** 4000
- **Database:** PostgreSQL
- **Cache:** Redis
- **Status:** Ready for integration

### Database (PostgreSQL)
- **Port:** 5432 (internal only)
- **Purpose:** Phoenix backend data storage

### Cache (Redis)
- **Port:** 6379 (internal only)
- **Purpose:** Phoenix sessions and caching

## Environment Variables

Create `.env` file with:
```bash
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Phoenix Integration (when ready)
PHOENIX_API_URL=http://phoenix:4000
DATABASE_URL=postgresql://postgres:password@postgres:5432/evhlegal
POSTGRES_PASSWORD=your_secure_password
SECRET_KEY_BASE=your_very_long_secret_key_here
```

## Development Workflow

### Local Development
```bash
# Start just the frontend
docker-compose up frontend

# Or run locally with Docker backend
docker-compose up phoenix postgres redis
pnpm dev  # Run frontend locally
```

### Production Deployment
```bash
# Build and deploy
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

## Benefits Over Vercel

1. **No Build Issues:** Consistent environment eliminates dependency problems
2. **Full Control:** Custom server configuration and routing
3. **Phoenix Ready:** Easy backend integration
4. **Cost Effective:** Single server deployment vs. serverless costs
5. **Database Integration:** Direct database access for Phoenix
6. **Scaling:** Easy horizontal scaling with Docker Swarm/Kubernetes

## Migration Path

### Phase 1: Docker Frontend (Now)
- Deploy current Next.js app in Docker
- Solve 404 issues
- Maintain current functionality

### Phase 2: Phoenix Integration (Future)
- Add Phoenix backend to docker-compose
- Update API routes to call Phoenix
- Implement database models

### Phase 3: Production Optimization
- Add load balancer
- Implement monitoring
- Set up CI/CD pipeline

## Deployment Options

### Option 1: VPS/Cloud Server
```bash
# On your server
git clone your-repo
cd evh-legal-oi
docker-compose up -d
```

### Option 2: Docker Hosting
- **Railway:** `railway up`
- **Render:** Connect GitHub repo
- **DigitalOcean App Platform:** Docker deployment

### Option 3: Kubernetes
```bash
# Convert docker-compose to k8s manifests
kompose convert
kubectl apply -f .
```

## Troubleshooting

### Build Issues
```bash
# Clean build
docker system prune -a
docker build --no-cache -t evh-legal-frontend .
```

### Port Conflicts
```bash
# Check what's using port 3000
lsof -i :3000
# Or change ports in docker-compose.yml
```

### Environment Variables
```bash
# Check if variables are loaded
docker-compose config
```

This Docker setup will solve your current deployment issues and provide a solid foundation for Phoenix integration!
