export type Cellar = {
  user_cellar_id: string;
  user_id: string;
  cellars: {
    [x: string]: any;
    cellar_id: string;
    cellar_name: string;
    created_at: Date;
    updated_at: Date | null;
    deleted_at: Date | null;
    bottles: number[];
  };
};
