import Authors from "@/components/Table";
import {
  Box,
  Card,
  Text,
  Input,
  FormControl,
  FormLabel,
  Flex,
  Select,
  Button,
  Skeleton,
  IconButton,
} from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { GetQueriesResponse, Sku, getQueries, getSkus } from "@/services/sku";

import ResponsivePagination from "react-responsive-pagination";

import { ItemMenu } from "@/components/ItemMeny";
import { MdFilterAltOff } from "react-icons/md";

export default function PainelDeBusca() {
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  const [name, setName] = useState<string>("");
  const [preco, setPreco] = useState([0, 5]);

  const [cpu, setCpu] = useState([0, 30]);
  const [activateCpu, setActivateCpu] = useState<boolean>(false);

  const [ram, setRam] = useState([0, 30]);
  const [activateRam, setActivateRam] = useState<boolean>(false);

  const [gpu, setGpu] = useState([0, 30]);
  const [activateGpu, setActivateGpu] = useState<boolean>(false);

  const [discoRigido, setDiscoRigido] = useState([0, 257]);
  const [activateDiscoRigido, setActivateDiscoRigido] =
    useState<boolean>(false);

  const [larguraDeBanda, setLarguraDeBanda] = useState([0, 30]);
  const [activateLarguraDeBanda, setActivateLarguraDeBanda] =
    useState<boolean>(false);

  const [skuProvider, setSkuProvider] = useState<string>("");

  const [skusList, setSkusList] = useState<Sku[]>([]);

  const [minMaxQuery, setMinMaxQuery] = useState<GetQueriesResponse | null>(
    null
  );

  const [loadingQueries, setLoadingQueries] = useState<boolean>(false);

  const router = useRouter();

  useEffect(() => {
    handleSearch();
    handleGetQueryMinMax();
  }, []);

  const handleGetQueryMinMax = async () => {
    try {
      setLoadingQueries(true);
      const response = await getQueries();
      setMinMaxQuery(response.data);
    } catch (error) {
    } finally {
      setLoadingQueries(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timeout);
  }, [
    skuProvider,
    ram,
    cpu,
    gpu,
    discoRigido,
    preco,
    larguraDeBanda,
    name,
    page,
  ]);

  const nameQuery = `"name": {"$regex": "${name}", "$options": "i"}`;

  const ramQuery = `"ram.value": {"$gte": ${ram[0]}, "$lte": ${ram[1]}}`;
  const cpuQuery = `"cpu": {"$gte": ${cpu[0]}, "$lte": ${cpu[1]}}`;
  const gpuQuery = `"gpu": {"$gte": ${gpu[0]}, "$lte": ${gpu[1]}}`;
  const discoRigidoQuery = `
    "disk.value": {
      "$gte": ${discoRigido[0]}, 
      "$lte": ${discoRigido[1]}
    }
  `;

  const larguraDeBandaQuery = `
    "external_network_speed.value": {
      "$gte": ${larguraDeBanda[0]}, 
      "$lte": ${larguraDeBanda[1]}
    }
  `;

  const skuProviderQuery = skuProvider
    ? `,"company": {"$in": ["${skuProvider}"]}`
    : "";

  const priceQuery = `"price.value" : {
    "$gte": ${preco[0]},
    "$lte": ${preco[1]}
  }`;

  const getQuery = () => {
    let query = `{${nameQuery}`;

    if (activateCpu) {
      query += `,${cpuQuery}`;
    }

    if (activateRam) {
      query += `,${ramQuery}`;
    }

    if (activateGpu) {
      query += `,${gpuQuery}`;
    }

    if (activateDiscoRigido) {
      query += `,${discoRigidoQuery}`;
    }

    if (activateLarguraDeBanda) {
      query += `,${larguraDeBandaQuery}`;
    }

    query += `${skuProviderQuery}}`;

    return query;
  };

  const handleSearch = async () => {
    try {
      const response = await getSkus({
        query: getQuery(),
        page: page - 1,
        per_page: itemsPerPage,
      });

      setSkusList(response.data.skus);
      setTotalItems(response.data.total);
      setTotalPages(Math.ceil(response.data.total / itemsPerPage));
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangePage = (page: number) => {
    setPage(page);
  };

  const handleClearFilters = () => {
    setName("");
    setPreco([0, 5]);
    setCpu([0, 30]);
    setActivateCpu(false);
    setRam([0, 30]);
    setActivateRam(false);
    setGpu([0, 30]);
    setActivateGpu(false);
    setDiscoRigido([0, 257]);
    setActivateDiscoRigido(false);
    setLarguraDeBanda([0, 30]);
    setActivateLarguraDeBanda(false);
    setSkuProvider("");
  };

  const hasFilterActive =
    name ||
    activateCpu ||
    activateRam ||
    activateGpu ||
    activateDiscoRigido ||
    activateLarguraDeBanda ||
    skuProvider;

  return (
    <Box backgroundColor="gray.100">
      <Card w="100%" p={4}>
        <Box>
          <Button
            leftIcon={<ArrowLeftIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={() => router.push("/")}
            data-testid="back-button"
          >
            Voltar
          </Button>
          {/* <Button
            leftIcon={<ArrowLeftIcon />}
            colorScheme="teal"
            variant="solid"
            onClick={handleSearch}
          >
            Busca
          </Button> */}
        </Box>
      </Card>

      <Flex direction="row" w="100%" gap={4} p={4}>
        {loadingQueries ? (
          <>
            <Skeleton height="100vh" w={400} />
          </>
        ) : (
          <Card w={400} p="4" position="relative">
            {hasFilterActive && (
              <IconButton
                aria-label="Filtros"
                icon={<MdFilterAltOff />}
                position="absolute"
                top={2}
                right={2}
                onClick={handleClearFilters}
                colorScheme="red"
              />
            )}
            <Text
              fontSize="2xl"
              fontWeight="bold"
              color={"gray.600"}
              textAlign="center"
              mb={4}
            >
              Filtros
            </Text>

            <Input
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <Box
              w="100%"
              p="4"
              borderWidth="1px"
              borderRadius="lg"
              borderColor={"gray.200"}
              mt={4}
            >
              <FormControl>
                <FormLabel>Provedor</FormLabel>
                <Select
                  value={skuProvider}
                  onChange={(e) => setSkuProvider(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Amazon">AWS</option>
                  <option value="Google">Google Cloud</option>
                  <option value="Microsoft">Azure</option>
                </Select>
              </FormControl>
            </Box>

            {/* <ItemMenu
            min={0}
            max={10}
            label={"Preço"}
            metric={"R$"}
            value={preco}
            setValue={setPreco}
          /> */}

            <ItemMenu
              //arredondar para baixo
              min={minMaxQuery ? Math.floor(minMaxQuery.min_cpu / 10) * 10 : 0}
              max={minMaxQuery?.max_cpu || 0}
              label={"CPU"}
              metric={"unidade"}
              value={cpu}
              setValue={setCpu}
              activated={activateCpu}
              setActivated={setActivateCpu}
            />
            <ItemMenu
              min={minMaxQuery?.min_ram || 0}
              max={minMaxQuery?.max_ram || 0}
              label={"RAM"}
              metric={"GB"}
              value={ram}
              setValue={setRam}
              activated={activateRam}
              setActivated={setActivateRam}
            />
            <ItemMenu
              min={minMaxQuery?.min_gpu || 0}
              max={minMaxQuery?.max_gpu || 0}
              label={"GPU"}
              metric={"unidade"}
              value={gpu}
              setValue={setGpu}
              activated={activateGpu}
              setActivated={setActivateGpu}
            />
            <ItemMenu
              min={minMaxQuery?.min_disk || 0}
              max={minMaxQuery?.max_disk || 0}
              label={"Disco Rígido"}
              metric={"GB"}
              value={discoRigido}
              setValue={setDiscoRigido}
              activated={activateDiscoRigido}
              setActivated={setActivateDiscoRigido}
            />
            <ItemMenu
              min={minMaxQuery?.min_external_network_speed || 0}
              max={minMaxQuery?.max_external_network_speed || 0}
              label={"Largura de Banda"}
              metric={"GB"}
              value={larguraDeBanda}
              setValue={setLarguraDeBanda}
              activated={activateLarguraDeBanda}
              setActivated={setActivateLarguraDeBanda}
            />
          </Card>
        )}
        <Box flex={1}>
          <Card p="4">
            <ResponsivePagination
              current={page}
              total={totalPages}
              onPageChange={handleChangePage}
            />

            <Box h={4} />

            <Authors
              title={"Tabela de SKU's"}
              captions={[
                "SKU",
                "GPU (unidade)",
                "CPU (unidade)",
                "RAM ",
                "Disco Rígido ",
                "Largura de Banda ",
                "Preço",
              ]}
              data={skusList}
              total={totalItems}
            />
          </Card>
        </Box>
      </Flex>
    </Box>
  );
}
