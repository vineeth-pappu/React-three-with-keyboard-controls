import React, { useRef } from "react";
import { useLoader, useFrame } from "react-three-fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { draco } from "drei";

export default function Model(props) {
  const group = useRef();
  // const { nodes, materials } = useLoader(GLTFLoader, 'models/cube.glb', draco('/draco-gltf/'))
  const cubeRef = useRef();

  useFrame(() => {
    cubeRef.current.rotation.y += 0.02;
  });

  const position = [
    Math.floor(Math.random() * 100) - 50,
    Math.floor(Math.random() * 100) - 50,
    Math.floor(Math.random() * 100) - 50
  ];

  return (
    <group ref={group} {...props} dispose={null}>
      <mesh ref={cubeRef} position={position} />
    </group>
  );
}
