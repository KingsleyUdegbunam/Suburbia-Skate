"use client";

import { Content } from "@prismicio/client";
import { createContext, useContext, useMemo, ReactNode, useState } from "react";

type CustomizerControlsContextType = {
  selectedWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  selectedDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  selectedTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  selectedBolt?: Content.BoardCustomizerDocumentDataMetalsItem;

  setSelectedWheel: (
    wheel: Content.BoardCustomizerDocumentDataWheelsItem,
  ) => void;
  setSelectedDeck: (deck: Content.BoardCustomizerDocumentDataDecksItem) => void;
  setSelectedTruck: (
    trucks: Content.BoardCustomizerDocumentDataMetalsItem,
  ) => void;
  setSelectedBolt: (
    bolts: Content.BoardCustomizerDocumentDataMetalsItem,
  ) => void;
};
const defaultContext: CustomizerControlsContextType = {
  setSelectedWheel: () => {},
  setSelectedDeck: () => {},
  setSelectedTruck() {},
  setSelectedBolt() {},
};

const CustomizerControlsContext = createContext(defaultContext);

type CustomizerControlsProviderProps = {
  defaultWheel?: Content.BoardCustomizerDocumentDataWheelsItem;
  defaultDeck?: Content.BoardCustomizerDocumentDataDecksItem;
  defaultTruck?: Content.BoardCustomizerDocumentDataMetalsItem;
  defaultBolt?: Content.BoardCustomizerDocumentDataMetalsItem;
  children?: ReactNode;
};

export function CustomizerControlsProvider({
  defaultWheel,
  defaultDeck,
  defaultTruck,
  defaultBolt,
  children,
}: CustomizerControlsProviderProps) {
  const [selectedWheel, setSelectedWheel] = useState(defaultWheel);
  const [selectedDeck, setSelectedDeck] = useState(defaultDeck);
  const [selectedTruck, setSelectedTruck] = useState(defaultTruck);
  const [selectedBolt, setSelectedBolt] = useState(defaultBolt);

  const value = useMemo<CustomizerControlsContextType>(() => {
    return {
      selectedWheel,
      selectedDeck,
      selectedTruck,
      selectedBolt,
      setSelectedBolt,
      setSelectedTruck,
      setSelectedDeck,
      setSelectedWheel,
    };
  }, [selectedWheel, selectedDeck, selectedTruck, selectedBolt]);

  return (
    <CustomizerControlsContext.Provider value={value}>
      {children}
    </CustomizerControlsContext.Provider>
  );
}

export function useCustomizerControls() {
  return useContext(CustomizerControlsContext);
}
