import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../LogIn & SignUp/AuthProvider/AuthProvider';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const PaymentDetails = () => {
  const { user } = useContext(AuthContext);
  const [payments, setPayments] = useState([]);
  const [axiosSecure] = useAxiosSecure();

  useEffect(() => {
    const fetchPayments = async () => {
      if (user && user.email) {
        try {
          const response = await axiosSecure.get(`/payments?email=${user.email}`);
          if (response.status === 200) {
            console.log(response.data);
            setPayments(response.data);
          } else {
            console.log('Error:', response.status);
          }
        } catch (error) {
          console.log('Error:', error);
        }
      }
    };

    fetchPayments();
  }, [axiosSecure, user]);

  return (
    <div className='m-5'>
      <div>
        <h1 className="text-2xl font-bold mb-8 text-yellow-500 relative border-l-4 pl-2 border-emerald-500">
          Payment History
        </h1>
      </div>
      <div className="overflow-x-auto">
        <table className="table w-full p-2 text-sm">
          <thead>
            <tr className="bg-emerald-500 text-gray-800">
              {/* <th className="py-2 px-1">Index</th> */}
              <th className="py-2 px-1">Amount</th>
              <th className="py-2 px-1">Date</th>
              <th className="py-2 px-1">Transaction ID</th>
              {/* <th className="py-2 px-2">Enrolled Courses</th> */}
            </tr>
          </thead>
          <tbody className='bg-gray-800 bg-opacity-80 backdrop-blur-md'>
            {payments.map((payment) => (
              <tr key={payment.transactionID}>
                {/* <td className="py-2 px-1 text-gray-100">{index + 1}</td> */}
                <td className="py-2 px-1 text-gray-100">{payment.price}</td>
                <td className="py-2 px-1 text-gray-100">
                  {new Date(payment.date).toLocaleDateString()}
                </td>

                <td className="py-2 px-1 text-gray-100">{payment.transactionID}</td>
                {/* <td className="py-2 px-2">
                  <ul className="list-disc list-inside">
                    {payment.classes.map((classesObj, index) => (
                      <p key={index} className="text-gray-100">{index+1}. {classesObj.sport_name}</p>
                    ))}
                  </ul>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PaymentDetails;
