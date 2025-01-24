export interface Props {
  ownerId: string;
  url: string;
  slug: string;
  description: string;
  viewQuantity: number;
  onDelete: () => void;
}
