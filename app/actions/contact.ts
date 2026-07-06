"use server";

import { supabase } from "@/app/lib/supabase";

/*
-- contact_submissions table schema
CREATE TABLE contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
*/

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export async function submitContact(formData: ContactFormData) {
  try {
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert([
        {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err) {
    console.error("Server error:", err);
    return { success: false, error: "Server error" };
  }
}
