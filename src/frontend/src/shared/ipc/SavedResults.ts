import { ArenaType } from "../../core/types";

export interface SavedResult {
  videoPath: string;
  arenaType: ArenaType;
  behaviourResultsJsonPath: string;
  createdAtDate: Date;
  resultsFolderPath: string;
}
