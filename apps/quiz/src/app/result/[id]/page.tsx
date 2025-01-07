import React from "react";

import { Button } from "@acme/ui/button";
import QuizReport from "@acme/ui/Quiz/report";
import { useRouter } from "next/router"

const router = useRouter();
export default function Home() {
  return (
    <div>
      <div>
        <Button className="bg-primary" onClick={() => router.back()}>
          Back
        </Button>
      </div>
      <div>
        <QuizReport />
      </div>
    </div>
  );
}
