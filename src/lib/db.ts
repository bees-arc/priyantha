import fs from 'fs';
import path from 'path';
import { BusinessSettings, Category, InquiryEvent, Product } from '@/types';
import { initialCategories, initialProducts, initialSettings } from '@/data/initialData';

interface DatabaseSchema {
  settings: BusinessSettings;
  categories: Category[];
  products: Product[];
  inquiries: InquiryEvent[];
}

const DB_FILE = path.join(process.cwd(), 'src', 'data', 'store.json');

function ensureDataFile(): DatabaseSchema {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial: DatabaseSchema = {
        settings: initialSettings,
        categories: initialCategories,
        products: initialProducts,
        inquiries: [],
      };
      fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2), 'utf-8');
      return initial;
    }
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    return {
      settings: parsed.settings || initialSettings,
      categories: parsed.categories || initialCategories,
      products: parsed.products || initialProducts,
      inquiries: parsed.inquiries || [],
    };
  } catch (error) {
    console.error('Error reading database file:', error);
    return {
      settings: initialSettings,
      categories: initialCategories,
      products: initialProducts,
      inquiries: [],
    };
  }
}

function saveData(data: DatabaseSchema): void {
  try {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing database file:', error);
  }
}

// Business Settings
export function getBusinessSettings(): BusinessSettings {
  const db = ensureDataFile();
  return db.settings;
}

export function updateBusinessSettings(newSettings: Partial<BusinessSettings>): BusinessSettings {
  const db = ensureDataFile();
  db.settings = { ...db.settings, ...newSettings };
  saveData(db);
  return db.settings;
}

// Categories
export function getCategories(includeInactive = false): Category[] {
  const db = ensureDataFile();
  if (includeInactive) return db.categories;
  return db.categories.filter((c) => c.isActive);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  const db = ensureDataFile();
  return db.categories.find((c) => c.slug === slug);
}

export function saveCategory(category: Category): Category {
  const db = ensureDataFile();
  const index = db.categories.findIndex((c) => c.id === category.id);
  if (index >= 0) {
    db.categories[index] = category;
  } else {
    db.categories.push(category);
  }
  saveData(db);
  return category;
}

export function deleteCategory(id: string): boolean {
  const db = ensureDataFile();
  db.categories = db.categories.filter((c) => c.id !== id);
  saveData(db);
  return true;
}

// Products
export function getProducts(options?: {
  status?: string;
  categorySlug?: string;
  featured?: boolean;
  search?: string;
  brand?: string;
}): Product[] {
  const db = ensureDataFile();
  let list = db.products;

  // By default for public website, only show 'published' products unless explicitly requested
  if (options?.status) {
    if (options.status !== 'all') {
      list = list.filter((p) => p.status === options.status);
    }
  } else {
    list = list.filter((p) => p.status === 'published');
  }

  if (options?.categorySlug) {
    list = list.filter((p) => p.categorySlug === options.categorySlug);
  }

  if (options?.featured !== undefined) {
    list = list.filter((p) => p.featured === options.featured);
  }

  if (options?.brand) {
    list = list.filter((p) => p.brand?.toLowerCase() === options.brand?.toLowerCase());
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.brand?.toLowerCase().includes(q) ||
        p.model?.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );
  }

  return list;
}

export function getProductBySlug(slug: string): Product | undefined {
  const db = ensureDataFile();
  return db.products.find((p) => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  const db = ensureDataFile();
  return db.products.find((p) => p.id === id);
}

export function saveProduct(product: Product): Product {
  const db = ensureDataFile();
  const index = db.products.findIndex((p) => p.id === product.id);
  const now = new Date().toISOString();
  if (index >= 0) {
    db.products[index] = { ...product, updatedAt: now };
  } else {
    db.products.push({ ...product, createdAt: now, updatedAt: now });
  }
  saveData(db);
  return product;
}

export function deleteProduct(id: string): boolean {
  const db = ensureDataFile();
  db.products = db.products.filter((p) => p.id !== id);
  saveData(db);
  return true;
}

// Inquiries
export function getInquiries(): InquiryEvent[] {
  const db = ensureDataFile();
  return db.inquiries.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function logInquiry(event: Omit<InquiryEvent, 'id' | 'createdAt'>): InquiryEvent {
  const db = ensureDataFile();
  const newEvent: InquiryEvent = {
    ...event,
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    createdAt: new Date().toISOString(),
  };
  db.inquiries.unshift(newEvent);
  // keep last 500 inquiries
  if (db.inquiries.length > 500) {
    db.inquiries = db.inquiries.slice(0, 500);
  }
  saveData(db);
  return newEvent;
}
