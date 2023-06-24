import { useRouteError } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";


function ErrorPage() {

    const error = useRouteError();

    let title = "There has been an error!";
    let message = "Something went wrong!";

    if (error.status === 500) {
        message = error.data.message;
    };

    if (error.status === 404) {
        title = '404 - not found';
        message = 'Could not find this'
    };

    return <>
    <MainNavigation/>
    <h2>{title}</h2>
    <h2>{message}</h2>
    </>
};

export default ErrorPage;