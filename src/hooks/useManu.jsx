import { useEffect, useState } from "react";

// here this is loading data form database and sending data by return [menu]
// other component can use it simply 

const useMenu = () => {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading] = useState(true);

    /* // this is for pagination

    const size = 6; //fixed
    const length = menu.length;
    console.log("Length of menu", length); //Length of menu 57

    const pageCount = Math.ceil(length / size);
    console.log("Page will be ", pageCount); //Page will be  10

    const slides = [...new Array(pageCount).keys()];
    //Value of slides (10)[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]this will number of page also index number  
    console.log("Value of slides", slides);   
*/
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