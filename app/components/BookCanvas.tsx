"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./BookCanvas.module.css";

// ── Book dimensions (Three.js units) ─────────────────────────
const W  = 1.4;    // width
const H  = 1.9;    // height
const D  = 0.28;   // closed thickness
const CT = 0.022;  // cover board thickness
const N  = 8;      // animated page count

// ── Canvas texture builders ───────────────────────────────────

function makeCoverTex(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width  = 1024;
  cv.height = Math.round(1024 * H / W); // ≈ 1389
  const c = cv.getContext("2d")!;

  // Deep background
  const bg = c.createLinearGradient(0, 0, 0, cv.height);
  bg.addColorStop(0, "#0E0C14");
  bg.addColorStop(1, "#06040A");
  c.fillStyle = bg;
  c.fillRect(0, 0, cv.width, cv.height);

  // Outer gold border
  c.strokeStyle = "#C4922A";
  c.lineWidth = 9;
  c.strokeRect(36, 36, cv.width - 72, cv.height - 72);

  // Inner faint border
  c.strokeStyle = "rgba(196,146,42,0.28)";
  c.lineWidth = 2;
  c.strokeRect(54, 54, cv.width - 108, cv.height - 108);

  // Corner ornaments
  const corner = (x: number, y: number, dx: number, dy: number) => {
    c.strokeStyle = "#C4922A";
    c.lineWidth = 3.5;
    c.beginPath();
    c.moveTo(x, y + dy * 52);
    c.lineTo(x, y);
    c.lineTo(x + dx * 52, y);
    c.stroke();
  };
  corner(36,            36,             1,  1);
  corner(cv.width - 36, 36,            -1,  1);
  corner(36,            cv.height - 36, 1, -1);
  corner(cv.width - 36, cv.height - 36,-1, -1);

  // Eyebrow label
  c.fillStyle = "rgba(196,146,42,0.7)";
  c.font = "600 20px 'Helvetica Neue', Arial, sans-serif";
  c.textAlign = "center";
  c.fillText("M  E  M  O  I  R", cv.width / 2, 158);

  c.strokeStyle = "rgba(196,146,42,0.3)";
  c.lineWidth = 1;
  c.beginPath();
  c.moveTo(160, 176);
  c.lineTo(cv.width - 160, 176);
  c.stroke();

  // Main title
  c.fillStyle = "#F5EEE3";
  c.font = "300 118px Georgia, 'Times New Roman', serif";
  c.textAlign = "center";
  c.fillText("Your", cv.width / 2, 378);

  c.fillStyle = "#C4922A";
  c.font = "italic 300 118px Georgia, 'Times New Roman', serif";
  c.fillText("Story", cv.width / 2, 506);

  c.strokeStyle = "#C4922A";
  c.lineWidth = 2;
  c.beginPath();
  c.moveTo(180, 540);
  c.lineTo(cv.width - 180, 540);
  c.stroke();

  // Subtitle
  c.fillStyle = "rgba(245,238,227,0.52)";
  c.font = "italic 34px Georgia, serif";
  c.textAlign = "center";
  c.fillText("A Memoir", cv.width / 2, 606);

  // Diamond ornament
  c.fillStyle = "#C4922A";
  c.save();
  c.translate(cv.width / 2, 768);
  c.rotate(Math.PI / 4);
  c.fillRect(-7, -7, 14, 14);
  c.restore();

  // Author block
  c.strokeStyle = "rgba(196,146,42,0.16)";
  c.lineWidth = 1;
  c.strokeRect(110, cv.height - 255, cv.width - 220, 108);

  c.fillStyle = "rgba(245,238,227,0.42)";
  c.font = "26px Georgia, serif";
  c.textAlign = "center";
  c.fillText("YOUR NAME HERE", cv.width / 2, cv.height - 187);

  // Publisher mark
  c.fillStyle = "rgba(196,146,42,0.38)";
  c.font = "600 17px 'Helvetica Neue', sans-serif";
  c.fillText("S T O R Y  I P", cv.width / 2, cv.height - 66);

  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makeSpineTex(): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width = 128; cv.height = 512;
  const c = cv.getContext("2d")!;

  c.fillStyle = "#0D0B12";
  c.fillRect(0, 0, cv.width, cv.height);

  c.strokeStyle = "rgba(196,146,42,0.22)";
  c.lineWidth = 1;
  [[12, 0, 12, 512], [cv.width - 12, 0, cv.width - 12, 512]].forEach(([x1, y1, x2, y2]) => {
    c.beginPath(); c.moveTo(x1, y1); c.lineTo(x2, y2); c.stroke();
  });

  c.save();
  c.translate(cv.width / 2, cv.height / 2);
  c.rotate(-Math.PI / 2);
  c.fillStyle = "rgba(245,238,227,0.38)";
  c.font = "italic 17px Georgia, serif";
  c.textAlign = "center";
  c.fillText("Your Story", 0, 6);
  c.restore();

  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

function makePageTex(seed: number): THREE.CanvasTexture {
  const cv = document.createElement("canvas");
  cv.width  = 1024;
  cv.height = Math.round(1024 * H / W);
  const c = cv.getContext("2d")!;

  // Warm parchment — slight gradient from spine edge to outer edge
  const bg = c.createLinearGradient(0, 0, cv.width, 0);
  bg.addColorStop(0,   "#E8DEC9");
  bg.addColorStop(0.5, "#F0E8D5");
  bg.addColorStop(1,   "#F5EEE3");
  c.fillStyle = bg;
  c.fillRect(0, 0, cv.width, cv.height);

  // Faint margin rule
  c.strokeStyle = "rgba(196,146,42,0.09)";
  c.lineWidth = 1.5;
  c.beginPath();
  c.moveTo(98, 90); c.lineTo(98, cv.height - 88); c.stroke();

  // Chapter header — each page gets its own chapter name
  const chapters = ["One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten","Eleven","Twelve"];
  const headerY  = 110;
  const chapter  = chapters[seed % chapters.length];
  c.fillStyle = "rgba(196,146,42,0.52)";
  c.font = "italic 28px Georgia, serif";
  c.textAlign = "left";
  c.fillText(`Chapter ${chapter}`, 114, headerY);

  // Underline the chapter label
  c.strokeStyle = "rgba(196,146,42,0.22)";
  c.lineWidth = 1;
  const capW = c.measureText(`Chapter ${chapter}`).width;
  c.beginPath();
  c.moveTo(114, headerY + 13); c.lineTo(114 + capW, headerY + 13); c.stroke();

  // Deterministic pseudo-random keyed on seed
  const rng = (n: number) => Math.abs(Math.sin(n * 127.1 + seed * 311.7)) * 0.5 + 0.25;

  // Layout
  const textLeft  = 114;
  const textW     = cv.width - 90 - textLeft;
  const lineH     = 31;
  const paraGap   = 24;
  const indentW   = 42;

  let y           = headerY + 56;
  let paraLine    = 0;
  let isParaStart = true;
  let li          = 0;

  while (y < cv.height - 82) {
    const indent  = isParaStart ? indentW : 0;
    // End a paragraph after at least 3 lines with ~28% probability
    const isLast  = paraLine >= 3 && rng(li + 0.1) < 0.56;
    const lineLen = isLast
      ? textW * (0.45 + rng(li) * 0.30)           // short last line
      : textW * (0.87 + rng(li) * 0.13) - indent; // near-full line

    const alpha = 0.11 + rng(li + 0.5) * 0.035;
    c.strokeStyle = `rgba(26,20,16,${alpha.toFixed(3)})`;
    c.lineWidth   = 1.4;
    c.beginPath();
    c.moveTo(textLeft + indent, y);
    c.lineTo(textLeft + indent + lineLen, y);
    c.stroke();

    li++;
    if (isLast) {
      y          += lineH + paraGap;
      paraLine    = 0;
      isParaStart = true;
    } else {
      y          += lineH;
      paraLine++;
      isParaStart = false;
    }
  }

  // Page number
  c.fillStyle = "rgba(26,20,16,0.22)";
  c.font      = "16px Georgia, serif";
  c.textAlign = "center";
  c.fillText(String(seed * 14 + 1), cv.width / 2, cv.height - 44);

  const t = new THREE.CanvasTexture(cv);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

// ── Component ─────────────────────────────────────────────────

interface Props {
  wrapperRef: React.RefObject<HTMLDivElement | null>;
}

export default function BookCanvas({ wrapperRef }: Props) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // ── Renderer ─────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    // ── Scene ────────────────────────────────────────────────
    const scene = new THREE.Scene();

    // ── Environment (PMREMGenerator for gold reflections) ────
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    // Warm studio env via gradient sphere trick
    const envScene = new THREE.Scene();
    const envSphere = new THREE.Mesh(
      new THREE.SphereGeometry(50, 32, 32),
      new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        vertexColors: true,
      })
    );
    const envGeo = envSphere.geometry as THREE.SphereGeometry;
    const pos = envGeo.attributes.position;
    const colors: number[] = [];
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const t = (y + 50) / 100;
      // Warm top, cool bottom
      colors.push(
        0.12 + t * 0.55,  // R
        0.10 + t * 0.42,  // G
        0.08 + t * 0.28   // B
      );
    }
    envGeo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    envScene.add(envSphere);
    const envMap = pmrem.fromScene(envScene).texture;
    scene.environment = envMap;
    scene.environmentIntensity = 0.6;
    pmrem.dispose();

    // ── Camera ───────────────────────────────────────────────
    // FOV 60 + lookAt offset ensures the opening pages stay in frame.
    // At FOV 42 the left edge of the frustum clipped the rotating cover.
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.15, 4.0);
    camera.lookAt(-0.3, 0, 0);

    // ── Lights ───────────────────────────────────────────────
    // Warm key from upper-right
    const key = new THREE.DirectionalLight(0xFFE8B0, 3.8);
    key.position.set(4, 6, 5);
    key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048);
    key.shadow.radius = 6;
    key.shadow.blurSamples = 10;
    key.shadow.camera.near = 0.1;
    key.shadow.camera.far = 20;
    key.shadow.camera.left   = -6;
    key.shadow.camera.right  =  4;
    key.shadow.camera.top    =  5;
    key.shadow.camera.bottom = -5;
    scene.add(key);

    // Cool fill from left
    const fill = new THREE.DirectionalLight(0x8FBFFF, 0.65);
    fill.position.set(-5, 2, 3);
    scene.add(fill);

    // Rim from behind
    const rim = new THREE.DirectionalLight(0xFFF8EE, 1.9);
    rim.position.set(1, 3, -6);
    scene.add(rim);

    // Soft ambient
    scene.add(new THREE.AmbientLight(0xFFEEDD, 0.3));

    // ── Textures ─────────────────────────────────────────────
    const coverTex = makeCoverTex();
    const spineTex = makeSpineTex();
    const pageTex  = Array.from({ length: N }, (_, i) => makePageTex(i));

    // ── Materials ────────────────────────────────────────────
    const coverFrontMat = new THREE.MeshPhysicalMaterial({
      map: coverTex,
      roughness: 0.38,
      metalness: 0,
      clearcoat: 0.55,
      clearcoatRoughness: 0.18,
      envMapIntensity: 0.8,
    });
    const darkMat = new THREE.MeshStandardMaterial({
      color: 0x0D0B12,
      roughness: 0.62,
      envMapIntensity: 0.3,
    });
    const spineMat = new THREE.MeshStandardMaterial({
      map: spineTex,
      roughness: 0.68,
      envMapIntensity: 0.3,
    });
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xC4922A,
      metalness: 0.88,
      roughness: 0.12,
      envMapIntensity: 1.4,
    });
    const pageMassMat = new THREE.MeshStandardMaterial({
      color: 0xEDE4D0,
      roughness: 0.92,
      envMapIntensity: 0.1,
    });

    // ── Book group ───────────────────────────────────────────
    const book = new THREE.Group();
    book.scale.set(1.2, 1.2, 1.2);
    book.rotation.y =  0.28;
    book.rotation.x = -0.08;
    scene.add(book);

    // Back cover
    const backCover = new THREE.Mesh(new THREE.BoxGeometry(W, H, CT), darkMat);
    backCover.position.z = -D / 2 - CT / 2;
    backCover.castShadow = true;
    backCover.receiveShadow = true;
    book.add(backCover);

    // Pages block — gold right/top/bottom edges, cream face/back
    const pagesBlock = new THREE.Mesh(
      new THREE.BoxGeometry(W - 0.015, H - 0.04, D),
      [goldMat, pageMassMat, goldMat, goldMat, pageMassMat, pageMassMat]
    );
    pagesBlock.position.x = 0.006;
    pagesBlock.castShadow = true;
    pagesBlock.receiveShadow = true;
    book.add(pagesBlock);

    // Spine strip
    const spineStrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.055, H, D + CT * 2 + 0.012),
      spineMat
    );
    spineStrip.position.x = -W / 2 - 0.0275;
    spineStrip.castShadow = true;
    book.add(spineStrip);

    // Front cover — pivot at left edge so it swings open
    const frontPivot = new THREE.Group();
    frontPivot.position.set(-W / 2, 0, D / 2 + CT / 2);
    book.add(frontPivot);

    const frontCover = new THREE.Mesh(
      new THREE.BoxGeometry(W, H, CT),
      [darkMat, spineMat, darkMat, darkMat, coverFrontMat, darkMat]
    );
    frontCover.position.x = W / 2; // offset so group origin = left edge
    frontCover.castShadow = true;
    frontCover.receiveShadow = true;
    frontPivot.add(frontCover);

    // Animated pages — each pivots at the spine
    const pageGroups: THREE.Group[] = [];
    for (let i = 0; i < N; i++) {
      const pg = new THREE.Group();
      const z  = D / 2 - (i / Math.max(N - 1, 1)) * D;
      pg.position.set(-W / 2, 0, z);

      const mat = new THREE.MeshStandardMaterial({
        map: pageTex[i % pageTex.length],
        roughness: 0.92,
        side: THREE.DoubleSide,
        envMapIntensity: 0.1,
      });

      const plane = new THREE.Mesh(
        new THREE.PlaneGeometry(W - 0.04, H - 0.05),
        mat
      );
      plane.position.x = (W - 0.04) / 2;
      plane.castShadow = true;
      plane.receiveShadow = true;
      pg.add(plane);
      book.add(pg);
      pageGroups.push(pg);
    }

    // Invisible shadow receiver beneath the book
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(20, 20),
      new THREE.ShadowMaterial({ opacity: 0.22 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y  = -(H / 2 + 0.06) * 1.2; // shift down to match scaled book bottom
    floor.receiveShadow = true;
    scene.add(floor);

    // ── Scroll animation ─────────────────────────────────────
    gsap.registerPlugin(ScrollTrigger);

    let st: ReturnType<typeof ScrollTrigger.create> | null = null;
    if (wrapperRef.current) {
      st = ScrollTrigger.create({
        trigger: wrapperRef.current,
        start: "top top",
        end:   "bottom bottom",
        scrub: 1.5,
        onUpdate(self) {
          const p = self.progress;

          // Phase 1 (0 → 0.42): front cover swings open ~148°
          // Reduced from 162° so the cover stays within the widened frustum
          frontPivot.rotation.y = -Math.PI * 0.82 * gsap.utils.clamp(0, 1, p / 0.42);

          // Phase 2 (0.3 → 0.95): pages turn, staggered
          pageGroups.forEach((pg, i) => {
            const start = 0.30 + i * 0.074;
            const pp    = gsap.utils.clamp(0, 1, (p - start) / 0.1);
            pg.rotation.y = -Math.PI * 0.78 * pp;
          });

          // Gentle book tilt follows scroll
          book.rotation.y =  0.28 - p * 0.14;
          book.rotation.x = -0.08 + p * 0.04;
        },
      });
    }

    // ── Idle float (respects prefers-reduced-motion) ──────────
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.to(book.position, {
        y: 0.07,
        duration: 2.8,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });
    }

    // ── Render loop ──────────────────────────────────────────
    let raf: number;
    const tick = () => { raf = requestAnimationFrame(tick); renderer.render(scene, camera); };
    tick();

    // ── Resize ───────────────────────────────────────────────
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ──────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      st?.kill();
      gsap.killTweensOf(book.position);

      scene.traverse((o) => {
        if (!(o instanceof THREE.Mesh)) return;
        o.geometry.dispose();
        (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
      });
      [coverTex, spineTex, ...pageTex, envMap].forEach((t) => t.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) mount.removeChild(renderer.domElement);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return <div ref={mountRef} className={styles.canvas} />;
}
