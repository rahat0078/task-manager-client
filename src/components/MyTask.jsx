import { useContext } from "react";
import { authContext } from './../provider/AuthContext';
import useAxios from './../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";


const MyTask = () => {

    const { user } = useContext(authContext);
    const email = user?.email;
    const baseUrl = useAxios();


    const { data = [], isLoading, refetch } = useQuery({
        queryKey: ["tasks", email],
        queryFn: async () => {
            const response = await baseUrl.get(`/task/${email}`);
            return response.data;
        },
    });


    const todoData = data?.filter(i => i.category === "To-Do") || [];
    const progressData = data?.filter(i => i.category === "In Progress") || [];
    const doneData = data?.filter(i => i.category === "Done") || [];


    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
        }).then((result) => {
            if (result.isConfirmed) {
                baseUrl.delete(`/task/${id}`)
                    .then((result) => {
                        if (result.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your task has been deleted.",
                                icon: "success"
                            });
                        }
                    })
               
            }
        });

    }

    if (isLoading) {
        return <>
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-ring loading-xl"></span>
            </div>
        </>
    }


    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 justify-between gap-6">
            <div>
                <h2 className="text-center bg-blue-300 rounded-lg text-lg py-2 font-bold">To-Do</h2>
                {
                    todoData.map(todo => (
                        <div className="bg-blue-100 p-4 rounded-lg shadow-lg my-4" key={todo._id}>
                            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                            <p className="text-gray-600 mt-2">{todo.description}</p>
                            <span className="text-sm text-gray-500 mt-2 block">{new Date(todo.time).toLocaleDateString()}</span>
                            <div>
                                <button className="btn mr-2"><FaEdit /></button>
                                <button onClick={() => handleDelete(todo._id)} className="btn text-red-500"><FaTrash /></button>
                            </div>
                        </div>
                    ))
                }

            </div>
            <div>
                <h2 className="text-center bg-amber-300 rounded-lg text-lg py-2 font-bold">In Progress</h2>
                {
                    progressData.map(todo => (
                        <div className="bg-amber-200 p-4 rounded-lg shadow-lg my-4" key={todo._id}>
                            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                            <p className="text-gray-600 mt-2">{todo.description}</p>
                            <span className="text-sm text-gray-500 mt-2 block">{new Date(todo.time).toLocaleDateString()}</span>
                            <div>
                                <button className="btn mr-2"><FaEdit /></button>
                                <button onClick={() => handleDelete(todo._id)} className="btn text-red-500"><FaTrash /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
            <div>
                <h2 className="text-center bg-green-300 rounded-lg text-lg py-2 font-bold">Done</h2>
                {
                    doneData.map(todo => (
                        <div className="bg-green-200 p-4 rounded-lg shadow-lg my-4" key={todo._id}>
                            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                            <p className="text-gray-600 mt-2">{todo.description}</p>
                            <span className="text-sm text-gray-500 mt-2 block">{new Date(todo.time).toLocaleDateString()}</span>
                            <div>
                                <button className="btn mr-2"><FaEdit /></button>
                                <button onClick={() => handleDelete(todo._id)} className="btn text-red-500"><FaTrash /></button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default MyTask;