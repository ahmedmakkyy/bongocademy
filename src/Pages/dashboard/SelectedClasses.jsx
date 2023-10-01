import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const SelectedClasses = () => {
  const { user } = useContext(AuthContext);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchSelectedClasses = async () => {
      if (user && user.email) {
        const url = `https://bongo-sports-server.vercel.app/mySelectedClasses?student_email=${user.email}`;

        try {
          const response = await axiosSecure.get(url);
          if (response.status === 200) {
            const data = response.data;

            // Filter out duplicate classes by select_id
            const uniqueClasses = [];
            data.forEach((classItem) => {
              if (!uniqueClasses.some((item) => item.select_id === classItem.select_id)) {
                uniqueClasses.push(classItem);
              }
            });

            setSelectedClasses(uniqueClasses);
          } else {
            console.log('Error:', response.status);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };


    fetchSelectedClasses();
  }, [axiosSecure, user]);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const totalPrice = selectedClasses.reduce(
        (accumulator, currentClass) => accumulator + parseFloat(currentClass.course_price),
        0
      );
      setTotalPrice(totalPrice);
    };

    calculateTotalPrice();
  }, [selectedClasses]);

  const handleDelete = (selectId) => {




    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://bongo-sports-server.vercel.app/mySelectedClasses/${selectId}`, {
          method: 'DELETE'
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.deletedCount > 0) {
              Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
              )

            }
            setSelectedClasses(prevState => prevState.filter(item => item.select_id !== selectId));


          })
          .catch(error => {
            console.error('Error:', error);

          });


      }
    })

  };

  return (
    <div className='m-5 h-96'>
      <div>
        <h1 className="text-2xl font-bold mb-8 text-yellow-500 relative border-l-4 pl-2 border-emerald-500">
          Selected Classes
        </h1>
      </div>
      <div className="my-20 flex items-center justify-center">
        <div><h3 className="text-xl text-emerald-500 font-semibold">Total Price: {totalPrice}</h3></div>
        <div>
        <Link to={`/dashboard/payment?price=${totalPrice}`} className="ml-4">
          <button className="p-2 bg-sky-500">Pay Now</button>
        </Link>
        </div>
      </div>
      <div className='overflow-x-auto text-center'>
        <table className="w-full font-semibold text-sm text-emerald-500 bg-indigo-900 bg-opacity-20 backdrop-blur-lg">
          <thead>
            <tr className="border-b bg-emerald-500 text-black">
              <th className="p-2">#</th>
              <th className="p-2">Sport Name</th>
              <th className="p-2">Instructor</th>
              <th className="p-2">Course Fee</th>
              <th className="p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {selectedClasses.map((classes, index) => (
              <tr key={classes._id} className="border-b">
                <td className="p-2">{index + 1}</td>
                <td className="p-2">{classes.sport_name}</td>
                <td className="p-2">{classes.instructor_name}</td>
                <td className="p-2">{classes.course_price}</td>
                <td className="p-2">
                  <button
                    className="p-2 bg-red-500 hover:bg-red-600"
                    onClick={() => handleDelete(classes.select_id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default SelectedClasses;
