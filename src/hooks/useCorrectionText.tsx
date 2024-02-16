import { useCallback, useContext } from 'react';
import { AppStateContext } from '../contexts/AppStateContext';

const useCorrectText = () => {
    const { state, dispatch } = useContext(AppStateContext);

    const correctAnswers: { [key: string]: string } = {
        "BBC": "bbc",
        "DIY": "diy",
        "HBO": "hbo",
        "USA": "usa",
        "YMCA": "ymca",
        "CNN": "cnn",
        "DJ": "dj",
        "MTV": "mtv",
        "BTS": "bts"
    };

    const checkAnswers = useCallback(() => {
        let correctCount = 0;
        state.userEntries.forEach((entry: { userEntry: string; abbreviation: string | number; }) => {
            if (entry.userEntry.trim().toUpperCase() === (correctAnswers[entry.abbreviation]?.toUpperCase() || '')) {
                correctCount++;
            }
        });

        // Calcula a pontuação com base no número de respostas corretas
        const totalEntries = Object.keys(correctAnswers).length;
        const accuracy = correctCount / totalEntries;
        let points = 0;
        if (accuracy === 1) { // 100% correto
            points = 5;
        } else if (accuracy >= 0.6) { // 60% a 99% correto
            points = 2;
        }

        // Atualiza a pontuação no estado global
        dispatch({
            type: 'SET_PAGE_DATA',
            payload: {
                pageId: 'pagina2',
                data: {
                    isCorrected: true,
                    score: points, 
                    check: true,
                },
            },
        });
    }, [state.userEntries, dispatch]);

    return { checkAnswers };
};

export default useCorrectText;
