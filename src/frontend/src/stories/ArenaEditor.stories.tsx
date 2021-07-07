import { Story } from "@storybook/react";
import { threeChamberPresetShapes } from "../core/arenaPresets/ThreeChamber";
import { ArenaEditor, ArenaEditorProps } from "../pages/builder/ArenaEditor";

export default {
  title: "Arena Editor",
  component: ArenaEditor,
};

const Template: Story<ArenaEditorProps> = (args) => <ArenaEditor {...args} />;

export const Default = Template.bind({});
Default.args = {
  videoPath:
    "https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4",
  shapes: [...threeChamberPresetShapes] as any,
  selectedShapeIdState: {
    val: "",
    set: () => {},
  },
};
