18:29:45.037 Running build in Washington, D.C., USA (East) – iad1
18:29:45.038 Build machine configuration: 2 cores, 8 GB
18:29:45.141 Cloning github.com/Ps1906132/cv_Pendi (Branch: main, Commit: 526a5f4)
18:29:45.142 Previous build caches not available.
18:29:45.390 Cloning completed: 249.000ms
18:29:45.807 Running "vercel build"
18:29:45.832 Vercel CLI 54.19.0
18:29:46.188 Installing dependencies...
18:30:04.067 
18:30:04.068 added 393 packages in 18s
18:30:04.068 
18:30:04.068 150 packages are looking for funding
18:30:04.069   run `npm fund` for details
18:30:04.125 Detected Next.js version: 16.2.10
18:30:04.132 Running "npm run build"
18:30:04.240 
18:30:04.241 > cv-pendi@0.1.0 build
18:30:04.242 > next build
18:30:04.242 
18:30:04.776   Applying modifyConfig from Vercel
18:30:04.781 Attention: Next.js now collects completely anonymous telemetry regarding usage.
18:30:04.782 This information is used to shape Next.js' roadmap and prioritize features.
18:30:04.782 You can learn more, including how to opt-out if you'd not like to participate in this anonymous program, by visiting the following URL:
18:30:04.782 https://nextjs.org/telemetry
18:30:04.783 
18:30:04.800 ▲ Next.js 16.2.10 (Turbopack)
18:30:04.801 
18:30:04.840   Creating an optimized production build ...
18:30:11.602 ✓ Compiled successfully in 6.4s
18:30:11.606   Running TypeScript ...
18:30:15.382   Finished TypeScript in 3.8s ...
18:30:15.383   Collecting page data using 1 worker ...
18:30:15.796 Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the `prisma generate` command during the build process.
18:30:15.798 
18:30:15.798 Learn how: https://pris.ly/d/vercel-build
18:30:15.808 Error [PrismaClientInitializationError]: Prisma has detected that this project was built on Vercel, which caches dependencies. This leads to an outdated Prisma Client because Prisma's auto-generation isn't triggered. To fix this, make sure to run the `prisma generate` command during the build process.
18:30:15.809 
18:30:15.809 Learn how: https://pris.ly/d/vercel-build
18:30:15.809     at module evaluation (.next/server/chunks/[root-of-the-server]__1j972gd._.js:1:1226)
18:30:15.810     at instantiateModule (.next/server/chunks/[turbopack]_runtime.js:853:9)
18:30:15.810     at getOrInstantiateModuleFromParent (.next/server/chunks/[turbopack]_runtime.js:877:12)
18:30:15.810     at Context.esmImport [as i] (.next/server/chunks/[turbopack]_runtime.js:281:20)
18:30:15.810     at module evaluation (.next/server/chunks/[root-of-the-server]__1j972gd._.js:1:1544)
18:30:15.811     at instantiateModule (.next/server/chunks/[turbopack]_runtime.js:853:9)
18:30:15.811     at instantiateRuntimeModule (.next/server/chunks/[turbopack]_runtime.js:882:12)
18:30:15.811     at getOrInstantiateRuntimeModule (.next/server/chunks/[turbopack]_runtime.js:895:12) {
18:30:15.811   clientVersion: '5.22.0',
18:30:15.812   errorCode: undefined
18:30:15.812 }
18:30:16.312 
18:30:16.312 > Build error occurred
18:30:16.314 Error: Failed to collect page data for /api/auth/login
18:30:16.315     at ignore-listed frames {
18:30:16.315   type: 'Error'
18:30:16.315 }
18:30:16.360 Error: Command "npm run build" exited with 1