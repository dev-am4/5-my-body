# 00_IDLE_LOOP — MASTER PRODUCTION PACK

เป้าหมาย: สร้างวิดีโอหน้าหลักที่ดูเหมือนภาพยนตร์วิทยาศาสตร์บนผนัง ไม่ใช่ UI และใช้เป็นต้นแบบภาพร่วมของวิดีโอย่อยทั้ง 5 เรื่อง

## Output

```text
public/media/00_IDLE_LOOP.mp4
MASTER_HOME_FRAME.png
```

- Duration final: 12–16 วินาที
- Aspect ratio: 16:9
- Prototype: 1920×1080
- Final: 3840×2160 หรือ resolution master จริงของผนัง
- Frame rate: 30 fps Constant
- Camera: locked / no shake / no zoom
- No text / no logo / no HUD / no watermark
- Start frame = End frame

---

# A. MASTER HUMAN IMAGE PROMPT

ใช้สร้างภาพอ้างอิงก่อนนำไป Image-to-Video

> A premium cinematic science museum installation visual, a single full-body young adult human standing upright at the exact center of a 16:9 frame, facing forward, calm neutral posture, entire body visible from head to feet, natural realistic body proportions, contemporary neutral clothing with simple fitted dark fabric, no logos, no patterns. Deep infinite black environment with subtle volumetric atmosphere and almost invisible floor grounding. The human remains visually natural from the outside while elegant semi-transparent biomedical layers are faintly visible within the body: softly glowing brain activity, subtle lungs, a softly beating heart, restrained vascular flow, digestive anatomy in warm amber, microscopic cellular particles. Photorealistic, sophisticated biomedical visualization, museum-grade, cinematic, awe-inspiring, scientifically inspired, family-friendly. Deep blacks, restrained cyan and teal environmental light, warm red biological highlights at the heart, soft amber digestion highlights. Large negative space around the body. Perfectly symmetrical framing, locked camera, fixed lens, fixed exposure, fixed focus, no dramatic pose. No text, no labels, no UI, no HUD, no medical dashboard, no logo, no watermark, no gore, no horror, no surgery, no cartoon, no anime, no extra limbs, no duplicated body, no distorted anatomy.

## ภาพที่ต้องผ่านก่อนเริ่มเจนวิดีโอ

- คนต้องอยู่กลางจอจริง
- หัวถึงเท้าอยู่ใน Safe Frame
- ดำหลังภาพต้องดำลึกและสะอาด
- อวัยวะภายในเห็นแบบพอดี ไม่เป็นภาพ X-ray เต็มตัวตลอดเวลา
- ไม่มี HUD หรือกราฟิกเหมือนเกม
- แสงไม่แรงจนรายละเอียดผิว/สัดส่วนหาย
- ต้องมีพื้นที่ซ้ายและขวาเหลือเยอะ เพราะวิดีโอย่อยจะใช้พื้นที่นี้เล่าเรื่อง

เมื่อภาพผ่าน ให้ใช้ภาพนี้เป็น `MASTER_HOME_FRAME.png`

---

# B. IDLE LOOP — CLIP A

Duration แนะนำ: 8 วินาที

## Start frame

`MASTER_HOME_FRAME.png`

## Prompt

> Locked static camera. Continue from the supplied reference image with the exact same person, face, body proportions, clothing, camera position, focal length, exposure, lighting and black background. The full-body human remains exactly centered and almost motionless except for very subtle natural breathing. The body feels quietly alive from within. A delicate volumetric medical scan slowly travels from the head toward the torso. The brain shows restrained cyan neural activity, then softly fades. The lungs gently expand and contract with realistic breathing. The heart pulses naturally with a restrained warm red glow. Very faint blood-flow illumination travels through major vessels. Microscopic particles drift slowly around and through the body. Movement is slow, elegant and continuous. No camera movement, no zoom, no scene change, no cut, no text, no UI, no HUD. The environment stays deep black and premium cinematic. End in a calm visual state that can continue directly into another segment.

## Negative prompt

> no text, no subtitle, no logo, no watermark, no UI, no HUD, no medical dashboard, no floating labels, no camera shake, no zoom, no dolly, no scene cut, no identity change, no face change, no body proportion change, no extra arms, no extra fingers, no duplicated person, no distorted anatomy, no gore, no horror, no surgery, no cartoon, no anime, no oversaturated neon, no random background, no exposure shift, no focus breathing, no black frame

หลังเจน Clip A ให้ Export **Last Frame A** เพื่อนำไปเป็น Start Frame ของ Clip B

---

# C. IDLE LOOP — CLIP B

Duration แนะนำ: 8 วินาที

## Start frame

ใช้ **Last Frame A**

## Prompt

> Continue seamlessly from the supplied start frame. Locked static camera, identical person, identical body position, identical lighting, identical exposure and identical black environment. The subtle medical visualization continues naturally. A restrained warm amber digestive glow briefly appears inside the abdomen, then gently fades. Microscopic cellular particles become slightly more visible around the torso, then gradually reduce. A soft volumetric scan travels back upward through the body. Neural, vascular, heart and breathing motion settle toward the exact visual condition of the original MASTER_HOME_FRAME. The person remains centered and nearly motionless, with only natural breathing. During the final two seconds, gradually restore the exact same internal illumination balance, particle density, body pose, breathing phase and exposure as the original MASTER_HOME_FRAME. The final frame must visually match MASTER_HOME_FRAME as closely as possible for a seamless exhibition loop. No camera movement, no scene cut, no text, no UI, no fade to black.

## Negative prompt

> no text, no subtitle, no logo, no watermark, no UI, no HUD, no camera movement, no zoom, no identity change, no face change, no anatomy change, no additional person, no gore, no horror, no cartoon, no background change, no lighting change, no exposure shift, no focus breathing, no black frame

---

# D. PREMIERE ASSEMBLY

วางคลิปแบบนี้:

```text
CLIP_A  |  CLIP_B
```

ก่อนใช้ transition ให้ลองต่อแบบ **cut ตรง ๆ** ก่อน ถ้ารอยต่อ A→B เนียนอยู่แล้ว ไม่ต้องใส่ effect เพิ่ม

ที่ปลาย Clip B → ต้น Clip A:

1. เปรียบเทียบ first frame ของ A กับ last frame ของ B
2. ปรับ Lumetri เฉพาะถ้า black level หรือ exposure ต่างกันเล็กน้อย
3. ถ้ายังจับรอยได้ ใช้ Cross Dissolve เพียง 2–4 frames
4. ห้าม Fade to Black
5. ตรวจ breathing phase ไม่ให้หน้าอกกระโดด
6. ตรวจ heart glow / particle density ไม่ให้วูบ

Final timeline target: 12–16 วินาที ถ้า A+B รวม 16 วินาทีแล้วลูปเนียน ใช้ได้เลย

---

# E. MASTER FRAME RULE สำหรับอีก 5 เรื่อง

หลัง `00_IDLE_LOOP` ผ่านแล้ว ให้ถือ `MASTER_HOME_FRAME.png` เป็นภาพต้นทางร่วมของวิดีโอทั้งหมด

ทุกวิดีโอย่อย:

```text
01_BRAIN.mp4
02_HEART.mp4
03_DIGESTION.mp4
04_PUBLIC_HEALTH.mp4
05_DNA.mp4
```

ต้องเริ่มจาก visual world เดียวกันนี้ และตอนท้ายต้องกลับมาใกล้ `MASTER_HOME_FRAME` เพื่อให้เว็บ crossfade กลับ `00_IDLE_LOOP` ได้โดยแทบไม่เห็นรอยต่อ

## กฎสำหรับการกดเปลี่ยนเรื่องทันที

เพราะผู้ชมสามารถกดเปลี่ยนจากเรื่องหนึ่งไปอีกเรื่องได้ทันที วิดีโอย่อยทั้ง 5 ต้องรักษา:

- background black level เดียวกัน
- คนคนเดียวกัน
- scale เดียวกัน
- camera/lens เดียวกัน
- lighting direction เดียวกัน
- color science เดียวกัน

ช่วงต้น 1–1.5 วินาทีของแต่ละเรื่องควรเริ่มจาก `MASTER_HOME_FRAME` แล้วค่อย activate ระบบของเรื่องนั้นอย่างรวดเร็ว เพื่อให้การสลับผ่าน A/B deck ดูเป็นธรรมชาติ

---

# F. ACCEPTANCE TEST

`00_IDLE_LOOP` ถือว่าผ่านเมื่อ:

- ดูวน 5 รอบแล้วจับจุด loop ไม่ได้ง่าย
- ไม่มี black flash
- ไม่มี camera jump
- หน้า/สัดส่วนคนไม่ morph
- การหายใจไม่กระโดดที่ loop point
- heart glow / scan / particles ไม่กระโดด
- ภาพยังน่าสนใจแม้ไม่มีข้อความ UI ใด ๆ
- สามารถใช้ frame กลางที่สงบเป็น `MASTER_HOME_FRAME` ให้คลิปย่อยต่อได้

นี่คือ Master Visual ของทั้งระบบ ห้ามเริ่มผลิต 5 เรื่องย่อยจริงจนกว่า `00_IDLE_LOOP` จะผ่านเกณฑ์นี้
