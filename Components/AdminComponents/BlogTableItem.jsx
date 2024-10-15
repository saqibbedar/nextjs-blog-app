import { assets } from "@/Assets/assets";
import { formatDate } from "easy-datetime-fmt";
import Image from "next/image";

const BlogTableItem = ({ id, title, author, authorImg, date, deleteBlog }) => {
  const blogDate = new Date(date);

  return (
    <tr className="bg-white border-b">
      <th
        scope="row"
        className="items-center hidden sm:flex px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
      >
        <Image
          src={authorImg ? authorImg : assets.profile_icon}
          width={40}
          height={40}
          alt=""
        />
        <p className="pl-3">{author ? author : "No author"}</p>
      </th>
      <td className="px-6 py-4">{title ? title : "No title"}</td>
      <td className="px-6 py-4">{formatDate(blogDate)}</td>
      <td className="px-6 py-4 cursor-pointer" onClick={() => deleteBlog(id)}>
        x
      </td>
    </tr>
  );
};

export default BlogTableItem;
