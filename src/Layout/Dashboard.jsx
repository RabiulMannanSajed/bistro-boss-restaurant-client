import { FaCalendar, FaShoppingCart, FaWallet, FaHome, FaUtensils, FaUsers } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAdmin from "../hooks/useAdmin";

const Dashboard = () => {

    // this is coming form useCart.jsx 
    const [cart] = useCart();
    // TODO : load data from the server to have dynamic isAdmin based on data  
    // const isAdmin = true;
    const [isAdmin] = useAdmin();
    return (
        <div className="drawer lg:drawer-open ">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                <Outlet></Outlet> {/*  this is for make router  */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>


            </div>
            <div className="drawer-side bg-[#D1A054]">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full text-base-content ">
                    {/* Sidebar content here */}
                    {
                        isAdmin ?
                            <>
                                {/* this is for admin user  if isAdmin === true come here */}
                                <li><NavLink to='/dashboard/home'><FaHome></FaHome>Admin Home</NavLink></li>

                                <li><NavLink to='/dashboard/reservation'><FaUtensils></FaUtensils>Add Items</NavLink></li>

                                <li><NavLink to='/dashboard/history'><FaWallet></FaWallet>Mange items</NavLink></li>
                                
                                <li><NavLink to='/dashboard/history'><FaWallet></FaWallet>Mange Booking</NavLink></li>

                                <li><NavLink to='/dashboard/allusers'><FaUsers></FaUsers>All Users</NavLink></li>

                            </>
                            :
                            <>
                                {/* this is for normal users isAdmin === false come here   */}
                                <li><NavLink to='/dashboard/home'><FaHome></FaHome>Home</NavLink></li>

                                <li><NavLink to='/dashboard/reservation'><FaCalendar></FaCalendar>Reservation</NavLink></li>

                                <li><NavLink to='/dashboard/history'><FaWallet></FaWallet>Payment History</NavLink></li>

                                <li>
                                    <NavLink to='/dashboard/mycart'><FaShoppingCart></FaShoppingCart>My Cart
                                        <spam className="badge badge-secondary">+{cart?.length || 0}</spam>
                                    </NavLink>

                                </li>
                            </>
                    }



                    <div className="divider"></div>

                    <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>

                    <li><NavLink to="/menu">Our Menu</NavLink></li>

                    <li><NavLink to="/order/salad">Order Food</NavLink> </li>
                </ul>

            </div>
        </div>
    );
};

export default Dashboard;