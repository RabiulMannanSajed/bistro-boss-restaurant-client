
const FoodCard = ({ item }) => {
    const { image, price, recipe, name } = item

    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <div className="card-body text-center">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button className="btn btn-primary">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
1
export default FoodCard;