import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';

interface OffersSectionProps {
  activeTab: string;
}

export function OffersSection({ activeTab }: OffersSectionProps) {
  const offers = [
    {
      id: 1,
      tag: 'Quick escapes, sparkling times',
      title: 'Fly away to your dream holiday',
      description: 'Get inspired, compare and book flights with more flexibility',
      buttonText: 'Search for flights',
      image: 'https://images.unsplash.com/photo-1647363377737-8d0ad7c2f494?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhaXJwbGFuZSUyMGZseWluZyUyMGJsdWUlMjBza3klMjBjbG91ZHN8ZW58MXx8fHwxNzU4MzAwOTA4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isWide: true
    },
    {
      id: 2,
      tag: '',
      title: 'Take your longest holiday yet',
      description: 'Browse properties offering long-term stays, many at reduced monthly rates.',
      buttonText: 'Find a stay',
      image: 'https://images.unsplash.com/photo-1561027509-ec65ce5574f9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXNvcnQlMjBob3RlbCUyMFNvdXRoJTIwQWZyaWNhfGVufDF8fHx8MTc1ODM1ODY3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      isWide: false
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Offers</h2>
        <p className="text-gray-600">Promotions, deals and special offers for you</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Wide offer */}
        <div className="lg:col-span-2 relative group cursor-pointer rounded-lg overflow-hidden">
          <div className="relative h-64">
            <ImageWithFallback
              src={offers[0].image}
              alt={offers[0].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-center">
              <div className="text-white max-w-md">
                {offers[0].tag && (
                  <p className="text-sm opacity-90 mb-2">{offers[0].tag}</p>
                )}
                <h3 className="text-2xl font-bold mb-3">{offers[0].title}</h3>
                <p className="text-sm opacity-90 mb-4">{offers[0].description}</p>
                <Button 
                  className="bg-[#0071c2] hover:bg-[#005799] text-white w-fit"
                  size="sm"
                >
                  {offers[0].buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Regular offer */}
        <div className="relative group cursor-pointer rounded-lg overflow-hidden">
          <div className="relative h-64">
            <ImageWithFallback
              src={offers[1].image}
              alt={offers[1].title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <div className="text-white">
                <h3 className="text-lg font-bold mb-2">{offers[1].title}</h3>
                <p className="text-sm opacity-90 mb-3">{offers[1].description}</p>
                <Button 
                  className="bg-[#0071c2] hover:bg-[#005799] text-white w-fit"
                  size="sm"
                >
                  {offers[1].buttonText}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}