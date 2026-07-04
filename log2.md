22:14:49.211 Running build in Washington, D.C., USA (East) – iad1
22:14:49.212 Build machine configuration: 2 cores, 8 GB
22:14:49.592 Cloning github.com/Ps1906132/cv_Pendi (Branch: main, Commit: 0dbd3c1)
22:14:50.265 Cloning completed: 672.000ms
22:14:51.104 Restored build cache from previous deployment (2QXRfFUPLprGU4rs1AoDWKyFQ8A9)
22:14:51.321 Running "vercel build"
22:14:51.339 Vercel CLI 54.19.0
22:14:51.702 Installing dependencies...
22:14:52.727 
22:14:52.727 > cv-pendi@0.1.0 postinstall
22:14:52.727 > prisma generate
22:14:52.727 
22:14:53.125 Prisma schema loaded from prisma/schema.prisma
22:14:53.533 
22:14:53.534 ✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 188ms
22:14:53.534 
22:14:53.534 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
22:14:53.534 
22:14:53.535 Tip: Want to react to database changes in your app as they happen? Discover how with Pulse: https://pris.ly/tip-1-pulse
22:14:53.535 
22:14:53.720 
22:14:53.720 up to date in 2s
22:14:53.721 
22:14:53.721 150 packages are looking for funding
22:14:53.721   run `npm fund` for details
22:14:53.753 Detected Next.js version: 16.2.10
22:14:53.760 Running "npm run vercel-build"
22:14:53.870 
22:14:53.870 > cv-pendi@0.1.0 vercel-build
22:14:53.870 > prisma generate && next build
22:14:53.870 
22:14:54.209 Prisma schema loaded from prisma/schema.prisma
22:14:54.556 
22:14:54.556 ✔ Generated Prisma Client (v5.22.0) to ./node_modules/@prisma/client in 176ms
22:14:54.557 
22:14:54.557 Start by importing your Prisma Client (See: https://pris.ly/d/importing-client)
22:14:54.557 
22:14:54.558 Tip: Want to turn off tips and other hints? https://pris.ly/tip-4-nohints
22:14:54.558 
22:14:54.629 ┌─────────────────────────────────────────────────────────┐
22:14:54.630 │  Update available 5.22.0 -> 7.8.0                       │
22:14:54.630 │                                                         │
22:14:54.630 │  This is a major update - please follow the guide at    │
22:14:54.631 │  https://pris.ly/d/major-version-upgrade                │
22:14:54.631 │                                                         │
22:14:54.631 │  Run the following to update                            │
22:14:54.632 │    npm i --save-dev prisma@latest                       │
22:14:54.632 │    npm i @prisma/client@latest                          │
22:14:54.632 └─────────────────────────────────────────────────────────┘
22:14:55.475   Applying modifyConfig from Vercel
22:14:55.491 ▲ Next.js 16.2.10 (Turbopack)
22:14:55.492 
22:14:55.496 ⚠ The "middleware" file convention is deprecated. Please use "proxy" instead. Learn more: https://nextjs.org/docs/messages/middleware-to-proxy
22:14:55.531   Creating an optimized production build ...
22:15:04.017 ✓ Compiled successfully in 8.1s
22:15:04.021   Running TypeScript ...
22:15:09.245   Finished TypeScript in 5.2s ...
22:15:09.247   Collecting page data using 1 worker ...
22:15:09.816   Generating static pages using 1 worker (0/27) ...
22:15:10.039   Generating static pages using 1 worker (6/27) 
22:15:10.112   Generating static pages using 1 worker (13/27) 
22:15:10.116   Generating static pages using 1 worker (20/27) 
22:15:10.133 ✓ Generating static pages using 1 worker (27/27) in 317ms
22:15:10.140   Finalizing page optimization ...
22:15:10.202   Running onBuildComplete from Vercel
22:15:10.384 
22:15:10.386 Route (app)
22:15:10.387 ┌ ○ /
22:15:10.387 ├ ○ /_not-found
22:15:10.387 ├ ƒ /[username]
22:15:10.390 ├ ƒ /api/auth/login
22:15:10.390 ├ ƒ /api/auth/logout
22:15:10.390 ├ ƒ /api/auth/register
22:15:10.391 ├ ƒ /api/certificates
22:15:10.391 ├ ƒ /api/certificates/[id]
22:15:10.391 ├ ƒ /api/documents
22:15:10.391 ├ ƒ /api/documents/[id]
22:15:10.391 ├ ƒ /api/education
22:15:10.391 ├ ƒ /api/education/[id]
22:15:10.391 ├ ƒ /api/experience
22:15:10.391 ├ ƒ /api/experience/[id]
22:15:10.391 ├ ƒ /api/profile
22:15:10.391 ├ ƒ /api/projects
22:15:10.391 ├ ƒ /api/projects/[id]
22:15:10.391 ├ ƒ /api/public/[username]
22:15:10.392 ├ ƒ /api/skills
22:15:10.392 ├ ƒ /api/skills/[id]
22:15:10.392 ├ ƒ /api/social-links
22:15:10.392 ├ ƒ /api/social-links/[id]
22:15:10.392 ├ ○ /dashboard
22:15:10.392 ├ ○ /dashboard/certificates
22:15:10.392 ├ ○ /dashboard/documents
22:15:10.392 ├ ○ /dashboard/education
22:15:10.392 ├ ○ /dashboard/experience
22:15:10.392 ├ ○ /dashboard/profile
22:15:10.392 ├ ○ /dashboard/projects
22:15:10.392 ├ ○ /dashboard/skills
22:15:10.392 ├ ○ /dashboard/social-links
22:15:10.392 ├ ○ /login
22:15:10.392 ├ ○ /logout
22:15:10.392 └ ○ /register
22:15:10.392 
22:15:10.392 
22:15:10.392 ƒ Proxy (Middleware)
22:15:10.393 
22:15:10.393 ○  (Static)   prerendered as static content
22:15:10.393 ƒ  (Dynamic)  server-rendered on demand
22:15:10.393 
22:15:10.991 Build Completed in /vercel/output [19s]
22:15:11.546 Deploying outputs...
22:15:19.912 Deployment completed
22:15:20.031 Creating build cache...