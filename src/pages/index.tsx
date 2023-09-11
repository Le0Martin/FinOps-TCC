import { useQuestions } from "@/contexts/questionsContext";
import { holoriGet } from "@/services/holori";
import { ArrowForwardIcon, QuestionIcon } from "@chakra-ui/icons";
import {
  Flex,
  Image,
  Box,
  Stack,
  useBreakpointValue,
  Text,
  Button,
  Tooltip,
  UnorderedList,
  ListItem,
  OrderedList,
  IconButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import Head from "next/head";

import { useRouter } from "next/router";
import { useState } from "react";

export default function Home() {
  const isCellphone = useBreakpointValue({
    base: true,
    lg: false,
  });

  const router = useRouter();

  const [showHelp, setShowHelp] = useState(false);
  const { setQuestions } = useQuestions();

  return (
    <>
      <main>
        <Flex as="section" w="100vw" h="100vh">
          {!isCellphone && (
            <Image
              src="https://images.unsplash.com/photo-1587302912306-cf1ed9c33146?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=680&q=80"
              alt="Imagem de fundo"
              w="100%"
              h="100%"
              objectFit="cover"
              flex={1}
            />
          )}
          <Flex
            flex={1}
            align="center"
            justify="center"
            p={8}
            direction="column"
            gap={8}
          >
            <Box maxW="400px">
              <Text align="center" fontSize={["2xl", "4xl"]}>
                Bem-vindo ao{" "}
                <Text as="span" fontWeight="bold">
                  CloudFind{" "}
                </Text>
              </Text>
              <Text
                align="center"
                fontSize={["sm", "xl"]}
                mt={2}
                color="gray.500"
              >
                Aqui você vai encontrar o serviço de nuvem ideal para você
              </Text>
            </Box>

            <Stack spacing={4} alignItems="center" w="50%">
              <Button
                rightIcon={<ArrowForwardIcon />}
                colorScheme="teal"
                variant="solid"
                onClick={() => {
                  router.push("/pergunta/1");
                  setQuestions([]);
                }}
                w="100%"
                data-testid="start-button"
              >
                Começar Agora
              </Button>

              <Button
                onClick={() => router.push("/painel_de_busca")}
                w="100%"
                data-testid="search-button"
              >
                Painel de busca
              </Button>

              <Tooltip label="Ajuda" aria-label="Ajuda">
                <IconButton
                  aria-label="Help"
                  icon={<QuestionIcon />}
                  onClick={() => setShowHelp(!showHelp)}
                  data-testid="help-button"
                />
              </Tooltip>
            </Stack>
          </Flex>
        </Flex>
      </main>

      <Modal
        blockScrollOnMount={false}
        isOpen={showHelp}
        onClose={() => {
          setShowHelp(false);
        }}
        size="5xl"
      >
        <ModalOverlay data-testid="help-modal" />
        <ModalContent>
          <ModalHeader>Ajuda</ModalHeader>
          <ModalCloseButton
            data-testid="help-modal-close"
            onClick={() => {
              setShowHelp(false);
            }}
          />
          <ModalBody p={8}>
            <Text>
              Bem-vindo ao Cloudfind, a ferramenta que irá ajudá-lo a encontrar
              a melhor máquina virtual com o melhor custo-benefício para suas
              necessidades na nuvem.
            </Text>
            <br />

            <Text>
              Aqui, você pode iniciar uma série de perguntas para receber
              recomendações personalizadas ou usar o filtro para explorar as
              máquinas disponíveis de acordo com suas preferências. Veja abaixo
              como utilizar cada opção:
            </Text>
            <br />
            <OrderedList>
              <ListItem>
                <Text fontWeight="bold">Iniciar a Série de Perguntas:</Text>
                <UnorderedList>
                  <ListItem>
                    Clique no botão "Começar agora" para começar a série de
                    perguntas.
                  </ListItem>
                  <ListItem>
                    Serão apresentadas perguntas relevantes sobre suas
                    necessidades de computação em nuvem.
                  </ListItem>
                  <ListItem>
                    Responda cada pergunta de acordo com suas preferências e
                    requisitos.
                  </ListItem>
                  <ListItem>
                    Ao finalizar a série de perguntas, você receberá uma
                    recomendação personalizada da máquina virtual com o melhor
                    custo-benefício, ideal para suas necessidades.
                  </ListItem>
                </UnorderedList>
              </ListItem>
              <br />

              <ListItem>
                <Text fontWeight="bold">Filtrar Máquinas Virtuais:</Text>
                <UnorderedList>
                  <ListItem>
                    Clique no botão "Painel de Busca" para acessar as opções de
                    filtragem.
                  </ListItem>
                  <ListItem>
                    Use os filtros disponíveis para refinar a busca das máquinas
                    virtuais.
                  </ListItem>
                  <ListItem>
                    Você pode filtrar por características como tipo de máquina,
                    capacidade de processamento, memória, armazenamento e
                    outros.
                  </ListItem>
                  <ListItem>
                    Aplique os filtros desejados para encontrar as máquinas
                    virtuais que correspondam às suas preferências e
                    necessidades.
                  </ListItem>
                  <ListItem>
                    Explore os detalhes de cada máquina virtual para obter
                    informações mais específicas.
                  </ListItem>
                </UnorderedList>
              </ListItem>
            </OrderedList>
            <br />

            <Text>
              O CloudFind está aqui para simplificar sua busca por máquinas
              virtuais na nuvem, ajudando você a tomar decisões informadas com
              base em suas necessidades. Seja através da série de perguntas
              personalizadas ou do filtro flexível, você encontrará a máquina
              virtual mais adequada para suas demandas de computação em nuvem.
              Aproveite a jornada!
            </Text>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
