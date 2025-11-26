import React, { useState } from 'react';
import { Clock, DollarSign, Star, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  duration: string;
  category: string;
  image: string;
  rating: number;
  popular?: boolean;
}

const ServicesPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (service: Service) => {
    setSelectedService(service);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    document.body.style.overflow = 'unset';
  };

  const services: Service[] = [
    // FACIAL TREATMENTS
    {
      id: 'facial-cleaning',
      name: t('services.facial'),
      description: t('service.facial.full'),
      price: '$45.000',
      duration: '60 min',
      category: 'facial',
      image: 'https://images.pexels.com/photos/3985347/pexels-photo-3985347.jpeg',
      rating: 5.0,
      popular: true
    },

    // LASHES & EYEBROWS
    {
      id: 'lashes-classic',
      name: t('services.lashesClassic'),
      description: t('service.lashesClassic.full'),
      price: '$80.000',
      duration: '2 hrs',
      category: 'lashes',
      image: 'https://images.pexels.com/photos/3985321/pexels-photo-3985321.jpeg',
      rating: 4.9,
      popular: true
    },
    {
      id: 'lashes-rimel',
      name: t('services.lashesRimel'),
      description: t('service.lashesRimel.full'),
      price: '$90.000',
      duration: '2 hrs',
      category: 'lashes',
      image: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg',
      rating: 4.9
    },
    {
      id: 'lashes-mascara',
      name: t('services.lashesMascara'),
      description: t('service.lashesMascara.full'),
      price: '$100.000',
      duration: '2.5 hrs',
      category: 'lashes',
      image: 'https://images.pexels.com/photos/3764537/pexels-photo-3764537.jpeg',
      rating: 4.9
    },
    {
      id: 'lashes-russian',
      name: t('services.lashesRussian'),
      description: t('service.lashesRussian.full'),
      price: '$120.000',
      duration: '3 hrs',
      category: 'lashes',
      image: 'https://images.pexels.com/photos/3992859/pexels-photo-3992859.jpeg',
      rating: 5.0,
      popular: true
    },
    {
      id: 'eyebrows-tint',
      name: t('services.eyebrowsTint'),
      description: t('service.eyebrowsTint.full'),
      price: '$15.000',
      duration: '30 min',
      category: 'lashes',
      image: 'https://images.pexels.com/photos/3985341/pexels-photo-3985341.jpeg',
      rating: 4.8
    },
    {
      id: 'lash-lift',
      name: t('services.lashLift'),
      description: t('service.lashLift.full'),
      price: '$35.000',
      duration: '60 min',
      category: 'lashes',
      image: 'https://images.pexels.com/photos/3993287/pexels-photo-3993287.jpeg',
      rating: 4.9
    },
    {
      id: 'lash-lift-tint',
      name: t('services.lashLiftTint'),
      description: t('service.lashLiftTint.full'),
      price: '$40.000',
      duration: '75 min',
      category: 'lashes',
      image: 'https://images.pexels.com/photos/3764011/pexels-photo-3764011.jpeg',
      rating: 4.9,
      popular: true
    },

    // NAIL SERVICES
    {
      id: 'nails-acrylic',
      name: t('services.nailsAcrylic'),
      description: t('service.nailsAcrylic.full'),
      price: '$30.000',
      duration: '2 hrs',
      category: 'nails',
      image: 'https://images.pexels.com/photos/3992865/pexels-photo-3992865.jpeg',
      rating: 4.8,
      popular: true
    },
    {
      id: 'nails-softgel',
      name: t('services.nailsSoftGel'),
      description: t('service.nailsSoftGel.full'),
      price: '$25.000',
      duration: '2 hrs',
      category: 'nails',
      image: 'https://images.pexels.com/photos/3764513/pexels-photo-3764513.jpeg',
      rating: 4.9
    },
    {
      id: 'nails-polygel',
      name: t('services.nailsPolygel'),
      description: t('service.nailsPolygel.full'),
      price: '$30.000',
      duration: '2 hrs',
      category: 'nails',
      image: 'https://images.pexels.com/photos/3985334/pexels-photo-3985334.jpeg',
      rating: 4.8
    },

    // HAIR SERVICES (Opcionales)
    {
      id: 'haircut-women',
      name: t('services.haircut'),
      description: t('service.haircut.desc'),
      price: '$65.000',
      duration: '90 min',
      category: 'hair',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      rating: 4.8
    },
    {
      id: 'balayage',
      name: t('services.balayage'),
      description: t('service.balayage.desc'),
      price: '$180.000',
      duration: '3.5 hrs',
      category: 'hair',
      image: 'https://images.pexels.com/photos/3993287/pexels-photo-3993287.jpeg',
      rating: 4.9
    }
  ];

  const categories = [
    { id: 'all', name: t('services.category.all') },
    { id: 'facial', name: t('services.category.facial') },
    { id: 'lashes', name: t('services.category.lashes') },
    { id: 'nails', name: t('services.category.nails') },
    { id: 'hair', name: t('services.category.hair') }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? services 
    : services.filter(service => service.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('services.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedCategory === category.id
                  ? 'bg-mentha-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div key={service.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              {service.popular && (
                <div className="absolute z-10 top-4 left-4">
                  <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {t('services.popular')}
                  </span>
                </div>
              )}
              
              <div 
                className="h-48 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${service.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 right-4 flex items-center space-x-1 bg-white/90 px-2 py-1 rounded-full">
                  <Star className="w-4 h-4 text-accent-400 fill-current" />
                  <span className="text-sm font-medium">{service.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                  {service.name}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
                  {service.description}
                </p>

                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center space-x-1">
                    <DollarSign className="w-4 h-4 text-mentha-600" />
                    <span className="text-lg font-semibold text-gray-900">
                      {service.price}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{service.duration}</span>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Link
                    to={`/booking?service=${service.id}`}
                    className="flex-1 bg-mentha-600 hover:bg-mentha-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors text-center"
                  >
                    {t('common.book')}
                  </Link>
                  <button 
                    onClick={() => openModal(service)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-lg hover:border-mentha-300 hover:bg-mentha-50 transition-colors"
                  >
                    {t('common.learnMore')}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center bg-gradient-to-r from-mentha-600 to-mentha-700 rounded-3xl p-12 text-white">
          <h2 className="font-serif text-3xl font-bold mb-4">
            {t('services.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('services.cta.subtitle')}
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-mentha-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {t('services.cta.button')}
          </Link>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedService && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-64 md:h-80">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${selectedService.image})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Service Title on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white">
                    {selectedService.name}
                  </h2>
                  {selectedService.popular && (
                    <span className="bg-gold-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {t('services.popular')}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center bg-white/90 px-2 py-1 rounded-full">
                    <Star className="w-4 h-4 text-accent-400 fill-current" />
                    <span className="text-sm font-medium ml-1">{selectedService.rating}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Price and Duration */}
              <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="bg-mentha-100 p-2 rounded-lg">
                    <DollarSign className="w-5 h-5 text-mentha-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('common.price')}</p>
                    <p className="text-xl font-bold text-gray-900">{selectedService.price}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="bg-mentha-100 p-2 rounded-lg">
                    <Clock className="w-5 h-5 text-mentha-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{t('common.duration')}</p>
                    <p className="text-xl font-bold text-gray-900">{selectedService.duration}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Descripción del Servicio
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed whitespace-pre-line">
                  {selectedService.description}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to={`/booking?service=${selectedService.id}`}
                  className="flex-1 bg-mentha-600 hover:bg-mentha-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-center"
                >
                  {t('common.book')}
                </Link>
                <button
                  onClick={closeModal}
                  className="px-6 py-4 border-2 border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-semibold text-gray-700"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServicesPage;