export interface CreativeAsset {
  id: string;
  title: string;
  category: 'LOGO' | 'BUSINESS_CARD' | 'SOCIAL_MEDIA';
  categoryLabel: string;
  description: string;
  src: string;
  type: 'image' | 'video';
  aspectRatio: 'square' | 'portrait' | 'landscape';
}

export const CREATIVE_ASSETS: CreativeAsset[] = [
  // ─── BUSINESS CARDS ──────────────────────────────────────────────────────────
  {
    id: 'bc-1',
    title: 'Noir Executive Card',
    category: 'BUSINESS_CARD',
    categoryLabel: 'Business Card',
    description: 'Premium dark paper business card branding with gold foil stamping.',
    src: '/portfolio/Business card/1.png',
    type: 'image',
    aspectRatio: 'landscape'
  },
  {
    id: 'bc-2',
    title: 'Minimalist Studio Card',
    category: 'BUSINESS_CARD',
    categoryLabel: 'Business Card',
    description: 'Clean typography and matte finish corporate card mockup.',
    src: '/portfolio/Business card/2.png',
    type: 'image',
    aspectRatio: 'landscape'
  },
  {
    id: 'bc-3',
    title: 'Apex Tech Card - Front',
    category: 'BUSINESS_CARD',
    categoryLabel: 'Business Card',
    description: 'High-contrast front layout with dynamic QR integration.',
    src: '/portfolio/Business card/XCXCVX (1).png',
    type: 'image',
    aspectRatio: 'landscape'
  },
  {
    id: 'bc-4',
    title: 'Apex Tech Card - Back',
    category: 'BUSINESS_CARD',
    categoryLabel: 'Business Card',
    description: 'Vibrant brand-aligned back styling for premium networking.',
    src: '/portfolio/Business card/XCXCVX (2).png',
    type: 'image',
    aspectRatio: 'landscape'
  },

  // ─── LOGOS ───────────────────────────────────────────────────────────────────
  {
    id: 'logo-1',
    title: 'Futurism Emblem',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Creative tech emblem with abstract multidimensional geometry.',
    src: '/portfolio/LOGO/ChatGPT Image Dec 16, 2025, 05_56_53 PM.png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-2',
    title: 'Cybernetic Node Logo',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Modern glowing abstract digital identity symbol.',
    src: '/portfolio/LOGO/ChatGPT Image Jun 14, 2026, 12_21_17 AM.png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-3',
    title: 'Monolith Brandmark',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Bold minimal mark designed for architecture and lifestyle studios.',
    src: '/portfolio/LOGO/DFDFD (1).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-4',
    title: 'Aero Logistics Mark',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Dynamic wing emblem representing speed, growth, and precision.',
    src: '/portfolio/LOGO/DFDFD (2).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-5',
    title: 'Apex Ventures Logo',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Minimalist modular triangular brand mark.',
    src: '/portfolio/LOGO/DFDFD (3).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-6',
    title: 'Apex Ventures Variant',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Secondary logo lockup optimized for dark themes.',
    src: '/portfolio/LOGO/DFDFD (4).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-7',
    title: 'Apex Typography',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Bespoke geometric typeface branding wordmark.',
    src: '/portfolio/LOGO/DFDFD (5).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-8',
    title: 'Chroma Labs Logo',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Abstract color-wheel identity for visual and creative studios.',
    src: '/portfolio/LOGO/FFGHFGH (1).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-9',
    title: 'Holo Core Emblem',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Iridescent futuristic brand identity design.',
    src: '/portfolio/LOGO/FFGHFGH (2).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-10',
    title: 'Stellar Horizon Logo',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Circular vector mark with a starry cosmos theme.',
    src: '/portfolio/LOGO/IMG-20260708-WA0021.jpg.jpeg',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-11',
    title: 'Sakura Matcha Seal',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Zen flower shape with traditional Japanese vermilion dot accent.',
    src: '/portfolio/LOGO/sakura-matcha-logo.png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'logo-12',
    title: 'Detqel Motion Identity',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Dynamic 3D logo animation and motion branding.',
    src: '/portfolio/LOGO/Logo.mp4',
    type: 'video',
    aspectRatio: 'square'
  },
  {
    id: 'logo-13',
    title: 'Zen Garden Brandmark',
    category: 'LOGO',
    categoryLabel: 'Logo Design',
    description: 'Aesthetic branding logo with organic natural tones.',
    src: '/portfolio/LOGO/WhatsApp Image 2026-06-13 at 1.25.23 PM.jpeg',
    type: 'image',
    aspectRatio: 'square'
  },

  // ─── SOCIAL MEDIA & POSTERS ──────────────────────────────────────────────────
  {
    id: 'sm-1',
    title: 'Summer Launch Poster',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Vibrant promotional poster design for retail campaign.',
    src: '/portfolio/Social Media Creatives - and posters/1.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-2',
    title: 'Pod Nutrition Campaign',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Creative social media visual highlighting fresh supplement ingredients.',
    src: '/portfolio/Social Media Creatives - and posters/11.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-3',
    title: 'Energy Booster Ad',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'High-octane commercial design for active lifestyle products.',
    src: '/portfolio/Social Media Creatives - and posters/12.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-4',
    title: 'Daily Wellness Ad',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Elegant lifestyle graphic focusing on nutritional balance.',
    src: '/portfolio/Social Media Creatives - and posters/13.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-5',
    title: 'Urban Beats Event Poster',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Bold typographic flyer for music festival promotions.',
    src: '/portfolio/Social Media Creatives - and posters/1ST.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-6',
    title: 'Winter Collection Flyer',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Minimalist fashion retail campaign poster.',
    src: '/portfolio/Social Media Creatives - and posters/2.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-7',
    title: 'Power Up Shakes Ad',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Dynamic product display banner with motion blurs.',
    src: '/portfolio/Social Media Creatives - and posters/22.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-8',
    title: 'Organic Protein Promo',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Earthy, health-focused visual advertising organic shakes.',
    src: '/portfolio/Social Media Creatives - and posters/24.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-9',
    title: 'Autumn Sale Poster',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Warm seasonal color palette promo for e-commerce.',
    src: '/portfolio/Social Media Creatives - and posters/3.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-10',
    title: 'Tech Meetup Banner',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Sleek social post template for dev communities.',
    src: '/portfolio/Social Media Creatives - and posters/4.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-11',
    title: 'Creative Agency Branding',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Portfolio showcase card for corporate capabilities.',
    src: '/portfolio/Social Media Creatives - and posters/Add a heading (1).png',
    type: 'image',
    aspectRatio: 'landscape'
  },
  {
    id: 'sm-12',
    title: 'Café Aura Social Ad',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Rich coffee visual layout with floating espresso beans.',
    src: '/portfolio/Social Media Creatives - and posters/COFFEE (4).png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-13',
    title: 'Vortex Event Visual',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Abstract liquid art poster for digital exhibitions.',
    src: '/portfolio/Social Media Creatives - and posters/GFDGDF (1).png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-14',
    title: 'Vortex Social Post',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Square format social creative for creative conferences.',
    src: '/portfolio/Social Media Creatives - and posters/GFDGDF (2).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'sm-15',
    title: 'Vortex Instagram Story',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Tall format abstract visual for mobile social campaigns.',
    src: '/portfolio/Social Media Creatives - and posters/GFDGDF (3).png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-16',
    title: 'Traditional Taste Bites',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Appetizing culinary ad design for gourmet bites.',
    src: '/portfolio/Social Media Creatives - and posters/Traditional Taste Bites (1).png',
    type: 'image',
    aspectRatio: 'square'
  },
  {
    id: 'sm-17',
    title: 'Future Sounds Poster',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Neo-brutalist poster featuring metallic textures and typography.',
    src: '/portfolio/Social Media Creatives - and posters/dfgfdgfd.png',
    type: 'image',
    aspectRatio: 'portrait'
  },
  {
    id: 'sm-18',
    title: 'The Italian Cheat Code',
    category: 'SOCIAL_MEDIA',
    categoryLabel: 'Posters & Media',
    description: 'Elegant café layout with tiramisu slice and premium supplement.',
    src: '/portfolio/Social Media Creatives - and posters/“The Italian Cheat Code” Visual An elegant Italian café table espresso, tiramisu slice, spoon… and the Pod Nutrition tub placed like a dessert. Headline “Italy’s Favourite Dessert. Now Your Daily .png',
    type: 'image',
    aspectRatio: 'portrait'
  }
];
