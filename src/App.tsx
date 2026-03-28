import React, { useMemo, useState } from "react";

type DayKey = "day1" | "day2";
type SessionType = "專題演講" | "實務工作坊" | "學術研討會" | "開放式議程" | "研究生代表會" | "大師對談" | "會員大會" | "專題論壇" | "口頭報告";

type Session = {
  id: string;
  day: DayKey;
  title: string;
  speaker: string;
  start: string;
  end: string;
  room: string;
  track: string;
  type: SessionType;
  description: string;
  note?: string;
};

const dayOptions = [
  { key: "day1" as const, label: "DAY 1", date: "115.04.25（星期六）" },
  { key: "day2" as const, label: "DAY 2", date: "115.04.26（星期日）" },
];

const typeColors: Record<SessionType, { bg: string; text: string; border: string }> = {
  專題演講: { bg: "#c8d5d1", text: "#425a52", border: "#b3c4be" },
  實務工作坊: { bg: "#d9c8bc", text: "#6a5648", border: "#cdb7a8" },
  學術研討會: { bg: "#c9d4df", text: "#495d72", border: "#b3c1cf" },
  開放式議程: { bg: "#ddd8d1", text: "#5f5a54", border: "#cfc8bf" },
  研究生代表會: { bg: "#d7cfdf", text: "#5d556a", border: "#c7bdd1" },
  大師對談: { bg: "#c7d8cc", text: "#47614f", border: "#b3c8ba" },
  會員大會: { bg: "#d8d1c2", text: "#675e4e", border: "#cbc1ad" },
  專題論壇: { bg: "#d4c9c2", text: "#66554a", border: "#c5b5ab" },
  口頭報告: { bg: "#c8d0d8", text: "#4d5c6a", border: "#b3bec8" },
};

const sessions: Session[] = [
  { id: "day1-checkin", day: "day1", title: "報到", speaker: "", start: "08:20", end: "08:50", room: "國璽樓一樓大廳", track: "其他", type: "開放式議程", description: "與會者報到與入場。" },
  { id: "day1-opening", day: "day1", title: "開幕式", speaker: "理事長、長官、貴賓致詞", start: "08:50", end: "09:30", room: "一樓國際會議廳", track: "主會場", type: "開放式議程", description: "理事長、長官與貴賓致詞。" },
  { id: "day1-keynote-1", day: "day1", title: "專題演講（一）｜The Current State of Mental Health Technology and Artificial Intelligence", speaker: "主講人：Dr. Vaile Wright｜主持人：楊建銘", start: "09:30", end: "11:00", room: "一樓國際會議廳", track: "主會場", type: "專題演講", description: "聚焦心理健康科技與人工智慧的現況。" },
  { id: "day1-break-1", day: "day1", title: "中場休息、茶敘交流", speaker: "", start: "11:00", end: "11:20", room: "國璽樓一二樓大廳", track: "其他", type: "開放式議程", description: "中場休息與茶敘交流。" },
  { id: "day1-member-meeting", day: "day1", title: "會員大會", speaker: "", start: "11:20", end: "12:20", room: "一樓國際會議廳", track: "主會場", type: "會員大會", description: "台灣臨床心理學會會員大會。" },
  { id: "day1-grad-sharing", day: "day1", title: "研究生代表會｜實習督導分享（成人精神專長）", speaker: "高振傑 臨床心理師", start: "12:00", end: "13:00", room: "MD214", track: "MD214", type: "研究生代表會", description: "台臨心研究生代表會安排之實習督導分享。" },
  { id: "day1-vendor-1", day: "day1", title: "科技廠商分享會", speaker: "", start: "11:20", end: "13:00", room: "MD167", track: "MD167", type: "開放式議程", description: "科技廠商分享會。" },
  { id: "day1-lunch-poster", day: "day1", title: "午餐休息／壁報論文交流與評審", speaker: "", start: "12:20", end: "13:00", room: "MD171／國璽樓二樓大廳", track: "其他", type: "開放式議程", description: "午餐休息時間，並同步進行壁報論文交流與評審。" },
  { id: "day1-keynote-2-legal", day: "day1", title: "專題演講（二）法律課程｜助人者的界線與法律風險", speaker: "主講人：吳志光｜主持人：黃健", start: "13:00", end: "14:00", room: "一樓國際會議廳", track: "主會場", type: "專題演講", description: "從性平三法修法切入醫療場域的權勢性騷擾議題。" },
  { id: "day1-ws-branding", day: "day1", title: "實務工作坊｜行動心理師的實務挑戰、品牌經營與客群建立", speaker: "主持人：陳牧柔｜講者：黃惠欣、陳牧柔、吳蕙君、張榮斌", start: "14:00", end: "15:30", room: "二樓會議廳", track: "二樓會議廳", type: "實務工作坊", description: "探討行動心理師的實務挑戰與品牌經營。" },
  { id: "day1-ws-psychoanalysis", day: "day1", title: "實務工作坊｜創傷與倒錯－精神分析取向的一些思路", speaker: "主持人：丁耕原｜講者：丁耕原、翁欣凱、盧乃榕", start: "14:00", end: "15:30", room: "MD169", track: "MD169", type: "實務工作坊", description: "從精神分析取向切入創傷與倒錯的臨床思路。" },
  { id: "day1-ws-ai-1", day: "day1", title: "實務工作坊｜AI 難以取代的心療元素（一）", speaker: "主持人：黃天豪｜講者：張惠娟、黃天豪、王佑筠", start: "14:00", end: "15:30", room: "MD168", track: "MD168", type: "實務工作坊", description: "從腦科學到關係轉譯，探討 AI 難以取代的治療元素。" },
  { id: "day1-ws-hualien", day: "day1", title: "實務工作坊｜韌性花蓮－花蓮在地心理工作者的自我療癒經驗", speaker: "主持人：劉瑞楨｜講者：黎士鳴", start: "14:00", end: "15:30", room: "MD167", track: "MD167", type: "實務工作坊", description: "分享花蓮在地心理工作者的自我療癒經驗。" },
  { id: "day1-ws-home-service", day: "day1", title: "實務工作坊｜在非典型場域中建立結構", speaker: "主持人：邱似齡｜講者：鄭幼毅", start: "14:00", end: "15:30", room: "MD203", track: "MD203", type: "實務工作坊", description: "探討到宅心理服務中專業調整與系統整合。" },
  { id: "day1-ws-custody-1", day: "day1", title: "實務工作坊｜親權事件程序監理人：角色", speaker: "主持人：呂信慧｜講者：黃春偉、林欣儀、蘇淑貞", start: "14:00", end: "15:30", room: "MD204", track: "MD204", type: "實務工作坊", description: "聚焦親權事件程序監理人之角色定位。" },
  { id: "day1-symposium-cbme-ai", day: "day1", title: "學術研討會｜CBME導向臨床心理師數位培訓計畫", speaker: "主持人：葉品陽｜講者：張宏業、張明偉、莊雅媜", start: "14:00", end: "15:30", room: "MD215", track: "MD215", type: "學術研討會", description: "介紹 CBME 導向臨床心理師數位培訓計畫的執行現況。" },
  { id: "day1-symposium-digital-addiction", day: "day1", title: "學術研討會｜數位成癮的多層次機制與人工智慧應用", speaker: "主持人：柯慧貞｜講者：李昆樺、張芸瑄、顏碩志、劉羿妮", start: "14:00", end: "15:30", room: "MD214", track: "MD214", type: "學術研討會", description: "從心理歷程與生理訊號整合觀點，探討數位成癮與 AI 應用。" },
  { id: "day1-symposium-palliative", day: "day1", title: "學術研討會｜安寧心腫的實習困境與督導議題", speaker: "主持人：黃文翰｜講者：黃文翰、洪家暐、林亭妤、王韋婷", start: "14:00", end: "15:30", room: "MD213", track: "MD213", type: "學術研討會", description: "探討安寧心腫領域中的實習困境與督導議題。" },
  { id: "day1-break-2", day: "day1", title: "中場休息、茶敘交流", speaker: "", start: "15:30", end: "15:50", room: "國璽樓一二樓大廳", track: "其他", type: "開放式議程", description: "中場休息與茶敘交流。" },
  { id: "day1-ws-clinic-management", day: "day1", title: "實務工作坊｜心理治療所經營的實務挑戰與關鍵抉擇", speaker: "主持人：劉彥君｜講者：林孜嶸、邱似齡、劉彥君", start: "15:50", end: "17:20", room: "二樓會議廳", track: "二樓會議廳", type: "實務工作坊", description: "聚焦心理治療所經營中的實務挑戰與關鍵抉擇。" },
  { id: "day1-symposium-resilience", day: "day1", title: "學術研討會｜資訊操弄環境下的台灣社會心理韌性", speaker: "主持人：洪國鈞｜講者：李梅君、鍾雅竹、朱玉正", start: "15:50", end: "17:20", room: "MD169", track: "MD169", type: "學術研討會", description: "探討資訊操弄環境下的台灣社會心理韌性。" },
  { id: "day1-ws-ai-2", day: "day1", title: "實務工作坊｜AI 難以取代的心療元素（二）", speaker: "主持人：黃天豪｜講者：李炯德、陳弘儒、陳宜家", start: "15:50", end: "17:20", room: "MD168", track: "MD168", type: "實務工作坊", description: "延續系列工作坊，聚焦具身共振與場域即興。" },
  { id: "day1-ws-public-safety", day: "day1", title: "實務工作坊｜臨床心理師在公共安全事件的安心關懷", speaker: "主持人：王愉晴｜講者：王愉晴、呂宜峰、劉耿良、游雅雯", start: "15:50", end: "17:20", room: "MD167", track: "MD167", type: "實務工作坊", description: "探討公共安全事件中的安心關懷工作。" },
  { id: "day1-symposium-ai-assessment", day: "day1", title: "學術研討會｜人工智慧輔助的臨床心理評估與教育訓練", speaker: "主持人：葉品陽｜講者：李琳、李佳潔、林宛糖、陳彥蓁、蘇鈺茹", start: "15:50", end: "17:20", room: "MD203", track: "MD203", type: "學術研討會", description: "介紹人工智慧輔助臨床心理評估與教育訓練之跨域應用。" },
  { id: "day1-ws-custody-2", day: "day1", title: "實務工作坊｜親權事件程序監理人：實作", speaker: "主持人：古黃守廉｜講者：林欣儀、黃春偉、蘇淑貞", start: "15:50", end: "17:20", room: "MD204", track: "MD204", type: "實務工作坊", description: "聚焦程序監理人角色之實作演練。" },
  { id: "day1-symposium-epa", day: "day1", title: "學術研討會｜CBME導向之EPA評核使用經驗與反思", speaker: "主持人：呂信慧｜講者：呂信慧、楊如泰、呂政碩、黃睿謙", start: "15:50", end: "17:20", room: "MD215", track: "MD215", type: "學術研討會", description: "探討 CBME 導向之 EPA 評核使用經驗與反思。" },
  { id: "day1-symposium-recovery", day: "day1", title: "學術研討會｜正走在復元的路上：談戒癮生活的能與難", speaker: "主持人：李昆樺｜講者：黎士鳴、蔡倢妤、張芸瑄、李昆樺", start: "15:50", end: "17:20", room: "MD214", track: "MD214", type: "學術研討會", description: "談戒癮生活中的挑戰與復元歷程。" },
  { id: "day1-end", day: "day1", title: "第一天會議結束", speaker: "", start: "17:20", end: "17:20", room: "", track: "其他", type: "開放式議程", description: "第一天會議結束。" },
  { id: "day2-checkin", day: "day2", title: "報到", speaker: "", start: "09:00", end: "09:30", room: "國璽樓一樓大廳", track: "其他", type: "開放式議程", description: "與會者報到與入場。" },
  { id: "day2-master-talk", day: "day2", title: "大師對談｜AI時代的心理復原力與社會支持", speaker: "與談人：郭乃文、楊啟正、廖士程｜主持人：楊啟正 理事長", start: "09:30", end: "10:30", room: "一樓國際會議廳", track: "主會場", type: "大師對談", description: "聚焦 AI 時代下的心理復原力與社會支持。" },
  { id: "day2-break-1", day: "day2", title: "中場休息、茶敘交流", speaker: "", start: "10:30", end: "10:50", room: "國璽樓一二樓大廳", track: "其他", type: "開放式議程", description: "中場休息與茶敘交流。" },
  { id: "day2-keynote-3", day: "day2", title: "專題演講（三）｜當AI進入助人關係：心理療癒的人智互動", speaker: "主講人：陳宜秀｜主持人：葉在庭", start: "10:50", end: "12:20", room: "一樓國際會議廳", track: "主會場", type: "專題演講", description: "探討當 AI 進入助人關係之後，心理療癒中的人智互動。" },
  { id: "day2-grad-sharing", day: "day2", title: "研究生代表會｜實習督導分享（兒童領域）", speaker: "江懿雅 臨床心理師", start: "12:00", end: "13:00", room: "MD214", track: "MD214", type: "研究生代表會", description: "台臨心研究生代表會安排之實習督導分享，主題為兒童領域。" },
  { id: "day2-award", day: "day2", title: "頒獎典禮", speaker: "學術獎、服務獎、壁報論文獎", start: "12:20", end: "12:40", room: "一樓國際會議廳", track: "主會場", type: "開放式議程", description: "頒發學術獎、服務獎與壁報論文獎。" },
  { id: "day2-lunch-vendor", day: "day2", title: "午餐休息／科技廠商分享會", speaker: "", start: "12:40", end: "13:30", room: "MD171／MD167", track: "其他", type: "開放式議程", description: "午餐休息時間，並同步進行科技廠商分享會。" },
  { id: "day2-forum-hospital", day: "day2", title: "專題論壇｜大醫院臨床心理師的使命感與教學之樂", speaker: "主講人：李妍緹、林家如、侯懿真｜主持人：林家如", start: "13:30", end: "14:00", room: "二樓會議廳", track: "二樓會議廳", type: "專題論壇", description: "探討大醫院臨床心理師的使命感與教學經驗。" },
  { id: "day2-keynote-4", day: "day2", title: "專題演講（四）｜Digital Cognitive Assessments for Streamlined Detection of Cognitive Impairment", speaker: "主講人：Dr. Ziad Nasreddine｜主持人：徐晏萱", start: "14:00", end: "15:00", room: "一樓國際會議廳", track: "主會場", type: "專題演講", description: "聚焦數位認知評估與認知障礙偵測。" },
  { id: "day2-break-2", day: "day2", title: "中場休息、茶敘交流", speaker: "", start: "15:00", end: "15:20", room: "國璽樓一二樓大廳", track: "其他", type: "開放式議程", description: "中場休息與茶敘交流。" },
  { id: "day2-ws-sandplay", day: "day2", title: "實務工作坊｜沙遊治療體驗工作坊－自我探索與療育", speaker: "主持人：葉在庭｜講者：劉又綺", start: "15:20", end: "16:50", room: "MD215", track: "MD215", type: "實務工作坊", description: "沙遊治療體驗工作坊，限制 40 名參與者。", note: "因沙遊道具數量有限，本場次限制 40 名參與者，並以當時段入場順序為原則進行安排。" },
  { id: "day2-ws-sel", day: "day2", title: "實務工作坊｜社會情緒學習的醫療與社區運用", speaker: "主持人：李依親｜講者：李依親、黃宜珊、梁嘉倩、黃婉婷", start: "15:20", end: "16:50", room: "MD169", track: "MD169", type: "實務工作坊", description: "分享社會情緒學習在醫療與社區不同發展階段之實務運用。" },
  { id: "day2-ws-systemic", day: "day2", title: "實務工作坊｜把問題放回關係裡：從個別到系統的臨床工作", speaker: "主持人：劉彥君｜講者：劉彥君、徐孟汎、謝珮玲", start: "15:20", end: "16:50", room: "MD168", track: "MD168", type: "實務工作坊", description: "從個別到系統，重新思考臨床工作中如何把問題放回關係裡。" },
  { id: "day2-ws-ai-anxiety", day: "day2", title: "實務工作坊｜心理師在AI時代的存在焦慮", speaker: "主持人：黃健｜講者：蔡幸祖、黃文宏", start: "15:20", end: "16:50", room: "MD203", track: "MD203", type: "實務工作坊", description: "探討心理師在 AI 時代中的存在焦慮、實務應用、限制與未來。" },
  { id: "day2-ws-consultation", day: "day2", title: "實務工作坊｜臨床心理照會實務演練", speaker: "主持人：盛心毓｜講者：盛心毓、龍奕薰、邱泓達、陳俞霈、楊皓涵", start: "15:20", end: "16:50", room: "MD204", track: "MD204", type: "實務工作坊", description: "以健康心理學為基礎，進行臨床心理照會實務演練。" },
  { id: "day2-symposium-medical-law", day: "day2", title: "學術研討會｜醫療與司法情境下的心理評估與病人自主", speaker: "主持人：蘇文碩｜講者：蘇文碩、丁子芸、林沛瀅、沈琬紜", start: "15:20", end: "16:50", room: "MD214", track: "MD214", type: "學術研討會", description: "探討醫療與司法情境下的心理評估、病人自主與照顧者福祉。" },
  { id: "day2-symposium-psychopathology", day: "day2", title: "學術研討會｜從實驗心理病理研究探索多元認知介入的可能性", speaker: "主持人：梁記雯｜講者：李亭勳、吳孟蓉、官玟伶、李珩毅", start: "15:20", end: "16:50", room: "MD213", track: "MD213", type: "學術研討會", description: "從實驗心理病理研究探索多元認知介入的可能性。" },
  { id: "day2-oral-report", day: "day2", title: "口頭報告（MD212）", speaker: "主持人：黃玉蓮｜含多篇口頭報告", start: "15:20", end: "16:50", room: "MD212", track: "MD212", type: "口頭報告", description: "涵蓋 Complex PTSD、危機等級識別、父母壓力、藥癮治療、瑜伽與工作記憶，以及 AI 創傷知情教育等主題。" },
  { id: "day2-end", day: "day2", title: "年會圓滿結束，平安賦歸", speaker: "", start: "16:50", end: "16:50", room: "", track: "其他", type: "開放式議程", description: "年會圓滿結束，平安賦歸。" },
];

const toMinutes = (time: string) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const formatDuration = (start: string, end: string) => `${start} - ${end}`;

export default function App() {
  const isMobile = typeof window !== 'undefined' ? window.innerWidth < 768 : false;
  const [selectedDay, setSelectedDay] = useState<DayKey>("day1");
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);
  const [query, setQuery] = useState("");

  const filteredSessions = useMemo(() => {
    return sessions
      .filter((s) => {
        const matchesDay = s.day === selectedDay;
        const text = `${s.title} ${s.speaker} ${s.room} ${s.type} ${s.track}`.toLowerCase();
        const matchesQuery = text.includes(query.trim().toLowerCase());
        return matchesDay && matchesQuery;
      })
      .sort((a, b) => toMinutes(a.start) - toMinutes(b.start));
  }, [selectedDay, query]);

  const groupedByTime = useMemo(() => {
    const map = new Map<string, Session[]>();
    filteredSessions.forEach((session) => {
      if (!map.has(session.start)) map.set(session.start, []);
      map.get(session.start)!.push(session);
    });
    return [...map.entries()];
  }, [filteredSessions]);

  const currentDay = dayOptions.find((d) => d.key === selectedDay)!;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f1ec",
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
          background: "rgba(243,241,236,0.94)",
          backdropFilter: "blur(14px)",
          borderBottom: "1px solid #ddd7ce",
        }}
      >
        <div
          style={{
            maxWidth: 1520,
            margin: "0 auto",
            padding: "18px 22px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 18,
              background: "#31465d",
              color: "#f6f3ee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 700,
            }}
          >
            台
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 16 }}>2026 台灣臨床心理學會學術研討會</div>
            <div style={{ fontSize: 13, color: "#7d838c" }}>人工智慧時代的臨床心理學：創新與拓展</div>
          </div>
        </div>
      </div>

      <main style={{ maxWidth: 1520, margin: "0 auto", padding: 24 }}>
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontSize: 12, letterSpacing: "0.18em", color: "#8f948d" }}>SCHEDULE</div>
          <h1 style={{ fontSize: 42, margin: "8px 0 12px", lineHeight: 1.1 }}>時間軸議程表</h1>
          <p style={{ color: "#7a7f86", margin: 0 }}>同時有多場次時會往右延伸，支援左右滑動查看。</p>
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 18 }}>
          {dayOptions.map((day) => (
            <button
              key={day.key}
              onClick={() => setSelectedDay(day.key)}
              style={{
                border: "1px solid #d8d0c5",
                background: selectedDay === day.key ? "#4f6475" : "#f8f6f2",
                color: selectedDay === day.key ? "#f9f7f3" : "#3c4c59",
                borderRadius: 18,
                padding: "12px 16px",
                cursor: "pointer",
                boxShadow: selectedDay === day.key ? "0 8px 18px rgba(79,100,117,0.18)" : "none",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.82 }}>{day.label}</div>
              <div style={{ fontWeight: 700 }}>{day.date}</div>
            </button>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gap: 16,
            gridTemplateColumns: "minmax(240px, 320px) 1fr",
            marginBottom: 22,
          }}
        >
          <div
            style={{
              background: "#f8f6f2",
              border: "1px solid #ddd7ce",
              borderRadius: 28,
              padding: 20,
            }}
          >
            <div style={{ fontSize: 14, color: "#8d918c" }}>目前顯示</div>
            <div style={{ fontSize: 30, fontWeight: 700 }}>{currentDay.label}</div>
            <div style={{ color: "#7b8077" }}>{currentDay.date}</div>
          </div>

          <div
            style={{
              background: "#f8f6f2",
              border: "1px solid #ddd7ce",
              borderRadius: 28,
              padding: 20,
            }}
          >
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="搜尋講題、講者、教室、場次類型"
              style={{
                width: "100%",
                height: 48,
                borderRadius: 16,
                border: "1px solid #d6cfc5",
                padding: "0 14px",
                fontSize: 14,
                boxSizing: "border-box",
                background: "#fffdf9",
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: 30 }}>
          {groupedByTime.map(([time, items], groupIndex) => (
            <div
              key={time}
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "120px 1fr" : "190px 1fr",
                gap: isMobile ? 12 : 18,
                alignItems: "start",
              }}
            >
              <div style={{ position: "relative", minHeight: isMobile ? 120 : 160 }}>
                <div style={{ fontSize: isMobile ? 22 : 30, fontWeight: 800, lineHeight: 1 }}>{time}</div>
                <div style={{ fontSize: 13, color: "#8b8f93", marginTop: 8 }}>開始時間</div>
                <div
                  style={{
                    position: "absolute",
                    right: isMobile ? 6 : 12,
                    top: 2,
                    width: isMobile ? 12 : 18,
                    height: isMobile ? 12 : 18,
                    borderRadius: 999,
                    background: "#233852",
                    boxShadow: "0 0 0 6px #e5e0d6",
                  }}
                />
                {groupIndex !== groupedByTime.length - 1 ? (
                  <div
                    style={{
                      position: "absolute",
                      right: isMobile ? 12 : 20,
                      top: 24,
                      bottom: -42,
                      width: isMobile ? 2 : 3,
                      borderRadius: 999,
                      background: "#c9cfda",
                    }}
                  />
                ) : null}
              </div>

              <div
                style={{
                  overflowX: "auto",
                  paddingBottom: 4,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: isMobile ? 12 : 18,
                    minWidth: items.length > 1 ? `${items.length * 360}px` : "unset",
                    alignItems: "stretch",
                  }}
                >
                  {items.map((session) => {
                    const palette = typeColors[session.type];
                    return (
                      <button
                        key={session.id}
                        onClick={() => setSelectedSession(session)}
                        style={{
                          flex: isMobile ? "0 0 260px" : "0 0 340px",
                          minHeight: isMobile ? 140 : 170,
                          textAlign: "left",
                          background: "#f8f6f2",
                          border: "1px solid #d9d4cb",
                          borderRadius: 28,
                          padding: isMobile ? 16 : 22,
                          cursor: "pointer",
                          boxShadow: "0 10px 20px rgba(107,116,130,0.08)",
                        }}
                      >
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                          <span
                            style={{
                              fontSize: 12,
                              color: palette.text,
                              background: palette.bg,
                              border: `1px solid ${palette.border}`,
                              padding: "5px 10px",
                              borderRadius: 999,
                            }}
                          >
                            {session.type}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "#586271",
                              background: "#f5f2ed",
                              border: "1px solid #d6cec3",
                              padding: "5px 10px",
                              borderRadius: 999,
                            }}
                          >
                            {formatDuration(session.start, session.end)}
                          </span>
                          <span
                            style={{
                              fontSize: 12,
                              color: "#586271",
                              background: "#f5f2ed",
                              border: "1px solid #d6cec3",
                              padding: "5px 10px",
                              borderRadius: 999,
                            }}
                          >
                            {session.room || "—"}
                          </span>
                        </div>

                        <div style={{ fontSize: 15, color: "#7e857f", marginBottom: 10 }}>{session.track}</div>
                        <div style={{ fontSize: isMobile ? 20 : 26, fontWeight: 800, lineHeight: 1.25, marginBottom: 12 }}>
                          {session.title}
                        </div>
                        <div style={{ color: "#6b7481", lineHeight: 1.7, fontSize: 15, marginBottom: 10 }}>
                          {session.speaker || "此場次暫無講者資訊"}
                        </div>
                        <div style={{ color: "#8a9097", lineHeight: 1.8, fontSize: 15 }}>{session.description}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {groupedByTime.length === 0 && (
          <div
            style={{
              background: "#f8f6f2",
              border: "1px solid #ddd7ce",
              borderRadius: 24,
              padding: 30,
              textAlign: "center",
              color: "#7d838c",
              marginTop: 16,
            }}
          >
            找不到符合條件的議程。
          </div>
        )}
      </main>

      {selectedSession && (
        <div
          onClick={() => setSelectedSession(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(31,40,52,0.38)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
            zIndex: 30,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: "100%",
              maxWidth: 820,
              background: "#faf7f2",
              borderRadius: 28,
              overflow: "hidden",
              boxShadow: "0 24px 50px rgba(0,0,0,0.18)",
            }}
          >
            <div style={{ padding: 26, borderBottom: "1px solid #e3ddd3", background: "#f3efe8" }}>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 14 }}>
                <span
                  style={{
                    fontSize: 12,
                    color: typeColors[selectedSession.type].text,
                    background: typeColors[selectedSession.type].bg,
                    border: `1px solid ${typeColors[selectedSession.type].border}`,
                    padding: "5px 10px",
                    borderRadius: 999,
                  }}
                >
                  {selectedSession.type}
                </span>
                <span style={{ fontSize: 12, border: "1px solid #d6cec3", padding: "5px 10px", borderRadius: 999 }}>
                  {selectedSession.day === "day1" ? "DAY 1" : "DAY 2"}
                </span>
                <span style={{ fontSize: 12, border: "1px solid #d6cec3", padding: "5px 10px", borderRadius: 999 }}>
                  {formatDuration(selectedSession.start, selectedSession.end)}
                </span>
                <span style={{ fontSize: 12, border: "1px solid #d6cec3", padding: "5px 10px", borderRadius: 999 }}>
                  {selectedSession.room || "—"}
                </span>
              </div>

              <h2 style={{ margin: "0 0 10px", fontSize: 30, lineHeight: 1.3 }}>{selectedSession.title}</h2>
              <div style={{ color: "#67707c", lineHeight: 1.8 }}>{selectedSession.speaker || "此場次暫無講者資訊"}</div>
            </div>

            <div style={{ padding: 26 }}>
              <div
                style={{
                  display: "grid",
                  gap: 12,
                  gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))",
                }}
              >
                <div style={{ background: "#f3efe8", borderRadius: 18, padding: 16 }}>
                  <div style={{ fontSize: 13, color: "#8a9097", marginBottom: 6 }}>時間</div>
                  <div style={{ fontWeight: 700 }}>{formatDuration(selectedSession.start, selectedSession.end)}</div>
                </div>
                <div style={{ background: "#f3efe8", borderRadius: 18, padding: 16 }}>
                  <div style={{ fontSize: 13, color: "#8a9097", marginBottom: 6 }}>地點</div>
                  <div style={{ fontWeight: 700 }}>{selectedSession.room || "—"}</div>
                </div>
              </div>

              <div style={{ marginTop: 24 }}>
                <h3 style={{ margin: "0 0 10px" }}>場次介紹</h3>
                <p style={{ margin: 0, lineHeight: 1.9, color: "#45515e" }}>{selectedSession.description}</p>
              </div>

              {selectedSession.note ? (
                <div style={{ marginTop: 24 }}>
                  <h3 style={{ margin: "0 0 10px" }}>備註</h3>
                  <p style={{ margin: 0, lineHeight: 1.9, color: "#45515e" }}>{selectedSession.note}</p>
                </div>
              ) : null}

              <div style={{ marginTop: 24 }}>
                <button
                  onClick={() => setSelectedSession(null)}
                  style={{
                    height: 44,
                    padding: "0 18px",
                    borderRadius: 14,
                    border: "none",
                    background: "#4f6475",
                    color: "#f8f6f2",
                    cursor: "pointer",
                  }}
                >
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
