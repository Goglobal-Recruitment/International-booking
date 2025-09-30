import { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback } from './ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Plane, Car, Hotel, Settings, LogOut, Menu, MapPin, Globe, HelpCircle, Star, ChevronDown } from 'lucide-react';
import { getSupabaseClient } from '../utils/supabase/client';

interface HeaderProps {
  user: any;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onPageChange: (page: string) => void;
  currentPage: string;
  activeTab?: string;
  onTabChange?: (tab: string) => void;
}

export function Header({ user, onLoginClick, onRegisterClick, onPageChange, currentPage, activeTab = 'stays', onTabChange }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState('USD');

  const currencies = [
    { code: 'USD', symbol: '$', name: 'US Dollar' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'GBP', symbol: '£', name: 'British Pound' },
    { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
    { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
    { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
    { code: 'CHF', symbol: 'CHF', name: 'Swiss Franc' },
    { code: 'CNY', symbol: '¥', name: 'Chinese Yuan' },
    { code: 'SEK', symbol: 'kr', name: 'Swedish Krona' },
    { code: 'NZD', symbol: 'NZ$', name: 'New Zealand Dollar' },
    { code: 'ZAR', symbol: 'R', name: 'South African Rand' },
    { code: 'MXN', symbol: '$', name: 'Mexican Peso' },
    { code: 'SGD', symbol: 'S$', name: 'Singapore Dollar' },
    { code: 'HKD', symbol: 'HK$', name: 'Hong Kong Dollar' },
    { code: 'NOK', symbol: 'kr', name: 'Norwegian Krone' },
  ];

  const handleSignOut = async () => {
    const supabase = getSupabaseClient();
    await supabase.auth.signOut();
  };

  const navItems = [
    { id: 'stays', label: 'Stays', icon: Hotel },
    { id: 'flights', label: 'Flights', icon: Plane },
    { id: 'cars', label: 'Car rental', icon: Car },
    { id: 'attractions', label: 'Attractions', icon: Star },
    { id: 'taxis', label: 'Airport taxis', icon: Car },
  ];

  return (
    <header className="bg-[#003580] text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top header row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="cursor-pointer"
            onClick={() => onPageChange('home')}
          >
            <span className="text-xl font-bold text-white">Booking.com</span>
          </div>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex items-center space-x-1 text-sm">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-white hover:bg-blue-700 text-sm flex items-center space-x-1">
                    <Globe className="w-4 h-4" />
                    <span className="bg-[#0071c2] px-2 py-1 rounded text-xs">{selectedCurrency}</span>
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 max-h-64 overflow-y-auto" align="end">
                  {currencies.map((currency) => (
                    <DropdownMenuItem 
                      key={currency.code}
                      onClick={() => setSelectedCurrency(currency.code)}
                      className={`flex justify-between ${selectedCurrency === currency.code ? 'bg-blue-50' : ''}`}
                    >
                      <span className="font-medium">{currency.code}</span>
                      <span className="text-sm text-gray-500">{currency.name}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <Button variant="ghost" size="sm" className="hidden lg:flex text-white hover:bg-blue-700 text-sm">
              <HelpCircle className="w-4 h-4 mr-1" />
            </Button>
            
            <Button variant="ghost" size="sm" className="hidden lg:flex text-white hover:bg-blue-700 text-sm">
              List your property
            </Button>

            {user ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-blue-700 text-sm"
                  onClick={() => onPageChange('bookings')}
                >
                  My Bookings
                </Button>
                {user.email === 'admin@bookingint.com' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-blue-700 text-sm"
                    onClick={() => onPageChange('admin')}
                  >
                    Admin Panel
                  </Button>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-700 text-white">
                          {user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuItem className="flex-col items-start">
                      <div className="font-medium">{user.user_metadata?.name || 'User'}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onPageChange('bookings')}>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>My Bookings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="text-[#003580] bg-white border-white hover:bg-gray-100 text-sm"
                  onClick={onRegisterClick}
                >
                  Register
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="bg-[#0071c2] hover:bg-blue-600 text-white text-sm"
                  onClick={onLoginClick}
                >
                  Sign in
                </Button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Navigation tabs */}
        <div className="border-t border-blue-700">
          <nav className="flex items-center -mb-px">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 min-w-fit whitespace-nowrap ${
                    isActive 
                      ? 'border-white text-white bg-[#0071c2] rounded-t-md' 
                      : 'border-transparent text-blue-200 hover:text-white hover:bg-blue-700 hover:border-blue-300'
                  }`}
                  onClick={() => {
                    onTabChange?.(item.id);
                    onPageChange('home');
                  }}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-800">
            <nav className="flex flex-col space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md hover:bg-blue-800 transition-colors text-left"
                    onClick={() => {
                      onPageChange('home');
                      setMobileMenuOpen(false);
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}