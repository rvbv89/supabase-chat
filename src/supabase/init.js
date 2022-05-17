import { createClient } from '@supabase/supabase-js'
// import {REACT_APP_SUPABASE_KEY, REACT_APP_SUPABASE_URL} from './constants'

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)