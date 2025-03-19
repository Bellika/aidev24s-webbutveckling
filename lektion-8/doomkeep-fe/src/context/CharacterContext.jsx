import React, { createContext, useContext, useState, useEffect } from 'react';

const CharacterContext = createContext();

export const CharacterProvider = ({ children }) => {
    const [character, setCharacter] = useState(null);

    useEffect(() => {
        const storedCharacter = localStorage.getItem('selectedCharacter');
        if (storedCharacter) {
            setCharacter(JSON.parse(storedCharacter));
        }
    }, []);

    const setSelectedCharacter = (newCharacter) => {
        setCharacter(newCharacter);
        localStorage.setItem('selectedCharacter', JSON.stringify(newCharacter)); 
    };

    return (
        <CharacterContext.Provider value={{ character, setSelectedCharacter }}>
            {children}
        </CharacterContext.Provider>
    );
};

export const useCharacter = () => useContext(CharacterContext);
