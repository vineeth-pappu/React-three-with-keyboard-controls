import React, { useRef, Suspense } from "react";
import { useFrame } from "react-three-fiber";
import Cube from "./Cube";

// const Cube = () => {
//
//     const cubeRef = useRef()
//
//     useFrame(() => {
//         cubeRef.current.rotation.y += 0.02
//     })
//
//     const position = [Math.floor(Math.random() * 120) - 50, Math.floor(Math.random() * 100) - 50, Math.floor(Math.random() * 100) - 50]
//
//     return (
//         <mesh ref={cubeRef} position={position}>
//             <planeBufferGeometry attach='geometry' args={[1.5, 3, 1]}/>
//             <meshStandardMaterial attach='material' color="rgb(244, 125, 14)" side={2}/>
//         </mesh>
//     )
// }

const Cubes = () => {
  const group = useRef();

  var keyLeftPressed = false;
  var keyRightPressed = false;

  document.addEventListener("keydown", function (e) {
    if (e.keyCode === 37) {
      keyLeftPressed = true;
    }
    if (e.keyCode === 39) {
      keyRightPressed = true;
    }
  });
  document.addEventListener("keyup", function (e) {
    if (e.keyCode === 37) {
      keyLeftPressed = false;
    }
    if (e.keyCode === 39) {
      keyRightPressed = false;
    }
  });

  useFrame(() => {
    // group.current.rotation.y += 0.005;
    if (keyLeftPressed) {
      group.current.rotation.y += 0.005;
    }
    if (keyRightPressed) {
      group.current.rotation.y -= 0.005;
    }
  });

  let nodesArray = [...new Array(100)];

  return (
    <group ref={group}>
      <Suspense fallback={null}>
        {nodesArray.map((el, i) => (
          <Cube key={i} />
        ))}
      </Suspense>
    </group>
  );
};

export default Cubes;
