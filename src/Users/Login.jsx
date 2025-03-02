import { FcGoogle } from "react-icons/fc";
import Swal from "sweetalert2";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
    const { login, googleLogin, facebookLogin, user } = useAuth();
    const location = useLocation();
    const form = location?.state?.form?.pathname || '/';
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const handleGoogle = () => {
        if (user) {
            Swal.fire({
                title: 'Error',
                text: 'User already exists',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
        }
        else {
            googleLogin()
                .then(result => {
                    console.log(result.user)
                    Swal.fire({
                        title: 'Success',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Continue',
                        confirmButtonColor: '#121212',
                        background: '#111222'
                    })
                    return navigate(form)
                })
                .catch(error => {
                    console.error(error)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Some error occured',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                        confirmButtonColor: '#ef4444',
                        background: '#111222'
                    })
                })
        }
    }
    const handleFacebook = () => {
        if (user) {
            Swal.fire({
                title: 'Error',
                text: 'User already exists',
                icon: 'error',
                confirmButtonText: 'Try again'
            })
        }
        else {
            facebookLogin()
                .then(result => {
                    console.log(result);
                    Swal.fire({
                        title: 'Success',
                        text: 'Do you want to continue',
                        icon: 'success',
                        confirmButtonText: 'Continue',
                        confirmButtonColor: '#121212',
                        background: '#111222'
                    })
                    return navigate(form)
                })
                .catch(error => {
                    console.error(error)
                    Swal.fire({
                        title: 'Error!',
                        text: 'Some error occured',
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                        confirmButtonColor: '#ef4444',
                        background: '#111222'
                    })
                })
        }
    }
    const onSubmit = (data) => {
        login(data.email, data.password)
            .then(() => {
                Swal.fire({
                    title: 'success!',
                    text: 'User Login successfull. Press the button below to continue.',
                    icon: 'success',
                    confirmButtonText: 'Continue',
                    confirmButtonColor: '#121212',
                    background: '#111222'
                });
                return navigate(form)
            })
            .catch(error => {
                console.log(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Some error occured',
                    icon: 'error',
                    confirmButtonText: 'Try Again',
                    confirmButtonColor: '#ef4444',
                    background: '#111222'
                })
            })
    }
    return (
        <div className="p-4 flex h-[43rem] items-center">
            <div className="w-full lg:w-1/2 border-white h-full grid place-items-center border-2 lg:border-r-0 rounded-2xl lg:rounded-r-none">
                <form onSubmit={handleSubmit(onSubmit)} className="mx-auto -mb-5 w-full">
                    <h3 className="text-center text-3xl font-medium">Login</h3>
                    <div className="w-5/6 mx-auto">
                        <p className="font-medium">Email:</p>
                        <input {...register('email', {
                            required: true, pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address"
                            }
                        })} type="email" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type your email" />
                        {errors.email && <p className="t text-red-500 mt-1">{errors.email.message || 'Type your email'}</p>}
                    </div>
                    <div className="mt-9 w-5/6 mx-auto">
                        <p className="font-medium">Password:</p>
                        <input {...register('password', {
                            required: true, pattern: {
                                value: /^.{7,}$/,
                                message: 'Password must be 7 characters or long',
                            },
                        })} type="password" className="input mt-2 w-full border-none focus:outline-none t" placeholder="Type your password" />
                        {errors.password && <p className="t text-red-500 mt-1">{errors.password.message || 'Type your password'}</p>}
                    </div>
                    <div className="w-5/6 mt-9 mx-auto">
                        <button className="btn btn-outline w-full text-white border-white font-medium text-base rounded-full">Login</button>
                    </div>
                </form>
                <p className="font-medium">Don&lsquo;t have an account? <Link to='/signup' className="font-semibold underline">Sign Up</Link></p>
                <div className="flex items-center justify-center -mt-5">
                    <div className="w-[60px] h-[1px] bg-gray-500"></div>
                    <div className="font-serif mx-2">Or</div>
                    <div className="w-[60px] h-[1px] bg-gray-500"></div>
                </div>
                <div className="space-y-4 w-5/6">
                    <button onClick={handleGoogle} className="btn w-full btn-outline relative border-white text-white rounded-full"><FcGoogle className="text-3xl absolute top-2 left-2" /> Continue with Google</button>
                    <button onClick={handleFacebook} className="btn relative w-full btn-outline border-white text-white rounded-full"><img className="w-12 absolute left-0" src="https://static.vecteezy.com/system/resources/previews/018/930/476/original/facebook-logo-facebook-icon-transparent-free-png.png" alt="" />Continue with Facebook</button>
                </div>
            </div>
            <div className="hidden lg:block h-full border-white border-2 border-l-0 rounded-2xl rounded-l-none">
                <img className="w-full h-full rounded-2xl rounded-l-none" src="https://wallpapers.com/images/hd/rolls-royce-1200-x-900-background-ahjhs4az8v7vdgyh.jpg" alt="" />
            </div>
        </div>
    );
};

export default Login;