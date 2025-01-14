import React from "react";

import { Button } from "@acme/ui";
import {QuizReport} from "@acme/ui";
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
