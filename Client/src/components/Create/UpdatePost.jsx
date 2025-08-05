import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useContext, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { DataContext } from "@/context/DataProvider";
import { API } from "@/service/api";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
  const initialPost = {
    title: "",
    description: "",
    picture: "",
    username: "",
    categories: "",
    createdDate: new Date(),
  };

  const [post, setPost] = useState(initialPost);
  const [file, setFile] = useState("");
  const [category, setCategory] = useState("");
  const { account } = useContext(DataContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const URL = post.picture ? post.picture : "/CreatePostImage.jpg";

  useEffect(() => {
    const fetchData = async () => {
      let response = await API.getPostById(id);
      if (response.isSuccess) {
        setPost(response.data.data);
        setCategory(response.data.data.categories[0]);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);

        const response = await API.uploadFile(data);

        post.picture = response.data.result.secure_url;
      } else {
        post.categories = category || "All";
        post.username = account.name;
      }
    };

    getImage();
  }, [file]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const updatePost = async () => {
    const updatedPost = {
      ...post,
      username: account.name,
      categories: category || "All",
    };
    await API.updatePost(updatedPost);
    navigate(`/details/${id}`);
  };

  return (
    <>
      <div className="w-screen bg-slate-100">
        <div className="flex items-center justify-center p-10">
          <div className="flex flex-col gap-4 p-6 max-w-2xl w-full mx-auto border rounded-2xl shadow-md bg-white">
            {/* Image input */}
            <div>
              <img
                src={URL}
                className="w-full h-full rounded-2xl object-cover "
                alt="Blog"
              />
            </div>
            {/* File Input */}
            <div className="flex justify-around">
              <div className="flex items-center gap-4">
                <Label
                  htmlFor="fileInput"
                  className="cursor-pointer flex items-center gap-2 text-muted-foreground"
                >
                  <Plus className="w-6 h-6" />
                  <span>Select Image</span>
                </Label>
                <Input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                  }}
                />
              </div>
              <div className="font-medium">
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="movies">Movies</SelectItem>
                    <SelectItem value="sports">Sports</SelectItem>
                    <SelectItem value="tech">Tech</SelectItem>
                    <SelectItem value="fashion">Fashion</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Title Input */}
            <Input
              type="text"
              name="title"
              value={post.title}
              onChange={(e) => {
                handleChange(e);
              }}
              placeholder="Title"
            />

            {/* Description */}
            <Textarea
              name="description"
              rows={5}
              value={post.description}
              placeholder="Tell your story..."
              onChange={(e) => {
                handleChange(e);
              }}
            />

            {/* Update Button */}
            <Button onClick={updatePost} className="w-fit self-end">
              Update
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdatePost;
