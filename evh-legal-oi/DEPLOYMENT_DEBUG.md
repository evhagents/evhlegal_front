# 404 Error Debugging Guide

## Current Status
- ✅ Local build works (when dependencies are properly installed)
- ✅ All page components exist and have default exports
- ✅ API routes are properly configured
- ❌ Vercel deployment shows 404 errors

## Debugging Steps

### 1. Check Vercel Build Logs
1. Go to your Vercel dashboard
2. Click on your project
3. Go to "Functions" tab
4. Check the build logs for any errors

### 2. Test Basic Routing
Visit these URLs on your deployed site:
- `https://your-app.vercel.app/` (main page)
- `https://your-app.vercel.app/test` (simple test page)
- `https://your-app.vercel.app/api/analyze-document` (API route)

### 3. Environment Variables
Ensure these are set in Vercel:
- `OPENAI_API_KEY` - Required for AI features

### 4. Common 404 Causes

#### A. Missing Environment Variables
If `OPENAI_API_KEY` is missing, API routes may fail and cause 404s.

#### B. Build Failures
Check if the build actually completes successfully on Vercel.

#### C. Static Export Issues
The `next.config.mjs` was configured for static export but we have API routes.

#### D. Path Issues
Check if the deployment is looking in the wrong directory.

### 5. Quick Fixes to Try

#### Fix 1: Remove Static Export
```javascript
```

#### Fix 2: Check Vercel Project Settings
- Root Directory: Should be `evh-legal-oi` (not the parent folder)
- Build Command: `pnpm build`
- Output Directory: `.next`

#### Fix 3: Add Fallback Route
Create `app/not-found.tsx`:
```tsx
export default function NotFound() {
  return (
    <div className="p-8">
      <h1>404 - Page Not Found</h1>
      <p>The page you're looking for doesn't exist.</p>
    </div>
  )
}
```

### 6. Test Commands
Run these locally to verify:
```bash
pnpm build
pnpm start
```

### 7. Vercel Configuration
The `vercel.json` should handle:
- Build commands
- Function timeouts
- Environment variables

## Next Steps
1. Check Vercel build logs first
2. Verify environment variables are set
3. Test the `/test` route to isolate routing issues
4. If still failing, try the quick fixes above
