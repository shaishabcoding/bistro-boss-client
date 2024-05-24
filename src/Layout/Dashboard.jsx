import {
  FaBook,
  FaHome,
  FaList,
  FaSearch,
  FaUser,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  const isAdmin = true;
  const links = isAdmin ? (
    <>
      <li>
        <NavLink to="/dashboard/admin">
          <FaHome></FaHome>
          Admin Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/item/new">
          <FaUtensils></FaUtensils>
          Add Items
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/items">
          <FaList></FaList>
          Manage Items
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/bookings">
          <FaBook></FaBook>
          Manage Bookings
        </NavLink>
      </li>
      <li>
        <NavLink to="/dashboard/users">
          <FaUser></FaUser>
          All Users
        </NavLink>
      </li>
    </>
  ) : (
    <>
      <li>
        <NavLink to="/">
          <FaHome></FaHome>
          User Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/order/salad">
          <FaSearch></FaSearch>
          User Menu
        </NavLink>
      </li>
    </>
  );

  return (
    <div>
      {/* navbar for mobile */}
      <div className="navbar bg-base-100 md:hidden">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {links}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl">Dashboard</a>
        </div>
      </div>
      <div className="flex">
        {/* dashboard side bar */}
        <div className="w-64 min-h-screen bg-orange-400 hidden md:block">
          <ul className="menu p-4">{links}</ul>
        </div>
        {/* dashboard content */}
        <div className="flex-1 md:p-8 p-4 w-screen md:w-auto">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
