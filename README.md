# 5 MY BODY — Interactive Health Science Projection

สื่อ Interactive Projection สำหรับจุดเปิดเรื่องของนิทรรศการวิทยาศาสตร์สุขภาพขอนแก่น ออกแบบให้ฉายบนผนังและทำงานร่วมกับปุ่มจริง 5 ปุ่มที่ติดตั้งในระดับเด็กเอื้อมถึง

## Experience

หน้า Idle ใช้วิดีโอร่างกายมนุษย์แบบ loop อยู่กึ่งกลางผนัง เมื่อผู้ชมกดปุ่มใดปุ่มหนึ่ง ร่างกายจะเลื่อนไปด้านซ้ายและพื้นที่กลางจอจะเปิดเป็นเนื้อหาความรู้ของหัวข้อนั้น

1. สมองและใจ — Brain, Sleep & Mental Health
2. หัวใจและการเคลื่อนไหว — Circulation, Vital Signs & Physical Therapy
3. อาหารไปไหน — Digestion, Absorption & Nutrition
4. สุขภาพรอบตัวเรา — Prevention, Community & Environment
5. เซลล์และรหัสชีวิต — DNA, Laboratory & Medical Technology

เนื้อหาใน `src/data.ts` ใช้ข้อมูลจากแหล่งวิชาการจริง เช่น CDC, NIH/NHLBI, NIH/NIDDK, NHGRI และ MedlinePlus ไม่ได้ยึดข้อความในเอกสาร proposal แบบตรงตัว

## Physical buttons / sensor input

- Keyboard `1–5` = จำลองสัญญาณจากปุ่มจริงแต่ละปุ่ม
- `0` หรือ `Esc` = กลับหน้า Idle
- `F` = Fullscreen
- กดปุ่มอื่นระหว่างแสดงผลได้ทันทีเพื่อเปลี่ยนหัวข้อ
- ไม่มีการใช้งาน 38 วินาที ระบบกลับหน้า Idle อัตโนมัติ
- เปิด `?debug=1` เพื่อดู safe frame และแนวโซนปุ่มสำหรับ calibration หน้างาน

สำหรับปุ่มจริง แนะนำให้ controller/Arduino/USB HID ส่งค่าเป็นคีย์ `1`, `2`, `3`, `4`, `5` เพื่อให้ระบบเว็บไม่ต้องใช้ driver เฉพาะ

## Body video

วางไฟล์วิดีโอ loop ได้ที่:

- `public/media/body-loop.webm`
- หรือ `public/media/body-loop.mp4`

แนะนำวิดีโอพื้นหลังดำหรือ alpha/WebM, กล้องนิ่ง, full body, loop 8–15 วินาที และไม่ใส่ข้อความในวิดีโอ เพื่อให้ UI สามารถเลื่อนร่างกายไปด้านข้างได้โดยไม่แตกองค์ประกอบ

ถ้าไม่มีไฟล์วิดีโอ ระบบจะใช้ anatomical fallback animation อัตโนมัติ จึงยังสามารถทดสอบ interaction ได้

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

โปรเจกต์ตั้ง `git.deploymentEnabled: false` ใน `vercel.json` เพื่อปิด Vercel Auto Deploy จาก Git ทุก branch งาน production ให้ deploy แบบ manual หลังตรวจจอจริงแล้วเท่านั้น
