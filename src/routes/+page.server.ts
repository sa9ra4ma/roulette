import { supabase } from '$lib/supabaseClient';  // Supabaseクライアントをインポート
// import { Weapon } from './types';

export async function load() {
  console.log("load route")

  const { data } = await supabase.from('weapons').select();
  // const { data }: { data: Weapon[] } = await supabase.from('weapons').select(); // 型付けるのうまくいかない
  return {
    weapons: data ?? [],
  };
};
