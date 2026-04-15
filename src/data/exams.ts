export type Exam = {
  slug: string;
  name: string;
  shortName: string;
  category: string;
  price: number;
  oldPrice?: number;
  productionTime: string;
  instructions: string[];
  features: string[];
  includes: string[];
  description: string;
  image: string;
  popular: boolean;
  badge?: string;
};

export const EXAMS: Exam[] = [
  {
    slug: "checkup-completo",
    name: "Check-up Completo",
    shortName: "Check-up",
    category: "Preventivo",
    price: 189.9,
    oldPrice: 249.9,
    productionTime: "24h",
    instructions: [
      "Jejum de 8 a 12 horas antes da coleta",
      "Evitar exercícios físicos intensos 24h antes",
      "Não consumir bebidas alcoólicas 72h antes",
      "Manter medicações habituais (informar ao coletador)",
    ],
    features: [
      "Avaliação metabólica completa",
      "Perfil lipídico e glicêmico",
      "Função renal e hepática",
      "Avaliação tireoidiana",
    ],
    includes: [
      "Hemograma Completo",
      "Glicemia de Jejum",
      "Colesterol Total e Frações",
      "Triglicerídeos",
      "Uréia e Creatinina",
      "TGO / TGP",
      "TSH",
      "T4 Livre",
      "Ácido Úrico",
      "Urina Tipo I",
    ],
    description:
      "O pacote de check-up mais completo para acompanhamento preventivo da sua saúde. Ideal para quem deseja uma visão geral do seu estado de saúde com preço acessível.",
    image: "/images/banner-checkup.png",
    popular: true,
    badge: "Mais Vendido",
  },
  {
    slug: "toxicologico",
    name: "Exame Toxicológico",
    shortName: "Toxicológico",
    category: "CNH / Motoristas",
    price: 250.0,
    productionTime: "5 a 10 dias úteis",
    instructions: [
      "Não é necessário jejum",
      "A amostra coletada é de cabelo ou pelo corporal",
      "O cabelo deve ter no mínimo 3cm de comprimento",
      "Não utilizar tinturas ou alisantes 30 dias antes (ideal)",
    ],
    features: [
      "Exigido pelo DETRAN para CNH categorias C, D e E",
      "Janela de detecção de até 180 dias (6 meses)",
      "Análise de substâncias psicoativas",
      "Resultado com validade nacional",
    ],
    includes: [
      "Anfetaminas e Metanfetaminas",
      "Cocaína e derivados",
      "Maconha (THC)",
      "Opiáceos",
      "Fenciclidina (PCP)",
    ],
    description:
      "Exame toxicológico obrigatório para emissão, adição e renovação da CNH nas categorias C, D e E. Coleta rápida e resultado com validade nacional.",
    image: "/images/banner-toxicologico.png",
    popular: true,
    badge: "Obrigatório CNH",
  },
  {
    slug: "painel-hormonal",
    name: "Painel Hormonal e Vitamínico",
    shortName: "Hormonal",
    category: "Especializado",
    price: 320.0,
    oldPrice: 420.0,
    productionTime: "48 a 72h",
    instructions: [
      "Jejum de 4 horas antes da coleta",
      "Realizar coleta preferencialmente pela manhã (até 10h)",
      "Mulheres: informar data da última menstruação",
      "Informar uso de suplementos vitamínicos",
    ],
    features: [
      "Avaliação hormonal completa",
      "Perfil vitamínico essencial",
      "Detecção de deficiências nutricionais",
      "Indicado para cansaço, queda de cabelo e variações de humor",
    ],
    includes: [
      "Vitamina D (25-OH)",
      "Vitamina B12",
      "Ferro Sérico",
      "Ferritina",
      "Testosterona Total",
      "Estradiol",
      "Cortisol",
      "DHEA-S",
      "Insulina de Jejum",
    ],
    description:
      "Painel completo para investigar desequilíbrios hormonais e deficiências vitamínicas. Ideal para quem sente cansaço, queda de cabelo, alterações de humor ou deseja otimizar sua saúde.",
    image: "/images/banner-hormonal.png",
    popular: true,
    badge: "Premium",
  },
  {
    slug: "hemograma",
    name: "Hemograma Completo",
    shortName: "Hemograma",
    category: "Básico",
    price: 25.0,
    productionTime: "24h",
    instructions: [
      "Jejum de 4 horas (recomendado)",
      "Informar medicações em uso",
    ],
    features: [
      "Contagem de células sanguíneas",
      "Avaliação de anemia e infecções",
    ],
    includes: [
      "Eritrograma",
      "Leucograma",
      "Plaquetograma",
    ],
    description: "Exame básico e essencial para avaliação geral da saúde sanguínea.",
    image: "/images/01-1024x1004.png",
    popular: false,
  },
  {
    slug: "glicemia-jejum",
    name: "Glicemia de Jejum",
    shortName: "Glicemia",
    category: "Básico",
    price: 15.0,
    productionTime: "24h",
    instructions: [
      "Jejum de 8 a 12 horas obrigatório",
      "Pode ingerir água",
    ],
    features: [
      "Avaliação do nível de açúcar no sangue",
      "Triagem para diabetes",
    ],
    includes: ["Dosagem de Glicose"],
    description: "Exame fundamental para rastreamento e acompanhamento do diabetes.",
    image: "/images/02-1024x1004.png",
    popular: false,
  },
  {
    slug: "perfil-lipidico",
    name: "Perfil Lipídico Completo",
    shortName: "Lipídico",
    category: "Cardiovascular",
    price: 45.0,
    productionTime: "24h",
    instructions: [
      "Jejum de 12 horas obrigatório",
      "Evitar alimentos gordurosos 24h antes",
      "Não consumir álcool 72h antes",
    ],
    features: [
      "Avaliação completa do colesterol",
      "Risco cardiovascular",
    ],
    includes: [
      "Colesterol Total",
      "HDL",
      "LDL",
      "VLDL",
      "Triglicerídeos",
    ],
    description: "Avaliação completa dos níveis de gordura no sangue para prevenção cardiovascular.",
    image: "/images/04-1024x1001.png",
    popular: false,
  },
];

export const FEATURED_EXAMS = EXAMS.filter((e) => e.popular);

export function getExamBySlug(slug: string): Exam | undefined {
  return EXAMS.find((e) => e.slug === slug);
}

export function formatPrice(price: number): string {
  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
