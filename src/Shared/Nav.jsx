import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Pages/LogIn & SignUp/AuthProvider/AuthProvider';
import useAdmin from '../hooks/useAdmin';
import useInstructor from '../hooks/useInstructor';

const Nav = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isShown, setIsShown] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [isAdmin] = useAdmin()
  const [isInstructor] = useInstructor()

  useEffect(() => {
    const body = document.body;
    if (darkMode) {
      body.classList.add('dark');
    } else {
      body.classList.remove('dark');
    }
  }, [darkMode]);

  const handleLogOut = () => {
    logOut()
      .then()
      .catch(error => { console.log(error); })
  }


  return (
    <div className={`navbar font-sans bg-indigo-800 bg-opacity-80 backdrop-filter text-white backdrop-blur-sm fixed top-0 left-0 right-0 z-10 ${darkMode ? 'dark' : ''}`}>
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
          </label>

          <ul tabIndex={0} className="menu menu-compact dropdown-content mt-5 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link to="/" className='text-base'>Home</Link></li>
            <li><Link to="/allClasses" className='text-base'>Classes</Link></li>
            <li><Link to="/instructors" className='text-base'>Instructors</Link></li>
            {user && <li>
              {isAdmin ? <Link to="/dashboard/manageClasses" className='text-base'> Dashboard</Link> :
                isInstructor ? <Link to="/dashboard/myClasses" className='text-base'>Dashboard</Link> :
                  <Link to="/dashboard/selectedClasses" className='text-base'>Dashboard</Link>}</li>}
            {/* Add the toggle button for dark mode */}
            <li
              className={`${darkMode ? 'text-base' : 'text-base'}`}
              tabIndex={0}
              onClick={() => setDarkMode(!darkMode)}
            >
              <input type="checkbox" className={`toggle toggle-xs ${darkMode ? 'checked' : ''}`} checked={darkMode} />
            </li>
          </ul>
        </div>



        <a href="/"> <img src="./logo.png" alt="" style={{ height: '40px', width: '200px' }} /></a>
      </div>
      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal">
          <li><Link to="/" className="text-base hover:text-base text-sm">Home</Link></li>
          <li><Link to="/allClasses" className="text-base hover:text-base text-sm">Classes</Link></li>
          <li><Link to="/instructors" className="text-base hover:text-base text-sm">Instructors</Link></li>
          {user && <li>
            {isAdmin ? <Link to="/dashboard/manageClasses" className="text-base hover:text-base text-sm">Admin Dashboard</Link> :
              isInstructor ? <Link to="/dashboard/myClasses" className="text-base hover:text-base text-sm">Instructor Dashboard</Link> :
                <Link to="/dashboard/selectedClasses" className="text-base hover:text-base text-sm">Student Dashboard</Link>}</li>}

          {/* Add the toggle button for dark mode */}
          <li
            className={`${darkMode ? 'text-base' : 'text-base'}`}
            tabIndex={0}
            onClick={() => setDarkMode(!darkMode)}
          ><input type="checkbox" className={`toggle toggle-xs ${darkMode ? 'checked' : ''}`} checked={darkMode} /> 
          </li>
          

        </ul>
        <div>


        </div>
      </div>
      <div>

      </div>
      <div className="navbar-end">
        {isShown && <span className='text-gray bg-base p-1'>{user.displayName}</span>}
        {
          user &&
          <div className="w-10 mx-3">
            <img className='rounded-full' src={user.photoURL} onMouseEnter={() => setIsShown(true)}
              onMouseLeave={() => setIsShown(false)} />
          </div>
        }
        {user ?
          <Link to="" className="btn btn-sm btn-ghost" onClick={handleLogOut}>Log Out</Link> :
          <Link to="/login" className="btn btn-ghost btn-primary">Log In</Link>
        }

      </div>
    </div>

  );
};

export default Nav;
