"use client";

import EmailTableItem from "@/Components/AdminComponents/EmailTableItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const page = () => {
  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    try {
      const response = await axios.get("/api/email");
      if (response.data.success) {
        setEmails(response.data.emails);
      } else {
        throw new Error("Error while fetching emails");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEmail = async (mongoId) => {
    const response = await axios.delete("/api/email", {
      params: {
        id: mongoId,
      },
    });
    if (response.data.success) {
      toast.success(response.data.message);
      fetchEmails();
    } else {
      toast.error(response.data.message);
    }
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  return (
    <div className="flex-1 pt-5 px-5 sm:pt-12 sm:pl-16">
      <h1>All Emails</h1>
      <div className="relative h-[80vh] max-w-[850px] overflow-x-auto mt-4 border border-gray-400 scrollbar-hide">
        <table className="w-full text-sm text-gray-500">
          <thead className="text-sm tex-gray-700 text-left uppercase bg-gray-50">
            <tr>
              <th scope="col" className="hidden sm:block px-6 py-3">
                Email
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
            {emails.map(({ _id, email, date }, index) => (
              <EmailTableItem
                key={index}
                id={_id}
                email={email}
                date={date}
                deleteEmail={deleteEmail}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default page;
