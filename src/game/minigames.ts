/**
 * Minigames do modo multiplayer. Fonte do conteúdo que é gravado no banco
 * (scripts/gen-questions-sql.ts). NÃO importar em código do navegador:
 * o gabarito do multiplayer fica apenas no servidor.
 */
export type MiniQuestion = {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  whyWrong?: string[];
  media?: string;
  clues?: string[];
};
export type Minigame = { id: string; title: string; kind: "image" | "dressing" | "emergency"; time: number; difficulty: string; points: number; questions: MiniQuestion[] };

const IMG_LIMIT =
  " Limitação: a avaliação por imagem não substitui a avaliação presencial — iluminação, câmera e ângulo alteram cores; profundidade, odor, temperatura, dor e aderência só são avaliados à beira do leito.";

export const MINIGAMES: Minigame[] = [
  {
    id: "M1",
    title: "Detetive Tecidual",
    kind: "image",
    time: 30,
    difficulty: "facil",
    points: 100,
    questions: [
      {
        media: "granulacao",
        q: "Observe a imagem. Qual tecido predomina no leito?",
        options: ["Tecido de granulação", "Esfacelo", "Necrose seca", "Epitelização"],
        correct: 0,
        explanation:
          "Leito vermelho vivo, úmido e com aspecto granuloso (“em paralelepípedo”): são alças capilares neoformadas e matriz produzida por fibroblastos — tecido viável da fase proliferativa." + IMG_LIMIT,
      },
      {
        media: "esfacelo",
        q: "Observe a imagem. Como classificar o tecido amarelado e filamentoso?",
        options: ["Esfacelo", "Tecido de granulação", "Epitelização", "Tecido adiposo saudável"],
        correct: 0,
        explanation:
          "Material amarelo, mole e fibrinoso aderido ao leito é esfacelo: fibrina, leucócitos e debris. É tecido desvitalizado que atrasa a cicatrização. Tecido adiposo exposto também pode ser amarelo, mas é lobulado e brilhante — por isso a confirmação é presencial." + IMG_LIMIT,
      },
      {
        media: "necrose",
        q: "Observe a imagem no calcâneo. Qual tecido é esse?",
        options: ["Necrose seca (escara)", "Hematoma superficial", "Esfacelo", "Granulação escurecida"],
        correct: 0,
        explanation:
          "Placa preta, seca, endurecida e de bordas definidas é necrose seca (escara). No calcâneo, a conduta depende da perfusão: escara estável em membro isquêmico deve ser mantida seca e protegida até avaliação." + IMG_LIMIT,
      },
      {
        media: "corte",
        q: "Na ilustração em corte, as bordas rosadas que avançam sobre o leito vermelho representam:",
        options: ["Epitelização", "Necrose", "Esfacelo", "Maceração"],
        correct: 0,
        explanation:
          "Epitelização é a migração de queratinócitos a partir das bordas. Clinicamente aparece como tecido rosa-perolado, fino e frágil, avançando sobre a granulação. Meio úmido equilibrado acelera esse processo." + IMG_LIMIT,
      },
    ],
  },
  {
    id: "M2",
    title: "Cobertura Certa",
    kind: "dressing",
    time: 40,
    difficulty: "medio",
    points: 100,
    questions: [
      {
        q: "Leito seco com esfacelo aderido, sem exsudato, perfusão adequada, sem infecção. Objetivo: desbridamento autolítico.",
        options: ["Hidrogel", "Alginato de cálcio", "Carvão ativado", "Espuma de alta absorção"],
        correct: 0,
        explanation: "Hidrogel doa umidade e favorece a ação de enzimas endógenas (autólise). Indicado para leito seco; contraindicado em exsudato abundante.",
        whyWrong: ["", "Alginato precisa de exsudato para gelificar; em leito seco adere e resseca.", "Carvão ativado é indicado para odor, não para hidratar o leito.", "Espuma absorve umidade, o oposto do necessário."],
      },
      {
        q: "Cavidade de 3 cm com exsudato abundante e pequeno sangramento após a limpeza. Sem infecção.",
        options: ["Alginato de cálcio", "Filme transparente", "Hidrogel", "Hidrocoloide placa"],
        correct: 0,
        explanation: "Alginato faz troca iônica Ca²⁺/Na⁺, forma gel, preenche cavidade, absorve bem e o cálcio auxilia a hemostasia de pequenos sangramentos. Requer cobertura secundária.",
        whyWrong: ["", "Filme não absorve nem preenche cavidade.", "Hidrogel adiciona umidade a um leito já muito úmido.", "Hidrocoloide é oclusivo, não preenche cavidade e não suporta alto exsudato."],
      },
      {
        q: "Ferida profunda, exsudato abundante, pele perilesional começando a macerar. Precisa de retenção vertical do exsudato.",
        options: ["Hidrofibra", "Hidrocoloide", "Hidrogel", "Gaze vaselinada"],
        correct: 0,
        explanation: "A hidrofibra (CMC sódica) absorve e retém o exsudato nas fibras, formando gel coeso com pouco espalhamento lateral — protege as bordas da maceração.",
        whyWrong: ["", "Hidrocoloide não suporta exsudato abundante e aumenta a maceração.", "Hidrogel doa umidade e piora a maceração.", "Gaze vaselinada é não aderente, mas não absorve."],
      },
      {
        q: "Úlcera rasa com granulação, exsudato moderado, sem infecção. Precisa de absorção e proteção térmica.",
        options: ["Espuma de poliuretano", "Filme transparente", "Carvão ativado", "Hidrogel"],
        correct: 0,
        explanation: "A espuma absorve exsudato moderado a alto por capilaridade, mantém umidade e temperatura do leito e amortece pressão. Pode ter borda de silicone para pele frágil.",
        whyWrong: ["", "Filme não absorve exsudato moderado.", "Carvão é indicado para odor, não é a melhor escolha para controle simples de exsudato.", "Hidrogel adiciona umidade sem absorver."],
      },
      {
        q: "Lesão por pressão categoria 2, rasa, exsudato leve, sem infecção, em área sem muita fricção.",
        options: ["Hidrocoloide", "Alginato de cálcio", "Carvão ativado com prata", "Hidrofibra com prata"],
        correct: 0,
        explanation: "Hidrocoloide mantém meio úmido, forma gel com pouco exsudato e protege de contaminação externa. Contraindicado em infecção, exsudato alto ou exposição de estruturas profundas.",
        whyWrong: ["", "Alginato é para exsudato moderado a alto; com pouco exsudato resseca e adere.", "Não há odor nem infecção que justifiquem carvão ou prata.", "Antimicrobiano sem infecção não está indicado."],
      },
      {
        q: "Pele íntegra em área de risco de fricção (proeminência óssea), sem exsudato. Necessidade de visualizar a pele.",
        options: ["Filme transparente de poliuretano", "Alginato de cálcio", "Espuma com prata", "Hidrogel"],
        correct: 0,
        explanation: "O filme é semipermeável: deixa passar vapor, bloqueia líquidos e bactérias, reduz fricção e permite inspeção da pele. Não absorve exsudato.",
        whyWrong: ["", "Alginato precisa de exsudato; não se aplica em pele íntegra.", "Prata não tem indicação sem infecção.", "Hidrogel é para hidratar leito seco, não para proteger pele íntegra."],
      },
      {
        q: "Lesão vegetante com exsudato moderado e odor intenso, sem sinais de infecção sistêmica.",
        options: ["Cobertura com carvão ativado", "Hidrogel", "Filme transparente", "Hidrocoloide"],
        correct: 0,
        explanation: "O carvão ativado adsorve moléculas odoríferas em sua superfície porosa. Melhora o conforto e a dignidade do paciente; deve ter contato adequado e não ser recortado se o fabricante não permitir.",
        whyWrong: ["", "Hidrogel não controla odor e adiciona umidade.", "Filme oclusivo retém exsudato e não controla odor.", "Hidrocoloide oclusivo pode aumentar odor e vazamento."],
      },
      {
        q: "Infecção local confirmada pelo enfermeiro (exsudato aumentado, odor, eritema local), exsudato moderado, sem sinais sistêmicos.",
        options: ["Cobertura com prata por tempo limitado e reavaliação", "Hidrogel simples", "Filme transparente", "Gaze seca trocada uma vez ao dia"],
        correct: 0,
        explanation: "Íons prata se ligam a proteínas, membranas e DNA microbiano. Uso indicado em infecção local/biofilme, por tempo definido (reavaliar em cerca de 2 semanas), junto com limpeza e avaliação contínua.",
        whyWrong: ["", "Hidrogel não tem ação antimicrobiana e aumenta a umidade.", "Filme oclusivo em ferida infectada é inadequado.", "Gaze seca adere, não controla a carga microbiana e traumatiza o leito."],
      },
    ],
  },
  {
    id: "M3",
    title: "Emergência na Ferida",
    kind: "emergency",
    time: 45,
    difficulty: "dificil",
    points: 150,
    questions: [
      {
        clues: [
          "Sra. Irene, 70 anos, úlcera em perna esquerda.",
          "Hoje: dor muito maior, eritema que passou de 1 para 5 cm desde ontem.",
          "Temperatura 38,6 °C, FC 112 bpm, PA 92/58 mmHg.",
          "Está confusa e sonolenta.",
        ],
        q: "Qual é a conduta inicial mais segura?",
        options: [
          "Interromper o procedimento, registrar sinais vitais e acionar imediatamente o enfermeiro — suspeita de infecção com comprometimento sistêmico",
          "Terminar o curativo com cobertura de prata e reavaliar amanhã",
          "Aplicar compressa quente para drenar a infecção",
          "Aguardar a próxima verificação de sinais vitais",
        ],
        correct: 0,
        explanation: "Eritema em rápida expansão com febre, taquicardia, hipotensão e confusão sugere sepse. É emergência: o tratamento é sistêmico e depende de avaliação imediata. Nenhuma cobertura trata infecção sistêmica.",
        whyWrong: ["", "Atrasa o tratamento de uma emergência; a prata não age sistemicamente.", "Calor aumenta edema e demanda metabólica, e não trata a infecção.", "Cada hora de atraso aumenta o risco de morte na sepse."],
      },
      {
        clues: [
          "Sr. Paulo, 58 anos, 3º dia de pós-operatório de cirurgia vascular na virilha.",
          "Ao retirar a cobertura, há sangue vivo saindo da ferida.",
          "O sangramento é pulsátil e aumenta.",
          "Paciente pálido e sudoreico.",
        ],
        q: "Qual é a primeira ação?",
        options: [
          "Compressão direta firme com compressa estéril e acionar imediatamente a equipe, sem soltar a compressão",
          "Aplicar alginato de cálcio e concluir o curativo",
          "Irrigar com SF para localizar o ponto de sangramento",
          "Elevar a cabeceira e aguardar o sangramento parar",
        ],
        correct: 0,
        explanation: "Sangramento pulsátil indica origem arterial e risco de choque. A compressão direta contínua é a medida inicial; a equipe deve ser chamada imediatamente para controle definitivo.",
        whyWrong: ["", "Alginato serve para pequenos sangramentos em lençol, não para hemorragia arterial.", "Irrigar retira coágulos e aumenta a perda de sangue.", "Esperar sem comprimir pode levar a choque hemorrágico."],
      },
      {
        clues: [
          "Sr. Lauro, 74 anos, lesão por pressão sacral em tratamento.",
          "Há 3 dias: 20% de esfacelo. Hoje: 60% de tecido escurecido.",
          "Odor fétido novo e exsudato acinzentado.",
          "Ao redor, pele arroxeada e dolorosa que se estende além da lesão.",
        ],
        q: "Como interpretar e agir?",
        options: [
          "Deterioração rápida com sinais de infecção profunda: não desbridar, registrar e comunicar imediatamente o enfermeiro para avaliação",
          "Remover o tecido escurecido com pinça para limpar a ferida",
          "Manter o plano atual, pois é a evolução esperada",
          "Aplicar hidrogel para amolecer o tecido e reavaliar em 7 dias",
        ],
        correct: 0,
        explanation: "Aumento rápido de necrose, odor novo, exsudato acinzentado e alteração da pele ao redor indicam deterioração com possível infecção profunda. Exige avaliação imediata; desbridamento é decisão e competência do enfermeiro capacitado ou do médico.",
        whyWrong: ["", "Desbridamento instrumental não é atribuição do técnico e pode espalhar infecção ou causar sangramento.", "Ferida que piora rapidamente nunca é evolução esperada.", "Adiar 7 dias em um quadro de deterioração pode ser grave."],
      },
      {
        clues: [
          "Sr. Celso, 80 anos, diabético e com doença arterial periférica.",
          "Lesão no dorso do pé com necrose seca na ponta do 2º dedo.",
          "Hoje o dedo está úmido, com bolhas e odor fétido.",
          "A pele vermelha sobe pelo pé e há crepitação ao toque.",
        ],
        q: "Qual é a conduta inicial mais segura?",
        options: [
          "Interromper o procedimento, não manipular a lesão e comunicar imediatamente o enfermeiro e o médico — sinais de necrose infectada com possível infecção grave",
          "Aplicar hidrogel sobre a necrose para amolecê-la",
          "Fazer compressão do membro para reduzir o edema",
          "Massagear o pé para melhorar a circulação",
        ],
        correct: 0,
        explanation: "Necrose seca que se torna úmida, com bolhas, odor, eritema ascendente e crepitação (gás nos tecidos) sugere infecção grave, possivelmente necrotizante — emergência com risco para o membro e para a vida.",
        whyWrong: ["", "Hidratar necrose em membro isquêmico e infectado agrava a infecção.", "Compressão em doença arterial reduz ainda mais o fluxo sanguíneo.", "Massagem pode espalhar a infecção e lesar tecidos isquêmicos."],
      },
    ],
  },
];
