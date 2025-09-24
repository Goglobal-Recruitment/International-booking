import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart, Star } from 'lucide-react';

interface HomesGuestsLoveProps {
  activeTab: string;
}

export function HomesGuestsLove({ activeTab }: HomesGuestsLoveProps) {
  if (activeTab !== 'stays') return null;

  const homes = [
    {
      id: 1,
      name: 'Olivia House',
      location: 'Apartment in Cape Town',
      image: 'https://images.unsplash.com/photo-1676213185722-252caa34d1ae?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBpbnRlcmlvciUyMGNhcGUlMjB0b3dufGVufDF8fHx8MTc1ODM1ODgwMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.0,
      reviews: 128,
      price: 'ZAR 1,451',
      priceUnit: 'night',
      genius: true
    },
    {
      id: 2,
      name: 'Parktown North Penthouse',
      location: 'Apartment in Johannesburg',
      image: 'https://images.unsplash.com/photo-1686766159771-57c8ad4bddde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW50aG91c2UlMjBhcGFydG1lbnQlMjB2aWV3fGVufDF8fHx8MTc1ODM1ODgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 8.9,
      reviews: 243,
      price: 'ZAR 1,820',
      priceUnit: 'night',
      genius: false
    },
    {
      id: 3,
      name: 'Camps Bay Apartment',
      location: 'Entire apartment in Cape Town',
      image: 'https://images.unsplash.com/photo-1737253333511-0f27fc9508a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwYXBhcnRtZW50JTIwYmVkcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NTgzNTg4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.5,
      reviews: 87,
      price: 'ZAR 3,200',
      priceUnit: 'night',
      genius: true
    },
    {
      id: 4,
      name: 'Sea Point Apartment',
      location: 'Apartment in Cape Town',
      image: 'https://images.unsplash.com/photo-1590490359854-dfba19688d70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwYmVkcm9vbSUyMHN1aXRlfGVufDF8fHx8MTc1ODM1ODgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 8.7,
      reviews: 156,
      price: 'ZAR 1,890',
      priceUnit: 'night',
      genius: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Homes guests love</h2>
          </div>
          <a href="#" className="text-sm text-[#0071c2] hover:underline font-medium">Show all properties</a>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {homes.map((home) => (
            <div key={home.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer group border border-gray-200">
              <div className="relative">
                <ImageWithFallback
                  src={home.image}
                  alt={home.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  propertyType="apartment"
                  aspectRatio="landscape"
                />
                
                {/* Heart button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                
                {/* Genius badge */}
                {home.genius && (
                  <div className="absolute top-3 left-3">
                    <div className="bg-[#0071c2] text-white px-2 py-1 rounded text-xs font-bold flex items-center">
                      <Star className="w-3 h-3 mr-1 fill-current" />
                      Genius
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="font-semibold text-sm text-gray-900 mb-1 overflow-hidden" style={{
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical' as const,
                  lineHeight: '1.4em',
                  maxHeight: '2.8em'
                }}>
                  {home.name}
                </h3>
                <p className="text-xs text-gray-600 mb-3 truncate">{home.location}</p>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <div className="bg-[#003580] text-white text-xs px-1.5 py-0.5 rounded font-bold">
                      {home.rating}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {home.rating >= 9 ? 'Superb' : home.rating >= 8.5 ? 'Fabulous' : home.rating >= 8 ? 'Very good' : 'Good'}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">• {home.reviews} reviews</span>
                </div>
                
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    {home.genius && (
                      <div className="text-xs text-green-600 font-medium mb-1">
                        10% Genius discount
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">Starting from</div>
                    <div className="font-bold text-sm text-gray-900">{home.price}</div>
                    <div className="text-xs text-gray-500">per {home.priceUnit}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Show more button */}
        <div className="text-center mt-8">
          <button className="bg-[#0071c2] hover:bg-[#003580] text-white font-medium px-8 py-3 rounded transition-colors">
            Show more properties
          </button>
        </div>
      </div>
    </div>
  );
}