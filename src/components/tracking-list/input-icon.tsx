import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";

interface InputIconProps {
  icon: string;
  placeholder: string;
  type: string;
}

const InputIcon: React.FC<InputIconProps> = ({ icon, placeholder, type }) => {
  return (
    <div className="flex items-center gap-2.5 rounded-[14px] border border-[#F4F4F5] px-4 py-2 cursor-pointer w-full">
      <Input
        placeholder={placeholder}
        type={type}
      />
      <Image src={icon} alt="icin" />
    </div>
  );
};

export default InputIcon;
