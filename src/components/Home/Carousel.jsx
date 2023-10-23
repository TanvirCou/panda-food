/* eslint-disable react/prop-types */
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import burgerPic from '../../assets/images/burger.jpg';
import pizzaPic from '../../assets/images/pizza.jpg';
import hotdogPic from '../../assets/images/hotdog.jpg';
import biriyaniPic from '../../assets/images/biriyani.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';

const Carousel = ({ value, handleChange }) => {
    return (
        <div>
            <div className='relative mt-16' data-aos="fade-up" data-aos-duration="1500" data-aos-anchor-placement="center-bottom">
                <Swiper
                    className='h-screen z-0'
                    modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectFade]}
                    spaceBetween={50}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 6000 }}
                    effect="fade"
                    scrollbar={{ draggable: true }}
                >
                    <SwiperSlide>
                        <img src={burgerPic} alt="" className='w-full sm:h-screen sm:object-cover'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={pizzaPic} alt="" className='w-full sm:h-screen sm:object-fill'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={biriyaniPic} alt="" className='w-full sm:h-screen sm:object-fill h-80'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={hotdogPic} alt="" className='w-full sm:h-screen sm:object-fill'/>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='absolute bottom-20 w-full text-center' data-aos="fade-right" data-aos-duration="1500" data-aos-anchor-placement="center-bottom">
                <input type='search' className='w-2/4 z-0 border-emerald-500 border-2 placeholder:text-emerald-500 placeholder:text-md placeholder:font-semibold p-1 text-emerald-500 text-lg font-semibold focus:outline-emerald-600 focus:px-2 rounded-md' placeholder='Search' value={value} onChange={(e) => handleChange(e)} />
            </div>
        </div>
    );
};

export default Carousel;