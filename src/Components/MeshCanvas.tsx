import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import React, {
  startTransition,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Button, TextInput } from "@mantine/core";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLoader } from "@react-three/fiber";
import MeshLoader from "./MeshLoader";

// "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@useGLTF/public/models/hammer.glb"

function MeshCanvas() {
  const [gltfPath, setGLTFpath] = useState("");
  const [gltf, setGLTF] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      {gltf?.scene ? (
        <Button
          onClick={() => {
            startTransition(() => {
              setGLTF(undefined);
            });
          }}
        >
          Remove
        </Button>
      ) : (
        <></>
      )}
      {gltf?.scene ? (
        <>
          <Canvas
            camera={{ position: [0, 0, -0.2], near: 0.025 }}
            style={{ background: "white" }}
          >
            <ambientLight />
            <primitive object={gltf?.scene} />
            <OrbitControls />
          </Canvas>
        </>
      ) : (
        <>
          {isLoading ? (
            <MeshLoader
              setIsLoading={setIsLoading}
              setGLTF={setGLTF}
              gltfPath={gltfPath}
            />
          ) : (
            <></>
          )}
          <TextInput
            value={gltfPath}
            onChange={(e) => {
              setGLTFpath(e.currentTarget.value);
            }}
          />
          <Button
            onClick={() => {
              startTransition(() => {
                setIsLoading(true);
              });
            }}
          >
            Load
          </Button>
        </>
      )}
    </div>
  );
}

export default MeshCanvas;
