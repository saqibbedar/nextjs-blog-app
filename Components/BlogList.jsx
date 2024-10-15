import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";
import axios from "axios";

const BlogList = () => {
  const [blogCategory, setBlogCategory] = useState("All");
  const categoryButtons = ["All", "Technology", "Startup", "Lifestyle"];
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      if (response.data.success) {
        setBlogs(response.data.blogs);
      } else {
        throw new Error("Error while fetching blogs");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {categoryButtons.map((buttonValue, index) => (
          <button
            onClick={() => setBlogCategory(buttonValue)}
            className={
              blogCategory === buttonValue &&
              "bg-black text-white px-4 py-1 rounded-sm"
            }
            key={index}
          >
            {buttonValue}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blogs
          .filter(
            (data) => data.category === blogCategory || blogCategory === "All"
          )
          .map(({ title, description, category, image, _id }, index) => (
            <BlogItem
              image={image}
              title={title}
              category={category}
              description={description}
              id={_id}
              key={index}
            />
          ))}
      </div>
    </div>
  );
};

export default BlogList;
