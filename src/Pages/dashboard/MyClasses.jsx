import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import { Link } from 'react-router-dom';

const MyClasses = () => {
    const { user } = useContext(AuthContext)
    const [classes, setClasses] = useState([]);

    const url = `https://bongo-sports-server.vercel.app/myClasses?instructor_email=${user?.email}`
    useEffect(() => {

        fetch(url)
            .then(response => response.json())
            .then(data => setClasses(data))
            .catch(error => console.error('Error:', error));
    }, [url]);

    return (
        <div className='m-5'>
            <div>
                <h1 className="text-2xl font-bold mb-8 text-yellow-500 relative border-l-4 pl-2 border-emerald-500">
                    My Classes
                </h1>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 gap-2">
                {classes.map((classes) => (
                    <div key={classes._id} className="card w-96">
                    <div className="bg-gray-800 backdrop-blur-md shadow-lg flex p-3">
                      <div>
                        <img
                          src={classes.image}
                          alt={classes.title}
                          style={{ width: '10rem', height: '7.5rem' }}
                          className='object-cover'
                        />
                      </div>
                      <div className="ml-5">
                        <h2 className="text-sm font-bold mb-1 text-yellow-400">{classes.sport_name}</h2>
                        <p className="text-gray-100 mb-1 text-xs">Students: {classes.available_seats}</p>
                        <p className="text-gray-100 mb-1 text-xs">Course Fee: {classes.course_price}</p>
                        <div className=''>
                          {classes.status === 'Pending' ? (
                            <p className="text-gray-100 text-xs">Feedback: <br /> <span className='text-warning text-xs'>Your Class is pending.</span></p>
                          ) : (
                            <p className="text-gray-100 text-xs">Feedback: <br /> <span className='text-success text-xs'>Your Class has been approved by Admin</span></p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                ))}
            </div>
        </div>
    );
};

export default MyClasses;
