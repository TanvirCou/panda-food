/* eslint-disable react/jsx-key */
import { useEffect, useState } from 'react';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Card from './Card';
import Carousel from './Carousel';
import spinner from '../../assets/images/spinner.gif';



const Home = () => {
    const [foodItems, setFoodItems] = useState([]);
    const [foodCategory, setFoodCategory] = useState([]);
    const [search, setSearch] = useState('');
    const [loadingItems, setLoadingItems] = useState(false);
    const [loadingCategory, setLoadingCategory] = useState(false);
   
    const items = async() => {
        await fetch('https://panda-food.onrender.com/food/items')
            .then(res => res.json())
            .then(data => {
                setFoodItems(data)
                setLoadingItems(true);
            });

       } 
    
    const category = async() => {
        await fetch('https://panda-food.onrender.com/food/category')
            .then(res => res.json())
            .then(data => {
                setFoodCategory(data)
                setLoadingCategory(true);
            });
       }

    useEffect(() => {
        items();
        category();
    }, []);

    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    return (
        <div className='bg-gray-100'>
            <Navbar></Navbar>
            <Carousel value={search} handleChange={handleChange}></Carousel>
            <div>
                {!loadingItems && !loadingCategory && <div>
                        <img src={spinner} alt="" className='w-20 py-48 mx-auto'/>
                    </div>
                }
                {loadingCategory && loadingItems && foodCategory.map((category) => {
                    return (
                        <div key={category._id}>
                            <div key={category._id} className='font-bold text-lg px-12 pt-3 pb-2'>{category.CategoryName}</div>
                            <hr className='mx-12 border border-emerald-400' />
                            <div className="justify-center grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-6 py-4 px-12">
                                {loadingCategory && loadingItems && foodItems.filter(item => item.CategoryName === category.CategoryName && item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                    .map(filterItem => {
                                        return (
                                            <div key={filterItem._id}>
                                                <div >
                                                    <Card foodItem={filterItem} options={filterItem.options}></Card>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
            <Footer></Footer>
        </div>
    );
};

export default Home;