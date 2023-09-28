import { useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { loadCaptchaEnginge, LoadCanvasTemplate, validateCaptcha } from 'react-simple-captcha';
import loginImg from '../../assets/others/login.png'
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import { Link } from "react-router-dom";

const Login = () => {

    /// this is taking value of captcha
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true); // use to disable btn Login

    const { signIn, signOut } = useContext(AuthContext)

    useEffect(() => { // useEffect use cause this value of captcha will change every time
        loadCaptchaEnginge(6); // how many number this captcha will give 
    }, [])

    const handelLogin = (event) => {
        event.preventDefault();
        const from = event.target;
        const email = from.email.value;
        const password = from.password.value;
        console.log(email, password);
        signIn(email, password) // this is take two paramarter
            .then(result => {
                const user = result.user; //  this result is given an user info
                console.log(user);
            })
    }

    // here is the checking of this state is true or false
    const handelValidationCaptcha = () => {
        const user_captcha_value = captchaRef.current.value;
        console.log(user_captcha_value);

        if (validateCaptcha(user_captcha_value) == true) {
            setDisabled(false);
        }
        else {
            setDisabled(true);
        }
    }
    return (
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
                                <input type="text" ref={captchaRef} name="captcha" placeholder="Type the text above" className="input input-bordered" />
                                <button onClick={handelValidationCaptcha} className="btn btn-outline btn-xs mt-2">Validation</button>
                            </div>

                            <div className="form-control mt-6">
                                <input disabled={disabled} className="btn bg-[#D1A054]" type="button" value="Login" />
                            </div>
                        </form>
                        <p><small>New Here? <Link to="/signup">Create an account</Link></small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;