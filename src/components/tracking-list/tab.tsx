import { Tabs, Tab } from "@nextui-org/tabs";
import Location from "./location";
import Trackingdetails from "./tracking-details";
import { Icon } from "@/icons";

const TabComponent = () => {
  return (
    <Tabs
      aria-label="Options"
      variant="underlined"
      color="primary"
   
      classNames={{
        tabList:
          "gap-6 w-full flex justify-center relative rounded-none p-0 border-b border-divider",
        cursor: "w-full bg-[#406AEC]",
        tab: "max-w-fit px-0 h-12",
        tabContent: "group-data-[selected=true]:text-[#406AEC]",
      }}
    >
      {tabsData.map((item, index) => (
        <Tab
          key={index}
          title={
            <div className="flex items-center space-x-2">
              <Icon name={item.icon} />
              <span>{item.value}</span>
            </div>
          }
        >
          <item.tabscontent />
        </Tab>
      ))}
    </Tabs>
  );
};

export default TabComponent;

const tabsData = [
  {
    tabscontent: Location,
    value: "Stops",
    icon: "stops",
  },
  {
    tabscontent: Trackingdetails,
    value: "Tracking-Info",
    icon: "tracking",
  },
];
