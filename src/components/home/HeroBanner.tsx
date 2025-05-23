import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules'
// Import Swiper styles

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import 'swiper/css/autoplay';
import { Link } from 'react-router-dom';

const colors = ["#E4E4DE", "#C4C5BA", "#595f39", "#1B1B1B"]
const slidesContent = [
  {
    id: 1,
    image: "https://embarkx.com/sample/placeholder.png",
    title: "Home Comfort",
    subtitle: "Living Room",
    description: "Upgrade your space with cozy and stylish sofas",
    order: 0,
  },
  {
    id: 2,
    image: "https://embarkx.com/sample/placeholder.png",
    title: "Entertainment Hub",
    subtitle: "Smart TV",
    description: "Experience the latest in home entertainment",
    order: 1,
  },
  {
    id: 3,
    image: "https://embarkx.com/sample/placeholder.png",
    title: "Playful Picks",
    subtitle: "Kids' Clothing",
    description: "Bright and fun styles for kids, up to 20% off",
    order: 2,
  }
]

const HeroBanner = () => {
  return (
    <div className='py-2 round-md'>
      <Swiper 
        grabCursor={true}
        autoplay={{
          pauseOnMouseEnter: true,
          delay: 4000
        }}
        navigation
        modules={[Pagination, EffectFade, Navigation, Autoplay]}
        pagination={{
          clickable: true,
        }}
        scrollbar={{
          draggable: true
        }}
        slidesPerView={1}
      >
        {slidesContent.sort((a,b) => a.order < b.order ? -1 : 1)
          .map((item, i) => 
            <SwiperSlide key={item.id}>
              <div className='carousel-item rounded-md sm:h-[500px] h-96'
                style={{ backgroundColor: colors[item.id - 1] }}>
                <div className='flex items-center justify-center'>
                  <div className='hidden lg:flex justify-center w-1/2 p-8'>
                    <div className='text-center'>
                      <h3 className='text-3xl font-bold text-white'>
                        {item.title}
                      </h3>
                      <h1 className='text-5xl text-white font-bold mt-2'>
                        {item.subtitle}
                      </h1>
                      <p className='text-white font-bold mt-4'>
                        {item.description}
                      </p>
                      <Link to={"/products"} className='mt-6 inline-block bg-black text-white py-2 px-4 rounded hover:bg-gray-800'>Comprar</Link>
                    </div>
                  </div>
                  <div className='w-full flex justify-center lg:w-1/2 p-4'>
                    <img src={item.image} alt={item.title} />
                  </div>
                </div>
              </div>
            </SwiperSlide>)}
      </Swiper>
    </div>
  )
}

export default HeroBanner