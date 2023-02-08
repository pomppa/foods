personal [Next.js](https://nextjs.org/) journey - heavily wip

## getting started

provision two mysql databases, add `mysql://` connection strings to .env 

migrate prisma schema to mysql

```bash
npx prisma migrate dev
```

run seed script to fetch Fineli data 

```bash
npx prisma db seed
```

run the development server

```bash
npm run dev
```
