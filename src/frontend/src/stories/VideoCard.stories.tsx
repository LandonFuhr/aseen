import { Story } from "@storybook/react";
import {
  VideoCardStatic,
  VideoCardStaticProps,
} from "../pages/analyzing/VideoCard";

export default {
  title: "Video Card",
  component: VideoCardStatic,
};

const Template: Story<VideoCardStaticProps> = (args) => (
  <div style={{ width: "300px" }}>
    <VideoCardStatic {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  videoPath:
    "https://archive.org/download/Popeye_forPresident/Popeye_forPresident_512kb.mp4",
  memorySize: "5.0 MB",
  duration: "5 minutes 22 seconds",
};
