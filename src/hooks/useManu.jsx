import { useEffect, useState } from "react";

// here this is loading data form database and sending data by return [menu]
// other component can use it simply 

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:5000/menu')
            .then(res => res.json())
            .then(data => {
                setMenu(data)
                setLoading(false)
            })
    }, [])

    return [menu, loading]
}

export default useMenu