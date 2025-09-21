import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Slider } from './ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Star, X, Filter } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

interface PropertyFiltersProps {
  onFiltersChange: (filters: any) => void;
  searchType: 'stays' | 'flights' | 'cars';
}

export function PropertyFilters({ onFiltersChange, searchType }: PropertyFiltersProps) {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [selectedPropertyTypes, setSelectedPropertyTypes] = useState<string[]>([]);
  const [selectedRating, setSelectedRating] = useState<number[]>([]);
  const [guestRating, setGuestRating] = useState([0]);
  const [isOpen, setIsOpen] = useState(false);

  const amenities = [
    'Free WiFi',
    'Pool',
    'Parking',
    'Pet-friendly',
    'Gym',
    'Spa',
    'Restaurant',
    'Bar',
    'Room service',
    'Air conditioning',
    'Kitchen',
    'Laundry'
  ];

  const propertyTypes = [
    'Hotel',
    'Apartment',
    'Resort',
    'Villa',
    'Hostel',
    'Guest house',
    'Bed & breakfast',
    'Vacation rental'
  ];

  const flightFilters = [
    'Direct flights only',
    'No overnight flights',
    'Short layover (< 3h)',
    'Same airline',
    'Flexible dates',
    'Include nearby airports'
  ];

  const carFilters = [
    'Manual transmission',
    'Automatic transmission',
    'Air conditioning',
    'Unlimited mileage',
    'Electric vehicle',
    'Hybrid vehicle',
    'GPS included',
    'Child seats available'
  ];

  const handleAmenityChange = (amenity: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedAmenities, amenity]
      : selectedAmenities.filter(a => a !== amenity);
    setSelectedAmenities(updated);
    updateFilters({ amenities: updated });
  };

  const handlePropertyTypeChange = (type: string, checked: boolean) => {
    const updated = checked 
      ? [...selectedPropertyTypes, type]
      : selectedPropertyTypes.filter(t => t !== type);
    setSelectedPropertyTypes(updated);
    updateFilters({ propertyTypes: updated });
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    const updated = checked 
      ? [...selectedRating, rating]
      : selectedRating.filter(r => r !== rating);
    setSelectedRating(updated);
    updateFilters({ ratings: updated });
  };

  const updateFilters = (filterUpdate: any) => {
    const filters = {
      priceRange,
      amenities: selectedAmenities,
      propertyTypes: selectedPropertyTypes,
      ratings: selectedRating,
      guestRating: guestRating[0],
      ...filterUpdate
    };
    onFiltersChange(filters);
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedAmenities([]);
    setSelectedPropertyTypes([]);
    setSelectedRating([]);
    setGuestRating([0]);
    onFiltersChange({});
  };

  const getActiveFiltersCount = () => {
    return selectedAmenities.length + selectedPropertyTypes.length + selectedRating.length + 
           (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0) + (guestRating[0] > 0 ? 1 : 0);
  };

  const renderStayFilters = () => (
    <>
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Price per night</span>
          <span className="text-sm text-gray-500">${priceRange[0]} - ${priceRange[1]}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              updateFilters({ priceRange: value });
            }}
            max={1000}
            step={10}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}+</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Property rating</span>
          <span className="text-sm text-gray-500">{selectedRating.length} selected</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 space-y-3">
          {[5, 4, 3, 2, 1].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedRating.includes(rating)}
                onCheckedChange={(checked) => handleRatingChange(rating, checked as boolean)}
              />
              <div className="flex items-center">
                {Array.from({ length: rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gray-300" />
                ))}
              </div>
              <span className="text-sm text-gray-600">{rating} star{rating !== 1 ? 's' : ''}</span>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Guest rating</span>
          <span className="text-sm text-gray-500">{guestRating[0]}+</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4">
          <Slider
            value={guestRating}
            onValueChange={(value) => {
              setGuestRating(value);
              updateFilters({ guestRating: value[0] });
            }}
            max={10}
            step={0.1}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>0</span>
            <span>10</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Property type</span>
          <span className="text-sm text-gray-500">{selectedPropertyTypes.length} selected</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 space-y-3 max-h-48 overflow-y-auto">
          {propertyTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedPropertyTypes.includes(type)}
                onCheckedChange={(checked) => handlePropertyTypeChange(type, checked as boolean)}
              />
              <Label className="text-sm">{type}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Amenities</span>
          <span className="text-sm text-gray-500">{selectedAmenities.length} selected</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 space-y-3 max-h-48 overflow-y-auto">
          {amenities.map((amenity) => (
            <div key={amenity} className="flex items-center space-x-2">
              <Checkbox
                checked={selectedAmenities.includes(amenity)}
                onCheckedChange={(checked) => handleAmenityChange(amenity, checked as boolean)}
              />
              <Label className="text-sm">{amenity}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );

  const renderFlightFilters = () => (
    <>
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Price</span>
          <span className="text-sm text-gray-500">${priceRange[0]} - ${priceRange[1]}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              updateFilters({ priceRange: value });
            }}
            max={2000}
            step={50}
            className="w-full"
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Flight preferences</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 space-y-3">
          {flightFilters.map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox />
              <Label className="text-sm">{filter}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Departure time</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 space-y-3">
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="morning">Morning (6:00 - 12:00)</SelectItem>
              <SelectItem value="afternoon">Afternoon (12:00 - 18:00)</SelectItem>
              <SelectItem value="evening">Evening (18:00 - 24:00)</SelectItem>
              <SelectItem value="night">Night (0:00 - 6:00)</SelectItem>
            </SelectContent>
          </Select>
        </CollapsibleContent>
      </Collapsible>
    </>
  );

  const renderCarFilters = () => (
    <>
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Price per day</span>
          <span className="text-sm text-gray-500">${priceRange[0]} - ${priceRange[1]}</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4">
          <Slider
            value={priceRange}
            onValueChange={(value) => {
              setPriceRange(value);
              updateFilters({ priceRange: value });
            }}
            max={500}
            step={10}
            className="w-full"
          />
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Car type</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 space-y-3">
          {['Economy', 'Compact', 'Mid-size', 'Full-size', 'SUV', 'Luxury', 'Convertible'].map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox />
              <Label className="text-sm">{type}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-3 border-b">
          <span className="font-medium">Features</span>
        </CollapsibleTrigger>
        <CollapsibleContent className="py-4 space-y-3">
          {carFilters.map((filter) => (
            <div key={filter} className="flex items-center space-x-2">
              <Checkbox />
              <Label className="text-sm">{filter}</Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>
    </>
  );

  return (
    <div className="w-80">
      {/* Mobile Filter Toggle */}
      <div className="md:hidden mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between"
        >
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
            {getActiveFiltersCount() > 0 && (
              <Badge variant="secondary">{getActiveFiltersCount()}</Badge>
            )}
          </div>
        </Button>
      </div>

      {/* Filter Panel */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Filter by:</CardTitle>
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-blue-600 hover:text-blue-700"
                >
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {searchType === 'stays' && renderStayFilters()}
            {searchType === 'flights' && renderFlightFilters()}
            {searchType === 'cars' && renderCarFilters()}
          </CardContent>
        </Card>

        {/* Active Filters */}
        {getActiveFiltersCount() > 0 && (
          <Card className="mt-4">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Active filters</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-2">
                {selectedAmenities.map((amenity) => (
                  <Badge key={amenity} variant="secondary" className="text-xs">
                    {amenity}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleAmenityChange(amenity, false)}
                    />
                  </Badge>
                ))}
                {selectedPropertyTypes.map((type) => (
                  <Badge key={type} variant="secondary" className="text-xs">
                    {type}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handlePropertyTypeChange(type, false)}
                    />
                  </Badge>
                ))}
                {selectedRating.map((rating) => (
                  <Badge key={rating} variant="secondary" className="text-xs">
                    {rating} star{rating !== 1 ? 's' : ''}
                    <X 
                      className="w-3 h-3 ml-1 cursor-pointer" 
                      onClick={() => handleRatingChange(rating, false)}
                    />
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}