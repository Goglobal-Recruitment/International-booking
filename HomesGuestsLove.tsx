import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart } from 'lucide-react';

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
      priceUnit: 'night'
    },
    {
      id: 2,
      name: 'Parktown North Penthouse',
      location: 'Apartment in Johannesburg',
      image: 'https://images.unsplash.com/photo-1686766159771-57c8ad4bddde?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBwZW50aG91c2UlMjBhcGFydG1lbnQlMjB2aWV3fGVufDF8fHx8MTc1ODM1ODgwNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 8.9,
      reviews: 243,
      price: 'ZAR 1,820',
      priceUnit: 'night'
    },
    {
      id: 3,
      name: 'Camps Bay Apartment',
      location: 'Entire apartment in Cape Town',
      image: 'https://images.unsplash.com/photo-1737253333511-0f27fc9508a4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHlsaXNoJTIwYXBhcnRtZW50JTIwYmVkcm9vbSUyMG1vZGVybnxlbnwxfHx8fDE3NTgzNTg4MTJ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.5,
      reviews: 87,
      price: 'ZAR 3,200',
      priceUnit: 'night'
    },
    {
      id: 4,
      name: 'Sea Point Apartment',
      location: 'Apartment in Cape Town',
      image: 'https://images.unsplash.com/photo-1590490359854-dfba19688d70?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob21lJTIwYmVkcm9vbSUyMHN1aXRlfGVufDF8fHx8MTc1ODM1ODgxNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 8.7,
      reviews: 156,
      price: 'ZAR 1,890',
      priceUnit: 'night'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Homes guests love</h2>
        </div>
        <a href="#" className="text-sm text-[#0071c2] hover:underline">Show more</a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {homes.map((home) => (
          <div key={home.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="relative">
              <ImageWithFallback
                src={home.image}
                alt={home.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                {home.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{home.location}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <div className="bg-[#003580] text-white text-xs px-1.5 py-0.5 rounded">
                    {home.rating}
                  </div>
                  <span className="text-xs text-gray-600">Superb</span>
                </div>
                <span className="text-xs text-gray-500">• {home.reviews} reviews</span>
              </div>
              
              <div className="flex items-end justify-between">
                <div></div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Starting from</div>
                  <div className="font-bold text-sm text-gray-900">{home.price}</div>
                  <div className="text-xs text-gray-500">per {home.priceUnit}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}