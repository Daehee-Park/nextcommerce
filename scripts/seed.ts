// scripts/seed.ts
import { writeFile } from 'fs/promises';
import path from 'path';
import { faker } from '@faker-js/faker';

const CATEGORIES = [
  'Electronics','Home','Beauty','Fashion','Sports','Books','Toys','Office','Pet','Automotive',
  'Garden','Health','Baby','Music','Games','Outdoors','Photo','Appliances','DIY','Food'
];

const BRANDS = ['Acme','Zenova','HyperTech','K-Craft','NeoLife','SunLabs','Cloud9','K-Home','FitGo','ProSound'];

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

function imageSet(seed: number) {
  const base = `https://picsum.photos/seed/${seed}`;
  return [
    { url: `${base}/320/320`, w: 320, h: 320 },
    { url: `${base}/640/640`, w: 640, h: 640 },
    { url: `${base}/1200/1200`, w: 1200, h: 1200 },
  ];
}

async function main(count = 10000) {
  faker.seed(42);
  const items = Array.from({ length: count }).map((_, i) => {
    const title = faker.commerce.productName();
    const price = faker.number.int({ min: 5000, max: 999000 });
    const discountPercent = faker.number.int({ min: 0, max: 40 });
    const rating = Number((faker.number.float({ min: 3, max: 5, multipleOf: 0.1 })).toFixed(1));
    const ratingCount = faker.number.int({ min: 0, max: 5000 });
    const category = faker.helpers.arrayElement(CATEGORIES);
    const brand = faker.helpers.arrayElement(BRANDS);
    const slug = `${slugify(title)}-${String(i + 1).padStart(5, '0')}`;
    const imgs = imageSet(i + 1);

    return {
      id: i + 1,
      slug,
      title,
      description: faker.commerce.productDescription(),
      priceKRW: price,
      discountPercent,
      category,
      brand,
      rating,
      ratingCount,
      stock: faker.number.int({ min: 0, max: 200 }),
      images: imgs,
      createdAt: faker.date.past({ years: 2 }).toISOString(),
    };
  });

  const out = path.join(process.cwd(), 'data', 'products.json');
  await writeFile(out, JSON.stringify(items), 'utf-8');
  console.log(`Wrote ${items.length} products -> ${out}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});