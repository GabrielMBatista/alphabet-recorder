import React from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiArrowRight, FiRefreshCw } from 'react-icons/fi';
import { useAppState } from '../contexts/AppStateContext';

interface RetryMenuProps {
    isOpen: boolean;
    pageId: string;
    setIsOpen: (isOpen: boolean) => void;
    handleCheckClick?: () => void;
    onReset?: () => void;
}


const RetryMenu: React.FC<RetryMenuProps> = ({ pageId, isOpen, setIsOpen, handleCheckClick, onReset }) => {
    const { dispatch } = useAppState();

    const handleTryAgain = () => {
        dispatch({ type: 'CLEAR_AUDIO_URLS' }); // Despacha a ação para zerar audioURLs
        dispatch({
            type: 'SET_PAGE_DATA',
            payload: {
                pageId: pageId,
                data: {
                    isCorrected: false,
                    score: 0,
                    check: false,
                },
            },
        });
        setIsOpen(false); // Fecha o menu
        onReset && onReset();
    };

    const handleCheck = () => {
        dispatch({
            type: 'SET_PAGE_DATA',
            payload: {
                pageId: pageId,
                data: {
                    check: true,
                },
            },
        });
        handleCheckClick && handleCheckClick()
    };

    return (
        <div className={`fixed bottom-20 right-0 z-40 h-fit w-fit transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out bg-[#39a3cc] p-5 rounded-l-lg  border-l-2 border-y-2 border-white`}>
            <div className="flex flex-col items-center justify-center">
                <div className="mb-3 w-full text-white py-2 px-4 flex items-center justify-end border-b border-white cursor-pointer hover:text-blue-200  flex items-center justify-end" onClick={handleCheck}>
                    CHECK  <FiCheckCircle className="mr-2 ml-2 text-3xl" />
                </div>
                <div className="mb-3 w-full text-white py-2 px-4 flex items-center justify-end border-b border-white">
                    <Link to="/about" className="hover:text-blue-200 cursor-pointer flex items-center justify-end">NEXT
                        <FiArrowRight className="mr-2 ml-2 text-3xl" />
                    </Link>
                </div>
                <div className="mb-3 w-full text-white py-2 px-4 flex items-center justify-end cursor-pointer hover:text-blue-200  flex items-center justify-end" onClick={handleTryAgain}>
                    TRY AGAIN <FiRefreshCw className="mr-2 ml-2 text-3xl" />
                </div>
            </div>
        </div>
    );
};

export default RetryMenu;
