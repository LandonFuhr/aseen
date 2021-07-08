import { Box, Container, Grid } from "@material-ui/core";
import { useArenaType } from "../../components/PersistentProviders/ArenaType";
import { arenaTypeToString } from "../../core/utils";
import ErrorPage from "../error";
import "./styles.css";
import { useRouter } from "../../components/PersistentProviders/Router";
import {
  ArenaType,
  Page,
  ShapePurpose,
  ShapeWithPurpose,
} from "../../core/types";
import { useEffect, useRef, useState } from "react";
import { BuilderActions } from "./Actions";
import { BuilderMenu } from "./Menu";
import { SelectVideoArea } from "./VideoArea";
import { EditableShapeProps } from "../../components/ShapeEditor/Shapes/types";
import { useVideoPathState } from "../../components/PersistentProviders/VideoPath";
import { AppBarCustom } from "../../components/AppBar";
import { threeChamberPresetShapes } from "../../core/arenaPresets/ThreeChamber/regions";
import { fitThreeChamberShapes } from "../../core/arenaPresets/ThreeChamber/fitter";
import { epmPresets } from "../../core/arenaPresets/EPM/regions";
import { fitEpmShapes } from "../../core/arenaPresets/EPM/fitter";
import { useShapeController } from "./controllers/shapes";
import { saveArenaSetup } from "../../core/electron/ipc";
import { useSetArenaSetupPath } from "../../components/PersistentProviders/ArenaSetupPath";
import { ArenaEditor } from "./ArenaEditor";
import { getArenaSetup } from "../../core/ArenaSetupConverter";
import { nortPresetShapes } from "../../core/arenaPresets/NORT/regions";

const Builder = () => {
  const arenaTypeState = useArenaType();
  const router = useRouter();
  const vidPathState = useVideoPathState();
  const shapeEditorRef = useRef<HTMLDivElement>(null);
  const {
    shapes,
    setShapes,
    selectedShapeIdState: [selectedShapeId, setSelectedShapeId],
  } = useShapeController({
    initialShapes: getInitialShapes(arenaTypeState?.arenaType),
  });
  const [canSave, setCanSave] = useState(false);
  const setArenaSetupPath = useSetArenaSetupPath();

  useEffect(() => {
    function handleClick(e: globalThis.MouseEvent) {
      if (!shapeEditorRef || !shapeEditorRef.current) return;
      if (!shapeEditorRef.current.contains(e.target as Node)) {
        setSelectedShapeId(null);
      }
    }
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [shapeEditorRef, setSelectedShapeId]);

  useEffect(() => {
    setCanSave(vidPathState.path !== null);
  }, [vidPathState.path]);

  function handleExitClick() {
    vidPathState.setPath(null);
    router.setPage(Page.home);
  }

  async function handleSaveClick() {
    const arenaSetup = getArenaSetup({ shapes });
    const arenaSetupPath = await saveArenaSetup(arenaSetup);
    setArenaSetupPath(arenaSetupPath);
    router.setPage(Page.analyzing);
  }

  if (!arenaTypeState || !arenaTypeState.arenaType) {
    return <ErrorPage />;
  }
  return (
    <>
      <AppBarCustom
        text={`${arenaTypeToString(arenaTypeState.arenaType)} Setup`}
      />
      <Container maxWidth="lg">
        <Box p={4}>
          <Grid container>
            <Grid item xs={12}>
              <Box mb={2}>
                <BuilderActions
                  onExitClick={handleExitClick}
                  onSaveClick={canSave ? handleSaveClick : undefined}
                />
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={4}>
                <Grid item xs={8}>
                  {vidPathState.path !== null ? (
                    <ArenaEditor
                      videoPath={vidPathState.path}
                      shapeEditorRef={shapeEditorRef}
                      shapes={shapes}
                      setShapes={setShapes}
                      smartShapeFitter={getSmartShapeFitter(
                        arenaTypeState.arenaType
                      )}
                      selectedShapeIdState={{
                        val: selectedShapeId,
                        set: setSelectedShapeId,
                      }}
                    />
                  ) : (
                    <>
                      <SelectVideoArea onSelectVideo={vidPathState.setPath} />
                    </>
                  )}
                </Grid>
                <Grid item xs={4}>
                  <BuilderMenu
                    shapes={shapes}
                    selectedShapeId={selectedShapeId}
                    setSelectedShapeId={setSelectedShapeId}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

function getInitialShapes(
  arenaType: ArenaType | null | undefined
): ShapeWithPurpose[] {
  switch (arenaType) {
    case ArenaType.ThreeChamber:
      return threeChamberPresetShapes;
    case ArenaType.PlusMaze:
      return epmPresets;
    case ArenaType.NORT:
      return nortPresetShapes;
    default:
      return [];
  }
}

function getSmartShapeFitter(
  arenaType: ArenaType | null | undefined
): VideoArenaFitter {
  switch (arenaType) {
    case ArenaType.ThreeChamber:
      return fitThreeChamberShapes;
    case ArenaType.PlusMaze:
      return fitEpmShapes;
    default:
      return ({ shapes }) => shapes;
  }
}

export type VideoArenaFitter = (args: {
  shapes: BuilderShapeProps[];
  rawVideoSize: { width: number; height: number };
}) => BuilderShapeProps[];

export interface BuilderShapeProps extends EditableShapeProps {
  purpose: ShapePurpose;
}

export default Builder;
