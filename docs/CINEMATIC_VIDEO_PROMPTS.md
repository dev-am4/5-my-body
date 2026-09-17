# 5 MY BODY — 6-FILM CINEMATIC PROMPT PACK

เป้าหมาย: งานนี้ต้องรู้สึกเหมือน **Interactive Science Film บนผนัง** ไม่ใช่เว็บไซต์

ระบบใช้วิดีโอเพียง 6 ไฟล์:

```text
00_IDLE_LOOP.mp4
01_BRAIN.mp4
02_HEART.mp4
03_DIGESTION.mp4
04_PUBLIC_HEALTH.mp4
05_DNA.mp4
```

- `00_IDLE_LOOP` เล่นวนตลอดเมื่อไม่มีคนกด
- วิดีโอย่อยทั้ง 5 เป็นหนังสั้น ไม่ loop
- เมื่อวิดีโอย่อยจบ ระบบกลับ `00_IDLE_LOOP` อัตโนมัติ
- ถ้าผู้ชมกดหัวข้ออื่นระหว่างเล่น ระบบเปลี่ยนเรื่องได้ทันทีด้วย A/B video deck
- ทุกเรื่องต้องใช้ Master Human, black level, lens, camera, lighting และ body treatment เดียวกัน

---

# MASTER VISUAL DNA — ใช้กับทุกไฟล์

## Master image prompt

> A spectacular premium cinematic science-museum projection, full-body young human figure standing upright at the exact center of a 16:9 frame, facing forward in a calm neutral pose, entire body visible from head to feet. Deep black infinite environment with subtle volumetric atmosphere. Natural human exterior combined with elegant semi-transparent biomedical visualization: softly beating heart, faint vascular flow, lungs gently breathing, subtle neural activity in the brain, digestive anatomy appearing only in restrained layers, microscopic cellular particles drifting slowly around the body. Photorealistic but exhibition-safe, sophisticated medical visualization, cinematic depth, deep blacks, restrained cyan light with natural warm red and amber biological highlights. Large negative space around the figure. Camera completely locked, symmetrical composition, fixed lens, fixed exposure, fixed focus, no camera shake. No text, no labels, no logo, no interface, no HUD, no watermark, no extra limbs, no distorted anatomy, no gore, no horror, no cartoon styling. Museum-grade 4K immersive visual.

## Global consistency block

> Use the exact same person, same face, same body proportions, same body treatment, same camera position, same focal length, same exposure, same lighting direction, same black background and same floor relationship in every film. The body must remain the visual anchor of the experience. All transitions must happen through light, particles, internal anatomy and controlled spatial motion inside the same visual world. Never cut to a completely different set or background. Never fade to black.

---

# UNIVERSAL CONTINUITY RULE — สำคัญที่สุด

ทุกเรื่องใช้ตำแหน่งภาพร่วมกัน 3 สถานะ:

```text
HOME FRAME   = ร่างกายอยู่กลางจอ เหมือน 00_IDLE_LOOP
SWITCH FRAME = ร่างกายอยู่ซ้ายประมาณ 28–32% ของเฟรม
HOME FRAME   = กลับมาตรงกลางอีกครั้งก่อนจบ
```

เพื่อให้ "กดเปลี่ยนเรื่องทันที" แล้วยังเนียน:

- วิดีโอย่อยทุกเรื่องช่วงประมาณ `00:01.20` ต้องมี **SWITCH FRAME ที่เหมือนกัน**
- คนต้องอยู่ตำแหน่งซ้ายเท่ากัน ขนาดเท่ากัน แสงเท่ากัน และพื้นหลังดำเท่ากัน
- เว็บสามารถเริ่มวิดีโอเรื่องใหม่จาก `00:01.20` เมื่อเปลี่ยนเรื่องกลางคัน จึงไม่ต้องเห็นร่างกลับไปกลางก่อน
- ช่วงท้ายของทุกเรื่องต้องพาร่างกลับจาก SWITCH FRAME → HOME FRAME
- เฟรมท้ายต้องตรงกับเฟรมอ้างอิงของ `00_IDLE_LOOP`

สร้างไฟล์อ้างอิง 2 รูปและล็อกใช้ตลอดทั้งงาน:

```text
MASTER_HOME_FRAME.png
MASTER_SWITCH_FRAME.png
```

---

# 00 — IDLE LOOP

**ชื่อไฟล์:** `00_IDLE_LOOP.mp4`

**Duration:** 12–16 วินาที

**Start/End:** MASTER_HOME_FRAME

## Video prompt

> Locked static camera. The full-body human remains exactly centered in the frame and almost motionless except for subtle natural breathing. The body feels alive from within. A delicate volumetric medical scan slowly travels through the body. The heart pulses naturally with restrained warm red light. Faint blood flow travels through major vessels. The lungs gently expand and contract. Subtle electrical neural activity flickers inside the brain. The digestive system reveals briefly as a soft amber layer, then fades. Microscopic cellular particles drift slowly around and through the body. The effect should feel mysterious, beautiful and scientifically sophisticated, not like a hospital screen and not like a videogame. Motion remains calm and continuous. No camera movement, no text, no UI. The first and last frames must match perfectly for a seamless museum loop.

## Loop construction

1. ใช้ Master Image เป็น first frame
2. เจน 8 วินาทีช่วง A
3. ใช้ frame ปลาย A เป็น reference ทำช่วง B
4. ให้ช่วง B ค่อย ๆ กลับ visual state ของเฟรมแรก
5. ใน Premiere เลือกจุด loop ที่ breathing phase, scan brightness และ particle density ใกล้กัน
6. ห้าม dissolve ดำ ใช้ match-cut/cross-dissolve เพียง 2–4 frames ถ้าจำเป็น

**Output reference:** export เฟรมที่สงบที่สุดเป็น `MASTER_HOME_FRAME.png`

---

# 01 — BRAIN & MIND

**ชื่อไฟล์:** `01_BRAIN.mp4`

**Duration target:** 18–24 วินาที

## Story structure

`0.0–1.2s` HOME → SWITCH

> Continue exactly from MASTER_HOME_FRAME. A subtle cyan neural pulse rises through the spine and reaches the brain. As the brain illuminates, the same human figure glides smoothly toward the left side of frame. Camera remains completely locked. By exactly 1.2 seconds the body arrives at MASTER_SWITCH_FRAME position. No cut, no zoom.

`1.2–16s` Main visual

> Keep the human body fixed at MASTER_SWITCH_FRAME on the left. The brain remains softly illuminated. A beautiful three-dimensional neural network grows into the center and right side of the projection. Controlled electrical impulses move between neurons. Some impulses visually connect from the brain toward the heart, hands and facial region, suggesting how the nervous system connects perception, movement, emotion and the rest of the body. Introduce a subtle transition from active neural firing into calmer synchronized neural rhythms to visually suggest wakefulness and sleep without displaying charts or text. The body remains visible as the anchor at all times. No scene cut, no camera movement, no UI.

`16–22s` Return

> Neural activity gently contracts toward the brain. The network dissolves into subtle particles while the same human glides smoothly from MASTER_SWITCH_FRAME back to exact MASTER_HOME_FRAME. Brain glow returns to the restrained idle state. The final frame must visually match MASTER_HOME_FRAME so the web can crossfade directly to 00_IDLE_LOOP without a visible jump.

---

# 02 — HEART & BODY

**ชื่อไฟล์:** `02_HEART.mp4`

**Duration target:** 18–24 วินาที

`0.0–1.2s HOME → SWITCH`

> Start from MASTER_HOME_FRAME. One elegant heartbeat pulse radiates from the chest. Warm red light flows through major blood vessels as the same body glides to MASTER_SWITCH_FRAME on the left. Locked camera, same exposure, no cut.

`1.2–16s Main visual`

> Keep the body fixed on the left. The center and right fill with cinematic circulation visualization: realistic red blood cells flowing through branching arteries, capillaries and veins. Show oxygen delivery through restrained changes in light and color. Subtle muscular and joint movement layers appear briefly, connecting circulation to movement and physical rehabilitation. The visual should remain elegant, realistic and family-friendly, never gory. The human body stays visible as the macro anchor.

`16–22s Return`

> Blood-flow visualization contracts back toward the human. Vessel illumination softens. The body glides from MASTER_SWITCH_FRAME back to MASTER_HOME_FRAME. Final frame matches idle exactly.

---

# 03 — DIGESTION

**ชื่อไฟล์:** `03_DIGESTION.mp4`

**Duration target:** 18–24 วินาที

`0.0–1.2s HOME → SWITCH`

> Begin at MASTER_HOME_FRAME. A warm amber trace appears at the mouth and travels naturally down the esophagus. As the stomach and intestine softly illuminate, the same body glides to MASTER_SWITCH_FRAME on the left. Locked camera, no cut.

`1.2–16s Main visual`

> Body remains fixed on the left. The center becomes a sophisticated transparent digestive visualization. Food particles break down into smaller nutrient molecules. Show movement through stomach and small intestine, then luminous nutrient particles crossing the intestinal wall into tiny capillaries and entering the bloodstream. Make the transformation visually clear without diagrams, arrows or labels. Realistic biomedical visualization, elegant and family-friendly.

`16–22s Return`

> Nutrient particles fade into the bloodstream. Digestive illumination contracts back into the body. The human returns smoothly from MASTER_SWITCH_FRAME to MASTER_HOME_FRAME. Final frame matches idle.

---

# 04 — PUBLIC HEALTH

**ชื่อไฟล์:** `04_PUBLIC_HEALTH.mp4`

**Duration target:** 18–24 วินาที

`0.0–1.2s HOME → SWITCH`

> Begin at MASTER_HOME_FRAME. A soft transparent protective field appears around the human. Tiny airborne particles become visible. The same body glides smoothly to MASTER_SWITCH_FRAME on the left. Camera remains locked.

`1.2–16s Main visual`

> Human remains fixed on the left. The center and right reveal invisible connections between one person and the environment: airborne droplets, hands touching a surface, clean water flow, ventilation currents and abstract silhouettes of nearby people. Show prevention visually by interrupting pathways with hand washing, clean water, fresh airflow and protective spatial barriers, represented through realistic motion and light rather than icons. Avoid frightening disease imagery. Make public health feel like an invisible system surrounding everyday life.

`16–22s Return`

> Environmental pathways dissolve into darkness. The protective field contracts toward the individual. The same human returns smoothly to MASTER_HOME_FRAME. Final frame matches idle.

---

# 05 — CELLS & DNA

**ชื่อไฟล์:** `05_DNA.mp4`

**Duration target:** 18–24 วินาที

`0.0–1.2s HOME → SWITCH`

> Begin at MASTER_HOME_FRAME. A soft scanning light passes through skin and blood. The same human glides smoothly to MASTER_SWITCH_FRAME on the left while a microscopic window begins to open at center. Locked camera, no cut.

`1.2–16s Main visual`

> Keep the full human visible on the left as the macro anchor. In the center, create the visual impression of moving deeper through scale without changing the main camera: body to tissue to living cells, cell membrane, nucleus, chromosomes and DNA double helix. Use volumetric compositing and scale transformation inside the central visual field. Introduce subtle laboratory sample particles and measurement-like light behavior but never a sci-fi HUD. The relationship between the whole body and microscopic information must remain understandable through continuous visual transformation.

`16–22s Return`

> Reverse scale naturally from DNA to nucleus to cell to tissue. The microscopic field collapses into the body. The human glides from MASTER_SWITCH_FRAME back to MASTER_HOME_FRAME. Final frame matches idle exactly.

---

# NEGATIVE PROMPT / CONSISTENCY BLOCK

ใช้ต่อท้ายทุก generation เมื่อเครื่องมือรองรับ:

> no text, no subtitle, no logo, no watermark, no UI, no HUD, no medical dashboard, no floating labels, no camera shake, no fast zoom, no scene cut, no identity change, no face change, no extra arms, no extra fingers, no duplicated body, no distorted anatomy, no horror, no gore, no surgery, no cartoon, no anime, no oversaturated neon, no random background change, no morphing clothes, no body proportion change, no exposure shift, no focus breathing, no black frame

---

# GOOGLE FLOW PRODUCTION WORKFLOW

1. เจน **MASTER HUMAN IMAGE** ให้ผ่านก่อน
2. ใช้ภาพนั้นสร้าง `00_IDLE_LOOP`
3. Export `MASTER_HOME_FRAME.png` จาก Idle
4. สร้าง Brain ช่วง HOME → SWITCH ก่อน แล้ว export `MASTER_SWITCH_FRAME.png` ที่ 1.2 วินาที
5. ใช้ `MASTER_SWITCH_FRAME.png` เป็น reference กลางร่วมของทั้ง 5 เรื่อง
6. สำหรับแต่ละเรื่อง เจนเป็นช่วงสั้น 6–8 วินาทีแบบ chain แล้วค่อยต่อใน Premiere
7. ทุกช่วงใช้ last frame ของช่วงก่อนเป็น next start frame
8. ช่วงสุดท้ายต้องกลับให้ตรง `MASTER_HOME_FRAME.png`
9. ตรวจ visual continuity ด้วยการวางคลิปชนกันแบบ cut ก่อน ถ้ายังเห็นรอยค่อยใช้ dissolve 2–4 frames
10. Export final เป็นไฟล์ 6 ตัวตามชื่อด้านบน

---

# PREMIERE / EXPORT BASELINE

- Master: 3840×2160 หรือ resolution จริงของ projection master
- Prototype: 1920×1080
- 30 fps Constant Frame Rate
- MP4 / H.264 High Profile
- yuv420p
- Keyframe interval ≤ 1 วินาที
- Fast Start
- ห้าม Variable Frame Rate
- ให้ black level และ exposure ของทั้ง 6 ไฟล์ตรงกัน
- เสียงแยกจากภาพหลัก เพื่อให้ควบคุม VO/SFX หน้างานได้

## Seam test

ทดสอบ 7 เส้นทางนี้ก่อนส่งงาน:

```text
IDLE → BRAIN → IDLE
IDLE → HEART → IDLE
IDLE → DIGESTION → IDLE
IDLE → PUBLIC HEALTH → IDLE
IDLE → DNA → IDLE
BRAIN mid-film → HEART at SWITCH FRAME
DNA mid-film → DIGESTION at SWITCH FRAME
```

หาก 7 เส้นทางนี้มองไม่เห็น black flash, exposure jump, body-size jump หรือ position jump ถือว่า visual language พร้อมนำไปใช้กับผนังจริง
