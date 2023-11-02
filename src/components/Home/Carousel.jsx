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
                    className='lg:h-screen h-fit z-0'
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
                        <img src={burgerPic} alt="" className='w-full lg:h-screen lg:object-cover'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={pizzaPic} alt="" className='w-full lg:h-screen lg:object-fill'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={hotdogPic} alt="" className='w-full lg:h-screen lg:object-fill'/>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src={biriyaniPic} alt="" className='w-full lg:h-screen lg:object-fill'/>
                    </SwiperSlide>
                </Swiper>
            </div>
            <div className='absolute lg:top-[500px] md:top-[400px] sm:top-[330px] top-56 w-full text-center' data-aos="fade-right" data-aos-duration="1500" data-aos-anchor-placement="center-bottom">
                <input type='search' className='w-2/4 z-0 border-emerald-500 border-2 placeholder:text-emerald-500 sm:placeholder:text-md max-sm:placeholder:text-sm max-sm:pb-0.5
                px-1 placeholder:font-semibold sm:py-1 text-emerald-500 sm:text-lg max-sm:text-md font-semibold focus:outline-emerald-600 focus:px-2 rounded-md' placeholder='Search' value={value} onChange={(e) => handleChange(e)} />
            </div>
        </div>
    );
};

export default Carousel;