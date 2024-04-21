import React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const ErrorRoute = () => {
   const error: any = useRouteError();
   const navigate = useNavigate();
   return (
      <div className="flex flex-col justify-center items-center h-screen">
         <div className="text-2xl mb-4">Something went wrong.</div>
         <div className="text-red-600 mb-12">
            <i>{error.statusText || error.message}</i>
         </div>
         <div
            onClick={() => {
               navigate('/');
            }}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
         >
            Go to Home Page
         </div>
      </div>
   );
};

export default ErrorRoute;
