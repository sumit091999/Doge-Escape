import { useEffect, useRef } from "react";
import * as THREE from "three";

const gold = new THREE.Color("#ffc400");
const blue = new THREE.Color("#5cc8ff");
const purple = new THREE.Color("#c36bff");
const green = new THREE.Color("#5cff9d");

export function SectionThreeScene({ variant, className = "" }) {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100);
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      preserveDrawingBuffer: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.domElement.className = "h-full w-full";
    host.appendChild(renderer.domElement);

    const setup = createScene(variant, scene);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      renderer.setSize(Math.max(1, width), Math.max(1, height), false);
      camera.aspect = Math.max(1, width) / Math.max(1, height);
      camera.updateProjectionMatrix();
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    let frame = 0;
    const animate = (time) => {
      frame = requestAnimationFrame(animate);
      setup.tick(time * 0.001);
      renderer.render(scene, camera);
    };
    frame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      setup.dispose?.();
      scene.traverse((object) => {
        const mesh = object;
        if ("geometry" in mesh && mesh.geometry) mesh.geometry.dispose();
        const material = mesh.material;
        if (Array.isArray(material)) {
          material.forEach((item) => item.dispose());
        } else if (material) {
          material.dispose();
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [variant]);

  return (
    <div
      ref={hostRef}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    />
  );
}

function createScene(variant, scene) {
  switch (variant) {
    case "hero":
      return createHeroStars(scene);
    case "teaser":
      return createScannerRings(scene);
    case "features":
      return createArcadeGeometry(scene);
    case "zeroG":
      return createNetwork(scene);
    case "ai":
      return createAiOrbitals(scene);
    case "leaderboard":
      return createLeaderboardColumns(scene);
    case "footer":
      return createFooterConstellation(scene);
  }
}

function makePoints(count, spread, color, size) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() - 0.5) * spread.x;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread.z;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color,
    size,
    transparent: true,
    opacity: 0.82,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geometry, material);
}

function createHollowStarGeometry(innerRadius = 0.14, outerRadius = 0.38) {
  const points = [];
  for (let i = 0; i < 10; i += 1) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = Math.PI * 0.5 + (i * Math.PI) / 5;
    points.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
  }
  points.push(points[0].clone());
  return new THREE.BufferGeometry().setFromPoints(points);
}

function createHeroStars(scene) {
  const stars = makePoints(1100, new THREE.Vector3(26, 16, 34), gold, 0.045);
  const dust = makePoints(520, new THREE.Vector3(30, 18, 22), blue, 0.025);
  scene.add(stars, dust);

  return {
    tick: (time) => {
      const starsPosition = stars.geometry.attributes.position;
      for (let i = 0; i < starsPosition.count; i += 1) {
        const nextZ = starsPosition.getZ(i) + 0.08;
        starsPosition.setZ(i, nextZ > 12 ? -18 : nextZ);
      }
      starsPosition.needsUpdate = true;
      stars.rotation.z = time * 0.025;
      dust.rotation.y = Math.sin(time * 0.24) * 0.2;
    },
  };
}

function createScannerRings(scene) {
  const group = new THREE.Group();
  const ringMaterial = new THREE.MeshBasicMaterial({
    color: gold,
    wireframe: true,
    transparent: true,
    opacity: 0.34,
  });
  const rings = Array.from({ length: 5 }, (_, index) => {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.15 + index * 0.55, 0.018, 8, 80), ringMaterial.clone());
    ring.rotation.x = Math.PI * 0.5;
    ring.position.x = index % 2 === 0 ? -2.8 : 2.8;
    ring.position.y = (index - 2) * 0.45;
    group.add(ring);
    return ring;
  });
  const sparks = makePoints(180, new THREE.Vector3(14, 8, 8), gold, 0.035);
  scene.add(group, sparks);

  return {
    tick: (time) => {
      rings.forEach((ring, index) => {
        ring.rotation.z = time * (0.35 + index * 0.08);
        ring.scale.setScalar(1 + Math.sin(time * 1.8 + index) * 0.08);
      });
      sparks.rotation.z = -time * 0.1;
    },
  };
}

function createArcadeGeometry(scene) {
  const group = new THREE.Group();
  const geometries = [
    new THREE.BoxGeometry(0.9, 0.9, 0.9),
    new THREE.TetrahedronGeometry(0.75),
    new THREE.OctahedronGeometry(0.8),
    new THREE.IcosahedronGeometry(0.68),
  ];
  const colors = [gold, blue, purple, green];

  for (let i = 0; i < 18; i += 1) {
    const mesh = new THREE.Mesh(
      geometries[i % geometries.length],
      new THREE.MeshBasicMaterial({
        color: colors[i % colors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.28,
      }),
    );
    mesh.position.set((Math.random() - 0.5) * 13, (Math.random() - 0.5) * 6.6, -2 - Math.random() * 6);
    mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
    group.add(mesh);
  }

  scene.add(group);
  return {
    tick: (time) => {
      group.rotation.y = time * 0.09;
      group.children.forEach((child, index) => {
        child.rotation.x += 0.006 + index * 0.0006;
        child.rotation.y += 0.01;
        child.position.y += Math.sin(time * 1.25 + index) * 0.0025;
      });
    },
  };
}

function createNetwork(scene) {
  const nodeCount = 32;
  const nodes = Array.from({ length: nodeCount }, () => (
    new THREE.Vector3((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 6.5, -2 - Math.random() * 5)
  ));
  const nodePoints = new THREE.Points(
    new THREE.BufferGeometry().setFromPoints(nodes),
    new THREE.PointsMaterial({
      color: purple,
      size: 0.11,
      transparent: true,
      opacity: 0.88,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    }),
  );
  const linePositions = [];
  nodes.forEach((node, index) => {
    for (let i = index + 1; i < nodes.length; i += 1) {
      if (node.distanceTo(nodes[i]) < 3.1) {
        linePositions.push(node.x, node.y, node.z, nodes[i].x, nodes[i].y, nodes[i].z);
      }
    }
  });
  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
  const lines = new THREE.LineSegments(
    lineGeometry,
    new THREE.LineBasicMaterial({
      color: blue,
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    }),
  );
  const group = new THREE.Group();
  group.add(lines, nodePoints);
  scene.add(group);

  return {
    tick: (time) => {
      group.rotation.y = Math.sin(time * 0.24) * 0.28;
      group.rotation.x = Math.cos(time * 0.18) * 0.08;
      nodePoints.scale.setScalar(1 + Math.sin(time * 1.6) * 0.035);
    },
  };
}

function createAiOrbitals(scene) {
  const group = new THREE.Group();
  const core = new THREE.Mesh(
    new THREE.IcosahedronGeometry(1.15, 1),
    new THREE.MeshBasicMaterial({ color: purple, wireframe: true, transparent: true, opacity: 0.34 }),
  );
  group.add(core);

  const satellites = Array.from({ length: 9 }, (_, index) => {
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      new THREE.MeshBasicMaterial({ color: index % 2 ? blue : green, transparent: true, opacity: 0.75 }),
    );
    group.add(mesh);
    return mesh;
  });

  const trail = makePoints(260, new THREE.Vector3(11, 7, 7), purple, 0.028);
  const starGeometry = createHollowStarGeometry(0.12, 0.34);
  const starColors = [gold, blue, purple, green];
  const hollowStars = Array.from({ length: 14 }, (_, index) => {
    const star = new THREE.LineLoop(
      starGeometry.clone(),
      new THREE.LineBasicMaterial({
        color: starColors[index % starColors.length],
        transparent: true,
        opacity: 0.36,
        blending: THREE.AdditiveBlending,
      }),
    );
    star.position.set((Math.random() - 0.5) * 12, (Math.random() - 0.5) * 7, -2 - Math.random() * 5);
    star.rotation.z = Math.random() * Math.PI;
    group.add(star);
    return star;
  });

  scene.add(group, trail);

  return {
    tick: (time) => {
      core.rotation.x = time * 0.22;
      core.rotation.y = time * 0.34;
      satellites.forEach((satellite, index) => {
        const radius = 2.1 + (index % 3) * 0.42;
        const speed = 0.5 + index * 0.055;
        satellite.position.set(
          Math.cos(time * speed + index) * radius,
          Math.sin(time * (speed + 0.18) + index * 0.7) * 1.5,
          Math.sin(time * speed + index) * radius - 2,
        );
      });
      hollowStars.forEach((star, index) => {
        star.rotation.z -= 0.004 + index * 0.0005;
        star.position.y += Math.sin(time * 0.7 + index) * 0.0015;
        star.scale.setScalar(0.8 + Math.sin(time * 1.2 + index) * 0.12);
      });
      trail.rotation.z = time * 0.08;
    },
  };
}

function createLeaderboardColumns(scene) {
  const group = new THREE.Group();
  const columns = Array.from({ length: 22 }, (_, index) => {
    const height = 0.5 + Math.random() * 2.6;
    const mesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, height, 0.24),
      new THREE.MeshBasicMaterial({
        color: index % 3 === 0 ? gold : index % 3 === 1 ? purple : blue,
        transparent: true,
        opacity: 0.32,
        wireframe: true,
      }),
    );
    mesh.position.set((Math.random() - 0.5) * 12, -2.6 + height * 0.5, -2 - Math.random() * 5);
    group.add(mesh);
    return mesh;
  });
  const sparks = makePoints(260, new THREE.Vector3(12, 7, 6), gold, 0.032);
  scene.add(group, sparks);

  return {
    tick: (time) => {
      columns.forEach((column, index) => {
        column.scale.y = 0.65 + Math.abs(Math.sin(time * 1.2 + index * 0.45)) * 0.55;
        column.rotation.y = time * 0.25 + index;
      });
      sparks.rotation.y = time * 0.1;
    },
  };
}

function createFooterConstellation(scene) {
  const group = new THREE.Group();

  // Wavy Net
  const netGeometry = new THREE.PlaneGeometry(28, 12, 24, 12);
  const netMaterial = new THREE.MeshBasicMaterial({
    color: gold,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const net = new THREE.Mesh(netGeometry, netMaterial);
  net.rotation.x = -Math.PI * 0.2;
  net.position.z = -5;
  group.add(net);

  const starGeometry = createHollowStarGeometry(0.16, 0.45);
  const starMaterial = new THREE.LineBasicMaterial({
    color: gold,
    transparent: true,
    opacity: 0.52,
    blending: THREE.AdditiveBlending,
  });

  const stars = Array.from({ length: 12 }, () => {
    const star = new THREE.LineLoop(starGeometry.clone(), starMaterial.clone());
    star.position.set(
      (Math.random() - 0.5) * 16,
      (Math.random() - 0.5) * 8,
      -2 - Math.random() * 4
    );
    star.rotation.z = Math.random() * Math.PI;
    group.add(star);
    return star;
  });

  scene.add(group);

  return {
    tick: (time) => {
      // Animate Wavy Net
      const positions = netGeometry.attributes.position;
      for (let i = 0; i < positions.count; i++) {
        const x = positions.getX(i);
        const y = positions.getY(i);
        const z = Math.sin(x * 0.4 + time * 0.8) * Math.cos(y * 0.4 + time * 0.5) * 0.8;
        positions.setZ(i, z);
      }
      positions.needsUpdate = true;

      // Animate Stars
      stars.forEach((star, i) => {
        star.rotation.z += 0.005 + i * 0.001;
        star.position.y += Math.sin(time * 0.5 + i) * 0.002;
        star.scale.setScalar(1 + Math.sin(time * 1.5 + i) * 0.1);
      });

      group.rotation.y = Math.sin(time * 0.15) * 0.05;
    },
  };
}
