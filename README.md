# 🚗 Fleet Manager App  

A **Next.js 15** application for managing vehicles and incidents.  
Built with **Prisma**, **Neon (Postgres)**, **OpenAPI/Swagger**, **shadcn/ui**, and **TanStack Query**.  

---

## ⚙️ Tech Stack  

- **Next.js 15**: App Router + Turbopack  
- **Prisma**: ORM for database operations  
- **Neon**: Serverless Postgres database  
- **OpenAPI + Swagger**: API documentation  
- **shadcn/ui**: Reusable UI components  
- **TanStack Query**: Server state management & caching  
- **TypeScript**: Strict typing  

---

## 📂 Project Structure  

```
├── app
│   ├── api
│   │   ├── cars
│   │   ├── incidents
│   │   │   ├── [id]
│   │   │   │   └── updates
│   │   │   └── stats
│   │   └── users
│   ├── docs
│   └── fleetmanager
│       └── incidents
│           ├── [id]
│           │   └── edit
│           ├── new
│           └── stats
├── components
│   ├── car
│   ├── incident
│   │   └── createform
│   ├── layout
│   └── ui
├── lib
│   ├── queries
│   │   └── mutations
│   └── validations
├── public
│   └── swagger.yaml
└── types
```

---

## 🗄️ Database Design  

View the schema here: 👉 [Fleet Manager DB Diagram](https://dbdiagram.io/d/68b287ca777b52b76c4203ed)  

---

## 🔧 Setup Instructions  

### 1. Clone & Install  

```bash
git clone https://github.com/your-org/fleet-manager.git
cd fleet-manager
npm install
# or
pnpm install
```

---

### 2. Environment Variables  

Create a `.env` file in the root directory:  

```env
DATABASE_URL="postgresql://<user>:<password>@<neon-host>/<db>?sslmode=require"
DIRECT_URL="postgresql://<user>:<password>@<neon-host>/<db>?sslmode=require"

CLOUDINARY_CLOUD_NAME=XXXXXXXXXXXXX
CLOUDINARY_API_SECRET=XXXXXXXXXXXXX
CLOUDINARY_API_KEY=XXXXXXXXXXXXX
```

---

### 3. Neon + Prisma Setup  

```bash
# Generate Prisma client
npx prisma generate

# Create and apply migrations (development)
npm run prisma:md

# Reset database
npm run prisma:r

# Deploy migrations (production/Neon)
npm run prisma:d

# Seed initial data
node prisma/seed.js
```

---

### 4. API Routes  

- **Incidents API** → `/app/api/incidents/` (CRUD operations)  
- **OpenAPI JSON** → `/app/api/openapi.json/route.ts` (serves OpenAPI spec)  

---

### 5. Page Routes  

- `/fleetmanager/incidents` → Incidents management UI  
- `/docs` → Swagger UI for API exploration  

---

### 6. Start the Project  

```bash
npm run dev
# or
pnpm dev
```

Visit:  
- App → [http://localhost:3000](http://localhost:3000)  
- Swagger Docs → [http://localhost:3000/docs](http://localhost:3000/docs)  

---
