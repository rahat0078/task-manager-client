import { Link } from "react-router-dom";
import error from "../assets/error.gif";
const Error = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center">
            <img src={error} alt="" />
            <Link to={"/dashboard"} className="btn">Back to home</Link>
        </div>
    );
};

export default Error;