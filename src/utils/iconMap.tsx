// iconMap.tsx
import {
    TbLetterA, TbLetterB, TbLetterC, TbLetterD, TbLetterE,
    TbLetterF, TbLetterG, TbLetterH, TbLetterI, TbLetterJ,
    TbLetterK, TbLetterL, TbLetterM, TbLetterN, TbLetterO,
    TbLetterP, TbLetterQ, TbLetterR, TbLetterS, TbLetterT,
    TbLetterU, TbLetterV, TbLetterW, TbLetterX, TbLetterY,
    TbLetterZ
} from "react-icons/tb";

type IconMap = {
    [key: string]: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const iconMap: IconMap = {
    'A': TbLetterA,
    'B': TbLetterB,
    'C': TbLetterC,
    'D': TbLetterD,
    'E': TbLetterE,
    'F': TbLetterF,
    'G': TbLetterG,
    'H': TbLetterH,
    'I': TbLetterI,
    'J': TbLetterJ,
    'K': TbLetterK,
    'L': TbLetterL,
    'M': TbLetterM,
    'N': TbLetterN,
    'O': TbLetterO,
    'P': TbLetterP,
    'Q': TbLetterQ,
    'R': TbLetterR,
    'S': TbLetterS,
    'T': TbLetterT,
    'U': TbLetterU,
    'V': TbLetterV,
    'W': TbLetterW,
    'X': TbLetterX,
    'Y': TbLetterY,
    'Z': TbLetterZ,
};

export default iconMap;
