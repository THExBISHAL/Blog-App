import { Link, useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useContext } from "react";
import { DataContext } from "@/context/DataProvider";
import { AlignJustify } from "lucide-react";
import { Separator } from "../ui/separator";

function Header() {
  const { setAccount } = useContext(DataContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setAccount(null);
    navigate("/login");
  };
  return (
    <>
      <div className="bg-cyan-700 w-full h-15 flex justify-between items-center px-6 shadow-md">
        <div className="text-3xl text-yellow-600 font-bold">
          <Link to="/">Blog</Link>
        </div>

        {/* Mobile */}
        <Sheet className="bg-cyan-700">
          <SheetTrigger className="md:hidden p-2 ">
            <AlignJustify size={24} className="text-yellow-500" />
          </SheetTrigger>
          <SheetContent className="bg-cyan-700">
            <SheetHeader className="gap-10 my-auto text-center text-yellow-500 font-medium flex items-center">
              <Link to="/">Home</Link>
              <Link to="/about">About Me</Link>
              <Link to="/contact">Contact</Link>
              <button onClick={handleLogout}>Logout</button>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        {/* Desktop */}
        <div className="hidden md:flex gap-10 items-center mr-6 text-medium text-yellow-500 font-medium px-4 py-2 rounded ">
          <Link
            to="/"
            className="hover:text-yellow-600 hover:underline transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-600 hover:underline transition duration-300"
          >
            About Me
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-600 hover:underline transition duration-300"
          >
            Contact
          </Link>
          <button
            onClick={handleLogout}
            className="hover:text-yellow-600 hover:underline transition duration-300"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Header;
