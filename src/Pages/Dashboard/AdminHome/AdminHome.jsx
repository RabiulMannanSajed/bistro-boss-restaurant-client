import { Helmet } from "react-helmet-async";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaConciergeBell, FaTruck, FaUsers, FaWallet } from "react-icons/fa";

const AdminHome = () => {
    const { user } = useAuth();
    const [axiosSecure] = useAxiosSecure()
    const { data: stats = {} } = useQuery({
        queryKey: ['admin-state'],
        queryFn: async () => {
            const res = await axiosSecure('/admin-stats')
            return res.data;
        }

    })

    return (
        <div className="w-full m-4">
            <Helmet>
                <title>Bistro Boss | Admin Home </title>
            </Helmet>
            <h3 className="text-2xl">Welcome <span className="text-orange-500">Mr.{user.displayName}</span> Admin</h3>
            <div className="stats shadow">

                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaWallet className="text-3xl"></FaWallet>
                    </div>
                    <div className="stat-value">{stats.revenue}</div>
                    <div className="stat-title">Revenue</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaUsers className="text-3xl"></FaUsers>
                    </div>
                    <div className="stat-value">{stats.user}</div>
                    <div className="stat-title">Customers</div>
                </div>

                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaConciergeBell className="text-3xl"></FaConciergeBell>
                    </div>
                    <div className="stat-value">{stats.products}</div>
                    <div className="stat-title">Products</div>
                </div>
                <div className="stat">
                    <div className="stat-figure text-orange-500">
                        <FaTruck className="text-3xl"></FaTruck>
                    </div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-title">orders</div>
                </div>

            </div>
        </div>
    );
};

export default AdminHome;