
import React, { useState } from 'react';
import { Star, X, Upload, Award, Heart, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

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

  const renderStarRating = (
    currentRating: number,
    onRate: (rating: number) => void,
    onHover?: (rating: number) => void,
    onLeave?: () => void,
    size: 'sm' | 'lg' = 'sm'
  ) => {
    const starSize = size === 'lg' ? 32 : 20;
    
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => onRate(star)}
            onMouseEnter={() => onHover && onHover(star)}
            onMouseLeave={() => onLeave && onLeave()}
            className="transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded"
          >
            <Star
              size={starSize}
              className={`${
                star <= (onHover ? hoverRating : currentRating)
                  ? 'fill-yellow-400 text-yellow-400 drop-shadow-sm'
                  : 'text-gray-300 hover:text-yellow-300'
              } transition-all duration-200 cursor-pointer`}
            />
          </button>
        ))}
      </div>
    );
  };

  if (!business) return null;

  return (
    <div className="p-6 max-h-[90vh] overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-pink-500 rounded-full">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-800">Write a Review</h2>
            <p className="text-gray-600">Share your experience with others</p>
          </div>
        </div>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
        >
          <X size={24} />
        </button>
      </div>

      {/* Business Info Card */}
      <Card className="mb-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500 rounded-full">
              <Award className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-800">{business.name}</h3>
              <p className="text-gray-600">{business.category} • {business.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Overall Rating */}
        <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Heart className="text-orange-500" size={20} />
              <Label className="text-lg font-semibold text-gray-700">
                Overall Rating *
              </Label>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center space-y-4">
              {renderStarRating(
                rating,
                setRating,
                setHoverRating,
                () => setHoverRating(0),
                'lg'
              )}
              <p className="text-sm text-gray-600 font-medium">
                {rating === 0 ? 'Click to rate' : `${rating} out of 5 stars`}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Ratings */}
        <Card className="border-gray-200">
          <CardHeader>
            <Label className="text-lg font-semibold text-gray-700">
              Detailed Ratings (Optional)
            </Label>
            <p className="text-sm text-gray-500">Help others by rating specific aspects</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center space-y-3">
                <div className="p-3 bg-purple-100 rounded-full w-fit mx-auto">
                  <Award className="text-purple-600" size={20} />
                </div>
                <Label className="text-sm font-medium text-gray-700 block">
                  Quality
                </Label>
                {renderStarRating(qualityRating, setQualityRating)}
              </div>
              <div className="text-center space-y-3">
                <div className="p-3 bg-green-100 rounded-full w-fit mx-auto">
                  <Heart className="text-green-600" size={20} />
                </div>
                <Label className="text-sm font-medium text-gray-700 block">
                  Service
                </Label>
                {renderStarRating(serviceRating, setServiceRating)}
              </div>
              <div className="text-center space-y-3">
                <div className="p-3 bg-blue-100 rounded-full w-fit mx-auto">
                  <Sparkles className="text-blue-600" size={20} />
                </div>
                <Label className="text-sm font-medium text-gray-700 block">
                  Value
                </Label>
                {renderStarRating(valueRating, setValueRating)}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Info */}
        <Card className="border-gray-200">
          <CardContent className="p-6 space-y-6">
            <div>
              <Label htmlFor="reviewerName" className="text-base font-semibold text-gray-700 mb-3 block">
                Your Name *
              </Label>
              <Input
                id="reviewerName"
                type="text"
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                placeholder="Enter your name"
                className="h-12 text-base border-2 focus:border-orange-500 transition-colors"
                required
              />
            </div>

            <div>
              <Label htmlFor="reviewText" className="text-base font-semibold text-gray-700 mb-3 block">
                Your Review *
              </Label>
              <Textarea
                id="reviewText"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this business... What did you like? What could be improved?"
                className="min-h-[140px] text-base border-2 focus:border-orange-500 transition-colors resize-vertical"
                required
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-gray-500">
                  {reviewText.length}/500 characters
                </p>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Sparkles size={14} />
                  <span>Be specific and helpful</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Photo Upload */}
        <Card className="border-dashed border-2 border-gray-300 hover:border-orange-400 transition-colors">
          <CardContent className="p-8">
            <div className="text-center space-y-4">
              <div className="p-4 bg-orange-100 rounded-full w-fit mx-auto">
                <Upload className="text-orange-600" size={32} />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-700 mb-1">Add Photos (Optional)</p>
                <p className="text-gray-500">Show others what to expect</p>
              </div>
              <div className="text-sm text-gray-500">
                <p>Click to upload or drag and drop</p>
                <p>PNG, JPG up to 10MB each</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-6">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="flex-1 h-12 text-base border-2 hover:bg-gray-50"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="flex-1 h-12 text-base bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
          >
            <Sparkles className="mr-2" size={16} />
            Submit Review
          </Button>
        </div>
      </form>
    </div>
  );
};
