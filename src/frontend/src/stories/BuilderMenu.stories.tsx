import { Story } from "@storybook/react";
import { BuilderMenu, BuilderMenuProps } from "../pages/builder/Menu";

export default {
  title: "Builder Side Card",
  component: BuilderMenu,
};

const Template: Story<BuilderMenuProps> = (args) => <BuilderMenu {...args} />;

export const Default = Template.bind({});
Default.args = {};
