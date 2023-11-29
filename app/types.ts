export interface EventType {
  id: string;
  date: string;
  hour: string;
  name: string;
  description: string;
  isMain: boolean;
  files: any;
}

export interface PostType {
  id: string;
  name: string;
  description: string;
  subtitle: string;
  files: any;
  createdAt?: string;
  highlight: boolean;
}
