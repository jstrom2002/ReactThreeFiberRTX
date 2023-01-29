import MeshCanvas from "./Components/MeshCanvas";
import React, { Suspense } from "react";
import { Leva } from "leva";

export default function App() {
  return (
    <>
      <Suspense fallback="loading">
        <MeshCanvas />
        <Leva collapsed />
      </Suspense>
    </>
  );
}
