import React from "react";
import { ArenaCardsGrid } from "./Grid";
import {
  ThreeChamberCard,
  PlusMazeCard,
  NortCard,
  CustomArenaCard,
} from "./CardsImpl";
import "../styles.css";
import { ArenaType } from "../../../core/types";
import { useRouter } from "../../../components/PersistentProviders/Router";
import { Page } from "../../../core/types";
import { useArenaType } from "../../../components/PersistentProviders/ArenaType";

const ArenaCards = (props: ArenaCardsProps) => {
  const router = useRouter();
  const arenaTypeState = useArenaType();
  function handleClick(arenaType: ArenaType) {
    router.setPage(Page.builder);
    arenaTypeState?.setArenaType(arenaType);
  }
  return (
    <ArenaCardsGrid
      cards={[
        <ThreeChamberCard
          onClick={() => handleClick(ArenaType.ThreeChamber)}
        />,
        <PlusMazeCard onClick={() => handleClick(ArenaType.PlusMaze)} />,
        <NortCard onClick={() => handleClick(ArenaType.NORT)} />,
        <CustomArenaCard onClick={() => handleClick(ArenaType.Custom)} />,
      ]}
    />
  );
};

interface ArenaCardsProps {}

export default ArenaCards;
