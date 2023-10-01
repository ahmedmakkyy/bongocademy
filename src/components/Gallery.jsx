import React, { useEffect } from 'react';
import Aos from 'aos';
import 'aos/dist/aos.css'
const Gallery = () => {
    useEffect(() => {
        Aos.init();
    }, [])

    return (
        <div className="my-10 p-3 bg-gray-200 bg-opacity-10" data-aos="fade-down">
            <div>

                <h1 className="text-2xl text-sky-500 mb-8 text-yellow-500 relative border-l-4 border-indigo-500 pl-2">
                    Image Gallery
                </h1>

            </div>
            <div className="-m-1 flex flex-wrap md:-m-2">
                <div className="flex w-1/2 flex-wrap">
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-1.jpg" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-2.jpg" />
                    </div>
                    <div className="w-full p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-3.jpg" />
                    </div>
                </div>
                <div className="flex w-1/2 flex-wrap">
                    <div className="w-full p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-4.jpg" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-5.jpg" />
                    </div>
                    <div className="w-1/2 p-1 md:p-2">
                        <img
                            alt="gallery"
                            className="block h-full w-full rounded-lg object-cover object-center"
                            src="./slide-6.jpg" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Gallery;