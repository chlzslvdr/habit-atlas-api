import { createClient } from '@supabase/supabase-js';

export const createContext = async ({ req }: { req: any }) => {
  const supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      global: { headers: { Authorization: req.headers.authorization } }
    }
  );

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    console.error("Auth error or no user:", error);
    throw new Error("Unauthorized");
  }

  return { supabase, user };
};
