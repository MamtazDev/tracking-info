"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import user from "../../../public/images/user.svg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import InputMask from "react-input-mask";
import { useToast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { contactinfo } from "@/data";
import useStore from "@/lib/store";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import phone from "../../../public/images/phone.svg";
import avatar from "../../../public/images/profile-blue.svg";
import documentText from "../../../public/images/document-text.svg";
import { Label } from "../ui/label";
import TabComponent from "./tab";

const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;

const formSchema = z.object({
  loadId: z
    .string()
    .min(1, { message: "Required" })
    .max(50, { message: "Max 50 chars" }),
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
  status: z.string().default("none")
});

const Contactinfo: React.FC = () => {
  const { toast } = useToast();

  const isOpen = useStore((state) => state.isOpen);
  const closeModal = useStore((state) => state.closeModal);
  const setLoadId = useStore((state) => state.setLoadId);
  const recordBeingEdited = useStore((state) => state.recordBeingEdited);
  const setRecordBeingEdited = useStore((state) => state.setRecordBeingEdited);
  const editableContactInfo = useStore((state) => state.editableContactInfo);
  const setEditableContactInfo = useStore(
    (state) => state.setEditableContactInfo
  );
  const addContactInfo = useStore((state) => state.addContactInfo);
  const updateContactInfo = useStore((state) => state.updateContactInfo);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: editableContactInfo || {},
    mode: "onChange",
  });

  const [emails, setEmails] = useState<string[]>([]);
  const [emailInput, setEmailInput] = useState("");
  const emailInputRef = useRef<HTMLInputElement>(null);

  const [phones, setPhones] = useState<string[]>([]);
  const [phoneInput, setPhoneInput] = useState("");
  const phoneInputRef = useRef<HTMLInputElement>(null);

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

  const handleFormSubmitBySifat = async (data: z.infer<typeof formSchema>) => {
    console.log("FormSubmit", data);
    try {
      const response = await fetch('/api/trackings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });``

      const result = await response.json();
      console.log(result)

      if (result.success) {
        alert('Data submitted successfully');
      } else {
        alert('Error submitting data');
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  // const handleFormSubmit = (
  //   values: z.infer<typeof formSchema>,
  //   isDraft: boolean
  // ) => {
  //   const currentDate = format(new Date(), "MM-dd-yy");
  //   const currentTime = format(new Date(), "hh:mm a");
  //   const updatedValues = {
  //     ...values,
  //     date: currentDate,
  //     time: currentTime,
  //     emails,
  //     phones,
  //   };

  //   if (editableContactInfo) {
  //     setLoadId(updatedValues.loadId);
  //     updateContactInfo(updatedValues);
  //     toast({
  //       title: isDraft
  //         ? "Entry saved as draft!"
  //         : "Entry updated successfully!",
  //       description: isDraft ? "Your form has been saved as draft." : undefined,
  //     });
  //   } else {
  //     setLoadId(updatedValues.loadId);
  //     addContactInfo(updatedValues);
  //     toast({
  //       title: isDraft
  //         ? "Entry saved as draft!"
  //         : "Entry created successfully!",
  //       description: isDraft
  //         ? "Your form has been saved as draft."
  //         : "Your form has been submitted.",
  //     });
  //   }

  //   if (isDraft) {
  //     closeModal();
  //   }
  // };

  // const handleEmailInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setEmailInput(e.target.value);
  // };

  // const handleEmailKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" || e.key === " ") {
  //     e.preventDefault();
  //     if (emailInput && !emails.includes(emailInput)) {
  //       setEmails([...emails, emailInput]);
  //       setEmailInput("");
  //     }
  //   }
  // };

  const removeEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  // const handlePhoneInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPhoneInput(e.target.value);
  // };

  // const handlePhoneKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter" || e.key === " ") {
  //     e.preventDefault();
  //     if (phoneInput && !phones.includes(phoneInput)) {
  //       setPhones([...phones, phoneInput]);
  //       setPhoneInput("");
  //       setTimeout(() => {
  //         if (phoneInputRef.current) {
  //           phoneInputRef.current.setSelectionRange(0, 0);
  //         }
  //       }, 0);
  //     }
  //   }
  // };

  const removePhone = (phoneToRemove: string) => {
    setPhones(phones.filter((phone) => phone !== phoneToRemove));
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
            <form
              // onSubmit={form.handleSubmit((values) =>
              //   handleFormSubmit(values, false)
              // )}
              onSubmit={form.handleSubmit(handleFormSubmitBySifat)}
            >
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
                          <span className={item.type === "select" ? "hidden md:block" : "block"}>
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
                //@ts-ignore
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
              <TabComponent />


            </form>
          </Form>
        </div>
      </div>


    </div>
  );
};

export default Contactinfo;
