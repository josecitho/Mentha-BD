import React, { useState } from 'react';
import { Search, Filter, Instagram, Heart, MessageCircle, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  likes: number;
  comments: number;
  tags: string[];
  description: string;
  service: string; // Servicio relacionado
}

const GalleryPage: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    document.body.style.overflow = 'unset';
  };

  const galleryItems: GalleryItem[] = [
    // FACIAL
    {
      id: '1',
      image: 'https://images.pexels.com/photos/3985347/pexels-photo-3985347.jpeg',
      title: 'Limpieza Facial Profunda',
      category: 'facial',
      likes: 124,
      comments: 18,
      tags: ['facial', 'limpieza', 'rejuvenecimiento'],
      description: 'Tratamiento facial completo con limpieza profunda, exfoliación y mascarilla hidratante. Resultado: piel radiante y renovada.',
      service: 'Limpieza Facial'
    },
    {
      id: '2',
      image: 'https://images.pexels.com/photos/3spa991/pexels-photo-3spa991.jpeg',
      title: 'Tratamiento Facial Anti-Edad',
      category: 'facial',
      likes: 156,
      comments: 23,
      tags: ['facial', 'antiedad', 'hidratación'],
      description: 'Facial especializado para reducir líneas de expresión y rejuvenecer la piel.',
      service: 'Limpieza Facial'
    },

    // PESTAÑAS
    {
      id: '3',
      image: 'https://images.pexels.com/photos/3985321/pexels-photo-3985321.jpeg',
      title: 'Extensiones Clásicas',
      category: 'lashes',
      likes: 203,
      comments: 34,
      tags: ['pestañas', 'clásicas', 'natural'],
      description: 'Pestañas clásicas pelo a pelo para un look natural y elegante.',
      service: 'Pestañas Clásicas'
    },
    {
      id: '4',
      image: 'https://images.pexels.com/photos/3985327/pexels-photo-3985327.jpeg',
      title: 'Volumen Ruso',
      category: 'lashes',
      likes: 278,
      comments: 52,
      tags: ['pestañas', 'volumen', 'ruso'],
      description: 'Técnica de volumen ruso para una mirada dramática y glamorosa.',
      service: 'Volumen Ruso'
    },
    {
      id: '5',
      image: 'https://images.pexels.com/photos/7755219/pexels-photo-7755219.jpeg',
      title: 'Lifting de Pestañas',
      category: 'lashes',
      likes: 187,
      comments: 26,
      tags: ['lifting', 'pestañas', 'natural'],
      description: 'Lifting de pestañas con tinte para una mirada más abierta y definida.',
      service: 'Lifting de Pestañas con Tinte'
    },
    {
      id: '6',
      image: 'https://images.pexels.com/photos/3985341/pexels-photo-3985341.jpeg',
      title: 'Diseño de Cejas Perfecto',
      category: 'lashes',
      likes: 165,
      comments: 29,
      tags: ['cejas', 'perfilado', 'tinte'],
      description: 'Perfilado de cejas con tinte para enmarcar perfectamente tu rostro.',
      service: 'Perfilado de Cejas con Tinte'
    },

    // UÑAS
    {
      id: '7',
      image: 'https://images.pexels.com/photos/3992865/pexels-photo-3992865.jpeg',
      title: 'Uñas Acrílicas Elegantes',
      category: 'nails',
      likes: 234,
      comments: 45,
      tags: ['uñas', 'acrílicas', 'diseño'],
      description: 'Uñas acrílicas con diseño francés y decoración elegante.',
      service: 'Uñas Acrílicas'
    },
    {
      id: '8',
      image: 'https://images.pexels.com/photos/3997379/pexels-photo-3997379.jpeg',
      title: 'Soft Gel Natural',
      category: 'nails',
      likes: 198,
      comments: 31,
      tags: ['uñas', 'softgel', 'natural'],
      description: 'Uñas soft gel con acabado natural y discreto.',
      service: 'Uñas Soft Gel'
    },
    {
      id: '9',
      image: 'https://images.pexels.com/photos/3764537/pexels-photo-3764537.jpeg',
      title: 'Polygel con Arte',
      category: 'nails',
      likes: 267,
      comments: 48,
      tags: ['uñas', 'polygel', 'arte'],
      description: 'Uñas polygel con diseño artístico personalizado.',
      service: 'Uñas Polygel'
    },
    {
      id: '10',
      image: 'https://images.pexels.com/photos/6621392/pexels-photo-6621392.jpeg',
      title: 'Diseño Floral',
      category: 'nails',
      likes: 289,
      comments: 56,
      tags: ['uñas', 'diseño', 'flores'],
      description: 'Manicura con delicado diseño floral, perfecta para cualquier ocasión.',
      service: 'Uñas Acrílicas'
    },

    // CABELLO (opcional)
    {
      id: '11',
      image: 'https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg',
      title: 'Corte Moderno',
      category: 'hair',
      likes: 189,
      comments: 27,
      tags: ['corte', 'moderno', 'estilo'],
      description: 'Corte bob moderno con técnica profesional.',
      service: 'Corte de Cabello'
    },
    {
      id: '12',
      image: 'https://images.pexels.com/photos/3993287/pexels-photo-3993287.jpeg',
      title: 'Balayage Perfecto',
      category: 'hair',
      likes: 312,
      comments: 64,
      tags: ['balayage', 'color', 'degradado'],
      description: 'Técnica balayage para un degradado de color natural y sofisticado.',
      service: 'Balayage'
    }
  ];

  const categories = [
    { id: 'all', name: t('gallery.allWork'), count: galleryItems.length },
    { id: 'facial', name: t('services.category.facial'), count: galleryItems.filter(item => item.category === 'facial').length },
    { id: 'lashes', name: t('services.category.lashes'), count: galleryItems.filter(item => item.category === 'lashes').length },
    { id: 'nails', name: t('services.category.nails'), count: galleryItems.filter(item => item.category === 'nails').length },
    { id: 'hair', name: t('services.category.hair'), count: galleryItems.filter(item => item.category === 'hair').length }
  ];

  const filteredItems = galleryItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('gallery.title')}
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('gallery.subtitle')}
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          {/* Search Bar */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder={t('gallery.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-mentha-500 focus:border-mentha-500"
            />
          </div>

          {/* Filter Button for Mobile */}
          <button className="lg:hidden flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-5 h-5 mr-2" />
            {t('gallery.filter')}
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h3 className="font-semibold text-lg text-gray-900 mb-4">{t('gallery.categories')}</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex justify-between items-center ${
                      selectedCategory === category.id
                        ? 'bg-mentha-100 text-mentha-700 font-medium'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-sm ${
                      selectedCategory === category.id ? 'text-mentha-600' : 'text-gray-500'
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Gallery Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map((item) => (
                <div 
                  key={item.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                  onClick={() => openModal(item)}
                >
                  <div className="relative overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex flex-wrap gap-2">
                          {item.tags.slice(0, 3).map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-white/90 text-gray-800 text-xs rounded-full"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <button 
                          className="p-2 bg-white/90 rounded-full text-gray-800 hover:bg-white transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Aquí puedes agregar link a Instagram si quieres
                          }}
                        >
                          <Instagram className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center justify-between text-gray-500 text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Heart className="w-4 h-4" />
                          <span>{item.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{item.comments}</span>
                        </div>
                      </div>
                      <button 
                        className="text-mentha-600 hover:text-mentha-700 font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(item);
                        }}
                      >
                        {t('gallery.viewDetails')}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-12 h-12 text-gray-400" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">{t('gallery.noResults')}</h3>
                <p className="text-gray-600">
                  {t('gallery.noResultsDesc')}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-mentha-600 to-mentha-700 rounded-3xl p-12 text-white">
          <h2 className="font-serif text-3xl font-bold mb-4">
            {t('gallery.cta.title')}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t('gallery.cta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/booking"
              className="bg-white text-mentha-600 font-semibold px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {t('gallery.cta.book')}
            </Link>
            <button className="border-2 border-white text-white font-semibold px-8 py-4 rounded-lg hover:bg-white hover:text-mentha-600 transition-colors">
              {t('gallery.cta.instagram')}
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && selectedItem && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header with Image */}
            <div className="relative h-96">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg z-10"
              >
                <X className="w-6 h-6 text-gray-700" />
              </button>

              {/* Title on Image */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-3">
                  {selectedItem.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1 bg-white/90 text-gray-800 text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Content */}
            <div className="p-6 md:p-8">
              {/* Stats */}
              <div className="flex items-center gap-6 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="text-lg font-semibold text-gray-900">{selectedItem.likes}</span>
                  <span className="text-gray-500">Me gusta</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-blue-500" />
                  <span className="text-lg font-semibold text-gray-900">{selectedItem.comments}</span>
                  <span className="text-gray-500">Comentarios</span>
                </div>
              </div>

              {/* Service Info */}
              <div className="mb-6 bg-mentha-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-1">Servicio relacionado:</p>
                <p className="text-lg font-semibold text-mentha-700">{selectedItem.service}</p>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Descripción
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {selectedItem.description}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/booking"
                  className="flex-1 bg-mentha-600 hover:bg-mentha-700 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-center"
                >
                  Reservar Este Servicio
                </Link>
                <Link
                  to="/services"
                  className="px-6 py-4 border-2 border-mentha-600 text-mentha-600 rounded-lg hover:bg-mentha-50 transition-colors font-semibold text-center"
                >
                  Ver Todos los Servicios
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GalleryPage;