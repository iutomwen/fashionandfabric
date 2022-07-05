import { createClient } from "@supabase/supabase-js";

const options = {
  schema: "public",
  headers: { "x-my-custom-header": "fashion-and-fabrics" },
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};
export const supabase = createClient(
  "https://qiuqutllamejiqcgjckx.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzE3Njk1NiwiZXhwIjoxOTQ4NzUyOTU2fQ.GpQK60bvhVsSfw6z9Bj9ZxBxTE74hlJzTTIWMLQonbs",
  options
);
