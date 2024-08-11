"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { contactinfo } from "@/data";
import { Location } from "@/interface";
import useStore from "@/lib/store";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import { z } from "zod";
import documentText from "../../../public/images/document-text.svg";
import docempty from "../../../public/images/document.svg";
import phone from "../../../public/images/phone.svg";
import avatar from "../../../public/images/profile-blue.svg";
import ticksqure from "../../../public/images/tick-square.svg";
import user from "../../../public/images/user.svg";
import { Label } from "../ui/label";
import TabComponent from "./tab";

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

const formSchema = z.object({
  loadId: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Max 50 chars" }),
  loadStatus: z.string().default("delivered"),
  driverName: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Max 50 chars" }),
  driverPhone: z
    .string()
    .min(1, { message: "Required" })
    .regex(phoneRegex, { message: "Please enter a valid phone number" }),
  carrierName: z.string().max(50, { message: "Max 50 chars" }).optional(),
  carrierPhone: z
    .string()
    .optional()
    .refine((value) => !value || phoneRegex.test(value), {
      message: "Please enter a valid phone number",
    }),
  notificationPhone: z
    .string()
    .optional()
    .refine((value) => !value || phoneRegex.test(value), {
      message: "Please enter a valid phone number",
    }),
  notificationEmail: z.string().email(),
  note: z.string().optional(),
  status: z.string().default("none"),
});

type IProps = {
  formValues: Record<string, any> | null;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setRefetch: React.Dispatch<React.SetStateAction<string>>;
};

const Contactinfo: React.FC<IProps> = ({
  formValues,
  setOpenModal,
  setRefetch,
}) => {
  const isOpen = useStore((state) => state.isOpen);

  const recordBeingEdited = useStore((state) => state.recordBeingEdited);
  const setRecordBeingEdited = useStore((state) => state.setRecordBeingEdited);
  const editableContactInfo = useStore((state) => state.editableContactInfo);
  const setEditableContactInfo = useStore(
    (state) => state.setEditableContactInfo
  );

  // console.log(formValues?.locations);

  const [isDraft, setIsDraft] = useState(false);
  const [locations, setLocations] = useState<Location[]>(
    formValues?.locations || []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: formValues || {},
    mode: "onChange",
  });

  useEffect(() => {
    if (isOpen) {
      setEditableContactInfo(recordBeingEdited);
      if (editableContactInfo) {
        form.reset(editableContactInfo);
      }
    } else {
      form.reset();
    }
  }, [
    editableContactInfo,
    form,
    isOpen,
    recordBeingEdited,
    setEditableContactInfo,
    setRecordBeingEdited,
  ]);

  const handleFormSubmit = async (data: z.infer<typeof formSchema>) => {
    const isPublished = isDraft;
    const isArchived = false;
    try {
      const response = await fetch("/api/trackings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, locations, isPublished, isArchived }),
      });

      const result = await response.json();

      if (result.success) {
        const isDraft = result.status === "draft";

        toast({
          title: isDraft
            ? "Entry saved as draft!"
            : "Entry created successfully!",
          description: isDraft
            ? "Your form has been saved as draft."
            : "Your form has been submitted.",
        });
        setOpenModal(false);
        setRefetch(new Date().toISOString());
      } else {
        alert("Error submitting data");
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <div>
      <div className="bg-white">
        <div className="py-7 px-4">
          <div className="flex items-center gap-2.5 mb-10">
            <Image src={user} alt="" />
            <h3 className="text-primaryblack text-2xl font-semibold">
              Contact Info
            </h3>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleFormSubmit)}>
              <div className="mb-4 ml-7 md:hidden">
                <div className="flex items-center space-x-4">
                  <Label className="text-muted-foreground">Status</Label>
                  <div
                    className={`capitalize flex justify-center rounded-xl text-[13px] cursor-pointer font-semibold text-[#FFA51F] bg-[#F6F0E8] py-2.5 px-8`}
                  >
                    Delivered
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 mb-10 pb-8 border-b border-[#F4F4F5]">
                {contactinfo.map((item, index) => {
                  const isFirstItem = index === 0;
                  return (
                    <FormField
                      key={index}
                      control={form.control}
                      //@ts-ignore
                      name={item.name}
                      render={({ field }) => (
                        <FormItem>
                          <div
                            className={cn(
                              item.type !== "select" &&
                                "flex items-center gap-2.5 my-3 rounded-[14px] border border-[#F4F4F5] px-4 py-2 cursor-pointer w-full",
                              isFirstItem ? "md:col-span-2" : ""
                            )}
                          >
                            <FormControl>
                              {item.type === "tel" ? (
                                <InputMask mask="(999) 999-9999" {...field}>
                                  {
                                    //@ts-ignore
                                    (inputProps) => (
                                      <Input
                                        type="tel"
                                        placeholder={item.placeholder}
                                        {...inputProps}
                                        className="bg-transparent border-none"
                                      />
                                    )
                                  }
                                </InputMask>
                              ) : item.type === "select" ? (
                                <>
                                  <div className="hidden md:flex items-center space-x-10 ml-[27px]">
                                    <Label className="text-muted-foreground">
                                      Status:
                                    </Label>
                                    <div
                                      className={`capitalize flex justify-center rounded-xl text-[13px] cursor-pointer font-semibold text-[#FFA51F] bg-[#F6F0E8] py-2.5 px-8`}
                                    >
                                      Delivered
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <Input
                                  type={item.type}
                                  placeholder={item.placeholder}
                                  {...field}
                                  className="bg-transparent border-none"
                                />
                              )}
                            </FormControl>
                            {item.type !== "select" && (
                              <Image src={item.icon} alt="" />
                            )}
                          </div>
                          <span
                            className={
                              item.type === "select"
                                ? "hidden md:block"
                                : "block"
                            }
                          >
                            <FormMessage className="text-xs font-normal text-red-400 ml-[29px] form-message" />
                          </span>
                        </FormItem>
                      )}
                    />
                  );
                })}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FormField
                  control={form.control}
                  //@ts-ignore
                  name={"notificationEmail"}
                  render={({ field }) => (
                    <FormItem>
                      <div
                        className={cn(
                          "flex relative flex-wrap items-center gap-2.5 rounded-[14px] border border-[#F4F4F5] px-4 py-2 cursor-pointer w-full"
                        )}
                      >
                        <FormControl>
                          <div className="flex flex-wrap items-center gap-2">
                            <Input
                              type="email"
                              placeholder="Notification Email"
                              className="bg-transparent border-none flex-grow"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <span className=" absolute right-4 top-5">
                          <Image src={avatar} alt="" />
                        </span>
                      </div>
                      <span className="block">
                        <FormMessage className="text-xs font-normal text-red-400 ml-[29px] form-message" />
                      </span>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  //@ts-ignore
                  name={"notificationPhone"}
                  render={({ field }) => (
                    <FormItem>
                      <div
                        className={cn(
                          "flex relative flex-wrap items-center gap-2.5 rounded-[14px] border border-[#F4F4F5] px-4 py-2 cursor-pointer w-full"
                        )}
                      >
                        <FormControl>
                          <div className="flex flex-wrap items-center gap-2">
                            <InputMask mask="(999) 999-9999" {...field}>
                              {
                                //@ts-ignore
                                (inputProps) => (
                                  <Input
                                    type="tel"
                                    placeholder={"Notification Phone"}
                                    className="bg-transparent border-none"
                                    {...inputProps}
                                  />
                                )
                              }
                            </InputMask>
                          </div>
                        </FormControl>
                        <span className=" absolute right-4 top-5">
                          <Image src={phone} alt="" />
                        </span>
                      </div>
                      <span className="block">
                        <FormMessage className="text-xs font-normal text-red-400 ml-[29px] form-message" />
                      </span>
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name={"note"}
                render={({ field }) => (
                  <FormItem>
                    <div
                      className={cn(
                        "flex items-center gap-2.5 rounded-[14px] border border-[#F4F4F5] px-4 py-2 cursor-pointer w-full"
                      )}
                    >
                      <FormControl>
                        <Input
                          type={"text"}
                          placeholder={"Write a note here..."}
                          {...field}
                          className="bg-transparent border-none"
                        />
                      </FormControl>

                      <Image src={documentText} alt="" />
                    </div>
                    <span className="block">
                      <FormMessage className="text-xs font-normal text-red-400 ml-[29px] form-message" />
                    </span>
                  </FormItem>
                )}
              />
              <TabComponent locations={locations} setLocations={setLocations} />
              <div className="flex sm:flex-row  py-10 px-4 flex-col gap-4 justify-start md:justify-end">
                <button
                  onClick={() => setIsDraft(false)}
                  type="submit"
                  className="flex justify-center gap-2.5 px-6 py-3 text-primaryblue bg-lightblue rounded-[14px] cursor-pointer"
                >
                  <Image src={docempty} alt="" />
                  <p>Save as Draft</p>
                </button>
                <button
                  onClick={() => setIsDraft(true)}
                  type="submit"
                  className="flex justify-center gap-2.5 px-6 py-3 text-white bg-primaryblue rounded-[14px] cursor-pointer"
                >
                  <Image src={ticksqure} alt="" />
                  <p>Publish</p>
                </button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Contactinfo;
