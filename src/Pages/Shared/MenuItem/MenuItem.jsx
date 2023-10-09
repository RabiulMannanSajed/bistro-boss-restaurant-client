import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
const MenuItem = ({ item }) => {
    const { image, price, recipe, name } = item
    useEffect(() => {
        AOS.init();
        AOS.refresh();
    }, []);
    return (
        <div data-aos="fade-right"
            data-aos-offset="300"
            data-aos-easing="ease-in-sine"
            className="flex space-x-2 ">
            <img className="w-[90px]" style={{ borderRadius: '0 200px 200px 200px' }} src={image} alt="" />
            <div>
                <h3 className="uppercase">{name}----------</h3>
                <p>{recipe}</p>
            </div>
            <p className="text-yellow-500">${price}</p>
        </div>
    );
};

export default MenuItem;