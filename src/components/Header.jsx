import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import AuthButton from './AuthButton';
import { useFavorites } from '../contexts/FavoritesContext';

const { FiMenu, FiX, FiHome, FiSearch, FiMap, FiPlus, FiInfo, FiMail, FiHeart, FiTrendingUp } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { favoritesCount } = useFavorites();

  const navigation = [
    { name: 'ホーム', href: '/', icon: FiHome },
    { name: '物件検索', href: '/search', icon: FiSearch },
    { name: '地図検索', href: '/map-search', icon: FiMap },
    { name: '物件掲載', href: '/list-property', icon: FiPlus },
    { name: 'お気に入り', href: '/favorites', icon: FiHeart, badge: favoritesCount },
    { name: '会社概要', href: '/about', icon: FiInfo },
    { name: 'お問合せ', href: '/contact', icon: FiMail },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (href) => {
    setIsMenuOpen(false);
    navigate(href);
  };

  return (
    <>
      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group flex-shrink-0">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                  <SafeIcon icon={FiHome} className="text-white text-lg" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-orange-400 rounded-full animate-pulse"></div>
              </div>
              <div className="hidden sm:block min-w-0">
                <h1 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent whitespace-nowrap">
                  店舗物件サイト
                </h1>
                <p className="text-xs text-gray-500 font-medium whitespace-nowrap">Store Property Search</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1 flex-1 justify-center max-w-4xl">
              {navigation.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative flex items-center space-x-2 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group whitespace-nowrap min-w-0 ${
                    isActive(item.href)
                      ? 'text-emerald-600 bg-emerald-50 shadow-sm'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                >
                  <SafeIcon
                    icon={item.icon}
                    className={`text-sm transition-transform group-hover:scale-110 flex-shrink-0 ${
                      isActive(item.href) ? 'text-emerald-600' : ''
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                  {/* Badge */}
                  {item.badge > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse flex-shrink-0">
                      {item.badge > 99 ? '99+' : item.badge}
                    </div>
                  )}
                  {/* Active Indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-emerald-100 rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Compact Navigation for Large Screens */}
            <nav className="hidden lg:flex xl:hidden items-center space-x-1 flex-1 justify-center">
              {navigation.slice(0, 5).map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavigation(item.href)}
                  className={`relative flex items-center justify-center p-2.5 rounded-xl text-sm font-medium transition-all duration-200 group min-w-[40px] ${
                    isActive(item.href)
                      ? 'text-emerald-600 bg-emerald-50 shadow-sm'
                      : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                  }`}
                  title={item.name}
                >
                  <SafeIcon
                    icon={item.icon}
                    className={`text-lg transition-transform group-hover:scale-110 ${
                      isActive(item.href) ? 'text-emerald-600' : ''
                    }`}
                  />
                  {/* Badge */}
                  {item.badge > 0 && (
                    <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold animate-pulse">
                      {item.badge > 9 ? '9+' : item.badge}
                    </div>
                  )}
                  {/* Active Indicator */}
                  {isActive(item.href) && (
                    <motion.div
                      layoutId="activeTabCompact"
                      className="absolute inset-0 bg-emerald-100 rounded-xl -z-10"
                      initial={false}
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </button>
              ))}
            </nav>

            {/* Right Side */}
            <div className="flex items-center space-x-4 flex-shrink-0">
              {/* Auth Button */}
              <AuthButton />

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-gray-600 hover:text-emerald-600 hover:bg-gray-50 transition-all duration-200"
              >
                <motion.div
                  animate={{ rotate: isMenuOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="text-xl" />
                </motion.div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-md"
            >
              <nav className="px-4 py-4 space-y-2 max-h-96 overflow-y-auto">
                {navigation.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNavigation(item.href)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? 'text-emerald-600 bg-emerald-50 shadow-sm'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <SafeIcon icon={item.icon} className="text-lg flex-shrink-0" />
                      <span className="truncate">{item.name}</span>
                    </div>
                    {item.badge > 0 && (
                      <div className="bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0">
                        {item.badge > 99 ? '99+' : item.badge}
                      </div>
                    )}
                  </motion.button>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Secondary Navigation Bar */}
      <div className="hidden md:block bg-gradient-to-r from-emerald-50 to-green-50 border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center space-x-6 text-sm">
              <Link
                to="/restaurant-news"
                className="flex items-center space-x-2 text-emerald-700 hover:text-emerald-800 font-medium group whitespace-nowrap"
              >
                <SafeIcon icon={FiTrendingUp} className="text-xs group-hover:scale-110 transition-transform flex-shrink-0" />
                <span>飲食店ニュース</span>
              </Link>
              <Link
                to="/opening-support"
                className="text-gray-600 hover:text-emerald-700 font-medium whitespace-nowrap"
              >
                開業サポート
              </Link>
              <Link
                to="/business-links"
                className="text-gray-600 hover:text-emerald-700 font-medium whitespace-nowrap"
              >
                業者リンク
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Header;