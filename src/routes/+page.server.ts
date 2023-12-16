import { supabase } from '$lib/supabaseClient';  // Supabaseクライアントをインポート
// import { Weapon } from './types';

export async function load() {
  const { data } = await supabase.from('weapons').select(); // userテーブルから全てのデータを取得
  // const { data }: { data: Weapon[] } = await supabase.from('weapons').select(); // userテーブルから全てのデータを取得
  return {
    weapons: data ?? [],
  };
};
