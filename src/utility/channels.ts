/** Types and utilities for RGBA Channels and Offsets */

export type Row = 0 | 1 | 2 | 3;
export type Column = 0 | 1 | 2 | 3 | 4;

export type ChannelName = "Red" | "Green" | "Blue" | "Alpha" | "Offset";

export type Channel = {
  value: Column;
  name: ChannelName;
};
const channelNames: Array<ChannelName> = [
  "Red",
  "Green",
  "Blue",
  "Alpha",
  "Offset",
];

export const R: Channel = { value: 0, name: channelNames[0] };
export const G: Channel = { value: 1, name: channelNames[1] };
export const B: Channel = { value: 2, name: channelNames[2] };
export const A: Channel = { value: 3, name: channelNames[3] };
export const O: Channel = { value: 4, name: channelNames[4] };
