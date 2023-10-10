import { useQuery } from '@tanstack/react-query'
import useAxiosSecure from './useAxiosSecure';
import useAuth from './useAuth';
// import { useEffect } from 'react';
// import { useState } from 'react';

const useCart = () => {

    // below part is using form 2nd step 
    // const [bookingProducts, setBookingProducts] = useState([])

    const { user, loading } = useAuth()
    const [axiosSecure] = useAxiosSecure()

    // there is two way to load data from backed/database 

    // 1st step is use tanstack-react-query (this is running )s

    // if user is not signin then take him to login page 

    const { refetch, data: cart = [] } = useQuery({
        queryKey: ['carts', user?.email],
        enabled: !loading,
        queryFn: async () => {
            const res = await axiosSecure(`/carts?email=${user?.email}`)
            console.log('res from axios', res)
            return res.data;
        },
    })
    return [cart, refetch]

    

}

export default useCart;