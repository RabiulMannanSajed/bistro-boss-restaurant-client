import { useState } from "react";
import { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loginImg from '../../assets/others/login.png'
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const Login = () => {

    /// this is taking value of captcha
    const [disabled, setDisabled] = useState(true); // use to disable btn Login
    const { signIn } = useContext(AuthContext)

    // take the path of user from where he is coming from
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || "/"; // if user location state is not clear the take him to home page 

    useEffect(() => { // useEffect use cause this value of captcha will change every time
        loadCaptchaEnginge(6); // how many number this captcha will give 
    }, [])

    const handelLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        signIn(email, password) // this is take two paramarter
            .then(result => {
                const user = result.user; //  this result is given an user info
                console.log(user);

                Swal.fire({
                    title: 'Successfully Login',
                    showClass: {
                        popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                        popup: 'animate__animated animate__fadeOutUp'
                    }
                })


                // this will take the user in his previes path
                navigate(from, { replace: true });
            })
    }

    // here is the checking of this state is true or false
    const handelValidationCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        console.log(user_captcha_value);

        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }
    return (
        <>
            <Helmet>
                <title>Bistro Boss | Login</title>
            </Helmet>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex md:flex">
                        <div className="text-center lg:text-left">
                            <img className="w-[700px]" src={loginImg} alt="" />
                        </div>
                        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                            <h1 className="text-2xl font-bold text-center mt-4">Login</h1>

                            <form onSubmit={handelLogin} className="card-body">
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Email</span>
                                    </label>
                                    <input type="email" name="email" placeholder="email" className="input input-bordered" />
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text">Password</span>
                                    </label>
                                    <input type="password" name="password" placeholder="password" className="input input-bordered" />
                                    <label className="label">
                                        <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="label">
                                        <LoadCanvasTemplate />
                                    </label>
                                    <input onBlur={handelValidationCaptcha} type="text" name="captcha" placeholder="Type the text above" className="input input-bordered" />
                                </div>

                                <div className="form-control mt-6">
                                    {/* Make btn disable for captcha */}
                                    <input disabled={false} className="btn bg-[#D1A054]" type="submit" value="Login" />
                                </div>
                            </form>
                            <p><small>New Here? <Link className='text-blue-500' to="/signup">Create an account</Link></small></p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;