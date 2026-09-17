# 5 MY BODY — SIMPLE VIDEO CONTRACT

โปรเจกต์นี้ใช้โครงสร้างหลักเพียง **6 วิดีโอ** เพื่อให้ทำงานง่ายและเปลี่ยนเรื่องได้ทันที

```text
00_IDLE_LOOP.mp4          # หน้าหลัก วนลูปตลอด
01_BRAIN.mp4              # สมองและใจ
02_HEART.mp4              # หัวใจและการเคลื่อนไหว
03_DIGESTION.mp4          # ระบบย่อยอาหาร
04_PUBLIC_HEALTH.mp4      # สุขภาพรอบตัวเรา
05_DNA.mp4                # เซลล์และ DNA
```

## พฤติกรรมของระบบ

```text
เปิดระบบ
  -> 00_IDLE_LOOP วนลูป

กดปุ่ม 1–5
  -> เล่นวิดีโอเรื่องนั้นทันที
  -> เล่นครั้งเดียวจนจบ
  -> กลับ 00_IDLE_LOOP อัตโนมัติ
```

ถ้าระหว่างดูวิดีโอย่อย ผู้ชมกดเรื่องอื่น:

```text
CURRENT STORY -> NEXT STORY ทันที
```

ไม่ต้องรอเรื่องเดิมจบ และไม่ต้องผ่านหน้า Idle ก่อน

## ความเนียนของรอยต่อ

เว็บใช้ A/B video deck สองชั้น วิดีโอเดิมจะยังคงอยู่จนวิดีโอใหม่ decode และพร้อมเล่น จากนั้น crossfade สั้น ๆ เพื่อหลบ black frame

ตอนวิดีโอย่อยใกล้จบ ระบบจะเรียก Idle ก่อนจบประมาณ 0.16 วินาที เพื่อให้เฟรมท้ายของเรื่องย่อยซ้อนกับเฟรมเริ่มของ Idle เล็กน้อย

อย่างไรก็ตาม ความไร้รอยต่อที่ดีที่สุดต้องมาจากไฟล์วิดีโอด้วย:

- ทุกเรื่องควรเริ่มจาก visual language เดียวกับ Idle
- ทุกเรื่องควรจบใน composition ที่กลับเข้าหา Idle ได้
- black level, exposure, lens, scale และตำแหน่งร่างกายควรคงที่
- ห้าม fade to black
- ห้ามฝังข้อความหรือ UI ในวิดีโอ
- ใช้ visual transition เช่น scan, blood flow, neural pulse, cellular zoom เพื่อเชื่อมภาพ

## Export baseline

- MP4
- H.264 High Profile
- 3840×2160 final / 1920×1080 prototype
- 30 fps Constant Frame Rate
- yuv420p
- Keyframe interval 1 วินาทีหรือน้อยกว่า
- Fast Start
- หลีกเลี่ยง Variable Frame Rate

## ปุ่มจริง / Keyboard test

- `1` Brain
- `2` Heart / Body
- `3` Digestion
- `4` Public Health
- `5` Cells / DNA
- `0` หรือ `Esc` = กลับ Idle ทันที
- `F` = Fullscreen

สำหรับหน้างานจริงควรวางทั้ง 6 ไฟล์ไว้บน Local SSD และรันแบบ kiosk ไม่ stream ผ่านอินเทอร์เน็ต
