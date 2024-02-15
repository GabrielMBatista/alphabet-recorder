import React, { createContext, useContext, useReducer, ReactNode, Dispatch } from 'react';

interface AudioURL {
    label: string;
    audioBlobUrl?: string;
    isCorrect: boolean | null;
}

interface AppState {
    pageData: any;
    userEntries: any;
    audioURLs: AudioURL[];
    currentLetter: string;
    isRecording: boolean;
    currentScore: number | boolean;
}

interface InputEntry {
    abbreviation: string;
    userEntry: string;
}

interface PageData {
    isCorrected?: boolean;
    score?: number;
    check?: boolean;
}

type AppStateAction =
    | { type: 'SET_AUDIO_URL'; payload: AudioURL }
    | { type: 'REMOVE_AUDIO_URL'; payload: string }
    | { type: 'SET_CURRENT_LETTER'; payload: string }
    | { type: 'SET_IS_RECORDING'; payload: boolean }
    | { type: 'RESET_SCORE' }
    | { type: 'UPDATE_SCORE'; payload: number }
    | { type: 'UPDATE_AUDIO_URLS_CORRECTNESS'; payload: AudioURL }
    | { type: 'CLEAR_AUDIO_URLS' }
    | { type: 'ADD_USER_ENTRY'; payload: InputEntry }
    | { type: 'UPDATE_USER_ENTRIES'; payload: InputEntry[] }
    | { type: 'SET_PAGE_DATA'; payload: { pageId: string; data: PageData } }
    | { type: 'RESET_PAGE_DATA'; payload: { pageId: string } };

const initialState: AppState = {
    audioURLs: [],
    currentLetter: '',
    isRecording: false,
    currentScore: false,
    userEntries: [],
    pageData: []
};

export const AppStateContext = createContext<{ state: AppState; dispatch: Dispatch<AppStateAction> }>({ state: initialState, dispatch: () => null });

function reducer(state: AppState, action: AppStateAction): AppState {
    switch (action.type) {
        case 'SET_AUDIO_URL':
            const index = state.audioURLs.findIndex(audioURL => audioURL.label === action.payload.label);
            if (index === -1) {
                return {
                    ...state,
                    audioURLs: [...state.audioURLs, action.payload],
                };
            } else {
                // Se já existir, substitui o item existente pela nova URL de áudio
                const newAudioURLs = [...state.audioURLs];
                newAudioURLs[index] = action.payload;
                return {
                    ...state,
                    audioURLs: newAudioURLs,
                };
            }
        case 'REMOVE_AUDIO_URL':
            return {
                ...state,
                audioURLs: state.audioURLs.filter(audioURL => audioURL.label !== action.payload),
            };
        case 'CLEAR_AUDIO_URLS':
            return {
                ...state,
                audioURLs: [],
            };
        case 'SET_CURRENT_LETTER':
            return {
                ...state,
                currentLetter: action.payload,
            };
        case 'SET_IS_RECORDING':
            return {
                ...state,
                isRecording: action.payload,
            };
        case 'UPDATE_AUDIO_URLS_CORRECTNESS':
            return {
                ...state,
                audioURLs: state.audioURLs.map(audioURL =>
                    audioURL.label === action.payload.label ? { ...audioURL, isCorrect: action.payload.isCorrect } : audioURL
                ),
            };
        case 'UPDATE_USER_ENTRIES':
            return {
                ...state,
                userEntries: action.payload,
            };
        case 'ADD_USER_ENTRY':
            return {
                ...state,
                userEntries: [...state.userEntries, action.payload],
            };
        case 'RESET_SCORE':
            return {
                ...state,
                currentScore: 0,
            };
        case 'UPDATE_SCORE':
            return {
                ...state,
                currentScore: Number(state.currentScore) + action.payload,
            };
        case 'SET_PAGE_DATA':
            return {
                ...state,
                pageData: {
                    ...state.pageData,
                    [action.payload.pageId]: action.payload.data,
                },
            };
        case 'RESET_PAGE_DATA':
            const resetPageData = { ...state.pageData };
            if (resetPageData[action.payload.pageId]) {
                resetPageData[action.payload.pageId] = { isCorrected: false, score: 0 };
            }
            return {
                ...state,
                pageData: resetPageData,
            };
        default:
            return state;
    }
}



export const AppStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>;
};

export const useAppState = () => useContext(AppStateContext);
