import { formatDate } from "easy-datetime-fmt";

const EmailTableItem = ({ id, email, date, deleteEmail }) => {
  const blogDate = new Date(date);

  return (
    <tr className="bg-white border-b">
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{formatDate(blogDate)}</td>
      <td className="px-6 py-4 cursor-pointer" onClick={() => deleteEmail(id)}>
        x
      </td>
    </tr>
  );
};

export default EmailTableItem;
