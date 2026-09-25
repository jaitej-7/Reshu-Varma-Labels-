import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Product,
  Collection,
  Category,
  Enquiry,
  Appointment,
  MediaAsset,
  Editorial,
  VideoItem,
  RedirectRule,
  UserAccount,
  ActivityLog,
  HomepageSection,
  StudioSettings,
  EnquiryStatus,
  AppointmentStatus
} from '../types';
import {
  initialProducts,
  initialCollections,
  initialCategories,
  initialEnquiries,
  initialAppointments,
  initialMediaAssets,
  initialEditorials,
  initialVideos,
  initialRedirects,
  initialUsers,
  initialActivityLogs,
  initialHomepageSections,
  initialStudioSettings
} from './mockData';

export type AdminSection =
  | 'dashboard'
  | 'products'
  | 'collections'
  | 'categories'
  | 'editorial'
  | 'videos'
  | 'pages'
  | 'homepage_builder'
  | 'navigation'
  | 'media_library'
  | 'enquiries'
  | 'appointments'
  | 'seo_dashboard'
  | 'seo_audit'
  | 'redirects'
  | 'sitemap'
  | 'analytics'
  | 'integrations'
  | 'users'
  | 'activity_log'
  | 'settings';

interface AppContextType {
  // Navigation & View Mode
  currentView: 'storefront' | 'admin';
  setCurrentView: (view: 'storefront' | 'admin') => void;
  activeVariant: 'variant-a' | 'variant-b';
  setActiveVariant: (variant: 'variant-a' | 'variant-b') => void;
  activePage: 'home' | 'category' | 'atelier' | 'real-brides' | 'lookbook' | 'contact';
  activeCategorySlug: string;
  setActivePage: (page: 'home' | 'category' | 'atelier' | 'real-brides' | 'lookbook' | 'contact', categorySlug?: string) => void;
  adminSection: AdminSection;
  setAdminSection: (section: AdminSection) => void;
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (cat: string) => void;
  selectedProductModal: Product | null;
  setSelectedProductModal: (prod: Product | null) => void;
  isAppointmentModalOpen: boolean;
  setIsAppointmentModalOpen: (open: boolean) => void;
  isTransactionModalOpen: boolean;
  setIsTransactionModalOpen: (open: boolean) => void;
  transactionProduct: Product | null;
  setTransactionProduct: (prod: Product | null) => void;

  // Data Collections
  products: Product[];
  collections: Collection[];
  categories: Category[];
  enquiries: Enquiry[];
  appointments: Appointment[];
  mediaAssets: MediaAsset[];
  editorials: Editorial[];
  videos: VideoItem[];
  redirects: RedirectRule[];
  users: UserAccount[];
  activityLogs: ActivityLog[];
  homepageSections: HomepageSection[];
  settings: StudioSettings;

  // Actions
  addProduct: (product: Omit<Product, 'id' | 'updatedAt'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  duplicateProduct: (id: string) => void;

  updateEnquiryStatus: (id: string, status: EnquiryStatus, notes?: string) => void;
  addEnquiry: (enquiry: Omit<Enquiry, 'id' | 'date' | 'status'>) => void;

  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus, notes?: string) => void;

  addMediaAsset: (asset: Omit<MediaAsset, 'id' | 'uploadedAt' | 'usageCount'>) => void;
  deleteMediaAsset: (id: string) => void;

  addRedirect: (rule: Omit<RedirectRule, 'id' | 'hits' | 'createdAt'>) => void;
  deleteRedirect: (id: string) => void;

  updateHomepageSections: (sections: HomepageSection[]) => void;
  updateSettings: (newSettings: Partial<StudioSettings>) => void;
  logActivity: (action: string, entity: string, details: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<'storefront' | 'admin'>('storefront');
  const [activeVariant, setActiveVariant] = useState<'variant-a' | 'variant-b'>('variant-a');
  const [activePage, setActivePageState] = useState<'home' | 'category' | 'atelier' | 'real-brides' | 'lookbook' | 'contact'>('home');
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>('kanchi-silk-sarees');
  const [adminSection, setAdminSection] = useState<AdminSection>('dashboard');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('All');
  const [selectedProductModal, setSelectedProductModal] = useState<Product | null>(null);
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState<boolean>(false);
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState<boolean>(false);
  const [transactionProduct, setTransactionProduct] = useState<Product | null>(null);

  const setActivePage = (page: 'home' | 'category' | 'atelier' | 'real-brides' | 'lookbook' | 'contact', categorySlug?: string) => {
    setActivePageState(page);
    if (categorySlug) {
      setActiveCategorySlug(categorySlug);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Stored state
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [collections, setCollections] = useState<Collection[]>(initialCollections);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [mediaAssets, setMediaAssets] = useState<MediaAsset[]>(initialMediaAssets);
  const [editorials, setEditorials] = useState<Editorial[]>(initialEditorials);
  const [videos, setVideos] = useState<VideoItem[]>(initialVideos);
  const [redirects, setRedirects] = useState<RedirectRule[]>(initialRedirects);
  const [users, setUsers] = useState<UserAccount[]>(initialUsers);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(initialActivityLogs);
  const [homepageSections, setHomepageSections] = useState<HomepageSection[]>(initialHomepageSections);
  const [settings, setSettings] = useState<StudioSettings>(initialStudioSettings);

  const logActivity = (action: string, entity: string, details: string) => {
    const newLog: ActivityLog = {
      id: `act-${Date.now()}`,
      date: 'Just now',
      userName: 'Reshma Varma',
      userEmail: 'reshmavarma7000@gmail.com',
      action,
      entity,
      details
    };
    setActivityLogs(prev => [newLog, ...prev]);
  };

  const addProduct = (prodData: Omit<Product, 'id' | 'updatedAt'>) => {
    const newProd: Product = {
      ...prodData,
      id: `prod-${Date.now()}`,
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [newProd, ...prev]);
    logActivity('Product Created', `Product: ${newProd.name}`, `Added new item with SKU ${newProd.sku}`);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? { ...p, ...updated, updatedAt: new Date().toISOString().split('T')[0] } : p))
    );
    logActivity('Product Updated', `Product ID: ${id}`, `Modified attributes and SEO configuration.`);
  };

  const deleteProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    setProducts(prev => prev.filter(p => p.id !== id));
    logActivity('Product Deleted', `Product: ${target?.name || id}`, 'Archived from catalog.');
  };

  const duplicateProduct = (id: string) => {
    const target = products.find(p => p.id === id);
    if (!target) return;
    const clone: Product = {
      ...target,
      id: `prod-${Date.now()}`,
      name: `${target.name} (Copy)`,
      slug: `${target.slug}-copy`,
      sku: `${target.sku}-DUP`,
      status: 'draft',
      updatedAt: new Date().toISOString().split('T')[0]
    };
    setProducts(prev => [clone, ...prev]);
    logActivity('Product Duplicated', `Product: ${clone.name}`, `Cloned from ${target.name}`);
  };

  const updateEnquiryStatus = (id: string, status: EnquiryStatus, notes?: string) => {
    setEnquiries(prev =>
      prev.map(e => (e.id === id ? { ...e, status, internalNotes: notes || e.internalNotes } : e))
    );
    logActivity('Enquiry Pipeline Updated', `Enquiry ID: ${id}`, `Status moved to ${status.toUpperCase()}`);
  };

  const addEnquiry = (enqData: Omit<Enquiry, 'id' | 'date' | 'status'>) => {
    const newEnq: Enquiry = {
      ...enqData,
      id: `enq-${Date.now()}`,
      date: 'Just now',
      status: 'new'
    };
    setEnquiries(prev => [newEnq, ...prev]);
    logActivity('New Lead Ingested', `Customer: ${newEnq.name}`, `New inquiry via ${newEnq.type}`);
  };

  const addAppointment = (aptData: Omit<Appointment, 'id' | 'status'>) => {
    const newApt: Appointment = {
      ...aptData,
      id: `apt-${Date.now()}`,
      status: 'confirmed'
    };
    setAppointments(prev => [newApt, ...prev]);
    logActivity('Appointment Booked', `Client: ${newApt.customerName}`, `${newApt.type} scheduled for ${newApt.date} at ${newApt.time}`);
  };

  const updateAppointmentStatus = (id: string, status: AppointmentStatus, notes?: string) => {
    setAppointments(prev =>
      prev.map(a => (a.id === id ? { ...a, status, notes: notes || a.notes } : a))
    );
    logActivity('Appointment Status Changed', `Appointment ID: ${id}`, `Status updated to ${status}`);
  };

  const addMediaAsset = (assetData: Omit<MediaAsset, 'id' | 'uploadedAt' | 'usageCount'>) => {
    const newAsset: MediaAsset = {
      ...assetData,
      id: `med-${Date.now()}`,
      usageCount: 0,
      uploadedAt: new Date().toISOString().split('T')[0]
    };
    setMediaAssets(prev => [newAsset, ...prev]);
    logActivity('Media Uploaded', `Asset: ${newAsset.fileName}`, `Dimensions: ${newAsset.dimensions}, Size: ${newAsset.size}`);
  };

  const deleteMediaAsset = (id: string) => {
    setMediaAssets(prev => prev.filter(m => m.id !== id));
    logActivity('Media Deleted', `Media ID: ${id}`, 'Asset removed from library.');
  };

  const addRedirect = (ruleData: Omit<RedirectRule, 'id' | 'hits' | 'createdAt'>) => {
    const newRule: RedirectRule = {
      ...ruleData,
      id: `red-${Date.now()}`,
      hits: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRedirects(prev => [newRule, ...prev]);
    logActivity('Redirect Added', `${newRule.oldUrl} ➔ ${newRule.newUrl}`, `Type: ${newRule.type}`);
  };

  const deleteRedirect = (id: string) => {
    setRedirects(prev => prev.filter(r => r.id !== id));
    logActivity('Redirect Removed', `Redirect ID: ${id}`, '301 rule deleted.');
  };

  const updateHomepageSections = (newSections: HomepageSection[]) => {
    setHomepageSections(newSections);
    logActivity('Homepage Sections Reordered', 'Homepage Layout', 'Updated drag-and-drop section arrangement and visibility.');
  };

  const updateSettings = (newSettings: Partial<StudioSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
    logActivity('Studio Settings Updated', 'Global Settings', 'Updated brand contact and consultation configuration.');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        activeVariant,
        setActiveVariant,
        activePage,
        activeCategorySlug,
        setActivePage,
        adminSection,
        setAdminSection,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedProductModal,
        setSelectedProductModal,
        isAppointmentModalOpen,
        setIsAppointmentModalOpen,
        isTransactionModalOpen,
        setIsTransactionModalOpen,
        transactionProduct,
        setTransactionProduct,
        products,
        collections,
        categories,
        enquiries,
        appointments,
        mediaAssets,
        editorials,
        videos,
        redirects,
        users,
        activityLogs,
        homepageSections,
        settings,
        addProduct,
        updateProduct,
        deleteProduct,
        duplicateProduct,
        updateEnquiryStatus,
        addEnquiry,
        addAppointment,
        updateAppointmentStatus,
        addMediaAsset,
        deleteMediaAsset,
        addRedirect,
        deleteRedirect,
        updateHomepageSections,
        updateSettings,
        logActivity
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppStore = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return context;
};
