//El humo líquido WebGL y la luz del cursor

"use client";

import { useEffect, useRef } from "react";

export default function Background() {
  const canvasRef = useRef(null);
  const spotRef = useRef(null);

  useEffect(() => {
    const RM = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let rafSpot, rafGl;

    // 1. Luz suave que sigue al cursor
    const sp = spotRef.current;
    let tx = window.innerWidth * 0.7;
    let ty = window.innerHeight * 0.25;
    let x = tx, y = ty;

    const onPointerMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    window.addEventListener("pointermove", onPointerMove);

    function moveSpot() {
      x += (tx - x) * 0.06;
      y += (ty - y) * 0.06;
      if (sp) {
        sp.style.setProperty("--x", `${x}px`);
        sp.style.setProperty("--y", `${y}px`);
      }
      rafSpot = requestAnimationFrame(moveSpot);
    }
    moveSpot();

    // 2. Shader WebGL (humo azul líquido)
    const c = canvasRef.current;
    const gl = c?.getContext("webgl");
    if (!gl) return;

    const fs =
      "precision mediump float;uniform vec2 r;uniform float t;uniform vec2 m;float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h(i),h(i+vec2(1.,0.)),f.x),mix(h(i+vec2(0.,1.)),h(i+vec2(1.,1.)),f.x),f.y);}float fb(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*n(p);p*=2.;a*=.5;}return v;}void main(){vec2 u=gl_FragCoord.xy/r;vec2 q=u*vec2(r.x/r.y,1.)*1.5;float tt=t*.035;vec2 w=vec2(fb(q+tt),fb(q+vec2(5.2,1.3)-tt));float f=fb(q+2.*w+m*.25);vec3 col=mix(vec3(.01,.015,.04),vec3(.04,.18,.7),smoothstep(.3,.85,f));col+=vec3(0.,.5,.8)*pow(smoothstep(.6,1.,f),3.)*.4;col*=smoothstep(1.3,.1,length(u-vec2(.6,.6)))*.8+.12;gl_FragColor=vec4(col,1.);}";

    function compileShader(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const pr = gl.createProgram();
    gl.attachShader(pr, compileShader(gl.VERTEX_SHADER, "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}"));
    gl.attachShader(pr, compileShader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr);
    gl.useProgram(pr);

    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const U = (k) => gl.getUniformLocation(pr, k);
    let mx = 0, my = 0, sx = 0, sy = 0;

    const onGlMove = (e) => {
      mx = e.clientX / window.innerWidth - 0.5;
      my = 0.5 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onGlMove);

    function resize() {
      c.width = window.innerWidth / 2;
      c.height = window.innerHeight / 2;
      gl.viewport(0, 0, c.width, c.height);
    }
    resize();
    window.addEventListener("resize", resize);

    function renderGl(now) {
      sx += (mx - sx) * 0.03;
      sy += (my - sy) * 0.03;
      gl.uniform2f(U("r"), c.width, c.height);
      gl.uniform1f(U("t"), now / 1000);
      gl.uniform2f(U("m"), sx, sy);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!RM) rafGl = requestAnimationFrame(renderGl);
    }
    rafGl = requestAnimationFrame(renderGl);

    return () => {
      cancelAnimationFrame(rafSpot);
      cancelAnimationFrame(rafGl);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointermove", onGlMove);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <>
      <canvas id="sh" ref={canvasRef}></canvas>
      <div className="bgf"></div>
      <div id="spot" ref={spotRef}></div>
    </>
  );
}