import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowLeft, Calendar, MapPin, Star } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface BookingManagementProps {
  user: any;
  onBack: () => void;
}

export function BookingManagement({ user, onBack }: BookingManagementProps) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, [user]);

  const fetchBookings = async () => {
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-2c363e8a/bookings`, {
        headers: {
          'Authorization': `Bearer ${user.access_token || publicAnonKey}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        setBookings(result.bookings || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookings:', error);
      // Mock data for demo
      setBookings([
        {
          id: 1,
          type: 'stays',
          title: 'Luxury Resort & Spa',
          description: '5-star resort with ocean view',
          location: 'Maldives',
          price: 299,
          image: 'https://images.unsplash.com/photo-1731080647266-85cf1bc27162?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJlc29ydHxlbnwxfHx8fDE3NTgyNjcwMTd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          status: 'confirmed',
          bookingDate: '2024-12-15',
          checkIn: '2024-12-20',
          checkOut: '2024-12-25'
        },
        {
          id: 2,
          type: 'flights',
          title: 'Emirates Flight EK201',
          description: 'Dubai to New York',
          location: 'DXB → JFK',
          price: 899,
          image: 'https://images.unsplash.com/photo-1710092297904-9a1cd00e29af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZsaWdodCUyMHRyYXZlbHxlbnwxfHx8fDE3NTgxODczNTZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
          status: 'confirmed',
          bookingDate: '2024-12-10',
          departureDate: '2024-12-18',
          departureTime: '14:30'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading your bookings...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <Button
          variant="ghost"
          onClick={onBack}
          className="mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to home
        </Button>

        <h1 className="text-3xl mb-8">My Bookings</h1>

        {bookings.length === 0 ? (
          <Card>
            <CardContent className="text-center py-12">
              <h3 className="text-xl mb-2">No bookings yet</h3>
              <p className="text-gray-600 mb-4">Start planning your next adventure!</p>
              <Button onClick={onBack} className="bg-blue-600 hover:bg-blue-700">
                Search & Book
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <Card key={booking.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
                    <div className="relative h-48 md:h-auto">
                      <ImageWithFallback
                        src={booking.image}
                        alt={booking.title}
                        className="w-full h-full object-cover"
                      />
                      <Badge className={`absolute top-2 right-2 ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </Badge>
                    </div>
                    
                    <div className="md:col-span-3 p-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <div>
                          <h3 className="text-xl mb-1">{booking.title}</h3>
                          <p className="text-gray-600">{booking.description}</p>
                          <div className="flex items-center text-gray-500 text-sm mt-2">
                            <MapPin className="w-4 h-4 mr-1" />
                            {booking.location}
                          </div>
                        </div>
                        
                        <div className="text-right mt-4 md:mt-0">
                          <div className="text-2xl font-bold">${booking.price}</div>
                          <Badge variant="outline" className="mt-1">
                            {booking.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Booking Date</div>
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {booking.bookingDate}
                          </div>
                        </div>
                        
                        {booking.type === 'stays' && (
                          <>
                            <div>
                              <div className="text-gray-500">Check-in</div>
                              <div>{booking.checkIn}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Check-out</div>
                              <div>{booking.checkOut}</div>
                            </div>
                          </>
                        )}
                        
                        {booking.type === 'flights' && (
                          <>
                            <div>
                              <div className="text-gray-500">Departure</div>
                              <div>{booking.departureDate}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Time</div>
                              <div>{booking.departureTime}</div>
                            </div>
                          </>
                        )}
                      </div>

                      <div className="flex space-x-2 mt-4">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {booking.status === 'confirmed' && (
                          <Button variant="outline" size="sm">
                            Modify Booking
                          </Button>
                        )}
                        {booking.status === 'confirmed' && (
                          <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                            Cancel
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}