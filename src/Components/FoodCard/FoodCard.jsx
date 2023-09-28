
const FoodCard = ({ item }) => {
    const { image, recipe, name } = item

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body flex flex-col items-center ">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button className="btn bg-slate-300 border-0 border-b-4 mt-4 btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
1
export default FoodCard;