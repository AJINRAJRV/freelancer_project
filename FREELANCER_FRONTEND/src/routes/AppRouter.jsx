
// import Navbar from "../components/Navbar/Navbar";
// import Home from "../pages/homepage/Home";
// import Footer from '../components/Footer/Footer'

// import {createBrowserRouter, RouterProvider,Outlet} from 'react-router-dom';
// import Gigs from "../pages/gigs/Gigs";
// import Gig from "../pages/gig/Gig";
// import Orders from "../pages/orders/Orders";
// import MyGigs from "../pages/myGigs/MyGigs";
// import Add from "../pages/add/Add";
// import Messages from "../pages/messages/Messages";
// import Message from "../pages/message/Message";
// import Login from "../pages/login/Login";
// import Register from "../pages/register/Register";
// import {
//   QueryClient,
//   QueryClientProvider,
//   useQuery,
// } from '@tanstack/react-query'
// import Pay from "../pages/pay/Pay";
// import Success from "../pages/success/Success";
// import TermsOfService from "../pages/termsOfServices/TermsofServices";


// const AppRouter = () => {

//   const queryClient = new QueryClient()

//   const Layout=()=>{
//     return (
//       <div className="app">
//         <QueryClientProvider client={queryClient}>
//           <Navbar/>
//           <Outlet/>
//           <Footer/>
//         </QueryClientProvider>
//       </div>
//     )
//   }

//   const router=createBrowserRouter([
//     {
//       path:'/',
//       element:<Layout/>,
//       children:[
//         {
//           path:'/',
//           element:<Home/>
//         },
//         {
//           path:'/gigs',
//           element:<Gigs/>
//         },
//         {
//           path:'/gig/:id',
//           element:<Gig/>
//         },
//         {
//           path:'/orders',
//           element:<Orders/>
//         },
//         {
//           path:'/mygigs',
//           element:<MyGigs/>
//         },
//         {
//           path:'/add',
//           element:<Add/>
//         },
//         {
//           path:'/messages',
//           element:<Messages/>
//         },
//         {
//           path:'/message/:id',
//           element:<Message/>
//         },
//         {
//           path:'/login',
//           element:<Login/>
//         },
//         {
//           path:'/register',
//           element:<Register/>
//         },
//         {
//           path:'/pay/:id',
//           element:<Pay/>
//         },
//         {
//           path:'/success',
//           element:<Success/>
//         },
//         {
//           path:'//terms-of-service',
//           element:<TermsOfService/>
//         },
        
//       ]
//     },
//   ]);

//   return (
//     <div>
//       <RouterProvider router={router}/>
//     </div>
//   );
// };

// export default AppRouter;


import Navbar from "../components/Navbar/Navbar";
import Home from "../pages/homepage/Home";
import Footer from '../components/Footer/Footer'
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import Gigs from "../pages/gigs/Gigs";
import Gig from "../pages/gig/Gig";
import Orders from "../pages/orders/Orders";
import MyGigs from "../pages/myGigs/MyGigs";
import Add from "../pages/add/Add";
import Messages from "../pages/messages/Messages";
import Message from "../pages/message/Message";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import Pay from "../pages/pay/Pay";
import Success from "../pages/success/Success";
import TermsOfService from "../pages/termsOfServices/TermsofServices";
import ProtectedRoute from "../components/ProtectedRoutes";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ScrollToTop from "../components/ScrollToTop";

const AppRouter = () => {

  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <div className="app">
        <ScrollToTop />
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Outlet />
          <Footer />
        </QueryClientProvider>
      </div>
    )
  }

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        { path: '/gigs', element: <Gigs /> },
        { path: '/gig/:id', element: <Gig /> },

        // Protected routes
        { path: '/orders', element: <ProtectedRoute><Orders /></ProtectedRoute> },
        { path: '/mygigs', element: <ProtectedRoute><MyGigs /></ProtectedRoute> },
        { path: '/add', element: <ProtectedRoute><Add /></ProtectedRoute> },
        { path: '/messages', element: <ProtectedRoute><Messages /></ProtectedRoute> },
        { path: '/message/:id', element: <ProtectedRoute><Message /></ProtectedRoute> },
        { path: '/pay/:id', element: <ProtectedRoute><Pay /></ProtectedRoute> },

        { path: '/login', element: <Login /> },
        { path: '/register', element: <Register /> },
        { path: '/success', element: <Success /> },
        { path: '/terms-of-service', element: <TermsOfService /> }
      ]
    }
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRouter;
