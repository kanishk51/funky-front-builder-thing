
import React, { useState } from 'react';
import { Star, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

interface Business {
  id: number;
  name: string;
  category: string;
  location: string;
}

interface ReviewFormProps {
  business: Business | null;
  onSubmit: (review: any) => void;
  onCancel: () => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ business, onSubmit, onCancel }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [reviewerName, setReviewerName] = useState('');
  const [qualityRating, setQualityRating] = useState(0);
  const [serviceRating, setServiceRating] = useState(0);
  const [valueRating, setValueRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0 || !reviewText.trim() || !reviewerName.trim()) {
      alert('Please fill in all required fields and provide a rating.');
      return;
    }

    const review = {
      businessId: business?.id,
      businessName: business?.name,
      rating,
      qualityRating,
      serviceRating,
      valueRating,
      reviewText,
      reviewerName,
      date: new Date().toISOString(),
    };

    onSubmit(review);
  };

  const renderStarRating = (currentRating: number, onRate: (rating: number) => void, onHover?: (rating: number) => void, onLeave?: () => void) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover && onHover(star)}
            onMouseLeave={() => onLeave && onLeave()}
            className="transition-colors duration-150"
          >
            <Star
              size={24}
              className={`${
                star <= (onHover ? hoverRating : currentRating)
                  ? 'fill-yellow-400 text-yellow-400'
                  : 'text-gray-300'
              } hover:text-yellow-400 cursor-pointer`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!business) return null;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Write a Review</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-800">{business.name}</h3>
        <p className="text-gray-600 text-sm">{business.category} • {business.location}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label className="text-base font-medium text-gray-700 mb-2 block">
            Overall Rating *
          </Label>
          {renderStarRating(
            rating,
            setRating,
            setHoverRating,
            () => setHoverRating(0)
          )}
          <p className="text-sm text-gray-500 mt-1">Click to rate</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Quality
            </Label>
            {renderStarRating(qualityRating, setQualityRating)}
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Service
            </Label>
            {renderStarRating(serviceRating, setServiceRating)}
          </div>
          <div>
            <Label className="text-sm font-medium text-gray-700 mb-2 block">
              Value
            </Label>
            {renderStarRating(valueRating, setValueRating)}
          </div>
        </div>

        <div>
          <Label htmlFor="reviewerName" className="text-base font-medium text-gray-700 mb-2 block">
            Your Name *
          </Label>
          <Input
            id="reviewerName"
            type="text"
            value={reviewerName}
            onChange={(e) => setReviewerName(e.target.value)}
            placeholder="Enter your name"
            className="w-full"
            required
          />
        </div>

        <div>
          <Label htmlFor="reviewText" className="text-base font-medium text-gray-700 mb-2 block">
            Your Review *
          </Label>
          <Textarea
            id="reviewText"
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience with this business..."
            className="w-full min-h-[120px] resize-vertical"
            required
          />
          <p className="text-sm text-gray-500 mt-1">
            {reviewText.length}/500 characters
          </p>
        </div>

        <div>
          <Label className="text-base font-medium text-gray-700 mb-2 block">
            Add Photos (Optional)
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
            <Upload className="mx-auto text-gray-400 mb-2" size={32} />
            <p className="text-gray-600">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
          >
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
};
