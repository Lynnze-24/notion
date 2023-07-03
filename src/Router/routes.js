import MainLayout from "../components/Layout/MainLayout";
import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Main from "../pages/Main/Main";

export const routes = [
    {
      path:'/dashboard',
      element:<MainLayout/>,
        subRoutes:[
            {
              path:'/dashboard',
              element:<Main/>
            },
            {
              path:'/dashboard/controls',
              element:<About/>
            },
        ]
    },
    {
        path:'/home',
        element:<Home />
     },
    {
      path:'/about',
      element:<About />
    }
  ]