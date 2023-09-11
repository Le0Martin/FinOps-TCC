import {
  Box,
  Text,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Input,
  FormControl,
  FormLabel,
  Checkbox,
} from "@chakra-ui/react";

import "react-responsive-pagination/themes/classic.css";

interface ItemMenuProps {
  min: number;
  max: number;
  label: string;
  metric: string;
  value: number[];
  setValue: (value: number[]) => void;
  activated: boolean;
  setActivated: (value: boolean) => void;
}

export const ItemMenu = ({
  min,
  max,
  label,
  metric,
  value,
  setValue,
  activated,
  setActivated,
}: ItemMenuProps) => {
  return (
    <Box
      w="100%"
      p="4"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={"gray.200"}
      mt={4}
    >
      <Checkbox
        isChecked={activated}
        onChange={(e) => setActivated(e.target.checked)}
      />
      <Text fontSize="lg" fontWeight="bold" color={"gray.600"}>
        {label + " " + `(${metric})`}
      </Text>
      {value[0] + " - " + value[1]}
      <RangeSlider
        aria-label={["min", "max"]}
        min={min}
        max={max}
        defaultValue={[10, 30]}
        value={value}
        onChange={(value) => setValue(value)}
      >
        <RangeSliderTrack>
          <RangeSliderFilledTrack />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>

      <Box>
        <FormControl>
          <FormLabel>{`${label} min`}</FormLabel>
          <Input
            type="number"
            min={min}
            placeholder={`${label} min`}
            value={value[0]}
            onChange={(e) => setValue([Number(e.target.value), value[1]])}
          />
        </FormControl>
        <FormControl>
          <FormLabel>{`${label} max`}</FormLabel>
          <Input
            type="number"
            placeholder={`${label} max`}
            value={value[1]}
            max={max}
            onChange={(e) => setValue([value[0], Number(e.target.value)])}
          />
        </FormControl>
      </Box>
    </Box>
  );
};
