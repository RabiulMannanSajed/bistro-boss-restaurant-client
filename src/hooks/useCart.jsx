
import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
// import { useEffect } from 'react';
// import { useState } from 'react';

const useCart = () => {

    // below part is using form 2nd step 
    // const [bookingProducts, setBookingProducts] = useState([])

    const {user} = useAuth()
    const [axiosSecure] = useAxiosSecure()

    // there is two way to load data from backed/database 

    // 1st step is use tanstack-react-query (this is running )s

    // if user is not signin then take him to login page 

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        // queryFn: async () => {
        //     const res = await (`http://localhost:5000/carts?email=${user?.email}`, {
        //         headers: {
        //             authorization: `bearer ${token}`
        //         }
        //     })
        //     return res.json()
        // },
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })
    return [cart, refetch]

    // /refetch is use for reload data 

    // 2nd step is using normal useEffect and fetch
    // if use this problem to show added product num 
    // useEffect(() => {
    //     fetch(`http://localhost:5000/carts?email=${user?.email}`)
    //         .then(res => res.json())
    //         .then(data => setBookingProducts(data))
    // }, [user?.email])
    // return [bookingProducts]

}

export default useCart;