const fs = require("fs");
const path = require("path");
const THREE = require("three");
const { NodeIO } = require("@gltf-transform/core");

async function gcodeToGLB(gcodePath, outputPath) {
  const gcode = fs.readFileSync(gcodePath, "utf8");
  const lines = gcode.split("\n");

  const geometry = new THREE.BufferGeometry();
  const vertices = [];
  const colors = [];
  const layerHeights = [];

  let z = 0;
  lines.forEach(line => {
    if (line.startsWith(";LAYER:")) {
      z += 0.2; // 0.2mm Layerhöhe (Beispiel)
      layerHeights.push(z);
    }
    if (line.startsWith("G1")) {
      const matchX = line.match(/X([\d\.]+)/);
      const matchY = line.match(/Y([\d\.]+)/);
      const matchZ = line.match(/Z([\d\.]+)/);
      if (matchZ) z = parseFloat(matchZ[1]);
      if (matchX && matchY) {
        vertices.push(parseFloat(matchX[1]), parseFloat(matchY[1]), z);
        colors.push(1, 0.6, 0); // orange Layerfarbe
      }
    }
  });

  geometry.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

  const material = new THREE.PointsMaterial({ vertexColors: true, size: 0.5 });
  const mesh = new THREE.Points(geometry, material);

  const scene = new THREE.Scene();
  scene.add(mesh);

  const io = new NodeIO();
  await io.write(outputPath, scene);
}

module.exports = gcodeToGLB;