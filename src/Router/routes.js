import About from "../pages/About/About";
import Home from "../pages/Home/Home";
import Main from "../pages/Main/Main";

export const routes = [
    {
      path:'/',
      element:<Main/>
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