import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import usePopularInsturctors from '../hooks/usePopularInsturctors';
import Aos from 'aos';
import 'aos/dist/aos.css'


const PopularInstructors = () => {
  useEffect(() => {
    Aos.init();
  }, [])
  const [instructors] = usePopularInsturctors();
  console.log(instructors);
  return (
    <div className="my-20 p-3 bg-gray-200 bg-opacity-10" data-aos="fade-up">
      <div>
        <h1 className="text-2xl mb-8 text-emerald-500 relative border-l-4 border-yellow-500 pl-2">
          Popular Instructors
        </h1>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-5 p-1">
          {instructors.map((instructor, index) => (
            <div key={instructor.instructor_name} className="text-white relative">
              <div className="absolute top-0 left-0 right-0  text-3xl text-gray-400 text-center z-10 border-b-4 border-emerald-100 pl-2">
                #{index + 1}
              </div>
              <div className="p-2 my-10 flex items-center">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-3">
                  <img
                    src={instructor.instructor_photo}
                    alt={`Instructor ${instructor.instructor_name}`}
                    className="object-cover w-full h-full"
                  />
                </div>
                <div className="flex-grow">
                  <div className="card-body text-left">
                    <h2 className="font-bold text-md text-emerald-500">{instructor.instructor_name}</h2>
                    <p className="font-semibold text-sm text-gray-500">Students: {instructor.totalStudents}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default PopularInstructors;