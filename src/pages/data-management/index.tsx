import React, { useEffect, useRef } from 'react'
import * as THREE from 'three';
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


type Props = {}

const index = (props: Props) => {

  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {

    // 定义threejs输出画布的尺寸(单位:像素px)
    const width = 800; //宽度
    const height = 500; //高度

    // 场景、摄像机、渲染器
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      1,
      3000
    );

    // 创建渲染器对象
    const renderer = new THREE.WebGLRenderer();

    renderer.setSize(width, height);
    mountRef.current?.appendChild(renderer.domElement);

    // 创建一个旋转的立方体
    const geometry = new THREE.CylinderGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    camera.position.z = 5;


    // 添加 OrbitControls（鼠标交互）
    const controls = new OrbitControls(camera, renderer.domElement);

    // 动画循环
    const animate = () => {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      controls.update(); // 更新鼠标交互
      renderer.render(scene, camera);
    };
    animate();
    // 清理资源
    return () => {
      renderer.dispose();
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, [])


  return (
    <div>
      数据统计
      <div ref={mountRef} style={{ width: "100vw", height: "100vh" }} ></div>

    </div>
  )
}

export default index