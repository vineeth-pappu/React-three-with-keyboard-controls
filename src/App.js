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

  var speed = 0.1,
    radians = 0.025;

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

  useFrame((props) => {
    // group.current.rotation.y += 0.005;
    if (keyLeftPressed) {
      console.log("use frame props", props);
      // group.current.rotation.y += 0.01;
      // var yAxis = new THREE.Vector3(0, 1, 0);
      // rotateAroundObjectAxis(group.current, yAxis, 1 * (Math.PI / 180));
      props.camera.matrix.makeRotationY(radians);
      // props.camera.rotation.setFromRotationMatrix(props.camera.matrix); // r49
      props.camera.rotation.setEulerFromRotationMatrix(
        props.camera.matrix,
        props.camera.eulerOrder
      ); // dev50
    }
    if (keyRightPressed) {
      // group.current.rotation.y -= 0.01;
      // var yAxis = new THREE.Vector3(0, -1, 0);
      // rotateAroundObjectAxis(group.current, yAxis, 1 * (Math.PI / 180));
      props.camera.matrix.makeRotationY(-radians);
      props.camera.rotation.setFromRotationMatrix(props.camera.matrix); // r49
    }
    if (keyUpPressed) {
      // group.current.rotation.x -= 0.01;
      // var xAxis = new THREE.Vector3(1, 0, 0);
      // rotateAroundObjectAxis(group.current, xAxis, 1 * (Math.PI / 180));
      props.camera.translateZ(-speed);
    }
    if (keyDownPressed) {
      // group.current.rotation.x += 0.01;
      // var xAxis = new THREE.Vector3(-1, 0, 0);
      // rotateAroundObjectAxis(group.current, xAxis, 1 * (Math.PI / 180));
      props.camera.translateZ(speed);
    }
  });

  // Rotate an object around an arbitrary axis in object space
  var rotObjectMatrix;
  const rotateAroundObjectAxis = (object, axis, radians) => {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
    // new code for Three.JS r55+:
    object.matrix.multiply(rotObjectMatrix);

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js r50-r58:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // new code for Three.js r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
  };

  // Rotate an object around an arbitrary axis in world space
  var rotWorldMatrix;
  const rotateAroundWorldAxis = (object, axis, radians) => {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix); // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
  };

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
      <Canvas camera={{ position: [0, 0, 1] }}>
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
