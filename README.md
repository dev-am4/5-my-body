# 5 MY BODY — Interactive Health Science Projection

เว็บต้นแบบสำหรับสื่อ Interactive Projection โซน 1 “สุขภาพสำคัญอย่างไร” โดยใช้ร่างกายมนุษย์เป็นแกนกลางและมี 5 จุดแตะ

1. Brain — จิตวิทยาและสุขภาพจิต (Mental Health)
2. Heart / Body — แพทยศาสตร์และกายภาพบำบัด (Medicine & PT)
3. Stomach — โภชนาการและโภชนบำบัด (Nutrition)
4. Aura — สาธารณสุขศาสตร์และระบาดวิทยา (Public Health)
5. Cells / DNA — เทคนิคการแพทย์และชีวเวชศาสตร์ (Medical Technology)

## Interaction

- แตะ hotspot บนร่างกาย หรือปุ่ม 1–5 ด้านล่าง
- Keyboard 1–5 ใช้จำลอง physical button / sensor input
- `Esc` หรือ `0` กลับหน้า Idle
- `F` เข้า/ออก Fullscreen
- เมื่อเล่น sequence จบ ระบบกลับ Idle อัตโนมัติ
- รองรับ query `?debug=1` เพื่อแสดงกรอบ safe area และข้อมูล calibration

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

ออกแบบเป็น Vite + React + TypeScript เพื่อให้รันได้ทั้งบนเว็บและเครื่อง local/kiosk โดยไม่ต้องพึ่ง backend
