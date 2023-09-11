import PageContainer from "@/components/pageContainer";
import { useCurrency } from "@/contexts/currencyContext";
import { useQuestions } from "@/contexts/questionsContext";
import { getSku, getSkus } from "@/services/sku";
import { converterDolarParaReal } from "@/utils/currencyFormatter";
import { infos } from "@/values/infos";
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
  Link,
  Spinner,
  Center,
} from "@chakra-ui/react";
import Head from "next/head";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ResponsivePagination from "react-responsive-pagination";

export default function Home() {
  const router = useRouter();
  const [resultSku, setResultSku] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [similarInstances, setSimilarInstances] = useState<any[]>([]);
  const [details, setDetails] = useState<any[]>([]);

  const { currency } = useCurrency();
  const { questions, setQuestions } = useQuestions();

  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const tips = infos.find(
    (info) =>
      info.id === questions[2]?.id && info.option === questions[2]?.answer.id
  ) || {
    info: "",
    tips: [],
  };

  useEffect(() => {
    if (questions.length > 0) getResult();
    else router.push("/");
  }, [questions]);

  useEffect(() => {
    getResult();
  }, [page]);

  const getResult = async () => {
    const resultResponse = questions.find((q) => q.isLast);
    if (resultResponse) {
      try {
        setLoading(true);
        const response = await getSkus({
          query: `{"type": "${resultResponse.answer.type}"}`,
          page: page - 1,
          per_page: itemsPerPage,
        });

        const instanceDetails = Object.entries(response.data.skus[0]).map(
          ([key, value]) => {
            return { title: key, value: value };
          }
        );

        setDetails(instanceDetails);
        if (page === 1) setResultSku(response.data.skus[0]);
        setTotalItems(response.data.total);
        const totalPages = Math.ceil(response.data.total / itemsPerPage);
        setTotalPages(totalPages);
        setSimilarInstances(response.data.skus.slice(1));
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

  // questions[-1].id + questions[-1].answer.id

  //type: "economic", "balanced", "scale-out", "compute-intensive", "memory-intensive", "high-performance-computing"

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
          minH={"100vh"}
        >
          {/* Resultado */}
          <>
            <Text fontSize={["2xl", "4xl"]} fontWeight="bold">
              Resultado
            </Text>

            {loading ? (
              <Center mt={8}>
                <Spinner size="xl" color="blue.500" />
              </Center>
            ) : resultSku ? (
              <Flex direction="column" align="center" p={4} w="100%" mt={8}>
                <Image
                  src={"/static/" + resultSku.company + ".png"}
                  alt={resultSku.company}
                  height="100px"
                />

                <Text
                  fontSize={["2xl", "4xl"]}
                  fontWeight="bold"
                  color="blue.500"
                  textAlign="center"
                  mt={4}
                >
                  {resultSku.name}
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
                    value={resultSku.cpu}
                    icon="/static/cpu.png"
                    description="Número de CPUs"
                  />
                  <AttributeCard
                    title="Memória"
                    value={resultSku.ram.value + " " + resultSku.ram.unit}
                    icon="/static/ram.png"
                    description="Quantidade de memória"
                  />
                  <AttributeCard
                    title="Disco"
                    value={
                      resultSku.cloudStoreOnly
                        ? "EBS Only"
                        : resultSku.disk.value + " " + resultSku.disk.unit
                    }
                    icon="/static/storage.png"
                    description="Quantidade de disco"
                  />
                  <AttributeCard
                    title="Preço"
                    value={converterDolarParaReal(
                      resultSku.price.value || 0,
                      currency ? +currency.bid : 1,
                      resultSku.price.unit || "Hrs"
                    )}
                    icon="/static/money.png"
                    description=""
                  />
                </SimpleGrid>
              </Flex>
            ) : (
              <Center mt={8}>
                <Text fontSize={["2xl", "2xl"]}>
                  Nenhuma Instância desse tipo encontrada!
                </Text>
              </Center>
            )}
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

            {/* Instâncias similares */}
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
                    Instâncias similares
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <ResponsivePagination
                  current={page}
                  total={totalPages}
                  onPageChange={(page: number) => setPage(page)}
                />
                <TableContainer
                  w="100%"
                  boxShadow="lg"
                  borderRadius="md"
                  mt={4}
                >
                  <Table variant="simple">
                    <Thead bgColor="gray.200">
                      <Tr>
                        <Th>Empresa</Th>
                        <Th>Máquina</Th>
                        <Th>Valor</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {similarInstances.map((item: any, index: number) => (
                        <Tr key={index}>
                          <Td>{item.company}</Td>
                          <Td>
                            <Link href={`/instance/${item.id}`}>
                              {item.name}
                            </Link>
                          </Td>
                          <Td>
                            {converterDolarParaReal(
                              item.price.value || 0,
                              currency ? +currency.bid : 1,
                              item.price.unit || "Hrs"
                            )}
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TableContainer>
              </AccordionPanel>
            </AccordionItem>

            {/* Perguntas/Respostas */}
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
                    Perguntas/Respostas
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <SimpleGrid minChildWidth="160px" spacing={4} w="100%">
                  {questions.map((question) => (
                    <Card
                      key={question.id}
                      p={4}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <Text
                        fontSize={"1xl"}
                        fontWeight="bold"
                        color="blue.500"
                        textAlign="center"
                      >
                        {question.title}
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="gray.500"
                        textAlign="center"
                        mt={2}
                      >
                        {question.answer.title}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
              </AccordionPanel>
            </AccordionItem>

            {/* Informações */}
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
                    Informações
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <Text fontSize={"1xl"} color="gray.600">
                  {tips.info}
                </Text>
                <SimpleGrid minChildWidth="320px" spacing={4} w="100%" mt={4}>
                  {tips.tips?.map((tip, index) => (
                    <Card
                      key={index}
                      p={4}
                      border="1px"
                      borderColor="gray.200"
                      borderRadius="md"
                    >
                      <Text
                        fontSize={"1xl"}
                        fontWeight="bold"
                        color="blue.500"
                        textAlign="center"
                      >
                        {tip.title}
                      </Text>
                      <Text
                        fontSize={"medium"}
                        color="gray.500"
                        textAlign="justify"
                        mt={2}
                      >
                        {tip.description}
                      </Text>
                    </Card>
                  ))}
                </SimpleGrid>
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
          <Button
            size="lg"
            mt={4}
            onClick={() => {
              router.push("/");
              setQuestions([]);
            }}
          >
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
