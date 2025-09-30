import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Tag, Star, MapPin, Percent, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Deal {
  id: number;
  title: string;
  description: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  location: string;
  rating: number;
  dealType: 'flash' | 'early-bird' | 'last-minute' | 'member';
  expiresIn: string;
  featured: boolean;
}

interface DealsOffersProps {
  onDealSelect: (deal: Deal) => void;
}

export function DealsOffers({ onDealSelect }: DealsOffersProps) {
  const deals: Deal[] = [
    {
      id: 1,
      title: 'Luxury Beach Resort & Spa',
      description: 'All-inclusive beachfront resort with spa treatments',
      image: 'https://images.unsplash.com/photo-1661777997156-ccac1c9876e3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGRlYWxzJTIwc3BlY2lhbCUyMG9mZmVyc3xlbnwxfHx8fDE3NTgzMDA2OTN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      originalPrice: 450,
      discountedPrice: 299,
      discountPercentage: 34,
      location: 'Maldives',
      rating: 4.8,
      dealType: 'flash',
      expiresIn: '2 hours',
      featured: true
    },
    {
      id: 2,
      title: 'City Center Business Hotel',
      description: 'Modern hotel in the heart of downtown',
      image: 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBjaXR5JTIwaG90ZWx8ZW58MXx8fHwxNzU4Mjk5OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      originalPrice: 250,
      discountedPrice: 179,
      discountPercentage: 28,
      location: 'New York, USA',
      rating: 4.5,
      dealType: 'early-bird',
      expiresIn: '3 days',
      featured: false
    },
    {
      id: 3,
      title: 'Mountain Lodge Retreat',
      description: 'Cozy mountain lodge with stunning views',
      image: 'https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJlc29ydHxlbnwxfHx8fDE3NTgyNjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      originalPrice: 320,
      discountedPrice: 240,
      discountPercentage: 25,
      location: 'Swiss Alps',
      rating: 4.7,
      dealType: 'last-minute',
      expiresIn: '1 day',
      featured: false
    },
    {
      id: 4,
      title: 'Historic Palace Hotel',
      description: 'Elegant historic palace converted to luxury hotel',
      image: 'https://images.unsplash.com/photo-1582204545593-1356b96cab4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwdHJhdmVsJTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzU4MzAwNTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      originalPrice: 380,
      discountedPrice: 285,
      discountPercentage: 25,
      location: 'Rome, Italy',
      rating: 4.6,
      dealType: 'member',
      expiresIn: '5 days',
      featured: true
    },
    {
      id: 5,
      title: 'Tropical Island Resort',
      description: 'Private island resort with water villas',
      image: 'https://images.unsplash.com/photo-1568299485300-2dff9db482f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc1ODMwMDUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      originalPrice: 680,
      discountedPrice: 510,
      discountPercentage: 25,
      location: 'Bora Bora',
      rating: 4.9,
      dealType: 'early-bird',
      expiresIn: '1 week',
      featured: false
    },
    {
      id: 6,
      title: 'Urban Boutique Hotel',
      description: 'Stylish boutique hotel in trendy neighborhood',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbG9iYnl8ZW58MXx8fHwxNzU4MzAwNTI2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      originalPrice: 200,
      discountedPrice: 150,
      discountPercentage: 25,
      location: 'Berlin, Germany',
      rating: 4.4,
      dealType: 'member',
      expiresIn: '4 days',
      featured: false
    }
  ];

  const featuredDeals = deals.filter(deal => deal.featured);
  const regularDeals = deals.filter(deal => !deal.featured);

  const getDealTypeInfo = (type: Deal['dealType']) => {
    switch (type) {
      case 'flash':
        return { label: 'Flash Sale', color: 'bg-red-600', icon: Clock };
      case 'early-bird':
        return { label: 'Early Bird', color: 'bg-green-600', icon: Tag };
      case 'last-minute':
        return { label: 'Last Minute', color: 'bg-orange-600', icon: Clock };
      case 'member':
        return { label: 'Member Deal', color: 'bg-purple-600', icon: Star };
      default:
        return { label: 'Special Offer', color: 'bg-blue-600', icon: Percent };
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Deals & Offers</h2>
          <p className="text-gray-600">Promotions, deals, and special offers for you</p>
        </div>

        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <div className="mb-12">
            <h3 className="text-xl font-bold mb-6 text-gray-900">Featured deals</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {featuredDeals.map((deal) => {
                const dealInfo = getDealTypeInfo(deal.dealType);
                const Icon = dealInfo.icon;
                
                return (
                  <Card key={deal.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer bg-white border-0 shadow-lg">
                    <div className="relative">
                      <ImageWithFallback
                        src={deal.image}
                        alt={deal.title}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        propertyType="hotel"
                        aspectRatio="landscape"
                      />
                      
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Top badges */}
                      <div className="absolute top-4 left-4 flex space-x-2">
                        <Badge className={`${dealInfo.color} text-white text-sm font-medium`}>
                          <Icon className="w-4 h-4 mr-1" />
                          {dealInfo.label}
                        </Badge>
                        <Badge className="bg-red-600 text-white text-sm font-bold">
                          -{deal.discountPercentage}%
                        </Badge>
                      </div>
                      
                      {/* Timer */}
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-white/95 text-gray-900 text-sm font-medium">
                          <Clock className="w-4 h-4 mr-1" />
                          {deal.expiresIn}
                        </Badge>
                      </div>
                      
                      {/* Heart icon */}
                      <button className="absolute top-4 right-20 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                        <Heart className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      {/* Bottom content overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-bold text-xl mb-2 group-hover:text-[#ffd700] transition-colors">
                          {deal.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-white/90 text-sm">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{deal.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 fill-current text-yellow-400" />
                            <span>{deal.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4 text-sm overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        lineHeight: '1.4em',
                        maxHeight: '2.8em'
                      }}>{deal.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline space-x-2">
                            <span className="text-2xl font-bold text-[#0071c2]">ZAR {deal.discountedPrice}</span>
                            <span className="text-lg text-gray-500 line-through">ZAR {deal.originalPrice}</span>
                          </div>
                          <span className="text-sm text-gray-600">per night</span>
                        </div>
                        
                        <Button 
                          onClick={() => onDealSelect(deal)}
                          className="bg-[#0071c2] hover:bg-[#003580] text-white font-medium px-6 py-2"
                        >
                          See availability
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Regular Deals */}
        <div>
          <h3 className="text-xl font-bold mb-6 text-gray-900">More great deals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {regularDeals.map((deal) => {
              const dealInfo = getDealTypeInfo(deal.dealType);
              const Icon = dealInfo.icon;
              
              return (
                <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 group cursor-pointer bg-white border border-gray-200">
                  <div className="relative">
                    <ImageWithFallback
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      propertyType="hotel"
                      aspectRatio="landscape"
                    />
                    
                    {/* Top badges */}
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <Badge className={`${dealInfo.color} text-white text-xs font-medium`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {dealInfo.label}
                      </Badge>
                      <Badge className="bg-red-600 text-white text-xs font-bold">
                        -{deal.discountPercentage}%
                      </Badge>
                    </div>
                    
                    {/* Timer */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-white/95 text-gray-900 text-xs font-medium">
                        <Clock className="w-3 h-3 mr-1" />
                        {deal.expiresIn}
                      </Badge>
                    </div>
                    
                    {/* Heart icon */}
                    <button className="absolute top-3 right-16 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-semibold text-sm text-gray-900 mb-1 overflow-hidden group-hover:text-[#0071c2] transition-colors" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        lineHeight: '1.4em',
                        maxHeight: '2.8em'
                      }}>
                        {deal.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-xs text-gray-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">{deal.location}</span>
                        <div className="flex items-center space-x-1">
                          <div className="bg-[#003580] text-white text-xs px-1 py-0.5 rounded font-bold">
                            {deal.rating}
                          </div>
                          <span className="text-xs">
                            {deal.rating >= 4.5 ? 'Superb' : 'Very good'}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-xs overflow-hidden" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical' as const,
                        lineHeight: '1.4em',
                        maxHeight: '2.8em'
                      }}>{deal.description}</p>
                    </div>
                    
                    <div className="flex items-end justify-between">
                      <div>
                        <div className="flex items-baseline space-x-1">
                          <span className="text-lg font-bold text-[#0071c2]">ZAR {deal.discountedPrice}</span>
                          <span className="text-sm text-gray-500 line-through">ZAR {deal.originalPrice}</span>
                        </div>
                        <span className="text-xs text-gray-600">per night</span>
                      </div>
                      
                      <Button 
                        onClick={() => onDealSelect(deal)}
                        size="sm"
                        className="bg-[#0071c2] hover:bg-[#003580] text-white font-medium text-xs px-3 py-1"
                      >
                        Book now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12 bg-gradient-to-r from-[#0071c2] to-[#003580] rounded-lg p-8 text-white">
          <h3 className="text-2xl font-bold mb-2">Don't miss out on these amazing deals!</h3>
          <p className="mb-4 text-blue-100">Sign up for our newsletter to get exclusive offers and early access to flash sales.</p>
          <Button className="bg-white text-[#0071c2] hover:bg-gray-100 font-medium px-8 py-3">
            Subscribe now
          </Button>
        </div>
      </div>
    </div>
  );
}