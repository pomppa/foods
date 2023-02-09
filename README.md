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


## screenshot
<img width="1151" alt="image" src="https://user-images.githubusercontent.com/24681147/217903341-467199d2-ea0a-4bc6-8ea4-e1c5bb0bc48f.png">
