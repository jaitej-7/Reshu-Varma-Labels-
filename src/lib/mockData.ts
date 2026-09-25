import {
  Product,
  Collection,
  Category,
  Editorial,
  VideoItem,
  Enquiry,
  Appointment,
  MediaAsset,
  RedirectRule,
  UserAccount,
  ActivityLog,
  HomepageSection,
  StudioSettings
} from '../types';

export const initialStudioSettings: StudioSettings = {
  brandName: 'Reshu Varma Label',
  tagline: 'Heirloom Kanchipuram Silks & Bespoke Bridal Couture',
  whatsappNumber: '9933334489',
  primaryPhone: '7893405600',
  contactEmail: 'reshmavarma7000@gmail.com',
  studioAddress: 'Road No. 36, Jubilee Hills, Hyderabad (By Appointment Only)',
  studioTimings: 'Monday - Saturday: 11:00 AM - 7:00 PM (Prior Appointment Required)',
  instagramUrl: 'https://www.instagram.com/reshuvarmalabel?stkn=dHQ0eXNzMDdrdjBh&utm_source=qr',
  consultationPolicy: 'Each bride is hosted privately for a 90-minute bespoke curation session with our master couturiers and styling advisors.',
  metaPixelId: 'PIXEL-98421094',
  googleAnalyticsId: 'G-RVL889201',
  searchConsoleCode: 'google-site-verification=rvl_luxury_couture_2026'
};

export const initialProducts: Product[] = [
  {
    id: 'prod-1',
    name: 'Aadrika Pure Tissue Kanchipuram Silk Saree',
    slug: 'aadrika-pure-tissue-kanchipuram-silk-saree',
    sku: 'RV-KNC-0104',
    category: 'Kanchi Silk Sarees',
    collection: 'Aalayam Royal Heritage 2026',
    shortDescription: 'Liquid gold tissue handwoven Kanchipuram silk adorned with antique silver zari floral jaal and korvai peacock border.',
    fullDescription: 'Handcrafted across 42 days by master generational weavers, the Aadrika saree epitomizes modern regal elegance. Woven with pure mulberry silk wrapped in 3-ply 98.5% pure silver gilded gold zari, it drapes like liquid light. Paired with an unstitched brocade blouse piece with matching kadhwa motifs.',
    tags: ['Pure Silk', 'Pure Gold Zari', 'Bridal Saree', 'Kanchipuram', 'Heirloom'],
    status: 'published',
    publishDate: '2026-08-15',
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-bouquet-of-flowers-41655-large.mp4',
    altText: 'Reshu Varma Label Aadrika Pure Tissue Kanchipuram Silk Bridal Saree with Antique Gold Zari',
    caption: 'Pure Handloom Silk with Certified Pure Zari',
    details: {
      fabric: 'Pure Mulberry Silk & Liquid Gold Tissue',
      colour: 'Champagne Gold with Muted Rose Korvai Border',
      craft: 'Authentic Korvai Handloom Weaving with Antique Silver-Gold Zari Jaal',
      sizes: ['Custom Draped / Standard 6.2m with Blouse'],
      customization: 'Personalized monogram weaving and bespoke pallu date embroidery available on order.',
      care: 'Strictly dry clean only. Store wrapped in pure unbleached muslin fabric.',
      availability: 'Made-to-Order (4-6 weeks) / Select Ready Pieces in Studio',
      price: 'Price On Request / Bespoke Consultation'
    },
    relatedProductIds: ['prod-3', 'prod-4'],
    seo: {
      title: 'Aadrika Pure Tissue Kanchi Silk Saree | Reshu Varma Label',
      metaDescription: 'Discover the Aadrika bridal Kanchipuram silk saree by Reshu Varma. Handwoven in liquid gold tissue with certified pure zari for modern royal brides.',
      focusKeyword: 'Kanchipuram tissue silk saree',
      secondaryKeywords: ['bridal silk saree', 'pure gold zari saree', 'reshu varma saree'],
      canonicalUrl: 'https://reshuvarmalabel.com/product/aadrika-pure-tissue-kanchipuram-silk-saree',
      index: true,
      follow: true,
      sitemapInclusion: true,
      ogTitle: 'Aadrika Pure Tissue Kanchipuram Saree - Reshu Varma Label',
      ogDescription: 'Heirloom pure tissue Kanchi saree in champagne gold with antique korvai border.',
      ogImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200'
    },
    updatedAt: '2026-09-15'
  },
  {
    id: 'prod-2',
    name: 'Mehrunissa Zardozi Bridal Lehenga in Rose Quartz',
    slug: 'mehrunissa-zardozi-bridal-lehenga-rose-quartz',
    sku: 'RV-LHG-0219',
    category: 'Bridal Lehengas',
    collection: 'Noor-e-Khaas Bridal Haute Couture',
    shortDescription: 'Pastel rose quartz silk lehenga embroidered with micro-pearls, pita work, and 24k gold gilded zardozi dabka.',
    fullDescription: 'The Mehrunissa lehenga features 16 flared kalis hand-embroidered with archival Persian architectural floral arches. Complemented by dual dupattas: one in scalloped handloom tissue silk and a featherlight gossamer bridal veil with bespoke calligraphy borders.',
    tags: ['Bridal Lehenga', 'Zardozi', 'Pastel Bride', 'Custom Couture', 'Hand Embroidered'],
    status: 'published',
    publishDate: '2026-08-10',
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
    altText: 'Mehrunissa Rose Quartz Zardozi Bridal Lehenga by Reshu Varma',
    details: {
      fabric: 'Handwoven Raw Silk & Soft French Tulle Dupattas',
      colour: 'Rose Quartz Pastel with Vintage Gold & Champagne Accents',
      craft: 'Intricate Zardozi, Micro-Seed Pearls, French Knots & Cutdana Work',
      sizes: ['Custom Bespoke Tailored to Bride Measurements'],
      customization: 'Can Can volume customization, neckline personalization, and bridal name/mantra embroidery on waistbelt or veil.',
      care: 'Dry clean only. Preserve in archival conservation box provided.',
      availability: 'Bespoke Order (8-10 weeks craft time)',
      price: 'Price On Request'
    },
    relatedProductIds: ['prod-4', 'prod-5'],
    seo: {
      title: 'Mehrunissa Pastel Zardozi Bridal Lehenga | Reshu Varma Label',
      metaDescription: 'Shop the Mehrunissa Rose Quartz bridal lehenga with antique zardozi and dual veil dupattas from Reshu Varma Label bespoke couture.',
      focusKeyword: 'pastel bridal lehenga zardozi',
      secondaryKeywords: ['designer bridal lehenga', 'rose quartz lehenga', 'custom bridal couture'],
      canonicalUrl: 'https://reshuvarmalabel.com/product/mehrunissa-zardozi-bridal-lehenga-rose-quartz',
      index: true,
      follow: true,
      sitemapInclusion: true
    },
    updatedAt: '2026-09-12'
  },
  {
    id: 'prod-3',
    name: 'Noorani Cutwork Designer Embroidered Blouse',
    slug: 'noorani-cutwork-designer-embroidered-blouse',
    sku: 'RV-BLS-0308',
    category: 'Designer Blouses',
    collection: 'Aalayam Royal Heritage 2026',
    shortDescription: 'Ivory raw silk blouse with scalloped cutwork sleeves, aari work peacocks, and hand-strung real freshwater pearl hangings.',
    fullDescription: 'Crafted to elevate heirloom Kanchi silk sarees, the Noorani blouse features structured princess cut sculpting, deep sweetheart neckline, and back tassel dori with artisanal gold coin latkans.',
    tags: ['Designer Blouse', 'Cutwork', 'Bridal Blouse', 'Aari Work', 'Pure Silk'],
    status: 'published',
    publishDate: '2026-08-01',
    isNew: false,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200',
    altText: 'Noorani Embroidered Cutwork Bridal Blouse Reshu Varma',
    details: {
      fabric: 'Matte Raw Silk with Padded Butter-Crepe Lining',
      colour: 'Ivory Alabaster with Antique Gold Zari and Pearl Motifs',
      craft: 'Hand Aari Embroidery, Marodi Work & Pearl Embellishments',
      sizes: ['32', '34', '36', '38', '40', '42', 'Custom Fitting'],
      customization: 'Sleeve length adjustment, back neckline depth, and color customization to match your heirloom saree.',
      care: 'Dry clean only.',
      availability: 'Ready-to-Fit & Custom Bespoke (2-3 weeks)',
      price: 'Price On Request'
    },
    relatedProductIds: ['prod-1', 'prod-4'],
    seo: {
      title: 'Noorani Cutwork Designer Bridal Blouse | Reshu Varma Label',
      metaDescription: 'Explore the Noorani bridal cutwork blouse featuring intricate aari work and pearls by Reshu Varma Label Hyderabad.',
      focusKeyword: 'bridal embroidered blouse',
      secondaryKeywords: ['cutwork silk blouse', 'kanchi saree blouse design'],
      canonicalUrl: 'https://reshuvarmalabel.com/product/noorani-cutwork-designer-embroidered-blouse',
      index: true,
      follow: true,
      sitemapInclusion: true
    },
    updatedAt: '2026-09-10'
  },
  {
    id: 'prod-4',
    name: 'Suhani Celestial Gossamer Bridal Veil',
    slug: 'suhani-celestial-gossamer-bridal-veil',
    sku: 'RV-VEL-0412',
    category: 'Bridal Veils',
    collection: 'Noor-e-Khaas Bridal Haute Couture',
    shortDescription: '3.5-meter cathedral length blush tulle veil bordered with scalloped marodi embroidery and customizable wedding vows.',
    fullDescription: 'Ethereal and ultra-lightweight, the Suhani Bridal Veil floats gracefully with every step. Edged with hand-carved scalloped borders and micro-sequins that catch the light during walking down the aisle.',
    tags: ['Bridal Veil', 'Cathedral Veil', 'Bridal Dupatta', 'Custom Embroidery'],
    status: 'published',
    publishDate: '2026-07-25',
    isNew: true,
    isFeatured: false,
    images: [
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=1200',
    altText: 'Suhani Gossamer Bridal Veil with Personalized Calligraphy Reshu Varma',
    details: {
      fabric: 'Ultra-Fine French Illusion Tulle & Organza Silk Trim',
      colour: 'Blush Whisper / Ivory Veil with Antique Gold Threadwork',
      craft: 'Fine Marodi Scalloping, Gota Patti & Personalized Monogram/Vow Calligraphy',
      sizes: ['Cathedral Length (3.5m) / Royal Length (4.5m)'],
      customization: 'Embroider bride and groom initials, wedding date, or custom shlokas along the trail border.',
      care: 'Steam iron gently on low heat. Dry clean only.',
      availability: 'Bespoke Order (3-4 weeks)',
      price: 'Price On Request'
    },
    relatedProductIds: ['prod-2', 'prod-1'],
    seo: {
      title: 'Suhani Cathedral Bridal Veil & Dupatta | Reshu Varma Label',
      metaDescription: 'Personalized bespoke bridal veil with hand embroidery and monogram vows by Reshu Varma Label.',
      focusKeyword: 'bridal veil customization',
      secondaryKeywords: ['custom wedding veil', 'indian bridal veil'],
      canonicalUrl: 'https://reshuvarmalabel.com/product/suhani-celestial-gossamer-bridal-veil',
      index: true,
      follow: true,
      sitemapInclusion: true
    },
    updatedAt: '2026-09-08'
  },
  {
    id: 'prod-5',
    name: 'Shahryar Raw Silk Men’s Heritage Sherwani Ensemble',
    slug: 'shahryar-raw-silk-mens-heritage-sherwani-ensemble',
    sku: 'RV-MEN-0520',
    category: "Men's Wear",
    collection: 'Shaahi Riyaasat Groom Collection',
    shortDescription: 'Alabaster raw silk groom sherwani with tonal resham jaal, handcrafted gold buttons, and pure tissue stole.',
    fullDescription: 'Designed for the discerning royal groom, the Shahryar ensemble pairs structured silhouettes with subtle opulence. Includes the main sherwani, chudidar, safa fabric, and coordinating handloom tissue stole matching the bride’s pastel palette.',
    tags: ["Men's Wear", 'Sherwani', 'Groom Attire', 'Royal Couture', 'Raw Silk'],
    status: 'published',
    publishDate: '2026-08-18',
    isNew: true,
    isFeatured: true,
    images: [
      'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200'
    ],
    featuredImage: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=1200',
    altText: 'Shahryar Men Raw Silk Groom Sherwani by Reshu Varma Label',
    details: {
      fabric: 'Pure Matka Raw Silk & Handloom Tissue Silk Stole',
      colour: 'Alabaster Ivory with Champagne Resham Highlights',
      craft: 'Tone-on-Tone Kashmiri Resham Embroidery & Hand-Cast Antique Brass Buttons',
      sizes: ['38', '40', '42', '44', 'Custom Made-to-Measure'],
      customization: 'Coordinated color palette matching the bride’s bridal ensemble and custom safa styling.',
      care: 'Professional dry clean only.',
      availability: 'Bespoke Order (6-8 weeks)',
      price: 'Price On Request'
    },
    relatedProductIds: ['prod-1', 'prod-2'],
    seo: {
      title: 'Shahryar Groom Raw Silk Sherwani | Reshu Varma Label',
      metaDescription: 'Royal groom sherwani in pure raw silk with tone-on-tone embroidery by Reshu Varma Label.',
      focusKeyword: 'groom sherwani bespoke',
      secondaryKeywords: ['designer mens sherwani', 'royal groom wear hyderabad'],
      canonicalUrl: 'https://reshuvarmalabel.com/product/shahryar-raw-silk-mens-heritage-sherwani-ensemble',
      index: true,
      follow: true,
      sitemapInclusion: true
    },
    updatedAt: '2026-09-14'
  }
];

export const initialCollections: Collection[] = [
  {
    id: 'col-1',
    name: 'Aalayam Royal Heritage 2026',
    slug: 'aalayam-royal-heritage-2026',
    season: 'Bridal Festive',
    year: '2026',
    description: 'A tribute to the sacred temple architecture and ancient weavers of Kanchipuram, reinterpreted with minimalist liquid gold tissue textures.',
    heroImage: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Every warp and weft in Aalayam honours centuries of generational craftsmanship. We work directly with master weaver cooperatives in Tamil Nadu to sustain the authentic Korvai interlocking technique using certified pure silver-gold zari.',
    productIds: ['prod-1', 'prod-3'],
    status: 'active',
    updatedAt: '2026-09-15'
  },
  {
    id: 'col-2',
    name: 'Noor-e-Khaas Bridal Haute Couture',
    slug: 'noor-e-khaas-bridal-haute-couture',
    season: 'Autumn / Winter Bridal',
    year: '2026',
    description: 'Gossamer pastels, soft rose quartz, and architectural zardozi motifs designed for the contemporary royal bride.',
    heroImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Noor-e-Khaas celebrates the weightless poetry of modern Indian bridalwear. Using pure French tulle and raw silks adorned with delicate antique metallic threads, each piece is engineered for effortless regal poise.',
    productIds: ['prod-2', 'prod-4'],
    status: 'active',
    updatedAt: '2026-09-12'
  },
  {
    id: 'col-3',
    name: 'Shaahi Riyaasat Groom Collection',
    slug: 'shaahi-riyaasat-groom-collection',
    season: 'Royal Weddings',
    year: '2026',
    description: 'Impeccably tailored raw silk sherwanis, bandhgalas, and coordinating tissue stoles for the regal Indian groom.',
    heroImage: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=1600',
    gallery: [
      'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=800'
    ],
    story: 'Clean lines meet timeless ceremonial dignity. Each ensemble is custom dyed to match the bridal couple palette with handcrafted antique brass filigree buttons.',
    productIds: ['prod-5'],
    status: 'active',
    updatedAt: '2026-09-14'
  }
];

export const initialCategories: Category[] = [
  {
    id: 'cat-1',
    name: 'Kanchi Silk Sarees',
    slug: 'kanchi-silk-sarees',
    description: 'Pure handloom Kanchipuram silk sarees woven with certified pure gold and silver zari.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=600',
    productCount: 14,
    status: 'active',
    seoTitle: 'Pure Handloom Kanchipuram Silk Sarees | Reshu Varma Label',
    metaDescription: 'Explore our curated collection of pure Kanchi silk sarees with authentic Korvai borders and liquid gold tissue.'
  },
  {
    id: 'cat-2',
    name: 'Bridal Lehengas',
    slug: 'bridal-lehengas',
    description: 'Handcrafted zardozi, gota patti, and pastel couture lehengas for modern brides.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=600',
    productCount: 8,
    status: 'active',
    seoTitle: 'Designer Bridal Lehengas & Haute Couture | Reshu Varma Label',
    metaDescription: 'Shop bespoke bridal lehengas in pastel tones with intricate handcrafted zardozi.'
  },
  {
    id: 'cat-3',
    name: 'Designer Blouses',
    slug: 'designer-blouses',
    description: 'Couture hand-embroidered blouses with scalloped cutwork and pearl accents.',
    image: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=600',
    productCount: 19,
    status: 'active'
  },
  {
    id: 'cat-4',
    name: 'Bridal Veils',
    slug: 'bridal-veils',
    description: 'Cathedral gossamer veils and personalized dupatta drapery with bridal vow calligraphy.',
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    productCount: 6,
    status: 'active'
  },
  {
    id: 'cat-5',
    name: "Men's Wear",
    slug: 'mens-wear',
    description: 'Heirloom sherwanis, bundi jackets, and coordinating groom accessories.',
    image: 'https://images.unsplash.com/photo-1621600411688-4be93cd68504?auto=format&fit=crop&q=80&w=600',
    productCount: 7,
    status: 'active'
  }
];

export const initialEnquiries: Enquiry[] = [
  {
    id: 'enq-101',
    name: 'Dr. Ananya Reddy',
    phone: '+91 98490 12845',
    email: 'ananya.reddy@gmail.com',
    type: 'product_inquiry',
    productName: 'Aadrika Pure Tissue Kanchipuram Silk Saree',
    productSku: 'RV-KNC-0104',
    message: 'Hello Reshu Varma Team, I loved the Aadrika Tissue Saree in champagne gold. Is this available for a trial appointment this Saturday at your Jubilee Hills studio?',
    date: '2026-09-18 11:30 AM',
    status: 'new',
    assignedTo: 'Reshma Varma',
    internalNotes: 'VIP Bride. Wedding in December 2026 at Hyderabad.'
  },
  {
    id: 'enq-102',
    name: 'Shruti Varma',
    phone: '+91 97002 44192',
    email: 'shruti.v@outlook.com',
    type: 'bridal_custom',
    productName: 'Mehrunissa Zardozi Bridal Lehenga',
    productSku: 'RV-LHG-0219',
    message: 'Looking for a bespoke customization of the Mehrunissa lehenga in sage green with dual cathedral veil.',
    date: '2026-09-17 04:15 PM',
    status: 'contacted',
    assignedTo: 'Kavita (Couture Stylist)',
    internalNotes: 'Shared fabric swatches and sketch preview over WhatsApp.'
  },
  {
    id: 'enq-103',
    name: 'Pooja Hegde (California, USA)',
    phone: '+1 408 555 0192',
    email: 'pooja.hegde@techcorp.com',
    type: 'trousseau',
    message: 'NRI Bride inquiring for full trousseau planning (3 Kanchi silk sarees + 1 Reception Lehenga + Groom Sherwani). Need virtual video consultation.',
    date: '2026-09-16 09:00 PM',
    status: 'qualified',
    assignedTo: 'Reshma Varma',
    internalNotes: 'Scheduled zoom video call for Sept 22nd at 8 PM IST.'
  },
  {
    id: 'enq-104',
    name: 'Meera Rao',
    phone: '+91 91210 88390',
    email: 'meera.rao@gmail.com',
    type: 'general',
    message: 'Can I get only the Noorani cutwork blouse stitched for an heirloom saree from my mother?',
    date: '2026-09-14 02:20 PM',
    status: 'closed',
    assignedTo: 'Kavita (Couture Stylist)',
    internalNotes: 'Client visited studio and confirmed order RV-BLS-0308.'
  }
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-301',
    customerName: 'Ananya Reddy',
    phone: '+91 98490 12845',
    email: 'ananya.reddy@gmail.com',
    date: '2026-09-22',
    time: '11:30 AM',
    location: 'Studio Atelier (Hyderabad)',
    type: 'in_person',
    category: 'Kanchi Silk Sarees & Bridal Blouses',
    weddingDate: '2026-12-14',
    status: 'confirmed',
    notes: 'Bride interested in liquid gold tissue sarees and heirloom zardozi blouse pairing.',
    assignedConsultant: 'Reshma Varma'
  },
  {
    id: 'apt-302',
    customerName: 'Pooja Hegde (US Bride)',
    phone: '+1 408 555 0192',
    email: 'pooja.hegde@techcorp.com',
    date: '2026-09-23',
    time: '08:00 PM',
    location: 'Virtual Video Consultation',
    type: 'virtual_video',
    category: 'Full Bridal Trousseau & Groom Sherwani',
    weddingDate: '2027-01-20',
    status: 'confirmed',
    notes: 'Virtual high-res drape presentation and digital measurement session.',
    assignedConsultant: 'Reshma Varma'
  },
  {
    id: 'apt-303',
    customerName: 'Deepika Kilaru',
    phone: '+91 99881 23410',
    email: 'deepika.kilaru@yahoo.com',
    date: '2026-09-25',
    time: '03:00 PM',
    location: 'Studio Atelier (Hyderabad)',
    type: 'in_person',
    category: 'Bridal Lehengas',
    weddingDate: '2026-11-28',
    status: 'pending',
    notes: 'First time consultation. Requested privacy for bridal entourage of 4 guests.',
    assignedConsultant: 'Kavita (Stylist)'
  }
];

export const initialMediaAssets: MediaAsset[] = [
  {
    id: 'med-1',
    fileName: 'aadrika-tissue-silk-front.jpg',
    url: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    type: 'image',
    dimensions: '2400 x 3200 px',
    size: '2.4 MB',
    altText: 'Aadrika Pure Tissue Kanchipuram Silk Saree',
    title: 'Aadrika Silk Saree Editorial Banner',
    caption: 'Handcrafted in liquid gold pure zari',
    description: 'High-resolution campaign photograph shot during Winter Bridal 2026 in studio setting.',
    usageCount: 4,
    uploadedAt: '2026-08-15',
    usedIn: ['Product: Aadrika Silk Saree', 'Collection: Aalayam 2026', 'Homepage: Hero Banner']
  },
  {
    id: 'med-2',
    fileName: 'mehrunissa-rose-lehenga-detail.jpg',
    url: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
    type: 'image',
    dimensions: '2000 x 3000 px',
    size: '1.9 MB',
    altText: 'Mehrunissa Zardozi Bridal Lehenga',
    title: 'Mehrunissa Rose Quartz Lehenga Lookbook',
    caption: '16-kali zardozi embroidery with micro-pearls',
    description: 'Close-up macro detail of floral architecture embroidery.',
    usageCount: 3,
    uploadedAt: '2026-08-10',
    usedIn: ['Product: Mehrunissa Lehenga', 'Collection: Noor-e-Khaas', 'Editorial: The Modern Pastel Bride']
  },
  {
    id: 'med-3',
    fileName: 'noorani-cutwork-blouse-back.jpg',
    url: 'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&q=80&w=1200',
    type: 'image',
    dimensions: '1800 x 2400 px',
    size: '1.2 MB',
    altText: 'Noorani Cutwork Designer Blouse',
    title: 'Noorani Cutwork Blouse Detail',
    caption: 'Scalloped aari work with hanging pearl tassels',
    description: 'Editorial shot highlighting artisanal hand embroidery and silhouette sculpting.',
    usageCount: 2,
    uploadedAt: '2026-08-01',
    usedIn: ['Product: Noorani Blouse', 'Category: Designer Blouses']
  }
];

export const initialEditorials: Editorial[] = [
  {
    id: 'edit-1',
    title: 'The Art of Pure Zari: Why Real Silver and Gold Make an Heirloom Saree Eternal',
    slug: 'art-of-pure-zari-real-silver-gold-heirloom-saree',
    excerpt: 'An insider look into the metallurgical purity of authentic 3-ply Kanchipuram zari and how to verify authenticity for your wedding day.',
    content: 'In an era of mass-produced electroplated metallic threads, the true sanctity of a Kanchipuram silk saree lies in its authentic Pure Zari. At Reshu Varma Label, our zari is certified with 57% fine silver core, 0.6% 24K gold gilding, and 42.4% pure mulberry silk thread.',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=1200',
    author: 'Reshma Varma',
    category: 'Craftsmanship & Heritage',
    tags: ['Pure Zari', 'Handloom Guide', 'Bridal Heritage'],
    publishDate: '2026-09-01',
    status: 'published',
    relatedProductIds: ['prod-1', 'prod-3'],
    readTime: '4 min read'
  },
  {
    id: 'edit-2',
    title: 'Pastel Grandeur: The Rise of Soft Champagne and Rose Tones in Modern Indian Weddings',
    slug: 'pastel-grandeur-soft-champagne-rose-indian-weddings',
    excerpt: 'Why today’s royal brides are moving away from traditional scarlet toward understated pastel tones with opulent antique zardozi.',
    content: 'Modern luxury is understated, intimate, and effortlessly refined. We explore how pairing subtle rose quartz raw silks with heirloom gold accents creates a breathtaking visual harmony for morning mandap ceremonies.',
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=1200',
    author: 'Kavita Sharma',
    category: 'Bridal Styling',
    tags: ['Pastel Bride', 'Bridal Lehenga', 'Wedding Trends'],
    publishDate: '2026-08-20',
    status: 'published',
    relatedProductIds: ['prod-2', 'prod-4'],
    readTime: '5 min read'
  }
];

export const initialVideos: VideoItem[] = [
  {
    id: 'vid-1',
    title: 'Aalayam Royal Heritage 2026 Campaign Film',
    slug: 'aalayam-royal-heritage-2026-film',
    description: 'Cinematic visual journey across the ancient temple sanctums and royal courtyards showcasing pure tissue handlooms.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-bride-holding-a-bouquet-of-flowers-41655-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&q=80&w=800',
    collection: 'Aalayam Royal Heritage 2026',
    category: 'Campaign Films',
    duration: '01:45',
    credits: 'Directed by Reshu Varma Atelier | Music: Classical Sitar & Flute',
    publishDate: '2026-08-25',
    status: 'published'
  },
  {
    id: 'vid-2',
    title: 'Behind the Seams: The Making of Mehrunissa Zardozi',
    slug: 'behind-the-seams-making-of-mehrunissa',
    description: 'Over 380 hours of hand embroidery captured frame by frame in our master karigar atelier.',
    videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-woman-embroidering-a-cloth-42861-large.mp4',
    thumbnail: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
    collection: 'Noor-e-Khaas Bridal Haute Couture',
    category: 'Artisan Documentaries',
    duration: '02:30',
    credits: 'Reshu Varma Karigar Collective Hyderabad',
    publishDate: '2026-08-12',
    status: 'published'
  }
];

export const initialRedirects: RedirectRule[] = [
  {
    id: 'red-1',
    oldUrl: '/sarees/kanchipuram-gold',
    newUrl: '/product/aadrika-pure-tissue-kanchipuram-silk-saree',
    type: '301',
    status: 'active',
    hits: 342,
    createdAt: '2026-08-16'
  },
  {
    id: 'red-2',
    oldUrl: '/lehengas/rose-bridal',
    newUrl: '/product/mehrunissa-zardozi-bridal-lehenga-rose-quartz',
    type: '301',
    status: 'active',
    hits: 189,
    createdAt: '2026-08-11'
  }
];

export const initialUsers: UserAccount[] = [
  {
    id: 'usr-1',
    name: 'Reshma Varma',
    email: 'reshmavarma7000@gmail.com',
    role: 'super_admin',
    status: 'active',
    lastLogin: 'Just now',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'usr-2',
    name: 'Kavita Sharma',
    email: 'kavita@reshuvarmalabel.com',
    role: 'admin',
    status: 'active',
    lastLogin: '2 hours ago',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200'
  },
  {
    id: 'usr-3',
    name: 'Vikram Mehta',
    email: 'vikram.seo@reshuvarmalabel.com',
    role: 'seo_manager',
    status: 'active',
    lastLogin: 'Yesterday',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
  }
];

export const initialActivityLogs: ActivityLog[] = [
  {
    id: 'act-1',
    date: 'Today, 10:30 AM',
    userName: 'Reshma Varma',
    userEmail: 'reshmavarma7000@gmail.com',
    action: 'Product Published',
    entity: 'Product: Aadrika Pure Tissue Kanchipuram Silk Saree',
    details: 'Updated inventory status, added pure zari certification badge and live Google preview.'
  },
  {
    id: 'act-2',
    date: 'Today, 09:15 AM',
    userName: 'Kavita Sharma',
    userEmail: 'kavita@reshuvarmalabel.com',
    action: 'Appointment Confirmed',
    entity: 'Appointment: Ananya Reddy (Sept 22, 11:30 AM)',
    details: 'Sent WhatsApp confirmation and curated preliminary saree selection.'
  },
  {
    id: 'act-3',
    date: 'Yesterday, 04:45 PM',
    userName: 'Vikram Mehta',
    userEmail: 'vikram.seo@reshuvarmalabel.com',
    action: 'SEO Redirect Created',
    entity: '301 Redirect: /sarees/kanchipuram-gold ➔ /product/aadrika...',
    details: 'Fixed legacy URL indexing on Google Search Console.'
  }
];

export const initialHomepageSections: HomepageSection[] = [
  {
    id: 'sec-1',
    name: 'Editorial Hero & Runway Carousel',
    type: 'hero',
    enabled: true,
    title: 'Timeless Heirloom Silks & Bespoke Bridal Couture',
    subtitle: 'Woven for Royal Legacies & Modern Brides',
    order: 1
  },
  {
    id: 'sec-2',
    name: 'New Launches & Capsule Collections',
    type: 'new_collection',
    enabled: true,
    title: 'The Autumn / Winter 2026 Editions',
    subtitle: 'Liquid Tissue Silks, Pure Zardozi & Gossamer Veils',
    order: 2
  },
  {
    id: 'sec-3',
    name: 'Curated Bridal Collections Grid',
    type: 'curated_products',
    enabled: true,
    title: 'Curated Bridal Ensembles',
    subtitle: 'Filter by Kanchi Sarees, Lehengas, Designer Blouses & Groom Attire',
    order: 3
  },
  {
    id: 'sec-4',
    name: 'The Atelier: Craftsmanship & Pure Zari',
    type: 'brand_story',
    enabled: true,
    title: 'The Sacred Art of Korvai & Pure Zari',
    subtitle: 'Where Generational Weavers Sculpt Liquid Light',
    order: 4
  },
  {
    id: 'sec-5',
    name: 'Runway & Campaign Video Spotlight',
    type: 'video_spotlight',
    enabled: true,
    title: 'Cinematic Runway & Atelier Stories',
    subtitle: 'Watch our master artisans bring bespoke dreams to life',
    order: 5
  },
  {
    id: 'sec-6',
    name: 'Real Brides & Royal Wedding Gallery',
    type: 'real_brides',
    enabled: true,
    title: 'Real Brides of Reshu Varma',
    subtitle: 'Unforgettable moments in bespoke couture',
    order: 6
  },
  {
    id: 'sec-7',
    name: 'Private Studio Consultation Booking CTA',
    type: 'appointment_cta',
    enabled: true,
    title: 'Book Your Private Bridal Consultation',
    subtitle: 'In-Person Studio Experience in Hyderabad or Virtual Consultation Worldwide',
    order: 7
  }
];
