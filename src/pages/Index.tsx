
import React, { useState } from 'react';
import { SearchBar } from '../components/SearchBar';
import { BusinessCard } from '../components/BusinessCard';
import { ReviewForm } from '../components/ReviewForm';
import { Star, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Sample business data
const sampleBusinesses = [
  {
    id: 1,
    name: "Mario's Pizzeria",
    category: "Restaurant",
    location: "Downtown",
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    description: "Authentic Italian pizza with fresh ingredients and traditional recipes.",
    address: "123 Main St, Downtown"
  },
  {
    id: 2,
    name: "TechFix Solutions",
    category: "Service",
    location: "Tech District",
    rating: 4.2,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
    description: "Professional computer repair and IT support services.",
    address: "456 Tech Blvd, Tech District"
  },
  {
    id: 3,
    name: "Bloom & Blossom",
    category: "Shop",
    location: "Garden Quarter",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop",
    description: "Beautiful flowers and plants for every occasion.",
    address: "789 Flower St, Garden Quarter"
  },
  {
    id: 4,
    name: "The Coffee Corner",
    category: "Restaurant",
    location: "Downtown",
    rating: 4.3,
    reviewCount: 234,
    image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400&h=300&fit=crop",
    description: "Cozy coffee shop with artisanal brews and homemade pastries.",
    address: "321 Brew Ave, Downtown"
  },
  {
    id: 5,
    name: "StyleCut Salon",
    category: "Service",
    location: "Fashion District",
    rating: 4.6,
    reviewCount: 92,
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=300&fit=crop",
    description: "Modern hair salon with experienced stylists and premium products.",
    address: "654 Style St, Fashion District"
  }
];

const Index = () => {
  const [businesses, setBusinesses] = useState(sampleBusinesses);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const categories = ['All', 'Restaurant', 'Service', 'Shop'];

  const filteredBusinesses = selectedCategory === 'All' 
    ? businesses 
    : businesses.filter(business => business.category === selectedCategory);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setBusinesses(sampleBusinesses);
    } else {
      const filtered = sampleBusinesses.filter(business =>
        business.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        business.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setBusinesses(filtered);
    }
  };

  const handleReviewSubmit = (review) => {
    console.log('Review submitted:', review);
    setShowReviewForm(false);
    setSelectedBusiness(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-orange-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4 animate-fade-in">
              Discover & Review Local Businesses
            </h1>
            <p className="text-xl text-blue-100 mb-8 animate-fade-in">
              Find the best restaurants, shops, and services in your area
            </p>
          </div>
          
          <div className="max-w-2xl mx-auto">
            <SearchBar onSearch={handleSearch} />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-between mb-8">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
            <Filter className="text-gray-600" size={20} />
            <span className="font-medium text-gray-700">Filter by category:</span>
            <div className="flex gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className="hover-scale"
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="text-sm text-gray-600">
            Showing {filteredBusinesses.length} businesses
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredBusinesses.map((business, index) => (
            <div
              key={business.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <BusinessCard
                business={business}
                onReviewClick={() => {
                  setSelectedBusiness(business);
                  setShowReviewForm(true);
                }}
              />
            </div>
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <MapPin size={48} className="mx-auto" />
            </div>
            <h3 className="text-xl font-medium text-gray-600 mb-2">No businesses found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <Star className="mx-auto mb-4 text-orange-500" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Help Others Discover Great Businesses
          </h2>
          <p className="text-gray-600 mb-6">
            Share your experiences and help build a trusted community of reviews
          </p>
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
          >
            Write Your First Review
          </Button>
        </div>
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
            <ReviewForm
              business={selectedBusiness}
              onSubmit={handleReviewSubmit}
              onCancel={() => {
                setShowReviewForm(false);
                setSelectedBusiness(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
