import { PrismaClient } from '@prisma/client';
import { parse } from 'csv-parse';
import fs from 'fs';

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
    .pipe(parse({ delimiter: ';', from_line: 2 }))
    .on('data', async function (row) {
      if (row[0] > startFromId) {
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
