# 5 MY BODY — CINEMATIC MEDIA CONTRACT

โปรเจกต์นี้ออกแบบเป็น **Video-first Interactive Projection** เว็บทำหน้าที่รับปุ่ม คุม state, preload และ crossfade วิดีโอเท่านั้น

## ชื่อไฟล์ที่ระบบเรียกใช้

```text
00_IDLE_LOOP.mp4

01_BRAIN_IN.mp4
01_BRAIN_LOOP.mp4
01_BRAIN_OUT.mp4

02_HEART_IN.mp4
02_HEART_LOOP.mp4
02_HEART_OUT.mp4

03_DIGESTION_IN.mp4
03_DIGESTION_LOOP.mp4
03_DIGESTION_OUT.mp4

04_PUBLIC_HEALTH_IN.mp4
04_PUBLIC_HEALTH_LOOP.mp4
04_PUBLIC_HEALTH_OUT.mp4

05_DNA_IN.mp4
05_DNA_LOOP.mp4
05_DNA_OUT.mp4
```

## กฎสำคัญเรื่องความเนียน

ทุกหัวข้อต้องต่อเฟรมตาม chain นี้:

```text
IDLE reference frame
  → TOPIC_IN first frame
  → TOPIC_IN last frame = TOPIC_LOOP first frame
  → TOPIC_LOOP ต้องวนลูปได้เนียน
  → TOPIC_OUT first frame ต้องเข้ากับสถานะ TOPIC_LOOP
  → TOPIC_OUT last frame = IDLE reference frame
```

ห้ามเจนแต่ละคลิปแยกกันด้วย text prompt อย่างเดียว ให้เอา **last frame ของคลิปก่อนหน้าเป็น start/reference frame ของคลิปถัดไป** เพื่อคุมคน มุมกล้อง แสง สัดส่วน และตำแหน่งให้คงที่

## Export baseline สำหรับเครื่องนิทรรศการ

- Container: MP4
- Codec: H.264 High Profile
- Resolution: 3840×2160 สำหรับ final, 1920×1080 สำหรับ prototype
- Frame rate: 30 fps แบบ Constant Frame Rate
- Pixel format: yuv420p
- ไม่มีเสียงฝังในไฟล์ภาพ (แยก VO/SFX ภายหลัง)
- Keyframe interval: 1 วินาทีหรือน้อยกว่า (`keyint <= 30` ที่ 30 fps)
- Fast Start / moov atom อยู่ต้นไฟล์
- หลีกเลี่ยง Variable Frame Rate

## Playback ที่เว็บทำให้แล้ว

- ใช้ video deck A/B ซ้อนกัน 2 ชั้น
- เปิดคลิปใหม่หลัง `canplay` แล้ว crossfade ประมาณ 360 ms
- preload `00_IDLE_LOOP` และ `*_IN` ทุกหัวข้อตั้งแต่เริ่ม
- preload `*_LOOP` และ `*_OUT` ต่อหลังจากนั้น
- ถ้า media ยังไม่มี จะ fallback เป็น body vector เพื่อทดสอบ interaction ก่อน

## ปุ่มจริง / Keyboard test

- `1` Brain
- `2` Heart / Body
- `3` Digestion
- `4` Public Health
- `5` Cells / DNA
- `0` หรือ `Esc` = Return to Idle
- `F` = Fullscreen

สำหรับหน้างานจริงควรวางไฟล์ทั้งหมดไว้บน **Local SSD** และรันแบบ kiosk ไม่ stream วิดีโอผ่านอินเทอร์เน็ต
