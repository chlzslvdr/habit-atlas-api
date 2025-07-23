import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

async function main() {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: process.env.TEST_EMAIL || "",
    password: process.env.TEST_PASSWORD || "",
  });

  if (error) {
    console.error('Login failed:', error.message);
    return;
  }

  console.info('Access token:', data.session?.access_token);
}

main();
