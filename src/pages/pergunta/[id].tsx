import PageContainer from "@/components/pageContainer";
import { useQuestions } from "@/contexts/questionsContext";
import { Option, questions } from "@/values/questions";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
  Flex,
  Image,
  Box,
  Stack,
  useBreakpointValue,
  Text,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";

import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const id = router.query.id as string;
  const question = questions.find((question) => String(question.id) === id);

  const { addQuestionAnswer, setQuestions } = useQuestions();

  const handleSelectOption = (option: Option) => {
    if (!question) return;

    addQuestionAnswer(question, option);

    if (question.isLast) return router.push("/resultado");

    router.push(`/pergunta/${option.nextQuestionId}`);
  };

  return (
    <>
      <PageContainer
        side={question ? question.side : "left"}
        image={question ? question.image : ""}
      >
        <Flex direction="column">
          <Text align="center" fontSize={["2xl", "4xl"]} maxW={500}>
            {question?.title}
          </Text>

          {question?.options.map((option) => (
            <>
              <Button
                key={option.id}
                colorScheme="blue"
                size="lg"
                mt={4}
                onClick={() => handleSelectOption(option)}
                maxW={500}
              >
                {option.title}
              </Button>
              <Text
                textAlign="left"
                fontSize={"1xl"}
                maxW={500}
                mt={2}
                color={"gray.500"}
              >
                <Text as="span" fontWeight="bold">
                  Explicação:{" "}
                </Text>
                {option.description}
              </Text>
            </>
          ))}

          <Button
            size="lg"
            mt={4}
            onClick={() => {
              router.push("/");
              setQuestions([]);
            }}
            data-testid="back-button"
          >
            Voltar
          </Button>
        </Flex>
        {question?.aditionalInfo && (
          <Text
            align="center"
            fontSize={"1xl"}
            maxW={500}
            mt={4}
            color="gray.500"
          >
            {question.aditionalInfo}
          </Text>
        )}
      </PageContainer>
    </>
  );
}
