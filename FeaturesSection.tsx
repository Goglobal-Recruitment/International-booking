import { Search, CreditCard, Calendar, Shield, Star, Globe } from 'lucide-react';

interface FeaturesSectionProps {
  activeTab?: string;
}

export function FeaturesSection({ activeTab = 'stays' }: FeaturesSectionProps) {
  const getFeatures = () => {
    switch (activeTab) {
      case 'flights':
        return [
          {
            icon: Search,
            title: 'Search a huge selection',
            description: 'Easily compare flights, airlines and prices – all in one place',
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
          },
          {
            icon: CreditCard,
            title: 'Pay no hidden fees',
            description: 'Get a clear price breakdown, every step of the way',
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
          },
          {
            icon: Calendar,
            title: 'Get more flexibility',
            description: 'Change your travel dates with the Flexible ticket option*',
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
          }
        ];
      case 'cars':
        return [
          {
            icon: Search,
            title: 'Wide selection of cars',
            description: 'From economy to luxury, find the perfect car for your trip',
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600'
          },
          {
            icon: Shield,
            title: 'Free cancellation',
            description: 'Cancel up to 48 hours before pickup for free',
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600'
          },
          {
            icon: Star,
            title: 'Quality guaranteed',
            description: 'All our partners are verified car rental companies',
            bgColor: 'bg-yellow-100',
            iconColor: 'text-yellow-600'
          }
        ];
      case 'attractions':
        return [
          {
            icon: Globe,
            title: 'Discover experiences',
            description: 'Find unique attractions and activities around the world',
            bgColor: 'bg-pink-100',
            iconColor: 'text-pink-600'
          },
          {
            icon: CreditCard,
            title: 'Skip the lines',
            description: 'Book ahead and skip the ticket lines at popular attractions',
            bgColor: 'bg-indigo-100',
            iconColor: 'text-indigo-600'
          },
          {
            icon: Shield,
            title: 'Flexible booking',
            description: 'Free cancellation on most experiences',
            bgColor: 'bg-red-100',
            iconColor: 'text-red-600'
          }
        ];
      case 'taxis':
        return [
          {
            icon: Shield,
            title: 'Reliable transfers',
            description: 'Professional drivers and quality vehicles guaranteed',
            bgColor: 'bg-teal-100',
            iconColor: 'text-teal-600'
          },
          {
            icon: CreditCard,
            title: 'Fixed prices',
            description: 'No surge pricing or hidden costs, pay what you see',
            bgColor: 'bg-orange-100',
            iconColor: 'text-orange-600'
          },
          {
            icon: Calendar,
            title: 'Book in advance',
            description: 'Secure your transfer before you travel for peace of mind',
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
          }
        ];
      default:
        return [
          {
            icon: Search,
            title: 'Search millions of stays',
            description: 'From hotels to homes, find accommodation for every trip',
            bgColor: 'bg-blue-100',
            iconColor: 'text-blue-600'
          },
          {
            icon: CreditCard,
            title: 'Best price guarantee',
            description: 'Find a lower price? We\'ll match it and give you an extra discount',
            bgColor: 'bg-green-100',
            iconColor: 'text-green-600'
          },
          {
            icon: Shield,
            title: 'Free cancellation',
            description: 'Most bookings can be cancelled free of charge',
            bgColor: 'bg-purple-100',
            iconColor: 'text-purple-600'
          }
        ];
    }
  };

  const features = getFeatures();

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-full flex items-center justify-center mb-4 mx-auto`}>
                  <Icon className={`h-8 w-8 ${feature.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {activeTab === 'flights' && (
          <p className="text-xs text-gray-500 mt-8 text-center max-w-3xl mx-auto">
            *Flexible plane tickets are available for an additional cost on selected airfares.
          </p>
        )}

        {activeTab === 'stays' && (
          <div className="mt-12 text-center">
            <p className="text-sm text-gray-600 mb-4">
              Join over 1 billion trips booked with Booking.com
            </p>
            <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <span>✓ 28+ million listings</span>
              <span>✓ 220+ countries & territories</span>
              <span>✓ 24/7 customer support</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}