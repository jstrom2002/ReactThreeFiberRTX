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
import { Suspense } from "react";
import { Loader } from "@mantine/core";

export default function MeshLoader(props: any) {
  const gltf = useGLTF(props.gltfPath);

  useEffect(() => {
    if (gltf) {
      props.setGLTF(gltf);
    }
    props.setIsLoading(false);
  });

  return (
    <>
      <Suspense fallback={<Loader />}></Suspense>
    </>
  );
}
