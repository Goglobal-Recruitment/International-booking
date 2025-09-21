import { ImageWithFallback } from './figma/ImageWithFallback';
import { Heart } from 'lucide-react';

interface UniquePropertiesProps {
  activeTab: string;
}

export function UniqueProperties({ activeTab }: UniquePropertiesProps) {
  if (activeTab !== 'stays') return null;

  const properties = [
    {
      id: 1,
      name: 'Four Rosmead Boutique Guesthouse',
      location: 'Oranjezicht, Cape Town',
      image: 'https://images.unsplash.com/photo-1561027509-ec65ce5574f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBob3RlbCUyMFNvdXRoJTIwQWZyaWNhfGVufDF8fHx8MTc1ODM1ODY3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.5,
      reviews: 89,
      price: 'ZAR 4,234'
    },
    {
      id: 2,
      name: 'The Beach Villa Boutique Hotel',
      location: 'Gordon\'s Bay, Western Cape',
      image: 'https://images.unsplash.com/photo-1750750574633-eb1ccc0dcb0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxib3V0aXF1ZSUyMGhvdGVsJTIwbW9kZXJuJTIwaW50ZXJpb3IlMjBTb3V0aCUyMEFmcmljYXxlbnwxfHx8fDE3NTgzNTg2NzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.2,
      reviews: 156,
      price: 'ZAR 5,678'
    },
    {
      id: 3,
      name: 'Onkoshi Camp Etosha Safari Lodge',
      location: 'Etosha National Park, Namibia',
      image: 'https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMGx1eHVyeSUyMGhvbWUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTgyNTU0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.7,
      reviews: 243,
      price: 'ZAR 8,920'
    },
    {
      id: 4,
      name: 'Naries Exclusive Lodge - Houwhoek',
      location: 'Houwhoek, Western Cape',
      image: 'https://images.unsplash.com/photo-1695173849152-c506198aaf90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBwb29sJTIwdmFjYXRpb258ZW58MXx8fHwxNzU4Mjc4MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      rating: 9.4,
      reviews: 67,
      price: 'ZAR 6,543'
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Stay at our top unique properties</h2>
        <p className="text-gray-600">From castles and villas to boats and igloos, we have it all</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
            <div className="relative">
              <ImageWithFallback
                src={property.image}
                alt={property.name}
                className="w-full h-48 object-cover"
              />
              <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                <Heart className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            
            <div className="p-4">
              <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2">
                {property.name}
              </h3>
              <p className="text-xs text-gray-600 mb-2">{property.location}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <div className="bg-[#003580] text-white text-xs px-1.5 py-0.5 rounded">
                    {property.rating}
                  </div>
                  <span className="text-xs text-gray-600">Exceptional</span>
                </div>
                <span className="text-xs text-gray-500">• {property.reviews} reviews</span>
              </div>
              
              <div className="flex items-end justify-between">
                <div></div>
                <div className="text-right">
                  <div className="text-xs text-gray-500">Starting from</div>
                  <div className="font-bold text-sm text-gray-900">{property.price}</div>
                  <div className="text-xs text-gray-500">per night</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}