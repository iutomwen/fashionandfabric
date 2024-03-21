import { SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "@/utils/database.types";
import Table from "@/components/ui/table";

export type TypedSupabaseClient = SupabaseClient<Database>;

export type Tables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Row"];

export type InsertTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Insert"];

export type UpdateTables<T extends keyof Database["public"]["Tables"]> =
  Database["public"]["Tables"][T]["Update"];

export type Enums<T extends keyof Database["public"]["Enums"]> =
  Database["public"]["Enums"][T];

export type CategoryTableProps = Tables<"categories"> & {
  products: [
    {
      count: number;
    }
  ];
};

export type SubCategoryTableProps = Tables<"sub_categories"> & {
  category: CategoryTableProps;
  products: [
    {
      count: number;
    }
  ];
};

export type IconListProps = {
  name: string;
  icon: string;
};

export type CountryTableProps = Tables<"countries"> & {
  states: [
    {
      count: number;
    }
  ];
  profiles: [
    {
      count: number;
    }
  ];
  products: [
    {
      count: number;
    }
  ];
};

export type StateTableProps = Tables<"states"> & {
  country: CountryTableProps;
  profiles: [
    {
      count: number;
    }
  ];
  products: [
    {
      count: number;
    }
  ];
};

export type CityTableProps = Tables<"cities"> & {
  state: StateTableProps;
  profiles: [
    {
      count: number;
    }
  ];
  products: [
    {
      count: number;
    }
  ];
};

export type AccountTableProps = Tables<"profiles"> & {
  state: Tables<"states">;
  country: Tables<"countries">;
  city: Tables<"cities">;
};

export type StoreTableProps = Tables<"stores"> & {
  state: Tables<"states">;
  country: Tables<"countries">;
  city: Tables<"cities">;
  owner: Tables<"profiles">;
  subscriptionHistory: Tables<"subscription_history">[];
  storeLikes: [
    {
      count: number;
    }
  ];
  products: [
    {
      count: number;
    }
  ];
};

export type ProductTableProps = Tables<"products"> & {
  category: CategoryTableProps;
  sub_category: SubCategoryTableProps;
  store: StoreTableProps;
  state: StateTableProps;
  country: CountryTableProps;
  city: CityTableProps;
  productImages: Tables<"product_images">[];
  productLikes: [
    {
      count: number;
    }
  ];
  productViews: [
    {
      count: number;
    }
  ];
};

export type NavBarProps = {
  title: string;
  href: string;
  icon?: string;
  children?: NavBarProps[];
};
