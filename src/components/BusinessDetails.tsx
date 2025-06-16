import React from 'react';
import { X, Star, MapPin, Clock, Phone, Globe, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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

interface BusinessDetailsProps {
  business: Business | null;
  onClose: () => void;
}

export const BusinessDetails: React.FC<BusinessDetailsProps> = ({ business, onClose }) => {
  if (!business) return null;

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

  const sampleReviews = [
    {
      id: 1,
      author: "Sarah Johnson",
      rating: 5,
      date: "2024-01-15",
      text: "Amazing experience! The quality of service exceeded my expectations. Highly recommend to anyone looking for professional and reliable service."
    },
    {
      id: 2,
      author: "Mike Chen",
      rating: 4,
      date: "2024-01-10",
      text: "Great place with friendly staff. The atmosphere is welcoming and the service is quick. Will definitely come back again."
    },
    {
      id: 3,
      author: "Emily Davis",
      rating: 5,
      date: "2024-01-08",
      text: "Outstanding! Everything was perfect from start to finish. The attention to detail is remarkable."
    }
  ];

  const businessHours = [
    { day: "Monday", hours: "9:00 AM - 6:00 PM" },
    { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Wednesday", hours: "9:00 AM - 6:00 PM" },
    { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
    { day: "Friday", hours: "9:00 AM - 8:00 PM" },
    { day: "Saturday", hours: "10:00 AM - 6:00 PM" },
    { day: "Sunday", hours: "Closed" }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <img
            src={business.image}
            alt={business.name}
            className="w-full h-64 object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-2 transition-all"
          >
            <X size={20} className="text-gray-600" />
          </button>
          <Badge className="absolute bottom-4 left-4 bg-blue-600 hover:bg-blue-700">
            {business.category}
          </Badge>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{business.name}</h1>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center gap-1">
                    {renderStars(business.rating)}
                  </div>
                  <span className="font-medium text-gray-700">{business.rating}</span>
                  <span className="text-gray-500">({business.reviewCount} reviews)</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-4 text-gray-600">
              <MapPin size={18} />
              <span>{business.address}</span>
            </div>

            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              {business.description}
            </p>
          </div>

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="hours">Hours & Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">About This Business</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      We are committed to providing exceptional service and quality products to our customers. 
                      Our experienced team ensures that every interaction exceeds expectations.
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar size={16} />
                        <span>Established in 2018</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Badge variant="outline" className="text-xs">
                          Locally Owned
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Popular Services</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {["Professional Service", "Quality Products", "Expert Consultation", "Customer Support"].map((service, index) => (
                        <Badge key={index} variant="secondary" className="justify-center py-2">
                          {service}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button variant="outline" size="sm">
                    Write a Review
                  </Button>
                </div>
                
                {sampleReviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-gray-800">{review.author}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex items-center gap-1">
                              {renderStars(review.rating)}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600">{review.text}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="hours" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Clock size={20} />
                      Business Hours
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {businessHours.map((schedule, index) => (
                        <div key={index} className="flex justify-between items-center py-1">
                          <span className="font-medium text-gray-700">{schedule.day}</span>
                          <span className={`text-sm ${schedule.hours === 'Closed' ? 'text-red-500' : 'text-gray-600'}`}>
                            {schedule.hours}
                          </span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Phone size={18} className="text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-700">Phone</p>
                        <p className="text-sm text-gray-600">(555) 123-4567</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe size={18} className="text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-700">Website</p>
                        <p className="text-sm text-blue-600 hover:underline cursor-pointer">
                          www.example.com
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin size={18} className="text-gray-500" />
                      <div>
                        <p className="font-medium text-gray-700">Address</p>
                        <p className="text-sm text-gray-600">{business.address}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
