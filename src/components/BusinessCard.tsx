
import React from 'react';
import { Star, MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Business {
  id: number;
  name: string;
  category: string;
  location: string;
  rating: number;
  reviewCount: number;
  image: string;
  description: string;
  address: string;
}

interface BusinessCardProps {
  business: Business;
  onReviewClick: () => void;
}

export const BusinessCard: React.FC<BusinessCardProps> = ({ business, onReviewClick }) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Star key="half" size={16} className="fill-yellow-400/50 text-yellow-400" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale">
      <div className="relative">
        <img
          src={business.image}
          alt={business.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="absolute top-2 right-2 bg-blue-600 hover:bg-blue-700">
          {business.category}
        </Badge>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
            {business.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            {renderStars(business.rating)}
          </div>
          <span className="font-medium text-gray-700">{business.rating}</span>
          <span className="text-gray-500">({business.reviewCount} reviews)</span>
        </div>

        <div className="flex items-center gap-2 mb-4 text-gray-600">
          <MapPin size={16} />
          <span className="text-sm">{business.address}</span>
        </div>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {business.description}
        </p>

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-gray-50"
          >
            View Details
          </Button>
          <Button 
            size="sm" 
            onClick={onReviewClick}
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            <MessageCircle size={16} className="mr-1" />
            Write Review
          </Button>
        </div>
      </div>
    </div>
  );
};
