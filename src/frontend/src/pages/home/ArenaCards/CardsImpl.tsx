import { ArenaType } from "../../../core/types";
import { arenaTypeToString } from "../../../core/utils";
import { ArenaCard } from "./Card";

export const PlusMazeCard = (props: ArenaCardProps) => {
  return (
    <ArenaCard
      title={arenaTypeToString(ArenaType.PlusMaze)}
      subtitle="Anxiety test"
      imgSrc="placeholder.png"
      onClick={props.onClick}
    />
  );
};

export const CustomArenaCard = (props: ArenaCardProps) => {
  return (
    <ArenaCard
      title={arenaTypeToString(ArenaType.Custom)}
      subtitle="Create your own test"
      imgSrc="placeholder.png"
      onClick={props.onClick}
      flat
    />
  );
};

export const ThreeChamberCard = (props: ArenaCardProps) => {
  return (
    <ArenaCard
      title={arenaTypeToString(ArenaType.ThreeChamber)}
      subtitle="Memory and sociability test"
      imgSrc="placeholder.png"
      onClick={props.onClick}
    />
  );
};

export const NortCard = (props: ArenaCardProps) => {
  return (
    <ArenaCard
      title={arenaTypeToString(ArenaType.NORT)}
      subtitle="Memory test"
      imgSrc="placeholder.png"
      onClick={props.onClick}
    />
  );
};

interface ArenaCardProps {
  onClick: () => void;
}
