export type TopicId = 'brain' | 'heart' | 'stomach' | 'aura' | 'dna'

export type BodyTopic = {
  id: TopicId
  number: number
  nameTh: string
  nameEn: string
  fieldTh: string
  fieldEn: string
  accent: string
  stat: string
  statLabel: string
  hook: string
  whatHappens: string
  scienceHelps: string
  tryThis: string
  nextPath: string[]
  sourceLabel: string
  sourceUrl: string
}

export const topics: BodyTopic[] = [
  {
    id: 'brain',
    number: 1,
    nameTh: 'สมองและใจ',
    nameEn: 'BRAIN & MIND',
    fieldTh: 'สมอง การนอน อารมณ์ และพฤติกรรม',
    fieldEn: 'Brain · Sleep · Mental Health',
    accent: '#73e7ff',
    stat: '9–12 ชม.',
    statLabel: 'เวลานอนที่แนะนำต่อวันสำหรับเด็กอายุ 6–12 ปี ส่วนวัย 13–17 ปีอยู่ที่ 8–10 ชั่วโมง',
    hook: 'เวลาที่เราหลับ สมองไม่ได้ “ปิดเครื่อง” แต่ยังทำงานที่สำคัญต่อการเรียนรู้ สมาธิ และสุขภาวะทางอารมณ์',
    whatHappens: 'การนอนให้เพียงพอช่วยให้เด็กและวัยรุ่นมีสมาธิและพร้อมเรียนรู้ ขณะที่การนอนไม่พอสัมพันธ์กับปัญหาด้านความสนใจ พฤติกรรม และสุขภาพจิตได้',
    scienceHelps: 'นักวิทยาศาสตร์สุขภาพไม่ได้มองแค่สมองอย่างเดียว แต่เชื่อมข้อมูลจากการนอน อารมณ์ พฤติกรรม ร่างกาย และสภาพแวดล้อมเข้าด้วยกัน',
    tryThis: 'คืนนี้ลองสังเกตเวลานอนของตัวเอง แล้วเทียบกับช่วงเวลาที่เหมาะกับวัย',
    nextPath: ['การนอน', 'อารมณ์', 'พฤติกรรม', 'ระบบประสาท'],
    sourceLabel: 'อ้างอิง: CDC — Sleep and Health / About Sleep',
    sourceUrl: 'https://www.cdc.gov/sleep/about/index.html',
  },
  {
    id: 'heart',
    number: 2,
    nameTh: 'หัวใจและการเคลื่อนไหว',
    nameEn: 'HEART & BODY',
    fieldTh: 'ระบบไหลเวียน สัญญาณชีพ และกายภาพบำบัด',
    fieldEn: 'Circulation · Vital Signs · Physical Therapy',
    accent: '#ff6f8d',
    stat: '≈ กำปั้นของเรา',
    statLabel: 'หัวใจมีขนาดโดยประมาณใกล้เคียงกำปั้น และทำหน้าที่สูบเลือดผ่านเครือข่ายหลอดเลือดทั่วร่างกาย',
    hook: 'ทุกครั้งที่หัวใจบีบตัว เลือดจะพาออกซิเจนและสารอาหารไปยังอวัยวะต่าง ๆ และพาคาร์บอนไดออกไซด์กลับไปยังปอด',
    whatHappens: 'หัวใจเป็นศูนย์กลางของระบบไหลเวียน เลือดเดินทางผ่านหลอดเลือดแดง หลอดเลือดดำ และเส้นเลือดฝอย เพื่อให้เนื้อเยื่อทั่วร่างกายทำงานได้',
    scienceHelps: 'ชีพจร ความดัน การหายใจ การตรวจร่างกาย และการเคลื่อนไหวเป็นข้อมูลคนละชิ้นที่ช่วยให้ทีมสุขภาพเข้าใจการทำงานของร่างกายและวางแผนฟื้นฟู',
    tryThis: 'ลองจับชีพจรตัวเองก่อนและหลังขยับร่างกาย แล้วสังเกตว่าจังหวะเปลี่ยนอย่างไร',
    nextPath: ['หัวใจ', 'สัญญาณชีพ', 'กล้ามเนื้อ', 'การฟื้นฟู'],
    sourceLabel: 'อ้างอิง: NIH/NHLBI — How the Heart Works',
    sourceUrl: 'https://www.nhlbi.nih.gov/health/heart',
  },
  {
    id: 'stomach',
    number: 3,
    nameTh: 'อาหารไปไหน',
    nameEn: 'DIGESTION',
    fieldTh: 'การย่อย การดูดซึม และโภชนาการ',
    fieldEn: 'Digestion · Absorption · Nutrition',
    accent: '#ffd15c',
    stat: 'ลำไส้เล็ก',
    statLabel: 'คือบริเวณที่ดูดซึมสารอาหารจากอาหารส่วนใหญ่เข้าสู่ร่างกาย',
    hook: 'การย่อยเริ่มตั้งแต่ในปาก ไม่ได้เริ่มที่กระเพาะ และอาหารต้องถูกแยกให้เล็กพอก่อนที่ร่างกายจะนำไปใช้ได้',
    whatHappens: 'กระเพาะช่วยคลุกอาหารกับน้ำย่อย จากนั้นลำไส้เล็กย่อยต่อและดูดซึมสารอาหาร ส่วนลำไส้ใหญ่ช่วยดูดซึมน้ำและเปลี่ยนของเสียให้เป็นอุจจาระ',
    scienceHelps: 'สารอาหารที่ดูดซึมแล้วถูกนำไปใช้เป็นพลังงาน ช่วยการเจริญเติบโต และซ่อมแซมเซลล์ จึงเป็นเหตุผลว่าทำไม “กินอะไร” จึงเชื่อมกับการทำงานของทั้งร่างกาย',
    tryThis: 'มื้อถัดไปลองมองอาหารหนึ่งจาน แล้วหาว่ามีแหล่งโปรตีน คาร์โบไฮเดรต ผัก ผลไม้ และน้ำครบแค่ไหน',
    nextPath: ['โภชนาการ', 'ลำไส้', 'พลังงาน', 'จุลินทรีย์'],
    sourceLabel: 'อ้างอิง: NIH/NIDDK — Your Digestive System & How it Works',
    sourceUrl: 'https://www.niddk.nih.gov/health-information/digestive-diseases/digestive-system-how-it-works',
  },
  {
    id: 'aura',
    number: 4,
    nameTh: 'สุขภาพรอบตัวเรา',
    nameEn: 'PUBLIC HEALTH',
    fieldTh: 'การป้องกันโรค ชุมชน และสิ่งแวดล้อม',
    fieldEn: 'Prevention · Community · Environment',
    accent: '#62e6a6',
    stat: '23–40%',
    statLabel: 'งานศึกษาที่ CDC สรุปพบว่า การให้ความรู้เรื่องการล้างมือในชุมชนช่วยลดจำนวนผู้ป่วยโรคท้องเสียได้ประมาณช่วงนี้',
    hook: 'สุขภาพไม่ได้ขึ้นอยู่กับร่างกายของเราคนเดียว มือ น้ำ อากาศ พื้นผิว โรงเรียน บ้าน และคนรอบตัวล้วนเชื่อมโยงกัน',
    whatHappens: 'เชื้อโรคสามารถติดมือจากคนหรือพื้นผิว แล้วเข้าสู่ร่างกายเมื่อเราแตะตา จมูก ปาก หรือปนเปื้อนอาหาร การล้างมือด้วยสบู่จึงช่วยตัดเส้นทางการแพร่เชื้อ',
    scienceHelps: 'สาธารณสุขทำงานตั้งแต่สุขอนามัย น้ำสะอาด สุขาภิบาล วัคซีน การเฝ้าระวังโรค ไปจนถึงการดูแลสิ่งแวดล้อม เพื่อป้องกันก่อนที่คนจำนวนมากจะป่วย',
    tryThis: 'ก่อนกินอาหารและหลังใช้ห้องน้ำ ลองจำ 5 ขั้น: เปียก–ถูสบู่–ขัด–ล้าง–เช็ดให้แห้ง',
    nextPath: ['เชื้อโรค', 'สุขาภิบาล', 'สิ่งแวดล้อม', 'ระบาดวิทยา'],
    sourceLabel: 'อ้างอิง: CDC — Handwashing Facts',
    sourceUrl: 'https://www.cdc.gov/clean-hands/data-research/facts-stats/index.html',
  },
  {
    id: 'dna',
    number: 5,
    nameTh: 'เซลล์และรหัสชีวิต',
    nameEn: 'CELLS & DNA',
    fieldTh: 'DNA ห้องปฏิบัติการ และเทคโนโลยีการแพทย์',
    fieldEn: 'DNA · Laboratory · Medical Technology',
    accent: '#b899ff',
    stat: '≈ 3 พันล้าน',
    statLabel: 'คู่เบสของ DNA อยู่ในจีโนมมนุษย์หนึ่งชุด พร้อมยีนประมาณ 20,000 ยีน',
    hook: 'สิ่งที่เล็กจนมองไม่เห็นด้วยตาเปล่า สามารถเก็บข้อมูลมหาศาลเกี่ยวกับการทำงานของร่างกายไว้ได้',
    whatHappens: 'DNA เก็บคำสั่งที่เซลล์ใช้ในการสร้างโปรตีน ซึ่งโปรตีนมีบทบาทตั้งแต่โครงสร้างของร่างกายไปจนถึงปฏิกิริยาและการส่งสัญญาณในเซลล์',
    scienceHelps: 'ห้องปฏิบัติการตรวจตัวอย่าง เช่น เลือด ปัสสาวะ หรือเนื้อเยื่อ เพื่อหาข้อมูลสุขภาพ ผลตรวจเป็นหนึ่งส่วนของภาพรวมและต้องแปลร่วมกับประวัติ การตรวจร่างกาย และข้อมูลอื่น',
    tryThis: 'มองร่างกายจากระดับใหญ่ไปเล็ก: ร่างกาย → อวัยวะ → เนื้อเยื่อ → เซลล์ → DNA',
    nextPath: ['เซลล์', 'DNA', 'ตัวอย่างตรวจ', 'ห้องปฏิบัติการ'],
    sourceLabel: 'อ้างอิง: NHGRI/NIH — DNA Fact Sheet; MedlinePlus — Laboratory Tests',
    sourceUrl: 'https://www.genome.gov/about-genomics/fact-sheets/Deoxyribonucleic-Acid-Fact-Sheet',
  },
]
