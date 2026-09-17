# 5 MY BODY — VIDEO MASTER SPEC

เป้าหมาย: ให้ผู้ชมรู้สึกว่ากำลังดูภาพยนตร์เชิงวิทยาศาสตร์แบบ Interactive บนผนัง ไม่ใช่เว็บ UI

## หลักการภาพ

- Video-first: ภาพเคลื่อนไหวกินพื้นที่จอเกือบทั้งหมด
- UI มีเฉพาะชื่อหัวข้อสั้น ๆ, fact 1 ประโยค และตำแหน่งปุ่มจริง
- ห้ามใส่ข้อความ โลโก้ ปุ่ม หรือ HUD ลงในไฟล์วิดีโอ
- กล้อง, scale, lens, body position, lighting และ background ต้องคงที่ข้ามทุก segment
- ใช้ Master Human คนเดียวตลอดทั้งชุด
- ไม่ใช้ fade to black ระหว่าง segment
- ทุกการเปลี่ยนฉากต้องเกิดจาก motion ในโลกเดียวกัน เช่น scan, blood flow, neural pulse, cellular zoom หรือ particle transition

## Playback state

```text
00_IDLE_LOOP
  -> xx_TOPIC_IN
  -> xx_TOPIC_LOOP
  -> xx_TOPIC_OUT
  -> 00_IDLE_LOOP
```

หากเปลี่ยนจากหัวข้อหนึ่งไปอีกหัวข้อหนึ่งระหว่างใช้งาน:

```text
CURRENT_LOOP -> CURRENT_OUT -> NEXT_IN -> NEXT_LOOP
```

ห้าม hard-cut CURRENT_LOOP -> NEXT_LOOP

## Continuity rule — สำคัญที่สุด

ทุกคู่คลิปต้องแชร์ภาพต่อเนื่องกันอย่างน้อย 5–8 เฟรมที่ 30 fps

- เฟรมท้ายของ `00_IDLE_LOOP` ต้องตรงกับเฟรมแรกของทุก `xx_TOPIC_IN`
- เฟรมท้ายของ `xx_TOPIC_IN` ต้องตรงกับเฟรมแรกของ `xx_TOPIC_LOOP`
- เฟรมท้ายของ `xx_TOPIC_LOOP` ต้องสามารถวนกลับเฟรมแรกของตัวเองได้
- เฟรมท้ายของ `xx_TOPIC_OUT` ต้องตรงกับเฟรมเริ่มต้นของ `00_IDLE_LOOP`
- สำหรับ AI generation ให้ใช้ Last Frame ของคลิปก่อนหน้าเป็น Start Frame / Reference ของคลิปถัดไปเสมอ

## Master technical spec

- Master: 3840x2160 หรือ resolution จริงของ projection master
- Aspect ratio: 16:9 เว้นแต่ mapping หน้างานกำหนดต่างออกไป
- Frame rate: Constant 30 fps
- Delivery: MP4 / H.264 High Profile
- Audio: ไม่มีเสียงในไฟล์ภาพหลัก; แยก VO/SFX เพื่อควบคุมหน้างาน
- Background: deep black / very dark cinematic environment
- First/last-frame exposure และ black level ต้องเท่ากัน
- หลีกเลี่ยง automatic exposure, camera shake, focus breathing และ scene relighting

## Segment timing

- `00_IDLE_LOOP`: 12–16 s seamless loop
- `TOPIC_IN`: 4–8 s
- `TOPIC_LOOP`: 12–20 s seamless loop
- `TOPIC_OUT`: 4–8 s

เว็บมี A/B video deck และเริ่ม segment ถัดไปประมาณ 0.16 วินาทีก่อน segment ปัจจุบันจบ เพื่อให้มี overlap และลด black frame ที่รอยต่อ

## Visual story by topic

### 01 Brain & Mind
Idle human -> neural pulse at brain -> body shifts aside -> neural network / sleep / emotion visualization -> return to same human pose.

### 02 Heart & Body
Idle human -> heartbeat pulse -> blood-flow illumination -> circulation / movement visualization -> return.

### 03 Digestion
Idle human -> digestive tract activates -> food-to-nutrient journey -> absorption visualization -> return.

### 04 Public Health
Idle human -> protective field / airborne particles -> individual expands to environment/community relationship -> return.

### 05 Cells & DNA
Idle human -> camera dives from body to tissue -> cell -> nucleus -> DNA / lab-scale visualization -> zoom back to the exact idle human.

## Text policy

ข้อความบน projection จากเว็บเท่านั้น ไม่ฝังในวิดีโอ

หนึ่งช่วงควรมีไม่เกิน:
- ชื่อหัวข้อ 1 บรรทัด
- Key message 1 บรรทัด
- Fact สั้น 1 บรรทัด

ภาพต้องเล่าเรื่องได้แม้ปิดข้อความทั้งหมด
