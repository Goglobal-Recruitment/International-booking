import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Star } from 'lucide-react';
import { Badge } from './ui/badge';

interface WeekendDealsProps {
  activeTab: string;
}

export function WeekendDeals({ activeTab }: WeekendDealsProps) {
  if (activeTab !== 'stays') return null;

  const deals = [
    {
      id: 1,
      name: 'Blue Rock Hotel - Sea Point',
      location: 'Sea Point, Cape Town',
      image: 'https://images.unsplash.com/photo-1726381552645-c4e5645366f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMFNvdXRoJTIwQWZyaWNhJTIwY2FwZSUyMHRvd258ZW58MXx8fHwxNzU4MzU4NzYwfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 8.5,
      reviews: 1254,
      originalPrice: 'ZAR 3,758',
      currentPrice: 'ZAR 2,998',
      savings: 'ZAR 760',
      badge: 'Limited time deal'
    },
    {
      id: 2,
      name: 'ONOMO Hotel Energy Guest House',
      location: 'Sandton, Johannesburg',
      image: 'https://images.unsplash.com/photo-1718104717529-0059a1a860fd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwZ3Vlc3QlMjBob3VzZXxlbnwxfHx8fDE3NTgzNTg3NjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 8.2,
      reviews: 897,
      originalPrice: 'ZAR 2,456',
      currentPrice: 'ZAR 1,890',
      savings: 'ZAR 566',
      badge: 'Deal'
    },
    {
      id: 3,
      name: 'The Fish Cabin Lodge',
      location: 'Hermanus, Western Cape',
      image: 'https://images.unsplash.com/photo-1715985160053-d339e8b6eb94?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBhaXJibmJ8ZW58MXx8fHwxNzU4MzU4NzY4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.1,
      reviews: 432,
      originalPrice: 'ZAR 2,855',
      currentPrice: 'ZAR 2,456',
      savings: 'ZAR 399',
      badge: 'Genius deal'
    },
    {
      id: 4,
      name: 'Oceanside Hotel Camps Bay',
      location: 'Camps Bay, Cape Town',
      image: 'https://images.unsplash.com/photo-1645990097585-947bbb879c12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiZWFjaGZyb250JTIwaG90ZWwlMjByZXNvcnR8ZW58MXx8fHwxNzU4MzU4NzczfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 8.8,
      reviews: 756,
      originalPrice: 'ZAR 4,567',
      currentPrice: 'ZAR 3,897',
      savings: 'ZAR 670',
      badge: 'Limited time deal'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Deals for the weekend</h2>
        <p className="text-gray-600">Save on stays for 20 Dec – 22 Dec</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {deals.map((deal) => (
          <div key={deal.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="relative">
              <ImageWithFallback
                src={deal.image}
                alt={deal.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
              {deal.badge && (
                <Badge className="absolute top-3 left-3 bg-red-600 text-white text-xs px-2 py-1">
                  {deal.badge}
                </Badge>
              )}
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                {deal.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{deal.location}</p>
              
              <div className="flex items-center gap-2 mb-2">
                <div className="flex items-center gap-1">
                  <div className="bg-[#003580] text-white text-xs px-1.5 py-0.5 rounded">
                    {deal.rating}
                  </div>
                  <span className="text-xs text-gray-600">Excellent</span>
                </div>
                <span className="text-xs text-gray-500">• {deal.reviews} reviews</span>
              </div>
              
              <div className="flex flex-col items-end">
                <div className="text-xs text-gray-500 line-through">{deal.originalPrice}</div>
                <div className="font-bold text-sm text-gray-900">{deal.currentPrice}</div>
                <div className="text-xs text-green-600">You save {deal.savings}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}