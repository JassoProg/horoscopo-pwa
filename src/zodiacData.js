// Zodiac signs data with date ranges and descriptions
export const zodiacSigns = [
  {
    name: "Aries",
    startDate: { month: 3, day: 21 },
    endDate: { month: 4, day: 19 },
    element: "Fuego",
    description: "Los Aries son personas valientes, independientes y llenas de energía. Son líderes naturales que no temen enfrentar nuevos desafíos. Su entusiasmo y determinación los lleva a conseguir sus objetivos, aunque a veces pueden ser impulsivos.",
    traits: ["Valiente", "Independiente", "Entusiasta", "Competitivo"],
    image: "♈"
  },
  {
    name: "Tauro",
    startDate: { month: 4, day: 20 },
    endDate: { month: 5, day: 20 },
    element: "Tierra",
    description: "Los Tauro son personas estables, determinadas y leales. Valoran la seguridad y el confort, y son conocidos por su paciencia y perseverancia. Disfrutan de los placeres de la vida y son muy confiables.",
    traits: ["Leal", "Paciente", "Determinado", "Práctico"],
    image: "♉"
  },
  {
    name: "Géminis",
    startDate: { month: 5, day: 21 },
    endDate: { month: 6, day: 20 },
    element: "Aire",
    description: "Los Géminis son personas curiosas, versátiles y comunicativas. Tienen una mente rápida y les encanta aprender cosas nuevas. Son sociables y adaptables, aunque a veces pueden parecer indecisos.",
    traits: ["Curioso", "Comunicativo", "Adaptable", "Inteligente"],
    image: "♊"
  },
  {
    name: "Cáncer",
    startDate: { month: 6, day: 21 },
    endDate: { month: 7, day: 22 },
    element: "Agua",
    description: "Los Cáncer son personas emocionales, intuitivas y protectoras. Valoran profundamente la familia y el hogar. Son empáticos y cariñosos, siempre dispuestos a cuidar a sus seres queridos.",
    traits: ["Emocional", "Intuitivo", "Protector", "Familiar"],
    image: "♋"
  },
  {
    name: "Leo",
    startDate: { month: 7, day: 23 },
    endDate: { month: 8, day: 22 },
    element: "Fuego",
    description: "Los Leo son personas carismáticas, generosas y creativas. Les gusta ser el centro de atención y tienen un gran corazón. Son líderes naturales con mucha confianza en sí mismos y un espíritu dramático.",
    traits: ["Carismático", "Generoso", "Creativo", "Orgulloso"],
    image: "♌"
  },
  {
    name: "Virgo",
    startDate: { month: 8, day: 23 },
    endDate: { month: 9, day: 22 },
    element: "Tierra",
    description: "Los Virgo son personas analíticas, perfeccionistas y serviciales. Son muy detallistas y organizados, siempre buscando la manera de mejorar las cosas. Su naturaleza práctica los hace muy confiables.",
    traits: ["Analítico", "Perfeccionista", "Servicial", "Organizado"],
    image: "♍"
  },
  {
    name: "Libra",
    startDate: { month: 9, day: 23 },
    endDate: { month: 10, day: 22 },
    element: "Aire",
    description: "Los Libra son personas equilibradas, diplomáticas y justas. Buscan la armonía en todas las situaciones y tienen un gran sentido estético. Son sociables y les gusta mantener la paz en sus relaciones.",
    traits: ["Equilibrado", "Diplomático", "Justo", "Social"],
    image: "♎"
  },
  {
    name: "Escorpio",
    startDate: { month: 10, day: 23 },
    endDate: { month: 11, day: 21 },
    element: "Agua",
    description: "Los Escorpio son personas intensas, misteriosas y apasionadas. Tienen una gran fuerza de voluntad y no temen explorar los aspectos más profundos de la vida. Son muy leales pero también pueden ser celosos.",
    traits: ["Intenso", "Misterioso", "Apasionado", "Leal"],
    image: "♏"
  },
  {
    name: "Sagitario",
    startDate: { month: 11, day: 22 },
    endDate: { month: 12, day: 21 },
    element: "Fuego",
    description: "Los Sagitario son personas aventureras, optimistas y filosóficas. Les encanta viajar y explorar nuevas culturas. Son honestos y directos, siempre en busca de la verdad y nuevas experiencias.",
    traits: ["Aventurero", "Optimista", "Honesto", "Filosófico"],
    image: "♐"
  },
  {
    name: "Capricornio",
    startDate: { month: 12, day: 22 },
    endDate: { month: 1, day: 19 },
    element: "Tierra",
    description: "Los Capricornio son personas ambiciosas, disciplinadas y responsables. Trabajan duro para alcanzar sus metas y son muy perseverantes. Valoran la tradición y el status, y son excelentes líderes.",
    traits: ["Ambicioso", "Disciplinado", "Responsable", "Perseverante"],
    image: "♑"
  },
  {
    name: "Acuario",
    startDate: { month: 1, day: 20 },
    endDate: { month: 2, day: 18 },
    element: "Aire",
    description: "Los Acuario son personas innovadoras, independientes y humanitarias. Tienen ideas originales y les gusta luchar por causas justas. Son muy sociables pero también valoran su libertad personal.",
    traits: ["Innovador", "Independiente", "Humanitario", "Original"],
    image: "♒"
  },
  {
    name: "Piscis",
    startDate: { month: 2, day: 19 },
    endDate: { month: 3, day: 20 },
    element: "Agua",
    description: "Los Piscis son personas intuitivas, empáticas y creativas. Tienen una gran sensibilidad y conexión emocional con otros. Son soñadores y artísticos, pero a veces pueden ser demasiado sensibles.",
    traits: ["Intuitivo", "Empático", "Creativo", "Sensible"],
    image: "♓"
  }
];

// Function to determine zodiac sign from birth date
export const getZodiacSign = (birthDate) => {
  if (!birthDate) return null;
  
  const date = new Date(birthDate);
  const month = date.getMonth() + 1; // JavaScript months are 0-based
  const day = date.getDate();
  
  for (const sign of zodiacSigns) {
    const { startDate, endDate } = sign;
    
    // Handle signs that cross year boundary (like Capricorn)
    if (startDate.month > endDate.month) {
      if (
        (month === startDate.month && day >= startDate.day) ||
        (month === endDate.month && day <= endDate.day) ||
        (month > startDate.month || month < endDate.month)
      ) {
        return sign;
      }
    } else {
      // Normal case - sign doesn't cross year boundary
      if (
        (month === startDate.month && day >= startDate.day) ||
        (month === endDate.month && day <= endDate.day) ||
        (month > startDate.month && month < endDate.month)
      ) {
        return sign;
      }
    }
  }
  
  return null;
};

// Function to format date in dd/mm/yyyy
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Function to parse dd/mm/yyyy format to Date object
export const parseDate = (dateString) => {
  if (!dateString) return null;
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  
  const day = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  
  if (isNaN(day) || isNaN(month) || isNaN(year)) return null;
  if (month < 1 || month > 12) return null;
  if (day < 1 || day > 31) return null;
  
  return new Date(year, month - 1, day);
};