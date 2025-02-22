import { useForm } from "react-hook-form";

const AddTask = () => {
    const { register, handleSubmit, formState: { errors }, } = useForm();

    const onSubmit = (data) => {
        const newData = {
            ...data,
            time: new Date().toISOString(), 
          };
        console.log(newData)
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-6 bg-base-200 shadow-md rounded-xl w-full max-w-xl">
                
                <div>
                    <label className="label">
                        <span className="label-text">Task Title</span>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter task title"
                        className="input input-bordered w-full"
                        {...register("title", { required: "Title is required", maxLength: 50 })}
                    />
                    {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
                </div>

                
                <div>
                    <label className="label">
                        <span className="label-text">Description (Optional)</span>
                    </label>
                    <textarea
                        placeholder="Enter description"
                        className="textarea textarea-bordered w-full"
                        {...register("description", { required: "Description is required", maxLength: 200 })}
                    />
                    {errors.description && <p className="text-red-500 text-sm">Max 200 characters allowed</p>}
                </div>

                
                <div>
                    <label className="label">
                        <span className="label-text">Category</span>
                    </label>
                    <select className="select select-bordered w-full" {...register("category", { required: "Category is required" })}>
                        <option value="To-Do">To-Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                    </select>
                    {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
                </div>

               
                <button type="submit" className="btn btn-success btn-outline w-full">Add Task</button>
            </form>
        </div>
    );
};

export default AddTask;