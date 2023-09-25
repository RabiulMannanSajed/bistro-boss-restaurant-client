import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import featuredImg from '../../../assets/home/featured.jpg'
import './Featured.css'
const Featured = () => {

    // to show the today data by location wish 
    const date = new Date();
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    };

    return (
        <div className="featured-item bg-fixed text-white pt-5 my-20">
            <SectionTitle
                subHeading={"Check it out"}
                heading={"Featured item"}
            ></SectionTitle>
            <div className="md:flex justify-center items-center py-8 px-16 bg-slate-400 bg-opacity-50 ">
                <div>
                    <img className="w-[900px] h-[200px]" src={featuredImg} alt="" />
                </div>
                <div className="md:ml-10">
                    {/* to location use to deacte the location of user  */}
                    <p>{date.toLocaleString('en-IN', options)}</p>

                    <p className="uppercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Amet optio quidem porro perferendis doloribus sed rerum consequatur qui praesentium distinctio laborum, veritatis incidunt, nemo quis exercitationem, dolore eveniet rem. Et quasi sit officiis odio suscipit facilis? Molestiae autem natus maxime optio, ratione fuga cupiditate ad nostrum esse doloremque corporis repellendus.</p>
                <button className="btn btn-outline border-0 border-b-4 mt-4"> Read More </button>
                </div>
            </div>
        </div>
    );
};

export default Featured;