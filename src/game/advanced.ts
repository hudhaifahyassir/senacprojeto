import f7 from "@/assets/fase7.jpg";
import type { Phase } from "./data";

/**
 * Fase 7 — 12 casos clínicos avançados, em dificuldade progressiva.
 * Em todos os casos a alternativa correta é o índice 0 (as alternativas são embaralhadas na tela).
 * `whyWrong` acompanha a ordem de `options`; a posição da correta fica vazia.
 */
export const ADVANCED_PHASE: Phase = {
  id: 7,
  title: "Casos Clínicos Avançados",
  subtitle: "Raciocínio clínico de alto nível",
  objective:
    "Integrar etiologia, perfusão, leito, exsudato, bordas e sinais sistêmicos para decidir a conduta segura — incluindo quando interromper o procedimento e acionar o enfermeiro.",
  caseText:
    "Plantão de referência em feridas. Doze pacientes, do caso mais simples ao mais crítico. Leia cada ficha clínica com atenção: aqui, o tempo por desafio é maior, mas o raciocínio exigido também.",
  image: f7,
  time: 90,
  questions: [
    {
      caseInfo: {
        patient: "Rafael, 34 anos",
        context: "12º dia de pós-operatório de apendicectomia; ferida deixada para cicatrizar por segunda intenção após abscesso de parede tratado. Sem comorbidades.",
        location: "Fossa ilíaca direita",
        bed: "100% tecido de granulação vermelho vivo, brilhante, úmido; 4 x 2 cm, 0,5 cm de profundidade",
        exudate: "Seroso, pequena quantidade",
        edges: "Regulares, aderidas, com halo rosado de epitelização",
        signs: "Sem dor importante, sem eritema ou calor. Afebril, sinais vitais normais.",
      },
      q: "Granulação saudável — qual conduta favorece a continuidade da cicatrização?",
      options: [
        "Irrigar com SF 0,9% morno sem friccionar o leito e aplicar cobertura não aderente que mantenha a umidade, conforme prescrição",
        "Limpar com PVPI diariamente para prevenir infecção",
        "Cobrir com gaze seca para que a ferida “respire” e seque",
        "Aplicar cobertura com prata de forma preventiva até o fechamento",
      ],
      correct: 0,
      explanation:
        "Granulação vermelho vivo, exsudato baixo e bordas com epitelização indicam fase proliferativa ativa e carga microbiana controlada. O objetivo é proteger: irrigação suave remove debris sem lesar os capilares neoformados, e a cobertura não aderente (ex.: interface de silicone ou espuma fina) mantém o meio úmido que acelera a migração de queratinócitos e evita trauma na troca.",
      whyWrong: [
        "",
        "Antissépticos como PVPI são citotóxicos para fibroblastos e queratinócitos e não têm indicação rotineira em ferida limpa e granulada; atrasam a cicatrização.",
        "A gaze seca adere ao leito: na remoção arranca granulação e epitélio novo, causa dor e sangramento. O ressecamento também inibe a migração celular.",
        "Antimicrobianos tópicos são reservados para infecção local ou biofilme, por tempo limitado. Usá-los sem indicação aumenta custo e exposição desnecessária, sem benefício.",
      ],
    },
    {
      caseInfo: {
        patient: "Juliana, 22 anos",
        context: "Escaldadura com água quente há 3 horas. Já realizou resfriamento com água corrente em temperatura ambiente por 20 minutos no domicílio.",
        location: "Face anterior do antebraço esquerdo, cerca de 2% da superfície corporal",
        bed: "Pele rosada a avermelhada, úmida, muito dolorosa, com duas pequenas flictenas íntegras",
        exudate: "Seroso, pequena quantidade nas áreas desepitelizadas",
        edges: "Bem delimitadas",
        signs: "Dor 7/10. Sem lesão em face, mãos ou articulações. Sinais vitais estáveis.",
      },
      q: "Queimadura superficial — qual é a conduta mais adequada?",
      options: [
        "Limpar suavemente com SF 0,9%, aplicar cobertura não aderente que mantenha umidade conforme prescrição, administrar analgesia prescrita e manter as flictenas pequenas íntegras até avaliação do enfermeiro",
        "Aplicar gelo diretamente sobre a lesão para aliviar a dor",
        "Aplicar manteiga ou creme dental para “tirar o calor” da pele",
        "Romper todas as flictenas e esfregar o leito com gaze para remover a pele solta",
      ],
      correct: 0,
      explanation:
        "Queimaduras superficiais (epiderme e derme superficial) cicatrizam por epitelização a partir dos anexos cutâneos preservados, desde que o leito seja protegido de ressecamento, infecção e trauma. Coberturas não aderentes reduzem a dor nas trocas. Flictenas pequenas e íntegras funcionam como cobertura biológica; a conduta sobre elas segue protocolo institucional e avaliação do enfermeiro.",
      whyWrong: [
        "",
        "O gelo causa vasoconstrição intensa e pode aprofundar a lesão por lesão térmica pelo frio, além de risco de hipotermia em áreas extensas.",
        "Substâncias caseiras não são estéreis, retêm calor, aumentam o risco de infecção e dificultam a avaliação da profundidade.",
        "Romper flictenas e friccionar expõe a derme, aumenta a dor e o risco de infecção e traumatiza o epitélio em regeneração.",
      ],
    },
    {
      caseInfo: {
        patient: "Sr. Aurélio, 81 anos",
        context: "Acamado, incontinência urinária e fecal. Lesão por pressão em tratamento com espuma, trocada a cada 4 dias.",
        location: "Região sacral",
        bed: "Lesão por pressão categoria 2, rasa, rosada, 3 x 2 cm",
        exudate: "Moderado; a espuma está totalmente saturada no momento da troca",
        edges: "Esbranquiçadas, enrugadas e amolecidas",
        signs: "Pele perilesional macerada em 1 cm ao redor. Sem sinais de infecção. Afebril.",
      },
      q: "Maceração — qual conduta é a mais apropriada?",
      options: [
        "Proteger a pele perilesional com película barreira sem álcool, comunicar a saturação ao enfermeiro para reavaliar a frequência de troca e a capacidade absortiva da cobertura, e intensificar o manejo da incontinência",
        "Trocar a espuma por hidrogel para acalmar a pele",
        "Secar a pele com secador de cabelo antes do curativo",
        "Aplicar talco ou amido de milho para absorver a umidade",
      ],
      correct: 0,
      explanation:
        "Maceração é sinal de desequilíbrio de umidade (“M” do TIME): o exsudato e a umidade da incontinência ultrapassam a capacidade da cobertura. A pele macerada perde função de barreira e a lesão tende a aumentar. A conduta atua nas causas — absorção e intervalo de troca — e protege a pele com barreira de polímero sem álcool, que não arde e forma película contra a umidade.",
      whyWrong: [
        "",
        "O hidrogel doa umidade: em um leito já com excesso, agrava a maceração.",
        "O calor do secador pode queimar uma pele frágil e resseca de forma descontrolada; não trata a causa.",
        "Pós formam grumos com o exsudato, retêm umidade e bactérias e podem contaminar o leito.",
      ],
    },
    {
      caseInfo: {
        patient: "Sra. Neusa, 69 anos",
        context: "Internada em UTI há 5 dias, sedada, em ventilação mecânica, com uso de vasopressor.",
        location: "Calcâneo direito",
        bed: "Pele intacta, área arroxeada/marrom, não branqueável, com pequena flictena de conteúdo sanguinolento",
        exudate: "Ausente",
        edges: "Área mal delimitada, endurecida e mais fria que a pele adjacente",
        signs: "Sinais vitais em suporte. Sem febre.",
      },
      q: "Suspeita de lesão por pressão tissular profunda — qual conduta é a correta?",
      options: [
        "Retirar totalmente a pressão do calcâneo (calcanhar “flutuando”, com apoio sob a panturrilha), não massagear, manter a flictena íntegra e comunicar o enfermeiro para avaliação e registro",
        "Massagear a área para melhorar a circulação local",
        "Romper a flictena e aplicar hidrocoloide",
        "Aplicar bolsa de água morna para reativar a circulação",
      ],
      correct: 0,
      explanation:
        "Pele intacta, roxa ou marrom e não branqueável, com flictena sanguinolenta, sugere lesão tissular profunda: dano em tecidos profundos por pressão e cisalhamento, que pode evoluir rapidamente para perda total da pele. Pacientes críticos com vasopressor têm alto risco. A prioridade é eliminar a pressão e proteger a área; o enfermeiro avalia, classifica e planeja.",
      whyWrong: [
        "",
        "A massagem em área de lesão por pressão aumenta o dano tecidual por cisalhamento sobre tecidos já isquêmicos; é contraindicada.",
        "Romper a flictena expõe tecido comprometido e aumenta o risco de infecção; hidrocoloide oclusivo não alivia a pressão, que é a causa.",
        "Calor aumenta a demanda metabólica de um tecido já isquêmico e pode causar queimadura em pele sem sensibilidade.",
      ],
    },
    {
      caseInfo: {
        patient: "Sra. Odete, 66 anos",
        context: "Insuficiência venosa crônica, varizes e edema que piora ao fim do dia. O enfermeiro registrou índice tornozelo-braquial (ITB) de 0,95 e prescreveu terapia compressiva.",
        location: "Terço distal medial da perna esquerda (região do maléolo medial)",
        bed: "Raso, granulação com fina camada de fibrina; 7 x 5 cm",
        exudate: "Seroso, abundante",
        edges: "Irregulares; pele ao redor com dermatite ocre e endurecimento (lipodermatoesclerose)",
        signs: "Dor que melhora com a elevação da perna. Pulsos pediosos palpáveis. Sem sinais de infecção.",
      },
      q: "Úlcera venosa — qual conduta trata a causa da lesão?",
      options: [
        "Aplicar cobertura absorvente conforme prescrição, realizar a terapia compressiva prescrita e orientar elevação dos membros e caminhadas",
        "Orientar repouso com a perna pendente para diminuir a dor",
        "Evitar qualquer compressão, pois ela sempre causa isquemia",
        "Ocluir com hidrocoloide e trocar apenas a cada 7 dias",
      ],
      correct: 0,
      explanation:
        "A hipertensão venosa causa edema, extravasamento de fibrina e hemossiderina (dermatite ocre) e hipóxia tecidual. A compressão é a base do tratamento: reduz o edema, melhora o retorno venoso e a microcirculação. Só é segura após confirmar perfusão arterial adequada — aqui o ITB de 0,95 está registrado. A cobertura controla o exsudato abundante.",
      whyWrong: [
        "",
        "A perna pendente aumenta a pressão venosa e o edema, piorando a úlcera. Dor que melhora com elevação é típica da etiologia venosa.",
        "A compressão só é contraindicada quando há doença arterial significativa. Com ITB normal, deixar de comprimir significa não tratar a causa.",
        "Hidrocoloide é oclusivo e não suporta exsudato abundante: há vazamento, maceração e piora da pele perilesional.",
      ],
    },
    {
      caseInfo: {
        patient: "Sr. Valter, 59 anos",
        context: "Linfedema crônico em membro inferior direito. Edema importante, pele espessada.",
        location: "Face anterior da perna direita",
        bed: "Raso, granulação, 6 x 4 cm",
        exudate: "Aquoso, muito abundante; escorre pela perna e satura 6 camadas de gaze em poucas horas",
        edges: "Regulares; pele perilesional iniciando maceração",
        signs: "Sem eritema, calor ou febre.",
      },
      q: "Exsudato excessivo — qual conduta é a mais adequada?",
      options: [
        "Usar cobertura de alta capacidade de absorção (espuma ou superabsorvente), proteger a pele perilesional e comunicar o enfermeiro para manejo do edema, que é a causa do exsudato",
        "Aumentar as camadas de gaze e trocar sempre que encharcar",
        "Cobrir com filme de poliuretano para conter o líquido",
        "Aplicar hidrogel para equilibrar a umidade",
      ],
      correct: 0,
      explanation:
        "O excesso de exsudato aqui vem do edema linfático. Coberturas superabsorventes ou espumas de alta absorção retêm o fluido longe da pele e mantêm umidade adequada no leito. Como o volume é causado pelo edema, o enfermeiro deve avaliar seu controle (por exemplo, compressão após avaliação vascular). Proteger a pele evita maceração e dermatite.",
      whyWrong: [
        "",
        "Gaze espalha o exsudato para os lados (pele ao redor), satura rápido, permite que o líquido atravesse até a superfície (porta para bactérias) e exige trocas frequentes, que resfriam o leito.",
        "O filme não tem absorção: o líquido acumula sob ele, descola o filme e macera a pele.",
        "O hidrogel doa umidade; em uma ferida com excesso de líquido, piora a maceração.",
      ],
    },
    {
      caseInfo: {
        patient: "Sr. Hélio, 70 anos",
        context: "Paraplégico, lesão por pressão categoria 4 em tratamento. Nutrição sendo ajustada pela equipe.",
        location: "Região isquiática esquerda",
        bed: "Cavidade de 5 x 4 cm, 3 cm de profundidade, granulação no fundo; túnel de 4 cm na direção das 12 horas",
        exudate: "Seroso, moderado",
        edges: "Bordas regulares, sem descolamento além do túnel",
        signs: "Sem odor, sem eritema. Sem febre. Sem exposição óssea visível.",
      },
      q: "Ferida cavitária com túnel — qual técnica é a correta?",
      options: [
        "Preencher o espaço morto e o túnel de forma frouxa com cobertura absorvente em fita (ex.: alginato ou hidrofibra), deixando uma ponta visível, registrar a quantidade inserida e aplicar cobertura secundária",
        "Compactar firmemente o material dentro da cavidade para estimular a granulação",
        "Cobrir apenas a superfície, sem preencher, para não traumatizar o fundo",
        "Preencher com vários pedaços de gaze cortados",
      ],
      correct: 0,
      explanation:
        "Feridas cavitárias precisam cicatrizar do fundo para a superfície. Preencher o espaço morto evita acúmulo de exsudato, formação de abscesso e fechamento “em ponte” da superfície. O preenchimento deve ser frouxo para não comprimir o leito. A peça única com ponta visível e o registro da quantidade garantem que nada fique esquecido.",
      whyWrong: [
        "",
        "Compactar aumenta a pressão sobre o leito, causa isquemia, dor e dano à granulação.",
        "Sem preenchimento, a superfície pode fechar antes do fundo, formando um espaço morto com acúmulo de exsudato e risco de abscesso.",
        "Pedaços soltos e fiapos de gaze podem ficar esquecidos no túnel e agir como corpo estranho, mantendo inflamação e infecção.",
      ],
    },
    {
      caseInfo: {
        patient: "Sra. Marta, 52 anos",
        context: "5º dia de pós-operatório de laparotomia. Obesa. Teve crise de tosse há alguns minutos e sentiu “algo se abrir”.",
        location: "Incisão mediana abdominal",
        bed: "Pontos rompidos, abertura de cerca de 8 cm com visualização de alças intestinais",
        exudate: "Grande quantidade de líquido serossanguinolento rosado",
        edges: "Separadas ao longo de toda a abertura",
        signs: "Paciente ansiosa, FC 104 bpm, PA 128/80 mmHg.",
      },
      q: "Ferida cirúrgica com evisceração — qual é a conduta imediata?",
      options: [
        "Interromper o procedimento, cobrir as alças com compressa estéril umedecida em SF 0,9%, manter a paciente em repouso no leito com cabeceira levemente elevada e joelhos fletidos, em jejum, e acionar imediatamente o enfermeiro e o médico",
        "Recolocar delicadamente as alças na cavidade com luva estéril",
        "Cobrir com gaze seca, fixar com esparadrapo e reavaliar no próximo curativo",
        "Aplicar alginato de cálcio para conter o sangramento e terminar o curativo",
      ],
      correct: 0,
      explanation:
        "Saída de líquido serossanguinolento abundante após esforço, com visualização de vísceras, indica deiscência com evisceração — emergência cirúrgica. Cobrir com compressa estéril úmida evita ressecamento e contaminação das alças; a posição com joelhos fletidos reduz a tensão abdominal; jejum prepara para possível reintervenção. Não é situação para o técnico resolver sozinho: o procedimento é interrompido e a equipe acionada.",
      whyWrong: [
        "",
        "Recolocar as vísceras é intervenção médica cirúrgica; manipulá-las pode lesar alças, contaminar a cavidade e atrasar o tratamento correto.",
        "A gaze seca adere e resseca as alças, e adiar a avaliação de uma emergência cirúrgica coloca a paciente em risco grave.",
        "Não se trata de sangramento a conter: é deiscência com evisceração. Finalizar o curativo atrasa a avaliação médica urgente.",
      ],
    },
    {
      caseInfo: {
        patient: "Sr. Benedito, 75 anos",
        context: "Lesão por pressão categoria 4. Usa anticoagulante (varfarina). O enfermeiro prescreveu hidrogel para desbridamento autolítico.",
        location: "Região trocantérica direita",
        bed: "50% de tecido necrótico amarelo-acinzentado amolecido, 50% de granulação; 6 x 5 cm",
        exudate: "Moderado, levemente turvo",
        edges: "Regulares, sem descolamento",
        signs: "Durante a limpeza, você percebe que grandes partes da necrose se soltam facilmente com a pinça. Sem febre, sinais vitais estáveis.",
      },
      q: "Tecido necrótico — qual é a conduta correta para o técnico de enfermagem?",
      options: [
        "Não realizar remoção instrumental do tecido; manter a irrigação suave e a cobertura prescrita, registrar o achado e comunicar o enfermeiro para que ele avalie o desbridamento, considerando o risco de sangramento pela anticoagulação",
        "Remover o tecido com tesoura e pinça, aproveitando que está solto",
        "Esfregar o leito com gaze até retirar todo o tecido amarelado",
        "Suspender o hidrogel por conta própria e aplicar cobertura com prata",
      ],
      correct: 0,
      explanation:
        "Remover tecido desvitalizado acelera a cicatrização, mas o desbridamento instrumental conservador é competência do enfermeiro capacitado (e o cirúrgico, do médico), após avaliação. Em paciente anticoagulado, a remoção pode causar sangramento importante. O desbridamento autolítico prescrito continua agindo: enzimas endógenas liquefazem o tecido em meio úmido, de forma seletiva e segura.",
      whyWrong: [
        "",
        "O desbridamento instrumental está fora da competência do técnico e, no paciente anticoagulado, pode causar hemorragia e lesão de tecido viável.",
        "A fricção mecânica não é seletiva: traumatiza a granulação adjacente, causa dor e sangramento.",
        "Mudar a cobertura prescrita não é atribuição do técnico, e não há sinais de infecção que justifiquem antimicrobiano.",
      ],
    },
    {
      caseInfo: {
        patient: "Sr. Osvaldo, 63 anos",
        context: "Úlcera em perna há 8 semanas, em tratamento adequado, com etiologia definida e perfusão adequada. Sem melhora nas últimas 4 semanas.",
        location: "Face lateral da perna esquerda",
        bed: "Camada brilhante, gelatinosa, amarelo-esbranquiçada que se refaz 24–48 h após a limpeza; granulação pálida e friável por baixo",
        exudate: "Aumentou progressivamente; moderado",
        edges: "Paradas, sem avanço da epitelização",
        signs: "Sem eritema em expansão, sem febre. Leve aumento de odor.",
      },
      q: "Biofilme suspeito — qual é a conduta mais apropriada?",
      options: [
        "Registrar os achados com detalhes e comunicar o enfermeiro: ferida estagnada com sinais sugestivos de biofilme exige reavaliação do plano (limpeza terapêutica, desbridamento e antimicrobiano tópico por tempo limitado)",
        "Manter exatamente o mesmo tratamento, pois a ferida não tem sinais de infecção",
        "Trocar a cobertura por uma com prata por conta própria",
        "Orientar o paciente a usar antibiótico oral que sobrou de outro tratamento",
      ],
      correct: 0,
      explanation:
        "Biofilmes são comunidades de microrganismos protegidas por uma matriz que as torna muito resistentes a antimicrobianos e às defesas do corpo. Pistas: ferida que não melhora com tratamento adequado, película gelatinosa que se refaz rapidamente, granulação friável e aumento do exsudato. O manejo combina limpeza com solução que desorganiza o biofilme (ex.: PHMB com surfactante), desbridamento e antimicrobiano tópico por tempo definido — plano que o enfermeiro avalia e prescreve.",
      whyWrong: [
        "",
        "Uma ferida sem melhora após cerca de 4 semanas de tratamento adequado deve ser reavaliada; manter o plano perpetua a estagnação.",
        "Embora antimicrobianos possam fazer parte do plano, a escolha e a duração são decisões do enfermeiro após avaliação, junto com limpeza e desbridamento.",
        "Automedicação com antibiótico é perigosa: dose e tipo inadequados favorecem resistência, e antibióticos orais isolados têm pouco efeito sobre biofilme.",
      ],
    },
    {
      caseInfo: {
        patient: "Sr. Ernesto, 78 anos",
        context: "Tabagista, hipertenso, doença arterial obstrutiva periférica. No prontuário há uma prescrição antiga de terapia compressiva para “edema”.",
        location: "Hálux e dorso do pé direito",
        bed: "Pálido, seco, com necrose seca e preta na ponta do hálux; lesão “em saca-bocado”",
        exudate: "Ausente",
        edges: "Bem delimitadas, pálidas",
        signs: "Pé frio, pulsos pediosos e tibiais não palpáveis, pele brilhante sem pelos, dor intensa em repouso que piora à noite e melhora com o pé pendente.",
      },
      q: "Lesão isquêmica — qual é a conduta segura?",
      options: [
        "Não aplicar a compressão, interromper o procedimento, manter a necrose seca e protegida e comunicar imediatamente o enfermeiro para reavaliação da prescrição e avaliação vascular",
        "Aplicar a terapia compressiva prescrita para reduzir o edema",
        "Aplicar hidrogel para amolecer a necrose do hálux",
        "Elevar o membro acima do nível do coração para aliviar a dor",
      ],
      correct: 0,
      explanation:
        "Pulsos ausentes, pé frio, pele brilhante sem pelos, dor em repouso que alivia com o pé pendente e necrose seca são sinais de isquemia crítica. A compressão diminui ainda mais o fluxo arterial e pode levar à perda do membro. A necrose seca em membro isquêmico deve ficar seca e estável até a avaliação vascular. Uma prescrição incompatível com o quadro atual deve ser questionada antes de ser executada.",
      whyWrong: [
        "",
        "A compressão está contraindicada na doença arterial grave: reduz a perfusão e pode causar necrose e amputação.",
        "Hidratar necrose seca em membro sem fluxo transforma uma escara estável em necrose úmida, com alto risco de infecção grave.",
        "Elevar um membro isquêmico reduz ainda mais o fluxo arterial e piora a dor; por isso o paciente sente alívio com o pé pendente.",
      ],
    },
    {
      caseInfo: {
        patient: "Sr. Gilberto, 61 anos",
        context: "Diabetes tipo 2 mal controlado. Úlcera no pé há 3 semanas. Hoje está sonolento e confuso.",
        location: "Região plantar, sob a cabeça do 1º metatarso direito",
        bed: "Esfacelo e granulação escurecida e friável; 3 x 3 cm",
        exudate: "Purulento, moderado, com odor fétido",
        edges: "Endurecidas; eritema de 4 cm ao redor, calor e edema subindo pelo dorso do pé",
        signs: "T 38,7 °C, FC 116 bpm, FR 24 irpm, PA 88/56 mmHg, glicemia capilar 342 mg/dL.",
      },
      q: "Infecção com sinais sistêmicos — qual é a conduta prioritária?",
      options: [
        "Interromper o curativo cobrindo a ferida provisoriamente, verificar e registrar os sinais vitais e comunicar imediatamente o enfermeiro: há sinais de infecção grave com possível sepse",
        "Concluir o curativo com cobertura de prata e comunicar a equipe na passagem de plantão",
        "Aplicar compressas quentes para ajudar a drenar a secreção",
        "Oferecer um lanche e aguardar a próxima glicemia antes de comunicar",
      ],
      correct: 0,
      explanation:
        "Infecção local (pus, odor, eritema maior que 2 cm, calor, edema) associada a febre, taquicardia, taquipneia, hipotensão e alteração do nível de consciência sugere sepse — situação com risco de vida em que cada hora conta. O tratamento é sistêmico (antibioticoterapia, avaliação cirúrgica e suporte hemodinâmico) e depende de avaliação imediata da equipe. Nenhuma cobertura trata infecção sistêmica.",
      whyWrong: [
        "",
        "Adiar a comunicação até a passagem de plantão atrasa o tratamento da sepse e aumenta a mortalidade; a prata não age em infecção sistêmica.",
        "Calor aumenta o edema e a demanda metabólica e pode queimar um pé com neuropatia diabética (sem sensibilidade). Não trata a infecção.",
        "A hiperglicemia aqui é consequência da infecção. Esperar e oferecer alimento atrasa a resposta a uma emergência e piora a glicemia.",
      ],
    },
  ],
};
