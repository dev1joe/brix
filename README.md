# Clickbox: Hands-On DevOps Project
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/dev1joe/clickbox/badge)](https://scorecard.dev/viewer/?uri=github.com/dev1joe/clickbox)

## Implementation
### Project Initialization
```bash
npm init -y
npm i express
npm i -D typescript tsx @types/node @types/express
npx tsc --init
```

testing libraries
```bash
npm i -D vitest supertest @types/supertest
```

installing mogan middleware for request logging
```bash
npm i morgan
npm i -D @types/morgan
```

tsconfig
- either use `NodeNext` for module and module resolution with no bundler
- or use a bundler (like `esbuild` or `tsup`) and set module to `ESNext` and module resolution to `bundler`
- using a bundler will allow you to use relative imports without file extensions but will add an extra build step

### API Details
- app structure:
  - routers (route groups)
  - morgan (logging middleware)
  - 404 not found middleware
  - Error-Handler

## testing
- run `npm run test`
