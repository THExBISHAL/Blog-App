import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { API } from "@/service/api";
import { AiFillDelete } from "react-icons/ai";
import { MdModeEdit } from "react-icons/md";
import { DataContext } from "@/context/DataProvider";
import Comments from "./Comments/Comments";
import { toast } from "sonner";

function DetailsView() {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const { account } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data.data);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        Loading post details...
      </div>
    );
  }

  const deletePost = async () => {
    let response = await API.deletePost(id);
    if (response.isSuccess) {
      toast(response.data.message);
      navigate("/");
    }
  };

  return (
    <div className="w-screen bg-slate-100">
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-2xl overflow-hidden">
          <img
            src={post.picture}
            alt={post.title}
            className="w-full h-64 object-cover"
          />
          <div className="p-6">
            <div className="flex justify-between pb-4">
              <h1 className="text-3xl font-bold text-gray-800 mb-4 ">
                {post.title}
              </h1>
              {account.name === post.username ? (
                <div className="flex gap-5 p-3">
                  <Link to={`/update/${post._id}`}>
                    <MdModeEdit className="w-[25px] h-[25px] hover:scale-110 transition-transform duration-200 cursor-pointer" />
                  </Link>
                  <AiFillDelete
                    onClick={deletePost}
                    className="w-[25px] h-[25px] hover:scale-110 transition-transform duration-200 cursor-pointer"
                  />
                </div>
              ) : null}
            </div>

            <div className="flex justify-between text-sm text-gray-500 mb-4">
              <span>
                <strong>Author:</strong> {post.username}
              </span>
              <span>
                <strong>Category:</strong>{" "}
                {Array.isArray(post.categories)
                  ? post.categories
                      .map(
                        (cat) =>
                          cat.charAt(0).toUpperCase() +
                          cat.slice(1).toLowerCase()
                      )
                      .join(", ")
                  : ""}
              </span>
            </div>

            <p className="text-gray-700 text-base">{post.description}</p>
            <p className="text-gray-500 pt-5 text-sm italic">
              {new Date(post.createdDate).toLocaleString("en-US", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </p>
          </div>
          <Comments post={post} />
        </div>
      </div>
    </div>
  );
}

export default DetailsView;
