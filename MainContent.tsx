import { ExploreDestinations } from './ExploreDestinations';
import { TrendingDestinations } from './TrendingDestinations';
import { BrowseByPropertyType } from './BrowseByPropertyType';
import { WeekendDeals } from './WeekendDeals';
import { HomesGuestsLove } from './HomesGuestsLove';
import { OffersSection } from './OffersSection';
import { UniqueProperties } from './UniqueProperties';
import { TravelMoreSpendLess } from './TravelMoreSpendLess';
import { FeaturesSection } from './FeaturesSection';

interface MainContentProps {
  activeTab: string;
  searchResults: any[];
}

export function MainContent({ activeTab, searchResults }: MainContentProps) {
  // Only show these sections when there are no search results
  if (searchResults.length > 0) {
    return null;
  }

  return (
    <div className="bg-white">
      {/* Offers Section */}
      <OffersSection activeTab={activeTab} />
      
      {/* Explore Destinations */}
      <ExploreDestinations activeTab={activeTab} />
      
      {/* Trending Destinations */}
      <TrendingDestinations activeTab={activeTab} />
      
      {/* Browse by Property Type - only for stays */}
      <BrowseByPropertyType activeTab={activeTab} />
      
      {/* Weekend Deals - only for stays */}
      <WeekendDeals activeTab={activeTab} />
      
      {/* Homes Guests Love - only for stays */}
      <HomesGuestsLove activeTab={activeTab} />
      
      {/* Unique Properties - only for stays */}
      <UniqueProperties activeTab={activeTab} />
      
      {/* Features Section - the triple guarantee/benefits */}
      <FeaturesSection activeTab={activeTab} />
      
      {/* Travel More, Spend Less - newsletter signup */}
      <TravelMoreSpendLess activeTab={activeTab} />
    </div>
  );
}