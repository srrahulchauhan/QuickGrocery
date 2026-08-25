import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CATEGORIES, COUPONS } from '../data/products';

const ShopContext = createContext();

export const ShopProvider = ({ children }) => {
  // Navigation / View State
  const [activeView, setActiveView] = useState('home'); // 'home', 'search', 'checkout', 'orders', 'wishlist'
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // App Products
  const [products] = useState(PRODUCTS);

  // Cart State (stored in localStorage)
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('quick_grocery_cart');
    return saved ? JSON.parse(saved) : [];
  });

  // Wishlist State
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('quick_grocery_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  // Orders State
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('quick_grocery_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-98214',
        date: '24 Aug 2026, 04:15 PM',
        status: 'Delivered',
        items: [
          { ...PRODUCTS[0], quantity: 2 },
          { ...PRODUCTS[4], quantity: 1 }
        ],
        totalAmount: 96,
        address: 'Flat 302, Green Acres Apt, Sector 62, Noida'
      }
    ];
  });

  // Selected Delivery Address
  const [address, setAddress] = useState(() => {
    const saved = localStorage.getItem('quick_grocery_address');
    return saved ? JSON.parse(saved) : {
      type: 'Home',
      flat: 'Flat 302',
      area: 'Green Acres Apartment, Sector 62',
      city: 'Noida',
      pincode: '201301',
      receiverName: 'Aman Sharma',
      phone: '9876543210'
    };
  });

  // Applied Coupon
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  // User Auth State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('quick_grocery_user');
    return saved ? JSON.parse(saved) : { name: 'Aman Sharma', phone: '9876543210', isLoggedIn: true };
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Dark Mode State
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem('quick_grocery_theme') === 'dark';
  });

  // Toast Notification
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('quick_grocery_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('quick_grocery_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('quick_grocery_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('quick_grocery_address', JSON.stringify(address));
  }, [address]);

  useEffect(() => {
    localStorage.setItem('quick_grocery_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('quick_grocery_theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  // Cart Operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    showToast(`Added ${product.name} to cart 🛒`);
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) => {
          if (item.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const getItemQuantity = (productId) => {
    const item = cart.find((i) => i.id === productId);
    return item ? item.quantity : 0;
  };

  // Wishlist Operations
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`, 'info');
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`Saved to wishlist ❤️`);
        return [...prev, product];
      }
    });
  };

  const isWishlisted = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  // Financial Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartOriginalTotal = cart.reduce(
    (acc, item) => acc + (item.originalPrice || item.price) * item.quantity,
    0
  );
  const totalSavings = cartOriginalTotal - cartSubtotal;
  
  // Delivery Fee Rule: Free if subtotal >= 199 or cart is empty
  const deliveryFee = cartSubtotal === 0 || cartSubtotal >= 199 ? 0 : 25;
  const handlingFee = cartSubtotal > 0 ? 5 : 0;

  // Coupon Discount calculation
  let couponDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discount) {
      couponDiscount = appliedCoupon.discount;
    } else if (appliedCoupon.discountPercent) {
      const calc = (cartSubtotal * appliedCoupon.discountPercent) / 100;
      couponDiscount = Math.min(calc, appliedCoupon.maxDiscount || 100);
    }
  }

  const grandTotal = Math.max(0, cartSubtotal + deliveryFee + handlingFee - couponDiscount);
  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const applyCoupon = (code) => {
    const found = COUPONS.find((c) => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid Coupon Code', 'danger');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Min order for ${found.code} is ₹${found.minOrder}`, 'warning');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon ${found.code} applied successfully! 🎉`);
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon removed', 'info');
  };

  // Place Order Logic
  const placeOrder = (paymentMethod = 'UPI') => {
    if (cart.length === 0) return null;

    const newOrder = {
      id: `ORD-${Math.floor(10000 + Math.random() * 90000)}`,
      date: new Date().toLocaleString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      status: 'Order Placed (Arriving in 10 mins)',
      items: [...cart],
      paymentMethod,
      subtotal: cartSubtotal,
      discount: totalSavings + couponDiscount,
      deliveryFee,
      handlingFee,
      totalAmount: grandTotal,
      address: `${address.flat}, ${address.area}, ${address.city} - ${address.pincode}`
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedCoupon(null);
    setIsCartOpen(false);
    setActiveView('orders');
    showToast(`Order #${newOrder.id} placed successfully! 🚀`);
    return newOrder;
  };

  // Reorder Function
  const reorder = (orderItems) => {
    orderItems.forEach((item) => {
      addToCart(item);
    });
    setIsCartOpen(true);
  };

  return (
    <ShopContext.Provider
      value={{
        activeView,
        setActiveView,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        products,
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        getItemQuantity,
        totalCartCount,
        cartSubtotal,
        cartOriginalTotal,
        totalSavings,
        deliveryFee,
        handlingFee,
        couponDiscount,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        grandTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        placeOrder,
        reorder,
        address,
        setAddress,
        user,
        setUser,
        isCartOpen,
        setIsCartOpen,
        isAddressModalOpen,
        setIsAddressModalOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        darkMode,
        toggleDarkMode,
        toast,
        showToast
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => useContext(ShopContext);
