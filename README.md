personal [Next.js](https://nextjs.org/) journey

## getting started

provision mysql database, add `mysql://` connection string to .env 

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

## live site
https://foods.pomppa.xyz/



