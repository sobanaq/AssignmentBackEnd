import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*", 
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
};


serve(async (req: Request) => {
  try {
    const { method } = req;

    if (method === "OPTIONS") {
      return new Response(null, { headers });
    }

    // Handle GET request - Fetch all books
    if (method === "GET") {
      const { data, error } = await supabase.from("books").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify(data), { headers });
    }

    // Handle POST request - Add a new book
    if (method === "POST") {
      const { author, title, ISBN } = await req.json();
      const { error } = await supabase.from("books").insert([{ author, title, ISBN }]);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: "Book added!" }), { headers });
    }

    // Handle PUT request - Update book details
    if (method === "PUT") {
      const { id, author, title, ISBN } = await req.json();
      const { error } = await supabase.from("books").update({ author, title, ISBN }).eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: "Book updated!" }), { headers });
    }

    // Handle DELETE request - Remove a book
    if (method === "DELETE") {
      const { id } = await req.json();
      if (!id) {
        return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400, headers });
      }
      const { error } = await supabase.from("books").delete().eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true, message: "Book deleted!" }), { headers });
    }

    return new Response(JSON.stringify({ error: "Method not allowed" }), { status: 405, headers });

  } catch (error) {
    
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { status: 500, headers });
  }
});
