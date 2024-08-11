"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Modal, ModalBody, ModalContent } from "@nextui-org/react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  SortingState,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table";
import Image from "next/image";
import { useEffect, useState } from "react";

import { Clock } from "@/icons/Clock";
import archive from "../../../public/images/archive.svg";
import edit from "../../../public/images/edit.svg";
import eye from "../../../public/images/eye.svg";
import filter from "../../../public/images/filter.svg";
import more from "../../../public/images/more.svg";
import tracknewload from "../../../public/images/plus-blue.svg";
import search from "../../../public/images/search.svg";
import trash from "../../../public/images/trash.svg";
import Contactinfo from "./contact-info";
import { PaginationDemo } from "./pagination";

interface Load {
  _id: string;
  loadId: string;
  date: string;
  driver: string;
  carrier: string;
  initialPickup: {
    cityState: string;
    dateTime: string;
  };
  finalDropoff: {
    cityState: string;
    dateTime: string;
  };
  loadStatus: string;
  status: string;
}

/* // Transform data function
const transformData = (data: any[]): Load[] => {
  return data.map((item, index) => ({
    _id: `load-${index}`,
    date: item?.contactInfo?.date,
    loadId: `#${item.contactInfo.loadId}`,
    driver: item.contactInfo.driverName,
    carrier: item.contactInfo.carrierName,
    initialPickup: {
      cityState: item.pickupLocations[0]?.pickuplocation,
      dateTime:
        item.pickupLocations?.length > 0 &&
        item.pickupLocations[0]?.actualPickupDate &&
        item.pickupLocations[0]?.actualPickupTime
          ? `${format(
              new Date(item.pickupLocations[0]?.actualPickupDate),
              "d MMMM, yyyy"
            )} at ${item.pickupLocations[0]?.actualPickupTime}`
          : "",
    },
    finalDropoff: {
      cityState: item.dropoffLocations[0]?.dropOfflocation,
      dateTime:
        item.dropoffLocations?.length > 0 &&
        item.dropoffLocations[0]?.actualDropOffDate &&
        item.dropoffLocations[0]?.actualDropOffTime
          ? `${format(
              new Date(item.dropoffLocations[0]?.actualDropOffDate),
              "d MMMM, yyyy"
            )} at ${item.dropoffLocations[0]?.actualDropOffTime}`
          : "",
    },
    status: item?.status,
    loadStatus: item?.status === "draft" ? "Draft" : "Under Process",
  }));
}; */

export function TrackingInfoDataTable() {
  /* const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const setEditableContactInfo = useStore(
    (state) => state.setEditableContactInfo
  );
  const trackingInfo = useStore((state) => state.trackingInfo);
  const setRecordBeingEdited = useStore((state) => state.setRecordBeingEdited); */

  const { toast } = useToast();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [editData, setEditData] = useState(null);
  const [refetch, setRefetch] = useState("");

  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/trackings");
        const result = await response.json();

        if (result.success) {
          setData(result.data);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [refetch]);

  /* useEffect(() => {
    if (!isOpen) {
      setRecordBeingEdited("");
      setEditableContactInfo("");
    }
  }, [isOpen, setEditableContactInfo, setRecordBeingEdited]);

  useEffect(() => {
    const transformedData = transformData(trackingInfo);
    setData(transformedData);
  }, [isOpen, setRecordBeingEdited, trackingInfo]); */

  const columns: ColumnDef<Load>[] = [
    {
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => <div>{row.getValue("createdAt")}</div>,
    },
    {
      accessorKey: "loadId",
      header: "Load ID",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("loadId")}</div>
      ),
    },
    {
      accessorKey: "driverName",
      header: "Driver",
      cell: ({ row }) => <div>{row.getValue("driverName")}</div>,
    },
    {
      accessorKey: "carrierName",
      header: "Carrier",
      cell: ({ row }) => <div>{row.getValue("carrierName")}</div>,
    },
    // {
    //   accessorKey: "initialPickup",
    //   header: "Initial Pickup",
    //   cell: ({ row }) => {
    //     //@ts-ignore
    //     const { cityState, dateTime } = row.getValue("initialPickup");
    //     return (
    //       <div>
    //         <div className="text-secondaryblack mb-1.5">{cityState}</div>
    //         <div className="text-blue-500 text-xs">{dateTime}</div>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   accessorKey: "finalDropoff",
    //   header: "Final Drop-off",
    //   cell: ({ row }) => {
    //     //@ts-ignore
    //     const { cityState, dateTime } = row.getValue("finalDropoff");
    //     return (
    //       <div>
    //         <div className="text-secondaryblack mb-1.5">{cityState}</div>
    //         <div className="text-blue-500 text-xs">{dateTime}</div>
    //       </div>
    //     );
    //   },
    // },
    {
      accessorKey: "tracking",
      header: "Tracking",
      cell: ({ row }) => {
        const color =
          row.original.status === "draft" || row.original.status === "publish"
            ? "#b5b3b1"
            : "#406AEC";

        return <Clock color={color} />;
      },
    },
    {
      accessorKey: "loadStatus",
      header: "Status",
      cell: ({ row }) => (
        <div
          className={`capitalize flex justify-center rounded-xl text-[13px] cursor-pointer font-semibold text-[#FFA51F] bg-[#F6F0E8] py-2.5 px-4`}
        >
          {row.getValue("loadStatus")}
        </div>
      ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const id = row.original._id;

        const handleEdit = async () => {
          const response = await fetch(`/api/trackings/${id}`);
          const result = await response.json();
          setEditData(result.data);
          setOpenModal(true);
        };

        const handleDelete = async () => {
          try {
            const response = await fetch(`/api/trackings/${id}`, {
              method: "DELETE",
            });
            setRefetch(new Date().toISOString());
            if (response.ok) {
              toast({
                title: "Deleted Successfully!",
              });
            } else {
              toast({
                title: "Failed to delete.",
              });
            }
          } catch (error) {
            console.error("Failed to delete:", error);
            toast({
              title: "An error occurred.",
            });
          }
        };

        const handleArchive = async () => {
          try {
            const response = await fetch(`/api/trackings/${id}`, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                isArchived: true,
              }),
            });

            if (response.ok) {
              toast({ title: "Archived Successfully!" });
              setData((prevData) => prevData.filter((item) => item._id !== id));
            } else {
              toast({ title: "Failed to archive." });
            }
          } catch (error) {
            console.error("Failed to archive:", error);
            toast({ title: "An error occurred." });
          }
        };
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <Image src={more} alt="" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="min-w-[150px]">
              <DropdownMenuItem>
                <div className="flex gap-2.5 items-center bg-[#F5F8FE] border border-lightblue rounded-[14px] px-3 py-2.5 w-full text-xs cursor-pointer font-semibold">
                  <Image src={eye} alt="" />
                  <p>View</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={handleEdit}
                  className="flex gap-2.5 items-center bg-[#F6F0E8] border border-lightblue rounded-[14px] px-3 py-2.5 w-full text-xs cursor-pointer font-semibold"
                >
                  <Image src={edit} alt="" />
                  <p>Edit</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={handleArchive}
                  className="flex gap-2.5 items-center bg-[#F4F4F5] border border-lightblue rounded-[14px] px-3 py-2.5 w-full text-xs cursor-pointer font-semibold"
                >
                  <Image src={archive} alt="" />
                  <p>Archive</p>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <div
                  onClick={handleDelete}
                  className="flex gap-2.5 items-center bg-[#FCEAEC] border border-lightblue rounded-[14px] px-3 py-2.5 w-full text-xs cursor-pointer font-semibold"
                >
                  <Image src={trash} alt="" />
                  <p>Delete</p>
                </div>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  const table = useReactTable<Load>({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  /*  const handleOpenModal = () => {
    onOpen();
  };

  const [formData, setFormData] = useState({
    loadId: "",
    driverName: "",
    driverPhone: "",
    carrierName: "",
    carrierPhone: "",
    notificationEmail: "",
    notificationPhone: "",
    status: "",
    note: "",
  });

  const handleFormDataChange = (updatedData: any) => {
    setFormData((prevData) => ({ ...prevData, ...updatedData }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/tracking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Form submitted successfully:", result.data);
      } else {
        console.error("Form submission failed:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }; */

  return (
    <>
      <>
        <div className="w-full">
          <div className="md:grid hidden grid-cols-1 md:grid-cols-2 gap-10 mb-8">
            <div className="flex md:flex-row flex-col gap-5">
              <div className="flex justify-center items-center gap-2.5 bg-lightblue rounded-[14px] border-blue-200 py-[14px] px-6 cursor-pointer">
                <Image src={filter} alt="Filter" />
                <p className="text-secondaryblack text-sm font-semibold">
                  Filters
                </p>
              </div>
              <div className="flex items-center gap-2.5 rounded-[14px] border border-lightblue px-4 cursor-pointer w-full">
                <Image src={search} alt="Search" />
                <Input
                  className="bg-transparent border-none"
                  placeholder="Search by name or #id"
                  value={
                    (table.getColumn("loadId")?.getFilterValue() as string) ??
                    ""
                  }
                  onChange={(event) =>
                    table
                      .getColumn("loadId")
                      ?.setFilterValue(event.target.value)
                  }
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button onClick={() => setOpenModal(true)}>
                <div className="flex justify-center items-center gap-2.5 bg-lightblue rounded-[14px] border-blue-200 py-[14px] px-4 cursor-pointer max-w-[190px]">
                  <Image src={tracknewload} alt="Track new Load" />
                  <p className="text-secondaryblack text-sm font-semibold">
                    Track new Load
                  </p>
                </div>
              </button>
            </div>
          </div>
          <div className="md:hidden grid grid-cols-7 justify-end gap-1 mb-5">
            <div className="flex items-center gap-1 rounded-[14px] border border-lightblue px-4 cursor-pointer w-full col-span-5">
              <Image src={search} alt="Search" />
              <Input
                className="bg-transparent border-none"
                placeholder="Search by name or #id"
                value={
                  (table.getColumn("loadId")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  table.getColumn("loadId")?.setFilterValue(event.target.value)
                }
              />
            </div>
            <div className="flex justify-center items-center rounded-[14px] border-blue-200 py-[10px] px-2 cursor-pointer col-span-1">
              <Image src={filter} alt="Filter" />
            </div>
            <div>
              <button onClick={() => setOpenModal(true)}>
                <div className="flex justify-center items-center rounded-[14px] border-blue-200 py-[10px] px-2 cursor-pointer col-span-1">
                  <Image src={tracknewload} alt="Track new Load" />
                </div>
              </button>
            </div>
          </div>
          <Modal
            isOpen={openModal}
            onOpenChange={() => {
              setOpenModal(false);
              setEditData(null);
            }}
            size={"5xl"}
            scrollBehavior="inside"
            className="max-w-7xl rounded-lg"
          >
            <ModalContent>
              {() => {
                return (
                  <ModalBody>
                    <Contactinfo
                      formValues={editData}
                      setOpenModal={setOpenModal}
                      setRefetch={setRefetch}
                    />
                  </ModalBody>
                );
              }}
            </ModalContent>
          </Modal>
          <div className="main-table">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {!header.isPlaceholder &&
                          flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      data-state={row.getIsSelected() && "selected"}
                      key={row.id}
                      className="cursor-pointer"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-4">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-24 text-center"
                    >
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="mt-4">
          <PaginationDemo />
        </div>
      </>
    </>
  );
}
