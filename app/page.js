"use client";
import { useState } from "react";

export default function Home() {
  const foods = [
    {
      id: 1,
      name: "Classic Burger",
      emoji: "🍔",
      price: 5.99,
      description: "Juicy Chicken patty with fresh lettuce, tomato, and our secret sauce",
      category: "Burgers",
      rating: 4.5,
      prepTime: "15 min",
      image: "🍔",
    },
    {
      id: 2,
      name: "Margherita Pizza",
      emoji: "🍕",
      price: 8.99,
      description: "Hand-tossed dough with fresh mozzarella, basil, and tomato sauce",
      category: "Pizza",
      rating: 4.8,
      prepTime: "20 min",
      image: "🍕",
    },
    {
      id: 3,
      name: "Crispy Fries",
      emoji: "🍟",
      price: 3.49,
      description: "Golden crispy fries seasoned with our signature spice blend",
      category: "Sides",
      rating: 4.2,
      prepTime: "10 min",
      image: "🍟",
    },
    {
      id: 4,
      name: "Chicken Wings",
      emoji: "🍗",
      price: 7.99,
      description: "Crispy fried wings tossed in buffalo sauce with ranch dip",
      category: "Chicken",
      rating: 4.6,
      prepTime: "18 min",
      image: "🍗",
    },
    {
      id: 5,
      name: "Caesar Salad",
      emoji: "🥗",
      price: 6.49,
      description: "Fresh romaine lettuce with parmesan, croutons, and Caesar dressing",
      category: "Salads",
      rating: 4.3,
      prepTime: "8 min",
      image: "🥗",
    },
    {
      id: 6,
      name: "Chocolate Shake",
      emoji: "🥤",
      price: 4.99,
      description: "Rich and creamy chocolate milkshake topped with whipped cream",
      category: "Drinks",
      rating: 4.7,
      prepTime: "5 min",
      image: "🥤",
    },
    {
      id: 7,
      name: "Tacos",
      emoji: "🌮",
      price: 6.99,
      description: "Three soft shell tacos with seasoned beef, salsa, and guacamole",
      category: "Mexican",
      rating: 4.4,
      prepTime: "12 min",
      image: "🌮",
    },
    {
      id: 8,
      name: "Sushi Roll",
      emoji: "🍣",
      price: 11.99,
      description: "Fresh salmon and avocado roll with soy sauce and wasabi",
      category: "Japanese",
      rating: 4.9,
      prepTime: "15 min",
      image: "🍣",
    },
    {
      id: 9,
      name: "Ice Cream Sundae",
      emoji: "🍨",
      price: 5.49,
      description: "Three scoops with hot fudge, nuts, whipped cream, and a cherry",
      category: "Desserts",
      rating: 4.6,
      prepTime: "5 min",
      image: "🍨",
    },
  ];

  // ---------- STATE ----------
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
  });
  const [addedAnimation, setAddedAnimation] = useState(null);

  // ---------- DERIVED DATA ----------
  const categories = ["All", ...new Set(foods.map((f) => f.category))];

  const filteredFoods = foods.filter((food) => {
    const matchesSearch =
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || food.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = cartTotal > 20 ? 0 : 2.99;
  const tax = cartTotal * 0.08;
  const grandTotal = cartTotal + deliveryFee + tax;
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // ---------- HANDLERS ----------
  const addToCart = (food) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...food, quantity: 1 }];
    });
    setAddedAnimation(food.id);
    setTimeout(() => setAddedAnimation(null), 600);
  };

  const removeFromCart = (foodId) => {
    setCart((prev) => prev.filter((item) => item.id !== foodId));
  };

  const updateQuantity = (foodId, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === foodId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const [orderNumber, setOrderNumber] = useState(null);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setIsCheckoutOpen(false);
    setIsOrderPlaced(true);
    setCart([]);
    setOrderNumber(Math.floor(Math.random() * 9000) + 1000);
    setCustomerInfo({
      name: "",
      phone: "",
      address: "",
      cardNumber: "",
      cardExpiry: "",
      cardCVV: "",
    });
  };

  // ---------- STAR RENDERER ----------
  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    return (
      <span className="text-yellow-400 text-sm">
        {"★".repeat(full)}
        {half && "½"}
        {"☆".repeat(5 - full - (half ? 1 : 0))}
        <span className="text-gray-500 ml-1 text-xs">({rating})</span>
      </span>
    );
  };

  // ===================== RENDER =====================
  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* ========== NAVBAR ========== */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-orange-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-3xl">🍽️</span>
              <h1 className="text-xl sm:text-2xl font-extrabold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                FoodieExpress
              </h1>
            </div>

            {/* Search */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="Search for food..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 transition-all"
                />
              </div>
            </div>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative flex items-center gap-2 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              <span className="text-xl">🛒</span>
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full animate-bounce shadow">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Search for food..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-gray-50"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="text-[200px] leading-none select-none">
            🍔🍕🍟🍗🥗🌮🍣🍨🥤
          </div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="text-center">
            <h2 className="text-4xl sm:text-6xl font-extrabold mb-4 leading-tight">
              Delicious Food,
              <br />
              <span className="text-yellow-300">Delivered Fast</span> 🚀
            </h2>
            <p className="text-lg sm:text-xl text-orange-100 mb-8 max-w-2xl mx-auto">
              Order your favorite meals from the best restaurants. Fresh
              ingredients, amazing taste, right at your doorstep.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#menu"
                className="px-8 py-3 bg-white text-orange-600 font-bold rounded-full hover:bg-yellow-50 hover:scale-105 transition-all duration-300 shadow-lg"
              >
                View Menu 📋
              </a>
              <div className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur rounded-full">
                <span className="text-yellow-300 text-xl">⭐</span>
                <span className="font-semibold">4.8 Rating</span>
                <span className="text-orange-200">• 10K+ Orders</span>
              </div>
            </div>
          </div>
        </div>
        {/* Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 100" className="w-full">
            <path
              fill="#fff7ed"
              d="M0,60 C360,100 720,0 1080,60 C1260,90 1380,70 1440,60 L1440,100 L0,100 Z"
            />
          </svg>
        </div>
      </section>

      {/* ========== FEATURES ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              title: "Fast Delivery",
              desc: "30 min or less guaranteed",
            },
            {
              icon: "🧑‍🍳",
              title: "Fresh Food",
              desc: "Made with premium ingredients",
            },
            {
              icon: "💰",
              title: "Best Prices",
              desc: "Free delivery on orders over $20",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 bg-white p-5 rounded-2xl shadow-sm border border-orange-50 hover:shadow-md transition-shadow"
            >
              <span className="text-4xl">{feature.icon}</span>
              <div>
                <h3 className="font-bold text-gray-800">{feature.title}</h3>
                <p className="text-sm text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ========== CATEGORY FILTER ========== */}
      <section id="menu" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-6">
          Our Menu 🍽️
        </h2>
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full font-semibold whitespace-nowrap transition-all duration-300 ${
                selectedCategory === cat
                  ? "bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg scale-105"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-orange-300 hover:text-orange-500"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ========== FOOD GRID ========== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredFoods.length === 0 ? (
          <div className="text-center py-16">
            <span className="text-6xl mb-4 block">😕</span>
            <h3 className="text-xl font-bold text-gray-600">No items found</h3>
            <p className="text-gray-400">Try a different search or category</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFoods.map((food) => {
              const inCart = cart.find((item) => item.id === food.id);
              return (
                <div
                  key={food.id}
                  className="group bg-white rounded-2xl shadow-sm border border-orange-50 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Food Image Area */}
                  <div className="relative bg-gradient-to-br from-orange-100 to-yellow-50 h-48 flex items-center justify-center">
                    <span className="text-8xl group-hover:scale-110 transition-transform duration-500">
                      {food.image}
                    </span>
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-orange-600 shadow-sm">
                      {food.category}
                    </span>
                    <span className="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-semibold px-3 py-1 rounded-full text-gray-600 shadow-sm">
                      ⏱️ {food.prepTime}
                    </span>
                    {/* Added animation overlay */}
                    {addedAnimation === food.id && (
                      <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
                        <span className="text-6xl animate-ping">✅</span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-800">
                        {food.emoji} {food.name}
                      </h3>
                      <span className="text-xl font-extrabold text-orange-500">
                        ${food.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-sm text-gray-500 mb-3 leading-relaxed">
                      {food.description}
                    </p>

                    <div className="flex items-center justify-between">
                      {renderStars(food.rating)}

                      {inCart ? (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(food.id, -1)}
                            className="w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-full font-bold hover:bg-orange-200 transition-colors"
                          >
                            −
                          </button>
                          <span className="font-bold text-gray-800 w-6 text-center">
                            {inCart.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(food.id, 1)}
                            className="w-8 h-8 flex items-center justify-center bg-orange-500 text-white rounded-full font-bold hover:bg-orange-600 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToCart(food)}
                          className="flex items-center gap-1 bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                          Add <span>+</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ========== CART SIDEBAR ========== */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          />

          {/* Sidebar */}
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h2 className="text-xl font-extrabold text-gray-800">
                🛒 Your Cart
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-5">
              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <span className="text-6xl mb-4 block">🛒</span>
                  <h3 className="text-lg font-bold text-gray-600">
                    Your cart is empty
                  </h3>
                  <p className="text-sm text-gray-400 mt-1">
                    Add some delicious food!
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-orange-50 p-3 rounded-xl"
                    >
                      <span className="text-4xl">{item.emoji}</span>
                      <div className="flex-1">
                        <h4 className="font-bold text-gray-800 text-sm">
                          {item.name}
                        </h4>
                        <p className="text-orange-500 font-semibold text-sm">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center bg-white rounded-full text-orange-500 font-bold shadow-sm hover:bg-orange-100 transition-colors"
                        >
                          −
                        </button>
                        <span className="font-bold text-sm w-5 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center bg-orange-500 rounded-full text-white font-bold shadow-sm hover:bg-orange-600 transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-400 hover:text-red-600 transition-colors"
                      >
                        🗑️
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="border-t border-gray-100 p-5 space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Delivery Fee</span>
                    <span>
                      {deliveryFee === 0 ? (
                        <span className="text-green-500 font-semibold">
                          FREE ✨
                        </span>
                      ) : (
                        `$${deliveryFee.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-extrabold text-gray-800 pt-2 border-t">
                    <span>Total</span>
                    <span className="text-orange-500">
                      ${grandTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                {cartTotal < 20 && (
                  <p className="text-xs text-center text-orange-500 bg-orange-50 p-2 rounded-lg">
                    🚚 Add ${(20 - cartTotal).toFixed(2)} more for FREE delivery!
                  </p>
                )}
                <button
                  onClick={handleCheckout}
                  className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
                >
                  Proceed to Checkout 🛍️
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========== CHECKOUT MODAL ========== */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsCheckoutOpen(false)}
          />

          <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-extrabold text-gray-800">
                Checkout 🛍️
              </h2>
              <button
                onClick={() => setIsCheckoutOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handlePlaceOrder} className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-orange-50 p-4 rounded-xl space-y-2">
                <h3 className="font-bold text-gray-700 mb-2">
                  📋 Order Summary
                </h3>
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between text-sm text-gray-600"
                  >
                    <span>
                      {item.emoji} {item.name} × {item.quantity}
                    </span>
                    <span className="font-semibold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="border-t border-orange-200 pt-2 mt-2 flex justify-between font-extrabold text-orange-600">
                  <span>Total</span>
                  <span>${grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Customer Details */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-700">
                  👤 Delivery Details
                </h3>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, name: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo({ ...customerInfo, phone: e.target.value })
                  }
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50"
                />
                <textarea
                  placeholder="Delivery Address"
                  value={customerInfo.address}
                  onChange={(e) =>
                    setCustomerInfo({
                      ...customerInfo,
                      address: e.target.value,
                    })
                  }
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent bg-gray-50 resize-none"
                />
              </div>

              {/* Payment Method */}
              <div className="space-y-4">
                <h3 className="font-bold text-gray-700">💳 Payment Method</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("cod")}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      paymentMethod === "cod"
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <span className="text-3xl block mb-1">💵</span>
                    <span className="text-sm font-semibold text-gray-700">
                      Cash on Delivery
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("online")}
                    className={`p-4 rounded-xl border-2 text-center transition-all ${
                      paymentMethod === "online"
                        ? "border-orange-500 bg-orange-50 shadow-sm"
                        : "border-gray-200 hover:border-orange-300"
                    }`}
                  >
                    <span className="text-3xl block mb-1">💳</span>
                    <span className="text-sm font-semibold text-gray-700">
                      Online Payment
                    </span>
                  </button>
                </div>

                {/* Online Payment Fields */}
                {paymentMethod === "online" && (
                  <div className="space-y-3 p-4 bg-blue-50 rounded-xl border border-blue-100">
                    <input
                      type="text"
                      placeholder="Card Number (1234 5678 9012 3456)"
                      value={customerInfo.cardNumber}
                      onChange={(e) =>
                        setCustomerInfo({
                          ...customerInfo,
                          cardNumber: e.target.value,
                        })
                      }
                      required
                      maxLength={19}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={customerInfo.cardExpiry}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            cardExpiry: e.target.value,
                          })
                        }
                        required
                        maxLength={5}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={customerInfo.cardCVV}
                        onChange={(e) =>
                          setCustomerInfo({
                            ...customerInfo,
                            cardCVV: e.target.value,
                          })
                        }
                        required
                        maxLength={4}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent bg-white"
                      />
                    </div>
                    <p className="text-xs text-blue-500 flex items-center gap-1">
                      🔒 Your payment info is secure and encrypted
                    </p>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold text-lg rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
              >
                {paymentMethod === "cod"
                  ? "Place Order (Cash on Delivery) 📦"
                  : `Pay $${grandTotal.toFixed(2)} Now 💳`}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ========== ORDER CONFIRMATION MODAL ========== */}
      {isOrderPlaced && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative bg-white w-full max-w-md rounded-2xl shadow-2xl p-8 text-center">
            <div className="text-7xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-extrabold text-gray-800 mb-2">
              Order Placed Successfully!
            </h2>
            <p className="text-gray-500 mb-2">
              Thank you for your order. Your food is being prepared!
            </p>
            <div className="bg-green-50 border border-green-200 p-4 rounded-xl mb-6">
              <p className="text-green-700 font-semibold">
                📋 Order #{orderNumber}
              </p>
              <p className="text-green-600 text-sm mt-1">
                Estimated delivery: 25–35 minutes 🚴
              </p>
            </div>
            <button
              onClick={() => setIsOrderPlaced(false)}
              className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
            >
              Order More Food 🍔
            </button>
          </div>
        </div>
      )}

      {/* ========== FOOTER ========== */}
      <footer className="bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-extrabold mb-3">🍽️ FoodieExpress</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Delivering happiness one meal at a time. Fresh food, fast
                delivery, and amazing taste.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li className="hover:text-orange-400 cursor-pointer transition-colors">
                  📋 Menu
                </li>
                <li className="hover:text-orange-400 cursor-pointer transition-colors">
                  📦 Track Order
                </li>
                <li className="hover:text-orange-400 cursor-pointer transition-colors">
                  📞 Contact Us
                </li>
                <li className="hover:text-orange-400 cursor-pointer transition-colors">
                  ❓ FAQ
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Contact</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>📍 123 Food Street, Tasty City</li>
                <li>📞 (555) 123-4567</li>
                <li>✉️ hello@foodieexpress.com</li>
                <li>🕐 Open: 9 AM – 11 PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            © 2025 FoodieExpress. All rights reserved. Made with ❤️
          </div>
        </div>
      </footer>

      {/* ========== CUSTOM STYLES ========== */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </main>
  );
}