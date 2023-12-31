// Chakra imports
import {
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "@/components/Card/Card.js";
import CardBody from "@/components/Card/CardBody.js";
import CardHeader from "@/components/Card/CardHeader.js";
import TablesTableRow from "@/components/Tables/TablesTableRow";

interface AuthorsProps {
  title: string;
  captions: string[];
  data: any[];
  total: number;
}

const Authors = ({ title, captions, data, total }: AuthorsProps) => {
  const textColor = useColorModeValue("gray.700", "white");
  return (
    <Card overflowX={{ sm: "scroll", xl: "hidden" }}>
      <CardHeader p="6px 0px 22px 0px">
        <Text fontSize="xl" color={textColor} fontWeight="bold">
          {title}
        </Text>

        <Text>
          {data?.length} {data?.length === 1 ? "item" : "itens"} de {total}
        </Text>
      </CardHeader>
      <CardBody>
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my=".8rem" pl="0px" color="gray.400">
              {captions.map((caption, idx) => {
                return (
                  <Th
                    color="gray.400"
                    key={idx}
                    ps={idx === 0 ? "0px" : "null"}
                  >
                    {caption}
                  </Th>
                );
              })}
            </Tr>
          </Thead>
          <Tbody>
            {data?.map((row) => {
              return <TablesTableRow key={`${row.id}`} {...row} />;
            })}
          </Tbody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default Authors;
