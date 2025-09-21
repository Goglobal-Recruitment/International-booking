import { Card, CardContent, CardHeader } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, MapPin } from 'lucide-react';
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
        <h2 className="text-2xl mb-6">Search Results</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative h-48">
                <ImageWithFallback
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-green-600">
                  {item.type === 'stays' ? 'Hotel' : item.type === 'flights' ? 'Flight' : 'Car'}
                </Badge>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg">{item.title}</h3>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{item.rating}</span>
                  </div>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {item.location}
                </div>
              </CardHeader>
              
              <CardContent>
                <p className="text-gray-600 text-sm mb-4">{item.description}</p>
                
                <div className="flex items-center justify-between">
                  <div className="text-right">
                    <div className="text-2xl font-bold">ZAR {item.price}</div>
                    <div className="text-sm text-gray-600">
                      {item.type === 'stays' ? 'per night' : item.type === 'flights' ? 'per person' : 'per day'}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => onBookingSelect(item)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {item.type === 'stays' ? 'Book now' : item.type === 'flights' ? 'Select flight' : 'Rent now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}