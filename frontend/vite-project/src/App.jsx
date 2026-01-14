import Register from "./Components/Register"
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Navbar from "./Navbar"
import Login from "./Components/Login"
import Home from "./Components/Home"
import MainHome from "./Components/MainHome"
import Blogs from "./Components/Blogs"
import FavBlogs from "./Components/FavBlogs"
import AllBlogs from "./Components/AllBlogs"
import OneBlog from "./Components/OneBlog"
function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar></Navbar>
    <Routes>
      <Route path='/' element={<Home></Home>}></Route>
      <Route path='/login' element={<Login></Login>}></Route>

      <Route path="mainhome" element={<MainHome></MainHome>}>
      <Route index element={<AllBlogs></AllBlogs>}></Route>
      <Route path='blogs' element={<Blogs></Blogs>}> 
      </Route>
      <Route path="favblogs" element={<FavBlogs></FavBlogs>}></Route>
      </Route>

      <Route path='/register' element={<Register></Register>}></Route>
      <Route path="mainhome/blogs/:id" element={<OneBlog></OneBlog>}></Route>

    </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
