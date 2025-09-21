import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { MapPin, Calendar as CalendarIcon, Users, Plane, ArrowLeftRight, Search } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Format date function
const format = (date: Date, formatStr: string) => {
  const month = date.toLocaleString('en', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  return `${month} ${day}`;
};

interface SearchFormProps {
  onSearch: (results: any[]) => void;
  user: any;
  activeTab?: string;
}

export function SearchForm({ onSearch, user, activeTab = 'stays' }: SearchFormProps) {
  // Common states
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState({ adults: 2, children: 0, rooms: 1 });
  const [showGuestsPopover, setShowGuestsPopover] = useState(false);

  // Flight search states
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [departDate, setDepartDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [tripType, setTripType] = useState('round-trip');
  const [flightClass, setFlightClass] = useState('economy');
  const [directFlightsOnly, setDirectFlightsOnly] = useState(false);

  // Car rental states
  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setPickupDate] = useState<Date>();
  const [dropoffDate, setDropoffDate] = useState<Date>();

  const handleSearch = async () => {
    if (!user) {
      alert('Please sign in to search and book');
      return;
    }

    try {
      if (activeTab === 'flights') {
        // Call backend for flight search
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/search-flights`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            from: fromLocation,
            to: toLocation,
            departureDate: departDate?.toISOString(),
            returnDate: returnDate?.toISOString(),
            passengers: guests,
            class: flightClass
          })
        });

        if (response.ok) {
          const data = await response.json();
          onSearch(data.flights || []);
          return;
        }
      }

      // Fallback to mock results for other services
      const mockResults = [
        {
          id: 1,
          type: activeTab,
          title: activeTab === 'stays' ? 'Luxury Resort & Spa' : activeTab === 'flights' ? 'Emirates Flight EK201' : activeTab === 'cars' ? 'BMW 3 Series' : activeTab === 'attractions' ? 'Table Mountain Tour' : 'Airport Transfer',
          description: activeTab === 'stays' ? '5-star resort with ocean view' : activeTab === 'flights' ? 'Dubai to New York' : activeTab === 'cars' ? 'Premium sedan' : activeTab === 'attractions' ? 'Guided cable car experience' : 'Reliable airport taxi',
          price: activeTab === 'stays' ? 299 : activeTab === 'flights' ? 899 : activeTab === 'cars' ? 89 : activeTab === 'attractions' ? 45 : 35,
          image: activeTab === 'stays' 
            ? 'https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJlc29ydHxlbnwxfHx8fDE3NTgyNjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'flights'
            ? 'https://images.unsplash.com/photo-1647363377737-8d0ad7c2f494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZseWluZyUyMGJsdWUlMjBza3klMjBjbG91ZHN8ZW58MXx8fHwxNzU4MzAwOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'cars'
            ? 'https://images.unsplash.com/photo-1639060016125-dfde31ca1af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjB2ZWhpY2xlfGVufDF8fHx8MTc1ODMwMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'attractions'
            ? 'https://images.unsplash.com/photo-1725291975516-a67056a8b519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbnMlMjBsYW5kbWFya3N8ZW58MXx8fHwxNzU4MzAxMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : 'https://images.unsplash.com/photo-1564294913443-70baba520b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwdGF4aSUyMHRyYW5zZmVyfGVufDF8fHx8MTc1ODI3MzkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          rating: 4.5,
          location: destination || fromLocation || pickupLocation || 'Various locations'
        },
        {
          id: 2,
          type: activeTab,
          title: activeTab === 'stays' ? 'Modern City Hotel' : activeTab === 'flights' ? 'Qatar Airways QR101' : activeTab === 'cars' ? 'Mercedes E-Class' : activeTab === 'attractions' ? 'Wine Tasting Tour' : 'Luxury Transfer',
          description: activeTab === 'stays' ? 'Contemporary hotel in city center' : activeTab === 'flights' ? 'Doha to London' : activeTab === 'cars' ? 'Luxury sedan' : activeTab === 'attractions' ? 'Stellenbosch wine estates' : 'Premium airport service',
          price: activeTab === 'stays' ? 199 : activeTab === 'flights' ? 1299 : activeTab === 'cars' ? 129 : activeTab === 'attractions' ? 75 : 55,
          image: activeTab === 'stays' 
            ? 'https://images.unsplash.com/photo-1694595437436-2ccf5a95591f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHxtb2Rlcm4lMjBjaXR5JTIwaG90ZWx8ZW58MXx8fHwxNzU4Mjk5OTM2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'flights'
            ? 'https://images.unsplash.com/photo-1647363377737-8d0ad7c2f494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZseWluZyUyMGJsdWUlMjBza3klMjBjbG91ZHN8ZW58MXx8fHwxNzU4MzAwOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'cars'
            ? 'https://images.unsplash.com/photo-1639060016125-dfde31ca1af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjB2ZWhpY2xlfGVufDF8fHx8MTc1ODMwMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'attractions'
            ? 'https://images.unsplash.com/photo-1725291975516-a67056a8b519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbnMlMjBsYW5kbWFya3N8ZW58MXx8fHwxNzU4MzAxMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : 'https://images.unsplash.com/photo-1564294913443-70baba520b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwdGF4aSUyMHRyYW5zZmVyfGVufDF8fHx8MTc1ODI3MzkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          rating: 4.2,
          location: destination || fromLocation || pickupLocation || 'Various locations'
        }
      ];

      onSearch(mockResults);
    } catch (error) {
      console.error('Search error:', error);
      // Fallback to mock results on error
      onSearch([]);
    }
  };

  // Flight search form
  if (activeTab === 'flights') {
    return (
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
            {/* Trip type selection */}
            <div className="mb-6">
              <RadioGroup value={tripType} onValueChange={setTripType} className="flex space-x-6">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="round-trip" id="round-trip" className="text-[#003580]" />
                  <Label htmlFor="round-trip" className="text-sm font-medium cursor-pointer">● Round trip</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="one-way" id="one-way" className="text-[#003580]" />
                  <Label htmlFor="one-way" className="text-sm font-medium cursor-pointer">One way</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="multi-city" id="multi-city" className="text-[#003580]" />
                  <Label htmlFor="multi-city" className="text-sm font-medium cursor-pointer">Multi-city</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Search form */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-4">
              {/* From */}
              <div className="relative">
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Leaving from</Label>
                <div className="relative">
                  <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Leaving from"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                  />
                </div>
              </div>

              {/* Swap button */}
              <div className="flex items-end justify-center pb-3 lg:pb-0 lg:items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-full p-2 h-8 w-8 hover:bg-gray-100"
                  onClick={() => {
                    const temp = fromLocation;
                    setFromLocation(toLocation);
                    setToLocation(temp);
                  }}
                >
                  <ArrowLeftRight className="h-4 w-4 text-[#0071c2]" />
                </Button>
              </div>

              {/* To */}
              <div className="relative">
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Going to</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Going to"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                  />
                </div>
              </div>

              {/* Travel dates */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-xs font-medium text-[#003580] mb-1 block">Travel dates</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                        <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                        <div className="text-left">
                          <div className="text-sm font-medium text-gray-900">
                            {departDate ? format(departDate, 'MMM dd') : 'Sat 18 Oct'}
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={departDate}
                        onSelect={setDepartDate}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                {tripType === 'round-trip' && (
                  <div>
                    <Label className="text-xs font-medium text-[#003580] mb-1 block">&nbsp;</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                          <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                          <div className="text-left">
                            <div className="text-sm font-medium text-gray-900">
                              {returnDate ? format(returnDate, 'MMM dd') : 'Sat 25 Oct'}
                            </div>
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                )}
              </div>

              {/* Travellers */}
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Travellers</Label>
                <Popover open={showGuestsPopover} onOpenChange={setShowGuestsPopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {guests.adults} adult{guests.adults !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Adults</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{guests.adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Children</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{guests.children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Additional options */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <Select value={flightClass} onValueChange={setFlightClass}>
                  <SelectTrigger className="w-32 border-gray-300">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="premium">Premium Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="direct-flights" 
                    checked={directFlightsOnly}
                    onCheckedChange={setDirectFlightsOnly}
                    className="data-[state=checked]:bg-[#003580] data-[state=checked]:border-[#003580]"
                  />
                  <Label htmlFor="direct-flights" className="text-sm cursor-pointer">Direct flights only</Label>
                </div>
              </div>

              {/* Search button */}
              <Button 
                onClick={handleSearch}
                className="bg-[#0071c2] hover:bg-[#005799] text-white px-8 py-3 h-12 text-base font-medium rounded-sm"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>

          {/* Features section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <Search className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Search a huge selection</h3>
              <p className="text-sm text-gray-600">Easily compare flights, airlines and prices – all in one place</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">💳</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Pay no hidden fees</h3>
              <p className="text-sm text-gray-600">Get a clear price breakdown, every step of the way</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-3">
                <span className="text-2xl">📅</span>
              </div>
              <h3 className="font-medium text-gray-900 mb-2">Get more flexibility</h3>
              <p className="text-sm text-gray-600">Change your travel dates with the Flexible ticket option*</p>
            </div>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            *Flexible plane tickets are available for an additional cost on selected airfares.
          </p>
        </div>
      </div>
    );
  }

  // Car rental form
  if (activeTab === 'cars') {
    return (
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Pick-up location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="City, airport, region, district or landmark"
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Pick-up date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {pickupDate ? format(pickupDate, 'MMM dd') : 'Pick-up date'}
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={pickupDate}
                      onSelect={setPickupDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Drop-off date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {dropoffDate ? format(dropoffDate, 'MMM dd') : 'Drop-off date'}
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={dropoffDate}
                      onSelect={setDropoffDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Driver's age</Label>
                <Select defaultValue="30-65">
                  <SelectTrigger className="h-12 bg-white border border-[#003580] rounded-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="25-29">25-29</SelectItem>
                    <SelectItem value="30-65">30-65</SelectItem>
                    <SelectItem value="66-75">66-75</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSearch}
                className="bg-[#0071c2] hover:bg-[#005799] text-white px-8 py-3 h-12 text-base font-medium rounded-sm"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Attractions form
  if (activeTab === 'attractions') {
    return (
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Where are you going?"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {checkIn ? format(checkIn, 'MMM dd') : 'Select date'}
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Travelers</Label>
                <Popover open={showGuestsPopover} onOpenChange={setShowGuestsPopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {guests.adults} adult{guests.adults !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Adults</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{guests.adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Children</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{guests.children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSearch}
                className="bg-[#0071c2] hover:bg-[#005799] text-white px-8 py-3 h-12 text-base font-medium rounded-sm"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Airport taxis form
  if (activeTab === 'taxis') {
    return (
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">From</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Airport, hotel, address"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                  />
                </div>
              </div>

              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">To</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Airport, hotel, address"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                  />
                </div>
              </div>
              
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Date & time</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                      <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {checkIn ? format(checkIn, 'MMM dd') : 'Select date'}
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={checkIn}
                      onSelect={setCheckIn}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Passengers</Label>
                <Popover open={showGuestsPopover} onOpenChange={setShowGuestsPopover}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      <div className="text-left">
                        <div className="text-sm font-medium text-gray-900">
                          {guests.adults} passenger{guests.adults !== 1 ? 's' : ''}
                        </div>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Adults</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{guests.adults}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Children</Label>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{guests.children}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                          >
                            +
                          </Button>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="flex justify-end">
              <Button 
                onClick={handleSearch}
                className="bg-[#0071c2] hover:bg-[#005799] text-white px-8 py-3 h-12 text-base font-medium rounded-sm"
                size="lg"
              >
                <Search className="mr-2 h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default stays form
  return (
    <div className="container mx-auto px-4 -mt-24 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
            <div>
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Where are you going?</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Destination"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {checkIn ? format(checkIn, 'MMM dd') : 'Check-in date'}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {checkOut ? format(checkOut, 'MMM dd') : 'Check-out date'}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Guests & rooms</Label>
              <Popover open={showGuestsPopover} onOpenChange={setShowGuestsPopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {guests.adults} adult{guests.adults !== 1 ? 's' : ''}, {guests.rooms} room{guests.rooms !== 1 ? 's' : ''}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Adults</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{guests.adults}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Children</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{guests.children}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Rooms</Label>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center">{guests.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setGuests(prev => ({ ...prev, rooms: prev.rooms + 1 }))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button 
              onClick={handleSearch}
              className="bg-[#0071c2] hover:bg-[#005799] text-white px-8 py-3 h-12 text-base font-medium rounded-sm"
              size="lg"
            >
              <Search className="mr-2 h-5 w-5" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}