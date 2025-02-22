import { useContext } from "react";
import { authContext } from './../provider/AuthContext';
import { CiCirclePlus, CiLogout } from "react-icons/ci";
import { MdOutlinePlaylistAddCheck } from "react-icons/md";
import {  NavLink, Outlet, useNavigate } from "react-router-dom";
import { FaList } from "react-icons/fa";

const Dashboard = () => {
    const { user, handleSignOut } = useContext(authContext);
    const navigate = useNavigate()

    const handleLogout = () => {
        handleSignOut()
            .then(() => {
                navigate("/login")
            })
    }


    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-2" className="btn mt-2 ml-5 drawer-button lg:hidden">
                        <FaList />
                    </label>
                    <div className="min-h-screen w-full">
                        <Outlet />
                    </div>
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                    <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <div>
                            <div className="flex items-center gap-4 my-2">
                                <img className="w-12 h-12 rounded-full" src={user?.photoURL} alt="" />
                                <div>
                                    <h3 className="text-2xl">{user?.displayName}</h3>
                                    <p className="text-gray-600">{user?.email}</p>
                                </div>
                            </div>
                        </div>
                        <li className="my-2"><NavLink to={"/dashboard/addTask"} className={({ isActive }) =>
                             isActive ? "btn text-lg text-green-500" : "btn text-lg"
                        } ><CiCirclePlus />Add Task</NavLink></li>
                        <li className="my-2"><NavLink to={"/dashboard/myTask"} className={({ isActive }) =>
                             isActive ? "btn text-lg text-green-500" : "btn text-lg"
                        } ><MdOutlinePlaylistAddCheck />My Task</NavLink></li>
                        <li className="my-2"><a onClick={handleLogout} className="btn btn-soft btn-success text-lg" ><CiLogout />Logout</a></li>
                    </ul>
                </div>

            </div>
        </div>
    );
};

export default Dashboard;