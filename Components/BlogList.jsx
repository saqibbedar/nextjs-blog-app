import { blog_data } from '@/Assets/assets';
import React, { useState } from 'react'
import BlogItem from './BlogItem';

const BlogList = () => {
    const [blogCategory, setBlogCategory] = useState("All");
    const categoryButtons = ["All", "Technology", "Startup", "Lifestyle"];

  return (
    <div>
      <div className="flex justify-center gap-6 my-10">
        {categoryButtons.map((buttonValue, index) => (
          <button onClick={()=> setBlogCategory(buttonValue)} className={blogCategory === buttonValue && "bg-black text-white px-4 py-1 rounded-sm"} key={index}>
            {buttonValue}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap justify-around gap-1 gap-y-10 mb-16 xl:mx-24">
        {blog_data.filter(data => data.category === blogCategory || blogCategory === "All").map(({ title, description, category, image, id }, index) => (
          <BlogItem
            image={image}
            title={title}
            category={category}
            description={description}
            id={id}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}

export default BlogList
