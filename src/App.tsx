import React, { useMemo, useState } from "react";

type DayKey = "0424" | "0425" | "0426";

type Duty = {
  id: string;
  day: DayKey;
  start: string;
  end: string;
  location: string;
  people: string[];
  task: string;
  detail: string;
  backup?: string;
};

const dayOptions = [
  { key: "0424" as const, label: "4/24（前置）" },
  { key: "0425" as const, label: "4/25（六）" },
  { key: "0426" as const, label: "4/26（日）" },
];

const groupDescriptions = [
  {
    name: "講者接待組",
    items: [
      "上午場 7:30、下午場 12:20／12:40 領取領據、講師費、交通費與回郵信封。",
      "上午場 7:30、下午場 12:20／12:40 領取 QR code 與紙本簽到退紙，後續交由場規組協助張貼。",
      "事先將講者 PPT、影片放至電腦。",
      "隨時 follow 邀請場次講者與主持是否抵達，必要時帶領至現場。",
      "場次結束後請講者簽領據，發放講師費、交通費或回郵信封，並說明後續處理方式。",
    ],
  },
  {
    name: "司儀",
    items: [
      "確認 PPT 無誤，播放串場 PPT 與音樂。",
      "協助宣導觀眾往前坐，空檔時可支援貴賓接待。",
      "主持流程：開場主持與後續活動說明。",
      "負責遞麥克風給來賓致詞與觀眾提問。",
      "頒獎典禮需遞獎狀、獎盃。",
      "開幕式需引導歷屆理事拍合照。",
    ],
  },
  {
    name: "引導觀眾",
    items: [
      "專題、開幕式、頒獎典禮需引導觀眾入座。",
      "國際會議廳兩條走道一人一邊，提醒觀眾往前、往中間坐。",
      "提醒觀眾簽到／簽退：簽到 QR code 在場內 PPT／牆壁上，簽退在會場外。",
      "頒獎典禮需引導獲獎來賓上台動線。",
      "當座位達 9 成滿時，通知門口、報到處與同步教室。",
      "準點開始時協助關閉入場門，並負責疏散觀眾。",
    ],
  },
  {
    name: "場控：專題＆開幕式",
    items: [
      "協助理監事接待與入座。",
      "場次開始前先向講者與來賓說明會以大字報提醒時間，並確認是否需要其他提醒方式。",
      "事前提醒主持人與主講人，結束前 3 分鐘可安排合影。",
    ],
  },
  {
    name: "場控：工作坊＆研討會",
    items: [
      "播放串場 PPT，黑板寫簽到退提醒。",
      "場次開始前把提示牌依序放好：10 分鐘、5 分鐘、1 分鐘、時間到。",
      "引導觀眾入座、提醒簽到退、遞麥克風給觀眾提問。",
      "疏散觀眾並舉簽退提醒。",
      "事前提醒主持人與主講人，結束前 3 分鐘可合影。",
      "預放下一場 PPT，並更改或擦去黑板上的簽到退提醒。",
    ],
  },
  {
    name: "機動",
    items: [
      "協助開幕、專題演講、專題論壇、大師對談等重要場次的同步教室。",
      "該時段隨時備戰，任何點位有人力需求時立即支援。",
    ],
  },
  {
    name: "暗樁",
    items: [
      "重要場次預備提問，若現場無人提問，暗樁需主動發問。",
    ],
  },
];

const duties: Duty[] = [
  {
    id: "0424-1500-1",
    day: "0424",
    start: "15:00",
    end: "15:10",
    location: "宗輔室集合",
    people: ["思妤", "子熒"],
    task: "點名、確認全員到齊",
    detail: "確認全員報到，若有人未到先由機動遞補。",
  },
  {
    id: "0424-1510-1",
    day: "0424",
    start: "15:10",
    end: "15:20",
    location: "宗輔室集合",
    people: ["全體"],
    task: "物資說明",
    detail: "說明領據信封、提醒牌、場次單、原子筆、USB 的使用方式。",
  },
  {
    id: "0424-1520-1",
    day: "0424",
    start: "15:20",
    end: "15:35",
    location: "宗輔室工作桌",
    people: ["子熒", "思妤", "子裳", "宥伶", "詩璇", "采仔", "欣愉", "婧蓉"],
    task: "整理所有物品放置位置",
    detail: "將所有物品放於宗輔室桌上，確認放置位置與缺件。",
  },
  {
    id: "0424-1535-1",
    day: "0424",
    start: "15:35",
    end: "15:50",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "珊淇", "少杰", "海茵", "智翔"],
    task: "主場總巡檢",
    detail: "確認主持台、講台、投影、麥克風、音源、網路、燈光與時間提示牌位置。",
  },
  {
    id: "0424-1535-2",
    day: "0424",
    start: "15:35",
    end: "15:50",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "筠婷", "子媛", "子萱"],
    task: "二樓會議廳巡檢",
    detail: "確認主持位置、投影、燈光與提示牌位置。",
  },
  {
    id: "0424-1535-3",
    day: "0424",
    start: "15:35",
    end: "16:00",
    location: "DG308",
    people: ["岳哲", "瀚淳", "芷虹"],
    task: "同步教室巡檢",
    detail: "確認電腦、投影、網路與同步教室立牌。",
  },
  {
    id: "0424-1550-1",
    day: "0424",
    start: "15:50",
    end: "16:20",
    location: "各工作坊／研討會教室",
    people: ["可芸", "雅雯", "子媛", "宣亞", "詠棋", "依伶", "文伶", "敏瑄", "晏緹", "霖萱"],
    task: "逐教室確認場佈",
    detail: "確認桌椅、麥克風、簡報筆、場次單與簽到退提醒位置。",
  },
  {
    id: "0424-1620-1",
    day: "0424",
    start: "16:20",
    end: "16:40",
    location: "各教室",
    people: ["彥儒", "宥伶", "詩璇", "采仔", "欣愉", "婧蓉"],
    task: "下載與備份簡報",
    detail: "將各場簡報下載到桌面並保留 USB 備份。",
  },
  {
    id: "0424-1640-1",
    day: "0424",
    start: "16:40",
    end: "17:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "珊淇", "少杰", "海茵"],
    task: "演練開幕與專題流程",
    detail: "演練主持開場、貴賓上台、Q&A 遞麥、時間提醒與簽退提醒。",
  },
  {
    id: "0424-1640-2",
    day: "0424",
    start: "16:40",
    end: "17:00",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "筠婷", "子媛"],
    task: "演練二樓流程",
    detail: "演練主持開場、Q&A、時間控制與簽退提醒。",
  },
  {
    id: "0424-1700-1",
    day: "0424",
    start: "17:00",
    end: "17:20",
    location: "宗輔室集合",
    people: ["思妤", "子熒", "全體"],
    task: "分區回報",
    detail: "回報已完成、待確認與風險點。",
  },
  {
    id: "0424-1745-1",
    day: "0424",
    start: "17:45",
    end: "18:00",
    location: "宗輔室收尾",
    people: ["子裳", "彥儒", "宥伶", "詩璇", "采仔", "欣愉", "婧蓉"],
    task: "物資分類標示",
    detail: "將信封、提示牌、USB 標示隔日用途，桌面只留已分類物資。",
  },
  {
    id: "0425-0715-1",
    day: "0425",
    start: "07:15",
    end: "07:30",
    location: "秘書處",
    people: ["彥儒"],
    task: "領取上午主場資料",
    detail: "領上午場全部信封、領據、講師費、交通費與簽到退 QR code，按場次裝袋。",
  },
  {
    id: "0425-0730-1",
    day: "0425",
    start: "07:30",
    end: "08:20",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "珊淇", "少杰", "海茵", "彥儒"],
    task: "主場開場前總檢查",
    detail: "確認 PPT、迎賓音樂、麥克風、貴賓名牌、提示牌與講者信封。",
  },
  {
    id: "0425-0730-2",
    day: "0425",
    start: "07:30",
    end: "08:20",
    location: "DG308",
    people: ["岳哲", "瀚淳"],
    task: "同步教室準備",
    detail: "開啟同步教室投影、音量、網路，08:20 可開放。",
  },
  {
    id: "0425-0730-3",
    day: "0425",
    start: "07:30",
    end: "08:20",
    location: "二樓機動巡點",
    people: ["子裳", "宥伶", "詩璇", "采仔", "欣愉", "婧蓉", "芷虹", "子萱", "智翔"],
    task: "機動巡點",
    detail: "巡各點檢查講者是否提早抵達、QR code 是否移位、教室門口可辨識。",
  },
  {
    id: "0425-0820-1",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "一樓國際會議廳",
    people: ["少杰"],
    task: "前門控流與帶位",
    detail: "提醒簽到、引導往前往中間入座、觀察滿座率。",
  },
  {
    id: "0425-0820-2",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "一樓國際會議廳",
    people: ["海茵"],
    task: "貴賓帶位",
    detail: "協助貴賓入座並說明時間提醒方式。",
  },
  {
    id: "0425-0820-3",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "一樓國際會議廳",
    people: ["珊淇"],
    task: "放置提示牌與合照確認",
    detail: "放好提示牌並確認合照時點。",
  },
  {
    id: "0425-0820-4",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟"],
    task: "確認開幕 PPT 與試音",
    detail: "確認開幕 PPT／影片、試音並於 08:50 準時開場。",
  },
  {
    id: "0425-0820-5",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "DG308",
    people: ["岳哲", "瀚淳"],
    task: "同步教室引導",
    detail: "貼場次單、提醒此處為同步教室並指引簽到退 QR code。",
  },
  {
    id: "0425-0850-1",
    day: "0425",
    start: "08:50",
    end: "09:30",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟"],
    task: "主持開幕式",
    detail: "主持開幕、串接貴賓致詞、控制節奏並準時收尾。",
  },
  {
    id: "0425-0850-2",
    day: "0425",
    start: "08:50",
    end: "09:30",
    location: "一樓國際會議廳",
    people: ["少杰", "海茵"],
    task: "遞麥與合照動線",
    detail: "遞麥、引導歷屆理事上台合照並維持走道淨空。",
  },
  {
    id: "0425-0900-1",
    day: "0425",
    start: "09:00",
    end: "09:30",
    location: "講者休息區／主場",
    people: ["彥儒"],
    task: "接專題演講（一）講者",
    detail: "接待講者、收最後版 PPT、確認主持到位。",
  },
  {
    id: "0425-0930-1",
    day: "0425",
    start: "09:30",
    end: "11:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟"],
    task: "主持專題演講（一）",
    detail: "主持專題演講、Q&A 遞麥與收尾。",
  },
  {
    id: "0425-0930-2",
    day: "0425",
    start: "09:30",
    end: "11:00",
    location: "一樓國際會議廳",
    people: ["珊淇"],
    task: "舉牌提醒時間",
    detail: "依序舉 10／5／1 分鐘與時間到，提醒主持收束。",
  },
  {
    id: "0425-0930-3",
    day: "0425",
    start: "09:30",
    end: "11:00",
    location: "一樓國際會議廳",
    people: ["少杰", "海茵"],
    task: "門口控流與 Q&A 遞麥",
    detail: "提醒簽到退、控流、Q&A 遞麥，避免影響講者。",
  },
  {
    id: "0425-0930-4",
    day: "0425",
    start: "09:30",
    end: "11:00",
    location: "DG308",
    people: ["岳哲", "瀚淳"],
    task: "同步教室控流",
    detail: "提醒簽到退並記錄是否需加開座位。",
  },
  {
    id: "0425-0930-5",
    day: "0425",
    start: "09:30",
    end: "11:00",
    location: "場邊待命",
    people: ["芷虹", "子萱", "智翔"],
    task: "機動補位",
    detail: "隨時支援跑信封、拿電池、遞麥或帶位。",
  },
  {
    id: "0425-1100-1",
    day: "0425",
    start: "11:00",
    end: "11:20",
    location: "一樓國際會議廳／講者出口",
    people: ["彥儒"],
    task: "講者簽領據回收",
    detail: "請講者簽領據、放回信封並交回宗輔室。",
  },
  {
    id: "0425-1100-2",
    day: "0425",
    start: "11:00",
    end: "11:20",
    location: "1、2樓大廳",
    people: ["少杰", "海茵", "敬婷", "可芸", "雅雯", "宣亞", "詠棋", "依伶", "文伶", "敏瑄", "霖萱", "婧蓉", "欣愉", "晏緹"],
    task: "茶敘導流",
    detail: "提醒會員大會即將開始，引導觀眾不要逗留在門口。",
  },
  {
    id: "0425-1120-1",
    day: "0425",
    start: "11:20",
    end: "12:20",
    location: "一樓國際會議廳",
    people: ["思妤", "子熒"],
    task: "監督會員大會流程",
    detail: "確認議程組只做引導與秩序，不代替秘書處。",
  },
  {
    id: "0425-1120-2",
    day: "0425",
    start: "11:20",
    end: "12:20",
    location: "一樓國際會議廳",
    people: ["彥儒", "詩璇"],
    task: "門口簽到說明",
    detail: "解釋會員大會簽到方式，協助老會員就座。",
  },
  {
    id: "0425-1120-3",
    day: "0425",
    start: "11:20",
    end: "12:20",
    location: "一樓國際會議廳",
    people: ["惟謙"],
    task: "主場時間與秩序提醒",
    detail: "控制時間並照看第一排與走道。",
  },
  {
    id: "0425-1120-4",
    day: "0425",
    start: "11:20",
    end: "12:20",
    location: "一樓國際會議廳",
    people: ["敬婷", "少杰"],
    task: "觀眾帶位與會後疏散",
    detail: "協助帶位並於會後快速疏散觀眾。",
  },
  {
    id: "0425-1220-1",
    day: "0425",
    start: "12:20",
    end: "13:00",
    location: "宗輔室",
    people: ["思妤", "子熒", "彥儒", "宥伶", "子裳", "詩璇", "采仔", "欣愉", "婧蓉"],
    task: "整理下午資料袋",
    detail: "整理下午所有場次資料袋：領據信封、主持稿、PPT、教室清單與 QR code。",
  },
  {
    id: "0425-1220-2",
    day: "0425",
    start: "12:20",
    end: "13:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟"],
    task: "播放午餐串場 PPT 與轉場音樂",
    detail: "提醒下午主場與 DG308 開放規則。",
  },
  {
    id: "0425-1220-3",
    day: "0425",
    start: "12:20",
    end: "13:00",
    location: "二樓各教室",
    people: ["可芸", "雅雯", "子媛", "筠婷", "晏緹", "霖萱", "宣亞", "詠棋", "依伶", "文伶", "敏瑄", "珊淇"],
    task: "各教室下午場佈",
    detail: "進行 14:00 場次場佈：QR code、提示牌、桌椅、投影與講台淨空。",
  },
  {
    id: "0425-1300-1",
    day: "0425",
    start: "13:00",
    end: "14:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "思妤", "詩璇", "敬婷", "海茵", "惟謙", "彥儒", "芷虹", "瀚淳"],
    task: "法律課程主場執行",
    detail: "接待講者、主持、引導入座、DG308 同步與場控。",
  },
  {
    id: "0425-1400-1",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "子媛", "筠婷", "子熒", "欣愉"],
    task: "行動心理師工作坊",
    detail: "主持、引導、場控與接待。",
  },
  {
    id: "0425-1400-2",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD169",
    people: ["少杰", "晏緹", "彥儒", "婧蓉"],
    task: "創傷工作坊",
    detail: "少杰引導與遞麥；晏緹場控；彥儒、婧蓉場邊接待與領據。",
  },
  {
    id: "0425-1400-3",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD168",
    people: ["岳哲", "霖萱", "采仔"],
    task: "AI 難以（一）工作坊",
    detail: "開檔、引導、時間控制與場後領據。",
  },
  {
    id: "0425-1400-4",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD167",
    people: ["可芸", "宣亞", "子裳"],
    task: "花蓮工作坊",
    detail: "接講者、門口引導、提示牌與領據。",
  },
  {
    id: "0425-1400-5",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD203",
    people: ["海茵", "詠棋", "宥伶"],
    task: "到宅心理工作坊",
    detail: "接待、門口簽到與場內引導。",
  },
  {
    id: "0425-1400-6",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD204",
    people: ["雅雯", "文伶", "詩璇"],
    task: "程序監理：角色",
    detail: "場控、接待與場後收信封。",
  },
  {
    id: "0425-1400-7",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD215",
    people: ["敬婷", "敏瑄", "欣愉"],
    task: "CBME 現況研討會",
    detail: "提醒簽到退、場內引導與場後收信封。",
  },
  {
    id: "0425-1400-8",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD214",
    people: ["宥伶", "依伶", "婧蓉"],
    task: "數位成癮研討會",
    detail: "接待、時間控制與場內引導。",
  },
  {
    id: "0425-1400-9",
    day: "0425",
    start: "14:00",
    end: "15:30",
    location: "MD213",
    people: ["子媛", "珊淇", "采仔"],
    task: "安寧研討會",
    detail: "場控提醒時間並支援接待。",
  },
  {
    id: "0425-1530-1",
    day: "0425",
    start: "15:30",
    end: "15:50",
    location: "各教室",
    people: ["各教室原班人員"],
    task: "場後固定四步",
    detail: "提醒簽退 → 講者簽領據 → 領據回信封 → 換下一場 PPT／收教室。",
  },
  {
    id: "0425-1550-1",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "子媛", "筠婷", "彥儒", "欣愉"],
    task: "治療所工作坊",
    detail: "主持、引導、場控與接待。",
  },
  {
    id: "0425-1550-2",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD169",
    people: ["少杰", "晏緹", "采仔"],
    task: "資訊操弄研討會",
    detail: "引導、場控、接待與場後收信封。",
  },
  {
    id: "0425-1550-3",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD168",
    people: ["岳哲", "霖萱"],
    task: "AI 難以（二）工作坊",
    detail: "引導與場控。",
  },
  {
    id: "0425-1550-4",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD167",
    people: ["可芸", "宣亞", "子裳"],
    task: "公共安全工作坊",
    detail: "引導、場控與接待。",
  },
  {
    id: "0425-1550-5",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD203",
    people: ["海茵", "詠棋", "宥伶"],
    task: "人工智慧研討會",
    detail: "引導、場控與接待。",
  },
  {
    id: "0425-1550-6",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD204",
    people: ["雅雯", "文伶", "詩璇"],
    task: "程序監理：實作",
    detail: "引導、場控、接待與時間提醒。",
  },
  {
    id: "0425-1550-7",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD215",
    people: ["敬婷", "敏瑄", "欣愉"],
    task: "CBME：反思",
    detail: "引導、場控與接待。",
  },
  {
    id: "0425-1550-8",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD214",
    people: ["子媛", "依伶", "婧蓉"],
    task: "多元場次（MD214）",
    detail: "引導、場控與接待。",
  },
  {
    id: "0425-1550-9",
    day: "0425",
    start: "15:50",
    end: "17:20",
    location: "MD213",
    people: ["宥伶", "珊淇", "采仔"],
    task: "多元場次（MD213）",
    detail: "引導、場控與接待。",
  },
  {
    id: "0425-1720-1",
    day: "0425",
    start: "17:20",
    end: "17:50",
    location: "宗輔室",
    people: ["思妤", "子熒", "全體"],
    task: "4/25 收尾",
    detail: "回收所有領據信封、提示牌、主持稿、剩餘 QR code，核對未簽名名單。",
  },
  {
    id: "0426-0800-1",
    day: "0426",
    start: "08:00",
    end: "08:15",
    location: "宗輔室",
    people: ["子熒", "宥伶"],
    task: "領上午場資料",
    detail: "領上午場信封、領據、交通費與簽到退 QR code，按場次裝袋。",
  },
  {
    id: "0426-0830-1",
    day: "0426",
    start: "08:30",
    end: "09:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "敬婷", "岳哲", "子熒", "欣愉"],
    task: "大師對談主場前置",
    detail: "開檔、試音、接講者、提示牌與引導。",
  },
  {
    id: "0426-0830-2",
    day: "0426",
    start: "08:30",
    end: "09:00",
    location: "DG308",
    people: ["彥儒", "采仔", "瀚淳"],
    task: "同步教室前置",
    detail: "開機、投影、門口說明與簽到退。",
  },
  {
    id: "0426-0930-1",
    day: "0426",
    start: "09:30",
    end: "10:30",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "敬婷", "岳哲", "子熒", "欣愉"],
    task: "大師對談進行",
    detail: "主持、場控、引導、接待與場後收信封。",
  },
  {
    id: "0426-1030-1",
    day: "0426",
    start: "10:30",
    end: "10:50",
    location: "1、2樓大廳",
    people: ["彥儒", "珊淇", "筠婷", "可芸", "雅雯", "晏緹"],
    task: "茶敘導流",
    detail: "提醒 10:50 專題演講（三）即將開始。",
  },
  {
    id: "0426-1020-1",
    day: "0426",
    start: "10:20",
    end: "10:50",
    location: "一樓國際會議廳",
    people: ["宥伶", "詩璇", "惟謙", "敬婷", "岳哲", "彥儒", "采仔"],
    task: "專題演講（三）場前",
    detail: "接講者、開檔、提示牌、引導與 DG308 同步準備。",
  },
  {
    id: "0426-1050-1",
    day: "0426",
    start: "10:50",
    end: "12:20",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "敬婷", "岳哲", "宥伶", "詩璇"],
    task: "專題演講（三）進行",
    detail: "主持、場控與收尾，並提醒簽退。",
  },
  {
    id: "0426-1050-2",
    day: "0426",
    start: "10:50",
    end: "12:20",
    location: "DG308",
    people: ["彥儒", "采仔"],
    task: "同步教室運作",
    detail: "維持 DG308 同步教室運作到主場結束。",
  },
  {
    id: "0426-1220-1",
    day: "0426",
    start: "12:20",
    end: "12:40",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "少杰", "海茵", "思妤", "子熒"],
    task: "頒獎典禮",
    detail: "主持、受獎者動線、第一排整理與散場。",
  },
  {
    id: "0426-1240-1",
    day: "0426",
    start: "12:40",
    end: "13:30",
    location: "宗輔室＋各教室",
    people: ["思妤", "子熒", "宥伶", "子裳", "詩璇", "采仔", "欣愉", "婧蓉"],
    task: "整理下午資料並分送",
    detail: "整理下午所有場次信封與 QR code，分送到二樓論壇與各教室。",
  },
  {
    id: "0426-1300-1",
    day: "0426",
    start: "13:00",
    end: "13:30",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "珊淇", "少杰", "宥伶", "婧蓉", "子裳"],
    task: "專題論壇場前",
    detail: "主持站位、接講者、開檔、提示牌與引導。",
  },
  {
    id: "0426-1330-1",
    day: "0426",
    start: "13:30",
    end: "15:00",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "珊淇", "少杰", "宥伶", "婧蓉", "子裳"],
    task: "專題論壇進行",
    detail: "主持、場控、引導、遞麥與場後收信封。",
  },
  {
    id: "0426-1330-2",
    day: "0426",
    start: "13:30",
    end: "14:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "敬婷", "岳哲", "子熒"],
    task: "專題演講（四）場前",
    detail: "主持、場控、引導與接講者。",
  },
  {
    id: "0426-1400-1",
    day: "0426",
    start: "14:00",
    end: "15:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "敬婷", "岳哲", "子熒", "欣愉"],
    task: "專題演講（四）進行",
    detail: "主持、場控、接待與簽退提醒。",
  },
  {
    id: "0426-1400-2",
    day: "0426",
    start: "14:00",
    end: "15:00",
    location: "DG308",
    people: ["采仔", "瀚淳"],
    task: "同步教室運作",
    detail: "維持同步教室至主場散場。",
  },
  {
    id: "0426-1500-1",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "1、2樓大廳",
    people: ["采仔", "欣愉"],
    task: "茶敘導流",
    detail: "提醒 15:20 分場開始，協助人流分流。",
  },
  {
    id: "0426-1500-2",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD215",
    people: ["思妤", "詩璇", "晏緹", "少杰"],
    task: "沙遊場前",
    detail: "準備沙遊場前置並注意人數上限 40。",
  },
  {
    id: "0426-1500-3",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD169",
    people: ["采仔", "霖萱", "岳哲"],
    task: "社會情緒場前",
    detail: "場前就緒、引導與提示牌確認。",
  },
  {
    id: "0426-1500-4",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD168",
    people: ["子裳", "宣亞", "可芸"],
    task: "問題放回關係場前",
    detail: "接待講者、引導入座與設備確認。",
  },
  {
    id: "0426-1500-5",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD203",
    people: ["宥伶", "詠棋", "海茵"],
    task: "AI 時代存在焦慮場前",
    detail: "接待、引導與設備確認。",
  },
  {
    id: "0426-1500-6",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD204",
    people: ["詩璇", "文伶", "雅雯"],
    task: "照會實務演練場前",
    detail: "場控提示牌、接待與設備確認。",
  },
  {
    id: "0426-1500-7",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD214",
    people: ["欣愉", "敏瑄", "敬婷"],
    task: "詐病場前",
    detail: "場控、接待與設備確認。",
  },
  {
    id: "0426-1500-8",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD213",
    people: ["婧蓉", "依伶", "子媛"],
    task: "實驗心理病理場前",
    detail: "場控、接待與設備確認。",
  },
  {
    id: "0426-1500-9",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "MD212",
    people: ["采仔", "筠婷", "子媛"],
    task: "口頭報告場前",
    detail: "場控、引導與設備確認。",
  },
  {
    id: "0426-1520-1",
    day: "0426",
    start: "15:20",
    end: "16:50",
    location: "各平行場次教室",
    people: ["各室原班人員"],
    task: "平行場次進行",
    detail: "引導、簽到退、遞麥、場控提示牌與領據信封流程。",
  },
  {
    id: "0426-1650-1",
    day: "0426",
    start: "16:50",
    end: "17:20",
    location: "各教室 → 宗輔室",
    people: ["全體"],
    task: "最後收尾",
    detail: "講者簽領據 → 領據回信封 → 信封回宗輔室 → 教室恢復原狀 → 提示牌回收。",
  },
];

const allPeople = Array.from(
  new Set(
    duties
      .flatMap((d) => d.people)
      .filter((name) => !["全體", "各教室原班人員"].includes(name))
  )
).sort((a, b) => a.localeCompare(b, "zh-Hant"));

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

export default function App() {
  const [showGroupSection, setShowGroupSection] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string>(groupDescriptions[0].name);
  const [selectedDay, setSelectedDay] = useState<DayKey>("0425");
  const [query, setQuery] = useState("");
  const [pickedPerson, setPickedPerson] = useState("");

  const normalizedQuery = query.trim();
  const activePerson = pickedPerson || normalizedQuery;

  const visibleDuties = useMemo(() => {
    const dayItems = duties
      .filter((d) => d.day === selectedDay)
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

    if (!activePerson) return dayItems;

    return dayItems.filter((d) => d.people.some((name) => name.includes(activePerson)));
  }, [selectedDay, activePerson]);

  const selectedPersonAllDays = useMemo(() => {
    if (!activePerson) return [];
    return duties
      .filter((d) => d.people.some((name) => name.includes(activePerson)))
      .sort((a, b) => {
        if (a.day !== b.day) return a.day.localeCompare(b.day);
        return toMinutes(a.start) - toMinutes(b.start);
      });
  }, [activePerson]);

  const groupedAllDays = useMemo(() => {
    const map = new Map<DayKey, Duty[]>();
    selectedPersonAllDays.forEach((d) => {
      if (!map.has(d.day)) map.set(d.day, []);
      map.get(d.day)!.push(d);
    });
    return dayOptions.map((day) => ({
      ...day,
      items: map.get(day.key) ?? [],
    }));
  }, [selectedPersonAllDays]);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f1ec",
        color: "#243447",
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 20,
          background: "rgba(244,241,236,0.95)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #ddd6cb",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "18px 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 18,
                background: "#53677a",
                color: "#f7f4ef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 24,
              }}
            >
              人
            </div>
            <div>
              <div style={{ fontSize: 28, fontWeight: 800 }}>議程組個人任務查詢</div>
              <div style={{ color: "#7e858d", fontSize: 15 }}>
                搜尋姓名，就能看到該人員每個時段要做的事情。
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {dayOptions.map((day) => (
              <button
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                style={{
                  border: "1px solid #d8d0c5",
                  background: selectedDay === day.key ? "#4f6475" : "#faf7f2",
                  color: selectedDay === day.key ? "#faf7f2" : "#394a58",
                  borderRadius: 16,
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontWeight: 700,
                }}
              >
                {day.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 1200, margin: "0 auto", padding: 20 }}>
        <div
          style={{
            background: "#faf7f2",
            border: "1px solid #ddd6cb",
            borderRadius: 28,
            padding: 20,
            marginBottom: 24,
          }}
        >
          <button
            onClick={() => setShowGroupSection((v) => !v)}
            style={{
              width: "100%",
              textAlign: "left",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              padding: 0,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <div style={{ fontSize: 14, color: "#868c92", marginBottom: 8 }}>各小組工作內容</div>
              <div style={{ fontSize: 30, fontWeight: 800 }}>小組任務說明</div>
            </div>
            <span style={{ fontSize: 28, color: "#7e858d", lineHeight: 1 }}>{showGroupSection ? "−" : "+"}</span>
          </button>

          {showGroupSection ? (
            <div style={{ marginTop: 18 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
                {groupDescriptions.map((group) => (
                  <button
                    key={group.name}
                    onClick={() => setSelectedGroup(group.name)}
                    style={{
                      border: "1px solid #d8d0c5",
                      background: selectedGroup === group.name ? "#cad6d2" : "#f4efe8",
                      color: "#445461",
                      borderRadius: 999,
                      padding: "8px 12px",
                      cursor: "pointer",
                      fontSize: 14,
                    }}
                  >
                    {group.name}
                  </button>
                ))}
              </div>

              {groupDescriptions
                .filter((group) => group.name === selectedGroup)
                .map((group) => (
                  <div
                    key={group.name}
                    style={{
                      background: "#f4efe8",
                      border: "1px solid #ddd6cb",
                      borderRadius: 20,
                      padding: 18,
                      color: "#5b6875",
                      lineHeight: 1.9,
                    }}
                  >
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#394a58", marginBottom: 10 }}>
                      {group.name}
                    </div>
                    {group.items.map((item, index) => (
                      <div key={index} style={{ marginTop: index === 0 ? 0 : 8 }}>
                        {index + 1}. {item}
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          ) : null}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(280px, 380px) 1fr",
            gap: 18,
            marginBottom: 24,
          }}
        >
          <div
            style={{
              background: "#faf7f2",
              border: "1px solid #ddd6cb",
              borderRadius: 24,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 14, color: "#868c92", marginBottom: 10 }}>姓名搜尋</div>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPickedPerson("");
              }}
              placeholder="輸入人名，例如：彥儒、少杰、思妤"
              style={{
                width: "100%",
                height: 46,
                borderRadius: 14,
                border: "1px solid #d6cec3",
                padding: "0 14px",
                boxSizing: "border-box",
                fontSize: 15,
                background: "#fffdf9",
              }}
            />
            <div style={{ marginTop: 12, fontSize: 13, color: "#8a9097" }}>
              目前查詢：{activePerson || "尚未指定人名，顯示本日全部任務"}
            </div>
          </div>

          <div
            style={{
              background: "#faf7f2",
              border: "1px solid #ddd6cb",
              borderRadius: 24,
              padding: 18,
            }}
          >
            <div style={{ fontSize: 14, color: "#868c92", marginBottom: 12 }}>快速點選人員</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, maxHeight: 150, overflowY: "auto" }}>
              {allPeople.map((name) => (
                <button
                  key={name}
                  onClick={() => {
                    setPickedPerson(name);
                    setQuery(name);
                  }}
                  style={{
                    border: "1px solid #d8d0c5",
                    background: activePerson === name ? "#cad6d2" : "#f4efe8",
                    color: "#445461",
                    borderRadius: 999,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontSize: 14,
                  }}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activePerson ? (
          <div
            style={{
              background: "#faf7f2",
              border: "1px solid #ddd6cb",
              borderRadius: 28,
              padding: 20,
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 14, color: "#868c92", marginBottom: 8 }}>個人總覽</div>
            <div style={{ fontSize: 30, fontWeight: 800, marginBottom: 16 }}>{activePerson}</div>
            <div style={{ display: "grid", gap: 18 }}>
              {groupedAllDays.map((group) => (
                <div key={group.key}>
                  <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>{group.label}</div>
                  {group.items.length === 0 ? (
                    <div style={{ color: "#8a9097", fontSize: 14 }}>這一天沒有查到排班。</div>
                  ) : (
                    <div style={{ display: "grid", gap: 10 }}>
                      {group.items.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            background: "#f4efe8",
                            border: "1px solid #ddd6cb",
                            borderRadius: 18,
                            padding: 14,
                          }}
                        >
                          <div style={{ fontWeight: 700, marginBottom: 6 }}>
                            {item.start} - {item.end}｜{item.location}
                          </div>
                          <div style={{ color: "#50606e", marginBottom: 4 }}>{item.task}</div>
                          <div style={{ color: "#7d848b", fontSize: 14 }}>{item.detail}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : null}

        <div style={{ display: "grid", gap: 16 }}>
          {visibleDuties.map((duty) => (
            <div
              key={duty.id}
              style={{
                background: "#faf7f2",
                border: "1px solid #ddd6cb",
                borderRadius: 26,
                padding: 20,
                boxShadow: "0 10px 20px rgba(95, 103, 111, 0.06)",
              }}
            >
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                <span
                  style={{
                    background: "#d7e0db",
                    color: "#4d6157",
                    border: "1px solid #c4d0ca",
                    borderRadius: 999,
                    padding: "5px 10px",
                    fontSize: 12,
                  }}
                >
                  {duty.start} - {duty.end}
                </span>
                <span
                  style={{
                    background: "#ede7de",
                    color: "#6c685f",
                    border: "1px solid #dbd2c6",
                    borderRadius: 999,
                    padding: "5px 10px",
                    fontSize: 12,
                  }}
                >
                  {duty.location}
                </span>
              </div>

              <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>{duty.task}</div>
              <div style={{ color: "#52616f", lineHeight: 1.8, marginBottom: 12 }}>{duty.detail}</div>
              <div style={{ color: "#7b8188", fontSize: 14, lineHeight: 1.8 }}>
                人員：{duty.people.join("、")}
              </div>
              {duty.backup ? (
                <div style={{ color: "#8a7c73", fontSize: 14, marginTop: 8 }}>備案：{duty.backup}</div>
              ) : null}
            </div>
          ))}
        </div>

        {visibleDuties.length === 0 ? (
          <div
            style={{
              marginTop: 20,
              background: "#faf7f2",
              border: "1px solid #ddd6cb",
              borderRadius: 24,
              padding: 26,
              textAlign: "center",
              color: "#7d838c",
            }}
          >
            這個人名在目前日期沒有查到任務。
          </div>
        ) : null}
      </main>
    </div>
  );
}
