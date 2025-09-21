import { Card, CardContent } from './ui/card';
import { ImageWithFallback } from './figma/ImageWithFallback';

const destinations = [
  {
    id: 1,
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1579656450812-5b1da79e2474?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYXJpcyUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc1ODI1NDcxNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    properties: '2,847 properties'
  },
  {
    id: 2,
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1568299485300-2dff9db482f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b2t5byUyMHRyYXZlbCUyMGRlc3RpbmF0aW9ufGVufDF8fHx8MTc1ODMwMDUxMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    properties: '1,923 properties'
  },
  {
    id: 3,
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1652286957792-3dc0e68fae83?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb25kb24lMjB0cmF2ZWwlMjBkZXN0aW5hdGlvbnxlbnwxfHx8fDE3NTgzMDA1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    properties: '3,124 properties'
  },
  {
    id: 4,
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1728587155266-a8887ad11240?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXclMjB5b3JrJTIwdHJhdmVsJTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzU4MzAwNTE3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    properties: '2,156 properties'
  },
  {
    id: 5,
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1582204545593-1356b96cab4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21lJTIwdHJhdmVsJTIwZGVzdGluYXRpb258ZW58MXx8fHwxNzU4MzAwNTIxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    properties: '1,876 properties'
  }
];

interface FeaturedDestinationsProps {
  onDestinationSelect?: (destination: string) => void;
}

export function FeaturedDestinations({ onDestinationSelect }: FeaturedDestinationsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl mb-6">Popular destinations</h2>
        <p className="text-gray-600 mb-8">These popular destinations have a lot to offer</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {destinations.map((destination) => (
            <Card 
              key={destination.id} 
              className="overflow-hidden cursor-pointer hover:shadow-lg transition-shadow group"
              onClick={() => onDestinationSelect?.(destination.name)}
            >
              <div className="relative h-32">
                <ImageWithFallback
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-20"></div>
              </div>
              
              <CardContent className="p-4">
                <h3 className="font-medium text-lg">{destination.name}</h3>
                <p className="text-gray-600 text-sm">{destination.country}</p>
                <p className="text-gray-500 text-xs mt-1">{destination.properties}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}