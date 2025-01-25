export interface Props {
  url: string;
  slug: string;
  description: string;
  viewQuantity: number;
  onDelete: () => void;
  onUpdate: (shoorty: {url: string; description: string}) => void;
}
