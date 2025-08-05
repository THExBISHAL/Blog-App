import { API } from "@/service/api";
import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

function Post() {
  const [posts, setPosts] = useState([]);
  const [searchParam] = useSearchParams();
  const category = searchParam.get("category");

  useEffect(() => {
    const fetchData = async () => {
      const response = await API.getAllPost({ category });
      if (response.isSuccess) {
        setPosts(response.data.posts);
      }
    };
    fetchData();
  }, [category]);

  return (
    <div className="p-4 flex-grow min-h-[60vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 rounded-md shadow-2xl bg-white">
        {posts && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="w-full p-4">
              {/* Cards one by one*/}
              <Link to={`/details/${post._id}`} className="block">
                <div className="bg-white shadow-md rounded-2xl overflow-hidden hover:shadow-2xl transition duration-300 ease-in-out">
                  <img
                    src={post.picture}
                    alt="Post"
                    className="w-full h-48 object-cover"
                  />
                  {/* Content */}
                  <div className="p-4">
                    <h3 className="text-xl text-center font-semibold text-gray-800 mb-2">
                      {post.title}
                    </h3>

                    <div className="text-sm text-gray-500 mb-2">
                      <p>
                        <span className="font-medium text-gray-700">
                          Author:
                        </span>{" "}
                        {post.username}
                      </p>
                      <p>
                        <span className="font-medium text-gray-700">
                          Category:
                        </span>{" "}
                        {post.categories[0].charAt(0).toUpperCase() +
                          post.categories[0].slice(1)}
                      </p>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {post.description}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <div className="col-span-full w-full min-h-[50vh] flex justify-center items-center bg-white rounded-xl shadow">
            <p className="text-gray-800 text-lg font-semibold">
              No posts available in this category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;
