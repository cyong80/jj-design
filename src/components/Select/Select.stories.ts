import { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta = {
  title: "Components/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    shape: {
      control: "select",
      description: "Select의 모양",
      table: {
        type: { summary: "rounded | square | circle" },
        defaultValue: { summary: "rounded" },
      },
      options: ["rounded", "square", "circle"],
    },
    size: {
      control: "select",
      description: "Select의 크기",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
      options: ["sm", "md", "lg"],
    },
  },
  args: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
