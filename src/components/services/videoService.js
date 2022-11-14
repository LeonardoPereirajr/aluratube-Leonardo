import { createClient } from "@supabase/supabase-js";

const PROJECT_URL = "https://fdmvidiqrjpcjgvcrsrj.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZkbXZpZGlxcmpwY2pndmNyc3JqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgzNDQ3MjcsImV4cCI6MTk4MzkyMDcyN30.JyIrgOFcPe6-MCwMfkNTU4VRTxtA5fPZNyrknPXgJ8c";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

export function videoService() {
    return {
        getAllVideos() {
            return supabase.from("video")
                .select("*");
        }
    }
}