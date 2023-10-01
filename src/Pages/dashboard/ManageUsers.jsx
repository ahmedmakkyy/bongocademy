import { useQuery } from '@tanstack/react-query';


const ManageUsers = () => {


  const { data: users = [], refetch } = useQuery(['users'], async () => {
    const res = await fetch('https://bongo-sports-server.vercel.app/users')
    return res.json();
  })

  const admins=users.filter(user => user.role === 'admin')
  const insturctors=users.filter(user => user.role === 'instructor')
  const students=users.filter(user => user.role === 'student')

  const handleMakeAdmin = user => {
    fetch(`https://bongo-sports-server.vercel.app/users/role/${user._id}`, {
      method: 'PATCH'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        refetch();
      })
  }

  const handleMakeInstructor = user => {
    fetch(`https://bongo-sports-server.vercel.app/users/istructor/${user._id}`, {
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
          User Role Management
        </h1>
        <div className='grid sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 bg-emerald-600 text-white p-3'> 
        <p>Total Admins: {admins.length}</p>
        <p>Total Instructors: {insturctors.length}</p>
        <p>Total Users: {users.length}</p>
        </div>
      </div>
      {users.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="table text-xs">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>

              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user._id} className='bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-lg text-white'>
                  <th className='text-gray-200'>{index + 1}</th>
                  <td className='uppercase text-yellow-200 font-bold'>{user.name}</td>
                  <td>{user.email}</td>
                  <td className='uppercase text-emerald-300 font-bold'>{user.role}</td>
                  <td className="flex gap-1 p-1">
                    <>
                      {user.role === 'admin' ? '' : (
                        <button
                          className="p-2  bg-emerald-600 text-white capitalize"
                          onClick={() => handleMakeAdmin(user)}
                        >
                          Make Admin
                        </button>
                      )}
                    </>
                    <>
                      {user.role === 'instructor' ? '' : (
                        <button
                          className="p-2  bg-emerald-600 text-white capitalize"
                          onClick={() => handleMakeInstructor(user)}
                        > 
                        make intructor
                        </button>
                      )}
                    </>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default ManageUsers;