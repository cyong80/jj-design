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
      description: "버튼의 형태",
      table: {
        type: { summary: "fill | outline | ghost | link" },
        defaultValue: { summary: "fill" },
      },
      options: ["fill", "outline", "ghost", "link"],
    },
    shape: {
      control: "select",
      description: "버튼의 모양",
      table: {
        type: { summary: "rounded | square | circle" },
        defaultValue: { summary: "rounded" },
      },
      options: ["rounded", "square", "circle"],
    },
    size: {
      control: "select",
      description: "버튼의 크기",
      table: {
        type: { summary: "sm | md | lg" },
        defaultValue: { summary: "md" },
      },
      options: ["sm", "md", "lg"],
    },
    children: {
      description: "버튼의 내용",
      table: {
        type: { summary: "ReactNode" },
      },
    },
    disabled: {
      control: "boolean",
      description: "버튼의 비활성화 여부",
      table: {
        type: { summary: "boolean" },
        defaultValue: { summary: "false" },
      },
    },
    color: {
      control: "select",
      description: "버튼의 색상",
      table: {
        type: { summary: "default | danger | success | warning | info" },
        defaultValue: { summary: "default" },
      },
      options: ["default", "danger", "success", "warning", "info"],
    },
  },
  args: {
    onClick: fn(),
    children: "Click me",
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};
