
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
      "4/24 15:00–18:00 先完成講者 PPT、影片與 USB 備份。",
      "上午場 7:30，下午場 Day 1 12:20、Day 2 12:40 到秘書處領信封、領據、講師費與交通費。",
      "場前 20 分鐘確認講者與主持是否到場，必要時帶位，並預留第一排座位。",
      "講者簽完領據後，需拍照回傳群組、記事本留言，再交回秘書處。",
      "需主動介紹廁所、飲水機、電梯等環境資訊。",
    ],
  },
  {
    name: "司儀",
    items: [
      "場前 30 分鐘完成 PPT、音樂、音訊與麥克風測試。",
      "主場固定主持：一樓國際會議廳為碩誠、慧玟；二樓國際會議廳與 DG308 有活動時為庭葰、圓庭。",
      "負責開場、串場、Q&A 遞麥與場後活動提醒。",
      "開幕式與頒獎典禮另需協助合照、遞獎狀或獎盃。",
    ],
  },
  {
    name: "引導觀眾",
    items: [
      "場前協助觀眾往前、往中間入座，並提醒簽到。",
      "主場八成滿時回報大群，啟動同步教室或分流。",
      "Q&A 時協助遞麥，散場時提醒簽退並疏散人流。",
      "頒獎典禮需引導受獎者上台動線。",
    ],
  },
  {
    name: "場控：專題＆開幕式",
    items: [
      "場前 30 分鐘領取時間提示牌並確認站位。",
      "向講者與主持說明提醒牌使用方式與提醒時間。",
      "依序舉倒數 10 分鐘、5 分鐘、1 分鐘、時間到。",
      "重要場次結束前 3 分鐘提醒合照。",
    ],
  },
  {
    name: "場控：工作坊＆研討會",
    items: [
      "場前完成串場 PPT、黑板簽到退提醒、提示牌與設備測試。",
      "向講者說明倒數 10/5/1 分鐘與時間到的提醒方式。",
      "場中負責計時與舉牌，場後協助更新下一場 PPT 或場復。",
    ],
  },
  {
    name: "機動",
    items: [
      "4/25 DG308 同步教室開幕式、專題一、法律課程時支援控流與引導。",
      "有緊急狀況時，優先支援講者未到、設備故障、座位將滿等突發事件。",
    ],
  },
  {
    name: "暗樁",
    items: [
      "重要場次預備提問，現場無人發問時主動提問。",
    ],
  },
];

const duties: Duty[] = [
  {
    id: "0424-1500-1",
    day: "0424",
    start: "15:00",
    end: "15:30",
    location: "宗輔室",
    people: ["碩誠", "慧玟", "庭葰", "圓庭", "惟謙", "珊淇", "宥伶", "詩璇", "婧蓉", "欣愉", "彥儒", "杏昀", "采伃", "曉琳"],
    task: "前置說明與物資確認",
    detail: "確認領據信封、原子筆、提醒牌、場次單、立牌與 USB 位置，缺件立即補印或補拿。",
  },
  {
    id: "0424-1530-1",
    day: "0424",
    start: "15:30",
    end: "16:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "珊淇"],
    task: "一樓主場巡檢",
    detail: "巡檢主持台、投影、麥克風、音源、網路與提示牌站位，確認講台看得到時間牌。",
  },
  {
    id: "0424-1530-2",
    day: "0424",
    start: "15:30",
    end: "16:00",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "惟謙", "珊淇"],
    task: "二樓主場巡檢",
    detail: "確認主持位置、投影、燈光與提示牌站位，確保二樓活動可直接開場。",
  },
  {
    id: "0424-1530-3",
    day: "0424",
    start: "15:30",
    end: "16:00",
    location: "DG308",
    people: ["庭葰", "圓庭"],
    task: "同步教室巡檢",
    detail: "確認主持位置、電腦、投影與網路，確保一樓主場開場時可同步開放。",
  },
  {
    id: "0424-1530-4",
    day: "0424",
    start: "15:30",
    end: "16:00",
    location: "一樓、二樓主場",
    people: ["宥伶", "詩璇", "婧蓉", "欣愉", "彥儒", "杏昀", "采伃", "曉琳"],
    task: "下載與備份講者檔案",
    detail: "將各場次 PPT、影片與串場檔下載到桌面，檔名統一並確認 USB 有備份。",
  },
  {
    id: "0424-1600-1",
    day: "0424",
    start: "16:00",
    end: "16:40",
    location: "各工作坊與研討會教室",
    people: ["彥儒", "宥伶", "詩璇", "采伃", "婧蓉", "欣愉", "杏昀", "曉琳", "思妤", "子熒"],
    task: "各教室場佈與站點確認",
    detail: "確認桌椅、麥克風、簡報筆、簽到退位置、提示牌站點與拍照回報，必要時與場規組協調。",
  },
  {
    id: "0424-1600-2",
    day: "0424",
    start: "16:00",
    end: "17:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟"],
    task: "演練開幕與專題主持",
    detail: "演練主持開場、貴賓上台、致詞遞麥與主持結語，以最終主持稿為準。",
  },
  {
    id: "0424-1600-3",
    day: "0424",
    start: "16:00",
    end: "17:00",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭"],
    task: "演練二樓重要場次主持",
    detail: "演練二樓主持開場、Q&A 與結語流程。",
  },
  {
    id: "0424-1700-1",
    day: "0424",
    start: "17:00",
    end: "17:20",
    location: "宗輔室",
    people: ["碩誠", "慧玟", "庭葰", "圓庭", "惟謙", "珊淇", "宥伶", "詩璇", "婧蓉", "欣愉", "彥儒", "杏昀", "采伃", "曉琳"],
    task: "分區回報",
    detail: "回報已完成項目、待確認事項與隔日風險點。",
  },
  {
    id: "0424-1720-1",
    day: "0424",
    start: "17:20",
    end: "18:00",
    location: "宗輔室",
    people: ["杏昀","曉琳","彥儒", "宥伶", "詩璇", "采仔", "欣愉", "婧蓉"],
    task: "前置收尾",
    detail: "將信封、提示牌與 USB 依隔日用途分類標示，未完成分類不得散會。",
  },

  {
    id: "0425-0750-1",
    day: "0425",
    start: "07:50",
    end: "08:00",
    location: "秘書處",
    people: ["彥儒"],
    task: "領上午場資料",
    detail: "領專題一信封、領據、講師費與交通費，並按場次裝袋。",
  },
  {
    id: "0425-0750-2",
    day: "0425",
    start: "07:50",
    end: "08:20",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "珊淇", "少杰", "晏緹", "彥儒"],
    task: "主場開場前總檢查",
    detail: "司儀確認串場 PPT、迎賓音樂與設備；場控準備時間牌；引導確認簽到退位置；接待備妥信封。",
  },
  {
    id: "0425-0750-3",
    day: "0425",
    start: "07:50",
    end: "08:20",
    location: "DG308",
    people: ["庭葰", "圓庭", "欣樺", "欣愉"],
    task: "同步教室預備",
    detail: "預備投影、音量、網路與主持，主場八成滿時開始引導觀眾移往 DG308。",
  },
  {
    id: "0425-0820-1",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "一樓國際會議廳",
    people: ["少杰", "晏緹"],
    task: "開幕式場前引導",
    detail: "一人一邊引導入座、提醒簽到、觀察滿座率，必要時通知 DG308 分流，準點關門。",
  },
  {
    id: "0425-0820-2",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "一樓國際會議廳",
    people: ["珊淇"],
    task: "開幕式場前場控",
    detail: "接待貴賓、放好提示牌、確認合照時點與時間提醒方式。",
  },
  {
    id: "0425-0820-3",
    day: "0425",
    start: "08:20",
    end: "08:50",
    location: "DG308",
    people: ["庭葰", "圓庭", "欣樺", "欣愉"],
    task: "DG308 場前待命",
    detail: "一樓八成滿時開始主持與控流，維持同步教室秩序。",
  },
  {
    id: "0425-0830-1",
    day: "0425",
    start: "08:30",
    end: "08:50",
    location: "一樓國際會議廳",
    people: ["彥儒"],
    task: "接專題一講者與主持",
    detail: "預留第一排座位、接待講者與主持、攜帶領據信封並簡介環境。",
  },
  {
    id: "0425-0850-1",
    day: "0425",
    start: "08:50",
    end: "09:27",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "珊淇", "少杰", "晏緹"],
    task: "開幕式進行",
    detail: "司儀主持開幕與貴賓致詞；場控舉牌；引導遞麥、維持走道與協助合照動線。",
  },
  {
    id: "0425-0927-1",
    day: "0425",
    start: "09:27",
    end: "09:30",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "少杰", "晏緹"],
    task: "開幕式轉專題一",
    detail: "完成大合照後，引導貴賓離場並重新安排專題一觀眾入座。",
  },
  {
    id: "0425-0930-1",
    day: "0425",
    start: "09:30",
    end: "11:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "珊淇", "少杰", "晏緹"],
    task: "專題演講（一）",
    detail: "主持專題一、場控舉牌、引導控流與 Q&A 遞麥。",
  },
  {
    id: "0425-0930-2",
    day: "0425",
    start: "09:30",
    end: "11:00",
    location: "DG308",
    people: ["庭葰", "圓庭", "欣樺", "欣愉"],
    task: "DG308 同步教室運作",
    detail: "主持同步教室、提醒簽到退並維持現場秩序。",
  },
  {
    id: "0425-1040-1",
    day: "0425",
    start: "10:40",
    end: "11:00",
    location: "一樓國際會議廳",
    people: ["珈瑤", "詩涵"],
    task: "專題一暗樁提問待命",
    detail: "若 Q&A 現場無人提問，主動支援發問避免冷場。",
  },
  {
    id: "0425-1100-1",
    day: "0425",
    start: "11:00",
    end: "11:20",
    location: "一樓國際會議廳、秘書處",
    people: ["彥儒", "少杰", "晏緹", "碩誠", "慧玟", "庭葰", "圓庭"],
    task: "專題一場後與茶敘導流",
    detail: "回收領據與拍照回報、門口控流、舉簽退牌，並提醒會員大會即將開始、引導至茶敘。",
  },
  {
    id: "0425-1115-1",
    day: "0425",
    start: "11:15",
    end: "12:20",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "敬婷", "品叡"],
    task: "會員大會",
    detail: "司儀負責時間提醒、開場與收尾；引導協助觀眾入場、提醒簽到與禁止飲食。",
  },
  {
    id: "0425-1220-1",
    day: "0425",
    start: "12:20",
    end: "13:00",
    location: "秘書處",
    people: ["詩璇", "曉琳", "杏昀", "彥儒", "采伃"],
    task: "領下午場資料",
    detail: "領下午場信封、領據、講師費與交通費，按場次裝袋。",
  },
  {
    id: "0425-1220-2",
    day: "0425",
    start: "12:20",
    end: "13:00",
    location: "宗輔室、系上空間",
    people: ["全體"],
    task: "午餐與輪流休息",
    detail: "全體工作人員輪流用餐，並保持下午場次準備進度。",
  },
  {
    id: "0425-1230-1",
    day: "0425",
    start: "12:30",
    end: "13:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "詩璇", "敬婷", "品叡"],
    task: "法律課程場前",
    detail: "司儀準備串場與設備、場控備妥提示牌、接待講者與主持、引導觀眾進場並視滿座情況啟動 DG308。",
  },
  {
    id: "0425-1230-2",
    day: "0425",
    start: "12:30",
    end: "13:00",
    location: "DG308",
    people: ["彥儒", "琬晴", "庭葰", "圓庭"],
    task: "法律課程同步待命",
    detail: "主場八成滿時開始主持 DG308、引導觀眾與控流。",
  },
  {
    id: "0425-1300-1",
    day: "0425",
    start: "13:00",
    end: "14:00",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "詩璇", "敬婷", "品叡", "宥伶"],
    task: "法律課程進行",
    detail: "主持、場控、引導 Q&A 遞麥與暗樁待命。",
  },
  {
    id: "0425-1300-2",
    day: "0425",
    start: "13:00",
    end: "14:00",
    location: "DG308",
    people: ["庭葰", "圓庭", "彥儒", "琬晴"],
    task: "法律課程同步教室",
    detail: "主持同步現場、提醒簽到退與維持秩序。",
  },

  {
    id: "0425-1330-1",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "二樓國際會議廳",
    people: ["曉琳", "婧蓉", "庭葰", "圓庭", "筠婷", "子媛"],
    task: "行動心理師工作坊",
    detail: "接待、主持、場控與引導完整配置，含抽題、舉牌與場後簽退。",
  },
  {
    id: "0425-1330-2",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD169",
    people: ["杏昀", "欣愉", "晏緹", "Nancy", "欣樺"],
    task: "創傷工作坊",
    detail: "接待講者、場控舉牌、引導入座與場後簽退疏散。",
  },
  {
    id: "0425-1330-3",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD168",
    people: ["少杰", "霖萱"],
    task: "AI難以（一）",
    detail: "引導入座、場控計時與舉牌。",
  },
  {
    id: "0425-1330-4",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD167",
    people: ["昱瑄", "宣亞"],
    task: "花蓮工作坊",
    detail: "引導與場控配置，負責入座、舉牌與散場。",
  },
  {
    id: "0425-1330-5",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD203",
    people: ["惟謙", "詠棋"],
    task: "到宅心理",
    detail: "引導觀眾、場控計時與場後簽退提醒。",
  },
  {
    id: "0425-1330-6",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD204",
    people: ["可芸", "文伶"],
    task: "程序監理：角色",
    detail: "引導與場控配置，負責簽到退提醒與時間控制。",
  },
  {
    id: "0425-1330-7",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD215",
    people: ["雅雯", "敏瑄"],
    task: "CBME 現況",
    detail: "引導入座、場控時間提醒與散場簽退。",
  },
  {
    id: "0425-1330-8",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD214",
    people: ["宥伶", "衣伶"],
    task: "數位成癮",
    detail: "引導與場控配置，負責場前入座與場中舉牌。",
  },
  {
    id: "0425-1330-9",
    day: "0425",
    start: "13:30",
    end: "15:30",
    location: "MD213",
    people: ["邑嘉", "珊淇"],
    task: "安寧",
    detail: "引導與場控配置，負責入座、計時與場後簽退。",
  },
  {
    id: "0425-1530-1",
    day: "0425",
    start: "15:30",
    end: "15:50",
    location: "各教室",
    people: ["各教室原班人員"],
    task: "場後固定四步",
    detail: "提醒簽退 → 確認講者都有簽領據 → 領據回信封 → 換下一場 PPT／收教室。",
  },
  {
    id: "0425-1520-1",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "二樓國際會議廳",
    people: ["彥儒", "婧蓉", "庭葰", "圓庭", "筠婷", "子媛"],
    task: "治療所工作坊",
    detail: "接待、主持、場控與引導完整配置。",
  },
  {
    id: "0425-1520-2",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD169",
    people: ["采伃", "詩璇", "Nancy", "晏緹"],
    task: "資訊操弄研討會",
    detail: "接待講者、引導入座、場控舉牌與場後回收。",
  },
  {
    id: "0425-1520-3",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD168",
    people: ["少杰", "霖萱"],
    task: "AI難以（二）",
    detail: "引導與場控配置，負責入座與舉牌。",
  },
  {
    id: "0425-1520-4",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD167",
    people: ["昱瑄", "宣亞"],
    task: "公共安全工作坊",
    detail: "引導與場控配置，負責入座與散場。",
  },
  {
    id: "0425-1520-5",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD203",
    people: ["惟謙", "詠棋"],
    task: "人工智慧研討會",
    detail: "引導與場控配置，負責場內秩序與時間控制。",
  },
  {
    id: "0425-1520-6",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD204",
    people: ["可芸", "文伶"],
    task: "程序監理：實作",
    detail: "引導與場控配置，負責舉牌與簽退疏散。",
  },
  {
    id: "0425-1520-7",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD215",
    people: ["雅雯", "敏瑄"],
    task: "CBME：反思",
    detail: "引導與場控配置，負責入座與時間控制。",
  },
  {
    id: "0425-1520-8",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD214",
    people: ["宥伶", "衣伶"],
    task: "戒癮",
    detail: "引導與場控配置，負責入座與舉牌。",
  },
  {
    id: "0425-1520-9",
    day: "0425",
    start: "15:20",
    end: "17:20",
    location: "MD213",
    people: ["全體"],
    task: "4/25 場後收尾",
    detail: "各教室場復、確認領據已交學會秘書、提示牌放回宗輔室。",
  },

  {
    id: "0426-0830-1",
    day: "0426",
    start: "08:30",
    end: "08:45",
    location: "秘書處",
    people: ["利亞", "宥伶"],
    task: "領大師對談資料",
    detail: "領上午場信封、領據、講師費與交通費，按場次裝袋。",
  },
  {
    id: "0426-0845-1",
    day: "0426",
    start: "08:45",
    end: "09:30",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "利亞", "欣愉", "敬婷", "岳哲"],
    task: "大師對談場前",
    detail: "司儀準備串場與設備、場控備妥時間牌、接待講者與主持、引導觀眾入座。",
  },
  {
    id: "0426-0930-1",
    day: "0426",
    start: "09:30",
    end: "10:30",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "敬婷", "岳哲", "孟熹", "瀚淳"],
    task: "大師對談進行",
    detail: "主持、場控舉牌、觀眾遞麥與暗樁提問支援。",
  },
  {
    id: "0426-1030-1",
    day: "0426",
    start: "10:30",
    end: "10:50",
    location: "一樓國際會議廳、秘書處",
    people: ["敬婷", "岳哲", "利亞", "欣愉", "碩誠", "慧玟"],
    task: "大師對談場後與茶敘",
    detail: "引導簽退與控流、拍照回報與交件，並提醒 10:50 專題三即將開始。",
  },
  {
    id: "0426-1030-2",
    day: "0426",
    start: "10:30",
    end: "10:50",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "宥伶", "詩璇", "敬婷", "岳哲"],
    task: "專題演講（三）場前",
    detail: "司儀準備設備、場控說明提醒牌、接待講者、引導觀眾入座。",
  },
  {
    id: "0426-1050-1",
    day: "0426",
    start: "10:50",
    end: "12:20",
    location: "一樓國際會議廳",
    people: ["碩誠", "慧玟", "惟謙", "敬婷", "岳哲", "鄭晴"],
    task: "專題演講（三）",
    detail: "主持、場控舉牌、遞麥與暗樁提問。",
  },
  {
    id: "0426-1220-1",
    day: "0426",
    start: "12:20",
    end: "12:40",
    location: "報到處與一樓國際會議廳",
    people: ["利亞", "詩璇", "少杰", "海茵", "碩誠", "慧玟", "庭葰", "圓庭"],
    task: "頒獎典禮",
    detail: "接待得獎者、主持頒獎、遞獎狀與獎盃、引導上台動線與散場。",
  },
  {
    id: "0426-1240-1",
    day: "0426",
    start: "12:40",
    end: "13:30",
    location: "宗輔室、系上空間",
    people: ["全體"],
    task: "午餐與下午場準備",
    detail: "部分人員至秘書處領下午場資料，其餘人員輪流用餐並準備論壇與專題四。",
  },
  {
    id: "0426-1240-2",
    day: "0426",
    start: "12:40",
    end: "13:00",
    location: "秘書處",
    people: ["宥伶", "詩璇"],
    task: "領下午場資料",
    detail: "領下午場信封、領據、講師費與交通費，按場次裝袋。",
  },
  {
    id: "0426-1300-1",
    day: "0426",
    start: "13:00",
    end: "13:30",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "珊淇", "宥伶", "杏昀", "少杰", "Nancy"],
    task: "專題論壇場前",
    detail: "司儀準備設備、場控備妥時間牌、接待講者與主持、引導觀眾進場。",
  },
  {
    id: "0426-1330-1",
    day: "0426",
    start: "13:30",
    end: "15:00",
    location: "二樓國際會議廳",
    people: ["庭葰", "圓庭", "珊淇", "少杰", "Nancy"],
    task: "專題論壇進行",
    detail: "主持、場控舉牌、Q&A 遞麥，必要時由主持啟動預備問題。",
  },
  {
    id: "0426-1330-2",
    day: "0426",
    start: "13:30",
    end: "14:00",
    location: "一樓國際會議廳",
    people: ["慧玟", "碩誠", "惟謙", "曉琳", "衣伶", "政璋老師", "敬婷", "岳哲"],
    task: "專題演講（四）場前",
    detail: "司儀準備設備、場控備妥時間牌、接待講者與主持、引導入座。",
  },
  {
    id: "0426-1400-1",
    day: "0426",
    start: "14:00",
    end: "15:00",
    location: "一樓國際會議廳",
    people: ["慧玟", "碩誠", "惟謙", "敬婷", "岳哲", "可芸", "雅雯"],
    task: "專題演講（四）",
    detail: "主持、場控舉牌、Q&A 遞麥與暗樁提問。",
  },
  {
    id: "0426-1500-1",
    day: "0426",
    start: "15:00",
    end: "15:20",
    location: "二樓國際會議廳、一樓國際會議廳",
    people: ["少杰", "Nancy", "宥伶", "杏昀", "庭葰", "圓庭", "敬婷", "岳哲", "曉琳", "慧玟", "碩誠"],
    task: "論壇與專題四場後茶敘",
    detail: "門口控流、簽退提醒、拍照回報並提醒 15:20 平行場次開始。",
  },
  {
    id: "0426-1500-2",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD215",
    people: ["詩璇", "晏緹", "Nancy"],
    task: "沙遊",
    detail: "接待、場控與引導，注意人數上限 40。",
  },
  {
    id: "0426-1500-3",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD169",
    people: ["少杰", "霖萱"],
    task: "社會情緒",
    detail: "引導入座與場控舉牌。",
  },
  {
    id: "0426-1500-4",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD168",
    people: ["昱瑄", "宣亞"],
    task: "問題放回關係",
    detail: "引導入座與場控時間提醒。",
  },
  {
    id: "0426-1500-5",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD203",
    people: ["惟謙", "詠棋"],
    task: "AI 時代存在焦慮",
    detail: "引導入座與場控舉牌。",
  },
  {
    id: "0426-1500-6",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD204",
    people: ["可芸", "文伶"],
    task: "照會實務演練",
    detail: "引導入座與場控時間提醒。",
  },
  {
    id: "0426-1500-7",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD214",
    people: ["雅雯", "敏瑄"],
    task: "詐病",
    detail: "引導入座與場控時間提醒。",
  },
  {
    id: "0426-1500-8",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD213",
    people: ["宥伶", "衣伶"],
    task: "實驗心理病理",
    detail: "引導入座與場控時間提醒。",
  },
  {
    id: "0426-1500-9",
    day: "0426",
    start: "15:00",
    end: "16:50",
    location: "MD212",
    people: ["子媛", "筠婷"],
    task: "口頭報告",
    detail: "引導入座與場控時間提醒。",
  },
  {
    id: "0426-1650-1",
    day: "0426",
    start: "16:50",
    end: "17:20",
    location: "各教室 → 宗輔室",
    people: ["全體"],
    task: "最後收尾",
    detail: "講者簽領據→領據放信封→信封交學會秘書並拍照回報→教室恢復原狀並拍照回報→提示牌放回宗輔室。",
  },
];

const allPeople = Array.from(
  new Set(
    duties
      .flatMap((d) => d.people)
      .filter(
        (name) =>
          ![
            "全體",
            "各教室原班人員",
            "各室原班人員",
            "各場次引導人員",
          ].includes(name)
      )
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.2fr 1fr 1fr auto",
              gap: 12,
            }}
          >
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPickedPerson("");
              }}
              placeholder="輸入姓名搜尋，例如：詩璇"
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid #cfc7bc",
                background: "#fffdf9",
                fontSize: 15,
              }}
            />
            <select
              value={pickedPerson}
              onChange={(e) => {
                setPickedPerson(e.target.value);
                setQuery("");
              }}
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid #cfc7bc",
                background: "#fffdf9",
                fontSize: 15,
              }}
            >
              <option value="">直接選人員</option>
              {allPeople.map((person) => (
                <option key={person} value={person}>
                  {person}
                </option>
              ))}
            </select>
            <select
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value as DayKey)}
              style={{
                padding: "12px 14px",
                borderRadius: 14,
                border: "1px solid #cfc7bc",
                background: "#fffdf9",
                fontSize: 15,
              }}
            >
              {dayOptions.map((day) => (
                <option key={day.key} value={day.key}>
                  {day.label}
                </option>
              ))}
            </select>
            <button
              onClick={() => setShowGroupSection((v) => !v)}
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "none",
                background: "#53677a",
                color: "#fff",
                fontSize: 15,
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              {showGroupSection ? "隱藏組別說明" : "顯示組別說明"}
            </button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "24px 20px 40px" }}>
        {showGroupSection && (
          <div
            style={{
              background: "#fffdf9",
              border: "1px solid #e2d9cd",
              borderRadius: 24,
              padding: 20,
              marginBottom: 24,
              boxShadow: "0 8px 24px rgba(51,60,69,0.06)",
            }}
          >
            <div style={{ fontSize: 22, fontWeight: 800, marginBottom: 14 }}>各組工作內容</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 16 }}>
              {groupDescriptions.map((group) => (
                <button
                  key={group.name}
                  onClick={() => setSelectedGroup(group.name)}
                  style={{
                    padding: "10px 14px",
                    borderRadius: 999,
                    border: selectedGroup === group.name ? "none" : "1px solid #d3c8bb",
                    background: selectedGroup === group.name ? "#53677a" : "#fff",
                    color: selectedGroup === group.name ? "#fff" : "#425466",
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  {group.name}
                </button>
              ))}
            </div>

            {groupDescriptions
              .filter((group) => group.name === selectedGroup)
              .map((group) => (
                <div key={group.name}>
                  <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 10 }}>{group.name}</div>
                  <ul style={{ margin: 0, paddingLeft: 20, lineHeight: 1.8 }}>
                    {group.items.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        )}

        {!!activePerson && (
          <div
            style={{
              background: "#eef3f7",
              border: "1px solid #d5e0e8",
              borderRadius: 20,
              padding: 18,
              marginBottom: 22,
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 8 }}>
              {activePerson} 的跨日任務總覽
            </div>
            {groupedAllDays.every((group) => group.items.length === 0) ? (
              <div style={{ color: "#6b7280" }}>查無此人員的任務資料。</div>
            ) : (
              <div style={{ display: "grid", gap: 14 }}>
                {groupedAllDays.map((group) => (
                  <div key={group.key}>
                    <div style={{ fontWeight: 700, marginBottom: 6 }}>{group.label}</div>
                    {group.items.length === 0 ? (
                      <div style={{ color: "#7b8794", fontSize: 14 }}>沒有任務</div>
                    ) : (
                      <div style={{ display: "grid", gap: 8 }}>
                        {group.items.map((item) => (
                          <div
                            key={item.id}
                            style={{
                              background: "#fff",
                              borderRadius: 14,
                              padding: "10px 12px",
                              border: "1px solid #dbe4ea",
                            }}
                          >
                            <div style={{ fontWeight: 700 }}>
                              {item.start}–{item.end}｜{item.task}
                            </div>
                            <div style={{ fontSize: 14, color: "#667085" }}>{item.location}</div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        <div style={{ display: "grid", gap: 14 }}>
          {visibleDuties.length === 0 ? (
            <div
              style={{
                background: "#fffdf9",
                border: "1px solid #e2d9cd",
                borderRadius: 20,
                padding: 24,
                color: "#6b7280",
              }}
            >
              這一天沒有符合條件的任務。
            </div>
          ) : (
            visibleDuties.map((duty) => (
              <div
                key={duty.id}
                style={{
                  background: "#fffdf9",
                  border: "1px solid #e2d9cd",
                  borderRadius: 22,
                  padding: 18,
                  boxShadow: "0 10px 24px rgba(51,60,69,0.05)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 10,
                  }}
                >
                  <div
                    style={{
                      background: "#53677a",
                      color: "#fff",
                      borderRadius: 999,
                      padding: "6px 10px",
                      fontWeight: 700,
                      fontSize: 14,
                    }}
                  >
                    {duty.start}–{duty.end}
                  </div>
                  <div style={{ fontSize: 20, fontWeight: 800 }}>{duty.task}</div>
                </div>

                <div style={{ marginBottom: 8, color: "#586574" }}>📍 {duty.location}</div>
                <div style={{ marginBottom: 10, color: "#586574" }}>
                  👥 {duty.people.join("、")}
                </div>
                <div style={{ lineHeight: 1.75 }}>{duty.detail}</div>
                {duty.backup && (
                  <div
                    style={{
                      marginTop: 12,
                      background: "#f7f1e7",
                      border: "1px solid #eadfcf",
                      borderRadius: 14,
                      padding: "10px 12px",
                      color: "#6e5d43",
                    }}
                  >
                    備案：{duty.backup}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
