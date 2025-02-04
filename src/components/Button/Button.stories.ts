import { fn } from "@storybook/test";
import { Button } from "./Button";
import { Meta, StoryObj } from "@storybook/react";

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      defaultValue: "fill",
      options: ["fill", "outline", "ghost", "link"],
    },
    shape: {
      control: "select",
      defaultValue: "rounded",
      options: ["rounded", "square", "circle"],
    },
    size: {
      control: "select",
      defaultValue: "md",
      options: ["sm", "md", "lg"],
    },
  },
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
    variant: "fill",
    shape: "rounded",
    size: "md",
  },
};
