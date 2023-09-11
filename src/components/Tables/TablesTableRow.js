import {
  Avatar,
  Badge,
  Button,
  Flex,
  Td,
  Text,
  Tr,
  useColorModeValue,
  Stack,
  Box,
} from "@chakra-ui/react";
import React from "react";
import { Sku } from "@/services/sku";
import { formatBits } from "@/utils/byteFormatter";
import { formatPrice } from "@/utils/priceFormatter";
import { converterDolarParaReal } from "@/utils/currencyFormatter";
import { useCurrency } from "@/contexts/currencyContext";
import { Link } from "@chakra-ui/next-js";

function TablesTableRow(props) {
  const {
    name,
    company,
    gpu,
    cpu,
    ram,
    storage,
    price,
    disk,
    external_network_speed,
  } = props;
  const { currency } = useCurrency();

  const textColor = useColorModeValue("gray.700", "white");
  const bgStatus = useColorModeValue("gray.400", "#1a202c");
  const colorStatus = useColorModeValue("white", "gray.400");

  const getMetricNetwork = (metric) => {
    switch (metric) {
      case "MB":
        return "Mbps";
      case "Mb":
        return "Mbps";
      case "GB":
        return "Gbps";
      case "Gb":
        return "Gbps";
      case "TB":
        return "Tbps";
      case "Tb":
        return "Tbps";
      default:
        return "Mbps";
    }
  };

  return (
    <Tr>
      <Td minWidth={{ sm: "250px" }} pl="0px">
        <Flex align="center" py=".8rem" minWidth="100%" flexWrap="nowrap">
          {/* <Avatar src={logo} w="50px" borderRadius="12px" me="18px" /> */}
          <Flex direction="column">
            <Link href={`/instance/${props.id}`}>
              <Text
                fontSize="md"
                color={textColor}
                fontWeight="bold"
                minWidth="100%"
              >
                {name}
              </Text>
            </Link>
            <Text fontSize="sm" color="gray.400" fontWeight="normal">
              {company}
            </Text>
          </Flex>
        </Flex>
      </Td>

      <Td>
        <Flex direction="column">
          <Text fontSize="md" color={textColor} fontWeight="bold">
            {gpu}
          </Text>
        </Flex>
      </Td>

      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {cpu}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {`${ram.value} (${ram.unit})`}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {props.cloudStoreOnly ? "EBS only" : ` ${disk.value} (${disk.unit})`}
        </Text>
      </Td>
      <Td>
        <Text fontSize="md" color={textColor} fontWeight="bold" pb=".5rem">
          {external_network_speed === 0
            ? "Indisponível"
            : `${external_network_speed.value} (${getMetricNetwork(
                external_network_speed.unit
              )})`}
        </Text>
      </Td>

      <Td>
        <Stack>
          <Box>
            <Badge
              bg={"green.400"}
              color={"white"}
              fontSize="16px"
              p="3px 10px"
              borderRadius="8px"
            >
              {converterDolarParaReal(
                price?.value,
                currency?.bid || 1,
                price?.unit
              )}
            </Badge>
          </Box>
          <Box>
            <Badge
              bg={bgStatus}
              color={colorStatus}
              fontSize="16px"
              p="3px 10px"
              borderRadius="8px"
            >
              {formatPrice(price?.value, price?.unit)}
            </Badge>
          </Box>
        </Stack>
      </Td>
    </Tr>
  );
}

export default TablesTableRow;
