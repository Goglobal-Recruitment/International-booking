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
          backgroundColor: '#FF8C00',
          title: "Find the perfect rental car",
          subtitle: "Book your ideal car for any journey"
        };
      case 'attractions':
        return {
          backgroundColor: '#D32F2F',
          title: "Discover amazing attractions",
          subtitle: "Find tickets to the best experiences"
        };
      case 'taxis':
        return {
          backgroundColor: '#FFAB00',
          title: "Book your airport transfer",
          subtitle: "Reliable transfers to and from the airport"
        };
      default:
        return {
          backgroundColor: '#003580',
          title: "Find your next stay",
          subtitle: "Search deals on hotels, homes, and much more..."
        };
    }
  };

  const { backgroundColor, title, subtitle } = getHeroContent();

  return (
    <div 
      className="relative overflow-hidden"
      style={{ 
        background: `linear-gradient(135deg, ${backgroundColor} 0%, ${backgroundColor}cc 100%)`,
        minHeight: activeTab === 'flights' ? '300px' : '200px'
      }}
    >
      <div className="container mx-auto px-4 h-full flex items-center py-12">
        <div className="text-white max-w-2xl">
          <h1 className="text-2xl md:text-4xl mb-3 font-bold">
            {title}
          </h1>
          <p className="text-base md:text-lg opacity-90">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
}