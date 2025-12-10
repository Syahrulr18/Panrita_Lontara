import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Center, Text3D } from '@react-three/drei';

function LontaraText({ symbol }) {
  const meshRef = useRef();

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Center>
        <Text3D
          ref={meshRef}
          font="/Lontara.json"
          size={3}
          height={0.5}
          curveSegments={12}
          bevelEnabled
          bevelThickness={0.02}
          bevelSize={0.02}
          bevelOffset={0}
          bevelSegments={5}
        >
          {symbol}
          <meshStandardMaterial color="#b45309" /> {/* amber-700 */}
        </Text3D>
      </Center>
    </Float>
  );
}

const Lontara3DViewer = ({ symbol }) => {
  return (
    <div className="w-full h-[400px] bg-gradient-to-br from-amber-50 to-orange-100 rounded-3xl overflow-hidden shadow-inner border border-amber-200">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
        
        <LontaraText symbol={symbol} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
};

export default Lontara3DViewer;
