"use client";

import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    title: "",
    description: "",
    category: "Startup",
    author: "Alex Bennet",
    authorImg: "/author_img.png",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    for (let key in data) {
      formData.append(key, data[key]);
    }
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post("/api/blog", formData);
      if (response.data.success) {
        toast.success(response.data.message);
        setImage(null);
        setData({
          title: "",
          description: "",
          category: "Startup",
          author: "Alex Bennet",
          authorImg: "/author_img.png",
        });
      } else {
        toast.error("Error while posting blog.");
      }
    } catch (error) {
      console.error("Error adding blog: ", error);
    }
  };

  return (
    <>
      <form className="pt-5 px-5 sm:pt-12 sm:pl-16" onSubmit={handleSubmit}>
        <p className="text-xl">Upload thumbnail</p>
        <label htmlFor="image">
          <Image
            className="mt-4 "
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            width={140}
            height={70}
            alt=""
          />
        </label>
        <input
          onChange={(e) => setImage(e.target.files[0])}
          type="file"
          id="image"
          hidden
          required
        />
        <p className="text-xl mt-4">Blog title</p>
        <input
          name="title"
          onChange={handleChange}
          value={data.title}
          type="text"
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          placeholder="Type here"
          required
        />
        <p className="text-xl mt-4">Blog description</p>
        <textarea
          name="description"
          onChange={handleChange}
          value={data.description}
          type="text"
          className="w-full sm:w-[500px] mt-4 px-4 py-3 border "
          placeholder="Write content here"
          rows={6}
          required
        ></textarea>
        <p className="text-xl mt-4">Blog Category</p>
        <select
          name="category"
          onChange={handleChange}
          value={data.category}
          className="w-40 mt-4 px-4 py-2 border text-gray-500 "
        >
          <option value="Startup">Startup</option>
          <option value="Technology">Technology</option>
          <option value="Lifestyle">Lifestyle</option>
        </select>
        <br />
        <button type="submit" className="mt-8 w-40 h-12 bg-black text-white ">
          ADD
        </button>
      </form>
    </>
  );
};

export default page;
