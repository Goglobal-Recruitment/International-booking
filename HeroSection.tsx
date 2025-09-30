import { ImageWithFallback } from './figma/ImageWithFallback';

interface HeroSectionProps {
  activeTab?: string;
}

export function HeroSection({ activeTab = 'stays' }: HeroSectionProps) {
  const getHeroContent = () => {
    switch (activeTab) {
      case 'flights':
        return {
          backgroundColor: '#003580',
          title: "Discover your next flight",
          subtitle: "Discover your next dream destination"
        };
      case 'cars':
        return {
          backgroundColor: '#0071c2',
          title: "Find the perfect rental car",
          subtitle: "Book your ideal car for any journey"
        };
      case 'attractions':
        return {
          backgroundColor: '#003580',
          title: "Discover amazing attractions",
          subtitle: "Find tickets to the best experiences"
        };
      case 'taxis':
        return {
          backgroundColor: '#0071c2',
          title: "Book your airport transfer",
          subtitle: "Reliable transfers to and from the airport"
        };
      default:
        return {
          backgroundColor: '#003580',
          title: "Find your next stay",
          subtitle: "Search low prices on hotels, homes and much more..."
        };
    }
  };

  const { backgroundColor, title, subtitle } = getHeroContent();

  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}dd 100%)`,
        minHeight: activeTab === 'flights' ? '300px' : '240px'
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center py-16">
        <div className="text-white max-w-3xl space-y-3">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            {title}
          </h1>
          <p className="text-lg md:text-xl opacity-95 leading-relaxed">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}