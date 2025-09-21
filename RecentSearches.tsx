import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, MapPin, Users, Calendar, X, Search } from 'lucide-react';

interface SearchEntry {
  id: string;
  type: 'stays' | 'flights' | 'cars';
  destination: string;
  dates: {
    checkIn?: string;
    checkOut?: string;
    depart?: string;
    return?: string;
    pickup?: string;
    dropoff?: string;
  };
  guests?: {
    adults: number;
    children: number;
    rooms: number;
  };
  searchedAt: string;
  fromLocation?: string;
  toLocation?: string;
}

interface RecentSearchesProps {
  user: any;
  onSearchSelect: (search: SearchEntry) => void;
}

export function RecentSearches({ user, onSearchSelect }: RecentSearchesProps) {
  const [recentSearches, setRecentSearches] = useState<SearchEntry[]>([]);
  const [showAll, setShowAll] = useState(false);

  // Mock recent searches - in a real app, this would come from user's search history
  useEffect(() => {
    if (user) {
      const mockSearches: SearchEntry[] = [
        {
          id: '1',
          type: 'stays',
          destination: 'Paris, France',
          dates: {
            checkIn: '2024-12-25',
            checkOut: '2024-12-30'
          },
          guests: {
            adults: 2,
            children: 0,
            rooms: 1
          },
          searchedAt: '2024-12-18T10:30:00Z'
        },
        {
          id: '2',
          type: 'flights',
          destination: 'Tokyo, Japan',
          fromLocation: 'New York, USA',
          toLocation: 'Tokyo, Japan',
          dates: {
            depart: '2025-01-15',
            return: '2025-01-25'
          },
          searchedAt: '2024-12-17T14:20:00Z'
        },
        {
          id: '3',
          type: 'cars',
          destination: 'Los Angeles, USA',
          dates: {
            pickup: '2024-12-22',
            dropoff: '2024-12-26'
          },
          searchedAt: '2024-12-16T09:15:00Z'
        },
        {
          id: '4',
          type: 'stays',
          destination: 'London, UK',
          dates: {
            checkIn: '2025-02-10',
            checkOut: '2025-02-15'
          },
          guests: {
            adults: 1,
            children: 0,
            rooms: 1
          },
          searchedAt: '2024-12-15T16:45:00Z'
        },
        {
          id: '5',
          type: 'flights',
          destination: 'Barcelona, Spain',
          fromLocation: 'London, UK',
          toLocation: 'Barcelona, Spain',
          dates: {
            depart: '2025-03-08',
            return: '2025-03-15'
          },
          searchedAt: '2024-12-14T11:30:00Z'
        }
      ];
      setRecentSearches(mockSearches);
    }
  }, [user]);

  const handleRemoveSearch = (searchId: string) => {
    setRecentSearches(prev => prev.filter(search => search.id !== searchId));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== new Date().getFullYear() ? 'numeric' : undefined
    });
  };

  const formatSearchedAt = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'stays':
        return '🏨';
      case 'flights':
        return '✈️';
      case 'cars':
        return '🚗';
      default:
        return '🔍';
    }
  };

  const displayedSearches = showAll ? recentSearches : recentSearches.slice(0, 3);

  if (!user || recentSearches.length === 0) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Recent searches</span>
              </CardTitle>
              {recentSearches.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setRecentSearches([])}
                  className="text-gray-500 hover:text-red-600"
                >
                  Clear all
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            <div className="space-y-3">
              {displayedSearches.map((search) => (
                <div
                  key={search.id}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50 transition-colors group cursor-pointer"
                  onClick={() => onSearchSelect(search)}
                >
                  <div className="flex-1">
                    <div className="flex items-start space-x-3">
                      <div className="text-2xl">{getTypeIcon(search.type)}</div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <Badge variant="outline" className="text-xs">
                            {search.type === 'stays' ? 'Hotel' : search.type === 'flights' ? 'Flight' : 'Car rental'}
                          </Badge>
                          <span className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {formatSearchedAt(search.searchedAt)}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <MapPin className="w-4 h-4 text-gray-400" />
                          {search.type === 'flights' ? (
                            <span className="font-medium text-gray-900">
                              {search.fromLocation} → {search.toLocation}
                            </span>
                          ) : (
                            <span className="font-medium text-gray-900">{search.destination}</span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            {search.type === 'stays' && search.dates.checkIn && search.dates.checkOut && (
                              <span>
                                {formatDate(search.dates.checkIn)} - {formatDate(search.dates.checkOut)}
                              </span>
                            )}
                            {search.type === 'flights' && search.dates.depart && (
                              <span>
                                {formatDate(search.dates.depart)}
                                {search.dates.return && ` - ${formatDate(search.dates.return)}`}
                              </span>
                            )}
                            {search.type === 'cars' && search.dates.pickup && search.dates.dropoff && (
                              <span>
                                {formatDate(search.dates.pickup)} - {formatDate(search.dates.dropoff)}
                              </span>
                            )}
                          </div>
                          
                          {search.guests && (
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>
                                {search.guests.adults} adult{search.guests.adults !== 1 ? 's' : ''}
                                {search.guests.children > 0 && `, ${search.guests.children} child${search.guests.children !== 1 ? 'ren' : ''}`}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSearchSelect(search);
                      }}
                    >
                      <Search className="w-4 h-4" />
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 hover:text-red-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveSearch(search.id);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            
            {recentSearches.length > 3 && (
              <div className="mt-4 text-center">
                <Button
                  variant="outline"
                  onClick={() => setShowAll(!showAll)}
                  className="min-w-32"
                >
                  {showAll ? 'Show less' : `Show all ${recentSearches.length} searches`}
                </Button>
              </div>
            )}
            
            {recentSearches.length === 0 && (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent searches yet</p>
                <p className="text-sm text-gray-400">Your search history will appear here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}