// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"

console.log("Hello from Functions!")

import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req: Request) => {
  // Simple content-type header is all we need
  const headers = { "Content-Type": "application/json" };

  try {
    // Handle GET request - get books
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("books")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify(data), { headers });
    }

        // Handle DELETE request - delete book
        if (req.method === "DELETE") {
          const {id} = await req.json();
          const { data, error } = await supabase
            .from("books")
            .delete()
            .eq("id", id);
          if (error) throw error;
          return new Response(JSON.stringify(data), { headers });
        }

    // Handle POST request - add book
    if (req.method === "POST") {
      const { author, title, ISBN } = await req.json();
      const { error } = await supabase.from("books").insert([{ author, title, ISBN }]);
      
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: "Message sent!" }), { headers });
    }
        // Handle POST request - add user
        if (req.method === "POST") {
          const { author, title, ISBN } = await req.json();
          const { error } = await supabase.from("books").insert([{ author, title, ISBN }]);
          
          if (error) throw error;
          return new Response(JSON.stringify({ success: true, message: "Message sent!" }), { headers });
        }
    

    // Handle unsupported methods
    return new Response(JSON.stringify({ error: "Method not allowed" }), { 
      status: 405, 
      headers 
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500, 
      headers 
    });
  }
});
