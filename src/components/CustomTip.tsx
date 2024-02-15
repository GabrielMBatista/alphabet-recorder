import React, { useEffect, useState } from 'react'; // Importe useState e useEffect
import { CustomTipCard } from '../assets/images';

interface CustomTipProps {
    buttonRef: any,
    isOpen: boolean;
    type: string;
    page?: string;
    setIsOpen: (isOpen: boolean) => void;
}

const tipsMap: { [key: string]: React.ReactNode[] | string } = {
    exclamation: [
        <span key="1">
            Ouça o som das letras. depois, clique no botão (imagem do microfone) para repetir e gravar sua voz. Você poderá ganhar 10 pontos (100% das respostas corretas), 5 pontos (de 60% a 99% das respostas corretas) ou 0 pontos (menos de 60% das respostas corretas). Ao terminar a gravação, clique em “CHECK” para obter a correção. Após, escolha “TRY AGAIN” para tentar novamente ou “NEXT” para seguir em diante.
        </span>,
    ],
    question: [
        <span key="1">
            Listen and record your voice repeating the sound of the letters. Get 10 points (100% correct), 5 points (from 60% to 99% correct) or 0 points (less than 60% correct) here.
        </span>,
        <span key="2">
            <b>Bee:</b> Estas são as letras do alfabeto em inglês.
            Algumas letras são parecidas com o português
            <b> (M, N, P, B, F)</b>. Algumas letras são realmente
            diferentes. <b>(W, R, X, E, l, H, Q)</b>.
        </span>
    ],
    speaker: '',
    notes: ''
};


const CustomTip: React.FC<CustomTipProps> = ({ isOpen, type, buttonRef, page, setIsOpen }) => {
    const content = tipsMap[type];
    const [styles, setStyles] = useState({});

    useEffect(() => {
        if (isOpen && buttonRef.current) {
            const buttonRect = buttonRef.current.getBoundingClientRect();
            let newTop = buttonRect.top + window.scrollY;
            let newLeft = buttonRect.left + window.scrollX;
            let transformValues;

            // Ajustes baseados na largura da tela
            if (window.innerWidth < 1367) {
                transformValues = 'translateX(-84%) translateY(7%)';
            } else { // Para telas maiores
                transformValues = 'translateX(-79%) translateY(7%)';
            }

            setStyles({
                top: `${newTop}px`,
                left: `${newLeft}px`,
                transform: transformValues,
            });
        }
        // Função para verificar se o clique foi fora do CustomTip
        const handleClickOutside = (event: { target: any; }) => {
            if (isOpen && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen, buttonRef, window.innerWidth, window.innerHeight]);

    if (!isOpen) return null;

    return (
        <div className={`fixed z-40 mt-5 transition-transform duration-300 ease-in-out p-2 rounded-lg overflow-y-auto flex flex-col`}
            style={{
                ...styles,
                backgroundImage: `url(${CustomTipCard})`,
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                width: '38%',
                height: '40%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
            <div className="w-[370px] h-[240px]">
                {typeof content === 'string' ? (
                    <div className="text-white text-justify border-b border-white">
                        <p className='text-lg my-4'>{content}</p>
                    </div>
                ) : (
                    content.map((item, index) => (
                        <div className="text-white text-justify border-b-2 border-white" key={index}>
                            <p className='text-lg my-3'>{item}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CustomTip;
