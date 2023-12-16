export interface Weapon {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
};

export interface WeaponSupaBaseResponse {
  weapon: Weapon[];
};
