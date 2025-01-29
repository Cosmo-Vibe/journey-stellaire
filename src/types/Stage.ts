export interface Stage {
  id: number;
  name: string;
  className: string;
  stage: string;
  description: string;
  texture: string;
  characteristics: {
    temperature: string;
    duration: string;
    size: string;
    mass?: string;
    luminosity?: string;
    composition?: string[];
  }
}
