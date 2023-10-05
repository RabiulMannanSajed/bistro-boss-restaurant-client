import { Link, useNavigate } from 'react-router-dom';
import loginImg from '../../assets/others/login.png'
import { useForm } from "react-hook-form";
import { Helmet } from 'react-helmet-async';
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';

const SignUp = () => {

    //    for using this no need to write those thing which we write in login from 

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const navigate = useNavigate();


    const onSubmit = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                // pass the data of user's name and photoUrl
                updateUserProfile(data.name, data.photoUrl)
                    .then(() => {
                        // those info is sanding to data base  when push in the git hub then don't push this line  
                        const saveUser = { name: data.name, email: data.email, password: data.password || ' ' }
                        //     find out the user's name img  
                        fetch('http://localhost:5000/users', {
                            method: "POST",
                            headers: {
                                'content-type': 'application/json'
                            },
                            body: JSON.stringify(saveUser)
                        })
                            .then(res => res.json())
                            .then(data => {
                                if (data.insertedId) {
                                    reset();

                                    alert("user Update")
                                    navigate('/'); // after user crete then take him to home page

                                }
                            })
                    })
                    .catch(error => (console.log(error)))
            })
    }

    return (
        <>
            <Helmet>
                <title>Bistro Boss | SignUp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <div className="text-center lg:text-left">
                            <img className="w-[700px]" src={loginImg} alt="" />
                        </div>
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <h1 className="text-3xl text-center font-bold mt-4">Sign Up</h1>

                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            {/* photo */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Photo Url</span>
                                </label>
                                <input type="text" {...register("photoUrl")} required={true} placeholder="photoUrl" className="input input-bordered" />
                                {errors.name && <span>Photo Url is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" {...register("name")} required={true} name='name' placeholder="name" className="input input-bordered" />
                                {errors.name && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email")} required={true} name='email' placeholder="email" className="input input-bordered" />
                                {errors.email && <span>This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" {...register("password", {
                                    required: true,
                                    minLength: 6,
                                    maxLength: 20,
                                    pattern: /(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[a-zA-Z!#$%&? "])[a-zA-Z0-9!#$%&?]/
                                })} name='password' placeholder="password" className="input input-bordered" />
                                {errors.password?.type === "required" && <p className='text-red-600'>password required</p>}
                                {errors.password?.type === "minLength" && <p className='text-red-600'>password must be more then 6 character</p>}
                                {errors.password?.type === "maxLength" && <p className='text-red-600'>password must be less then 20char required</p>}
                                {errors.password?.type === "pattern" && <p className='text-red-600'>password must have one uppercase one lowercase, one number and one special character</p>}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <input className="btn bg-[#D1A054]" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p><small>All ready have an Account <Link className='text-blue-500' to='/login'>Login </Link> </small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;