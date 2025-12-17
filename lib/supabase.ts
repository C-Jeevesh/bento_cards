import { createClient } from '@supabase/supabase-js'

// 1. I put your specific URL here for you:
const supabaseUrl = 'https://rweredjicwcdhzehdzpw.supabase.co'

// 2. PASTE YOUR LONG "anon public" KEY INSIDE THE QUOTES BELOW:
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZXJlZGppY3djZGh6ZWhkenB3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjU5ODU2MDIsImV4cCI6MjA4MTU2MTYwMn0.33gfxmQpre1lo0Om1DbuiHWLNgMrnsKYCi7Y_I_dWQ8'
export const supabase = createClient(supabaseUrl, supabaseKey)