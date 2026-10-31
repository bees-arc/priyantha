export type AvailabilityStatus = 'in_stock' | 'out_of_stock' | 'pre_order' | 'ask_availability';
export type PriceVisibility = 'visible' | 'ask_for_price';
export type ProductStatus = 'published' | 'draft' | 'archived';

export interface ProductSpecification {
  id: string;
  name: string;
  value: string;
}

export interface ProductVariant {
  id: string;
  name: string;
  value: string;
  sku?: string;
  priceOverride?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  description: string;
  categoryId: string;
  categorySlug: string;
  categoryName: string;
  subcategoryId?: string;
  subcategoryName?: string;
  brand?: string;
  model?: string;
  price?: number;
  originalPrice?: number;
  priceVisibility: PriceVisibility;
  availability: AvailabilityStatus;
  status: ProductStatus;
  featured: boolean;
  images: ProductImage[];
  specifications: ProductSpecification[];
  variants: ProductVariant[];
  provenance: {
    source: string;
    evidenceFile?: string;
    verificationStatus: 'VERIFIED' | 'NEEDS_CONFIRMATION' | 'NOT_AVAILABLE';
    notes?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl?: string;
  iconName?: string;
  sortOrder: number;
  isActive: boolean;
  subcategories: {
    id: string;
    name: string;
    slug: string;
    description?: string;
  }[];
}

export interface BusinessSettings {
  id: string;
  businessName: string;
  tagline: string;
  whatsappNumber: string; // international digits without + e.g. 94722451812
  displayWhatsappNumber: string; // e.g. 072 245 1812
  telephone: string; // e.g. 077 797 4777
  landline?: string; // e.g. 038 223 2754
  email: string; // e.g. priyanthatradingpip@gmail.com
  address: string; // No: 388A Galle Road, Panadura, Sri Lanka
  town: string; // Panadura
  operatingHours: string;
  brandColors: {
    primary: string; // #14213D
    secondary: string; // #24375A
    accent: string; // #E8EDF5
  };
  socialLinks: {
    facebook: string;
  };
  announcementBar: {
    enabled: boolean;
    text: string;
    link?: string;
  };
}

export interface InquiryEvent {
  id: string;
  productId: string;
  productName: string;
  productSku: string;
  variant?: string;
  quantity: number;
  createdAt: string;
  deviceType?: 'mobile' | 'desktop' | 'tablet';
}
