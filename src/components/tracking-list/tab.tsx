import { Tabs, Tab } from "@nextui-org/tabs";
import LocationComp from "./location";
import Trackingdetails from "./tracking-details";
import { Icon } from "@/icons";
import { Location } from "@/interface";

type Props = {
  locations: Location[]
  setLocations: React.Dispatch<React.SetStateAction<Location[]>>
}

const TabComponent = ({ locations, setLocations }: Props) => {
  const tabsData = [
    {
      tabscontent: LocationComp,
      value: "Stops",
      icon: "stops",
      props: { locations, setLocations }
    },
    {
      tabscontent: Trackingdetails,
      value: "Tracking-Info",
      icon: "tracking",
      props: {}
    },
  ];

  return (
    <Tabs
      aria-label="Options"
      variant="underlined"
      color="primary"
      classNames={{
        tabList:
          "gap-6 lg:w-[1210px] w-full flex justify-center relative rounded-none p-0 border-b border-divider",
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
          {/* @ts-ignore */}
          <item.tabscontent {...item.props} />
        </Tab>
      ))}
    </Tabs>
  );
};

export default TabComponent;
