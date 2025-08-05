import Category from "./Category/Category";
import Post from "./Post/Post";

function HomePage() {
  return (
    <div className="flex flex-col sm:flex-row w-full bg-slate-100 min-h-screen">
      <div className="w-full sm:w-[250px] md:w-[220px] flex-shrink-0">
        <Category />
      </div>
      <div className="flex-grow min-w-0 px-2">
        <Post />
      </div>
    </div>
  );
}

export default HomePage;
