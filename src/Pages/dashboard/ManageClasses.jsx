import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ManageClasses = () => {

  const { data: classes = [], refetch } = useQuery(['classes'], async () => {
    const res = await fetch('https://bongo-sports-server.vercel.app/myClasses')
    return res.json();
  })

  const handleApprove = classes => {
    fetch(`https://bongo-sports-server.vercel.app/classes/statusApprove/${classes._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        refetch();
      })
  }
  const handleDeny = classes => {
    fetch(`https://bongo-sports-server.vercel.app/classes/statusDeny/${classes._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        refetch();
      })
  }
  return (
    <div className='m-5'>
      <div>
        <h1 className="text-2xl font-bold mb-8 text-yellow-500 relative border-l-4 pl-2 border-emerald-500">
          Manage Classes
        </h1>
      </div>
      <div className="flex flex-wrap">
        <table className="w-full text-xs">
          <thead className='bg-emerald-500 text-left text-md text-white'>
            <tr>
              <th className="px-1 py-2">Sport Name</th>
              <th className="px-1 py-2">Instructor</th>
              {/* <th className="px-1 py-1">E-mail</th> */}
              <th className="px-1 py-2">Status</th>
              {/* <th className="px-1 py-1">Available Seats</th> */}
              <th className="px-1 py-2">Course Fee</th>
              <th className="px-1 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {classes.map((classItem) => (
              <tr key={classItem._id} className="bg-gray-800 bg-opacity-80 backdrop-blur-md  text-white">
                <td className="px-1 py-1">{classItem.sport_name}</td>
                <td className="px-1 py-1">{classItem.instructor_name}</td>
                {/* <td className="px-1 py-1">{classItem.instructor_email}</td> */}
                <td className="px-1 py-1 ">{classItem.status}</td>
                {/* <td className="px-1 py-1">{classItem.available_seats}</td> */}
                <td className="px-1 py-1">{classItem.course_price}</td>
                <td className="px-1 py-1">
                  {classItem.status === 'Approve' ? (
                    <div className="flex gap-2">
                      <button className="mt-4 px-1 py-1 bg-green-500 text-white rounded" disabled>
                        Approved
                      </button>
                    </div>
                  ) :

                    (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleApprove(classItem)}
                          className="mt-4 px-1 py-1 bg-green-500 text-white rounded"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleDeny(classItem)}
                          className="mt-4 px-1 py-1 bg-red-500 text-white rounded"
                        >
                          Deny
                        </button>
                      </div>
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageClasses;