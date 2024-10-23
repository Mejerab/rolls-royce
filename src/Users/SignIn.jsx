import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useForm } from "react-hook-form";
import useHosting from "../hooks/useHosting";
import useAxiosPublic from "../hooks/useAxiosPublic";

const SignUp = () => {
    const navigate = useNavigate();
    const { createUser, update } = useAuth();
    const location = useLocation();
    const form = location?.state?.form?.pathname || '/';
    const hostingUrl = useHosting();
    const axiosPublic = useAxiosPublic();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = async (data) => {
        console.log(data.photo[0].type);
        if (data.photo[0].type === 'image/png' || data.photo[0].type === 'image/jpeg') {
            const imageData = { image: data.photo[0] };
            const imageRes = await axiosPublic.post(hostingUrl, imageData, {
                headers: {
                    'content-type': 'multipart/form-data'
                }, withCredentials: false
            })
            if (imageRes.data) {
                createUser(data.email, data.password)
                    .then(() => {
                        update(data.name, imageRes.data.data.display_url)
                            .then(() => {
                                Swal.fire({
                                    title: 'success!',
                                    text: 'User created successfully. Press the button below to continue.',
                                    icon: 'success',
                                    confirmButtonText: 'Continue',
                                    confirmButtonColor: '#121212',
                                    background: '#111222'
                                })
                                return navigate(form);
                            })
                            .catch(error => {
                                console.error(error)
                                return Swal.fire({
                                    title: 'Error!',
                                    text: 'Some error occured',
                                    icon: 'error',
                                    confirmButtonText: 'Try Again',
                                    confirmButtonColor: '#ef4444',
                                    background: '#111222'
                                })
                            })
                    })
                    .catch(error => {
                        console.error(error);
                        return Swal.fire({
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
        else {
            return Swal.fire({
                title: 'Error!',
                text: 'Image should be in png or jpg format.',
                icon: 'error',
                confirmButtonText: 'Try Again',
                confirmButtonColor: '#ef4444',
                background: '#111222'
            })
        }

    }
    return (
        <div className="p-2 h-[42rem]">
            <div className="flex h-full justify-center items-center">
                <div className="lg:block hidden h-full border-2 border-r-0 border-white rounded-2xl rounded-r-none">
                    <img className="w-full h-full rounded-2xl rounded-r-none" src="https://wallpapers.com/images/hd/rolls-royce-1200-x-900-background-ahjhs4az8v7vdgyh.jpg" alt="" />
                </div>
                <div className="w-full lg:w-1/2 h-full flex flex-col justify-center border-white border-2 lg:rounded-l-none rounded-2xl lg:border-l-0">
                    <h3 className="text-3xl font-semibold my-6 text-center">Sign Up</h3>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="w-5/6 mx-auto">
                            <p className="font-medium">Name: </p>
                            <input {...register('name', {
                                required: true, pattern: {
                                    value: /^[A-Za-z\s]+$/,
                                    message: 'Only letters and spaces are allowed',
                                },
                            })} type="text" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type your name" />
                            {errors.name && <p className="mt-1 text-red-500"><span className="underline">Error</span>: {errors.name.message || 'Type your name'}</p>}
                        </div>
                        <div className="mt-1 w-5/6 mx-auto">
                            <p className="font-medium">Photo: </p>
                            <input {...register('photo', { required: true })} type="file" className="file-input rounded-lg w-full focus:outline-none t" />
                            {errors.photo && <p className="mt-1 text-red-500"><span className="underline">Error</span>: {'Set a image'}</p>}
                        </div>
                        <div className="mt-1 w-5/6 mx-auto">
                            <p className="font-medium">Email: </p>
                            <input {...register('email', {
                                required: true,  pattern: {
                                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Please enter a valid email address"
                                },
                            })} type="email" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type your name" />
                            {errors.email && <p className="mt-1 text-red-500"><span className="underline">Error</span>: {errors.email.message || 'Type your email'}</p>}
                        </div>
                        <div className="mt-1 w-5/6 mx-auto">
                            <p className="font-medium">Password: </p>
                            <input {...register('password', {
                                required: true, pattern: {
                                    value: /^.{7,}$/,
                                    message: 'Password must be 7 characters long',
                                },
                            })} type="password" className="input mt-2 border-none focus:outline-none w-full t" placeholder="Type your name" />
                            {errors.password && <p className="mt-1 text-red-500"><span className="underline">Error</span>: {errors.password.message || 'Type your password'}</p>}
                        </div>
                        <div className={`w-5/6 ${errors.password ? 'mt-1' : 'mt-4'} mx-auto`}>
                            <button className="btn btn-outline w-full text-white border-white font-medium text-base rounded-full">Sign Up</button>
                        </div>
                    </form>
                    <p className="font-medium text-center mt-3">Already have an account? <Link to='/login' className="font-semibold underline">Login</Link></p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;