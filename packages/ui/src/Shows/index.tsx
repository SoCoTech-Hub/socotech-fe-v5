"use client";

import type { Show } from "./card";
import { ShowGrid } from "./grid";

export function ShowsPage({ showList }: { showList?: Show[] }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Shows</h1>
      <ShowGrid shows={showList || []} isLoading={!!showList} />
    </div>
  );
}
