import PageContainer from "@/components/pageContainer";
import { useCurrency } from "@/contexts/currencyContext";
import { useQuestions } from "@/contexts/questionsContext";
import { Sku, getSku } from "@/services/sku";
import { formatBits } from "@/utils/byteFormatter";
import { converterDolarParaReal } from "@/utils/currencyFormatter";
import { formatPrice } from "@/utils/priceFormatter";
// import { Option, questions } from "@/mock/questions";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Image,
  Box,
  Stack,
  useBreakpointValue,
  Text,
  Button,
  SimpleGrid,
  Card,
  HStack,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Instance() {
  const router = useRouter();
  const id = router.query.id as string;
  const [instance, setInstance] = useState<Sku | null>(null);
  const [details, setDetails] = useState<any[]>([]);
  const { currency } = useCurrency();

  useEffect(() => {
    if (id) getInstace();
  }, [id]);

  const getInstace = async () => {
    try {
      const response = await getSku(id);
      setInstance(response.data);
      //iterate over response.data keys and values
      const instanceDetails = Object.entries(response.data).map(
        ([key, value]) => {
          return { title: key, value: value };
        }
      );

      setDetails(instanceDetails);
    } catch (error) {
      console.log(error);
    }
  };

  const { questions } = useQuestions();

  const machines = [
    {
      title: "f1-micro",
      value: "R$ 1.200,00",
    },
    {
      title: "g1-small",
      value: "R$ 1.200,00",
    },
  ];

  return (
    <>
      <Head>
        <title>Resultado</title>
      </Head>

      <Box bgColor={"gray.200"}>
        <Flex
          as="main"
          maxW="1124px"
          w="100%"
          mx="auto"
          align="center"
          justify="center"
          direction="column"
          p={8}
        >
          {/* Resultado */}
          <>
            <Flex direction="column" align="center" p={4} w="100%" mt={8}>
              <Image
                src="/static/data-science.png"
                alt="Data Science"
                boxSize="100px"
              />

              <Text
                fontSize={["2xl", "4xl"]}
                fontWeight="bold"
                color="blue.500"
                textAlign="center"
                mt={4}
              >
                {instance?.name}
              </Text>

              <SimpleGrid
                spacing={4}
                columns={4}
                w="100%"
                minChildWidth={200}
                mt={4}
              >
                <AttributeCard
                  title="CPU"
                  value={String(instance?.cpu)}
                  icon="/static/cpu.png"
                  description="Número de CPUs"
                />
                <AttributeCard
                  title="Memória"
                  value={instance?.ram.value + " " + instance?.ram.unit}
                  icon="/static/ram.png"
                  description="Quantidade de memória"
                />
                <AttributeCard
                  title="Disco"
                  value={
                    instance?.cloudStoreOnly
                      ? "EBS Only"
                      : instance?.disk.value + " " + instance?.disk.unit
                  }
                  icon="/static/storage.png"
                  description="Quantidade de disco"
                />
                {}
                <AttributeCard
                  title="Preço"
                  value={converterDolarParaReal(
                    instance?.price.value || 0,
                    currency ? +currency.bid : 1,
                    instance?.price.unit || "Hrs"
                  )}
                  icon="/static/money.png"
                  description="Preço da instância"
                />
              </SimpleGrid>
            </Flex>
          </>

          <Text
            fontSize={["1xl", "2xl"]}
            fontWeight="bold"
            color="blue.500"
            mt={16}
          >
            Tópicos
          </Text>

          <Accordion
            defaultIndex={[0]}
            allowMultiple
            w="100%"
            bgColor="white"
            mt={8}
            boxShadow="lg"
            borderRadius="md"
          >
            {/* Detalhes Máquina */}
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize={["1xl", "2xl"]}
                    fontWeight="bold"
                    color="blue.500"
                  >
                    Detalhes Máquina
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <TableContainer w="100%" boxShadow="lg" borderRadius="md">
                  <Table variant="simple">
                    <Thead bgColor="gray.200">
                      <Tr>
                        <Th>Atributo</Th>
                        <Th>Valor</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {details.map((item, index) => {
                        //if title !== price, id, ram, disk, internal_network_speed, external_network_speed
                        if (
                          item.title !== "price" &&
                          item.title !== "id" &&
                          item.title !== "ram" &&
                          item.title !== "disk" &&
                          item.title !== "internal_network_speed" &&
                          item.title !== "external_network_speed"
                        ) {
                          return (
                            <Tr key={index}>
                              <Td>{item.title}</Td>
                              <Td>{item.value || "Não"}</Td>
                            </Tr>
                          );
                        }

                        if (
                          item.title === "ram" ||
                          item.title === "disk" ||
                          item.title === "internal_network_speed" ||
                          item.title === "external_network_speed"
                        ) {
                          return (
                            <Tr key={index}>
                              <Td>{item.title}</Td>
                              <Td>
                                {item.value.value} {item.value.unit}
                              </Td>
                            </Tr>
                          );
                        }
                      })}
                    </Tbody>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>

          <Button
            size="lg"
            mt={16}
            colorScheme="blue"
            onClick={() => router.push("/painel_de_busca")}
          >
            Painel de busca
          </Button>
          <Button size="lg" mt={4} onClick={() => router.push("/")}>
            Voltar
          </Button>
        </Flex>
      </Box>
    </>
  );
}

interface AttributeCardProps {
  title: string;
  value: string;
  icon: string;
  description: string;
}

const AttributeCard = ({
  title,
  value,
  icon,
  description,
}: AttributeCardProps) => {
  return (
    <Card
      p={4}
      display={"flex"}
      flexDirection={"column"}
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <Text
        fontSize={"2xl"}
        fontWeight="bold"
        color="blue.500"
        textAlign="center"
      >
        {title}
      </Text>
      <Text fontSize={"md"} fontWeight="bold" color="gray.500">
        {description}
      </Text>

      <HStack justify="space-between" w="100%" mt={8}>
        <Text fontSize={"2xl"} fontWeight="bold" textAlign="center" mt={2}>
          {value}
        </Text>
        <Image src={icon} alt="CPU" boxSize="30px" />
      </HStack>
    </Card>
  );
};
