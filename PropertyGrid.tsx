import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, MapPin, Wifi, Car, Coffee, Users, Heart } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { FlightSearchResults } from './FlightSearchResults';

interface PropertyGridProps {
  results: any[];
  onBookingSelect: (booking: any) => void;
  activeTab?: string;
}

export function PropertyGrid({ results, onBookingSelect, activeTab }: PropertyGridProps) {
  if (results.length === 0) {
    return null;
  }

  // If we have flight results and active tab is flights, use the specialized component
  if (activeTab === 'flights' && results.some(r => r.type === 'flights')) {
    return <FlightSearchResults results={results} onBookingSelect={onBookingSelect} />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Search Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {results.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 bg-white group cursor-pointer">
              <div className="relative">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  propertyType={item.type === 'stays' ? 'hotel' : item.type}
                  aspectRatio="landscape"
                />
                
                {/* Heart button */}
                <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors shadow-sm">
                  <Heart className="w-4 h-4 text-gray-600 hover:text-red-500 transition-colors" />
                </button>
                
                {/* Booking.com style badges */}
                <div className="absolute top-2 left-2">
                  <Badge className="bg-white text-gray-800 text-xs font-medium shadow-sm">
                    {item.type === 'stays' ? 'Hotel' : item.type === 'flights' ? 'Flight' : 'Car Rental'}
                  </Badge>
                </div>

                {/* Amenities overlay */}
                {item.type === 'stays' && (
                  <div className="absolute bottom-2 left-2 flex space-x-1">
                    <div className="bg-white/90 p-1 rounded-full">
                      <Wifi className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="bg-white/90 p-1 rounded-full">
                      <Coffee className="w-3 h-3 text-gray-600" />
                    </div>
                    <div className="bg-white/90 p-1 rounded-full">
                      <Car className="w-3 h-3 text-gray-600" />
                    </div>
                  </div>
                )}
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
                    {item.title}
                  </h3>
                  <div className="flex items-center text-gray-600 text-xs mb-2">
                    <MapPin className="w-3 h-3 mr-1" />
                    <span className="truncate">{item.location}</span>
                  </div>
                  
                  {/* Rating and reviews */}
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1">
                      <div className="bg-[#003580] text-white text-xs px-1.5 py-0.5 rounded font-bold">
                        {item.rating}
                      </div>
                      <span className="text-xs text-gray-600 font-medium">
                        {item.rating >= 9 ? 'Superb' : item.rating >= 8 ? 'Very good' : item.rating >= 7 ? 'Good' : 'Fair'}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500">• {Math.floor(Math.random() * 500) + 50} reviews</span>
                  </div>
                </div>
                
                <div className="flex items-end justify-between">
                  <div className="flex-1">
                    {item.type === 'stays' && (
                      <div className="flex items-center text-xs text-gray-500 mb-1">
                        <Users className="w-3 h-3 mr-1" />
                        <span>2 adults • 1 room</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="text-right">
                    <div className="text-xs text-gray-500 mb-1">
                      {item.type === 'stays' ? 'Starting from' : item.type === 'flights' ? 'From' : 'Per day'}
                    </div>
                    <div className="font-bold text-lg text-gray-900">ZAR {item.price}</div>
                    <div className="text-xs text-gray-500">
                      {item.type === 'stays' ? 'per night' : item.type === 'flights' ? 'per person' : 'total'}
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => onBookingSelect(item)}
                  className="w-full mt-3 bg-[#0071c2] hover:bg-[#003580] text-white font-medium text-sm py-2 transition-colors"
                >
                  {item.type === 'stays' ? 'See availability' : item.type === 'flights' ? 'Select flight' : 'Book now'}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}