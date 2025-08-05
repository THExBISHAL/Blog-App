import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { categories } from "@/constants/data";
import { Link, useSearchParams } from "react-router-dom";

function Category() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const currentCategory = searchParams.get("category");

  return (
    <div className="w-full h-full p-4 bg-white max-w-full overflow-x-hidden mx-auto shadow-md font-sans space-y-4">
      {/* Create Blog Button */}
      <div className="flex justify-center">
        <Link to={"/createPost"} className="px-auto">
          <Button className="w-50 sm:w-40 bg-blue-700 text-yellow-300 font-semibold py-2  rounded-2xl hover:bg-blue-500 transition duration-300">
            Create Blog
          </Button>
        </Link>
      </div>

      {/* Category Table */}
      <div className="border-t pt-4 text-center">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">Categories</h2>

        <Table className="w-full text-center">
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600 text-center">
                <Link to="/" className="block w-full">
                  All Category
                </Link>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {categories.map((category, id) => (
              <TableRow key={id} className="transition">
                <TableCell className="py-2 px-3 text-sm text-gray-700">
                  <Link
                    to={`/?category=${category.type}`}
                    className={`hover:font-medium transition ${
                      currentCategory === category.type
                        ? "font-medium text-blue-800"
                        : ""
                    }`}
                  >
                    {category.type}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Category;
