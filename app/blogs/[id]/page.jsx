"use client";
import { assets } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const page = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const fetchBlogData = async () => {
    try {
      const response = await axios.get(`/api/blog`, {
        params: {
          id: params.id,
        },
      });
      if (response.data.success) {
        setBlog(response.data.blog);
      } else {
        throw new Error("Error while opening blog.");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchBlogData();
    console.log("Hello", blog);
  }, []);
  return (
    blog && (
      <>
        <div className="bg-gray-200 py-5 px-5 md:px-12 lg:px-28">
          <div className="flex justify-between items-center">
            <Link href={"/"}>
              <Image
                src={assets.logo}
                width={180}
                alt=""
                className="w-[130px] sm:w-auto "
              />
            </Link>
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 border border-black shadow-blog-sh">
              Get started
              <Image src={assets.arrow} alt="arrow" />
            </button>
          </div>
          <div className="text-center my-24">
            <h1 className="text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto">
              {blog.title}
            </h1>
            <Image
              className="mx-auto mt-6 border border-white rounded-full"
              src={blog.authorImg}
              width={60}
              height={60}
              alt="author-image"
            />
            <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
              {blog.author}
            </p>
          </div>
        </div>
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
          <Image
            className="border-4 border-white"
            src={blog.image}
            width={1280}
            height={720}
            alt="blog-cover-image"
          />

          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.description }}
          ></div>

          <div className="my-24">
            <p className="text-black font font-semibold my-4">
              Share this article on social media
            </p>
            <div className="flex">
              <Image src={assets.facebook_icon} width={50} alt="social-icons" />
              <Image src={assets.twitter_icon} width={50} alt="social-icons" />
              <Image
                src={assets.googleplus_icon}
                width={50}
                alt="social-icons"
              />
            </div>
          </div>
        </div>

        <Footer />
      </>
    )
  );
};

export default page;
