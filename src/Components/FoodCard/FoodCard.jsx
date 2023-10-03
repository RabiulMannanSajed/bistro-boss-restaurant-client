import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";

//  item and user info is taken 
//  this page is working for order Food
//TODO : Pagination ****
const FoodCard = ({ item, index }) => {
    const { image, recipe, price, name, _id } = item
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    console.log(index);
    const handleAddToCart = (item) => {
        console.log(item);
        if (user && user.email) {

            const cartItem = { menuItemId: _id, name, price, image, email: user.email }
            // this is sanding to data base to add this item  (*this post method)
            fetch('http://localhost:5000/carts', {
                method: "POST",
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(cartItem)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'Your order is added in cart',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    }
                })
        }
        else {
            Swal.fire({
                title: 'Place order the food login',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Login now !'
            }).then((result) => {
                // if user is not login then take him to login page 
                if (result.isConfirmed) {
                    navigate('/login', { state: { from: location } })
                }
            })
        }

    }
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure><img src={image} alt="Shoes" /></figure>
                <p className="absolute right-0 mr-4 mt-4 px-4 bg-black text-white">${price}</p>
                <div className="card-body flex flex-col items-center ">
                    <h2 className="card-title">{name}</h2>
                    <p>{recipe}</p>
                    <div className="card-actions justify-end">
                        <button onClick={() => handleAddToCart(item)} className="btn bg-slate-300 text-black border-0 border-b-4 mt-4 border-orange-500">Add to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};
1
export default FoodCard;