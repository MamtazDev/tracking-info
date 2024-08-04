import { Location } from "./Location";
import { Clock } from "./Clock";
import { Calendar } from "./Calendar";
import { Plus } from "./Plus";
import { Cross } from "./Cross";
import { Pen } from "./Pen";
import { Check } from "./Check";
import { Refresh } from "./Refresh";
import { Copy } from "./Copy";
import { Tracking } from "./Tracking";
import { Stops } from "./Stops";

export const Icon = ({
  name,
  color,
  width,
  height,
}: {
  name: string;
  color?: string;
  width?: number;
  height?: number;
}) => {
  switch (name) {
    case "location":
      return <Location color={color} />;
    case "clock":
      return <Clock color={color} width={width} height={height} />;
    case "calendar":
      return <Calendar color={color} width={width} height={height} />;
    case "plus":
      return <Plus color={color} />;
    case "cross":
      return <Cross color={color} />;
    case "pen":
      return <Pen color={color} />;
    case "check":
      return <Check color={color} />;
    case "refresh":
      return <Refresh color={color} />;
    case "copy":
      return <Copy color={color} />;
    case "tracking":
      return <Tracking color={color} />;
    case "stops":
      return <Stops color={color} />;
    default:
      return null;
  }
};
