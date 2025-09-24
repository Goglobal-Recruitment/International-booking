import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Checkbox } from './ui/checkbox';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from './ui/command';
import { MapPin, Calendar as CalendarIcon, Users, Plane, ArrowLeftRight, Search, ChevronDown } from 'lucide-react';
import { projectId, publicAnonKey } from '../utils/supabase/info';

// Import hotels data
import hotelsData from './hotels.json';

// Format date function
const format = (date: Date, formatStr: string) => {
  const month = date.toLocaleString('en', { month: 'short' });
  const day = date.getDate().toString().padStart(2, '0');
  return `${month} ${day}`;
};

// Popular destinations for autocomplete
const popularDestinations = [
  'New York, USA',
  'London, UK',
  'Paris, France',
  'Tokyo, Japan',
  'Dubai, UAE',
  'Barcelona, Spain',
  'Amsterdam, Netherlands',
  'Rome, Italy',
  'Bangkok, Thailand',
  'Istanbul, Turkey',
  'Singapore',
  'Sydney, Australia',
  'Berlin, Germany',
  'Madrid, Spain',
  'Vienna, Austria',
  'Prague, Czech Republic',
  'Budapest, Hungary',
  'Stockholm, Sweden',
  'Copenhagen, Denmark',
  'Oslo, Norway',
  'Cape Town, South Africa',
  'Johannesburg, South Africa',
  'Cairo, Egypt',
  'Marrakech, Morocco',
  'Mumbai, India',
  'Delhi, India',
  'Bangkok, Thailand',
  'Seoul, South Korea',
  'Hong Kong',
  'Manila, Philippines',
];

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
  const [showDestinationDropdown, setShowDestinationDropdown] = useState(false);
  const [addFlight, setAddFlight] = useState(false);

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

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

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

      // For stays, use hotels.json data
      if (activeTab === 'stays') {
        const hotelResults = hotelsData.map((hotel, index) => ({
          id: index + 1,
          type: 'stays',
          title: hotel.name,
          description: hotel.description,
          price: parseInt(hotel.price.replace('ZAR ', '')),
          image: hotel.image + '?not-from-cache-please=' + Date.now(), // Add cache-busting parameter for CORS
          rating: 4.5 + (Math.random() * 0.5), // Random rating between 4.5-5.0
          location: `${hotel.city}, ${hotel.country}`
        }));
        
        onSearch(hotelResults);
        return;
      }

      // Fallback to mock results for other services
      const mockResults = [
        {
          id: 1,
          type: activeTab,
          title: activeTab === 'flights' ? 'Emirates Flight EK201' : activeTab === 'cars' ? 'BMW 3 Series' : activeTab === 'attractions' ? 'Table Mountain Tour' : 'Airport Transfer',
          description: activeTab === 'flights' ? 'Dubai to New York' : activeTab === 'cars' ? 'Premium sedan' : activeTab === 'attractions' ? 'Guided cable car experience' : 'Reliable airport taxi',
          price: activeTab === 'flights' ? 899 : activeTab === 'cars' ? 89 : activeTab === 'attractions' ? 45 : 35,
          image: (activeTab === 'flights'
            ? 'https://images.unsplash.com/photo-1647363377737-8d0ad7c2f494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZseWluZyUyMGJsdWUlMjBza3klMjBjbG91ZHN8ZW58MXx8fHwxNzU4MzAwOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'cars'
            ? 'https://images.unsplash.com/photo-1639060016125-dfde31ca1af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjB2ZWhpY2xlfGVufDF8fHx8MTc1ODMwMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'attractions'
            ? 'https://images.unsplash.com/photo-1725291975516-a67056a8b519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbnMlMjBsYW5kbWFya3N8ZW58MXx8fHwxNzU4MzAxMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : 'https://images.unsplash.com/photo-1564294913443-70baba520b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwdGF4aSUyMHRyYW5zZmVyfGVufDF8fHx8MTc1ODI3MzkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral') + '?not-from-cache-please=' + Date.now(),
          rating: 4.5,
          location: destination || fromLocation || pickupLocation || 'Various locations'
        },
        {
          id: 2,
          type: activeTab,
          title: activeTab === 'flights' ? 'Qatar Airways QR101' : activeTab === 'cars' ? 'Mercedes E-Class' : activeTab === 'attractions' ? 'Wine Tasting Tour' : 'Luxury Transfer',
          description: activeTab === 'flights' ? 'Doha to London' : activeTab === 'cars' ? 'Luxury sedan' : activeTab === 'attractions' ? 'Stellenbosch wine estates' : 'Premium airport service',
          price: activeTab === 'flights' ? 1299 : activeTab === 'cars' ? 129 : activeTab === 'attractions' ? 75 : 55,
          image: (activeTab === 'flights'
            ? 'https://images.unsplash.com/photo-1647363377737-8d0ad7c2f494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZseWluZyUyMGJsdWUlMjBza3klMjBjbG91ZHN8ZW58MXx8fHwxNzU4MzAwOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'cars'
            ? 'https://images.unsplash.com/photo-1639060016125-dfde31ca1af8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXIlMjByZW50YWwlMjB2ZWhpY2xlfGVufDF8fHx8MTc1ODMwMTA1MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : activeTab === 'attractions'
            ? 'https://images.unsplash.com/photo-1725291975516-a67056a8b519?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0b3VyaXN0JTIwYXR0cmFjdGlvbnMlMjBsYW5kbWFya3N8ZW58MXx8fHwxNzU4MzAxMDU1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
            : 'https://images.unsplash.com/photo-1564294913443-70baba520b36?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwb3J0JTIwdGF4aSUyMHRyYW5zZmVyfGVufDF8fHx8MTc1ODI3MzkyN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral') + '?not-from-cache-please=' + Date.now(),
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
                  <Label htmlFor="round-trip" className="text-sm font-medium cursor-pointer">Round trip</Label>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <Plane className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Leaving from"
                        value={fromLocation}
                        onChange={(e) => setFromLocation(e.target.value)}
                        className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search airports..." />
                      <CommandEmpty>No airports found.</CommandEmpty>
                      <CommandGroup>
                        {popularDestinations.slice(0, 10).map((dest) => (
                          <CommandItem
                            key={dest}
                            onSelect={() => {
                              setFromLocation(dest);
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            {dest}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Going to"
                        value={toLocation}
                        onChange={(e) => setToLocation(e.target.value)}
                        className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search destinations..." />
                      <CommandEmpty>No destinations found.</CommandEmpty>
                      <CommandGroup>
                        {popularDestinations.slice(0, 10).map((dest) => (
                          <CommandItem
                            key={dest}
                            onSelect={() => {
                              setToLocation(dest);
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            {dest}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                            {departDate ? format(departDate, 'MMM dd') : format(today, 'MMM dd')}
                          </div>
                        </div>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={departDate}
                        onSelect={setDepartDate}
                        disabled={(date) => date < today}
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
                              {returnDate ? format(returnDate, 'MMM dd') : format(tomorrow, 'MMM dd')}
                            </div>
                          </div>
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={returnDate}
                          onSelect={setReturnDate}
                          disabled={(date) => date < (departDate || today)}
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
                          {guests.adults + guests.children} passengers
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
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="City, airport, region, district or landmark"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search locations..." />
                      <CommandEmpty>No locations found.</CommandEmpty>
                      <CommandGroup>
                        {popularDestinations.slice(0, 8).map((dest) => (
                          <CommandItem
                            key={dest}
                            onSelect={() => {
                              setPickupLocation(dest);
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            {dest}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                      disabled={(date) => date < today}
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
                      disabled={(date) => date < (pickupDate || today)}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Where are you going?"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search destinations..." />
                      <CommandEmpty>No destinations found.</CommandEmpty>
                      <CommandGroup>
                        {popularDestinations.slice(0, 8).map((dest) => (
                          <CommandItem
                            key={dest}
                            onSelect={() => {
                              setDestination(dest);
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            {dest}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                      disabled={(date) => date < today}
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
                          {guests.adults + guests.children} travelers
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

  // Taxis form
  if (activeTab === 'taxis') {
    return (
      <div className="container mx-auto px-4 -mt-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div>
                <Label className="text-xs font-medium text-[#003580] mb-1 block">Pick-up location</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Enter pick-up location"
                        value={pickupLocation}
                        onChange={(e) => setPickupLocation(e.target.value)}
                        className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                      />
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0" align="start">
                    <Command>
                      <CommandInput placeholder="Search locations..." />
                      <CommandEmpty>No locations found.</CommandEmpty>
                      <CommandGroup>
                        {popularDestinations.slice(0, 8).map((dest) => (
                          <CommandItem
                            key={dest}
                            onSelect={() => {
                              setPickupLocation(dest);
                            }}
                          >
                            <MapPin className="mr-2 h-4 w-4" />
                            {dest}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                      disabled={(date) => date < today}
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
                          {guests.adults + guests.children} passengers
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

  // Default: Stays form
  return (
    <div className="container mx-auto px-4 -mt-24 relative z-10">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white p-6 rounded-md shadow-lg border border-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-3 mb-4">
            {/* Destination */}
            <div className="lg:col-span-2">
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Where are you going?</Label>
              <Popover open={showDestinationDropdown} onOpenChange={setShowDestinationDropdown}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Where are you going?"
                      value={destination}
                      onChange={(e) => {
                        setDestination(e.target.value);
                        setShowDestinationDropdown(true);
                      }}
                      className="pl-10 h-12 bg-white border border-[#003580] rounded-sm focus:border-[#0071c2] focus:ring-1 focus:ring-[#0071c2]"
                    />
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0" align="start">
                  <Command>
                    <CommandInput placeholder="Search destinations..." />
                    <CommandEmpty>No destinations found.</CommandEmpty>
                    <CommandGroup>
                      {popularDestinations
                        .filter(dest => dest.toLowerCase().includes(destination.toLowerCase()))
                        .slice(0, 8)
                        .map((dest) => (
                        <CommandItem
                          key={dest}
                          onSelect={() => {
                            setDestination(dest);
                            setShowDestinationDropdown(false);
                          }}
                        >
                          <MapPin className="mr-2 h-4 w-4" />
                          {dest}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-in Date */}
            <div>
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Check-in</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {checkIn ? format(checkIn, 'MMM dd') : format(today, 'MMM dd')}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkIn}
                    onSelect={setCheckIn}
                    disabled={(date) => date < today}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Check-out Date */}
            <div>
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Check-out</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                    <CalendarIcon className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {checkOut ? format(checkOut, 'MMM dd') : format(tomorrow, 'MMM dd')}
                      </div>
                    </div>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={checkOut}
                    onSelect={setCheckOut}
                    disabled={(date) => date < (checkIn || tomorrow)}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Guests & Rooms */}
            <div>
              <Label className="text-xs font-medium text-[#003580] mb-1 block">Guests & rooms</Label>
              <Popover open={showGuestsPopover} onOpenChange={setShowGuestsPopover}>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start h-12 bg-white border border-[#003580] rounded-sm hover:border-[#0071c2] px-3">
                    <Users className="mr-2 h-4 w-4 text-gray-400" />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {guests.adults + guests.children} guests, {guests.rooms} room{guests.rooms !== 1 ? 's' : ''}
                      </div>
                    </div>
                    <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Adults</Label>
                        <p className="text-sm text-gray-500">Ages 18 or above</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setGuests(prev => ({ ...prev, adults: Math.max(1, prev.adults - 1) }))}
                          disabled={guests.adults <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{guests.adults}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setGuests(prev => ({ ...prev, adults: prev.adults + 1 }))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Children</Label>
                        <p className="text-sm text-gray-500">Ages 0 to 17</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setGuests(prev => ({ ...prev, children: Math.max(0, prev.children - 1) }))}
                          disabled={guests.children <= 0}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{guests.children}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setGuests(prev => ({ ...prev, children: prev.children + 1 }))}
                        >
                          +
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="font-medium">Rooms</Label>
                        <p className="text-sm text-gray-500">How many rooms?</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
                          onClick={() => setGuests(prev => ({ ...prev, rooms: Math.max(1, prev.rooms - 1) }))}
                          disabled={guests.rooms <= 1}
                        >
                          -
                        </Button>
                        <span className="w-8 text-center font-medium">{guests.rooms}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-8 w-8 rounded-full"
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

          {/* Add flight checkbox */}
          <div className="flex items-center space-x-2 mb-6">
            <Checkbox 
              id="add-flight" 
              checked={addFlight}
              onCheckedChange={setAddFlight}
              className="data-[state=checked]:bg-[#003580] data-[state=checked]:border-[#003580]"
            />
            <Label htmlFor="add-flight" className="text-sm cursor-pointer">
              I'm looking for an entire home or apartment
            </Label>
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