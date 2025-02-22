import { useContext, useState } from "react";
import { authContext } from './../provider/AuthContext';
import useAxios from './../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const MyTask = () => {
    const { user } = useContext(authContext);
    const email = user?.email;
    const baseUrl = useAxios();

    // Create state to store tasks
    const [data, setData] = useState([]);

    const { isLoading, } = useQuery({
        queryKey: ["tasks", email],
        queryFn: async () => {
            const response = await baseUrl.get(`/task/${email}`);
            setData(response.data);  // Update state with the fetched data
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
                            setData(prevData => prevData.filter(task => task._id !== id)); // Optimistically update the UI
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

    const handleOnDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        if (!destination) return; // Task dropped outside
        if (destination.index === source.index && destination.droppableId === source.droppableId) return; // No position change

        // Logging the task ID and the new category
        console.log(`Task with ID: ${draggableId} moved to category: ${destination.droppableId}`);

        // Update the task locally
        const updatedData = [...data];
        const task = updatedData.find(task => task._id === draggableId);
        task.category = destination.droppableId;

        // Remove the task from its original position and insert it in the new category
        const taskIndex = updatedData.findIndex(task => task._id === draggableId);
        updatedData.splice(taskIndex, 1);
        updatedData.splice(destination.index, 0, task);

        // Update the UI instantly
        setData(updatedData);  // Instantly update the UI with the changed task

        // Update the task category on the backend
        const newDataInfo = { droppableId: destination.droppableId };
        baseUrl.patch(`/task/category/${draggableId}`, newDataInfo)
            .then(result => {
                if (result.modifiedCount > 0) {
                    console.log(`Task ID: ${draggableId} successfully updated in category: ${destination.droppableId}`);
                } else {
                    console.log('No changes made to the task category.');
                }
            })
            .catch(error => {
                console.error('Error updating task category:', error);
            });
    }

    if (isLoading) {
        return <div className="min-h-screen flex justify-center items-center">
            <span className="loading loading-ring loading-xl"></span>
        </div>;
    }

    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="p-6 grid grid-cols-1 md:grid-cols-3 justify-between gap-6">
                <Droppable droppableId="To-Do" isDropDisabled={false}>
                    {(provided) => (
                        <div
                            className="p-4"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h2 className="text-center bg-blue-300 rounded-lg text-lg py-2 font-bold">To-Do</h2>
                            {todoData.map((todo, index) => (
                                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                    {(provided) => (
                                        <div
                                            className="bg-blue-100 p-4 rounded-lg shadow-lg my-4"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                                            <p className="text-gray-600 mt-2">{todo.description}</p>
                                            <span className="text-sm text-gray-500 mt-2 block">{new Date(todo.time).toLocaleDateString()}</span>
                                            <div>
                                                <button className="btn mr-2"><FaEdit /></button>
                                                <button onClick={() => handleDelete(todo._id)} className="btn text-red-500"><FaTrash /></button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="In Progress">
                    {(provided) => (
                        <div
                            className="p-4"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h2 className="text-center bg-amber-300 rounded-lg text-lg py-2 font-bold">In Progress</h2>
                            {progressData.map((todo, index) => (
                                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                    {(provided) => (
                                        <div
                                            className="bg-amber-200 p-4 rounded-lg shadow-lg my-4"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                                            <p className="text-gray-600 mt-2">{todo.description}</p>
                                            <span className="text-sm text-gray-500 mt-2 block">{new Date(todo.time).toLocaleDateString()}</span>
                                            <div>
                                                <button className="btn mr-2"><FaEdit /></button>
                                                <button onClick={() => handleDelete(todo._id)} className="btn text-red-500"><FaTrash /></button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

                <Droppable droppableId="Done">
                    {(provided) => (
                        <div
                            className="p-4"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <h2 className="text-center bg-green-300 rounded-lg text-lg py-2 font-bold">Done</h2>
                            {doneData.map((todo, index) => (
                                <Draggable key={todo._id} draggableId={todo._id} index={index}>
                                    {(provided) => (
                                        <div
                                            className="bg-green-200 p-4 rounded-lg shadow-lg my-4"
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <h3 className="text-xl font-semibold text-gray-800">{todo.title}</h3>
                                            <p className="text-gray-600 mt-2">{todo.description}</p>
                                            <span className="text-sm text-gray-500 mt-2 block">{new Date(todo.time).toLocaleDateString()}</span>
                                            <div>
                                                <button className="btn mr-2"><FaEdit /></button>
                                                <button onClick={() => handleDelete(todo._id)} className="btn text-red-500"><FaTrash /></button>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>

            </div>
        </DragDropContext>
    );
};

export default MyTask;
