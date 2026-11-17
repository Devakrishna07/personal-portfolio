import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in environment");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function registerAdmin() {
  const email = "dprasadnr@gmail.com";
  const password = "MyNewPass@2003";

  console.log(`Connecting to Supabase at: ${supabaseUrl}`);
  console.log(`Attempting to sign up user: ${email}...`);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: "Deva Prasad NR",
        role: "admin",
      },
    },
  });

  if (error) {
    console.error("Registration error:", error.message);
  } else {
    console.log("SUCCESS! User registered.");
    console.log("User ID:", data.user?.id);
    console.log("Email:", data.user?.email);
    console.log("Confirmed at:", data.user?.confirmed_at || "Pending confirmation (if email confirm is enabled)");
  }
}

registerAdmin();
