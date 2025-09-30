import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader } from './ui/card';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { ChevronLeft, Check, ChevronDown } from 'lucide-react';

interface FlightBookingFlowProps {
  flight: any;
  onBack: () => void;
  onContinue: (bookingData: any) => void;
}

export function FlightBookingFlow({ flight, onBack, onContinue }: FlightBookingFlowProps) {
  const [selectedTicket, setSelectedTicket] = useState('standard');
  const [step, setStep] = useState(1); // 1 = Ticket type, 2 = Details, 3 = Extras
  const [travelerDetails, setTravelerDetails] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    countryCode: '+27'
  });
  const [mealChoice, setMealChoice] = useState('lactose-free');

  const ticketTypes = [
    {
      id: 'standard',
      name: 'Standard ticket',
      totalPrice: 946.89,
      features: [
        'Cheapest price',
        'No need to check-in - you\'re sure about your plans',
        'No change fees - pay only the fare difference'
      ],
      badge: 'Cheapest price',
      badgeColor: 'bg-gray-500'
    },
    {
      id: 'flexible',
      name: 'Flexible ticket',
      totalPrice: 1069.66,
      originalTotalPrice: 1122.77,
      features: [
        'Change your flight time or date once up to 24 hours before departure time',
        'Travel with the same airline and route as originally booked',
        'We\'ll alert you with any fare difference payment and confirm your new flight',
        'Pay the fee difference by phone 24 hours before departure time',
        'We\'ll give available flights that match your change request'
      ],
      badge: 'Popular with travellers',
      badgeColor: 'bg-[#0071c2]'
    }
  ];

  const selectedTicketData = ticketTypes.find(t => t.id === selectedTicket);

  const handleContinue = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      onContinue({
        ...flight,
        ticketType: selectedTicket,
        totalPrice: selectedTicketData?.totalPrice,
        travelerDetails,
        mealChoice,
        type: 'flight',
        title: `${flight.airline || 'Flight'} ${flight.flightNumber || ''}`,
        description: `${flight.departure?.city || 'Johannesburg'} to ${flight.arrival?.city || 'Sydney'}`
      });
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      onBack();
    }
  };

  // Step indicators
  const steps = [
    { number: 1, title: 'Ticket type', active: step >= 1, completed: step > 1 },
    { number: 2, title: 'Your details', active: step >= 2, completed: step > 2 },
    { number: 3, title: 'Extras', active: step >= 3, completed: step > 3 },
    { number: 4, title: 'Select your seat', active: step >= 4, completed: step > 4 },
    { number: 5, title: 'Check and pay', active: step >= 5, completed: step > 5 }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Booking.com Header */}
      <div className="bg-[#003580] text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <h1 className="text-lg font-bold">Booking.com</h1>
          <div className="flex items-center space-x-4 text-sm">
            <span>🏳️‍🌈 ZAR</span>
            <Button variant="outline" size="sm" className="text-[#003580] bg-white">Register</Button>
            <Button variant="outline" size="sm" className="text-[#003580] bg-white">Sign in</Button>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center space-x-8">
            {steps.map((stepItem, index) => (
              <div key={stepItem.number} className="flex items-center">
                <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                  stepItem.completed 
                    ? 'bg-[#0071c2] text-white' 
                    : stepItem.active 
                    ? 'bg-[#0071c2] text-white' 
                    : 'bg-gray-300 text-gray-600'
                }`}>
                  {stepItem.completed ? <Check className="w-4 h-4" /> : stepItem.number}
                </div>
                <span className={`ml-2 text-sm ${stepItem.active ? 'text-gray-900 font-medium' : 'text-gray-500'}`}>
                  {stepItem.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="max-w-5xl mx-auto">
          {/* Flight Route Info */}
          <div className="mb-6">
            <div className="text-sm text-gray-600 mb-2">One-way • 1 traveller • Fri, Nov 14</div>
            <h1 className="text-2xl font-bold text-gray-900">
              Johannesburg to Sydney
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Step 1: Ticket Type Selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-4">Select your ticket type</h2>
                    
                    <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket} className="space-y-4">
                      {ticketTypes.map((ticket) => (
                        <div key={ticket.id} className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                          selectedTicket === ticket.id ? 'border-[#0071c2] bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}>
                          <div className="flex items-start space-x-3">
                            <RadioGroupItem value={ticket.id} id={ticket.id} className="mt-1" />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <Label htmlFor={ticket.id} className="text-lg font-semibold cursor-pointer">
                                    {ticket.name}
                                  </Label>
                                  <Badge className={`${ticket.badgeColor} text-white text-xs px-2 py-1`}>
                                    {ticket.badge}
                                  </Badge>
                                </div>
                              </div>
                              
                              <ul className="space-y-2 text-sm text-gray-700 mb-4">
                                {ticket.features.map((feature, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="text-green-600 mr-2 mt-0.5">✓</span>
                                    <span>{feature}</span>
                                  </li>
                                ))}
                              </ul>

                              {ticket.id === 'flexible' && (
                                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                                  <h4 className="font-medium text-gray-900 mb-2">How to make a change</h4>
                                  <div className="space-y-2 text-sm text-gray-700">
                                    <div className="flex items-start">
                                      <span className="text-blue-600 mr-2">📞</span>
                                      <span>Contact our Customer Service via live chat or phone 24 hours before departure time</span>
                                    </div>
                                    <div className="flex items-start">
                                      <span className="text-blue-600 mr-2">✈️</span>
                                      <span>We'll check available flights that match your change request</span>
                                    </div>
                                    <div className="flex items-start">
                                      <span className="text-blue-600 mr-2">💳</span>
                                      <span>We'll assist you with any fare difference payment and confirm your new flight</span>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>

                    <Button
                      onClick={handleContinue}
                      className="w-full mt-6 bg-[#0071c2] hover:bg-[#005799] text-white py-3 text-base"
                      size="lg"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 2: Traveler Details */}
              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-2">Enter your details</h2>
                    <p className="text-gray-600 mb-6">Add traveller details and review baggage options</p>
                    
                    <div className="space-y-6">
                      {/* Traveler Info */}
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 bg-[#0071c2] rounded-full flex items-center justify-center text-white font-medium">
                          1
                        </div>
                        <div>
                          <p className="font-medium">as as</p>
                          <p className="text-sm text-gray-600">Male</p>
                        </div>
                        <div className="ml-auto">
                          <Check className="w-5 h-5 text-green-600" />
                        </div>
                      </div>

                      <Button variant="outline" className="w-full text-[#0071c2] border-[#0071c2]">
                        Edit this traveller's details
                      </Button>

                      {/* Baggage Info */}
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs">👜</span>
                          </div>
                          <div>
                            <p className="font-medium">1 personal item</p>
                            <p className="text-sm text-gray-600">Included</p>
                            <p className="text-xs text-gray-500">Fits under the seat in front of you</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs">💼</span>
                          </div>
                          <div>
                            <p className="font-medium">1 carry-on bag</p>
                            <p className="text-sm text-gray-600">Included</p>
                            <p className="text-xs text-gray-500">23 x 36 x 56 cm • 7 kg</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs">🧳</span>
                          </div>
                          <div>
                            <p className="font-medium">1 checked bag</p>
                            <p className="text-sm text-gray-600">Included</p>
                            <p className="text-xs text-gray-500">23 kg</p>
                          </div>
                        </div>
                      </div>

                      {/* Contact Details */}
                      <div className="space-y-4">
                        <h3 className="font-semibold">Contact details</h3>
                        <p className="text-sm text-red-600">* Required</p>
                        
                        <div>
                          <Label htmlFor="email" className="text-sm">Contact email *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={travelerDetails.email}
                            onChange={(e) => setTravelerDetails(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="as@gmail.com"
                            className="mt-1"
                          />
                          <p className="text-xs text-gray-600 mt-1">We'll send your flight confirmation here</p>
                        </div>

                        <div>
                          <Label htmlFor="phone" className="text-sm">Phone number *</Label>
                          <div className="flex space-x-2 mt-1">
                            <Select value={travelerDetails.countryCode} onValueChange={(value) => setTravelerDetails(prev => ({ ...prev, countryCode: value }))}>
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="+27">🇿🇦</SelectItem>
                                <SelectItem value="+1">🇺🇸</SelectItem>
                                <SelectItem value="+44">🇬🇧</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input
                              id="phone"
                              type="tel"
                              value={travelerDetails.phone}
                              onChange={(e) => setTravelerDetails(prev => ({ ...prev, phone: e.target.value }))}
                              placeholder="0846563970"
                              className="flex-1"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-4 mt-8">
                      <Button variant="outline" onClick={handleBack} className="text-[#0071c2]">
                        Back
                      </Button>
                      <Button
                        onClick={handleContinue}
                        className="flex-1 bg-[#0071c2] hover:bg-[#005799] text-white"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Extras */}
              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold mb-6">Meal choice</h2>
                    <p className="text-gray-600 mb-6">Request dietary preferences</p>
                    
                    <div>
                      <Label htmlFor="meal" className="text-sm font-medium">as as</Label>
                      <Select value={mealChoice} onValueChange={setMealChoice}>
                        <SelectTrigger className="w-full mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lactose-free">Lactose-free - Free</SelectItem>
                          <SelectItem value="vegetarian">Vegetarian - Free</SelectItem>
                          <SelectItem value="vegan">Vegan - Free</SelectItem>
                          <SelectItem value="halal">Halal - Free</SelectItem>
                          <SelectItem value="kosher">Kosher - Free</SelectItem>
                          <SelectItem value="gluten-free">Gluten-free - Free</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex space-x-4 mt-8">
                      <Button variant="outline" onClick={handleBack} className="text-[#0071c2]">
                        Back
                      </Button>
                      <Button
                        onClick={handleContinue}
                        className="flex-1 bg-[#0071c2] hover:bg-[#005799] text-white"
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Price Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-4">
                <CardHeader>
                  <h3 className="font-semibold">Price details</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm">
                        <span>Flight</span>
                        <span>Adult (1)</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span></span>
                        <div className="text-right">
                          <div>ZAR{selectedTicketData?.totalPrice.toFixed(2)}</div>
                          <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                        </div>
                      </div>
                    </div>
                    
                    {step >= 3 && (
                      <div>
                        <div className="flex justify-between text-sm">
                          <span>Extras</span>
                          <span></span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">{selectedTicket === 'flexible' ? 'Flexible ticket' : 'Standard ticket'}</span>
                          <div className="text-right">
                            <div className="text-sm">ZAR{selectedTicket === 'flexible' ? '1,122.77' : '0.00'}</div>
                            <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <Separator />
                    
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>ZAR{selectedTicket === 'flexible' ? '10,069.66' : (selectedTicketData?.totalPrice || 946.89).toFixed(2)}</span>
                    </div>
                    
                    <p className="text-xs text-gray-600">Includes taxes and fees</p>
                    
                    <div className="flex items-center text-sm text-gray-600">
                      <ChevronDown className="w-4 h-4 mr-1" />
                      <span>No hidden fees – track your price at every step</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}