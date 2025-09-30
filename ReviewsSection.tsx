import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Star, ThumbsUp, Flag, ChevronDown, ChevronUp } from 'lucide-react';
import { Avatar, AvatarFallback } from './ui/avatar';

interface Review {
  id: number;
  author: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  verified: boolean;
  country: string;
  tripType: string;
  stayDuration: string;
  pros: string[];
  cons: string[];
}

interface ReviewsSectionProps {
  propertyId: number;
  averageRating: number;
  totalReviews: number;
  reviews: Review[];
}

export function ReviewsSection({ propertyId, averageRating, totalReviews, reviews: initialReviews }: ReviewsSectionProps) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [sortBy, setSortBy] = useState('recent');
  const [filterBy, setFilterBy] = useState('all');
  const [showAll, setShowAll] = useState(false);
  const [expandedReviews, setExpandedReviews] = useState<Set<number>>(new Set());

  const ratingsBreakdown = [
    { stars: 5, count: 847, percentage: 68 },
    { stars: 4, count: 249, percentage: 20 },
    { stars: 3, count: 100, percentage: 8 },
    { stars: 2, count: 25, percentage: 2 },
    { stars: 1, count: 26, percentage: 2 }
  ];

  const categoryRatings = [
    { category: 'Cleanliness', rating: 9.2 },
    { category: 'Comfort', rating: 9.0 },
    { category: 'Location', rating: 9.5 },
    { category: 'Facilities', rating: 8.8 },
    { category: 'Staff', rating: 9.3 },
    { category: 'Value for money', rating: 8.6 },
    { category: 'WiFi', rating: 9.1 }
  ];

  const toggleReviewExpansion = (reviewId: number) => {
    const newExpanded = new Set(expandedReviews);
    if (newExpanded.has(reviewId)) {
      newExpanded.delete(reviewId);
    } else {
      newExpanded.add(reviewId);
    }
    setExpandedReviews(newExpanded);
  };

  const handleHelpful = (reviewId: number) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, helpful: review.helpful + 1 }
        : review
    ));
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 5);

  const renderStars = (rating: number, size: 'sm' | 'md' | 'lg' = 'md') => {
    const sizeClass = size === 'sm' ? 'w-3 h-3' : size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
    
    return (
      <div className="flex items-center space-x-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`${sizeClass} ${
              i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Overall Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Guest reviews</span>
            <div className="flex items-center space-x-2">
              <Star className="w-6 h-6 fill-blue-600 text-blue-600" />
              <span className="text-2xl font-bold">{averageRating}</span>
              <span className="text-gray-600">({totalReviews.toLocaleString()} reviews)</span>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Rating Breakdown */}
            <div>
              <h4 className="font-medium mb-4">Rating breakdown</h4>
              <div className="space-y-3">
                {ratingsBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center space-x-3">
                    <div className="flex items-center space-x-1 w-16">
                      <span className="text-sm">{item.stars}</span>
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{item.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Category Ratings */}
            <div>
              <h4 className="font-medium mb-4">Review categories</h4>
              <div className="space-y-3">
                {categoryRatings.map((item) => (
                  <div key={item.category} className="flex items-center justify-between">
                    <span className="text-sm">{item.category}</span>
                    <div className="flex items-center space-x-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${(item.rating / 10) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-8">{item.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter and Sort Controls */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border rounded px-3 py-1"
              >
                <option value="recent">Most recent</option>
                <option value="helpful">Most helpful</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium">Filter by:</span>
              <select 
                value={filterBy} 
                onChange={(e) => setFilterBy(e.target.value)}
                className="text-sm border rounded px-3 py-1"
              >
                <option value="all">All reviews</option>
                <option value="5">5 stars</option>
                <option value="4">4 stars</option>
                <option value="3">3 stars</option>
                <option value="2">2 stars</option>
                <option value="1">1 star</option>
                <option value="verified">Verified only</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {displayedReviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const shouldTruncate = review.comment.length > 300;
          
          return (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  {/* Avatar */}
                  <Avatar className="w-12 h-12">
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {review.author.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  {/* Review Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-medium">{review.author}</h4>
                          {review.verified && (
                            <Badge variant="secondary" className="text-xs">
                              Verified
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                          <span>{review.country}</span>
                          <span>•</span>
                          <span>{review.tripType}</span>
                          <span>•</span>
                          <span>{review.stayDuration}</span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        {renderStars(review.rating)}
                        <div className="text-sm text-gray-600 mt-1">{review.date}</div>
                      </div>
                    </div>
                    
                    {/* Review Text */}
                    <div className="mb-4">
                      <p className="text-gray-700 leading-relaxed">
                        {shouldTruncate && !isExpanded 
                          ? `${review.comment.substring(0, 300)}...`
                          : review.comment
                        }
                      </p>
                      
                      {shouldTruncate && (
                        <button
                          onClick={() => toggleReviewExpansion(review.id)}
                          className="text-blue-600 hover:text-blue-700 text-sm mt-2 flex items-center space-x-1"
                        >
                          <span>{isExpanded ? 'Show less' : 'Read more'}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4" />
                          ) : (
                            <ChevronDown className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    {/* Pros and Cons */}
                    {(review.pros.length > 0 || review.cons.length > 0) && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {review.pros.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium text-green-700 mb-2">Liked:</h5>
                            <ul className="text-sm space-y-1">
                              {review.pros.map((pro, index) => (
                                <li key={index} className="text-green-600">• {pro}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {review.cons.length > 0 && (
                          <div>
                            <h5 className="text-sm font-medium text-red-700 mb-2">Disliked:</h5>
                            <ul className="text-sm space-y-1">
                              {review.cons.map((con, index) => (
                                <li key={index} className="text-red-600">• {con}</li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-4 text-sm">
                      <button
                        onClick={() => handleHelpful(review.id)}
                        className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors"
                      >
                        <ThumbsUp className="w-4 h-4" />
                        <span>Helpful ({review.helpful})</span>
                      </button>
                      
                      <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                        <Flag className="w-4 h-4" />
                        <span>Report</span>
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Show More/Less Button */}
      {reviews.length > 5 && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setShowAll(!showAll)}
            className="min-w-32"
          >
            {showAll ? 'Show less' : `Show all ${reviews.length} reviews`}
          </Button>
        </div>
      )}
    </div>
  );
}