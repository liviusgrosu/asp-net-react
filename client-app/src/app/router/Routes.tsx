import { Navigate, createBrowserRouter } from "react-router-dom"
import App from "../layout/App"
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestErrors from "../../features/errors/TestError";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";

export const router = createBrowserRouter([
    {
         path: '/',
         element: <App/>,
         children: [
             {path: 'activities', element: <ActivityDashboard/>},
             {path: 'activities/:id', element: <ActivityDetails/>},
             // We add these key tags so that react can render them differently
             {path: 'createActivity', element: <ActivityForm key='create'/>},
             {path: 'manage/:id', element: <ActivityForm key='manage'/>},
             {path: 'errors', element: <TestErrors/>},
             {path: 'not-found', element: <NotFound/>},
             {path: 'server-error', element: <ServerError/>},
             {path: '*', element: <Navigate replace to='/not-found'/>},
         ] 
     },
 ]);