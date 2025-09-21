import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Tag, Star, MapPin, Percent } from 'lucide-react';
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
      description: 'Stylish boutique hotel with rooftop terrace',
      image: 'https://images.unsplash.com/photo-1652286957792-3dc0e68fae83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NTgzMDA1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      originalPrice: 280,
      discountedPrice: 210,
      discountPercentage: 25,
      location: 'London, UK',
      rating: 4.4,
      dealType: 'flash',
      expiresIn: '6 hours',
      featured: false
    }
  ];

  const getDealTypeInfo = (dealType: string) => {
    switch (dealType) {
      case 'flash':
        return { label: 'Flash Sale', color: 'bg-red-500', icon: Clock };
      case 'early-bird':
        return { label: 'Early Bird', color: 'bg-green-500', icon: Tag };
      case 'last-minute':
        return { label: 'Last Minute', color: 'bg-orange-500', icon: Clock };
      case 'member':
        return { label: 'Member Deal', color: 'bg-purple-500', icon: Star };
      default:
        return { label: 'Special Deal', color: 'bg-blue-500', icon: Percent };
    }
  };

  const featuredDeals = deals.filter(deal => deal.featured);
  const regularDeals = deals.filter(deal => !deal.featured);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl mb-4">Special deals & offers</h2>
          <p className="text-gray-600 text-lg">Limited time offers you don't want to miss</p>
        </div>

        {/* Featured Deals */}
        {featuredDeals.length > 0 && (
          <div>
            <h3 className="text-xl mb-6">🔥 Featured deals</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {featuredDeals.map((deal) => {
                const dealInfo = getDealTypeInfo(deal.dealType);
                const Icon = dealInfo.icon;
                
                return (
                  <Card key={deal.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-yellow-200">
                    <div className="relative">
                      <div className="relative h-64">
                        <ImageWithFallback
                          src={deal.image}
                          alt={deal.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <div className="absolute top-4 left-4 flex space-x-2">
                          <Badge className={`${dealInfo.color} text-white`}>
                            <Icon className="w-3 h-3 mr-1" />
                            {dealInfo.label}
                          </Badge>
                          <Badge className="bg-red-600 text-white">
                            -{deal.discountPercentage}%
                          </Badge>
                        </div>
                        <div className="absolute top-4 right-4">
                          <Badge variant="secondary" className="bg-white/90 text-gray-900">
                            <Clock className="w-3 h-3 mr-1" />
                            {deal.expiresIn} left
                          </Badge>
                        </div>
                        <div className="absolute bottom-4 left-4 text-white">
                          <h3 className="text-xl font-bold mb-1">{deal.title}</h3>
                          <div className="flex items-center space-x-2 text-sm">
                            <MapPin className="w-4 h-4" />
                            <span>{deal.location}</span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span>{deal.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <p className="text-gray-600 mb-4">{deal.description}</p>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-2xl font-bold text-green-600">${deal.discountedPrice}</span>
                            <span className="text-lg text-gray-500 line-through">${deal.originalPrice}</span>
                          </div>
                          <span className="text-sm text-gray-600">per night</span>
                        </div>
                        
                        <Button 
                          onClick={() => onDealSelect(deal)}
                          className="bg-blue-600 hover:bg-blue-700"
                          size="lg"
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
        )}

        {/* Regular Deals */}
        <div>
          <h3 className="text-xl mb-6">More great deals</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularDeals.map((deal) => {
              const dealInfo = getDealTypeInfo(deal.dealType);
              const Icon = dealInfo.icon;
              
              return (
                <Card key={deal.id} className="overflow-hidden hover:shadow-lg transition-shadow group cursor-pointer">
                  <div className="relative h-48">
                    <ImageWithFallback
                      src={deal.image}
                      alt={deal.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex space-x-2">
                      <Badge className={`${dealInfo.color} text-white text-xs`}>
                        <Icon className="w-3 h-3 mr-1" />
                        {dealInfo.label}
                      </Badge>
                      <Badge className="bg-red-600 text-white text-xs">
                        -{deal.discountPercentage}%
                      </Badge>
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge variant="secondary" className="bg-white/90 text-gray-900 text-xs">
                        <Clock className="w-3 h-3 mr-1" />
                        {deal.expiresIn}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardContent className="p-4">
                    <div className="mb-3">
                      <h3 className="font-medium text-lg mb-1">{deal.title}</h3>
                      <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                        <MapPin className="w-3 h-3" />
                        <span>{deal.location}</span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          <span>{deal.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm">{deal.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xl font-bold text-green-600">${deal.discountedPrice}</span>
                          <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
                        </div>
                        <span className="text-xs text-gray-600">per night</span>
                      </div>
                      
                      <Button 
                        onClick={() => onDealSelect(deal)}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Book
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Don't miss out on these amazing deals!</h3>
            <p className="text-lg mb-6 opacity-90">
              Sign up for our newsletter to get notified about exclusive offers and flash sales
            </p>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Subscribe to deals
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}