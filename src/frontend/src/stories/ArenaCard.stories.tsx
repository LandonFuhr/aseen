import { Story } from "@storybook/react";
import { ArenaCard, ArenaCardLayoutProps } from "../pages/home/ArenaCards/Card";

export default {
  title: "Arena Card",
  component: ArenaCard,
};

const Template: Story<ArenaCardLayoutProps> = (args) => <ArenaCard {...args} />;

export const Default = Template.bind({});
Default.args = {
  imgSrc: "placeholder.png",
  title: "Card Title",
  subtitle: "Card subtitle",
  onClick: () => {},
};

export const Flat = Template.bind({});
Flat.args = {
  imgSrc: "placeholder.png",
  title: "Card Title",
  subtitle: "Card subtitle",
  onClick: () => {},
  flat: true,
};
