import { EventType, PostType } from "./types";

export const TempEvent: EventType = {
  id: "",
  date: "",
  hour: "",
  name: "",
  description: "",
  isMain: false,
  files: [],
};

export const TempPost: PostType = {
  id: "",
  name: "",
  description: "",
  subtitle: "",
  highlight: false,
  files: [],
};
