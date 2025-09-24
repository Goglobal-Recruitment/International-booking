import { ImageWithFallback } from './figma/ImageWithFallback';

interface TrendingDestinationsProps {
  activeTab: string;
}

export function TrendingDestinations({ activeTab }: TrendingDestinationsProps) {
  const trendingDestinations = [
    {
      name: 'Cape Town',
      distance: '~',
      image: 'https://images.unsplash.com/photo-1679128991434-0c2e03d61bc5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYXBlJTIwVG93biUyMFNvdXRoJTIwQWZyaWNhJTIwc2t5bGluZSUyMFRhYmxlJTIwTW91bnRhaW58ZW58MXx8fHwxNzU4MzU4NjQzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`,
      isLarge: true
    },
    {
      name: 'Durban',
      distance: '~',
      image: 'https://images.unsplash.com/photo-1714573071461-7ba1c1d14982?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEdXJiYW4lMjBTb3V0aCUyMEFmcmljYSUyMGJlYWNoZnJvbnR8ZW58MXx8fHwxNzU4MzU4NjQ3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`,
      isLarge: true
    },
    {
      name: 'Johannesburg',
      distance: '~',
      image: 'https://images.unsplash.com/photo-1636706519609-988babca3dd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxKb2hhbm5lc2J1cmclMjBTb3V0aCUyMEFmcmljYSUyMHNreWxpbmV8ZW58MXx8fHwxNzU4MzU4NjUyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Pretoria',
      distance: '~',
      image: 'https://images.unsplash.com/photo-1646502407568-5a58572c5b3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxQcmV0b3JpYSUyMFNvdXRoJTIwQWZyaWNhJTIwVW5pb24lMjBCdWlsZGluZ3N8ZW58MXx8fHwxNzU4MzU4NjU2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Bloemfontein',
      distance: '~',
      image: 'https://images.unsplash.com/photo-1653505914751-93e8ac1123be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxCbG9lbWZvbnRlaW4lMjBTb3V0aCUyMEFmcmljYSUyMGNpdHlzY2FwZXxlbnwxfHx8fDE3NTgzNTg2NjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Trending destinations</h2>
        <p className="text-gray-600">Most popular choices for travellers from South Africa</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Cape Town - Large */}
        <div className="md:row-span-2 relative group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg h-64 md:h-80">
            <ImageWithFallback
              src={trendingDestinations[0].image}
              alt={trendingDestinations[0].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-xl">{trendingDestinations[0].name}</h3>
              <p className="text-sm opacity-90">{trendingDestinations[0].distance}</p>
            </div>
          </div>
        </div>

        {/* Durban - Large */}
        <div className="md:row-span-2 relative group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg h-64 md:h-80">
            <ImageWithFallback
              src={trendingDestinations[1].image}
              alt={trendingDestinations[1].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 text-white">
              <h3 className="font-bold text-xl">{trendingDestinations[1].name}</h3>
              <p className="text-sm opacity-90">{trendingDestinations[1].distance}</p>
            </div>
          </div>
        </div>

        {/* Johannesburg - Small */}
        <div className="md:col-span-2 relative group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg h-32 md:h-36">
            <ImageWithFallback
              src={trendingDestinations[2].image}
              alt={trendingDestinations[2].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-bold text-lg">{trendingDestinations[2].name}</h3>
              <p className="text-xs opacity-90">{trendingDestinations[2].distance}</p>
            </div>
          </div>
        </div>

        {/* Pretoria - Small */}
        <div className="relative group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg h-32 md:h-36">
            <ImageWithFallback
              src={trendingDestinations[3].image}
              alt={trendingDestinations[3].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-bold text-base">{trendingDestinations[3].name}</h3>
              <p className="text-xs opacity-90">{trendingDestinations[3].distance}</p>
            </div>
          </div>
        </div>

        {/* Bloemfontein - Small */}
        <div className="relative group cursor-pointer">
          <div className="relative overflow-hidden rounded-lg h-32 md:h-36">
            <ImageWithFallback
              src={trendingDestinations[4].image}
              alt={trendingDestinations[4].name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 text-white">
              <h3 className="font-bold text-base">{trendingDestinations[4].name}</h3>
              <p className="text-xs opacity-90">{trendingDestinations[4].distance}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}