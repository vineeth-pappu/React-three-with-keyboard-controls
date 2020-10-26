import React, { Fragment, Suspense, useRef } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import Cubes from "./components/Cubes/Cubes";
import Env from "./components/Environment";
import { OrbitControls } from "drei";
import { useLoader } from "react-three-fiber";
import * as THREE from "three";

const Core = () => {
  const url = "/Pano.jpg";
  // "https://www.sinalcogroup.com/wordpress/wp-content/uploads/2016/05/Pano.jpg";
  var texture = useLoader(THREE.TextureLoader, url);

  const group = useRef();

  var keyLeftPressed = false;
  var keyRightPressed = false;

  var keyUpPressed = false;
  var keyDownPressed = false;

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 37) {
      keyLeftPressed = true;
    }
    if (e.keyCode === 39) {
      keyRightPressed = true;
    }
    if (e.keyCode === 38) {
      keyUpPressed = true;
    }
    if (e.keyCode === 40) {
      keyDownPressed = true;
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 37) {
      keyLeftPressed = false;
    }
    if (e.keyCode === 39) {
      keyRightPressed = false;
    }
    if (e.keyCode === 38) {
      keyUpPressed = false;
    }
    if (e.keyCode === 40) {
      keyDownPressed = false;
    }
  });

  useFrame(() => {
    // group.current.rotation.y += 0.005;
    if (keyLeftPressed) {
      group.current.rotation.y += 0.01;
    }
    if (keyRightPressed) {
      group.current.rotation.y -= 0.01;
    }
    if (keyUpPressed) {
      group.current.rotation.x -= 0.01;
    }
    if (keyDownPressed) {
      group.current.rotation.x += 0.01;
    }
  });

  return (
    <mesh ref={group}>
      <sphereBufferGeometry attach="geometry" args={[50, 32, 32]} />
      <meshBasicMaterial
        attach="material"
        side={THREE.BackSide}
        map={texture}
        transparent={true}
        opacity={1}
      />
    </mesh>
  );
};

const App = () => {
  return (
    <Fragment>
      <Canvas camera={{ position: [0, 0, 70] }}>
        <ambientLight />
        <pointLight color="orange" intensity={10} />
        <Cubes />
        <Suspense fallback={null}>
          <Core />
          <Env />
        </Suspense>
        <OrbitControls enableKeys={false} />
      </Canvas>
    </Fragment>
  );
};

export default App;
