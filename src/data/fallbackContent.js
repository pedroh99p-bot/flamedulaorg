export const siteAssets = {
  logoPrimary:
    "https://res.cloudinary.com/dm9mnc97u/image/upload/v1781279524/Untitled_design_17_1_x7qbdx.webp",
  logoFallback:
    "https://res.cloudinary.com/dm9mnc97u/image/upload/v1777674863/FLA_7_1_kkc5qi.png",
  introVideo:
    "https://res.cloudinary.com/dm9mnc97u/video/upload/v1780677944/WhatsApp-Video-2026-06-05-at-13.40.33_xxhh84.webm",
  informativeVideo:
    "https://res.cloudinary.com/dm9mnc97u/video/upload/v1777677171/download_wq1ltu.mp4",
  editorialMedula:
    "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1800&q=80",
  editorialDonor:
    "https://images.unsplash.com/photo-1615461066841-6116e61058f4?auto=format&fit=crop&w=1800&q=80",
  editorialPatient:
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1800&q=80",
  editorialAction:
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1800&q=80"
};

export const heroNewsItems = [
  {
    id: "hero-medula-sem-medo",
    title: "Medula sem medo: informação certa muda decisões.",
    excerpt:
      "A rede existe para reduzir medo, corrigir desinformação e aproximar pessoas de um cadastro consciente.",
    category: "educação",
    tag_emoji: "🧬",
    image_url: siteAssets.editorialMedula,
    cta_label: "Entender agora",
    cta_url: "#medula-sem-medo",
    published: true,
    order: 1,
    featured: true
  },
  {
    id: "hero-doador",
    title: "Quem quer doar precisa de orientação simples e humana.",
    excerpt:
      "O mini app organiza interesse, disponibilidade e contato para mobilizar melhor.",
    category: "cadastro",
    tag_emoji: "🩸",
    image_url: siteAssets.editorialDonor,
    cta_label: "Começar cadastro",
    cta_url: "#cadastro",
    published: true,
    order: 2,
    featured: true
  },
  {
    id: "hero-paciente",
    title: "Um caso precisa de cuidado antes de ganhar alcance.",
    excerpt:
      "A página recebe informações iniciais e ajuda a equipe a entender o contexto com responsabilidade.",
    category: "acolhimento",
    tag_emoji: "💙",
    image_url: siteAssets.editorialPatient,
    cta_label: "Enviar um caso",
    cta_url: "#cadastro",
    published: true,
    order: 3,
    featured: false
  },
  {
    id: "hero-acoes",
    title: "Campanhas fortes nascem de dados claros e gente mobilizada.",
    excerpt:
      "Ações, depoimentos e métricas ficam preparados para evoluir com painel ADM no futuro.",
    category: "rede",
    tag_emoji: "📣",
    image_url: siteAssets.editorialAction,
    cta_label: "Ver ações",
    cta_url: "#acoes",
    published: true,
    order: 4,
    featured: false
  }
];

export const actionItems = [
  {
    id: "acao-mutirao-redome",
    title: "Mutirão de cadastro e orientação com hemocentro regional",
    excerpt:
      "A equipe reuniu acolhimento, educação e orientação sobre medula para ampliar a base acionável da rede.",
    date: "2026-03-12",
    location: "Hemocentro Regional",
    category: "mobilização",
    image_url: siteAssets.editorialDonor,
    cta_label: "Entender a ação",
    cta_url: "#cadastro",
    published: true,
    order: 1
  },
  {
    id: "acao-plaquetas-joao",
    title: "Mobilização por plaquetas com meta atingida em menos de 48 horas",
    excerpt:
      "O caso mostrou como informação organizada acelera divulgação, presença e resposta da comunidade.",
    date: "2026-04-05",
    location: "Hospital de Base",
    category: "apoio-a-caso",
    image_url: siteAssets.editorialPatient,
    cta_label: "Ver contexto",
    cta_url: "#depoimentos",
    published: true,
    order: 2
  },
  {
    id: "acao-dia-d",
    title: "Dia D FlaMedula para conscientização sobre doação de medula",
    excerpt:
      "Um encontro para explicar a causa, orientar novos interessados e fortalecer campanhas futuras.",
    date: "2026-07-20",
    location: "Sede da rede",
    category: "evento",
    image_url: siteAssets.editorialAction,
    cta_label: "Acompanhar a agenda",
    cta_url: "/apoie/",
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
      "A orientação da FlaMedula tirou meu medo. Quando o REDOME ligou, eu já entendia o processo e estava pronto para seguir.",
    avatar_url: siteAssets.logoPrimary,
    published: true,
    order: 1
  },
  {
    id: "testimonial-familia-costa",
    name: "Família Costa",
    relation: "Caso acolhido",
    quote:
      "No momento mais difícil, a rede ajudou a organizar informação, cuidado e mobilização sem transformar nossa história em ruído.",
    avatar_url: siteAssets.logoFallback,
    published: true,
    order: 2
  },
  {
    id: "testimonial-dra-mariana",
    name: "Dra. Mariana",
    relation: "Hematologista",
    quote:
      "Desmistificar a doação de medula e orientar com responsabilidade é essencial para gerar cadastros conscientes.",
    avatar_url: siteAssets.logoPrimary,
    published: true,
    order: 3
  }
];

export const teamMembers = [
  {
    id: "team-andre",
    name: "André Matos “Dedeco”",
    role: "Fundador e diretor geral",
    description: "Conecta a causa com narrativa, presença e mobilização prática.",
    image_url: siteAssets.logoPrimary,
    published: true,
    order: 1
  },
  {
    id: "team-danielli",
    name: "Danielli Oliveira",
    role: "Parceira técnica",
    description: "Sustenta comunicação responsável, orientação segura e coerência institucional.",
    image_url: siteAssets.logoFallback,
    published: true,
    order: 2
  },
  {
    id: "team-elaine",
    name: "Elaine Reixach",
    role: "Coordenação de ações",
    description: "Organiza campanhas, presença em campo e relacionamento com famílias e pontos de apoio.",
    image_url: siteAssets.logoPrimary,
    published: true,
    order: 3
  },
  {
    id: "team-maiko",
    name: "Tio Maiko Castro",
    role: "Apoio e acolhimento",
    description: "Leva presença humana e suporte para famílias, crianças e casas de apoio.",
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
      "Amplia o alcance da causa e convoca a Nação a olhar para a doação de medula com seriedade.",
    image_url: siteAssets.logoPrimary,
    published: true,
    order: 1
  },
  {
    id: "amb-tania",
    name: "Tania Bastos",
    role: "Madrinha institucional",
    description:
      "Fortalece a visibilidade pública da FlaMedula e mantém a causa conectada à relevância institucional.",
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
  source_label: "Dados demonstrativos do protótipo"
};

export const faqItems = [
  {
    id: "faq-coluna",
    question: "Doar medula é sempre pela coluna?",
    answer:
      "Não. Medula óssea não é medula espinhal. A coleta pode acontecer por aférese pelo sangue periférico ou por punção da medula óssea. A definição é conduzida pela equipe médica."
  },
  {
    id: "faq-redome",
    question: "A FlaMedula substitui o REDOME?",
    answer:
      "Não. A FlaMedula orienta e mobiliza. Cadastro oficial, triagem e doação seguem sob responsabilidade do REDOME, hemocentros e canais oficiais de saúde."
  },
  {
    id: "faq-atualizar",
    question: "Por que atualizar meus dados no REDOME importa?",
    answer:
      "Porque telefone, e-mail ou endereço desatualizados podem impedir que você seja encontrado quando surgir uma possível compatibilidade."
  },
  {
    id: "faq-paciente",
    question: "Como funciona o cadastro de um caso?",
    answer:
      "O mini app organiza as informações iniciais para que a equipe entenda o contexto, avalie a necessidade e oriente próximos passos com responsabilidade."
  }
];

export const rollerItems = {
  authority: [
    "INFORMAÇÃO",
    "CADASTRO",
    "DADOS ATUALIZADOS",
    "MOBILIZAÇÃO",
    "VIDA",
    "REDE ORGANIZADA"
  ],
  trust: [
    "MEDULA SEM MEDO",
    "INFORMAÇÃO CLARA",
    "DADOS ATUALIZADOS",
    "ORIENTAÇÃO RESPONSÁVEL",
    "REDE POR REGIÃO"
  ],
  action: [
    "CAMPANHAS COM PROPÓSITO",
    "PRESENÇA EM CAMPO",
    "CASOS ORGANIZADOS",
    "APOIO REAL",
    "MOBILIZAÇÃO VIVA"
  ],
  support: [
    "CAMPANHAS MAIS FORTES",
    "DADOS MAIS CLAROS",
    "PESSOAS MAIS PRÓXIMAS",
    "ORIENTAÇÃO",
    "CONFIANÇA",
    "PRESENÇA"
  ]
};

export const redomeConfig = {
  url: "https://redome.inca.gov.br/",
  logo_url: "https://res.cloudinary.com/dm9mnc97u/image/upload/v1781283383/logo-redome_wmvgt8.png",
  cta_label: "Atualizar cadastro no REDOME",
  disclaimer:
    "A atualização oficial precisa ser feita nos canais do REDOME. A FlaMedula orienta e mobiliza, mas não substitui o cadastro oficial."
};

export const miniAppOptions = {
  bloodTypes: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
  donorAvailability: [
    "Posso conversar em horário comercial",
    "Prefiro contato à noite",
    "Posso receber mensagens a qualquer momento"
  ],
  preferredChannels: ["WhatsApp", "Ligação", "E-mail"],
  urgencyLevels: ["Alta", "Média", "Baixa"],
  patientRoles: [
    "Médico ou profissional de saúde",
    "Responsável ou familiar",
    "Apoiador ajudando um caso"
  ],
  patientNeedTypes: ["Doação de sangue", "Plaquetas", "Mobilização para medula", "Outro apoio"],
  medulaInterestOptions: [
    "Quero receber orientação sobre medula",
    "Quero entender melhor",
    "Não neste momento"
  ]
};

export const fearCards = [
  {
    question: "É sempre pela coluna?",
    answer:
      "Não. A coleta pode acontecer de formas diferentes, como aférese pelo sangue periférico ou punção da medula óssea. A equipe médica define o método."
  },
  {
    question: "Cadastro já é doação?",
    answer:
      "Não. O cadastro indica disponibilidade. Antes de qualquer doação, existem novas confirmações e avaliação médica."
  },
  {
    question: "Medula óssea é medula espinhal?",
    answer:
      "Não. A medula óssea produz células do sangue e fica dentro dos ossos. A medula espinhal faz parte do sistema nervoso."
  },
  {
    question: "Por que atualizar meus dados?",
    answer:
      "Se telefone, e-mail ou cidade estiverem desatualizados, você pode não ser encontrado quando surgir uma possível compatibilidade."
  }
];

export const journeySteps = [
  {
    title: "Entenda a causa",
    description:
      "Informação clara reduz medo e ajuda a transformar vontade em decisão consciente."
  },
  {
    title: "Escolha como participar",
    description:
      "Você pode se cadastrar, atualizar o REDOME, informar um caso ou apoiar a continuidade da rede."
  },
  {
    title: "A equipe organiza os dados",
    description:
      "Os cadastros ajudam a mapear interesse, disponibilidade e contexto para campanhas responsáveis."
  },
  {
    title: "A rede ganha capacidade de agir",
    description:
      "Quando surge uma necessidade real, a FlaMedula mobiliza comunicação, orientação e pessoas prontas para ajudar."
  }
];

export const aboutContent = {
  title: "Informação que vira movimento.",
  paragraphs: [
    "A FlaMedula existe para transformar informação em mobilização responsável.",
    "Organizamos pessoas, orientações, dados atualizados e campanhas para que a solidariedade chegue com mais clareza a quem precisa."
  ],
  quote: "Quando a informação está organizada, a solidariedade chega mais rápido."
};

export const footerMeta = {
  legal:
    "A FlaMedula é uma rede de mobilização e orientação. Não substitui o REDOME nem canais oficiais de saúde. Cadastro, triagem e doação seguem as diretrizes dos hemocentros.",
  badges: ["Landing CMS-ready", "Supabase em preparo", "Dark mode preservado"]
};
