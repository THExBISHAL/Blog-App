import "./App.css";
import Login from "./components/Account/Login";
import Signup from "./components/Account/SignUp";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Dataprovider from "./context/DataProvider";
import HomePage from "./components/Home/HomePage";
import { useState } from "react";
import Header from "./components/Header/Header";
import CreatePost from "./components/Create/CreatePost";
import DetailsView from "./components/Details/DetailsView";
import UpdatePost from "./components/Create/UpdatePost";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { Toaster } from "sonner";

const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ? (
    <>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  ) : (
    <Navigate to="/login" />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Dataprovider>
      <Toaster richColors />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route index element={<HomePage />} />
        </Route>
        <Route
          path="/createPost"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/createPost" element={<CreatePost />} />
        </Route>
        <Route
          path="/details/:id"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/details/:id" element={<DetailsView />} />
        </Route>
        <Route
          path="/update/:id"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/update/:id" element={<UpdatePost />} />
        </Route>
        <Route
          path="/about"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/about" element={<About />} />
        </Route>
        <Route
          path="/contact"
          element={<PrivateRoute isAuthenticated={isAuthenticated} />}
        >
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Dataprovider>
  );
}

export default App;
