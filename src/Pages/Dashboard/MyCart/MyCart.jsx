import { Helmet } from "react-helmet-async";
import useCart from "../../../hooks/useCart";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

const MyCart = () => {

    const [cart, refetch] = useCart()
    // how dose reduce work reduce is work like (cumulative  function) 
    const total = cart.reduce((sum, item) => item.price + sum, 0)
    console.log(total);

    const handelDelete = (item) => {

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                fetch(`http://localhost:5000/carts/${item._id}`, {
                    method: "DELETE"
                })
                    .then(res => res.json())
                    .then(data => {
                        if (data.deletedCount > 0) {
                            refetch();
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                        }
                    })
            }
        })
    }
    return (
        <div className="w-full">
            <Helmet>
                <title>Bistro Boss | My Cart</title>
            </Helmet>
            <div className="uppercase text-bold flex justify-evenly h-10 items-center">
                <h2 className="text-3xl">Total item {cart.length}</h2>
                <h2 className="text-3xl">Total price $ {total}</h2>
                <Link to="/dashboard/payment">
                    <button className="btn btn-sm btn-warning">pay</button>
                </Link>
            </div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>Food</th>
                            <th>Item Name</th>
                            <th>price</th>
                            <th> Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr
                                key={item._id}
                            >
                                <td>
                                    <label>
                                        {index + 1}
                                    </label>
                                </td>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>

                                    </div>
                                </td>
                                <td>
                                    <div className="font-bold">{item.name}</div>
                                </td>
                                <td className="text-end">${item.price}</td>
                                <td>
                                    <button onClick={() => handelDelete(item)} className="btn btn-ghost btn-sm bg-red-600 text-white"><FaTrashAlt /></button>

                                </td>
                            </tr>
                            )
                        }

                    </tbody>


                </table>
            </div>
        </div>
    );
};

export default MyCart;