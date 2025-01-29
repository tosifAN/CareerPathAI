import React, { useEffect, useRef } from "react";
import JobListings from "../components/JobListings";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { motion } from "framer-motion";

function JobListingPage() {
  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
      {/* Three.js 3D Background */}
      <Canvas className="absolute top-10 left-0 w-full h-full z-0">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <OrbitControls enableZoom={false} />
        <Sphere args={[1, 100, 200]} scale={2.5} position={[0, 0, -2]}>
          <MeshDistortMaterial color="#ffffff" attach="material" distort={0.5} speed={2} />
        </Sphere>
      </Canvas>
      
      {/* Animated Heading */}
      <motion.h1 
        className="relative text-5xl font-extrabold text-white mb-10 text-center z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        Remote Job Listings
      </motion.h1>
      
      {/* Animated Job Listings Section */}
      <motion.section 
        className="relative bg-white shadow-xl rounded-3xl p-8 w-full max-w-5xl z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <JobListings />
      </motion.section>
    </main>
  );
}

export default JobListingPage;
