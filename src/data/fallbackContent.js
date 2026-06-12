export const siteAssets = {
  logoPrimary:
    "https://res.cloudinary.com/dm9mnc97u/image/upload/v1781279524/Untitled_design_17_1_x7qbdx.webp",
  logoFallback:
    "https://res.cloudinary.com/dm9mnc97u/image/upload/v1777674863/FLA_7_1_kkc5qi.png",
  introVideo:
    "https://res.cloudinary.com/dm9mnc97u/video/upload/v1780677944/WhatsApp-Video-2026-06-05-at-13.40.33_xxhh84.webm",
  informativeVideo:
    "https://res.cloudinary.com/dm9mnc97u/video/upload/v1777677171/download_wq1ltu.mp4"
};

export const heroNewsItems = [
  {
    id: "hero-medula-sem-medo",
    title: "Medula sem medo: informacao certa muda a decisao de quem quer ajudar.",
    excerpt:
      "A rede existe para reduzir medo, corrigir desinformacao e aproximar mais pessoas de um cadastro consciente.",
    category: "educacao",
    tag_emoji: "🧬",
    image_url: siteAssets.logoPrimary,
    cta_label: "Entender agora",
    cta_url: "#medula-sem-medo",
    published: true,
    order: 1,
    featured: true
  },
  {
    id: "hero-doador",
    title: "Quem quer doar precisa de orientacao simples, humana e acionavel.",
    excerpt:
      "O mini app da FlaMedula organiza interesses, aproxima campanhas e ajuda a mapear disponibilidade real.",
    category: "cadastro",
    tag_emoji: "🩸",
    image_url: siteAssets.logoPrimary,
    cta_label: "Quero me cadastrar",
    cta_url: "#cadastro",
    published: true,
    order: 2,
    featured: true
  },
  {
    id: "hero-paciente",
    title: "Um caso precisa de alcance, cuidado e contexto antes de mobilizar uma rede.",
    excerpt:
      "A landing recebe casos, organiza informacoes essenciais e prepara a base para o fluxo com a equipe.",
    category: "acolhimento",
    tag_emoji: "💙",
    image_url: siteAssets.logoPrimary,
    cta_label: "Cadastrar um caso",
    cta_url: "#cadastro",
    published: true,
    order: 3,
    featured: false
  },
  {
    id: "hero-acoes",
    title: "Campanhas mais fortes nascem de dados organizados, narrativa clara e gente mobilizada.",
    excerpt:
      "Acoes, depoimentos e metricas ja nascem prontas para evoluir com painel ADM no futuro.",
    category: "rede",
    tag_emoji: "📣",
    image_url: siteAssets.logoPrimary,
    cta_label: "Ver acoes",
    cta_url: "#acoes",
    published: true,
    order: 4,
    featured: false
  }
];

export const actionItems = [
  {
    id: "acao-mutirao-redome",
    title: "Mutirao de cadastro e orientacao em parceria com hemocentro regional",
    excerpt:
      "A equipe reuniu acolhimento, educacao e orientacao sobre medula para ampliar a base acionavel da rede.",
    date: "2026-03-12",
    location: "Hemocentro Regional",
    category: "mobilizacao",
    image_url: siteAssets.logoPrimary,
    cta_label: "Entender a acao",
    cta_url: "#cadastro",
    published: true,
    order: 1
  },
  {
    id: "acao-plaquetas-joao",
    title: "Mobilizacao por plaquetas com meta atingida em menos de 48 horas",
    excerpt:
      "O caso mostrou como informacao organizada acelera divulgacao, presenca e resposta da comunidade.",
    date: "2026-04-05",
    location: "Hospital de Base",
    category: "apoio-a-caso",
    image_url: siteAssets.logoFallback,
    cta_label: "Ver contexto",
    cta_url: "#depoimentos",
    published: true,
    order: 2
  },
  {
    id: "acao-dia-d",
    title: "Dia D FlaMedula para conscientizacao sobre doacao de medula",
    excerpt:
      "Um encontro pensado para explicar a causa, orientar novos interessados e fortalecer futuras campanhas.",
    date: "2026-07-20",
    location: "Sede da rede",
    category: "evento",
    image_url: siteAssets.logoPrimary,
    cta_label: "Acompanhar a agenda",
    cta_url: "#apoie",
    published: true,
    order: 3
  }
];

export const testimonials = [
  {
    id: "testimonial-carlos",
    name: "Carlos Silva",
    relation: "Doador convocado",
    quote:
      "A orientacao da FlaMedula tirou meu medo. Quando o REDOME ligou, eu ja entendia o processo e estava pronto para seguir.",
    avatar_url: siteAssets.logoPrimary,
    published: true,
    order: 1
  },
  {
    id: "testimonial-familia-costa",
    name: "Familia Costa",
    relation: "Caso acolhido",
    quote:
      "No momento mais dificil, a rede ajudou a organizar informacao, cuidado e mobilizacao sem transformar nossa historia em ruido.",
    avatar_url: siteAssets.logoFallback,
    published: true,
    order: 2
  },
  {
    id: "testimonial-dra-mariana",
    name: "Dra. Mariana",
    relation: "Hematologista",
    quote:
      "Desmistificar a doacao de medula e orientar com responsabilidade e essencial para gerar cadastros realmente conscientes.",
    avatar_url: siteAssets.logoPrimary,
    published: true,
    order: 3
  }
];

export const teamMembers = [
  {
    id: "team-andre",
    name: "Andre Matos “Dedeco”",
    role: "Fundador e diretor geral",
    description:
      "Conecta a causa com narrativa, presenca e mobilizacao pratica para transformar solidariedade em rede organizada.",
    image_url: siteAssets.logoPrimary,
    published: true,
    order: 1
  },
  {
    id: "team-danielli",
    name: "Danielli Oliveira",
    role: "Parceira tecnica",
    description:
      "Ajuda a sustentar a comunicacao responsavel sobre medula, orientacao segura e coerencia institucional da causa.",
    image_url: siteAssets.logoFallback,
    published: true,
    order: 2
  },
  {
    id: "team-elaine",
    name: "Elaine Reixach",
    role: "Coordenacao de acoes",
    description:
      "Organiza campanhas, presenca em campo e relacionamento entre mobilizacao, familias e pontos de apoio.",
    image_url: siteAssets.logoPrimary,
    published: true,
    order: 3
  },
  {
    id: "team-maiko",
    name: "Tio Maiko Castro",
    role: "Apoio e acolhimento",
    description:
      "Leva presenca humana e suporte para familias, criancas e casas de apoio nos momentos mais sensiveis.",
    image_url: siteAssets.logoFallback,
    published: true,
    order: 4
  }
];

export const ambassadors = [
  {
    id: "amb-zico",
    name: "Zico",
    role: "Embaixador oficial",
    description:
      "Amplia o alcance da causa e convoca a Nacao a olhar para a doacao de medula com presenca, afeto e responsabilidade.",
    image_url: siteAssets.logoPrimary,
    published: true,
    order: 1
  },
  {
    id: "amb-tania",
    name: "Tania Bastos",
    role: "Madrinha institucional",
    description:
      "Fortalece a visibilidade publica da FlaMedula e ajuda a manter a causa conectada com relevancia institucional.",
    image_url: siteAssets.logoFallback,
    published: true,
    order: 2
  }
];

export const transparencyData = {
  doadores_cadastrados: 328,
  possiveis_doadores_medula: 146,
  ja_cadastrados_redome: 89,
  casos_recebidos: 24,
  meta_mensal: 500,
  progresso_mensal: 328,
  crescimento_semanal: [62, 81, 94, 91],
  last_updated: "12/06/2026",
  source_label: "Dados demonstrativos do prototipo"
};

export const faqItems = [
  {
    id: "faq-coluna",
    question: "Doar medula e sempre pela coluna?",
    answer:
      "Nao. Medula ossea nao e medula espinhal. A coleta pode acontecer por aferese pelo sangue periferico ou por puncao da medula ossea. A definicao e sempre medica."
  },
  {
    id: "faq-redome",
    question: "A FlaMedula substitui o REDOME?",
    answer:
      "Nao. A FlaMedula orienta e mobiliza. O cadastro oficial, a triagem e todo o processo clinico seguem sob responsabilidade do REDOME, hemocentros e canais oficiais de saude."
  },
  {
    id: "faq-atualizar",
    question: "Por que atualizar meus dados no REDOME importa?",
    answer:
      "Porque telefone, e-mail ou endereco desatualizados podem impedir que voce seja encontrado quando surgir uma possivel compatibilidade."
  },
  {
    id: "faq-paciente",
    question: "Como funciona o cadastro de um caso de paciente?",
    answer:
      "O mini app organiza as informacoes iniciais para que a equipe entenda o contexto, avalie a necessidade e identifique como a rede pode ajudar com responsabilidade."
  }
];

export const rollerItems = {
  authority: [
    "Informacao segura",
    "Mobilizacao responsavel",
    "Cadastro consciente",
    "Atualizacao REDOME",
    "Acolhimento de casos",
    "Rede mais pronta"
  ],
  support: [
    "Dados organizados",
    "Campanhas mais fortes",
    "Equipe preparada",
    "Tecnologia com proposito",
    "Mais alcance para a causa",
    "Apoio que movimenta a rede"
  ]
};

export const redomeConfig = {
  url: "https://redome.inca.gov.br/",
  cta_label: "Atualizar cadastro no REDOME",
  disclaimer:
    "A atualizacao oficial precisa ser feita nos canais do REDOME. A FlaMedula orienta e mobiliza, mas nao substitui o cadastro oficial."
};

export const miniAppOptions = {
  bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  donorAvailability: [
    "Posso conversar em horario comercial",
    "Prefiro contato a noite",
    "Posso receber mensagens a qualquer momento"
  ],
  preferredChannels: ["WhatsApp", "Ligacao", "E-mail"],
  urgencyLevels: ["Alta", "Media", "Baixa"],
  patientRoles: [
    "Medico ou profissional de saude",
    "Responsavel ou familiar",
    "Apoiador ajudando um caso"
  ],
  patientNeedTypes: ["Doacao de sangue", "Plaquetas", "Mobilizacao para medula", "Outro apoio"],
  medulaInterestOptions: [
    "Quero receber orientacao sobre medula",
    "Quero entender melhor antes",
    "Nao neste momento"
  ]
};

export const fearCards = [
  {
    question: "E sempre pela coluna?",
    answer:
      "Nao. Existem formas diferentes de coleta, incluindo aferese pelo sangue periferico e puncao da medula ossea. A equipe medica define a opcao indicada."
  },
  {
    question: "Cadastro ja e doacao?",
    answer:
      "Nao. O cadastro indica que voce pode ser chamado se houver compatibilidade. Antes de uma doacao, ainda existem novas confirmacoes e avaliacao medica."
  },
  {
    question: "Medula ossea e medula espinhal?",
    answer:
      "Nao. A medula ossea produz celulas do sangue e fica dentro dos ossos. A medula espinhal faz parte do sistema nervoso."
  },
  {
    question: "Por que atualizar meus dados importa?",
    answer:
      "Se telefone, e-mail ou cidade estiverem desatualizados, voce pode nao ser encontrado quando surgir uma possivel compatibilidade."
  }
];

export const journeySteps = [
  {
    title: "Entenda a causa",
    description:
      "Informacao clara reduz medo, corrige desinformacao e ajuda a transformar vontade em decisao consciente."
  },
  {
    title: "Escolha como participar",
    description:
      "Voce pode se cadastrar, atualizar o REDOME, informar um caso ou apoiar a continuidade da mobilizacao."
  },
  {
    title: "A equipe organiza os dados",
    description:
      "Os cadastros ajudam a mapear interesse, disponibilidade e contexto para campanhas mais responsaveis."
  },
  {
    title: "A rede ganha capacidade de agir",
    description:
      "Quando surge uma necessidade real, a FlaMedula consegue mobilizar comunicacao, orientacao e gente pronta para ajudar."
  }
];

export const aboutContent = {
  title: "FlaMedula e mobilizacao em forma de rede.",
  paragraphs: [
    "A FlaMedula nasce para transformar informacao em mobilizacao organizada. A rede aproxima pessoas dispostas a doar, casos que precisam de apoio e acoes que alcancam quem esta mais perto.",
    "A causa vive de cadastro consciente, orientacao responsavel, dados atualizados, familias acolhidas e campanhas capazes de converter solidariedade em presenca."
  ],
  quote: "Quando a informacao esta organizada, a solidariedade chega mais rapido."
};

export const footerMeta = {
  legal:
    "A FlaMedula e uma rede de mobilizacao e orientacao. Nao substitui o REDOME nem canais oficiais de saude. Cadastro, triagem e doacao seguem as diretrizes dos hemocentros.",
  badges: ["Landing CMS-ready", "Supabase em preparo", "Dark mode preservado"]
};
