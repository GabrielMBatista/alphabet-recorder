import React, { useCallback } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import soundMap from '../utils/soundMap';

interface CustomAudioPlayerProps {
  audioSrc?: string;  // audioSrc agora é opcional
  letter: string;
  onAudioEnd: () => void;
  children: React.ReactNode;
}

const CustomAudioPlayer: React.FC<CustomAudioPlayerProps> = ({ audioSrc, letter, onAudioEnd, children }) => {
  const { dispatch } = useAppState();
  const playSound = useCallback(() => {
    // Se audioSrc não foi fornecido, tenta encontrar o áudio no estado ou no soundMap
    const audioToPlay = audioSrc || soundMap[letter];
    const audio = new Audio(audioToPlay);

    // Atualiza a letra atual no estado da aplicação
    dispatch({ type: 'SET_CURRENT_LETTER', payload: letter });

    // Toca o áudio e define o evento onended
    audio.play().then(() => {
      audio.onended = onAudioEnd;
    }).catch(error => console.error("Error playing the sound:", error));
  }, [audioSrc, letter, onAudioEnd, dispatch]);

  return (
    <div onClick={playSound}>
      {children}
    </div>
  );
};

export default CustomAudioPlayer;
