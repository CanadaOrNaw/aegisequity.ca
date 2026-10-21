/* fx.js — LOCKED. Do not edit. Effects for Zack Harper portfolio v3.
   1. Full-screen halftone background (organic blobs drawn as dots) + halftone cursor blob   -> <canvas id="fx-bg">
   2. Dither reveal for media: add class "fx-media" to any <img>/<video> wrapper (.fx-media)
   3. Text scramble: add data-scramble to any element; it decodes when scrolled into view
   4. Live clock: any element with data-clock gets America/Toronto time HH:MM:SS
   Respects prefers-reduced-motion (static frame, no scramble). */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- 1. halftone background ---------- */
  const cv = document.getElementById('fx-bg');
  const gl = cv && cv.getContext('webgl', { antialias: false, premultipliedAlpha: false });
  if (gl) {
    const vs = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    const fs = `precision mediump float;
uniform vec2 r;uniform float t;uniform vec2 m;uniform float s;uniform vec3 ink;uniform vec3 bg;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*n(p);p*=2.03;a*=.5;}return v;}
void main(){
 float cell=7.;                                   // dot grid in px
 vec2 g=floor(gl_FragCoord.xy/cell)*cell+cell*.5;  // cell centre
 vec2 uv=g/r.y;
 float blobs=fbm(uv*2.2+vec2(t*.03,-t*.02)+s*.0004);
 blobs=smoothstep(.38,.62,blobs);              // organic shapes, low contrast
 float d=length(g-m)/r.y;                          // cursor blob
 float cur=smoothstep(.16,.0,d);
 float v=max(blobs,cur*.9);
 float rad=v*cell*.5;                              // dot radius from tone
 float dot_=step(length(gl_FragCoord.xy-g),rad);
 gl_FragColor=vec4(mix(bg,ink,dot_*(.3+.7*cur)),1.);
}`;
    const sh = (type, src) => { const o = gl.createShader(type); gl.shaderSource(o, src); gl.compileShader(o); return o; };
    const pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, vs)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(pr); gl.useProgram(pr);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const U = k => gl.getUniformLocation(pr, k);
    const css = getComputedStyle(document.documentElement);
    const rgb = v => (v.trim().match(/\w\w/g) || ['00', '00', '00']).map(x => parseInt(x, 16) / 255);
    gl.uniform3fv(U('ink'), rgb(css.getPropertyValue('--fx-ink').replace('#', '') || 'f2ede4'));
    gl.uniform3fv(U('bg'), rgb(css.getPropertyValue('--fx-bg').replace('#', '') || '161616'));
    let W = 0, H = 0, mx = -999, my = -999, tx = -999, ty = -999;
    const size = () => { const d = Math.min(devicePixelRatio, 1.5); W = cv.width = innerWidth * d; H = cv.height = innerHeight * d; gl.viewport(0, 0, W, H); };
    size(); addEventListener('resize', size);
    addEventListener('pointermove', e => { const d = W / innerWidth; tx = e.clientX * d; ty = H - e.clientY * d; });
    const t0 = performance.now();
    const frame = () => {
      mx += (tx - mx) * .12; my += (ty - my) * .12;  // eased cursor
      gl.uniform2f(U('r'), W, H); gl.uniform1f(U('t'), reduce ? 0 : (performance.now() - t0) / 1000);
      gl.uniform2f(U('m'), mx, my); gl.uniform1f(U('s'), scrollY);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) requestAnimationFrame(frame);
    };
    frame();
  }

  /* ---------- 2+3. reveal on scroll ---------- */
  const glyphs = '#%&*+=/<>[]{}01';
  const scramble = el => {
    const final = el.dataset.final ?? (el.dataset.final = el.textContent);
    if (reduce) { el.textContent = final; return; }
    let f = 0; const total = Math.min(28, 8 + final.length);
    const step = () => {
      el.textContent = [...final].map((c, i) => c === ' ' || i < (f / total) * final.length ? c : glyphs[(Math.random() * glyphs.length) | 0]).join('');
      if (++f <= total) requestAnimationFrame(step); else el.textContent = final;
    };
    step();
  };
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target; io.unobserve(el);
    if (el.hasAttribute('data-scramble')) scramble(el);
    if (el.classList.contains('fx-media')) el.classList.add('is-in');
  }), { threshold: .2 });
  document.querySelectorAll('[data-scramble],.fx-media').forEach(el => io.observe(el));
  document.querySelectorAll('.fx-media video').forEach(v => { v.muted = true; v.loop = true; v.playsInline = true; v.play().catch(() => {}); });

  /* ---------- 4. clock ---------- */
  const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  const tick = () => document.querySelectorAll('[data-clock]').forEach(el => el.textContent = fmt.format(new Date()));
  tick(); setInterval(tick, 1000);
})();
