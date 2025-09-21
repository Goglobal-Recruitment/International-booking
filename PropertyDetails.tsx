import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Star, 
  MapPin, 
  Wifi, 
  Car, 
  Waves, 
  Dumbbell, 
  Coffee, 
  Utensils,
  ArrowLeft,
  Users,
  Bed,
  Maximize,
  Check,
  X
} from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface PropertyDetailsProps {
  property: any;
  onBack: () => void;
  onBookRoom: (room: any) => void;
}

export function PropertyDetails({ property, onBack, onBookRoom }: PropertyDetailsProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const propertyImages = [
    property.image,
    'https://images.unsplash.com/photo-1601565415267-724db0e9fbdf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnklMjBpbnRlcmlvcnxlbnwxfHx8fDE3NTgyOTkwMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    'https://images.unsplash.com/photo-1700918232124-f64da19e73eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMGJhdGhyb29tJTIwbHV4dXJ5JTIwc3BhfGVufDF8fHx8MTc1ODMwMDU5Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
  ];

  const amenities = [
    { icon: Wifi, label: 'Free WiFi' },
    { icon: Car, label: 'Free parking' },
    { icon: Waves, label: 'Swimming pool' },
    { icon: Dumbbell, label: 'Fitness center' },
    { icon: Coffee, label: 'Room service' },
    { icon: Utensils, label: 'Restaurant' }
  ];

  const rooms = [
    {
      id: 1,
      name: 'Standard Double Room',
      description: 'Comfortable room with city view',
      size: '25 m²',
      maxGuests: 2,
      bedType: 'Double bed',
      price: property.price,
      amenities: ['Free WiFi', 'Air conditioning', 'TV', 'Private bathroom'],
      available: 3
    },
    {
      id: 2,
      name: 'Deluxe Suite',
      description: 'Spacious suite with ocean view and balcony',
      size: '45 m²',
      maxGuests: 4,
      bedType: 'King bed + Sofa bed',
      price: property.price + 100,
      amenities: ['Free WiFi', 'Air conditioning', 'TV', 'Private bathroom', 'Balcony', 'Mini bar'],
      available: 2
    },
    {
      id: 3,
      name: 'Family Room',
      description: 'Perfect for families with connecting rooms',
      size: '35 m²',
      maxGuests: 6,
      bedType: '2 Double beds',
      price: property.price + 50,
      amenities: ['Free WiFi', 'Air conditioning', 'TV', 'Private bathroom', 'Kitchenette'],
      available: 1
    }
  ];

  const reviews = [
    {
      id: 1,
      author: 'Sarah Johnson',
      rating: 5,
      date: 'December 2024',
      comment: 'Amazing stay! The staff was incredibly friendly and the rooms were spotless. The location is perfect for exploring the city.',
      helpful: 12
    },
    {
      id: 2,
      author: 'Michael Chen',
      rating: 4,
      date: 'November 2024',
      comment: 'Great hotel with excellent amenities. The pool area is beautiful and the breakfast was delicious. Only minor issue was the WiFi speed.',
      helpful: 8
    },
    {
      id: 3,
      author: 'Emma Williams',
      rating: 5,
      date: 'November 2024',
      comment: 'Exceeded expectations! The concierge went above and beyond to help us plan our itinerary. Will definitely stay here again.',
      helpful: 15
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with back button */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Button
            variant="ghost"
            onClick={onBack}
            className="flex items-center space-x-2 mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to search results</span>
          </Button>
          
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl mb-2">{property.title}</h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 fill-blue-600 text-blue-600" />
                  <span className="font-medium">{property.rating}</span>
                  <span className="text-gray-600">(1,247 reviews)</span>
                </div>
                <Badge variant="secondary">Excellent location</Badge>
              </div>
              <div className="flex items-center text-gray-600">
                <MapPin className="w-4 h-4 mr-1" />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-96">
                  <ImageWithFallback
                    src={propertyImages[selectedImageIndex]}
                    alt={property.title}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-6 gap-2">
                    {propertyImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`relative h-16 rounded overflow-hidden ${
                          selectedImageIndex === index ? 'ring-2 ring-blue-600' : ''
                        }`}
                      >
                        <ImageWithFallback
                          src={image}
                          alt={`View ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About this property</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">
                      {property.description || 'Experience luxury and comfort at this exceptional property. Located in the heart of the city, our hotel offers world-class amenities, spacious rooms, and outstanding service. Whether you\'re traveling for business or pleasure, you\'ll find everything you need for a memorable stay.'}
                    </p>
                    <Separator className="my-6" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">15 min</div>
                        <div className="text-sm text-gray-600">to airport</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">5 min</div>
                        <div className="text-sm text-gray-600">to city center</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">24/7</div>
                        <div className="text-sm text-gray-600">front desk</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">Free</div>
                        <div className="text-sm text-gray-600">cancellation</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities">
                <Card>
                  <CardHeader>
                    <CardTitle>Property amenities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => {
                        const Icon = amenity.icon;
                        return (
                          <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                            <Icon className="w-5 h-5 text-blue-600" />
                            <span className="text-sm">{amenity.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="rooms">
                <div className="space-y-4">
                  {rooms.map((room) => (
                    <Card key={room.id}>
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl mb-2">{room.name}</h3>
                            <p className="text-gray-600 mb-3">{room.description}</p>
                            <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                              <div className="flex items-center space-x-1">
                                <Maximize className="w-4 h-4" />
                                <span>{room.size}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Users className="w-4 h-4" />
                                <span>Up to {room.maxGuests} guests</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Bed className="w-4 h-4" />
                                <span>{room.bedType}</span>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map((amenity, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold mb-1">${room.price}</div>
                            <div className="text-sm text-gray-600 mb-3">per night</div>
                            <div className="text-sm text-green-600 mb-3">
                              {room.available} room{room.available !== 1 ? 's' : ''} left
                            </div>
                            <Button 
                              onClick={() => onBookRoom({ ...property, room, totalPrice: room.price })}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Reserve
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="reviews">
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>Guest reviews</span>
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 fill-blue-600 text-blue-600" />
                          <span className="text-xl font-bold">{property.rating}</span>
                          <span className="text-gray-600">(1,247 reviews)</span>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                        <div className="md:col-span-2">
                          <div className="space-y-2">
                            {[5, 4, 3, 2, 1].map((rating) => (
                              <div key={rating} className="flex items-center space-x-2">
                                <span className="text-sm w-8">{rating}</span>
                                <div className="flex-1 bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-blue-600 h-2 rounded-full" 
                                    style={{ width: `${rating === 5 ? 70 : rating === 4 ? 20 : rating === 3 ? 8 : rating === 2 ? 1 : 1}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm text-gray-600 w-8">
                                  {rating === 5 ? 873 : rating === 4 ? 249 : rating === 3 ? 100 : rating === 2 ? 15 : 10}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="md:col-span-3">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="flex justify-between">
                              <span>Cleanliness</span>
                              <span className="font-medium">9.2</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Comfort</span>
                              <span className="font-medium">9.0</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Location</span>
                              <span className="font-medium">9.5</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Staff</span>
                              <span className="font-medium">9.3</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Value for money</span>
                              <span className="font-medium">8.8</span>
                            </div>
                            <div className="flex justify-between">
                              <span>WiFi</span>
                              <span className="font-medium">9.1</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <div className="space-y-4">
                    {reviews.map((review) => (
                      <Card key={review.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <div className="font-medium">{review.author}</div>
                              <div className="text-sm text-gray-600">{review.date}</div>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{review.rating}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 mb-3">{review.comment}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-600">
                            <button className="flex items-center space-x-1 hover:text-blue-600">
                              <Check className="w-4 h-4" />
                              <span>Helpful ({review.helpful})</span>
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Property highlights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Free cancellation</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">No prepayment needed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Book now, pay at property</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm">Best price guarantee</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="text-center">
                  <div className="text-sm text-gray-600 mb-2">Starting from</div>
                  <div className="text-3xl font-bold text-blue-600">${property.price}</div>
                  <div className="text-sm text-gray-600">per night</div>
                </div>
                
                <Button 
                  size="lg" 
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  onClick={() => onBookRoom({ ...property, room: rooms[0], totalPrice: property.price })}
                >
                  Check availability
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}