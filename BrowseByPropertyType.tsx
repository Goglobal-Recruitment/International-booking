import { ImageWithFallback } from './figma/ImageWithFallback';

interface BrowseByPropertyTypeProps {
  activeTab: string;
}

export function BrowseByPropertyType({ activeTab }: BrowseByPropertyTypeProps) {
  if (activeTab !== 'stays') return null;

  const propertyTypes = [
    {
      name: 'Hotels',
      image: 'https://images.unsplash.com/photo-1731336478850-6bce7235e320?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3RlbCUyMHJvb20lMjBsdXh1cnklMjBiZWR8ZW58MXx8fHwxNzU4MzU4NzI3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Apartments',
      image: 'https://images.unsplash.com/photo-1603072845032-7b5bd641a82a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBtb2Rlcm4lMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc1ODM1ODczMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Resorts',
      image: 'https://images.unsplash.com/photo-1695173849152-c506198aaf90?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXNvcnQlMjBwb29sJTIwdmFjYXRpb258ZW58MXx8fHwxNzU4Mjc4MTg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`
    },
    {
      name: 'Villas',
      image: 'https://images.unsplash.com/photo-1679364297777-1db77b6199be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWxsYSUyMGx1eHVyeSUyMGhvbWUlMjBleHRlcmlvcnxlbnwxfHx8fDE3NTgyNTU0MDZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral' + `?not-from-cache-please=${Date.now()}`
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Browse by property type</h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {propertyTypes.map((property, index) => (
          <div key={index} className="relative group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg">
              <ImageWithFallback
                src={property.image}
                alt={property.name}
                className="w-full h-40 md:h-48 object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="font-bold text-lg">{property.name}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}