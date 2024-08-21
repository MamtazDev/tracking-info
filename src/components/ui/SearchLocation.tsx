import { debounce } from "@/lib/utils";
import { useCallback, useState } from "react";
import { ActionMeta, SingleValue } from "react-select";
import AsyncSelect from "react-select/async";

interface OptionType {
  label: string;
  value: string;
  data: ILocation;
}

interface ILocation {
  type: "Point";
  formatted: string;
  lon: number;
  lat: number;
}

type IProps = {
  selectedValue: any;
  changeHandler: any;
};

const SearchLocation = ({ selectedValue, changeHandler }: IProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [selectedOption, setSelectedOption] =
    useState<SingleValue<OptionType> | null>(null);

  const value = selectedValue.location?.formatted
    ? {
        label: selectedValue.location.formatted,
        value: selectedValue.location.formatted,
        data: selectedValue.location,
      }
    : null;

  const fetchOptions = async (inputValue: string): Promise<OptionType[]> => {
    if (!inputValue) return [];

    const response = await fetch(`/api/location`, {
      method: "POST",
      body: JSON.stringify({ text: inputValue }),
    });
    const data = await response.json();

    return data?.data?.results?.map((item: ILocation) => ({
      label: item.formatted,
      value: item.formatted,
      data: {
        type: "Point",
        formatted: item.formatted,
        coordinates: [item.lon, item.lat], // [longitude, latitude]
      },
    }));
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const loadOptions = useCallback(
    debounce(
      async (inputValue: string, callback: (options: OptionType[]) => void) => {
        const options = await fetchOptions(inputValue);
        callback(options);
      },
      500
    ),
    []
  );

  const handleChange = (
    selectedOption: SingleValue<OptionType>,
    actionMeta: ActionMeta<OptionType>
  ) => {
    setSelectedOption(selectedOption);
    setInputValue("");
    changeHandler((prev: any) => ({ ...prev, location: selectedOption?.data }));
  };

  return (
    <AsyncSelect<OptionType, false>
      cacheOptions
      loadOptions={loadOptions}
      onInputChange={(newValue) => setInputValue(newValue)}
      inputValue={inputValue}
      value={value}
      onChange={handleChange}
      placeholder="Add Stop - Enter Address"
      className="text-sm"
    />
  );
};

export default SearchLocation;
