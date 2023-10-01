import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import useInstructor from '../../hooks/useInstructor';

const ClassDetail = () => {
    const classes = useLoaderData();
    console.log(classes);

    const navigate = useNavigate();

    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin();
    const [isInstructor] = useInstructor();


    const handleSelect = (user, classes) => {
        if (!user) {
            navigate('/login', { state: { from: location }, replace: true });
            return null;
        }

        const classData = {
            select_id: classes._id,
            sport_name: classes.sport_name,
            image: classes.image,
            student_email: user?.email,
            instructor_name: classes.instructor_name,
            instructor_email: classes.instructor_email,
            instructor_photo: classes.instructor_photo,
            available_seats: classes.available_seats,
            course_price: classes.course_price,
            enrolled: classes.enrolled,
        };

        fetch('https://bongo-sports-server.vercel.app/allSelectedClasses', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(classData),
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.insertedId) {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Class has been selected',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
            })

    };

    return (


        <div className="container mx-auto">
            <div className="card lg:card-side bg-base-100  mt-20 mb-3 ">
                <img
                    src={classes.image}
                    alt="Basketball"
                    className="w-1/3 h-1/3 object-cover mr-6"
                />
                <div>
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">{classes.sport_name}</h2>
                    <p className="text-gray-600 mb-2">
                        Instructor: <span className="font-semibold">{classes.instructor_name}</span>
                    </p>
                    <p className="text-gray-600 mb-2">
                        Course Fee: <span className="font-semibold">{classes.course_price}</span>
                    </p>
                    <p className="text-gray-600 mb-2">
                        Available Seats: <span className="font-semibold">{classes.available_seats}</span>
                    </p>
                    {isAdmin || isInstructor ? (
                        // Render a message or other content for isAdmin and isInstructor users
                        <p className="text-gray-600">You cannot select this class as an admin or instructor.</p>
                    ) : classes.available_seats === 0 ? (
                        <button
                            className="btn btn btn-active btn-disabled my-2"
                            disabled={true}
                            style={{ backgroundColor: "red", color: "white" }}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                />
                            </svg>
                            Seat Full
                        </button>
                    ) : (
                        <>
                            {/* Add your custom logic here for user selection */}
                            {(
                                <button
                                    className="btn btn btn-active btn-neutral my-2"
                                    onClick={() => handleSelect(user, classes)}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                                        />
                                    </svg>
                                    Select Class
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>







    )
};

export default ClassDetail;