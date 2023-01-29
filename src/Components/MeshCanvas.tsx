import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useState } from "react";
import React from "react";

function MeshCanvas() {
  const [gltf] = useState(
    useGLTF(
      "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@useGLTF/public/models/hammer.glb"
    )
  );
  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ position: [0, 0, -0.2], near: 0.025 }}
        style={{ background: "white" }}
      >
        <ambientLight />
        <primitive object={gltf.scene} />
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default MeshCanvas;
