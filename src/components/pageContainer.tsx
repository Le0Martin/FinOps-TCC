import { ReactNode } from "react";

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

interface PageContainerProps {
  children: ReactNode;
  side: "left" | "right";
  image: string;
}

export default function PageContainer({
  children,
  side,
  image,
}: PageContainerProps) {
  const isCellphone = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (side === "left") {
    return (
      <Flex as="main" w="100vw" h="100vh">
        {!isCellphone && (
          <Image
            src={image}
            alt="Imagem de fundo"
            w="100%"
            h="100%"
            objectFit="cover"
            flex={1}
            maxW="50vw"
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
          {children}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex as="main" w="100vw" h="100vh">
      <Flex
        flex={1}
        align="center"
        justify="center"
        p={8}
        direction="column"
        gap={8}
      >
        {children}
      </Flex>
      {!isCellphone && (
        <Image
          src={image}
          alt="Imagem de fundo"
          w="100%"
          h="100%"
          objectFit="cover"
          flex={1}
          maxW="50vw"
        />
      )}
    </Flex>
  );
}
