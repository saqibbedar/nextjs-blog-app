"use client";

import BlogTableItem from "@/Components/AdminComponents/BlogTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await axios.get("/api/blog");
      if (response.data.success) {
        setBlogs(response.data.blogs);
      } else {
        toast.error(response.data.message);
        throw new Error(response.data.message);
      }
    } catch (error) {
      console.error("Blog fetching error: ", error);
    }
  };

  const deleteBlog = async (mongoId) => {
    try {
      const response = await axios.delete("/api/blog", {
        params: {
          id: mongoId,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        fetchBlogs();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Blog deletion error: ", error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Blogs</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm tex-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Author name
              </th>
              <th scope="col" className="px-6 py-3">
                Blog Title
              </th>
              <th scope="col" className="px-6 py-3">
                Date
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(({ _id, title, author, authorImg, Date }, index) => (
              <BlogTableItem
                key={index}
                id={_id}
                title={title}
                author={author}
                authorImg={authorImg}
                date={Date}
                deleteBlog={deleteBlog}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
