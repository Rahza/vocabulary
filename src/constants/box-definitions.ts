export interface BoxDefinition {
  index: number;
  icon: string;
  name: string;
  description: string;
}

export const BOX_DEFINITIONS: Record<number, BoxDefinition> = {
  1: {
    index: 1,
    icon: "🌱",
    name: "Keimling",
    description: "Ganz neu in der Sammlung",
  },
  2: {
    index: 2,
    icon: "🌿",
    name: "Setzling",
    description: "Erste Wiederholungen geschafft",
  },
  3: {
    index: 3,
    icon: "🌳",
    name: "Jungbaum",
    description: "Festigt sich im Gedächtnis",
  },
  4: {
    index: 4,
    icon: "🏰",
    name: "Erfahren",
    description: "Langzeitgedächtnis erreicht",
  },
  5: {
    index: 5,
    icon: "🏆",
    name: "Meister",
    description: "Dauerhaft gemerkt",
  },
};
