import React, { useEffect, useState } from 'react';
import { CustomTipCard } from '../assets/images';

interface CustomTipProps {
    buttonRef: React.RefObject<HTMLDivElement>;
    isOpen: boolean;
    type: string;
    setIsOpen: (isOpen: boolean) => void;
}

const tipsMap: { [key: string]: React.ReactNode[] | string } = {
    exclamation: [
        <span key="1">
            Ouça o som das letras. Depois, clique no botão (imagem do microfone) para repetir e gravar sua voz. Você poderá ganhar 10 pontos (100% das respostas corretas), 5 pontos (de 60% a 99% das respostas corretas) ou 0 pontos (menos de 60% das respostas corretas). Ao terminar a gravação, clique em “CHECK” para obter a correção. Após, escolha “TRY AGAIN” para tentar novamente ou “NEXT” para seguir em diante.
        </span>,
    ],
    question: [
        <span key="1">
            Listen and record your voice repeating the sound of the letters. Get 10 points (100% correct), 5 points (from 60% to 99% correct) or 0 points (less than 60% correct) here.
        </span>,
        <span key="2">
            <b>Bee:</b> Estas são as letras do alfabeto em inglês. Algumas letras são parecidas com o português <b>(M, N, P, B, F)</b>. Algumas letras são realmente diferentes. <b>(W, R, X, E, l, H, Q)</b>.
        </span>
    ],
    speaker: '',
    notes: ''
};

const CustomTip: React.FC<CustomTipProps> = ({ isOpen, type, buttonRef, setIsOpen }) => {
    const content = tipsMap[type];
    const [styles, setStyles] = useState({});

    useEffect(() => {
        function updatePosition() {
            if (isOpen && buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                let newTop = buttonRect.bottom + window.scrollY - 10;
                let newLeft = buttonRect.right + window.scrollX - 20;

                setStyles({
                    top: `${newTop}px`,
                    left: `${newLeft}px`,
                });
            }
        }

        updatePosition();
        window.addEventListener('resize', updatePosition);

        return () => window.removeEventListener('resize', updatePosition);
    }, [isOpen, buttonRef]);


    // Função para fechar o CustomTip se clicar fora
    useEffect(() => {
        const handleClickOutside = (event: any) => {
            if (isOpen && buttonRef.current && !buttonRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, buttonRef, setIsOpen]);

    if (!isOpen) return null;

    return (
        <div className="custom-tip" style={styles}>
            {Array.isArray(content) ? (
                content.map((item, index) => (
                    <p key={index} className="custom-tip-content">
                        {item}
                    </p>
                ))
            ) : (
                <p className="custom-tip-content">{content}</p>
            )}
        </div>
    );
};

export default CustomTip;
