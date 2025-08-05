import { Textarea } from "@/components/ui/textarea";
import { DataContext } from "@/context/DataProvider";
import { API } from "@/service/api";
import { useContext, useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

function Comments({ post }) {
  const initialValus = {
    name: "",
    postId: "",
    comments: "",
    date: new Date(),
  };

  const [comment, setComment] = useState(initialValus);
  const [comments, setComments] = useState([]);
  const { account } = useContext(DataContext);
  const [refreshComments, setRefreshComments] = useState(false);

  const handleChange = (e) => {
    setComment({
      ...comment,
      name: account.name,
      postId: post._id,
      comments: e.target.value,
    });
  };

  const AddComment = async () => {
    let response = await API.newComment(comment);
    if (response.isSuccess) {
      setComment(initialValus);
    }
  };

  useEffect(() => {
    const getData = async () => {
      let response = await API.getAllComments(post._id);
      if (response.isSuccess) {
        setComments(response.data.comments);
      }
    };
    getData();
  }, [post._id, comment, refreshComments]);

  const removeComment = async (id) => {
    let response = await API.removeComment(id);
    if (response.isSuccess) {
      setRefreshComments((prev) => !prev);
    }
  };

  return (
    <div className="p-6 ">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Comments</h2>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <Textarea
          value={comment.comments}
          onChange={(e) => handleChange(e)}
          placeholder="Write your comment..."
          className="flex-1 border border-gray-300 rounded-lg p-3 resize-none min-h-[80px] focus:outline-none focus:ring-2"
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
          onClick={(e) => {
            AddComment(e);
          }}
        >
          Post
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((c) => (
          <div
            key={c._id}
            className="bg-gray-100 p-4 rounded-lg shadow-sm border"
          >
            <div className="flex justify-between items-center mb-1">
              <span className="font-medium text-gray-800">{c.name}</span>
              <span className="text-xs text-gray-500">
                {new Date(c.date).toLocaleString("en-US", {
                  month: "numeric",
                  day: "numeric",
                  year: "numeric",
                  hour: "numeric",
                  minute: "2-digit",
                  hour12: true,
                })}
              </span>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-700">{c.comments}</p>
              {account.name === c.name ? (
                <MdDelete
                  className="hover:size-6"
                  size={22}
                  onClick={() => removeComment(c._id)}
                />
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comments;
