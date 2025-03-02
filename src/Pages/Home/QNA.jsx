import HeadingText from "../../hooks/HeaingText";

const Qna = () => {
    return (
        <div>
            <HeadingText text={'The Royal Road to Clarity'} />
            <div className="flex xl:flex-row flex-col-reverse items-center my-7">
                <div className="xl:w-1/2">
                    <div className="collapse collapse-plus bg-base-200 lg:rounded-l-2xl">
                        <input type="radio" name="my-accordion-3" defaultChecked />
                        <div className="collapse-title text-xl font-medium">What makes a Rolls-Royce unique compared to other luxury vehicles?.</div>
                        <div className="collapse-content">
                            <p>Rolls-Royce is known for its unparalleled craftsmanship, bespoke customization options, hand-built engines, and use of the finest materials, ensuring each vehicle is a unique masterpiece</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 lg:rounded-l-2xl">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium"> How does the bespoke program work for Rolls-Royce cars?</div>
                        <div className="collapse-content">
                            <p>Rolls-Royce’s bespoke program allows clients to personalize almost every aspect of their car, from exterior colors to interior materials, stitching, and even custom art pieces inside the cabin.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 lg:rounded-l-2xl">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium">What is the significance of the Spirit of Ecstasy emblem?</div>
                        <div className="collapse-content">
                            <p>The Spirit of Ecstasy is the iconic hood ornament on Rolls-Royce cars, symbolizing grace, beauty, and luxury. Each emblem is carefully crafted and can even be customized with materials like gold or illuminated versions.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 lg:rounded-l-2xl">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium"> What are the most popular Rolls-Royce models?</div>
                        <div className="collapse-content">
                            <p>Some of the most sought-after models include the Rolls-Royce Phantom, Rolls-Royce Ghost, Rolls-Royce Wraith, and the Rolls-Royce Cullinan, each offering a blend of luxury and performance.</p>
                        </div>
                    </div>
                    <div className="collapse collapse-plus bg-base-200 rounded-b-2xl lg:rounded-b-none lg:rounded-l-2xl">
                        <input type="radio" name="my-accordion-3" />
                        <div className="collapse-title text-xl font-medium"> What kind of performance can I expect from a Rolls-Royce?</div>
                        <div className="collapse-content">
                            <p>Rolls-Royce vehicles combine luxury with power, featuring V12 engines in many models, ensuring a smooth yet powerful drive. The emphasis is on a serene driving experience with whisper-quiet cabins.</p>
                        </div>
                    </div>
                </div>
                <div className="xl:w-1/2">
                    <img className="lg:h-[31rem] 2xl:h-[29.4rem] rounded-t-2xl lg:rounded-t-none lg:rounded-r-2xl" src="https://media.istockphoto.com/id/1415491459/photo/portrait-of-a-rolls-royce-cullinan-wide-body-suv-by-mansory.jpg?s=612x612&w=0&k=20&c=gk2qA_3lqBhtQux6f1ln9IHy05S8DohcLOX67gfdFAE=" alt="" />
                </div>
            </div>
        </div>
    );
};

export default Qna;