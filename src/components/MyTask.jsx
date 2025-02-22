
const MyTask = () => {


    return (
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 justify-between gap-6">
            <div>
                <h2 className="text-center bg-blue-300 rounded-lg text-lg py-2 font-bold">To-Do</h2>
            </div>
            <div>
                <h2 className="text-center bg-amber-300 rounded-lg text-lg py-2 font-bold">In Progress</h2>
            </div>
            <div>
                <h2 className="text-center bg-green-300 rounded-lg text-lg py-2 font-bold">Done</h2>
            </div>
        </div>
    );
};

export default MyTask;