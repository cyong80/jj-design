import { Meta, StoryObj } from "@storybook/react";
import { Tooltip } from "./Tooltip";
import { Button } from "../Button/Button";

const meta = {
  title: "Components/Tooltip",
  component: Tooltip,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    placement: {
      control: "select",
      description: "Tooltip의 위치",
      table: {
        type: { summary: "top | bottom | left | right" },
        defaultValue: { summary: "top" },
      },
      options: ["top", "bottom", "left", "right"],
    },
    initialOpen: {
      control: "boolean",
      description: "Tooltip의 초기 상태",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
      options: [true, false],
    },
  },
  args: {
    children: <Button>Hover me</Button>,
    content: "Tooltip content",
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
