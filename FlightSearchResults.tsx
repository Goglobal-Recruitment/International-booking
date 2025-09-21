import { useState } from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { Checkbox } from './ui/checkbox';
import { Clock, Plane, ArrowRight, Filter, Star, ChevronDown, ChevronUp, Wifi, Coffee, Tv, Utensils } from 'lucide-react';

interface FlightSearchResultsProps {
  results: any[];
  onBookingSelect: (booking: any) => void;
}

export function FlightSearchResults({ results, onBookingSelect }: FlightSearchResultsProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('cheapest');

  // Mock flight data that matches your Booking.com design
  const flightResults = [
    {
      id: 1,
      airline: 'South African Airways',
      flightNumber: 'SA 542',
      departure: { time: '11:40 AM', code: 'JNB', city: 'Johannesburg' },
      arrival: { time: '6:00 PM', code: 'CPT', city: 'Cape Town' },
      duration: '2h 20m',
      stops: 'Direct',
      price: 2899,
      originalPrice: 3758,
      savings: 859,
      baggage: '23kg',
      amenities: ['wifi', 'meal', 'entertainment'],
      deal: 'Limited time deal',
      rating: 4.2,
      aircraft: 'Boeing 737-800'
    },
    {
      id: 2,
      airline: 'FlySafair',
      flightNumber: 'FA 212',
      departure: { time: '9:00 AM', code: 'JNB', city: 'Johannesburg' },
      arrival: { time: '11:25 AM', code: 'CPT', city: 'Cape Town' },
      duration: '2h 25m',
      stops: 'Direct',
      price: 1899,
      originalPrice: null,
      baggage: '20kg',
      amenities: ['wifi'],
      rating: 4.0,
      aircraft: 'Boeing 737-400'
    },
    {
      id: 3,
      airline: 'Kulula',
      flightNumber: 'MN 542',
      departure: { time: '6:15 AM', code: 'JNB', city: 'Johannesburg' },
      arrival: { time: '8:45 AM', code: 'CPT', city: 'Cape Town' },
      duration: '2h 30m',
      stops: 'Direct',
      price: 2456,
      originalPrice: 2855,
      savings: 399,
      baggage: '20kg',
      amenities: ['wifi', 'meal'],
      deal: 'Genius deal',
      rating: 4.1,
      aircraft: 'Boeing 737-800'
    },
    {
      id: 4,
      airline: 'LIFT',
      flightNumber: 'GE 212',
      departure: { time: '1:40 PM', code: 'JNB', city: 'Johannesburg' },
      arrival: { time: '4:10 PM', code: 'CPT', city: 'Cape Town' },
      duration: '2h 30m',
      stops: 'Direct',
      price: 3234,
      originalPrice: null,
      baggage: '23kg',
      amenities: ['wifi', 'entertainment', 'meal'],
      rating: 4.3,
      aircraft: 'Airbus A320'
    }
  ];

  const airlines = ['South African Airways', 'FlySafair', 'Kulula', 'LIFT', 'British Airways'];
  const stopOptions = ['Direct', '1 stop', '2+ stops'];

  const getAmenityIcon = (amenity: string) => {
    switch (amenity) {
      case 'wifi': return <Wifi className="w-4 h-4" />;
      case 'meal': return <Utensils className="w-4 h-4" />;
      case 'entertainment': return <Tv className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="w-80 hidden lg:block">
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-lg mb-4">Filter results</h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Price per person</h4>
                <div className="space-y-3">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={50000}
                    min={0}
                    step={100}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>ZAR {priceRange[0]}</span>
                    <span>ZAR {priceRange[1]}</span>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Airlines */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Airlines</h4>
                <div className="space-y-2">
                  {airlines.map((airline) => (
                    <div key={airline} className="flex items-center space-x-2">
                      <Checkbox
                        id={airline}
                        checked={selectedAirlines.includes(airline)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedAirlines([...selectedAirlines, airline]);
                          } else {
                            setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
                          }
                        }}
                      />
                      <label htmlFor={airline} className="text-sm cursor-pointer">
                        {airline}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Stops */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Stops</h4>
                <div className="space-y-2">
                  {stopOptions.map((stop) => (
                    <div key={stop} className="flex items-center space-x-2">
                      <Checkbox
                        id={stop}
                        checked={selectedStops.includes(stop)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedStops([...selectedStops, stop]);
                          } else {
                            setSelectedStops(selectedStops.filter(s => s !== stop));
                          }
                        }}
                      />
                      <label htmlFor={stop} className="text-sm cursor-pointer">
                        {stop}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <Separator className="my-4" />

              {/* Duration */}
              <div className="mb-6">
                <h4 className="font-medium mb-3">Flight duration</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="short" />
                    <label htmlFor="short" className="cursor-pointer">0h - 6h</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="medium" />
                    <label htmlFor="medium" className="cursor-pointer">6h - 12h</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Flight Results */}
        <div className="flex-1">
          {/* Sort Options */}
          <div className="bg-white p-4 rounded-lg shadow-sm border mb-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="text-sm font-medium">Sort by:</span>
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'cheapest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('cheapest')}
                  className="text-sm"
                >
                  Cheapest first
                </Button>
                <Button
                  variant={sortBy === 'fastest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('fastest')}
                  className="text-sm"
                >
                  Fastest first
                </Button>
                <Button
                  variant={sortBy === 'best' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('best')}
                  className="text-sm"
                >
                  Best
                </Button>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden ml-auto"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          {/* Flight Cards */}
          <div className="space-y-4">
            {flightResults.map((flight) => (
              <Card key={flight.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  {flight.deal && (
                    <div className="bg-red-600 text-white px-4 py-2">
                      <span className="text-sm font-medium">{flight.deal}</span>
                    </div>
                  )}
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      {/* Flight Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Plane className="w-4 h-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-medium text-sm">{flight.airline}</p>
                              <p className="text-xs text-gray-500">{flight.flightNumber}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {flight.amenities.map((amenity, index) => (
                              <div key={index} className="text-gray-400">
                                {getAmenityIcon(amenity)}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Flight Times */}
                        <div className="flex items-center gap-6 mb-4">
                          <div className="text-center">
                            <p className="text-xl font-bold text-gray-900">{flight.departure.time}</p>
                            <p className="text-sm text-gray-600">{flight.departure.code}</p>
                            <p className="text-xs text-gray-500">{flight.departure.city}</p>
                          </div>
                          
                          <div className="flex-1 text-center">
                            <div className="flex items-center justify-center gap-2 mb-1">
                              <div className="h-px bg-gray-300 flex-1"></div>
                              <Plane className="w-4 h-4 text-gray-400" />
                              <div className="h-px bg-gray-300 flex-1"></div>
                            </div>
                            <p className="text-sm text-gray-600">{flight.duration}</p>
                            <p className="text-xs text-green-600">{flight.stops}</p>
                          </div>
                          
                          <div className="text-center">
                            <p className="text-xl font-bold text-gray-900">{flight.arrival.time}</p>
                            <p className="text-sm text-gray-600">{flight.arrival.code}</p>
                            <p className="text-xs text-gray-500">{flight.arrival.city}</p>
                          </div>
                        </div>

                        {/* Additional Info */}
                        <div className="text-xs text-gray-600 space-y-1">
                          <p>Baggage: {flight.baggage} checked baggage included</p>
                          <p>Aircraft: {flight.aircraft}</p>
                        </div>
                      </div>

                      {/* Price & Book */}
                      <div className="text-right min-w-[160px] ml-6">
                        {flight.originalPrice && (
                          <p className="text-sm text-gray-500 line-through">ZAR {flight.originalPrice.toLocaleString()}</p>
                        )}
                        <p className="text-2xl font-bold text-gray-900 mb-1">
                          ZAR {flight.price.toLocaleString()}
                        </p>
                        {flight.savings && (
                          <p className="text-sm text-green-600 mb-3">You save ZAR {flight.savings}</p>
                        )}
                        <Button
                          onClick={() => onBookingSelect({
                            ...flight,
                            type: 'flight',
                            title: `${flight.airline} ${flight.flightNumber}`,
                            description: `${flight.departure.city} to ${flight.arrival.city}`,
                            totalPrice: flight.price
                          })}
                          className="w-full bg-[#0071c2] hover:bg-[#005799] text-white"
                        >
                          View details
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">Prices include taxes and fees</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Show more results
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}