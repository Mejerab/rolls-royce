import Swal from "sweetalert2";
import HeadingText from "../hooks/HeaingText";
import useAuth from "../hooks/useAuth";

const About = () => {
    const {user} = useAuth();
    const handleSubmit = e =>{
        e.preventDefault();
        const email = e.target.email;
        const message = e.target.message;
        if (email.value && message.value) {
            message.value = '';
            return Swal.fire({
                title: "Message Sent!",
                text: "Your message is sent successfully.",
                icon: "success",
                confirmButtonColor: '#121212',
                background: '#111222'
            });
        }
        else{
            return Swal.fire({
                title: "Please fill the fields!",
                text: "Your must enter your email and message",
                icon: "error",
                confirmButtonColor: '#121212',
                background: '#111222'
            });
        }
        
    }
    return (
        <div>
            <HeadingText text={"Our Legacy of Excellence"} />
            <p>
                The history of Rolls-Royce is a tale of luxury, innovation, and engineering excellence. Founded in 1904 by Charles Rolls, a car dealer, and Henry Royce, an engineer, the brand quickly became synonymous with high-quality, reliable automobiles. The company's first success was the Silver Ghost, renowned for its smooth ride and silent operation, earning it the title of "the best car in the world." Rolls-Royce expanded its expertise to aviation in World War I, producing highly regarded aircraft engines, further cementing its reputation for precision engineering. Throughout the 20th century, the brand continued to set standards in both the automotive and aerospace industries.
                <br /><br />
                In 1998, Rolls-Royce Motors was acquired by BMW, continuing its legacy under the new ownership. Today, Rolls-Royce is known for producing bespoke, handcrafted luxury vehicles that cater to the elite, maintaining a blend of tradition and cutting-edge technology. The iconic Spirit of Ecstasy mascot and the Pantheon grille symbolize the brand’s rich heritage. Rolls-Royce’s commitment to personalization has remained a cornerstone, with each car crafted to reflect its owner's unique vision. Over the years, the brand has evolved into a global symbol of luxury, sophistication, and timeless elegance.</p>
            <HeadingText text={'Your Journey Begins Here'} />
            <div className="hero bg-base-200 py-16 my-6 rounded-2xl">
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className="text-center lg:text-left">
                        <h1 className="text-5xl font-bold uppercase">Send us a message now!</h1>
                        <p className="py-6">
                            Feel free to send us you valueable message, You can complain for any problem related to our car. We will try our best to help you. You will recive your feedback within 24 hours.
                        </p>
                    </div>
                    <div className="card bg-base-100 w-full max-w-sm shrink-0 rounded-2xl shadow-2xl">
                        <form onSubmit={handleSubmit} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input defaultValue={user?.email} type="email" name="email" placeholder="Type your email" className="input border-none focus:outline-none w-full text-sm" required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Message</span>
                                </label>
                                <textarea name="message" rows={2} className="textarea border-none focus:outline-none w-full" placeholder="Type your message"></textarea>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn btn-primary">Send</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;