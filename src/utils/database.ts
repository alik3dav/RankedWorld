import fs from 'fs';
import path from 'path';

// const DB_PATH = path.join(process.cwd(), 'src/data/data.json');
const DB_PATH = '/src/data/data.json';
// Ensure this code is only used in server-side logic
// const DB_PATH = path.join(process.cwd(), 'src/data/data.json');

export const readDatabase = () => {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading database:', error);
    return null;
  }
};

export const writeDatabase = (data: any) => {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    console.error('Error writing to database:', error);
    return false;
  }
};

export const updateItem = (
  category: string,
  itemId: number,
  updatedItem: any
) => {
  const db = readDatabase();
  if (!db) return false;

  const itemIndex = db[category].findIndex((item: any) => item.id === itemId);
  if (itemIndex === -1) return false;

  db[category][itemIndex] = { ...db[category][itemIndex], ...updatedItem };
  return writeDatabase(db);
};

export const deleteItem = (category: string, itemId: number) => {
  const db = readDatabase();
  if (!db) return false;

  db[category] = db[category].filter((item: any) => item.id !== itemId);
  return writeDatabase(db);
};

export const addItem = (category: string, newItem: any) => {
  const db = readDatabase();
  if (!db) return false;

  const maxId = Math.max(...db[category].map((item: any) => item.id), 0);
  newItem.id = maxId + 1;

  db[category].push(newItem);
  return writeDatabase(db);
};
