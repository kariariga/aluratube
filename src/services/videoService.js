import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://uubrvyijyoqynuigneyv.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV1YnJ2eWlqeW9xeW51aWduZXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2Njg0NTYzNzEsImV4cCI6MTk4NDAzMjM3MX0.Cj7j2sOB9ZzHM5F4_AAlXofNX71V7fy5kDCcX6inagg";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                    .select("*");
        }
    }
}