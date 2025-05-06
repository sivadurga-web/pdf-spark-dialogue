
export type Message = {
  id: string;
  content: string;
  isUserMessage: boolean;
  timestamp: string;
  file?: {
    name: string;
    type: string;
    size: number;
  };
};
