import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { FaTrashAlt, FaUserShield } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AllUser = () => {
    const [axiosSecure] = useAxiosSecure()
    
    const { data: users = [], refetch } = useQuery(['users'], async () => {
        const res = await axiosSecure('/users')
        return res.json();
    })
    const handelMakeAdmin = (user) => {
        fetch(`http://localhost:5000/users/admin/${user._id}`, {
            method: "PATCH",
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount) {
                    refetch()
                    Swal.fire({
                        position: 'top-center',
                        icon: 'success',
                        title: `${user.name} is an Admin now`,
                        timer: 1500,
                    })
                }
            })

    }
    const handelDelete = (user) => {

    }
    return (
        <div className="w-3/4 ">
            <Helmet>
                <title>Bistro Boss | All Users</title>
            </Helmet>
            <SectionTitle subHeading={'How many??'} heading={"MANAGE ALL USERS"} ></SectionTitle>

            <h3 className="text-3xl font-semibold mr-8">Total Users :{users.length}</h3>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead className="bg-[#D1A054]">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) =>
                                <tr className="hover"
                                    key={users._id}>
                                    <th>{index + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role === 'admin' ? 'admin' :
                                        <button onClick={() => handelMakeAdmin(user)} className="btn btn-ghost btn-sm bg-[#D1A054] text-white"><FaUserShield /></button>
                                    }</td>
                                    <td ><button onClick={() => handelDelete(user)} className="btn btn-ghost btn-sm bg-red-600 text-white"><FaTrashAlt /></button>
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

export default AllUser;