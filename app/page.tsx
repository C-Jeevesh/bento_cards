import { supabase } from "../lib/supabase";
import BentoGrid from "./BentoGrid";

export const revalidate = 0;

export default async function Home() {
  const { data: cards, error } = await supabase
    .from("bento_cards")
    .select("*")
    .order("order_index");

  if (error) {
    return <div className="text-red-500">Error loading data</div>;
  }

  return (
    <main className="min-h-screen p-8 bg-zinc-950 flex justify-center items-center">
      <BentoGrid cards={cards} />
    </main>
  );
}