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
  { id: 'cat_prj', name: 'SPECIAL PROJECT', icon: '🚀', color: '#0284c7' }
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

async function saveAchievementsToIndexedDB(data) {
  try {
    const db = await openOrbrayDB();
    if (!db) return;
    const tx = db.transaction([IDB_STORE_ACHIEVEMENTS], 'readwrite');
    const store = tx.objectStore(IDB_STORE_ACHIEVEMENTS);
    store.put({ key: 'achievements', value: data, updatedAt: Date.now() });
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

function hasFolderDownloadableData(folder) {
  if (!folder) return false;
  if (typeof folder === 'string') return false;
  if (folder.zipData) return true;
  if (folder.hasCloudFiles) return true;
  if (Array.isArray(folder.files) && folder.files.some(f => !!f.data)) return true;
  return false;
}

const FIRESTORE_CHUNK_SIZE = 600000; // 600 KB safe chunk for Firestore 1MB document limit

async function uploadFolderFilesToFirestore(db, achvId, files) {
  if (!db || !achvId || !Array.isArray(files) || files.length === 0) return;
  try {
    const colRef = db.collection('achievements').doc(achvId).collection('folderFiles');
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      const data = f.data || '';
      if (!data) continue;

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

        for (let c = 0; c < totalChunks; c++) {
          const chunkStr = data.substring(c * FIRESTORE_CHUNK_SIZE, (c + 1) * FIRESTORE_CHUNK_SIZE);
          await colRef.doc(`file_${i}_chunk_${c}`).set({
            fileIndex: i,
            chunkIndex: c,
            data: chunkStr
          });
        }
      }
    }
  } catch (err) {
    console.warn('Failed to upload folder files to Firestore:', err);
  }
}

async function downloadFolderFilesFromFirestore(db, achvId, filesMeta) {
  if (!db || !achvId) return null;
  try {
    const colRef = db.collection('achievements').doc(achvId).collection('folderFiles');
    const snapshot = await colRef.get();
    if (snapshot.empty) return null;

    const docsMap = {};
    snapshot.forEach(doc => {
      docsMap[doc.id] = doc.data();
    });

    const files = [];
    const count = (filesMeta && filesMeta.length) ? filesMeta.length : 150;

    for (let i = 0; i < count; i++) {
      const metaDoc = docsMap[`file_${i}`];
      if (!metaDoc) break;

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
        name: metaDoc.name || (filesMeta && filesMeta[i] ? filesMeta[i].name : `FILE_${i}`),
        relPath: metaDoc.relPath || (filesMeta && filesMeta[i] ? filesMeta[i].relPath : ''),
        size: metaDoc.size || (filesMeta && filesMeta[i] ? filesMeta[i].size : ''),
        sizeBytes: metaDoc.sizeBytes || 0,
        type: metaDoc.type || '',
        data: fullData
      });
    }

    return files;
  } catch (err) {
    console.error('Error fetching folder files from Firestore:', err);
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

      for (let c = 0; c < totalChunks; c++) {
        const chunkStr = rawData.substring(c * FIRESTORE_CHUNK_SIZE, (c + 1) * FIRESTORE_CHUNK_SIZE);
        await colRef.doc(`chunk_${c}`).set({
          chunkIndex: c,
          data: chunkStr
        });
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
      const chunks = [];
      const totalChunks = mainMeta.totalChunks || 1;
      for (let c = 0; c < totalChunks; c++) {
        const cSnap = await colRef.doc(`chunk_${c}`).get();
        if (cSnap.exists && cSnap.data() && cSnap.data().data) {
          chunks.push(cSnap.data().data);
        }
      }
      fullData = chunks.join('');
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

      for (let c = 0; c < totalChunks; c++) {
        const chunkStr = rawData.substring(c * FIRESTORE_CHUNK_SIZE, (c + 1) * FIRESTORE_CHUNK_SIZE);
        await colRef.doc(`chunk_${c}`).set({
          chunkIndex: c,
          data: chunkStr
        });
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
      const chunks = [];
      const totalChunks = mainMeta.totalChunks || 1;
      for (let c = 0; c < totalChunks; c++) {
        const cSnap = await colRef.doc(`chunk_${c}`).get();
        if (cSnap.exists && cSnap.data() && cSnap.data().data) {
          chunks.push(cSnap.data().data);
        }
      }
      fullData = chunks.join('');
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
    return null;
  }
}

async function downloadFolderObject(folder, achvId) {
  if (!folder) {
    alert('ไม่พบข้อมูลโฟลเดอร์สำหรับดาวน์โหลด');
    return;
  }
  const folderName = getFolderName(folder) || 'WORK_FOLDER';

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
  const targetAchvId = achvId || currentDetailAchvId;
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
    }
  }

  // 4. Fallback if only PATH exists and no files data was uploaded
  const path = getFolderPath(folder);
  if (path) {
    alert(`โฟลเดอร์นี้ถูกบันทึกด้วย PATH ในเครื่อง:\n${path}\n\n(ไม่ได้อัปโหลดไฟล์ตัวจริงลงเว็บ จึงไม่สามารถดาวน์โหลดเป็นไฟล์ ZIP ได้)\nระบบได้คัดลอก PATH ให้แล้ว สามารถนำไปเปิดใน Windows File Explorer ได้เลยครับ`);
    copyFolderString(path);
  } else {
    alert('ไม่พบไฟล์ที่แนบไว้ในโฟลเดอร์นี้');
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
  if (!hasFolderDownloadableData(folder)) {
    // Try restoring full workFolder from IndexedDB
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData) {
        const fullItem = idbData.find(a => a.id === achvId);
        if (fullItem && fullItem.workFolder && hasFolderDownloadableData(fullItem.workFolder)) {
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

  if (!file.data && currentDetailAchvId && firebaseDb) {
    showToast(`☁️ กำลังดึงไฟล์ "${file.name}" จากระบบคลาวด์...`);
    try {
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
    } catch (e) {
      console.warn('Single file cloud download notice:', e);
    }
  }

  if (!file.data) {
    alert('ไม่พบข้อมูลเนื้อหาของไฟล์นี้ (อาจเป็นโฟลเดอร์ที่บันทึกเฉพาะ PATH)');
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
    setupEventListeners();
    updateRequesterRankingVisibility();
    renderAll();
    initFirebaseFromStorage();

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
        }
        c.name = uppercaseEnglish(c.name);
      });
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
          if (fullItem.workFolder && hasFolderDownloadableData(fullItem.workFolder)) {
            if (!a.workFolder || !hasFolderDownloadableData(a.workFolder)) {
              a.workFolder = fullItem.workFolder;
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
        const data = doc.data();
        data.id = data.id || doc.id;

        // Merge cached local heavy attachments if missing from cloud
        const cachedItem = achievements.find(a => a.id === data.id);
        if (cachedItem) {
          if ((!data.pdfAttachment || !data.pdfAttachment.data) && (cachedItem.pdfAttachment && cachedItem.pdfAttachment.data)) {
            data.pdfAttachment = cachedItem.pdfAttachment;
          }
          if ((!data.imageData || !data.imageData.data) && (cachedItem.imageData && cachedItem.imageData.data)) {
            data.imageData = cachedItem.imageData;
          }
          // Preserve local workFolder file data so cloud sync does not wipe uploaded contents
          if (cachedItem.workFolder && Array.isArray(cachedItem.workFolder.files)) {
            if (data.workFolder && Array.isArray(data.workFolder.files)) {
              data.workFolder.files = data.workFolder.files.map(cf => {
                const localMatch = cachedItem.workFolder.files.find(lf => lf.name === cf.name || lf.relPath === cf.relPath);
                if (localMatch && localMatch.data) {
                  return { ...cf, data: localMatch.data };
                }
                return cf;
              });
              if (cachedItem.workFolder.zipData && !data.workFolder.zipData) {
                data.workFolder.zipData = cachedItem.workFolder.zipData;
              }
            } else if (!data.workFolder) {
              data.workFolder = cachedItem.workFolder;
            }
          }
        }

        cloudItems.push(data);
      });

      // Sort achievements: newest first
      cloudItems.sort((a, b) => {
        const timeA = a.createdAt ? new Date(a.createdAt).getTime() : (a.requestDate ? new Date(a.requestDate).getTime() : 0);
        const timeB = b.createdAt ? new Date(b.createdAt).getTime() : (b.requestDate ? new Date(b.requestDate).getTime() : 0);
        return timeB - timeA;
      });

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

        achievements = cloudItems;
        saveAchievements();
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
          mergedMap.set(c.id, { ...(mergedMap.get(c.id) || {}), ...c });
        }
      });
      achievements = Array.from(mergedMap.values());
      saveAchievements();
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
        userFriendlyMsg = 'ติดสิทธิ์การเข้าถึง (Permission Denied) - กรุณาตรวจสอบ Firestore Rules เป็น allow read, write: if true;';
      }
      updateCloudStatusUI('error', userFriendlyMsg);
      if (showToasts) {
        alert('เกิดข้อผิดพลาดจาก Firestore: ' + userFriendlyMsg);
      }
    });

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

    // Handle PDF Attachment upload to subcollection & guard 1MB Firestore limit
    if (itemToSave.pdfAttachment && typeof itemToSave.pdfAttachment === 'object') {
      const pdf = { ...itemToSave.pdfAttachment };
      if (pdf.data) {
        pdf.hasCloudPdf = true;
        uploadPdfFileToFirestore(firebaseDb, item.id, pdf);
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
        uploadImageFileToFirestore(firebaseDb, item.id, img);
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

      // If folder has file data, upload chunked files to Firestore subcollection in background
      if (hasData) {
        wf.hasCloudFiles = true;
        uploadFolderFilesToFirestore(firebaseDb, item.id, wf.files);
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
    console.log('Synced to cloud successfully:', item.id);
  } catch (err) {
    console.error('Failed to sync achievement to cloud:', err);
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

// --- Setup Event Listeners ---
function setupEventListeners() {
  // Search Input
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderContent();
      renderRequesterRanking();
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

  document.querySelectorAll('.status-summary-pill').forEach(p => p.classList.remove('active'));

  renderContent();
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
    currentTimeFilter !== 'all'
  );
  btnReset.style.display = isAnyFilterActive ? 'inline-flex' : 'none';
}

// --- KPI Statistics ---
function renderStats() {
  const total = achievements.length;
  const done = achievements.filter(a => a.status === 'done').length;
  const inProgress = achievements.filter(a => a.status === 'in_progress').length;
  const wait = achievements.filter(a => a.status === 'wait').length;
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

  // Doughnut Chart Plugin (Center Total Count + Pure White Slice Percentage Labels without black border)
  const doughnutCenterTextPlugin = {
    id: 'doughnutCenterText',
    beforeDraw(chart) {
      const { ctx, chartArea } = chart;
      if (!chartArea) return;
      const centerX = (chartArea.left + chartArea.right) / 2;
      const centerY = (chartArea.top + chartArea.bottom) / 2;
      const total = chart.data.datasets[0].data.reduce((a, b) => a + (Number(b) || 0), 0);

      ctx.save();
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Total count
      ctx.font = "600 24px 'Inter', 'Sarabun', sans-serif";
      ctx.fillStyle = '#0f172a';
      ctx.fillText(`${total}`, centerX, centerY - 8);

      // Label below number
      ctx.font = "500 12px 'Sarabun', sans-serif";
      ctx.fillStyle = '#64748b';
      ctx.fillText("งานทั้งหมด", centerX, centerY + 14);

      ctx.restore();
    },
    afterDatasetsDraw(chart) {
      const { ctx } = chart;
      const dataset = chart.data.datasets[0];
      const meta = chart.getDatasetMeta(0);
      const total = dataset.data.reduce((a, b) => a + (Number(b) || 0), 0);
      if (!meta || !meta.data || total === 0) return;

      meta.data.forEach((element, index) => {
        const val = dataset.data[index] || 0;
        if (val === 0) return;
        const pct = (val / total) * 100;
        // Draw percentage inside slice if slice is wide enough (>= 6%)
        if (pct >= 6) {
          const { startAngle, endAngle, innerRadius, outerRadius, x, y } = element;
          const angle = (startAngle + endAngle) / 2;
          const r = (innerRadius + outerRadius) / 2;
          const posX = x + Math.cos(angle) * r;
          const posY = y + Math.sin(angle) * r;

          const pctText = pct % 1 === 0 ? `${pct}%` : `${pct.toFixed(1)}%`;

          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.font = "600 12.5px 'Inter', 'Sarabun', sans-serif";
          ctx.fillStyle = '#ffffff';
          ctx.fillText(pctText, posX, posY);
          ctx.restore();
        }
      });
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
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'right',
            labels: {
              boxWidth: 12,
              boxHeight: 12,
              padding: 12,
              color: '#1e293b',
              font: {
                size: 12.5,
                weight: '500',
                family: "'Sarabun', 'Inter', sans-serif"
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
        cutout: '60%'
      },
      plugins: [doughnutCenterTextPlugin]
    });
  }

  const doneCount = achievements.filter(a => a.status === 'done').length;
  const inProgCount = achievements.filter(a => a.status === 'in_progress').length;
  const waitCount = achievements.filter(a => a.status === 'wait').length;
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

  const statusLabels = ['DONE (สำเร็จแล้ว)', 'IN PROGRESS (กำลังทำ)', 'WAIT (รอดำเนินการ)', 'CANCEL (ยกเลิก)'];
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
              font: {
                size: 12.5,
                weight: '500',
                family: "'Sarabun', 'Inter', sans-serif"
              },
              padding: 8
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
      wait: 'WAIT (รอดำเนินการ)',
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
  const controlsBar = document.querySelector('.controls-bar');
  if (controlsBar) {
    controlsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

  const controlsBar = document.querySelector('.controls-bar');
  if (controlsBar) {
    controlsBar.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
        <div class="ranking-progress-bar" title="DONE: ${r.done}, IN PROGRESS: ${r.in_progress}, WAIT: ${r.wait}, CANCEL: ${r.cancel}">
          <div class="r-bar-seg r-bar-done" style="width: ${donePct}%"></div>
          <div class="r-bar-seg r-bar-in-progress" style="width: ${inProgPct}%"></div>
          <div class="r-bar-seg r-bar-wait" style="width: ${waitPct}%"></div>
          <div class="r-bar-seg r-bar-cancel" style="width: ${cancelPct}%"></div>
        </div>
        <div class="ranking-status-row">
          <span class="r-stat"><span class="r-dot r-dot-done"></span>DONE <b>${r.done}</b></span>
          <span class="r-stat"><span class="r-dot r-dot-in-progress"></span>PROG <b>${r.in_progress}</b></span>
          <span class="r-stat"><span class="r-dot r-dot-wait"></span>WAIT <b>${r.wait}</b></span>
          ${r.cancel > 0 ? `<span class="r-stat"><span class="r-dot r-dot-cancel"></span>CANCEL <b>${r.cancel}</b></span>` : ''}
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

// --- Filtering Logic ---
function getFilteredAchievements() {
  return achievements.filter(item => {
    // Search Query (Matches title, request number, quotation, requestName, assignee, department, factory, process, desc, note)
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
      if (!titleMatch && !codeMatch && !quotMatch && !reqNameMatch && !assigneeMatch && !deptMatch && !facMatch && !procMatch && !descMatch && !noteMatch && !folderMatch) return false;
    }

    if (currentCategoryFilter !== 'all' && item.categoryId !== currentCategoryFilter) {
      return false;
    }

    if (currentStatusFilter !== 'all') {
      if (currentStatusFilter === 'cancel' || currentStatusFilter === 'cancle') {
        if (item.status !== 'cancel' && item.status !== 'cancle') return false;
      } else if (item.status !== currentStatusFilter) {
        return false;
      }
    }

    if (currentAssigneeFilter !== 'all') {
      if ((item.assignee || '').trim().toUpperCase() !== currentAssigneeFilter.toUpperCase()) {
        return false;
      }
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
    const orderMap = { wait: 1, in_progress: 2, done: 3, cancel: 4, cancle: 4 };
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

// 1. Cards View (iOS Mobile App & Desktop Modern Cards)
function renderCardsView(container, items) {
  let html = '<div class="cards-grid">';
  items.forEach(item => {
    const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#2563eb' };
    const statusHtml = getStatusPillHtml(item.status);
    const dateStr = item.requestDate ? `REQ: ${item.requestDate}` : (item.completionDate ? `DATE: ${item.completionDate}` : 'NO DATE');

    html += `
      <div class="ios-task-card" id="ios-card-${item.id}">
        <div class="ios-card-main" onclick="toggleCardAccordion('${item.id}', event)">
          <div class="ios-card-icon" style="background-color: ${cat.color}18; color: ${cat.color};">
            ${cat.icon || '📄'}
          </div>
          <div class="ios-card-info">
            <div class="ios-card-title">${escapeHtml(uppercaseEnglish(item.title))}</div>
            <div class="ios-card-date">${dateStr}${item.code ? ` • ${escapeHtml(uppercaseEnglish(item.code))}` : ''}</div>
          </div>
          <button type="button" class="ios-card-more-btn" onclick="openMobileActionSheet('${item.id}', event)" title="เมนูเพิ่มเติม">
            •••
          </button>
        </div>
        <div class="ios-card-accordion" id="accordion-${item.id}">
          <div class="ios-accordion-content">
            <div class="ios-row">
              <span class="ios-row-label">Category:</span>
              <span class="ios-row-val" style="color: ${cat.color};">${cat.icon || ''} ${escapeHtml(uppercaseEnglish(cat.name))}</span>
            </div>
            ${item.code ? `
            <div class="ios-row">
              <span class="ios-row-label">Request No:</span>
              <span class="ios-row-val">${escapeHtml(uppercaseEnglish(item.code))}</span>
            </div>` : ''}
            ${item.quotation ? `
            <div class="ios-row">
              <span class="ios-row-label">Quotation:</span>
              <span class="ios-row-val">${escapeHtml(uppercaseEnglish(item.quotation))}</span>
            </div>` : ''}
            <div class="ios-row">
              <span class="ios-row-label">Priority / Status:</span>
              <span class="ios-row-val">${statusHtml}</span>
            </div>
            ${item.requestName ? `
            <div class="ios-row">
              <span class="ios-row-label">From / Requester:</span>
              <span class="ios-row-val">${escapeHtml(uppercaseEnglish(item.requestName))}</span>
            </div>` : ''}
            ${item.assignee ? `
            <div class="ios-row">
              <span class="ios-row-label">To / Assignee:</span>
              <span class="ios-row-val">${escapeHtml(uppercaseEnglish(item.assignee))}</span>
            </div>` : ''}
            ${(item.factory || item.department || item.process) ? `
            <div class="ios-row">
              <span class="ios-row-label">Factory / Dept:</span>
              <span class="ios-row-val">${[item.factory, item.department, item.process].filter(Boolean).map(s => escapeHtml(uppercaseEnglish(s))).join(' • ')}</span>
            </div>` : ''}
            ${item.description ? `
            <div class="ios-desc-block">
              <div class="ios-row-label" style="margin-bottom: 3px;">Description:</div>
              <div class="ios-desc-text">${escapeHtml(uppercaseEnglish(item.description))}</div>
            </div>` : ''}
            ${item.note ? `
            <div class="ios-note-block">
              <strong>NOTE:</strong> ${escapeHtml(uppercaseEnglish(item.note))}
            </div>` : ''}

            <!-- Attachments -->
            <div class="ios-card-attachments">
              ${item.pdfAttachment ? `
                <div class="card-attachment-group">
                  <button type="button" class="btn btn-outline btn-sm" onclick="openPdfAttachment('${item.id}')" title="เปิดดู JOB REQUEST PDF" style="color: #991b1b; border-color: #fca5a5; background: #fef2f2;">
                    📄 ดู PDF
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" onclick="downloadPdfAttachment('${item.id}')" title="ดาวน์โหลดไฟล์ PDF ลงเครื่อง" style="color: #163282; border-color: #c8d8f6; background: #f0f4fc; font-weight: 700;">
                    ⬇️ โหลด
                  </button>
                </div>` : ''}
              ${item.workFolder ? `
                <div class="card-attachment-group">
                  <button type="button" class="btn btn-outline btn-sm" onclick="openWorkFolderModal('${item.id}')" title="ดูข้อมูลโฟลเดอร์ผลงาน">
                    📁 FOLDER
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" onclick="downloadWorkFolderAttachment('${item.id}')" title="ดาวน์โหลดโฟลเดอร์เป็น ZIP" style="color: #047857; border-color: #a7f3d0; background: #ecfdf5; font-weight: 700;">
                    📥 ZIP
                  </button>
                </div>` : ''}
              ${item.imageData ? `
                <div class="card-attachment-group">
                  <button type="button" class="btn btn-outline btn-sm" onclick="openDrawingAttachment('${item.id}')" title="${isDrawingPdf(item.imageData) ? 'เปิดดู DRAWING (PDF)' : 'เปิดดูรูปภาพ'}">
                    ${isDrawingPdf(item.imageData) ? '📄 DRAWING' : '🖼️ รูปภาพ'}
                  </button>
                  <button type="button" class="btn btn-outline btn-sm" onclick="downloadImageAttachment('${item.id}')" title="ดาวน์โหลดรูปภาพ/DRAWING" style="color: #047857; border-color: #a7f3d0; background: #ecfdf5; font-weight: 700;">
                    ⬇️ โหลด
                  </button>
                </div>` : ''}
            </div>

            <!-- Quick Actions -->
            <div class="ios-accordion-actions">
              <button type="button" class="btn btn-outline btn-sm" onclick="viewAchievementDetail('${item.id}')">
                👁️ ดูรายละเอียด
              </button>
              <button type="button" class="btn btn-primary btn-sm" onclick="openAchievementModal('${item.id}')">
                ✏️ แก้ไขงาน
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
  if (event && event.target.closest('.ios-card-more-btn')) {
    return;
  }
  const acc = document.getElementById('accordion-' + id);
  if (!acc) return;
  acc.classList.toggle('expanded');
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

function applyMobileSort(type) {
  closeMobileSortSheet();
  const sortLabel = document.getElementById('mobileSortLabel');
  if (type === 'all') {
    currentStatusFilter = 'all';
    if (sortLabel) sortLabel.textContent = 'Sort by';
  } else if (type === 'done' || type === 'in_progress' || type === 'wait') {
    currentStatusFilter = type;
    if (sortLabel) sortLabel.textContent = type.toUpperCase();
  } else if (type === 'newest') {
    if (sortLabel) sortLabel.textContent = 'Newest';
  } else if (type === 'oldest') {
    if (sortLabel) sortLabel.textContent = 'Oldest';
  }
  const statusSelect = document.getElementById('statusFilter');
  if (statusSelect && (type === 'all' || type === 'done' || type === 'in_progress' || type === 'wait')) {
    statusSelect.value = currentStatusFilter;
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
  document.querySelectorAll('.mobile-tab-item').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-mobile-tab') === tabName);
  });

  const cardsContainer = document.getElementById('cardsContainer');
  const tableContainer = document.getElementById('tableContainer');
  const timelineContainer = document.getElementById('timelineContainer');
  const statsSection = document.querySelector('.stats-grid');
  const analyticsSection = document.querySelector('.analytics-section');
  const rankingSection = document.getElementById('requesterRankingSection');
  const navTitle = document.getElementById('mobileNavTitle');
  const headerTitle = document.getElementById('mobileHeaderTitle');

  if (tabName === 'tasks') {
    currentView = 'cards';
    if (cardsContainer) cardsContainer.style.display = 'block';
    if (tableContainer) tableContainer.style.display = 'none';
    if (timelineContainer) timelineContainer.style.display = 'none';
    if (statsSection) statsSection.style.display = 'none';
    if (analyticsSection) analyticsSection.style.display = 'none';
    if (rankingSection) rankingSection.style.display = 'none';
    if (navTitle) navTitle.textContent = 'Documents';
    if (headerTitle) headerTitle.textContent = 'ACHIEVEMENT RECORD';
    renderContent();
  } else if (tabName === 'timeline') {
    currentView = 'timeline';
    if (cardsContainer) cardsContainer.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'none';
    if (timelineContainer) timelineContainer.style.display = 'block';
    if (statsSection) statsSection.style.display = 'none';
    if (analyticsSection) analyticsSection.style.display = 'none';
    if (rankingSection) rankingSection.style.display = 'none';
    if (navTitle) navTitle.textContent = 'Timeline';
    if (headerTitle) headerTitle.textContent = 'ACTIVITY TIMELINE';
    renderContent();
  } else if (tabName === 'analytics') {
    if (cardsContainer) cardsContainer.style.display = 'none';
    if (tableContainer) tableContainer.style.display = 'none';
    if (timelineContainer) timelineContainer.style.display = 'none';
    if (statsSection) statsSection.style.display = 'grid';
    if (analyticsSection) analyticsSection.style.display = 'block';
    if (rankingSection) rankingSection.style.display = 'block';
    if (navTitle) navTitle.textContent = 'Analytics';
    if (headerTitle) headerTitle.textContent = 'REAL-TIME ANALYTICS';
    renderStats();
    renderCharts();
    renderRequesterRanking();
  }
}

function handleMobileSearch(val) {
  currentSearch = val ? val.trim() : '';
  const clearBtn = document.getElementById('mobileSearchClear');
  if (clearBtn) clearBtn.style.display = currentSearch ? 'flex' : 'none';
  const desktopSearch = document.getElementById('searchInput');
  if (desktopSearch) desktopSearch.value = currentSearch;
  renderContent();
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
          <div class="timeline-card">
            <div class="card-header-meta">
              <span class="category-badge" style="background-color: ${cat.color}15; color: ${cat.color};">
                ${cat.icon} ${escapeHtml(uppercaseEnglish(cat.name))}
              </span>
              <div style="display: flex; gap: 6px; align-items: center;">
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

            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px; font-size: 12px; color: var(--text-muted);">
              <span>🗓️ DATE: ${dateDisplay} | REQ BY: ${escapeHtml(uppercaseEnglish(item.requestName || '-'))}${item.assignee ? ` | ASSIGN: 😎 ${escapeHtml(uppercaseEnglish(item.assignee))}` : ''}</span>
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
  const scrollAmount = direction === 'left' ? -380 : 380;
  container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
}

// 3. Table View (Dual Mode: Fit Screen / Full Columns)
function renderTableView(container, items) {
  const isCompact = tableMode === 'compact';

  let html = `
    <!-- Table Toolbar: Display Mode & Scroll Helpers -->
    <div class="table-toolbar">
      <div style="display: flex; align-items: center; gap: 10px; flex-wrap: wrap;">
        <span style="font-size: 12px; font-weight: 700; color: var(--secondary);">รูปแบบการแสดงผล:</span>
        <div class="mode-pills">
          <button class="mode-pill ${isCompact ? 'active' : ''}" onclick="setTableMode('compact')" title="พอดีหน้าจอ: รวมข้อมูลสำคัญ ไม่ต้องเลื่อนซ้ายขวา">
            📱 พอดีจอ (FIT SCREEN)
          </button>
          <button class="mode-pill ${!isCompact ? 'active' : ''}" onclick="setTableMode('full')" title="ตารางเต็ม: แสดงแยก 13 คอลัมน์ ตรึงหัวตารางและชื่อผลงาน">
            📊 ตารางเต็ม (FULL COLUMNS)
          </button>
        </div>
      </div>

      ${!isCompact ? `
        <div class="scroll-actions">
          <span style="font-size: 11px; color: var(--text-muted); font-weight: 600;">เลื่อนตาราง:</span>
          <button class="btn-scroll" onclick="scrollTable('left')" title="เลื่อนไปทางซ้าย">
            ◀ เลื่อนซ้าย (LEFT)
          </button>
          <button class="btn-scroll" onclick="scrollTable('right')" title="เลื่อนไปทางขวา">
            เลื่อนขวา (RIGHT) ▶
          </button>
        </div>
      ` : `
        <div style="font-size: 11.5px; color: #059669; font-weight: 600; display: flex; align-items: center; gap: 4px;">
          <svg width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>
          พอดีหน้าจอ — รวมข้อมูลสำคัญ ไม่ต้องเลื่อนซ้ายขวา
        </div>
      `}
    </div>

    <div class="table-container" id="tableScrollContainer">
  `;

  if (isCompact) {
    // --- COMPACT MODE: 7 Streamlined Columns (No horizontal scroll needed) ---
    html += `
      <table class="data-table table-compact">
        <thead>
          <tr>
            <th class="col-no" style="width: 48px; min-width: 48px; text-align: center; white-space: nowrap;">#</th>
            <th style="width: 25%;">TASK & CATEGORY</th>
            <th style="width: 105px;">STATUS</th>
            <th style="width: 22%;">REQUEST & LOCATION</th>
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
        <tr>
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
          <td>${statusHtml}</td>
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
    // --- FULL MODE: 13 Columns with Sticky # and Task Name + Horizontal Scroll ---
    html += `
      <table class="data-table table-full">
        <thead>
          <tr>
            <th class="sticky-col-no" style="white-space: nowrap; text-align: center;">#</th>
            <th class="sticky-col-task">TASK NAME</th>
            <th style="min-width: 120px;">STATUS</th>
            <th style="min-width: 90px;">ASSIGN</th>
            <th style="min-width: 140px;">REQUEST NUMBER</th>
            <th style="min-width: 130px;">QUOTATION</th>
            <th style="min-width: 150px;">REQUEST NAME</th>
            <th style="min-width: 190px;">FACTORY / DEPT / PROCESS</th>
            <th style="min-width: 200px;">DETAIL</th>
            <th style="min-width: 170px;">NOTE</th>
            <th style="min-width: 130px;">ATTACHMENTS</th>
            <th style="min-width: 110px; white-space: nowrap;">DATE</th>
            <th style="width: 80px; text-align: right;">จัดการ</th>
          </tr>
        </thead>
        <tbody>
    `;

    items.forEach((item, index) => {
      const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#64748b' };
      const statusHtml = getStatusPillHtml(item.status);
      const dateDisplay = item.completionDate || item.requestDate || '-';

      html += `
        <tr>
          <td class="sticky-col-no" style="color: var(--text-light); font-weight: 600; white-space: nowrap; text-align: center;">${index + 1}</td>
          <td class="sticky-col-task">
            <div style="font-weight: 700; cursor: pointer; color: var(--text-main); display: flex; align-items: center; gap: 6px;" onclick="viewAchievementDetail('${item.id}')">
              <span>📄</span>
              <span>${escapeHtml(uppercaseEnglish(item.title))}</span>
            </div>
            <div style="font-size: 11px; color: ${cat.color}; margin-top: 3px; font-weight: 600;">
              ${cat.icon} ${escapeHtml(uppercaseEnglish(cat.name))}
            </div>
          </td>
          <td>${statusHtml}</td>
          <td>
            ${item.assignee ? `<span class="badge-assignee" onclick="filterByAssignee('${escapeHtml(uppercaseEnglish(item.assignee))}')" style="cursor: pointer;" title="คลิกเพื่อกรองเฉพาะงานของ: ${escapeHtml(uppercaseEnglish(item.assignee))}">😎 ${escapeHtml(uppercaseEnglish(item.assignee))}</span>` : '<span style="color:#cbd5e1;">-</span>'}
          </td>
          <td>
            ${item.code ? `<span class="badge-code">${escapeHtml(uppercaseEnglish(item.code))}</span>` : '<span style="color:#cbd5e1;">-</span>'}
          </td>
          <td>
            ${item.quotation ? `<span class="badge-quotation">${escapeHtml(uppercaseEnglish(item.quotation))}</span>` : '<span style="color:#cbd5e1;">-</span>'}
          </td>
          <td>
            <span style="font-weight: 600; font-size: 12px; color: #334155;">
              ${escapeHtml(uppercaseEnglish(item.requestName || '-'))}
            </span>
            ${item.requestDate ? `<div style="font-size: 10.5px; color: var(--text-muted);">${item.requestDate}</div>` : ''}
          </td>
          <td>
            <div style="display: flex; flex-direction: column; gap: 3px; font-size: 11px;">
              ${item.factory ? `<span class="badge-dept">🏢 ${escapeHtml(uppercaseEnglish(item.factory))}</span>` : ''}
              ${item.department ? `<span class="badge-dept">👥 ${escapeHtml(uppercaseEnglish(item.department))}</span>` : ''}
              ${item.process ? `<span class="badge-dept">⚙️ ${escapeHtml(uppercaseEnglish(item.process))}</span>` : ''}
              ${(!item.factory && !item.department && !item.process) ? '<span style="color:#cbd5e1;">-</span>' : ''}
            </div>
          </td>
          <td style="max-width: 220px; font-size: 12px; color: var(--secondary);">
            ${escapeHtml(uppercaseEnglish(item.description || '-'))}
          </td>
          <td style="max-width: 180px; font-size: 12px; color: #475569; font-style: italic;">
            ${escapeHtml(uppercaseEnglish(item.note || '-'))}
          </td>
          <td>
            <div style="display: flex; gap: 4px; flex-wrap: wrap;">
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
                    <button class="badge-pdf" onclick="openDrawingAttachment('${item.id}')" title="เปิดดู DRAWING (PDF)" style="background:#ecfdf5; color:#065f46; border-color:#a7f3d0;">📄 DRAWING (PDF)</button>
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
          <td style="white-space: nowrap; color: var(--text-muted); font-size: 12px;">${dateDisplay}</td>
          <td style="text-align: right;">
            <div class="card-actions" style="justify-content: flex-end;">
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
  `;
  container.innerHTML = html;
}


function resetAssigneeDropdown() {
  const select = document.getElementById('achvAssignee');
  if (!select) return;
  select.innerHTML = `
    <option value="">-- เลือกผู้รับผิดชอบ (SELECT ASSIGNEE) --</option>
    <option value="SUTTHIPONG M.">SUTTHIPONG M.</option>
    <option value="JITTRAKAN K.">JITTRAKAN K.</option>
    <option value="TANIN P.">TANIN P.</option>
    <option value="KITTISAK P.">KITTISAK P.</option>
    <option value="NARUEBODEE C.">NARUEBODEE C.</option>
  `;
}

// --- Achievement Modal (Add / Edit) ---
function openAchievementModal(id = null) {
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

    modalTitle.textContent = 'แก้ไขข้อมูลงาน (EDIT TASK / ACHIEVEMENT)';
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
    document.getElementById('achvStatus').value = st;
    document.getElementById('achvCompletionDate').value = item.completionDate || '';
    document.getElementById('achvDescription').value = uppercaseEnglish(item.description || '');
    document.getElementById('achvNote').value = uppercaseEnglish(item.note || '');

    if (item.workFolder && typeof item.workFolder === 'object') {
      currentModalFolder = { ...item.workFolder };
      if (!hasFolderDownloadableData(currentModalFolder)) {
        loadAchievementsFromIndexedDB().then(idbData => {
          if (idbData) {
            const fullItem = idbData.find(a => a.id === item.id);
            if (fullItem && fullItem.workFolder && hasFolderDownloadableData(fullItem.workFolder)) {
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
    document.getElementById('achvAssignee').value = '';
    document.getElementById('achvStatus').value = 'in_progress';
    if (categories.length > 0) {
      document.getElementById('achvCategory').value = categories[0].id;
    }
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('achvRequestDate').value = today;
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
      savedItem = {
        ...achievements[index],
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
        workFolder: finalWorkFolder,
        pdfAttachment: finalPdfAttachment,
        imageData: currentModalImageData,
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
      workFolder: finalWorkFolder,
      pdfAttachment: finalPdfAttachment,
      imageData: currentModalImageData,
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

  if (confirm(`คุณต้องการลบงาน "${item.title}" ใช่หรือไม่?`)) {
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
function viewAchievementDetail(id) {
  const item = achievements.find(a => a.id === id);
  if (!item) return;

  const cat = categories.find(c => c.id === item.categoryId) || { name: 'ทั่วไป', icon: '📌', color: '#64748b' };
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
      ${item.code ? `<span class="badge-code">REQUEST NO: ${escapeHtml(uppercaseEnglish(item.code))}</span>` : ''}
      ${item.quotation ? `<span class="badge-quotation">QUOTATION: ${escapeHtml(uppercaseEnglish(item.quotation))}</span>` : ''}
      ${item.assignee ? `<span class="badge-assignee">ASSIGN: 😎 ${escapeHtml(uppercaseEnglish(item.assignee))}</span>` : ''}
    </div>

    <!-- Request Metadata Grid -->
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 10px; background: #f8fafc; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); margin-bottom: 16px; font-size: 12.5px;">
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
        <span style="color: var(--text-muted); font-size: 11px;">DATE COMPLETED:</span>
        <div style="font-weight: 700;">${item.completionDate || '-'}</div>
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
    'TESTING', 'MACHINING', 'GENERAL', 'WAIT', 'DONE', 'CANCEL', 'CANCLE'
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
  if (!hasFolderDownloadableData(folder)) {
    try {
      const idbData = await loadAchievementsFromIndexedDB();
      if (idbData) {
        const fullItem = idbData.find(a => a.id === achvId);
        if (fullItem && fullItem.workFolder && hasFolderDownloadableData(fullItem.workFolder)) {
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
    'TASK NAME', 'STATUS', 'ASSIGN', 'REQUEST NUMBER', 'QUOTATION', 'REQUEST NAME',
    'REQUEST DATE', 'FACTORY', 'DEPARTMENT', 'PROCESS', 'DETAIL', 'NOTE', 'DATE', 'WORK FOLDER', 'CATEGORY'
  ];

  const rows = achievements.map(a => {
    const cat = categories.find(c => c.id === a.categoryId) || { name: 'ทั่วไป' };
    return [
      uppercaseEnglish(a.title),
      a.status === 'done' ? 'DONE' : (a.status === 'in_progress' ? 'IN PROGRESS' : (a.status === 'cancel' || a.status === 'cancle' ? 'CANCEL' : 'WAIT')),
      uppercaseEnglish(a.assignee || ''),
      uppercaseEnglish(a.code || ''),
      uppercaseEnglish(a.quotation || ''),
      uppercaseEnglish(a.requestName || ''),
      a.requestDate || '',
      uppercaseEnglish(a.factory || ''),
      uppercaseEnglish(a.department || ''),
      uppercaseEnglish(a.process || ''),
      (uppercaseEnglish(a.description || '')).replace(/"/g, '""'),
      (uppercaseEnglish(a.note || '')).replace(/"/g, '""'),
      a.completionDate || a.requestDate || '',
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
      return `<span class="status-pill status-wait"><span class="status-dot-sm"></span>WAIT</span>`;
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

