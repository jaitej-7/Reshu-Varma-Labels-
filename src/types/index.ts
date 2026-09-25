export type ProductStatus = 'draft' | 'published' | 'archived';
export type EnquiryStatus = 'new' | 'contacted' | 'qualified' | 'closed';
export type AppointmentStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'noshow';
export type AppointmentType = 'in_person' | 'virtual_video';
export type UserRole = 'super_admin' | 'admin' | 'content_manager' | 'seo_manager' | 'marketing_manager' | 'enquiry_manager';

export interface Product {
  id: string;
  name: string;
  slug: string;
  sku: string;
  category: string;
  collection: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  status: ProductStatus;
  publishDate: string;
  isNew: boolean;
  isFeatured: boolean;
  images: string[];
  featuredImage: string;
  videoUrl?: string;
  altText?: string;
  caption?: string;
  details: {
    fabric: string;
    colour: string;
    craft: string;
    sizes: string[];
    customization: string;
    care: string;
    availability: string;
    price?: string;
  };
  relatedProductIds: string[];
  seo: {
    title: string;
    metaDescription: string;
    focusKeyword: string;
    secondaryKeywords: string[];
    canonicalUrl: string;
    index: boolean;
    follow: boolean;
    sitemapInclusion: boolean;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
  };
  updatedAt: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  season: string;
  year: string;
  description: string;
  heroImage: string;
  heroVideo?: string;
  gallery: string[];
  story: string;
  productIds: string[];
  status: 'active' | 'archived' | 'upcoming';
  updatedAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  description: string;
  image: string;
  productCount: number;
  status: 'active' | 'hidden';
  seoTitle?: string;
  metaDescription?: string;
}

export interface Editorial {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  category: string;
  tags: string[];
  publishDate: string;
  status: 'draft' | 'published' | 'archived';
  relatedProductIds: string[];
  readTime: string;
}

export interface VideoItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  collection: string;
  category: string;
  duration: string;
  credits: string;
  publishDate: string;
  status: 'published' | 'draft';
}

export interface Enquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'general' | 'bridal_custom' | 'product_inquiry' | 'trousseau';
  productName?: string;
  productSku?: string;
  message: string;
  date: string;
  status: EnquiryStatus;
  assignedTo?: string;
  internalNotes?: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  location: 'Studio Atelier (Hyderabad)' | 'Virtual Video Consultation';
  type: AppointmentType;
  category: string;
  weddingDate?: string;
  status: AppointmentStatus;
  notes?: string;
  assignedConsultant?: string;
}

export interface MediaAsset {
  id: string;
  fileName: string;
  url: string;
  type: 'image' | 'video' | 'document';
  dimensions: string;
  size: string;
  altText: string;
  title: string;
  caption: string;
  description: string;
  usageCount: number;
  uploadedAt: string;
  usedIn: string[];
}

export interface RedirectRule {
  id: string;
  oldUrl: string;
  newUrl: string;
  type: '301' | '302';
  status: 'active' | 'inactive';
  hits: number;
  createdAt: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: 'active' | 'inactive';
  avatar?: string;
  lastLogin: string;
}

export interface ActivityLog {
  id: string;
  date: string;
  userName: string;
  userEmail: string;
  action: string;
  entity: string;
  details: string;
}

export interface HomepageSection {
  id: string;
  name: string;
  type: 'hero' | 'new_collection' | 'curated_products' | 'video_spotlight' | 'featured_collection' | 'editorial' | 'brand_story' | 'real_brides' | 'appointment_cta';
  enabled: boolean;
  title: string;
  subtitle?: string;
  order: number;
}

export interface StudioSettings {
  brandName: string;
  tagline: string;
  whatsappNumber: string;
  primaryPhone: string;
  contactEmail: string;
  studioAddress: string;
  studioTimings: string;
  instagramUrl: string;
  consultationPolicy: string;
  metaPixelId?: string;
  googleAnalyticsId?: string;
  searchConsoleCode?: string;
}
