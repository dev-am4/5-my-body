# 5 MY BODY — VIDEO MASTER SPEC

เป้าหมาย: ให้ผู้ชมรู้สึกว่ากำลังดู **Interactive Film บนผนัง** ไม่ใช่เว็บ UI

## โครงสร้างหลัก

ใช้เพียง 6 วิดีโอ:

```text
00_IDLE_LOOP.mp4
01_BRAIN.mp4
02_HEART.mp4
03_DIGESTION.mp4
04_PUBLIC_HEALTH.mp4
05_DNA.mp4
```

`00_IDLE_LOOP` คือหน้าหลักและวนลูปตลอดเมื่อไม่มีคนเลือกหัวข้อ

เมื่อกดปุ่ม 1–5 ให้เล่นเรื่องนั้นทันทีแบบ one-shot เมื่อจบกลับ `00_IDLE_LOOP` อัตโนมัติ

หากผู้ชมกดหัวข้ออื่นระหว่างวิดีโอย่อยกำลังเล่น ให้เปลี่ยนไปเรื่องใหม่ทันที ไม่ต้องรอเรื่องเดิมจบและไม่ต้องกลับหน้า Idle ก่อน

## Playback state

```text
IDLE LOOP
  -> STORY 1/2/3/4/5
  -> IDLE LOOP
```

หรือเมื่อเปลี่ยนใจระหว่างเรื่อง:

```text
CURRENT STORY
  -> NEXT STORY immediately
```

เว็บใช้ A/B video deck เพื่อให้คลิปเก่ายังอยู่จนคลิปใหม่พร้อมเล่น แล้ว crossfade สั้น ๆ แทนการดับจอ

## หลักการภาพ

- Video-first: ภาพเคลื่อนไหวกินพื้นที่จอเกือบทั้งหมด
- UI มีเฉพาะชื่อหัวข้อสั้น ๆ, key message สั้น ๆ และตำแหน่งปุ่มจริง
- ห้ามใส่ข้อความ โลโก้ ปุ่ม หรือ HUD ลงในไฟล์วิดีโอ
- ใช้ visual language เดียวกันทั้ง 6 คลิป
- กล้อง, scale, lens, body position, lighting และ background ควรคงที่หรือเปลี่ยนอย่างมีเหตุผลต่อเนื่อง
- ใช้ Master Human คนเดียวตลอดทั้งชุด
- ไม่ใช้ fade to black ระหว่างเรื่อง
- การเปลี่ยนฉากควรเกิดจาก motion ในโลกเดียวกัน เช่น scan, blood flow, neural pulse, cellular zoom หรือ particle transition

## Continuity rule

เป้าหมายคือให้ทุกเรื่องสามารถเข้าและออกจาก `00_IDLE_LOOP` ได้โดยไม่รู้สึกว่าคนละชิ้น

- เฟรมต้นของแต่ละ Story ควรมีองค์ประกอบที่สัมพันธ์กับ Idle
- เฟรมท้ายของแต่ละ Story ควรกลับเข้าสู่ composition ที่ใกล้ Idle
- black level และ exposure ต้องใกล้กันทุกคลิป
- หลีกเลี่ยง scene relighting, camera shake, focus breathing และการเปลี่ยนสเกลแบบกระโดด
- หากเจนด้วย AI ให้ใช้ภาพ Master และ reference frame เดียวกันทั้ง 6 คลิป

ระบบจะเริ่มกลับ Idle ก่อน Story จบประมาณ 0.16 วินาที เพื่อให้มี overlap เล็กน้อยและลด black frame

## Master technical spec

- Master: 3840×2160 หรือ resolution จริงของ projection master
- Aspect ratio: 16:9 เว้นแต่ mapping หน้างานกำหนดต่างออกไป
- Frame rate: Constant 30 fps
- Delivery: MP4 / H.264 High Profile
- Pixel format: yuv420p
- Audio: แนะนำแยก VO/SFX เพื่อควบคุมหน้างาน
- Background: deep black / very dark cinematic environment
- Keyframe interval: 1 วินาทีหรือน้อยกว่า
- Fast Start / moov atom อยู่ต้นไฟล์
- หลีกเลี่ยง Variable Frame Rate

## Timing แนะนำ

- `00_IDLE_LOOP`: 10–16 วินาที seamless loop
- วิดีโอย่อยแต่ละเรื่อง: ประมาณ 15–30 วินาที

วิดีโอย่อยไม่จำเป็นต้อง loop เพราะเล่นครั้งเดียวแล้วกลับหน้าหลัก

## Visual story by topic

### 01 Brain & Mind
เริ่มจากร่างกาย -> สมองและเครือข่ายประสาทตอบสนอง -> แสดงการนอน/อารมณ์/การสื่อสารของสมอง -> กลับสู่ภาพรวมของร่างกาย

### 02 Heart & Body
เริ่มจากร่างกาย -> heartbeat pulse -> blood flow -> circulation / movement -> กลับสู่ภาพรวมของร่างกาย

### 03 Digestion
เริ่มจากร่างกาย -> ระบบย่อยอาหารทำงาน -> การย่อยและดูดซึม -> พลังงานและสารอาหาร -> กลับสู่ภาพรวมของร่างกาย

### 04 Public Health
เริ่มจากคนหนึ่งคน -> มือ/อากาศ/น้ำ/สิ่งแวดล้อม -> การป้องกันและความเชื่อมโยงระดับชุมชน -> กลับสู่คนหนึ่งคน

### 05 Cells & DNA
เริ่มจากร่างกาย -> เนื้อเยื่อ -> เซลล์ -> nucleus -> DNA / laboratory-scale visualization -> zoom กลับสู่ร่างกาย

## Text policy

ข้อความบน projection มาจากเว็บเท่านั้น ไม่ฝังในวิดีโอ

หนึ่งช่วงควรมีเพียง:
- ชื่อหัวข้อสั้น ๆ 1 บรรทัด
- Key message หรือ Fact สั้น ๆ 1 บรรทัด

ภาพต้องเล่าเรื่องได้แม้ปิดข้อความทั้งหมด
