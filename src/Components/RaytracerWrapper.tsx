import { extend, useThree } from "@react-three/fiber";
import { Backdrop } from "@react-three/drei";
import { Raytracer } from "@react-three/lgl";
import { RectAreaLight } from "lgl-tracer";
import { useControls, button, folder } from "leva";

extend({ RectAreaLight });

export default function RaytracerWrapper(props: any) {
  const gl = useThree((state) => state.gl);
  const controls = useControls({
    movingDownsampling: true,
    useTileRenderer: false,
    samples: { value: 128, min: 8, max: 2048, step: 8 },
    bounces: { value: 3, min: 1, max: 10, step: 1 },
    envMapIntensity: { value: 0.25, min: 0, max: 1 },
    denoise: folder({
      enableDenoise: false,
      enableTemporalDenoise: true,
      enableSpatialDenoise: true,
      denoiseColorBlendFactor: { value: 0.5, min: 0, max: 1 },
      denoiseMomentBlendFactor: { value: 0.5, min: 0, max: 1 },
      denoiseColorFactor: { value: 0.1, min: 0, max: 1 },
      denoisePositionFactor: { value: 0.1, min: 0, max: 1 },
    }),
  });

  return props.scene === undefined ? (
    <></>
  ) : (
    <Raytracer {...controls}>
      <primitive object={props.scene} />
      <Backdrop
        receiveShadow
        scale={[20, 5, 5]}
        floor={1.5}
        position={[0, -0.5, -2]}
      >
        <meshPhysicalMaterial roughness={1} color="#efefef" />
      </Backdrop>
      <rectAreaLight
        args={["white", 3]}
        width={5}
        height={5}
        position={[-3, 4, 1]}
        //target={[0, 0, 0]}
        visible={false}
      />
    </Raytracer>
  );
}
