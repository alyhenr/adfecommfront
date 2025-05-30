import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { FaArrowRight } from 'react-icons/fa6';
// Import Swiper styles

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

const slidesContent = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
    title: "Sabores Autênticos",
    subtitle: "Culinária Asiática",
    description: "Descubra os verdadeiros sabores da gastronomia chinesa tradicional",
    order: 0,
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1516211697506-8360dbcfe9a4",
    title: "Produtos Importados",
    subtitle: "Direto da Ásia",
    description: "A maior variedade de produtos asiáticos autênticos da região",
    order: 1,
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9",
    title: "Especiarias & Temperos",
    subtitle: "Sabor & Tradição",
    description: "Ingredientes especiais para suas receitas favoritas",
    order: 2,
  }
];

const HeroBanner = () => {
  return (
    <div className='relative bg-gray-50'>
      <Swiper 
        grabCursor={true}
        autoplay={{
          pauseOnMouseEnter: true,
          delay: 4000
        }}
        effect="fade"
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{
          clickable: true,
        }}
        className="h-[600px]"
      >
        {slidesContent.sort((a,b) => a.order < b.order ? -1 : 1)
          .map((item) => (
            <SwiperSlide key={item.id}>
              <div className='relative h-full'>
                {/* Background Image with Overlay */}
                <div className='absolute inset-0'>
                  <div className='absolute inset-0 bg-black/40 z-10'></div>
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className='w-full h-full object-cover'
                  />
                </div>
                
                {/* Content */}
                <div className='relative z-20 h-full'>
                  <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
                    <div className='flex flex-col justify-center h-full max-w-2xl'>
                      <span className='text-red-500 font-medium mb-2'>
                        {item.title}
                      </span>
                      <h1 className='text-4xl sm:text-5xl font-bold text-white mb-4'>
                        {item.subtitle}
                      </h1>
                      <p className='text-lg text-gray-200 mb-8'>
                        {item.description}
                      </p>
                      <div>
                        <Link 
                          to="/products" 
                          className='inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 font-medium hover:bg-red-700 transition-colors'
                        >
                          Explorar Produtos
                          <FaArrowRight className="w-4 h-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default HeroBanner;