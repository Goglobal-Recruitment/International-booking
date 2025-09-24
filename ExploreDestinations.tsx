import { ImageWithFallback } from './figma/ImageWithFallback';

interface ExploreDestinationsProps {
  activeTab: string;
}

export function ExploreDestinations({ activeTab }: ExploreDestinationsProps) {
  const getRegionName = () => {
    switch (activeTab) {
      case 'flights':
        return 'Explore South Africa';
      case 'cars':
        return 'Popular car rental destinations';
      case 'attractions':
        return 'Top attractions in South Africa';
      case 'taxis':
        return 'Airport transfer destinations';
      default:
        return 'Explore South Africa';
    }
  };

  const destinations = [
    {
      name: 'Cape Town',
      properties: '2,543 properties',
      image: `https://images.unsplash.com/photo-1679128991434-0c2e03d61bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYXBlJTIwVG93biUyMFNvdXRoJTIwQWZyaWNhJTIwc2t5bGluZSUyMFRhYmxlJTIwTW91bnRhaW58ZW58MXx8fHwxNzU4MzU4NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Durban',
      properties: '1,298 properties',
      image: `https://images.unsplash.com/photo-1714573071461-7ba1c1d14982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdXJiYW4lMjBTb3V0aCUyMEFmcmljYSUyMGJlYWNoZnJvbnR8ZW58MXx8fHwxNzU4MzU4NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Johannesburg',
      properties: '1,892 properties',
      image: `https://images.unsplash.com/photo-1636706519609-988babca3dd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKb2hhbm5lc2J1cmclMjBTb3V0aCUyMEFmcmljYSUyMHNreWxpbmV8ZW58MXx8fHwxNzU4MzU4NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Pretoria',
      properties: '743 properties',
      image: `https://images.unsplash.com/photo-1646502407568-5a58572c5b3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcmV0b3JpYSUyMFNvdXRoJTIwQWZyaWNhJTIwVW5pb24lMjBCdWlsZGluZ3N8ZW58MXx8fHwxNzU4MzU4NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Bloemfontein',
      properties: '234 properties',
      image: `https://images.unsplash.com/photo-1653505914751-93e8ac1123be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbG9lbWZvbnRlaW4lMjBTb3V0aCUyMEFmcmljYSUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NTgzNTg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Port Elizabeth',
      properties: '567 properties',
      image: `https://images.unsplash.com/photo-1674918790398-9174123c1a2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQb3J0JTIwRWxpemFiZXRoJTIwU291dGglMjBBZnJpY2ElMjBiZWFjaGZyb250fGVufDF8fHx8MTc1ODM1ODY2NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral?not-from-cache-please=${Date.now()}`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{getRegionName()}</h2>
        <p className="text-gray-600">These popular destinations have a lot to offer</p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {destinations.map((destination, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={destination.image}
                alt={destination.name}
                className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 text-white">
                <h3 className="font-semibold text-sm md:text-base">{destination.name}</h3>
                <p className="text-xs opacity-90">{destination.properties}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
