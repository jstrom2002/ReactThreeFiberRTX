import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import React, { startTransition, useState } from "react";
import RaytracerWrapper from "./RaytracerWrapper";
import Rasterizer from "./Rasterizer";
import { Button, Switch, TextInput } from "@mantine/core";
import MeshLoader from "./MeshLoader";

// Test models:
// "https://cdn.jsdelivr.net/gh/Sean-Bradley/React-Three-Fiber-Boilerplate@useGLTF/public/models/hammer.glb"

function MeshCanvas() {
  const [gltfPath, setGLTFpath] = useState("");
  const [gltf, setGLTF] = useState<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [raytracerOn, setRaytracerOn] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Switch
        label="Use RTX"
        onChange={() => {
          startTransition(() => {
            if (gltf === undefined) {
              setIsLoading(true);
              window.location.reload();
            }
            setGLTF(undefined);
            setRaytracerOn(!raytracerOn);
          });
        }}
      />
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
            gl={{ preserveDrawingBuffer: raytracerOn }}
            dpr={1.5}
            camera={{ position: [0, 0, -0.2], near: 0.025 }}
            style={{
              background: "white",
              width: "50%",
              height: "50%",
              alignSelf: "center",
            }}
          >
            <ambientLight />
            {raytracerOn ? (
              <RaytracerWrapper scene={gltf?.scene} />
            ) : (
              <Rasterizer scene={gltf?.scene} />
            )}
            <OrbitControls />
            <Environment preset="warehouse" background />
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
