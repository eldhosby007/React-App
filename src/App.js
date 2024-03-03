import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddEditBlog from "./pages/AddEditBlog";
import About from "./pages/About";
import Blog from "./pages/Blog";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addblog" element={<AddEditBlog />} />
          <Route path="/editblog/:id" element={<AddEditBlog />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
