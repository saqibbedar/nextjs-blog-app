const { NextResponse } = require("next/server");
import { connectToDatabase } from "@/lib/config/db";
import BlogModel from "@/lib/models/BlogModel";
import "dotenv/config";
const fs = require("fs");
import { writeFile } from "fs/promises";

// connect to database
const LoadDatabase = async () => {
  await connectToDatabase(`${process.env.MONGODB_URL}/blog-app`);
};

LoadDatabase();

// Upload Image helper function
const handleImageUpload = async (data, imageInputFieldName) => {
  const timestamp = Date.now();

  const image = data.get(imageInputFieldName);
  if (!image) {
    throw new Error(`${imageInputFieldName} not found.`);
  }

  const imageByteData = await image.arrayBuffer();
  const buffer = Buffer.from(imageByteData);
  const path = `./public/${timestamp}_${image.name}`;
  await writeFile(path, buffer);
  const url = `/${timestamp}_${image.name}`;

  return url;
};

export default handleImageUpload;

// API endpoint to get all blogs
export async function GET(request) {
  try {
    const blogId = request.nextUrl.searchParams.get("id");
    if (blogId) {
      const blog = await BlogModel.findById(blogId);
      return NextResponse.json({ success: true, blog });
    } else {
      const blogs = await BlogModel.find({});
      return NextResponse.json({ success: true, blogs });
    }
  } catch (error) {
    console.error("Error fetching blogs: ", error);
    return NextResponse.json({
      success: false,
      message: "Error while fetching blogs",
    });
  }
}

// API endpoint for uploading blogs
export async function POST(request) {
  try {
    const formData = await request.formData();

    const imageUrl = await handleImageUpload(formData, "image");

    const blogData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      author: formData.get("author"),
      image: imageUrl,
      authorImg: `${formData.get("authorImg")}`,
    };

    await BlogModel.create(blogData);

    return NextResponse.json({ success: true, message: "Blog Added" });
  } catch (error) {
    console.error("Error adding blog: ", error);
    return NextResponse.json({
      success: false,
      msg: "Error adding blog",
      error: error,
    });
  }
}

// API endpoint to delete blog
export async function DELETE(request) {
  try {
    const id = await request.nextUrl.searchParams.get("id");
    const blog = await BlogModel.findById(id);
    fs.unlink(`./public/${blog.image}`, () => {});
    await BlogModel.findByIdAndDelete(id);
    return NextResponse.json({
      success: true,
      message: "Blog deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({
      success: false,
      message: "Error while deleting blog",
    });
  }
}
