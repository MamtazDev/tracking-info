import hash from "../public/images/hashtag.svg";
import phone from "../public/images/phone.svg";
import avatar from "../public/images/profile-blue.svg";

 export const contactinfo = [
    {
      placeholder: "Load ID*",
      type: "text",
      name: "loadId",
      icon: hash,
    },
    {
      placeholder: "Status",
      type: "select",
      name: "status",
      icon: hash,
      options:["Under Process","Left Warehouse", "Shipped to Delivery City ", "Delivered"]
    },
    {
      placeholder: "Driver Name*",
      type: "text",
      name: "driverName",
      icon: avatar,
    },
    {
      placeholder: "Driver Phone*",
      type: "tel",
      name: "driverPhone",
      icon: phone,
    },
    {
      placeholder: "Carrier Name",
      type: "text",
      name: "carrierName",
      icon: avatar,
    },
    {
      placeholder: "Carrier Phone",
      type: "tel",
      name: "carrierPhone",
      icon: phone,
    },
  ];