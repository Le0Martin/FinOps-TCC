export interface Question {
  id: number;
  title: string;
  side: "left" | "right";
  options: Option[];
  image: string;
  isLast?: boolean;
  aditionalInfo?: string;
}

export interface Option {
  id: number;
  title: string;
  value: string;
  nextQuestionId: number;
  description?: string;
  type?:
    | "economic"
    | "balanced"
    | "scale-out"
    | "compute-intensive"
    | "memory-intensive"
    | "high-performance-computing";
}

export const questions: Question[] = [
  {
    id: 1,
    title: "Qual o serviço deseja buscar?",
    side: "left",
    image:
      "https://images.unsplash.com/photo-1504253163759-c23fccaebb55?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    options: [
      {
        id: 1,
        title: "Computação em nuvem",
        description: "Serviços de computação em nuvem",
        value: "storage",
        nextQuestionId: 2,
      },
    ],
    aditionalInfo: "Em breve teremos mais opções de serviços!",
  },
  {
    id: 2,
    title: "Qual o tipo de carga de trabalho?",
    side: "left",
    image:
      "https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=794&q=80",
    options: [
      {
        id: 1,
        title: "Uso Geral",
        value: "uso-geral",
        description:
          "Máquinas de uso geral com melhor custo benefício para diversar cargas de trabalho",
        nextQuestionId: 3,
      },
      {
        id: 2,
        title: "Trabalho Otimizado",
        value: "trabalho-otimizado",
        description:
          "Máquinas otimizadas para cargas de trabalho com uso intenso de computação",
        nextQuestionId: 4,
      },
    ],
  },
  {
    id: 3,
    title: "Qual perfil de uso?",
    side: "left",
    isLast: true,
    image:
      "https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=794&q=80",
    options: [
      {
        id: 1,
        title: "Econômico",
        value: "economico",
        type: "economic",
        description: "Computação diária a um custo menor",
        nextQuestionId: 5,
      },
      {
        id: 2,
        title: "Equilibrado",
        value: "equilibrado",
        type: "balanced",
        description:
          "Desempenho e preço equilibrados em diversos tipos de máquinas",
        nextQuestionId: 6,
      },
      {
        id: 3,
        title: "Escalonamento horizontal otimizado",
        value: "escalonamento",
        type: "scale-out",
        description:
          "Melhor desempenho/custo para cargas de trabalho de escalonamento horizontal",
        nextQuestionId: 7,
      },
    ],
  },
  {
    id: 4,
    title: "Qual perfil de uso?",
    side: "left",
    isLast: true,
    image:
      "https://images.unsplash.com/photo-1570126618953-d437176e8c79?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=794&q=80",
    options: [
      {
        id: 1,
        title: "Otimização de memória",
        value: "memoria",
        type: "memory-intensive",
        description: "Cargas de trabalho com memória ultraelevada",
        nextQuestionId: 5,
      },
      {
        id: 2,
        title: "Otimizado para computação",
        value: "computacao",
        type: "compute-intensive",
        description:
          "Desempenho ultra-alto para cargas de trabalho com uso intensivo de computação",
        nextQuestionId: 6,
      },
      {
        id: 3,
        title: "Otimização de acelerador",
        value: "acelerador",
        type: "high-performance-computing",
        description:
          "Otimizado para cargas de trabalho de computação de alto desempenho",
        nextQuestionId: 7,
      },
    ],
  },
];
