import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  ShoppingCart,
  Heart,
  CheckCircle2,
  Plus,
  Minus,
  ShieldAlert,
  CreditCard,
  Hammer,
} from 'lucide-react';
import { SEOHead } from '../components/common/SEOHead';
import { Navbar } from '../components/layout/navbar';
import { Footer } from '../components/layout/footer';
import { Badge } from '../components/common/badge';
import { Button } from '../components/common/button';
import { projectsData } from '../config/projects.config';

interface CatalogItem {
  id: string;
  name: string;
  category: 'Dinnerware' | 'Drinkware' | 'Serveware' | 'Vases';
  price: number;
  clayType: string;
  glaze: string;
}

export const ClayVistaCaseStudy: React.FC = () => {
  const project = projectsData.find((p) => p.slug === 'clayvista')!;

  // Interactive Prototype State
  const catalog: CatalogItem[] = [
    {
      id: 'cv-1',
      name: 'Matte Charcoal Dinner Plate',
      category: 'Dinnerware',
      price: 38,
      clayType: 'Stoneware',
      glaze: 'Satin Matte Oxide',
    },
    {
      id: 'cv-2',
      name: 'Ribbed Ceramic Pourer Pitcher',
      category: 'Drinkware',
      price: 54,
      clayType: 'Terracotta Blend',
      glaze: 'Raw Exterior / Gloss Inner',
    },
    {
      id: 'cv-3',
      name: 'Organic Fluted Serving Bowl',
      category: 'Serveware',
      price: 68,
      clayType: 'White Kaolin Clay',
      glaze: 'Speckled Oat Reactive',
    },
    {
      id: 'cv-4',
      name: 'Architectural Pedestal Vase',
      category: 'Vases',
      price: 92,
      clayType: 'High-fire Porcelain',
      glaze: 'Unfinished Mineral Buff',
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cartItems, setCartItems] = useState<{ item: CatalogItem; qty: number }[]>([
    { item: catalog[0], qty: 2 },
    { item: catalog[2], qty: 1 },
  ]);
  const [wishlist, setWishlist] = useState<string[]>(['cv-1', 'cv-4']);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const filteredProducts =
    selectedCategory === 'All'
      ? catalog
      : catalog.filter((p) => p.category === selectedCategory);

  const addToCart = (product: CatalogItem) => {
    setCartItems((prev) => {
      const existing = prev.find((entry) => entry.item.id === product.id);
      if (existing) {
        return prev.map((entry) =>
          entry.item.id === product.id ? { ...entry, qty: entry.qty + 1 } : entry
        );
      }
      return [...prev, { item: product, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((entry) => {
          if (entry.item.id === id) {
            const newQty = entry.qty + delta;
            return newQty > 0 ? { ...entry, qty: newQty } : null;
          }
          return entry;
        })
        .filter(Boolean) as { item: CatalogItem; qty: number }[]
    );
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const subtotal = cartItems.reduce((acc, entry) => acc + entry.item.price * entry.qty, 0);

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <SEOHead
        title="ClayVista Ceramics E-commerce Case Study | Saurabh"
        description="Case study of ClayVista, an artisanal tableware e-commerce platform demonstrating stateful cart architecture, category filtering, and responsive shopping experiences."
        canonicalPath="/projects/clayvista"
      />

      <Navbar />

      <main className="flex-grow pt-28 pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Navigation */}
          <div className="mb-8">
            <Link
              to="/#projects"
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-500 rounded p-1"
            >
              <ArrowLeft className="w-4 h-4 text-electric-400" />
              <span>Back to Featured Case Studies</span>
            </Link>
          </div>

          {/* Header Banner */}
          <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-navy-700/80 mb-12 shadow-2xl relative overflow-hidden">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/40 text-amber-300 text-xs font-bold shadow-sm animate-pulse">
                <Hammer className="w-3.5 h-3.5 text-amber-400" />
                <span>Work In Progress — Active Development</span>
              </div>
              <Badge variant="violet" size="md">
                {project.category}
              </Badge>
              <span className="text-xs font-mono text-slate-400">
                Verified Architecture
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="mt-3 text-lg sm:text-xl text-violetAccent-300 font-medium">
              {project.tagline}
            </p>

            <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed max-w-3xl">
              {project.description}
            </p>

            {project.liveUrl && (
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 hover:from-amber-500 hover:to-yellow-400 text-navy-950 font-bold text-sm shadow-lg shadow-amber-900/30 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 group"
                >
                  <Hammer className="w-4 h-4 text-navy-950 group-hover:rotate-12 transition-transform" />
                  <span>Launch Live Prototype (Work in Progress)</span>
                  <ArrowRight className="w-4 h-4 text-navy-950" />
                </a>
                <span className="text-xs font-mono text-amber-400">
                  Host: {project.liveUrl}
                </span>
              </div>
            )}

            {/* Scope Notice */}
            <div className="mt-8 p-4 rounded-xl bg-amber-950/40 border border-amber-500/40 flex items-start gap-3 text-amber-200 text-xs sm:text-sm">
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block mb-0.5">Project Scope Notice:</strong>
                {project.disclaimer}
              </div>
            </div>
          </div>

          {/* Live Interactive Prototype Showcase */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-violetAccent-400" />
                  <span>Interactive Architecture Showcase</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Test the actual working catalog filtering, stateful cart updates, and wishlist toggling below:
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Badge variant="electric" size="sm">
                  Cart Items: {cartItems.reduce((acc, c) => acc + c.qty, 0)}
                </Badge>
                <Badge variant="violet" size="sm">
                  Wishlist: {wishlist.length}
                </Badge>
              </div>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-navy-700/80 shadow-xl bg-navy-900/60">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Catalog Browser (Col 8) */}
                <div className="lg:col-span-8 space-y-6">
                  {/* Category Filter Pills */}
                  <div className="flex items-center gap-2 overflow-x-auto pb-2">
                    {['All', 'Dinnerware', 'Drinkware', 'Serveware', 'Vases'].map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                          selectedCategory === cat
                            ? 'bg-violetAccent-600 text-white'
                            : 'bg-navy-950 text-slate-300 hover:text-white border border-navy-800'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Product Cards Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        className="bg-navy-950/90 rounded-xl p-4 border border-navy-800 flex flex-col justify-between group hover:border-violetAccent-500/40 transition-colors"
                      >
                        <div>
                          <div className="h-28 bg-gradient-to-tr from-navy-900 to-navy-850 rounded-lg flex items-center justify-center p-3 relative border border-navy-800">
                            <span className="text-xs font-mono text-slate-400 text-center">
                              [{prod.name}]
                            </span>
                            <button
                              type="button"
                              onClick={() => toggleWishlist(prod.id)}
                              aria-label={
                                wishlist.includes(prod.id)
                                  ? 'Remove from wishlist'
                                  : 'Save to wishlist'
                              }
                              className="absolute top-2 right-2 p-1.5 rounded-lg bg-navy-950/80 hover:bg-navy-900 text-slate-400 transition-colors"
                            >
                              <Heart
                                className={`w-4 h-4 ${
                                  wishlist.includes(prod.id)
                                    ? 'fill-rose-500 text-rose-500'
                                    : 'text-slate-400'
                                }`}
                              />
                            </button>
                          </div>

                          <div className="mt-3">
                            <Badge variant="outline" size="sm">
                              {prod.category}
                            </Badge>
                            <h4 className="font-bold text-white text-sm mt-1.5">{prod.name}</h4>
                            <div className="mt-2 space-y-0.5 text-[11px] text-slate-400 font-mono">
                              <div>Clay: {prod.clayType}</div>
                              <div>Glaze: {prod.glaze}</div>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-navy-850 flex items-center justify-between">
                          <span className="font-extrabold text-white text-base">
                            ${prod.price}.00
                          </span>
                          <button
                            type="button"
                            onClick={() => addToCart(prod)}
                            className="px-3 py-1.5 rounded-lg bg-violetAccent-600/20 hover:bg-violetAccent-600/30 text-violetAccent-300 border border-violetAccent-500/30 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Cart</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stateful Cart Summary Drawer Preview (Col 4) */}
                <div className="lg:col-span-4 bg-navy-950/95 rounded-2xl p-5 border border-navy-800 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between pb-3 border-b border-navy-800 mb-4">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4 text-violetAccent-400" />
                        <span className="font-bold text-white text-sm">Working Cart State</span>
                      </div>
                      <span className="text-[11px] font-mono text-emerald-400">Reactive</span>
                    </div>

                    {cartItems.length === 0 ? (
                      <div className="text-center py-8 text-xs text-slate-500">
                        Your cart is empty. Add items from the catalogue.
                      </div>
                    ) : (
                      <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                        {cartItems.map((entry) => (
                          <div
                            key={entry.item.id}
                            className="bg-navy-900/80 p-2.5 rounded-xl border border-navy-850 text-xs flex items-center justify-between"
                          >
                            <div className="max-w-[120px] truncate">
                              <span className="text-white font-medium block truncate">
                                {entry.item.name}
                              </span>
                              <span className="text-slate-400 text-[10px]">
                                ${entry.item.price} each
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-1 bg-navy-950 rounded-lg border border-navy-800 px-1 py-0.5">
                                <button
                                  type="button"
                                  onClick={() => updateQty(entry.item.id, -1)}
                                  className="text-slate-400 hover:text-white p-0.5"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="font-mono font-bold text-white px-1">
                                  {entry.qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateQty(entry.item.id, 1)}
                                  className="text-slate-400 hover:text-white p-0.5"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-semibold text-white">
                                ${entry.item.price * entry.qty}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-navy-800 mt-4 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-300">
                      <span>Subtotal</span>
                      <span className="font-bold text-white text-sm">${subtotal}.00</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>Estimated Shipping</span>
                      <span className="text-emerald-400">
                        {subtotal > 100 ? 'Complimentary' : '$12.00'}
                      </span>
                    </div>

                    <button
                      type="button"
                      disabled={cartItems.length === 0}
                      onClick={() => setShowCheckoutModal(true)}
                      className="w-full py-2.5 rounded-xl bg-violetAccent-600 hover:bg-violetAccent-500 disabled:opacity-50 text-white font-bold text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violetAccent-500"
                    >
                      Inspect Checkout Interface
                    </button>
                    <p className="text-[10px] text-center text-slate-500">
                      Demonstrates prototype modal flow (no actual charges processed)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Preview Modal */}
          {showCheckoutModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/80 backdrop-blur-sm"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
            >
              <div className="bg-navy-900 border border-navy-700 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between border-b border-navy-800 pb-3">
                  <h3 id="modal-title" className="text-lg font-bold text-white flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-violetAccent-400" />
                    <span>ClayVista Checkout Preview</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setShowCheckoutModal(false)}
                    className="text-slate-400 hover:text-white text-sm font-mono"
                  >
                    [Close]
                  </button>
                </div>

                <div className="p-3 bg-amber-950/50 border border-amber-500/40 rounded-xl text-xs text-amber-300">
                  <strong>Prototype Interface:</strong> This dialog showcases the e-commerce checkout form architecture. Payment gateways and credit card processors are not connected.
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="text-slate-400 block mb-1">Shipping Address (Mock Flow):</span>
                    <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800 text-slate-300">
                      742 Evergreen Terrace, Sector 4, Bangalore, KA 560001
                    </div>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-1">Order Summary:</span>
                    <div className="p-2.5 rounded-lg bg-navy-950 border border-navy-800 text-slate-300 flex justify-between">
                      <span>{cartItems.length} Unique artisanal item(s)</span>
                      <strong className="text-white">${subtotal}.00</strong>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-navy-800 flex justify-end gap-3">
                  <Button variant="secondary" size="sm" onClick={() => setShowCheckoutModal(false)}>
                    Close Prototype
                  </Button>
                  <Button variant="violet" size="sm" onClick={() => setShowCheckoutModal(false)}>
                    Simulate Completed Order
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Problem Statement & Objectives */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-navy-700/80 space-y-4">
              <h2 className="text-xl font-bold text-white">Problem Statement</h2>
              <ul className="space-y-3">
                {project.problemStatement.map((prob, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 flex-shrink-0 mt-2" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card rounded-2xl p-6 sm:p-8 border border-navy-700/80 space-y-4">
              <h2 className="text-xl font-bold text-white">Objectives</h2>
              <ul className="space-y-3">
                {project.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-1" />
                    <span>{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Features Implementation Matrix */}
          <div className="mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Feature Implementation Matrix</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  className="bg-navy-900/80 rounded-2xl p-5 border border-navy-800 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs text-slate-400">0{idx + 1}</span>
                      <Badge
                        variant={
                          feat.status === 'implemented'
                            ? 'emerald'
                            : feat.status === 'prototype'
                            ? 'electric'
                            : 'violet'
                        }
                        size="sm"
                      >
                        {feat.status === 'implemented' ? 'Working Module' : 'Prototype Interface'}
                      </Badge>
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">{feat.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Technology Stack */}
          <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-navy-700/80 mb-14">
            <h2 className="text-2xl font-bold text-white mb-6">Verified Technology Stack</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {project.techStack.map((tech, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-navy-900/90 border border-navy-800 flex flex-col justify-between"
                >
                  <span className="font-mono text-sm font-bold text-white">{tech.name}</span>
                  <span className="text-xs text-slate-400 mt-1">{tech.role}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Challenges & Technical Learnings */}
          <div className="space-y-6 mb-16">
            <h2 className="text-2xl font-bold text-white">Challenges & Technical Learnings</h2>
            <div className="grid grid-cols-1 gap-5">
              {project.challengesAndLearnings.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-card rounded-2xl p-6 border border-navy-700/80 space-y-3"
                >
                  <h3 className="text-lg font-bold text-white">{item.challenge}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="bg-navy-950/80 p-3.5 rounded-xl border border-navy-850">
                      <span className="text-electric-400 font-bold block mb-1">
                        Architectural Solution:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{item.solution}</p>
                    </div>
                    <div className="bg-navy-950/80 p-3.5 rounded-xl border border-navy-850">
                      <span className="text-violetAccent-400 font-bold block mb-1">
                        Core Takeaway:
                      </span>
                      <p className="text-slate-300 leading-relaxed">{item.takeaway}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Call to Action for Similar Projects */}
          <div className="glass-panel rounded-3xl p-8 sm:p-12 text-center border border-violetAccent-500/30 relative overflow-hidden">
            <div
              className="absolute inset-0 bg-gradient-to-r from-violetAccent-600/10 via-transparent to-electric-600/10 pointer-events-none"
              aria-hidden="true"
            />
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
              Need an Elegant E-commerce or Showcase Website?
            </h2>
            <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto mb-6">
              {project.ctaText}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/#contact">
                <Button
                  variant="violet"
                  size="lg"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Discuss Your Project
                </Button>
              </Link>
              <Link to="/projects/medconnect">
                <Button variant="secondary" size="lg">
                  View MedConnect Case Study
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
