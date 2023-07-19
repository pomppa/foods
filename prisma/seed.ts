import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import fs from 'fs';
// import bcrypt from 'bcrypt';

/* init prisma */
const prisma = new PrismaClient();
/* allows defining a start index if seed fails during fetch. can skip seed script with this too */
const startFromId = 0;
/* holds all fineli_ids for requesting api */
const ids = [];
/* api base url */
const fineliAPI = 'https://fineli.fi/fineli/api/v1/foods/';

async function read() {
  console.log('reading data from csv');
  fs.createReadStream('lib/data/food.csv')
    .pipe(parse({ delimiter: ';', from_line: 2, to_line: 20 }))
    .on('data', async function (row) {
      console.log(row[2]);
      if (row[0] > startFromId && row[2] === 'FOOD') {
        ids.push(row[0]);
      }
    })
    .on('end', async function () {
      ids.map((x, i) => {
        setTimeout(() => {
          checkIfExists(x);
        }, 2000 * i);
      });
    });
}

async function checkIfExists(id) {
  console.log('checking data for ' + id);
  const found = await prisma.fineli_Ingredient.findFirst({
    where: {
      fineli_id: Number(id),
    },
  });

  if (!found) {
    console.log('no data, requesting id ' + id);
    fetchFromFineli(id);
  } else {
    console.log('found data for id ' + id);
  }
}
async function fetchFromFineli(id) {
  console.log('fetch for id ' + id);
  fetch(fineliAPI + id)
    .then((res) => res.json())
    .then((data) => {
      create(data);
    })
    .catch(async (e) => {
      console.log(e);
    });
}

async function create(response) {
  console.log('creating entity with fineli id ' + response.id);
  await prisma.fineli_Ingredient.create({
    data: {
      fineli_id: response.id,
      name: response.name.fi,
      kcal: response.energyKcal,
      protein: response.protein,
      carbs: response.carbohydrate,
      fat: response.fat,
    },
  });
}

read().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});

async function populate() {
  await prisma.$queryRaw`ALTER TABLE ingredient AUTO_INCREMENT = 5000;`;
  /*
  const hashedPassword = await bcrypt.hash('testtest', 10);

  const testData = [
    {
      userName: 'user-seed-1',
      password: hashedPassword,
      ingredient: {
        name: 'test',
        kcal: '450',
        protein: '20',
        fat: '10',
        carbs: '50',
      },
      meal: {
        name: 'mealname',
        formValues: [
          {
            weight: 120,
            ingredient_id: 4,
          },
          {
            weight: 340,
            ingredient_id: 2,
          },
          {
            weight: 230,
            ingredient_id: 5000,
          },
        ],
      },
    },
    {
      userName: 'user-seed-2',
      password: hashedPassword,
      ingredient: {
        name: 'test2',
        kcal: '250',
        protein: '15',
        fat: '20',
        carbs: '25',
      },
      meal: {
        name: 'mealname2',
        formValues: [
          {
            weight: 100,
            ingredient_id: 4,
          },
          {
            weight: 200,
            ingredient_id: 2,
          },
          {
            weight: 300,
            ingredient_id: 5001,
          },
        ],
      },
    },
  ];

  for (const data of testData) {
    const user = await prisma.user.create({
      data: {
        name: data.userName,
        // password: data.password,
      },
    });

    await prisma.ingredient.create({
      data: {
        name: data.ingredient.name,
        kcal: data.ingredient.kcal,
        protein: data.ingredient.protein,
        fat: data.ingredient.fat,
        carbs: data.ingredient.carbs,
        userId: user.id,
      },
    });

    await prisma.meal.create({
      data: {
        name: data.meal.name,
        formValues: data.meal.formValues,
        userId: user.id,
      },
    });
  }
  */
}

populate();
