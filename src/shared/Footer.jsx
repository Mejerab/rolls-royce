import { SiRollsroyce } from "react-icons/si"
const Footer = () => {
    return (
        <>
            <footer className="footer grid grid-cols-2 justify-between lg:grid-cols-4 p-6 lg:p-10 xl:px-16 border-t">
                <aside>
                    <SiRollsroyce className="text-6xl"></SiRollsroyce>
                    <p>
                        <span className="text-lg">Rolls Royce.</span>
                        <br />
                        Providing  since 1944
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">Services</h6>
                    <a className="link link-hover">Branding</a>
                    <a className="link link-hover">Design</a>
                    <a className="link link-hover">Marketing</a>
                    <a className="link link-hover">Advertisement</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Company</h6>
                    <a className="link link-hover">About us</a>
                    <a className="link link-hover">Contact</a>
                    <a className="link link-hover">Jobs</a>
                    <a className="link link-hover">Press kit</a>
                </nav>
                <nav>
                    <h6 className="footer-title">Legal</h6>
                    <a className="link link-hover">Terms of use</a>
                    <a className="link link-hover">Privacy policy</a>
                    <a className="link link-hover">Cookie policy</a>
                </nav>
            </footer>
            <div className="border-t">
                <p className="py-5 text-center">©: All Rights reserved by Mr.Omi</p>
            </div>
        </>
    );
};

export default Footer;