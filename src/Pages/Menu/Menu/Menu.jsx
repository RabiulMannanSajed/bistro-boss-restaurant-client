import { Helmet } from "react-helmet-async";
import Cover from '../../Shared/Cover/Cover'
import useMenu from "../../../hooks/useManu";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuCategory from "../MenuCategory/MenuCategory";

import menuImg from '../../../assets/menu/banner3.jpg'
import dessertBg from '../../../assets/menu/dessert-bg.jpeg'
import pizzaBg from '../../../assets/menu/pizza-bg.jpg'
import saladBg from '../../../assets/menu/salad-bg.jpg'
import soupBg from '../../../assets/menu/soup-bg.jpg'

const Menu = () => {
    const [menu] = useMenu();
    const dessert = menu.filter(item => item.category === 'dessert')
    const soup = menu.filter(item => item.category === 'soup')
    const salad = menu.filter(item => item.category === 'salad')
    const pizza = menu.filter(item => item.category === 'pizza')
    const offered = menu.filter(item => item.category === 'offered')

    return (
        <div>
            <Helmet>
                <title>Bistro Boss | Menu</title>
            </Helmet>
            <Cover
                img={menuImg} title={"Our Menu"}
            ></Cover>
            {/* Main cover */}
            <SectionTitle
                subHeading={"Don't Miss"}
                heading={"Today's Offer"}
            ></SectionTitle>
            {/* offered menu items */}
            <MenuCategory items={offered}></MenuCategory>

            {/* dessert items */}
            <MenuCategory
                items={dessert} title={"Dessert"} img={dessertBg}
            ></MenuCategory>
            {/* Salad */}
            <MenuCategory
                items={salad} title={"Salad"} img={saladBg}
            ></MenuCategory>
            {/* Pizza */}
            <MenuCategory
                items={pizza} title={"Pizza"} img={pizzaBg}
            ></MenuCategory>
            {/* soup */}
            <MenuCategory
                items={soup} title={"Soup"} img={soupBg}
            ></MenuCategory>
        </div>
    );
};

export default Menu;