import React, { useState } from 'react';
import { useAppState } from '../contexts/AppStateContext';
import { FiXCircle } from 'react-icons/fi'; // Importando ícone de fechamento

const ResultsPopup: React.FC = () => {
    const { state } = useAppState();
    const { pageData } = state;

    const [isVisible, setIsVisible] = useState(true);

    const isPage1Corrected = pageData['pagina1']?.isCorrected ?? false;
    const isPage2Corrected = pageData['pagina2']?.isCorrected ?? false;
    const shouldShowPopup = isPage1Corrected && isPage2Corrected && isVisible;

    const handleClose = () => setIsVisible(false);

    const totalScore = Object.values(pageData).reduce((acc, currentPage: any) => acc + (currentPage.score || 0), 0);

    if (!shouldShowPopup) return null;

    return (
        <div className="fixed bg-[#39a3cc] top-1/2 left-1/2 w-60 h-48 transform -translate-x-1/2 -translate-y-1/2 rounded-lg shadow-lg z-50 p-4 flex flex-col justify-between">

            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-800">Results</h2>
                <button
                    onClick={handleClose}
                    className="text-gray-500 hover:text-gray-700 transition-colors duration-150"
                    aria-label="Close results popup">
                    <FiXCircle className="text-3xl" color='red'/>
                </button>
            </div>
            <div className="flex flex-col items-center justify-center">
                <p className="text-3xl text-white">Your score: {Number(totalScore)}</p>
            </div>
        </div>
    );
};

export default ResultsPopup;
