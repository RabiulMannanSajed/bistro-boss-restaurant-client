import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useManu";

const PopularMenu = () => {

    const [menu] = useMenu();

    const popular = menu.filter(item => item.category === 'popular')
    // const [menu, setMenu] = useState([]);

    // useEffect(() => {
    //     fetch('menu.json')
    //         .then(res => res.json())
    //         .then(data => {
    //             const PopularItems = data.filter(item => item.category === 'popular')
    //             setMenu(PopularItems)
    //         })
    // }, [])

    return (
        <section className="mb-12">
            <SectionTitle
                heading={"From our menu"}
                subHeading={"Popular Item"}
            ></SectionTitle>
            <div className="grid md:grid-cols-2 gap-5">
                {
                    popular.map(item => <MenuItem
                        key={item._id}
                        item={item}
                    ></MenuItem>)
                }
            </div>
            <button className="btn btn-outline border-0 border-b-4 mt-4 ">View full menu</button>
        </section>
    );
};

export default PopularMenu;