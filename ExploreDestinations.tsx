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

  // Reliable image URLs with multiple fallbacks
  const destinations = [
    {
      name: 'Cape Town',
      properties: '2,543 properties',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&h=300&fit=crop&crop=center',
      fallbacks: [
        'https://images.unsplash.com/photo-1576485290814-1c72aa4bbb8e?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1555400082-8c5cd5b3c3d1?w=400&h=300&fit=crop&crop=center'
      ]
    },
    {
      name: 'Durban',
      properties: '1,298 properties',
      image: 'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400&h=300&fit=crop&crop=center',
      fallbacks: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center'
      ]
    },
    {
      name: 'Johannesburg',
      properties: '1,892 properties',
      image: 'https://images.unsplash.com/photo-1577948000111-9c970dfe3743?w=400&h=300&fit=crop&crop=center',
      fallbacks: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&crop=center'
      ]
    },
    {
      name: 'Pretoria',
      properties: '743 properties',
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&h=300&fit=crop&crop=center',
      fallbacks: [
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1474181487882-5abf3f0ba6c2?w=400&h=300&fit=crop&crop=center'
      ]
    },
    {
      name: 'Bloemfontein',
      properties: '234 properties',
      image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=300&fit=crop&crop=center',
      fallbacks: [
        'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop&crop=center'
      ]
    },
    {
      name: 'Port Elizabeth',
      properties: '567 properties',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop&crop=center',
      fallbacks: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop&crop=center',
        'https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?w=400&h=300&fit=crop&crop=center'
      ]
    }
  ];

  const handleDestinationClick = (destinationName: string) => {
    console.log(`Searching for ${destinationName}...`);
    // Add your navigation logic here
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{getRegionName()}</h2>
        <p className="text-gray-600">These popular destinations have a lot to offer</p>
      </div>
        
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {destinations.map((destination, index) => (
          <div 
            key={index} 
            className="relative group cursor-pointer hover:transform hover:scale-105 transition-all duration-300"
            onClick={() => handleDestinationClick(destination.name)}
          >
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg">
              <ImageWithFallback
                src={destination.image}
                alt={`${destination.name} - Beautiful destination in South Africa`}
                className="w-full h-32 md:h-40 object-cover group-hover:scale-110 transition-transform duration-300"
                propertyType="destination"
                aspectRatio="landscape"
                lazy={true}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="absolute bottom-2 left-2 text-white">
                <h3 className="font-semibold text-sm md:text-base drop-shadow-lg">{destination.name}</h3>
                <p className="text-xs opacity-90 drop-shadow">{destination.properties}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
