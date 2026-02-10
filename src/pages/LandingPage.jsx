import React, { useState, useEffect } from 'react';
import { Menu, X, Car, Clock, MapPin, CreditCard, Shield, Zap, CheckCircle, Navigation, Facebook, Twitter, Instagram, Linkedin, Sparkles, Star, ChevronRight, ArrowRight, Play, Award, Users, TrendingUp, Check } from 'lucide-react';

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Real-Time Availability",
      description: "Live updates on parking spots with color-coded availability maps",
      color: "blue"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Smart Navigation",
      description: "Turn-by-turn directions straight to your reserved parking spot",
      color: "purple"
    },
    {
      icon: <Car className="w-6 h-6" />,
      title: "Premium Valet Service",
      description: "Professional valet parking at select locations for ultimate convenience",
      color: "indigo"
    },
    {
      icon: <CreditCard className="w-6 h-6" />,
      title: "Seamless Payments",
      description: "Secure, transparent pricing with multiple payment options",
      color: "green"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "24/7 Security",
      description: "CCTV monitored parking with round-the-clock surveillance",
      color: "red"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Booking",
      description: "Reserve your spot in seconds with instant confirmation",
      color: "yellow"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Find Your Spot",
      description: "Search for parking near your destination and view real-time availability",
      icon: <MapPin className="w-6 h-6" />
    },
    {
      number: "02",
      title: "Reserve Instantly",
      description: "Book your preferred spot with one tap and receive instant confirmation",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      number: "03",
      title: "Park Stress-Free",
      description: "Navigate to your guaranteed spot and park with complete peace of mind",
      icon: <Car className="w-6 h-6" />
    }
  ];

  const stats = [
    { value: "50K+", label: "Happy Users" },
    { value: "200+", label: "Parking Locations" },
    { value: "99.9%", label: "Uptime" },
    { value: "4.9★", label: "User Rating" }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Business Professional",
      content: "SmartParking has completely changed how I commute. No more circling for 20 minutes!",
      avatar: "SJ",
      rating: 5
    },
    {
      name: "Michael Chen",
      role: "Frequent Traveler",
      content: "The valet service at the airport is a game-changer. So convenient and reliable.",
      avatar: "MC",
      rating: 5
    },
    {
      name: "Emma Williams",
      role: "Daily Commuter",
      content: "Best parking app hands down. Real-time updates are incredibly accurate.",
      avatar: "EW",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 text-slate-900 overflow-x-hidden">
      
      {/* ============================================ */}
      {/* NAVBAR */}
      {/* ============================================ */}
      <nav 
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-white/80 backdrop-blur-xl shadow-lg shadow-slate-200/50 border-b border-slate-200/50' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl blur-md opacity-60 group-hover:opacity-80 transition-opacity" />
                <div className="relative w-10 h-10 sm:w-11 sm:h-11 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Car className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ParkEase
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {['Features', 'How It Works', 'Pricing'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase().replace(/\s/g, '-')}`} 
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                    scrolled 
                      ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100' 
                      : 'text-white hover:bg-white/10'
                  }`}
                >
                  {item}
                </a>
              ))}
              <a 
                href="/login" 
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  scrolled 
                    ? 'text-slate-700 hover:text-blue-600 hover:bg-slate-100' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                Login
              </a>
            </div>

            {/* CTA Button */}
            <div className="hidden md:flex items-center space-x-4">
              <a 
                href="/signup" 
                className="group relative px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className={`w-6 h-6 ${scrolled ? 'text-slate-900' : 'text-white'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${scrolled ? 'text-slate-900' : 'text-white'}`} />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200 bg-white/95 backdrop-blur-xl animate-slide-down">
              <div className="flex flex-col space-y-2">
                {['Features', 'How It Works', 'Pricing', 'Login'].map((item) => (
                  <a 
                    key={item}
                    href={item === 'Login' ? '/login' : `#${item.toLowerCase().replace(/\s/g, '-')}`}
                    className="px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-blue-600 rounded-xl font-medium transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </a>
                ))}
                <a 
                  href="/signup"
                  className="mx-4 mt-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-center shadow-lg"
                >
                  Get Started
                </a>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute top-40 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-white opacity-10" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6 sm:mb-8 animate-fade-in-up">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-white text-sm font-medium">#1 Smart Parking Solution</span>
              </div>

              {/* Heading */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200">
                Never Circle for
                <span className="block bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                  Parking Again
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg sm:text-xl text-blue-100 mb-8 sm:mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed animate-fade-in-up animation-delay-400">
                Find, reserve, and pay for parking in seconds. Smart parking technology that saves you time, money, and stress.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animation-delay-600">
                <a 
                  href="/signup" 
                  className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 mt-12 sm:mt-16 animate-fade-in-up animation-delay-800">
                {stats.slice(0, 3).map((stat, index) => (
                  <div key={index} className="text-center lg:text-left">
                    <div className="text-2xl sm:text-3xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-sm text-blue-200">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Content - Mockup/Illustration */}
            <div className="relative animate-fade-in-up animation-delay-1000">
              {/* Phone Mockup */}
              <div className="relative mx-auto max-w-sm lg:max-w-md">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-[3rem] blur-3xl opacity-40 animate-pulse" />
                
                {/* Phone Frame */}
                <div className="relative bg-slate-900 rounded-[3rem] p-4 shadow-2xl border-8 border-slate-800">
                  {/* Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-800 rounded-b-3xl" />
                  
                  {/* Screen */}
                  <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-[2rem] overflow-hidden aspect-[9/19] relative">
                    {/* App UI Mock */}
                    <div className="p-6">
                      {/* Search Bar */}
                      <div className="bg-white rounded-2xl shadow-lg p-4 mb-4">
                        <div className="flex items-center gap-3">
                          <MapPin className="w-5 h-5 text-blue-600" />
                          <div className="flex-1">
                            <div className="h-2 bg-slate-200 rounded w-3/4 mb-2" />
                            <div className="h-2 bg-slate-100 rounded w-1/2" />
                          </div>
                        </div>
                      </div>

                      {/* Map Preview */}
                      <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-64 mb-4 relative overflow-hidden">
                        <div className="absolute inset-0 bg-grid-pattern opacity-20" />
                        {/* Location Markers */}
                        {[...Array(6)].map((_, i) => (
                          <div 
                            key={i}
                            className="absolute w-8 h-8 bg-blue-600 rounded-full shadow-lg animate-pulse"
                            style={{
                              top: `${20 + Math.random() * 60}%`,
                              left: `${10 + Math.random() * 80}%`,
                              animationDelay: `${i * 0.2}s`
                            }}
                          >
                            <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping" />
                          </div>
                        ))}
                      </div>

                      {/* Parking Cards */}
                      <div className="space-y-3">
                        {[1, 2].map((i) => (
                          <div key={i} className="bg-white rounded-xl shadow-md p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="h-3 bg-slate-800 rounded w-32" />
                              <div className="h-3 bg-green-500 rounded w-16" />
                            </div>
                            <div className="h-2 bg-slate-200 rounded w-full mb-1" />
                            <div className="h-2 bg-slate-100 rounded w-2/3" />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -left-8 bg-white rounded-2xl shadow-2xl p-4 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl flex items-center justify-center">
                      <Check className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Booking Confirmed</div>
                      <div className="text-sm font-bold text-slate-900">Spot #A24</div>
                    </div>
                  </div>
                </div>

                <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-4 animate-float animation-delay-2000">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-xl flex items-center justify-center">
                      <Star className="w-6 h-6 text-white fill-white" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">User Rating</div>
                      <div className="text-sm font-bold text-slate-900">4.9★ Stars</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="rgb(248 250 252)" className="drop-shadow-2xl"/>
          </svg>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURES SECTION */}
      {/* ============================================ */}
      <section id="features" className="py-20 sm:py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full mb-4 font-medium text-sm">
              <Sparkles className="w-4 h-4" />
              Features
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              Everything You Need,
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                All in One Place
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Advanced features designed to make your parking experience seamless and stress-free
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-lg shadow-slate-200/50 hover:shadow-xl hover:shadow-slate-300/50 hover:-translate-y-2 transition-all duration-300 border border-slate-100"
              >
                {/* Icon */}
                <div className={`w-14 h-14 bg-gradient-to-br ${
                  feature.color === 'blue' ? 'from-blue-500 to-blue-600' :
                  feature.color === 'purple' ? 'from-purple-500 to-purple-600' :
                  feature.color === 'indigo' ? 'from-indigo-500 to-indigo-600' :
                  feature.color === 'green' ? 'from-green-500 to-green-600' :
                  feature.color === 'red' ? 'from-red-500 to-red-600' :
                  'from-yellow-500 to-yellow-600'
                } rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover Arrow */}
                <div className="mt-6 flex items-center text-blue-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION */}
      {/* ============================================ */}
      <section id="how-it-works" className="py-20 sm:py-32 bg-white relative overflow-hidden">
        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-50 to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full mb-4 font-medium text-sm">
              <Navigation className="w-4 h-4" />
              Simple Process
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto">
              Get parked in three simple steps. It's that easy.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connection Line (Desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-20 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-200 via-indigo-200 to-purple-200" />
                )}

                <div className="relative bg-white rounded-3xl p-8 border-2 border-slate-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 group">
                  {/* Number Badge */}
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-2xl flex items-center justify-center text-blue-600 mb-6 mt-8 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-16">
            <a 
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-bold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              Get Started Now
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white opacity-5" />
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Section Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-4 font-medium text-sm text-white">
              <Star className="w-4 h-4 text-yellow-300" />
              Testimonials
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Loved by Thousands
            </h2>
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto">
              See what our users have to say about their parking experience
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-8 hover:bg-white/15 transition-all duration-300"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white text-lg mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{testimonial.name}</div>
                    <div className="text-sm text-slate-300">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 p-8 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-sm text-slate-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="py-20 sm:py-32 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          {/* Icon */}
          <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-3xl flex items-center justify-center mx-auto mb-8">
            <Car className="w-10 h-10 text-white" />
          </div>

          {/* Content */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ready to Transform Your
            <span className="block">Parking Experience?</span>
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            Join thousands of happy drivers who never waste time looking for parking anymore.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/signup"
              className="group px-8 py-4 bg-white text-blue-600 rounded-2xl font-bold shadow-2xl hover:shadow-3xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a 
              href="#features"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 text-white rounded-2xl font-bold hover:bg-white/20 transition-all duration-300"
            >
              Learn More
            </a>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap items-center justify-center gap-8 mt-12 text-white/80 text-sm">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              No credit card required
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Cancel anytime
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              24/7 support
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FOOTER */}
      {/* ============================================ */}
      <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center">
                  <Car className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-white">ParkEase</span>
              </div>
              <p className="text-slate-400 mb-6 max-w-sm">
                Making parking effortless with smart technology. Find, reserve, and pay for parking in seconds.
              </p>
              <div className="flex gap-4">
                {[Facebook, Twitter, Instagram, Linkedin].map((Icon, index) => (
                  <a 
                    key={index}
                    href="#" 
                    className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:scale-110 transition-all duration-300 group"
                  >
                    <Icon className="w-5 h-5 text-slate-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-3">
                {['Features', 'Pricing', 'How It Works', 'For Business'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-3">
                {['About Us', 'Careers', 'Contact', 'Blog'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-3">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
                  <li key={item}>
                    <a href="#" className="hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © 2024 ParkEase. All rights reserved.
            </p>
            <p className="text-slate-500 text-sm">
              Made with ❤️ for stress-free parking
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================ */}
      {/* CUSTOM STYLES */}
      {/* ============================================ */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes slide-down {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-blob {
          animation: blob 7s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-800 {
          animation-delay: 0.8s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
          opacity: 0;
          animation-fill-mode: forwards;
        }
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, #e5e7eb 1px, transparent 1px),
            linear-gradient(to bottom, #e5e7eb 1px, transparent 1px);
          background-size: 40px 40px;
        }
        .bg-grid-white {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}