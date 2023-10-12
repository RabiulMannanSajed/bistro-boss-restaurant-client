import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import { useForm } from 'react-hook-form';
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import axios from "axios";


// this is the way to upload the img in the img data base  
// never shear token to any one and don't mention the server name where u hosting the img 

const img_hosting_token = import.meta.env.VITE_Image_Upload_token;

const AddItems = () => {
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit, reset } = useForm();

    // this is the way to wright  the hosting code 
    const img_hosting_url = `https://api.imgbb.com/1/upload?key=${img_hosting_token}`;

    const onSubmit = data => {
        // console.log(data); // this data is give the info of the item 
        const formData = new FormData();
        formData.append('image', data.image[0]);
        // this fatch is for host the photo in imgbb
        fetch(img_hosting_url, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(imageRes => {
                console.log(imageRes);
                if (imageRes.success) {
                    const imgUrl = imageRes.data.display_url; /// and here u find the url link of this photo 
                    const { name, recipe, category, price } = data; // arange the value of the data as object 
                    //  here we convert the price string to float cause when data is given this time it will in string  
                    // so make it  int number to use in your work 
                    const newItem = { name, recipe, category, image: imgUrl, price: parseFloat(price) }
                    console.log(newItem);
                    // send data to data base by using axios 
                    axiosSecure.post('/menu', newItem)
                    .then(data =>{
                        console.log("after posting new item",data);
                    })
                }
            })
    }
    return (
        <div className="w-full px-10">
            <SectionTitle
                subHeading={'What is new'}
                heading={'Add an item'}
            />
            <form className="bg-[#F3F3F3] rounded m-5" onSubmit={handleSubmit(onSubmit)}>
                {/* Food name */}
                <div className="form-control w-full  my-4">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe name*</span>
                    </label>
                    <input type="text" placeholder="Recipe name"
                        {...register("name", { required: true, maxLength: 80 })}
                        className="input input-bordered input-primary w-full " />
                </div>
                <div className="flex ">
                    {/* select section  */}
                    <div className="form-control w-full my-4 ">
                        <label className="label">
                            <span className="label-text font-semibold">Category*</span>
                        </label>
                        <select defaultValue="Pick One" {...register("category", { required: true })} className="select select-primary w-full ">
                            <option disabled>Pick One</option>
                            <option>Pizza</option>
                            <option>Salad</option>
                            <option>Drinks</option>
                            <option>Soup</option>
                            <option>Dessert</option>
                        </select>
                    </div>
                    {/* price */}
                    <div className="form-control w-full ml-4 my-4">
                        <label className="label">
                            <span className="label-text font-semibold">Price*</span>
                        </label>
                        <input
                            {...register("price", { required: true })}
                            type="number" placeholder="Type here" required className="input input-bordered input-primary w-full " />
                    </div>
                </div>
                {/* Recipe */}
                <div className="form-control my-4">
                    <label className="label">
                        <span className="label-text font-semibold">Recipe Details</span>
                    </label>
                    <textarea
                        {...register("recipe", { required: true })}
                        className="textarea textarea-info textarea-bordered h-24" placeholder="Bio"></textarea>
                </div>
                {/* Image  */}
                <div className="form-control w-full max-w-xs">
                    <label className="label ">
                        <span className="label-text ">Item Image*</span>
                    </label>
                    <input    {...register("image", { required: true })} type="file" className="file-input file-input-bordered w-full " />
                </div>
                <input className="btn btn-sm mt-4" type="submit" value="Add item" />
            </form>
        </div>
    );
};

export default AddItems;