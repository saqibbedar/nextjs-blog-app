"use client";
import { assets, blog_data } from "@/Assets/assets";
import Footer from "@/Components/Footer";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";

const page = ({ params }) => {
  const [data, setData] = useState(null);
  const fetchBlogData = () => {
    for (let i = 0; i < blog_data.length; i++) {
      if (Number(params.id) === blog_data[i].id) {
        setData(blog_data[i]);
        break;
      }
    }
  };
  useEffect(() => {
    fetchBlogData();
  }, []);
  return (
    data && (
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
              {data.title}
            </h1>
            <Image
              className="mx-auto mt-6 border border-white rounded-full"
              src={data.author_img}
              width={60}
              height={60}
              alt="author-image"
            />
            <p className="mt-1 pb-2 text-lg max-w-[740px] mx-auto">
              {data.author}
            </p>
          </div>
        </div>
        <div className="mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10">
          <Image
            className="border-4 border-white"
            src={data.image}
            width={1280}
            height={720}
            alt="blog-cover-image"
          />
          <h1 className="my-8 text-[26px] font-semibold">Introduction</h1>
          <p>{data.description}</p>
          <h3 className="my-5 text-[18px] font-semibold">
            Step 1: Writing my first blog is it okey?
          </h3>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ex placeat officiis autem. Non nisi alias veritatis
            deserunt, reiciendis dolorem corrupti. Perspiciatis pariatur eveniet
            provident consequatur! Cupiditate enim eaque dolore! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Vel earum labore
            ducimus officia corrupti fuga non quia repellat qui vero commodi
            reiciendis, praesentium recusandae doloremque debitis aut obcaecati
            vitae voluptas.
          </p>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ex placeat officiis autem. Non nisi alias veritatis
            deserunt, reiciendis dolorem corrupti. Perspiciatis pariatur eveniet
            provident consequatur! Cupiditate enim eaque dolore! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Vel earum labore
            ducimus officia corrupti fuga non quia repellat qui vero commodi
            reiciendis, praesentium recusandae doloremque debitis aut obcaecati
            vitae voluptas.
          </p>

          <h3 className="my-5 text-[18px] font-semibold">
            Step 2: Writing my first blog is it okey?
          </h3>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ex placeat officiis autem. Non nisi alias veritatis
            deserunt, reiciendis dolorem corrupti. Perspiciatis pariatur eveniet
            provident consequatur! Cupiditate enim eaque dolore! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Vel earum labore
            ducimus officia corrupti fuga non quia repellat qui vero commodi
            reiciendis, praesentium recusandae doloremque debitis aut obcaecati
            vitae voluptas.
          </p>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ex placeat officiis autem. Non nisi alias veritatis
            deserunt, reiciendis dolorem corrupti. Perspiciatis pariatur eveniet
            provident consequatur! Cupiditate enim eaque dolore! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Vel earum labore
            ducimus officia corrupti fuga non quia repellat qui vero commodi
            reiciendis, praesentium recusandae doloremque debitis aut obcaecati
            vitae voluptas.
          </p>
          <h3 className="my-5 text-[18px] font-semibold">Conclusion:</h3>
          <p className="my-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Perspiciatis ex placeat officiis autem. Non nisi alias veritatis
            deserunt, reiciendis dolorem corrupti. Perspiciatis pariatur eveniet
            provident consequatur! Cupiditate enim eaque dolore! Lorem ipsum
            dolor sit amet, consectetur adipisicing elit. Vel earum labore
            ducimus officia corrupti fuga non quia repellat qui vero commodi
            reiciendis, praesentium recusandae doloremque debitis aut obcaecati
            vitae voluptas.
          </p>
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
