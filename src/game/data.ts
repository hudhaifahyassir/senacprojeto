import f1 from "@/assets/fase1.jpg";
import f2 from "@/assets/fase2.jpg";
import f3 from "@/assets/fase3.jpg";
import f4 from "@/assets/fase4.jpg";
import f5 from "@/assets/fase5.jpg";
import f6 from "@/assets/fase6.jpg";
import { ADVANCED_PHASE } from "./advanced";

export type CaseInfo = { patient: string; context: string; location: string; bed: string; exudate: string; edges: string; signs: string };
export type Question = { q: string; options: string[]; correct: number; explanation: string; caseInfo?: CaseInfo; whyWrong?: string[] };
export type Phase = {
  id: number;
  title: string;
  subtitle: string;
  objective: string;
  caseText: string;
  image: string;
  time?: number;
  questions: Question[];
};

export const PHASES: Phase[] = [
  {
    id: 1,
    title: "Identificação Tecidual",
    subtitle: "Leia o leito da ferida",
    objective: "Reconhecer granulação, epitelização, esfacelo e necrose pelas características clínicas.",
    caseText:
      "Ambulatório de feridas. Você acompanha o enfermeiro na avaliação de quatro pacientes com lesões em diferentes estágios. Sua tarefa é identificar o tipo de tecido predominante em cada leito.",
    image: f1,
    questions: [
      {
        q: "Paciente A: leito vermelho vivo, úmido, de aspecto granuloso e brilhante, que sangra facilmente ao toque. Qual é o tecido?",
        options: ["Esfacelo", "Tecido de granulação", "Necrose de coagulação", "Hipergranulação fibrótica"],
        correct: 1,
        explanation:
          "O tecido de granulação surge na fase proliferativa: fibroblastos produzem matriz (colágeno tipo III) e a angiogênese forma novos capilares em alças — por isso o aspecto granular, vermelho e friável. É um tecido viável e deve ser protegido de traumas e ressecamento.",
      },
      {
        q: "Paciente B: nas bordas da lesão há um tecido fino, rosado-perolado, avançando sobre o leito. O que ele representa?",
        options: ["Maceração", "Epitelização", "Esfacelo em liquefação", "Biofilme"],
        correct: 1,
        explanation:
          "A epitelização é a migração de queratinócitos a partir das bordas e anexos cutâneos. Ela é mais rápida em meio úmido equilibrado (Winter, 1962): sem crosta, as células migram livremente sobre o leito. Ressecamento e trauma na troca atrasam esse processo.",
      },
      {
        q: "Paciente C: tecido amarelado, úmido, mole, fibrinoso e aderido ao leito. Qual é a classificação?",
        options: ["Granulação saudável", "Escara seca", "Esfacelo", "Tecido epitelial"],
        correct: 2,
        explanation:
          "Esfacelo é tecido desvitalizado composto por fibrina, leucócitos, bactérias e debris. Ele atrasa a cicatrização e favorece infecção. Pode ser removido por desbridamento autolítico (enzimas do próprio exsudato atuando em meio úmido), sempre conforme avaliação e prescrição do enfermeiro.",
      },
      {
        q: "Paciente D: placa preta, seca, endurecida e firmemente aderida no calcanhar de um paciente com pulsos pediosos ausentes. Qual é a conduta segura?",
        options: [
          "Aplicar hidrogel para amolecer e remover a necrose",
          "Remover a escara com pinça durante o curativo",
          "Manter a escara seca e estável, proteger e comunicar o enfermeiro para avaliação vascular",
          "Cobrir com hidrocoloide oclusivo para autólise",
        ],
        correct: 2,
        explanation:
          "Necrose seca (escara) é tecido morto por isquemia. Em membro com perfusão comprometida, a escara estável funciona como barreira natural: hidratá-la ou desbridá-la pode abrir porta para infecção grave. A etiologia e a perfusão definem a conduta — não a cor do tecido isoladamente.",
      },
    ],
  },
  {
    id: 2,
    title: "Avaliação da Ferida",
    subtitle: "Observe além do leito",
    objective: "Avaliar exsudato, profundidade, bordas, pele perilesional, sinais de infecção e perfusão.",
    caseText:
      "Sr. Antônio, 64 anos, diabético, apresenta úlcera em perna esquerda há 3 meses. Você realizará a avaliação sistemática da lesão utilizando a estrutura TIME.",
    image: f2,
    questions: [
      {
        q: "No acrônimo TIME, utilizado para preparo do leito da ferida, o que representa a letra “M”?",
        options: ["Medicação tópica", "Moisture — equilíbrio da umidade", "Mensuração da ferida", "Microbiota"],
        correct: 1,
        explanation:
          "TIME: T – Tecido (não viável), I – Infecção/Inflamação, M – Moisture (equilíbrio de umidade), E – Edge (bordas). O excesso de umidade macera e o déficit resseca; o equilíbrio favorece a migração celular e a ação de fatores de crescimento.",
      },
      {
        q: "O exsudato está amarelo-esverdeado, espesso, com odor fétido; há calor local, dor crescente e eritema que se expande. Isso sugere:",
        options: ["Fase inflamatória normal", "Infecção local da ferida", "Excesso de epitelização", "Reação alérgica ao soro"],
        correct: 1,
        explanation:
          "Exsudato purulento, odor, calor, eritema em expansão e dor crescente são sinais clássicos de infecção. A inflamação fisiológica dura poucos dias; sinais persistentes ou progressivos devem ser comunicados ao enfermeiro.",
      },
      {
        q: "A pele ao redor da lesão está esbranquiçada, enrugada e amolecida. Como se chama esse achado?",
        options: ["Hiperqueratose", "Maceração", "Epibolia", "Dermatite ocre"],
        correct: 1,
        explanation:
          "Maceração é a hidratação excessiva da pele perilesional pelo exsudato. A pele perde a função de barreira e pode romper, ampliando a lesão. Indica cobertura com capacidade de absorção insuficiente ou trocas espaçadas demais, além da necessidade de protetor cutâneo.",
      },
      {
        q: "As bordas estão espessas, enroladas para dentro e não avançam há semanas. Esse achado corresponde a:",
        options: ["Epibolia (bordas enroladas)", "Granulação exuberante", "Tunelização", "Flictena"],
        correct: 0,
        explanation:
          "Na epibolia, o epitélio cresce sobre a borda e “enrola”, interrompendo a migração sobre o leito. É o “E” do TIME: bordas que não avançam indicam ferida estagnada e exigem reavaliação do plano pelo enfermeiro.",
      },
      {
        q: "O pé está frio, pálido à elevação, com pulsos pediosos ausentes e enchimento capilar lento. O que está comprometido?",
        options: ["Retorno venoso apenas", "Perfusão arterial", "Drenagem linfática", "Inervação sensitiva"],
        correct: 1,
        explanation:
          "Esses sinais indicam insuficiência arterial. Sem oxigênio e nutrientes, a cicatrização não ocorre. A avaliação da perfusão (incluindo o índice tornozelo-braquial) é obrigatória antes de terapias compressivas ou desbridamento.",
      },
    ],
  },
  {
    id: 3,
    title: "Seleção de Coberturas",
    subtitle: "A cobertura certa para cada leito",
    objective:
      "Compreender o mecanismo de ação das coberturas e relacioná-lo ao tecido, exsudato, profundidade, infecção e perfusão.",
    caseText:
      "Sala de curativos. Diferentes casos chegam até você. Não existe cobertura universal: a escolha depende da avaliação completa. Analise cada situação e identifique a opção mais adequada.",
    image: f3,
    questions: [
      {
        q: "Ferida cavitária com exsudato abundante e pequeno sangramento em lençol após limpeza. Sem sinais de infecção. Qual cobertura primária tem mecanismo mais adequado?",
        options: ["Filme de poliuretano", "Alginato de cálcio", "Hidrogel", "Hidrocoloide placa"],
        correct: 1,
        explanation:
          "O alginato de cálcio realiza troca iônica: íons cálcio da fibra são trocados por íons sódio do exsudato, formando um gel que mantém o meio úmido. O cálcio liberado auxilia a hemostasia de pequenos sangramentos. Pode preencher cavidades e exige cobertura secundária. Não é indicado em feridas secas.",
      },
      {
        q: "Ferida com esfacelo, leito seco, exsudato mínimo e boa perfusão. Qual cobertura favorece o desbridamento autolítico?",
        options: ["Alginato de cálcio", "Carvão ativado", "Hidrogel", "Gaze seca"],
        correct: 2,
        explanation:
          "O hidrogel (alto teor de água) doa umidade ao leito, permitindo que enzimas endógenas (proteases) e macrófagos degradem o tecido desvitalizado — o desbridamento autolítico. Em feridas muito exsudativas causaria maceração.",
      },
      {
        q: "Lesão oncológica com exsudato moderado e odor intenso que causa constrangimento ao paciente. Qual componente atua diretamente no odor?",
        options: ["Carvão ativado", "Silicone", "Filme transparente", "Hidrocoloide"],
        correct: 0,
        explanation:
          "O carvão ativado tem enorme área de superfície porosa e realiza adsorção: moléculas voláteis responsáveis pelo odor ficam retidas em sua superfície. Muitas versões associam prata. Não deve ser recortado quando o fabricante não permite, para não liberar partículas no leito.",
      },
      {
        q: "Ferida com sinais de infecção local e suspeita de biofilme, exsudato moderado. Prescrição: cobertura antimicrobiana. Como a prata age?",
        options: [
          "Absorve as bactérias por gelificação",
          "Íons Ag⁺ se ligam a proteínas, membranas e DNA microbiano, causando morte celular",
          "Aumenta a pressão local, expulsando as bactérias",
          "Forma uma crosta que impede a entrada de microrganismos",
        ],
        correct: 1,
        explanation:
          "Os íons prata ligam-se a grupos tiol de enzimas, danificam a membrana e interferem na replicação do DNA. Assim como PHMB (que desorganiza membranas) e iodo (oxidação), deve ser usada por tempo limitado (ex.: reavaliar em ~2 semanas), e não de forma rotineira em feridas sem infecção.",
      },
      {
        q: "Idoso com pele frágil, lesão superficial com exsudato leve e histórico de dor e lesão na retirada de adesivos. O mais indicado é:",
        options: ["Esparadrapo comum sobre gaze", "Cobertura com interface/adesivo de silicone", "Filme de poliuretano com acrílico forte", "Hidrocoloide com bordas rígidas"],
        correct: 1,
        explanation:
          "O silicone tem adesão suave e atraumática: adere à pele seca, mas não ao leito úmido, reduzindo dor e lesões por remoção (skin tears). É útil em peles frágeis, enxertos e epitelização.",
      },
      {
        q: "Proteção de área de risco para lesão por pressão íntegra (pele hiperemiada que embranquece) e fixação de cateter, permitindo visualização. Escolha:",
        options: ["Filme de poliuretano transparente", "Alginato de cálcio", "Espuma com prata", "Hidrofibra"],
        correct: 0,
        explanation:
          "O filme de poliuretano é semipermeável: permite troca de vapor e gases, mas é impermeável a líquidos e bactérias. Não absorve exsudato, por isso é indicado para pele íntegra, proteção contra fricção, feridas superficiais sem exsudato e como cobertura secundária.",
      },
      {
        q: "Lesão por pressão categoria 2, superficial, exsudato leve, sem infecção, em região sacral. Qual opção é adequada?",
        options: ["Hidrocoloide", "Carvão ativado", "Gaze úmida trocada a cada 2h", "Iodo em alta concentração"],
        correct: 0,
        explanation:
          "O hidrocoloide (carboximetilcelulose, gelatina, pectina) interage com o exsudato formando gel, mantém meio úmido e protege contra contaminação externa. É contraindicado em feridas infectadas, com exsudato abundante ou exposição óssea, pois é oclusivo.",
      },
      {
        q: "Ferida profunda com exsudato abundante e risco de maceração. Deseja-se cobertura que gelifique e retenha o exsudato com absorção vertical. Opção indicada:",
        options: ["Hidrogel em placa", "Hidrofibra (carboximetilcelulose sódica)", "Filme de poliuretano", "Gaze vaselinada"],
        correct: 1,
        explanation:
          "A hidrofibra absorve o exsudato e o retém dentro das fibras (absorção vertical), formando gel coeso que reduz o espalhamento lateral para a pele perilesional — diminuindo a maceração. A espuma de poliuretano é uma opção de cobertura secundária ou primária para exsudato moderado a alto.",
      },
    ],
  },
  {
    id: 4,
    title: "Procedimento",
    subtitle: "Execução segura do curativo",
    objective: "Aplicar higienização, técnica asséptica, retirada adequada da cobertura e registro de enfermagem.",
    caseText:
      "Enfermaria cirúrgica. A Sra. Lúcia, 58 anos, está no 5º dia de pós-operatório com deiscência parcial da ferida. O curativo foi prescrito pelo enfermeiro e você realizará o procedimento.",
    image: f4,
    questions: [
      {
        q: "Antes de qualquer contato com a paciente e o material, qual é a primeira ação?",
        options: ["Calçar luvas estéreis", "Higienizar as mãos", "Retirar o curativo antigo", "Abrir o pacote de curativo"],
        correct: 1,
        explanation:
          "A higienização das mãos é a medida mais eficaz de prevenção de infecções relacionadas à assistência (OMS — 5 momentos). Luvas não substituem a higienização, que deve ocorrer antes e após o procedimento e após retirar as luvas.",
      },
      {
        q: "A gaze do curativo anterior está aderida ao leito. Como proceder?",
        options: [
          "Puxar rapidamente para reduzir a dor",
          "Umedecer com SF 0,9% morno e remover delicadamente",
          "Deixar a gaze e aplicar nova cobertura por cima",
          "Usar álcool 70% para soltar a gaze",
        ],
        correct: 1,
        explanation:
          "Remover cobertura aderida a seco arranca tecido de granulação e epitélio novo, causando dor e regressão da cicatrização. Umedecer com solução fisiológica dissolve o exsudato seco e permite remoção atraumática.",
      },
      {
        q: "Qual é a forma recomendada de limpeza do leito de uma ferida com granulação?",
        options: [
          "Esfregar vigorosamente com gaze e PVPI",
          "Irrigar com SF 0,9% morno em jato (ex.: seringa 20 mL com agulha 40x12)",
          "Aplicar água oxigenada para remover bactérias",
          "Não limpar para não remover o exsudato",
        ],
        correct: 1,
        explanation:
          "A irrigação com pressão adequada remove debris e microrganismos sem lesar o tecido viável. SF morno evita resfriamento do leito (o frio reduz a atividade celular). Antissépticos citotóxicos, como água oxigenada, lesam fibroblastos e não devem ser usados rotineiramente.",
      },
      {
        q: "Após a limpeza, antes de aplicar a cobertura, você deve:",
        options: [
          "Secar o leito e a pele perilesional com gaze até ficar totalmente seco",
          "Secar a pele perilesional, mantendo o leito úmido, e avaliar a ferida",
          "Aplicar talco na pele ao redor",
          "Massagear as bordas para estimular a circulação",
        ],
        correct: 1,
        explanation:
          "A pele perilesional seca garante aderência da cobertura e evita maceração; o leito deve permanecer úmido para favorecer a migração celular. Este é o momento de observar tecidos, exsudato, odor e bordas para o registro.",
      },
      {
        q: "Qual registro de enfermagem está mais completo?",
        options: [
          "“Curativo realizado. Paciente bem.”",
          "“Ferida limpa, feito curativo.”",
          "“Curativo em ferida abdominal 6x2 cm, leito 80% granulação e 20% esfacelo, exsudato seroso moderado sem odor, bordas regulares, pele perilesional íntegra. Limpeza com SF 0,9% e cobertura conforme prescrição. Paciente refere dor 3/10.”",
          "“Ferida feia, com secreção. Avisar.”",
        ],
        correct: 2,
        explanation:
          "O registro deve ser objetivo e permitir a comparação da evolução: localização, dimensões, tipo e percentual de tecido, exsudato (tipo, volume, odor), bordas, pele perilesional, produto utilizado, dor e intercorrências. Registro incompleto não comprova a assistência prestada.",
      },
    ],
  },
  {
    id: 5,
    title: "Decisão Clínica",
    subtitle: "Reconheça os sinais de alerta",
    objective:
      "Identificar situações de risco: infecção, isquemia, hemorragia e necessidade de avaliação imediata do enfermeiro.",
    caseText:
      "Plantão noturno. Diversas intercorrências surgem durante as rondas. Como técnico de enfermagem, você precisa agir com segurança e dentro das suas atribuições.",
    image: f5,
    questions: [
      {
        q: "Durante a troca, ocorre sangramento ativo, pulsátil, em vermelho vivo. Qual é a conduta imediata?",
        options: [
          "Terminar o curativo e registrar depois",
          "Aplicar compressão direta com gaze estéril, elevar o membro se possível e chamar o enfermeiro imediatamente",
          "Aplicar hidrogel para estancar",
          "Irrigar com SF para visualizar a origem",
        ],
        correct: 1,
        explanation:
          "Sangramento pulsátil sugere lesão arterial. A compressão direta é a primeira medida hemostática; a equipe deve ser acionada imediatamente. Monitorar sinais vitais e sinais de choque.",
      },
      {
        q: "Paciente com ferida em pé apresenta febre de 38,9 °C, taquicardia, eritema avançando rapidamente e crepitação à palpação. O que fazer?",
        options: [
          "Trocar a cobertura por prata e reavaliar no dia seguinte",
          "Administrar antitérmico por conta própria",
          "Comunicar imediatamente o enfermeiro: há sinais de infecção grave/sistêmica",
          "Aguardar a próxima troca programada",
        ],
        correct: 2,
        explanation:
          "Febre, taquicardia e eritema em rápida expansão indicam infecção disseminada; crepitação sugere gás no tecido (possível infecção necrotizante) — emergência. Coberturas tópicas não tratam infecção sistêmica.",
      },
      {
        q: "Paciente refere dor intensa em repouso que piora ao deitar e melhora com a perna pendente; dedos frios e cianóticos. Isso indica:",
        options: ["Insuficiência venosa leve", "Isquemia arterial — comunicar o enfermeiro", "Dor normal de cicatrização", "Reação à cobertura"],
        correct: 1,
        explanation:
          "Dor isquêmica em repouso que alivia com o membro pendente (a gravidade auxilia o fluxo) é sinal de doença arterial avançada. Compressão está contraindicada e o paciente necessita de avaliação vascular.",
      },
      {
        q: "Você acredita que outra cobertura seria melhor que a prescrita. Qual é a atitude correta?",
        options: [
          "Trocar a cobertura por sua conta",
          "Usar a cobertura que sobrou de outro paciente",
          "Realizar o curativo prescrito e comunicar ao enfermeiro suas observações para reavaliação",
          "Não realizar o curativo",
        ],
        correct: 2,
        explanation:
          "Conforme a Resolução COFEN nº 567/2018, a avaliação da ferida e a prescrição da cobertura são atribuições do enfermeiro; o técnico executa o curativo prescrito, observa e comunica alterações. A comunicação qualificada contribui para a reavaliação do plano.",
      },
      {
        q: "Paciente em terapia por pressão negativa (TPN): o reservatório começa a encher rapidamente com sangue vivo. Conduta:",
        options: [
          "Aumentar a pressão de sucção",
          "Interromper a terapia, comprimir o local e comunicar imediatamente o enfermeiro/médico",
          "Trocar o reservatório e manter a terapia",
          "Desconectar e deixar a ferida aberta",
        ],
        correct: 1,
        explanation:
          "A TPN aplica pressão subatmosférica (geralmente −80 a −125 mmHg) que remove exsudato, reduz edema, causa macro e microdeformação celular e estimula a granulação. Sangramento ativo é complicação grave: a sucção pode agravá-lo, por isso a terapia deve ser interrompida e a equipe acionada.",
      },
    ],
  },
  {
    id: 6,
    title: "Desafio Final",
    subtitle: "Caso clínico completo",
    objective: "Avaliar o paciente, interpretar os tecidos, analisar o exsudato e selecionar e justificar a cobertura.",
    caseText:
      "Sr. João, 72 anos, diabético tipo 2, acamado após AVC. Lesão por pressão sacral categoria 3, 6 x 4 cm, 1,5 cm de profundidade. Leito com 60% de granulação e 40% de esfacelo amarelado. Exsudato seroso abundante, sem odor. Bordas e pele perilesional maceradas. Sem eritema, calor ou febre. Glicemia capilar 260 mg/dL. Aceitação alimentar de 50% da dieta.",
    image: f6,
    questions: [
      {
        q: "ETAPA 1 — Avaliação do paciente: o que deve ser considerado além da ferida?",
        options: [
          "Apenas o tamanho da lesão",
          "Controle glicêmico, nutrição, reposicionamento/alívio de pressão, dor e umidade (incontinência)",
          "Somente a cobertura a ser usada",
          "Somente a presença de odor",
        ],
        correct: 1,
        explanation:
          "A ferida é reflexo do paciente. Hiperglicemia prejudica a função de neutrófilos e a síntese de colágeno; desnutrição limita proteínas para reparo; sem alívio de pressão a causa persiste. O tratamento local não compensa fatores sistêmicos não controlados.",
      },
      {
        q: "ETAPA 2 — Interpretação tecidual: como interpretar o leito?",
        options: [
          "Ferida totalmente necrótica, requer desbridamento cirúrgico urgente",
          "Leito em cicatrização com tecido viável (granulação) e tecido desvitalizado (esfacelo) a ser removido",
          "Ferida epitelizada, não precisa de cobertura",
          "Ferida infectada por causa do esfacelo",
        ],
        correct: 1,
        explanation:
          "Granulação indica fase proliferativa ativa; o esfacelo é o “T” do TIME — tecido não viável que precisa ser removido, aqui por autólise favorecida por meio úmido controlado. Esfacelo, isoladamente, não é sinônimo de infecção.",
      },
      {
        q: "ETAPA 3 — Análise do exsudato: o que o exsudato seroso abundante com maceração indica?",
        options: [
          "Que a ferida precisa receber mais umidade",
          "Desequilíbrio de umidade por excesso: necessidade de maior absorção e proteção da pele perilesional",
          "Infecção confirmada",
          "Que o curativo deve ser mantido fechado por 7 dias",
        ],
        correct: 1,
        explanation:
          "O exsudato crônico em excesso contém proteases (MMPs) que degradam matriz e lesam a pele ao redor. A maceração mostra que a capacidade de absorção atual é insuficiente. É necessário cobertura de alta absorção e protetor cutâneo (película/barreira) nas bordas.",
      },
      {
        q: "ETAPA 4 — Seleção da cobertura: qual combinação é mais apropriada?",
        options: [
          "Hidrogel + filme de poliuretano",
          "Hidrofibra ou alginato preenchendo a cavidade + espuma de poliuretano como secundária, com protetor cutâneo perilesional",
          "Hidrocoloide placa oclusivo",
          "Gaze seca trocada uma vez ao dia",
        ],
        correct: 1,
        explanation:
          "Cavidade com alto exsudato requer preenchimento com material absorvente e gelificante (hidrofibra ou alginato) e cobertura secundária absorvente (espuma). Hidrogel e hidrocoloide adicionariam umidade/oclusão; gaze seca adere e não controla exsudato. A escolha final é do enfermeiro, conforme avaliação.",
      },
      {
        q: "ETAPA 5 — Justificativa: qual argumento justifica corretamente a escolha?",
        options: [
          "A prata deve ser usada em toda lesão por pressão",
          "Hidrogel é sempre a melhor opção para esfacelo",
          "O material gelifica e retém o exsudato, mantém umidade equilibrada para autólise do esfacelo e protege as bordas da maceração, sem antimicrobiano por ausência de sinais de infecção",
          "Quanto mais seca a ferida, mais rápido ela cicatriza",
        ],
        correct: 2,
        explanation:
          "A justificativa integra os achados: exsudato abundante (absorção/gelificação), esfacelo (autólise em meio úmido), maceração (retenção vertical + protetor), ausência de infecção (antimicrobiano não indicado). Nenhuma cobertura é universal: a decisão depende da avaliação completa e é reavaliada a cada troca.",
      },
    ],
  },
];

PHASES.push(ADVANCED_PHASE);

export const TOTAL_QUESTIONS = PHASES.reduce((s, p) => s + p.questions.length, 0);

export const SCIENCE: { title: string; text: string }[] = [
  { title: "Cicatrização por fases", text: "1) Hemostasia: vasoconstrição, agregação plaquetária e formação do coágulo de fibrina, que libera fatores de crescimento (PDGF, TGF-β). 2) Inflamação: neutrófilos e macrófagos limpam o leito; os macrófagos coordenam a transição para o reparo. 3) Proliferação: fibroblastos, angiogênese, granulação, contração por miofibroblastos e epitelização. 4) Remodelação: o colágeno tipo III é substituído pelo tipo I; pode durar até 2 anos, e a cicatriz atinge ~80% da força original." },
  { title: "Tecido de granulação", text: "Tecido vermelho, granular e úmido formado por novos capilares, fibroblastos e matriz extracelular. Indica fase proliferativa. Granulação pálida pode indicar má perfusão; granulação friável, escura ou exuberante pode sugerir infecção ou desequilíbrio local." },
  { title: "Epitelização", text: "Migração, proliferação e diferenciação de queratinócitos a partir das bordas e anexos. Ocorre até duas vezes mais rápido em ambiente úmido do que sob crosta seca. É frágil: protegê-la de trauma e adesivos agressivos." },
  { title: "Desbridamento autolítico", text: "Processo seletivo em que enzimas proteolíticas e fagócitos do próprio organismo degradam tecido desvitalizado, favorecido por meio úmido (hidrogel, hidrocoloide). É indolor e seletivo, porém lento. Contraindicado em escara estável de membro isquêmico e em infecções graves." },
  { title: "Controle de umidade", text: "O meio úmido equilibrado favorece migração celular, ação de fatores de crescimento e autólise. Excesso de exsudato causa maceração e acúmulo de proteases; déficit causa ressecamento e morte celular. A cobertura deve doar, manter ou absorver umidade conforme o leito." },
  { title: "Absorção e gelificação", text: "Hidrocoloides, alginatos e hidrofibras interagem com o exsudato formando gel. A hidrofibra retém o fluido nas fibras (absorção vertical), reduzindo o espalhamento lateral. A espuma absorve por capilaridade em sua estrutura porosa e permite troca de vapor." },
  { title: "Troca iônica do alginato", text: "O alginato de cálcio, derivado de algas marrons, troca íons Ca²⁺ por Na⁺ do exsudato, convertendo-se em alginato de sódio — um gel solúvel. O cálcio liberado participa da cascata da coagulação, conferindo ação hemostática em pequenos sangramentos." },
  { title: "Mecanismo antimicrobiano da prata", text: "Íons Ag⁺ ligam-se a grupos tiol de enzimas e proteínas, danificam membranas e paredes celulares e interferem no DNA, com amplo espectro de ação. Indicada por tempo limitado em feridas com infecção local ou biofilme; uso indiscriminado não é recomendado. PHMB e iodo são outras opções antissépticas com mecanismos distintos." },
  { title: "Adsorção pelo carvão ativado", text: "O carvão ativado possui microporos com enorme área de superfície. As moléculas odoríferas (aminas e ácidos graxos voláteis) e bactérias aderem à superfície (adsorção, não absorção). Útil em feridas fétidas, como lesões oncológicas." },
  { title: "Terapia por pressão negativa", text: "Aplicação de pressão subatmosférica controlada (geralmente −80 a −125 mmHg) por meio de espuma e película selada. Remove exsudato, reduz edema, aproxima bordas (macrodeformação), estimula proliferação celular (microdeformação) e granulação. Contraindicada em malignidade no leito, necrose não desbridada, osteomielite não tratada e vasos expostos. Exige vigilância para sangramento." },
  { title: "Avaliação TIME", text: "Estrutura para o preparo do leito: T – Tecido não viável (remover); I – Infecção/Inflamação (controlar carga microbiana); M – Moisture (equilibrar umidade); E – Edge (bordas que não avançam). Sempre integrada à avaliação da etiologia, perfusão e condição clínica do paciente." },
];
