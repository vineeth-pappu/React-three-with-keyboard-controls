import React from 'react';

export default () => {
    return (
        <mesh>
            <sphereBufferGeometry attach="geometry" args={[100,10,10]}/>
            <meshBasicMaterial attach="material" color='rgba(21,18,19,0.88)' side={1}/>
        </mesh>
    );
};
