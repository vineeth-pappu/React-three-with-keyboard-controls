import React, { Fragment } from "react";
import { Canvas } from "react-three-fiber";
import Cubes from "./components/Cubes/Cubes";
import Env from "./components/Environment";
import { OrbitControls } from "drei";

const Core = () => {
  return (
    <mesh>
      <sphereBufferGeometry attach="geometry" args={[10, 32, 32]} />
      <meshBasicMaterial attach="material" color="orange" />
    </mesh>
  );
};

const App = () => {
  return (
    <Fragment>
      <Canvas camera={{ fov: 104, position: [0, 0, 70] }}>
        <ambientLight />
        <pointLight color="orange" intensity={10} />
        <Cubes />
        <Core />
        <Env />
        <OrbitControls enableKeys={false} />
      </Canvas>
    </Fragment>
  );
};

export default App;
