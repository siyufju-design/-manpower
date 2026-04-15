import React, { useMemo, useState } from "react";

// 定義日期與任務型別
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

// 根據檔案「二、各組工作內容」整理 [cite: 12]
const groupDescriptions = [
  {
    name: "講者接待組",
    items: [
      "領取物資：上午場 07:30 / 下午場 12:20 (D1) 12:40 (D2) 至秘書處領取講師費與領據 [cite: 16]。",
      "前置作業：場次前 30 分鐘開檔 (PPT/影片)，並以 USB 備份 [cite: 17, 93]。",
      "現場接待：確認第一排預留位，帶領講者入座並介紹環境 [cite: 18, 19, 20]。",
      "行政收尾：場前請講者簽領據，拍照回傳群組相簿後交回秘書處 [cite: 21, 22]。",
    ],
  },
  {
    name: "司儀",
    items: [
      "事前演練：4/24 15:00-18:00 至一二樓會議廳演練講稿 [cite: 24]。",
      "場控執行：場次前 30 分鐘測試設備，播放串場 PPT 與音樂 [cite: 25, 26]。",
      "流程主持：負責開場、介紹活動、遞麥克風給致詞貴賓或提問觀眾 [cite: 27, 28, 36]。",
      "頒獎典禮：引導拍合照並遞送獎狀與獎盃 [cite: 29, 73]。",
    ],
  },
  {
    name: "引導人員",
    items: [
      "座位管控：國際會議廳兩側一人一邊，引導觀眾「往前、往中間坐」 [cite: 32, 47]。",
      "簽到提醒：提醒簽到 QR code 位置；散場時舉牌提醒簽退 [cite: 32, 37, 49]。",
      "滿座分流：第一天座位達 8 成滿時，於大群通知並引導觀眾往 DG308 同步教室 [cite: 34, 48]。",
      "動線維護：準點關門，引導頒獎典禮獲獎來賓上台動線 [cite: 33, 35]。",
    ],
  },
  {
    name: "場控",
    items: [
      "物資領取：場次前 30 分鐘領取時間提示牌 (4個) 與簽退提示牌 [cite: 40, 51]。",
      "時間管理：場前與講者確認提醒方式。提前 30-60 秒舉牌（倒數10/5/1分鐘、時間到） [cite: 42, 44, 52]。",
      "研討會工作：需於黑板書寫簽到退提醒，並協助場復與更換 PPT [cite: 51, 54]。",
    ],
  },
  {
    name: "機動/暗樁",
    items: [
      "機動任務：4/25 開幕式、Keynote 1 與法律課程期間，於 DG308 協助引導入座 [cite: 56]。",
      "提問暗樁：重要場次若現場無人提問，需主動發問以避免冷場 [cite: 59]。",
    ],
  },
];

// 完整排班資料 [cite: 61, 63, 65, 67, 69, 71, 73, 75]
const duties: Duty[] = [
  // 4/24 (五) 前置作業
  { id: "0424-1", day: "0424", start: "15:00", end: "15:30", location: "宗輔室", people: ["碩誠", "慧玟", "庭葰", "圓庭", "惟謙", "珊淇", "宥伶", "詩璇", "婧蓉", "欣愉", "彥儒", "杏昀", "采伃", "曉琳"], task: "物資說明與分發", detail: "確認領據信封、提醒牌、USB、立牌等物資位置 [cite: 61]。", backup: "缺件由彥儒、宥伶協助補印 [cite: 61]。" },
  { id: "0424-2", day: "0424", start: "15:30", end: "16:00", location: "一樓國際會議廳", people: ["碩誠", "慧玟", "惟謙", "珊淇"], task: "主場巡檢", detail: "測試投影、麥克風、Zoom 網路、燈光與試舉提示牌 [cite: 61]。" },
  { id: "0424-3", day: "0424", start: "15:30", end: "16:00", location: "各教室", people: ["宥伶", "詩璇", "婧蓉", "欣愉", "彥儒", "杏昀", "采伃", "曉琳"], task: "PPT 下載與備份", detail: "下載雲端 PPT 並存入 USB 備份，檔名統一「日期_場次_講者」 [cite: 61]。" },
  { id: "0424-4", day: "0424", start: "16:00", end: "17:00", location: "一、二樓會議廳", people: ["碩誠", "慧玟", "庭葰", "圓庭"], task: "主持流程演練", detail: "司儀演練開場、遞麥、結語流程，確認最終主持稿 [cite: 61]。" },
  
  // 4/25 (六) 
  { id: "0425-1", day: "0425", start: "07:50", end: "08:00", location: "秘書處", people: ["彥儒"], task: "領取上午資料", detail: "領取專題（一）信封、講師費與領據 [cite: 63]。" },
  { id: "0425-2", day: "0425", start: "08:20", end: "08:50", location: "一樓國際會議廳", people: ["少杰", "晏緹"], task: "開幕式入場引導", detail: "走道引導入座，滿 8 成通知大群。準點關門 [cite: 65]。" },
  { id: "0425-3", day: "0425", start: "08:50", end: "09:27", location: "一樓國際會議廳", people: ["碩誠", "慧玟", "珊淇"], task: "開幕式主持與場控", detail: "控制致詞節奏。場控提前舉牌（倒數1分、時間到） [cite: 65]。" },
  { id: "0425-4", day: "0425", start: "09:30", end: "11:00", location: "一樓國際會議廳", people: ["碩誠", "慧玟", "楊老師"], task: "專題演講（一）", detail: "主持將棒子交給楊老師。10:20 準備 Zoom 預錄影片連線 [cite: 65]。" },
  { id: "0425-5", day: "0425", start: "13:00", end: "14:00", location: "一樓國際會議廳", people: ["碩誠", "慧玟", "惟謙", "詩璇", "敬婷", "品叡"], task: "專題演講（二）法律課程", detail: "吳院長演講場控與接待。同步教室 DG308 由彥儒、琬晴負責 [cite: 67]。" },
  { id: "0425-6", day: "0425", start: "14:00", end: "15:30", location: "各研討會教室", people: ["全體"], task: "平行場次執行", detail: "各教室原班人馬執行：行動心理師 (2F)、創傷 (169)、AI (168) 等 [cite: 69]。" },
  
  // 4/26 (日)
  { id: "0426-1", day: "0426", start: "08:30", end: "08:45", location: "秘書處", people: ["利亞", "宥伶"], task: "領取大師對談資料", detail: "領取上午場資料袋並按場次裝袋 [cite: 73]。" },
  { id: "0426-2", day: "0426", start: "09:30", end: "10:30", location: "一樓國際會議廳", people: ["碩誠", "慧玟", "惟謙", "利亞", "欣愉", "敬婷", "岳哲"], task: "大師對談執行", detail: "主持 Q&A 與接待。暗樁孟熹、瀚淳預備提問 [cite: 73]。" },
  { id: "0426-3", day: "0426", start: "12:20", end: "12:40", location: "一樓國際會議廳", people: ["碩誠", "慧玟", "庭葰", "圓庭", "少杰", "海茵"], task: "頒獎典禮主持", detail: "司儀主持，庭葰、圓庭遞獎狀；少杰、海茵引導動線 [cite: 73]。" },
  { id: "0426-4", day: "0426", start: "13:30", end: "15:00", location: "二樓會議廳", people: ["庭葰", "圓庭", "珊淇", "少杰", "Nancy", "宥伶", "杏昀"], task: "專題論壇執行", detail: "接待林家如心理師。無人提問時由司儀啟動預設問題 [cite: 75]。" },
  { id: "0426-5", day: "0426", start: "15:20", end: "16:50", location: "MD215", people: ["詩璇", "晏緹", "Nancy"], task: "沙遊工作坊", detail: "注意人數上限 40 人。場控場前確認時間提醒位置 [cite: 75]。" },
  { id: "0426-6", day: "0426", start: "16:50", end: "17:20", location: "全校區", people: ["全體"], task: "總場復", detail: "資料回收宗輔室。組長清點點位淨空後方可離開 [cite: 75]。" },
];

const allPeople = Array.from(
  new Set(
    duties
      .flatMap((d) => d.people)
      .filter((name) => !["全體", "楊老師", "各教室原班人員"].includes(name))
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

  const activePerson = pickedPerson || query.trim();

  // 當前日期過濾
  const visibleDuties = useMemo(() => {
    const dayItems = duties
      .filter((d) => d.day === selectedDay)
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));

    if (!activePerson) return dayItems;
    return dayItems.filter((d) => d.people.some((name) => name.includes(activePerson)));
  }, [selectedDay, activePerson]);

  // 個人全日期排班查詢
  const groupedAllDays = useMemo(() => {
    if (!activePerson) return [];
    const map = new Map<DayKey, Duty[]>();
    duties
      .filter((d) => d.people.some((name) => name.includes(activePerson)))
      .forEach((d) => {
        if (!map.has(d.day)) map.set(d.day, []);
        map.get(d.day)!.push(d);
      });
    return dayOptions.map(day => ({
      ...day,
      items: (map.get(day.key) || []).sort((a, b) => toMinutes(a.start) - toMinutes(b.start))
    }));
  }, [activePerson]);

  return (
    <div style={{ minHeight: "100vh", background: "#f8f5f0", color: "#2d3a4b", fontFamily: "system-ui" }}>
      {/* 標題欄 */}
      <header style={{ position: "sticky", top: 0, zIndex: 10, background: "rgba(248, 245, 240, 0.9)", backdropFilter: "blur(10px)", borderBottom: "1px solid #e0d9cf", padding: "16px 20px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: 22, margin: 0, fontWeight: 800 }}>議程組任務查詢 <span style={{ fontSize: 14, fontWeight: 400, color: "#7e858d" }}>2026 台臨心年會</span></h1>
          <div style={{ display: "flex", gap: 8 }}>
            {dayOptions.map(day => (
              <button 
                key={day.key}
                onClick={() => setSelectedDay(day.key)}
                style={{ 
                  padding: "6px 12px", borderRadius: 8, border: "1px solid #d8d0c5",
                  background: selectedDay === day.key ? "#4a6278" : "#fff",
                  color: selectedDay === day.key ? "#fff" : "#4a6278",
                  cursor: "pointer", fontSize: 14, fontWeight: 600
                }}
              >{day.label}</button>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "20px auto", padding: "0 20px" }}>
        {/* 小組 SOP */}
        <section style={{ background: "#fff", borderRadius: 16, border: "1px solid #e0d9cf", padding: 20, marginBottom: 20 }}>
          <button 
            onClick={() => setShowGroupSection(!showGroupSection)}
            style={{ width: "100%", background: "none", border: "none", display: "flex", justifyContent: "space-between", fontSize: 18, fontWeight: 700, cursor: "pointer", color: "#2d3a4b" }}
          >
            📋 各小組工作 SOP {showGroupSection ? "▲" : "▼"}
          </button>
          {showGroupSection && (
            <div style={{ marginTop: 15 }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                {groupDescriptions.map(g => (
                  <button 
                    key={g.name}
                    onClick={() => setSelectedGroup(g.name)}
                    style={{ padding: "4px 10px", borderRadius: 99, border: "1px solid #d8d0c5", background: selectedGroup === g.name ? "#cad6d2" : "#f1ede7", fontSize: 13, cursor: "pointer" }}
                  >{g.name}</button>
                ))}
              </div>
              <div style={{ padding: 15, background: "#fbf9f6", borderRadius: 12, border: "1px solid #e0d9cf" }}>
                <h3 style={{ margin: "0 0 10px 0", color: "#4a6278" }}>{selectedGroup} 職責</h3>
                <ul style={{ paddingLeft: 20, lineHeight: 1.6, color: "#5a6a7a" }}>
                  {groupDescriptions.find(g => g.name === selectedGroup)?.items.map((it, idx) => (
                    <li key={idx} style={{ marginBottom: 6 }}>{it}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </section>

        {/* 搜尋欄 */}
        <section style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 15, marginBottom: 20 }}>
          <div style={{ background: "#fff", padding: 15, borderRadius: 16, border: "1px solid #e0d9cf" }}>
            <label style={{ display: "block", fontSize: 13, color: "#868c92", marginBottom: 8 }}>搜尋姓名</label>
            <input 
              value={query}
              onChange={(e) => { setQuery(e.target.value); setPickedPerson(""); }}
              placeholder="例：碩誠"
              style={{ width: "100%", padding: "10px", borderRadius: 8, border: "1px solid #d8d0c5", fontSize: 15 }}
            />
          </div>
          <div style={{ background: "#fff", padding: 15, borderRadius: 16, border: "1px solid #e0d9cf" }}>
            <label style={{ display: "block", fontSize: 13, color: "#868c92", marginBottom: 8 }}>快速選取人員</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxHeight: 80, overflowY: "auto" }}>
              {allPeople.map(p => (
                <button 
                  key={p} 
                  onClick={() => { setPickedPerson(p); setQuery(p); }}
                  style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid #d8d0c5", background: activePerson === p ? "#cad6d2" : "#f1ede7", fontSize: 12, cursor: "pointer" }}
                >{p}</button>
              ))}
            </div>
          </div>
        </section>

        {/* 查詢結果 */}
        {activePerson ? (
          <section>
            <h2 style={{ fontSize: 20, marginBottom: 15 }}>🔎 {activePerson} 的個人班表</h2>
            {groupedAllDays.map(day => (
              <div key={day.key} style={{ marginBottom: 15 }}>
                <div style={{ fontWeight: 700, background: "#eee", padding: "4px 12px", borderRadius: 6, marginBottom: 10 }}>{day.label}</div>
                {day.items.length === 0 ? (
                  <div style={{ padding: "10px 12px", color: "#999", fontSize: 14 }}>本日無排班。</div>
                ) : (
                  day.items.map(item => (
                    <div key={item.id} style={{ background: "#fff", padding: 15, borderRadius: 12, border: "1px solid #e0d9cf", marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                        <span style={{ fontWeight: 800, color: "#4a6278" }}>{item.start} - {item.end}</span>
                        <span style={{ fontSize: 13, color: "#868c92" }}>📍 {item.location}</span>
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{item.task}</div>
                      <div style={{ fontSize: 14, color: "#5a6a7a", lineHeight: 1.5 }}>{item.detail}</div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </section>
        ) : (
          <section>
            <h2 style={{ fontSize: 20, marginBottom: 15 }}>📅 {dayOptions.find(d => d.key === selectedDay)?.label} 全部行程</h2>
            {visibleDuties.map(item => (
              <div key={item.id} style={{ background: "#fff", padding: 15, borderRadius: 12, border: "1px solid #e0d9cf", marginBottom: 10 }}>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
                  <span style={{ background: "#e8f0f7", color: "#3a6a9a", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>{item.start} - {item.end}</span>
                  <span style={{ background: "#f7f0e8", color: "#9a6a3a", padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>{item.location}</span>
                </div>
                <div style={{ fontWeight: 800, fontSize: 17, marginBottom: 4 }}>{item.task}</div>
                <p style={{ margin: "0 0 8px 0", fontSize: 14, color: "#5a6a7a" }}>{item.detail}</p>
                <div style={{ fontSize: 12, color: "#999" }}>人員：{item.people.join("、")}</div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}