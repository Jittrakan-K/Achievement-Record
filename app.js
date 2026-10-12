/**
 * Work Achievement Record & Tracker - Application Logic
 * ORBRAY — PRODUCTION TECHNOLOGY
 * Updated Schema:
 * - REQUEST NUMBER (replacing Code)
 * - REQUEST NAME, REQUEST DATE, FACTORY, DEPARTMENT, PROCESS
 * - PDF Attachment (Production Technology Job Request)
 * - Work Folder Path / Link
 * - Removed: Key Outcome, Tags, Reference Link
 */

// --- Production Technology Categories ---
const DEFAULT_CATEGORIES = [
  { id: 'cat_jig', name: 'JIG & FIXTURE', icon: '🛠️', color: '#2563eb' },
  { id: 'cat_acc', name: 'ACCESSORIES', icon: '🔩', color: '#059669' },
  { id: 'cat_pr', name: 'PR / PURCHASING', icon: '📦', color: '#ea580c' },
  { id: 'cat_imp', name: 'IMPROVEMENT / KAIZEN', icon: '💡', color: '#7c3aed' },
  { id: 'cat_prj', name: 'SPECIAL PROJECT', icon: '🚀', color: '#0284c7' },
  { id: 'cat_pvt', name: 'PRIVATE PROJECT', icon: '🔒', color: '#e11d48' }
];

// --- Sample Data Matching Orbray Production Technology ---
const INITIAL_SAMPLE_ACHIEVEMENTS = [
    {
        "id":  "achv_pr_1",
        "title":  "(PR) MAKITA 766004-9 HP457 / HP482",
        "categoryId":  "cat_pr",
        "code":  "FOR TECHNO",
        "quotation":  "26-0508",
        "requestName":  "NUY",
        "requestDate":  "2026-09-02",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "wait",
        "completionDate":  "",
        "description":  "MAKITA 766004-9 ดอกไขควงและสว่านกระแทกไร้สายสำหรับงานเทคโนโลยี",
        "note":  "(รอ) รอถอดออกได้ค่อยสั่ง",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "MAKITA_HP457_SPECS",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\26-0508 - MAKITA PART NO 766004-9",
                           "fileCount":  3,
                           "totalSize":  "2.8 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-02T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_2",
        "title":  "(PR) PURCHASE IDA-007 FROM DRAWING",
        "categoryId":  "cat_pr",
        "code":  "FR-J26-076",
        "quotation":  "26-0585",
        "requestName":  "พี่เบิ้ม",
        "requestDate":  "2026-09-01",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "DRAWING \u0026 MOLD",
        "assignee":  "JITTRAKAN K.",
        "status":  "wait",
        "completionDate":  "",
        "description":  "ร้องขอให้เสนอราคา IDA-007 สั่งทำตาม DRAWING สำหรับงาน FERRULE",
        "note":  "(รอ) ขอพี่เบิ้ม SETCODE เรียบร้อยแล้ว",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0585 - JIGIDA-007",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0585 - JIGIDA-007",
                           "fileCount":  2,
                           "totalSize":  "1.5 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-01T09:30:00.000Z"
    },
    {
        "id":  "achv_pr_3",
        "title":  "(PR) BATTERY LP12-8.0 12V 8.0A \"LEOCH\"",
        "categoryId":  "cat_pr",
        "code":  "FOR TECHNO",
        "quotation":  "26-0602",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-09-03",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "POWER \u0026 UPS",
        "assignee":  "JITTRAKAN K.",
        "status":  "wait",
        "completionDate":  "",
        "description":  "สั่งแบต UPS ใหม่สำหรับระบบสำรองไฟฝ่ายเทคโนโลยี",
        "note":  "กำลังจะออก PR",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0602 - BATTERY MS7-12",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\26-0602 - BATTERY MS7-12",
                           "fileCount":  2,
                           "totalSize":  "890 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-03T11:00:00.000Z"
    },
    {
        "id":  "achv_jig_1",
        "title":  "JIG-QC003 CLAMP STAND DIGIMATIC",
        "categoryId":  "cat_jig",
        "code":  "QC-J26-003",
        "quotation":  "",
        "requestName":  "แผนก QC",
        "requestDate":  "2026-08-28",
        "factory":  "FACTORY 1",
        "department":  "QC",
        "process":  "INSPECTION",
        "assignee":  "JITTRAKAN K.",
        "status":  "in_progress",
        "completionDate":  "",
        "description":  "ออกแบบและผลิตแคลมป์ยึดขาตั้งไดอัลเกจดิจิตอลเพื่อลดความคลาดเคลื่อนในการวัดงาน",
        "note":  "ส่งแบบดราฟท์ 3D ให้ QC ตรวจสอบรอบแรกแล้ว อยู่ระหว่างปรับระยะฟิตติ้ง",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-28T08:00:00.000Z"
    },
    {
        "id":  "achv_jig_2",
        "title":  "JIG-MOT074 DROP GLUING",
        "categoryId":  "cat_jig",
        "code":  "GM-J26-012",
        "quotation":  "26-0121",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-08-25",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "GLUING",
        "assignee":  "JITTRAKAN K.",
        "status":  "in_progress",
        "completionDate":  "",
        "description":  "จิ๊กช่วยควบคุมตำแหน่งการหยอดกาวอัตโนมัติบนแกนโรเตอร์มอเตอร์",
        "note":  "กำลังทดสอบความแม่นยำของตำแหน่งแกนหยอดร่วมกับฝ่ายผลิต",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0121 - DROP GLUING",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0121 - DROP GLUING",
                           "fileCount":  4,
                           "totalSize":  "3.2 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-08-25T13:30:00.000Z"
    },
    {
        "id":  "achv_imp_1",
        "title":  "IMP26-003 PLC SKILL DEVELOPMENT",
        "categoryId":  "cat_imp",
        "code":  "TECHNO-TR03",
        "quotation":  "",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-08-15",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "AUTOMATION",
        "assignee":  "JITTRAKAN K.",
        "status":  "in_progress",
        "completionDate":  "",
        "description":  "โครงการพัฒนาทักษะการเขียนโปรแกรมควบคุม PLC สำหรับระบบอัตโนมัติในสายการผลิต",
        "note":  "จัดทำเอกสารและตัวอย่างโปรแกรมทดสอบสำหรับฝึกอบรมภายในทีม",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-15T09:00:00.000Z"
    },
    {
        "id":  "achv_prj_1",
        "title":  "PTN007 BLOWER BOX",
        "categoryId":  "cat_prj",
        "code":  "PRJ-26-007",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-08-20",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "CLEANING",
        "assignee":  "JITTRAKAN K.",
        "status":  "in_progress",
        "completionDate":  "",
        "description":  "กล่องเป่าลมความดันสูงสำหรับทำความสะอาดชิ้นงานก่อนเข้าสู่กระบวนการประกอบขั้นสุดท้าย",
        "note":  "กำลังออกแบบโครงสร้างกล่องอะคริลิคและระบบวาล์วควบคุมลม",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-20T10:15:00.000Z"
    },
    {
        "id":  "achv_jig_3",
        "title":  "JIG-MOT075 REMOVE GLUING",
        "categoryId":  "cat_jig",
        "code":  "GM-J26-014",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-08-22",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "REWORK",
        "assignee":  "JITTRAKAN K.",
        "status":  "in_progress",
        "completionDate":  "",
        "description":  "อุปกรณ์ช่วยลอกและขูดกาวส่วนเกินออกจากสเตเตอร์โดยไม่ทำให้พื้นผิวเสียหาย",
        "note":  "ทดสอบใบขูดเทฟลอนชุดแรกได้ผลดี กำลังจัดทำคู่มือการใช้งาน",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-22T14:45:00.000Z"
    },
    {
        "id":  "achv_prj_2",
        "title":  "SP25-PRJ002 WITHSTANDING VOLTAGE TESTER",
        "categoryId":  "cat_prj",
        "code":  "SP25-002",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-08-10",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "TESTING",
        "assignee":  "JITTRAKAN K.",
        "status":  "in_progress",
        "completionDate":  "",
        "description":  "เครื่องทดสอบความเป็นฉนวนและความทนแรงดันไฟฟ้าสูงสำหรับมอเตอร์รุ่นใหม่",
        "note":  "ติดตั้งวงจรความปลอดภัยและเชื่อมต่อสัญญาณกับคอมพิวเตอร์เพื่อบันทึกข้อมูล",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-10T11:00:00.000Z"
    },
    {
        "id":  "achv_sys_1",
        "title":  "CMMS (ระบบจัดการงานบำรุงรักษา)",
        "categoryId":  "cat_prj",
        "code":  "SYS-CMMS-01",
        "quotation":  "",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-08-01",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MANAGEMENT",
        "assignee":  "JITTRAKAN K.",
        "status":  "in_progress",
        "completionDate":  "",
        "description":  "พัฒนาระบบฐานข้อมูลสำหรับติดตามและบันทึกประวัติการบำรุงรักษาเครื่องจักรและอุปกรณ์",
        "note":  "นำเข้าข้อมูลเครื่องจักรหลักเข้าสู่ระบบเสร็จสิ้น อยู่ระหว่างทดสอบการแจ้งเตือนงาน PM",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-01T08:30:00.000Z"
    },
    {
        "id":  "achv_acc_1",
        "title":  "ACC-FER068 HAND PUMP STORE",
        "categoryId":  "cat_acc",
        "code":  "FR-J26-022",
        "quotation":  "",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-08-12",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "STORAGE",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-25",
        "description":  "แท่นวางและจัดเก็บปั๊มมือสำหรับส่งสารเคมีในไลน์ผลิต FERRULE",
        "note":  "ส่งมอบงานให้ฝ่ายผลิตเรียบร้อยและติดตั้งบนโต๊ะทำงานพร้อมใช้งาน",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-12T10:00:00.000Z"
    },
    {
        "id":  "achv_sys_2",
        "title":  "LASER MINI SCREWDRIVER FROM MAKER",
        "categoryId":  "cat_prj",
        "code":  "SYS-TOOL-04",
        "quotation":  "",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-08-08",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-18",
        "description":  "ติดตั้งและปรับเทียบระบบไขควงเลเซอร์ขนาดเล็กสำหรับการขันสกรูที่มีความละเอียดสูง",
        "note":  "ปรับตั้งค่าแรงบิดและทดสอบการขันตามสเปคสำเร็จ ส่งมอบให้ไลน์ผลิตใช้งาน",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-08T09:15:00.000Z"
    },
    {
        "id":  "achv_pr_4",
        "title":  "(PR) DRILL HSS 20-21 MM",
        "categoryId":  "cat_pr",
        "code":  "FOR TECHNO",
        "quotation":  "26-0533",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-08-07",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-20",
        "description":  "จัดซื้อดอกสว่าน HSS ขนาด 20-21 มม. สำหรับงานเจาะรูชิ้นงานหนาพิเศษ",
        "note":  "ของเข้าคลังและตรวจรับเรียบร้อยแล้ว",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0533 - DRILL HSS 20-21 MM",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0533 - DRILL HSS 20-21 MM",
                           "fileCount":  2,
                           "totalSize":  "950 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-08-07T14:00:00.000Z"
    },
    {
        "id":  "achv_acc_2",
        "title":  "ACC-MOT081 INNER DIAMETER MEASUREMENT",
        "categoryId":  "cat_acc",
        "code":  "GM-J26-008",
        "quotation":  "26-0226",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-07-28",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "INSPECTION",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-15",
        "description":  "อุปกรณ์ช่วยวัดขนาดเส้นผ่านศูนย์กลางภายในของปลอกมอเตอร์ด้วยความแม่นยำสูง",
        "note":  "ตรวจรับอุปกรณ์จากผู้ผลิตและนำเข้าไลน์ประกอบเรียบร้อยแล้ว",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0226 - INNER DIAMETER PROCESSING MAC",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0226 - INNER DIAMETER PROCESSING MAC",
                           "fileCount":  3,
                           "totalSize":  "2.1 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-07-28T11:20:00.000Z"
    },
    {
        "id":  "achv_acc_3",
        "title":  "ACC-FER066 COVER CART FERRULE",
        "categoryId":  "cat_acc",
        "code":  "FR-J26-015",
        "quotation":  "26-0297",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-07-25",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "STORAGE",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-14",
        "description":  "ฝาครอบอะคริลิคใสกันฝุ่นสำหรับรถเข็นขนส่งชิ้นงาน FERRULE ระหว่างอาคารผลิต",
        "note":  "ส่งมอบและติดตั้งบนรถเข็นทุกคันเรียบร้อยแล้ว",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0297 - CLEAR ACRYLIC FOR TROLLEY COVER A",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0297 - CLEAR ACRYLIC FOR TROLLEY COVER A",
                           "fileCount":  3,
                           "totalSize":  "1.8 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-07-25T08:45:00.000Z"
    },
    {
        "id":  "achv_acc_4",
        "title":  "ACC-FIB011 POLE LAMP",
        "categoryId":  "cat_acc",
        "code":  "FIB-J26-004",
        "quotation":  "",
        "requestName":  "ฝ่าย FIBER",
        "requestDate":  "2026-08-02",
        "factory":  "FACTORY 1",
        "department":  "FIBER",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-16",
        "description":  "เสาสำหรับติดตั้งโคมไฟส่องสว่างเหนือโต๊ะทำงานประกอบหัวต่อไฟเบอร์ออปติก",
        "note":  "ทำการสั่งซื้อเสาสำหรับติดตั้งโคมไฟแบบสำเร็จ จำนวน 3 PCS เสร็จสิ้น",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-02T13:00:00.000Z"
    },
    {
        "id":  "achv_acc_5",
        "title":  "ACC-MDC001 WAGOA COVER",
        "categoryId":  "cat_acc",
        "code":  "MD-J26-002",
        "quotation":  "26-0391",
        "requestName":  "ฝ่าย MEDICAL",
        "requestDate":  "2026-08-04",
        "factory":  "FACTORY 1",
        "department":  "MEDICAL",
        "process":  "PACKAGING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-22",
        "description":  "ฝาครอบป้องกันการกระแทกสำหรับอุปกรณ์ WAGOA ในสายการผลิตชิ้นส่วนการแพทย์",
        "note":  "ของเข้าคลังและส่งมอบให้ฝ่ายผลิตติดตั้งบนเครื่องจักรเรียบร้อยแล้ว",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0391 - WOGOA COVER",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0391 - WOGOA COVER",
                           "fileCount":  2,
                           "totalSize":  "1.2 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-08-04T10:30:00.000Z"
    },
    {
        "id":  "achv_pr_5",
        "title":  "(PR) DIE M8X1.25 AND CENTER DRILL",
        "categoryId":  "cat_pr",
        "code":  "FOR TECHNO",
        "quotation":  "26-0491",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-08-05",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-19",
        "description":  "ขอซื้อดรายเกลียว M8X1.25 และดอก CENTER DRILL สำหรับงานช่างเทคโน",
        "note":  "ของเข้าและจัดเก็บเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0491 - DIE \u0026 CENTER DRILL",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0491 - DIE \u0026 CENTER DRILL",
                           "fileCount":  2,
                           "totalSize":  "750 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-08-05T09:00:00.000Z"
    },
    {
        "id":  "achv_1788849662468",
        "title":  "LAYOUT FERRULE AFT V.2.4",
        "categoryId":  "cat_prj",
        "code":  "PRODUCTION",
        "quotation":  "",
        "requestName":  "PRODUCTION",
        "requestDate":  "2026-09-08",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-09-08",
        "description":  "จัดทำ LAYOUT แผนก FERRULE AFT เวอร์ชั่น 2.4 ปรับปรุงตำแหน่งโต๊ะทำงานและเครื่องจักรเพื่อเพิ่มประสิทธิภาพการผลิต",
        "note":  "อัพเดทไฟล์ Layout และส่งมอบเอกสารเรียบร้อยแล้ว",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "LAYOUT_FERRULE_AFT_V2.4",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\WORK\\PROJECT DOCUMENT",
                           "fileCount":  4,
                           "totalSize":  "15.4 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-08T08:41:00.000Z"
    },
    {
        "id":  "achv_1788835083076",
        "title":  "JIG-MOT080 (V-BOX)",
        "categoryId":  "cat_jig",
        "code":  "GM-21",
        "quotation":  "26-0210",
        "requestName":  "SANAT S.",
        "requestDate":  "2026-09-08",
        "factory":  "FACTORY 1",
        "department":  "GENERAL - PROCESS",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-09-08",
        "description":  "ออกแบบและจัดทำ JIG-MOT080 (V-BOX) สำหรับเครื่องจักรตามความต้องการฝ่ายผลิต",
        "note":  "ส่งมอบและติดตั้งใช้งานจริงเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0210 - V BLOCK",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0210 - V BLOCK",
                           "fileCount":  3,
                           "totalSize":  "2.4 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-08T07:20:00.000Z"
    },
    {
        "id":  "achv_1788773676447",
        "title":  "ACC-MOT084 HINGES AND RM TROLLEY",
        "categoryId":  "cat_acc",
        "code":  "GM-J26-020",
        "quotation":  "26-0515",
        "requestName":  "SURASAT S.",
        "requestDate":  "2026-09-07",
        "factory":  "FACTORY 1",
        "department":  "GENERAL - MOTOR",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-09-07",
        "description":  "ร้องขอฝ่ายเทคโนโลยี ออกแบบและจัดทำ บานพับ ที่พักชิ้นงาน สำหรับรถเข็นในไลน์ประกอบ",
        "note":  "ประกอบและทดสอบการเปิด-ปิดบานพับบนรถเข็นจริงเรียบร้อยแล้ว",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0515 - B-100-1 HINGE",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0515 - B-100-1 HINGE",
                           "fileCount":  3,
                           "totalSize":  "1.8 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-07T12:37:00.000Z"
    },
    {
        "id":  "achv_acc_mot065",
        "title":  "ACC-MOT065 GLUE SYRINGE HOLDER (3 IN 1)",
        "categoryId":  "cat_acc",
        "code":  "GM-J26-015",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-09-07",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "GLUING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-09-07",
        "description":  "จัดทำแท่นจับหลอดฉีดกาว 3 IN 1 สำหรับหัวฉีดกาว ให้มีความมั่นคงในการปฏิบัติงาน",
        "note":  "จำนวน 2 PCS สำเร็จ ส่งมอบเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "ACC-MOT065 O RING GLUE SYRINGE HOLDER (3 IN 1)",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\WORK\\WORK DESIGN",
                           "fileCount":  21,
                           "totalSize":  "35.6 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-07T12:08:00.000Z"
    },
    {
        "id":  "achv_acc_fib005",
        "title":  "ACC-FIB005 SYRINGE SUPPORT",
        "categoryId":  "cat_acc",
        "code":  "OPT-J26-003",
        "quotation":  "",
        "requestName":  "ฝ่าย OPTICAL",
        "requestDate":  "2026-09-07",
        "factory":  "FACTORY 1",
        "department":  "OPTICAL",
        "process":  "GLUING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-09-07",
        "description":  "ฐานรองกระบอกกาวสำหรับหัวเข็มหยอดกาวงานชิ้นส่วนไฟเบอร์ออปติก",
        "note":  "ส่งมอบและติดตั้งบนโต๊ะปฏิบัติงานเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "ACC-FIB005 SYRINGE SUPPORT",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\WORK\\WORK DESIGN",
                           "fileCount":  5,
                           "totalSize":  "4.2 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-09-07T11:45:00.000Z"
    },
    {
        "id":  "achv_new_motor_line",
        "title":  "NEW MOTOR LINE PROCESS SETUP",
        "categoryId":  "cat_prj",
        "code":  "PRJ-26-MOT-01",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-09-08",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "SETUP",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-09-08",
        "description":  "จัดทำผังและติดตั้งอุปกรณ์สนับสนุนสำหรับไลน์ผลิตมอเตอร์รุ่นใหม่ (NEW MOTOR)",
        "note":  "ติดตั้งตำแหน่งเครื่องและเชื่อมต่อระบบทดสอบเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-09-08T09:30:00.000Z"
    },
    {
        "id":  "achv_req_gm_020",
        "title":  "GM-J26-020 UV CURTAIN LINE DG",
        "categoryId":  "cat_jig",
        "code":  "GM-J26-020",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-02-23",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-25",
        "description":  "ร้องขอทางฝ่ายเทคโนโลยีทำการออกแบบและติดตั้งม่านกันแสง UV (ลักษณะเดียวกันกับเครื่อง UV ที่ไลน์ Stator) ที่ไลน์ Direct Generator (DG) เนื่องจากเครื่องอบ UV ที่ไลน์ DG ไม่มีที่กันแสงปกป้องสายตาพนักงาน",
        "note":  "ติดตั้งเสร็จสิ้น ส่งมอบให้ไลน์ DG เรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-23T08:00:00.000Z"
    },
    {
        "id":  "achv_req_opt_003",
        "title":  "OPT-J26-003 JIG GLUE NEEDLE COVER",
        "categoryId":  "cat_jig",
        "code":  "OPT-J26-003",
        "quotation":  "",
        "requestName":  "ฝ่าย OPTICAL",
        "requestDate":  "2026-02-17",
        "factory":  "FACTORY 1",
        "department":  "OPTICAL",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-10",
        "description":  "ร้องขอให้จัดทำ Jig สำหรับใส่ครอบปลายเข็มฉีดกาว จำนวน 3 Pcs",
        "note":  "จัดทำเสร็จสิ้น จำนวน 3 Pcs ส่งมอบเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-17T09:00:00.000Z"
    },
    {
        "id":  "achv_req_opt_002",
        "title":  "OPT-J26-002 RECEPTACLE WORK MANUAL STAND \u0026 BOX",
        "categoryId":  "cat_acc",
        "code":  "OPT-J26-002",
        "quotation":  "",
        "requestName":  "ฝ่าย OPTICAL",
        "requestDate":  "2026-02-17",
        "factory":  "FACTORY 1",
        "department":  "OPTICAL",
        "process":  "ASSEMBLY",
        "assignee":  "TANIN",
        "status":  "done",
        "completionDate":  "2026-08-15",
        "description":  "ร้องขอให้จัดทำเสาและกล่อง สำหรับใส่คู่มือการทำงานของผลิตภัณฑ์ Receptacal จำนวน 16 ชิ้น",
        "note":  "ส่งมอบและติดตั้งประจำสถานีงานเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-17T09:30:00.000Z"
    },
    {
        "id":  "achv_req_gm_015",
        "title":  "GM-J26-015 SC220 INSPECTION BUTTON (3D PRINT)",
        "categoryId":  "cat_acc",
        "code":  "GM-J26-015",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-02-18",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "INSPECTION",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-12",
        "description":  "ร้องขอฝ่ายเทคโนโลยี ทำการออกแบบปุ่มกดสำหรับเครื่อง Characteristic Inspection (SC220) เพื่อให้พนักงานสามารถกดปุ่มทดสอบได้อย่างสะดวก โดยขึ้นรูปชิ้นงานปุ่มกดด้วยเครื่อง 3D Printer",
        "note":  "ขึ้นรูป 3D Print และติดตั้งทดสอบใช้งานเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-18T10:00:00.000Z"
    },
    {
        "id":  "achv_req_ecr_523",
        "title":  "ECR-523 JIG SCREENING LATCH \u0026 SLIDE CLAMP",
        "categoryId":  "cat_jig",
        "code":  "ECR-523",
        "quotation":  "",
        "requestName":  "ฝ่าย MEDICAL",
        "requestDate":  "2026-02-24",
        "factory":  "FACTORY 1",
        "department":  "MEDICAL",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-20",
        "description":  "JIG-QC059, JIG-QC060 JIG SCREENING LATCH, SLIDE CLAMP EJECTION, SLIDE CLAMP ASSY.",
        "note":  "จัดทำเสร็จสิ้นและส่งมอบให้ฝ่ายผลิตทางการแพทย์",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-24T11:00:00.000Z"
    },
    {
        "id":  "achv_req_gm_023",
        "title":  "GM-J26-023 STAND DCL12-3010-04 2 SET",
        "categoryId":  "cat_acc",
        "code":  "GM-J26-023",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-02-24",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-22",
        "description":  "จัดทำ Stand วางงานรุ่น DCL12-3010-04 จำนวน 2 Set",
        "note":  "ส่งมอบ Stand วางงานให้ฝ่ายผลิตเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-24T14:00:00.000Z"
    },
    {
        "id":  "achv_req_gm_024",
        "title":  "GM-J26-024 JIG GLUE CHECKING",
        "categoryId":  "cat_jig",
        "code":  "GM-J26-024",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-02-24",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "GLUING",
        "assignee":  "SUTTHIPONG",
        "status":  "done",
        "completionDate":  "2026-08-24",
        "description":  "ร้องขอทางเทคโนโลยีช่วยออกแบบ Jig สำหรับเช็คกาว (Review ST Improvement Project) ลดเวลาขั้นตอนแคะเสษกาวด้านบน End Flange เนื่องจากกาวมีความหนึด พนักงานต้องใช้ก้าน Swab เช็คเข็มกาว",
        "note":  "ส่งมอบ Jig ให้ฝ่ายผลิตเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-24T15:00:00.000Z"
    },
    {
        "id":  "achv_req_fr_018",
        "title":  "FR-J26-018 FAN STAND CONCENTRICITY M/C 23 PCS",
        "categoryId":  "cat_acc",
        "code":  "FR-J26-018",
        "quotation":  "",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-02-25",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-26",
        "description":  "ร้องขอทาง Technology ออกแบบและจัดทำ พร้อมติดตั้งขาตั้งพัดลม ที่ M/C Concenificity จำนวน 23 Pcs จัดทำเป็น Spari เพื่อเอาไว้เปลี่ยนกรณีอันเก่าเสีย",
        "note":  "ติดตั้งเรียบร้อย และจัดเก็บชิ้นส่วนสำรองเข้าคลัง",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-25T09:00:00.000Z"
    },
    {
        "id":  "achv_req_oth_001",
        "title":  "OTH-J26-001 ROOM CONTROL AIR GUARD COVER 12 SET",
        "categoryId":  "cat_acc",
        "code":  "OTH-J26-001",
        "quotation":  "",
        "requestName":  "ฝ่าย INDIRECT",
        "requestDate":  "2026-02-25",
        "factory":  "FACTORY 1",
        "department":  "INDIRECT",
        "process":  "SAFETY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-28",
        "description":  "ฝาครอบ Room control Air สำหรับป้องกันไม่ให้ถูกกด โดยไม่ได้ตั้งใจ (Guard Cover) พร้อมติดตั้งหูข้าง สำหรับคล้องกุลแจ จำนวน 12 set",
        "note":  "ติดตั้งเสร็จสิ้นครบทั้ง 12 จุด",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-02-25T13:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_01",
        "title":  "(PR) 25-0929 - ACRYLIC 3M",
        "categoryId":  "cat_pr",
        "code":  "PR-25-0929",
        "quotation":  "25-0929",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2025-09-29",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MATERIAL",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-16",
        "description":  "จัดซื้อแผ่นอะคริลิค 3M สำหรับงานผลิตและฝาครอบเครื่องจักร",
        "note":  "ตรวจรับเข้าคลังเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "25-0929 - ACRYLIC 3M",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\25-0929 - ACRYLIC 3M",
                           "fileCount":  2,
                           "totalSize":  "1.1 MB"
                       },
        "imageData":  null,
        "createdAt":  "2025-09-29T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_02",
        "title":  "(PR) 26-0006 - HSS \u0026 END MILL \u0026 POM",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0006",
        "quotation":  "26-0006",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-01-10",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-16",
        "description":  "จัดซื้อดอกสว่าน HSS, ดอกเอ็นมิล และพลาสติกวิศวกรรม POM สำหรับงานช่างกล",
        "note":  "ของเข้าเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0006 - HSS \u0026 END MILL \u0026 POM",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0006 - HSS \u0026 END MILL \u0026 POM",
                           "fileCount":  3,
                           "totalSize":  "1.5 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-01-10T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_03",
        "title":  "(PR) 26-0035 - SFJ \u0026 CLEAR ACRYLIC",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0035",
        "quotation":  "26-0035",
        "requestName":  "ฝ่ายผลิต",
        "requestDate":  "2026-01-20",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "MATERIAL",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-02",
        "description":  "จัดซื้อชิ้นส่วน SFJ และแผ่นอะคริลิคใสสำหรับประกอบอุปกรณ์",
        "note":  "ของเข้าคลังเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0035 - SFJ \u0026 CLEAR ACRYLIC",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0035 - SFJ \u0026 CLEAR ACRYLIC",
                           "fileCount":  2,
                           "totalSize":  "980 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-01-20T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_04",
        "title":  "(PR) 26-0139 - TABLE MAT",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0139",
        "quotation":  "26-0139",
        "requestName":  "ฝ่ายผลิต",
        "requestDate":  "2026-02-05",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-16",
        "description":  "จัดซื้อแผ่นยางปูโต๊ะทำงานป้องกันไฟฟ้าสถิตย์ (ESD Table Mat)",
        "note":  "ส่งมอบและปูบนโต๊ะทำงานเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0139 - TABLE MAT",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0139 - TABLE MAT",
                           "fileCount":  2,
                           "totalSize":  "750 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-02-05T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_05",
        "title":  "(PR) 26-0141 - MATERIAL JIG FOR CLEANING PART GEAR",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0141",
        "quotation":  "26-0141",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-02-08",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "CLEANING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-16",
        "description":  "จัดซื้อวัสดุสำหรับทำจิ๊กล้างชิ้นส่วนเฟืองเกียร์",
        "note":  "นำไปผลิตเป็นจิ๊กล้างสำเร็จ",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0141 - MATERIAL JIG FOR CLEANING PART GEAR",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0141 - MATERIAL JIG FOR CLEANING PART GEAR",
                           "fileCount":  3,
                           "totalSize":  "1.4 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-02-08T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_06",
        "title":  "(PR) 26-0150 - TABLE MAT QA",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0150",
        "quotation":  "26-0150",
        "requestName":  "ฝ่าย QA",
        "requestDate":  "2026-02-12",
        "factory":  "FACTORY 1",
        "department":  "QA",
        "process":  "INSPECTION",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-04",
        "description":  "จัดซื้อแผ่นยางปูโต๊ะตรวจสอบคุณภาพแผนก QA",
        "note":  "ติดตั้งเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0150 - TABLE MAT QA",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0150 - TABLE MAT QA",
                           "fileCount":  2,
                           "totalSize":  "890 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-02-12T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_07",
        "title":  "(PR) 26-0204 - BEARING FOR FERRULE",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0204",
        "quotation":  "26-0204",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-03-01",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "SPARE PARTS",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-16",
        "description":  "จัดซื้อตลับลูกปืนความแม่นยำสูงสำหรับเครื่องจักรผลิต Ferrule",
        "note":  "ส่งมอบเข้าสโตร์แผนกเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0204 - BEARING FOR FERRULE",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0204 - BEARING FOR FERRULE",
                           "fileCount":  2,
                           "totalSize":  "1.2 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-01T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_08",
        "title":  "(PR) 26-0210 - V BLOCK",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0210",
        "quotation":  "26-0210",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-03-04",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-26",
        "description":  "จัดซื้อบล็อกวีความแม่นยำสูง V-Block สำหรับงานจับยึดเพลากลึง",
        "note":  "ตรวจรับเข้าห้องปฏิบัติการช่างเทคโน",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0210 - V BLOCK",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0210 - V BLOCK",
                           "fileCount":  3,
                           "totalSize":  "2.4 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-04T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_09",
        "title":  "(PR) 26-0212 - STANDARD WI TABLE",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0212",
        "quotation":  "26-0212",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-03-05",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "FACILITY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-16",
        "description":  "จัดซื้อโต๊ะมาตรฐานพร้อมชั้นวางเอกสาร WI ประจำไลน์ผลิต",
        "note":  "ส่งมอบและจัดวางตามจุดเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0212 - STANDARD WI TABLE",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0212 - STANDARD WI TABLE",
                           "fileCount":  2,
                           "totalSize":  "1.3 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-05T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_10",
        "title":  "(PR) 26-0226 - INNER DIAMETER PROCESSING MAC",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0226",
        "quotation":  "26-0226",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-03-10",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-05-18",
        "description":  "จัดซื้อชิ้นส่วนปรับปรุงเครื่องวัดขนาดเส้นผ่านศูนย์กลางภายใน",
        "note":  "ติดตั้งเข้ากับเครื่องจักรเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0226 - INNER DIAMETER PROCESSING MAC",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0226 - INNER DIAMETER PROCESSING MAC",
                           "fileCount":  3,
                           "totalSize":  "2.1 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-10T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_11",
        "title":  "(PR) 26-0266 - END MILL, BEARING AND SPRING",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0266",
        "quotation":  "26-0266",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-03-20",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-11",
        "description":  "จัดซื้อดอกเอ็นมิลคาร์ไบด์ แบริ่ง และสปริงกดสำหรับงานซ่อมสร้างจิ๊ก",
        "note":  "ตรวจรับเข้าคลังเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0266 - END MILL, BEARING AND SPRING",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0266 - END MILL, BEARING AND SPRING",
                           "fileCount":  3,
                           "totalSize":  "1.6 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-20T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_12",
        "title":  "(PR) 26-0272 - WELD",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0272",
        "quotation":  "26-0272",
        "requestName":  "ฝ่ายซ่อมบำรุง",
        "requestDate":  "2026-03-25",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MAINTENANCE",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-05",
        "description":  "จัดจ้างงานเชื่อมอาร์กอนโครงสร้างโต๊ะและแท่นเครื่องจักร",
        "note":  "งานเชื่อมผ่านการทดสอบความแข็งแรงเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0272 - WELD",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0272 - WELD",
                           "fileCount":  2,
                           "totalSize":  "850 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-25T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_13",
        "title":  "(PR) 26-0278 - ลูกล้อโพลียูรีเทน PAREO",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0278",
        "quotation":  "26-0278",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-03-28",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "FACILITY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-02",
        "description":  "จัดซื้อลูกล้อโพลียูรีเทน PAREO แบบมีเบรกสำหรับรถเข็นขนย้ายชิ้นงาน",
        "note":  "ติดตั้งบนรถเข็นเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0278 - ลูกล้อโพลียูรีเทน PAREO",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0278 - ลูกล้อโพลียูรีเทน PAREO",
                           "fileCount":  2,
                           "totalSize":  "1.0 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-28T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_14",
        "title":  "(PR) 26-0279 - SHUTER A7-416",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0279",
        "quotation":  "26-0279",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-03-29",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "STORAGE",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-02",
        "description":  "จัดซื้อตู้ลิ้นชักจัดเก็บชิ้นส่วนและอุปกรณ์ขนาดเล็ก SHUTER A7-416",
        "note":  "จัดวางประจำพื้นที่ช่างเทคโนเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0279 - SHUTER A7-416",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0279 - SHUTER A7-416",
                           "fileCount":  2,
                           "totalSize":  "1.1 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-03-29T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_15",
        "title":  "(PR) 26-0283 - KNOBS FERRULE",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0283",
        "quotation":  "26-0283",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-04-02",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-09",
        "description":  "จัดซื้อลูกบิดพลาสติกปรับตำแหน่ง (Knobs) สำหรับจิ๊กจับยึดงาน Ferrule",
        "note":  "ส่งมอบแผนก Ferrule ใช้งาน",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0283 - KNOBS FERRULE",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0283 - KNOBS FERRULE",
                           "fileCount":  2,
                           "totalSize":  "780 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-04-02T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_16",
        "title":  "(PR) 26-0297 - CLEAR ACRYLIC FOR TROLLEY COVER A",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0297",
        "quotation":  "26-0297",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-04-08",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "MATERIAL",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-02",
        "description":  "จัดซื้อแผ่นอะคริลิคใสตัดขึ้นรูปสำหรับฝาครอบรถเข็นชิ้นงาน",
        "note":  "ประกอบร่วมกับโครงรถเข็นเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0297 - CLEAR ACRYLIC FOR TROLLEY COVER A",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0297 - CLEAR ACRYLIC FOR TROLLEY COVER A",
                           "fileCount":  3,
                           "totalSize":  "1.8 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-04-08T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_17",
        "title":  "(PR) 26-0299 - MAGNET FOR MAGNET",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0299",
        "quotation":  "26-0299",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-04-10",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-30",
        "description":  "จัดซื้อแม่เหล็กนีโอไดเมียมสำหรับติดตั้งในชุดล็อคฝาครอบ",
        "note":  "ตรวจรับเข้าสโตร์เรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0299 - MAGNET FOR MAGNET",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0299 - MAGNET FOR MAGNET",
                           "fileCount":  2,
                           "totalSize":  "920 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-04-10T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_18",
        "title":  "(PR) 26-0323 - SPRING FOR FERRULE",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0323",
        "quotation":  "26-0323",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-04-18",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "SPARE PARTS",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-15",
        "description":  "จัดซื้อสปริงดันสแตนเลสสำหรับเครื่องตรวจสอบชิ้นงาน Ferrule",
        "note":  "ส่งมอบเข้าสโตร์แผนก",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0323 - SPRING FOR FERRULE",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0323 - SPRING FOR FERRULE",
                           "fileCount":  2,
                           "totalSize":  "840 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-04-18T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_19",
        "title":  "(PR) 26-0328 - HSS DRILL 15 MM",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0328",
        "quotation":  "26-0328",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-04-20",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-17",
        "description":  "จัดซื้อดอกสว่านไฮสปีดขนาด 15 มม. สำหรับงานขึ้นรูปชิ้นงานโลหะ",
        "note":  "ตรวจรับเข้าคลังเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0328 - HSS DRILL 15 MM",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0328 - HSS DRILL 15 MM",
                           "fileCount":  2,
                           "totalSize":  "760 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-04-20T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_20",
        "title":  "(PR) 26-0391 - WOGOA COVER",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0391",
        "quotation":  "26-0391",
        "requestName":  "ฝ่าย MEDICAL",
        "requestDate":  "2026-05-02",
        "factory":  "FACTORY 1",
        "department":  "MEDICAL",
        "process":  "PACKAGING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-04",
        "description":  "จัดซื้ออุปกรณ์ฝาครอบป้องกันชุดสวิตช์ Wagoa",
        "note":  "ติดตั้งเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0391 - WOGOA COVER",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0391 - WOGOA COVER",
                           "fileCount":  2,
                           "totalSize":  "1.2 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-05-02T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_21",
        "title":  "(PR) 26-0408 - END MILL 2.5, CARBIDE 6 MM",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0408",
        "quotation":  "26-0408",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-05-02",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-09",
        "description":  "จัดซื้อดอกเอ็นมิลคาร์ไบด์ 2.5 มม. และ 6 มม. สำหรับงาน CNC ความแม่นยำสูง",
        "note":  "ของเข้าคลังเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0408 - END MILL 2.5, CARBIDE 6 mm",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0408 - END MILL 2.5, CARBIDE 6 mm",
                           "fileCount":  2,
                           "totalSize":  "990 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-05-02T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_22",
        "title":  "(PR) 26-0417 - HOLE SAW, STYLUS CENTER",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0417",
        "quotation":  "26-0417",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-05-08",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "TOOLING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-16",
        "description":  "จัดซื้อโฮลซอว์เจาะรูแผ่นเหล็ก และสไตลัสเซ็นเตอร์สำหรับการเซ็ตศูนย์เครื่องจักร",
        "note":  "ตรวจรับเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0417 - HOLE SAW, STYLUS CENTER",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0417 - HOLE SAW, STYLUS CENTER",
                           "fileCount":  2,
                           "totalSize":  "880 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-05-08T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_23",
        "title":  "(PR) 26-0426 - HOLE METAL FERRULE",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0426",
        "quotation":  "26-0426",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-05-15",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-16",
        "description":  "จัดซื้อชิ้นส่วนแผ่นโลหะเจาะรูพิเศษสำหรับเครื่องคัดแยก Ferrule",
        "note":  "ติดตั้งเข้ากับเครื่องคัดแยกเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0426 - HOLE METAL FERRULE",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\26-0426 - HOLE METAL FERRULE",
                           "fileCount":  2,
                           "totalSize":  "950 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-05-15T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_24",
        "title":  "(PR) Q26-0384 - THE WD MY PASSPORT 1 TB",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0384",
        "quotation":  "Q26-0384",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-05-16",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "IT / BACKUP",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-25",
        "description":  "จัดซื้อ External Harddisk WD My Passport 1TB สำหรับสำรองข้อมูลงานออกแบบและโปรแกรมเครื่องจักร",
        "note":  "ตรวจรับและนำมาใช้สำรองข้อมูลเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "Q26-0384 - THE WD MY PASSPORT 1 TB",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\COMPLETE\\Q26-0384 - THE WD MY PASSPORT 1 TB",
                           "fileCount":  2,
                           "totalSize":  "650 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-05-16T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_c_25",
        "title":  "(PR) 26-0515 - B-100-1 HINGE",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0515",
        "quotation":  "26-0515",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-08-04",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "MATERIAL",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-25",
        "description":  "จัดซื้อบานพับอุตสาหกรรมรุ่น B-100-1 สำหรับติดตั้งฝาครอบรถเข็นชิ้นงาน",
        "note":  "ของเข้าคลังเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0515 - B-100-1 HINGE",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0515 - B-100-1 HINGE",
                           "fileCount":  3,
                           "totalSize":  "1.8 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-08-04T09:47:00.000Z"
    },
    {
        "id":  "achv_pr_c_26",
        "title":  "(PR) 26-0524 - CLEAR ACRYLIC FOR MAGNET",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0524",
        "quotation":  "26-0524",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-08-06",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "MATERIAL",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-26",
        "description":  "จัดซื้อแผ่นอะคริลิคใสตัดเลเซอร์ตามแบบสำหรับติดตั้งแม่เหล็กยึดฝา",
        "note":  "นำไปประกอบร่วมกับชิ้นงานเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0524 - CLEAR ACRYLIC FOR MAGNET",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0524 - CLEAR ACRYLIC FOR MAGNET",
                           "fileCount":  2,
                           "totalSize":  "1.1 MB"
                       },
        "imageData":  null,
        "createdAt":  "2026-08-06T16:46:00.000Z"
    },
    {
        "id":  "achv_pr_c_27",
        "title":  "(PR) 26-0469 - FOOT COMPONENT FOR GM",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0469",
        "quotation":  "26-0469",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-07-24",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-20",
        "description":  "จัดซื้อขาตั้งปรับระดับ (Leveling Foot) สำหรับแท่นเครื่องไลน์ผลิต GM",
        "note":  "ติดตั้งเสร็จสมบูรณ์",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0469 - FOOT COMPONENT FOR GM",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0469 - FOOT COMPONENT FOR GM",
                           "fileCount":  2,
                           "totalSize":  "900 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-07-24T10:09:00.000Z"
    },
    {
        "id":  "achv_pr_c_28",
        "title":  "(PR) 26-0485 - MAKITA 12V BATTERY",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0485",
        "quotation":  "26-0485",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-07-31",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "TOOLING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-25",
        "description":  "จัดซื้อแบตเตอรี่สำรอง MAKITA 12V สำหรับสว่านไขควงไร้สาย",
        "note":  "ตรวจรับและแจกจ่ายให้ช่างประจำไลน์",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0485 - MAKITA 12V",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0485 - MAKITA 12V",
                           "fileCount":  2,
                           "totalSize":  "820 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-07-31T12:07:00.000Z"
    },
    {
        "id":  "achv_pr_c_29",
        "title":  "(PR) 26-0510 - Z-A17B SENSOR CABLE",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0510",
        "quotation":  "26-0510",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-08-03",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "ELECTRICAL",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-28",
        "description":  "จัดซื้อสายสัญญาณเซนเซอร์ Z-A17B สำหรับเครื่องตรวจสอบชิ้นงาน",
        "note":  "เชื่อมต่อระบบและทดสอบสัญญาณผ่าน",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0510 - Z-A17B",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\26-0510 - Z-A17B",
                           "fileCount":  2,
                           "totalSize":  "870 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-08-03T10:10:00.000Z"
    },
    {
        "id":  "achv_jig_lvp_258",
        "title":  "JIG-LVP258 PLUNGER \u0026 SCREW INSPECTION",
        "categoryId":  "cat_jig",
        "code":  "JIG-LVP258",
        "quotation":  "",
        "requestName":  "TANYALAKT",
        "requestDate":  "2026-03-28",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "3D PRINT",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-15",
        "description":  "ขึ้นรูปชิ้นงาน 3D Print สำหรับจิ๊กตรวจสอบ Plunger และสกรูปรับตั้งเครื่อง LVP258",
        "note":  "ปริ้นท์ชิ้นงานและประกอบทดสอบเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-03-28T08:00:00.000Z"
    },
    {
        "id":  "achv_jig_mot_074z",
        "title":  "JIG-MOT074Z012 GEAR POSITION JIG",
        "categoryId":  "cat_jig",
        "code":  "GM-J26-012Z",
        "quotation":  "",
        "requestName":  "SUTTHIPONG",
        "requestDate":  "2026-03-28",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "3D PRINT",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-20",
        "description":  "จัดทำจิ๊กกำหนดตำแหน่งเฟืองเกียร์ด้วย Formlabs 3D Printer เพื่อความแม่นยำในการประกอบ",
        "note":  "ส่งมอบไลน์ประกอบมอเตอร์เรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-03-28T09:00:00.000Z"
    },
    {
        "id":  "achv_acc_syr_cover",
        "title":  "ACC-SYR01 COVER SYRINGE HOLDER",
        "categoryId":  "cat_acc",
        "code":  "OPT-J26-005",
        "quotation":  "",
        "requestName":  "ANANTACHAI J.",
        "requestDate":  "2026-03-28",
        "factory":  "FACTORY 1",
        "department":  "OPTICAL",
        "process":  "3D PRINT",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-22",
        "description":  "ฝาครอบป้องกันกระบอกฉีดกาวสำหรับงานหยอดกาวชิ้นส่วนเลนส์ออปติก",
        "note":  "ติดตั้งบนเครื่องหยอดกาวเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-03-28T10:00:00.000Z"
    },
    {
        "id":  "achv_jig_rot_4l",
        "title":  "JIG-ROT04 ROTOR 4 LOBES ALIGNMENT",
        "categoryId":  "cat_jig",
        "code":  "GM-J26-018",
        "quotation":  "",
        "requestName":  "ANANTACHAI J.",
        "requestDate":  "2026-03-28",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "3D PRINT",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-06-25",
        "description":  "จิ๊กจัดตำแหน่งโรเตอร์ 4 Lobes พร้อมเพลาและเฮ้าส์ซิ่งดีไซน์ใหม่",
        "note":  "ขึ้นรูปและทดสอบการหมุนเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-03-28T11:00:00.000Z"
    },
    {
        "id":  "achv_imp_slip_roll",
        "title":  "IMP26-008 MODIFIED SLIP ROLL MACHINE",
        "categoryId":  "cat_imp",
        "code":  "IMP-26-008",
        "quotation":  "",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-04-23",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "MODIFICATION",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-15",
        "description":  "ปรับปรุงและดัดแปลงเครื่องม้วนโลหะแผ่น Slip Roll เพื่อความปลอดภัยและเพิ่มขนาดหน้ากว้างม้วนงาน",
        "note":  "จัดทำ Concept Design Presentation และดัดแปลงเครื่องสำเร็จ",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-04-23T11:40:00.000Z"
    },
    {
        "id":  "achv_acc_trolley_3s",
        "title":  "ACC-TRL03 TROLLEY 3-STORY TRAY SUPPORT",
        "categoryId":  "cat_acc",
        "code":  "FR-J26-025",
        "quotation":  "",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-05-10",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "STORAGE",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-28",
        "description":  "โครงรองรับถาดชิ้นงาน 3 ชั้นบนรถเข็นขนส่ง Ferrule",
        "note":  "ประกอบและส่งมอบรถเข็นใช้งานเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-05-10T10:00:00.000Z"
    },
    {
        "id":  "achv_sys_kv_studio",
        "title":  "SYS-PLC01 KEYENCE KV-STUDIO AUTOMATION",
        "categoryId":  "cat_prj",
        "code":  "SYS-KEYENCE-01",
        "quotation":  "",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-06-02",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "SOFTWARE",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-05",
        "description":  "ติดตั้งและตั้งค่าโปรแกรม KEYENCE KV STUDIO สำหรับเชื่อมต่อและปรับปรุงโปรแกรม PLC เครื่องจักร",
        "note":  "เชื่อมต่อและอัพโหลดโปรแกรมเครื่องจักรสำเร็จ",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-06-02T18:08:00.000Z"
    },
    {
        "id":  "achv_jig_scr_z09",
        "title":  "JIG-SCR09 SCREENING FIXTURE Z09",
        "categoryId":  "cat_jig",
        "code":  "MD-J26-008",
        "quotation":  "",
        "requestName":  "ฝ่าย MEDICAL",
        "requestDate":  "2026-05-16",
        "factory":  "FACTORY 1",
        "department":  "MEDICAL",
        "process":  "SCREENING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-10",
        "description":  "จิ๊กสกรีนชิ้นส่วนการแพทย์รุ่น Z09 พร้อมจัดทำคู่มือการทำงาน (Instruction for screening Z09)",
        "note":  "ส่งมอบจิ๊กและเอกสารคู่มือเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-05-16T09:51:00.000Z"
    },
    {
        "id":  "achv_imp_3d_present",
        "title":  "IMP26-012 3D DATA PRESENTATION \u0026 CAD ARCHIVE",
        "categoryId":  "cat_imp",
        "code":  "IMP-26-012",
        "quotation":  "",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-04-04",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "DESIGN",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-07-20",
        "description":  "รวบรวมและจัดระเบียบฐานข้อมูล 3D CAD Data สำหรับงานออกแบบจิ๊กและอุปกรณ์ในโรงงาน",
        "note":  "นำเสนอผู้บริหารและจัดเก็บลงระบบเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-04-04T09:55:00.000Z"
    },
    {
        "id":  "achv_sys_gx_works3",
        "title":  "SYS-PLC02 MITSUBISHI GX-WORKS3 SETUP",
        "categoryId":  "cat_prj",
        "code":  "SYS-MITSUBISHI-02",
        "quotation":  "",
        "requestName":  "ฝ่ายเทคโนโลยี",
        "requestDate":  "2026-06-02",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION TECHNOLOGY",
        "process":  "SOFTWARE",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-01",
        "description":  "ติดตั้งซอฟต์แวร์ GX Works3 V1.038Q สำหรับโปรแกรม PLC Mitsubishi เครื่องจักรอัตโนมัติ",
        "note":  "ติดตั้งและทดสอบการเชื่อมต่อสำเร็จ",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-06-02T10:57:00.000Z"
    },
    {
        "id":  "achv_acc_mot_dcl12",
        "title":  "ACC-MOT082 DCL12 FIXTURE BASE",
        "categoryId":  "cat_acc",
        "code":  "GM-J26-022",
        "quotation":  "",
        "requestName":  "SURASAT S.",
        "requestDate":  "2026-08-18",
        "factory":  "FACTORY 1",
        "department":  "GENERAL - MOTOR",
        "process":  "MACHINING",
        "assignee":  "JITTRAKAN K.",
        "status":  "done",
        "completionDate":  "2026-08-30",
        "description":  "ฐานยึดฟิกซ์เจอร์สำหรับมอเตอร์รุ่น DCL12 ช่วยให้การประกอบมีความมั่นคงและลดของเสีย",
        "note":  "ส่งมอบและติดตั้งบนไลน์ผลิตเรียบร้อย",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-08-18T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_cnc_01",
        "title":  "(PR) 26-0036 - PIN WINDING JIG",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0036",
        "quotation":  "26-0036",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-01-22",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "WINDING",
        "assignee":  "JITTRAKAN K.",
        "status":  "cancel",
        "completionDate":  "2026-06-27",
        "description":  "ขอเสนอราคาจัดซื้อจิ๊กพันพินขดลวดมอเตอร์",
        "note":  "ยกเลิกเนื่องจากเปลี่ยนวิธีการผลิตเป็นแบบกึ่งอัตโนมัติ",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0036 - PIN WINDING JIG",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\CANCLE\\26-0036 - PIN WINDING JIG",
                           "fileCount":  2,
                           "totalSize":  "620 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-01-22T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_cnc_02",
        "title":  "(PR) 26-0066 - FIBER ADHESIVE CURING JIG",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0066",
        "quotation":  "26-0066",
        "requestName":  "ฝ่าย FIBER",
        "requestDate":  "2026-02-01",
        "factory":  "FACTORY 1",
        "department":  "FIBER",
        "process":  "CURING",
        "assignee":  "JITTRAKAN K.",
        "status":  "cancel",
        "completionDate":  "2026-06-27",
        "description":  "ขอจัดซื้อจิ๊กอบกาวสำหรับชิ้นส่วนไฟเบอร์ออปติก",
        "note":  "ยกเลิกใบขอซื้อเนื่องจากใช้จิ๊กเดิมปรับแต่งแทนได้",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0066 - FIBER ADHESIVE CURING JIG",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\CANCLE\\26-0066 - FIBER ADHESIVE CURING JIG",
                           "fileCount":  2,
                           "totalSize":  "710 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-02-01T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_cnc_03",
        "title":  "(PR) 26-0152 - DESK DRAWER",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0152",
        "quotation":  "26-0152",
        "requestName":  "ฝ่ายผลิต",
        "requestDate":  "2026-02-15",
        "factory":  "FACTORY 1",
        "department":  "PRODUCTION",
        "process":  "FACILITY",
        "assignee":  "JITTRAKAN K.",
        "status":  "cancel",
        "completionDate":  "2026-06-27",
        "description":  "ขอจัดซื้อลิ้นชักใต้โต๊ะทำงานสำหรับจัดเก็บเอกสารและอุปกรณ์ส่วนตัว",
        "note":  "ยกเลิกเนื่องจากจัดสรรงบประมาณไปส่วนอื่น",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0152 - DESK DRAWER",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\CANCLE\\26-0152 - DESK DRAWER",
                           "fileCount":  2,
                           "totalSize":  "540 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-02-15T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_cnc_04",
        "title":  "(PR) 26-0302 - CLEAR ACRYLIC FOR TROLLEY 3 STORY",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0302",
        "quotation":  "26-0302",
        "requestName":  "ฝ่าย FERRULE",
        "requestDate":  "2026-04-12",
        "factory":  "FACTORY 1",
        "department":  "FERRULE",
        "process":  "STORAGE",
        "assignee":  "JITTRAKAN K.",
        "status":  "cancel",
        "completionDate":  "2026-06-23",
        "description":  "ขอจัดซื้อแผ่นอะคริลิคใสสำหรับทำฝาปิดรถเข็น 3 ชั้น",
        "note":  "ยกเลิกเนื่องจากเปลี่ยนแบบเป็นฝาเปิดด้านหน้าแทน",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0302 - CLEAR ACRYLIC FOR TROLLEY 3 STORY",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\CANCLE\\26-0302 - CLEAR ACRYLIC FOR TROLLEY 3 STORY",
                           "fileCount":  2,
                           "totalSize":  "890 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-04-12T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_cnc_05",
        "title":  "(PR) 26-0335 - BAKELITE TRAY",
        "categoryId":  "cat_pr",
        "code":  "PR-26-0335",
        "quotation":  "26-0335",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-04-22",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "cancel",
        "completionDate":  "2026-06-22",
        "description":  "ขอเสนอราคาถาดเบกาไลต์สำหรับรองอบชิ้นงานที่อุณหภูมิสูง",
        "note":  "ยกเลิกเนื่องจากเปลี่ยนใช้วัสดุอะลูมิเนียมที่มีอยู่เดิมแทน",
        "pdfAttachment":  null,
        "workFolder":  {
                           "name":  "26-0335 - BAKELITE TRAY",
                           "path":  "D:\\jittrakan.katprasat\\OneDrive - Orbray (Thailand)\\ORBRAY 20523\\20523 JUNIOR\\QUOTATION\\PR\\CANCLE\\26-0335 - BAKELITE TRAY",
                           "fileCount":  2,
                           "totalSize":  "680 KB"
                       },
        "imageData":  null,
        "createdAt":  "2026-04-22T10:00:00.000Z"
    },
    {
        "id":  "achv_pr_cnc_06",
        "title":  "JIG-MOT076 CANCELLED PROTOTYPE JIG",
        "categoryId":  "cat_jig",
        "code":  "GM-J26-019",
        "quotation":  "",
        "requestName":  "ฝ่าย MOTOR",
        "requestDate":  "2026-05-02",
        "factory":  "FACTORY 1",
        "department":  "MOTOR",
        "process":  "ASSEMBLY",
        "assignee":  "JITTRAKAN K.",
        "status":  "cancel",
        "completionDate":  "2026-06-30",
        "description":  "จิ๊กต้นแบบสำหรับทดสอบการประกอบสเตเตอร์รุ่นทดลอง",
        "note":  "ลูกค้ายกเลิกแบบสเปคเดิม จึงยกเลิกการจัดทำจิ๊กต้นแบบนี้",
        "pdfAttachment":  null,
        "workFolder":  "",
        "imageData":  null,
        "createdAt":  "2026-05-02T10:00:00.000Z"
    }
];

// --- Storage Keys ---
const STORAGE_KEY_ACHIEVEMENTS = 'orbray_prod_techno_achievements_v4';
const STORAGE_KEY_CATEGORIES = 'orbray_prod_techno_categories_v4';
const STORAGE_KEY_SHOW_RANKING = 'orbray_show_requester_ranking';
const STORAGE_KEY_FIREBASE_CONFIG = 'orbray_firebase_config_v1';
const STORAGE_KEY_AUTH_USER = 'orbray_auth_current_user_v1';
const STORAGE_KEY_TEAM_PINS = 'orbray_team_account_pins_v1';
const STORAGE_KEY_CUSTOM_ACCOUNTS = 'orbray_team_custom_accounts_v1';
const STORAGE_KEY_DELETED_ACCOUNTS = 'orbray_team_deleted_accounts_v1';

// --- Production Technology Team Accounts & Initial PINs ---
const DEFAULT_TEAM_ACCOUNTS = [
  { id: 'usr_20523', empId: '20523', pin: '20523', name: 'JITTRAKAN K.', company: 'ORBRAY', department: 'PRODUCTION TECHNOLOGY', role: 'ADMIN', avatar: '👑' },
  { id: 'usr_20524', empId: '20524', pin: '20524', name: 'SUTTHIPONG M.', company: 'ORBRAY', department: 'PRODUCTION TECHNOLOGY', role: 'MEMBER', avatar: '👨‍💼' },
  { id: 'usr_20525', empId: '20525', pin: '20525', name: 'TANIN P.', company: 'ORBRAY', department: 'PRODUCTION TECHNOLOGY', role: 'MEMBER', avatar: '👨‍💻' },
  { id: 'usr_20526', empId: '20526', pin: '20526', name: 'KITTISAK P.', company: 'ORBRAY', department: 'PRODUCTION TECHNOLOGY', role: 'MEMBER', avatar: '👷' },
  { id: 'usr_20527', empId: '20527', pin: '20527', name: 'NARUEBODEE C.', company: 'ORBRAY', department: 'PRODUCTION TECHNOLOGY', role: 'MEMBER', avatar: '🧑‍🔧' }
];

let currentUser = null;
window.currentUser = null;
window.getCurrentUser = function() { return currentUser; };
let pendingAuthSuccessCallback = null;

// --- IndexedDB for Persistent Large Attachment Storage (Unlimited Size) ---
const IDB_NAME = 'OrbrayAchievementDB';
const IDB_VERSION = 1;
const IDB_STORE_ACHIEVEMENTS = 'achievements_store';

let dbInstance = null;

function openOrbrayDB() {
  return new Promise((resolve) => {
    if (dbInstance) {
      resolve(dbInstance);
      return;
    }
    if (!window.indexedDB) {
      resolve(null);
      return;
    }
    try {
      const request = window.indexedDB.open(IDB_NAME, IDB_VERSION);
      request.onupgradeneeded = (e) => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(IDB_STORE_ACHIEVEMENTS)) {
          db.createObjectStore(IDB_STORE_ACHIEVEMENTS, { keyPath: 'key' });
        }
      };
      request.onsuccess = (e) => {
        dbInstance = e.target.result;
        resolve(dbInstance);
      };
      request.onerror = (e) => {
        console.warn('IndexedDB open error:', e);
        resolve(null);
      };
    } catch (err) {
      console.warn('IndexedDB init error:', err);
      resolve(null);
    }
  });
}

function mergeSingleItemAttachments(incomingItem, existingItem) {
  if (!incomingItem || !existingItem) return incomingItem;
  const merged = { ...incomingItem };

  // 1. Preserve PDF attachment data if stripped in incoming
  if (merged.pdfAttachment && typeof merged.pdfAttachment === 'object' && !merged.pdfAttachment.data) {
    if (existingItem.pdfAttachment && existingItem.pdfAttachment.data) {
      merged.pdfAttachment = {
        ...merged.pdfAttachment,
        data: existingItem.pdfAttachment.data
      };
    }
  }

  // 2. Preserve Image / Drawing data if stripped in incoming
  if (merged.imageData && typeof merged.imageData === 'object' && !merged.imageData.data) {
    const existingImgData = typeof existingItem.imageData === 'string'
      ? existingItem.imageData
      : (existingItem.imageData && existingItem.imageData.data ? existingItem.imageData.data : '');
    if (existingImgData) {
      merged.imageData = {
        ...merged.imageData,
        data: existingImgData
      };
    }
  }

  // 3. Preserve WorkFolder file data / zipData if stripped in incoming
  if (merged.workFolder && typeof merged.workFolder === 'object' && existingItem.workFolder && typeof existingItem.workFolder === 'object') {
    const wf = { ...merged.workFolder };
    const exWf = existingItem.workFolder;

    if (!wf.zipData && exWf.zipData) {
      wf.zipData = exWf.zipData;
    }

    if (Array.isArray(wf.files) && Array.isArray(exWf.files) && exWf.files.some(ef => !!ef.data)) {
      if (wf.files.length === 0) {
        wf.files = exWf.files;
      } else {
        wf.files = wf.files.map((f, idx) => {
          if (f && f.data) return f;
          const matchByIndex = exWf.files[idx];
          if (matchByIndex && matchByIndex.data && (matchByIndex.name === f.name || matchByIndex.relPath === f.relPath)) {
            return { ...f, data: matchByIndex.data };
          }
          const matchByPath = exWf.files.find(ef => ef && ef.data && ((ef.relPath && ef.relPath === f.relPath) || (ef.name && ef.name === f.name)));
          if (matchByPath) {
            return { ...f, data: matchByPath.data };
          }
          return f;
        });
      }
    }
    merged.workFolder = wf;
  }

  return merged;
}

function mergePreservingLocalAttachments(incomingList, existingList) {
  if (!Array.isArray(incomingList)) return incomingList;
  if (!Array.isArray(existingList) || existingList.length === 0) return incomingList;

  const existingMap = new Map();
  existingList.forEach(item => {
    if (item && item.id) existingMap.set(item.id, item);
  });

  return incomingList.map(item => {
    if (!item || !item.id) return item;
    const existing = existingMap.get(item.id);
    if (!existing) return item;
    return mergeSingleItemAttachments(item, existing);
  });
}

async function saveAchievementsToIndexedDB(data) {
  try {
    const db = await openOrbrayDB();
    if (!db || !Array.isArray(data)) return;

    // Read existing IndexedDB data first so stripped metadata from localStorage/Firestore never erases local base64 payloads
    const existingData = await new Promise((resolve) => {
      try {
        const readTx = db.transaction([IDB_STORE_ACHIEVEMENTS], 'readonly');
        const readStore = readTx.objectStore(IDB_STORE_ACHIEVEMENTS);
        const req = readStore.get('achievements');
        req.onsuccess = () => resolve(req.result && Array.isArray(req.result.value) ? req.result.value : null);
        req.onerror = () => resolve(null);
      } catch (e) {
        resolve(null);
      }
    });

    const safeData = existingData ? mergePreservingLocalAttachments(data, existingData) : data;

    const tx = db.transaction([IDB_STORE_ACHIEVEMENTS], 'readwrite');
    const store = tx.objectStore(IDB_STORE_ACHIEVEMENTS);
    store.put({ key: 'achievements', value: safeData, updatedAt: Date.now() });
  } catch (err) {
    console.warn('Failed to save to IndexedDB:', err);
  }
}

async function loadAchievementsFromIndexedDB() {
  try {
    const db = await openOrbrayDB();
    if (!db) return null;
    return new Promise((resolve) => {
      const tx = db.transaction([IDB_STORE_ACHIEVEMENTS], 'readonly');
      const store = tx.objectStore(IDB_STORE_ACHIEVEMENTS);
      const req = store.get('achievements');
      req.onsuccess = () => {
        if (req.result && req.result.value && Array.isArray(req.result.value)) {
          resolve(req.result.value);
        } else {
          resolve(null);
        }
      };
      req.onerror = () => resolve(null);
    });
  } catch (err) {
    console.warn('Failed to load from IndexedDB:', err);
    return null;
  }
}

// --- State ---
let achievements = [];
let categories = [];
let currentView = localStorage.getItem('orbray_view_preference') || (window.innerWidth <= 768 ? 'cards' : 'table');
let currentSearch = '';
let currentCategoryFilter = 'all';
let currentStatusFilter = 'all';
let currentAssigneeFilter = 'all';
let currentTimeFilter = 'all';
let tableMode = localStorage.getItem('orbray_table_mode') || 'compact'; // 'compact' | 'full'
let isRequesterRankingVisible = localStorage.getItem(STORAGE_KEY_SHOW_RANKING) !== 'false';
let isRankingExpanded = false;

// Firebase & Cloud State
let isFirebaseConnected = false;
let firebaseDb = null;
let firestoreUnsubscribe = null;
let hasInitialCloudSnapshot = false;

let categoryChartInstance = null;
let trendChartInstance = null;

// Modal Attachments State
let currentModalImageData = null;
let currentModalPdf = null; // { name: string, data: base64_url }
let currentModalFolder = null; // { name: string, fileCount: number, totalSize: string, files: Array, path: string }
let editingCategoryId = null;

// Helper to uppercase English letters in any string
function uppercaseEnglish(str) {
  if (typeof str !== 'string') return str;
  return str.replace(/[a-z]/g, char => char.toUpperCase());
}

/**
 * Sets select element value with intelligent matching, alias normalization, and dynamic fallback preservation
 */
function setSelectValueWithFallback(selectEl, value) {
  if (!selectEl) return;
  if (!value || typeof value !== 'string' || value.trim() === '') {
    selectEl.value = '';
    return;
  }

  const rawVal = uppercaseEnglish(value.trim());
  const options = Array.from(selectEl.options || []);

  // 1. Direct exact match (by value or option label)
  for (const opt of options) {
    if (opt.value && opt.value.trim().toUpperCase() === rawVal) {
      selectEl.value = opt.value;
      return;
    }
    if (opt.textContent && opt.textContent.trim().toUpperCase() === rawVal) {
      selectEl.value = opt.value;
      return;
    }
  }

  // 2. Intelligent domain alias mapping based on select ID
  const id = (selectEl.id || '').toLowerCase();

  // 2.1 Factory mapping (FACTORY A, FACTORY B, FACTORY C, FACTORY D, FACTORY E)
  if (id.includes('factory')) {
    let targetLetter = null;
    const m = rawVal.match(/(?:FACTORY|FAC|โรงงาน)?\s*([A-E1-5])\b/i);
    if (m) {
      const char = m[1].toUpperCase();
      const numToLetter = { '1': 'A', '2': 'B', '3': 'C', '4': 'D', '5': 'E' };
      targetLetter = numToLetter[char] || char;
    }
    if (targetLetter) {
      const targetVal = `FACTORY ${targetLetter}`;
      const matchedOpt = options.find(opt => opt.value === targetVal);
      if (matchedOpt) {
        selectEl.value = matchedOpt.value;
        return;
      }
    }
  }

  // 2.2 Department mapping
  if (id.includes('department')) {
    let targetDept = null;
    if (rawVal.includes('FERRULE') || rawVal.includes('เฟอร์รูล')) targetDept = 'FERRULE PRODUCTION';
    else if (rawVal.includes('MOTOR') || rawVal.includes('มอเตอร์') || rawVal.includes('GEAR') || rawVal.includes('ROTOR') || rawVal.includes('BRUSHLESS')) targetDept = 'MOTOR PRODUCTION';
    else if (rawVal.includes('OPTICAL') || rawVal.includes('OPICAL')) targetDept = 'OPICAL PRODUCTION';
    else if (rawVal.includes('FIBER') || rawVal.includes('ไฟเบอร์')) targetDept = 'FIBER PRODUCTION';
    else if (rawVal.includes('QC') || rawVal.includes('QA') || rawVal.includes('QUALITY') || rawVal.includes('ตรวจสอบ')) targetDept = 'QUALITY';
    else if (rawVal.includes('MEDICAL') || rawVal.includes('แพทย์')) targetDept = 'MEDICAL PRODUCTION';
    else if (rawVal.includes('TECHNO') || rawVal.includes('เทคโนโลยี') || rawVal.includes('PT') || rawVal.includes('PE')) targetDept = 'PRODUCTION TECHNOLOGY';
    else if (rawVal.includes('OFFICE') || rawVal.includes('ADMIN') || rawVal.includes('HR') || rawVal.includes('บัญชี') || rawVal.includes('ธุรการ')) targetDept = 'OFFICE';
    else if (rawVal.includes('FACILITY') || rawVal.includes('FACILITIES') || rawVal.includes('สถานที่')) targetDept = 'FACILITIES';
    else if (rawVal.includes('OTHER') || rawVal.includes('INDIRECT') || rawVal.includes('อื่นๆ')) targetDept = 'OTHER';

    if (targetDept) {
      const matchedOpt = options.find(opt => opt.value === targetDept);
      if (matchedOpt) {
        selectEl.value = matchedOpt.value;
        return;
      }
    }
  }

  // 2.3 Assignee mapping (SUTTHIPONG M. , JITTRAKAN K. , TANIN P. , KITTISAK P. , NARUEBODEE C.)
  if (id.includes('assign')) {
    if (rawVal === 'NUY' || rawVal.includes('NUY')) {
      selectEl.value = 'JITTRAKAN K.';
      return;
    }

    let targetAssignee = null;
    if (rawVal.includes('SUTTHIPONG') || rawVal.includes('SUTTIPONG')) targetAssignee = 'SUTTHIPONG M.';
    else if (rawVal.includes('JITTRAKAN') || rawVal.includes('JITTARAKAN')) targetAssignee = 'JITTRAKAN K.';
    else if (rawVal.includes('TANIN') || rawVal.includes('THANIN')) targetAssignee = 'TANIN P.';
    else if (rawVal.includes('KITTISAK') || rawVal.includes('KITTISUK')) targetAssignee = 'KITTISAK P.';
    else if (rawVal.includes('NARUEBODEE') || rawVal.includes('NARUBODEE') || rawVal.includes('NARUEBODE')) targetAssignee = 'NARUEBODEE C.';

    if (targetAssignee) {
      const matchedOpt = options.find(opt => opt.value === targetAssignee);
      if (matchedOpt) {
        selectEl.value = matchedOpt.value;
        return;
      }
    }

    // Only allow standard team members; do not dynamically append unauthorized custom options
    selectEl.value = '';
    return;
  }

  // 3. Substring / Token matching against existing option values
  for (const opt of options) {
    if (!opt.value) continue;
    const optVal = opt.value.toUpperCase();
    if (optVal.includes(rawVal) || rawVal.includes(optVal)) {
      selectEl.value = opt.value;
      return;
    }
  }

  // 4. Dynamic Fallback: create custom option to preserve historical data without loss
  const existingOpt = options.find(opt => opt.value && opt.value.toUpperCase() === rawVal);
  if (existingOpt) {
    selectEl.value = existingOpt.value;
  } else {
    const newOpt = document.createElement('option');
    newOpt.value = rawVal;
    newOpt.textContent = rawVal;
    selectEl.appendChild(newOpt);
    selectEl.value = rawVal;
  }
}

// ============================================================================
// --- Zero-Dependency Standalone PKZIP Generator ---
// ============================================================================
const ZipGenerator = (function() {
  const crcTable = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1);
    }
    crcTable[i] = c >>> 0;
  }

  function calculateCrc32(uint8Array) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < uint8Array.length; i++) {
      crc = (crc >>> 8) ^ crcTable[(crc ^ uint8Array[i]) & 0xFF];
    }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }

  function getDosTimeAndDate(date) {
    const d = date instanceof Date ? date : new Date();
    const time = (d.getHours() << 11) | (d.getMinutes() << 5) | (d.getSeconds() >> 1);
    const dt = ((d.getFullYear() - 1980) << 9) | ((d.getMonth() + 1) << 5) | d.getDate();
    return { time, dt };
  }

  /**
   * Creates a standard uncompressed PKZIP Blob
   * @param {Array<{name: string, relPath?: string, data: string | Uint8Array | ArrayBuffer}>} files
   * @param {string} [rootFolderName] - Top-level folder name inside ZIP
   * @returns {Blob}
   */
  function createZip(files, rootFolderName = '') {
    const encoder = new TextEncoder();
    const parts = [];
    const centralEntries = [];
    let currentOffset = 0;
    const now = new Date();
    const { time: dosTime, dt: dosDate } = getDosTimeAndDate(now);

    const safeRoot = (rootFolderName || '').trim().replace(/\\/g, '/').replace(/^\/+|\/+$/g, '');

    for (const f of files) {
      let rawPath = (f.relPath || f.name || 'file').replace(/\\/g, '/').replace(/^\/+/, '');
      if (safeRoot && !rawPath.startsWith(safeRoot + '/')) {
        rawPath = safeRoot + '/' + rawPath;
      }
      const nameBytes = encoder.encode(rawPath);

      let dataBytes;
      if (f.data instanceof Uint8Array) {
        dataBytes = f.data;
      } else if (f.data instanceof ArrayBuffer) {
        dataBytes = new Uint8Array(f.data);
      } else if (typeof f.data === 'string') {
        if (f.data.startsWith('data:')) {
          const commaIdx = f.data.indexOf(',');
          const base64 = commaIdx !== -1 ? f.data.slice(commaIdx + 1) : f.data;
          try {
            const binary = atob(base64);
            dataBytes = new Uint8Array(binary.length);
            for (let i = 0; i < binary.length; i++) dataBytes[i] = binary.charCodeAt(i);
          } catch (e) {
            console.warn('Base64 decode warning for file', f.name, e);
            dataBytes = encoder.encode(f.data);
          }
        } else {
          dataBytes = encoder.encode(f.data);
        }
      } else {
        dataBytes = new Uint8Array(0);
      }

      const crc = calculateCrc32(dataBytes);
      const size = dataBytes.length;
      const localOffset = currentOffset;

      // Local Header: 30 bytes + nameBytes.length
      const localHeader = new Uint8Array(30 + nameBytes.length);
      const lv = new DataView(localHeader.buffer);
      lv.setUint32(0, 0x04034b50, true); // Local file header signature
      lv.setUint16(4, 20, true);          // Version needed (2.0)
      lv.setUint16(6, 0x0800, true);      // UTF-8 flag (Bit 11)
      lv.setUint16(8, 0, true);           // Compression method 0 (Store)
      lv.setUint16(10, dosTime, true);
      lv.setUint16(12, dosDate, true);
      lv.setUint32(14, crc, true);
      lv.setUint32(18, size, true);       // Compressed size
      lv.setUint32(22, size, true);       // Uncompressed size
      lv.setUint16(26, nameBytes.length, true);
      lv.setUint16(28, 0, true);          // Extra field length
      localHeader.set(nameBytes, 30);

      parts.push(localHeader);
      parts.push(dataBytes);
      currentOffset += localHeader.length + dataBytes.length;

      // Central Directory entry: 46 bytes + nameBytes.length
      const cdEntry = new Uint8Array(46 + nameBytes.length);
      const cv = new DataView(cdEntry.buffer);
      cv.setUint32(0, 0x02014b50, true); // Central header signature
      cv.setUint16(4, 20, true);          // Version made by
      cv.setUint16(6, 20, true);          // Version needed
      cv.setUint16(8, 0x0800, true);      // UTF-8 flag
      cv.setUint16(10, 0, true);          // Compression method
      cv.setUint16(12, dosTime, true);
      cv.setUint16(14, dosDate, true);
      cv.setUint32(16, crc, true);
      cv.setUint32(20, size, true);
      cv.setUint32(24, size, true);
      cv.setUint16(28, nameBytes.length, true);
      cv.setUint16(30, 0, true);          // Extra field length
      cv.setUint16(32, 0, true);          // Comment length
      cv.setUint16(34, 0, true);          // Disk start
      cv.setUint16(36, 0, true);          // Internal attributes
      cv.setUint32(38, 0, true);          // External attributes
      cv.setUint32(42, localOffset, true);// Relative offset of local header
      cdEntry.set(nameBytes, 46);

      centralEntries.push(cdEntry);
    }

    const cdOffset = currentOffset;
    let cdSize = 0;
    for (const cde of centralEntries) {
      parts.push(cde);
      cdSize += cde.length;
    }

    // End of Central Directory Record (22 bytes)
    const eocd = new Uint8Array(22);
    const ev = new DataView(eocd.buffer);
    ev.setUint32(0, 0x06054b50, true);   // EOCD signature
    ev.setUint16(4, 0, true);            // Disk number
    ev.setUint16(6, 0, true);            // Disk with CD
    ev.setUint16(8, files.length, true); // Number of entries on this disk
    ev.setUint16(10, files.length, true);// Total entries
    ev.setUint32(12, cdSize, true);      // Size of central directory
    ev.setUint32(16, cdOffset, true);    // Offset of central directory
    ev.setUint16(20, 0, true);           // Comment length
    parts.push(eocd);

    return new Blob(parts, { type: 'application/zip' });
  }

  return { createZip };
})();

// --- Work Folder Download Utilities ---
let currentDetailFolderData = null; // Stored for folder detail modal downloads
let currentDetailAchvId = null; // Track achievement ID for cloud downloads

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename || 'download.zip';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function downloadDataUrl(dataUrl, filename) {
  if (!dataUrl) return;
  downloadBase64File(dataUrl, filename);
}

function downloadBase64File(fileData, filename, defaultMime = 'application/octet-stream') {
  if (!fileData) return;
  try {
    if (fileData instanceof Blob) {
      downloadBlob(fileData, filename);
      return;
    }
    if (typeof fileData === 'string' && fileData.startsWith('blob:')) {
      const a = document.createElement('a');
      a.href = fileData;
      a.download = filename || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }
    if (typeof fileData === 'string' && fileData.startsWith('data:')) {
      const parts = fileData.split(',');
      if (parts.length >= 2) {
        const mimeMatch = parts[0].match(/:(.*?);/);
        const mime = mimeMatch ? mimeMatch[1] : defaultMime;
        const bstr = atob(parts[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        const blob = new Blob([u8arr], { type: mime });
        downloadBlob(blob, filename);
        return;
      }
    }
    const a = document.createElement('a');
    a.href = fileData;
    a.download = filename || 'download';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  } catch (err) {
    console.error('downloadBase64File fallback error:', err);
    try {
      const a = document.createElement('a');
      a.href = fileData;
      a.download = filename || 'download';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e2) {
      console.error('downloadBase64File critical error:', e2);
    }
  }
}

function hasLocalFolderFileData(folder) {
  if (!folder || typeof folder === 'string') return false;
  if (folder.zipData) return true;
  if (Array.isArray(folder.files) && folder.files.some(f => !!f.data)) return true;
  return false;
}

function hasFolderDownloadableData(folder) {
  if (!folder) return false;
  if (typeof folder === 'string') return false;
  if (folder.zipData) return true;
  if (folder.hasCloudFiles) return true;
  if (Array.isArray(folder.files) && folder.files.some(f => !!f.data)) return true;
  if (Array.isArray(folder.files) && folder.files.length > 0) return true;
  return false;
}

function isFirestorePermissionError(err) {
  if (!err) return false;
  if (err.isPermissionDenied) return true;
  const code = String(err.code || '').toLowerCase();
  const msg = String(err.message || '').toLowerCase();
  return code.includes('permission-denied') || code.includes('permission_denied') || msg.includes('missing or insufficient permissions') || msg.includes('permission-denied');
}

function alertFirestorePermissionHelp() {
  const rulesUrl = 'https://console.firebase.google.com/project/orbray-techno-achievements/firestore/rules';
  const msg = [
    '⚠️ ไม่สามารถดึงไฟล์จากคลาวด์ได้ เนื่องจากสิทธิ์ Firebase Firestore หมดอายุ (ครบกำหนด 30 วันของ Test Mode เมื่อวันที่ 10 ต.ค. 2026)',
    '',
    '📌 ข้อมูลและโฟลเดอร์บนคลาวด์ของคุณไม่ได้หายไปไหน! ยังอยู่ครบในฐานข้อมูล Firebase',
    '',
    '✅ วิธีปลดล็อกให้โฟลเดอร์ทั้งหมดกลับมาดาวน์โหลดได้ทันที (ใช้เวลา 30 วินาที):',
    '1. เปิดลิงก์ตั้งค่า Firebase Rules:',
    `   ${rulesUrl}`,
    '2. แก้บรรทัด allow read, write ในหน้า Rules ให้เป็น:',
    '   allow read, write: if true;',
    '3. กดปุ่ม Publish (เผยแพร่) ด้านบน แล้วรีเฟรชหน้าเว็บนี้ โฟลเดอร์ทั้งหมดจะกลับมาใช้งานได้ทันทีครับ!'
  ].join('\n');
  alert(msg);
}

const FIRESTORE_CHUNK_SIZE = 600000; // 600 KB safe chunk for Firestore 1MB document limit

async function uploadFolderFilesToFirestore(db, achvId, files) {
  if (!db || !achvId || !Array.isArray(files) || files.length === 0) return false;
  try {
    const colRef = db.collection('achievements').doc(achvId).collection('folderFiles');
    const filesWithData = files.filter(f => f && f.data);
    if (filesWithData.length === 0) return false;

    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const data = (f && f.data) ? f.data : '';
      if (!data) continue;

      if (files.length > 1) {
        showToast(`☁️ กำลังอัปโหลดไฟล์โฟลเดอร์ขึ้นคลาวด์ (${i + 1}/${files.length}): ${f.name || ''}`);
      }

      if (data.length <= FIRESTORE_CHUNK_SIZE) {
        await colRef.doc(`file_${i}`).set({
          fileIndex: i,
          name: f.name || '',
          relPath: f.relPath || f.name || '',
          size: f.size || '',
          sizeBytes: f.sizeBytes || 0,
          type: f.type || '',
          data: data,
          isChunked: false,
          uploadedAt: new Date().toISOString()
        });
      } else {
        const totalChunks = Math.ceil(data.length / FIRESTORE_CHUNK_SIZE);
        await colRef.doc(`file_${i}`).set({
          fileIndex: i,
          name: f.name || '',
          relPath: f.relPath || f.name || '',
          size: f.size || '',
          sizeBytes: f.sizeBytes || 0,
          type: f.type || '',
          isChunked: true,
          totalChunks: totalChunks,
          uploadedAt: new Date().toISOString()
        });

        // Upload chunks in parallel batches of 5 for 5x faster speed on large folders
        const BATCH_SIZE = 5;
        for (let c = 0; c < totalChunks; c += BATCH_SIZE) {
          const batchPromises = [];
          for (let b = c; b < Math.min(c + BATCH_SIZE, totalChunks); b++) {
            const chunkStr = data.substring(b * FIRESTORE_CHUNK_SIZE, (b + 1) * FIRESTORE_CHUNK_SIZE);
            batchPromises.push(
              colRef.doc(`file_${i}_chunk_${b}`).set({
                fileIndex: i,
                chunkIndex: b,
                data: chunkStr
              })
            );
          }
          await Promise.all(batchPromises);
        }
      }
    }
    return true;
  } catch (err) {
    console.warn('Failed to upload folder files to Firestore:', err);
    if (isFirestorePermissionError(err)) {
      err.isPermissionDenied = true;
    }
    return false;
  }
}

async function downloadSingleFileFromFirestore(db, achvId, fileIndex, fileMeta) {
  if (!db || !achvId || fileIndex === undefined || fileIndex === null) return null;
  const colRef = db.collection('achievements').doc(achvId).collection('folderFiles');
  const metaSnap = await colRef.doc(`file_${fileIndex}`).get();
  if (!metaSnap.exists) return null;

  const metaDoc = metaSnap.data();
  let fullData = '';

  if (!metaDoc.isChunked) {
    fullData = metaDoc.data || '';
  } else {
    const totalChunks = metaDoc.totalChunks || 0;
    const chunkResults = new Array(totalChunks).fill('');
    const BATCH_SIZE = 8;
    for (let c = 0; c < totalChunks; c += BATCH_SIZE) {
      const promises = [];
      for (let b = c; b < Math.min(c + BATCH_SIZE, totalChunks); b++) {
        promises.push(
          colRef.doc(`file_${fileIndex}_chunk_${b}`).get().then(snap => {
            if (snap.exists && snap.data() && snap.data().data) {
              chunkResults[b] = snap.data().data;
            }
          })
        );
      }
      await Promise.all(promises);
    }
    fullData = chunkResults.join('');
  }

  if (!fullData) return null;

  return {
    name: metaDoc.name || (fileMeta ? fileMeta.name : `FILE_${fileIndex}`),
    relPath: metaDoc.relPath || (fileMeta ? fileMeta.relPath : ''),
    size: metaDoc.size || (fileMeta ? fileMeta.size : ''),
    sizeBytes: metaDoc.sizeBytes || (fileMeta ? fileMeta.sizeBytes : 0),
    type: metaDoc.type || (fileMeta ? fileMeta.type : ''),
    data: fullData
  };
}

async function downloadFolderFilesFromFirestore(db, achvId, filesMeta) {
  if (!db || !achvId) return null;
  try {
    const colRef = db.collection('achievements').doc(achvId).collection('folderFiles');
    const knownCount = Array.isArray(filesMeta) && filesMeta.length > 0 ? filesMeta.length : 0;

    // Strategy 1: Fetch each file by ID and its chunks in parallel batches (prevents WebChannel payload overflow on large 80MB+ folders)
    if (knownCount > 0) {
      const files = [];
      let anyLoaded = false;

      for (let i = 0; i < knownCount; i++) {
        if (knownCount > 2) {
          showToast(`☁️ กำลังดาวน์โหลดไฟล์จากคลาวด์ (${i + 1}/${knownCount})...`);
        }
        const existingMeta = filesMeta[i] || {};
        if (existingMeta.data) {
          files.push(existingMeta);
          anyLoaded = true;
          continue;
        }
        const downloaded = await downloadSingleFileFromFirestore(db, achvId, i, existingMeta);
        if (downloaded && downloaded.data) {
          files.push(downloaded);
          anyLoaded = true;
        } else {
          files.push({ ...existingMeta });
        }
      }

      if (anyLoaded) {
        return files;
      }
    }

    // Strategy 2: Fallback collection snapshot query if filesMeta count wasn't known or Strategy 1 found no indexed docs
    const snapshot = await colRef.get();
    if (snapshot.empty) return null;

    const docsMap = {};
    let maxFileIndex = -1;
    snapshot.forEach(doc => {
      const d = doc.data();
      docsMap[doc.id] = d;
      if (typeof d.fileIndex === 'number' && d.fileIndex > maxFileIndex) {
        maxFileIndex = d.fileIndex;
      }
    });

    const files = [];
    const count = Math.max(knownCount, maxFileIndex + 1);

    for (let i = 0; i < count; i++) {
      const metaDoc = docsMap[`file_${i}`];
      const fallbackMeta = (filesMeta && filesMeta[i]) ? filesMeta[i] : null;
      if (!metaDoc) {
        if (fallbackMeta) files.push({ ...fallbackMeta });
        continue;
      }

      let fullData = '';
      if (!metaDoc.isChunked) {
        fullData = metaDoc.data || '';
      } else {
        const chunks = [];
        for (let c = 0; c < metaDoc.totalChunks; c++) {
          const cDoc = docsMap[`file_${i}_chunk_${c}`];
          if (cDoc && cDoc.data) {
            chunks.push(cDoc.data);
          }
        }
        fullData = chunks.join('');
      }

      files.push({
        name: metaDoc.name || (fallbackMeta ? fallbackMeta.name : `FILE_${i}`),
        relPath: metaDoc.relPath || (fallbackMeta ? fallbackMeta.relPath : ''),
        size: metaDoc.size || (fallbackMeta ? fallbackMeta.size : ''),
        sizeBytes: metaDoc.sizeBytes || (fallbackMeta ? fallbackMeta.sizeBytes : 0),
        type: metaDoc.type || (fallbackMeta ? fallbackMeta.type : ''),
        data: fullData
      });
    }

    return files.some(f => !!f.data) ? files : null;
  } catch (err) {
    console.error('Error fetching folder files from Firestore:', err);
    if (isFirestorePermissionError(err)) {
      err.isPermissionDenied = true;
      throw err;
    }
    return null;
  }
}

async function uploadPdfFileToFirestore(db, achvId, pdfObj) {
  if (!db || !achvId || !pdfObj) return;
  try {
    const rawData = pdfObj.data || '';
    if (!rawData) return;

    const colRef = db.collection('achievements').doc(achvId).collection('pdfFiles');
    const name = pdfObj.name || 'JOB_REQUEST.PDF';
    const size = pdfObj.size || '';
    const type = pdfObj.type || 'application/pdf';
    const path = pdfObj.path || '';

    if (rawData.length <= FIRESTORE_CHUNK_SIZE) {
      await colRef.doc('main').set({
        name,
        size,
        type,
        path,
        data: rawData,
        isChunked: false,
        uploadedAt: new Date().toISOString()
      });
    } else {
      const totalChunks = Math.ceil(rawData.length / FIRESTORE_CHUNK_SIZE);
      await colRef.doc('main').set({
        name,
        size,
        type,
        path,
        isChunked: true,
        totalChunks: totalChunks,
        uploadedAt: new Date().toISOString()
      });

      const BATCH_SIZE = 5;
      for (let c = 0; c < totalChunks; c += BATCH_SIZE) {
        const batchPromises = [];
        for (let b = c; b < Math.min(c + BATCH_SIZE, totalChunks); b++) {
          const chunkStr = rawData.substring(b * FIRESTORE_CHUNK_SIZE, (b + 1) * FIRESTORE_CHUNK_SIZE);
          batchPromises.push(
            colRef.doc(`chunk_${b}`).set({
              chunkIndex: b,
              data: chunkStr
            })
          );
        }
        await Promise.all(batchPromises);
      }
    }
    console.log(`Cloud PDF uploaded for achievement ${achvId} (${name})`);
    showToast(`☁️ อัปโหลดไฟล์ PDF "${name}" ขึ้นคลาวด์เรียบร้อยแล้ว`);
  } catch (err) {
    console.warn('Failed to upload PDF to Firestore:', err);
  }
}

async function downloadPdfFileFromFirestore(db, achvId) {
  if (!db || !achvId) return null;
  try {
    const colRef = db.collection('achievements').doc(achvId).collection('pdfFiles');
    const mainDocSnap = await colRef.doc('main').get();

    // Fallback: check if stored in main achievement doc itself
    if (!mainDocSnap.exists) {
      const achvSnap = await db.collection('achievements').doc(achvId).get();
      if (achvSnap.exists) {
        const aData = achvSnap.data();
        if (aData && aData.pdfAttachment && aData.pdfAttachment.data) {
          return aData.pdfAttachment;
        }
      }
      return null;
    }

    const mainMeta = mainDocSnap.data();
    let fullData = '';

    if (!mainMeta.isChunked) {
      fullData = mainMeta.data || '';
    } else {
      const totalChunks = mainMeta.totalChunks || 1;
      const chunkResults = new Array(totalChunks).fill('');
      const BATCH_SIZE = 8;
      for (let c = 0; c < totalChunks; c += BATCH_SIZE) {
        const promises = [];
        for (let b = c; b < Math.min(c + BATCH_SIZE, totalChunks); b++) {
          promises.push(
            colRef.doc(`chunk_${b}`).get().then(cSnap => {
              if (cSnap.exists && cSnap.data() && cSnap.data().data) {
                chunkResults[b] = cSnap.data().data;
              }
            })
          );
        }
        await Promise.all(promises);
      }
      fullData = chunkResults.join('');
    }

    if (!fullData) return null;

    return {
      name: mainMeta.name || 'JOB_REQUEST.PDF',
      size: mainMeta.size || '',
      type: mainMeta.type || 'application/pdf',
      path: mainMeta.path || '',
      data: fullData,
      hasCloudPdf: true
    };
  } catch (err) {
    console.error('Error downloading PDF from Firestore:', err);
    if (isFirestorePermissionError(err)) {
      alertFirestorePermissionHelp();
    }
    return null;
  }
}

async function uploadImageFileToFirestore(db, achvId, imgObj) {
  if (!db || !achvId || !imgObj) return;
  try {
    const rawData = typeof imgObj === 'object' ? (imgObj.data || '') : (typeof imgObj === 'string' ? imgObj : '');
    if (!rawData) return;

    const colRef = db.collection('achievements').doc(achvId).collection('imageFiles');
    const name = (typeof imgObj === 'object' && imgObj.name) ? imgObj.name : 'IMAGE';
    const type = (typeof imgObj === 'object' && imgObj.type) ? imgObj.type : 'image/png';

    if (rawData.length <= FIRESTORE_CHUNK_SIZE) {
      await colRef.doc('main').set({
        name,
        type,
        data: rawData,
        isChunked: false,
        uploadedAt: new Date().toISOString()
      });
    } else {
      const totalChunks = Math.ceil(rawData.length / FIRESTORE_CHUNK_SIZE);
      await colRef.doc('main').set({
        name,
        type,
        isChunked: true,
        totalChunks: totalChunks,
        uploadedAt: new Date().toISOString()
      });

      const BATCH_SIZE = 5;
      for (let c = 0; c < totalChunks; c += BATCH_SIZE) {
        const batchPromises = [];
        for (let b = c; b < Math.min(c + BATCH_SIZE, totalChunks); b++) {
          const chunkStr = rawData.substring(b * FIRESTORE_CHUNK_SIZE, (b + 1) * FIRESTORE_CHUNK_SIZE);
          batchPromises.push(
            colRef.doc(`chunk_${b}`).set({
              chunkIndex: b,
              data: chunkStr
            })
          );
        }
        await Promise.all(batchPromises);
      }
    }
    console.log(`Cloud Image uploaded for achievement ${achvId} (${name})`);
  } catch (err) {
    console.warn('Failed to upload image to Firestore:', err);
  }
}

async function downloadImageFileFromFirestore(db, achvId) {
  if (!db || !achvId) return null;
  try {
    const colRef = db.collection('achievements').doc(achvId).collection('imageFiles');
    const mainDocSnap = await colRef.doc('main').get();

    if (!mainDocSnap.exists) {
      const achvSnap = await db.collection('achievements').doc(achvId).get();
      if (achvSnap.exists) {
        const aData = achvSnap.data();
        if (aData && aData.imageData && (typeof aData.imageData === 'string' || aData.imageData.data)) {
          return aData.imageData;
        }
      }
      return null;
    }

    const mainMeta = mainDocSnap.data();
    let fullData = '';

    if (!mainMeta.isChunked) {
      fullData = mainMeta.data || '';
    } else {
      const totalChunks = mainMeta.totalChunks || 1;
      const chunkResults = new Array(totalChunks).fill('');
      const BATCH_SIZE = 8;
      for (let c = 0; c < totalChunks; c += BATCH_SIZE) {
        const promises = [];
        for (let b = c; b < Math.min(c + BATCH_SIZE, totalChunks); b++) {
          promises.push(
            colRef.doc(`chunk_${b}`).get().then(cSnap => {
              if (cSnap.exists && cSnap.data() && cSnap.data().data) {
                chunkResults[b] = cSnap.data().data;
              }
            })
          );
        }
        await Promise.all(promises);
      }
      fullData = chunkResults.join('');
    }

    if (!fullData) return null;

    return {
      name: mainMeta.name || 'IMAGE',
      type: mainMeta.type || 'image/png',
      data: fullData,
      hasCloudImage: true
    };
  } catch (err) {
    console.error('Error downloading image from Firestore:', err);
    if (isFirestorePermissionError(err)) {
      alertFirestorePermissionHelp();
    }
    return null;
  }
}

async function downloadFolderObject(folder, achvId) {
  if (!folder) {
    alert('ไม่พบข้อมูลโฟลเดอร์สำหรับดาวน์โหลด');
    return;
  }
  const folderName = getFolderName(folder) || 'WORK_FOLDER';
  const targetAchvId = achvId || currentDetailAchvId;

  // 0. If folder does not have local file data in memory, try restoring from local IndexedDB first!
  if (!hasLocalFolderFileData(folder) && targetAchvId) {
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData) {
        const fullItem = idbData.find(a => a && a.id === targetAchvId);
        if (fullItem && fullItem.workFolder && hasLocalFolderFileData(fullItem.workFolder)) {
          folder.zipData = fullItem.workFolder.zipData || folder.zipData;
          if (Array.isArray(fullItem.workFolder.files) && fullItem.workFolder.files.some(f => !!f.data)) {
            folder.files = fullItem.workFolder.files;
          }
          const memItem = achievements.find(a => a.id === targetAchvId);
          if (memItem) memItem.workFolder = folder;
        }
      }
    } catch (idbErr) {
      console.warn('IndexedDB restore check before download failed:', idbErr);
    }
  }

  // 1. If pre-built zipData exists
  if (folder.zipData) {
    downloadDataUrl(folder.zipData, `${folderName}.zip`);
    showToast(`กำลังดาวน์โหลดโฟลเดอร์ "${folderName}.zip"...`);
    return;
  }

  // 2. If files array already has data in memory
  if (Array.isArray(folder.files) && folder.files.some(f => !!f.data)) {
    const filesWithData = folder.files.filter(f => !!f.data);
    showToast('📦 กำลังสร้างไฟล์ ZIP และเตรียมดาวน์โหลด...');
    try {
      const zipBlob = ZipGenerator.createZip(filesWithData, folderName);
      downloadBlob(zipBlob, `${folderName}.zip`);
      showToast(`✅ ดาวน์โหลดโฟลเดอร์ "${folderName}.zip" เรียบร้อยแล้ว`);
      return;
    } catch (err) {
      console.error('ZIP generation error:', err);
      alert('เกิดข้อผิดพลาดในการสร้างไฟล์ ZIP: ' + err.message);
      return;
    }
  }

  // 3. If files exist on Cloud Firestore (fetch on demand)
  let permissionDeniedOccurred = false;
  if (firebaseDb && targetAchvId) {
    showToast('☁️ กำลังดาวน์โหลดไฟล์โฟลเดอร์จากระบบคลาวด์...');
    try {
      const cloudFiles = await downloadFolderFilesFromFirestore(firebaseDb, targetAchvId, folder.files);
      if (cloudFiles && cloudFiles.length > 0 && cloudFiles.some(f => !!f.data)) {
        folder.files = cloudFiles;
        folder.hasCloudFiles = true;

        // Save to achievements and IndexedDB
        const item = achievements.find(a => a.id === targetAchvId);
        if (item) {
          item.workFolder = folder;
          saveAchievementsToIndexedDB(achievements);
        }

        // If detail modal is open, refresh view so single download buttons are ready
        if (currentDetailFolderData === folder) {
          showFolderDetailModal(folder, item ? item.title : '');
        }

        showToast('📦 ดาวน์โหลดจากคลาวด์สำเร็จ! กำลังสร้างไฟล์ ZIP...');
        const zipBlob = ZipGenerator.createZip(cloudFiles.filter(f => !!f.data), folderName);
        downloadBlob(zipBlob, `${folderName}.zip`);
        showToast(`✅ ดาวน์โหลดโฟลเดอร์ "${folderName}.zip" เรียบร้อยแล้ว`);
        return;
      }
    } catch (cloudErr) {
      console.warn('Cloud folder download error:', cloudErr);
      if (isFirestorePermissionError(cloudErr)) {
        permissionDeniedOccurred = true;
      }
    }
  }

  if (permissionDeniedOccurred) {
    alertFirestorePermissionHelp();
    return;
  }

  // 4. Fallback if only PATH exists and no files data was uploaded
  const path = getFolderPath(folder);
  if (path) {
    alert(`โฟลเดอร์นี้ถูกบันทึกด้วย PATH ในเครื่อง:\n${path}\n\n(ไม่ได้อัปโหลดไฟล์ตัวจริงลงเว็บ จึงไม่สามารถดาวน์โหลดเป็นไฟล์ ZIP ได้)\nระบบได้คัดลอก PATH ให้แล้ว สามารถนำไปเปิดใน Windows File Explorer ได้เลยครับ`);
    copyFolderString(path);
  } else {
    alert('ไม่พบข้อมูลเนื้อหาไฟล์ของโฟลเดอร์นี้บนคลาวด์ (อาจเกิดจากสิทธิ์ Firebase Firestore หมดอายุ หรือปิดหน้าเว็บก่อนอัปโหลดโฟลเดอร์ขนาดใหญ่เสร็จ)\n\nกรุณาตรวจสอบการตั้งค่า Firestore Rules ใน Firebase Console หรือแนบโฟลเดอร์นี้อีกครั้งครับ');
  }
}

function downloadCurrentModalFolder() {
  if (!currentModalFolder) {
    alert('ยังไม่ได้แนบโฟลเดอร์');
    return;
  }
  const modalAchvId = document.getElementById('achvId') ? document.getElementById('achvId').value : null;
  downloadFolderObject(currentModalFolder, modalAchvId);
}

async function downloadWorkFolderAttachment(achvId) {
  let item = achievements.find(a => a.id === achvId);
  if (!item || !item.workFolder) {
    alert('ไม่พบข้อมูลโฟลเดอร์สำหรับงานนี้');
    return;
  }

  let folder = item.workFolder;
  if (!hasLocalFolderFileData(folder)) {
    // Try restoring full workFolder from IndexedDB
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData) {
        const fullItem = idbData.find(a => a.id === achvId);
        if (fullItem && fullItem.workFolder && hasLocalFolderFileData(fullItem.workFolder)) {
          item.workFolder = fullItem.workFolder;
          folder = fullItem.workFolder;
        }
      }
    } catch (e) {
      console.warn('Failed to load full folder from IDB:', e);
    }
  }

  downloadFolderObject(folder, achvId);
}

async function downloadSingleFolderFile(fileIndex) {
  if (!currentDetailFolderData || !currentDetailFolderData.files || !currentDetailFolderData.files[fileIndex]) return;
  let file = currentDetailFolderData.files[fileIndex];

  // 1. Check local IndexedDB first if file.data is missing in memory
  if (!file.data && currentDetailAchvId) {
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData) {
        const fullItem = idbData.find(a => a && a.id === currentDetailAchvId);
        if (fullItem && fullItem.workFolder && Array.isArray(fullItem.workFolder.files) && fullItem.workFolder.files[fileIndex] && fullItem.workFolder.files[fileIndex].data) {
          currentDetailFolderData.files = fullItem.workFolder.files;
          file = fullItem.workFolder.files[fileIndex];
          const item = achievements.find(a => a.id === currentDetailAchvId);
          if (item) item.workFolder = currentDetailFolderData;
        }
      }
    } catch (idbErr) {
      console.warn('Single file IDB check notice:', idbErr);
    }
  }

  // 2. Fetch just this single file from Cloud Firestore (fast! No need to download the entire folder)
  let permissionDeniedOccurred = false;
  if (!file.data && currentDetailAchvId && firebaseDb) {
    showToast(`☁️ กำลังดึงไฟล์ "${file.name}" จากระบบคลาวด์...`);
    try {
      const singleCloudFile = await downloadSingleFileFromFirestore(firebaseDb, currentDetailAchvId, fileIndex, file);
      if (singleCloudFile && singleCloudFile.data) {
        currentDetailFolderData.files[fileIndex] = singleCloudFile;
        file = singleCloudFile;
        const item = achievements.find(a => a.id === currentDetailAchvId);
        if (item) {
          item.workFolder = currentDetailFolderData;
          saveAchievementsToIndexedDB(achievements);
        }
      } else {
        // Fallback: try full folder download in case doc IDs differed
        const cloudFiles = await downloadFolderFilesFromFirestore(firebaseDb, currentDetailAchvId, currentDetailFolderData.files);
        if (cloudFiles && cloudFiles[fileIndex] && cloudFiles[fileIndex].data) {
          currentDetailFolderData.files = cloudFiles;
          file = cloudFiles[fileIndex];
          const item = achievements.find(a => a.id === currentDetailAchvId);
          if (item) {
            item.workFolder = currentDetailFolderData;
            saveAchievementsToIndexedDB(achievements);
          }
        }
      }
    } catch (e) {
      console.warn('Single file cloud download notice:', e);
      if (isFirestorePermissionError(e)) {
        permissionDeniedOccurred = true;
      }
    }
  }

  if (permissionDeniedOccurred) {
    alertFirestorePermissionHelp();
    return;
  }

  if (!file.data) {
    alert('ไม่พบข้อมูลเนื้อหาของไฟล์นี้ (อาจเกิดจากสิทธิ์ Firebase Firestore หมดอายุ หรือโฟลเดอร์บันทึกเฉพาะ PATH)');
    return;
  }
  downloadDataUrl(file.data, file.name);
  showToast(`ดาวน์โหลดไฟล์ "${file.name}" สำเร็จ`);
}

function formatFileSize(bytes) {
  if (!bytes || bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function getFileExtension(filename) {
  if (!filename) return '';
  const parts = filename.split('.');
  return parts.length > 1 ? parts.pop().toUpperCase() : '';
}

function getFileIcon(filename) {
  const ext = (filename || '').split('.').pop().toLowerCase();
  switch (ext) {
    case 'dwg':
    case 'dxf':
      return '📐';
    case 'step':
    case 'stp':
    case 'iges':
    case 'igs':
      return '⚙️';
    case 'pdf':
      return '📄';
    case 'xlsx':
    case 'xls':
    case 'csv':
      return '📊';
    case 'doc':
    case 'docx':
    case 'txt':
      return '📝';
    case 'png':
    case 'jpg':
    case 'jpeg':
    case 'gif':
    case 'bmp':
    case 'webp':
      return '🖼️';
    case 'zip':
    case 'rar':
    case '7z':
      return '📦';
    default:
      return '📄';
  }
}

function getFolderName(workFolder) {
  if (!workFolder) return '';
  if (typeof workFolder === 'object') return uppercaseEnglish(workFolder.name || 'WORK FOLDER');
  const parts = String(workFolder).split(/[\\/]/);
  return uppercaseEnglish(parts.pop() || workFolder);
}

function getFolderPath(workFolder) {
  if (!workFolder) return '';
  if (typeof workFolder === 'object') return workFolder.path || '';
  return String(workFolder);
}

function getFolderMetaText(workFolder) {
  if (!workFolder || typeof workFolder !== 'object') return '';
  if (workFolder.fileCount) {
    return `${workFolder.fileCount} FILES` + (workFolder.totalSize ? ` • ${workFolder.totalSize}` : '');
  }
  return '';
}

function getFolderBadgeText(workFolder) {
  if (!workFolder) return 'FOLDER';
  if (typeof workFolder === 'object') {
    if (workFolder.fileCount) {
      return `FOLDER (${workFolder.fileCount} FILES)`;
    }
    return uppercaseEnglish(workFolder.name || 'FOLDER');
  }
  return 'FOLDER';
}

// Helper functions for Drawing / Image Attachment (Image & PDF)
function isDrawingPdf(imageData) {
  if (!imageData) return false;
  if (typeof imageData === 'object') return imageData.type === 'pdf';
  if (typeof imageData === 'string') return imageData.startsWith('data:application/pdf');
  return false;
}

function isDrawingImage(imageData) {
  if (!imageData) return false;
  if (typeof imageData === 'object') return imageData.type === 'image' || !imageData.type;
  if (typeof imageData === 'string') return imageData.startsWith('data:image/');
  return false;
}

function getDrawingDataUrl(imageData) {
  if (!imageData) return null;
  if (typeof imageData === 'object') return imageData.data;
  return imageData;
}

function getDrawingName(imageData, defaultName = 'DRAWING') {
  if (!imageData) return defaultName;
  if (typeof imageData === 'object' && imageData.name) return imageData.name;
  return defaultName;
}

async function openDrawingAttachment(achvId) {
  let item = achievements.find(a => a.id === achvId);
  if (!item || !item.imageData) {
    alert('ไม่มีไฟล์ DRAWING หรือรูปภาพสำหรับงานนี้');
    return;
  }
  let dataUrl = getDrawingDataUrl(item.imageData);

  // Fallback to IndexedDB if data was stored in DB
  if (!dataUrl) {
    const idbData = await loadAchievementsFromIndexedDB();
    if (idbData) {
      const fullItem = idbData.find(a => a.id === achvId);
      if (fullItem && fullItem.imageData) {
        item.imageData = fullItem.imageData;
        dataUrl = getDrawingDataUrl(item.imageData);
      }
    }
  }

  // Fallback to Cloud Firestore
  if (!dataUrl && firebaseDb) {
    showToast('☁️ กำลังดาวน์โหลดไฟล์รูปภาพจากระบบคลาวด์...');
    try {
      const cloudImg = await downloadImageFileFromFirestore(firebaseDb, achvId);
      if (cloudImg && (cloudImg.data || typeof cloudImg === 'string')) {
        item.imageData = cloudImg;
        dataUrl = getDrawingDataUrl(cloudImg);
        saveAchievementsToIndexedDB(achievements);
      }
    } catch (cErr) {
      console.warn('Cloud image fetch error:', cErr);
    }
  }

  if (!dataUrl) {
    alert('ไม่พบข้อมูลภาพหรือไฟล์ DRAWING สำหรับงานนี้\n(หากเพิ่งอัปโหลดจากเครื่องอื่น กรุณากดปุ่ม "CLOUD: ONLINE" > "ซิงค์ไฟล์แนบทั้งหมดขึ้นคลาวด์" บนเครื่องนั้นก่อน)');
    return;
  }

  if (isDrawingPdf(item.imageData)) {
    openPdfData(dataUrl);
  } else {
    const win = window.open('');
    if (win) {
      win.document.write(`
        <!DOCTYPE html>
        <html>
        <head><title>${escapeHtml(getDrawingName(item.imageData, item.title))}</title></head>
        <body style="margin:0; background:#0f172a; display:flex; align-items:center; justify-content:center; min-height:100vh;">
          <img src="${dataUrl}" style="max-width:100%; max-height:100vh; object-fit:contain;" alt="Drawing Preview">
        </body>
        </html>
      `);
      win.document.close();
    }
  }
}

async function downloadImageAttachment(achvId) {
  let item = achievements.find(a => a.id === achvId);
  if (!item || !item.imageData) {
    alert('ไม่มีไฟล์ DRAWING หรือรูปภาพสำหรับงานนี้');
    return;
  }

  let dataUrl = getDrawingDataUrl(item.imageData);

  if (!dataUrl) {
    try {
      showToast('กำลังดึงไฟล์ภาพจากฐานข้อมูล...');
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData) {
        const fullItem = idbData.find(a => a.id === achvId);
        if (fullItem && fullItem.imageData) {
          item.imageData = fullItem.imageData;
          dataUrl = getDrawingDataUrl(item.imageData);
        }
      }
    } catch (err) {
      console.warn('IndexedDB fetch error during Image download:', err);
    }
  }

  // Cloud Firestore fallback
  if (!dataUrl && firebaseDb) {
    showToast('☁️ กำลังดาวน์โหลดไฟล์ภาพจากระบบคลาวด์...');
    try {
      const cloudImg = await downloadImageFileFromFirestore(firebaseDb, achvId);
      if (cloudImg && (cloudImg.data || typeof cloudImg === 'string')) {
        item.imageData = cloudImg;
        dataUrl = getDrawingDataUrl(cloudImg);
        saveAchievementsToIndexedDB(achievements);
      }
    } catch (cErr) {
      console.warn('Cloud image download error:', cErr);
    }
  }

  if (!dataUrl) {
    alert('ไม่พบข้อมูลภาพหรือไฟล์ DRAWING สำหรับงานนี้\n(หากเพิ่งอัปโหลดจากเครื่องอื่น กรุณากดปุ่ม "CLOUD: ONLINE" > "ซิงค์ไฟล์แนบทั้งหมดขึ้นคลาวด์" บนเครื่องนั้นก่อน)');
    return;
  }

  const isPdf = isDrawingPdf(item.imageData);
  const defaultName = isPdf ? `${item.code || 'DRAWING'}.PDF` : `${item.code || 'IMAGE'}.PNG`;
  const filename = (typeof item.imageData === 'object' && item.imageData.name) ? item.imageData.name : defaultName;
  const mime = (typeof item.imageData === 'object' && item.imageData.type) ? item.imageData.type : (isPdf ? 'application/pdf' : 'image/png');

  downloadBase64File(dataUrl, filename, mime);
  showToast(`ดาวน์โหลดไฟล์: "${uppercaseEnglish(filename)}" สำเร็จ`);
}

// --- Initialize App ---
function initApp() {
  try {
    loadData();
    initAuthSession();
    setupEventListeners();
    updateRequesterRankingVisibility();
    renderAll();
    initFirebaseFromStorage();
    initMurataComponents();

    // Mobile initial tab state (Dashboard is now first tab)
    if (window.innerWidth <= 768) {
      switchMobileNavTab('dashboard');
    }

    // Responsive resize handler to restore desktop layout when screen widens
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) {
        const viewContainer = document.getElementById('viewContainer');
        const statsSection = document.querySelector('.stats-grid');
        const analyticsSection = document.querySelector('.analytics-section');
        const rankingSection = document.getElementById('requesterRankingSection');
        const heroSection = document.querySelector('.murata-hero-section');
        if (viewContainer) viewContainer.style.display = '';
        if (statsSection) statsSection.style.display = '';
        if (analyticsSection) analyticsSection.style.display = '';
        if (rankingSection) rankingSection.style.display = '';
        if (heroSection) heroSection.style.display = '';
      }
    });

    // Support deep-linking to modal via URL hash (e.g. #new or #edit=achv_xxx)
    if (window.location.hash.startsWith('#new')) {
      setTimeout(() => {
        openAchievementModal();
        if (window.location.hash.includes('sample_attached')) {
          currentModalPdf = {
            name: 'JOB_REQUEST_FR-J26-076.PDF',
            size: 720691,
            data: 'data:application/pdf;base64,JVBERi0xLjQK'
          };
          updatePdfPreview();
          currentModalFolder = {
            name: '26-0585_JIGIDA-007_DRAWINGS',
            fileCount: 4,
            totalSize: '6.4 MB',
            files: [
              { name: 'COVER.PDF', size: '1.2 MB', data: 'data:application/pdf;base64,JVBERi0xLjQK' },
              { name: 'JIG_ASSEMBLY.DWG', size: '3.1 MB', data: 'data:application/octet-stream;base64,AAAA' }
            ]
          };
          updateFolderPreview();
        }
      }, 150);
    } else if (window.location.hash.startsWith('#edit=')) {
      const editId = window.location.hash.replace('#edit=', '').split('&')[0];
      setTimeout(() => openAchievementModal(editId), 150);
    } else if (window.location.hash.startsWith('#login=') || window.location.hash.startsWith('#pin=')) {
      const autoPin = window.location.hash.split('=')[1];
      if (autoPin) {
        setTimeout(() => loginWithPin(autoPin), 150);
      }
    } else if (window.location.hash.includes('login') || window.location.hash.includes('pin')) {
      setTimeout(() => openAuthPinModal(), 150);
    } else if (window.location.hash.includes('search') || window.location.hash.includes('controls')) {
      setTimeout(() => scrollToSearchAndControls(), 250);
    }
  } catch (initErr) {
    console.error('App initialization error:', initErr);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// --- Data Loading & Persistence ---
function loadData() {
  const savedCategories = localStorage.getItem(STORAGE_KEY_CATEGORIES);
  if (savedCategories) {
    try {
      categories = JSON.parse(savedCategories);
      const catCountBefore = categories.length;
      categories = categories.filter(c => c.id !== 'cat_sys' && !c.name.includes('CMMS') && !c.name.includes('SUPPORT'));
      let updated = (categories.length !== catCountBefore);
      categories.forEach(c => {
        if (c.id === 'cat_jig' || c.name.includes('JIG & FIXTURE')) {
          if (c.name !== 'JIG & FIXTURE') { c.name = 'JIG & FIXTURE'; updated = true; }
        } else if (c.id === 'cat_acc' || c.name.includes('อุปกรณ์เสริม') || c.name.includes('ACC')) {
          if (c.name !== 'ACCESSORIES') { c.name = 'ACCESSORIES'; updated = true; }
        } else if (c.id === 'cat_pr' || c.name.includes('จัดซื้อเครื่องมือ') || c.name.includes('อะไหล่')) {
          if (c.name !== 'PR / PURCHASING') { c.name = 'PR / PURCHASING'; updated = true; }
        } else if (c.id === 'cat_imp' || c.name.includes('ปรับปรุง') || c.name.includes('KAIZEN')) {
          if (c.name !== 'IMPROVEMENT / KAIZEN') { c.name = 'IMPROVEMENT / KAIZEN'; updated = true; }
        } else if (c.id === 'cat_prj' || c.name.includes('โปรเจกต์พิเศษ')) {
          if (c.name !== 'SPECIAL PROJECT') { c.name = 'SPECIAL PROJECT'; updated = true; }
        } else if (c.id === 'cat_pvt' || c.name.includes('PRIVATE')) {
          if (c.name !== 'PRIVATE PROJECT') { c.name = 'PRIVATE PROJECT'; updated = true; }
        }
        c.name = uppercaseEnglish(c.name);
      });
      // Ensure PRIVATE PROJECT category exists in saved categories
      if (!categories.some(c => c.id === 'cat_pvt' || c.name.toUpperCase().includes('PRIVATE'))) {
        categories.push({ id: 'cat_pvt', name: 'PRIVATE PROJECT', icon: '🔒', color: '#e11d48' });
        updated = true;
      }
      if (updated) {
        saveCategories();
      }
    } catch (e) {
      categories = [...DEFAULT_CATEGORIES];
    }
  } else {
    categories = [...DEFAULT_CATEGORIES];
    saveCategories();
  }

  const savedAchievements = localStorage.getItem(STORAGE_KEY_ACHIEVEMENTS);
  if (savedAchievements) {
    try {
      achievements = JSON.parse(savedAchievements);
      let migrationNeeded = false;
      achievements.forEach(a => {
        if (a.categoryId === 'cat_sys') a.categoryId = 'cat_prj';
        if (a.title) a.title = uppercaseEnglish(a.title);
        if (a.code) a.code = uppercaseEnglish(a.code);
        if (a.assignee) {
          a.assignee = uppercaseEnglish(a.assignee).trim();
          if (a.assignee === 'NUY') {
            a.assignee = 'JITTRAKAN K.';
            migrationNeeded = true;
          } else if (a.assignee === 'SUTTHIPONG') {
            a.assignee = 'SUTTHIPONG M.';
            migrationNeeded = true;
          } else if (a.assignee === 'TANIN') {
            a.assignee = 'TANIN P.';
            migrationNeeded = true;
          }
        }
        if (a.factory) a.factory = uppercaseEnglish(a.factory);
        if (a.department) a.department = uppercaseEnglish(a.department);
        if (a.process) a.process = uppercaseEnglish(a.process);
        if (a.id === 'achv_pr_1' && typeof a.workFolder === 'string') {
          const sample = INITIAL_SAMPLE_ACHIEVEMENTS.find(s => s.id === 'achv_pr_1');
          if (sample) a.workFolder = sample.workFolder;
        } else if (a.id === 'achv_acc_1' && typeof a.workFolder === 'string') {
          const sample = INITIAL_SAMPLE_ACHIEVEMENTS.find(s => s.id === 'achv_acc_1');
          if (sample) a.workFolder = sample.workFolder;
        }
      });
      if (migrationNeeded) {
        saveAchievements();
      }
    } catch (e) {
      achievements = [...INITIAL_SAMPLE_ACHIEVEMENTS];
    }
  } else {
    achievements = [...INITIAL_SAMPLE_ACHIEVEMENTS];
    saveAchievements();
  }

  // Auto-restore and protect user dataset (restore all 79 tasks if missing or overwritten)
  const isDataRestored = localStorage.getItem('orbray_achievements_restored_v1') === 'true';
  if (!isDataRestored || !achievements || achievements.length < 10) {
    console.info('Restoring full historical achievements dataset (79 items)...');
    const mergedMap = new Map();
    INITIAL_SAMPLE_ACHIEVEMENTS.forEach(item => {
      mergedMap.set(item.id, { ...item });
    });
    if (Array.isArray(achievements)) {
      achievements.forEach(existing => {
        if (existing && existing.title && existing.title.trim().toUpperCase() !== 'TEST') {
          if (existing.categoryId === 'cat_sys') existing.categoryId = 'cat_prj';
          if (existing.assignee && existing.assignee.trim().toUpperCase() === 'NUY') existing.assignee = 'JITTRAKAN K.';
          if (existing.assignee && existing.assignee.trim().toUpperCase() === 'SUTTHIPONG') existing.assignee = 'SUTTHIPONG M.';
          if (existing.assignee && existing.assignee.trim().toUpperCase() === 'TANIN') existing.assignee = 'TANIN P.';
          mergedMap.set(existing.id, { ...(mergedMap.get(existing.id) || {}), ...existing });
        }
      });
    }
    achievements = Array.from(mergedMap.values());
    saveAchievements();
    localStorage.setItem('orbray_achievements_restored_v1', 'true');
  }

  // Restore heavy attachments from IndexedDB if any were stored there
  loadAchievementsFromIndexedDB().then(idbData => {
    if (idbData && Array.isArray(idbData) && idbData.length > 0) {
      let restoredCount = 0;
      achievements.forEach(a => {
        if (a.assignee && a.assignee.trim().toUpperCase() === 'NUY') {
          a.assignee = 'JITTRAKAN K.';
          restoredCount++;
        }
        if (a.assignee && a.assignee.trim().toUpperCase() === 'SUTTHIPONG') {
          a.assignee = 'SUTTHIPONG M.';
          restoredCount++;
        }
        if (a.assignee && a.assignee.trim().toUpperCase() === 'TANIN') {
          a.assignee = 'TANIN P.';
          restoredCount++;
        }
        const fullItem = idbData.find(i => i.id === a.id);
        if (fullItem) {
          if (fullItem.pdfAttachment && fullItem.pdfAttachment.data && (!a.pdfAttachment || !a.pdfAttachment.data)) {
            a.pdfAttachment = fullItem.pdfAttachment;
            restoredCount++;
          }
          if (fullItem.imageData && fullItem.imageData.data && (!a.imageData || !a.imageData.data)) {
            a.imageData = fullItem.imageData;
            restoredCount++;
          }
          if (fullItem.workFolder && hasLocalFolderFileData(fullItem.workFolder)) {
            if (!a.workFolder || !hasLocalFolderFileData(a.workFolder)) {
              a.workFolder = mergeSingleItemAttachments({ workFolder: a.workFolder || fullItem.workFolder }, { workFolder: fullItem.workFolder }).workFolder;
              restoredCount++;
            }
          }
        }
      });
      // If IndexedDB has records not in localStorage
      if (idbData.length > achievements.length) {
        achievements = idbData;
        achievements.forEach(a => {
          if (a.assignee && a.assignee.trim().toUpperCase() === 'NUY') a.assignee = 'JITTRAKAN K.';
          if (a.assignee && a.assignee.trim().toUpperCase() === 'SUTTHIPONG') a.assignee = 'SUTTHIPONG M.';
          if (a.assignee && a.assignee.trim().toUpperCase() === 'TANIN') a.assignee = 'TANIN P.';
        });
        restoredCount++;
      }
      if (restoredCount > 0) {
        saveAchievements();
        renderAll();
      }
    }
  }).catch(err => {
    console.warn('IndexedDB initial restore notice:', err);
  });
}

function saveAchievements() {
  // Always persist full achievements (including unlimited size PDFs & Drawings & Folder attachments) to IndexedDB
  saveAchievementsToIndexedDB(achievements);

  // Safely persist to localStorage with quota-exceeded fallback
  try {
    localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(achievements));
  } catch (err) {
    console.warn('localStorage quota exceeded. Saving lightweight copy to localStorage:', err);
    try {
      // Save lightweight copy without massive data URLs so localStorage never crashes
      const lightweight = achievements.map(item => {
        const copy = { ...item };
        if (copy.pdfAttachment && copy.pdfAttachment.data && copy.pdfAttachment.data.length > 200000) {
          copy.pdfAttachment = { ...copy.pdfAttachment, data: '', isStoredInIDB: true };
        }
        if (copy.imageData && copy.imageData.data && copy.imageData.data.length > 200000) {
          copy.imageData = { ...copy.imageData, data: '', isStoredInIDB: true };
        }
        if (copy.workFolder && typeof copy.workFolder === 'object') {
          const wf = { ...copy.workFolder };
          if (wf.zipData && wf.zipData.length > 200000) {
            wf.zipData = '';
            wf.isStoredInIDB = true;
          }
          if (Array.isArray(wf.files)) {
            wf.files = wf.files.map(f => {
              const { data, ...rest } = f;
              return rest;
            });
            wf.isStoredInIDB = true;
          }
          copy.workFolder = wf;
        }
        return copy;
      });
      localStorage.setItem(STORAGE_KEY_ACHIEVEMENTS, JSON.stringify(lightweight));
    } catch (err2) {
      console.error('Cannot save even lightweight copy to localStorage:', err2);
    }
  }
}

function saveCategories() {
  localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
}

// --- Render Everything ---
function renderAll() {
  populateCategoryDropdowns();
  populateAssigneeDropdown();
  resetAssigneeDropdown();
  renderStats();
  renderCharts();
  renderRequesterRanking();
  renderContent();
}

// =========================================================================
// --- Google Firebase & Multi-Device Cloud Sync Logic ---
// =========================================================================

// ค่า Config เชื่อมต่อ Google Firebase Firestore อัตโนมัติ (ซิงค์ข้อมูลตรงกันทุกเครื่อง/มือถือ)
const DEFAULT_FIREBASE_CONFIG = {
  apiKey: "AIzaSyCLXBib5EB3pVIJiLmob13KJt7eA-L1RRc",
  authDomain: "orbray-techno-achievements.firebaseapp.com",
  projectId: "orbray-techno-achievements",
  storageBucket: "orbray-techno-achievements.firebasestorage.app",
  messagingSenderId: "764417521508",
  appId: "1:764417521508:web:09458f145539af383fec71",
  measurementId: "G-04KRCD9431"
};

function parseFirebaseConfig(raw) {
  if (!raw || typeof raw !== 'string') return null;
  let text = raw.trim();

  // Try direct JSON.parse first
  try {
    const res = JSON.parse(text);
    if (res && typeof res === 'object' && (res.projectId || res.apiKey)) return res;
  } catch (e) {}

  // Find opening { and closing }
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    const objText = text.substring(firstBrace, lastBrace + 1);
    try {
      const res = JSON.parse(objText);
      if (res && typeof res === 'object' && (res.projectId || res.apiKey)) return res;
    } catch (e) {}

    try {
      // Evaluate safe JS object literal (handles unquoted keys, trailing commas, single quotes)
      const parsed = new Function('return (' + objText + ')')();
      if (parsed && typeof parsed === 'object' && (parsed.projectId || parsed.apiKey)) {
        return parsed;
      }
    } catch (e) {
      console.warn('Config evaluation error:', e);
    }
  }
  return null;
}

function updateCloudStatusUI(status, errorMsg = '') {
  const dot = document.getElementById('cloudStatusDot');
  const text = document.getElementById('cloudStatusText');
  const box = document.getElementById('cloudStatusBox');
  const icon = document.getElementById('cloudStatusIconLarge');
  const heading = document.getElementById('cloudStatusHeading');
  const desc = document.getElementById('cloudStatusDesc');
  const btnSync = document.getElementById('btnSyncLocalToCloud');
  const btnDisconnect = document.getElementById('btnDisconnectFirebase');

  if (dot) {
    dot.className = 'cloud-status-dot';
  }

  if (status === 'connected') {
    if (dot) dot.classList.add('connected');
    if (text) text.textContent = 'CLOUD: ONLINE';
    if (box) {
      box.style.background = '#f0fdf4';
      box.style.borderColor = '#86efac';
    }
    if (icon) icon.textContent = '🟢';
    if (heading) {
      heading.textContent = 'เชื่อมต่อคลาวด์แล้ว (ONLINE & SYNCING)';
      heading.style.color = '#15803d';
    }
    if (desc) desc.textContent = 'ข้อมูลเชื่อมต่อกับ Google Firebase Firestore เรียบร้อย ซิงค์แบบ Real-time ข้ามอุปกรณ์ทุกเครื่อง';
    if (btnSync) {
      btnSync.style.display = 'inline-flex';
      btnSync.disabled = false;
    }
    if (btnDisconnect) btnDisconnect.style.display = 'inline-block';
  } else if (status === 'connecting') {
    if (dot) dot.classList.add('syncing');
    if (text) text.textContent = 'CLOUD: SYNCING...';
    if (box) {
      box.style.background = '#f8fafc';
      box.style.borderColor = '#cbd5e1';
    }
    if (icon) icon.textContent = '🔄';
    if (heading) {
      heading.textContent = 'กำลังเชื่อมต่อคลาวด์...';
      heading.style.color = '#0284c7';
    }
    if (desc) desc.textContent = 'กำลังเชื่อมโยงกับฐานข้อมูล Google Firebase Firestore...';
    if (btnSync) btnSync.style.display = 'none';
    if (btnDisconnect) btnDisconnect.style.display = 'inline-block';
  } else if (status === 'error') {
    if (dot) dot.classList.add('error');
    if (text) text.textContent = 'CLOUD: ERROR';
    if (box) {
      box.style.background = '#fef2f2';
      box.style.borderColor = '#fca5a5';
    }
    if (icon) icon.textContent = '🔴';
    if (heading) {
      heading.textContent = 'เกิดข้อผิดพลาดในการเชื่อมต่อคลาวด์ (ERROR)';
      heading.style.color = '#b91c1c';
    }
    if (desc) desc.textContent = errorMsg ? `ข้อผิดพลาด: ${errorMsg}` : 'กรุณาตรวจสอบการตั้งค่า Firebase Config หรือ Security Rules ใน Firestore';
    if (btnSync) btnSync.style.display = 'none';
    if (btnDisconnect) btnDisconnect.style.display = 'inline-block';
  } else {
    // disconnected / local mode
    if (text) text.textContent = 'CLOUD: LOCAL';
    if (box) {
      box.style.background = '#f8fafc';
      box.style.borderColor = '#e2e8f0';
    }
    if (icon) icon.textContent = '💻';
    if (heading) {
      heading.textContent = 'โหมดในเครื่อง (LOCAL OFFLINE)';
      heading.style.color = '#475569';
    }
    if (desc) desc.textContent = 'ขณะนี้บันทึกข้อมูลในบราวเซอร์เครื่องนี้เท่านั้น (ยังไม่ได้เชื่อมต่อ Firebase)';
    if (btnSync) btnSync.style.display = 'none';
    if (btnDisconnect) btnDisconnect.style.display = 'none';
  }
}

async function initFirebase(config, showToasts = false) {
  if (!config || (!config.projectId && !config.apiKey)) {
    updateCloudStatusUI('disconnected');
    return false;
  }

  if (typeof firebase === 'undefined') {
    console.warn('Firebase SDK is not loaded. Working in local mode.');
    updateCloudStatusUI('error', 'Firebase SDK โหลดไม่สำเร็จ (กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ต)');
    return false;
  }

  try {
    if (firestoreUnsubscribe) {
      firestoreUnsubscribe();
      firestoreUnsubscribe = null;
    }

    let app;
    if (firebase.apps && firebase.apps.length > 0) {
      app = firebase.apps[0];
    } else {
      app = firebase.initializeApp(config);
    }

    firebaseDb = firebase.firestore();

    // Enable multi-tab persistence
    try {
      await firebaseDb.enablePersistence({ synchronizeTabs: true });
    } catch (persistErr) {
      if (persistErr.code === 'failed-precondition') {
        console.warn('Firestore persistence warning (multiple tabs open):', persistErr);
      } else {
        console.warn('Firestore persistence unsupported:', persistErr);
      }
    }

    updateCloudStatusUI('connecting');

    // Subscribe to achievements collection in real-time
    const colRef = firebaseDb.collection('achievements');
    firestoreUnsubscribe = colRef.onSnapshot((snapshot) => {
      const isInitial = !hasInitialCloudSnapshot;
      hasInitialCloudSnapshot = true;
      isFirebaseConnected = true;
      updateCloudStatusUI('connected');

      // If cloud is empty and we have local achievements, keep local records
      if (snapshot.empty) {
        console.info('Cloud achievements collection is currently empty.');
        if (isInitial) {
          setTimeout(() => {
            autoSyncLocalAttachmentsToCloud(firebaseDb);
          }, 1500);
        }
        return;
      }

      const cloudItems = [];
      snapshot.forEach(doc => {
        let data = doc.data();
        data.id = data.id || doc.id;

        // Merge cached local heavy attachments if missing from cloud
        const cachedItem = achievements.find(a => a.id === data.id);
        if (cachedItem) {
          data = mergeSingleItemAttachments(data, cachedItem);
        }

        cloudItems.push(data);
      });

      // Sort achievements: newest first
      cloudItems.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (a.requestDate ? new Date(a.requestDate).getTime() : 0);
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (b.requestDate ? new Date(b.requestDate).getTime() : 0);
        return timeB - timeA;
      });

      // Helper to re-hydrate in-memory achievements from IndexedDB if onSnapshot arrived before IDB finished loading
      const rehydrateFromIDBIfNeeded = () => {
        loadAchievementsFromIndexedDB().then(idbData => {
          if (idbData && Array.isArray(idbData) && idbData.length > 0) {
            achievements = mergePreservingLocalAttachments(achievements, idbData);
          }
        }).catch(() => {});
      };

      // When cloud has rich dataset (>= 5 items), keep all devices in 100% real-time sync
      if (cloudItems.length >= 5) {
        // Sync any offline-created drafts that have not yet been sent to cloud
        const pendingItems = achievements.filter(a => a && a._pendingSync === true);
        if (pendingItems.length > 0) {
          pendingItems.forEach(p => {
            delete p._pendingSync;
            saveAchievementToCloud(p);
            cloudItems.unshift(p);
          });
        }

        achievements = mergePreservingLocalAttachments(cloudItems, achievements);
        saveAchievements();
        rehydrateFromIDBIfNeeded();
        renderAll();
        if (!isInitial) {
          showToast('☁️ ซิงค์ข้อมูลล่าสุดจากคลาวด์แล้ว');
        } else {
          setTimeout(() => {
            autoSyncLocalAttachmentsToCloud(firebaseDb);
          }, 1500);
        }
        return;
      }

      // Fallback merge by ID for initial or partial data
      const mergedMap = new Map();
      achievements.forEach(a => mergedMap.set(a.id, a));
      cloudItems.forEach(c => {
        if (c.title && c.title.trim().toUpperCase() !== 'TEST') {
          const existing = mergedMap.get(c.id);
          mergedMap.set(c.id, existing ? mergeSingleItemAttachments({ ...existing, ...c }, existing) : c);
        }
      });
      achievements = Array.from(mergedMap.values());
      saveAchievements();
      rehydrateFromIDBIfNeeded();
      renderAll();
      if (!isInitial) {
        showToast('☁️ ซิงค์ข้อมูลล่าสุดจากคลาวด์แล้ว');
      } else {
        setTimeout(() => {
          autoSyncLocalAttachmentsToCloud(firebaseDb);
        }, 1500);
      }
    }, (error) => {
      console.error('Firestore listener error:', error);
      isFirebaseConnected = false;
      let userFriendlyMsg = error.message;
      if (error.code === 'permission-denied') {
        userFriendlyMsg = 'ติดสิทธิ์การเข้าถึง (Permission Denied) - กรุณาอัปเดต Firestore Rules ใน Firebase Console เป็น allow read, write: if true;';
      }
      updateCloudStatusUI('error', userFriendlyMsg);
      if (showToasts) {
        alert('เกิดข้อผิดพลาดจาก Firestore: ' + userFriendlyMsg);
      }
    });

    // Real-time subscribe to team accounts & pins settings
    try {
      firebaseDb.collection('settings').doc('team_accounts').onSnapshot(docSnap => {
        if (docSnap && docSnap.exists) {
          const data = docSnap.data();
          let changed = false;
          if (data.customAccounts) {
            localStorage.setItem(STORAGE_KEY_CUSTOM_ACCOUNTS, JSON.stringify(data.customAccounts));
            changed = true;
          }
          if (data.customPins) {
            localStorage.setItem(STORAGE_KEY_TEAM_PINS, JSON.stringify(data.customPins));
            changed = true;
          }
          if (data.deletedAccountIds) {
            localStorage.setItem(STORAGE_KEY_DELETED_ACCOUNTS, JSON.stringify(data.deletedAccountIds));
            changed = true;
          }
          if (changed) {
            initAuthSession();
            resetAssigneeDropdown();
            populateAssigneeDropdown();
            const modal = document.getElementById('adminTeamPinsModal');
            if (modal && modal.classList.contains('active')) {
              renderAdminTeamPinsModal();
            }
          }
        }
      }, err => {
        console.warn('Team accounts settings listener notice:', err);
      });
    } catch (settErr) {
      console.warn('Could not subscribe to settings/team_accounts:', settErr);
    }

    if (showToasts) {
      showToast('เชื่อมต่อ Google Firebase สำเร็จ! ☁️');
    }
    return true;
  } catch (err) {
    console.error('Firebase init failed:', err);
    isFirebaseConnected = false;
    updateCloudStatusUI('error', err.message);
    if (showToasts) {
      alert('ไม่สามารถเชื่อมต่อ Firebase ได้: ' + err.message);
    }
    return false;
  }
}

function cleanFirestoreObject(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) {
    return obj.map(item => cleanFirestoreObject(item));
  }
  const clean = {};
  for (const [key, value] of Object.entries(obj)) {
    if (value !== undefined) {
      clean[key] = cleanFirestoreObject(value);
    }
  }
  return clean;
}

async function saveAchievementToCloud(item) {
  if (!firebaseDb || !item || !item.id) return;
  try {
    const docRef = firebaseDb.collection('achievements').doc(item.id);
    const itemToSave = cleanFirestoreObject({ ...item });
    delete itemToSave._pendingSync;

    let pendingFolderFilesToUpload = null;

    // Handle PDF Attachment upload to subcollection & guard 1MB Firestore limit
    if (itemToSave.pdfAttachment && typeof itemToSave.pdfAttachment === 'object') {
      const pdf = { ...itemToSave.pdfAttachment };
      if (pdf.data) {
        pdf.hasCloudPdf = true;
        uploadPdfFileToFirestore(firebaseDb, item.id, { ...pdf });
      } else if (item.pdfAttachment && item.pdfAttachment.hasCloudPdf) {
        pdf.hasCloudPdf = true;
      }
      if (pdf.data && pdf.data.length > 300000) {
        pdf.data = '';
      }
      itemToSave.pdfAttachment = pdf;
    }

    // Handle Image Data upload to subcollection & guard 1MB Firestore limit
    if (itemToSave.imageData && typeof itemToSave.imageData === 'object') {
      const img = { ...itemToSave.imageData };
      if (img.data) {
        img.hasCloudImage = true;
        uploadImageFileToFirestore(firebaseDb, item.id, { ...img });
      } else if (item.imageData && item.imageData.hasCloudImage) {
        img.hasCloudImage = true;
      }
      if (img.data && img.data.length > 300000) {
        img.data = '';
      }
      itemToSave.imageData = img;
    } else if (itemToSave.imageData && typeof itemToSave.imageData === 'string') {
      if (itemToSave.imageData.length > 300000) {
        uploadImageFileToFirestore(firebaseDb, item.id, itemToSave.imageData);
        itemToSave.imageData = {
          name: 'IMAGE',
          type: 'image/png',
          data: '',
          hasCloudImage: true
        };
      }
    }

    // Handle Work Folder upload to subcollection
    if (itemToSave.workFolder && typeof itemToSave.workFolder === 'object') {
      const wf = { ...itemToSave.workFolder };
      let hasData = false;
      if (Array.isArray(wf.files)) {
        hasData = wf.files.some(f => !!f.data);
      }

      if (hasData) {
        wf.hasCloudFiles = true;
        pendingFolderFilesToUpload = wf.files.map(f => ({ ...f }));
      } else if (item.workFolder && item.workFolder.hasCloudFiles) {
        wf.hasCloudFiles = true;
      }

      // In main doc, sanitize files to avoid hitting Firestore 1MB document limit
      if (Array.isArray(wf.files)) {
        wf.files = wf.files.map(f => {
          const { data, ...rest } = f;
          return rest;
        });
      }
      wf.zipData = '';
      itemToSave.workFolder = wf;
    }

    await docRef.set(itemToSave, { merge: true });
    if (pendingFolderFilesToUpload) {
      const uploadedOk = await uploadFolderFilesToFirestore(firebaseDb, item.id, pendingFolderFilesToUpload);
      if (uploadedOk) {
        showToast('☁️ อัปโหลดไฟล์ในโฟลเดอร์ขึ้นคลาวด์ครบถ้วนแล้ว!');
      }
    }
    console.log('Synced to cloud successfully:', item.id);
  } catch (err) {
    console.error('Failed to sync achievement to cloud:', err);
    item._pendingSync = true;
    saveAchievements();
    showToast('บันทึกในเครื่องแล้ว (คลาวด์: ' + (err.message || 'Sync failed') + ')');
  }
}

async function deleteAchievementFromCloud(id) {
  if (!firebaseDb || !id) return;
  try {
    const achvDocRef = firebaseDb.collection('achievements').doc(id);
    const subcollections = ['folderFiles', 'pdfFiles', 'imageFiles'];
    for (const subName of subcollections) {
      try {
        const subDocs = await achvDocRef.collection(subName).get();
        if (!subDocs.empty) {
          const batch = firebaseDb.batch();
          subDocs.forEach(d => batch.delete(d.ref));
          await batch.commit();
        }
      } catch (subErr) {
        console.warn(`Notice cleaning ${subName} on delete:`, subErr);
      }
    }
    await achvDocRef.delete();
    console.log('Deleted from cloud successfully:', id);
  } catch (err) {
    console.error('Failed to delete achievement from cloud:', err);
  }
}

async function migrateLocalDataToFirebase() {
  if (!isFirebaseConnected || !firebaseDb) {
    alert('กรุณาเชื่อมต่อ Firebase ให้สำเร็จก่อนทำการซิงค์ข้อมูล (สถานะต้องเป็น ONLINE สีเขียว)');
    return;
  }
  if (!achievements || achievements.length === 0) {
    alert('ไม่มีข้อมูลงานในเครื่องที่จะซิงค์');
    return;
  }

  if (!confirm(`คุณต้องการอัปโหลดข้อมูลงานทั้งหมด (${achievements.length} งาน) ขึ้น Google Firebase Firestore ใช่หรือไม่?`)) {
    return;
  }

  const btnSync = document.getElementById('btnSyncLocalToCloud');
  const originalText = btnSync ? btnSync.innerHTML : '';
  if (btnSync) {
    btnSync.disabled = true;
    btnSync.innerHTML = '🔄 กำลังซิงค์...';
  }

  try {
    const colRef = firebaseDb.collection('achievements');
    const chunkSize = 400;
    for (let i = 0; i < achievements.length; i += chunkSize) {
      const chunk = achievements.slice(i, i + chunkSize);
      const batch = firebaseDb.batch();
      chunk.forEach(item => {
        const docRef = colRef.doc(item.id);
        const itemToSave = cleanFirestoreObject({ ...item });
        if (itemToSave.pdfAttachment && typeof itemToSave.pdfAttachment === 'object') {
          if (itemToSave.pdfAttachment.data) {
            itemToSave.pdfAttachment.hasCloudPdf = true;
          }
          if (itemToSave.pdfAttachment.data && itemToSave.pdfAttachment.data.length > 300000) {
            itemToSave.pdfAttachment.data = '';
          }
        }
        if (itemToSave.imageData && typeof itemToSave.imageData === 'object') {
          if (itemToSave.imageData.data) {
            itemToSave.imageData.hasCloudImage = true;
          }
          if (itemToSave.imageData.data && itemToSave.imageData.data.length > 300000) {
            itemToSave.imageData.data = '';
          }
        } else if (itemToSave.imageData && typeof itemToSave.imageData === 'string' && itemToSave.imageData.length > 300000) {
          itemToSave.imageData = {
            name: 'IMAGE',
            type: 'image/png',
            data: '',
            hasCloudImage: true
          };
        }
        if (itemToSave.workFolder && typeof itemToSave.workFolder === 'object') {
          const wf = { ...itemToSave.workFolder };
          if (Array.isArray(wf.files) && wf.files.some(f => !!f.data)) {
            wf.hasCloudFiles = true;
          }
          if (Array.isArray(wf.files)) {
            wf.files = wf.files.map(f => {
              const { data, ...rest } = f;
              return rest;
            });
          }
          wf.zipData = '';
          itemToSave.workFolder = wf;
        }
        batch.set(docRef, itemToSave, { merge: true });
      });
      await batch.commit();
    }

    showToast(`ซิงค์ข้อมูล ${achievements.length} รายการขึ้นคลาวด์สำเร็จ! 🎉`);
    
    // Check if user also wants to sync heavy attachments
    const hasAttachments = achievements.some(a => (a.pdfAttachment && a.pdfAttachment.data) || (a.workFolder && Array.isArray(a.workFolder.files) && a.workFolder.files.some(f => !!f.data)));
    if (hasAttachments) {
      if (confirm(`ซิงค์ข้อมูลงาน ${achievements.length} รายการขึ้น Google Firebase Firestore สำเร็จเรียบร้อยแล้ว!\n\nตรวจพบว่ามีไฟล์แนบ (PDF / โฟลเดอร์) ในเครื่องนี้\nต้องการเริ่มอัปโหลดไฟล์แนบทั้งหมดขึ้นคลาวด์ต่อทันทีเลยหรือไม่?\n(เพื่อให้คอมพิวเตอร์เครื่องอื่นและมือถือเปิดไฟล์แนบได้ทุกไฟล์)`)) {
        syncAllAttachmentsToCloud();
        return;
      }
    } else {
      alert(`ซิงค์ข้อมูล ${achievements.length} รายการขึ้น Google Firebase Firestore สำเร็จเรียบร้อยแล้ว!\nอุปกรณ์เครื่องอื่นจะเห็นข้อมูลนี้ทันที`);
    }
  } catch (err) {
    console.error('Migration to Firebase failed:', err);
    alert('เกิดข้อผิดพลาดในการซิงค์ข้อมูล: ' + err.message);
  } finally {
    if (btnSync) {
      btnSync.disabled = false;
      btnSync.innerHTML = originalText;
    }
  }
}

let isAutoSyncingInProgress = false;

async function autoSyncLocalAttachmentsToCloud(db) {
  if (!db || !isFirebaseConnected || isAutoSyncingInProgress) return;
  if (sessionStorage.getItem('orbray_auto_sync_attachments_done')) return;

  try {
    isAutoSyncingInProgress = true;

    // 1. Prefer IndexedDB data which holds original heavy attachments
    let itemsToScan = achievements;
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData && idbData.length > 0) {
        itemsToScan = idbData;
      }
    } catch (idbErr) {
      console.warn('Auto-sync using in-memory achievements:', idbErr);
    }

    // Filter items with actual file data attached
    const itemsToUpload = itemsToScan.filter(item => {
      const hasPdfData = item.pdfAttachment && item.pdfAttachment.data;
      const hasImageData = item.imageData && (typeof item.imageData === 'string' || (item.imageData && item.imageData.data));
      const hasFolderData = item.workFolder && Array.isArray(item.workFolder.files) && item.workFolder.files.some(f => !!f.data);
      return hasPdfData || hasImageData || hasFolderData;
    });

    if (itemsToUpload.length === 0) {
      sessionStorage.setItem('orbray_auto_sync_attachments_done', 'true');
      return;
    }

    console.info(`[Auto-Sync] Found ${itemsToUpload.length} tasks with local files. Starting automatic background cloud sync...`);

    let uploadedCount = 0;
    for (const item of itemsToUpload) {
      try {
        let hasUpdatedMeta = false;
        const mainDocRef = db.collection('achievements').doc(item.id);

        // 1. Upload PDF Attachment
        if (item.pdfAttachment && item.pdfAttachment.data) {
          await uploadPdfFileToFirestore(db, item.id, item.pdfAttachment);
          item.pdfAttachment.hasCloudPdf = true;
          hasUpdatedMeta = true;
        }

        // 2. Upload Image / Drawing
        if (item.imageData) {
          const imgData = typeof item.imageData === 'object' ? item.imageData.data : item.imageData;
          if (imgData) {
            await uploadImageFileToFirestore(db, item.id, item.imageData);
            if (typeof item.imageData === 'object') item.imageData.hasCloudImage = true;
            hasUpdatedMeta = true;
          }
        }

        // 3. Upload Work Folder files
        if (item.workFolder && Array.isArray(item.workFolder.files)) {
          const filesWithData = item.workFolder.files.filter(f => !!f.data);
          if (filesWithData.length > 0) {
            await uploadFolderFilesToFirestore(db, item.id, item.workFolder.files);
            item.workFolder.hasCloudFiles = true;
            hasUpdatedMeta = true;
          }
        }

        // 4. Update cloud document flags so other machines know cloud files exist
        if (hasUpdatedMeta) {
          const updateObj = {};
          if (item.pdfAttachment) {
            updateObj['pdfAttachment.hasCloudPdf'] = true;
            if (item.pdfAttachment.name) updateObj['pdfAttachment.name'] = item.pdfAttachment.name;
            if (item.pdfAttachment.size) updateObj['pdfAttachment.size'] = item.pdfAttachment.size;
            if (item.pdfAttachment.type) updateObj['pdfAttachment.type'] = item.pdfAttachment.type;
          }
          if (item.workFolder) {
            updateObj['workFolder.hasCloudFiles'] = true;
            if (item.workFolder.name) updateObj['workFolder.name'] = item.workFolder.name;
            if (item.workFolder.fileCount) updateObj['workFolder.fileCount'] = item.workFolder.fileCount;
            if (item.workFolder.totalSize) updateObj['workFolder.totalSize'] = item.workFolder.totalSize;
          }
          if (item.imageData && typeof item.imageData === 'object') {
            updateObj['imageData.hasCloudImage'] = true;
          }
          await mainDocRef.set(updateObj, { merge: true });
        }

        // Update in-memory copy
        const memItem = achievements.find(a => a.id === item.id);
        if (memItem) {
          if (item.pdfAttachment) memItem.pdfAttachment = item.pdfAttachment;
          if (item.imageData) memItem.imageData = item.imageData;
          if (item.workFolder) memItem.workFolder = item.workFolder;
        }

        uploadedCount++;
      } catch (err) {
        console.warn(`[Auto-Sync] Upload error for item ${item.id}:`, err);
      }
    }

    // Persist updated metadata in local IndexedDB
    saveAchievementsToIndexedDB(achievements);
    sessionStorage.setItem('orbray_auto_sync_attachments_done', 'true');
    console.info(`[Auto-Sync] Finished syncing ${uploadedCount} tasks.`);
    if (uploadedCount > 0) {
      showToast(`☁️ ซิงค์ไฟล์แนบ ${uploadedCount} งานขึ้นคลาวด์อัตโนมัติเรียบร้อยแล้ว`);
    }
  } catch (err) {
    console.error('[Auto-Sync] Failed auto-sync attachments to cloud:', err);
  } finally {
    isAutoSyncingInProgress = false;
  }
}

async function syncAllAttachmentsToCloud() {
  if (!isFirebaseConnected || !firebaseDb) {
    alert('กรุณาเชื่อมต่อ Firebase ให้สำเร็จก่อนทำการซิงค์ (สถานะต้องเป็น ONLINE สีเขียว)');
    return;
  }

  const btn = document.getElementById('btnSyncAllAttachments');
  const originalText = btn ? btn.innerHTML : '';
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = '🔄 กำลังค้นหาไฟล์แนบในเครื่อง...';
  }

  try {
    // 1. Prefer IndexedDB data which holds original heavy attachments
    let itemsToScan = achievements;
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData && idbData.length > 0) {
        itemsToScan = idbData;
      }
    } catch (idbErr) {
      console.warn('Using in-memory achievements for attachment scan:', idbErr);
    }

    // Filter items with actual file data attached
    const itemsWithAttachments = itemsToScan.filter(item => {
      const hasPdf = item.pdfAttachment && item.pdfAttachment.data;
      const hasImg = item.imageData && (typeof item.imageData === 'string' || (item.imageData && item.imageData.data));
      const hasFolder = item.workFolder && Array.isArray(item.workFolder.files) && item.workFolder.files.some(f => !!f.data);
      return hasPdf || hasImg || hasFolder;
    });

    if (itemsWithAttachments.length === 0) {
      alert('ไม่พบไฟล์แนบตัวจริง (PDF / โฟลเดอร์ / รูป) ในเบราว์เซอร์เครื่องนี้ที่ยังไม่ได้ขึ้นคลาวด์\n\n(หากแนบไฟล์จากคอมพิวเตอร์เครื่องอื่น กรุณาเปิดเว็บนี้บนเครื่องนั้นแล้วกดปุ่มซิงค์ครับ)');
      return;
    }

    if (!confirm(`ตรวจพบงานที่มีไฟล์แนบตัวจริงในเครื่องนี้ทั้งหมด ${itemsWithAttachments.length} งาน\n\nต้องการเริ่มอัปโหลดไฟล์แนบทั้งหมดขึ้น Google Firebase Firestore ใช่หรือไม่?\n(เมื่ออัปโหลดเสร็จ คอมพิวเตอร์หรือมือถือทุกเครื่องจะสามารถเปิดดูและดาวน์โหลดไฟล์ PDF / โฟลเดอร์ ได้ทันที)`)) {
      return;
    }

    let successCount = 0;
    let failCount = 0;

    for (let i = 0; i < itemsWithAttachments.length; i++) {
      const item = itemsWithAttachments[i];
      const title = item.code || item.title || `TASK #${i + 1}`;
      if (btn) {
        btn.innerHTML = `🔄 กำลังอัปโหลด (${i + 1}/${itemsWithAttachments.length})...`;
      }
      showToast(`☁️ [${i + 1}/${itemsWithAttachments.length}] กำลังส่งไฟล์: "${title}"`);

      try {
        let hasUpdatedMeta = false;
        const mainDocRef = firebaseDb.collection('achievements').doc(item.id);

        // 1. Upload PDF Attachment
        if (item.pdfAttachment && item.pdfAttachment.data) {
          await uploadPdfFileToFirestore(firebaseDb, item.id, item.pdfAttachment);
          item.pdfAttachment.hasCloudPdf = true;
          hasUpdatedMeta = true;
        }

        // 2. Upload Image / Drawing
        if (item.imageData) {
          const imgData = typeof item.imageData === 'object' ? item.imageData.data : item.imageData;
          if (imgData) {
            await uploadImageFileToFirestore(firebaseDb, item.id, item.imageData);
            if (typeof item.imageData === 'object') item.imageData.hasCloudImage = true;
            hasUpdatedMeta = true;
          }
        }

        // 3. Upload Work Folder files
        if (item.workFolder && Array.isArray(item.workFolder.files)) {
          const filesWithData = item.workFolder.files.filter(f => !!f.data);
          if (filesWithData.length > 0) {
            await uploadFolderFilesToFirestore(firebaseDb, item.id, item.workFolder.files);
            item.workFolder.hasCloudFiles = true;
            hasUpdatedMeta = true;
          }
        }

        // 4. Update cloud document flags so other machines know cloud files exist
        if (hasUpdatedMeta) {
          const updateObj = {};
          if (item.pdfAttachment) {
            updateObj['pdfAttachment.hasCloudPdf'] = true;
            if (item.pdfAttachment.name) updateObj['pdfAttachment.name'] = item.pdfAttachment.name;
            if (item.pdfAttachment.size) updateObj['pdfAttachment.size'] = item.pdfAttachment.size;
            if (item.pdfAttachment.type) updateObj['pdfAttachment.type'] = item.pdfAttachment.type;
          }
          if (item.workFolder) {
            updateObj['workFolder.hasCloudFiles'] = true;
            if (item.workFolder.name) updateObj['workFolder.name'] = item.workFolder.name;
            if (item.workFolder.fileCount) updateObj['workFolder.fileCount'] = item.workFolder.fileCount;
            if (item.workFolder.totalSize) updateObj['workFolder.totalSize'] = item.workFolder.totalSize;
          }
          if (item.imageData && typeof item.imageData === 'object') {
            updateObj['imageData.hasCloudImage'] = true;
          }
          await mainDocRef.set(updateObj, { merge: true });
        }

        // Update in-memory copy
        const memItem = achievements.find(a => a.id === item.id);
        if (memItem) {
          if (item.pdfAttachment) memItem.pdfAttachment = item.pdfAttachment;
          if (item.imageData) memItem.imageData = item.imageData;
          if (item.workFolder) memItem.workFolder = item.workFolder;
        }

        successCount++;
      } catch (err) {
        console.error(`Upload error for item ${item.id}:`, err);
        failCount++;
      }
    }

    // Persist updated metadata in local IndexedDB
    saveAchievementsToIndexedDB(achievements);
    renderAll();

    showToast(`✅ ซิงค์ไฟล์แนบทั้งหมดสำเร็จ ${successCount} รายการ! 🎉`);
    alert(`🎉 ซิงค์ไฟล์แนบขึ้น Google Firebase Firestore สำเร็จเรียบร้อยแล้ว!\n\n- สำเร็จ: ${successCount} งาน\n- ข้อผิดพลาด: ${failCount} งาน\n\nตอนนี้คุณสามารถเปิดเว็บไซต์นี้จากคอมพิวเตอร์หรือมือถือเครื่องอื่น แล้วกดเปิดดูและดาวน์โหลดไฟล์ PDF / โฟลเดอร์ ได้ทุกไฟล์แล้วครับ!`);
  } catch (err) {
    console.error('syncAllAttachmentsToCloud failed:', err);
    alert('เกิดข้อผิดพลาดในการซิงค์ไฟล์แนบ: ' + err.message);
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

function openCloudModal() {
  const modal = document.getElementById('cloudModal');
  if (modal) modal.classList.add('active');
  const savedConfig = localStorage.getItem(STORAGE_KEY_FIREBASE_CONFIG);
  const input = document.getElementById('firebaseConfigInput');
  if (input) {
    if (savedConfig) {
      input.value = savedConfig;
    } else if (DEFAULT_FIREBASE_CONFIG && DEFAULT_FIREBASE_CONFIG.projectId) {
      input.value = JSON.stringify(DEFAULT_FIREBASE_CONFIG, null, 2);
    }
  }
  if (isFirebaseConnected) {
    updateCloudStatusUI('connected');
  } else if (savedConfig || (DEFAULT_FIREBASE_CONFIG && DEFAULT_FIREBASE_CONFIG.projectId)) {
    updateCloudStatusUI('connecting');
  } else {
    updateCloudStatusUI('disconnected');
  }
}

function closeCloudModal() {
  const modal = document.getElementById('cloudModal');
  if (modal) modal.classList.remove('active');
}

async function handleSaveFirebaseConfig() {
  const input = document.getElementById('firebaseConfigInput');
  if (!input) return;
  const raw = input.value.trim();
  if (!raw) {
    alert('กรุณาวางโค้ด firebaseConfig ที่ได้จาก Firebase Console');
    return;
  }

  const config = parseFirebaseConfig(raw);
  if (!config || (!config.projectId && !config.apiKey)) {
    alert('รูปแบบ firebaseConfig ไม่ถูกต้อง กรุณาคัดลอกมาให้ครบทั้งก้อน { ... }');
    return;
  }

  localStorage.setItem(STORAGE_KEY_FIREBASE_CONFIG, raw);
  const success = await initFirebase(config, true);
  if (success) {
    closeCloudModal();
  }
}

function handleDisconnectFirebase() {
  if (confirm('คุณต้องการยกเลิกการเชื่อมต่อ Firebase และกลับไปใช้โหมดในเครื่อง (LOCAL MODE) ใช่หรือไม่?')) {
    if (firestoreUnsubscribe) {
      firestoreUnsubscribe();
      firestoreUnsubscribe = null;
    }
    localStorage.removeItem(STORAGE_KEY_FIREBASE_CONFIG);
    isFirebaseConnected = false;
    firebaseDb = null;
    const input = document.getElementById('firebaseConfigInput');
    if (input) input.value = '';
    updateCloudStatusUI('disconnected');
    showToast('เปลี่ยนกลับเป็น Local Mode เรียบร้อย');
    closeCloudModal();
  }
}

function initFirebaseFromStorage() {
  const savedConfig = localStorage.getItem(STORAGE_KEY_FIREBASE_CONFIG);
  if (savedConfig) {
    const config = parseFirebaseConfig(savedConfig);
    if (config) {
      initFirebase(config, false);
      return;
    }
  }
  if (DEFAULT_FIREBASE_CONFIG && (DEFAULT_FIREBASE_CONFIG.projectId || DEFAULT_FIREBASE_CONFIG.apiKey)) {
    initFirebase(DEFAULT_FIREBASE_CONFIG, false);
    return;
  }
  updateCloudStatusUI('disconnected');
}

// --- PIN Authentication & Team Account Management ---
function getDeletedAccountIds() {
  const raw = localStorage.getItem(STORAGE_KEY_DELETED_ACCOUNTS);
  if (!raw) return [];
  try {
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

function saveDeletedAccountIds(ids) {
  const clean = Array.from(new Set(ids || []));
  localStorage.setItem(STORAGE_KEY_DELETED_ACCOUNTS, JSON.stringify(clean));
}

function getTeamAccounts() {
  const customPinsRaw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
  let customPins = {};
  if (customPinsRaw) {
    try {
      customPins = JSON.parse(customPinsRaw) || {};
    } catch (e) {
      console.warn('Error reading custom pins:', e);
    }
  }

  const customAccountsRaw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
  let customAccounts = {};
  if (customAccountsRaw) {
    try {
      customAccounts = JSON.parse(customAccountsRaw) || {};
    } catch (e) {
      console.warn('Error reading custom accounts:', e);
    }
  }

  const deletedIds = getDeletedAccountIds();

  // 1. Filter out deleted accounts from default list
  const accounts = DEFAULT_TEAM_ACCOUNTS
    .filter(acc => !deletedIds.includes(acc.id))
    .map(acc => {
      const custom = customAccounts[acc.id] || {};
      const pin = custom.pin || customPins[acc.id] || acc.pin;
      const name = custom.name || acc.name;
      const empId = custom.empId || acc.empId || acc.id.replace('usr_', '');
      const company = custom.company || acc.company || 'ORBRAY';
      const department = custom.department || acc.department || 'PRODUCTION TECHNOLOGY';
      const role = custom.role || acc.role || 'MEMBER';
      const avatar = custom.avatar || acc.avatar || '👤';
      return {
        ...acc,
        name,
        pin,
        empId,
        company,
        department,
        role,
        avatar
      };
    });

  // 2. Include custom newly added accounts (if not deleted)
  Object.keys(customAccounts).forEach(accId => {
    if (!DEFAULT_TEAM_ACCOUNTS.some(a => a.id === accId) && !deletedIds.includes(accId)) {
      const c = customAccounts[accId];
      if (c && c.name && !c.deleted) {
        accounts.push({
          id: accId,
          name: c.name,
          pin: c.pin || customPins[accId] || '',
          empId: c.empId || accId.replace('usr_', ''),
          company: c.company || 'ORBRAY',
          department: c.department || 'PRODUCTION TECHNOLOGY',
          role: c.role || 'MEMBER',
          avatar: c.avatar || '👤',
          isCustomAdded: true
        });
      }
    }
  });

  return accounts;
}

function getAllTeamAccountsWithDeleted() {
  const customPinsRaw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
  let customPins = {};
  if (customPinsRaw) {
    try { customPins = JSON.parse(customPinsRaw) || {}; } catch (e) {}
  }

  const customAccountsRaw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
  let customAccounts = {};
  if (customAccountsRaw) {
    try { customAccounts = JSON.parse(customAccountsRaw) || {}; } catch (e) {}
  }

  const deletedIds = getDeletedAccountIds();

  const accounts = DEFAULT_TEAM_ACCOUNTS.map(acc => {
    const custom = customAccounts[acc.id] || {};
    const pin = custom.pin || customPins[acc.id] || acc.pin;
    const name = custom.name || acc.name;
    const empId = custom.empId || acc.empId || acc.id.replace('usr_', '');
    const company = custom.company || acc.company || 'ORBRAY';
    const department = custom.department || acc.department || 'PRODUCTION TECHNOLOGY';
    const role = custom.role || acc.role || 'MEMBER';
    const avatar = custom.avatar || acc.avatar || '👤';
    const isDeleted = deletedIds.includes(acc.id);
    return {
      ...acc,
      name,
      pin,
      empId,
      company,
      department,
      role,
      avatar,
      isDeleted
    };
  });

  Object.keys(customAccounts).forEach(accId => {
    if (!DEFAULT_TEAM_ACCOUNTS.some(a => a.id === accId)) {
      const c = customAccounts[accId];
      if (c && c.name) {
        accounts.push({
          id: accId,
          name: c.name,
          pin: c.pin || customPins[accId] || '',
          empId: c.empId || accId.replace('usr_', ''),
          company: c.company || 'ORBRAY',
          department: c.department || 'PRODUCTION TECHNOLOGY',
          role: c.role || 'MEMBER',
          avatar: c.avatar || '👤',
          isCustomAdded: true,
          isDeleted: deletedIds.includes(accId)
        });
      }
    }
  });

  return accounts;
}

function findAccountByPin(pin) {
  if (!pin) return null;
  const cleanPin = String(pin).trim();
  const accounts = getTeamAccounts();
  return accounts.find(a => a.pin === cleanPin) || null;
}

function initAuthSession() {
  const savedUserRaw = localStorage.getItem(STORAGE_KEY_AUTH_USER);
  if (savedUserRaw) {
    try {
      const saved = JSON.parse(savedUserRaw);
      const accounts = getTeamAccounts();
      const current = accounts.find(a => a.id === saved.id);
      if (current) {
        currentUser = current;
      } else {
        const wasLoggedIn = Boolean(currentUser);
        currentUser = null;
        localStorage.removeItem(STORAGE_KEY_AUTH_USER);
        if (wasLoggedIn) {
          showToast('⚠️ บัญชีของคุณถูกระงับหรือลบออกจากระบบ กรุณาติดต่อผู้ดูแลระบบ (ADMIN)');
        }
      }
    } catch (e) {
      console.warn('Error reading saved auth session:', e);
    }
  } else {
    currentUser = null;
  }
  updateAuthHeaderUI();
}

function updateAuthHeaderUI() {
  window.currentUser = currentUser;
  const btnHeaderAuth = document.getElementById('btnHeaderAuth');
  const headerAuthIcon = document.getElementById('headerAuthIcon');
  const headerAuthText = document.getElementById('headerAuthText');
  const dropdownUserName = document.getElementById('dropdownUserName');
  const dropdownUserPin = document.getElementById('dropdownUserPin');
  const mobileToolsAuthBtn = document.getElementById('mobileToolsAuthBtn');
  const adminDropdownItem = document.getElementById('adminViewTeamPinsDropdownItem');
  const mobileAdminBtn = document.getElementById('mobileAdminTeamPinsBtn');

  if (currentUser) {
    const isAdmin = (currentUser.role === 'ADMIN' || currentUser.id === 'usr_20523');
    if (btnHeaderAuth) {
      btnHeaderAuth.classList.remove('unauthenticated');
      btnHeaderAuth.classList.add('authenticated');
      btnHeaderAuth.title = `เข้าสู่ระบบในชื่อ: ${currentUser.name} (${currentUser.role}) คลิกเพื่อจัดการบัญชี`;
    }
    if (headerAuthIcon) headerAuthIcon.textContent = currentUser.avatar;
    if (headerAuthText) {
      const roleBadge = `<span class="auth-user-role-badge ${currentUser.role === 'ADMIN' ? 'admin' : 'member'}">${currentUser.role}</span>`;
      headerAuthText.innerHTML = `${escapeHtml(currentUser.name)} ${roleBadge}`;
    }
    if (dropdownUserName) dropdownUserName.textContent = `${currentUser.avatar} ${currentUser.name}`;
    const dropdownEmpId = document.getElementById('dropdownEmpId');
    if (dropdownEmpId) dropdownEmpId.textContent = currentUser.empId || currentUser.id.replace('usr_', '');
    const dropdownCompany = document.getElementById('dropdownCompany');
    if (dropdownCompany) dropdownCompany.textContent = `🏢 ${currentUser.company || 'ORBRAY'}`;
    if (dropdownUserPin) dropdownUserPin.textContent = `รหัส PIN: ••••• (${currentUser.role})`;
    if (mobileToolsAuthBtn) {
      mobileToolsAuthBtn.innerHTML = `${currentUser.avatar} บัญชี: ${currentUser.name} (${currentUser.role})`;
    }
    const mobileToolsProfileBtn = document.getElementById('mobileToolsProfileBtn');
    if (mobileToolsProfileBtn) {
      mobileToolsProfileBtn.style.display = 'block';
    }
    if (adminDropdownItem) {
      adminDropdownItem.style.display = isAdmin ? 'flex' : 'none';
    }
    if (mobileAdminBtn) {
      mobileAdminBtn.style.display = isAdmin ? 'flex' : 'none';
    }
  } else {
    if (btnHeaderAuth) {
      btnHeaderAuth.classList.remove('authenticated');
      btnHeaderAuth.classList.add('unauthenticated');
      btnHeaderAuth.title = 'เข้าสู่ระบบด้วยรหัส PIN เพื่อเพิ่มหรือแก้ไขงาน';
    }
    if (headerAuthIcon) headerAuthIcon.textContent = '🔑';
    if (headerAuthText) headerAuthText.textContent = 'เข้าสู่ระบบ (LOGIN)';
    if (dropdownUserName) dropdownUserName.textContent = 'ยังไม่ได้เข้าสู่ระบบ';
    const dropdownEmpId = document.getElementById('dropdownEmpId');
    if (dropdownEmpId) dropdownEmpId.textContent = '-';
    const dropdownCompany = document.getElementById('dropdownCompany');
    if (dropdownCompany) dropdownCompany.textContent = '🏢 -';
    if (dropdownUserPin) dropdownUserPin.textContent = 'PUBLIC VIEW MODE';
    if (mobileToolsAuthBtn) {
      mobileToolsAuthBtn.innerHTML = '🔑 เข้าสู่ระบบ PIN / LOGIN';
    }
    const mobileToolsProfileBtn = document.getElementById('mobileToolsProfileBtn');
    if (mobileToolsProfileBtn) {
      mobileToolsProfileBtn.style.display = 'none';
    }
    if (adminDropdownItem) {
      adminDropdownItem.style.display = 'none';
    }
    if (mobileAdminBtn) {
      mobileAdminBtn.style.display = 'none';
    }
  }
}

function toggleHeaderToolsDropdown(event) {
  if (event) {
    event.stopPropagation();
  }
  const menu = document.getElementById('headerToolsDropdown');
  const authDropdown = document.getElementById('authUserDropdown');
  if (authDropdown) authDropdown.classList.remove('active');

  if (menu) {
    menu.classList.toggle('show');
  }
}

function closeHeaderToolsDropdown() {
  const menu = document.getElementById('headerToolsDropdown');
  if (menu) menu.classList.remove('show');
}

function desktopNavigateTo(dest) {
  document.querySelectorAll('.desktop-nav-link').forEach(btn => btn.classList.remove('active'));
  const activeBtn = document.getElementById(`deskNav${dest.charAt(0).toUpperCase() + dest.slice(1)}`);
  if (activeBtn) activeBtn.classList.add('active');

  if (dest === 'dashboard') {
    const stats = document.getElementById('statsGrid') || document.querySelector('.analytics-section');
    if (stats) {
      stats.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (dest === 'tasks') {
    if (currentView === 'timeline') {
      currentView = 'table';
      document.querySelectorAll('.view-tab').forEach(t => {
        t.classList.toggle('active', t.getAttribute('data-view') === 'table');
      });
      localStorage.setItem('orbray_view_preference', 'table');
      renderContent();
    }
    const target = document.getElementById('controlsBar') || document.getElementById('viewContainer');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else if (dest === 'timeline') {
    currentView = 'timeline';
    document.querySelectorAll('.view-tab').forEach(t => {
      t.classList.toggle('active', t.getAttribute('data-view') === 'timeline');
    });
    localStorage.setItem('orbray_view_preference', 'timeline');
    renderContent();
    const target = document.getElementById('controlsBar') || document.getElementById('viewContainer');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function handleAuthHeaderClick() {
  closeHeaderToolsDropdown();
  const dropdown = document.getElementById('authUserDropdown');
  if (currentUser) {
    if (dropdown) dropdown.classList.toggle('active');
  } else {
    if (dropdown) dropdown.classList.remove('active');
    openAuthPinModal();
  }
}

function openAuthPinModal(actionType = null, item = null, onSuccess = null) {
  const modal = document.getElementById('authPinModal');
  const pinInput = document.getElementById('pinInputField');
  const pinError = document.getElementById('pinErrorMessage');
  const subtext = document.getElementById('pinModalSubtext');
  const avatar = document.getElementById('pinTargetAvatar');

  if (!modal) return;

  if (pinInput) {
    pinInput.value = '';
    pinInput.type = 'password';
  }
  const visIcon = document.getElementById('pinVisibilityIcon');
  if (visIcon) visIcon.textContent = '👁️';

  if (pinError) pinError.textContent = '';

  pendingAuthSuccessCallback = onSuccess;

  if (avatar) avatar.textContent = '🔐';

  if (subtext) {
    if (actionType === 'add') {
      subtext.innerHTML = 'กรุณาระบุ <strong>รหัส PIN ประจำตัว</strong> ของคุณเพื่อเพิ่มงานใหม่';
    } else if (actionType === 'edit') {
      const taskTitle = item ? uppercaseEnglish(item.title) : '';
      subtext.innerHTML = `กรุณาระบุ <strong>รหัส PIN ประจำตัว</strong> เพื่อแก้ไขงาน:<br><span style="color:#0f172a;font-weight:700;">"${escapeHtml(taskTitle)}"</span>`;
    } else if (actionType === 'delete') {
      const taskTitle = item ? uppercaseEnglish(item.title) : '';
      subtext.innerHTML = `กรุณาระบุ <strong>รหัส PIN ประจำตัว</strong> เพื่อลบงาน:<br><span style="color:#e11d48;font-weight:700;">"${escapeHtml(taskTitle)}"</span>`;
    } else {
      subtext.textContent = 'กรุณาระบุรหัส PIN ประจำตัวของคุณเพื่อจัดการงาน (Protected Edit Mode)';
    }
  }

  modal.classList.add('active');
  setTimeout(() => {
    if (pinInput) pinInput.focus();
  }, 100);
}

function closeAuthPinModal() {
  const modal = document.getElementById('authPinModal');
  if (modal) modal.classList.remove('active');
  pendingAuthSuccessCallback = null;
}

function pressPinKey(digit) {
  const pinInput = document.getElementById('pinInputField');
  if (!pinInput) return;
  if (pinInput.value.length < 8) {
    pinInput.value += digit;
  }
  const pinError = document.getElementById('pinErrorMessage');
  if (pinError) pinError.textContent = '';
  pinInput.focus();
}

function clearPinKey() {
  const pinInput = document.getElementById('pinInputField');
  if (pinInput) pinInput.value = '';
  const pinError = document.getElementById('pinErrorMessage');
  if (pinError) pinError.textContent = '';
}

function togglePinVisibility() {
  const pinInput = document.getElementById('pinInputField');
  const visIcon = document.getElementById('pinVisibilityIcon');
  if (!pinInput) return;
  if (pinInput.type === 'password') {
    pinInput.type = 'text';
    if (visIcon) visIcon.textContent = '🙈';
  } else {
    pinInput.type = 'password';
    if (visIcon) visIcon.textContent = '👁️';
  }
}

function handlePinInputKeydown(e) {
  if (e.key === 'Enter') {
    e.preventDefault();
    submitPinLogin();
  }
}

function loginWithPin(pinVal) {
  if (!pinVal) return false;
  const clean = String(pinVal).trim();
  const account = findAccountByPin(clean);
  if (!account) return false;

  // Successful login
  currentUser = account;
  localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(currentUser));
  updateAuthHeaderUI();

  const cb = pendingAuthSuccessCallback;
  closeAuthPinModal();

  showToast(`🎉 เข้าสู่ระบบสำเร็จ: ${currentUser.avatar} ${currentUser.name} (${currentUser.role === 'ADMIN' ? 'ผู้ดูแลระบบ' : 'สมาชิกทีม'})`);

  if (cb && typeof cb === 'function') {
    setTimeout(() => cb(), 100);
  }
  return true;
}

function submitPinLogin() {
  const pinInput = document.getElementById('pinInputField');
  const pinError = document.getElementById('pinErrorMessage');
  if (!pinInput) return;
  const pinVal = pinInput.value.trim();

  if (!pinVal) {
    if (pinError) pinError.textContent = '⚠️ กรุณากรอกรหัส PIN';
    return;
  }

  const ok = loginWithPin(pinVal);
  if (!ok) {
    if (pinError) pinError.textContent = '❌ รหัส PIN ไม่ถูกต้อง กรุณาลองใหม่อีกครั้ง';
    pinInput.value = '';
    pinInput.focus();
  }
}

function logoutUser() {
  currentUser = null;
  localStorage.removeItem(STORAGE_KEY_AUTH_USER);
  const dropdown = document.getElementById('authUserDropdown');
  if (dropdown) dropdown.classList.remove('active');
  closeAdminTeamPinsModal();
  updateAuthHeaderUI();
  showToast('🚪 ออกจากระบบเรียบร้อยแล้ว (PUBLIC VIEW MODE)');
}

function openChangePinModal() {
  const dropdown = document.getElementById('authUserDropdown');
  if (dropdown) dropdown.classList.remove('active');

  if (!currentUser) {
    openAuthPinModal();
    return;
  }

  const modal = document.getElementById('changePinModal');
  const curPinInput = document.getElementById('currentPinInput');
  const newPinInput = document.getElementById('newPinInput');
  const confirmPinInput = document.getElementById('confirmNewPinInput');
  const errDiv = document.getElementById('changePinErrorMessage');

  if (curPinInput) curPinInput.value = '';
  if (newPinInput) newPinInput.value = '';
  if (confirmPinInput) confirmPinInput.value = '';
  if (errDiv) errDiv.textContent = '';

  if (modal) modal.classList.add('active');
  setTimeout(() => {
    if (curPinInput) curPinInput.focus();
  }, 100);
}

function closeChangePinModal() {
  const modal = document.getElementById('changePinModal');
  if (modal) modal.classList.remove('active');
}

function submitChangePin() {
  if (!currentUser) return;
  const curPin = (document.getElementById('currentPinInput')?.value || '').trim();
  const newPin = (document.getElementById('newPinInput')?.value || '').trim();
  const confirmPin = (document.getElementById('confirmNewPinInput')?.value || '').trim();
  const errDiv = document.getElementById('changePinErrorMessage');

  if (!curPin || !newPin || !confirmPin) {
    if (errDiv) errDiv.textContent = '⚠️ กรุณากรอกข้อมูลให้ครบทุกช่อง';
    return;
  }

  if (curPin !== currentUser.pin) {
    if (errDiv) errDiv.textContent = '❌ รหัส PIN ปัจจุบันไม่ถูกต้อง';
    return;
  }

  if (newPin.length < 4 || newPin.length > 8 || !/^\d+$/.test(newPin)) {
    if (errDiv) errDiv.textContent = '⚠️ รหัส PIN ใหม่ต้องเป็นตัวเลข 4 - 8 หลัก';
    return;
  }

  if (newPin !== confirmPin) {
    if (errDiv) errDiv.textContent = '❌ ยืนยันรหัส PIN ใหม่ไม่ตรงกัน';
    return;
  }

  // Check if PIN is already used by another user
  const allAccounts = getTeamAccounts();
  const duplicate = allAccounts.find(a => a.id !== currentUser.id && a.pin === newPin);
  if (duplicate) {
    if (errDiv) errDiv.textContent = '⚠️ รหัส PIN นี้ถูกใช้งานโดยบัญชีอื่นแล้ว กรุณาเลือกรหัสอื่น';
    return;
  }

  // Save custom PIN
  const customPinsRaw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
  let customPins = {};
  if (customPinsRaw) {
    try { customPins = JSON.parse(customPinsRaw) || {}; } catch(e){}
  }
  customPins[currentUser.id] = newPin;
  localStorage.setItem(STORAGE_KEY_TEAM_PINS, JSON.stringify(customPins));

  // Sync to STORAGE_KEY_CUSTOM_ACCOUNTS
  let customAccounts = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
    if (raw) customAccounts = JSON.parse(raw) || {};
  } catch(e) {}
  customAccounts[currentUser.id] = {
    name: currentUser.name,
    pin: newPin
  };
  localStorage.setItem(STORAGE_KEY_CUSTOM_ACCOUNTS, JSON.stringify(customAccounts));

  currentUser.pin = newPin;
  localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(currentUser));
  updateAuthHeaderUI();
  syncTeamAccountsToFirestore();

  closeChangePinModal();
  showToast('🔑 เปลี่ยนรหัส PIN สำเร็จเรียบร้อยแล้ว');
}

// --- ADMIN: View & Manage All Team Member Accounts & PINs (ADMIN ONLY) ---
let adminAllPinsVisible = false;
let adminEditPinVisible = true;

async function syncTeamAccountsToFirestore() {
  if (!firebaseDb) return;
  try {
    const customAccountsRaw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
    const customPinsRaw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
    const deletedAccountsRaw = localStorage.getItem(STORAGE_KEY_DELETED_ACCOUNTS);
    const customAccounts = customAccountsRaw ? JSON.parse(customAccountsRaw) : {};
    const customPins = customPinsRaw ? JSON.parse(customPinsRaw) : {};
    const deletedAccountIds = deletedAccountsRaw ? JSON.parse(deletedAccountsRaw) : [];
    await firebaseDb.collection('settings').doc('team_accounts').set({
      customAccounts,
      customPins,
      deletedAccountIds,
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });
  } catch (err) {
    console.warn('Failed to sync team accounts to Firestore:', err);
  }
}

function openAdminTeamPinsModal() {
  const dropdown = document.getElementById('authUserDropdown');
  if (dropdown) dropdown.classList.remove('active');

  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถจัดการบัญชีทีมงานได้');
    return;
  }

  adminAllPinsVisible = false;
  const toggleBtn = document.getElementById('btnAdminToggleAllPins');
  if (toggleBtn) {
    toggleBtn.innerHTML = '👁️ แสดงรหัสทั้งหมด';
  }

  renderAdminTeamPinsModal();

  const modal = document.getElementById('adminTeamPinsModal');
  if (modal) modal.classList.add('active');
}

function closeAdminTeamPinsModal() {
  const modal = document.getElementById('adminTeamPinsModal');
  if (modal) modal.classList.remove('active');
}

function renderAdminTeamPinsModal() {
  const container = document.getElementById('adminTeamPinsList');
  if (!container) return;

  const accounts = getTeamAccounts();
  const customPinsRaw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
  let customPins = {};
  if (customPinsRaw) {
    try { customPins = JSON.parse(customPinsRaw) || {}; } catch(e){}
  }

  const customAccountsRaw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
  let customAccounts = {};
  if (customAccountsRaw) {
    try { customAccounts = JSON.parse(customAccountsRaw) || {}; } catch(e){}
  }

  container.innerHTML = accounts.map(acc => {
    const defaultAcc = DEFAULT_TEAM_ACCOUNTS.find(a => a.id === acc.id) || acc;
    const isCustomPin = Boolean(customPins[acc.id]) || (acc.pin !== defaultAcc.pin);
    const isCustomName = Boolean(customAccounts[acc.id] && customAccounts[acc.id].name && customAccounts[acc.id].name !== defaultAcc.name);
    const isCustomEmpId = Boolean(customAccounts[acc.id] && customAccounts[acc.id].empId && customAccounts[acc.id].empId !== defaultAcc.empId);
    const isCustomCompany = Boolean(customAccounts[acc.id] && customAccounts[acc.id].company && customAccounts[acc.id].company !== defaultAcc.company);
    const isCustomDepartment = Boolean(customAccounts[acc.id] && customAccounts[acc.id].department && customAccounts[acc.id].department !== defaultAcc.department);
    const isCustom = isCustomPin || isCustomName || isCustomEmpId || isCustomCompany || isCustomDepartment;
    const isCurrentUser = currentUser && currentUser.id === acc.id;
    const initialMasked = !adminAllPinsVisible;
    const displayPin = initialMasked ? '•••••' : escapeHtml(acc.pin);
    const eyeIcon = initialMasked ? '👁️' : '🙈';

    let statusText = '💡 รหัสเริ่มต้น';
    if (isCustom) {
      statusText = '🔄 มีการแก้ไขข้อมูล';
    }

    return `
      <div class="admin-pin-card ${acc.role === 'ADMIN' ? 'admin-highlight' : ''}">
        <div class="admin-pin-card-info">
          <div class="admin-pin-avatar">${acc.avatar}</div>
          <div class="admin-pin-details">
            <div class="admin-pin-name">
              ${escapeHtml(acc.name)}
              <span class="auth-user-role-badge ${acc.role === 'ADMIN' ? 'admin' : 'member'}">${acc.role}</span>
              ${isCurrentUser ? '<span class="admin-pin-badge-you">บัญชีของคุณ</span>' : ''}
            </div>
            <div class="admin-pin-sub" style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap; margin-top: 4px;">
              <span>รหัสพนักงาน: <strong class="badge-empid-tag">${escapeHtml(acc.empId || acc.id.replace('usr_', ''))}</strong></span>
              <span>&bull;</span>
              <span>สังกัด: <span class="badge-company-tag">🏢 ${escapeHtml(acc.company || 'ORBRAY')}</span></span>
              <span>&bull;</span>
              <span>แผนก: <span class="badge-company-tag" style="background: #eef2ff; color: #3730a3; border-color: #c7d2fe;">🏷️ ${escapeHtml(acc.department || 'PRODUCTION TECHNOLOGY')}</span></span>
              <span>&bull;</span>
              <span>สถานะ: <span class="badge-pin-status ${isCustom ? 'custom' : 'default'}">${statusText}</span></span>
            </div>
          </div>
        </div>
        <div class="admin-pin-actions">
          <div class="admin-pin-value-box">
            <span class="admin-pin-label">PIN:</span>
            <span class="admin-pin-display" id="adminPinVal_${acc.id}" data-pin="${escapeHtml(acc.pin)}" data-masked="${initialMasked ? 'true' : 'false'}">${displayPin}</span>
            <button type="button" class="btn-icon-admin-pin" onclick="toggleAdminPinRow('${acc.id}')" title="แสดง/ซ่อนรหัส PIN">
              <span id="adminPinEye_${acc.id}">${eyeIcon}</span>
            </button>
          </div>
          <button type="button" class="admin-btn-edit" onclick="openAdminEditAccountModal('${acc.id}')" title="แก้ไขชื่อและรหัส PIN ของ ${escapeHtml(acc.name)}">
            ✏️ แก้ไข
          </button>
          ${isCustom ? `
            <button type="button" class="admin-btn-reset" onclick="adminResetMemberAccount('${acc.id}', '${escapeHtml(acc.name)}')" title="รีเซ็ตชื่อและรหัสกลับเป็นค่าเริ่มต้นตามรหัสพนักงาน">
              ↺ รีเซ็ต
            </button>
          ` : ''}
          ${!isCurrentUser && acc.id !== 'usr_20523' ? `
            <button type="button" class="admin-btn-delete" onclick="adminDeleteAccount('${acc.id}', '${escapeHtml(acc.name)}')" title="ลบบัญชี ${escapeHtml(acc.name)} ออกจากระบบ">
              🗑️ ลบ
            </button>
          ` : ''}
        </div>
      </div>
    `;
  }).join('');

  // Render Deleted Accounts Section (if any exist)
  const allAccounts = getAllTeamAccountsWithDeleted();
  const deletedAccounts = allAccounts.filter(a => a.isDeleted);
  const deletedSection = document.getElementById('adminDeletedAccountsSection');
  const deletedList = document.getElementById('adminDeletedAccountsList');
  const deletedCount = document.getElementById('adminDeletedAccountsCount');

  if (deletedSection && deletedList) {
    if (deletedAccounts.length > 0) {
      deletedSection.style.display = 'block';
      if (deletedCount) deletedCount.textContent = deletedAccounts.length;
      deletedList.innerHTML = deletedAccounts.map(dAcc => `
        <div class="admin-deleted-item">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0;">
            <div style="font-size: 20px; opacity: 0.7;">${dAcc.avatar || '👤'}</div>
            <div style="min-width: 0;">
              <div style="font-size: 13px; font-weight: 700; color: #881337; text-decoration: line-through;">
                ${escapeHtml(dAcc.name)}
              </div>
              <div style="font-size: 11px; color: #9f1239; opacity: 0.85;">
                รหัสพนักงาน: ${escapeHtml(dAcc.empId || dAcc.id.replace('usr_', ''))} &bull; 🏢 ${escapeHtml(dAcc.company || 'ORBRAY')}
              </div>
            </div>
          </div>
          <div>
            <button type="button" class="admin-btn-restore" onclick="adminRestoreAccount('${dAcc.id}', '${escapeHtml(dAcc.name)}')" title="กู้คืนบัญชีนี้กลับมาใช้งานตามปกติ">
              ↺ กู้คืน (RESTORE)
            </button>
          </div>
        </div>
      `).join('');
    } else {
      deletedSection.style.display = 'none';
    }
  }
}

function toggleAdminPinRow(accId) {
  const pinSpan = document.getElementById(`adminPinVal_${accId}`);
  const eyeSpan = document.getElementById(`adminPinEye_${accId}`);
  if (!pinSpan || !eyeSpan) return;

  const isMasked = pinSpan.getAttribute('data-masked') === 'true';
  const realPin = pinSpan.getAttribute('data-pin');

  if (isMasked) {
    pinSpan.textContent = realPin;
    pinSpan.setAttribute('data-masked', 'false');
    eyeSpan.textContent = '🙈';
  } else {
    pinSpan.textContent = '•••••';
    pinSpan.setAttribute('data-masked', 'true');
    eyeSpan.textContent = '👁️';
  }
}

function toggleAdminAllPins() {
  adminAllPinsVisible = !adminAllPinsVisible;
  const toggleBtn = document.getElementById('btnAdminToggleAllPins');
  const accounts = getTeamAccounts();

  accounts.forEach(acc => {
    const pinSpan = document.getElementById(`adminPinVal_${acc.id}`);
    const eyeSpan = document.getElementById(`adminPinEye_${acc.id}`);
    if (!pinSpan || !eyeSpan) return;

    if (adminAllPinsVisible) {
      pinSpan.textContent = pinSpan.getAttribute('data-pin');
      pinSpan.setAttribute('data-masked', 'false');
      eyeSpan.textContent = '🙈';
    } else {
      pinSpan.textContent = '•••••';
      pinSpan.setAttribute('data-masked', 'true');
      eyeSpan.textContent = '👁️';
    }
  });

  if (toggleBtn) {
    toggleBtn.innerHTML = adminAllPinsVisible ? '🙈 ซ่อนรหัสทั้งหมด' : '👁️ แสดงรหัสทั้งหมด';
  }
}

function openAdminEditAccountModal(accId) {
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถแก้ไขข้อมูลบัญชีได้');
    return;
  }

  const accounts = getTeamAccounts();
  const acc = accounts.find(a => a.id === accId);
  if (!acc) {
    showToast('❌ ไม่พบบัญชีผู้ใช้งานที่ต้องการแก้ไข');
    return;
  }

  const modal = document.getElementById('adminEditAccountModal');
  const idInput = document.getElementById('adminEditAccId');
  const avatarEl = document.getElementById('adminEditAccAvatar');
  const empIdEl = document.getElementById('adminEditEmpId');
  const roleEl = document.getElementById('adminEditAccRole');
  const namePreviewEl = document.getElementById('adminEditCurrentNamePreview');
  const nameInput = document.getElementById('adminEditAccName');
  const empInput = document.getElementById('adminEditAccEmpId');
  const compInput = document.getElementById('adminEditAccCompany');
  const deptInput = document.getElementById('adminEditAccDepartment');
  const pinInput = document.getElementById('adminEditAccPin');
  const errEl = document.getElementById('adminEditAccountErrorMessage');
  const taskCheck = document.getElementById('adminEditUpdateExistingTasks');

  if (idInput) idInput.value = acc.id;
  if (avatarEl) avatarEl.textContent = acc.avatar || '👤';
  if (empIdEl) empIdEl.textContent = acc.empId || acc.id.replace('usr_', '');
  if (roleEl) {
    roleEl.textContent = acc.role;
    roleEl.className = `auth-user-role-badge ${acc.role === 'ADMIN' ? 'admin' : 'member'}`;
  }
  if (namePreviewEl) namePreviewEl.textContent = `ชื่อปัจจุบัน: ${acc.name}`;
  if (nameInput) nameInput.value = acc.name;
  if (empInput) empInput.value = acc.empId || acc.id.replace('usr_', '');
  if (compInput) compInput.value = acc.company || 'ORBRAY';
  if (deptInput) deptInput.value = acc.department || 'PRODUCTION TECHNOLOGY';
  if (pinInput) {
    pinInput.value = acc.pin;
    pinInput.type = 'text';
  }
  adminEditPinVisible = true;
  const pinEye = document.getElementById('adminEditPinEye');
  if (pinEye) pinEye.textContent = '👁️';

  if (taskCheck) taskCheck.checked = true;
  if (errEl) errEl.textContent = '';

  const btnDeleteThisAcc = document.getElementById('btnAdminEditDeleteThisAcc');
  if (btnDeleteThisAcc) {
    if (acc.id !== currentUser.id && acc.id !== 'usr_20523') {
      btnDeleteThisAcc.style.display = 'inline-flex';
      btnDeleteThisAcc.setAttribute('data-target-id', acc.id);
      btnDeleteThisAcc.setAttribute('data-target-name', acc.name);
    } else {
      btnDeleteThisAcc.style.display = 'none';
      btnDeleteThisAcc.removeAttribute('data-target-id');
      btnDeleteThisAcc.removeAttribute('data-target-name');
    }
  }

  if (modal) modal.classList.add('active');
  setTimeout(() => {
    if (nameInput) {
      nameInput.focus();
      nameInput.select();
    }
  }, 100);
}

function closeAdminEditAccountModal() {
  const modal = document.getElementById('adminEditAccountModal');
  if (modal) modal.classList.remove('active');
}

function toggleAdminEditPinVisibility() {
  const pinInput = document.getElementById('adminEditAccPin');
  const pinEye = document.getElementById('adminEditPinEye');
  if (!pinInput) return;

  adminEditPinVisible = !adminEditPinVisible;
  pinInput.type = adminEditPinVisible ? 'text' : 'password';
  if (pinEye) pinEye.textContent = adminEditPinVisible ? '👁️' : '🙈';
}

async function saveAdminEditAccount() {
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถแก้ไขข้อมูลบัญชีได้');
    return;
  }

  const accId = (document.getElementById('adminEditAccId')?.value || '').trim();
  const newName = (document.getElementById('adminEditAccName')?.value || '').trim();
  const newEmpId = (document.getElementById('adminEditAccEmpId')?.value || '').trim();
  const newCompany = (document.getElementById('adminEditAccCompany')?.value || '').trim();
  const newDepartment = (document.getElementById('adminEditAccDepartment')?.value || '').trim() || 'PRODUCTION TECHNOLOGY';
  const newPin = (document.getElementById('adminEditAccPin')?.value || '').trim();
  const updateExistingTasks = Boolean(document.getElementById('adminEditUpdateExistingTasks')?.checked);
  const errEl = document.getElementById('adminEditAccountErrorMessage');

  if (!accId) {
    if (errEl) errEl.textContent = '❌ ไม่พบรหัสบัญชีผู้ใช้งาน';
    return;
  }

  if (!newName || newName.length < 2) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุชื่อ-นามสกุล หรือชื่อผู้ใช้งาน (อย่างน้อย 2 ตัวอักษร)';
    return;
  }

  if (!newEmpId) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุรหัสพนักงาน';
    return;
  }

  if (!newCompany) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุชื่อบริษัท / สังกัด';
    return;
  }

  if (!newPin || newPin.length < 4 || newPin.length > 8 || !/^\d+$/.test(newPin)) {
    if (errEl) errEl.textContent = '⚠️ รหัส PIN ต้องเป็นตัวเลขล้วน 4 - 8 หลัก';
    return;
  }

  const allAccounts = getTeamAccounts();
  const targetAcc = allAccounts.find(a => a.id === accId);
  if (!targetAcc) {
    if (errEl) errEl.textContent = '❌ ไม่พบบัญชีผู้ใช้งานในระบบ';
    return;
  }

  // Duplicate PIN validation across other accounts
  const dup = allAccounts.find(a => a.id !== accId && a.pin === newPin);
  if (dup) {
    if (errEl) errEl.textContent = `⚠️ รหัส PIN "${newPin}" ถูกใช้งานโดยบัญชี "${dup.name}" แล้ว กรุณาตั้งรหัสอื่น`;
    return;
  }

  const oldName = targetAcc.name;

  // Save to STORAGE_KEY_CUSTOM_ACCOUNTS
  let customAccounts = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
    if (raw) customAccounts = JSON.parse(raw) || {};
  } catch(e) {}

  customAccounts[accId] = {
    name: newName,
    empId: newEmpId,
    company: newCompany,
    department: newDepartment,
    pin: newPin
  };
  localStorage.setItem(STORAGE_KEY_CUSTOM_ACCOUNTS, JSON.stringify(customAccounts));

  // Save to STORAGE_KEY_TEAM_PINS for full backward compatibility
  let customPins = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
    if (raw) customPins = JSON.parse(raw) || {};
  } catch(e) {}
  customPins[accId] = newPin;
  localStorage.setItem(STORAGE_KEY_TEAM_PINS, JSON.stringify(customPins));

  // If current logged-in user is this account, update session
  if (currentUser && currentUser.id === accId) {
    currentUser.name = newName;
    currentUser.empId = newEmpId;
    currentUser.company = newCompany;
    currentUser.department = newDepartment;
    currentUser.pin = newPin;
    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(currentUser));
    updateAuthHeaderUI();
  }

  // Update existing achievements assignee if requested and name changed
  let updatedTaskCount = 0;
  if (updateExistingTasks && oldName && oldName.toUpperCase() !== newName.toUpperCase()) {
    achievements.forEach(item => {
      if (item.assignee && item.assignee.trim().toUpperCase() === oldName.toUpperCase()) {
        item.assignee = newName;
        updatedTaskCount++;
      }
    });

    if (updatedTaskCount > 0) {
      saveAchievements();
      renderContent();
      renderStats();
      populateAssigneeDropdown();
    }
  }

  // Refresh dropdowns and UI
  resetAssigneeDropdown();
  populateAssigneeDropdown();
  renderAdminTeamPinsModal();

  // Cloud sync
  syncTeamAccountsToFirestore();

  closeAdminEditAccountModal();

  const taskMsg = updatedTaskCount > 0 ? ` (อัปเดตประวัติงานเดิม ${updatedTaskCount} รายการ)` : '';
  showToast(`✅ แก้ไขข้อมูลบัญชี "${newName}" (PIN: ${newPin}) สำเร็จเรียบร้อย${taskMsg}`);
}

function adminResetMemberAccount(accId, accName) {
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถรีเซ็ตข้อมูลบัญชีได้');
    return;
  }

  const defaultAcc = DEFAULT_TEAM_ACCOUNTS.find(a => a.id === accId);
  const defaultPin = defaultAcc ? defaultAcc.pin : accId.replace('usr_', '');
  const defaultName = defaultAcc ? defaultAcc.name : accName;
  const defaultEmpId = defaultAcc ? defaultAcc.empId : accId.replace('usr_', '');
  const defaultCompany = defaultAcc ? defaultAcc.company : 'ORBRAY';

  if (!confirm(`คุณต้องการรีเซ็ตบัญชี "${accName}" กลับไปเป็นค่าเริ่มต้น\n(ชื่อ: "${defaultName}", รหัส: "${defaultEmpId}", บริษัท: "${defaultCompany}", PIN: "${defaultPin}") ใช่หรือไม่?`)) {
    return;
  }

  // Remove custom account record
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
    if (raw) {
      const customAccounts = JSON.parse(raw) || {};
      delete customAccounts[accId];
      localStorage.setItem(STORAGE_KEY_CUSTOM_ACCOUNTS, JSON.stringify(customAccounts));
    }
  } catch(e) {}

  // Remove custom pin record
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
    if (raw) {
      const customPins = JSON.parse(raw) || {};
      delete customPins[accId];
      localStorage.setItem(STORAGE_KEY_TEAM_PINS, JSON.stringify(customPins));
    }
  } catch(e) {}

  // If current logged-in user is this account, update session
  if (currentUser && currentUser.id === accId) {
    currentUser.name = defaultName;
    currentUser.empId = defaultEmpId;
    currentUser.company = defaultCompany;
    currentUser.pin = defaultPin;
    localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(currentUser));
    updateAuthHeaderUI();
  }

  resetAssigneeDropdown();
  populateAssigneeDropdown();
  renderAdminTeamPinsModal();

  // Cloud sync
  syncTeamAccountsToFirestore();

  showToast(`↺ รีเซ็ตบัญชี "${defaultName}" (PIN: ${defaultPin}) กลับเป็นค่าเริ่มต้นเรียบร้อย`);
}

// Backward compatibility alias
const adminResetMemberPin = adminResetMemberAccount;

// --- ADMIN: Delete & Restore Team Member Accounts (ADMIN ONLY) ---
function adminDeleteAccount(accId, accName) {
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถลบบัญชีผู้ใช้งานได้');
    return;
  }

  if (currentUser.id === accId) {
    alert('⚠️ ไม่อนุญาตให้ลบบัญชีของตนเองที่กำลังเข้าสู่ระบบอยู่\nเพื่อป้องกันการสูญเสียสิทธิ์การดูแลระบบ');
    return;
  }

  if (accId === 'usr_20523') {
    alert('⚠️ ไม่สามารถลบบัญชีผู้ดูแลระบบหลัก (Master Admin: 20523) ได้');
    return;
  }

  const allAccounts = getAllTeamAccountsWithDeleted();
  const targetAcc = allAccounts.find(a => a.id === accId);
  const empId = targetAcc ? (targetAcc.empId || accId.replace('usr_', '')) : '';
  const displayName = targetAcc ? targetAcc.name : accName;

  const confirmMsg = `⚠️ คุณต้องการลบบัญชีผู้ใช้งานนี้ออกจากระบบใช่หรือไม่?\n\n` +
    `👤 ชื่อ: ${displayName}\n` +
    `🆔 รหัสพนักงาน: ${empId}\n\n` +
    `📌 ข้อมูลสำคัญ:\n` +
    `• บัญชีนี้จะไม่สามารถใช้รหัส PIN เข้าสู่ระบบได้อีก\n` +
    `• ประวัติผลงานเดิมที่เคยบันทึกไว้ในชื่อ "${displayName}" จะยังคงอยู่ครบถ้วน ไม่สูญหาย\n` +
    `• คุณสามารถกดกู้คืนบัญชีนี้ได้ตลอดเวลาในหน้าต่างจัดการบัญชี\n\n` +
    `ต้องการยืนยันการลบบัญชีนี้หรือไม่?`;

  if (!confirm(confirmMsg)) {
    return;
  }

  const deletedIds = getDeletedAccountIds();
  if (!deletedIds.includes(accId)) {
    deletedIds.push(accId);
    saveDeletedAccountIds(deletedIds);
  }

  // If this account is being edited in adminEditAccountModal, close it
  const editModal = document.getElementById('adminEditAccountModal');
  const editAccIdInput = document.getElementById('adminEditAccId');
  if (editModal && editModal.classList.contains('active') && editAccIdInput && editAccIdInput.value === accId) {
    closeAdminEditAccountModal();
  }

  resetAssigneeDropdown();
  populateAssigneeDropdown();
  renderAdminTeamPinsModal();

  // Cloud sync
  syncTeamAccountsToFirestore();

  showToast(`🗑️ ลบบัญชี "${displayName}" เรียบร้อย (สามารถกู้คืนได้ที่ด้านล่าง)`);
}

function adminRestoreAccount(accId, accName) {
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถกู้คืนบัญชีได้');
    return;
  }

  const deletedIds = getDeletedAccountIds().filter(id => id !== accId);
  saveDeletedAccountIds(deletedIds);

  resetAssigneeDropdown();
  populateAssigneeDropdown();
  renderAdminTeamPinsModal();

  // Cloud sync
  syncTeamAccountsToFirestore();

  showToast(`✅ กู้คืนบัญชี "${accName}" กลับสู่ระบบเรียบร้อยแล้ว`);
}

function triggerDeleteFromEditModal() {
  const btnDeleteThisAcc = document.getElementById('btnAdminEditDeleteThisAcc');
  const accId = btnDeleteThisAcc ? btnDeleteThisAcc.getAttribute('data-target-id') : (document.getElementById('adminEditAccId')?.value || '');
  const accName = btnDeleteThisAcc ? btnDeleteThisAcc.getAttribute('data-target-name') : (document.getElementById('adminEditAccName')?.value || '');
  if (!accId) return;
  adminDeleteAccount(accId, accName);
}

function openAdminAddAccountModal() {
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถเพิ่มบัญชีใหม่ได้');
    return;
  }
  const modal = document.getElementById('adminAddAccountModal');
  const nameInput = document.getElementById('adminAddAccName');
  const empIdInput = document.getElementById('adminAddAccEmpId');
  const compInput = document.getElementById('adminAddAccCompany');
  const deptInput = document.getElementById('adminAddAccDepartment');
  const pinInput = document.getElementById('adminAddAccPin');
  const errEl = document.getElementById('adminAddAccountErrorMessage');

  if (nameInput) nameInput.value = '';
  if (empIdInput) empIdInput.value = '';
  if (compInput) compInput.value = 'ORBRAY';
  if (deptInput) deptInput.value = 'PRODUCTION TECHNOLOGY';
  if (pinInput) pinInput.value = '';
  if (errEl) errEl.textContent = '';

  selectAdminAddAvatar('👨‍💻');

  if (modal) modal.classList.add('active');
  setTimeout(() => {
    if (nameInput) nameInput.focus();
  }, 100);
}

function closeAdminAddAccountModal() {
  const modal = document.getElementById('adminAddAccountModal');
  if (modal) modal.classList.remove('active');
}

function selectAdminAddAvatar(avatar) {
  const hiddenInput = document.getElementById('adminAddAccAvatar');
  if (hiddenInput) hiddenInput.value = avatar;
  const buttons = document.querySelectorAll('#adminAddAvatarSelector .avatar-opt-btn');
  buttons.forEach(btn => {
    if (btn.getAttribute('data-avatar') === avatar) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

async function saveAdminAddAccount() {
  if (!currentUser || (currentUser.role !== 'ADMIN' && currentUser.id !== 'usr_20523')) {
    showToast('⚠️ เฉพาะผู้ดูแลระบบ (ADMIN) เท่านั้นที่สามารถเพิ่มบัญชีใหม่ได้');
    return;
  }

  const name = (document.getElementById('adminAddAccName')?.value || '').trim();
  const empId = (document.getElementById('adminAddAccEmpId')?.value || '').trim();
  const company = (document.getElementById('adminAddAccCompany')?.value || '').trim();
  const department = (document.getElementById('adminAddAccDepartment')?.value || '').trim() || 'PRODUCTION TECHNOLOGY';
  const pin = (document.getElementById('adminAddAccPin')?.value || '').trim();
  const avatar = document.getElementById('adminAddAccAvatar')?.value || '👨‍💻';
  const errEl = document.getElementById('adminAddAccountErrorMessage');

  if (!name || name.length < 2) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุชื่อ-นามสกุล (อย่างน้อย 2 ตัวอักษร)';
    return;
  }

  if (!empId) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุรหัสพนักงาน';
    return;
  }

  if (!company) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุชื่อบริษัท / สังกัด';
    return;
  }

  if (!pin || pin.length < 4 || pin.length > 8 || !/^\d+$/.test(pin)) {
    if (errEl) errEl.textContent = '⚠️ รหัส PIN ต้องเป็นตัวเลขล้วน 4 - 8 หลัก';
    return;
  }

  const allAccounts = getTeamAccounts();
  const dupPin = allAccounts.find(a => a.pin === pin);
  if (dupPin) {
    if (errEl) errEl.textContent = `⚠️ รหัส PIN "${pin}" ถูกใช้งานโดย "${dupPin.name}" แล้ว กรุณาตั้งรหัสอื่น`;
    return;
  }

  const dupEmp = allAccounts.find(a => (a.empId || '').toUpperCase() === empId.toUpperCase());
  if (dupEmp) {
    if (errEl) errEl.textContent = `⚠️ รหัสพนักงาน "${empId}" มีอยู่ในระบบแล้ว (${dupEmp.name})`;
    return;
  }

  const newId = `usr_${empId}`;

  // If this ID was previously deleted, remove it from deleted list
  const deletedIds = getDeletedAccountIds().filter(id => id !== newId);
  saveDeletedAccountIds(deletedIds);

  // Save to custom accounts
  let customAccounts = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
    if (raw) customAccounts = JSON.parse(raw) || {};
  } catch (e) {}

  customAccounts[newId] = {
    id: newId,
    name: name.toUpperCase(),
    empId: empId,
    company: company.toUpperCase(),
    department: department.toUpperCase(),
    pin: pin,
    role: 'MEMBER',
    avatar: avatar
  };
  localStorage.setItem(STORAGE_KEY_CUSTOM_ACCOUNTS, JSON.stringify(customAccounts));

  // Save to custom pins
  let customPins = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
    if (raw) customPins = JSON.parse(raw) || {};
  } catch (e) {}
  customPins[newId] = pin;
  localStorage.setItem(STORAGE_KEY_TEAM_PINS, JSON.stringify(customPins));

  closeAdminAddAccountModal();
  resetAssigneeDropdown();
  populateAssigneeDropdown();
  renderAdminTeamPinsModal();

  syncTeamAccountsToFirestore();

  showToast(`🎉 เพิ่มบัญชีสมาชิกใหม่ "${name.toUpperCase()}" (PIN: ${pin}) สำเร็จเรียบร้อย`);
}

// --- User Profile Management (Every Account) ---
let userProfilePinVisible = false;

function openUserProfileModal() {
  const dropdown = document.getElementById('authUserDropdown');
  if (dropdown) dropdown.classList.remove('active');

  if (!currentUser) {
    openAuthPinModal();
    return;
  }

  const modal = document.getElementById('userProfileModal');
  const avatarEl = document.getElementById('userProfileAvatar');
  const roleEl = document.getElementById('userProfileRole');
  const previewEl = document.getElementById('userProfileCurrentNamePreview');
  const nameInput = document.getElementById('userProfileName');
  const empIdInput = document.getElementById('userProfileEmpId');
  const companyInput = document.getElementById('userProfileCompany');
  const deptInput = document.getElementById('userProfileDepartment');
  const pinInput = document.getElementById('userProfilePin');
  const errEl = document.getElementById('userProfileErrorMessage');
  const taskCheck = document.getElementById('userProfileUpdateExistingTasks');

  if (avatarEl) avatarEl.textContent = currentUser.avatar || '👤';
  if (roleEl) {
    roleEl.textContent = currentUser.role;
    roleEl.className = `auth-user-role-badge ${currentUser.role === 'ADMIN' ? 'admin' : 'member'}`;
  }
  if (previewEl) previewEl.textContent = `ชื่อปัจจุบัน: ${currentUser.name}`;
  if (nameInput) nameInput.value = currentUser.name;
  if (empIdInput) empIdInput.value = currentUser.empId || currentUser.id.replace('usr_', '');
  if (companyInput) companyInput.value = currentUser.company || 'ORBRAY';
  if (deptInput) deptInput.value = currentUser.department || 'PRODUCTION TECHNOLOGY';
  if (pinInput) {
    pinInput.value = currentUser.pin;
    pinInput.type = 'password';
  }
  userProfilePinVisible = false;
  const pinEye = document.getElementById('userProfilePinEye');
  if (pinEye) pinEye.textContent = '👁️';

  if (taskCheck) taskCheck.checked = true;
  if (errEl) errEl.textContent = '';

  if (modal) modal.classList.add('active');
  setTimeout(() => {
    if (nameInput) {
      nameInput.focus();
      nameInput.select();
    }
  }, 100);
}

function closeUserProfileModal() {
  const modal = document.getElementById('userProfileModal');
  if (modal) modal.classList.remove('active');
}

function toggleProfilePinVisibility() {
  const pinInput = document.getElementById('userProfilePin');
  const pinEye = document.getElementById('userProfilePinEye');
  if (!pinInput) return;

  userProfilePinVisible = !userProfilePinVisible;
  pinInput.type = userProfilePinVisible ? 'text' : 'password';
  if (pinEye) pinEye.textContent = userProfilePinVisible ? '🙈' : '👁️';
}

async function saveUserProfile() {
  if (!currentUser) return;

  const newName = (document.getElementById('userProfileName')?.value || '').trim();
  const newEmpId = (document.getElementById('userProfileEmpId')?.value || '').trim();
  const newCompany = (document.getElementById('userProfileCompany')?.value || '').trim();
  const newDepartment = (document.getElementById('userProfileDepartment')?.value || '').trim() || 'PRODUCTION TECHNOLOGY';
  const newPin = (document.getElementById('userProfilePin')?.value || '').trim();
  const updateExistingTasks = Boolean(document.getElementById('userProfileUpdateExistingTasks')?.checked);
  const errEl = document.getElementById('userProfileErrorMessage');

  if (!newName || newName.length < 2) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุชื่อ-นามสกุล หรือชื่อผู้ใช้งาน (อย่างน้อย 2 ตัวอักษร)';
    return;
  }

  if (!newEmpId) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุรหัสพนักงาน';
    return;
  }

  if (!newCompany) {
    if (errEl) errEl.textContent = '⚠️ กรุณาระบุชื่อบริษัท / สังกัด';
    return;
  }

  if (!newPin || newPin.length < 4 || newPin.length > 8 || !/^\d+$/.test(newPin)) {
    if (errEl) errEl.textContent = '⚠️ รหัส PIN ต้องเป็นตัวเลขล้วน 4 - 8 หลัก';
    return;
  }

  const allAccounts = getTeamAccounts();
  const dup = allAccounts.find(a => a.id !== currentUser.id && a.pin === newPin);
  if (dup) {
    if (errEl) errEl.textContent = `⚠️ รหัส PIN "${newPin}" ถูกใช้งานโดยบัญชีอื่นแล้ว กรุณาตั้งรหัสอื่น`;
    return;
  }

  const oldName = currentUser.name;

  // Save to STORAGE_KEY_CUSTOM_ACCOUNTS
  let customAccounts = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_CUSTOM_ACCOUNTS);
    if (raw) customAccounts = JSON.parse(raw) || {};
  } catch(e) {}

  customAccounts[currentUser.id] = {
    name: newName,
    empId: newEmpId,
    company: newCompany,
    department: newDepartment,
    pin: newPin
  };
  localStorage.setItem(STORAGE_KEY_CUSTOM_ACCOUNTS, JSON.stringify(customAccounts));

  // Sync to STORAGE_KEY_TEAM_PINS
  let customPins = {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY_TEAM_PINS);
    if (raw) customPins = JSON.parse(raw) || {};
  } catch(e) {}
  customPins[currentUser.id] = newPin;
  localStorage.setItem(STORAGE_KEY_TEAM_PINS, JSON.stringify(customPins));

  currentUser.name = newName;
  currentUser.empId = newEmpId;
  currentUser.company = newCompany;
  currentUser.department = newDepartment;
  currentUser.pin = newPin;
  localStorage.setItem(STORAGE_KEY_AUTH_USER, JSON.stringify(currentUser));
  updateAuthHeaderUI();

  // Update existing achievements if requested
  let updatedTaskCount = 0;
  if (updateExistingTasks && oldName && oldName.toUpperCase() !== newName.toUpperCase()) {
    achievements.forEach(item => {
      if (item.assignee && item.assignee.trim().toUpperCase() === oldName.toUpperCase()) {
        item.assignee = newName;
        updatedTaskCount++;
      }
    });

    if (updatedTaskCount > 0) {
      saveAchievements();
      renderContent();
      renderStats();
      populateAssigneeDropdown();
    }
  }

  resetAssigneeDropdown();
  populateAssigneeDropdown();
  const adminModal = document.getElementById('adminTeamPinsModal');
  if (adminModal && adminModal.classList.contains('active')) {
    renderAdminTeamPinsModal();
  }

  syncTeamAccountsToFirestore();
  closeUserProfileModal();

  const taskMsg = updatedTaskCount > 0 ? ` (อัปเดตประวัติงานเดิม ${updatedTaskCount} รายการ)` : '';
  showToast(`✅ บันทึกข้อมูลโปรไฟล์ของคุณเรียบร้อยแล้ว${taskMsg}`);
}

function canUserEditTask(user, item) {
  if (!user) return { allowed: false, reason: 'NOT_LOGGED_IN' };
  if (!item) return { allowed: true, isOverride: false };

  // 1. Admin Override (Option ก): 20523 has full access to all tasks
  if (user.role === 'ADMIN' || user.pin === '20523') {
    const isOwn = (
      (item.creatorPin && item.creatorPin === user.pin) ||
      (item.editorPin && item.editorPin === user.pin) ||
      (item.assignee && item.assignee.toUpperCase().trim() === user.name.toUpperCase().trim())
    );
    return {
      allowed: true,
      isOverride: !isOwn,
      ownerName: item.assignee || 'ผู้รับผิดชอบงาน'
    };
  }

  // 2. Creator or Editor PIN match
  if (item.creatorPin && item.creatorPin === user.pin) {
    return { allowed: true, isOverride: false };
  }
  if (item.editorPin && item.editorPin === user.pin) {
    return { allowed: true, isOverride: false };
  }

  // 3. Legacy task match by Assignee Name
  if (item.assignee && user.name) {
    const cleanAssignee = item.assignee.toUpperCase().trim();
    const cleanUserName = user.name.toUpperCase().trim();
    if (cleanAssignee === cleanUserName) {
      return { allowed: true, isOverride: false };
    }
  }

  return {
    allowed: false,
    reason: 'NOT_OWNER',
    ownerName: item.assignee || 'ผู้รับผิดชอบงานท่านอื่น'
  };
}

// --- Setup Event Listeners ---
function setupEventListeners() {
  // Search Input & Murata Keyword Search Sync
  const searchInput = document.getElementById('searchInput');
  const murataKeywordInput = document.getElementById('murataKeywordInput');
  const btnMurataSearchClear = document.getElementById('btnMurataSearchClear');

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      if (murataKeywordInput && murataKeywordInput.value !== e.target.value) {
        murataKeywordInput.value = e.target.value;
        if (btnMurataSearchClear) {
          btnMurataSearchClear.style.display = e.target.value ? 'block' : 'none';
        }
      }
      renderContent();
      renderRequesterRanking();
    });
  }

  if (murataKeywordInput) {
    murataKeywordInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      if (searchInput && searchInput.value !== e.target.value) {
        searchInput.value = e.target.value;
      }
      if (btnMurataSearchClear) {
        btnMurataSearchClear.style.display = e.target.value ? 'block' : 'none';
      }
      renderContent();
      renderRequesterRanking();
    });

    murataKeywordInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        triggerMurataKeywordSearch();
      }
    });
  }

  // Category Filter
  const categoryFilter = document.getElementById('categoryFilter');
  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      currentCategoryFilter = e.target.value;
      renderContent();
    });
  }

  // Status Filter
  const statusFilter = document.getElementById('statusFilter');
  if (statusFilter) {
    statusFilter.addEventListener('change', (e) => {
      currentStatusFilter = e.target.value;
      renderContent();
      document.querySelectorAll('.status-summary-pill').forEach(p => p.classList.remove('active'));
      if (currentStatusFilter && currentStatusFilter !== 'all') {
        const activeKey = currentStatusFilter === 'cancle' ? 'cancel' : (currentStatusFilter === 'in_progress' ? 'inprog' : currentStatusFilter);
        const activePill = document.querySelector(`.status-summary-pill.pill-${activeKey}`);
        if (activePill) activePill.classList.add('active');
      }
    });
  }

  // Assignee Filter
  const assigneeFilter = document.getElementById('assigneeFilter');
  if (assigneeFilter) {
    assigneeFilter.addEventListener('change', (e) => {
      currentAssigneeFilter = e.target.value;
      renderContent();
    });
  }

  // Time Filter Chips
  document.querySelectorAll('[data-time-filter]').forEach(chip => {
    chip.addEventListener('click', () => {
      document.querySelectorAll('[data-time-filter]').forEach(c => c.classList.remove('active'));
      chip.classList.add('active');
      currentTimeFilter = chip.getAttribute('data-time-filter');
      renderContent();
    });
  });

  // View Switcher Tabs
  document.querySelectorAll('[data-view]').forEach(tab => {
    if (tab.getAttribute('data-view') === currentView) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }

    tab.addEventListener('click', () => {
      document.querySelectorAll('[data-view]').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentView = tab.getAttribute('data-view');
      localStorage.setItem('orbray_view_preference', currentView);
      renderContent();
    });
  });

  // Add Achievement Button
  const btnAdd = document.getElementById('btnAddAchievement');
  if (btnAdd) {
    btnAdd.addEventListener('click', () => openAchievementModal());
  }

  // Form Submit
  const form = document.getElementById('achievementForm');
  if (form) {
    form.addEventListener('submit', handleSaveAchievement);
  }

  // Image Upload handler
  const imageInput = document.getElementById('achvImageInput');
  if (imageInput) {
    imageInput.addEventListener('change', handleImageUpload);
  }

  const removeImgBtn = document.getElementById('btnRemoveImage');
  if (removeImgBtn) {
    removeImgBtn.addEventListener('click', removeModalImage);
  }

  const removeImgPdfBtn = document.getElementById('btnRemoveImagePdf');
  if (removeImgPdfBtn) {
    removeImgPdfBtn.addEventListener('click', removeModalImage);
  }

  const viewImgPdfBtn = document.getElementById('btnViewImagePdf');
  if (viewImgPdfBtn) {
    viewImgPdfBtn.addEventListener('click', viewModalImagePdf);
  }

  // PDF Upload handler
  const pdfInput = document.getElementById('achvPdfInput');
  if (pdfInput) {
    pdfInput.addEventListener('change', handlePdfUpload);
  }

  const removePdfBtn = document.getElementById('btnRemovePdf');
  if (removePdfBtn) {
    removePdfBtn.addEventListener('click', removeModalPdf);
  }

  const viewPdfBtn = document.getElementById('btnViewPdf');
  if (viewPdfBtn) {
    viewPdfBtn.addEventListener('click', viewModalPdf);
  }

  // Work Folder Attachment handler
  const folderInput = document.getElementById('achvFolderInput');
  if (folderInput) {
    folderInput.addEventListener('change', handleFolderUpload);
  }

  const removeFolderBtn = document.getElementById('btnRemoveFolder');
  if (removeFolderBtn) {
    removeFolderBtn.addEventListener('click', removeModalFolder);
  }

  const viewFolderFilesBtn = document.getElementById('btnViewFolderFiles');
  if (viewFolderFilesBtn) {
    viewFolderFilesBtn.addEventListener('click', () => {
      if (currentModalFolder) {
        showFolderDetailModal(currentModalFolder, document.getElementById('achvTitle').value || 'งานใหม่');
      }
    });
  }



  // Manage Categories Button
  const btnManageCat = document.getElementById('btnManageCategories');
  if (btnManageCat) {
    btnManageCat.addEventListener('click', openCategoryModal);
  }

  // New Category Form
  const newCatForm = document.getElementById('newCategoryForm');
  if (newCatForm) {
    newCatForm.addEventListener('submit', handleAddCategory);
  }

  // Export JSON
  const btnExportJson = document.getElementById('btnExportJson');
  if (btnExportJson) {
    btnExportJson.addEventListener('click', exportDataAsJson);
  }

  // Export CSV
  const btnExportCsv = document.getElementById('btnExportCsv');
  if (btnExportCsv) {
    btnExportCsv.addEventListener('click', exportDataAsCsv);
  }

  // Import JSON
  const btnImportJson = document.getElementById('btnImportJson');
  const importFileInput = document.getElementById('importFileInput');
  if (btnImportJson && importFileInput) {
    btnImportJson.addEventListener('click', () => importFileInput.click());
    importFileInput.addEventListener('change', handleImportJson);
  }

  // Print Report
  const btnPrint = document.getElementById('btnPrintReport');
  if (btnPrint) {
    btnPrint.addEventListener('click', () => window.print());
  }

  // Cloud Modal Outside Click Close
  const cloudModal = document.getElementById('cloudModal');
  if (cloudModal) {
    cloudModal.addEventListener('click', (e) => {
      if (e.target === cloudModal) closeCloudModal();
    });
  }

  // Auth PIN Modal Outside Click Close
  const authPinModal = document.getElementById('authPinModal');
  if (authPinModal) {
    authPinModal.addEventListener('click', (e) => {
      if (e.target === authPinModal) closeAuthPinModal();
    });
  }

  // Change PIN Modal Outside Click Close
  const changePinModal = document.getElementById('changePinModal');
  if (changePinModal) {
    changePinModal.addEventListener('click', (e) => {
      if (e.target === changePinModal) closeChangePinModal();
    });
  }

  // Outside click to close Auth User Dropdown and Tools Dropdown
  document.addEventListener('click', (e) => {
    const authDropdown = document.getElementById('authUserDropdown');
    const authBtn = document.getElementById('btnHeaderAuth');
    if (authDropdown && authDropdown.classList.contains('active')) {
      if (!authDropdown.contains(e.target) && (!authBtn || !authBtn.contains(e.target))) {
        authDropdown.classList.remove('active');
      }
    }

    const toolsDropdown = document.getElementById('headerToolsDropdown');
    const toolsBtn = document.getElementById('btnHeaderTools');
    if (toolsDropdown && toolsDropdown.classList.contains('show')) {
      if (!toolsDropdown.contains(e.target) && (!toolsBtn || !toolsBtn.contains(e.target))) {
        toolsDropdown.classList.remove('show');
      }
    }
  });

  const toolsDropdownMenu = document.getElementById('headerToolsDropdown');
  if (toolsDropdownMenu) {
    toolsDropdownMenu.addEventListener('click', (e) => {
      if (e.target.closest('.tools-menu-item')) {
        toolsDropdownMenu.classList.remove('show');
      }
    });
  }
}

// --- Populate Category Dropdowns ---
function populateCategoryDropdowns() {
  const filterSelect = document.getElementById('categoryFilter');
  const modalSelect = document.getElementById('achvCategory');

  if (filterSelect) {
    const currentVal = filterSelect.value;
    filterSelect.innerHTML = '<option value="all">📁 ทุกหมวดหมู่ (ALL CATEGORIES)</option>';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.icon} ${uppercaseEnglish(cat.name)}`;
      filterSelect.appendChild(opt);
    });
    filterSelect.value = currentVal || 'all';
  }

  if (modalSelect) {
    const currentModalVal = modalSelect.value;
    modalSelect.innerHTML = '<option value="">-- เลือกหมวดหมู่งาน (SELECT CATEGORY) --</option>';
    categories.forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.icon} ${uppercaseEnglish(cat.name)}`;
      modalSelect.appendChild(opt);
    });
    if (currentModalVal) modalSelect.value = currentModalVal;
  }
}

// --- Populate Assignee Dropdown ---
function populateAssigneeDropdown() {
  const filterSelect = document.getElementById('assigneeFilter');
  if (!filterSelect) return;

  const currentVal = currentAssigneeFilter || filterSelect.value || 'all';
  const assigneeCounts = {};

  achievements.forEach(a => {
    if (a.assignee && a.assignee.trim()) {
      let name = a.assignee.trim().toUpperCase();
      if (name === 'NUY') name = 'JITTRAKAN K.';
      if (name === 'SUTTHIPONG') name = 'SUTTHIPONG M.';
      if (name === 'TANIN') name = 'TANIN P.';
      assigneeCounts[name] = (assigneeCounts[name] || 0) + 1;
    }
  });

  const sortedAssignees = Object.keys(assigneeCounts).sort((a, b) => a.localeCompare(b));

  filterSelect.innerHTML = '<option value="all">👤 ผู้รับผิดชอบทั้งหมด (ALL ASSIGNEES)</option>';
  sortedAssignees.forEach(name => {
    const opt = document.createElement('option');
    opt.value = name;
    opt.textContent = `👤 ${name} (${assigneeCounts[name]} งาน)`;
    filterSelect.appendChild(opt);
  });

  if (sortedAssignees.includes(currentVal)) {
    filterSelect.value = currentVal;
  } else {
    filterSelect.value = 'all';
    currentAssigneeFilter = 'all';
  }
}

function filterByAssignee(name) {
  if (!name) return;
  const upperName = name.trim().toUpperCase();
  currentAssigneeFilter = (currentAssigneeFilter === upperName) ? 'all' : upperName;
  const select = document.getElementById('assigneeFilter');
  if (select) {
    select.value = currentAssigneeFilter;
  }
  renderContent();
}

function resetAllFilters() {
  currentSearch = '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = '';

  const murataInput = document.getElementById('murataKeywordInput');
  if (murataInput) murataInput.value = '';
  const murataClear = document.getElementById('btnMurataSearchClear');
  if (murataClear) murataClear.style.display = 'none';

  currentCategoryFilter = 'all';
  const catSelect = document.getElementById('categoryFilter');
  if (catSelect) catSelect.value = 'all';

  currentStatusFilter = 'all';
  const statusSelect = document.getElementById('statusFilter');
  if (statusSelect) statusSelect.value = 'all';

  currentAssigneeFilter = 'all';
  const assigneeSelect = document.getElementById('assigneeFilter');
  if (assigneeSelect) assigneeSelect.value = 'all';

  currentTimeFilter = 'all';
  document.querySelectorAll('[data-time-filter]').forEach(c => c.classList.remove('active'));
  const allTimeBtn = document.querySelector('[data-time-filter="all"]');
  if (allTimeBtn) allTimeBtn.classList.add('active');

  // Reset Excel Full Table & Dashboard Insights Filters
  currentSectionFilter = 'all';
  currentJobTypeFilter = 'all';
  currentSubJobTypeFilter = 'all';
  currentPriorityFilter = 'all';
  currentSubStatusFilter = 'all';
  currentFactoryFilter = 'all';
  currentDeptFilter = 'all';
  currentProcessFilter = 'all';
  currentDesignSupportFilter = 'all';
  currentMaintSupportFilter = 'all';

  document.querySelectorAll('.status-summary-pill').forEach(p => p.classList.remove('active'));

  renderContent();
  renderEngineeringInsightsDashboard();
  renderRequesterRanking();
}

function updateResetFilterButtonVisibility() {
  const btnReset = document.getElementById('btnResetFilters');
  if (!btnReset) return;
  const isAnyFilterActive = (
    currentSearch !== '' ||
    currentCategoryFilter !== 'all' ||
    currentStatusFilter !== 'all' ||
    currentAssigneeFilter !== 'all' ||
    currentTimeFilter !== 'all' ||
    currentSectionFilter !== 'all' ||
    currentJobTypeFilter !== 'all' ||
    currentSubJobTypeFilter !== 'all' ||
    currentPriorityFilter !== 'all' ||
    currentSubStatusFilter !== 'all' ||
    currentFactoryFilter !== 'all' ||
    currentDeptFilter !== 'all' ||
    currentProcessFilter !== 'all' ||
    currentDesignSupportFilter !== 'all' ||
    currentMaintSupportFilter !== 'all'
  );
  btnReset.style.display = isAnyFilterActive ? 'inline-flex' : 'none';
}

// --- KPI Statistics ---
function renderStats() {
  const total = achievements.length;
  const done = achievements.filter(a => a.status === 'done').length;
  const inProgress = achievements.filter(a => a.status === 'in_progress').length;
  const wait = achievements.filter(a => a.status === 'wait' || a.status === 'pending').length;
  const cancel = achievements.filter(a => a.status === 'cancel' || a.status === 'cancle').length;

  const setElText = (id, val) => {
    const el = document.getElementById(id);
    if (el) el.textContent = val;
  };

  setElText('statTotalCount', total);
  setElText('statCompletedCount', done);
  setElText('statInProgressCount', inProgress);
  setElText('statWaitCount', wait);
  setElText('statCancelCount', cancel);

  // Mobile quick filter pill badges
  setElText('mobileFilterAllCount', total);
  setElText('mobileFilterDoneCount', done);
  setElText('mobileFilterInProgCount', inProgress);
  setElText('mobileFilterWaitCount', wait);
  setElText('mobileFilterCancelCount', cancel);

  // Hero Showcase Banner status counters
  setElText('bannerTotalCount', total);
  setElText('bannerDoneCount', done);
  setElText('bannerInProgCount', inProgress);
  setElText('bannerWaitCount', wait);
  setElText('bannerCancelCount', cancel);
}

// --- Charts (Chart.js) ---
function renderCharts() {
  if (typeof Chart === 'undefined') return;

  const totalTasks = achievements.length;

  const categoryCounts = {};
  categories.forEach(c => categoryCounts[c.id] = 0);
  achievements.forEach(a => {
    if (categoryCounts[a.categoryId] !== undefined) {
      categoryCounts[a.categoryId]++;
    } else {
      categoryCounts[a.categoryId] = 1;
    }
  });

  const catLabels = [];
  const catData = [];
  const catColors = [];

  categories.forEach(c => {
    const count = categoryCounts[c.id] || 0;
    catLabels.push(c.icon + ' ' + uppercaseEnglish(c.name.split(' (')[0]));
    catData.push(count);
    catColors.push(c.color || '#3b82f6');
  });

  // Doughnut Chart Plugin (Clean Total Count Only, Perfectly Centered to Arc Coordinates across all Browsers & iOS Safari)
  const doughnutCenterTextPlugin = {
    id: 'doughnutCenterText',
    afterDatasetsDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data || !meta.data.length || !meta.data[0]) return;

      const firstArc = meta.data[0];
      const centerX = (firstArc && typeof firstArc.x === 'number') ? firstArc.x : (chart.chartArea ? (chart.chartArea.left + chart.chartArea.right) / 2 : chart.width / 2);
      const centerY = (firstArc && typeof firstArc.y === 'number') ? firstArc.y : (chart.chartArea ? (chart.chartArea.top + chart.chartArea.bottom) / 2 : chart.height / 2);
      const innerRadius = (firstArc && firstArc.innerRadius) ? firstArc.innerRadius : 45;
      const total = chart.data.datasets[0].data.reduce((a, b) => a + (Number(b) || 0), 0);

      const { ctx } = chart;
      ctx.save();

      const isMobile = window.innerWidth <= 768;

      if (isMobile) {
        // On Mobile: Clean, elegant single total count centered perfectly in donut hole without 'งานทั้งหมด'
        const numSize = Math.round(Math.min(28, Math.max(20, innerRadius * 0.52)));
        ctx.font = `800 ${numSize}px 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(`${total}`, centerX, centerY);
      } else {
        // On Desktop: Number + "งานทั้งหมด" label
        const numSize = 26;
        const labelSize = 12;
        const gap = Math.max(3, Math.round(innerRadius * 0.08));

        const totalBlockHeight = numSize + gap + labelSize;
        const numY = centerY - (totalBlockHeight / 2) + (numSize / 2);
        const labelY = centerY + (totalBlockHeight / 2) - (labelSize / 2);

        // 1. Draw Total Number
        ctx.font = `800 ${numSize}px 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#0f172a';
        ctx.fillText(`${total}`, centerX, numY);

        // 2. Draw Thai Label "งานทั้งหมด"
        ctx.font = `600 ${labelSize}px 'Sarabun', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillStyle = '#64748b';
        ctx.fillText("งานทั้งหมด", centerX, labelY);
      }

      ctx.restore();
    }
  };

  const ctxCat = document.getElementById('categoryChart');
  if (ctxCat) {
    if (categoryChartInstance) categoryChartInstance.destroy();
    categoryChartInstance = new Chart(ctxCat, {
      type: 'doughnut',
      data: {
        labels: catLabels,
        datasets: [{
          data: catData,
          backgroundColor: catColors,
          borderWidth: 2,
          borderColor: '#ffffff',
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: window.innerWidth <= 768 ? 'bottom' : 'right',
            labels: {
              boxWidth: window.innerWidth <= 768 ? 10 : 12,
              boxHeight: window.innerWidth <= 768 ? 10 : 12,
              padding: window.innerWidth <= 768 ? 8 : 10,
              color: '#334155',
              font: {
                size: window.innerWidth <= 768 ? 10.5 : 12,
                weight: '600',
                family: "'Inter', 'Sarabun', sans-serif"
              },
              generateLabels(chart) {
                const data = chart.data;
                if (data.labels.length && data.datasets.length) {
                  const dataset = data.datasets[0];
                  const total = dataset.data.reduce((a, b) => a + (Number(b) || 0), 0);
                  return data.labels.map((label, i) => {
                    const val = Number(dataset.data[i]) || 0;
                    const pct = total > 0 ? ((val / total) * 100).toFixed(1) : '0';
                    const fillStyle = Array.isArray(dataset.backgroundColor) ? dataset.backgroundColor[i] : dataset.backgroundColor;
                    return {
                      text: `${label}: ${val} งาน (${pct}%)`,
                      fillStyle: fillStyle,
                      strokeStyle: '#ffffff',
                      lineWidth: 1,
                      hidden: chart.getDataVisibility ? !chart.getDataVisibility(i) : false,
                      index: i
                    };
                  });
                }
                return [];
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#f1f5f9',
            titleFont: { size: 13, weight: '600', family: "'Sarabun', 'Inter', sans-serif" },
            bodyFont: { size: 12, weight: '500', family: "'Sarabun', 'Inter', sans-serif" },
            padding: 10,
            cornerRadius: 6,
            boxPadding: 4,
            callbacks: {
              label: function(context) {
                const value = context.parsed || 0;
                const total = context.dataset.data.reduce((a, b) => a + (Number(b) || 0), 0);
                const percent = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
                return ` สัดส่วน: ${percent}% (${value} งาน)`;
              }
            }
          }
        },
        cutout: window.innerWidth <= 768 ? '69%' : '66%'
      },
      plugins: [doughnutCenterTextPlugin]
    });

    if (typeof document !== 'undefined' && document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (categoryChartInstance) categoryChartInstance.render();
      }).catch(() => {});
    }
  }

  const doneCount = achievements.filter(a => a.status === 'done').length;
  const inProgCount = achievements.filter(a => a.status === 'in_progress').length;
  const waitCount = achievements.filter(a => a.status === 'wait' || a.status === 'pending').length;
  const cancelCount = achievements.filter(a => a.status === 'cancel' || a.status === 'cancle').length;

  // Update Status Summary Pills in Chart Header
  const pillDone = document.getElementById('pillDoneCount');
  if (pillDone) pillDone.textContent = `${doneCount} งาน`;
  const pillInProg = document.getElementById('pillInProgCount');
  if (pillInProg) pillInProg.textContent = `${inProgCount} งาน`;
  const pillWait = document.getElementById('pillWaitCount');
  if (pillWait) pillWait.textContent = `${waitCount} งาน`;
  const pillCancel = document.getElementById('pillCancelCount');
  if (pillCancel) pillCancel.textContent = `${cancelCount} งาน`;

  // Highlight active pill if filtered
  document.querySelectorAll('.status-summary-pill').forEach(p => p.classList.remove('active'));
  if (currentStatusFilter && currentStatusFilter !== 'all') {
    const activeKey = currentStatusFilter === 'cancle' ? 'cancel' : (currentStatusFilter === 'in_progress' ? 'inprog' : currentStatusFilter);
    const activePill = document.querySelector(`.status-summary-pill.pill-${activeKey}`);
    if (activePill) activePill.classList.add('active');
  }

  const isMobile = window.innerWidth <= 768;
  const statusLabels = isMobile
    ? ['DONE', 'IN PROG', 'PENDING', 'CANCEL']
    : ['DONE (สำเร็จแล้ว)', 'IN PROGRESS (กำลังทำ)', 'PENDING (รอดำเนินการ)', 'CANCEL (ยกเลิก)'];
  const statusCounts = [doneCount, inProgCount, waitCount, cancelCount];

  const ctxTrend = document.getElementById('trendChart');
  if (ctxTrend) {
    if (trendChartInstance) trendChartInstance.destroy();
    trendChartInstance = new Chart(ctxTrend, {
      type: 'bar',
      data: {
        labels: statusLabels,
        datasets: [{
          label: 'จำนวนงาน (TASKS)',
          data: statusCounts,
          backgroundColor: ['#10b981', '#0284c7', '#f43f5e', '#94a3b8'],
          borderRadius: 6
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleColor: '#ffffff',
            bodyColor: '#f1f5f9',
            titleFont: { size: 13, weight: '600', family: "'Sarabun', 'Inter', sans-serif" },
            bodyFont: { size: 12, weight: '500', family: "'Sarabun', 'Inter', sans-serif" },
            padding: 10,
            cornerRadius: 6,
            boxPadding: 4,
            callbacks: {
              label: function(context) {
                return ` จำนวนงาน: ${context.parsed.y} งาน`;
              }
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#1e293b',
              maxRotation: 0,
              minRotation: 0,
              font: {
                size: isMobile ? 11 : 12.5,
                weight: '600',
                family: "'Inter', 'Sarabun', sans-serif"
              },
              padding: 6
            },
            grid: {
              display: false
            }
          },
          y: {
            beginAtZero: true,
            grace: '15%',
            ticks: {
              precision: 0,
              color: '#64748b',
              font: {
                size: 12,
                weight: '500',
                family: "'Inter', sans-serif"
              },
              padding: 8
            },
            grid: {
              color: '#f1f5f9',
              drawBorder: false
            }
          }
        }
      }
    });
  }

  renderEngineeringInsightsDashboard();
}

// --- Engineering & Operations Deep-Dive Insights Dashboard ---
const STORAGE_KEY_SHOW_ENG_INSIGHTS = 'orbray_show_eng_insights_v1';
let isEngInsightsVisible = localStorage.getItem(STORAGE_KEY_SHOW_ENG_INSIGHTS) !== 'false';
let engPriorityChartInstance = null;
let engSubJobChartInstance = null;
let engFactoryChartInstance = null;

// Dedicated exact field filters (handles 'ไม่ระบุ (UNSPECIFIED)' via '__UNSPECIFIED__' accurately)
let currentFactoryFilter = 'all';
let currentDeptFilter = 'all';
let currentProcessFilter = 'all';
let currentDesignSupportFilter = 'all';
let currentMaintSupportFilter = 'all';

function toggleEngInsights(forceState) {
  if (typeof forceState === 'boolean') {
    isEngInsightsVisible = forceState;
  } else {
    isEngInsightsVisible = !isEngInsightsVisible;
  }
  localStorage.setItem(STORAGE_KEY_SHOW_ENG_INSIGHTS, isEngInsightsVisible ? 'true' : 'false');
  updateEngInsightsVisibility();
  if (isEngInsightsVisible) {
    renderEngineeringInsightsDashboard();
    showToast('แสดงแดชบอร์ดวิเคราะห์ข้อมูลเชิงลึกเรียบร้อยแล้ว');
  } else {
    showToast('ซ่อนแดชบอร์ดวิเคราะห์ข้อมูลเชิงลึกเรียบร้อยแล้ว');
  }
}

function updateEngInsightsVisibility() {
  const section = document.getElementById('engInsightsSection');
  const btn = document.getElementById('btnToggleEngInsights');
  const btnText = document.getElementById('engInsightsToggleText');

  if (section) {
    if (isEngInsightsVisible) {
      section.classList.remove('is-hidden');
    } else {
      section.classList.add('is-hidden');
    }
  }

  if (btn) {
    if (isEngInsightsVisible) {
      btn.classList.add('btn-active-toggle');
      btn.classList.remove('btn-inactive-toggle');
      if (btnText) btnText.textContent = 'แดชบอร์ดเชิงลึก: แสดง (ON)';
    } else {
      btn.classList.remove('btn-active-toggle');
      btn.classList.add('btn-inactive-toggle');
      if (btnText) btnText.textContent = 'แดชบอร์ดเชิงลึก: ซ่อน (OFF)';
    }
  }
}

function updateEngActiveFilterBanner() {
  const banner = document.getElementById('engActiveFilterBanner');
  const textEl = document.getElementById('engActiveFilterText');
  if (!banner || !textEl) return;

  const activeParts = [];
  if (currentPriorityFilter !== 'all') activeParts.push(`PRIORITY: ${uppercaseEnglish(currentPriorityFilter)}`);
  if (currentSubJobTypeFilter !== 'all') activeParts.push(`SUB JOB: ${uppercaseEnglish(stripLeadingNumberCode(currentSubJobTypeFilter))}`);
  if (currentSubStatusFilter !== 'all') activeParts.push(`SUB STATUS: ${uppercaseEnglish(stripLeadingNumberCode(currentSubStatusFilter))}`);
  if (currentJobTypeFilter !== 'all') activeParts.push(`JOB TYPE: ${uppercaseEnglish(getJobTypeTitle(currentJobTypeFilter))}`);
  if (currentFactoryFilter !== 'all') activeParts.push(`FACTORY: ${currentFactoryFilter === '__UNSPECIFIED__' ? 'ไม่ระบุ (UNSPECIFIED)' : currentFactoryFilter}`);
  if (currentDeptFilter !== 'all') activeParts.push(`DEPARTMENT: ${currentDeptFilter === '__UNSPECIFIED__' ? 'ไม่ระบุ (UNSPECIFIED)' : currentDeptFilter}`);
  if (currentProcessFilter !== 'all') activeParts.push(`PROCESS: ${currentProcessFilter === '__UNSPECIFIED__' ? 'ไม่ระบุ (UNSPECIFIED)' : currentProcessFilter}`);
  if (currentDesignSupportFilter !== 'all') activeParts.push(`DESIGN SUPPORT: ${currentDesignSupportFilter}`);
  if (currentMaintSupportFilter !== 'all') activeParts.push(`MANTENANCE SUPPORT: ${currentMaintSupportFilter}`);

  if (activeParts.length > 0) {
    banner.style.display = 'flex';
    textEl.innerHTML = `ตัวกรองข้อมูลเชิงลึกที่เลือก: <b>${escapeHtml(activeParts.join('  •  '))}</b>`;
  } else {
    banner.style.display = 'none';
  }
}

function filterFromInsightsExcel(type, value, displayLabel) {
  let isClearing = false;
  if (type === 'priority' && currentPriorityFilter === value) isClearing = true;
  if (type === 'subJobType' && currentSubJobTypeFilter === value) isClearing = true;
  if (type === 'subStatus' && currentSubStatusFilter === value) isClearing = true;
  if (type === 'jobType' && currentJobTypeFilter === value) isClearing = true;

  // Clear other field filters when clicking a new filter so user never gets 0 results from conflicting filters
  if (!isClearing) {
    currentFactoryFilter = 'all';
    currentDeptFilter = 'all';
    currentProcessFilter = 'all';
    currentDesignSupportFilter = 'all';
    currentMaintSupportFilter = 'all';
    if (type !== 'priority') currentPriorityFilter = 'all';
    if (type !== 'subJobType') currentSubJobTypeFilter = 'all';
    if (type !== 'subStatus') currentSubStatusFilter = 'all';
    if (type !== 'jobType') currentJobTypeFilter = 'all';
  }

  const nextVal = isClearing ? 'all' : value;
  setExcelFilter(type, nextVal);
  renderEngineeringInsightsDashboard();

  if (isClearing) {
    showToast('ยกเลิกตัวกรองแล้ว (แสดงงานทั้งหมด)');
  } else {
    showToast(`กรองข้อมูล: ${displayLabel || value}`);
    if (window.innerWidth <= 768) {
      switchMobileNavTab('tasks');
    } else {
      const controlsBar = document.querySelector('.controls-bar');
      if (controlsBar) controlsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function filterFromInsightsField(fieldType, rawValue, displayLabel) {
  let isClearing = false;
  if (fieldType === 'factory' && currentFactoryFilter === rawValue) isClearing = true;
  if (fieldType === 'department' && currentDeptFilter === rawValue) isClearing = true;
  if (fieldType === 'process' && currentProcessFilter === rawValue) isClearing = true;
  if (fieldType === 'designSupport' && currentDesignSupportFilter === rawValue) isClearing = true;
  if (fieldType === 'maintSupport' && currentMaintSupportFilter === rawValue) isClearing = true;

  // Clear conflicting insights filters so clicking a category always shows the exact count on the card
  currentPriorityFilter = 'all';
  currentSubJobTypeFilter = 'all';
  currentSubStatusFilter = 'all';
  currentJobTypeFilter = 'all';
  currentFactoryFilter = 'all';
  currentDeptFilter = 'all';
  currentProcessFilter = 'all';
  currentDesignSupportFilter = 'all';
  currentMaintSupportFilter = 'all';

  // Also clear text search if it previously had UNSPECIFIED or other text
  if (currentSearch) {
    currentSearch = '';
    const searchInput = document.getElementById('searchInput');
    if (searchInput) searchInput.value = '';
  }

  if (!isClearing) {
    if (fieldType === 'factory') currentFactoryFilter = rawValue;
    if (fieldType === 'department') currentDeptFilter = rawValue;
    if (fieldType === 'process') currentProcessFilter = rawValue;
    if (fieldType === 'designSupport') currentDesignSupportFilter = rawValue;
    if (fieldType === 'maintSupport') currentMaintSupportFilter = rawValue;
  }

  updateResetFilterButtonVisibility();
  renderContent();
  renderEngineeringInsightsDashboard();
  renderRequesterRanking();

  if (isClearing) {
    showToast('ยกเลิกการกรองแล้ว (แสดงงานทั้งหมด)');
  } else {
    showToast(`กรองเฉพาะ: ${displayLabel}`);
    if (window.innerWidth <= 768) {
      switchMobileNavTab('tasks');
    } else {
      const controlsBar = document.querySelector('.controls-bar');
      if (controlsBar) controlsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function createMiniCenterTextPlugin(labelSubtext) {
  return {
    id: 'miniDoughnutCenter',
    afterDatasetsDraw(chart) {
      const meta = chart.getDatasetMeta(0);
      if (!meta || !meta.data || !meta.data.length || !meta.data[0]) return;
      const firstArc = meta.data[0];
      const cx = typeof firstArc.x === 'number' ? firstArc.x : chart.width / 2;
      const cy = typeof firstArc.y === 'number' ? firstArc.y : chart.height / 2;
      const total = chart.data.datasets[0].data.reduce((a, b) => a + (Number(b) || 0), 0);
      const { ctx } = chart;
      ctx.save();
      ctx.font = "800 18px 'Inter', 'Sarabun', sans-serif";
      ctx.fillStyle = '#0f172a';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(`${total}`, cx, cy - 5);
      ctx.font = "600 10px 'Sarabun', 'Inter', sans-serif";
      ctx.fillStyle = '#64748b';
      ctx.fillText(labelSubtext || 'งานทั้งหมด', cx, cy + 10);
      ctx.restore();
    }
  };
}

function renderEngineeringInsightsDashboard() {
  updateEngInsightsVisibility();
  updateEngActiveFilterBanner();
  const section = document.getElementById('engInsightsSection');
  if (!section || !isEngInsightsVisible) return;

  const totalTasks = achievements.length;

  // Data aggregation maps
  const priMap = {
    'Super High': { key: 'Super High', label: 'SUPER HIGH', sub: 'ด่วนพิเศษ', count: 0, color: '#7c3aed' },
    'High':       { key: 'High',       label: 'HIGH',       sub: 'สูง', count: 0, color: '#dc2626' },
    'Medium':     { key: 'Medium',     label: 'MEDIUM',     sub: 'ปานกลาง', count: 0, color: '#2563eb' },
    'Low':        { key: 'Low',        label: 'LOW',        sub: 'ทั่วไป', count: 0, color: '#10b981' }
  };

  const subJobMap = {
    '01 In-house':  { key: '01 In-house',  label: 'IN-HOUSE',  sub: 'ทำเองภายใน', count: 0, color: '#0284c7' },
    '02 Outsource': { key: '02 Outsource', label: 'OUTSOURCE', sub: 'สั่งทำภายนอก', count: 0, color: '#d97706' },
    'All':          { key: 'All',          label: 'ALL (BOTH)', sub: 'ทำเอง + สั่งนอก', count: 0, color: '#6366f1' }
  };

  const factoryMap = {};
  const deptMap = {};
  const processMap = {};
  const subStatusMap = {};
  const jobTypeMap = {};

  // Pre-seed Design Support & Maintenance Support members
  const designSupMembers = ['SUTTHIPONG M.', 'NARUEBODEE C.'];
  const maintSupMembers = ['NANTHAPONG S.', 'NAWAPON M.', 'SARAWUT I.', 'SUTTHINAN K.', 'VORAVIT C.'];

  const designSupMap = {};
  designSupMembers.forEach(m => {
    designSupMap[m] = { name: m, role: 'DSN', count: 0, done: 0, in_progress: 0, wait: 0, cancel: 0 };
  });

  const maintSupMap = {};
  maintSupMembers.forEach(m => {
    maintSupMap[m] = { name: m, role: 'MTN', count: 0, done: 0, in_progress: 0, wait: 0, cancel: 0 };
  });

  let totalAchvScore = 0;
  let tasksWithDesignSup = 0;
  let tasksWithMaintSup = 0;

  achievements.forEach(item => {
    const xl = getTaskExcelTracking(item);
    const st = item.status || 'wait';
    totalAchvScore += (Number(xl.achievement) || 0);

    // 1. Priority
    const pKey = priMap[xl.priority] ? xl.priority : 'Medium';
    priMap[pKey].count++;

    // 2. Sub Job Type
    const sjKey = subJobMap[xl.subJobType] ? xl.subJobType : '01 In-house';
    subJobMap[sjKey].count++;

    // 3. Factory
    const rawFac = uppercaseEnglish((item.factory || '').trim());
    const facKey = (!rawFac || rawFac === '-') ? '__UNSPECIFIED__' : rawFac;
    const facLabel = facKey === '__UNSPECIFIED__' ? 'ไม่ระบุ (UNSPECIFIED)' : rawFac;
    if (!factoryMap[facKey]) factoryMap[facKey] = { rawKey: facKey, name: facLabel, count: 0, done: 0, in_progress: 0, wait: 0, cancel: 0 };
    factoryMap[facKey].count++;
    if (st === 'done') factoryMap[facKey].done++;
    else if (st === 'in_progress') factoryMap[facKey].in_progress++;
    else if (st === 'cancel' || st === 'cancle') factoryMap[facKey].cancel++;
    else factoryMap[facKey].wait++;

    // 4. Department
    const rawDept = uppercaseEnglish((item.department || '').trim());
    const deptKey = (!rawDept || rawDept === '-') ? '__UNSPECIFIED__' : rawDept;
    const deptLabel = deptKey === '__UNSPECIFIED__' ? 'ไม่ระบุ (UNSPECIFIED)' : rawDept;
    if (!deptMap[deptKey]) deptMap[deptKey] = { rawKey: deptKey, name: deptLabel, count: 0, done: 0, in_progress: 0, wait: 0, cancel: 0 };
    deptMap[deptKey].count++;
    if (st === 'done') deptMap[deptKey].done++;
    else if (st === 'in_progress') deptMap[deptKey].in_progress++;
    else if (st === 'cancel' || st === 'cancle') deptMap[deptKey].cancel++;
    else deptMap[deptKey].wait++;

    // 5. Process
    const rawProc = uppercaseEnglish((item.process || '').trim());
    const procKey = (!rawProc || rawProc === '-') ? '__UNSPECIFIED__' : rawProc;
    const procLabel = procKey === '__UNSPECIFIED__' ? 'ไม่ระบุ (UNSPECIFIED)' : rawProc;
    if (!processMap[procKey]) processMap[procKey] = { rawKey: procKey, name: procLabel, count: 0, done: 0, in_progress: 0, wait: 0, cancel: 0 };
    processMap[procKey].count++;
    if (st === 'done') processMap[procKey].done++;
    else if (st === 'in_progress') processMap[procKey].in_progress++;
    else if (st === 'cancel' || st === 'cancle') processMap[procKey].cancel++;
    else processMap[procKey].wait++;

    // 6. Sub Status
    const rawSubSt = xl.subStatus || '02 Concept Design';
    const cleanSubSt = uppercaseEnglish(stripLeadingNumberCode(rawSubSt));
    const weightPct = Math.round((SUB_STATUS_ACHIEVEMENT_MAP[rawSubSt] !== undefined ? SUB_STATUS_ACHIEVEMENT_MAP[rawSubSt] : xl.achievement) * 100);
    if (!subStatusMap[rawSubSt]) {
      subStatusMap[rawSubSt] = { rawKey: rawSubSt, label: cleanSubSt, weightPct: weightPct, count: 0 };
    }
    subStatusMap[rawSubSt].count++;

    // 7. Job Type
    const jtCode = (xl.jobType && xl.jobType !== '-') ? xl.jobType : 'D';
    const jtFull = uppercaseEnglish(getJobTypeTitle(jtCode));
    if (!jobTypeMap[jtCode]) {
      jobTypeMap[jtCode] = { code: jtCode, label: jtFull, count: 0 };
    }
    jobTypeMap[jtCode].count++;

    // 8. Design Support (slots 1-2)
    const dList = [xl.designSupport1, xl.designSupport2].filter(Boolean);
    if (dList.length > 0) tasksWithDesignSup++;
    dList.forEach(name => {
      if (!designSupMap[name]) {
        designSupMap[name] = { name, role: 'DSN', count: 0, done: 0, in_progress: 0, wait: 0, cancel: 0 };
      }
      designSupMap[name].count++;
      if (st === 'done') designSupMap[name].done++;
      else if (st === 'in_progress') designSupMap[name].in_progress++;
      else if (st === 'cancel' || st === 'cancle') designSupMap[name].cancel++;
      else designSupMap[name].wait++;
    });

    // 9. Maintenance Support (slots 1-5)
    const mList = [
      xl.maintenanceSupport1,
      xl.maintenanceSupport2,
      xl.maintenanceSupport3,
      xl.maintenanceSupport4,
      xl.maintenanceSupport5
    ].filter(Boolean);
    if (mList.length > 0) tasksWithMaintSup++;
    mList.forEach(name => {
      if (!maintSupMap[name]) {
        maintSupMap[name] = { name, role: 'MTN', count: 0, done: 0, in_progress: 0, wait: 0, cancel: 0 };
      }
      maintSupMap[name].count++;
      if (st === 'done') maintSupMap[name].done++;
      else if (st === 'in_progress') maintSupMap[name].in_progress++;
      else if (st === 'cancel' || st === 'cancle') maintSupMap[name].cancel++;
      else maintSupMap[name].wait++;
    });
  });

  // --- PANEL 1: PRIORITY / JOB LV. ---
  const priItems = Object.values(priMap);
  const priListEl = document.getElementById('engPriorityList');
  if (priListEl) {
    priListEl.innerHTML = priItems.map(p => {
      const pct = totalTasks > 0 ? ((p.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = currentPriorityFilter === p.key;
      return `
        <div class="eng-flat-row ${isAct ? 'active' : ''}" onclick="filterFromInsightsExcel('priority', '${p.key}', 'PRIORITY: ${p.label}')" title="คลิกเพื่อกรองความสำคัญ: ${p.label}">
          <div class="eng-flat-row-top">
            <span class="eng-flat-name">
              <span class="eng-dot" style="background:${p.color};"></span>
              <span>${p.label}</span>
            </span>
            <span class="eng-flat-val"><b>${p.count}</b> งาน <span class="eng-flat-pct">${pct}%</span></span>
          </div>
          <div class="eng-flat-track">
            <div class="eng-flat-fill" style="width:${pct}%; background:${p.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }
  const ctxPri = document.getElementById('engPriorityChart');
  if (ctxPri && typeof Chart !== 'undefined') {
    if (engPriorityChartInstance) engPriorityChartInstance.destroy();
    engPriorityChartInstance = new Chart(ctxPri, {
      type: 'doughnut',
      data: {
        labels: priItems.map(p => p.label),
        datasets: [{
          data: priItems.map(p => p.count),
          backgroundColor: priItems.map(p => p.color),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { display: false } }
      },
      plugins: [createMiniCenterTextPlugin('งานทั้งหมด')]
    });
  }

  // --- PANEL 2: SUB JOB TYPE ---
  const sjItems = Object.values(subJobMap);
  const sjListEl = document.getElementById('engSubJobList');
  if (sjListEl) {
    sjListEl.innerHTML = sjItems.map(sj => {
      const pct = totalTasks > 0 ? ((sj.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = currentSubJobTypeFilter === sj.key;
      return `
        <div class="eng-flat-row ${isAct ? 'active' : ''}" onclick="filterFromInsightsExcel('subJobType', '${sj.key}', 'SUB JOB: ${sj.label}')" title="คลิกเพื่อกรองรูปแบบ: ${sj.label} (${sj.sub})">
          <div class="eng-flat-row-top">
            <span class="eng-flat-name">
              <span class="eng-dot" style="background:${sj.color};"></span>
              <span>${sj.label} <small>${sj.sub}</small></span>
            </span>
            <span class="eng-flat-val"><b>${sj.count}</b> งาน <span class="eng-flat-pct">${pct}%</span></span>
          </div>
          <div class="eng-flat-track">
            <div class="eng-flat-fill" style="width:${pct}%; background:${sj.color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }
  const ctxSj = document.getElementById('engSubJobChart');
  if (ctxSj && typeof Chart !== 'undefined') {
    if (engSubJobChartInstance) engSubJobChartInstance.destroy();
    engSubJobChartInstance = new Chart(ctxSj, {
      type: 'doughnut',
      data: {
        labels: sjItems.map(s => s.label),
        datasets: [{
          data: sjItems.map(s => s.count),
          backgroundColor: sjItems.map(s => s.color),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { display: false } }
      },
      plugins: [createMiniCenterTextPlugin('งานทั้งหมด')]
    });
  }

  // --- PANEL 3: FACTORY ---
  const facPalette = ['#1d4ed8', '#059669', '#d97706', '#0284c7', '#64748b', '#475569'];
  const facItems = Object.values(factoryMap).sort((a, b) => {
    if (a.rawKey === '__UNSPECIFIED__') return 1;
    if (b.rawKey === '__UNSPECIFIED__') return -1;
    return b.count - a.count || a.name.localeCompare(b.name);
  });
  const facBadge = document.getElementById('engFactoryBadge');
  if (facBadge) facBadge.textContent = `${facItems.length} รายการ`;

  const facListEl = document.getElementById('engFactoryList');
  if (facListEl) {
    facListEl.innerHTML = facItems.map((f, idx) => {
      const color = f.rawKey === '__UNSPECIFIED__' ? '#94a3b8' : facPalette[idx % facPalette.length];
      const pct = totalTasks > 0 ? ((f.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = currentFactoryFilter === f.rawKey;
      return `
        <div class="eng-flat-row ${isAct ? 'active' : ''}" onclick="filterFromInsightsField('factory', '${escapeHtml(f.rawKey).replace(/'/g, "\\'")}', 'FACTORY: ${escapeHtml(f.name).replace(/'/g, "\\'")}')" title="คลิกเพื่อกรองโรงงาน: ${escapeHtml(f.name)}">
          <div class="eng-flat-row-top">
            <span class="eng-flat-name">
              <span class="eng-dot" style="background:${color};"></span>
              <span>${escapeHtml(f.name)}</span>
            </span>
            <span class="eng-flat-val"><b>${f.count}</b> งาน <span class="eng-flat-pct">${pct}%</span></span>
          </div>
          <div class="eng-flat-track">
            <div class="eng-flat-fill" style="width:${pct}%; background:${color};"></div>
          </div>
        </div>
      `;
    }).join('');
  }
  const ctxFac = document.getElementById('engFactoryChart');
  if (ctxFac && typeof Chart !== 'undefined') {
    if (engFactoryChartInstance) engFactoryChartInstance.destroy();
    engFactoryChartInstance = new Chart(ctxFac, {
      type: 'doughnut',
      data: {
        labels: facItems.map(f => f.name),
        datasets: [{
          data: facItems.map(f => f.count),
          backgroundColor: facItems.map((f, idx) => f.rawKey === '__UNSPECIFIED__' ? '#94a3b8' : facPalette[idx % facPalette.length]),
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '68%',
        plugins: { legend: { display: false } }
      },
      plugins: [createMiniCenterTextPlugin('งานทั้งหมด')]
    });
  }

  // --- PANEL 4 & 5: DESIGN SUPPORT (%) & MAINTENANCE SUPPORT (%) (Clean Corporate Data Table) ---
  const renderSupportTeamTable = (itemsMap, containerId, badgeId, totalTasksSupported, fieldType, accentColor) => {
    const list = Object.values(itemsMap).sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
    const totalParticipations = list.reduce((sum, m) => sum + m.count, 0);
    const badgeEl = document.getElementById(badgeId);
    if (badgeEl) {
      const taskCoveragePct = totalTasks > 0 ? ((totalTasksSupported / totalTasks) * 100).toFixed(1) : '0.0';
      badgeEl.textContent = `ซัพพอร์ตรวม ${totalParticipations} งาน (${taskCoveragePct}% ของทั้งหมด)`;
    }

    const containerEl = document.getElementById(containerId);
    if (!containerEl) return;

    const rowsHtml = list.map(m => {
      const shareOfTeamPct = totalParticipations > 0 ? ((m.count / totalParticipations) * 100).toFixed(1) : '0.0';
      const shareOfAllTasksPct = totalTasks > 0 ? ((m.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = (fieldType === 'designSupport' && currentDesignSupportFilter === m.name) ||
                    (fieldType === 'maintSupport' && currentMaintSupportFilter === m.name);

      return `
        <tr class="eng-sup-tr ${isAct ? 'active' : ''}" onclick="filterFromInsightsField('${fieldType}', '${escapeHtml(m.name).replace(/'/g, "\\'")}', '${fieldType === 'designSupport' ? 'DESIGN SUPPORT' : 'MANTENANCE SUPPORT'}: ${escapeHtml(m.name)}')" title="คลิกเพื่อกรองงานที่ซัพพอร์ตโดย: ${escapeHtml(m.name)}">
          <td class="sup-td-name">
            <span class="sup-member-name">${escapeHtml(m.name)}</span>
          </td>
          <td class="sup-td-status">
            <span class="sup-mini-stat">DONE <b>${m.done}</b></span>
            <span class="sup-mini-sep">·</span>
            <span class="sup-mini-stat">PROG <b>${m.in_progress}</b></span>
            <span class="sup-mini-sep">·</span>
            <span class="sup-mini-stat">PEND <b>${m.wait}</b></span>
          </td>
          <td class="sup-td-count">
            <b>${m.count}</b> งาน <span class="sup-all-pct">(${shareOfAllTasksPct}%)</span>
          </td>
          <td class="sup-td-bar">
            <div class="sup-inline-bar-wrap">
              <div class="sup-inline-bar-track">
                <div class="sup-inline-bar-fill" style="width:${shareOfTeamPct}%; background:${accentColor};"></div>
              </div>
              <span class="sup-team-pct" style="color:${m.count > 0 ? accentColor : '#94a3b8'};">${shareOfTeamPct}%</span>
            </div>
          </td>
        </tr>
      `;
    }).join('');

    containerEl.innerHTML = `
      <table class="eng-support-table">
        <thead>
          <tr>
            <th>รายชื่อผู้สนับสนุน (MEMBER)</th>
            <th>สถานะงาน</th>
            <th style="text-align:right;">จำนวน (% ทั้งหมด)</th>
            <th style="text-align:right; width: 150px;">สัดส่วนในทีม (%)</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
    `;
  };

  renderSupportTeamTable(designSupMap, 'engDesignSupportContainer', 'engDesignSupBadge', tasksWithDesignSup, 'designSupport', '#1d4ed8');
  renderSupportTeamTable(maintSupMap, 'engMaintSupportContainer', 'engMaintSupBadge', tasksWithMaintSup, 'maintSupport', '#0f766e');

  // --- PANEL 6: SUB STATUS (ขั้นตอนย่อย) ---
  const avgAchvPct = totalTasks > 0 ? ((totalAchvScore / totalTasks) * 100).toFixed(1) : '0.0';
  const subStatusBadge = document.getElementById('engSubStatusBadge');
  if (subStatusBadge) subStatusBadge.textContent = `ACHV ${totalAchvScore.toFixed(1)} / ${totalTasks} (${avgAchvPct}%)`;

  const subStatusList = Object.values(subStatusMap).sort((a, b) => b.count - a.count || b.weightPct - a.weightPct);
  const subStatusContainer = document.getElementById('engSubStatusContainer');
  if (subStatusContainer) {
    subStatusContainer.innerHTML = subStatusList.map(stItem => {
      const pct = totalTasks > 0 ? ((stItem.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = currentSubStatusFilter === stItem.rawKey;
      let barColor = '#2563eb';
      if (stItem.rawKey === '10 Finished') barColor = '#10b981';
      else if (stItem.rawKey === 'Cancel') barColor = '#94a3b8';
      else if (stItem.rawKey === 'Pending' || stItem.rawKey === '00 Not Start') barColor = '#f59e0b';

      return `
        <div class="eng-line-row ${isAct ? 'active' : ''}" onclick="filterFromInsightsExcel('subStatus', '${escapeHtml(stItem.rawKey)}', 'SUB STATUS: ${escapeHtml(stItem.label)}')" title="คลิกเพื่อกรองขั้นตอนย่อย: ${escapeHtml(stItem.label)}">
          <div class="eng-line-left">
            <span class="eng-line-title">${escapeHtml(stItem.label)}</span>
            <span class="eng-line-sub">(${stItem.weightPct}%)</span>
          </div>
          <div class="eng-line-bar-col">
            <div class="eng-line-track">
              <div class="eng-line-fill" style="width:${pct}%; background:${barColor};"></div>
            </div>
          </div>
          <div class="eng-line-right">
            <b>${stItem.count}</b> งาน <span class="eng-line-pct">${pct}%</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- PANEL 7: JOB TYPE (ประเภทงานวิศวกรรม) ---
  const jobTypeList = Object.values(jobTypeMap).sort((a, b) => b.count - a.count || a.code.localeCompare(b.code));
  const jobTypeBadge = document.getElementById('engJobTypeBadge');
  if (jobTypeBadge) jobTypeBadge.textContent = `${jobTypeList.length} ประเภทงาน`;

  const jobTypeContainer = document.getElementById('engJobTypeContainer');
  if (jobTypeContainer) {
    jobTypeContainer.innerHTML = jobTypeList.map(jt => {
      const pct = totalTasks > 0 ? ((jt.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = currentJobTypeFilter === jt.code;
      return `
        <div class="eng-line-row ${isAct ? 'active' : ''}" onclick="filterFromInsightsExcel('jobType', '${escapeHtml(jt.code)}', 'JOB TYPE: ${escapeHtml(jt.label)}')" title="คลิกเพื่อกรองประเภทงาน: ${escapeHtml(jt.label)}">
          <div class="eng-line-left">
            <span class="eng-code-tag">${escapeHtml(jt.code)}</span>
            <span class="eng-line-title">${escapeHtml(jt.label)}</span>
          </div>
          <div class="eng-line-bar-col">
            <div class="eng-line-track">
              <div class="eng-line-fill" style="width:${pct}%; background:#2563eb;"></div>
            </div>
          </div>
          <div class="eng-line-right">
            <b>${jt.count}</b> งาน <span class="eng-line-pct">${pct}%</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- PANEL 8: DEPARTMENT (แผนกที่ร้องขอ) ---
  const deptList = Object.values(deptMap).sort((a, b) => {
    if (a.rawKey === '__UNSPECIFIED__') return 1;
    if (b.rawKey === '__UNSPECIFIED__') return -1;
    return b.count - a.count || a.name.localeCompare(b.name);
  });
  const deptBadge = document.getElementById('engDeptBadge');
  if (deptBadge) deptBadge.textContent = `${deptList.length} แผนก`;

  const deptContainer = document.getElementById('engDeptContainer');
  if (deptContainer) {
    deptContainer.innerHTML = deptList.map(d => {
      const pct = totalTasks > 0 ? ((d.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = currentDeptFilter === d.rawKey;
      const barColor = d.rawKey === '__UNSPECIFIED__' ? '#94a3b8' : '#0284c7';
      return `
        <div class="eng-line-row ${isAct ? 'active' : ''}" onclick="filterFromInsightsField('department', '${escapeHtml(d.rawKey).replace(/'/g, "\\'")}', 'DEPARTMENT: ${escapeHtml(d.name).replace(/'/g, "\\'")}')" title="คลิกเพื่อกรองแผนก: ${escapeHtml(d.name)} (DONE ${d.done} | PROG ${d.in_progress} | PEND ${d.wait})">
          <div class="eng-line-left">
            <span class="eng-line-title">${escapeHtml(d.name)}</span>
          </div>
          <div class="eng-line-bar-col">
            <div class="eng-line-track">
              <div class="eng-line-fill" style="width:${pct}%; background:${barColor};"></div>
            </div>
          </div>
          <div class="eng-line-right">
            <b>${d.count}</b> งาน <span class="eng-line-pct">${pct}%</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // --- PANEL 9: PROCESS (กระบวนการผลิต) ---
  const procList = Object.values(processMap).sort((a, b) => {
    if (a.rawKey === '__UNSPECIFIED__') return 1;
    if (b.rawKey === '__UNSPECIFIED__') return -1;
    return b.count - a.count || a.name.localeCompare(b.name);
  });
  const procBadge = document.getElementById('engProcessBadge');
  if (procBadge) procBadge.textContent = `${procList.length} กระบวนการ`;

  const procContainer = document.getElementById('engProcessContainer');
  if (procContainer) {
    procContainer.innerHTML = procList.map(pr => {
      const pct = totalTasks > 0 ? ((pr.count / totalTasks) * 100).toFixed(1) : '0.0';
      const isAct = currentProcessFilter === pr.rawKey;
      const barColor = pr.rawKey === '__UNSPECIFIED__' ? '#94a3b8' : '#0f766e';
      return `
        <div class="eng-line-row ${isAct ? 'active' : ''}" onclick="filterFromInsightsField('process', '${escapeHtml(pr.rawKey).replace(/'/g, "\\'")}', 'PROCESS: ${escapeHtml(pr.name).replace(/'/g, "\\'")}')" title="คลิกเพื่อกรองกระบวนการ: ${escapeHtml(pr.name)} (DONE ${pr.done} | PROG ${pr.in_progress} | PEND ${pr.wait})">
          <div class="eng-line-left">
            <span class="eng-line-title">${escapeHtml(pr.name)}</span>
          </div>
          <div class="eng-line-bar-col">
            <div class="eng-line-track">
              <div class="eng-line-fill" style="width:${pct}%; background:${barColor};"></div>
            </div>
          </div>
          <div class="eng-line-right">
            <b>${pr.count}</b> งาน <span class="eng-line-pct">${pct}%</span>
          </div>
        </div>
      `;
    }).join('');
  }
}

// Filter tasks directly by clicking status summary pill
function filterByStatusPill(status) {
  const statusFilter = document.getElementById('statusFilter');
  if (currentStatusFilter === status && status !== 'all') {
    currentStatusFilter = 'all';
    if (statusFilter) statusFilter.value = 'all';
    showToast('แสดงงานทุกสถานะ');
  } else {
    currentStatusFilter = status;
    if (statusFilter) statusFilter.value = status;
    const statusTitles = {
      all: 'งานทั้งหมด (ALL)',
      done: 'DONE (สำเร็จแล้ว)',
      in_progress: 'IN PROGRESS (กำลังทำ)',
      wait: 'PENDING (รอดำเนินการ)',
      pending: 'PENDING (รอดำเนินการ)',
      cancel: 'CANCEL (ยกเลิก)'
    };
    showToast(`กรองเฉพาะสถานะ: ${statusTitles[status] || status.toUpperCase()}`);
  }

  // Update active state on hero banner pills
  document.querySelectorAll('.hero-status-pill').forEach(p => p.classList.remove('active'));
  const activeHeroKey = currentStatusFilter === 'in_progress' ? 'inprog' : (currentStatusFilter === 'cancle' ? 'cancel' : currentStatusFilter);
  const activeHeroPill = document.querySelector(`.hero-status-pill.pill-${activeHeroKey}`);
  if (activeHeroPill) activeHeroPill.classList.add('active');

  renderContent();
  renderCharts();
  if (window.innerWidth <= 768) {
    switchMobileNavTab('tasks');
  } else {
    const controlsBar = document.querySelector('.controls-bar');
    if (controlsBar) {
      controlsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// --- Requester Ranking Leaderboard ---
function toggleRequesterRanking(forceState) {
  if (typeof forceState === 'boolean') {
    isRequesterRankingVisible = forceState;
  } else {
    isRequesterRankingVisible = !isRequesterRankingVisible;
  }
  localStorage.setItem(STORAGE_KEY_SHOW_RANKING, isRequesterRankingVisible ? 'true' : 'false');
  updateRequesterRankingVisibility();
  if (isRequesterRankingVisible) {
    renderRequesterRanking();
    showToast('แสดงอันดับ REQUEST NAME เรียบร้อยแล้ว');
  } else {
    showToast('ซ่อนอันดับ REQUEST NAME เรียบร้อยแล้ว');
  }
}

function updateRequesterRankingVisibility() {
  const section = document.getElementById('requesterRankingSection');
  const btn = document.getElementById('btnToggleRequesterRanking');
  const btnText = document.getElementById('rankingToggleText');
  const btnIcon = document.getElementById('rankingToggleIcon');

  if (section) {
    if (isRequesterRankingVisible) {
      section.classList.remove('is-hidden');
    } else {
      section.classList.add('is-hidden');
    }
  }

  if (btn) {
    if (isRequesterRankingVisible) {
      btn.classList.add('btn-active-toggle');
      btn.classList.remove('btn-inactive-toggle');
      if (btnText) btnText.textContent = 'อันดับผู้ร้องขอ: แสดง (ON)';
      if (btnIcon) btnIcon.textContent = '🏆';
      btn.title = 'คลิกเพื่อซ่อนอันดับผู้ร้องขอ (HIDE)';
    } else {
      btn.classList.remove('btn-active-toggle');
      btn.classList.add('btn-inactive-toggle');
      if (btnText) btnText.textContent = 'แสดงอันดับผู้ร้องขอ (OFF)';
      if (btnIcon) btnIcon.textContent = '🏆';
      btn.title = 'คลิกเพื่อแสดงอันดับผู้ร้องขอ (SHOW)';
    }
  }
}

function toggleRankingExpand() {
  isRankingExpanded = !isRankingExpanded;
  renderRequesterRanking();
}

function filterByRequester(name) {
  const searchInput = document.getElementById('searchInput');
  if (!searchInput) return;

  const currentVal = (searchInput.value || '').trim().toLowerCase();
  const targetVal = (name || '').trim().toLowerCase();

  if (currentVal === targetVal) {
    // If clicked again, clear filter
    searchInput.value = '';
    currentSearch = '';
    showToast('ยกเลิกการกรองผู้ร้องขอ');
  } else {
    searchInput.value = name;
    currentSearch = targetVal;
    showToast(`กรองเฉพาะงานของ: ${name}`);
  }

  renderContent();
  renderRequesterRanking();

  if (window.innerWidth <= 768) {
    switchMobileNavTab('tasks');
  } else {
    const controlsBar = document.querySelector('.controls-bar');
    if (controlsBar) {
      controlsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

function renderRequesterRanking() {
  const container = document.getElementById('requesterRankingContainer');
  if (!container) return;

  const totalTasks = achievements.length;
  if (totalTasks === 0) {
    container.innerHTML = '<div class="ranking-empty">ยังไม่มีข้อมูลคำร้องของาน</div>';
    const badge = document.getElementById('rankingBadgeCount');
    if (badge) badge.textContent = '0 คน';
    return;
  }

  // Aggregate by requester name
  const map = {};
  achievements.forEach(item => {
    let raw = (item.requestName || '').trim();
    if (!raw) raw = 'ไม่ระบุชื่อ (UNSPECIFIED)';
    const name = uppercaseEnglish(raw);

    if (!map[name]) {
      map[name] = {
        name: name,
        total: 0,
        done: 0,
        in_progress: 0,
        wait: 0,
        cancel: 0,
        departments: new Set(),
        factories: new Set()
      };
    }

    map[name].total++;
    const st = item.status || 'wait';
    if (st === 'done') map[name].done++;
    else if (st === 'in_progress') map[name].in_progress++;
    else if (st === 'cancel' || st === 'cancle') map[name].cancel++;
    else map[name].wait++;

    if (item.department) map[name].departments.add(uppercaseEnglish(item.department.trim()));
    if (item.factory) map[name].factories.add(uppercaseEnglish(item.factory.trim()));
  });

  const requesters = Object.values(map);
  requesters.sort((a, b) => {
    if (b.total !== a.total) return b.total - a.total;
    if (b.done !== a.done) return b.done - a.done;
    return a.name.localeCompare(b.name, 'th');
  });

  // Update total count badge
  const badge = document.getElementById('rankingBadgeCount');
  if (badge) badge.textContent = `${requesters.length} คน`;

  // Update Expand/Collapse button
  const btnExpand = document.getElementById('btnToggleRankingExpand');
  const expandText = document.getElementById('rankingExpandText');
  if (btnExpand && expandText) {
    if (requesters.length <= 5) {
      btnExpand.style.display = 'none';
    } else {
      btnExpand.style.display = 'inline-flex';
      expandText.textContent = isRankingExpanded 
        ? 'ย่อเหลือ 5 อันดับแรก (TOP 5)' 
        : `ดูทั้งหมด (${requesters.length} คน) (VIEW ALL)`;
    }
  }

  // Determine displayed list
  const displayList = isRankingExpanded ? requesters : requesters.slice(0, 5);

  let html = '';
  displayList.forEach((r, idx) => {
    const rank = idx + 1;
    let rankBadgeClass = 'rank-other';
    let rankText = `#${rank}`;
    if (rank === 1) {
      rankBadgeClass = 'rank-1';
      rankText = 'TOP 1';
    } else if (rank === 2) {
      rankBadgeClass = 'rank-2';
      rankText = 'TOP 2';
    } else if (rank === 3) {
      rankBadgeClass = 'rank-3';
      rankText = 'TOP 3';
    }

    const pct = ((r.total / totalTasks) * 100).toFixed(1);
    const donePct = ((r.done / r.total) * 100).toFixed(1);
    const inProgPct = ((r.in_progress / r.total) * 100).toFixed(1);
    const waitPct = ((r.wait / r.total) * 100).toFixed(1);
    const cancelPct = ((r.cancel / r.total) * 100).toFixed(1);

    const metaParts = [];
    if (r.departments.size > 0) metaParts.push(Array.from(r.departments).join(', '));
    if (r.factories.size > 0) metaParts.push(Array.from(r.factories).join(', '));
    const metaText = metaParts.length > 0 ? metaParts.join(' • ') : 'ACHIEVEMENT RECORD';

    const isActive = currentSearch && (currentSearch.toLowerCase() === r.name.toLowerCase());

    html += `
      <div class="ranking-card ${rankBadgeClass} ${isActive ? 'active' : ''}" 
           onclick="filterByRequester('${escapeHtml(r.name).replace(/'/g, "\\'")}')" 
           title="คลิกเพื่อกรองเฉพาะงานของ: ${escapeHtml(r.name)}">
        <div class="ranking-card-top">
          <span class="ranking-badge-pill ${rankBadgeClass}">${rankText}</span>
          <div class="ranking-user-info">
            <div class="ranking-name" title="${escapeHtml(r.name)}">${escapeHtml(r.name)}</div>
            <div class="ranking-meta" title="${escapeHtml(metaText)}">${escapeHtml(metaText)}</div>
          </div>
          <div class="ranking-count-box">
            <span class="ranking-count-val">${r.total} <small>งาน</small></span>
            <span class="ranking-pct-val">${pct}%</span>
          </div>
        </div>
        <div class="ranking-progress-bar" title="DONE: ${r.done}, IN PROGRESS: ${r.in_progress}, PENDING: ${r.wait}, CANCEL: ${r.cancel}">
          <div class="r-bar-seg r-bar-done" style="width: ${donePct}%"></div>
          <div class="r-bar-seg r-bar-in-progress" style="width: ${inProgPct}%"></div>
          <div class="r-bar-seg r-bar-wait" style="width: ${waitPct}%"></div>
          <div class="r-bar-seg r-bar-cancel" style="width: ${cancelPct}%"></div>
        </div>
        <div class="ranking-status-row">
          <span class="r-stat"><span class="r-dot r-dot-done"></span>DONE <b>${r.done}</b></span>
          <span class="r-stat"><span class="r-dot r-dot-in-progress"></span>PROG <b>${r.in_progress}</b></span>
          <span class="r-stat"><span class="r-dot r-dot-wait"></span>PENDING <b>${r.wait}</b></span>
          ${r.cancel > 0 ? `<span class="r-stat"><span class="r-dot r-dot-cancel"></span>CANCEL <b>${r.cancel}</b></span>` : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- Production Technology Excel Master Tracking Map & Helpers ---
let currentSectionFilter = 'all';
let currentJobTypeFilter = 'all';
let currentSubJobTypeFilter = 'all';
let currentPriorityFilter = 'all';
let currentSubStatusFilter = 'all';

const SUB_STATUS_ACHIEVEMENT_MAP = {
  '00 Not Start': 0,
  '01 Req. Analysis': 0.1,
  '02 Concept Design': 0.2,
  '03 User Approval 1': 0.3,
  '04 Detailed Drawing': 0.4,
  '05 Quote Request': 0.5,
  '06 User Approval 2': 0.6,
  '07 Supp. Proc.': 0.7,
  '08 P.Techno. Proc.': 0.8,
  '09 Verification': 0.9,
  '10 Finished': 1,
  'Pending': 0,
  'Cancel': 1
};

const JOB_TYPE_LABELS = {
  'D': 'DESIGN',
  'R': 'REPAIR',
  'M': 'MODIFY',
  'I': 'INCREASE',
  'A': 'ASSY/INSTALL',
  'S': 'SIMULATION',
  'T': 'TRAINING',
  'AC': 'ACTIVITY',
  'Q': 'QUOTE'
};

function stripLeadingNumberCode(val) {
  if (!val) return '';
  return String(val).replace(/^\d{2}\s+/, '').trim();
}

const MONTH_SHORT_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

// [regMonth, section, jobType, subJobType, priority, designTeam, toolingTeam, supportBy, subStatus, achievement, actionDate, finishPlanDate, finishedMonth]
const EXCEL_MASTER_MAP = {
  "3022026": ["Feb","S1","I-A","01 In-house","High","Sutthipong","Tanin","-","10 Finished",1,"2026-02-03","2026-02-03","Feb"],
  "5042026": ["Apr","S1","A","01 In-house","High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-04-05","2026-04-05","Apr"],
  "7052026": ["May","S1","-","02 Outsource","Medium","Sutthipong","-","Naruebodee","10 Finished",1,"2026-05-07","2026-05-07","May"],
  "10202026": ["Feb","S1","R-D","01 In-house","Super High","Sutthipong","-","-","10 Finished",1,"2026-02-10","2026-02-10","Feb"],
  "11062026": ["Jun","S1","D-I","01 In-house","High","All","Tanin","Jittrakan","10 Finished",1,"2026-06-10","2026-06-11","Jun"],
  "12072026": ["Jul","S1","A","01 In-house","Medium","-","All","-","10 Finished",1,"2026-07-12","2026-07-12","Jul"],
  "14082026": ["Aug","S1","D-A","01 In-house","Medium","Naruebodee","-","-","10 Finished",1,"2026-08-14","2026-08-30","Aug"],
  "15062026": ["Jun","S1","A","01 In-house","High","All","All","-","10 Finished",1,"2026-06-15","2026-06-15","Jun"],
  "18012026": ["Jan","S1","I","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-01-18","2026-01-18","Jan"],
  "19012026": ["Jan","S1","A","01 In-house","High","Sutthipong","Tanin","Wilawan","10 Finished",1,"2026-01-20","2026-01-20","Jan"],
  "19082026": ["Aug","S2","A","01 In-house","High","All","All","-","10 Finished",1,"2026-08-19","2026-08-19","Aug"],
  "20022026": ["Feb","S2","R-A","01 In-house","High","-","Kittisak","-","10 Finished",1,"2026-02-20","2026-02-20","Feb"],
  "23062026": ["Jan","S1","A","01 In-house","High","Sutthipong","Tanin","Wilawan","10 Finished",1,"2026-01-20","2026-01-20","Jan"],
  "24042026": ["Apr","S2","T","01 In-house","High","Jittrakan","-","Naruebodee","10 Finished",1,"2026-04-24","2026-04-24","Apr"],
  "25082026": ["Aug","S2","D","01 In-house","High","All","All","-","10 Finished",1,"2026-08-25","2026-08-25","Aug"],
  "26052026": ["May","S2","D","01 In-house","High","Jittrakan","-","Sutthipong","10 Finished",1,"2026-05-26","2026-05-26","May"],
  "26062026": ["Jun","S2","T","02 Outsource","Medium","Jittrakan","-","Naruebodee","10 Finished",1,"2026-06-26","2026-06-26","Jun"],
  "27062026": ["Jun","S2","A","01 In-house","High","All","All","-","10 Finished",1,"2026-06-27","2026-06-27","Jun"],
  "28062026": ["Jun","S2","A","01 In-house","High","All","All","-","10 Finished",1,"2026-06-28","2026-06-28","Jun"],
  "PT-25-119": ["2025","S0","D-I-A","All","Medium","Wilawan","-","Tanin","10 Finished",1,"2026-01-28","2026-01-28","Jan"],
  "PT-25-172": ["2025","S0","D-I-A","All","High","All","Kittisak","Sutthipong","10 Finished",1,"2026-08-27","2026-08-31","Aug"],
  "PT-25-187": ["2025","S0","D-A","02 Outsource","Medium","Jittrakan","-","Naruebodee","10 Finished",1,"2026-09-09","2026-09-30","Sep"],
  "PT-25-189": ["2025","S0","D-A","All","Low","Naruebodee","-","Sutthipong","Cancel",1,"2026-04-20","2026-04-27","Apr"],
  "PT-25-196": ["2025","S0","D-I-A","All","Low","-","All","-","10 Finished",1,"2026-03-20","2026-03-20","Mar"],
  "PT-25-211": ["2025","S0","D-A","01 In-house","Low","-","All","-","Cancel",1,"2026-03-16","2026-03-20","Mar"],
  "PT-25-216": ["2025","S0","D-A","01 In-house","Low","-","All","-","10 Finished",1,"2026-02-25","2026-02-25","Feb"],
  "PT-25-221": ["2025","S0","D-A","All","High","Sutthipong","Tanin","-","10 Finished",1,"2026-01-08","2026-01-08","Jan"],
  "PT-25-224": ["2025","S0","D-I-A","02 Outsource","Low","Sutthipong","Tanin","-","10 Finished",1,"2026-02-12","2026-02-12","Feb"],
  "PT-25-241": ["2025","S0","D-A","All","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-02-05","2026-02-05","Feb"],
  "PT-25-251": ["2025","S0","I-A","01 In-house","High","Sutthipong","Tanin","-","10 Finished",1,"2026-02-12","2026-02-12","Feb"],
  "PT-25-253": ["2025","S0","I","01 In-house","Medium","Wilawan","-","-","10 Finished",1,"2026-01-13","2026-01-13","Jan"],
  "PT-25-256": ["2025","S0","I","02 Outsource","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-01-26","2026-01-26","Jan"],
  "PT-25-257": ["2025","S0","D-A","01 In-house","Low","Sutthipong","Tanin","-","10 Finished",1,"2026-01-06","2026-01-06","Jan"],
  "PT-25-258": ["2025","S0","D-A","All","Low","Wilawan","Kittisak","Sutthipong","10 Finished",1,"2026-03-23","2026-03-23","Mar"],
  "PT-25-259": ["2025","S0","D-A","01 In-house","Low","-","All","-","10 Finished",1,"2026-03-11","2026-03-20","Mar"],
  "PT-25-262": ["2025","S0","I-A","02 Outsource","Low","Wilawan","Tanin","-","10 Finished",1,"2026-01-06","2026-01-06","Jan"],
  "PT-25-263": ["2025","S0","D-I-A","02 Outsource","High","Wilawan","-","Sutthipong","10 Finished",1,"2026-01-06","2026-01-06","Jan"],
  "PT-25-265": ["2025","S0","R","01 In-house","Low","-","Tanin","-","10 Finished",1,"2026-01-06","2026-01-06","Jan"],
  "WI-PT-017": ["2025","S0","R","-","Super High","Sutthipong","-","-","10 Finished",1,"2026-01-09","2026-01-09","Jan"],
  "SP25-PRJ001": ["2025","S0","D-A","01 In-house","High","Sutthipong","Tanin","-","02 Concept Design",0.2,"2026-08-07","2026-11-15",""],
  "SP25-PRJ002": ["2025","S0","D-A","01 In-house","High","Jittrakan","-","Sutthipong","02 Concept Design",0.2,"2026-04-18","2026-11-30",""],
  "SP25-PRJ003": ["2025","S0","D-A","01 In-house","Super High","All","-","-","08 P.Techno. Proc.",0.8,"2026-08-05","2026-12-20",""],
  "IMP25-002": ["2025","S0","D-A","All","Medium","Sutthipong","-","-","02 Concept Design",0.2,"2026-01-06","",""],
  "IMP25-004": ["2025","S0","D-A","All","Medium","Sutthipong","-","-","02 Concept Design",0.2,"2026-01-21","",""],
  "IMP25-006": ["2025","S0","D-A","All","Medium","Sutthipong","-","-","02 Concept Design",0.2,"2026-01-06","",""],
  "IMP25-009": ["2025","S0","D-A","01 In-house","Medium","Sutthipong","Tanin","-","08 P.Techno. Proc.",0.8,"2026-01-06","",""],
  "IMP25-010": ["2025","S0","D-A","01 In-house","Medium","Wilawan","Tanin","Sutthipong","10 Finished",1,"2026-02-10","2026-02-10","Feb"],
  "IMP25-011": ["2025","S0","D-A","All","Medium","Sutthipong","-","-","02 Concept Design",0.2,"2026-01-06","",""],
  "IMP25-012": ["2025","S0","D-A","All","Medium","Sutthipong","-","-","04 Detailed Drawing",0.4,"2026-01-27","",""],
  "IMP25-013": ["2025","S0","D-A","01 In-house","Medium","Sutthipong","-","-","Cancel",1,"2026-06-04","2026-06-10","Jun"],
  "3D PRT-JAN": ["Jan","S1","D","01 In-house","High","Sutthipong","-","-","10 Finished",1,"2026-02-01","2026-02-01","Feb"],
  "FR-J26-001": ["Jan","S1","R-A","01 In-house","Low","-","All","-","10 Finished",1,"2026-03-07","2026-03-07","Mar"],
  "FR-J26-002": ["Jan","S1","R","01 In-house","High","Sutthipong","Tanin","-","10 Finished",1,"2026-01-14","2026-01-14","Jan"],
  "FR-J26-003": ["Jan","S1","R","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-01-13","2026-01-13","Jan"],
  "FR-J26-004": ["Jan","S1","R","01 In-house","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-01-21","2026-01-21","Jan"],
  "FR-J26-005": ["Jan","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-01-19","2026-01-19","Jan"],
  "FR-J26-006": ["Jan","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-01-21","2026-01-21","Jan"],
  "FR-J26-007": ["Jan","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-01-28","2026-01-28","Jan"],
  "FR-J26-008": ["Jan","S2","D-I-A","01 In-house","Low","Wilawan","Kittisak","-","10 Finished",1,"2026-02-23","2026-02-23","Feb"],
  "FR-J26-009": ["Jan","S2","D-I-A","01 In-house","Medium","Naruebodee","Kittisak","Sutthipong","10 Finished",1,"2026-05-25","2026-05-30","May"],
  "FR-J26-010": ["Jan","S2","I","01 In-house","Low","Sutthipong","Kittisak","-","10 Finished",1,"2026-02-17","2026-02-17","Feb"],
  "GM-J26-001": ["Jan","S1","D-I-A","01 In-house","Low","Wilawan","Tanin","-","10 Finished",1,"2026-01-26","2026-01-26","Jan"],
  "GM-J26-002": ["Jan","S1","I","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-01-19","2026-01-19","Jan"],
  "GM-J26-003": ["Jan","S2","D-I","02 Outsource","Medium","Sutthipong","Kittisak","-","10 Finished",1,"2026-03-16","2026-03-16","Mar"],
  "GM-J26-004": ["Jan","S2","R","01 In-house","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-01-28","2026-01-28","Jan"],
  "GM-J26-005": ["Jan","S2","I","01 In-house","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-02-16","2026-02-16","Feb"],
  "GM-J26-006": ["Jan","S2","I","01 In-house","Low","Naruebodee","-","Sutthipong","10 Finished",1,"2026-04-01","2026-04-10","Apr"],
  "GM-J26-007": ["Jan","S2","M","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-01-28","2026-01-28","Jan"],
  "GM-J26-008": ["Jan","S2","I","01 In-house","Super High","Sutthipong","Tanin","-","10 Finished",1,"2026-02-02","2026-02-02","Feb"],
  "GM-J26-009": ["Jan","S2","I","01 In-house","Low","Sutthipong","-","-","10 Finished",1,"2026-01-30","2026-01-30","Jan"],
  "GM-J26-010": ["Jan","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-01-20","2026-01-20","Jan"],
  "MN26-PRJ001": ["Jan","S1","D","01 In-house","Super High","Sutthipong","-","-","10 Finished",1,"2026-01-15","2026-01-15","Jan"],
  "OPT-J26-001": ["Jan","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-01-19","2026-01-19","Jan"],
  "3D PRT-FEB": ["Feb","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-03-01","2026-03-01","Mar"],
  "ECR-523": ["Feb","S2","D-A","01 In-house","Medium","Jittrakan","-","-","Cancel",1,"2026-03-10","2026-03-10","Mar"],
  "FR-J26-011": ["Feb","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-02-09","2026-02-09","Feb"],
  "FR-J26-012": ["Feb","S1","I","02 Outsource","Medium","Sutthipong","-","-","10 Finished",1,"2026-03-05","2026-03-06","Mar"],
  "FR-J26-013": ["Feb","S1","M","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-02-12","2026-02-12","Feb"],
  "FR-J26-014": ["Feb","S1","I","02 Outsource","High","Sutthipong","-","-","10 Finished",1,"2026-03-25","2026-03-26","Mar"],
  "FR-J26-015": ["Feb","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-02-19","2026-02-19","Feb"],
  "FR-J26-016": ["Feb","S2","I-A","02 Outsource","High","Sutthipong","-","-","10 Finished",1,"2026-04-01","2026-04-01","Apr"],
  "FR-J26-017": ["Feb","S2","M","01 In-house","High","Sutthipong","All","Jittrakan","10 Finished",1,"2026-03-04","2026-03-04","Mar"],
  "FR-J26-018": ["Feb","S2","D-I-A","01 In-house","Low","Jittrakan","Kittisak","-","10 Finished",1,"2026-05-11","2026-05-15","Mar"],
  "FR-J26-019": ["Feb","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-02-26","2026-02-26","Feb"],
  "GM-J26-011": ["Feb","S1","I-R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-02-06","2026-02-06","Feb"],
  "GM-J26-012": ["Feb","S1","D-A","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-02-05","2026-02-05","Feb"],
  "GM-J26-013": ["Feb","S1","D-A","01 In-house","High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-02-05","2026-02-05","Feb"],
  "GM-J26-014": ["Feb","S1","M","01 In-house","Low","Sutthipong","-","Jittrakan","10 Finished",1,"2026-04-27","2026-04-27","Apr"],
  "GM-J26-015": ["Feb","S1","I","01 In-house","Low","Jittrakan","-","-","10 Finished",1,"2026-03-09","2026-03-09","Mar"],
  "GM-J26-016": ["Feb","S1","A","01 In-house","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-02-11","2026-02-11","Feb"],
  "GM-J26-017": ["Feb","S1","M","01 In-house","Medium","Sutthipong","Kittisak","-","10 Finished",1,"2026-02-17","2026-02-17","Feb"],
  "GM-J26-018": ["Feb","S2","I-A","02 Outsource","High","Sutthipong","Kittisak","-","10 Finished",1,"2026-03-05","2026-03-05","Mar"],
  "GM-J26-019": ["Feb","S2","M-I","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-02-19","2026-02-19","Feb"],
  "GM-J26-020": ["Feb","S2","D-M-I","01 In-house","Low","Jittrakan","-","-","10 Finished",1,"2026-04-21","2026-04-10","Apr"],
  "GM-J26-021": ["Feb","S2","I-A","02 Outsource","High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-03-19","2026-03-20","Mar"],
  "GM-J26-022": ["Feb","S2","M","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-02-21","2026-02-21","Feb"],
  "GM-J26-023": ["Feb","S2","I-A","01 In-house","Low","Jittrakan","Kittisak","-","10 Finished",1,"2026-03-04","2026-03-04","Mar"],
  "GM-J26-024": ["Feb","S2","D-A","All","Low","Jittrakan","-","Sutthipong","02 Concept Design",0.2,"2026-02-24","2026-12-30",""],
  "GM-M26-011": ["Feb","S2","I-A","All","Medium","Sutthipong","-","-","Cancel",1,"2026-03-23","2026-03-31","Mar"],
  "OPT-J26-002": ["Feb","S1","I-A","02 Outsource","High","Jittrakan","All","-","10 Finished",1,"2026-03-23","2026-03-23","Mar"],
  "OPT-J26-003": ["Feb","S2","D-I","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-03-23","2026-03-27","Mar"],
  "OPT-J26-004": ["Feb","S2","R","01 In-house","Medium","-","Tanin","Naruebodee","10 Finished",1,"2026-02-21","2026-02-21","Feb"],
  "OPT-J26-005": ["Feb","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-02-21","2026-02-21","Feb"],
  "OTH-J26-001": ["Feb","S2","D-I","All","Medium","Jittrakan","Kittisak","-","10 Finished",1,"2026-03-18","2026-03-18","Mar"],
  "T24022026": ["Feb","S2","T","01 In-house","Low","Sutthipong","Kittisak","Jittrakan","10 Finished",1,"2026-02-24","2026-02-24","Feb"],
  "T17020206": ["Feb","S2","T","01 In-house","Low","Sutthipong","Kittisak","Jittrakan","10 Finished",1,"2026-02-17","2026-02-17","Feb"],
  "3D PRT-MAR": ["Mar","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-04-01","2026-04-01","Apr"],
  "FR-J26-020": ["Mar","S1","M","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-03-04","2026-03-04","Mar"],
  "FR-J26-021": ["Mar","S1","M","01 In-house","High","-","All","-","10 Finished",1,"2026-03-21","2026-03-23","Mar"],
  "FR-J26-022": ["Mar","S1","I","All","Medium","Sutthipong","Kittisak","-","10 Finished",1,"2026-04-10","2026-04-10","Apr"],
  "FR-J26-023": ["Mar","S1","D","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-03-09","2026-03-09","Mar"],
  "FR-J26-024": ["Mar","S1","D-I","01 In-house","Medium","Naruebodee","-","-","10 Finished",1,"2026-04-28","2026-04-27","Apr"],
  "FR-J26-025": ["Mar","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-03-27","2026-03-27","Mar"],
  "FR-J26-026": ["Mar","S2","D-A","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-04-01","2026-04-20","Apr"],
  "GM-J26-025": ["Mar","S1","D-I-A","01 In-house","Low","-","Tanin","-","10 Finished",1,"2026-03-05","2026-03-09","Mar"],
  "GM-J26-026": ["Mar","S1","D-A","All","High","Naruebodee","-","-","10 Finished",1,"2026-05-13","2026-05-30","May"],
  "GM-J26-027": ["Mar","S1","M","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-03-09","2026-03-09","Mar"],
  "GM-J26-028": ["Mar","S1","D-I-A","01 In-house","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-04-10","2026-04-27","Apr"],
  "GM-J26-029": ["Mar","S1","I-A","01 In-house","Low","-","Kittisak","-","10 Finished",1,"2026-03-18","2026-03-18","Mar"],
  "GM-J26-030": ["Mar","S1","I","02 Outsource","Medium","Jittrakan","-","-","Cancel",1,"2026-03-26","2026-04-06","Mar"],
  "GM-J26-031": ["Mar","S2","I","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-03-18","2026-03-12","Mar"],
  "GM-J26-032": ["Mar","S2","M","01 In-house","High","Naruebodee","-","Sutthipong","10 Finished",1,"2026-04-23","2026-04-27","Apr"],
  "GM-J26-033": ["Mar","S2","I","01 In-house","Low","Jittrakan","-","-","10 Finished",1,"2026-03-17","2026-03-20","Mar"],
  "GM-J26-034": ["Mar","S2","D-I","02 Outsource","High","Sutthipong","-","-","10 Finished",1,"2026-04-27","2026-04-10","Apr"],
  "GM-J26-035": ["Mar","S2","D-I-A","01 In-house","Medium","Jittrakan","Tanin","-","10 Finished",1,"2026-04-01","2026-04-03","Apr"],
  "GM-J26-036": ["Mar","S2","M","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-04-07","2026-04-10","Apr"],
  "GM-J26-037": ["Mar","S2","I","01 In-house","Low","-","Kittisak","-","10 Finished",1,"2026-03-26","2026-03-31","Mar"],
  "GM-J26-038": ["Mar","S2","M","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-04-01","2026-04-03","Apr"],
  "GM-J26-039": ["Mar","S2","M","01 In-house","High","Sutthipong","-","-","10 Finished",1,"2026-03-26","2026-03-26","Mar"],
  "GM-J26-040": ["Mar","S2","M","01 In-house","Medium","Naruebodee","Kittisak","-","10 Finished",1,"2026-04-01","2026-04-03","Apr"],
  "LT26-MT01-1": ["Mar","S2","A","01 In-house","High","-","Kittisak","-","10 Finished",1,"2026-03-30","2026-03-30","Mar"],
  "OPT-J26-006": ["Mar","S1","M","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-03-25","2026-04-10","Mar"],
  "OPT-J26-007": ["Mar","S2","D-I","01 In-house","Low","Naruebodee","-","-","Cancel",1,"2026-04-18","2026-04-20","Apr"],
  "OPT-J26-008": ["Mar","S2","I","02 Outsource","High","Jittrakan","-","-","Cancel",1,"2026-04-18","2026-04-20","Apr"],
  "OPT-J26-009": ["Mar","S2","D-A","01 In-house","High","Naruebodee","Kittisak","-","10 Finished",1,"2026-03-28","2026-04-08","Mar"],
  "OTH-J26-002": ["Mar","S2","I-A","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-03-16","2026-03-17","Mar"],
  "OTH-J26-003": ["Mar","S2","I","01 In-house","Medium","-","Kittisak","-","10 Finished",1,"2026-03-25","2026-03-27","Mar"],
  "OTH-J26-004": ["Mar","S2","I-A","01 In-house","High","-","Kittisak","-","10 Finished",1,"2026-03-25","2026-03-25","Mar"],
  "MR.ARAYA": ["Apr","S1","I","01 In-house","High","Sutthipong","-","-","10 Finished",1,"2026-06-05","2026-06-15","Jun"],
  "3D-PRT-APR": ["Apr","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-05-05","2026-05-30","May"],
  "FR-M26": ["Apr","S1","I","02 Outsource","Super High","Sutthipong","-","-","10 Finished",1,"2026-05-05","2026-05-30","May"],
  "FR-J26-027": ["Apr","S1","M","01 In-house","Low","-","Tanin","-","10 Finished",1,"2026-04-07","2026-04-07","Apr"],
  "FR-J26-028": ["Apr","S1","I-M","All","Low","Jittrakan","-","-","10 Finished",1,"2026-06-05","2026-06-30","Jun"],
  "GM-J26-041": ["Apr","S1","M","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-04-10","2026-04-10","Apr"],
  "GM-J26-042": ["Apr","S1","D-A","01 In-house","Medium","All","-","Kittisak","10 Finished",1,"2026-04-21","2026-04-27","Apr"],
  "GM-J26-043": ["Apr","S1","M","01 In-house","Low","-","All","-","10 Finished",1,"2026-04-23","2026-04-27","Apr"],
  "GM-J26-044": ["Apr","S1","R","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-04-10","2026-04-10","Apr"],
  "GM-J26-045": ["Apr","S1","D-M","All","Medium","Naruebodee","Tanin","-","10 Finished",1,"2026-05-07","2026-05-30","May"],
  "GM-J26-046": ["Apr","S1","D","01 In-house","Medium","Jittrakan","Tanin","-","10 Finished",1,"2026-07-24","2026-07-30","Jul"],
  "IMP26-001": ["Apr","S1","D-A","All","High","All","-","-","Cancel",1,"2026-08-05","2026-08-30","Aug"],
  "IMP26-002": ["Apr","S1","D-A","01 In-house","High","Jittrakan","Tanin","Sutthipong","10 Finished",1,"2026-08-05","2026-08-30","Aug"],
  "LT26-FER001-07": ["Apr","S1","A","01 In-house","High","All","All","-","10 Finished",1,"2026-04-03","2026-04-03","Apr"],
  "OPT-J26-010": ["Apr","S1","D","02 Outsource","High","Sutthipong","-","-","10 Finished",1,"2026-05-06","2026-05-30","May"],
  "OPT-J26-011": ["Apr","S1","M","01 In-house","Low","-","All","-","10 Finished",1,"2026-04-22","2026-04-24","Apr"],
  "OTH-J26-005": ["Apr","S1","M-A","01 In-house","Low","Jittrakan","-","-","Cancel",1,"2026-05-09","2026-05-30","May"],
  "PT26-3DRS-0": ["Apr","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-05-06","2026-05-30","May"],
  "SP26-PRJ001": ["Apr","S2","D-A","01 In-house","Medium","All","All","Jittrakan","08 P.Techno. Proc.",0.8,"2026-07-27","2026-09-30",""],
  "OTH-J26-006": ["Apr","S2","R-A","01 In-house","Medium","All","-","-","10 Finished",1,"2026-07-12","2026-07-12","Jul"],
  "OPT-J26-012": ["Apr","S2","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-04-20","2026-04-20","Apr"],
  "LT26-FER001-6-07": ["Apr","S2","A","01 In-house","Super High","All","All","-","10 Finished",1,"2026-04-26","2026-04-26","Apr"],
  "FR-J26-029": ["Apr","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-04-22","2026-04-30","Apr"],
  "FR-J26-030": ["Apr","S2","A","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-05-07","2026-06-01","May"],
  "FR-J26-031": ["Apr","S2","I-A","01 In-house","Medium","Naruebodee","All","-","10 Finished",1,"2026-05-14","2026-05-30","May"],
  "FR-J26-032": ["Apr","S2","I","01 In-house","Medium","Jittrakan","Tanin","-","10 Finished",1,"2026-06-02","2026-06-10","Jun"],
  "FR-J26-033": ["Apr","S2","I-A","01 In-house","Medium","Jittrakan","Kittisak","-","10 Finished",1,"2026-07-12","2026-07-12","Jul"],
  "FR-J26-034": ["Apr","S2","I","02 Outsource","Medium","Naruebodee","-","-","10 Finished",1,"2026-06-02","2026-06-15","Jun"],
  "FR-J26-035": ["Apr","S2","I-A","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-06-15","2026-06-30","Jun"],
  "FR-J26-036": ["May","S1","D-I","01 In-house","Medium","Sutthipong","All","-","10 Finished",1,"2026-05-13","2026-05-30","May"],
  "FR-J26-037": ["May","S1","D-I","02 Outsource","Medium","Sutthipong","-","-","10 Finished",1,"2026-06-02","2026-06-15","Jun"],
  "GM-J26-047": ["May","S1","D-I","01 In-house","Medium","Jittrakan","Tanin","-","10 Finished",1,"2026-06-02","2026-06-15","Jun"],
  "FR-J26-038": ["May","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-05-06","2026-05-08","May"],
  "IMP26-003": ["May","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-09-08","2026-09-15","Sep"],
  "LT25-FIB001-5": ["May","S1","D","01 In-house","High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-05-06","2026-05-08","May"],
  "LT25-FIB002-0": ["May","S1","D","01 In-house","High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-05-06","2026-05-08","May"],
  "PT26-3DRS-5": ["May","S1","D","01 In-house","Low","Sutthipong","-","-","10 Finished",1,"2026-06-03","2026-05-29","Jun"],
  "IMP26-004": ["May","S1","D","02 Outsource","Low","All","-","-","Cancel",1,"2026-07-20","2026-07-30","Jul"],
  "OPT-J26-013": ["May","S1","D","01 In-house","High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-05-09","2026-05-09","May"],
  "PTN006A001-0": ["May","S1","D-A","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-05-14","2026-05-30","May"],
  "PTN007A001-0": ["May","S1","D-A","01 In-house","Medium","Jittrakan","Kittisak","Sutthipong","Pending",0,"2026-06-10","2026-12-30",""],
  "GM-J26-048": ["May","S1","I","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-05-26","2026-05-30","May"],
  "FR-J26-039": ["May","S1","D-I","01 In-house","Medium","Naruebodee","-","-","10 Finished",1,"2026-06-04","2026-06-15","Jun"],
  "FR-J26-040": ["May","S1","I","02 Outsource","Medium","Jittrakan","-","-","10 Finished",1,"2026-06-04","2026-06-15","Jun"],
  "IMP26-005": ["May","S1","D","01 In-house","Medium","Naruebodee","-","-","10 Finished",1,"2026-09-07","2026-09-30","Sep"],
  "FR-J26-041": ["May","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-05-14","2026-05-14","May"],
  "OPT-J26-014": ["May","S1","R","01 In-house","High","-","Tanin","Tanin","10 Finished",1,"2026-05-15","2026-05-15","May"],
  "LT25-FIB002-3": ["May","S2","A","01 In-house","High","All","All","-","10 Finished",1,"2026-05-16","2026-05-16","May"],
  "OTH-J26-007": ["May","S2","M","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-05-18","2026-05-20","May"],
  "GM-J26-049": ["May","S2","D-A","01 In-house","Medium","-","All","-","10 Finished",1,"2026-05-25","2026-06-10","May"],
  "GM-J26-050": ["May","S2","M","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-05-18","2026-05-20","May"],
  "FR-J26-042": ["May","S2","D-A","01 In-house","High","Jittrakan","All","-","10 Finished",1,"2026-05-25","2026-05-30","May"],
  "FR-J26-043": ["May","S2","M-A","01 In-house","Low","Jittrakan","Tanin","-","10 Finished",1,"2026-06-02","2026-06-15","Jun"],
  "GM-J26-051": ["May","S2","M-A","01 In-house","High","All","Tanin","-","10 Finished",1,"2026-05-18","2026-05-18","May"],
  "GM-J26-052": ["May","S2","D","01 In-house","Medium","Naruebodee","Kittisak","-","10 Finished",1,"2026-06-10","2026-06-15","Jun"],
  "GM-J26-053": ["May","S2","D-A","01 In-house","High","Sutthipong","All","Naruebodee","10 Finished",1,"2026-05-21","2026-05-30","May"],
  "SP26-PRJ002": ["May","S2","D","01 In-house","Super High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-07-25","2026-07-25","Jul"],
  "GM-J26-054": ["May","S2","D","02 Outsource","Medium","Sutthipong","-","-","10 Finished",1,"2026-08-01","2026-08-01","Aug"],
  "GM-J26-055": ["May","S2","D","02 Outsource","Medium","Sutthipong","-","-","10 Finished",1,"2026-07-01","2026-06-15","Jul"],
  "FR-J26-044": ["May","S2","D-A","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-06-24","2026-06-15","Jun"],
  "FR-J26-045": ["May","S2","I-A","All","Medium","-","All","-","10 Finished",1,"2026-07-18","2026-07-20","Jul"],
  "GM-J26-056": ["May","S2","D-A","01 In-house","Medium","Jittrakan","All","-","10 Finished",1,"2026-06-02","2026-06-15","Jun"],
  "GM-J26-057": ["May","S2","I","All","High","Jittrakan","-","-","10 Finished",1,"2026-07-15","2026-07-30","Jul"],
  "GM-J26-058": ["May","S2","D","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-05-25","2026-05-25","May"],
  "FR-J26-046": ["Jun","S1","I-A","All","Medium","All","-","Sutthipong","10 Finished",1,"2026-09-11","2026-09-15",""],
  "FR-J26-047": ["Jun","S1","D-A","01 In-house","Medium","Jittrakan","-","Naruebodee","10 Finished",1,"2026-08-04","2026-08-30","Aug"],
  "FR-J26-048": ["Jun","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-06-03","2026-06-03","Jun"],
  "GM-J26-059": ["Jun","S1","D-I-A","01 In-house","Medium","All","-","Naruebodee","10 Finished",1,"2026-07-16","2026-07-20","Jul"],
  "GM-J26-060": ["Jun","S1","D-I-A","01 In-house","Medium","Jittrakan","Kittisak","Sutthipong","10 Finished",1,"2026-08-20","2026-09-15","Sep"],
  "GM-J26-061": ["Jun","S1","I","02 Outsource","Medium","Sutthipong","-","-","10 Finished",1,"2026-07-09","2026-07-30","Jul"],
  "GM-J26-062": ["Jun","S1","D-I","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-06-10","2026-06-30","Jun"],
  "FR-J26-049": ["Jun","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-06-03","2026-06-03","Jun"],
  "FR-J26-050": ["Jun","S1","D-A","01 In-house","Medium","Naruebodee","Tanin","-","10 Finished",1,"2026-06-17","2026-06-30","Jun"],
  "PT26-3DRS-6": ["Jun","S1","D","01 In-house","Low","Sutthipong","-","-","10 Finished",1,"2026-07-01","2026-06-30","Jul"],
  "GM-J26-063": ["Jun","S1","D-A","01 In-house","Medium","Sutthipong","Kittisak","-","10 Finished",1,"2026-08-11","2026-08-15","Aug"],
  "GM-J26-064": ["Jun","S1","M","01 In-house","Medium","-","All","-","10 Finished",1,"2026-07-06","2026-07-10","Jul"],
  "OPT-J26-015": ["Jun","S1","I-A","All","Low","Sutthipong","Kittisak","-","10 Finished",1,"2026-07-16","2026-07-15","Jul"],
  "GM-J26-065": ["Jun","S1","D-I","02 Outsource","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-06-10","2026-06-30","Jun"],
  "FR-J26-051": ["Jun","S1","D-I-A","01 In-house","Low","Sutthipong","Kittisak","-","10 Finished",1,"2026-09-04","2026-09-15","Sep"],
  "GM-J26-066": ["Jun","S1","D","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-06-10","2026-06-10","Jun"],
  "FR-J26-052": ["Jun","S1","D-M","01 In-house","Medium","-","Tanin","Sutthipong","10 Finished",1,"2026-08-20","2026-08-30","Aug"],
  "FR-J26-053": ["Jun","S1","D","02 Outsource","Medium","Jittrakan","-","-","10 Finished",1,"2026-08-07","2026-08-15","Aug"],
  "GM-J26-067": ["Jun","S1","R","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-07-16","2026-07-30","Jul"],
  "FR-J26-054": ["Jun","S1","D-A","01 In-house","Medium","Naruebodee","Kittisak","-","10 Finished",1,"2026-07-08","2026-07-30","Jul"],
  "FR-J26-055": ["Jun","S1","D-A","02 Outsource","Medium","Sutthipong","-","-","Pending",0,"2026-07-24","2026-09-15",""],
  "FR-J26-056": ["Jun","S1","D-I","01 In-house","Medium","Naruebodee","-","-","10 Finished",1,"2026-08-09","2026-09-15","Sep"],
  "FR-J26-057": ["Jun","S2","R","01 In-house","Medium","Naruebodee","-","-","Cancel",1,"2026-06-24","2026-06-30","Jun"],
  "FR-J26-058": ["Jun","S2","I-A","01 In-house","Medium","Sutthipong","Kittisak","-","10 Finished",1,"2026-07-16","2026-07-15","Jul"],
  "FR-J26-059": ["Jun","S2","A","01 In-house","Medium","All","-","-","10 Finished",1,"2026-06-19","2026-06-30","Jun"],
  "OPT-J26-016": ["Jun","S2","I-A","01 In-house","Medium","Sutthipong","Kittisak","-","10 Finished",1,"2026-07-16","2026-07-15","Jul"],
  "OTH-J26-008": ["Jun","S2","I-A","01 In-house","Medium","All","All","-","06 User Approval 2",0.6,"2026-08-05","2026-09-30",""],
  "FR-J26-060": ["Jun","S2","D-A","01 In-house","Medium","Sutthipong","All","-","08 P.Techno. Proc.",0.8,"2026-09-07","2026-09-20",""],
  "FR-J26-061": ["Jun","S2","R","01 In-house","High","Sutthipong","-","-","10 Finished",1,"2026-06-12","2026-06-12","Jun"],
  "FR-J26-062": ["Jun","S2","Q","02 Outsource","Medium","Sutthipong","-","-","10 Finished",1,"2026-06-22","2026-06-30","Jun"],
  "GM-J26-069": ["Jun","S2","D-I-A","01 In-house","Medium","Jittrakan","Kittisak","-","10 Finished",1,"2026-07-25","2026-07-20","Jul"],
  "GM-J26-070": ["Jun","S2","D-A","01 In-house","Medium","All","-","-","10 Finished",1,"2026-07-06","2026-07-20","Jul"],
  "OTH-J26-009": ["Jun","S2","R","01 In-house","Medium","Naruebodee","-","Jittrakan","10 Finished",1,"2026-07-09","2026-07-20","Jul"],
  "MD-J26-001": ["Jun","S2","D-A","01 In-house","Medium","Jittrakan","Kittisak","-","10 Finished",1,"2026-08-22","2026-08-30","Aug"],
  "FR-J26-063": ["Jun","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-06-22","2026-06-22","Jun"],
  "GM-J26-071": ["Jun","S2","D-A","01 In-house","Medium","All","-","Naruebodee","10 Finished",1,"2026-09-05","2026-09-30","Sep"],
  "GM-J26-072": ["Jun","S2","D","01 In-house","High","Sutthipong","-","-","10 Finished",1,"2026-06-24","2026-06-24","Jun"],
  "OTH-J26-010": ["Jun","S2","M","01 In-house","Medium","Naruebodee","-","-","07 Supp. Proc.",0.7,"2026-08-05","2026-10-15",""],
  "GM-J26-073": ["Jun","S2","I","02 Outsource","High","Sutthipong","Kittisak","-","10 Finished",1,"2026-07-09","2026-07-15","Jul"],
  "GM-J26-074": ["Jun","S2","M-I","01 In-house","Low","Jittrakan","-","-","10 Finished",1,"2026-07-15","2026-07-15","Jul"],
  "GM-J26-075": ["Jun","S2","D-I","01 In-house","Low","Naruebodee","Tanin","-","10 Finished",1,"2026-07-23","2026-07-30","Jul"],
  "FR-J26-064": ["Jun","S2","D","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-07-07","2026-07-10","Jul"],
  "GM-J26-076": ["Jun","S2","D","02 Outsource","High","Naruebodee","-","-","10 Finished",1,"2026-08-13","2026-08-30","Aug"],
  "LT26-FER001-07A": ["Jun","S2","D","01 In-house","High","Jittrakan","-","-","10 Finished",1,"2026-06-30","2026-06-30","Jun"],
  "GM-J26-077": ["Jul","S1","M","01 In-house","High","Jittrakan","Kittisak","-","10 Finished",1,"2026-07-04","2026-07-04","Jul"],
  "OTH-J26-011": ["Jul","S1","D","01 In-house","Medium","Jittrakan","-","-","04 Detailed Drawing",0.4,"2026-09-01","2026-10-15",""],
  "GM-M26-052": ["Jul","S1","D-A","01 In-house","Medium","All","All","-","08 P.Techno. Proc.",0.8,"2026-08-15","2026-09-30",""],
  "GM-J26-078": ["Jul","S1","D-A","01 In-house","Medium","All","All","-","10 Finished",1,"2026-07-08","2026-07-12","Jul"],
  "GM-J26-079": ["Jul","S1","D","01 In-house","High","-","Tanin","Sutthipong","10 Finished",1,"2026-07-02","2026-07-02","Jul"],
  "GM-J26-080": ["Jul","S1","D-A","01 In-house","High","Jittrakan","Kittisak","-","10 Finished",1,"2026-08-16","2026-08-20","Aug"],
  "OPT-J26-017": ["Jul","S1","D-I","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-07-07","2026-07-07","Jul"],
  "SP26-PRJ003": ["Jul","S1","D-A","All","High","Naruebodee","-","Sutthipong","09 Verification",0.9,"2026-09-04","2026-09-30",""],
  "FR-J26-065": ["Jul","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-07-10","2026-07-10","Jul"],
  "OPT-J26-018": ["Jul","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-07-10","2026-07-10","Jul"],
  "GM-J26-081": ["Jul","S1","D","01 In-house","High","Naruebodee","Tanin","-","10 Finished",1,"2026-07-10","2026-07-10","Jul"],
  "GM-J26-082": ["Jul","S1","D","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-07-10","2026-07-10","Jul"],
  "GM-J26-083": ["Jul","S1","D","01 In-house","Medium","Naruebodee","Kittisak","-","Pending",0,"2026-08-20","2026-09-20",""],
  "GM-J26-084": ["Jul","S1","D-A","01 In-house","Medium","Jittrakan","All","Sutthipong","10 Finished",1,"2026-08-08","2026-08-15","Aug"],
  "GM-J26-085": ["Jul","S1","D-A","01 In-house","High","Naruebodee","-","-","10 Finished",1,"2026-08-03","2026-08-10","Aug"],
  "GM-J26-086": ["Jul","S1","D-A","01 In-house","Medium","All","All","Jittrakan","10 Finished",1,"2026-07-18","2026-07-20","Jul"],
  "GM-J26-087": ["Jul","S1","D","01 In-house","Medium","Naruebodee","-","-","Pending",0,"2026-08-19","2026-09-30",""],
  "FR-J26-066": ["Jul","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-07-17","2026-07-17","Jul"],
  "FR-J26-070": ["Jul","S2","D","01 In-house","High","Sutthipong","-","-","10 Finished",1,"2026-07-28","2026-07-30","Jul"],
  "OPT-J26-019": ["Jul","S2","M","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-07-21","2026-07-21","Jul"],
  "OPT-J26-020": ["Jul","S2","D","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-07-23","2026-07-30","Jul"],
  "GM-J26-088": ["Jul","S2","D","All","Medium","Sutthipong","-","-","10 Finished",1,"2026-08-07","2026-08-15","Aug"],
  "GM-J26-089": ["Jul","S2","D","01 In-house","Medium","Naruebodee","-","-","10 Finished",1,"2026-08-14","2026-09-15","Aug"],
  "GM-J26-090": ["Jul","S2","D","01 In-house","High","Naruebodee","-","Sutthipong","10 Finished",1,"2026-07-21","2026-07-21","Jul"],
  "GM-J26-091": ["Jul","S2","M","01 In-house","High","Sutthipong","Tanin","-","10 Finished",1,"2026-07-23","2026-07-30","Jul"],
  "FR-J26-067": ["Jul","S2","D-A","01 In-house","Low","Naruebodee","All","-","07 Supp. Proc.",0.7,"2026-08-20","2026-09-26",""],
  "OPT-J26-021": ["Jul","S2","A","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-08-25","2026-09-15","Aug"],
  "GM-J26-092": ["Jul","S2","D-I","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-07-23","2026-07-25","Jul"],
  "GM-J26-093": ["Jul","S2","I-A","All","Medium","Naruebodee","All","-","10 Finished",1,"2026-08-24","2026-09-30","Aug"],
  "FR-J26-068": ["Jul","S2","I","02 Outsource","Medium","Jittrakan","-","-","10 Finished",1,"2026-08-06","2026-08-15","Aug"],
  "FR-J26-069": ["Jul","S2","I","All","Medium","Naruebodee","Kittisak","-","10 Finished",1,"2026-08-06","2026-08-15","Aug"],
  "GM-J26-094": ["Jul","S2","I-A","02 Outsource","Medium","Naruebodee","Tanin","-","10 Finished",1,"2026-08-10","2026-08-15","Aug"],
  "T17072026": ["Jul","S2","T","02 Outsource","Low","Jittrakan","-","Naruebodee","10 Finished",1,"2026-07-17","2026-07-17","Jul"],
  "OPT-J26-022": ["Jul","S2","R","01 In-house","High","-","All","-","10 Finished",1,"2026-07-30","2026-07-30","Jul"],
  "LT26-FER001-08": ["Aug","S1","D","01 In-house","High","Sutthipong","-","Jittrakan","10 Finished",1,"2026-08-01","2026-08-01","Aug"],
  "GM-J26-095": ["Aug","S1","D-I-A","01 In-house","High","Sutthipong","Tanin","-","10 Finished",1,"2026-09-09","2026-09-15","Sep"],
  "GM-J26-096": ["Aug","S1","D-I-A","All","Medium","Sutthipong","Tanin","-","07 Supp. Proc.",0.7,"2026-08-10","2026-09-15",""],
  "WI-PT-013": ["Aug","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-08-05","2026-08-15","Aug"],
  "WI-MOT-JIG-065": ["Aug","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-08-05","2026-08-15","Aug"],
  "QR-PT-050-A": ["Aug","S1","D","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-08-13","2026-08-15","Aug"],
  "AUDIT 28082026": ["Aug","S1","D","01 In-house","High","All","All","-","10 Finished",1,"2026-08-28","2026-08-28","Aug"],
  "FR-J26-071": ["Aug","S1","D","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-08-05","2026-08-05","Aug"],
  "5S. 08082026": ["Aug","S1","AC","01 In-house","High","All","All","-","08 P.Techno. Proc.",0.8,"2026-08-30","2026-08-30",""],
  "FR-J26-072": ["Aug","S1","D-I-A","01 In-house","Medium","Sutthipong","Kittisak","-","10 Finished",1,"2026-09-04","2026-09-15",""],
  "GM-J26-097": ["Aug","S1","D-A","01 In-house","Medium","Naruebodee","Tanin","-","10 Finished",1,"2026-08-24","2026-09-20","Aug"],
  "GM-J26-098": ["Aug","S1","D-I","01 In-house","Medium","Naruebodee","Tanin","Sutthipong","05 Quote Request",0.5,"2026-09-04","2026-09-30",""],
  "FR-J26-073": ["Aug","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-08-11","2026-08-15","Aug"],
  "SP26-PRJ004": ["Aug","S1","D","01 In-house","High","All","-","-","02 Concept Design",0.2,"2026-07-11","2026-09-30",""],
  "GM-J26-099": ["Aug","S1","D","01 In-house","Medium","All","All","-","10 Finished",1,"2026-08-14","2026-08-30","Aug"],
  "GM-J26-100": ["Aug","S1","D-M","01 In-house","Medium","Naruebodee","Tanin","-","08 P.Techno. Proc.",0.8,"2026-09-04","2026-09-30",""],
  "FR-J26-074": ["Aug","S1","D-A","01 In-house","Medium","Jittrakan","-","-","10 Finished",1,"2026-08-26","2026-09-30","Aug"],
  "GM-J26-101": ["Aug","S2","D-A","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-08-18","2026-08-20","Aug"],
  "GM-J26-102": ["Aug","S2","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-08-18","2026-08-20","Aug"],
  "GM-J26-103": ["Aug","S2","D","01 In-house","Medium","Sutthipong","Tanin","-","10 Finished",1,"2026-08-19","2026-08-20","Aug"],
  "OPT-J26-023": ["Aug","S2","D-I","01 In-house","Medium","Sutthipong","Tanin","-","07 Supp. Proc.",0.7,"2026-09-02","2026-09-30",""],
  "GM-M26-081": ["Aug","S2","D","01 In-house","Medium","-","Kittisak","-","10 Finished",1,"2026-08-20","2026-08-30","Aug"],
  "FR-J26-075": ["Aug","S2","D","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-09-01","2026-09-08","Sep"],
  "GM-J26-104": ["Aug","S2","D","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-08-26","2026-09-15","Aug"],
  "FR-J26-076": ["Aug","S2","I","02 Outsource","Medium","Jittrakan","-","-","06 User Approval 2",0.6,"2026-09-02","2026-09-30",""],
  "FR-J26-077": ["Aug","S2","D-A","01 In-house","Medium","Sutthipong","All","-","10 Finished",1,"2026-09-03","2026-09-15","Sep"],
  "FR-J26-078": ["Aug","S2","D","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-08-29","2026-09-07","Sep"],
  "GM-J26-105": ["Sep","S1","D","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-09-01","2026-09-01","Sep"],
  "FR-J26-079": ["Sep","S1","D","01 In-house","Medium","Jittrakan","Kittisak","-","10 Finished",1,"2026-09-01","2026-09-01","Sep"],
  "FR-J26-080": ["Sep","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-09-01","2026-09-01","Sep"],
  "GM-J26-106": ["Sep","S1","R","01 In-house","High","-","-","-","10 Finished",1,"2026-09-01","2026-09-01","Sep"],
  "GM-J26-107": ["Sep","S1","M","01 In-house","Medium","-","Tanin","-","10 Finished",1,"2026-09-01","2026-09-01","Sep"],
  "GM-J26-108": ["Sep","S1","M","01 In-house","Medium","Sutthipong","-","-","10 Finished",1,"2026-09-01","2026-09-01","Sep"],
  "GM-J26-109": ["Sep","S1","A","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-09-05","2026-09-05","Sep"],
  "FR-J26-081": ["Sep","S1","R","01 In-house","High","-","Tanin","-","10 Finished",1,"2026-09-08","2026-09-08","Sep"],
  "FR-J26-082": ["Sep","S1","D-A","01 In-house","Medium","Sutthipong","Kittisak","-","02 Concept Design",0.2,"2026-09-08","2026-10-15",""],
  "GM-J26-110": ["Sep","S1","R","01 In-house","Medium","Jittrakan","-","-","02 Concept Design",0.2,"2026-09-09","2026-10-30",""],
  "GM-J26-111": ["Sep","S1","A","01 In-house","Medium","Naruebodee","-","-","04 Detailed Drawing",0.4,"2026-09-09","2026-10-30",""],
  "GM-J26-112": ["Sep","S1","M","01 In-house","Medium","Jittrakan","-","-","05 Quote Request",0.5,"2026-09-09","2026-10-30",""],
  "GM-J26-113": ["Sep","S1","D","02 Outsource","Medium","Sutthipong","-","-","02 Concept Design",0.2,"2026-09-09","2026-10-30",""],
  "GM-J26-114": ["Sep","S1","D-I","All","Medium","Jittrakan","-","-","02 Concept Design",0.2,"2026-09-09","2026-10-30",""],
  "GM-J26-115": ["Sep","S1","I","02 Outsource","Medium","Naruebodee","-","-","05 Quote Request",0.5,"2026-09-09","2026-10-30",""],
  "GM-J26-116": ["Sep","S1","D","01 In-house","High","Sutthipong","-","-","02 Concept Design",0.2,"2026-09-09","2026-10-30",""],
  "FR-J26-083": ["Sep","S1","D","02 Outsource","Medium","Sutthipong","-","-","02 Concept Design",0.2,"2026-09-09","2026-10-30",""],
  "FR-J26-084": ["Sep","S1","D","01 In-house","Medium","Sutthipong","-","-","02 Concept Design",0.2,"2026-09-09","2026-10-30",""]
};

function getTaskExcelTracking(item) {
  if (!item) return {};
  const rawCode = (item.code || '').trim().toUpperCase();
  let excelRow = rawCode ? EXCEL_MASTER_MAP[rawCode] : null;
  if (!excelRow && rawCode) {
    // Try partial match if code contains spaces or suffixes
    for (const k of Object.keys(EXCEL_MASTER_MAP)) {
      if (rawCode.includes(k) || k.includes(rawCode)) {
        excelRow = EXCEL_MASTER_MAP[k];
        break;
      }
    }
  }
  if (!excelRow && item.title) {
    const upperTitle = item.title.toUpperCase();
    for (const k of Object.keys(EXCEL_MASTER_MAP)) {
      if (k.length >= 6 && upperTitle.includes(k)) {
        excelRow = EXCEL_MASTER_MAP[k];
        break;
      }
    }
  }

  // Derive fallback date info
  const reqDateObj = item.requestDate ? new Date(item.requestDate) : null;
  const validReqDate = reqDateObj && !isNaN(reqDateObj.getTime()) ? reqDateObj : null;
  const compDateObj = item.completionDate ? new Date(item.completionDate) : null;
  const validCompDate = compDateObj && !isNaN(compDateObj.getTime()) ? compDateObj : null;

  let regMonth = item.regMonth || (excelRow && excelRow[0]) || '';
  if (!regMonth && validReqDate) {
    regMonth = validReqDate.getFullYear() <= 2025 ? '2025' : MONTH_SHORT_NAMES[validReqDate.getMonth()];
  }

  let section = item.section || (excelRow && excelRow[1]) || '';
  if (!section) {
    if (regMonth === '2025' || rawCode.includes('-25-') || rawCode.startsWith('SP25') || rawCode.startsWith('IMP25')) {
      section = 'S0';
    } else if (validReqDate) {
      section = validReqDate.getDate() <= 15 ? 'S1' : 'S2';
    }
  }

  let jobType = item.jobType || (excelRow && excelRow[2] && excelRow[2] !== '-' ? excelRow[2] : '') || '';
  if (!jobType) {
    if (item.categoryId === 'cat_improve') jobType = 'M';
    else if (item.categoryId === 'cat_project') jobType = 'D-A';
    else if (item.categoryId === 'cat_report') jobType = 'A';
    else jobType = 'D';
  }

  let subJobType = item.subJobType || (excelRow && excelRow[3] && excelRow[3] !== '-' ? excelRow[3] : '') || '';
  if (!subJobType) {
    subJobType = (item.quotation && item.quotation.trim() && item.quotation.trim() !== '-') ? '02 Outsource' : '01 In-house';
  }

  let priority = item.priority || (excelRow && excelRow[4] && excelRow[4] !== '-' ? excelRow[4] : '') || 'Medium';

  // Team & Support breakdown (Tooling 1-2, Design Support 1-2, Maintenance Support 1-5)
  const normalizeToolingName = (val) => {
    if (!val || val === '-') return '';
    const u = String(val).trim().toUpperCase();
    if (u.includes('KITTISAK')) return 'KITTISAK P.';
    if (u.includes('TANIN')) return 'TANIN P.';
    return '';
  };
  const normalizeDesignSupportName = (val) => {
    if (!val || val === '-') return '';
    const u = String(val).trim().toUpperCase();
    if (u.includes('SUTTHIPONG')) return 'SUTTHIPONG M.';
    if (u.includes('NARUEBODEE')) return 'NARUEBODEE C.';
    return '';
  };
  const normalizeMaintSupportName = (val) => {
    if (!val || val === '-') return '';
    const u = String(val).trim().toUpperCase();
    if (u.includes('NANTHAPONG')) return 'NANTHAPONG S.';
    if (u.includes('NAWAPON')) return 'NAWAPON M.';
    if (u.includes('SARAWUT')) return 'SARAWUT I.';
    if (u.includes('SUTTHINAN')) return 'SUTTHINAN K.';
    if (u.includes('VORAVIT')) return 'VORAVIT C.';
    return '';
  };

  let toolingTeam1 = item.toolingTeam1 !== undefined ? normalizeToolingName(item.toolingTeam1) : '';
  let toolingTeam2 = item.toolingTeam2 !== undefined ? normalizeToolingName(item.toolingTeam2) : '';
  if (item.toolingTeam1 === undefined && item.toolingTeam2 === undefined) {
    const rawTool = item.toolingTeam !== undefined ? item.toolingTeam : ((excelRow && excelRow[6] && excelRow[6] !== '-') ? excelRow[6] : '');
    const upperTool = String(rawTool || '').trim().toUpperCase();
    if (upperTool === 'ALL') {
      toolingTeam1 = 'KITTISAK P.';
      toolingTeam2 = 'TANIN P.';
    } else if (rawTool) {
      const parts = String(rawTool).split(',').map(s => normalizeToolingName(s)).filter(Boolean);
      toolingTeam1 = parts[0] || '';
      toolingTeam2 = parts[1] || '';
    }
  }

  let designSupport1 = item.designSupport1 !== undefined ? normalizeDesignSupportName(item.designSupport1) : '';
  let designSupport2 = item.designSupport2 !== undefined ? normalizeDesignSupportName(item.designSupport2) : '';
  if (item.designSupport1 === undefined && item.designSupport2 === undefined) {
    const rawSup = item.supportBy !== undefined ? item.supportBy : ((excelRow && excelRow[7] && excelRow[7] !== '-') ? excelRow[7] : '');
    const upperSup = String(rawSup || '').trim().toUpperCase();
    if (upperSup === 'ALL') {
      designSupport1 = 'SUTTHIPONG M.';
      designSupport2 = 'NARUEBODEE C.';
    } else if (rawSup) {
      const parts = String(rawSup).split(',').map(s => normalizeDesignSupportName(s)).filter(Boolean);
      designSupport1 = parts[0] || '';
      designSupport2 = parts[1] || '';
    }
  }

  let maintenanceSupport1 = normalizeMaintSupportName(item.maintenanceSupport1);
  let maintenanceSupport2 = normalizeMaintSupportName(item.maintenanceSupport2);
  let maintenanceSupport3 = normalizeMaintSupportName(item.maintenanceSupport3);
  let maintenanceSupport4 = normalizeMaintSupportName(item.maintenanceSupport4);
  let maintenanceSupport5 = normalizeMaintSupportName(item.maintenanceSupport5);
  if (
    item.maintenanceSupport1 === undefined &&
    item.maintenanceSupport2 === undefined &&
    item.maintenanceSupport3 === undefined &&
    item.maintenanceSupport4 === undefined &&
    item.maintenanceSupport5 === undefined
  ) {
    const rawSup = item.supportBy !== undefined ? item.supportBy : ((excelRow && excelRow[7] && excelRow[7] !== '-') ? excelRow[7] : '');
    if (rawSup) {
      const mParts = String(rawSup).split(',').map(s => normalizeMaintSupportName(s)).filter(Boolean);
      maintenanceSupport1 = mParts[0] || '';
      maintenanceSupport2 = mParts[1] || '';
      maintenanceSupport3 = mParts[2] || '';
      maintenanceSupport4 = mParts[3] || '';
      maintenanceSupport5 = mParts[4] || '';
    }
  }

  const toolingList = Array.from(new Set([toolingTeam1, toolingTeam2].filter(Boolean)));
  const designSupportList = Array.from(new Set([designSupport1, designSupport2].filter(Boolean)));
  const maintenanceSupportList = Array.from(new Set([
    maintenanceSupport1,
    maintenanceSupport2,
    maintenanceSupport3,
    maintenanceSupport4,
    maintenanceSupport5
  ].filter(Boolean)));
  const allSupportList = Array.from(new Set([...designSupportList, ...maintenanceSupportList]));

  const toolingTeam = toolingList.length > 0 ? toolingList.join(', ') : '-';
  const designSupport = designSupportList.length > 0 ? designSupportList.join(', ') : '-';
  const maintenanceSupport = maintenanceSupportList.length > 0 ? maintenanceSupportList.join(', ') : '-';
  const supportBy = allSupportList.length > 0 ? allSupportList.join(', ') : '-';
  const designTeam = '-';

  // Sub Status & Achievement (Respect explicit item.subStatus; fallback to Excel/status only if not set)
  let subStatus = item.subStatus || '';
  const st = item.status || 'in_progress';
  if (!subStatus) {
    subStatus = (excelRow && excelRow[8]) || '';
    if (st === 'done') {
      subStatus = '10 Finished';
    } else if (st === 'cancel' || st === 'cancle') {
      subStatus = 'Cancel';
    } else if (st === 'wait' || st === 'pending') {
      if (subStatus !== '00 Not Start' && subStatus !== 'Pending') {
        subStatus = 'Pending';
      }
    } else {
      if (!subStatus || subStatus === '10 Finished' || subStatus === 'Cancel' || subStatus === 'Pending') {
        subStatus = (excelRow && excelRow[8] && excelRow[8] !== '10 Finished' && excelRow[8] !== 'Cancel') ? excelRow[8] : '02 Concept Design';
      }
    }
  }

  const achievement = SUB_STATUS_ACHIEVEMENT_MAP[subStatus] !== undefined
    ? SUB_STATUS_ACHIEVEMENT_MAP[subStatus]
    : (typeof item.achievement === 'number' ? item.achievement : (st === 'done' ? 1 : 0.2));

  const actionDate = item.actionDate || (excelRow && excelRow[10]) || item.requestDate || '';
  const finishPlanDate = item.finishPlanDate || (excelRow && excelRow[11]) || item.completionDate || '';

  let finishedMonth = item.finishedMonth || (excelRow && excelRow[12]) || '';
  if (st === 'done' || subStatus === '10 Finished') {
    if (!finishedMonth) {
      if (validCompDate) {
        finishedMonth = MONTH_SHORT_NAMES[validCompDate.getMonth()];
      } else if (finishPlanDate) {
        const fpObj = new Date(finishPlanDate);
        if (!isNaN(fpObj.getTime())) finishedMonth = MONTH_SHORT_NAMES[fpObj.getMonth()];
      } else if (validReqDate) {
        finishedMonth = MONTH_SHORT_NAMES[validReqDate.getMonth()];
      }
    }
  } else if (st !== 'cancel' && st !== 'cancle') {
    finishedMonth = '';
  }

  return {
    regMonth: regMonth || '-',
    section: section || '-',
    jobType: jobType || '-',
    subJobType: subJobType || '01 In-house',
    priority: priority || 'Medium',
    designTeam: designTeam,
    toolingTeam1,
    toolingTeam2,
    toolingTeam: toolingTeam,
    designSupport1,
    designSupport2,
    designSupport,
    maintenanceSupport1,
    maintenanceSupport2,
    maintenanceSupport3,
    maintenanceSupport4,
    maintenanceSupport5,
    maintenanceSupport,
    supportBy: supportBy,
    subStatus: subStatus,
    achievement: achievement,
    achievementPct: Math.round(achievement * 100),
    actionDate: actionDate,
    finishPlanDate: finishPlanDate,
    finishedMonth: finishedMonth
  };
}

function getJobTypeTitle(jobTypeCode) {
  if (!jobTypeCode || jobTypeCode === '-') return '-';
  const parts = String(jobTypeCode).split('-').map(p => p.trim().toUpperCase());
  const mapped = parts.map(p => JOB_TYPE_LABELS[p] || p);
  return mapped.join(' + ');
}

function setExcelFilter(filterType, value) {
  if (filterType === 'section') currentSectionFilter = value;
  else if (filterType === 'jobType') currentJobTypeFilter = value;
  else if (filterType === 'subJobType') currentSubJobTypeFilter = value;
  else if (filterType === 'priority') currentPriorityFilter = value;
  else if (filterType === 'subStatus') currentSubStatusFilter = value;
  updateEngActiveFilterBanner();
  renderContent();
}

// --- Filtering Logic ---
function getFilteredAchievements() {
  return achievements.filter(item => {
    const xl = getTaskExcelTracking(item);

    // Search Query (Matches title, request number, quotation, requestName, assignee, department, factory, process, desc, note, and Excel fields)
    if (currentSearch) {
      const titleMatch = (item.title || '').toLowerCase().includes(currentSearch);
      const codeMatch = (item.code || '').toLowerCase().includes(currentSearch);
      const quotMatch = (item.quotation || '').toLowerCase().includes(currentSearch);
      const reqNameMatch = (item.requestName || '').toLowerCase().includes(currentSearch);
      const assigneeMatch = (item.assignee || '').toLowerCase().includes(currentSearch);
      const deptMatch = (item.department || '').toLowerCase().includes(currentSearch);
      const facMatch = (item.factory || '').toLowerCase().includes(currentSearch);
      const procMatch = (item.process || '').toLowerCase().includes(currentSearch);
      const descMatch = (item.description || '').toLowerCase().includes(currentSearch);
      const noteMatch = (item.note || '').toLowerCase().includes(currentSearch);
      const folderName = getFolderName(item.workFolder).toLowerCase();
      const folderPath = getFolderPath(item.workFolder).toLowerCase();
      const folderMatch = folderName.includes(currentSearch) || folderPath.includes(currentSearch);
      const xlTeamMatch = (xl.designTeam || '').toLowerCase().includes(currentSearch) ||
                          (xl.toolingTeam || '').toLowerCase().includes(currentSearch) ||
                          (xl.supportBy || '').toLowerCase().includes(currentSearch) ||
                          (xl.subStatus || '').toLowerCase().includes(currentSearch) ||
                          (xl.jobType || '').toLowerCase().includes(currentSearch);
      if (!titleMatch && !codeMatch && !quotMatch && !reqNameMatch && !assigneeMatch && !deptMatch && !facMatch && !procMatch && !descMatch && !noteMatch && !folderMatch && !xlTeamMatch) return false;
    }

    if (currentCategoryFilter !== 'all' && item.categoryId !== currentCategoryFilter) {
      return false;
    }

    if (currentStatusFilter !== 'all') {
      if (currentStatusFilter === 'cancel' || currentStatusFilter === 'cancle') {
        if (item.status !== 'cancel' && item.status !== 'cancle') return false;
      } else if (currentStatusFilter === 'wait' || currentStatusFilter === 'pending') {
        if (item.status !== 'wait' && item.status !== 'pending') return false;
      } else if (item.status !== currentStatusFilter) {
        return false;
      }
    }

    if (currentAssigneeFilter !== 'all') {
      const targetAss = currentAssigneeFilter.toUpperCase();
      const mainMatch = (item.assignee || '').trim().toUpperCase() === targetAss;
      const teamMatch = (xl.designTeam || '').toUpperCase().includes(targetAss.split(' ')[0]) ||
                        (xl.toolingTeam || '').toUpperCase().includes(targetAss.split(' ')[0]) ||
                        (xl.supportBy || '').toUpperCase().includes(targetAss.split(' ')[0]);
      if (!mainMatch && !teamMatch) {
        return false;
      }
    }

    // Excel Specific Filters
    if (currentSectionFilter !== 'all') {
      if ((xl.section || '').toUpperCase() !== currentSectionFilter.toUpperCase()) return false;
    }
    if (currentJobTypeFilter !== 'all') {
      const jtCode = (xl.jobType || 'D').trim().toUpperCase();
      if (jtCode !== currentJobTypeFilter.toUpperCase()) {
        return false;
      }
    }
    if (currentSubJobTypeFilter !== 'all') {
      if ((xl.subJobType || '').toLowerCase() !== currentSubJobTypeFilter.toLowerCase()) return false;
    }
    if (currentPriorityFilter !== 'all') {
      if ((xl.priority || '').toLowerCase() !== currentPriorityFilter.toLowerCase()) return false;
    }
    if (currentSubStatusFilter !== 'all') {
      if ((xl.subStatus || '').toLowerCase() !== currentSubStatusFilter.toLowerCase()) return false;
    }

    // Engineering Insights Specific Field Filters (Factory, Department, Process, Design Support, Maintenance Support)
    if (currentFactoryFilter !== 'all') {
      const facRaw = (item.factory || '').trim();
      const facKey = (!facRaw || facRaw === '-') ? '__UNSPECIFIED__' : facRaw;
      if (facKey.toUpperCase() !== currentFactoryFilter.toUpperCase()) return false;
    }
    if (currentDeptFilter !== 'all') {
      const deptRaw = (item.department || '').trim();
      const deptKey = (!deptRaw || deptRaw === '-') ? '__UNSPECIFIED__' : deptRaw;
      if (deptKey.toUpperCase() !== currentDeptFilter.toUpperCase()) return false;
    }
    if (currentProcessFilter !== 'all') {
      const procRaw = (item.process || '').trim();
      const procKey = (!procRaw || procRaw === '-') ? '__UNSPECIFIED__' : procRaw;
      if (procKey.toUpperCase() !== currentProcessFilter.toUpperCase()) return false;
    }
    if (currentDesignSupportFilter !== 'all') {
      const dSup = (xl.designTeam && xl.designTeam !== '-') ? xl.designTeam : ((item.assignee || 'UNASSIGNED').trim() || 'UNASSIGNED');
      if (dSup.toUpperCase() !== currentDesignSupportFilter.toUpperCase()) return false;
    }
    if (currentMaintSupportFilter !== 'all') {
      const mSup = (xl.supportBy && xl.supportBy !== '-') ? xl.supportBy : ((xl.toolingTeam && xl.toolingTeam !== '-') ? xl.toolingTeam : ((item.assignee || 'UNASSIGNED').trim() || 'UNASSIGNED'));
      if (mSup.toUpperCase() !== currentMaintSupportFilter.toUpperCase()) return false;
    }

    if (currentTimeFilter !== 'all') {
      const dateStr = item.completionDate || item.requestDate || item.createdAt;
      if (!dateStr) return false;
      const itemDate = new Date(dateStr);
      const now = new Date();

      if (currentTimeFilter === 'this_month') {
        if (itemDate.getFullYear() !== now.getFullYear() || itemDate.getMonth() !== now.getMonth()) {
          return false;
        }
      } else if (currentTimeFilter === 'last_3_months') {
        const threeMonthsAgo = new Date();
        threeMonthsAgo.setMonth(now.getMonth() - 3);
        if (itemDate < threeMonthsAgo) return false;
      } else if (currentTimeFilter === 'this_year') {
        if (itemDate.getFullYear() !== now.getFullYear()) {
          return false;
        }
      }
    }

    return true;
  }).sort((a, b) => {
    const orderMap = { wait: 1, pending: 1, in_progress: 2, done: 3, cancel: 4, cancle: 4 };
    const orderA = orderMap[a.status] || 5;
    const orderB = orderMap[b.status] || 5;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    const dateA = new Date(a.completionDate || a.requestDate || a.createdAt);
    const dateB = new Date(b.completionDate || b.requestDate || b.createdAt);
    return dateB - dateA;
  });
}

// --- Render Content ---
function renderContent() {
  const container = document.getElementById('viewContainer');
  if (!container) return;

  const filtered = getFilteredAchievements();

  const countEl = document.getElementById('filterCount');
  if (countEl) {
    if (filtered.length === achievements.length) {
      countEl.innerHTML = `📊 ทั้งหมด <b>${achievements.length}</b> งาน (TASKS)`;
    } else {
      countEl.innerHTML = `📊 พบ <b>${filtered.length}</b> จาก <b>${achievements.length}</b> งาน (TASKS)`;
    }
  }

  const mobileCountEl = document.getElementById('mobileRecordCount');
  if (mobileCountEl) {
    mobileCountEl.textContent = filtered.length;
  }
  const mobileStatusInfo = document.getElementById('mobileStatusInfo');
  if (mobileStatusInfo) {
    mobileStatusInfo.textContent = isFirebaseConnected ? 'CLOUD: ONLINE' : 'LOCAL';
  }

  updateResetFilterButtonVisibility();

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">📂</div>
        <h3 class="empty-title">ไม่พบงานที่ตรงกับเงื่อนไขการค้นหา</h3>
        <p class="empty-subtitle">ลองปรับคำค้นหา หรือกดปุ่ม "เพิ่มงานใหม่" เพื่อบันทึกงานใหม่เข้าสู่ระบบฝ่ายเทคโนโลยี</p>
        <button class="btn btn-primary" onclick="openAchievementModal()">
          <svg width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg>
          เพิ่มงานใหม่ (ADD TASK)
        </button>
      </div>
    `;
    return;
  }

  if (currentView === 'cards') {
    renderCardsView(container, filtered);
  } else if (currentView === 'timeline') {
    renderTimelineView(container, filtered);
  } else if (currentView === 'table') {
    renderTableView(container, filtered);
  }
}

// 1. Cards View (Clean Modern Cards for Desktop & Mobile)
function renderCardsView(container, items) {
  let html = '<div class="cards-grid">';
  items.forEach(item => {
    const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#2563eb' };
    const statusHtml = getStatusPillHtml(item.status);
    const displayDate = item.completionDate || item.requestDate || '-';

    html += `
      <div class="ios-task-card ${item.status === 'done' ? 'card-status-done' : ((item.status === 'cancel' || item.status === 'cancle') ? 'card-status-cancel' : '')}" id="ios-card-${item.id}">
        <!-- Top bar: Category Badge + Status Pill + Mobile More Button -->
        <div class="ios-card-header-bar">
          <div class="ios-card-cat-badge" style="background-color: ${cat.color}12; color: ${cat.color}; border: 1px solid ${cat.color}30;">
            <span class="cat-icon">${cat.icon || '📁'}</span>
            <span class="cat-name">${escapeHtml(uppercaseEnglish(cat.name))}</span>
          </div>
          <div class="ios-card-header-right">
            ${statusHtml}
            <button type="button" class="ios-card-more-btn" onclick="openMobileActionSheet('${item.id}', event)" title="เมนูจัดการ" aria-label="More">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2.2"/><circle cx="12" cy="12" r="2.2"/><circle cx="19" cy="12" r="2.2"/></svg>
            </button>
          </div>
        </div>

        <!-- Main Card Body -->
        <div class="ios-card-body">
          <div class="ios-card-title" onclick="viewAchievementDetail('${item.id}')" title="คลิกเพื่อดูรายละเอียด">
            <span style="font-size: 13.5px; flex-shrink: 0;">📄</span>
            <span>${escapeHtml(uppercaseEnglish(item.title))}</span>
          </div>

          <!-- Clean 2x2 Key-Value Metadata Grid -->
          <div class="webull-data-grid">
            <div class="data-item">
              <span class="data-label">REQUEST &amp; QUOTATION</span>
              <div style="display: flex; align-items: center; gap: 4px; flex-wrap: wrap; margin-top: 2px;">
                ${item.code ? `<span class="badge-code" style="font-size: 10.5px; padding: 1.5px 6px;">${escapeHtml(uppercaseEnglish(item.code))}</span>` : '<span class="data-val">-</span>'}
                ${item.quotation && item.quotation !== '-' ? `<span class="badge-quotation" style="font-size: 10.5px; padding: 1.5px 6px;">Q: ${escapeHtml(uppercaseEnglish(item.quotation))}</span>` : ''}
              </div>
            </div>
            <div class="data-item">
              <span class="data-label">DATE</span>
              <span class="data-val">${escapeHtml(displayDate)}</span>
            </div>
            <div class="data-item">
              <span class="data-label">REQUESTER</span>
              <span class="data-val">${item.requestName ? `👤 ${escapeHtml(uppercaseEnglish(item.requestName))}` : '-'}</span>
            </div>
            <div class="data-item">
              <span class="data-label">ASSIGNEE</span>
              <span class="data-val assignee-val">${item.assignee ? `😎 ${escapeHtml(uppercaseEnglish(item.assignee))}` : '-'}</span>
            </div>
          </div>

          <!-- Location Tags (Factory / Dept / Process) -->
          ${(item.factory || item.department || item.process) ? `
            <div class="card-location-tags">
              ${item.factory ? `<span class="badge-dept" style="font-size: 10px; padding: 2px 6px;">🏢 ${escapeHtml(uppercaseEnglish(item.factory))}</span>` : ''}
              ${item.department ? `<span class="badge-dept" style="font-size: 10px; padding: 2px 6px;">👥 ${escapeHtml(uppercaseEnglish(item.department))}</span>` : ''}
              ${item.process ? `<span class="badge-dept" style="font-size: 10px; padding: 2px 6px;">⚙️ ${escapeHtml(uppercaseEnglish(item.process))}</span>` : ''}
            </div>
          ` : ''}

          <!-- Note & Description (Clean & Compact like Table Mode) -->
          ${(item.note || item.description) ? `
            <div class="card-detail-stack">
              ${item.note && item.note !== '-' ? `
                <div class="card-note-banner" title="${escapeHtml(uppercaseEnglish(item.note))}">
                  📌 ${escapeHtml(uppercaseEnglish(item.note))}
                </div>
              ` : ''}
              ${item.description && item.description !== '-' ? `
                <div class="card-desc-snippet" title="${escapeHtml(uppercaseEnglish(item.description))}">
                  ${escapeHtml(uppercaseEnglish(item.description))}
                </div>
              ` : ''}
            </div>
          ` : ''}

          <!-- Card Footer: Attachments (Left) + Actions (Right) -->
          <div class="ios-card-footer" onclick="event.stopPropagation()">
            <div class="ios-card-file-chips">
              ${item.pdfAttachment ? `
                <div class="table-badge-group">
                  <button type="button" class="badge-pdf" onclick="openPdfAttachment('${item.id}')" title="เปิดดู JOB REQUEST PDF" style="font-size: 10px; padding: 2px 6px;">📄 PDF</button>
                  <button type="button" class="badge-pdf badge-dl" onclick="downloadPdfAttachment('${item.id}')" title="ดาวน์โหลดไฟล์ PDF" style="font-size: 10px; padding: 2px 4px; border-left: none; font-weight: bold;">⬇️</button>
                </div>` : ''}
              ${item.workFolder ? `
                <div class="table-badge-group">
                  <button type="button" class="badge-folder" onclick="openWorkFolderModal('${item.id}')" title="เปิดดูข้อมูลโฟลเดอร์ผลงาน" style="font-size: 10px; padding: 2px 6px;">📁 ${escapeHtml(getFolderBadgeText(item.workFolder))}</button>
                  <button type="button" class="badge-folder badge-dl" onclick="downloadWorkFolderAttachment('${item.id}')" title="ดาวน์โหลดโฟลเดอร์เป็น ZIP" style="font-size: 10px; padding: 2px 4px; border-left: none; font-weight: bold;">📥</button>
                </div>` : ''}
              ${item.imageData ? (
                isDrawingPdf(item.imageData) ? `
                  <div class="table-badge-group">
                    <button type="button" class="badge-pdf" onclick="openDrawingAttachment('${item.id}')" title="เปิดดู DRAWING (PDF)" style="font-size: 10px; padding: 2px 6px; background:#ecfdf5; color:#065f46; border-color:#a7f3d0;">📄 DWG</button>
                    <button type="button" class="badge-pdf badge-dl" onclick="downloadImageAttachment('${item.id}')" title="ดาวน์โหลด DRAWING (PDF)" style="font-size: 10px; padding: 2px 4px; background:#ecfdf5; color:#065f46; border-color:#a7f3d0; border-left: none; font-weight: bold;">⬇️</button>
                  </div>` : `
                  <div class="table-badge-group">
                    <button type="button" class="badge-code" onclick="openDrawingAttachment('${item.id}')" title="ดูรูปภาพ DRAWING" style="font-size: 10px; padding: 2px 6px; cursor: pointer;">🖼️ IMG</button>
                    <button type="button" class="badge-code badge-dl" onclick="downloadImageAttachment('${item.id}')" title="ดาวน์โหลดรูปภาพ" style="font-size: 10px; padding: 2px 4px; cursor: pointer; border-left: none; font-weight: bold;">⬇️</button>
                  </div>`
              ) : ''}
            </div>

            <div class="card-actions" style="margin-left: auto;">
              <button type="button" class="btn btn-outline btn-sm btn-icon" onclick="viewAchievementDetail('${item.id}')" title="ดูรายละเอียด">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              </button>
              <button type="button" class="btn btn-outline btn-sm btn-icon" onclick="openAchievementModal('${item.id}')" title="แก้ไข">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button type="button" class="btn btn-outline btn-sm btn-icon text-danger" onclick="deleteAchievement('${item.id}')" title="ลบ">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  });
  html += '</div>';
  container.innerHTML = html;
}

// --- iOS Mobile Native Interaction Handlers ---
function toggleCardAccordion(id, event) {
  if (event && event.target.closest('.ios-card-more-btn, .ios-card-file-chips, .btn')) {
    return;
  }
  const acc = document.getElementById('accordion-' + id);
  const chevron = document.getElementById('chevron-' + id);
  if (!acc) return;
  const isExpanded = acc.classList.toggle('expanded');
  if (chevron) {
    chevron.textContent = isExpanded ? '▴' : '▾';
  }
}

let currentActionSheetTaskId = null;

function openMobileActionSheet(id, event) {
  if (event) {
    event.stopPropagation();
    event.preventDefault();
  }
  currentActionSheetTaskId = id;
  const item = achievements.find(a => a.id === id);
  if (!item) return;

  const sheet = document.getElementById('mobileActionSheet');
  const titleEl = document.getElementById('actionSheetTitle');
  const iconEl = document.getElementById('actionSheetIcon');
  if (titleEl) titleEl.textContent = uppercaseEnglish(item.title);
  if (iconEl) {
    const cat = categories.find(c => c.id === item.categoryId);
    iconEl.textContent = cat ? cat.icon : '📄';
  }
  if (sheet) sheet.classList.add('active');
}

function closeMobileActionSheet(event) {
  if (event && event.target !== event.currentTarget) return;
  const sheet = document.getElementById('mobileActionSheet');
  if (sheet) sheet.classList.remove('active');
  currentActionSheetTaskId = null;
}

function executeActionSheetEdit() {
  const id = currentActionSheetTaskId;
  closeMobileActionSheet();
  if (id) openAchievementModal(id);
}

function executeActionSheetDelete() {
  const id = currentActionSheetTaskId;
  closeMobileActionSheet();
  if (id) deleteAchievement(id);
}

function openMobileSortSheet() {
  const sheet = document.getElementById('mobileSortSheet');
  if (sheet) sheet.classList.add('active');
}

function closeMobileSortSheet(event) {
  if (event && event.target !== event.currentTarget) return;
  const sheet = document.getElementById('mobileSortSheet');
  if (sheet) sheet.classList.remove('active');
}

function setMobileStatusFilter(status) {
  currentStatusFilter = status;
  const statusSelect = document.getElementById('statusFilter');
  if (statusSelect) statusSelect.value = status;

  document.querySelectorAll('.mobile-filter-pill').forEach(pill => {
    pill.classList.toggle('active', pill.getAttribute('data-status-filter') === status);
  });

  const sortLabel = document.getElementById('mobileSortLabel');
  if (sortLabel) {
    if (status === 'all') sortLabel.textContent = 'SORT';
    else if (status === 'in_progress') sortLabel.textContent = 'IN PROGRESS';
    else if (status === 'wait' || status === 'pending') sortLabel.textContent = 'PENDING';
    else if (status === 'done') sortLabel.textContent = 'DONE';
    else if (status === 'cancel') sortLabel.textContent = 'CANCEL';
    else sortLabel.textContent = status.toUpperCase();
  }

  renderContent();
}

function applyMobileSort(type) {
  closeMobileSortSheet();
  const sortLabel = document.getElementById('mobileSortLabel');
  if (type === 'all') {
    setMobileStatusFilter('all');
  } else if (type === 'done' || type === 'in_progress' || type === 'wait' || type === 'pending' || type === 'cancel') {
    setMobileStatusFilter(type);
  } else if (type === 'newest') {
    if (sortLabel) sortLabel.textContent = 'NEWEST';
  } else if (type === 'oldest') {
    if (sortLabel) sortLabel.textContent = 'OLDEST';
  }
  renderContent();
}

function openMobileToolsSheet() {
  const sheet = document.getElementById('mobileToolsSheet');
  if (sheet) sheet.classList.add('active');
}

function closeMobileToolsSheet(event) {
  if (event && event.target !== event.currentTarget) return;
  const sheet = document.getElementById('mobileToolsSheet');
  if (sheet) sheet.classList.remove('active');
}

function switchMobileNavTab(tabName) {
  const normalizedTab = (tabName === 'analytics' || tabName === 'dashboard') ? 'dashboard' : tabName;

  document.querySelectorAll('.mobile-tab-item').forEach(btn => {
    const bTab = btn.getAttribute('data-mobile-tab');
    const isMatch = (bTab === normalizedTab) || (normalizedTab === 'dashboard' && bTab === 'analytics');
    btn.classList.toggle('active', isMatch);
  });

  const viewContainer = document.getElementById('viewContainer');
  const statsSection = document.querySelector('.stats-grid');
  const analyticsSection = document.querySelector('.analytics-section');
  const rankingSection = document.getElementById('requesterRankingSection');
  const heroSection = document.querySelector('.murata-hero-section');
  const navTitle = document.getElementById('mobileNavTitle');
  const headerTitle = document.getElementById('mobileHeaderTitle');
  const searchRow = document.querySelector('.mobile-search-sort-bar');
  const filterRow = document.querySelector('.mobile-quick-filter-scroll');

  if (normalizedTab === 'dashboard') {
    if (viewContainer) viewContainer.style.display = 'none';
    if (statsSection) statsSection.style.display = 'grid';
    if (analyticsSection) analyticsSection.style.display = 'block';
    if (rankingSection) rankingSection.style.display = 'block';
    if (heroSection) heroSection.style.display = 'none';
    if (searchRow) searchRow.style.display = 'flex';
    if (filterRow) filterRow.style.display = 'none';
    if (navTitle) navTitle.textContent = 'DASHBOARD';
    if (headerTitle) headerTitle.innerHTML = 'DASHBOARD';
    renderStats();
    renderCharts();
    renderRequesterRanking();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (normalizedTab === 'tasks') {
    currentView = 'cards';
    if (viewContainer) viewContainer.style.display = 'block';
    if (statsSection) statsSection.style.display = 'none';
    if (analyticsSection) analyticsSection.style.display = 'none';
    if (rankingSection) rankingSection.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (searchRow) searchRow.style.display = 'flex';
    if (filterRow) filterRow.style.display = 'flex';
    if (navTitle) navTitle.textContent = 'TASKS';
    if (headerTitle) headerTitle.innerHTML = 'ACHIEVEMENT <span class="brand-red">RECORD</span>';
    renderContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (normalizedTab === 'timeline') {
    currentView = 'timeline';
    if (viewContainer) viewContainer.style.display = 'block';
    if (statsSection) statsSection.style.display = 'none';
    if (analyticsSection) analyticsSection.style.display = 'none';
    if (rankingSection) rankingSection.style.display = 'none';
    if (heroSection) heroSection.style.display = 'none';
    if (searchRow) searchRow.style.display = 'flex';
    if (filterRow) filterRow.style.display = 'none';
    if (navTitle) navTitle.textContent = 'TIMELINE';
    if (headerTitle) headerTitle.innerHTML = 'ACTIVITY <span class="brand-red">TIMELINE</span>';
    renderContent();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

function handleMobileSearch(val) {
  currentSearch = val ? val.trim() : '';
  const clearBtn = document.getElementById('mobileSearchClear');
  if (clearBtn) clearBtn.style.display = currentSearch ? 'flex' : 'none';
  const desktopSearch = document.getElementById('searchInput');
  if (desktopSearch) desktopSearch.value = currentSearch;

  const activeTab = document.querySelector('.mobile-tab-item.active')?.getAttribute('data-mobile-tab');
  if (activeTab === 'dashboard' && currentSearch.length > 0) {
    switchMobileNavTab('tasks');
  } else {
    renderContent();
  }
}

function clearMobileSearch() {
  const input = document.getElementById('mobileSearchInput');
  if (input) input.value = '';
  handleMobileSearch('');
}

// 2. Timeline View
function renderTimelineView(container, items) {
  const groups = {};
  items.forEach(item => {
    const dStr = item.completionDate || item.requestDate || item.createdAt;
    const d = new Date(dStr);
    const groupKey = isNaN(d.getTime()) ? 'อยู่ระหว่างดำเนินการ / รอสั่ง' : `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(item);
  });

  const thaiMonths = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];

  let html = '<div class="timeline-container">';
  const sortedKeys = Object.keys(groups).sort().reverse();

  sortedKeys.forEach(key => {
    let label = key;
    if (key.includes('-')) {
      const [y, m] = key.split('-');
      const mIdx = parseInt(m, 10) - 1;
      label = `📅 ${thaiMonths[mIdx]} ค.ศ. ${y} (พ.ศ. ${parseInt(y, 10) + 543})`;
    }

    html += `
      <div class="timeline-group">
        <div class="timeline-month-badge">${label} (${groups[key].length} รายการ)</div>
    `;

    groups[key].forEach(item => {
      const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#64748b' };
      const statusHtml = getStatusPillHtml(item.status);
      const dateDisplay = item.completionDate || item.requestDate || '-';

      html += `
        <div class="timeline-item">
          <div class="timeline-dot" style="border-color: ${cat.color};"></div>
          <div class="timeline-card ${item.status === 'done' ? 'card-status-done' : ((item.status === 'cancel' || item.status === 'cancle') ? 'card-status-cancel' : '')}">
            <div class="card-header-meta">
              <span class="category-badge" style="background-color: ${cat.color}15; color: ${cat.color};">
                ${cat.icon} ${escapeHtml(uppercaseEnglish(cat.name))}
              </span>
              <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
                ${item.code ? `<span class="badge-code">REQ: ${escapeHtml(uppercaseEnglish(item.code))}</span>` : ''}
                ${statusHtml}
              </div>
            </div>

            <h4 class="card-title" onclick="viewAchievementDetail('${item.id}')">${escapeHtml(uppercaseEnglish(item.title))}</h4>
            <p class="card-desc" style="-webkit-line-clamp: 2;">${escapeHtml(uppercaseEnglish(item.description || ''))}</p>

            ${item.note ? `
              <div class="note-callout">
                📌 <strong>NOTE:</strong> ${escapeHtml(uppercaseEnglish(item.note))}
              </div>
            ` : ''}

            <div class="timeline-card-footer" style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 12px; color: var(--text-muted); flex-wrap: wrap; gap: 8px;">
              <span style="line-height: 1.4;">🗓️ DATE: ${dateDisplay} | REQ BY: ${escapeHtml(uppercaseEnglish(item.requestName || '-'))}${item.assignee ? ` | ASSIGN: 😎 ${escapeHtml(uppercaseEnglish(item.assignee))}` : ''}</span>
              <div class="card-actions">
                <button class="btn btn-outline btn-sm" onclick="openAchievementModal('${item.id}')">แก้ไข</button>
                <button class="btn btn-outline btn-sm text-danger" onclick="deleteAchievement('${item.id}')">ลบ</button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    html += `</div>`;
  });

  html += '</div>';
  container.innerHTML = html;
}

// --- Table Mode Switcher & Controls ---
function setTableMode(mode) {
  tableMode = mode;
  localStorage.setItem('orbray_table_mode', mode);
  renderContent();
}

function scrollTable(direction) {
  const container = document.getElementById('tableScrollContainer');
  if (!container) return;
  if (direction === 'start') {
    container.scrollTo({ left: 0, behavior: 'smooth' });
  } else if (direction === 'end') {
    container.scrollTo({ left: container.scrollWidth, behavior: 'smooth' });
  } else {
    const scrollAmount = direction === 'left' ? -450 : 450;
    container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
  }
}

function initFullTableHorizontalScrollHelpers() {
  const tableContainer = document.getElementById('tableScrollContainer');
  const topScrollWrap = document.getElementById('topScrollTrackWrap');
  const topScrollDummy = document.getElementById('topScrollDummy');
  if (!tableContainer) return;

  const tableEl = tableContainer.querySelector('.table-full');
  if (!tableEl) return;

  // 1. Sync Top Horizontal Scrollbar with Table Container
  if (topScrollWrap && topScrollDummy) {
    const updateDummyWidth = () => {
      topScrollDummy.style.width = tableEl.scrollWidth + 'px';
    };
    updateDummyWidth();
    setTimeout(updateDummyWidth, 60);

    let isSyncingFromTop = false;
    let isSyncingFromBottom = false;

    topScrollWrap.addEventListener('scroll', () => {
      if (isSyncingFromBottom) return;
      isSyncingFromTop = true;
      tableContainer.scrollLeft = topScrollWrap.scrollLeft;
      requestAnimationFrame(() => { isSyncingFromTop = false; });
    });

    tableContainer.addEventListener('scroll', () => {
      if (isSyncingFromTop) return;
      isSyncingFromBottom = true;
      topScrollWrap.scrollLeft = tableContainer.scrollLeft;
      requestAnimationFrame(() => { isSyncingFromBottom = false; });
    });
  }

  // 2. Click-and-Drag (Grab & Pan) Horizontal Scrolling on Full Table
  tableContainer.classList.add('grab-scroll-enabled');
  let isDown = false;
  let startX = 0;
  let scrollLeftStart = 0;
  let hasDragged = false;

  tableContainer.addEventListener('mousedown', (e) => {
    // Do not hijack clicks on interactive elements
    if (e.target.closest('button, a, select, input, .badge-assignee, .sub-status-pill, .badge-priority, .badge-sub-job, .badge-section')) {
      return;
    }
    isDown = true;
    hasDragged = false;
    startX = e.pageX - tableContainer.offsetLeft;
    scrollLeftStart = tableContainer.scrollLeft;
  });

  tableContainer.addEventListener('mouseleave', () => {
    isDown = false;
    tableContainer.classList.remove('is-grabbing');
  });

  tableContainer.addEventListener('mouseup', () => {
    isDown = false;
    setTimeout(() => {
      tableContainer.classList.remove('is-grabbing');
    }, 20);
  });

  tableContainer.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const x = e.pageX - tableContainer.offsetLeft;
    const walk = (x - startX) * 1.35;
    if (Math.abs(walk) > 6) {
      hasDragged = true;
      tableContainer.classList.add('is-grabbing');
      e.preventDefault();
      tableContainer.scrollLeft = scrollLeftStart - walk;
    }
  });
}

// 3. Table View (Dual Mode: Fit Screen / Full Columns)
function renderTableView(container, items) {
  const isCompact = tableMode === 'compact';

  // Calculate Excel Achievement Summary across current filtered items
  let totalAchvScore = 0;
  let countDone = 0;
  let countInProg = 0;
  let countWait = 0;
  let countCancel = 0;

  items.forEach(it => {
    const xl = getTaskExcelTracking(it);
    totalAchvScore += (typeof xl.achievement === 'number' ? xl.achievement : 0);
    if (it.status === 'done') countDone++;
    else if (it.status === 'in_progress') countInProg++;
    else if (it.status === 'cancel' || it.status === 'cancle') countCancel++;
    else countWait++;
  });
  const avgAchvPct = items.length > 0 ? ((totalAchvScore / items.length) * 100).toFixed(1) : '0.0';
  const hasExcelFilter = currentSectionFilter !== 'all' || currentJobTypeFilter !== 'all' || currentSubJobTypeFilter !== 'all' || currentPriorityFilter !== 'all' || currentSubStatusFilter !== 'all';

  let html = `
    <!-- Sticky Header Zone: Toolbar + Top Horizontal Scrollbar -->
    <div class="${!isCompact ? 'table-sticky-header-zone' : ''}">
      <div class="table-toolbar" style="flex-direction: column; align-items: stretch; gap: 10px; ${!isCompact ? 'border-bottom: none;' : ''}">
        <div style="display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
            <span style="font-size: 12px; font-weight: 700; color: var(--secondary);">รูปแบบการแสดงผล:</span>
            <div class="mode-pills">
              <button class="mode-pill ${isCompact ? 'active' : ''}" onclick="setTableMode('compact')" title="พอดีหน้าจอ: รวมข้อมูลสำคัญ ไม่ต้องเลื่อนซ้ายขวา">
                📱 พอดีจอ (FIT SCREEN)
              </button>
              <button class="mode-pill ${!isCompact ? 'active' : ''}" onclick="setTableMode('full')" title="ตารางเต็ม: แสดงครบทุกฟังก์ชันตามไฟล์ Excel Master พร้อมตรึงหัวตาราง">
                📊 ตารางเต็ม (FULL COLUMNS)
              </button>
            </div>
          </div>

          ${!isCompact ? `
            <div style="display: flex; align-items: center; gap: 8px; flex-wrap: wrap;">
              <div style="background: #ecfdf5; border: 1px solid #a7f3d0; color: #065f46; padding: 4px 10px; border-radius: 6px; font-size: 11.5px; font-weight: 800; display: inline-flex; align-items: center; gap: 6px;">
                <span>📈 ACHIEVEMENT SCORE:</span>
                <span style="color: #047857; font-size: 12.5px;">${totalAchvScore.toFixed(1)} / ${items.length} (${avgAchvPct}%)</span>
              </div>
              <div class="scroll-actions">
                <button class="btn-scroll" onclick="scrollTable('start')" title="ไปซ้ายสุดของตาราง" style="padding: 4px 7px;">⏮</button>
                <button class="btn-scroll" onclick="scrollTable('left')" title="เลื่อนไปทางซ้าย">◀ เลื่อนซ้าย</button>
                <button class="btn-scroll" onclick="scrollTable('right')" title="เลื่อนไปทางขวา">เลื่อนขวา ▶</button>
                <button class="btn-scroll" onclick="scrollTable('end')" title="ไปขวาสุดของตาราง" style="padding: 4px 7px;">⏭</button>
              </div>
            </div>
          ` : `
            <div style="font-size: 11.5px; color: #059669; font-weight: 600; display: flex; align-items: center; gap: 4px;">
              <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
              พอดีหน้าจอ — รวมข้อมูลสำคัญ ไม่ต้องเลื่อนซ้ายขวา
            </div>
          `}
        </div>

        ${!isCompact ? `
          <!-- Excel Engineering Quick Filters Bar -->
          <div class="excel-toolbar-filters" style="padding-top: 8px; border-top: 1px dashed #cbd5e1; justify-content: space-between;">
            <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
              <span style="font-size: 11px; font-weight: 800; color: #1e3a8a; display: inline-flex; align-items: center; gap: 4px; margin-right: 4px;">
                🗂️ ตัวกรอง EXCEL:
              </span>
              <select class="excel-filter-select ${currentSectionFilter !== 'all' ? 'active-filter' : ''}" onchange="setExcelFilter('section', this.value)" title="กรองตามช่วงเวลาลงทะเบียน (Section S0/S1/S2)">
                <option value="all" ${currentSectionFilter === 'all' ? 'selected' : ''}>SECTION: ทั้งหมด</option>
                <option value="S0" ${currentSectionFilter === 'S0' ? 'selected' : ''}>S0 (งานค้างปี 2025)</option>
                <option value="S1" ${currentSectionFilter === 'S1' ? 'selected' : ''}>S1 (วันที่ 1 - 15)</option>
                <option value="S2" ${currentSectionFilter === 'S2' ? 'selected' : ''}>S2 (วันที่ 16 - 31)</option>
              </select>

              <select class="excel-filter-select ${currentJobTypeFilter !== 'all' ? 'active-filter' : ''}" onchange="setExcelFilter('jobType', this.value)" title="กรองตามประเภทงานวิศวกรรม (Job Type)">
                <option value="all" ${currentJobTypeFilter === 'all' ? 'selected' : ''}>JOB TYPE: ทั้งหมด</option>
                <option value="D" ${currentJobTypeFilter === 'D' ? 'selected' : ''}>D : Design</option>
                <option value="R" ${currentJobTypeFilter === 'R' ? 'selected' : ''}>R : Repair</option>
                <option value="M" ${currentJobTypeFilter === 'M' ? 'selected' : ''}>M : Modify</option>
                <option value="I" ${currentJobTypeFilter === 'I' ? 'selected' : ''}>I : Increase</option>
                <option value="A" ${currentJobTypeFilter === 'A' ? 'selected' : ''}>A : Assy / Install</option>
                <option value="S" ${currentJobTypeFilter === 'S' ? 'selected' : ''}>S : Simulation</option>
                <option value="T" ${currentJobTypeFilter === 'T' ? 'selected' : ''}>T : Training</option>
                <option value="AC" ${currentJobTypeFilter === 'AC' ? 'selected' : ''}>AC : Activity / 5S</option>
                <option value="Q" ${currentJobTypeFilter === 'Q' ? 'selected' : ''}>Q : Quote</option>
              </select>

              <select class="excel-filter-select ${currentSubJobTypeFilter !== 'all' ? 'active-filter' : ''}" onchange="setExcelFilter('subJobType', this.value)" title="กรองตามรูปแบบการผลิต (In-house / Outsource)">
                <option value="all" ${currentSubJobTypeFilter === 'all' ? 'selected' : ''}>SUB JOB: ทั้งหมด</option>
                <option value="01 In-house" ${currentSubJobTypeFilter === '01 In-house' ? 'selected' : ''}>In-house (ทำเอง)</option>
                <option value="02 Outsource" ${currentSubJobTypeFilter === '02 Outsource' ? 'selected' : ''}>Outsource (จ้างผลิต)</option>
                <option value="All" ${currentSubJobTypeFilter === 'All' ? 'selected' : ''}>All (In-house + Outsource)</option>
              </select>

              <select class="excel-filter-select ${currentPriorityFilter !== 'all' ? 'active-filter' : ''}" onchange="setExcelFilter('priority', this.value)" title="กรองตามระดับความเร่งด่วน (Priority / Job Level)">
                <option value="all" ${currentPriorityFilter === 'all' ? 'selected' : ''}>PRIORITY: ทั้งหมด</option>
                <option value="Super High" ${currentPriorityFilter === 'Super High' ? 'selected' : ''}>Super High</option>
                <option value="High" ${currentPriorityFilter === 'High' ? 'selected' : ''}>High</option>
                <option value="Medium" ${currentPriorityFilter === 'Medium' ? 'selected' : ''}>Medium</option>
                <option value="Low" ${currentPriorityFilter === 'Low' ? 'selected' : ''}>Low</option>
              </select>

              <select class="excel-filter-select ${currentSubStatusFilter !== 'all' ? 'active-filter' : ''}" onchange="setExcelFilter('subStatus', this.value)" title="กรองตามขั้นตอนย่อย 10 ขั้นตอน (Sub Status & Achievement)">
                <option value="all" ${currentSubStatusFilter === 'all' ? 'selected' : ''}>SUB STATUS: ทั้งหมด</option>
                <option value="00 Not Start" ${currentSubStatusFilter === '00 Not Start' ? 'selected' : ''}>Not Start (0%)</option>
                <option value="01 Req. Analysis" ${currentSubStatusFilter === '01 Req. Analysis' ? 'selected' : ''}>Req. Analysis (10%)</option>
                <option value="02 Concept Design" ${currentSubStatusFilter === '02 Concept Design' ? 'selected' : ''}>Concept Design (20%)</option>
                <option value="03 User Approval 1" ${currentSubStatusFilter === '03 User Approval 1' ? 'selected' : ''}>User Approval 1 (30%)</option>
                <option value="04 Detailed Drawing" ${currentSubStatusFilter === '04 Detailed Drawing' ? 'selected' : ''}>Detailed Drawing (40%)</option>
                <option value="05 Quote Request" ${currentSubStatusFilter === '05 Quote Request' ? 'selected' : ''}>Quote Request (50%)</option>
                <option value="06 User Approval 2" ${currentSubStatusFilter === '06 User Approval 2' ? 'selected' : ''}>User Approval 2 (60%)</option>
                <option value="07 Supp. Proc." ${currentSubStatusFilter === '07 Supp. Proc.' ? 'selected' : ''}>Supp. Proc. (70%)</option>
                <option value="08 P.Techno. Proc." ${currentSubStatusFilter === '08 P.Techno. Proc.' ? 'selected' : ''}>P.Techno. Proc. (80%)</option>
                <option value="09 Verification" ${currentSubStatusFilter === '09 Verification' ? 'selected' : ''}>Verification (90%)</option>
                <option value="10 Finished" ${currentSubStatusFilter === '10 Finished' ? 'selected' : ''}>Finished (100%)</option>
                <option value="Pending" ${currentSubStatusFilter === 'Pending' ? 'selected' : ''}>Pending (0%)</option>
                <option value="Cancel" ${currentSubStatusFilter === 'Cancel' ? 'selected' : ''}>Cancel (100%)</option>
              </select>

              ${hasExcelFilter ? `
                <button type="button" class="btn btn-outline btn-sm" onclick="resetAllFilters()" style="padding: 3px 8px; font-size: 11px; color: #dc2626; border-color: #fca5a5; background: #fef2f2;">
                  ✕ ล้างตัวกรอง
                </button>
              ` : ''}
            </div>
            <div style="font-size: 11px; color: var(--text-muted); font-weight: 600;">
              แสดง <b>${items.length}</b> รายการ | DONE: <b style="color:#15803d;">${countDone}</b> • IN PROG: <b style="color:#1d4ed8;">${countInProg}</b> • PENDING: <b style="color:#b45309;">${countWait}</b>${countCancel > 0 ? ` • CANCEL: <b style="color:#b91c1c;">${countCancel}</b>` : ''}
            </div>
          </div>
        ` : ''}
      </div>

      ${!isCompact ? `
        <!-- Synced Top Horizontal Scrollbar Bar (No need to scroll to bottom of table!) -->
        <div class="table-top-scrollbar-bar">
          <span style="font-size: 10.5px; font-weight: 700; color: #475569; white-space: nowrap; display: inline-flex; align-items: center; gap: 4px;">
            ↔️ แถบเลื่อนซ้าย-ขวา (หรือคลิกค้างบนตารางแล้วลากเมาส์):
          </span>
          <div class="top-scroll-track-wrap" id="topScrollTrackWrap" title="ลากแถบสีเทาเพื่อเลื่อนตารางซ้าย-ขวาได้ทันที">
            <div class="top-scroll-dummy" id="topScrollDummy"></div>
          </div>
        </div>
      ` : ''}
    </div>

    <div class="table-container ${!isCompact ? 'has-summary-footer' : ''}" id="tableScrollContainer">
  `;

  if (isCompact) {
    // --- COMPACT MODE: 7 Streamlined Columns (No horizontal scroll needed) ---
    html += `
      <table class="data-table table-compact">
        <thead>
          <tr>
            <th class="col-no" style="width: 48px; min-width: 48px; text-align: center; white-space: nowrap;">#</th>
            <th style="width: 23%;">TASK & CATEGORY</th>
            <th class="col-status" style="width: 125px; min-width: 120px; text-align: center; white-space: nowrap;">STATUS</th>
            <th style="width: 23%;">REQUEST & LOCATION</th>
            <th style="width: 24%;">NOTE & DETAIL</th>
            <th style="width: 130px;">FILES & ASSIGN</th>
            <th style="width: 90px; text-align: right; white-space: nowrap;">DATE</th>
          </tr>
        </thead>
        <tbody>
    `;

    items.forEach((item, index) => {
      const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#64748b' };
      const statusHtml = getStatusPillHtml(item.status);
      const dateDisplay = item.completionDate || item.requestDate || '-';

      html += `
        <tr class="${item.status === 'done' ? 'row-status-done' : ((item.status === 'cancel' || item.status === 'cancle') ? 'row-status-cancel' : '')}">
          <td class="col-no" style="text-align: center; color: var(--text-light); font-weight: 600; font-size: 12px; white-space: nowrap;">${index + 1}</td>
          <td>
            <div style="font-weight: 700; cursor: pointer; color: var(--text-main); display: flex; align-items: flex-start; gap: 6px; line-height: 1.3;" onclick="viewAchievementDetail('${item.id}')">
              <span style="font-size: 13px;">📄</span>
              <span style="word-break: break-word;">${escapeHtml(uppercaseEnglish(item.title))}</span>
            </div>
            <div style="font-size: 11px; color: ${cat.color}; margin-top: 3px; font-weight: 600;">
              ${cat.icon} ${escapeHtml(uppercaseEnglish(cat.name))}
            </div>
          </td>
          <td class="col-status" style="text-align: center;">${statusHtml}</td>
          <td>
            <div class="cell-stacked">
              <div style="display: flex; gap: 4px; flex-wrap: wrap; align-items: center;">
                ${item.code ? `<span class="badge-code" title="REQUEST NUMBER">${escapeHtml(uppercaseEnglish(item.code))}</span>` : '<span style="color:#cbd5e1; font-size: 10.5px;">-</span>'}
                ${item.quotation ? `<span class="badge-quotation" title="QUOTATION">Q: ${escapeHtml(uppercaseEnglish(item.quotation))}</span>` : ''}
              </div>
              ${item.requestName ? `
                <div class="cell-subtext" style="color: #334155; font-weight: 600;">
                  👤 ${escapeHtml(uppercaseEnglish(item.requestName))}
                </div>
              ` : ''}
              <div style="display: flex; gap: 3px; flex-wrap: wrap; margin-top: 2px;">
                ${item.factory ? `<span class="badge-dept" style="font-size: 10px; padding: 1px 5px;">🏢 ${escapeHtml(uppercaseEnglish(item.factory))}</span>` : ''}
                ${item.department ? `<span class="badge-dept" style="font-size: 10px; padding: 1px 5px;">👥 ${escapeHtml(uppercaseEnglish(item.department))}</span>` : ''}
                ${item.process ? `<span class="badge-dept" style="font-size: 10px; padding: 1px 5px;">⚙️ ${escapeHtml(uppercaseEnglish(item.process))}</span>` : ''}
              </div>
            </div>
          </td>
          <td>
            <div class="cell-stacked">
              ${item.note ? `
                <div style="background: #fefce8; border-left: 3px solid #eab308; padding: 4px 6px; border-radius: 4px; font-size: 11.5px; color: #854d0e; font-weight: 600; line-height: 1.3;">
                  📌 ${escapeHtml(uppercaseEnglish(item.note))}
                </div>
              ` : ''}
              ${item.description ? `
                <div style="font-size: 11.5px; color: var(--secondary); line-height: 1.35; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;" title="${escapeHtml(uppercaseEnglish(item.description))}">
                  ${escapeHtml(uppercaseEnglish(item.description))}
                </div>
              ` : (!item.note ? '<span style="color: #cbd5e1; font-size: 11px;">-</span>' : '')}
            </div>
          </td>
          <td>
            <div class="cell-stacked">
              <div>
                ${item.assignee ? `<span class="badge-assignee" onclick="filterByAssignee('${escapeHtml(uppercaseEnglish(item.assignee))}')" style="font-size: 11px; cursor: pointer;" title="คลิกเพื่อกรองเฉพาะงานของ: ${escapeHtml(uppercaseEnglish(item.assignee))}">😎 ${escapeHtml(uppercaseEnglish(item.assignee))}</span>` : '<span style="color:#cbd5e1; font-size: 11px;">-</span>'}
              </div>
              <div style="display: flex; gap: 3px; flex-wrap: wrap; margin-top: 2px;">
                ${item.pdfAttachment ? `
                  <div class="table-badge-group">
                    <button class="badge-pdf" onclick="openPdfAttachment('${item.id}')" title="เปิดดู JOB REQUEST PDF" style="font-size: 10px; padding: 2px 5px;">📄 PDF</button>
                    <button class="badge-pdf badge-dl" onclick="downloadPdfAttachment('${item.id}')" title="ดาวน์โหลดไฟล์ PDF" style="font-size: 10px; padding: 2px 4px; border-left: none; font-weight: bold;">⬇️</button>
                  </div>
                ` : ''}
                ${item.workFolder ? `
                  <div class="table-badge-group">
                    <button class="badge-folder" onclick="openWorkFolderModal('${item.id}')" title="ดูข้อมูลโฟลเดอร์ผลงาน" style="font-size: 10px; padding: 2px 5px;">📁 ${escapeHtml(getFolderBadgeText(item.workFolder))}</button>
                    <button class="badge-folder badge-dl" onclick="downloadWorkFolderAttachment('${item.id}')" title="ดาวน์โหลดโฟลเดอร์เป็น ZIP" style="font-size: 10px; padding: 2px 4px; border-left: none; font-weight: bold;">📥</button>
                  </div>
                ` : ''}
                ${item.imageData ? (
                  isDrawingPdf(item.imageData) ? `
                    <div class="table-badge-group">
                      <button class="badge-pdf" onclick="openDrawingAttachment('${item.id}')" title="เปิดดู DRAWING (PDF)" style="font-size: 10px; padding: 2px 5px; background:#ecfdf5; color:#065f46; border-color:#a7f3d0;">📄 DWG</button>
                      <button class="badge-pdf badge-dl" onclick="downloadImageAttachment('${item.id}')" title="ดาวน์โหลด DRAWING (PDF)" style="font-size: 10px; padding: 2px 4px; background:#ecfdf5; color:#065f46; border-color:#a7f3d0; border-left: none; font-weight: bold;">⬇️</button>
                    </div>
                  ` : `
                    <div class="table-badge-group">
                      <button class="badge-code" onclick="openDrawingAttachment('${item.id}')" title="ดูรูปภาพ DRAWING" style="font-size: 10px; padding: 2px 5px; cursor: pointer;">🖼️ IMG</button>
                      <button class="badge-code badge-dl" onclick="downloadImageAttachment('${item.id}')" title="ดาวน์โหลดรูปภาพ" style="font-size: 10px; padding: 2px 4px; cursor: pointer; border-left: none; font-weight: bold;">⬇️</button>
                    </div>
                  `
                ) : ''}
                ${(!item.pdfAttachment && !item.workFolder && !item.imageData) ? '<span style="color: #cbd5e1; font-size: 10px;">-</span>' : ''}
              </div>
            </div>
          </td>
          <td style="text-align: right;">
            <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 4px;">
              <div style="font-size: 11px; color: var(--text-muted); white-space: nowrap; font-weight: 600;">
                ${dateDisplay}
              </div>
              <div class="card-actions" style="justify-content: flex-end;">
                <button class="btn btn-outline btn-sm btn-icon" onclick="openAchievementModal('${item.id}')" title="แก้ไข">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
                </button>
                <button class="btn btn-outline btn-sm btn-icon text-danger" onclick="deleteAchievement('${item.id}')" title="ลบ">
                  <svg width="12" height="12" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                </button>
              </div>
            </div>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;
  } else {
    // --- FULL MODE: 12 Balanced & Top-Aligned Engineering Columns ---
    html += `
      <table class="data-table table-full">
        <thead>
          <tr>
            <th class="sticky-col-no" style="width: 48px; min-width: 48px; text-align: center; white-space: nowrap;">#</th>
            <th class="sticky-col-task" style="width: 300px; min-width: 295px; max-width: 315px;">TASK &amp; CATEGORY</th>
            <th class="col-status" style="min-width: 145px; text-align: center; white-space: nowrap;">STATUS &amp; ACHIEVEMENT</th>
            <th style="min-width: 145px;">TEAM &amp; ASSIGN</th>
            <th style="min-width: 155px;">JOB TYPE &amp; PRIORITY</th>
            <th style="min-width: 235px;">REQUEST &amp; QUOTATION</th>
            <th style="min-width: 280px;">FACTORY / DEPT / PROCESS</th>
            <th style="min-width: 135px; white-space: nowrap;">TIMELINE</th>
            <th style="min-width: 220px; max-width: 260px;">DETAIL</th>
            <th style="min-width: 190px; max-width: 230px;">NOTE</th>
            <th style="min-width: 130px;">ATTACHMENTS</th>
            <th class="sticky-col-action" style="width: 86px; min-width: 86px; text-align: center; white-space: nowrap;">จัดการ</th>
          </tr>
        </thead>
        <tbody>
    `;

    items.forEach((item, index) => {
      const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#64748b' };
      const statusHtml = getStatusPillHtml(item.status);
      const xl = getTaskExcelTracking(item);

      // Section badge class
      const secUpper = (xl.section || '').toUpperCase();
      const secClass = secUpper === 'S0' ? 'sec-s0' : (secUpper === 'S1' ? 'sec-s1' : (secUpper === 'S2' ? 'sec-s2' : ''));

      // Priority badge class (clean text only, no emoji icons)
      const priLower = (xl.priority || 'Medium').toLowerCase();
      let priClass = 'pri-medium';
      if (priLower.includes('super')) { priClass = 'pri-super-high'; }
      else if (priLower.includes('high')) { priClass = 'pri-high'; }
      else if (priLower.includes('low')) { priClass = 'pri-low'; }

      // Sub Job Type class & clean label without leading 01/02
      const subJobLower = (xl.subJobType || '').toLowerCase();
      const subJobClass = subJobLower.includes('outsource') ? 'sub-outsource' : (subJobLower === 'all' ? 'sub-all' : 'sub-inhouse');
      const cleanSubJobLabel = stripLeadingNumberCode(xl.subJobType);

      // Clean Sub Status label without leading 00-10
      const cleanSubStatus = uppercaseEnglish(stripLeadingNumberCode(xl.subStatus));
      const isRedundantSubStatus = (
        (item.status === 'done' && cleanSubStatus === 'FINISHED') ||
        ((item.status === 'wait' || item.status === 'pending') && (cleanSubStatus === 'PENDING' || cleanSubStatus === 'NOT START')) ||
        ((item.status === 'cancel' || item.status === 'cancle') && cleanSubStatus === 'CANCEL')
      );

      // Progress bar fill class
      let fillClass = 'fill-mid';
      if (item.status === 'cancel' || item.status === 'cancle' || xl.subStatus === 'Cancel') fillClass = 'fill-cancel';
      else if (xl.achievement >= 1) fillClass = 'fill-done';
      else if (xl.achievement <= 0.2) fillClass = 'fill-low';

      const jobTypeFullTitle = getJobTypeTitle(xl.jobType);

      html += `
        <tr class="${item.status === 'done' ? 'row-status-done' : ((item.status === 'cancel' || item.status === 'cancle') ? 'row-status-cancel' : '')}">
          <!-- 1. # -->
          <td class="sticky-col-no" style="color: var(--text-light); font-weight: 600; font-size: 12px; white-space: nowrap; text-align: center;">${index + 1}</td>

          <!-- 2. TASK & CATEGORY (Exact match with Image 2) -->
          <td class="sticky-col-task">
            <div style="font-weight: 700; cursor: pointer; color: var(--text-main); display: flex; align-items: flex-start; gap: 6px; line-height: 1.3;" onclick="viewAchievementDetail('${item.id}')">
              <span style="font-size: 13px; flex-shrink: 0;">📄</span>
              <span style="word-break: break-word;">${escapeHtml(uppercaseEnglish(item.title))}</span>
            </div>
            <div style="font-size: 11px; color: ${cat.color}; margin-top: 3px; font-weight: 600;">
              ${cat.icon} ${escapeHtml(uppercaseEnglish(cat.name))}
            </div>
          </td>

          <!-- 3. STATUS & ACHIEVEMENT -->
          <td class="col-status" style="text-align: center;">
            <div class="status-achv-stack">
              ${statusHtml}
              ${!isRedundantSubStatus && cleanSubStatus ? `
                <span class="sub-status-pill" onclick="setExcelFilter('subStatus', '${escapeHtml(xl.subStatus)}')" style="cursor: pointer;" title="Sub Status (คลิกเพื่อกรอง)">
                  ${escapeHtml(cleanSubStatus)}
                </span>
              ` : ''}
              <div class="achv-progress-wrap" title="Achievement Score: ${xl.achievement} (${xl.achievementPct}%)">
                <div class="achv-progress-bar">
                  <div class="achv-progress-fill ${fillClass}" style="width: ${xl.achievementPct}%;"></div>
                </div>
                <span class="achv-score-text">${xl.achievementPct}%</span>
              </div>
            </div>
          </td>

          <!-- 4. TEAM & ASSIGN -->
          <td>
            <div class="team-role-stack">
              ${item.assignee ? `
                <span class="badge-assignee" onclick="filterByAssignee('${escapeHtml(uppercaseEnglish(item.assignee))}')" style="font-size: 11px; cursor: pointer;" title="ผู้รับผิดชอบหลัก (คลิกเพื่อกรอง): ${escapeHtml(uppercaseEnglish(item.assignee))}">
                  😎 ${escapeHtml(uppercaseEnglish(item.assignee))}
                </span>
              ` : ''}
              ${xl.toolingTeam && xl.toolingTeam !== '-' ? `
                <div class="team-role-item" title="Tooling Team (ทีมแมชชีน/สร้าง)">
                  <span class="team-role-label role-tooling">TOOL</span>
                  <span class="team-role-name">${escapeHtml(uppercaseEnglish(xl.toolingTeam))}</span>
                </div>
              ` : ''}
              ${xl.designSupport && xl.designSupport !== '-' ? `
                <div class="team-role-item" title="Design Support (ผู้สนับสนุน)">
                  <span class="team-role-label role-support">DSN</span>
                  <span class="team-role-name">${escapeHtml(uppercaseEnglish(xl.designSupport))}</span>
                </div>
              ` : ''}
              ${xl.maintenanceSupport && xl.maintenanceSupport !== '-' ? `
                <div class="team-role-item" title="Maintenance Support (ผู้สนับสนุน)">
                  <span class="team-role-label role-support">MTN</span>
                  <span class="team-role-name">${escapeHtml(uppercaseEnglish(xl.maintenanceSupport))}</span>
                </div>
              ` : ''}
              ${(!item.assignee && (!xl.toolingTeam || xl.toolingTeam === '-') && (!xl.supportBy || xl.supportBy === '-')) ? '<span style="color:#cbd5e1; font-size: 11px;">-</span>' : ''}
            </div>
          </td>

          <!-- 5. JOB TYPE & PRIORITY (Clean soft pills, no numbers or icons) -->
          <td>
            <div class="job-meta-stack">
              <div style="display: flex; gap: 4px; flex-wrap: wrap; align-items: center;">
                <span class="badge-job-type" onclick="setExcelFilter('jobType', '${escapeHtml(xl.jobType)}')" style="cursor: pointer;" title="Job Type: ${escapeHtml(jobTypeFullTitle)}">
                  ${escapeHtml(uppercaseEnglish(jobTypeFullTitle))}
                </span>
                ${cleanSubJobLabel && cleanSubJobLabel !== '-' ? `
                  <span class="badge-sub-job ${subJobClass}" onclick="setExcelFilter('subJobType', '${escapeHtml(xl.subJobType)}')" style="cursor: pointer;" title="Sub Job Type: คลิกเพื่อกรอง">
                    ${escapeHtml(uppercaseEnglish(cleanSubJobLabel))}
                  </span>
                ` : ''}
              </div>
              <span class="badge-priority ${priClass}" onclick="setExcelFilter('priority', '${escapeHtml(xl.priority)}')" style="cursor: pointer;" title="Priority: คลิกเพื่อกรอง">
                ${escapeHtml(uppercaseEnglish(xl.priority))}
              </span>
            </div>
          </td>

          <!-- 6. REQUEST & QUOTATION (Exact 2-line layout matching Image 2) -->
          <td>
            <div class="cell-stacked">
              <div style="display: flex; gap: 4px; flex-wrap: wrap; align-items: center;">
                ${item.code ? `<span class="badge-code" title="REQUEST NUMBER">${escapeHtml(uppercaseEnglish(item.code))}</span>` : '<span style="color:#cbd5e1; font-size: 10.5px;">-</span>'}
                ${item.quotation && item.quotation !== '-' ? `<span class="badge-quotation" title="QUOTATION">Q: ${escapeHtml(uppercaseEnglish(item.quotation))}</span>` : ''}
              </div>
              ${item.requestName ? `
                <div class="cell-subtext" style="color: #334155; font-weight: 600;">
                  👤 ${escapeHtml(uppercaseEnglish(item.requestName))}
                </div>
              ` : ''}
            </div>
          </td>

          <!-- 7. FACTORY / DEPT / PROCESS (Exact badge layout matching Image 2) -->
          <td>
            <div style="display: flex; gap: 3px; flex-wrap: wrap;">
              ${item.factory ? `<span class="badge-dept" style="font-size: 10px; padding: 1px 5px;">🏢 ${escapeHtml(uppercaseEnglish(item.factory))}</span>` : ''}
              ${item.department ? `<span class="badge-dept" style="font-size: 10px; padding: 1px 5px;">👥 ${escapeHtml(uppercaseEnglish(item.department))}</span>` : ''}
              ${item.process ? `<span class="badge-dept" style="font-size: 10px; padding: 1px 5px;">⚙️ ${escapeHtml(uppercaseEnglish(item.process))}</span>` : ''}
              ${(!item.factory && !item.department && !item.process) ? '<span style="color:#cbd5e1; font-size: 11px;">-</span>' : ''}
            </div>
          </td>

          <!-- 8. TIMELINE (ACTION / FINISHED) -->
          <td>
            <div class="date-plan-stack">
              ${xl.actionDate ? `
                <div class="date-plan-row" title="Action Date (วันเริ่มดำเนินการ)">
                  <span class="date-plan-tag tag-act">ACT</span>
                  <span>${escapeHtml(xl.actionDate)}</span>
                </div>
              ` : ''}
              ${item.completionDate ? `
                <div class="date-plan-row" title="Actual Completion Date (วันที่เสร็จจริง)">
                  <span class="date-plan-tag tag-fin">DONE</span>
                  <span style="color: #047857; font-weight: 700;">${escapeHtml(item.completionDate)}</span>
                </div>
              ` : ''}
              ${xl.finishedMonth ? `
                <span class="badge-fin-month" title="Finished Month (เดือนที่ปิดงานสำเร็จ)">✓ FIN: ${escapeHtml(uppercaseEnglish(xl.finishedMonth))}</span>
              ` : (!xl.actionDate && !item.completionDate ? '<span style="color:#cbd5e1;">-</span>' : '')}
            </div>
          </td>

          <!-- 9. DETAIL -->
          <td style="max-width: 225px; font-size: 11.5px; color: var(--secondary); line-height: 1.4;">
            <div style="overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;" title="${escapeHtml(uppercaseEnglish(item.description || '-'))}">
              ${escapeHtml(uppercaseEnglish(item.description || '-'))}
            </div>
          </td>

          <!-- 10. NOTE -->
          <td style="max-width: 195px; font-size: 11.5px;">
            ${item.note && item.note !== '-' ? `
              <div style="background: #fefce8; border-left: 3px solid #eab308; padding: 4px 7px; border-radius: 4px; color: #854d0e; font-weight: 600; line-height: 1.35; overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical;" title="${escapeHtml(uppercaseEnglish(item.note))}">
                📌 ${escapeHtml(uppercaseEnglish(item.note))}
              </div>
            ` : '<span style="color:#cbd5e1;">-</span>'}
          </td>

          <!-- 11. ATTACHMENTS -->
          <td>
            <div style="display: flex; gap: 4px; flex-wrap: wrap; justify-content: flex-start;">
              ${item.pdfAttachment ? `
                <div class="table-badge-group">
                  <button class="badge-pdf" onclick="openPdfAttachment('${item.id}')" title="เปิดดู JOB REQUEST PDF">📄 PDF</button>
                  <button class="badge-pdf badge-dl" onclick="downloadPdfAttachment('${item.id}')" title="ดาวน์โหลดไฟล์ PDF" style="border-left: none; font-weight: bold;">⬇️</button>
                </div>
              ` : ''}
              ${item.workFolder ? `
                <div class="table-badge-group">
                  <button class="badge-folder" onclick="openWorkFolderModal('${item.id}')" title="ดูข้อมูลโฟลเดอร์ผลงาน">📁 ${escapeHtml(getFolderBadgeText(item.workFolder))}</button>
                  <button class="badge-folder badge-dl" onclick="downloadWorkFolderAttachment('${item.id}')" title="ดาวน์โหลดโฟลเดอร์เป็น ZIP" style="border-left: none; font-weight: bold;">📥</button>
                </div>
              ` : ''}
              ${item.imageData ? (
                isDrawingPdf(item.imageData) ? `
                  <div class="table-badge-group">
                    <button class="badge-pdf" onclick="openDrawingAttachment('${item.id}')" title="เปิดดู DRAWING (PDF)" style="background:#ecfdf5; color:#065f46; border-color:#a7f3d0;">📄 DWG</button>
                    <button class="badge-pdf badge-dl" onclick="downloadImageAttachment('${item.id}')" title="ดาวน์โหลด DRAWING (PDF)" style="background:#ecfdf5; color:#065f46; border-color:#a7f3d0; border-left: none; font-weight: bold;">⬇️</button>
                  </div>
                ` : `
                  <div class="table-badge-group">
                    <button class="badge-code" onclick="openDrawingAttachment('${item.id}')" title="ดูรูปภาพ DRAWING" style="cursor: pointer;">🖼️ IMG</button>
                    <button class="badge-code badge-dl" onclick="downloadImageAttachment('${item.id}')" title="ดาวน์โหลดรูปภาพ" style="cursor: pointer; border-left: none; font-weight: bold;">⬇️</button>
                  </div>
                `
              ) : ''}
              ${(!item.pdfAttachment && !item.workFolder && !item.imageData) ? '<span style="color:#cbd5e1;">-</span>' : ''}
            </div>
          </td>

          <!-- 12. จัดการ (Sticky Right Column) -->
          <td class="sticky-col-action" style="text-align: center;">
            <div class="card-actions" style="justify-content: center;">
              <button class="btn btn-outline btn-sm btn-icon" onclick="openAchievementModal('${item.id}')" title="แก้ไข">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
              </button>
              <button class="btn btn-outline btn-sm btn-icon text-danger" onclick="deleteAchievement('${item.id}')" title="ลบ">
                <svg width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              </button>
            </div>
          </td>
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;
  }

  html += `
    </div>
    ${!isCompact ? `
      <div class="table-static-summary-footer">
        <div class="summary-left-group">
          <div class="summary-total-badge">
            <span class="summary-sigma-icon">Σ</span>
            <span>รวมทั้งหมด <b>${items.length}</b> งาน <span class="summary-sub-label">(TOTAL RECORDS)</span></span>
          </div>
          <span class="summary-v-divider"></span>
          <div class="summary-achv-pill">
            <span>📈 ACHIEVEMENT:</span>
            <b>${totalAchvScore.toFixed(1)} / ${items.length}</b>
            <span class="summary-achv-avg">AVG ${avgAchvPct}%</span>
          </div>
        </div>

        <div class="summary-right-group">
          <span class="summary-stat-pill pill-done">
            <span class="stat-dot"></span>DONE <b>${countDone}</b>
          </span>
          <span class="summary-stat-pill pill-prog">
            <span class="stat-dot"></span>IN PROGRESS <b>${countInProg}</b>
          </span>
          <span class="summary-stat-pill pill-pend">
            <span class="stat-dot"></span>PENDING <b>${countWait}</b>
          </span>
          <span class="summary-stat-pill pill-canc">
            <span class="stat-dot"></span>CANCEL <b>${countCancel}</b>
          </span>
        </div>
      </div>
    ` : ''}
  `;
  container.innerHTML = html;

  if (!isCompact) {
    initFullTableHorizontalScrollHelpers();
  }
}


function resetAssigneeDropdown() {
  const select = document.getElementById('achvAssignee');
  if (!select) return;
  const accounts = getTeamAccounts();
  const optionsHtml = accounts.map(acc => `<option value="${escapeHtml(acc.name)}">${escapeHtml(acc.name)}</option>`).join('\n    ');
  select.innerHTML = `
    <option value="">-- เลือกผู้รับผิดชอบ (SELECT ASSIGNEE) --</option>
    ${optionsHtml}
  `;
}

function updateModalAchievementBadge(subStatusVal) {
  const badge = document.getElementById('achvAchievementBadge');
  if (!badge) return;
  const score = SUB_STATUS_ACHIEVEMENT_MAP[subStatusVal] !== undefined ? SUB_STATUS_ACHIEVEMENT_MAP[subStatusVal] : 1;
  const pct = Math.round(score * 100);
  badge.textContent = `ACHV: ${score.toFixed(1)} (${pct}%)`;
  if (subStatusVal === 'Cancel') {
    badge.style.background = '#fef2f2';
    badge.style.color = '#b91c1c';
    badge.style.borderColor = '#fecaca';
  } else if (score >= 1) {
    badge.style.background = '#ecfdf5';
    badge.style.color = '#047857';
    badge.style.borderColor = '#a7f3d0';
  } else if (score === 0) {
    badge.style.background = '#fffbeb';
    badge.style.color = '#b45309';
    badge.style.borderColor = '#fde68a';
  } else {
    badge.style.background = '#eff6ff';
    badge.style.color = '#1d4ed8';
    badge.style.borderColor = '#bfdbfe';
  }
}

function handleModalStatusChange(statusVal) {
  // Independent selection: changing main STATUS no longer forces SUB STATUS to change
}

function handleModalSubStatusChange(subStatusVal) {
  // Independent selection: changing SUB STATUS only updates the ACHV score badge, without overwriting main STATUS
  updateModalAchievementBadge(subStatusVal);
}

// --- Achievement Modal (Add / Edit) ---
function openAchievementModal(id = null) {
  // Auth check: Must be logged in with PIN to add or edit
  if (!currentUser) {
    const targetItem = id ? achievements.find(a => a.id === id) : null;
    openAuthPinModal(id ? 'edit' : 'add', targetItem, () => {
      openAchievementModal(id);
    });
    return;
  }

  dismissAllToasts();
  const modal = document.getElementById('achievementModal');
  const modalTitle = document.getElementById('modalAchievementTitle');
  const form = document.getElementById('achievementForm');

  form.reset();
  resetAssigneeDropdown();
  currentModalImageData = null;
  currentModalPdf = null;
  currentModalFolder = null;
  updateImagePreview();
  updatePdfPreview();
  updateFolderPreview();

  populateCategoryDropdowns();

  if (id) {
    const item = achievements.find(a => a.id === id);
    if (!item) return;

    // Check edit permissions
    const perm = canUserEditTask(currentUser, item);
    if (!perm.allowed) {
      alert(`⛔ ขออภัย คุณไม่มีสิทธิ์แก้ไขงานนี้\n\n📌 งานนี้เป็นของ: ${perm.ownerName}\n👤 คุณเข้าสู่ระบบในชื่อ: ${currentUser.name}\n\n(สิทธิ์แก้ไขจำกัดเฉพาะเจ้าของงาน หรือผู้ดูแลระบบ ADMIN เท่านั้น)`);
      return;
    }

    if (perm.isOverride) {
      modalTitle.innerHTML = 'แก้ไขข้อมูลงาน (EDIT TASK) <span class="task-admin-override-badge">👑 ADMIN OVERRIDE</span>';
    } else {
      modalTitle.textContent = 'แก้ไขข้อมูลงาน (EDIT TASK / ACHIEVEMENT)';
    }

    const xl = getTaskExcelTracking(item);

    document.getElementById('achvId').value = item.id;
    document.getElementById('achvTitle').value = uppercaseEnglish(item.title);
    document.getElementById('achvCategory').value = item.categoryId;
    document.getElementById('achvCode').value = uppercaseEnglish(item.code || '');
    document.getElementById('achvQuotation').value = uppercaseEnglish(item.quotation || '');
    document.getElementById('achvRequestName').value = uppercaseEnglish(item.requestName || '');
    document.getElementById('achvRequestDate').value = item.requestDate || '';
    setSelectValueWithFallback(document.getElementById('achvFactory'), item.factory || '');
    setSelectValueWithFallback(document.getElementById('achvDepartment'), item.department || '');
    document.getElementById('achvProcess').value = uppercaseEnglish(item.process || '');
    setSelectValueWithFallback(document.getElementById('achvAssignee'), item.assignee || '');
    let st = item.status || 'in_progress';
    if (st === 'cancle') st = 'cancel';
    if (st === 'pending') st = 'wait';
    document.getElementById('achvStatus').value = st;
    document.getElementById('achvCompletionDate').value = item.completionDate || '';
    document.getElementById('achvDescription').value = uppercaseEnglish(item.description || '');
    document.getElementById('achvNote').value = uppercaseEnglish(item.note || '');

    // Populate Excel Engineering Tracking Fields
    if (document.getElementById('achvSubStatus')) {
      setSelectValueWithFallback(document.getElementById('achvSubStatus'), xl.subStatus || '10 Finished');
      updateModalAchievementBadge(document.getElementById('achvSubStatus').value);
    }
    if (document.getElementById('achvJobType')) {
      setSelectValueWithFallback(document.getElementById('achvJobType'), xl.jobType && xl.jobType !== '-' ? xl.jobType : 'D');
    }
    if (document.getElementById('achvSubJobType')) {
      setSelectValueWithFallback(document.getElementById('achvSubJobType'), xl.subJobType || '01 In-house');
    }
    if (document.getElementById('achvPriority')) {
      setSelectValueWithFallback(document.getElementById('achvPriority'), xl.priority || 'Medium');
    }
    if (document.getElementById('achvToolingTeam1')) {
      document.getElementById('achvToolingTeam1').value = xl.toolingTeam1 || '';
    }
    if (document.getElementById('achvToolingTeam2')) {
      document.getElementById('achvToolingTeam2').value = xl.toolingTeam2 || '';
    }
    if (document.getElementById('achvDesignSupport1')) {
      document.getElementById('achvDesignSupport1').value = xl.designSupport1 || '';
    }
    if (document.getElementById('achvDesignSupport2')) {
      document.getElementById('achvDesignSupport2').value = xl.designSupport2 || '';
    }
    if (document.getElementById('achvMaintenanceSupport1')) {
      document.getElementById('achvMaintenanceSupport1').value = xl.maintenanceSupport1 || '';
    }
    if (document.getElementById('achvMaintenanceSupport2')) {
      document.getElementById('achvMaintenanceSupport2').value = xl.maintenanceSupport2 || '';
    }
    if (document.getElementById('achvMaintenanceSupport3')) {
      document.getElementById('achvMaintenanceSupport3').value = xl.maintenanceSupport3 || '';
    }
    if (document.getElementById('achvMaintenanceSupport4')) {
      document.getElementById('achvMaintenanceSupport4').value = xl.maintenanceSupport4 || '';
    }
    if (document.getElementById('achvMaintenanceSupport5')) {
      document.getElementById('achvMaintenanceSupport5').value = xl.maintenanceSupport5 || '';
    }

    if (item.workFolder && typeof item.workFolder === 'object') {
      currentModalFolder = { ...item.workFolder };
      if (!hasLocalFolderFileData(currentModalFolder)) {
        loadAchievementsFromIndexedDB().then(idbData => {
          if (idbData) {
            const fullItem = idbData.find(a => a.id === item.id);
            if (fullItem && fullItem.workFolder && hasLocalFolderFileData(fullItem.workFolder)) {
              currentModalFolder = { ...fullItem.workFolder };
              item.workFolder = fullItem.workFolder;
              updateFolderPreview();
            }
          }
        }).catch(e => console.warn('IDB modal folder load notice:', e));
      }
      updateFolderPreview();
    } else {
      currentModalFolder = null;
      updateFolderPreview();
    }

    if (item.imageData) {
      currentModalImageData = item.imageData;
      if (!getDrawingDataUrl(currentModalImageData)) {
        loadAchievementsFromIndexedDB().then(idbData => {
          if (idbData) {
            const fullItem = idbData.find(a => a.id === item.id);
            if (fullItem && fullItem.imageData && getDrawingDataUrl(fullItem.imageData)) {
              currentModalImageData = fullItem.imageData;
              item.imageData = fullItem.imageData;
              updateImagePreview();
            }
          }
        }).catch(e => console.warn('IDB modal image load notice:', e));
      }
      updateImagePreview();
    }
    if (item.pdfAttachment) {
      currentModalPdf = item.pdfAttachment;
      if (!item.pdfAttachment.data) {
        loadAchievementsFromIndexedDB().then(idbData => {
          if (idbData) {
            const fullItem = idbData.find(a => a.id === item.id);
            if (fullItem && fullItem.pdfAttachment && fullItem.pdfAttachment.data) {
              currentModalPdf = fullItem.pdfAttachment;
              item.pdfAttachment = fullItem.pdfAttachment;
              updatePdfPreview();
            }
          }
        }).catch(e => console.warn('IDB modal pdf load notice:', e));
      }
      updatePdfPreview();
    } else {
      currentModalPdf = null;
      updatePdfPreview();
    }
  } else {
    modalTitle.textContent = 'เพิ่มงานใหม่ (ADD TASK / ACHIEVEMENT)';
    document.getElementById('achvId').value = '';
    document.getElementById('achvFactory').value = '';
    document.getElementById('achvDepartment').value = '';
    setSelectValueWithFallback(document.getElementById('achvAssignee'), currentUser.name || '');
    document.getElementById('achvStatus').value = 'in_progress';
    if (categories.length > 0) {
      document.getElementById('achvCategory').value = categories[0].id;
    }
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('achvRequestDate').value = today;

    // Default Excel fields for new task
    if (document.getElementById('achvSubStatus')) {
      document.getElementById('achvSubStatus').value = '02 Concept Design';
      updateModalAchievementBadge('02 Concept Design');
    }
    if (document.getElementById('achvJobType')) document.getElementById('achvJobType').value = 'D';
    if (document.getElementById('achvSubJobType')) document.getElementById('achvSubJobType').value = '01 In-house';
    if (document.getElementById('achvPriority')) document.getElementById('achvPriority').value = 'Medium';
    if (document.getElementById('achvToolingTeam1')) document.getElementById('achvToolingTeam1').value = '';
    if (document.getElementById('achvToolingTeam2')) document.getElementById('achvToolingTeam2').value = '';
    if (document.getElementById('achvDesignSupport1')) document.getElementById('achvDesignSupport1').value = '';
    if (document.getElementById('achvDesignSupport2')) document.getElementById('achvDesignSupport2').value = '';
    if (document.getElementById('achvMaintenanceSupport1')) document.getElementById('achvMaintenanceSupport1').value = '';
    if (document.getElementById('achvMaintenanceSupport2')) document.getElementById('achvMaintenanceSupport2').value = '';
    if (document.getElementById('achvMaintenanceSupport3')) document.getElementById('achvMaintenanceSupport3').value = '';
    if (document.getElementById('achvMaintenanceSupport4')) document.getElementById('achvMaintenanceSupport4').value = '';
    if (document.getElementById('achvMaintenanceSupport5')) document.getElementById('achvMaintenanceSupport5').value = '';

    currentModalFolder = null;
    updateFolderPreview();
    currentModalPdf = null;
    updatePdfPreview();
  }

  modal.classList.add('active');

  setTimeout(() => {
    const titleInput = document.getElementById('achvTitle');
    if (titleInput && !window.location.hash.includes('scroll_att')) titleInput.focus();
    if (window.location.hash.includes('scroll_att')) {
      const modalBody = document.querySelector('#achievementModal .modal-body');
      if (modalBody) modalBody.scrollTop = 9999;
    }
  }, 100);
}

function closeAchievementModal() {
  document.getElementById('achievementModal').classList.remove('active');
}

function handleSaveAchievement(e) {
  e.preventDefault();

  if (!currentUser) {
    alert('กรุณาเข้าสู่ระบบด้วยรหัส PIN ก่อนบันทึกข้อมูล');
    openAuthPinModal();
    return;
  }

  const id = document.getElementById('achvId').value;
  const title = uppercaseEnglish(document.getElementById('achvTitle').value.trim());
  const categoryId = document.getElementById('achvCategory').value;
  const code = uppercaseEnglish(document.getElementById('achvCode').value.trim());
  const quotation = uppercaseEnglish(document.getElementById('achvQuotation').value.trim());
  const requestName = uppercaseEnglish(document.getElementById('achvRequestName').value.trim());
  const requestDate = document.getElementById('achvRequestDate').value;
  const factory = uppercaseEnglish(document.getElementById('achvFactory').value.trim());
  const department = uppercaseEnglish(document.getElementById('achvDepartment').value.trim());
  const process = uppercaseEnglish(document.getElementById('achvProcess').value.trim());
  const assignee = uppercaseEnglish(document.getElementById('achvAssignee').value.trim());
  const status = document.getElementById('achvStatus').value;
  const completionDate = document.getElementById('achvCompletionDate').value;
  const description = uppercaseEnglish(document.getElementById('achvDescription').value.trim());
  const note = uppercaseEnglish(document.getElementById('achvNote').value.trim());

  // Read Excel Engineering Tracking fields
  const subStatus = document.getElementById('achvSubStatus') ? document.getElementById('achvSubStatus').value : (status === 'done' ? '10 Finished' : '02 Concept Design');
  const achievement = SUB_STATUS_ACHIEVEMENT_MAP[subStatus] !== undefined ? SUB_STATUS_ACHIEVEMENT_MAP[subStatus] : (status === 'done' ? 1 : 0.2);
  const jobType = document.getElementById('achvJobType') ? document.getElementById('achvJobType').value : 'D';
  const subJobType = document.getElementById('achvSubJobType') ? document.getElementById('achvSubJobType').value : '01 In-house';
  const priority = document.getElementById('achvPriority') ? document.getElementById('achvPriority').value : 'Medium';

  const toolingTeam1 = document.getElementById('achvToolingTeam1') ? document.getElementById('achvToolingTeam1').value.trim() : '';
  const toolingTeam2 = document.getElementById('achvToolingTeam2') ? document.getElementById('achvToolingTeam2').value.trim() : '';
  const designSupport1 = document.getElementById('achvDesignSupport1') ? document.getElementById('achvDesignSupport1').value.trim() : '';
  const designSupport2 = document.getElementById('achvDesignSupport2') ? document.getElementById('achvDesignSupport2').value.trim() : '';
  const maintenanceSupport1 = document.getElementById('achvMaintenanceSupport1') ? document.getElementById('achvMaintenanceSupport1').value.trim() : '';
  const maintenanceSupport2 = document.getElementById('achvMaintenanceSupport2') ? document.getElementById('achvMaintenanceSupport2').value.trim() : '';
  const maintenanceSupport3 = document.getElementById('achvMaintenanceSupport3') ? document.getElementById('achvMaintenanceSupport3').value.trim() : '';
  const maintenanceSupport4 = document.getElementById('achvMaintenanceSupport4') ? document.getElementById('achvMaintenanceSupport4').value.trim() : '';
  const maintenanceSupport5 = document.getElementById('achvMaintenanceSupport5') ? document.getElementById('achvMaintenanceSupport5').value.trim() : '';

  const designTeam = '';
  const toolingTeam = Array.from(new Set([toolingTeam1, toolingTeam2].filter(Boolean))).join(', ');
  const designSupport = Array.from(new Set([designSupport1, designSupport2].filter(Boolean))).join(', ');
  const maintenanceSupport = Array.from(new Set([
    maintenanceSupport1,
    maintenanceSupport2,
    maintenanceSupport3,
    maintenanceSupport4,
    maintenanceSupport5
  ].filter(Boolean))).join(', ');
  const supportBy = Array.from(new Set([
    designSupport1,
    designSupport2,
    maintenanceSupport1,
    maintenanceSupport2,
    maintenanceSupport3,
    maintenanceSupport4,
    maintenanceSupport5
  ].filter(Boolean))).join(', ');

  if (!title) {
    alert('กรุณากรอกชื่อ TASK NAME');
    return;
  }
  if (!categoryId) {
    alert('กรุณาเลือกหมวดหมู่งาน');
    return;
  }

  // Work Folder: strictly from uploaded files
  let finalWorkFolder = null;
  if (currentModalFolder && (currentModalFolder.files && currentModalFolder.files.length > 0 || currentModalFolder.data || currentModalFolder.name)) {
    finalWorkFolder = currentModalFolder;
  }

  // PDF Attachment: strictly from uploaded file
  let finalPdfAttachment = null;
  if (currentModalPdf && (currentModalPdf.data || currentModalPdf.name)) {
    finalPdfAttachment = currentModalPdf;
  }

  let savedItem = null;
  if (id) {
    const index = achievements.findIndex(a => a.id === id);
    if (index !== -1) {
      const existing = achievements[index];
      const perm = canUserEditTask(currentUser, existing);
      if (!perm.allowed) {
        alert('⛔ ขออภัย คุณไม่มีสิทธิ์บันทึกการแก้ไขงานนี้');
        return;
      }

      savedItem = {
        ...existing,
        title,
        categoryId,
        code,
        quotation,
        requestName,
        requestDate,
        factory,
        department,
        process,
        assignee,
        status,
        completionDate,
        description,
        note,
        subStatus,
        achievement,
        jobType,
        subJobType,
        priority,
        designTeam,
        toolingTeam1,
        toolingTeam2,
        toolingTeam,
        designSupport1,
        designSupport2,
        designSupport,
        maintenanceSupport1,
        maintenanceSupport2,
        maintenanceSupport3,
        maintenanceSupport4,
        maintenanceSupport5,
        maintenanceSupport,
        supportBy,
        workFolder: finalWorkFolder,
        pdfAttachment: finalPdfAttachment,
        imageData: currentModalImageData,
        creatorPin: existing.creatorPin || (perm.isOverride ? (existing.assignee ? null : currentUser.pin) : currentUser.pin),
        editorPin: currentUser.pin,
        lastEditedBy: currentUser.name,
        lastEditedRole: currentUser.role,
        updatedAt: new Date().toISOString()
      };
      achievements[index] = savedItem;
      showToast('แก้ไขข้อมูลงานสำเร็จ (SUCCESS)');
    }
  } else {
    const newId = 'achv_' + Date.now();
    savedItem = {
      id: newId,
      title,
      categoryId,
      code,
      quotation,
      requestName,
      requestDate,
      factory,
      department,
      process,
      assignee,
      status,
      completionDate,
      description,
      note,
      subStatus,
      achievement,
      jobType,
      subJobType,
      priority,
      designTeam,
      toolingTeam1,
      toolingTeam2,
      toolingTeam,
      designSupport1,
      designSupport2,
      designSupport,
      maintenanceSupport1,
      maintenanceSupport2,
      maintenanceSupport3,
      maintenanceSupport4,
      maintenanceSupport5,
      maintenanceSupport,
      supportBy,
      workFolder: finalWorkFolder,
      pdfAttachment: finalPdfAttachment,
      imageData: currentModalImageData,
      creatorPin: currentUser.pin,
      editorPin: currentUser.pin,
      lastEditedBy: currentUser.name,
      lastEditedRole: currentUser.role,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    achievements.unshift(savedItem);
    showToast('เพิ่มงานใหม่สำเร็จ (SUCCESS)');
  }

  saveAchievements();
  if (firebaseDb && savedItem) {
    saveAchievementToCloud(savedItem);
  } else if (savedItem) {
    savedItem._pendingSync = true;
  }
  closeAchievementModal();
  renderAll();
}

function deleteAchievement(id) {
  const item = achievements.find(a => a.id === id);
  if (!item) return;

  if (!currentUser) {
    openAuthPinModal('delete', item, () => deleteAchievement(id));
    return;
  }

  const perm = canUserEditTask(currentUser, item);
  if (!perm.allowed) {
    alert(`⛔ ขออภัย คุณไม่มีสิทธิ์ลบงานนี้\n\n📌 งานนี้เป็นของ: ${perm.ownerName}\n👤 คุณเข้าสู่ระบบในชื่อ: ${currentUser.name}\n\n(สิทธิ์ลบจำกัดเฉพาะเจ้าของงาน หรือผู้ดูแลระบบ ADMIN เท่านั้น)`);
    return;
  }

  let promptMsg = `คุณต้องการลบงาน "${item.title}" ใช่หรือไม่?`;
  if (perm.isOverride) {
    promptMsg = `👑 [ADMIN OVERRIDE]\nคุณกำลังจะลบงานของ: ${item.assignee || 'ผู้รับผิดชอบงาน'}\nชื่องาน: "${item.title}"\n\nต้องการยืนยันการลบใช่หรือไม่?`;
  }

  if (confirm(promptMsg)) {
    achievements = achievements.filter(a => a.id !== id);
    saveAchievements();
    if (firebaseDb) {
      deleteAchievementFromCloud(id);
    }
    showToast('ลบรายการงานเรียบร้อยแล้ว');
    renderAll();
  }
}

// --- Detail View Modal ---
let currentDetailAchievementId = null;

function viewAchievementDetail(id) {
  const item = achievements.find(a => a.id === id);
  if (!item) return;

  currentDetailAchievementId = id;
  const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#64748b' };
  const xl = getTaskExcelTracking(item);
  const modal = document.getElementById('detailModal');
  const titleEl = document.getElementById('detailTitle');
  const bodyEl = document.getElementById('detailBody');

  titleEl.innerHTML = `<span>📄</span> ${escapeHtml(uppercaseEnglish(item.title))}`;
  const statusHtml = getStatusPillHtml(item.status);

  bodyEl.innerHTML = `
    <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 16px; align-items: center;">
      <span class="category-badge" style="background-color: ${cat.color}15; color: ${cat.color};">
        ${cat.icon} ${escapeHtml(uppercaseEnglish(cat.name))}
      </span>
      ${statusHtml}
      <span class="sub-status-pill" style="font-size: 11px; padding: 3px 8px;">📊 ${escapeHtml(uppercaseEnglish(stripLeadingNumberCode(xl.subStatus)))} (${xl.achievementPct}%)</span>
      ${item.code ? `<span class="badge-code">REQUEST NO: ${escapeHtml(uppercaseEnglish(item.code))}</span>` : ''}
      ${item.quotation ? `<span class="badge-quotation">QUOTATION: ${escapeHtml(uppercaseEnglish(item.quotation))}</span>` : ''}
      ${item.assignee ? `<span class="badge-assignee">ASSIGN: 😎 ${escapeHtml(uppercaseEnglish(item.assignee))}</span>` : ''}
    </div>

    <!-- Request & Excel Engineering Metadata Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(155px, 1fr)); gap: 10px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 16px; font-size: 12.5px;">
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">REQUEST NAME:</span>
        <div style="font-weight: 700;">${escapeHtml(uppercaseEnglish(item.requestName || '-'))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">REQUEST DATE:</span>
        <div style="font-weight: 700;">${item.requestDate || '-'}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">FACTORY:</span>
        <div style="font-weight: 700;">${escapeHtml(uppercaseEnglish(item.factory || '-'))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">DEPARTMENT:</span>
        <div style="font-weight: 700;">${escapeHtml(uppercaseEnglish(item.department || '-'))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">PROCESS:</span>
        <div style="font-weight: 700;">${escapeHtml(uppercaseEnglish(item.process || '-'))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">JOB TYPE / SUB JOB:</span>
        <div style="font-weight: 700; color: #1e40af;">${escapeHtml(getJobTypeTitle(xl.jobType))} • ${escapeHtml(uppercaseEnglish(stripLeadingNumberCode(xl.subJobType)))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">PRIORITY (JOB LEVEL):</span>
        <div style="font-weight: 700; color: #b91c1c;">${escapeHtml(uppercaseEnglish(xl.priority))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">TOOLING TEAM (1-2):</span>
        <div style="font-weight: 700;">${escapeHtml(uppercaseEnglish(xl.toolingTeam))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">DESIGN SUPPORT (1-2):</span>
        <div style="font-weight: 700;">${escapeHtml(uppercaseEnglish(xl.designSupport))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">MANTENANCE SUPPORT (1-5):</span>
        <div style="font-weight: 700;">${escapeHtml(uppercaseEnglish(xl.maintenanceSupport))}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">DATE COMPLETED:</span>
        <div style="font-weight: 700; color: #047857;">${item.completionDate || '-'}${xl.finishedMonth ? ` (${escapeHtml(uppercaseEnglish(xl.finishedMonth))})` : ''}</div>
      </div>
      <div>
        <span style="color: var(--text-muted); font-size: 11px;">ACHIEVEMENT SCORE:</span>
        <div style="font-weight: 800; color: #059669;">${xl.achievement} (${xl.achievementPct}%)</div>
      </div>
    </div>

    ${item.imageData ? (
      isDrawingPdf(item.imageData) ? `
        <div style="margin-bottom: 16px; background: #f0fdf4; border: 1px solid #86efac; padding: 12px 16px; border-radius: 8px; display: flex; align-items: center; justify-content: space-between; gap: 12px; flex-wrap: wrap;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <span style="font-size: 24px;">📄</span>
            <div>
              <div style="font-size: 13.5px; font-weight: 700; color: #166534;">DRAWING (PDF): ${escapeHtml(getDrawingName(item.imageData, 'DRAWING.PDF'))}</div>
              <div style="font-size: 11.5px; color: #15803d;">เอกสาร DRAWING / แบบงานแนบ (ไฟล์ PDF ไม่จำกัดขนาด)</div>
            </div>
          </div>
          <button class="btn btn-outline btn-sm" onclick="openDrawingAttachment('${item.id}')" style="background: #fff; color: #166534; border-color: #86efac; font-weight: 700;">
            เปิดดูไฟล์ DRAWING (PDF)
          </button>
        </div>
      ` : `
        <div style="margin-bottom: 16px; border-radius: 8px; overflow: hidden; max-height: 300px; border: 1px solid var(--border-color); cursor: pointer;" onclick="openDrawingAttachment('${item.id}')" title="คลิกเพื่อดูภาพ DRAWING">
          <img src="${getDrawingDataUrl(item.imageData)}" style="width: 100%; max-height: 300px; object-fit: contain; background: #000;" alt="ภาพประกอบ / DRAWING">
        </div>
      `
    ) : ''}

    <div style="margin-bottom: 14px;">
      <h4 style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 4px; text-transform: uppercase;">DETAIL (รายละเอียดงาน):</h4>
      <p style="white-space: pre-wrap; font-size: 14px; line-height: 1.6;">${escapeHtml(uppercaseEnglish(item.description || '-'))}</p>
    </div>

    ${item.note ? `
      <div style="margin-bottom: 14px; background: #fefce8; border-left: 4px solid #eab308; padding: 10px 14px; border-radius: 4px;">
        <h4 style="font-size: 12.5px; color: #854d0e; margin-bottom: 2px; font-weight: 700; text-transform: uppercase;">NOTE (หมายเหตุ / ความคืบหน้า):</h4>
        <p style="font-size: 13.5px; color: #713f12; margin: 0;">${escapeHtml(uppercaseEnglish(item.note))}</p>
      </div>
    ` : ''}

    <!-- Attachments Display -->
    <div style="margin-top: 16px; padding-top: 14px; border-top: 1px solid var(--border-color);">
      <h4 style="font-size: 12.5px; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">ATTACHMENTS (เอกสารแนบและผลงาน):</h4>
      <div style="display: flex; flex-direction: column; gap: 8px;">
        ${item.pdfAttachment ? `
          <div style="display: flex; align-items: center; justify-content: space-between; background: #f0f4fc; border: 1px solid #c8d8f6; padding: 10px 14px; border-radius: 4px; gap: 8px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #163282; min-width: 0; flex: 1;">
              <span>📄</span>
              <span style="word-break: break-all;">JOB REQUEST: ${escapeHtml(item.pdfAttachment.name)} ${item.pdfAttachment.size ? `<span style="font-weight: normal; font-size: 11.5px; opacity: 0.85;">(${formatFileSize(item.pdfAttachment.size)})</span>` : ''}</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <button class="btn btn-outline btn-sm" onclick="openPdfAttachment('${item.id}')" style="background: #fff; color: #163282; border-color: #c8d8f6; font-weight: 600;">
                👁️ ดูไฟล์ PDF
              </button>
              <button class="btn btn-primary btn-sm" onclick="downloadPdfAttachment('${item.id}')" style="font-weight: 600;">
                ⬇️ ดาวน์โหลด PDF
              </button>
            </div>
          </div>
        ` : ''}

        ${item.imageData ? `
          <div style="display: flex; align-items: center; justify-content: space-between; background: #f0fdf4; border: 1px solid #bbf7d0; padding: 10px 14px; border-radius: 4px; gap: 8px; flex-wrap: wrap;">
            <div style="display: flex; align-items: center; gap: 8px; font-size: 13px; font-weight: 700; color: #166534; min-width: 0; flex: 1;">
              <span>${isDrawingPdf(item.imageData) ? '📄' : '🖼️'}</span>
              <span>DRAWING / ภาพผลงาน (${isDrawingPdf(item.imageData) ? 'PDF' : 'IMAGE'}): ${escapeHtml(getDrawingName(item.imageData, isDrawingPdf(item.imageData) ? 'DRAWING.PDF' : 'IMAGE'))}</span>
            </div>
            <div style="display: flex; gap: 6px; align-items: center;">
              <button class="btn btn-outline btn-sm" onclick="openDrawingAttachment('${item.id}')" style="background: #fff; color: #166534; border-color: #86efac; font-weight: 600;">
                ${isDrawingPdf(item.imageData) ? '👁️ ดูไฟล์ DRAWING' : '👁️ ดูภาพ'}
              </button>
              <button class="btn btn-primary btn-sm" onclick="downloadImageAttachment('${item.id}')" style="background: #059669; border-color: #059669; font-weight: 600;">
                ⬇️ ดาวน์โหลด
              </button>
            </div>
          </div>
        ` : ''}

        ${item.workFolder ? `
          <div style="display: flex; align-items: center; justify-content: space-between; background: #fffbeb; border: 1px solid #fde68a; padding: 12px 16px; border-radius: 6px; gap: 10px; flex-wrap: wrap;">
            <div style="min-width: 0; flex: 1; margin-right: 8px;">
              <div style="display: flex; align-items: center; gap: 6px; flex-wrap: wrap;">
                <span style="font-size: 18px;">📁</span>
                <span style="font-size: 13.5px; font-weight: 700; color: #92400e;">${escapeHtml(getFolderName(item.workFolder))}</span>
                ${getFolderMetaText(item.workFolder) ? `<span style="font-size: 11px; background: #fef3c7; color: #b45309; padding: 2px 6px; border-radius: 4px; font-weight: 600;">${escapeHtml(getFolderMetaText(item.workFolder))}</span>` : ''}
              </div>
              ${getFolderPath(item.workFolder) ? `
                <div style="font-size: 11.5px; color: #78350f; word-break: break-all; margin-top: 4px;">
                  <strong>PATH / LINK:</strong> ${escapeHtml(getFolderPath(item.workFolder))}
                </div>
              ` : ''}
            </div>
            <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
              <button class="btn btn-outline btn-sm" onclick="downloadWorkFolderAttachment('${item.id}')" style="background:#ecfdf5; color:#065f46; border-color:#a7f3d0; font-weight: 700;">
                📥 ดาวน์โหลดโฟลเดอร์ (.ZIP)
              </button>
              <button class="btn btn-outline btn-sm" onclick="openWorkFolderModal('${item.id}')" style="background:#fff; color:#92400e; border-color:#fcd34d;">
                📑 ดูรายการไฟล์
              </button>
              ${getFolderPath(item.workFolder) ? `
                <button class="btn btn-secondary btn-sm" onclick="copyWorkFolderFromItem('${item.id}')">
                  📋 คัดลอก PATH
                </button>
              ` : ''}
            </div>
          </div>
        ` : ''}

        ${(!item.pdfAttachment && !item.imageData && !item.workFolder) ? '<div style="font-size: 12px; color: #94a3b8;">ไม่มีเอกสารแนบหรือโฟลเดอร์สำหรับงานนี้</div>' : ''}
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function closeDetailModal() {
  document.getElementById('detailModal').classList.remove('active');
}

function editFromDetailModal() {
  const id = currentDetailAchievementId;
  closeDetailModal();
  if (id) {
    openAchievementModal(id);
  }
}

// --- Category Manager (Add, Edit, Delete) ---
function openCategoryModal() {
  editingCategoryId = null;
  renderCategoryManagerList();
  document.getElementById('categoryModal').classList.add('active');
}

function closeCategoryModal() {
  editingCategoryId = null;
  document.getElementById('categoryModal').classList.remove('active');
}

function renderCategoryManagerList() {
  const container = document.getElementById('categoryManagerList');
  if (!container) return;

  let html = '';
  categories.forEach(cat => {
    const count = achievements.filter(a => a.categoryId === cat.id).length;
    const isEditing = editingCategoryId === cat.id;

    if (isEditing) {
      html += `
        <div class="category-manage-item" style="background: #eff6ff; border-color: #3b82f6;">
          <form class="category-edit-row" onsubmit="handleSaveEditCategory(event, '${cat.id}')">
            <input type="text" id="editCatIcon_${cat.id}" class="form-control" style="width: 48px; text-align: center; padding: 4px;" value="${escapeHtml(cat.icon || '📁')}" title="ไอคอนอิโมจิ">
            <input type="text" id="editCatName_${cat.id}" class="form-control" style="flex: 1; min-width: 140px; padding: 6px 10px;" value="${escapeHtml(uppercaseEnglish(cat.name))}" placeholder="ชื่อหมวดหมู่" required>
            <input type="color" id="editCatColor_${cat.id}" class="form-control" style="width: 42px; padding: 2px; height: 34px; cursor: pointer;" value="${cat.color || '#2563eb'}" title="สีหมวดหมู่">
            <button type="submit" class="btn btn-primary btn-sm">บันทึก (SAVE)</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="cancelEditCategory()">ยกเลิก (CANCEL)</button>
          </form>
        </div>
      `;
    } else {
      html += `
        <div class="category-manage-item">
          <div style="display: flex; align-items: center; gap: 10px; min-width: 0; flex: 1;">
            <span style="font-size: 18px; width: 26px; text-align: center;">${cat.icon || '📁'}</span>
            <div style="min-width: 0; flex: 1;">
              <div style="display: flex; align-items: center; gap: 6px;">
                <span style="font-weight: 700; font-size: 13.5px; color: ${cat.color};">${escapeHtml(uppercaseEnglish(cat.name))}</span>
                <span style="font-size: 11.5px; color: var(--text-muted);">(${count} TASKS)</span>
              </div>
            </div>
          </div>
          <div class="category-manage-actions">
            <button type="button" class="btn btn-outline btn-sm" onclick="startEditCategory('${cat.id}')" title="แก้ไขชื่อ/ไอคอน/สี">
              ✏️ แก้ไข (EDIT)
            </button>
            <button type="button" class="btn btn-danger btn-sm" onclick="handleDeleteCategory('${cat.id}')" title="ลบหมวดหมู่">
              🗑️ ลบ (DELETE)
            </button>
          </div>
        </div>
      `;
    }
  });

  container.innerHTML = html;
}

function startEditCategory(catId) {
  editingCategoryId = catId;
  renderCategoryManagerList();
  setTimeout(() => {
    const nameInput = document.getElementById(`editCatName_${catId}`);
    if (nameInput) nameInput.focus();
  }, 50);
}

function cancelEditCategory() {
  editingCategoryId = null;
  renderCategoryManagerList();
}

function handleSaveEditCategory(e, catId) {
  e.preventDefault();
  const nameInput = document.getElementById(`editCatName_${catId}`);
  const iconInput = document.getElementById(`editCatIcon_${catId}`);
  const colorInput = document.getElementById(`editCatColor_${catId}`);

  const newName = uppercaseEnglish(nameInput.value.trim());
  const newIcon = iconInput.value.trim() || '📁';
  const newColor = colorInput.value || '#2563eb';

  if (!newName) {
    alert('กรุณาระบุชื่อหมวดหมู่');
    return;
  }

  const catIndex = categories.findIndex(c => c.id === catId);
  if (catIndex !== -1) {
    categories[catIndex].name = newName;
    categories[catIndex].icon = newIcon;
    categories[catIndex].color = newColor;

    saveCategories();
    editingCategoryId = null;

    renderCategoryManagerList();
    populateCategoryDropdowns();
    renderCharts();
    renderContent();
    showToast(`แก้ไขหมวดหมู่ "${newName}" สำเร็จ (SUCCESS)`);
  }
}

function handleAddCategory(e) {
  e.preventDefault();
  const nameInput = document.getElementById('newCategoryName');
  const iconInput = document.getElementById('newCategoryIcon');
  const colorInput = document.getElementById('newCategoryColor');

  const name = uppercaseEnglish(nameInput.value.trim());
  const icon = iconInput.value.trim() || '📁';
  const color = colorInput.value || '#2563eb';

  if (!name) {
    alert('กรุณากรอกชื่อหมวดหมู่');
    return;
  }

  if (categories.some(c => c.name.toLowerCase() === name.toLowerCase())) {
    alert(`มีหมวดหมู่ "${name}" อยู่ในระบบแล้ว`);
    return;
  }

  const newCat = {
    id: 'cat_' + Date.now(),
    name,
    icon,
    color
  };

  categories.push(newCat);
  saveCategories();
  nameInput.value = '';

  renderCategoryManagerList();
  populateCategoryDropdowns();
  renderCharts();
  renderContent();
  showToast(`เพิ่มหมวดหมู่ "${name}" สำเร็จ (SUCCESS)`);
}

function handleDeleteCategory(catId) {
  if (categories.length <= 1) {
    alert('ไม่สามารถลบได้ เนื่องจากระบบต้องมีหมวดหมู่อย่างน้อย 1 หมวดหมู่');
    return;
  }

  const cat = categories.find(c => c.id === catId);
  if (!cat) return;

  const count = achievements.filter(a => a.categoryId === catId).length;

  if (count > 0) {
    const otherCats = categories.filter(c => c.id !== catId);
    const targetCat = otherCats[0];

    const confirmed = confirm(
      `หมวดหมู่ "${cat.name}" มีงานอยู่ทั้งหมด ${count} รายการ\n\n` +
      `หากคุณลบหมวดหมู่นี้ ระบบจะย้ายงานทั้ง ${count} รายการไปยังหมวดหมู่ "${targetCat.icon} ${targetCat.name}" โดยอัตโนมัติเพื่อไม่ให้ข้อมูลสูญหาย\n\n` +
      `คุณต้องการดำเนินการต่อใช่หรือไม่?`
    );

    if (!confirmed) return;

    achievements.forEach(a => {
      if (a.categoryId === catId) {
        a.categoryId = targetCat.id;
      }
    });
    saveAchievements();
  } else {
    const confirmed = confirm(`คุณต้องการลบหมวดหมู่ "${cat.name}" ใช่หรือไม่?`);
    if (!confirmed) return;
  }

  categories = categories.filter(c => c.id !== catId);
  saveCategories();

  if (currentCategoryFilter === catId) {
    currentCategoryFilter = 'all';
  }

  renderCategoryManagerList();
  populateCategoryDropdowns();
  renderCharts();
  renderContent();
  showToast(`ลบหมวดหมู่ "${cat.name}" เรียบร้อยแล้ว`);
}

// --- Image & Drawing Attachment Handling (Image & PDF, Unlimited Size) ---
function handleImageUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const isPdf = file.type === 'application/pdf' || 
                file.type === 'application/x-pdf' || 
                file.name.toLowerCase().endsWith('.pdf');

  const reader = new FileReader();
  reader.onload = (event) => {
    currentModalImageData = {
      type: isPdf ? 'pdf' : 'image',
      name: uppercaseEnglish(file.name),
      data: event.target.result,
      size: file.size
    };
    updateImagePreview();
    showToast(`แนบไฟล์ ${isPdf ? 'DRAWING (PDF)' : 'ภาพ / DRAWING'} "${uppercaseEnglish(file.name)}" เรียบร้อยแล้ว`);
  };
  reader.onerror = (err) => {
    console.error('FileReader error:', err);
    alert('เกิดข้อผิดพลาดในการอ่านไฟล์ภาพหรือ DRAWING');
    if (e.target) e.target.value = '';
  };
  reader.readAsDataURL(file);
}

function updateImagePreview() {
  const previewBox = document.getElementById('imagePreviewContainer');
  const previewImg = document.getElementById('imagePreview');
  const pdfContainer = document.getElementById('imagePdfPreviewContainer');
  const pdfNameDisplay = document.getElementById('imagePdfFileNameDisplay');

  if (!currentModalImageData) {
    if (previewImg) previewImg.src = '';
    if (previewBox) previewBox.style.display = 'none';
    if (pdfContainer) pdfContainer.style.display = 'none';
    return;
  }

  if (isDrawingPdf(currentModalImageData)) {
    if (previewImg) previewImg.src = '';
    if (previewBox) previewBox.style.display = 'none';
    if (pdfContainer) {
      if (pdfNameDisplay) {
        pdfNameDisplay.textContent = getDrawingName(currentModalImageData, 'DRAWING.PDF');
      }
      pdfContainer.style.display = 'flex';
    }
  } else {
    if (pdfContainer) pdfContainer.style.display = 'none';
    if (previewImg && previewBox) {
      previewImg.src = getDrawingDataUrl(currentModalImageData) || '';
      previewBox.style.display = 'block';
    }
  }
}

function removeModalImage() {
  currentModalImageData = null;
  const input = document.getElementById('achvImageInput');
  if (input) input.value = '';
  updateImagePreview();
  showToast('ลบไฟล์แนบ DRAWING / ภาพเรียบร้อยแล้ว');
}

function viewModalImagePdf() {
  if (!currentModalImageData || !isDrawingPdf(currentModalImageData)) return;
  const dataUrl = getDrawingDataUrl(currentModalImageData);
  if (dataUrl) {
    openPdfData(dataUrl);
  }
}

function downloadModalImage() {
  if (currentModalImageData) {
    const dataUrl = getDrawingDataUrl(currentModalImageData);
    if (dataUrl) {
      const isPdf = isDrawingPdf(currentModalImageData);
      const defaultName = isPdf ? 'DRAWING.PDF' : 'IMAGE.PNG';
      const filename = (typeof currentModalImageData === 'object' && currentModalImageData.name) ? currentModalImageData.name : defaultName;
      const mime = (typeof currentModalImageData === 'object' && currentModalImageData.type) ? currentModalImageData.type : (isPdf ? 'application/pdf' : 'image/png');
      downloadBase64File(dataUrl, filename, mime);
      showToast(`ดาวน์โหลดไฟล์: "${uppercaseEnglish(filename)}" เรียบร้อย`);
      return;
    }
  }
  alert('ยังไม่ได้แนบไฟล์รูปภาพ/DRAWING หรือไม่พบข้อมูลไฟล์');
}

// --- PDF Attachment Handling & Smart Job Request Auto-Fill ---

// Initialize PDF.js worker if library is present
if (typeof pdfjsLib !== 'undefined') {
  try {
    if (window.location.protocol === 'file:') {
      // In file:// protocol, avoid worker SecurityError
      pdfjsLib.GlobalWorkerOptions.workerSrc = '';
    } else {
      pdfjsLib.GlobalWorkerOptions.workerSrc = 'pdf.worker.min.js';
    }
  } catch (e) {
    console.warn('PDF.js worker setup note:', e);
  }
}

/**
 * Extracts all readable text from a PDF ArrayBuffer.
 * Uses PDF.js with pure-JS fallback if PDF.js is unavailable.
 */
async function extractTextFromPdf(arrayBuffer) {
  if (typeof pdfjsLib !== 'undefined') {
    try {
      const docParams = {
        data: arrayBuffer,
        useSystemFonts: true,
        disableFontFace: true
      };
      if (window.location.protocol === 'file:' || !pdfjsLib.GlobalWorkerOptions.workerSrc) {
        docParams.disableWorker = true;
      }
      const loadingTask = pdfjsLib.getDocument(docParams);
      const pdfDoc = await loadingTask.promise;
      let fullText = '';
      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);
        const textContent = await page.getTextContent();
        let lastY = null;
        let lineStr = '';
        const pageLines = [];
        for (const item of textContent.items) {
          if (!item.str) continue;
          if (lastY !== null && Math.abs(item.transform[5] - lastY) > 5) {
            if (lineStr.trim()) pageLines.push(lineStr.trim());
            lineStr = '';
          }
          lineStr += (lineStr ? ' ' : '') + item.str;
          lastY = item.transform[5];
        }
        if (lineStr.trim()) pageLines.push(lineStr.trim());
        fullText += pageLines.join('\n') + '\n';
      }
      if (fullText.trim().length > 0) {
        return fullText;
      }
    } catch (pdfErr) {
      console.warn('PDF.js parsing error, attempting fallback stream extraction:', pdfErr);
    }
  }

  return extractPdfTextFallback(arrayBuffer);
}

/**
 * Pure JavaScript fallback stream & literal text extractor
 */
function extractPdfTextFallback(arrayBuffer) {
  try {
    const bytes = new Uint8Array(arrayBuffer);
    let latin1 = '';
    const chunkSize = 8192;
    for (let i = 0; i < bytes.length; i += chunkSize) {
      const slice = bytes.subarray(i, Math.min(i + chunkSize, bytes.length));
      latin1 += String.fromCharCode.apply(null, slice);
    }
    const tjMatches = latin1.match(/\(([^)]+)\)\s*Tj/g) || [];
    const textPieces = [];
    for (const match of tjMatches) {
      const raw = match.replace(/^\(/, '').replace(/\)\s*Tj$/, '');
      const clean = raw.replace(/\\([\\()])/g, '$1').trim();
      if (clean.length > 0) textPieces.push(clean);
    }
    return textPieces.join(' ');
  } catch (e) {
    console.warn('PDF Fallback extraction note:', e);
    return '';
  }
}

/**
 * Standardize Department name
 */
function mapToStandardDepartment(str) {
  if (!str) return '';
  const u = str.toUpperCase();
  if (u.includes('FERRULE') || u.includes('เฟอร์รูล')) return 'FERRULE PRODUCTION';
  if (u.includes('MOTOR') || u.includes('มอเตอร์') || u.includes('GEAR') || u.includes('ROTOR') || u.includes('BRUSHLESS')) return 'MOTOR PRODUCTION';
  if (u.includes('OPTICAL') || u.includes('OPICAL')) return 'OPICAL PRODUCTION';
  if (u.includes('FIBER') || u.includes('ไฟเบอร์')) return 'FIBER PRODUCTION';
  if (u.includes('QC') || u.includes('QA') || u.includes('QUALITY') || u.includes('ตรวจสอบ')) return 'QUALITY';
  if (u.includes('MEDICAL') || u.includes('แพทย์')) return 'MEDICAL PRODUCTION';
  if (u.includes('TECHNO') || u.includes('เทคโนโลยี') || u.includes('PT') || u.includes('PE')) return 'PRODUCTION TECHNOLOGY';
  if (u.includes('OFFICE') || u.includes('ADMIN') || u.includes('HR') || u.includes('บัญชี') || u.includes('ธุรการ')) return 'OFFICE';
  if (u.includes('FACILITY') || u.includes('FACILITIES') || u.includes('สถานที่')) return 'FACILITIES';
  if (u.includes('INDIRECT') || u.includes('OTHER') || u.includes('อื่นๆ')) return 'OTHER';
  return uppercaseEnglish(str.trim());
}

/**
 * Standardize date string into YYYY-MM-DD
 */
function normalizeDateToIso(str) {
  if (!str) return '';
  str = str.trim();

  // If already YYYY-MM-DD
  const isoMatch = str.match(/\b(20\d{2})-(0[1-9]|1[0-2])-([0-2][0-9]|3[01])\b/);
  if (isoMatch) return isoMatch[0];

  const monthMap = {
    'JAN': 1, 'FEB': 2, 'MAR': 3, 'APR': 4, 'MAY': 5, 'JUN': 6,
    'JUL': 7, 'AUG': 8, 'SEP': 9, 'OCT': 10, 'NOV': 11, 'DEC': 12,
    'JANUARY': 1, 'FEBRUARY': 2, 'MARCH': 3, 'APRIL': 4, 'JUNE': 6, 'JULY': 7,
    'AUGUST': 8, 'SEPTEMBER': 9, 'OCTOBER': 10, 'NOVEMBER': 11, 'DECEMBER': 12,
    'ม.ค.': 1, 'ก.พ.': 2, 'มี.ค.': 3, 'เม.ย.': 4, 'พ.ค.': 5, 'มิ.ย.': 6,
    'ก.ค.': 7, 'ส.ค.': 8, 'ก.ย.': 9, 'ต.ค.': 10, 'พ.ย.': 11, 'ธ.ค.': 12
  };

  // Check text month e.g. "24-Mar-2026", "24 Mar 2026", "24-Mar-26", "16-Jan-2026"
  const textMonthMatch = str.match(/(\d{1,2})[\s\-\.\/]+([A-Za-zก-๙\.]+)(?:[\s\-\.\/]+(\d{2,4}))?/);
  if (textMonthMatch && isNaN(Number(textMonthMatch[2]))) {
    const day = parseInt(textMonthMatch[1], 10);
    const mKey = textMonthMatch[2].toUpperCase();
    const mNum = monthMap[mKey] || monthMap[mKey.substring(0, 3)] || 1;
    let year = textMonthMatch[3] ? parseInt(textMonthMatch[3], 10) : new Date().getFullYear();
    if (year < 100) year += 2000;
    if (year > 2500) year -= 543;
    return `${year}-${String(mNum).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  // Handle DD/MM/YYYY or DD-MM-YYYY or YYYY/MM/DD
  const slashParts = str.split(/[\/\-\.]/);
  if (slashParts.length === 3) {
    const p1 = parseInt(slashParts[0], 10);
    const p2 = parseInt(slashParts[1], 10);
    const p3 = parseInt(slashParts[2], 10);

    if (!isNaN(p1) && !isNaN(p2) && !isNaN(p3)) {
      if (p1 > 1000) {
        let year = p1 > 2500 ? p1 - 543 : p1;
        return `${year}-${String(p2).padStart(2, '0')}-${String(p3).padStart(2, '0')}`;
      }
      if (p3 > 1000) {
        let year = p3 > 2500 ? p3 - 543 : p3;
        return `${year}-${String(p2).padStart(2, '0')}-${String(p1).padStart(2, '0')}`;
      }
      if (p3 < 100) {
        const year = 2000 + p3;
        return `${year}-${String(p2).padStart(2, '0')}-${String(p1).padStart(2, '0')}`;
      }
    }
  }

  return '';
}

/**
 * Infer Category ID from extracted Job Request data
 */
function inferJobRequestCategory(data) {
  const code = (data.code || '').toUpperCase();
  const title = (data.title || '').toUpperCase();
  const quot = (data.quotation || '').toUpperCase();
  const desc = (data.description || '').toUpperCase();

  // ACCESSORIES
  if (code.startsWith('ACC-') || title.includes('COVER') || title.includes('TROLLEY') ||
      title.includes('TRAY') || title.includes('STAND') || title.includes('HOLDER') ||
      title.includes('RACK') || title.includes('กล่อง') || title.includes('ถาด') || title.includes('โต๊ะ')) {
    return 'cat_acc';
  }

  // JIG & FIXTURE
  if (code.startsWith('GM-J') || code.startsWith('FR-J') || code.startsWith('OPT-J') ||
      code.startsWith('MD-J') || code.startsWith('QC-J') || code.startsWith('STD-J') ||
      code.startsWith('OTH-J') || code.startsWith('PT-') || code.startsWith('JIG-') ||
      title.includes('JIG') || title.includes('FIXTURE') || desc.includes('JIG')) {
    return 'cat_jig';
  }

  // PR / PURCHASING
  if (quot || title.includes('(PR)') || title.includes('PURCHASE') || title.includes('BUY') || title.includes('สั่งซื้อ')) {
    return 'cat_pr';
  }

  // IMPROVEMENT / KAIZEN
  if (title.includes('IMP') || title.includes('KAIZEN') || title.includes('IMPROVE') || title.includes('ปรับปรุง') || desc.includes('KAIZEN')) {
    return 'cat_imp';
  }

  // PRIVATE PROJECT
  if (code.includes('PVT') || title.includes('PRIVATE') || desc.includes('PRIVATE') || quot.includes('PRIVATE')) {
    return 'cat_pvt';
  }

  // Default to Special Project
  return 'cat_prj';
}

/**
 * Cross-references a code, quotation, or title against:
 * 1. The existing achievements list in memory
 * 2. The official Master Job Requests Database (window.JOB_REQUESTS_DB, 495 items)
 */
function lookupJobRequestData(queryCode) {
  if (!queryCode) return null;
  const raw = String(queryCode).trim().toUpperCase();
  const cleanCode = raw.replace(/\.PDF$/i, '').trim();

  if (cleanCode.length < 3) return null;

  // Blacklist generic department names, statuses, or general non-code words
  const IGNORED_LOOKUP_WORDS = [
    'PRODUCTION TECHNOLOGY', 'PRODUCTION', 'TECHNOLOGY',
    'FERRULE', 'MOTOR', 'QUALITY', 'QC', 'QA', 'MEDICAL',
    'OFFICE', 'FACILITIES', 'FACILITY', 'OTHER', 'ASSEMBLY',
    'TESTING', 'MACHINING', 'GENERAL', 'WAIT', 'PENDING', 'DONE', 'CANCEL', 'CANCLE'
  ];
  if (IGNORED_LOOKUP_WORDS.includes(cleanCode)) {
    return null;
  }

  // Exclude current item being edited so it never matches itself
  const currentEditingId = document.getElementById('achvId')?.value || '';

  // 1. Search existing achievements (exact match on code, quotation, or title)
  const matchedAchv = achievements.find(a => 
    (!currentEditingId || a.id !== currentEditingId) && (
      (a.code && a.code.toUpperCase() === cleanCode) ||
      (a.quotation && a.quotation.toUpperCase() === cleanCode) ||
      (a.title && a.title.toUpperCase() === cleanCode)
    )
  );

  // 2. Search Master Job Requests Database (window.JOB_REQUESTS_DB)
  let dbItem = null;
  if (typeof window.JOB_REQUESTS_DB === 'object' && window.JOB_REQUESTS_DB) {
    if (window.JOB_REQUESTS_DB[cleanCode]) {
      dbItem = window.JOB_REQUESTS_DB[cleanCode];
    } else {
      const keys = Object.keys(window.JOB_REQUESTS_DB);
      const matchedKey = keys.find(k => k === cleanCode);
      if (matchedKey) {
        dbItem = window.JOB_REQUESTS_DB[matchedKey];
      }
    }
  }

  if (!matchedAchv && !dbItem) return null;

  return {
    code: (matchedAchv && matchedAchv.code) || (dbItem && dbItem.code) || cleanCode,
    title: (matchedAchv && matchedAchv.title) || (dbItem && dbItem.title) || '',
    categoryId: (matchedAchv && matchedAchv.categoryId) || (dbItem && dbItem.category) || 'cat_jig',
    quotation: (matchedAchv && matchedAchv.quotation) || '',
    requestName: (matchedAchv && matchedAchv.requestName) || (dbItem && dbItem.requestName) || '',
    requestDate: (matchedAchv && matchedAchv.requestDate) || (dbItem && dbItem.requestDate) || '',
    factory: (matchedAchv && matchedAchv.factory) || (dbItem && dbItem.factory) || 'FACTORY 1',
    department: (matchedAchv && matchedAchv.department) || (dbItem && dbItem.department) || '',
    process: (matchedAchv && matchedAchv.process) || (dbItem && dbItem.process) || '',
    assignee: (matchedAchv && matchedAchv.assignee) || (dbItem && dbItem.assignee) || 'JITTRAKAN K.',
    status: (matchedAchv && matchedAchv.status) || (dbItem && dbItem.status) || 'in_progress',
    description: (matchedAchv && matchedAchv.description) || (dbItem && dbItem.requestDetail) || '',
    note: (matchedAchv && matchedAchv.note) || (dbItem && dbItem.actionDetail) || '',
    workFolder: (matchedAchv && matchedAchv.workFolder) || null
  };
}

/**
 * Analyzes an attached Work Folder (name, files inside, and folder path)
 * and extracts quotation number, drawing codes, process, task name, and department.
 */
function parseWorkFolderMetadata(folderName, files, folderPath) {
  const meta = {
    quotation: '',
    code: '',
    title: '',
    department: '',
    process: '',
    factory: 'FACTORY 1',
    categoryId: 'cat_jig',
    status: 'in_progress',
    assignee: '',
    requestName: '',
    description: '',
    note: ''
  };

  const nameStr = (folderName || '').trim();
  const pathStr = (folderPath || '').trim();
  const combinedStr = (nameStr + ' ' + pathStr).toUpperCase();

  // 1. Extract Quotation number e.g. "26-0121"
  const qMatch = combinedStr.match(/\b(2[4-9]-\d{3,5})\b/);
  if (qMatch) {
    meta.quotation = qMatch[1];
  }

  // 2. Extract Process from folder name e.g. "26-0121 - DROP GLUING" -> "DROP GLUING"
  let cleanName = nameStr.replace(/^\d{2}-\d{3,5}\s*[\-_:\s]\s*/i, '').trim();
  if (cleanName) {
    const uClean = cleanName.toUpperCase();
    if (uClean.includes('GLUING')) meta.process = 'GLUING';
    else if (uClean.includes('POLISHING')) meta.process = 'FINISH POLISHING';
    else if (uClean.includes('WINDING')) meta.process = 'WINDING';
    else if (uClean.includes('GEAR')) meta.process = 'GEAR PROCESS';
    else if (uClean.includes('ASSEMBLY')) meta.process = 'ASSEMBLY';
    else if (uClean.includes('ROTOR')) meta.process = 'ROTOR PROCESS';
    else if (uClean.includes('STATOR')) meta.process = 'STATOR PROCESS';
    else if (uClean.includes('FINAL')) meta.process = 'FINAL INSPECTION';
    else meta.process = uppercaseEnglish(cleanName);
  }

  // 3. Inspect files inside folder for Drawing / Jig code e.g. "JIG-MOT074.pdf"
  let drawingCode = '';
  if (Array.isArray(files) && files.length > 0) {
    for (const f of files) {
      const fName = (typeof f === 'string' ? f : (f.name || '')).toUpperCase();
      const codeM = fName.match(/\b(JIG-[A-Z0-9\-]+|ACC-[A-Z0-9\-]+|FI-[A-Z0-9\-]+|LT\d+-[A-Z0-9\-]+)\b/);
      if (codeM) {
        drawingCode = codeM[1];
        break;
      }
    }
  }

  // 4. Construct Task Name
  if (drawingCode && cleanName) {
    if (cleanName.toUpperCase().includes(drawingCode)) {
      meta.title = uppercaseEnglish(cleanName);
    } else {
      meta.title = uppercaseEnglish(`${drawingCode} ${cleanName}`);
    }
  } else if (drawingCode) {
    meta.title = uppercaseEnglish(drawingCode + (meta.process ? ' ' + meta.process : ''));
  } else if (cleanName) {
    meta.title = uppercaseEnglish(cleanName);
  }

  // 5. Department & Factory inference
  if (drawingCode.startsWith('JIG-MOT') || combinedStr.includes('MOTOR') || combinedStr.includes('ROTOR') || combinedStr.includes('STATOR') || combinedStr.includes('GEAR')) {
    meta.department = 'MOTOR';
    meta.requestName = 'ฝ่าย MOTOR';
    meta.factory = 'FACTORY 1';
  } else if (drawingCode.startsWith('JIG-FR') || combinedStr.includes('FERRULE')) {
    meta.department = 'FERRULE';
    meta.requestName = 'ฝ่าย FERRULE';
    meta.factory = 'FACTORY 1';
  } else if (drawingCode.startsWith('JIG-OPT') || combinedStr.includes('FIBER')) {
    meta.department = 'FIBER';
    meta.requestName = 'ฝ่าย FIBER ASSY';
    meta.factory = 'FACTORY 1';
  } else if (combinedStr.includes('MEDICAL')) {
    meta.department = 'MEDICAL';
    meta.requestName = 'ฝ่าย MEDICAL';
    meta.factory = 'FACTORY 2';
  } else if (combinedStr.includes('QC') || combinedStr.includes('QA')) {
    meta.department = 'QC';
    meta.requestName = 'ฝ่าย QC';
    meta.factory = 'FACTORY 1';
  }

  // 6. Category inference
  if (drawingCode.startsWith('ACC-')) {
    meta.categoryId = 'cat_acc';
  } else if (drawingCode.startsWith('JIG-') || meta.title.includes('JIG') || meta.process.includes('GLUING')) {
    meta.categoryId = 'cat_jig';
  }

  // 7. Cross-reference with existing achievements list!
  const matchedAchv = achievements.find(a => 
    (meta.quotation && a.quotation === meta.quotation) ||
    (meta.title && a.title && (a.title.includes(meta.title) || meta.title.includes(a.title))) ||
    (drawingCode && a.title && a.title.includes(drawingCode)) ||
    (nameStr && a.workFolder && (
      (typeof a.workFolder === 'string' && a.workFolder.includes(nameStr)) ||
      (typeof a.workFolder === 'object' && a.workFolder.name && a.workFolder.name.includes(nameStr))
    ))
  );

  if (matchedAchv) {
    if (matchedAchv.code) meta.code = matchedAchv.code;
    if (matchedAchv.title) meta.title = matchedAchv.title;
    if (matchedAchv.requestName) meta.requestName = matchedAchv.requestName;
    if (matchedAchv.requestDate) meta.requestDate = matchedAchv.requestDate;
    if (matchedAchv.factory) meta.factory = matchedAchv.factory;
    if (matchedAchv.department) meta.department = matchedAchv.department;
    if (matchedAchv.process) meta.process = matchedAchv.process;
    if (matchedAchv.assignee) meta.assignee = matchedAchv.assignee;
    if (matchedAchv.description) meta.description = matchedAchv.description;
    if (matchedAchv.note) meta.note = matchedAchv.note;
    if (matchedAchv.status) meta.status = matchedAchv.status;
    if (matchedAchv.categoryId) meta.categoryId = matchedAchv.categoryId;
  }

  return meta;
}

/**
 * Parses raw text & filename into structured Job Request fields
 * with automatic Master Database fallback and cross-referencing.
 */
function parseJobRequestPdfData(rawText, fileName) {
  const data = {
    code: '',
    title: '',
    categoryId: '',
    status: 'in_progress',
    quotation: '',
    requestName: '',
    requestDate: '',
    factory: '',
    department: '',
    process: '',
    assignee: '',
    description: '',
    note: ''
  };

  if (!rawText && !fileName) return data;
  const text = rawText || '';
  const upper = text.toUpperCase();
  const fnUpper = (fileName || '').toUpperCase();

  // 1. Request Number / Drawing Code
  const reqCodeRegex = /\b((?:GM|FR|OPT|MD|QC|STD|OTH|PT)-J?2[4-9]-\d{2,4}|JIG-[A-Z0-9\-]+|ACC-[A-Z0-9\-]+|LT2[4-9]-[A-Z0-9\-]+)\b/i;
  let codeMatch = text.match(/(?:REQ(?:UEST)?\.?\s*NO|JOB\s*NO|DRAWING\s*NO|เลขที่คำขอ|รหัสงาน|รหัส\s*DRAWING)\s*[:：]\s*([A-Z0-9\-_/]+)/i);
  if (codeMatch && codeMatch[1] && codeMatch[1].length >= 3) {
    data.code = uppercaseEnglish(codeMatch[1].trim());
  } else {
    codeMatch = text.match(reqCodeRegex);
    if (codeMatch) {
      data.code = uppercaseEnglish(codeMatch[1].trim());
    } else {
      const fnMatch = fnUpper.match(reqCodeRegex);
      if (fnMatch) data.code = uppercaseEnglish(fnMatch[1].trim());
    }
  }

  // 2. Quotation / PR No.
  const quotMatch = text.match(/(?:QUOTATION(?:\s*NO)?|PR\s*NO|ใบเสนอราคา|เลขที่ใบเสนอราคา)\s*[:：]\s*(2[4-9]-\d{3,5}|\d{2}-\d{4})/i)
    || text.match(/\b(2[4-9]-\d{4})\b/)
    || fnUpper.match(/\b(2[4-9]-\d{4})\b/);
  if (quotMatch) {
    data.quotation = uppercaseEnglish(quotMatch[1].trim());
  }

  // 3. Request Date
  const dateMatch = text.match(/(?:REQUEST\s*DATE|REQ\s*DATE|DATE\s*OF\s*REQUEST|\bDATE\b|วันที่ร้องขอ|วันที่ขอรับบริการ|วันที่)\s*[:：]\s*([0-9]{1,4}[\/\-\.][0-9]{1,2}[\/\-\.][0-9]{1,4}|[0-9]{1,2}[\s\-]+[A-Za-zก-๙\.]+(?:[\s\-]+[0-9]{2,4})?)/i)
    || text.match(/\b(\d{4}-\d{2}-\d{2})\b/)
    || text.match(/\b(\d{1,2}[\/\-\.]\d{1,2}[\/\-\.]\d{2,4})\b/);
  if (dateMatch) {
    data.requestDate = normalizeDateToIso(dateMatch[1] ? dateMatch[1].trim() : dateMatch[0].trim());
  }

  // 4. Request Name / Requester
  const reqNameMatch = text.match(/(?:REQUESTER|REQUEST\s*NAME|REQ\s*NAME|REQUESTED\s*BY|ISSUED\s*BY|ผู้ร้องขอ|ผู้ขอรับบริการ|ชื่อผู้ร้องขอ)\s*[:：]\s*([^\n\r,\/]{2,40})/i);
  if (reqNameMatch) {
    let name = reqNameMatch[1].trim().replace(/^(MR\.|MS\.|MRS\.|นาย|นาง|นางสาว|คุณ)\s*/i, '');
    name = name.split(/\t|\s{3,}/)[0].trim();
    if (name) data.requestName = uppercaseEnglish(name);
  } else {
    const knownRequesters = [
      'SURASAT S.', 'SANAT S.', 'ANANTACHAI J.', 'JITTRAKAN K.', 'NUY', 'พี่เบิ้ม',
      'K.VITHUYADA', 'VITHUYADA', 'SARAYUT', 'THAWATCHAI', 'CHANVIT', 'SOMCHAI'
    ];
    for (const kr of knownRequesters) {
      if (upper.includes(kr.toUpperCase())) {
        data.requestName = uppercaseEnglish(kr);
        break;
      }
    }
  }

  // 5. Department
  const deptMatch = text.match(/(?:DEPARTMENT|DEPT\.?|DIV\.?|ฝ่าย|แผนก|แผนกที่ร้องขอ)\s*[:：]\s*([^\n\r,\/]{2,30})/i);
  if (deptMatch) {
    const d = deptMatch[1].trim().split(/\t|\s{3,}/)[0].trim();
    data.department = mapToStandardDepartment(d);
  }
  if (!data.department || data.department === 'JOB REQUEST') {
    data.department = '';
    if (/FERRULE|เฟอร์รูล/i.test(text)) data.department = 'FERRULE PRODUCTION';
    else if (/BRUSHLESS|MOTOR|มอเตอร์/i.test(text)) data.department = 'MOTOR PRODUCTION';
    else if (/FIBER\s*ASSY|FIBER|ไฟเบอร์/i.test(text)) data.department = 'FIBER PRODUCTION';
    else if (/\bQC\b|\bQA\b|ตรวจสอบคุณภาพ|QUALITY/i.test(text)) data.department = 'QUALITY';
    else if (/MEDICAL|การแพทย์/i.test(text)) data.department = 'MEDICAL PRODUCTION';
    else if (/PRODUCTION\s*TECHNOLOGY|TECHNOLOGY|เทคโนโลยี/i.test(text)) data.department = 'PRODUCTION TECHNOLOGY';
    else if (/OFFICE|ADMIN|HR|ธุรการ|บัญชี/i.test(text)) data.department = 'OFFICE';
    else if (/FACILITIES|FACILITY|อาคาร|สถานที่/i.test(text)) data.department = 'FACILITIES';
    else if (/OTHER|อื่นๆ/i.test(text)) data.department = 'OTHER';
  }

  // 6. Factory (FACTORY A, FACTORY B, FACTORY C, FACTORY D, FACTORY E)
  if (/FACTORY\s*[1A]|โรงงาน\s*[1A]|\bFAC\s*[1A]\b/i.test(text)) {
    data.factory = 'FACTORY A';
  } else if (/FACTORY\s*[2B]|โรงงาน\s*[2B]|\bFAC\s*[2B]\b/i.test(text)) {
    data.factory = 'FACTORY B';
  } else if (/FACTORY\s*[3C]|โรงงาน\s*[3C]|\bFAC\s*[3C]\b/i.test(text)) {
    data.factory = 'FACTORY C';
  } else if (/FACTORY\s*[4D]|โรงงาน\s*[4D]|\bFAC\s*[4D]\b/i.test(text)) {
    data.factory = 'FACTORY D';
  } else if (/FACTORY\s*[5E]|โรงงาน\s*[5E]|\bFAC\s*[5E]\b/i.test(text)) {
    data.factory = 'FACTORY E';
  } else {
    const facMatch = text.match(/(?:FACTORY|FAC\.?|PLANT|โรงงาน)\s*[:：]\s*([1-5A-E]|FACTORY\s*[1-5A-E]|โรงงาน\s*[1-5A-E])/i);
    if (facMatch) {
      const f = facMatch[1].toUpperCase();
      if (f.includes('2') || f.includes('B')) data.factory = 'FACTORY B';
      else if (f.includes('3') || f.includes('C')) data.factory = 'FACTORY C';
      else if (f.includes('4') || f.includes('D')) data.factory = 'FACTORY D';
      else if (f.includes('5') || f.includes('E')) data.factory = 'FACTORY E';
      else data.factory = 'FACTORY A';
    }
  }

  // 7. Process
  const procMatch = text.match(/(?:PROCESS|กระบวนการ|ขั้นตอน)\s*[:：]\s*([^\n\r,\/]{2,35})/i);
  if (procMatch) {
    const p = procMatch[1].trim().split(/\t|\s{3,}/)[0].trim();
    data.process = uppercaseEnglish(p);
  } else {
    const knownProcesses = [
      'FINISH POLISHING', 'SLOPE POLISHING', 'COMPOUND', 'BRUSHLESS MOTOR',
      'FINAL INSPECTION', 'GEAR PROCESS', 'CENTERLESS', 'GLUING', 'MACHINING',
      'ASSEMBLY', 'INSPECTION', 'WINDING', '3D PRINT', 'SAFETY', 'WELDING'
    ];
    for (const kp of knownProcesses) {
      if (upper.includes(kp)) {
        data.process = kp;
        break;
      }
    }
  }

  // 8. Task Title / Machine / Jig Name
  const titleMatch = text.match(/(?:MACHINE\s*\/\s*JIG\s*NAME|JIG\s*NAME|MACHINE\s*NAME|M\/C\s*NAME|SUBJECT|JOB\s*NAME|TASK\s*NAME|ชื่อจิ๊ก|ชื่องาน|หัวข้องาน)\s*[:：]\s*([^\n\r]{3,80})/i);
  if (titleMatch) {
    let t = titleMatch[1].trim().split(/\t|\s{3,}/)[0].trim();
    t = t.replace(/\s*(?:M\/C|DEPT|PROCESS|STATUS).*$/i, '').trim();
    if (t) data.title = uppercaseEnglish(t);
  }

  // 9. Assignee
  const assignMatch = text.match(/(?:ASSIGNEE|ASSIGN|ACTION\s*BY|ASSIGNED\s*TO|PIC|ช่าง|ผู้รับผิดชอบ|ผู้ปฏิบัติงาน)\s*[:：]\s*([^\n\r,\/]{2,30})/i);
  if (assignMatch) {
    data.assignee = uppercaseEnglish(assignMatch[1].trim().split(/\t|\s{3,}/)[0].trim());
  }

  // 10. Detail / Description
  const descMatch = text.match(/(?:REQUEST\s*DETAIL|DETAIL|DESCRIPTION|วัตถุประสงค์|รายละเอียดงาน|รายละเอียด)\s*[:：]\s*([\s\S]+?)(?=(?:ACTION\s*DETAILS|ACTION|STATUS|APPROVED|SIGN|ลงชื่อ|หมายเหตุ|DOWN\s*\(|ACTUAL|$))/i);
  if (descMatch) {
    let desc = descMatch[1].trim();
    desc = desc.split('\n').map(l => l.trim()).filter(Boolean).join('\n');
    data.description = uppercaseEnglish(desc);
  }

  // 11. Cross-reference with Master Job Requests Database and Achievements!
  const queryCode = data.code || fnUpper.replace(/\.PDF$/i, '');
  const dbData = lookupJobRequestData(queryCode);
  if (dbData) {
    if (!data.code && dbData.code) data.code = dbData.code;
    if (!data.title && dbData.title) data.title = dbData.title;
    if (!data.department && dbData.department) data.department = dbData.department;
    if (!data.factory && dbData.factory) data.factory = dbData.factory;
    if (!data.process && dbData.process) data.process = dbData.process;
    if (!data.requestDate && dbData.requestDate) data.requestDate = dbData.requestDate;
    if (!data.requestName && dbData.requestName) data.requestName = dbData.requestName;
    if (!data.assignee && dbData.assignee) data.assignee = dbData.assignee;
    if (!data.description && dbData.description) data.description = dbData.description;
    if (!data.note && dbData.note) data.note = dbData.note;
    if (dbData.status) data.status = dbData.status;
    if (dbData.quotation && !data.quotation) data.quotation = dbData.quotation;
    if (dbData.categoryId && !data.categoryId) data.categoryId = dbData.categoryId;
  }

  // 12. Fallback title if still empty
  if (!data.title) {
    if (data.code) {
      data.title = data.code + (data.process ? ' ' + data.process : ' JOB REQUEST');
    } else if (fileName) {
      const cleanFn = fileName.replace(/\.pdf$/i, '').replace(/[\-_]+/g, ' ').trim();
      data.title = uppercaseEnglish(cleanFn);
    }
  }

  // 13. Category
  if (!data.categoryId) {
    data.categoryId = inferJobRequestCategory(data);
  }

  return data;
}

// Auto-fill disabled per user request
function highlightAutofilledField(el) {}
function applyJobRequestAutofill(parsedData, sourceName) {}
function renderPdfAutofillBanner(filledSummary, sourceName) {}
function hidePdfAutofillBanner() {}

/**
 * Helper to read a File object as Data URL
 */
function readFileAsDataURL(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
}

/**
 * Main handler for PDF upload event (pure upload, no auto-fill)
 */
async function handlePdfUpload(e) {
  const file = e.target.files && e.target.files[0];
  if (!file) return;

  const isPdf = file.type === 'application/pdf' || 
                file.type === 'application/x-pdf' || 
                file.name.toLowerCase().endsWith('.pdf');

  if (!isPdf) {
    alert('กรุณาเลือกไฟล์เอกสารที่เป็นรูปแบบ PDF (.pdf) เท่านั้น');
    if (e.target) e.target.value = '';
    return;
  }

  const loadingEl = document.getElementById('pdfLoadingIndicator');
  const loadingText = document.getElementById('pdfLoadingText');
  if (loadingEl) {
    if (loadingText) loadingText.textContent = 'กำลังอัพโหลดไฟล์ PDF...';
    loadingEl.style.display = 'flex';
  }

  try {
    const dataUrl = await readFileAsDataURL(file);
    currentModalPdf = {
      name: uppercaseEnglish(file.name),
      data: dataUrl,
      size: file.size
    };
    updatePdfPreview();
    if (loadingEl) loadingEl.style.display = 'none';
    showToast(`✅ อัพโหลดไฟล์ PDF "${uppercaseEnglish(file.name)}" สำเร็จ พร้อมดาวน์โหลด`);
  } catch (err) {
    if (loadingEl) loadingEl.style.display = 'none';
    console.error('PDF upload error:', err);
    alert('เกิดข้อผิดพลาดในการอัพโหลดไฟล์ PDF');
  }
}

function updatePdfPreview() {
  const pdfContainer = document.getElementById('pdfPreviewContainer');
  const pdfNameDisplay = document.getElementById('pdfFileNameDisplay');
  const pdfMetaDisplay = document.getElementById('pdfMetaDisplay');
  const viewBtn = document.getElementById('btnViewPdf');
  const dlBtn = document.getElementById('btnDownloadPdf');
  const loadingEl = document.getElementById('pdfLoadingIndicator');
  if (loadingEl) loadingEl.style.display = 'none';

  if (currentModalPdf && currentModalPdf.name) {
    if (pdfNameDisplay) {
      pdfNameDisplay.textContent = currentModalPdf.name;
    }
    if (pdfMetaDisplay) {
      const sizeStr = currentModalPdf.size ? formatFileSize(currentModalPdf.size) : (currentModalPdf.data ? 'มีข้อมูลไฟล์' : (currentModalPdf.hasCloudPdf ? 'เก็บบนระบบคลาวด์' : 'PDF DOCUMENT'));
      pdfMetaDisplay.textContent = `${sizeStr} • PDF DOCUMENT`;
    }
    if (viewBtn) {
      viewBtn.style.display = (currentModalPdf.data || currentModalPdf.hasCloudPdf) ? 'inline-flex' : 'none';
    }
    if (dlBtn) {
      dlBtn.style.display = (currentModalPdf.data || currentModalPdf.hasCloudPdf) ? 'inline-flex' : 'none';
    }
    if (pdfContainer) pdfContainer.style.display = 'flex';
  } else {
    if (pdfContainer) pdfContainer.style.display = 'none';
    const pdfInput = document.getElementById('achvPdfInput');
    if (pdfInput) pdfInput.value = '';
  }
}

function removeModalPdf() {
  currentModalPdf = null;
  const pdfInput = document.getElementById('achvPdfInput');
  if (pdfInput) pdfInput.value = '';
  updatePdfPreview();
  showToast('ลบไฟล์แนบ JOB REQUEST (PDF) เรียบร้อยแล้ว');
}

function copyPdfPath() {}
function handlePdfPathChange() {}

async function viewModalPdf() {
  if (currentModalPdf && currentModalPdf.data) {
    openPdfData(currentModalPdf.data);
    return;
  }
  const achvId = document.getElementById('achvId')?.value;
  if (firebaseDb && achvId) {
    showToast('☁️ กำลังดึงไฟล์ PDF จากระบบคลาวด์...');
    const cloudPdf = await downloadPdfFileFromFirestore(firebaseDb, achvId);
    if (cloudPdf && cloudPdf.data) {
      if (currentModalPdf) {
        currentModalPdf.data = cloudPdf.data;
      } else {
        currentModalPdf = cloudPdf;
      }
      updatePdfPreview();
      openPdfData(cloudPdf.data);
      return;
    }
  }
  alert('ยังไม่ได้แนบไฟล์ PDF หรือไม่พบข้อมูลไฟล์บนคลาวด์');
}

async function downloadModalPdf() {
  if (currentModalPdf && currentModalPdf.data) {
    const filename = currentModalPdf.name || 'JOB_REQUEST.PDF';
    downloadBase64File(currentModalPdf.data, filename, 'application/pdf');
    showToast(`ดาวน์โหลดไฟล์ PDF: "${uppercaseEnglish(filename)}" สำเร็จ`);
    return;
  }
  const achvId = document.getElementById('achvId')?.value;
  if (firebaseDb && achvId) {
    showToast('☁️ กำลังดาวน์โหลดไฟล์ PDF จากระบบคลาวด์...');
    const cloudPdf = await downloadPdfFileFromFirestore(firebaseDb, achvId);
    if (cloudPdf && cloudPdf.data) {
      if (currentModalPdf) {
        currentModalPdf.data = cloudPdf.data;
      } else {
        currentModalPdf = cloudPdf;
      }
      updatePdfPreview();
      const filename = cloudPdf.name || currentModalPdf?.name || 'JOB_REQUEST.PDF';
      downloadBase64File(cloudPdf.data, filename, 'application/pdf');
      showToast(`ดาวน์โหลดไฟล์ PDF: "${uppercaseEnglish(filename)}" สำเร็จ`);
      return;
    }
  }
  alert('ยังไม่ได้แนบไฟล์ PDF หรือไม่พบข้อมูลไฟล์');
}

async function openPdfAttachment(achvId) {
  let item = achievements.find(a => a.id === achvId);
  if (!item) return;

  if (item.pdfAttachment && item.pdfAttachment.data) {
    openPdfData(item.pdfAttachment.data);
    return;
  }

  // 1. Check local IndexedDB
  try {
    const idbData = await loadAchievementsFromIndexedDB();
    if (idbData) {
      const fullItem = idbData.find(a => a.id === achvId);
      if (fullItem && fullItem.pdfAttachment && fullItem.pdfAttachment.data) {
        if (item.pdfAttachment) {
          item.pdfAttachment.data = fullItem.pdfAttachment.data;
        } else {
          item.pdfAttachment = fullItem.pdfAttachment;
        }
        openPdfData(fullItem.pdfAttachment.data);
        return;
      }
    }
  } catch (idbErr) {
    console.warn('IndexedDB read error for PDF:', idbErr);
  }

  // 2. Fetch on-demand from Firebase Cloud Firestore
  if (firebaseDb) {
    showToast('☁️ กำลังดาวน์โหลดไฟล์ PDF จากระบบคลาวด์...');
    try {
      const cloudPdf = await downloadPdfFileFromFirestore(firebaseDb, achvId);
      if (cloudPdf && cloudPdf.data) {
        if (item.pdfAttachment) {
          item.pdfAttachment.data = cloudPdf.data;
          if (!item.pdfAttachment.name && cloudPdf.name) item.pdfAttachment.name = cloudPdf.name;
          item.pdfAttachment.hasCloudPdf = true;
        } else {
          item.pdfAttachment = cloudPdf;
        }

        // Cache in local IndexedDB
        saveAchievementsToIndexedDB(achievements);
        showToast('✅ ดาวน์โหลด PDF จากคลาวด์สำเร็จ');
        openPdfData(cloudPdf.data);
        return;
      }
    } catch (cloudErr) {
      console.error('Error fetching PDF from Firestore:', cloudErr);
    }
  }

  alert('ไม่พบไฟล์ PDF แนบสำหรับงานนี้บนคลาวด์\n\n- หากเพิ่งแนบไฟล์จากคอมพิวเตอร์อีกเครื่อง: เมื่อเครื่องนั้นเปิดเว็บและต่อเน็ต ระบบจะซิงค์ไฟล์ขึ้นคลาวด์ให้อัตโนมัติในพื้นหลังครับ\n- หรือที่เครื่องต้นทาง ไปที่ปุ่ม "CLOUD: ONLINE" > กด "ซิงค์ไฟล์แนบทั้งหมดขึ้นคลาวด์"');
}

async function downloadPdfAttachment(achvId) {
  let item = achievements.find(a => a.id === achvId);
  if (!item) return;

  if (item.pdfAttachment && item.pdfAttachment.data) {
    const filename = item.pdfAttachment.name || `${item.code || 'JOB_REQUEST'}.PDF`;
    downloadBase64File(item.pdfAttachment.data, filename, 'application/pdf');
    showToast(`ดาวน์โหลดไฟล์ PDF: "${uppercaseEnglish(filename)}" สำเร็จ`);
    return;
  }

  try {
    showToast('กำลังตรวจสอบไฟล์ในเครื่อง...');
    const idbData = await loadAchievementsFromIndexedDB();
    if (idbData) {
      const fullItem = idbData.find(a => a.id === achvId);
      if (fullItem && fullItem.pdfAttachment && fullItem.pdfAttachment.data) {
        if (item.pdfAttachment) {
          item.pdfAttachment.data = fullItem.pdfAttachment.data;
        } else {
          item.pdfAttachment = fullItem.pdfAttachment;
        }
        const filename = fullItem.pdfAttachment.name || `${item.code || 'JOB_REQUEST'}.PDF`;
        downloadBase64File(fullItem.pdfAttachment.data, filename, 'application/pdf');
        showToast(`ดาวน์โหลดไฟล์ PDF: "${uppercaseEnglish(filename)}" สำเร็จ`);
        return;
      }
    }
  } catch (err) {
    console.warn('IndexedDB fetch error during PDF download:', err);
  }

  // Fetch on-demand from Firebase Cloud Firestore
  if (firebaseDb) {
    showToast('☁️ กำลังดาวน์โหลดไฟล์ PDF จากระบบคลาวด์...');
    try {
      const cloudPdf = await downloadPdfFileFromFirestore(firebaseDb, achvId);
      if (cloudPdf && cloudPdf.data) {
        if (item.pdfAttachment) {
          item.pdfAttachment.data = cloudPdf.data;
          if (!item.pdfAttachment.name && cloudPdf.name) item.pdfAttachment.name = cloudPdf.name;
          item.pdfAttachment.hasCloudPdf = true;
        } else {
          item.pdfAttachment = cloudPdf;
        }

        saveAchievementsToIndexedDB(achievements);
        const filename = cloudPdf.name || `${item.code || 'JOB_REQUEST'}.PDF`;
        downloadBase64File(cloudPdf.data, filename, 'application/pdf');
        showToast(`ดาวน์โหลดไฟล์ PDF: "${uppercaseEnglish(filename)}" สำเร็จ`);
        return;
      }
    } catch (cloudErr) {
      console.error('Error fetching PDF from Firestore for download:', cloudErr);
    }
  }

  alert('ไม่พบข้อมูลไฟล์ PDF ที่สามารถดาวน์โหลดได้สำหรับงานนี้บนคลาวด์\n\n- หากเพิ่งแนบไฟล์จากคอมพิวเตอร์อีกเครื่อง: เมื่อเครื่องนั้นเปิดเว็บและต่อเน็ต ระบบจะซิงค์ไฟล์ขึ้นคลาวด์ให้อัตโนมัติในพื้นหลังครับ\n- หรือที่เครื่องต้นทาง ไปที่ปุ่ม "CLOUD: ONLINE" > กด "ซิงค์ไฟล์แนบทั้งหมดขึ้นคลาวด์"');
}

function openPdfData(base64Data) {
  try {
    if (!base64Data) return;
    if (base64Data.startsWith('blob:')) {
      const w = window.open(base64Data, '_blank');
      if (!w) {
        const a = document.createElement('a');
        a.href = base64Data;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
      return;
    }
    const arr = base64Data.split(',');
    if (arr.length < 2) {
      window.open(base64Data, '_blank');
      return;
    }
    const mimeMatch = arr[0].match(/:(.*?);/);
    const mime = mimeMatch ? mimeMatch[1] : 'application/pdf';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mime });
    const blobUrl = URL.createObjectURL(blob);
    const win = window.open(blobUrl, '_blank');
    if (!win) {
      const a = document.createElement('a');
      a.href = blobUrl;
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (err) {
    console.error('Error opening PDF:', err);
    window.open(base64Data, '_blank');
  }
}

// --- Work Folder Helpers & Attachment Handling ---
async function handleFolderUpload(e) {
  const files = e.target.files;
  if (!files || files.length === 0) return;

  const firstRelPath = files[0].webkitRelativePath || '';
  const rootFolderName = firstRelPath ? firstRelPath.split('/')[0] : (files[0].name || 'WORK FOLDER');

  // Show immediate progress feedback in preview bar
  const container = document.getElementById('folderPreviewContainer');
  const nameDisplay = document.getElementById('folderNameDisplay');
  const metaDisplay = document.getElementById('folderMetaDisplay');
  if (nameDisplay) nameDisplay.textContent = uppercaseEnglish(rootFolderName);
  if (metaDisplay) metaDisplay.textContent = `กำลังโหลดและอ่านไฟล์ (${files.length} ไฟล์)...`;
  if (container) container.style.display = 'flex';

  let totalBytes = 0;
  const fileList = [];
  const maxStoredFiles = 150;

  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    totalBytes += f.size || 0;
    if (i < maxStoredFiles) {
      const dataUrl = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(f);
      });

      fileList.push({
        name: uppercaseEnglish(f.name),
        relPath: f.webkitRelativePath || f.name,
        size: formatFileSize(f.size),
        sizeBytes: f.size,
        type: getFileExtension(f.name),
        data: dataUrl
      });
    }
  }

  currentModalFolder = {
    name: uppercaseEnglish(rootFolderName),
    fileCount: files.length,
    totalSize: formatFileSize(totalBytes),
    totalBytes: totalBytes,
    files: fileList
  };

  updateFolderPreview();
  showToast(`✅ อัพโหลดโฟลเดอร์ "${uppercaseEnglish(rootFolderName)}" (${files.length} ไฟล์) สำเร็จ พร้อมดาวน์โหลด`);
}

function handleWorkFolderPathChange() {}
function handleCodeInputChange() {}
function handleQuotationInputChange() {}

function updateFolderPreview() {
  const container = document.getElementById('folderPreviewContainer');
  const nameDisplay = document.getElementById('folderNameDisplay');
  const metaDisplay = document.getElementById('folderMetaDisplay');
  const countBadge = document.getElementById('folderFileCountBadge');
  const downloadBtn = document.getElementById('btnDownloadFolder');

  if (currentModalFolder && currentModalFolder.name) {
    if (nameDisplay) nameDisplay.textContent = currentModalFolder.name;
    const fileCount = currentModalFolder.fileCount || (currentModalFolder.files ? currentModalFolder.files.length : 0);
    const sizeStr = currentModalFolder.totalSize ? ` • ${currentModalFolder.totalSize}` : '';
    if (metaDisplay) metaDisplay.textContent = fileCount > 0 ? `${fileCount} ไฟล์ (FILES)${sizeStr}` : 'แนบโฟลเดอร์ผลงาน';
    if (countBadge) countBadge.textContent = fileCount || 0;

    const canDownload = hasFolderDownloadableData(currentModalFolder);
    if (downloadBtn) {
      downloadBtn.style.display = canDownload ? 'inline-flex' : 'none';
    }

    if (container) container.style.display = 'flex';
  } else {
    if (container) container.style.display = 'none';
    if (downloadBtn) downloadBtn.style.display = 'none';
    const folderInput = document.getElementById('achvFolderInput');
    if (folderInput) folderInput.value = '';
  }
}

function removeModalFolder() {
  currentModalFolder = null;
  const folderInput = document.getElementById('achvFolderInput');
  if (folderInput) folderInput.value = '';
  updateFolderPreview();
  showToast('ลบโฟลเดอร์ผลงานเรียบร้อยแล้ว');
}

function copyWorkFolderPath() {}

function copyFolderString(pathStr) {
  if (!pathStr) return;
  navigator.clipboard.writeText(pathStr).then(() => {
    showToast('คัดลอก PATH โฟลเดอร์เรียบร้อยแล้ว (COPIED)');
  }).catch(() => {
    prompt('กด Ctrl+C เพื่อคัดลอก PATH:', pathStr);
  });
}

function copyWorkFolderFromItem(achvId) {
  const item = achievements.find(a => a.id === achvId);
  if (item && item.workFolder) {
    const pathStr = getFolderPath(item.workFolder);
    if (pathStr) {
      copyFolderString(pathStr);
    } else {
      copyFolderString(getFolderName(item.workFolder));
    }
  } else {
    alert('ไม่มีข้อมูล PATH หรือลิงก์โฟลเดอร์สำหรับงานนี้');
  }
}

async function openWorkFolderModal(achvId) {
  const item = achievements.find(a => a.id === achvId);
  if (!item || !item.workFolder) {
    alert('ไม่พบข้อมูลโฟลเดอร์สำหรับงานนี้');
    return;
  }
  currentDetailAchvId = achvId;
  let folder = item.workFolder;
  if (!hasLocalFolderFileData(folder)) {
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData) {
        const fullItem = idbData.find(a => a.id === achvId);
        if (fullItem && fullItem.workFolder && hasLocalFolderFileData(fullItem.workFolder)) {
          item.workFolder = fullItem.workFolder;
          folder = fullItem.workFolder;
        }
      }
    } catch (e) {
      console.warn('IDB folder fetch notice:', e);
    }
  }
  showFolderDetailModal(folder, item.title);
}

function showFolderDetailModal(folderData, taskTitle) {
  const modal = document.getElementById('folderDetailModal');
  const titleEl = document.getElementById('folderModalTitle');
  const bodyEl = document.getElementById('folderModalBody');
  if (!modal || !bodyEl) return;

  currentDetailFolderData = folderData;
  const folderName = getFolderName(folderData);
  const folderPath = getFolderPath(folderData);
  const isUrl = folderPath && (folderPath.startsWith('http://') || folderPath.startsWith('https://'));
  const files = (typeof folderData === 'object' && Array.isArray(folderData.files)) ? folderData.files : [];
  const fileCount = (typeof folderData === 'object' && folderData.fileCount) ? folderData.fileCount : files.length;
  const totalSize = (typeof folderData === 'object' && folderData.totalSize) ? folderData.totalSize : '';
  const canDownload = hasFolderDownloadableData(folderData);

  titleEl.innerHTML = `📁 ข้อมูลโฟลเดอร์: ${escapeHtml(folderName)}`;

  let html = `
    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px; margin-bottom: 16px;">
      <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 8px;">
        <div>
          <div style="font-size: 15px; font-weight: 700; color: #92400e; display: flex; align-items: center; gap: 6px;">
            <span>📂</span>
            <span>${escapeHtml(folderName)}</span>
          </div>
          <div style="font-size: 12px; color: #b45309; margin-top: 3px;">
            งาน: <strong>${escapeHtml(uppercaseEnglish(taskTitle || ''))}</strong>
            ${fileCount ? ` • 📊 ทั้งหมด <strong>${fileCount} ไฟล์</strong>` : ''}
            ${totalSize ? ` • ขนาด <strong>${totalSize}</strong>` : ''}
          </div>
        </div>
        <div style="display: flex; gap: 6px; align-items: center; flex-wrap: wrap;">
          ${canDownload ? `
            <button type="button" class="btn btn-success btn-sm" onclick="downloadFolderObject(currentDetailFolderData, currentDetailAchvId)" style="display: inline-flex; align-items: center; gap: 4px; font-weight: 700; background: #059669; border-color: #059669; color: #ffffff;">
              📥 ดาวน์โหลดทั้งโฟลเดอร์ (.ZIP)
            </button>
          ` : ''}
          ${folderPath ? (
            isUrl ? `
              <a href="${escapeHtml(folderPath)}" target="_blank" class="btn btn-primary btn-sm" style="display: inline-flex; align-items: center; gap: 4px;">
                🌐 เปิดใน ONEDRIVE
              </a>
            ` : `
              <button class="btn btn-secondary btn-sm" onclick="copyFolderString('${escapeHtml(folderPath.replace(/\\/g, '\\\\'))}')">
                📋 คัดลอก PATH
              </button>
            `
          ) : ''}
        </div>
      </div>

      ${folderPath ? `
        <div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #fcd34d; font-size: 12px; color: #78350f;">
          <strong>ตำแหน่งโฟลเดอร์ (PATH):</strong>
          <div style="font-family: monospace; background: #ffffff; padding: 6px 8px; border-radius: 4px; border: 1px solid #fde68a; margin-top: 4px; word-break: break-all;">
            ${escapeHtml(folderPath)}
          </div>
          ${!isUrl ? `
            <div style="font-size: 11px; color: #92400e; margin-top: 4px;">
              💡 <em>กดปุ่ม "คัดลอก PATH" แล้วนำไปวางในช่อง Address Bar ของ Windows File Explorer (กด Windows + E) เพื่อเปิดโฟลเดอร์ได้ทันที</em>
            </div>
          ` : ''}
        </div>
      ` : ''}
    </div>

    <!-- Files List -->
    <div>
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <h4 style="font-size: 12.5px; font-weight: 700; color: var(--secondary); text-transform: uppercase;">
          📑 รายชื่อไฟล์ในโฟลเดอร์ (${files.length} รายการ):
        </h4>
      </div>
  `;

  if (files.length > 0) {
    html += `<div class="folder-file-list">`;
    files.forEach((file, index) => {
      const icon = getFileIcon(file.name);
      html += `
        <div class="folder-file-item">
          <div style="display: flex; align-items: center; gap: 8px; min-width: 0; flex: 1;">
            <span style="font-size: 16px;">${icon}</span>
            <div style="min-width: 0; flex: 1;">
              <div style="font-weight: 600; color: var(--text-main); word-break: break-all;">${escapeHtml(file.name)}</div>
              ${file.relPath && file.relPath !== file.name ? `<div style="font-size: 10.5px; color: var(--text-muted);">${escapeHtml(file.relPath)}</div>` : ''}
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 8px; margin-left: 10px; flex-shrink: 0;">
            ${file.size ? `<span style="font-size: 11px; color: var(--text-muted);">${file.size}</span>` : ''}
            ${file.type ? `<span class="badge-code" style="font-size: 9.5px; padding: 1px 4px;">${escapeHtml(file.type)}</span>` : ''}
            ${(file.data || canDownload) ? `
              <button type="button" class="btn btn-outline btn-sm" onclick="downloadSingleFolderFile(${index})" title="ดาวน์โหลดไฟล์นี้" style="padding: 2px 8px; font-size: 11px; background: #ecfdf5; border-color: #a7f3d0; color: #065f46; font-weight: 600; display: inline-flex; align-items: center; gap: 4px;">
                ⬇️ ดาวน์โหลด
              </button>
            ` : ''}
          </div>
        </div>
      `;
    });
    html += `</div>`;
  } else {
    html += `
      <div style="text-align: center; padding: 24px; background: #f8fafc; border: 1px dashed var(--border-color); border-radius: 8px; color: var(--text-muted); font-size: 13px;">
        📂 โฟลเดอร์นี้บันทึกด้วย PATH หรือ ลิงก์ (ยังไม่มีข้อมูลรายการไฟล์ที่แนบ)<br>
        สามารถกดปุ่ม <strong>"คัดลอก PATH"</strong> ด้านบนเพื่อเปิดดูไฟล์ใน Windows File Explorer หรือ OneDrive ได้เลย
      </div>
    `;
  }

  html += `</div>`;
  bodyEl.innerHTML = html;
  modal.classList.add('active');
}

function closeFolderModal() {
  const modal = document.getElementById('folderDetailModal');
  if (modal) modal.classList.remove('active');
}

// --- Export & Import ---
function exportDataAsJson() {
  const exportData = {
    system: 'ACHIEVEMENT RECORD',
    exportDate: new Date().toISOString(),
    categories,
    achievements
  };

  const jsonStr = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(blob, `ACHIEVEMENT_RECORD_BACKUP_${dateStr}.json`);
  showToast('ส่งออกไฟล์สำรอง JSON สำเร็จ (SUCCESS)');
}

function handleImportJson(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (!data.achievements || !Array.isArray(data.achievements)) {
        throw new Error('รูปแบบไฟล์ JSON ไม่ถูกต้อง');
      }

      if (confirm(`พบข้อมูล ${data.achievements.length} รายการ ต้องการนำเข้าข้อมูลใช่หรือไม่?`)) {
        achievements = data.achievements;
        achievements.forEach(a => {
          if (a.title) a.title = uppercaseEnglish(a.title);
          if (a.code) a.code = uppercaseEnglish(a.code);
          if (a.assignee) a.assignee = uppercaseEnglish(a.assignee);
          if (a.factory) a.factory = uppercaseEnglish(a.factory);
          if (a.department) a.department = uppercaseEnglish(a.department);
          if (a.process) a.process = uppercaseEnglish(a.process);
        });
        if (data.categories && Array.isArray(data.categories)) {
          categories = data.categories;
          categories.forEach(c => { c.name = uppercaseEnglish(c.name); });
          saveCategories();
        }
        saveAchievements();
        renderAll();
        showToast('นำเข้าข้อมูลสำเร็จ (SUCCESS)');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอ่านไฟล์ JSON: ' + err.message);
    }
    e.target.value = '';
  };
  reader.readAsText(file);
}

function exportDataAsCsv() {
  const headers = [
    'TASK NAME', 'REQUEST NUMBER', 'QUOTATION', 'REQUEST NAME', 'REQUEST DATE',
    'DEPARTMENT', 'FACTORY', 'PROCESS', 'JOB TYPE', 'SUB JOB TYPE', 'PRIORITY',
    'TOOLING TEAM 1', 'TOOLING TEAM 2',
    'DESIGN SUPPORT 1', 'DESIGN SUPPORT 2',
    'MANTENANCE SUPPORT 1', 'MANTENANCE SUPPORT 2', 'MANTENANCE SUPPORT 3', 'MANTENANCE SUPPORT 4', 'MANTENANCE SUPPORT 5',
    'ASSIGN',
    'STATUS', 'SUB STATUS', 'ACHIEVEMENT',
    'DETAIL', 'NOTE', 'DATE COMPLETED', 'FINISHED MONTH', 'WORK FOLDER', 'CATEGORY'
  ];

  const rows = achievements.map(a => {
    const cat = categories.find(c => c.id === a.categoryId) || { name: 'ทั่วไป' };
    const xl = getTaskExcelTracking(a);
    return [
      uppercaseEnglish(a.title),
      uppercaseEnglish(a.code || ''),
      uppercaseEnglish(a.quotation || ''),
      uppercaseEnglish(a.requestName || ''),
      a.requestDate || '',
      uppercaseEnglish(a.department || ''),
      uppercaseEnglish(a.factory || ''),
      uppercaseEnglish(a.process || ''),
      xl.jobType || '',
      xl.subJobType || '',
      xl.priority || '',
      xl.toolingTeam1 || '',
      xl.toolingTeam2 || '',
      xl.designSupport1 || '',
      xl.designSupport2 || '',
      xl.maintenanceSupport1 || '',
      xl.maintenanceSupport2 || '',
      xl.maintenanceSupport3 || '',
      xl.maintenanceSupport4 || '',
      xl.maintenanceSupport5 || '',
      uppercaseEnglish(a.assignee || ''),
      a.status === 'done' ? 'DONE' : (a.status === 'in_progress' ? 'IN PROGRESS' : (a.status === 'cancel' || a.status === 'cancle' ? 'CANCEL' : 'PENDING')),
      xl.subStatus || '',
      xl.achievement !== undefined ? String(xl.achievement) : '',
      (uppercaseEnglish(a.description || '')).replace(/"/g, '""'),
      (uppercaseEnglish(a.note || '')).replace(/"/g, '""'),
      a.completionDate || a.requestDate || '',
      xl.finishedMonth || '',
      getFolderPath(a.workFolder).replace(/"/g, '""'),
      uppercaseEnglish(cat.name)
    ];
  });

  let csvContent = '\uFEFF';
  csvContent += headers.map(h => `"${h}"`).join(',') + '\r\n';
  rows.forEach(r => {
    csvContent += r.map(col => `"${col}"`).join(',') + '\r\n';
  });

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const dateStr = new Date().toISOString().split('T')[0];
  downloadFile(blob, `ACHIEVEMENT_RECORD_REPORT_${dateStr}.csv`);
  showToast('ส่งออกไฟล์ EXCEL (CSV) สำเร็จ (SUCCESS)');
}

function downloadFile(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// --- Helpers ---
function getStatusPillHtml(status) {
  switch (status) {
    case 'done':
      return `<span class="status-pill status-done"><span class="status-dot-sm"></span>DONE</span>`;
    case 'in_progress':
      return `<span class="status-pill status-in_progress"><span class="status-dot-sm"></span>IN PROGRESS</span>`;
    case 'wait':
    case 'pending':
      return `<span class="status-pill status-wait"><span class="status-dot-sm"></span>PENDING</span>`;
    case 'cancel':
    case 'cancle':
      return `<span class="status-pill status-cancel"><span class="status-dot-sm"></span>CANCEL</span>`;
    default:
      return `<span class="status-pill">${uppercaseEnglish(status || 'UNKNOWN')}</span>`;
  }
}

function escapeHtml(text) {
  if (!text) return '';
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="16" height="16" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    <span>${escapeHtml(message)}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.2s';
    setTimeout(() => toast.remove(), 200);
  }, 2600);
}

function dismissAllToasts() {
  const container = document.getElementById('toastContainer');
  if (container) {
    container.innerHTML = '';
  }
}

// ==========================================================================
// Murata Manufacturing Aesthetic Enhancements (Hero, Carousel, Search, FAB)
// ==========================================================================

const MURATA_HERO_SLIDES = [
  {
    badge: "TASK TRACKING PORTAL",
    title: "ACHIEVEMENT <span>RECORD</span>",
    desc: "ศูนย์รวมบันทึกผลงาน ติดตามความคืบหน้างวดงาน ออกแบบระบบ และจัดเก็บเอกสาร",
    checklist: [
      "■ ระบบบันทึกผลงานและแนบไฟล์ Job Request (PDF) & โฟลเดอร์งาน (.ZIP)",
      "■ ค้นหาและดาวน์โหลดไฟล์ผลงานกลับมาเปิดดูได้ทุกที่ทุกเวลา",
      "■ แสดงผลสถานะงานแบบ Real-time พร้อมกราฟสถิติและความคืบหน้า 100%"
    ]
  },
  {
    badge: "CONTINUOUS IMPROVEMENT • KAIZEN & INNOVATION",
    title: "Kaizen Hub <span>/ Smart Engineering</span>",
    desc: "ยกระดับกระบวนการผลิต พัฒนาระบบอัตโนมัติ (Automation & Jig/Fixture) และบันทึกคำร้องขออย่างเป็นระบบ",
    checklist: [
      "■ ติดตามสถานะงานตามประเภท : DESIGN JIG & FIXTURE, ACCESSORIES, PR / PURCHASING, IMPROVEMENT / KAIZEN, SPECIAL PROJECT, PRIVATE PROJECT",
      "■ ตรวจสอบการจัดซื้อ อนุมัติงบประมาณ PR/PO และงวดงานพร้อมประเมินผล",
      "■ จัดอันดับคำร้องขอและสรุปแนวโน้มงานด้วยสถิติเชิงลึก"
    ]
  },
  {
    badge: "CLOUD & LOCAL STORAGE • ZERO DATA LOSS",
    title: "Cloud Sync <span>/ Multi-Device Access</span>",
    desc: "เชื่อมต่อข้อมูลแบบเรียลไทม์ระหว่างอุปกรณ์ พร้อมระบบสำรองข้อมูลทั้งแบบ Offline และ Firebase Cloud",
    checklist: [
      "■ ใช้งานได้ทั้งบนคอมพิวเตอร์ แท็บเล็ต และสมาร์ทโฟน",
      "■ ส่งออกไฟล์ Excel (CSV) และ JSON Backup ได้ในคลิกเดียว",
      "■ เอกสารและไฟล์แนบปลอดภัย บันทึกและดึงข้อมูลกลับมาใช้งานได้ทันที"
    ]
  },
  {
    badge: "DOCUMENTATION ARCHIVE • AUDIT & COMPLIANCE",
    title: "Digital Archive <span>/ 100% Traceability</span>",
    desc: "เก็บบันทึกประวัติผลงานย้อนหลัง ตรวจสอบที่มาของเอกสาร และพิมพ์รายงานสรุปผลงานเป็น PDF ได้ทันที",
    checklist: [
      "■ รองรับการพิมพ์ใบสรุปงานและ Export รายงานผลงานทางการ",
      "■ ค้นหาเอกสารย้อนหลังได้รวดเร็วผ่าน Keyword Search ความเร็วสูง",
      "■ มาตรฐานการทำงานระดับสากล สอดคล้องกับระบบบริหารคุณภาพงานวิศวกรรม"
    ]
  }
];

let currentMurataSlideIndex = 0; // Starts at 01 / 04
let murataCarouselTimer = null;
let isMurataCarouselPlaying = true;

function updateMurataSlide(index) {
  if (index < 0) index = MURATA_HERO_SLIDES.length - 1;
  if (index >= MURATA_HERO_SLIDES.length) index = 0;
  currentMurataSlideIndex = index;

  const slide = MURATA_HERO_SLIDES[currentMurataSlideIndex];
  const badgeEl = document.getElementById('murataHeroBadge');
  const titleEl = document.getElementById('murataHeroTitle');
  const descEl = document.getElementById('murataHeroDesc');
  const listEl = document.getElementById('murataHeroChecklist');
  const curSlideEl = document.getElementById('murataCurSlide');
  const progressFillEl = document.getElementById('murataProgressFill');

  if (badgeEl) badgeEl.textContent = slide.badge;
  if (titleEl) titleEl.innerHTML = slide.title;
  if (descEl) descEl.textContent = slide.desc;
  if (listEl) {
    listEl.innerHTML = slide.checklist.map(item => `<li><span class="chk-box">■</span> ${escapeHtml(item.replace(/^■\s*/, ''))}</li>`).join('');
  }

  if (curSlideEl) {
    curSlideEl.textContent = String(currentMurataSlideIndex + 1).padStart(2, '0');
  }
  if (progressFillEl) {
    const percent = ((currentMurataSlideIndex + 1) / MURATA_HERO_SLIDES.length) * 100;
    progressFillEl.style.width = `${percent}%`;
  }
}

function prevMurataSlide() {
  updateMurataSlide(currentMurataSlideIndex - 1);
  resetMurataCarouselTimer();
}

function nextMurataSlide() {
  updateMurataSlide(currentMurataSlideIndex + 1);
  resetMurataCarouselTimer();
}

function toggleMurataCarousel() {
  const btn = document.getElementById('btnCarouselPlayPause');
  if (isMurataCarouselPlaying) {
    isMurataCarouselPlaying = false;
    clearInterval(murataCarouselTimer);
    if (btn) btn.textContent = '▶';
  } else {
    isMurataCarouselPlaying = true;
    startMurataCarouselTimer();
    if (btn) btn.textContent = '||';
  }
}

function startMurataCarouselTimer() {
  clearInterval(murataCarouselTimer);
  murataCarouselTimer = setInterval(() => {
    if (isMurataCarouselPlaying) {
      updateMurataSlide(currentMurataSlideIndex + 1);
    }
  }, 6000);
}

function resetMurataCarouselTimer() {
  if (isMurataCarouselPlaying) {
    startMurataCarouselTimer();
  }
}

function triggerMurataKeywordSearch() {
  const murataInput = document.getElementById('murataKeywordInput');
  const searchInput = document.getElementById('searchInput');
  const val = (murataInput ? murataInput.value : '').trim();
  
  currentSearch = val.toLowerCase();
  if (searchInput) searchInput.value = val;
  
  const clearBtn = document.getElementById('btnMurataSearchClear');
  if (clearBtn) clearBtn.style.display = val ? 'block' : 'none';
  
  renderContent();
  renderRequesterRanking();
  
  // Smoothly scroll down to the controls / task list section
  const targetSec = document.querySelector('.controls-bar') || document.querySelector('.stats-grid');
  if (targetSec) {
    targetSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function clearMurataKeywordSearch() {
  const murataInput = document.getElementById('murataKeywordInput');
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('btnMurataSearchClear');
  
  if (murataInput) murataInput.value = '';
  if (searchInput) searchInput.value = '';
  if (clearBtn) clearBtn.style.display = 'none';
  
  currentSearch = '';
  renderContent();
  renderRequesterRanking();
}

function initMurataComponents() {
  // Initialize carousel slide
  updateMurataSlide(currentMurataSlideIndex);
  startMurataCarouselTimer();

  // Floating scroll-to-top visibility toggle
  const btnScrollTop = document.getElementById('btnScrollTop');
  if (btnScrollTop) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 300) {
        btnScrollTop.style.display = 'flex';
      } else {
        btnScrollTop.style.display = 'none';
      }
    }, { passive: true });
    btnScrollTop.style.display = window.scrollY > 300 ? 'flex' : 'none';
  }
}

function scrollToSearchAndControls() {
  if (window.innerWidth <= 768) {
    const mobileSearchInput = document.getElementById('mobileSearchInput');
    if (mobileSearchInput) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        mobileSearchInput.focus();
        mobileSearchInput.classList.add('search-highlight-pulse');
        setTimeout(() => mobileSearchInput.classList.remove('search-highlight-pulse'), 1500);
      }, 300);
    }
    return;
  }

  const controls = document.getElementById('controlsBar') || document.querySelector('.controls-bar');
  const searchInput = document.getElementById('searchInput');
  const header = document.querySelector('.app-header');
  const headerHeight = header ? header.offsetHeight : 64;

  if (controls) {
    const rect = controls.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const targetY = scrollTop + rect.top - headerHeight - 12;

    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: 'smooth'
    });
  }

  if (searchInput) {
    setTimeout(() => {
      searchInput.focus();
      searchInput.select();
      searchInput.classList.add('search-highlight-pulse');
      setTimeout(() => searchInput.classList.remove('search-highlight-pulse'), 1500);
    }, 450);
  }
}


