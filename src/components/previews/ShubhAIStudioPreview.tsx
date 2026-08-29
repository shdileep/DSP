import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, 
  Sparkles, 
  ShoppingCart, 
  Heart, 
  Star, 
  Check, 
  ArrowLeft, 
  RotateCcw, 
  Plus, 
  Minus, 
  CreditCard, 
  Smartphone, 
  CheckCircle2, 
  ChevronRight, 
  ChevronDown,
  X,
  Zap,
  ShoppingBag,
  Search,
  MessageSquare,
  Image as ImageIcon,
  BookOpen,
  Puzzle,
  FolderGit2,
  Bot,
  MoreHorizontal,
  MoreVertical,
  Trash2,
  Edit3,
  User,
  LogOut,
  Paperclip,
  Mic,
  MicOff,
  Code2,
  Terminal,
  FileCode,
  FileText,
  Folder,
  FolderTree,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Globe,
  SlidersHorizontal,
  Tag,
  Truck,
  ShieldCheck,
  Eye,
  Layers,
  Cpu,
  CheckCheck,
  Maximize2,
  Minimize2,
  SplitSquareVertical,
  QrCode,
  PackageCheck,
  BadgePercent,
  Clock,
  Key,
  Play,
  Pause
} from 'lucide-react';

import logoShubh from '../../assets/images/logoshubh.png';
import shubhAiStudioImg from '../../assets/images/shubh_ai_studio.png';
import userAvatar from '../../assets/images/dileepgalla.jpeg';
import shoe1 from '../../assets/images/shoe1.png';
import shoe2 from '../../assets/images/shoe2.png';
import shoe3 from '../../assets/images/shoe3.png';
import shoe4 from '../../assets/images/shoe4.png';
import shoe5 from '../../assets/images/shoe5.png';
import shoe6 from '../../assets/images/shoe6.png';

// ─────────────────────────────────────────────────────────────
// PRODUCT DATA DEFINITIONS (Using all 6 shoe images)
// ─────────────────────────────────────────────────────────────
export interface ShoeProduct {
  id: number;
  name: string;
  brand: string;
  category: string;
  genderCategory: "Men's Shoes" | "Women's Shoes" | "Kids' Shoes" | 'Unisex';
  price: number;
  originalPrice: number;
  discount: string;
  rating: number;
  reviews: number;
  image: string;
  tag: string;
  description: string;
  features: string[];
  sizes: number[];
  colors: string[];
}

const PRODUCTS: ShoeProduct[] = [
  {
    id: 1,
    name: 'Shubh Velocity Pulse Pro',
    brand: 'SHUBH AIR',
    category: 'Running',
    genderCategory: "Men's Shoes",
    price: 4499,
    originalPrice: 6999,
    discount: '35% OFF',
    rating: 4.9,
    reviews: 248,
    image: shoe1,
    tag: 'BESTSELLER',
    description: 'Engineered for competitive marathon runners with dual-density nitrogen foam and full-length carbon propulsion plate.',
    features: ['Nitro-Infused Responsive Cushion', 'Ultra-breathable Matrix Knit Upper', 'Continental Rubber Traction Grip', 'Drop: 8mm • Weight: 210g'],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#10b981', '#06b6d4', '#f59e0b']
  },
  {
    id: 2,
    name: 'Shubh Crimson Nitro Blast',
    brand: 'SHUBH LABS',
    category: 'Casual',
    genderCategory: "Men's Shoes",
    price: 5299,
    originalPrice: 7999,
    discount: '33% OFF',
    rating: 4.8,
    reviews: 182,
    image: shoe2,
    tag: 'TRENDING',
    description: 'Iconic street silhouette infused with energy-returning shock absorption and futuristic geometric midsole aesthetics.',
    features: ['Visible Air Dynamic Chamber', 'Reinforced TPU Heel Counter', 'Adaptive Lacing Architecture', '360° Reflective Street Piping'],
    sizes: [7, 8, 9, 10, 11],
    colors: ['#ef4444', '#8b5cf6', '#1e293b']
  },
  {
    id: 3,
    name: 'Shubh Stealth Carbon Air',
    brand: 'SHUBH PRO',
    category: 'Training',
    genderCategory: 'Unisex',
    price: 3899,
    originalPrice: 5499,
    discount: '29% OFF',
    rating: 4.7,
    reviews: 139,
    image: shoe3,
    tag: 'NEW DROP',
    description: 'Lightweight agility trainer built for cross-fit, gym intervals, and high-intensity all-weather daily training.',
    features: ['High-Abrasion Engineered Mesh', 'Lateral Stability Outriggers', 'Ortholite Anti-Microbial Insole', 'Quick-Lock Speed Lace'],
    sizes: [6, 7, 8, 9, 10],
    colors: ['#3b82f6', '#10b981', '#64748b']
  },
  {
    id: 4,
    name: 'Shubh Cyber Glide Dunk',
    brand: 'SHUBH HOOPS',
    category: 'Basketball',
    genderCategory: "Men's Shoes",
    price: 6199,
    originalPrice: 8999,
    discount: '31% OFF',
    rating: 4.9,
    reviews: 310,
    image: shoe4,
    tag: 'PRO CHOICE',
    description: 'High-top court dominator delivering supreme ankle lockdown, impact dampening, and multidirectional herringbone court traction.',
    features: ['Air Zoom Forefoot Pods', 'Carbon-Fiber Midfoot Shank', 'Padded Ankle Collar Protection', 'Non-Marking Indoor/Outdoor Grip'],
    sizes: [7, 8, 9, 10, 11],
    colors: ['#f97316', '#3b82f6', '#0f172a']
  },
  {
    id: 5,
    name: 'Shubh Hyper Strike Zoom',
    brand: 'SHUBH ORIGINALS',
    category: 'Lifestyle',
    genderCategory: "Women's Shoes",
    price: 4799,
    originalPrice: 6499,
    discount: '26% OFF',
    rating: 4.8,
    reviews: 195,
    image: shoe5,
    tag: 'LIMITED',
    description: 'Modern lifestyle sneaker blending athletic performance with minimalist luxury and plush cloud comfort.',
    features: ['Ultra-Cushioned Cloud Midsole', 'Premium Suede & Leather Overlays', 'Easy Slip-On Heel Pull', 'Ergonomic Arch Support'],
    sizes: [6, 7, 8, 9, 10],
    colors: ['#ec4899', '#8b5cf6', '#f1f5f9']
  },
  {
    id: 6,
    name: 'Shubh Aero Phantom Elite',
    brand: 'SHUBH ELITE',
    category: 'Sneakers',
    genderCategory: "Kids' Shoes",
    price: 5899,
    originalPrice: 8299,
    discount: '28% OFF',
    rating: 5.0,
    reviews: 420,
    image: shoe6,
    tag: 'FLAGSHIP',
    description: 'The pinnacle of aerodynamic footwear innovation designed for extreme speed, featherweight comfort, and zero fatigue.',
    features: ['VaporWeave Water-Resistant Upper', 'ZoomX Ultra-Lightweight Foam', 'Beveled Heel for Smooth Transition', 'Custom Form-Fitting Sockliner'],
    sizes: [6, 7, 8, 9, 10, 11],
    colors: ['#06b6d4', '#10b981', '#3b82f6']
  }
];

// ─────────────────────────────────────────────────────────────
// ORDER ITEM INTERFACE
// ─────────────────────────────────────────────────────────────
export interface OrderRecord {
  orderId: string;
  date: string;
  items: Array<{ product: ShoeProduct; size: number; qty: number }>;
  totalAmount: number;
  deliveryStatus: 'Order Placed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  paymentStatus: 'Paid via UPI' | 'Paid via Card' | 'Cash on Delivery';
  address: string;
  estimatedDelivery: string;
}

export default function ShubhAIStudioPreview() {
  // ─────────────────────────────────────────────────────────
  // 1. TOP-LEVEL WORKSPACE MODES & NAVIGATION
  // ─────────────────────────────────────────────────────────
  const [activeView, setActiveView] = useState<'studio' | 'building' | 'preview' | 'split'>('studio');
  const [sidebarNav, setSidebarNav] = useState<'chat' | 'images' | 'library' | 'plugins' | 'projects' | 'agents' | 'more'>('chat');
  const [sidebarSearch, setSidebarSearch] = useState('');
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isAttachmentMenuOpen, setIsAttachmentMenuOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [attachedFiles, setAttachedFiles] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Chat History Management
  const [conversations, setConversations] = useState([
    { id: 'c1', title: 'Create a shoe website', section: 'Today', active: true },
    { id: 'c2', title: 'Build portfolio website', section: 'Today', active: false },
    { id: 'c3', title: 'Explain React authentication', section: 'Today', active: false },
    { id: 'c4', title: 'Fix API integration', section: 'Yesterday', active: false },
    { id: 'c5', title: 'Create landing page', section: 'Yesterday', active: false },
    { id: 'c6', title: 'PostgreSQL schema optimizer', section: 'Previous Chats', active: false },
    { id: 'c7', title: 'Realtime WebSocket notifications', section: 'Previous Chats', active: false },
  ]);
  const [activeChatMenuId, setActiveChatMenuId] = useState<string | null>(null);
  const [editingChatId, setEditingChatId] = useState<string | null>(null);
  const [editingTitleText, setEditingTitleText] = useState('');

  // AI Prompt Typing State
  const [inputPrompt, setInputPrompt] = useState('Create a modern shoe website.');

  // ─────────────────────────────────────────────────────────
  // 2. AUTONOMOUS BUILDING PROCESS STATE
  // ─────────────────────────────────────────────────────────
  const [buildStepIndex, setBuildStepIndex] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Thinking for 5 seconds...');
  const [isAutoRetrying, setIsAutoRetrying] = useState(false);
  const [buildComplete, setBuildComplete] = useState(false);
  const [activeFileTreeTab, setActiveFileTreeTab] = useState<'files' | 'code' | 'logs'>('files');
  const [selectedFileForPreview, setSelectedFileForPreview] = useState<string>('index.html');

  // Realistic Diff & Change Statistics
  const buildLogs = [
    { text: 'Understanding Request: Analyzing requirements for the shoe website...', type: 'info', time: '0.2s' },
    { text: 'Project Planning: Structuring responsive grid, cart state & UPI payment flow...', type: 'info', time: '0.8s' },
    { text: 'Created index.html (+124 / -0)', type: 'create', diff: '+124 -0', time: '1.2s' },
    { text: 'Created style.css (+210 / -0)', type: 'create', diff: '+210 -0', time: '1.5s' },
    { text: 'Created script.js (+145 / -0)', type: 'create', diff: '+145 -0', time: '1.8s' },
    { text: 'Edited header.txt (+35 / -0)', type: 'edit', add: '+35', del: '-0', time: '2.1s' },
    { text: 'Edited bottom-navigation.txt (+18 / -4)', type: 'edit', add: '+18', del: '-4', time: '2.4s' },
    { text: 'Edited active-shoes-section (+42 / -8)', type: 'edit', add: '+42', del: '-8', time: '2.7s' },
    { text: 'Agent terminated due to an error: CSS Flexbox overflow in product grid container.', type: 'error', time: '3.0s' },
    { text: 'Automatic Recovery Triggered: Retrying...', type: 'retry', time: '3.2s' },
    { text: 'Analyzing the error -> Applying responsive clamp() fix...', type: 'retry', time: '3.5s' },
    { text: 'Running the build again -> Verified zero console defects.', type: 'success', time: '3.8s' },
    { text: 'Validation Complete: Localhost server ready on port 3000.', type: 'success', time: '4.0s' }
  ];

  // ─────────────────────────────────────────────────────────
  // 3. GENERATED SHOE STORE E-COMMERCE STATE
  // ─────────────────────────────────────────────────────────
  const [storeCategory, setStoreCategory] = useState<string>('All');
  const [storeSearch, setStoreSearch] = useState<string>('');
  const [selectedProductQuickView, setSelectedProductQuickView] = useState<ShoeProduct | null>(null);
  const [cartItems, setCartItems] = useState<Array<{ product: ShoeProduct; size: number; qty: number }>>([
    { product: PRODUCTS[0], size: 8, qty: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersModalOpen, setIsOrdersModalOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponDiscount, setCouponDiscount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [orderConfirmation, setOrderConfirmation] = useState<OrderRecord | null>(null);
  const [ordersHistory, setOrdersHistory] = useState<OrderRecord[]>([
    {
      orderId: 'SHUBH-9824-IN',
      date: '28 Aug 2026',
      items: [{ product: PRODUCTS[1], size: 9, qty: 1 }],
      totalAmount: 5299,
      deliveryStatus: 'Out for Delivery',
      paymentStatus: 'Paid via UPI',
      address: 'Dileep Sai Galla, VIT Chennai Campus, Vandalur-Kelambakkam Road, Chennai 600127',
      estimatedDelivery: 'Today by 6:00 PM'
    }
  ]);

  // Natural Language Website Modifier Bar
  const [aiModifierPrompt, setAiModifierPrompt] = useState('');
  const [isModifyingWebsite, setIsModifyingWebsite] = useState(false);
  const [festivalBannerActive, setFestivalBannerActive] = useState(true);

  // Animated Tour Mode State
  const [isPlayingTour, setIsPlayingTour] = useState(true);
  const [tourStep, setTourStep] = useState(0);

  // Auto-tour progression across every section of Shubh AI Studio
  useEffect(() => {
    if (!isPlayingTour) return;
    const tourStages = [
      () => {
        // Stage 0: Focus on studio home, type prompt automatically
        setActiveView('studio');
        setIsCartOpen(false);
        setIsCheckoutOpen(false);
        setIsOrdersModalOpen(false);
        setOrderConfirmation(null);
        setInputPrompt('');
        const promptTarget = 'Create a shoe website';
        let idx = 0;
        const typing = setInterval(() => {
          idx++;
          setInputPrompt(promptTarget.slice(0, idx));
          if (idx >= promptTarget.length) {
            clearInterval(typing);
          }
        }, 20);
      },
      () => { 
        handleStartAutonomousBuild('Create a shoe website'); 
      },
      () => { 
        setActiveView('preview'); 
        setIsCartOpen(false); 
      },
      () => { 
        // Add to cart and open cart drawer
        handleAddToCart(PRODUCTS[0], 8);
        setIsCartOpen(true); 
      },
      () => { 
        setIsCartOpen(false); 
        setIsCheckoutOpen(true); 
      },
      () => { 
        handleExecutePayment(); 
      },
      () => { 
        setOrderConfirmation(null); 
        setIsOrdersModalOpen(true); 
      },
      () => { 
        setIsOrdersModalOpen(false); 
        setActiveView('split'); 
      }
    ];

    const stepTimers = [800, 1300, 900, 800, 800, 1000, 900, 1000];
    const currentDuration = stepTimers[tourStep] || 1000;

    const timer = setTimeout(() => {
      setTourStep(prev => {
        const next = (prev + 1) % tourStages.length;
        tourStages[next]();
        return next;
      });
    }, currentDuration);

    return () => clearTimeout(timer);
  }, [isPlayingTour, tourStep]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // ─────────────────────────────────────────────────────────
  // WORKFLOW TRIGGER: SUBMIT PROMPT -> RUN AUTONOMOUS BUILD
  // ─────────────────────────────────────────────────────────
  const handleStartAutonomousBuild = (promptText = inputPrompt) => {
    if (!promptText.trim()) return;
    setActiveView('building');
    setBuildComplete(false);
    setBuildStepIndex(0);
    setIsAutoRetrying(false);

    const statuses = [
      'Understanding Request: Analyzing shoe website requirements...',
      'Planning product architecture & responsive e-commerce grid...',
      'Building the brand header & navigation bar...',
      'Generating shoe product models & real-time inventory...',
      'Agent terminated due to an error: CSS container overflow.',
      'Retrying... Applying responsive auto-layout patch...',
      'Implementing shopping cart & state persistence...',
      'Connecting instant UPI payment & checkout modal...',
      'Testing responsive layout & validating all interactions...',
      'Shoe Store build successfully compiled & ready.'
    ];

    statuses.forEach((status, idx) => {
      setTimeout(() => {
        setStatusMessage(status);
        setBuildStepIndex(idx);
        if (status.includes('Agent terminated')) {
          setIsAutoRetrying(true);
        }
        if (idx === statuses.length - 1) {
          setBuildComplete(true);
          showToast('🚀 Shoe Store successfully deployed to http://localhost:3000');
        }
      }, (idx + 1) * 320);
    });
  };

  // Natural Language modification on generated website
  const handleApplyAiModification = () => {
    if (!aiModifierPrompt.trim()) return;
    setIsModifyingWebsite(true);
    showToast(`🤖 Shubh AI: Understanding "${aiModifierPrompt}" -> Updating component tree...`);
    
    setTimeout(() => {
      const lower = aiModifierPrompt.toLowerCase();
      if (lower.includes('banner') || lower.includes('discount') || lower.includes('festival')) {
        setFestivalBannerActive(prev => !prev);
      }
      setIsModifyingWebsite(false);
      setAiModifierPrompt('');
      showToast('✨ Live Website updated seamlessly!');
    }, 1500);
  };

  // Cart Helpers
  const cartSubtotal = cartItems.reduce((acc, item) => acc + (item.product.price * item.qty), 0);
  const discountAmount = couponDiscount > 0 ? (cartSubtotal * couponDiscount) / 100 : 0;
  const grandTotal = Math.max(0, cartSubtotal - discountAmount);

  const handleAddToCart = (product: ShoeProduct, size = 8) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id && item.size === size);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id && item.size === size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { product, size, qty: 1 }];
    });
    showToast(`Added ${product.name} (UK ${size}) to Cart!`);
  };

  const handleUpdateCartQty = (productId: number, size: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.product.id === productId && item.size === size) {
        const newQty = item.qty + delta;
        return newQty > 0 ? { ...item, qty: newQty } : null;
      }
      return item;
    }).filter(Boolean) as Array<{ product: ShoeProduct; size: number; qty: number }>);
  };

  const handleApplyCoupon = () => {
    if (couponCode.toUpperCase() === 'SHUBH20') {
      setCouponDiscount(20);
      showToast('🎉 Coupon SHUBH20 applied! 20% Discount Activated.');
    } else if (couponCode.toUpperCase() === 'AIRMAX50') {
      setCouponDiscount(30);
      showToast('🎉 VIP Coupon AIRMAX50 applied! 30% Discount Activated.');
    } else {
      showToast('⚠️ Invalid coupon code. Try "SHUBH20"');
    }
  };

  const handleExecutePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      const newOrder: OrderRecord = {
        orderId: `SHUBH-${Math.floor(1000 + Math.random() * 9000)}-IN`,
        date: '29 Aug 2026',
        items: [...cartItems],
        totalAmount: grandTotal,
        deliveryStatus: 'Order Placed',
        paymentStatus: paymentMethod === 'upi' ? 'Paid via UPI' : paymentMethod === 'card' ? 'Paid via Card' : 'Cash on Delivery',
        address: 'Dileep Sai Galla, VIT Chennai Campus, Vandalur-Kelambakkam Road, Chennai 600127',
        estimatedDelivery: 'In 2 Business Days (Express)'
      };
      setOrderConfirmation(newOrder);
      setOrdersHistory(prev => [newOrder, ...prev]);
      setCartItems([]);
      setIsCheckoutOpen(false);
      showToast('🎉 Payment Verified! Order Successfully Placed.');
    }, 1800);
  };

  // Filtered Products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = storeCategory === 'All' 
      ? true 
      : p.category === storeCategory || p.genderCategory === storeCategory;
    const matchesSearch = p.name.toLowerCase().includes(storeSearch.toLowerCase()) || 
                          p.brand.toLowerCase().includes(storeSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(storeSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="relative w-full h-full min-h-[500px] bg-[#090d16] text-slate-100 flex flex-col overflow-hidden font-sans select-none">
      
      {/* ───────────────────────────────────────────────────────── */}
      {/* GLOBAL TOAST NOTIFICATION                                 */}
      {/* ───────────────────────────────────────────────────────── */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="fixed top-12 left-1/2 -translate-x-1/2 z-50 bg-purple-950/95 border border-purple-400 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl flex items-center gap-2 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-spin" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ───────────────────────────────────────────────────────── */}
      {/* STUDIO TOP HEADER & MODE CONTROLS                         */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="h-9 bg-slate-900/95 border-b border-purple-900/40 px-3 flex items-center justify-between shrink-0 z-30 backdrop-blur-md">
        {/* Left Studio Identity */}
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-purple-950 border border-purple-500/40 flex items-center justify-center p-0.5 shadow-md">
            <img src={shubhAiStudioImg} alt="Shubh AI Studio" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black text-white tracking-tight font-mono">
              SHUBH AI STUDIO
            </span>
            <span className="px-1.5 py-0.5 rounded-full bg-purple-500/20 border border-purple-500/40 text-[7px] font-mono text-purple-300 font-bold uppercase">
              Claude 3.5 Agentic Swarm
            </span>
          </div>
        </div>

        {/* Center Viewport Switcher */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-0.5 rounded-lg border border-slate-800 text-[8px] font-mono">
          <button 
            onClick={() => setActiveView('studio')}
            className={`px-2 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
              activeView === 'studio' 
                ? 'bg-purple-600 text-white font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Bot className="w-3 h-3" />
            <span>Studio Chat</span>
          </button>

          <button 
            onClick={() => setActiveView('building')}
            className={`px-2 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
              activeView === 'building' 
                ? 'bg-purple-600 text-white font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3 h-3" />
            <span>Build Activity</span>
            {isAutoRetrying && <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />}
          </button>

          <button 
            onClick={() => setActiveView('preview')}
            className={`px-2 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
              activeView === 'preview' 
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold shadow-sm' 
                : 'text-slate-400 hover:text-emerald-300'
            }`}
          >
            <Globe className="w-3 h-3 text-emerald-400" />
            <span>Live Website</span>
            <span className="text-[6.5px] px-1 bg-emerald-500/20 text-emerald-300 rounded">localhost:3000</span>
          </button>

          <button 
            onClick={() => setActiveView('split')}
            className={`px-2 py-1 rounded flex items-center gap-1 transition-all cursor-pointer ${
              activeView === 'split' 
                ? 'bg-indigo-600 text-white font-bold shadow-sm' 
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <SplitSquareVertical className="w-3 h-3" />
            <span>Split View</span>
          </button>
        </div>

        {/* Right Actions & Account */}
        <div className="flex items-center gap-2">
          {/* Play Tour Toggle */}
          <button
            onClick={() => setIsPlayingTour(prev => !prev)}
            className={`px-2 py-1 rounded-lg text-[7.5px] font-mono font-bold flex items-center gap-1 shadow-md transition-all cursor-pointer ${
              isPlayingTour
                ? 'bg-amber-500 text-slate-950 animate-pulse'
                : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white'
            }`}
          >
            {isPlayingTour ? <Pause className="w-2.5 h-2.5" /> : <Play className="w-2.5 h-2.5" />}
            <span>{isPlayingTour ? 'Pause Tour' : 'Play Tour'}</span>
          </button>

          <button 
            onClick={() => {
              setActiveView('studio');
              setBuildComplete(false);
              setBuildStepIndex(0);
              setInputPrompt('Create a modern shoe website.');
              setIsPlayingTour(false);
              showToast('Restarted to Shubh AI Studio Welcome Screen');
            }}
            title="Reset Workspace"
            className="p-1 px-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[8px] font-mono flex items-center gap-1 border border-slate-700 transition-all cursor-pointer"
          >
            <RotateCcw className="w-3 h-3 text-purple-400" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <div className="relative">
            <button 
              onClick={() => setIsAccountMenuOpen(prev => !prev)}
              className="flex items-center gap-1.5 p-0.5 rounded-full border border-purple-500/40 bg-slate-800 hover:border-purple-400 transition-all cursor-pointer"
            >
              <img src={userAvatar} alt="Dileep" className="w-5 h-5 rounded-full object-cover" />
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            </button>

            {/* Account Popover */}
            {isAccountMenuOpen && (
              <div className="absolute right-0 top-7 w-48 bg-slate-900 border border-purple-500/30 rounded-xl p-2.5 shadow-2xl z-50 text-[8px] font-mono space-y-2">
                <div className="flex items-center gap-2 pb-1.5 border-b border-slate-800">
                  <img src={userAvatar} alt="Dileep" className="w-7 h-7 rounded-full object-cover" />
                  <div>
                    <span className="font-bold text-white block">Dileep Sai Galla</span>
                    <span className="text-purple-400 text-[7px]">Free Trial • Pro AI Dev</span>
                  </div>
                </div>
                <div className="space-y-1 text-slate-300">
                  <div className="flex justify-between items-center py-1 hover:text-white cursor-pointer">
                    <span>Account Management</span>
                    <ChevronRight className="w-3 h-3 text-slate-500" />
                  </div>
                  <div className="flex justify-between items-center py-1 hover:text-white cursor-pointer">
                    <span>API Keys & Claude Tokens</span>
                    <Key className="w-3 h-3 text-purple-400" />
                  </div>
                  <button 
                    onClick={() => {
                      setIsAccountMenuOpen(false);
                      showToast('Logged out of Shubh AI Studio session.');
                    }}
                    className="w-full text-left py-1 text-red-400 hover:text-red-300 flex items-center gap-1 border-t border-slate-800/80 pt-1.5 cursor-pointer"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* MAIN WORKSPACE BODY: LEFT SIDEBAR + CENTER CONTENT        */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="flex-1 flex overflow-hidden">

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 1. LEFT SIDEBAR (Standard AI Assistant Workspace)       */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="w-48 bg-slate-950 border-r border-purple-950/50 flex flex-col justify-between shrink-0 select-none text-[8px]">
          
          {/* Top: Branding + Search */}
          <div className="p-2 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <img src={logoShubh} alt="Logo" className="w-4 h-4 object-contain" />
                <span className="font-black text-[9px] text-white tracking-tight">Shubh AI Studio</span>
              </div>
              <Search className="w-3 h-3 text-slate-500 hover:text-purple-400 cursor-pointer" />
            </div>

            {/* Search Input Bar */}
            <div className="relative">
              <input 
                type="text"
                placeholder="Search chats & tools..."
                value={sidebarSearch}
                onChange={e => setSidebarSearch(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[7.5px] text-slate-200 placeholder-slate-500 focus:outline-none focus:border-purple-500/50"
              />
            </div>

            {/* Main Navigation Items */}
            <div className="space-y-0.5 pt-1">
              {[
                { id: 'chat', label: 'Chat', icon: MessageSquare },
                { id: 'images', label: 'Images', icon: ImageIcon },
                { id: 'library', label: 'Library', icon: BookOpen },
                { id: 'plugins', label: 'Plugins', icon: Puzzle },
                { id: 'projects', label: 'Projects', icon: FolderGit2 },
                { id: 'agents', label: 'GPTs / AI Agents', icon: Bot },
                { id: 'more', label: 'More', icon: MoreHorizontal }
              ].map(item => {
                const Icon = item.icon;
                const isActive = sidebarNav === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSidebarNav(item.id as any);
                      if (item.id === 'chat') setActiveView('studio');
                      if (item.id === 'projects') setActiveView('building');
                    }}
                    className={`w-full flex items-center justify-between px-2 py-1 rounded-md font-medium transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-purple-950/80 text-purple-200 border border-purple-500/30' 
                        : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <Icon className={`w-3 h-3 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                      <span>{item.label}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Chat History Section (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-2 py-1 space-y-2 no-scrollbar border-t border-slate-900">
            {['Today', 'Yesterday', 'Previous Chats'].map(sec => {
              const items = conversations.filter(c => c.section === sec && c.title.toLowerCase().includes(sidebarSearch.toLowerCase()));
              if (items.length === 0) return null;
              return (
                <div key={sec} className="space-y-0.5 text-left">
                  <span className="text-[6.5px] font-mono uppercase font-bold text-slate-500 px-1 tracking-wider">
                    {sec}
                  </span>
                  {items.map(conv => (
                    <div 
                      key={conv.id}
                      onClick={() => {
                        setConversations(prev => prev.map(c => ({ ...c, active: c.id === conv.id })));
                        if (conv.title.includes('shoe')) {
                          setActiveView('building');
                        } else {
                          setActiveView('studio');
                        }
                      }}
                      className={`group relative flex items-center justify-between px-2 py-1 rounded-md cursor-pointer transition-all ${
                        conv.active 
                          ? 'bg-slate-900 text-purple-300 font-bold border border-purple-500/20' 
                          : 'text-slate-400 hover:bg-slate-900/60 hover:text-slate-200'
                      }`}
                    >
                      <div className="flex items-center gap-1 truncate pr-1">
                        <MessageSquare className="w-2.5 h-2.5 text-slate-500 shrink-0" />
                        {editingChatId === conv.id ? (
                          <input 
                            type="text"
                            value={editingTitleText}
                            onChange={e => setEditingTitleText(e.target.value)}
                            onBlur={() => {
                              if (editingTitleText.trim()) {
                                setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, title: editingTitleText } : c));
                              }
                              setEditingChatId(null);
                            }}
                            onKeyDown={e => {
                              if (e.key === 'Enter') {
                                if (editingTitleText.trim()) {
                                  setConversations(prev => prev.map(c => c.id === conv.id ? { ...c, title: editingTitleText } : c));
                                }
                                setEditingChatId(null);
                              }
                            }}
                            autoFocus
                            className="bg-slate-950 text-white text-[7.5px] px-1 rounded border border-purple-400 w-28 focus:outline-none"
                          />
                        ) : (
                          <span className="truncate text-[7.5px]">{conv.title}</span>
                        )}
                      </div>

                      {/* Three dot actions */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveChatMenuId(prev => prev === conv.id ? null : conv.id);
                        }}
                        className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-white transition-opacity cursor-pointer"
                      >
                        <MoreVertical className="w-2.5 h-2.5 text-slate-400" />
                      </button>

                      {/* Chat options menu */}
                      {activeChatMenuId === conv.id && (
                        <div className="absolute right-1 top-6 w-24 bg-slate-900 border border-slate-700 rounded-lg shadow-xl z-40 p-1 text-[7px] space-y-0.5">
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingChatId(conv.id);
                              setEditingTitleText(conv.title);
                              setActiveChatMenuId(null);
                            }}
                            className="w-full flex items-center gap-1 p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white cursor-pointer"
                          >
                            <Edit3 className="w-2.5 h-2.5" />
                            <span>Rename</span>
                          </button>
                          <button 
                            onClick={(e) => {
                              e.stopPropagation();
                              setConversations(prev => prev.filter(c => c.id !== conv.id));
                              setActiveChatMenuId(null);
                              showToast(`Deleted "${conv.title}"`);
                            }}
                            className="w-full flex items-center gap-1 p-1 hover:bg-red-950/60 rounded text-red-400 hover:text-red-300 cursor-pointer"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>

          {/* Sidebar Bottom Section (Permanently Displayed Account) */}
          <div className="p-2 border-t border-purple-900/40 bg-slate-950/90 space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="relative">
                  <img src={userAvatar} alt="Profile" className="w-6 h-6 rounded-full object-cover border border-purple-500/40" />
                  <span className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-left leading-tight">
                  <span className="font-bold text-white block text-[7.5px]">Dileep Sai Galla</span>
                  <span className="text-purple-400 text-[6.5px]">Free Trial</span>
                </div>
              </div>
              <button 
                onClick={() => setIsAccountMenuOpen(prev => !prev)}
                className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white cursor-pointer"
              >
                <MoreHorizontal className="w-3 h-3" />
              </button>
            </div>

            <div className="flex gap-1 pt-0.5">
              <button 
                onClick={() => showToast('Upgraded to Shubh AI Studio Pro Plan!')}
                className="flex-1 py-0.5 rounded bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-[6.5px] hover:opacity-95 cursor-pointer"
              >
                ⚡ Upgrade Pro
              </button>
              <button 
                onClick={() => showToast('Signed out of Shubh AI Studio.')}
                className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 hover:text-red-400 text-[6.5px] cursor-pointer"
                title="Sign Out"
              >
                <LogOut className="w-2.5 h-2.5" />
              </button>
            </div>
          </div>

        </div>

        {/* ═══════════════════════════════════════════════════════ */}
        {/* 2. CENTER WORKSPACE (Welcome Screen / Build / Preview)  */}
        {/* ═══════════════════════════════════════════════════════ */}
        <div className="flex-1 relative flex flex-col overflow-hidden bg-[#070b14]">

          {/* ─────────────────────────────────────────────────── */}
          {/* VIEW A: MAIN WELCOME SCREEN + CHAT INPUT            */}
          {/* ─────────────────────────────────────────────────── */}
          {activeView === 'studio' && (
            <div className="flex-1 flex flex-col justify-between p-4 overflow-y-auto no-scrollbar">
              
              {/* Center Welcome Container */}
              <div className="my-auto max-w-2xl mx-auto w-full flex flex-col items-center text-center space-y-4 py-2">
                {/* Glowing Shubh AI Cloud Logo */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      '0 0 25px rgba(168,85,247,0.25)', 
                      '0 0 50px rgba(168,85,247,0.5)', 
                      '0 0 25px rgba(168,85,247,0.25)'
                    ]
                  }}
                  transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                  className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-950 to-slate-900 border border-purple-500/50 p-2 flex items-center justify-center backdrop-blur-xl shadow-2xl"
                >
                  <img src={shubhAiStudioImg} alt="Shubh AI Cloud" className="w-full h-full object-contain" />
                </motion.div>

                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">Shubh AI Studio</span>
                  </h1>
                  <p className="text-slate-400 text-xs mt-1 font-mono">
                    Autonomous AI Development, Website Synthesis & Real-Time Code Execution Workspace
                  </p>
                </div>

                {/* Four Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left pt-2">
                  
                  {/* Card 1: Image Generation */}
                  <div 
                    onClick={() => {
                      setInputPrompt('Generate high-fidelity futuristic sneaker 3D concepts and UI hero assets.');
                      showToast('Selected Image Generation Mode');
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 border border-purple-900/30 hover:border-purple-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-purple-400 font-bold text-xs mb-1">
                      <div className="p-1 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 group-hover:scale-110 transition-transform">
                        <ImageIcon className="w-3.5 h-3.5" />
                      </div>
                      <span>Image Generation</span>
                    </div>
                    <p className="text-slate-400 text-[8.5px] leading-relaxed">
                      Generate images, graphics, UI concepts, illustrations, and visual assets using AI.
                    </p>
                  </div>

                  {/* Card 2: Code Generation */}
                  <div 
                    onClick={() => {
                      setInputPrompt('Create a modern shoe website.');
                      handleStartAutonomousBuild('Create a modern shoe website.');
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 border border-cyan-900/30 hover:border-cyan-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs mb-1">
                      <div className="p-1 rounded-lg bg-cyan-950 border border-cyan-500/40 text-cyan-300 group-hover:scale-110 transition-transform">
                        <Code2 className="w-3.5 h-3.5" />
                      </div>
                      <span>Code Generation</span>
                    </div>
                    <p className="text-slate-400 text-[8.5px] leading-relaxed">
                      Generate complete code, components, applications, websites, APIs, and other development projects.
                    </p>
                  </div>

                  {/* Card 3: Code Explanation */}
                  <div 
                    onClick={() => {
                      setInputPrompt('Explain how the autonomous React cart and UPI payment webhook handler works.');
                      showToast('Selected Code Explanation Mode');
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 border border-pink-900/30 hover:border-pink-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-pink-400 font-bold text-xs mb-1">
                      <div className="p-1 rounded-lg bg-pink-950 border border-pink-500/40 text-pink-300 group-hover:scale-110 transition-transform">
                        <BookOpen className="w-3.5 h-3.5" />
                      </div>
                      <span>Code Explanation</span>
                    </div>
                    <p className="text-slate-400 text-[8.5px] leading-relaxed">
                      Explain existing code, identify issues, and provide clear technical explanations.
                    </p>
                  </div>

                  {/* Card 4: Code Integration */}
                  <div 
                    onClick={() => {
                      setInputPrompt('Integrate Razorpay, Stripe, and PostgreSQL authentication into the checkout flow.');
                      showToast('Selected Code Integration Mode');
                    }}
                    className="p-3 rounded-xl bg-slate-900/80 border border-emerald-900/30 hover:border-emerald-500/60 hover:bg-slate-900 transition-all cursor-pointer group shadow-lg"
                  >
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs mb-1">
                      <div className="p-1 rounded-lg bg-emerald-950 border border-emerald-500/40 text-emerald-300 group-hover:scale-110 transition-transform">
                        <Puzzle className="w-3.5 h-3.5" />
                      </div>
                      <span>Code Integration</span>
                    </div>
                    <p className="text-slate-400 text-[8.5px] leading-relaxed">
                      Integrate APIs, databases, authentication, third-party services, libraries, and existing codebases.
                    </p>
                  </div>

                </div>
              </div>

              {/* 5. AI Message Input (Bottom of Workspace) */}
              <div className="w-full max-w-2xl mx-auto relative shrink-0 pt-2">
                
                {/* Attachment Menu Popup */}
                {isAttachmentMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-16 left-0 bg-slate-900 border border-purple-500/40 rounded-xl p-2 shadow-2xl z-40 w-56 text-[8px] font-mono space-y-1 backdrop-blur-xl"
                  >
                    <span className="text-[7px] uppercase font-bold text-slate-500 px-1">Attach Resources</span>
                    {[
                      { label: 'Add Files', icon: FileCode },
                      { label: 'Add from Library', icon: BookOpen },
                      { label: 'Upload Project', icon: FolderGit2 },
                      { label: 'Attach Images', icon: ImageIcon },
                      { label: 'Add Documents', icon: FileText },
                      { label: 'Other supported resources', icon: Puzzle }
                    ].map(opt => (
                      <button
                        key={opt.label}
                        onClick={() => {
                          setAttachedFiles(prev => [...prev, opt.label]);
                          setIsAttachmentMenuOpen(false);
                          showToast(`Attached: ${opt.label}`);
                        }}
                        className="w-full flex items-center gap-2 p-1.5 rounded-lg hover:bg-purple-950/60 text-slate-300 hover:text-white transition-all text-left cursor-pointer"
                      >
                        <opt.icon className="w-3 h-3 text-purple-400" />
                        <span>{opt.label}</span>
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Attached Pills */}
                {attachedFiles.length > 0 && (
                  <div className="flex gap-1 pb-1.5 flex-wrap">
                    {attachedFiles.map((f, i) => (
                      <span key={i} className="px-2 py-0.5 rounded-full bg-purple-950 border border-purple-500/40 text-purple-300 text-[7px] font-mono flex items-center gap-1">
                        <Paperclip className="w-2.5 h-2.5" />
                        <span>{f}</span>
                        <X 
                          className="w-2.5 h-2.5 cursor-pointer hover:text-white" 
                          onClick={() => setAttachedFiles(prev => prev.filter((_, idx) => idx !== i))}
                        />
                      </span>
                    ))}
                  </div>
                )}

                {/* Large AI Message Input Container */}
                <div className="bg-slate-900/90 border border-purple-500/40 rounded-2xl p-2 flex flex-col shadow-2xl backdrop-blur-xl focus-within:border-purple-400 transition-all">
                  <textarea
                    value={inputPrompt}
                    onChange={e => setInputPrompt(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleStartAutonomousBuild();
                      }
                    }}
                    placeholder="Describe what you want to build (e.g. Create a modern shoe website)..."
                    rows={2}
                    className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none resize-none font-sans px-1"
                  />

                  {/* Bottom input control buttons */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800">
                    <div className="flex items-center gap-1">
                      {/* Plus button */}
                      <button 
                        onClick={() => setIsAttachmentMenuOpen(prev => !prev)}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isAttachmentMenuOpen 
                            ? 'bg-purple-600 text-white border-purple-400' 
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                        }`}
                        title="Add attachments / resources"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>

                      {/* Microphone icon */}
                      <button 
                        onClick={() => {
                          setIsVoiceActive(prev => !prev);
                          showToast(isVoiceActive ? 'Voice typing paused' : 'Listening... Speak your prompt');
                        }}
                        className={`p-1.5 rounded-lg border transition-all cursor-pointer ${
                          isVoiceActive 
                            ? 'bg-red-600 text-white border-red-400 animate-pulse' 
                            : 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white'
                        }`}
                        title="Voice Input"
                      >
                        {isVoiceActive ? <Mic className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                      </button>

                      <span className="text-[7px] text-slate-500 font-mono hidden sm:inline pl-1">
                        Claude 3.5 Sonnet Agentic Mode
                      </span>
                    </div>

                    {/* Send Button */}
                    <button 
                      onClick={() => handleStartAutonomousBuild()}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold font-mono flex items-center gap-1.5 shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
                    >
                      <span>Build Website</span>
                      <Send className="w-3 h-3" />
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────── */}
          {/* VIEW B: AUTONOMOUS AI BUILDING WORKFLOW & CODE DIFF */}
          {/* ─────────────────────────────────────────────────── */}
          {(activeView === 'building' || activeView === 'split') && (
            <div className={`flex-1 flex ${activeView === 'split' ? 'w-1/2 border-r border-purple-900/40' : 'w-full'} flex-col bg-slate-950 overflow-hidden`}>
              
              {/* Header Status of Building */}
              <div className="p-3 bg-slate-900/90 border-b border-purple-900/40 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-xl bg-purple-950 border border-purple-500/50 flex items-center justify-center text-purple-400 shadow-md">
                    <Cpu className="w-4 h-4 animate-spin" />
                  </div>
                  <div className="text-left">
                    <span className="text-[9.5px] font-extrabold text-white font-mono flex items-center gap-1.5">
                      <span>Autonomous AI Development Swarm</span>
                      {isAutoRetrying ? (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 text-[6.5px] border border-amber-500/40 animate-pulse">
                          Self-Healing Retry
                        </span>
                      ) : buildComplete ? (
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[6.5px] border border-emerald-500/40">
                          Complete ✓
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 text-[6.5px] border border-purple-500/40">
                          Working
                        </span>
                      )}
                    </span>
                    <span className="text-[7.5px] font-mono text-purple-300 block">
                      {statusMessage}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button 
                    onClick={() => setActiveFileTreeTab('files')}
                    className={`px-2 py-0.5 rounded text-[7.5px] font-mono cursor-pointer ${activeFileTreeTab === 'files' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Files Tree
                  </button>
                  <button 
                    onClick={() => setActiveFileTreeTab('logs')}
                    className={`px-2 py-0.5 rounded text-[7.5px] font-mono cursor-pointer ${activeFileTreeTab === 'logs' ? 'bg-purple-600 text-white font-bold' : 'text-slate-400 hover:text-white'}`}
                  >
                    Activity Diffs
                  </button>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-slate-900 overflow-hidden">
                <motion.div 
                  initial={{ width: '10%' }}
                  animate={{ width: buildComplete ? '100%' : `${Math.min(95, (buildStepIndex + 1) * 11)}%` }}
                  transition={{ duration: 0.4 }}
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-emerald-400"
                />
              </div>

              {/* Middle Section: File Tree or Logs */}
              <div className="flex-1 flex overflow-hidden">
                
                {/* File Tree Panel */}
                <div className="w-44 bg-slate-950/90 border-r border-slate-900 p-2 overflow-y-auto no-scrollbar text-left text-[8px] font-mono space-y-1">
                  <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-900">
                    <span className="font-bold uppercase text-[7px]">PROJECT EXPLORER</span>
                    <FolderTree className="w-3 h-3 text-purple-400" />
                  </div>

                  <div className="pl-1 space-y-1 text-slate-300">
                    <div className="flex items-center gap-1 text-purple-300 font-bold">
                      <Folder className="w-3 h-3 text-purple-400" />
                      <span>shoe-store/</span>
                    </div>

                    <div className="pl-3 space-y-0.5 border-l border-slate-800">
                      <div 
                        onClick={() => setSelectedFileForPreview('index.html')}
                        className={`flex items-center justify-between p-1 rounded cursor-pointer ${selectedFileForPreview === 'index.html' ? 'bg-purple-950 text-white font-bold' : 'hover:bg-slate-900 text-slate-400'}`}
                      >
                        <div className="flex items-center gap-1">
                          <FileCode className="w-2.5 h-2.5 text-orange-400" />
                          <span>index.html</span>
                        </div>
                        <span className="text-[6.5px] text-emerald-400">+124</span>
                      </div>

                      <div 
                        onClick={() => setSelectedFileForPreview('style.css')}
                        className={`flex items-center justify-between p-1 rounded cursor-pointer ${selectedFileForPreview === 'style.css' ? 'bg-purple-950 text-white font-bold' : 'hover:bg-slate-900 text-slate-400'}`}
                      >
                        <div className="flex items-center gap-1">
                          <FileCode className="w-2.5 h-2.5 text-cyan-400" />
                          <span>style.css</span>
                        </div>
                        <span className="text-[6.5px] text-emerald-400">+210</span>
                      </div>

                      <div 
                        onClick={() => setSelectedFileForPreview('script.js')}
                        className={`flex items-center justify-between p-1 rounded cursor-pointer ${selectedFileForPreview === 'script.js' ? 'bg-purple-950 text-white font-bold' : 'hover:bg-slate-900 text-slate-400'}`}
                      >
                        <div className="flex items-center gap-1">
                          <FileCode className="w-2.5 h-2.5 text-yellow-400" />
                          <span>script.js</span>
                        </div>
                        <span className="text-[6.5px] text-emerald-400">+145</span>
                      </div>

                      {/* Assets folder */}
                      <div className="flex items-center gap-1 text-slate-400 pt-0.5">
                        <Folder className="w-2.5 h-2.5 text-slate-500" />
                        <span>assets/</span>
                      </div>
                      <div className="pl-2 space-y-0.5 border-l border-slate-800 text-[7px] text-slate-500">
                        <span>logo.svg</span> • <span>hero.jpg</span> • <span>shoes(6)</span>
                      </div>

                      {/* Components folder */}
                      <div className="flex items-center gap-1 text-purple-300 font-bold pt-0.5">
                        <Folder className="w-2.5 h-2.5 text-purple-400" />
                        <span>components/</span>
                      </div>
                      <div className="pl-2 space-y-0.5 border-l border-slate-800">
                        <div className="flex justify-between items-center text-[7px] text-slate-300">
                          <span>Header.jsx</span>
                          <span className="text-emerald-400 font-bold">+35 -0</span>
                        </div>
                        <div className="flex justify-between items-center text-[7px] text-slate-300">
                          <span>ProductCard.jsx</span>
                          <span className="text-emerald-400 font-bold">+42 <span className="text-red-400">-8</span></span>
                        </div>
                        <div className="flex justify-between items-center text-[7px] text-slate-300">
                          <span>Cart.jsx</span>
                          <span className="text-emerald-400 font-bold">+18 <span className="text-red-400">-4</span></span>
                        </div>
                        <div className="flex justify-between items-center text-[7px] text-slate-300">
                          <span>Footer.jsx</span>
                          <span className="text-emerald-400 font-bold">+48 -0</span>
                        </div>
                      </div>

                      {/* Checkout folder */}
                      <div className="flex items-center gap-1 text-slate-400 pt-0.5">
                        <Folder className="w-2.5 h-2.5 text-slate-500" />
                        <span>checkout/</span>
                      </div>
                      <div className="pl-2 text-[7px] text-slate-300 flex justify-between">
                        <span>payment.js</span>
                        <span className="text-emerald-400 font-bold">+88 -2</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Realistic Build Logs & Error Self-Healing Stream */}
                <div className="flex-1 p-3 overflow-y-auto font-mono text-[8px] space-y-2 text-left bg-[#050810]">
                  <div className="flex items-center justify-between text-slate-500 pb-1 border-b border-slate-900">
                    <span className="uppercase font-bold text-[7px]">REALTIME EXECUTION & DIFF FEED</span>
                    <span className="text-emerald-400 text-[6.5px]">Claude Subagent Process</span>
                  </div>

                  <div className="space-y-1.5">
                    {buildLogs.slice(0, Math.min(buildLogs.length, buildStepIndex + 3)).map((log, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`p-1.5 rounded-lg border flex items-center justify-between gap-2 ${
                          log.type === 'error'
                            ? 'bg-red-950/80 border-red-500/50 text-red-300'
                            : log.type === 'retry'
                            ? 'bg-amber-950/70 border-amber-500/40 text-amber-300 animate-pulse'
                            : log.type === 'success'
                            ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-300'
                            : log.type === 'create'
                            ? 'bg-slate-900/80 border-slate-800 text-slate-200'
                            : 'bg-purple-950/40 border-purple-900/30 text-purple-200'
                        }`}
                      >
                        <div className="flex items-center gap-1.5 truncate">
                          {log.type === 'error' && <AlertTriangle className="w-3 h-3 text-red-400 shrink-0" />}
                          {log.type === 'retry' && <RefreshCw className="w-3 h-3 text-amber-400 animate-spin shrink-0" />}
                          {log.type === 'success' && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                          {log.type === 'create' && <FileCode className="w-3 h-3 text-cyan-400 shrink-0" />}
                          {log.type === 'edit' && <Edit3 className="w-3 h-3 text-purple-400 shrink-0" />}
                          <span className="truncate">{log.text}</span>
                        </div>

                        {/* Diff stats in green and red */}
                        {log.add && log.del && (
                          <div className="flex items-center gap-1 shrink-0 font-bold">
                            <span className="text-emerald-400 bg-emerald-950/60 px-1 rounded">{log.add}</span>
                            <span className="text-red-400 bg-red-950/60 px-1 rounded">{log.del}</span>
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>

                  {/* Completion State Banner */}
                  {buildComplete && (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="mt-3 p-3 rounded-xl bg-gradient-to-r from-purple-950/90 via-slate-900 to-emerald-950/90 border border-emerald-500/50 space-y-2 shadow-2xl"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400">
                          <CheckCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-white font-extrabold text-xs">
                            I’ve successfully created your shoe website.
                          </h4>
                          <p className="text-slate-300 text-[7.5px] mt-0.5">
                            I built a complete responsive shoe-store website with product categories, animated interactions, shopping cart functionality, user profile controls, checkout, and payment flow.
                          </p>
                        </div>
                      </div>

                      {/* Clickable Localhost link */}
                      <div className="pt-1 flex items-center justify-between">
                        <button 
                          onClick={() => setActiveView('preview')}
                          className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[8.5px] flex items-center gap-1.5 shadow-lg cursor-pointer"
                        >
                          <Globe className="w-3 h-3" />
                          <span>Launch http://localhost:3000</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </button>
                        <span className="text-[7px] text-emerald-400 font-mono">
                          Ready for Production Review ⚡
                        </span>
                      </div>
                    </motion.div>
                  )}
                </div>

              </div>

            </div>
          )}

          {/* ─────────────────────────────────────────────────── */}
          {/* VIEW C: GENERATED LIVE MODERN SHOE STORE (E-COMMERCE)*/}
          {/* ─────────────────────────────────────────────────── */}
          {(activeView === 'preview' || activeView === 'split') && (
            <div className={`flex-1 flex ${activeView === 'split' ? 'w-1/2' : 'w-full'} flex-col bg-slate-950 overflow-y-auto no-scrollbar relative text-left`}>
              
              {/* Natural Language Live Modifier Top Bar (Shubh AI Studio + Generated Website connection) */}
              <div className="bg-gradient-to-r from-purple-950 via-slate-900 to-indigo-950 border-b border-purple-500/40 p-1.5 px-3 flex items-center justify-between gap-2 shrink-0 z-20">
                <div className="flex items-center gap-1.5 flex-1">
                  <Sparkles className="w-3 h-3 text-purple-400 shrink-0 animate-pulse" />
                  <input 
                    type="text"
                    value={aiModifierPrompt}
                    onChange={e => setAiModifierPrompt(e.target.value)}
                    onKeyDown={e => {
                      if (e.key === 'Enter') handleApplyAiModification();
                    }}
                    placeholder="Ask Shubh AI to modify (e.g. 'Add festival 30% discount banner' or 'Add a men running section')..."
                    className="w-full bg-slate-950/80 border border-purple-500/30 rounded-md px-2 py-0.5 text-[7.5px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-400 font-mono"
                  />
                </div>
                <button 
                  onClick={handleApplyAiModification}
                  disabled={isModifyingWebsite}
                  className="px-2 py-0.5 rounded bg-purple-600 hover:bg-purple-500 text-white font-bold text-[7px] font-mono shrink-0 shadow flex items-center gap-1 cursor-pointer"
                >
                  {isModifyingWebsite ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <Send className="w-2.5 h-2.5" />}
                  <span>{isModifyingWebsite ? 'Synthesizing...' : 'Modify Live'}</span>
                </button>
              </div>

              {/* 14. Generated Shoe Website Header */}
              <header className="sticky top-0 z-30 bg-slate-900/95 border-b border-slate-800 px-3 py-2 flex items-center justify-between backdrop-blur-md">
                {/* Brand Logo & Name with subtle animation */}
                <div className="flex items-center gap-2">
                  <motion.div 
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="w-6 h-6 rounded-lg bg-gradient-to-tr from-purple-600 via-pink-500 to-cyan-400 flex items-center justify-center p-0.5 shadow-md"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                  <div className="flex flex-col">
                    <span className="text-xs font-black tracking-tight text-white font-mono">
                      SHUBH KICKS
                    </span>
                    <span className="text-[6px] font-mono text-purple-400 font-bold uppercase tracking-wider">
                      Engineered Footwear
                    </span>
                  </div>
                </div>

                {/* Nav Links: Home, Men, Women, Kids, New Arrivals, Collections */}
                <nav className="hidden md:flex items-center gap-3 text-[8px] font-mono text-slate-300">
                  {['Home', "Men's Shoes", "Women's Shoes", "Kids' Shoes", 'New Arrivals', 'Collections'].map(nav => (
                    <button 
                      key={nav}
                      onClick={() => setStoreCategory(nav === 'Home' ? 'All' : nav)}
                      className={`hover:text-purple-400 transition-colors cursor-pointer ${
                        storeCategory === nav ? 'text-purple-400 font-bold' : ''
                      }`}
                    >
                      {nav}
                    </button>
                  ))}
                </nav>

                {/* Search, Profile, Shopping Cart */}
                <div className="flex items-center gap-2">
                  {/* Search Bar */}
                  <div className="relative w-24 sm:w-32">
                    <input 
                      type="text"
                      placeholder="Search kicks..."
                      value={storeSearch}
                      onChange={e => setStoreSearch(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded-full px-2.5 py-0.5 text-[7px] text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                    />
                    <Search className="w-2.5 h-2.5 text-slate-500 absolute right-2 top-1.5" />
                  </div>

                  {/* Profile Dropdown */}
                  <div className="relative">
                    <button 
                      onClick={() => setIsProfileMenuOpen(prev => !prev)}
                      className="p-1 rounded-full bg-slate-800 border border-slate-700 hover:text-white text-slate-300 cursor-pointer"
                    >
                      <User className="w-3 h-3" />
                    </button>

                    {/* 19. User Profile Dropdown Menu */}
                    {isProfileMenuOpen && (
                      <div className="absolute right-0 top-7 w-36 bg-slate-900 border border-purple-500/30 rounded-xl p-1.5 shadow-2xl z-40 text-[7.5px] font-mono space-y-0.5">
                        <button 
                          onClick={() => {
                            setIsOrdersModalOpen(true);
                            setIsProfileMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-1.5 p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white text-left cursor-pointer"
                        >
                          <PackageCheck className="w-3 h-3 text-purple-400" />
                          <span>My Orders ({ordersHistory.length})</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            showToast('Opened Profile Details for Dileep');
                          }}
                          className="w-full flex items-center gap-1.5 p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white text-left cursor-pointer"
                        >
                          <User className="w-3 h-3 text-cyan-400" />
                          <span>My Profile</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            showToast('VIT Chennai Saved Address Active');
                          }}
                          className="w-full flex items-center gap-1.5 p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white text-left cursor-pointer"
                        >
                          <Truck className="w-3 h-3 text-emerald-400" />
                          <span>Saved Addresses</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            showToast('UPI / RuPay Payment Methods Configured');
                          }}
                          className="w-full flex items-center gap-1.5 p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white text-left cursor-pointer"
                        >
                          <CreditCard className="w-3 h-3 text-yellow-400" />
                          <span>Payment Methods</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            showToast('Settings Saved');
                          }}
                          className="w-full flex items-center gap-1.5 p-1 hover:bg-slate-800 rounded text-slate-300 hover:text-white text-left cursor-pointer"
                        >
                          <SlidersHorizontal className="w-3 h-3 text-slate-400" />
                          <span>Settings</span>
                        </button>
                        <button 
                          onClick={() => {
                            setIsProfileMenuOpen(false);
                            showToast('Logged out of Store session.');
                          }}
                          className="w-full flex items-center gap-1.5 p-1 hover:bg-red-950/60 rounded text-red-400 hover:text-red-300 text-left border-t border-slate-800 pt-1 cursor-pointer"
                        >
                          <LogOut className="w-3 h-3" />
                          <span>Logout</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {/* 18. Shopping Cart Icon Button */}
                  <button 
                    onClick={() => setIsCartOpen(true)}
                    className="relative p-1 rounded-md bg-purple-950/80 border border-purple-500/40 text-purple-300 hover:text-white cursor-pointer"
                  >
                    <ShoppingCart className="w-3.5 h-3.5" />
                    {cartItems.length > 0 && (
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-pink-500 text-white text-[6.5px] font-black flex items-center justify-center shadow-lg animate-pulse">
                        {cartItems.reduce((acc, i) => acc + i.qty, 0)}
                      </span>
                    )}
                  </button>
                </div>
              </header>

              {/* Optional Dynamic Festival Banner (triggered by AI Modifier) */}
              {festivalBannerActive && (
                <div className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white py-1 px-3 text-[7.5px] font-bold font-mono flex items-center justify-between shrink-0 shadow-md">
                  <div className="flex items-center gap-1.5">
                    <BadgePercent className="w-3 h-3 animate-bounce" />
                    <span>FESTIVAL DROP 2026: Get Flat 20% OFF with code <strong>SHUBH20</strong></span>
                  </div>
                  <span className="text-[6.5px] bg-black/30 px-1.5 py-0.2 rounded font-mono">
                    Free Pan-India Delivery
                  </span>
                </div>
              )}

              {/* 15. Hero Section */}
              <div className="relative p-4 sm:p-6 bg-gradient-to-r from-purple-950/80 via-slate-900 to-[#0b031d] border-b border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0 overflow-hidden">
                
                {/* Hero Glow */}
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

                {/* Left Brand Messaging & CTAs */}
                <div className="max-w-md space-y-2 text-left z-10">
                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-[7px] font-mono font-bold">
                      ✦ NEXT-GEN HYPER-CUSHIONING
                    </span>
                    <span className="text-slate-400 text-[7px] font-mono">
                      Series 2026 Drop
                    </span>
                  </div>

                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-tight">
                    Engineered for Velocity. <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
                      Designed for Supremacy.
                    </span>
                  </h2>

                  <p className="text-slate-300 text-[8.5px] leading-relaxed">
                    Featuring dual-density nitrogen foam, anatomical arch propulsion, and carbon-infused outsoles for unrivaled energy return on road and track.
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <button 
                      onClick={() => handleAddToCart(PRODUCTS[0])}
                      className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-extrabold text-[8.5px] font-mono shadow-lg transition-all cursor-pointer flex items-center gap-1"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Shop Now (₹4,499)</span>
                    </button>
                    <button 
                      onClick={() => setStoreCategory('Running')}
                      className="px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 border border-slate-700 text-slate-200 text-[8.5px] font-mono font-bold transition-all cursor-pointer"
                    >
                      Explore Collection
                    </button>
                  </div>
                </div>

                {/* Right Large Shoe Visual with Smooth Hover/Float */}
                <motion.div 
                  animate={{ 
                    y: [0, -8, 0],
                    rotate: [-3, 2, -3]
                  }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
                  className="relative w-44 sm:w-56 h-36 flex items-center justify-center z-10 group"
                >
                  <img 
                    src={shoe1} 
                    alt="Featured Shoe" 
                    className="w-full h-full object-contain filter drop-shadow-[0_15px_25px_rgba(168,85,247,0.4)] group-hover:scale-105 transition-transform duration-500" 
                  />
                  <div className="absolute -bottom-2 px-2 py-0.5 rounded-full bg-black/60 border border-purple-500/40 text-purple-300 text-[6.5px] font-mono backdrop-blur-md">
                    Shubh Velocity Pulse Pro • UK 8
                  </div>
                </motion.div>
              </div>

              {/* 16. Product Categories Bar */}
              <div className="p-3 bg-slate-900/60 border-b border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar shrink-0">
                <span className="text-[7px] uppercase font-bold text-slate-500 font-mono pl-1 shrink-0">
                  Categories:
                </span>
                {[
                  'All', 
                  'Running', 
                  'Basketball', 
                  'Casual', 
                  'Training', 
                  'Lifestyle', 
                  'Sneakers', 
                  "Men's Shoes", 
                  "Women's Shoes", 
                  "Kids' Shoes"
                ].map(cat => (
                  <button
                    key={cat}
                    onClick={() => setStoreCategory(cat)}
                    className={`px-2 py-0.5 rounded-full text-[7.5px] font-mono whitespace-nowrap transition-all cursor-pointer ${
                      storeCategory === cat 
                        ? 'bg-purple-600 text-white font-bold shadow-sm' 
                        : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* 17. Product Cards Grid (All 6 Shoes) */}
              <div className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-mono uppercase font-bold text-slate-300 tracking-wider">
                    Footwear Catalog ({filteredProducts.length} Models)
                  </span>
                  <span className="text-[7.5px] text-purple-400 font-mono">
                    ✦ Instant 2-Day Pan-India Dispatch
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {filteredProducts.map(prod => (
                    <div 
                      key={prod.id}
                      className="rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-purple-500/50 transition-all p-3 flex flex-col justify-between group shadow-lg hover:shadow-purple-950/30"
                    >
                      {/* Product Image Area */}
                      <div className="relative w-full h-32 rounded-xl bg-slate-950 border border-slate-800/80 p-2 flex items-center justify-center overflow-hidden mb-2">
                        <img 
                          src={prod.image} 
                          alt={prod.name} 
                          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" 
                        />
                        
                        {/* Tag Badge */}
                        <span className="absolute top-2 left-2 px-1.5 py-0.2 rounded text-[6px] font-mono font-black bg-purple-600 text-white shadow">
                          {prod.tag}
                        </span>

                        {/* Quick View Button */}
                        <button 
                          onClick={() => setSelectedProductQuickView(prod)}
                          className="absolute bottom-2 right-2 p-1 rounded-lg bg-black/70 hover:bg-purple-600 text-white text-[7px] font-mono flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md cursor-pointer"
                        >
                          <Eye className="w-2.5 h-2.5" />
                          <span>Quick View</span>
                        </button>
                      </div>

                      {/* Info */}
                      <div className="space-y-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[6.5px] font-mono uppercase text-purple-400 font-bold">
                            {prod.brand} • {prod.category}
                          </span>
                          <div className="flex items-center gap-0.5 text-amber-400 text-[7px] font-mono">
                            <Star className="w-2.5 h-2.5 fill-amber-400" />
                            <span>{prod.rating} ({prod.reviews})</span>
                          </div>
                        </div>

                        <h4 className="text-white font-extrabold text-[9.5px] group-hover:text-purple-300 transition-colors leading-tight">
                          {prod.name}
                        </h4>

                        <p className="text-slate-400 text-[7px] line-clamp-2 leading-tight">
                          {prod.description}
                        </p>

                        {/* Size Selection Pills */}
                        <div className="flex items-center gap-1 pt-1">
                          <span className="text-[6px] text-slate-500 font-mono">UK:</span>
                          {prod.sizes.map(s => (
                            <span 
                              key={s}
                              className="px-1 py-0.2 rounded text-[6px] font-mono bg-slate-950 border border-slate-800 text-slate-400"
                            >
                              {s}
                            </span>
                          ))}
                        </div>

                        {/* Price & Action Buttons */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 mt-1">
                          <div>
                            <span className="text-white font-black text-xs font-mono">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </span>
                            <span className="text-slate-500 text-[7px] line-through ml-1 font-mono">
                              ₹{prod.originalPrice.toLocaleString('en-IN')}
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button 
                              onClick={() => handleAddToCart(prod)}
                              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-purple-300 text-[7px] font-bold font-mono border border-slate-700 transition-all cursor-pointer"
                            >
                              + Cart
                            </button>
                            <button 
                              onClick={() => {
                                handleAddToCart(prod);
                                setIsCheckoutOpen(true);
                              }}
                              className="px-2 py-1 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-[7px] font-bold font-mono shadow-sm transition-all cursor-pointer"
                            >
                              Buy
                            </button>
                          </div>
                        </div>

                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ───────────────────────────────────────────────── */}
              {/* 18. SHOPPING CART DRAWER / SHEET                  */}
              {/* ───────────────────────────────────────────────── */}
              {isCartOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex justify-end">
                  <motion.div 
                    initial={{ x: '100%' }}
                    animate={{ x: 0 }}
                    exit={{ x: '100%' }}
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    className="w-full max-w-sm bg-slate-900 border-l border-purple-500/30 p-4 flex flex-col justify-between shadow-2xl"
                  >
                    <div>
                      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-3">
                        <div className="flex items-center gap-2">
                          <ShoppingCart className="w-4 h-4 text-purple-400" />
                          <span className="text-white font-extrabold text-xs">
                            Your Shopping Cart ({cartItems.reduce((acc, i) => acc + i.qty, 0)})
                          </span>
                        </div>
                        <button onClick={() => setIsCartOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Items list */}
                      {cartItems.length === 0 ? (
                        <div className="py-12 text-center text-slate-500 text-xs font-mono space-y-2">
                          <ShoppingBag className="w-8 h-8 text-slate-700 mx-auto" />
                          <p>Your cart is empty. Add shoes from catalog!</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[45vh] overflow-y-auto pr-1 no-scrollbar">
                          {cartItems.map((item, idx) => (
                            <div key={idx} className="p-2 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between text-[8px]">
                              <div className="flex items-center gap-2">
                                <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-contain rounded" />
                                <div>
                                  <span className="text-white font-bold block">{item.product.name}</span>
                                  <span className="text-slate-400 text-[7px]">UK {item.size} • ₹{item.product.price.toLocaleString('en-IN')}</span>
                                  
                                  {/* Quantity Controls */}
                                  <div className="flex items-center gap-1.5 mt-1 font-mono">
                                    <button 
                                      onClick={() => handleUpdateCartQty(item.product.id, item.size, -1)}
                                      className="w-4 h-4 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                                    >
                                      -
                                    </button>
                                    <span className="text-white font-bold">{item.qty}</span>
                                    <button 
                                      onClick={() => handleUpdateCartQty(item.product.id, item.size, 1)}
                                      className="w-4 h-4 rounded bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 cursor-pointer"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>

                              <div className="text-right space-y-1">
                                <span className="text-emerald-400 font-mono font-bold block text-xs">
                                  ₹{(item.product.price * item.qty).toLocaleString('en-IN')}
                                </span>
                                <button 
                                  onClick={() => handleUpdateCartQty(item.product.id, item.size, -item.qty)}
                                  className="text-red-400 hover:text-red-300 text-[7px] cursor-pointer"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Bottom Pricing & Checkout */}
                    {cartItems.length > 0 && (
                      <div className="pt-3 border-t border-slate-800 space-y-2 text-[8px] font-mono">
                        {/* Coupon input */}
                        <div className="flex gap-1">
                          <input 
                            type="text"
                            placeholder="Enter coupon (e.g. SHUBH20)..."
                            value={couponCode}
                            onChange={e => setCouponCode(e.target.value)}
                            className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-2 py-1 text-[7.5px] text-white focus:outline-none focus:border-purple-400 uppercase"
                          />
                          <button 
                            onClick={handleApplyCoupon}
                            className="px-2 py-1 rounded-lg bg-purple-950 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-900 cursor-pointer"
                          >
                            Apply
                          </button>
                        </div>

                        {/* Breakdown */}
                        <div className="space-y-0.5 text-slate-400">
                          <div className="flex justify-between">
                            <span>Subtotal:</span>
                            <span className="text-slate-200">₹{cartSubtotal.toLocaleString('en-IN')}</span>
                          </div>
                          {couponDiscount > 0 && (
                            <div className="flex justify-between text-pink-400">
                              <span>Promo Discount ({couponDiscount}%):</span>
                              <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                            </div>
                          )}
                          <div className="flex justify-between">
                            <span>GST & Shipping (Free Express):</span>
                            <span className="text-emerald-400">₹0 (Free)</span>
                          </div>
                          <div className="flex justify-between text-white font-extrabold text-xs pt-1 border-t border-slate-800">
                            <span>Final Total:</span>
                            <span className="text-emerald-400 font-mono">₹{grandTotal.toLocaleString('en-IN')}</span>
                          </div>
                        </div>

                        <button 
                          onClick={() => {
                            setIsCartOpen(false);
                            setIsCheckoutOpen(true);
                          }}
                          className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white font-bold text-xs font-mono shadow-xl transition-all cursor-pointer"
                        >
                          Proceed to Checkout (₹{grandTotal.toLocaleString('en-IN')})
                        </button>
                      </div>
                    )}
                  </motion.div>
                </div>
              )}

              {/* ───────────────────────────────────────────────── */}
              {/* 21. CHECKOUT & PAYMENT MODAL                      */}
              {/* ───────────────────────────────────────────────── */}
              {isCheckoutOpen && (
                <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-3">
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-2xl p-4 space-y-3 shadow-2xl text-left"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div>
                        <span className="text-purple-400 text-[7px] font-mono uppercase font-bold tracking-wider">
                          SECURE CHECKOUT GATEWAY
                        </span>
                        <h4 className="text-white font-extrabold text-sm">
                          Instant Order & Payment Flow
                        </h4>
                      </div>
                      <button onClick={() => setIsCheckoutOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Delivery Address */}
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[7.5px] space-y-1">
                      <div className="flex items-center justify-between font-mono">
                        <span className="text-purple-400 font-bold uppercase">Delivery Address</span>
                        <span className="text-emerald-400">Verified Address ✓</span>
                      </div>
                      <p className="text-slate-300 font-sans leading-tight">
                        <strong>Dileep Sai Galla</strong> • +91 98765 43210 <br />
                        VIT Chennai Campus, Vandalur-Kelambakkam Road, Chennai, Tamil Nadu 600127
                      </p>
                    </div>

                    {/* Payment Mode Selection */}
                    <div className="space-y-1 text-[7.5px] font-mono">
                      <span className="text-slate-400 font-bold uppercase">Select Payment Method:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => setPaymentMethod('upi')}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            paymentMethod === 'upi'
                              ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <QrCode className="w-4 h-4 text-emerald-400" />
                          <span className="font-bold">UPI / QR / GPay</span>
                        </button>

                        <button
                          onClick={() => setPaymentMethod('card')}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            paymentMethod === 'card'
                              ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <CreditCard className="w-4 h-4 text-cyan-400" />
                          <span className="font-bold">Cards / RuPay</span>
                        </button>

                        <button
                          onClick={() => setPaymentMethod('cod')}
                          className={`p-2 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                            paymentMethod === 'cod'
                              ? 'bg-purple-950 border-purple-400 text-purple-200 shadow-md'
                              : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                          }`}
                        >
                          <Truck className="w-4 h-4 text-amber-400" />
                          <span className="font-bold">Cash on Delivery</span>
                        </button>
                      </div>
                    </div>

                    {/* Order summary & final action */}
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                      <div>
                        <span className="text-slate-400 text-[8px] block">Payable Amount:</span>
                        <span className="text-emerald-400 font-black text-sm">
                          ₹{grandTotal.toLocaleString('en-IN')}
                        </span>
                      </div>

                      <button
                        onClick={handleExecutePayment}
                        disabled={isProcessingPayment}
                        className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 text-slate-950 font-black text-xs font-mono shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all cursor-pointer flex items-center gap-1.5"
                      >
                        {isProcessingPayment ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                            <span>Verifying...</span>
                          </>
                        ) : (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Pay & Place Order</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ───────────────────────────────────────────────── */}
              {/* 22. ORDER CONFIRMATION MODAL                      */}
              {/* ───────────────────────────────────────────────── */}
              {orderConfirmation && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-3">
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-slate-900 border border-emerald-500/50 rounded-2xl p-5 space-y-3 shadow-2xl text-center"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-emerald-400 mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                    >
                      <CheckCircle2 className="w-8 h-8" />
                    </motion.div>

                    <div>
                      <span className="text-emerald-400 text-[8px] font-mono font-bold uppercase tracking-wider">
                        PAYMENT SECURED & VERIFIED
                      </span>
                      <h3 className="text-white font-black text-base mt-0.5">
                        Order Successfully Placed! 🎉
                      </h3>
                      <p className="text-slate-400 text-[8px] font-mono mt-1">
                        Order ID: <strong className="text-purple-400">{orderConfirmation.orderId}</strong>
                      </p>
                    </div>

                    {/* Details Box */}
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-left text-[8px] font-mono space-y-1">
                      <div className="flex justify-between text-slate-300">
                        <span>Total Paid:</span>
                        <span className="text-emerald-400 font-bold">₹{orderConfirmation.totalAmount.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Payment Status:</span>
                        <span className="text-purple-300">{orderConfirmation.paymentStatus}</span>
                      </div>
                      <div className="flex justify-between text-slate-300">
                        <span>Estimated Delivery:</span>
                        <span className="text-cyan-300">{orderConfirmation.estimatedDelivery}</span>
                      </div>
                      <div className="pt-1 border-t border-slate-850 text-slate-400 text-[7.5px] leading-tight">
                        Delivering to: {orderConfirmation.address}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button 
                        onClick={() => {
                          setOrderConfirmation(null);
                          setIsOrdersModalOpen(true);
                        }}
                        className="flex-1 py-2 rounded-xl bg-purple-950 hover:bg-purple-900 border border-purple-500/40 text-purple-300 font-bold text-[8.5px] font-mono cursor-pointer"
                      >
                        View My Orders
                      </button>
                      <button 
                        onClick={() => setOrderConfirmation(null)}
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-[8.5px] font-mono shadow-md cursor-pointer"
                      >
                        Continue Shopping
                      </button>
                    </div>
                  </motion.div>
                </div>
              )}

              {/* ───────────────────────────────────────────────── */}
              {/* 20. MY ORDERS MODAL                               */}
              {/* ───────────────────────────────────────────────── */}
              {isOrdersModalOpen && (
                <div className="fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-3">
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-lg bg-slate-900 border border-purple-500/40 rounded-2xl p-4 space-y-3 shadow-2xl text-left max-h-[85vh] overflow-y-auto no-scrollbar"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <div className="flex items-center gap-2">
                        <PackageCheck className="w-4 h-4 text-purple-400" />
                        <h4 className="text-white font-extrabold text-sm">
                          My Previous Purchases & Live Tracking
                        </h4>
                      </div>
                      <button onClick={() => setIsOrdersModalOpen(false)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {ordersHistory.map(ord => (
                        <div key={ord.orderId} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-[8px] font-mono">
                          <div className="flex justify-between items-center pb-1 border-b border-slate-850">
                            <div>
                              <span className="text-purple-400 font-bold">#{ord.orderId}</span>
                              <span className="text-slate-500 ml-2">Date: {ord.date}</span>
                            </div>
                            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-bold">
                              {ord.deliveryStatus}
                            </span>
                          </div>

                          {/* Tracking Stepper */}
                          <div className="flex items-center justify-between text-[7px] text-slate-400 px-2 py-1 bg-slate-900/60 rounded-lg">
                            {['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'].map((st, sIdx) => {
                              const isReached = sIdx <= 3; // simulated out for delivery
                              return (
                                <div key={st} className="flex flex-col items-center">
                                  <div className={`w-2 h-2 rounded-full mb-0.5 ${isReached ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                                  <span className={isReached ? 'text-emerald-300 font-bold' : 'text-slate-600'}>{st}</span>
                                </div>
                              );
                            })}
                          </div>

                          {/* Items summary */}
                          <div className="space-y-1 pt-1">
                            {ord.items.map((it, iIdx) => (
                              <div key={iIdx} className="flex items-center justify-between text-slate-300">
                                <div className="flex items-center gap-2">
                                  <img src={it.product.image} alt="" className="w-6 h-6 object-contain" />
                                  <span>{it.product.name} (UK {it.size}) × {it.qty}</span>
                                </div>
                                <span className="text-white font-bold">₹{(it.product.price * it.qty).toLocaleString('en-IN')}</span>
                              </div>
                            ))}
                          </div>

                          <div className="flex justify-between items-center pt-1 border-t border-slate-850 text-slate-400">
                            <span>Status: {ord.paymentStatus}</span>
                            <span className="text-emerald-400 font-extrabold text-xs">Total: ₹{ord.totalAmount.toLocaleString('en-IN')}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              )}

              {/* Quick View Modal */}
              {selectedProductQuickView && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3">
                  <motion.div 
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-full max-w-md bg-slate-900 border border-purple-500/40 rounded-2xl p-4 space-y-3 shadow-2xl text-left"
                  >
                    <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                      <h4 className="text-white font-extrabold text-sm">
                        {selectedProductQuickView.name}
                      </h4>
                      <button onClick={() => setSelectedProductQuickView(null)} className="text-slate-400 hover:text-white cursor-pointer">
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex gap-3">
                      <div className="w-36 h-36 rounded-xl bg-slate-950 border border-slate-800 p-2 flex items-center justify-center shrink-0">
                        <img src={selectedProductQuickView.image} alt="" className="w-full h-full object-contain" />
                      </div>
                      <div className="space-y-1.5 text-[8px] font-mono flex-1">
                        <span className="px-1.5 py-0.2 rounded bg-purple-600 text-white font-bold text-[6.5px]">
                          {selectedProductQuickView.tag}
                        </span>
                        <p className="text-slate-300 font-sans leading-tight">
                          {selectedProductQuickView.description}
                        </p>
                        <div className="space-y-0.5 text-slate-400 text-[7.5px]">
                          {selectedProductQuickView.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-1">
                              <Check className="w-2.5 h-2.5 text-emerald-400" />
                              <span>{f}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pt-1">
                          <span className="text-emerald-400 font-black text-sm">
                            ₹{selectedProductQuickView.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-slate-500 line-through ml-1.5 text-[8px]">
                            ₹{selectedProductQuickView.originalPrice.toLocaleString('en-IN')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button 
                      onClick={() => {
                        handleAddToCart(selectedProductQuickView);
                        setSelectedProductQuickView(null);
                      }}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-xs font-mono shadow-md cursor-pointer"
                    >
                      Add to Cart & Continue
                    </button>
                  </motion.div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>

      {/* ───────────────────────────────────────────────────────── */}
      {/* GLOBAL FOOTER TELEMETRY STATUS BAR                        */}
      {/* ───────────────────────────────────────────────────────── */}
      <div className="h-6 bg-slate-900 border-t border-purple-900/40 px-3 flex items-center justify-between text-[7px] font-mono text-slate-400 shrink-0 z-20">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Shubh AI Workspace Online</span>
          </span>
          <span className="hidden sm:inline">| Latency: 12ms</span>
          <span className="hidden sm:inline">| Sandbox: Isolated Judge0 Container</span>
        </div>

        <div className="flex items-center gap-2 text-purple-300">
          <span>Active Mode: {activeView.toUpperCase()}</span>
          <span>• Claude 3.5 Agentic Engine</span>
        </div>
      </div>

    </div>
  );
}
