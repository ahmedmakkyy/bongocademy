
import useAllInstructors from '../hooks/useAllInstructors';


const Instructors = () => {
    const [allinstructors] = useAllInstructors();
    console.log(allinstructors);
    return (
        <div className='container mx-auto'>
            <div>
                <div>      
                    <h1 className="text-3xl mt-16 pt-10 text-center mb-8 text-gray-400 font-bold relative">
                        Our Instructors
                    </h1>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-5 mx-20">
                    {allinstructors.map((instructor) => (
                       <div key={instructor.instructor_email} className="text-white relative">
                
                       <div className="p-2 my-2 flex items-center shadow-lg bg-emerald-900 rounded-3xl">
                         <div className="w-24 h-24 rounded-full overflow-hidden mr-3">
                           <img
                             src={instructor.instructor_photo}
                             alt={`Instructor ${instructor.instructor_name}`}
                             className="object-cover w-full h-full"
                           />
                         </div>
                         <div className="flex-grow">
                           <div className="card-body text-left">
                             <h2 className="font-bold text-md text-emerald-200">{instructor.instructor_name}</h2>
                              
                             <p className="font-semibold text-sm text-gray-200">E-mail: {instructor.instructor_email}</p>
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

export default Instructors;