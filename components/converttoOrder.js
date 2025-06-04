"use client";
import React, { useEffect, useState } from "react";
import Cross from "@/public/icons/cross";
import Plus from "@/public/icons/plus";
import { DatePicker } from "./ui/datepicker";
import Dustbin from "@/public/icons/dustbin";

const ConverttoOrder = ({ setshow, show }) => {
  const [deadline, setDeadline] = useState();
  useEffect(() => {
    //console.log(deadline, "date");
  }, [deadline]);

  const [fields, setFields] = useState([{ eventName: "", deadline: "" }]);

  const handleAddField = () => {
    if (fields.length < 6) {
      setFields([...fields, { eventName: "", deadline: "" }]);
    }
  };
  const handleDeleteField = (index) => {
    if (index === 0) return; // Prevent deletion of the first field
    const updatedFields = fields.filter((_, i) => i !== index);
    setFields(updatedFields);
  };

  const dedlinedate = (dd, idx) => {
    const date = new Date(dd);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() returns month from 0-11
    const year = date.getFullYear();

    const formatteddate = `${day}/${month}/${year}`;
    const newFields = fields.slice();
    newFields[idx]["deadline"] = formatteddate;
    setFields(newFields);
    setDeadline(formatteddate);
  };
  const handleInputChange = (index, field, value) => {
    const newFields = fields.slice();
    newFields[index][field] = value;
    setFields(newFields);
  };
  return (
    <div className="rounded-[40px] bg-[#FFFFFF] px-[2rem] 2xl:px-[1.5rem]  w-[400px] h-[80vh] overflow-x-hidden">
      <div className="flex justify-between items-center bg-[#FFFFFF] sticky w-full top-0 py-3">
        <div className="text-[#141415] text-[1.5rem] font-semibold font-Polysans">
          Convert to Order
        </div>
        <div
          className="cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            setshow(false);
          }}
        >
          <Cross />
        </div>
      </div>
      <div className="text-[#717171] text-[1rem] pt-4 pb-2">Quote Id</div>
      <div>
        <input
          type="text"
          placeholder="829382192"
          className="rounded-lg text-[0.80rem] font-normal text-[#737A82] w-full outline-none py-2 px-2 border-[1px] border-[#DFDFDF]"
          id=""
        />
      </div>
      <div className="text-[#272829] font-Polysans text-[1.35rem] font-semibold pt-[2rem]">
        Set Order Timeline
      </div>
      <div className="flex flex-col gap-6 pb-[7rem]">
        {fields.map((field, index) => (
          <div key={index}>
            <div className="flex justify-between items-center">
              <div className="text-[#717171] text-[1rem] font-Polysans pb-2 pt-5">
                Name of the Event Tag
              </div>
              {index !== 0 && (
                <div onClick={() => handleDeleteField(index)}>
                  <Dustbin />
                </div>
              )}
            </div>
            <div className="border-[1px] border-[#DFDFDF] rounded-lg flex items-center justify-between px-2 py-2">
              <input
                className="text-[#9C9C9C] text-[1rem] font-Matter outline-none"
                placeholder="Enter the name here"
                value={field.eventName}
                onChange={(e) =>
                  handleInputChange(index, "eventName", e.target.value)
                }
              />
            </div>
            <div className="text-[#717171] text-[1rem] font-Polysans pb-3 pt-5">
              Set Deadline
            </div>
            <div className="border-[1px] border-[#DFDFDF] rounded-lg flex items-center justify-between px-2 py-2">
              <input
                className="text-[#9C9C9C] text-[1rem] font-Matter outline-none"
                placeholder="00/00/0000"
                value={field.deadline}
                onChange={(e) => handleInputChange(index, "deadline", deadline)}
              />
              <div>
                <DatePicker idx={index} dedlinedate={dedlinedate} />
              </div>
            </div>
          </div>
        ))}
        {fields.length < 6 && (
          <div
            className="border-[1px] border-[#DFDFDF] rounded-lg flex justify-center items-center px-2 py-2 text-[#9C9C9C] cursor-pointer"
            onClick={handleAddField}
          >
            <div className="flex gap-2">
              <div>
                <Plus />
              </div>
              <div>Add more</div>
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#FFFFFF] sticky bottom-0 py-5">
        <div className="rounded-[42px] bg-[#205FFF] text-[#FFFFFF] text-[0.95rem] flex justify-center items-center h-[60px]">
          Confirm Order
        </div>
      </div>
    </div>
  );
};

export default ConverttoOrder;
