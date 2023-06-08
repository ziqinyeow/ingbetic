import CenterNode from "@/components/spec/node/center";
import { Position } from "reactflow";

export const initialNodes = [
  {
    id: "0",
    type: "center",
    data: {
      label: "URL",
      handler: [{ type: "source", position: Position.Bottom }],
    },
    position: { x: -20, y: -50 },
  },
  {
    id: "1",
    type: "center",
    data: {
      label: "Ingredient",
      handler: [
        { type: "source", position: Position.Right },
        { type: "target", position: Position.Top },
      ],
    },
    position: { x: 0, y: 20 },
  },
  {
    id: "2",
    type: "center",
    data: {
      label: "Model",
      handler: [
        { type: "source", position: Position.Right },
        { type: "target", position: Position.Left },
      ],
    },
    position: { x: 180, y: 0 },
  },
  {
    id: "3",
    type: "center",
    data: {
      label: "Sugar Level",
      handler: [
        { type: "source", position: Position.Bottom },
        { type: "target", position: Position.Left },
      ],
    },
    position: { x: 360, y: -50 },
  },
  {
    id: "4",
    type: "center",
    data: {
      label: "Good?",
      handler: [{ type: "target", position: Position.Top }],
    },
    position: { x: 360, y: 20 },
  },
];

export const initialEdges = [
  {
    id: "0-1",
    source: "0",
    target: "1",
    animated: true,
  },
  {
    id: "1-2",
    source: "1",
    target: "2",
    animated: true,
  },
  {
    id: "2-3",
    source: "2",
    target: "3",
    animated: true,
  },
  {
    id: "3-4",
    source: "3",
    target: "4",
    animated: true,
  },
];

export const nodeTypes = { center: CenterNode };
