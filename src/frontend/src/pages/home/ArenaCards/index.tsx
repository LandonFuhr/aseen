import { ArenaCardsGrid } from "./Grid";
import { ThreeChamberCard, PlusMazeCard, NortCard } from "./CardsImpl";
import "../styles.css";
import { ArenaType } from "../../../core/types";
import { useRouter } from "../../../components/PersistentProviders/Router";
import { Page } from "../../../core/types";
import { useArenaType } from "../../../components/PersistentProviders/ArenaType";

const ArenaCards = () => {
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
      ]}
    />
  );
};

export default ArenaCards;
