import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'en' | 'sw';
  setLanguage: (lang: 'en' | 'sw') => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.categories': 'Categories',
    'nav.cart': 'Cart',
    'nav.favorites': 'Favorites',
    
    // Common
    'common.loading': 'Loading...',
    'common.price': 'TSH',
    'common.add_to_cart': 'Add to Cart',
    'common.add_to_favorites': 'Add to Favorites',
    'common.remove_from_favorites': 'Remove from Favorites',
    'common.order_now': 'Order Now',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.status': 'Status',
    'common.processed': 'Processed',
    'common.unprocessed': 'Unprocessed',
    
    // Order form
    'order.title': 'Order Form',
    'order.subtitle': 'Quick and easy. We\'ll contact you to confirm.',
    'order.product': 'Product',
    'order.full_name': 'Full Name',
    'order.phone': 'Phone Number',
    'order.location': 'Location (optional)',
    'order.preferred_time': 'Preferred delivery time (optional)',
    'order.submit': 'Submit Order',
    'order.success': 'Order placed!',
    'order.success_desc': 'We\'ll reach out shortly.',
    
    // Product
    'product.not_found': 'Product not found.',
    'product.trending': 'Trending',
    'product.popular': 'Popular',
    'product.description': 'Description',
    
    // Admin
    'admin.dashboard': 'Admin Dashboard',
    'admin.orders': 'Incoming Orders',
    'admin.no_orders': 'No orders yet.',
    'admin.mark_processed': 'Mark processed',
    'admin.products': 'Products',
    'admin.add_product': 'Add Product',
    'admin.login': 'Admin Login',
    'admin.email': 'Email',
    'admin.password': 'Password',
    'admin.forgot_password': 'Forgot password?',
    'admin.reset_sent': 'Password reset email sent!',
    'admin.unauthorized': 'Unauthorized. Please login.',
    
    // Cart
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.total': 'Total',
    'cart.remove': 'Remove',
    
    // Home
    'home.title': 'Premium Home Decor & Furniture',
    'home.subtitle': 'Transform your space with our curated collection of modern furniture and decor',
    'home.deals': 'Special Deals',
    'home.trending': 'Trending Products',
    'home.newsletter': 'Stay Updated',
    'home.newsletter_desc': 'Get the latest deals and new arrivals',
    'home.newsletter_placeholder': 'Enter your email',
    'home.subscribe': 'Subscribe',
  },
  sw: {
    // Navigation
    'nav.home': 'Nyumbani',
    'nav.categories': 'Makundi',
    'nav.cart': 'Kikapu',
    'nav.favorites': 'Pendekezo',
    
    // Common
    'common.loading': 'Inapakia...',
    'common.price': 'TSH',
    'common.add_to_cart': 'Weka Kikupani',
    'common.add_to_favorites': 'Weka Pendekezo',
    'common.remove_from_favorites': 'Ondoa Pendekezo',
    'common.order_now': 'Agiza Sasa',
    'common.submit': 'Tuma',
    'common.cancel': 'Ghairi',
    'common.save': 'Hifadhi',
    'common.delete': 'Futa',
    'common.edit': 'Hariri',
    'common.status': 'Hali',
    'common.processed': 'Imesindikwa',
    'common.unprocessed': 'Haijasindikwa',
    
    // Order form
    'order.title': 'Fomu ya Kuagiza',
    'order.subtitle': 'Haraka na rahisi. Tutawasiliana nawe kuhakikisha.',
    'order.product': 'Bidhaa',
    'order.full_name': 'Jina Kamili',
    'order.phone': 'Namba ya Simu',
    'order.location': 'Mahali (si lazima)',
    'order.preferred_time': 'Wakati unaopendelewa wa utoaji (si lazima)',
    'order.submit': 'Tuma Agizo',
    'order.success': 'Agizo limewekwa!',
    'order.success_desc': 'Tutawasiliana hivi karibuni.',
    
    // Product
    'product.not_found': 'Bidhaa haijapatikana.',
    'product.trending': 'Maarufu',
    'product.popular': 'Pendekezo',
    'product.description': 'Maelezo',
    
    // Admin
    'admin.dashboard': 'Dashibodi ya Msimamizi',
    'admin.orders': 'Maagizo Yanayokuja',
    'admin.no_orders': 'Hakuna maagizo bado.',
    'admin.mark_processed': 'Weka imesindikwa',
    'admin.products': 'Bidhaa',
    'admin.add_product': 'Ongeza Bidhaa',
    'admin.login': 'Kuingia kwa Msimamizi',
    'admin.email': 'Barua pepe',
    'admin.password': 'Nenosiri',
    'admin.forgot_password': 'Umesahau nenosiri?',
    'admin.reset_sent': 'Barua ya kubadilisha nenosiri imetumwa!',
    'admin.unauthorized': 'Haujaruhusiwa. Tafadhali ingia.',
    
    // Cart
    'cart.title': 'Kikapu cha Ununuzi',
    'cart.empty': 'Kikapu chako ni tupu',
    'cart.total': 'Jumla',
    'cart.remove': 'Ondoa',
    
    // Home
    'home.title': 'Mapambo ya Nyumbani ya Hali ya Juu na Samani',
    'home.subtitle': 'Badilisha nafasi yako na mkusanyiko wetu wa samani ya kisasa na mapambo',
    'home.deals': 'Ofa Maalum',
    'home.trending': 'Bidhaa Maarufu',
    'home.newsletter': 'Baki Umejumuishwa',
    'home.newsletter_desc': 'Pata ofa za hivi karibuni na bidhaa mpya',
    'home.newsletter_placeholder': 'Weka barua pepe yako',
    'home.subscribe': 'Jiunge',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'sw'>(() => {
    const saved = localStorage.getItem('language');
    return (saved as 'en' | 'sw') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};