import * as React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import location from "../../../public/images/location-black.svg";
import calendar from "../../../public/images/calendar-black.svg";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import reload from "../../../public/images/reload.svg";

const initialTags = [
  {
    location: "San Mateo, CA",
    datetime: "24 March, 2024 at 11:30 AM",
  },
  {
    location: "Palo Alto, CA",
    datetime: "25 March, 2024 at 02:15 PM",
  },
  {
    location: "Mountain View, CA",
    datetime: "26 March, 2024 at 09:45 AM",
  },
  {
    location: "Sunnyvale, CA",
    datetime: "27 March, 2024 at 05:30 PM",
  },
  {
    location: "Santa Clara, CA",
    datetime: "28 March, 2024 at 08:00 AM",
  },
  {
    location: "Cupertino, CA",
    datetime: "29 March, 2024 at 12:20 PM",
  },
  {
    location: "Redwood City, CA",
    datetime: "30 March, 2024 at 07:10 PM",
  },
  {
    location: "Los Altos, CA",
    datetime: "31 March, 2024 at 03:25 PM",
  },
  {
    location: "Fremont, CA",
    datetime: "01 April, 2024 at 10:40 AM",
  },
  {
    location: "Milpitas, CA",
    datetime: "02 April, 2024 at 04:50 PM",
  },
  {
    location: "San Jose, CA",
    datetime: "03 April, 2024 at 11:55 AM",
  },
  {
    location: "Oakland, CA",
    datetime: "04 April, 2024 at 09:15 AM",
  },
  {
    location: "Berkeley, CA",
    datetime: "05 April, 2024 at 06:45 PM",
  },
  {
    location: "Daly City, CA",
    datetime: "06 April, 2024 at 02:35 PM",
  },
  {
    location: "San Francisco, CA",
    datetime: "07 April, 2024 at 08:25 AM",
  },
  {
    location: "Hayward, CA",
    datetime: "08 April, 2024 at 05:05 PM",
  },
  {
    location: "Santa Cruz, CA",
    datetime: "09 April, 2024 at 01:55 PM",
  },
  {
    location: "Saratoga, CA",
    datetime: "10 April, 2024 at 07:30 AM",
  },
  {
    location: "Menlo Park, CA",
    datetime: "11 April, 2024 at 03:10 PM",
  },
];

const Lastknownlocation = () => {
  const [tags, setTags] = React.useState(initialTags);
  const [selectedIndex, setSelectedIndex] = React.useState(null);

  const handleLocationClick = (index: number | null) => {
    if (selectedIndex === index) {
      setSelectedIndex(null); // Deselect if the same location is clicked again
    } else {
      const selectedTag = tags[index];
      const newTags = [selectedTag, ...tags.filter((_, i) => i !== index)];
      setTags(newTags);
      //@ts-ignore
      setSelectedIndex(0);
    }
  };

  return (
    <div>
      <div>
        <div className="grid grid-cols-2 gap-5 mb-4">
          <div>
            <div className="flex items-center space-x-4">
              <Label className="text-base font-normal leading-none">
                Type:
              </Label>
              <RadioGroup
                defaultValue="active"
                className="flex items-center space-x-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="active" id="active" />
                  <Label htmlFor="active">Active</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="passive" id="passive" />
                  <Label htmlFor="passive">Passive</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <h3 className="text-lg hidden lg:block font-semibold text-secondaryblack">
            Last Known Location
          </h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 border border-[#F4F4F5] rounded-xl p-4">
          <div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m26!1m12!1m3!1d6811.647852318071!2d73.11066969135179!3d31.391418147092757!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m11!3e6!4m3!3m2!1d31.387455!2d73.1155758!4m5!1s0x3922670072a40467%3A0xfbdff78aabf0d4d9!2s94W7%2B4G5%20FIT%20DENTAL%20CARE%20CLINIC%2C%20Main%20Rd%2C%20Shahzad%20Colony%20Burhan%20Mohalla%2C%20Faisalabad%2C%20Punjab%2C%20Pakistan!3m2!1d31.395238499999998!2d73.113867!5e0!3m2!1sen!2s!4v1718342153071!5m2!1sen!2s"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-[14px] min-w-full h-[300px] lg:h-[565px]"
            />
          </div>
          <div>
            <div className="flex justify-between items-center lg:hidden my-4 mr-10">
              <h3 className="text-lg  font-medium text-secondaryblack">
                Last Known Location
              </h3>
              <Image src={reload} alt="" className="w-6" />
            </div>

            <div className="border border-[#F4F4F5] rounded-xl p-1">
              <div className="flex justify-between items-center py-4 px-2 bg-[#E9E9EA] rounded-t-xl rounded-b-[4px]">
                <div className="flex items-center gap-2.5">
                  <Image src={location} alt="" />
                  <h4 className="text-sm font-medium leading-none">Location</h4>
                </div>
                <div className="flex items-center gap-2.5">
                  <Image src={calendar} alt="" />
                  <h4 className="text-sm font-medium leading-none">
                    Latest Update
                  </h4>
                </div>
              </div>
              <ScrollArea className="h-[250px] lg:h-[510px] w-full rounded-[14px]">
                <div className="pt-2">
                  {tags.map((item, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center text-primaryblack text-sm px-2 py-3.5 rounded-[4px] mb-1 cursor-pointer ${
                        selectedIndex === index
                          ? "bg-[#F5F8FE] text-primaryblue"
                          : "bg-[#FBFBFB]"
                      }`}
                      onClick={() => handleLocationClick(index)}
                    >
                      <h4>{item.location}</h4>
                      <p className="md:text-base text-xs">{item.datetime}</p>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lastknownlocation;
