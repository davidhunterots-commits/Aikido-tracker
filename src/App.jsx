import { useState, useEffect } from "react";

const RANKS = [
  {
    name: "Beginner",
    belt: "white",
    practiceDays: 20,
    note: "Practicing toward 6th Kyu testing",
    requirements: [
      "Seiza (sitting), Bowing/Rei, Rise from seiza",
      "Shikko (knee walking)",
      "Hanmi: Migi hanmi & Hidari hanmi",
      "Ukemi: Ushiro ukemi (back fall, back roll), Mae ukemi (front roll)",
      "Kokyu undo: Funakogi undo, Ikkyo undo",
      "Tai sabaki: Tenkan, Irimi, Irimi tenkan, Tenshin",
      "Hanmi w/partner: Ai hanmi, Gyaku hanmi",
      "Striking attacks w/partner: Tsuki, Yokomenuchi, Shomenuchi",
      "Tai no henko (w/partner) as both uke and nage",
      "Kokyudosa - Zagi Kokyuho (sitting, w/partner)",
    ],
  },
  {
    name: "6th Kyu",
    belt: "white",
    practiceDays: 40,
    note: "40 practice days after 6th Kyu",
    requirements: [
      "Shomenuchi Ikkyo (omote & ura)",
      "Shomenuchi Iriminage",
      "Katatetori Shihonage (omote & ura)",
      "Ryotetori Tenchinage (omote & ura)",
      "Tsuki Kotegaeshi",
      "Ushiro Tekubitori Kotegaeshi (omote & ura)",
      "Morotetori Kokyuho (omote & ura)",
    ],
  },
  {
    name: "5th Kyu",
    belt: "yellow",
    practiceDays: 80,
    note: "80 practice days after 5th Kyu",
    requirements: [
      "Shomenuchi Nikyo (omote & ura)",
      "Yokomenuchi Shihonage (omote & ura)",
      "Tsuki Iriminage",
      "Ushiro Tekubitori Sankyo (omote & ura)",
      "Ushiro Ryokatatori Kotegaeshi (omote & ura)",
      "Suwari waza: Shomenuchi Ikkyo (omote & ura)",
      "Suwari waza: Katatori Nikyo (omote & ura)",
      "Suwari waza: Katatori Sankyo (omote & ura)",
    ],
  },
  {
    name: "4th Kyu",
    belt: "yellow",
    practiceDays: 100,
    note: "100 practice days after 4th Kyu",
    requirements: [
      "Yokomenuchi Iriminage (2 variations)",
      "Yokomenuchi Kotegaeshi (omote & ura)",
      "Tsuki Kaitennage (omote & ura)",
      "Ushiro Ryokatatori Sankyo (omote & ura)",
      "Morotetori Iriminage (2 variations)",
      "Shomenuchi Sankyo (omote & ura)",
      "Suwari waza: Shomenuchi Iriminage",
      "Suwari waza: Shomenuchi Nikyo (omote & ura)",
      "Hanmi handachi: Katatetori Shihonage (omote & ura)",
      "Hanmi handachi: Katatetori Kaitennage (uchi & soto mawari)",
    ],
  },
  {
    name: "3rd Kyu",
    belt: "green",
    practiceDays: 200,
    note: "200 practice days after 3rd Kyu - Seminar attendance encouraged",
    requirements: [
      "Shomenuchi Shihonage (omote & ura)",
      "Shomenuchi Kaitennage (omote & ura)",
      "Yokomenuchi Gokyo (omote & ura)",
      "Ushiro Tekubitori Shihonage (omote & ura)",
      "Ushiro Kubishime Koshinage",
      "Ushiro Tekubitori Jujinage (omote & ura)",
      "Morotetori Nikyo (omote & ura)",
      "Hanmi handachi: Shomenuchi Iriminage",
      "Hanmi handachi: Katatetori Nikyo (omote & ura)",
      "Hanmi handachi: Yokomenuchi Kotegaeshi (omote & ura)",
      "Randori (2 attackers)",
    ],
  },
  {
    name: "2nd Kyu",
    belt: "green",
    practiceDays: 300,
    note: "300 practice days after 2nd Kyu - Seminar attendance strongly encouraged",
    requirements: [
      "Katatori Menuchi - 5 techniques",
      "Yokomenuchi - 5 techniques",
      "Morotetori - 5 techniques",
      "Shomenuchi - 5 techniques",
      "Tsuki - 5 techniques",
      "Ryotetori - 5 techniques",
      "Koshinage - 5 techniques",
      "Hanmi handachi: Ushiro waza - 5 techniques",
      "Tanto tori",
      "Randori (3 attackers)",
    ],
  },
  {
    name: "1st Kyu",
    belt: "brown",
    practiceDays: 300,
    note: "300 practice days after 1st Kyu, not less than 1 year - Must attend one seminar per year",
    requirements: [
      "All Kyu requirements including all forms of grasping shoulders, elbows, collar, wrists and hands; all techniques from the rear",
      "Suwari waza Shomenuchi Ikkyo - Gokyo",
      "Tachi tori (bokken disarm)",
      "Jo tori and Jo waza",
      "Henka waza",
      "Randori (4 attackers)",
    ],
  },
  {
    name: "Shodan (1st Dan)",
    belt: "black",
    practiceDays: 600,
    note: "600 practice days after Shodan, not less than 2 years - Must attend two seminars per year",
    requirements: [
      "All Shodan requirements",
      "Suwari waza Shomenuchi Ikkyo - Gokyo",
      "Tachi tori (2 attackers)",
      "Kaeshi waza (counter techniques)",
      "Randori (5 attackers)",
    ],
  },
  {
    name: "Nidan (2nd Dan)",
    belt: "black",
    practiceDays: 700,
    note: "700 practice days after Nidan, not less than 3 years - Must attend two seminars per year",
    requirements: [
      "All Nidan requirements",
      "Subject matter for Sandan to be determined by examiner at the time of examination",
    ],
  },
  {
    name: "Sandan (3rd Dan)",
    belt: "black",
    practiceDays: 800,
    note: "Not less than 4 years after Sandan - Must attend two seminars per year",
    requirements: [
      "All Sandan requirements",
      "Subject matter for Yondan to be determined by examiner at the time of examination",
    ],
  },
  {
    name: "Yondan (4th Dan)",
    belt: "black",
    practiceDays: 0,
    note: "Highest rank tracked in this app",
    requirements: [
      "All Yondan requirements as determined by examining board",
    ],
  },
];

const DEFAULT_TECHNIQUES = [
  { id: 1, name: "Ikkyo", category: "Pins", learned: false, notes: "" },
  { id: 2, name: "Nikkyo", category: "Pins", learned: false, notes: "" },
  { id: 3, name: "Sankyo", category: "Pins", learned: false, notes: "" },
  { id: 4, name: "Yonkyo", category: "Pins", learned: false, notes: "" },
  { id: 5, name: "Gokyo", category: "Pins", learned: false, notes: "" },
  { id: 6, name: "Irimi-nage", category: "Throws", learned: false, notes: "" },
  { id: 7, name: "Shihonage", category: "Throws", learned: false, notes: "" },
  { id: 8, name: "Kotegaeshi", category: "Throws", learned: false, notes: "" },
  { id: 9, name: "Koshinage", category: "Throws", learned: false, notes: "" },
  { id: 10, name: "Tenchinage", category: "Throws", learned: false, notes: "" },
  { id: 11, name: "Kaitennage", category: "Throws", learned: false, notes: "" },
  { id: 12, name: "Jujinage", category: "Throws", learned: false, notes: "" },
  { id: 13, name: "Kokyunage", category: "Throws", learned: false, notes: "" },
  { id: 14, name: "Kokyuho", category: "Kokyu", learned: false, notes: "" },
  { id: 15, name: "Suwari-waza kokyuho", category: "Kokyu", learned: false, notes: "" },
  { id: 16, name: "Jiyu-waza / Randori", category: "Freestyle", learned: false, notes: "" },
  { id: 17, name: "Tachi tori (bokken)", category: "Weapons", learned: false, notes: "" },
  { id: 18, name: "Jo tori / Jo waza", category: "Weapons", learned: false, notes: "" },
  { id: 19, name: "Tanto tori", category: "Weapons", learned: false, notes: "" },
  { id: 20, name: "Kaeshi waza", category: "Advanced", learned: false, notes: "" },
  { id: 21, name: "Henka waza", category: "Advanced", learned: false, notes: "" },
];

const TABS = ["Classes", "Rank", "Techniques", "Notes", "Seminars"];

const SENSEI_OPTIONS = ["Sensei Rob Crowell, Shidoin", "Other"];
const DURATION_OPTIONS = ["60", "90", "Other"];

const G = {
  gold: "#cc2222", goldLight: "#ff4444", goldDim: "rgba(204,34,34,0.15)", goldBorder: "rgba(204,34,34,0.3)",
  bg: "linear-gradient(160deg, #0a0a0a 0%, #1a0000 60%, #111 100%)", bgSolid: "#111",
  card: "rgba(255,255,255,0.04)", cardBorder: "rgba(255,255,255,0.1)",
  text: "#f0f0f0", muted: "#999", dim: "#666",
  green: "#cc2222", red: "#ff4444", purple: "#aaa",
};

const S = {
  app: { minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "'Segoe UI', system-ui, sans-serif" },
  header: { padding: "24px 20px 0", borderBottom: "1px solid rgba(204,34,34,0.3)" },
  title: { fontSize: "24px", fontWeight: "700", color: "#ffffff", letterSpacing: "0.04em", margin: 0 },
  subtitle: { fontSize: "12px", color: G.muted, marginTop: "3px", marginBottom: "16px", letterSpacing: "0.06em", textTransform: "uppercase" },
  tabs: { display: "flex", overflowX: "auto" },
  tab: (a) => ({ padding: "9px 14px", fontSize: "13px", fontWeight: a ? "600" : "400", color: a ? "#cc2222" : G.muted, background: "transparent", border: "none", borderBottom: a ? "2px solid #cc2222" : "2px solid transparent", cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 }),
  body: { padding: "20px", maxWidth: "680px", margin: "0 auto" },
  card: { background: G.card, border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", padding: "16px", marginBottom: "12px" },
  input: { background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "8px", color: G.text, padding: "10px 14px", fontSize: "14px", width: "100%", boxSizing: "border-box", outline: "none" },
  btn: { background: G.gold, color: "#fff", border: "none", borderRadius: "8px", padding: "10px 20px", fontWeight: "700", fontSize: "14px", cursor: "pointer" },
  btnGhost: { background: G.goldDim, color: G.gold, border: "1px solid rgba(204,34,34,0.3)", borderRadius: "6px", padding: "5px 12px", fontSize: "12px", cursor: "pointer", fontWeight: "600" },
  btnDanger: { background: "rgba(227,95,95,0.1)", color: G.red, border: "1px solid rgba(227,95,95,0.2)", borderRadius: "6px", padding: "4px 10px", fontSize: "12px", cursor: "pointer" },
  label: { fontSize: "11px", color: G.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px", display: "block" },
  secTitle: { fontSize: "14px", fontWeight: "700", color: G.gold, marginBottom: "12px", letterSpacing: "0.05em", textTransform: "uppercase" },
  stat: { flex: 1, background: "rgba(204,34,34,0.1)", border: "1px solid rgba(204,34,34,0.25)", borderRadius: "10px", padding: "14px", textAlign: "center" },
  statNum: { fontSize: "30px", fontWeight: "700", color: "#cc2222" },
  statLabel: { fontSize: "11px", color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em" },
};

function storeLoad(key) {
  try {
    const v = localStorage.getItem("aikido_" + key);
    return v ? JSON.parse(v) : null;
  } catch { return null; }
}
function storeSave(key, val) {
  try { localStorage.setItem("aikido_" + key, JSON.stringify(val)); } catch {}
}

function ShareModal({ classes, seminars, techniques, currentRank, rankChecked, profileName, dojoName, onClose }) {
  const [copied, setCopied] = useState(false);
  const totalMin = classes.reduce((a, c) => a + (parseInt(c.duration) || 0), 0);
  const totalSemMin = seminars.reduce((a, s) => a + (parseInt(s.duration) || 0), 0);
  const learned = techniques.filter(t => t.learned).length;
  const rank = RANKS[currentRank];
  const reqs = rank.requirements;
  const completedReqs = reqs.filter((_, i) => rankChecked[currentRank + "-" + i]).length;
  const pct = Math.round((completedReqs / reqs.length) * 100);
  const classesForRank = classes.filter(c => c.rank === currentRank).length;
  const summary = "Aikido Progress Report\n" +
    "================================\n" +
    (profileName ? "Name: " + profileName + "\n" : "") +
    (dojoName ? "Dojo: " + dojoName + "\n" : "") +
    "Current Rank: " + rank.name + "\n" +
    "Test Readiness: " + pct + "% (" + completedReqs + "/" + reqs.length + " requirements)\n" +
    "Practice days for this rank: " + classesForRank + " / " + rank.practiceDays + "\n\n" +
    "Training Log\n" +
    "  Classes attended: " + classes.length + "\n" +
    "  Total class time: " + Math.floor(totalMin / 60) + "h " + (totalMin % 60) + "m\n" +
    "  Seminars attended: " + seminars.length + (seminars.length > 0 ? "\n  Seminar time: " + Math.floor(totalSemMin / 60) + "h " + (totalSemMin % 60) + "m" : "") + "\n\n" +
    "Techniques Learned: " + learned + " / " + techniques.length + "\n" +
    techniques.filter(t => t.learned).map(t => "  - " + t.name).join("\n") + "\n\n" +
    "Requirements for " + rank.name + ":\n" +
    reqs.map((r, i) => "  " + (rankChecked[currentRank + "-" + i] ? "[x]" : "[ ]") + " " + r).join("\n") + "\n\n" +
    "Generated " + new Date().toLocaleDateString();

  const copy = () => {
    navigator.clipboard.writeText(summary).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };

  const downloadPDF = () => window.print();

  return (
    <>
      <div className="share-modal" style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px" }}>
        <div style={{ background: "#111", border: "1px solid rgba(204,34,34,0.3)", borderRadius: "16px", padding: "24px", width: "100%", maxWidth: "500px", maxHeight: "82vh", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
            <div style={{ fontWeight: "700", color: G.gold, fontSize: "16px" }}>Share Progress</div>
            <button onClick={onClose} style={{ background: "none", border: "none", color: G.muted, fontSize: "22px", cursor: "pointer", lineHeight: 1 }}>x</button>
          </div>
          <textarea readOnly value={summary} style={{ ...S.input, minHeight: "220px", resize: "none", fontFamily: "monospace", fontSize: "12px", lineHeight: "1.7", flex: 1, marginBottom: "14px" }} />
          <button style={{ ...S.btn, width: "100%", fontSize: "15px", marginBottom: "10px" }} onClick={copy}>{copied ? "Copied!" : "Copy to Clipboard"}</button>
          <button style={{ ...S.btnGhost, width: "100%", fontSize: "14px", padding: "10px", textAlign: "center" }} onClick={downloadPDF}>Download as PDF</button>
        </div>
      </div>

      {/* Printable report - hidden on screen, shown only when printing */}
      <div className="printable-report" style={{ display: "none" }}>
        <h1 style={{ fontFamily: "sans-serif" }}>Aikido Progress Report</h1>
        {profileName && <p><strong>Name:</strong> {profileName}</p>}
        {dojoName && <p><strong>Dojo:</strong> {dojoName}</p>}
        <p><strong>Current Rank:</strong> {rank.name}</p>
        <p><strong>Test Readiness:</strong> {pct}% ({completedReqs}/{reqs.length} requirements)</p>
        <p><strong>Practice days for this rank:</strong> {classesForRank} / {rank.practiceDays}</p>

        <h2>Training Log</h2>
        <p>Classes attended: {classes.length}</p>
        <p>Total class time: {Math.floor(totalMin / 60)}h {totalMin % 60}m</p>
        <p>Seminars attended: {seminars.length}</p>
        {seminars.length > 0 && <p>Seminar time: {Math.floor(totalSemMin / 60)}h {totalSemMin % 60}m</p>}

        <h2>Techniques Learned ({learned} / {techniques.length})</h2>
        <ul>
          {techniques.filter(t => t.learned).map(t => <li key={t.id}>{t.name}</li>)}
        </ul>

        <h2>Requirements for {rank.name}</h2>
        <ul>
          {reqs.map((r, i) => <li key={i}>{rankChecked[currentRank + "-" + i] ? "[x] " : "[ ] "}{r}</li>)}
        </ul>

        <p style={{ fontSize: "11px", color: "#666" }}>Generated {new Date().toLocaleDateString()}</p>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .printable-report, .printable-report * { visibility: visible; }
          .printable-report {
            display: block !important;
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            color: #000;
            background: #fff;
            padding: 20px;
            font-family: sans-serif;
          }
          .share-modal { display: none !important; }
        }
      `}</style>
    </>
  );
}

function ClassForm({ initial, onSave, onCancel, saveLabel, currentRank }) {
  const [date, setDate] = useState(initial.date);
  const [rank, setRank] = useState(initial.rank !== undefined ? initial.rank : currentRank);
  const [instructor, setInstructor] = useState(initial.instructor || "");
  const [instructorOther, setInstructorOther] = useState(
    initial.instructor && !SENSEI_OPTIONS.includes(initial.instructor) ? initial.instructor : ""
  );
  const [focus, setFocus] = useState(initial.focus || "");
  const [duration, setDuration] = useState(initial.duration || "60");
  const [durationOther, setDurationOther] = useState(
    initial.duration && !DURATION_OPTIONS.includes(initial.duration) ? initial.duration : ""
  );

  const isOther = instructor === "Other";
  const isDurOther = duration === "Other";

  const submit = () => {
    if (!date) return;
    const finalInstructor = isOther ? instructorOther : instructor;
    const finalDuration = isDurOther ? durationOther : duration;
    onSave({ date, instructor: finalInstructor, focus, duration: finalDuration, rank });
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <label style={S.label}>Rank at time of class</label>
        <select style={{ ...S.input, cursor: "pointer" }} value={rank} onChange={e => setRank(Number(e.target.value))}>
          {RANKS.map((r, i) => <option key={i} value={i} style={{ background: "#111" }}>{r.name}</option>)}
        </select>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
        <div>
          <label style={S.label}>Date</label>
          <input type="date" style={S.input} value={date} onChange={e => setDate(e.target.value)} />
        </div>
        <div>
          <label style={S.label}>Duration</label>
          <select style={{ ...S.input, cursor: "pointer" }} value={DURATION_OPTIONS.includes(duration) ? duration : "Other"} onChange={e => setDuration(e.target.value)}>
            {DURATION_OPTIONS.map(d => <option key={d} value={d} style={{ background: "#111" }}>{d === "Other" ? "Other" : d + " min"}</option>)}
          </select>
          {isDurOther && (
            <input type="number" style={{ ...S.input, marginTop: "8px" }} value={durationOther} onChange={e => setDurationOther(e.target.value)} placeholder="Enter minutes" />
          )}
        </div>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={S.label}>Instructor</label>
        <select style={{ ...S.input, cursor: "pointer" }} value={SENSEI_OPTIONS.includes(instructor) ? instructor : (instructor ? "Other" : "")} onChange={e => setInstructor(e.target.value)}>
          <option value="" style={{ background: "#111" }}>Select instructor...</option>
          {SENSEI_OPTIONS.map(s => <option key={s} value={s} style={{ background: "#111" }}>{s}</option>)}
        </select>
        {isOther && (
          <input style={{ ...S.input, marginTop: "8px" }} value={instructorOther} onChange={e => setInstructorOther(e.target.value)} placeholder="Enter instructor name" />
        )}
      </div>
      <div style={{ marginBottom: "14px" }}>
        <label style={S.label}>Focus / Techniques</label>
        <input style={S.input} value={focus} onChange={e => setFocus(e.target.value)} placeholder="e.g. Ikkyo, shihonage" />
      </div>
      <div style={{ display: "flex", gap: "8px" }}>
        <button style={S.btn} onClick={submit}>{saveLabel}</button>
        {onCancel && <button style={S.btnGhost} onClick={onCancel}>Cancel</button>}
      </div>
    </div>
  );
}

function ClassesTab({ classes, setClasses, currentRank }) {
  const [editingId, setEditingId] = useState(null);

  const addClass = (data) => {
    const updated = [{ id: Date.now(), ...data }, ...classes];
    setClasses(updated); storeSave("classes", updated);
  };
  const updateClass = (id, data) => {
    const updated = classes.map(c => c.id === id ? { ...c, ...data } : c);
    setClasses(updated); storeSave("classes", updated);
    setEditingId(null);
  };
  const remove = (id) => { const u = classes.filter(c => c.id !== id); setClasses(u); storeSave("classes", u); };

  const sorted = [...classes].sort((a, b) => new Date(b.date) - new Date(a.date));
  const totalMin = classes.reduce((a, c) => a + (parseInt(c.duration) || 0), 0);
  const rank = RANKS[currentRank];
  const classesSinceRank = classes.filter(c => c.rank === currentRank).length;
  const progressPct = rank.practiceDays > 0 ? Math.min(100, Math.round((classesSinceRank / rank.practiceDays) * 100)) : 100;

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "14px" }}>
        <div style={S.stat}><div style={S.statNum}>{classes.length}</div><div style={S.statLabel}>Classes</div></div>
        <div style={S.stat}><div style={S.statNum}>{Math.floor(totalMin / 60)}</div><div style={S.statLabel}>Hours</div></div>
        <div style={S.stat}><div style={S.statNum}>{totalMin % 60}</div><div style={S.statLabel}>Min</div></div>
      </div>

      <div style={{ background: "rgba(204,34,34,0.08)", border: "1px solid rgba(204,34,34,0.2)", borderRadius: "10px", padding: "14px", marginBottom: "18px" }}>
        <div style={{ fontSize: "11px", color: G.muted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
          Progress toward {rank.practiceDays > 0 ? RANKS[currentRank + 1] ? RANKS[currentRank + 1].name : "next rank" : "current rank"}
        </div>
        {rank.practiceDays > 0 ? (
          <>
            <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ height: "100%", width: progressPct + "%", background: "linear-gradient(90deg, #cc2222, #ff4444)", borderRadius: "4px", transition: "width 0.4s" }} />
            </div>
            <div style={{ fontSize: "13px", color: G.gold, marginTop: "6px", fontWeight: "600" }}>{classesSinceRank} / {rank.practiceDays} practice days logged for this rank</div>
          </>
        ) : (
          <div style={{ fontSize: "13px", color: G.muted }}>No further practice-day requirement tracked.</div>
        )}
      </div>

      <div style={S.card}>
        <div style={S.secTitle}>Log a Class</div>
        <ClassForm
          initial={{ date: new Date().toISOString().split("T")[0], instructor: "", focus: "", duration: "60" }}
          onSave={addClass}
          saveLabel="Log Class"
          currentRank={currentRank}
        />
      </div>

      {sorted.length === 0 && <div style={{ textAlign: "center", color: G.muted, marginTop: "32px", fontSize: "14px" }}>No classes logged yet. Start tracking above.</div>}

      {sorted.map(c => (
        <div key={c.id} style={S.card}>
          {editingId === c.id ? (
            <ClassForm
              initial={c}
              onSave={(data) => updateClass(c.id, data)}
              onCancel={() => setEditingId(null)}
              saveLabel="Save Changes"
            />
          ) : (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <div style={{ fontWeight: "600" }}>{c.date}</div>
                {c.focus && <div style={{ fontSize: "13px", color: "#aaaacc", marginTop: "3px" }}>{c.focus}</div>}
                {c.instructor && <div style={{ fontSize: "12px", color: G.muted, marginTop: "2px" }}>with {c.instructor}</div>}
                {c.rank !== undefined && <div style={{ fontSize: "11px", color: G.gold, marginTop: "2px" }}>{RANKS[c.rank].name}</div>}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: G.gold, fontWeight: "600", fontSize: "13px" }}>{c.duration}m</span>
                <button style={S.btnGhost} onClick={() => setEditingId(c.id)}>Edit</button>
                <button style={S.btnDanger} onClick={() => remove(c.id)}>x</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function SeminarsTab({ seminars, setSeminars }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("");
  const [instructor, setInstructor] = useState("");
  const [duration, setDuration] = useState("120");
  const [notes, setNotes] = useState("");

  const add = () => {
    if (!name.trim()) return;
    const updated = [{ id: Date.now(), name, date, location, instructor, duration, notes }, ...seminars];
    setSeminars(updated); storeSave("seminars", updated);
    setName(""); setLocation(""); setInstructor(""); setDuration("120"); setNotes("");
  };
  const remove = (id) => { const u = seminars.filter(s => s.id !== id); setSeminars(u); storeSave("seminars", u); };
  const totalMin = seminars.reduce((a, s) => a + (parseInt(s.duration) || 0), 0);

  return (
    <div>
      <div style={{ display: "flex", gap: "12px", marginBottom: "18px" }}>
        <div style={S.stat}><div style={S.statNum}>{seminars.length}</div><div style={S.statLabel}>Seminars</div></div>
        <div style={S.stat}><div style={S.statNum}>{Math.floor(totalMin / 60)}</div><div style={S.statLabel}>Hours</div></div>
      </div>
      <div style={S.card}>
        <div style={S.secTitle}>Log a Seminar</div>
        <div style={{ marginBottom: "10px" }}><label style={S.label}>Seminar Name</label><input style={S.input} value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Great Lakes Aikido Summer Seminar" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div><label style={S.label}>Date</label><input type="date" style={S.input} value={date} onChange={e => setDate(e.target.value)} /></div>
          <div><label style={S.label}>Duration (min)</label><input type="number" style={S.input} value={duration} onChange={e => setDuration(e.target.value)} /></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "10px" }}>
          <div><label style={S.label}>Location</label><input style={S.input} value={location} onChange={e => setLocation(e.target.value)} placeholder="e.g. Vernon Hills, IL" /></div>
          <div><label style={S.label}>Instructor</label><input style={S.input} value={instructor} onChange={e => setInstructor(e.target.value)} placeholder="e.g. Shihan Yamada" /></div>
        </div>
        <div style={{ marginBottom: "14px" }}><label style={S.label}>Notes</label><textarea style={{ ...S.input, minHeight: "70px", resize: "vertical", fontFamily: "inherit" }} value={notes} onChange={e => setNotes(e.target.value)} placeholder="Key techniques, takeaways, observations..." /></div>
        <button style={S.btn} onClick={add}>Log Seminar</button>
      </div>
      {seminars.length === 0 && (
        <div style={{ textAlign: "center", color: G.muted, marginTop: "32px", fontSize: "14px" }}>
          No seminars yet.<br />
          <span style={{ fontSize: "12px", color: G.dim, display: "block", marginTop: "6px" }}>Upcoming: Great Lakes Aikido - June 20-21</span>
        </div>
      )}
      {seminars.map(s => (
        <div key={s.id} style={{ ...S.card, borderColor: "rgba(204,34,34,0.3)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "700", fontSize: "15px" }}>{s.name}</div>
              <div style={{ fontSize: "12px", color: G.muted, marginTop: "3px" }}>{s.date}{s.location ? " · " + s.location : ""}{s.instructor ? " · " + s.instructor : ""}</div>
              {s.notes && <div style={{ fontSize: "13px", color: "#aaaacc", marginTop: "6px", fontStyle: "italic" }}>{s.notes}</div>}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginLeft: "10px" }}>
              <span style={{ color: "#cc2222", fontWeight: "600", fontSize: "13px" }}>{Math.round(s.duration / 60)}h</span>
              <button style={S.btnDanger} onClick={() => remove(s.id)}>x</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function TechniquesTab({ techniques, setTechniques }) {
  const [filter, setFilter] = useState("All");
  const [editNote, setEditNote] = useState(null);
  const [noteText, setNoteText] = useState("");

  const categories = ["All", ...Array.from(new Set(techniques.map(t => t.category)))];
  const filtered = filter === "All" ? techniques : techniques.filter(t => t.category === filter);
  const learned = techniques.filter(t => t.learned).length;

  const toggle = (id) => { const u = techniques.map(t => t.id === id ? { ...t, learned: !t.learned } : t); setTechniques(u); storeSave("techniques", u); };
  const saveNote = (id) => { const u = techniques.map(t => t.id === id ? { ...t, notes: noteText } : t); setTechniques(u); storeSave("techniques", u); setEditNote(null); };

  return (
    <div>
      <div style={{ background: "rgba(204,34,34,0.1)", border: "1px solid rgba(204,34,34,0.25)", borderRadius: "10px", padding: "14px", marginBottom: "16px" }}>
        <div style={{ fontSize: "11px", color: G.muted, marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.06em" }}>Techniques Learned</div>
        <div style={{ height: "8px", background: "rgba(255,255,255,0.08)", borderRadius: "4px", overflow: "hidden" }}>
          <div style={{ height: "100%", width: ((learned / techniques.length) * 100) + "%", background: "linear-gradient(90deg, #cc2222, #ff4444)", borderRadius: "4px", transition: "width 0.4s" }} />
        </div>
        <div style={{ fontSize: "13px", color: G.gold, marginTop: "6px", fontWeight: "600" }}>{learned} / {techniques.length}</div>
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ ...S.btnGhost, color: filter === cat ? G.gold : G.muted, background: filter === cat ? "rgba(204,34,34,0.2)" : "rgba(255,255,255,0.04)", border: "1px solid " + (filter === cat ? "rgba(204,34,34,0.5)" : G.cardBorder) }}>{cat}</button>
        ))}
      </div>
      {filtered.map(t => (
        <div key={t.id} style={{ ...S.card, borderColor: t.learned ? "rgba(204,34,34,0.25)" : G.cardBorder }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div onClick={() => toggle(t.id)} style={{ width: "22px", height: "22px", borderRadius: "50%", flexShrink: 0, cursor: "pointer", background: t.learned ? G.gold : "transparent", border: "2px solid " + (t.learned ? G.gold : "rgba(255,255,255,0.2)"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
              {t.learned && <span style={{ color: "#fff", fontWeight: "700" }}>v</span>}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: "600", color: t.learned ? G.gold : G.text }}>{t.name}</div>
              <div style={{ fontSize: "11px", color: G.muted, textTransform: "uppercase", letterSpacing: "0.05em" }}>{t.category}</div>
              {t.notes && <div style={{ fontSize: "12px", color: "#aaaacc", marginTop: "3px", fontStyle: "italic" }}>{t.notes}</div>}
            </div>
            <button style={S.btnGhost} onClick={() => { setEditNote(t.id); setNoteText(t.notes); }}>Note</button>
          </div>
          {editNote === t.id && (
            <div style={{ marginTop: "10px" }}>
              <input style={S.input} value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Add a note about this technique..." />
              <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                <button style={S.btn} onClick={() => saveNote(t.id)}>Save</button>
                <button style={S.btnGhost} onClick={() => setEditNote(null)}>Cancel</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function RankTab({ currentRank, setCurrentRank, rankChecked, setRankChecked, classes }) {
  const rank = RANKS[currentRank];
  const nextRank = RANKS[currentRank + 1];
  const reqs = rank.requirements;
  const completedReqs = reqs.filter((_, i) => rankChecked[currentRank + "-" + i]).length;
  const pct = Math.round((completedReqs / reqs.length) * 100);
  const classesSinceRank = classes.filter(c => c.rank === currentRank).length;
  const practicePct = rank.practiceDays > 0 ? Math.min(100, Math.round((classesSinceRank / rank.practiceDays) * 100)) : 100;

  const changeRank = (val) => {
    setCurrentRank(val); storeSave("currentRank", val);
  };
  const toggleReq = (i) => {
    const key = currentRank + "-" + i;
    const u = { ...rankChecked, [key]: !rankChecked[key] };
    setRankChecked(u); storeSave("rankChecked", u);
  };

  const beltColors = { white: "#e8e8e8", yellow: "#FFDA63", green: "#4CAF50", brown: "#8B5E3C", black: "#333" };
  const bc = beltColors[rank.belt] || G.gold;

  return (
    <div>
      <div style={{ marginBottom: "18px" }}>
        <label style={S.label}>Current Rank</label>
        <select style={{ ...S.input, cursor: "pointer" }} value={currentRank} onChange={e => changeRank(Number(e.target.value))}>
          {RANKS.map((r, i) => <option key={i} value={i} style={{ background: "#111" }}>{r.name}</option>)}
        </select>
      </div>

      <div style={{ marginBottom: "18px", background: "rgba(204,34,34,0.06)", border: "1px solid rgba(204,34,34,0.2)", borderRadius: "12px", padding: "18px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
          <div>
            <div style={{ fontWeight: "700", fontSize: "17px", color: G.gold }}>{rank.name}</div>
            {nextRank && <div style={{ fontSize: "12px", color: G.muted }}>Next: {nextRank.name}</div>}
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "28px", fontWeight: "700", color: "#cc2222" }}>{pct}%</div>
            <div style={{ fontSize: "11px", color: G.muted }}>techniques ready</div>
          </div>
        </div>
        <div style={{ height: "18px", background: "rgba(255,255,255,0.05)", borderRadius: "9px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ height: "100%", width: pct + "%", background: pct === 100 ? "linear-gradient(90deg, #cc2222, #ff4444)" : "linear-gradient(90deg, " + bc + "88, " + bc + ")", borderRadius: "9px", transition: "width 0.5s" }} />
        </div>
        <div style={{ fontSize: "12px", color: G.muted, marginTop: "6px", marginBottom: "10px" }}>{completedReqs} of {reqs.length} requirements met</div>

        {rank.practiceDays > 0 && (
          <>
            <div style={{ height: "10px", background: "rgba(255,255,255,0.05)", borderRadius: "5px", overflow: "hidden", border: "1px solid rgba(255,255,255,0.08)", marginTop: "10px" }}>
              <div style={{ height: "100%", width: practicePct + "%", background: "linear-gradient(90deg, #888, #ccc)", borderRadius: "5px", transition: "width 0.5s" }} />
            </div>
            <div style={{ fontSize: "12px", color: G.muted, marginTop: "6px" }}>{classesSinceRank} / {rank.practiceDays} practice days logged for this rank</div>
          </>
        )}
        {rank.note && <div style={{ fontSize: "12px", color: "#ff8888", marginTop: "10px", fontStyle: "italic" }}>{rank.note}</div>}
      </div>

      <div style={S.secTitle}>Requirements - {rank.name}</div>
      {reqs.map((req, i) => {
        const done = rankChecked[currentRank + "-" + i];
        return (
          <div key={i} style={{ ...S.card, cursor: "pointer", borderColor: done ? "rgba(204,34,34,0.3)" : G.cardBorder }} onClick={() => toggleReq(i)}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "20px", height: "20px", borderRadius: "4px", flexShrink: 0, background: done ? G.green : "transparent", border: "2px solid " + (done ? G.green : "rgba(255,255,255,0.2)"), display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px" }}>
                {done && <span style={{ color: "white", fontWeight: "700" }}>v</span>}
              </div>
              <span style={{ color: done ? G.muted : G.text, textDecoration: done ? "line-through" : "none", fontSize: "14px" }}>{req}</span>
            </div>
          </div>
        );
      })}
      {nextRank && (
        <div style={{ marginTop: "20px" }}>
          <div style={S.secTitle}>Preview - {nextRank.name}</div>
          {nextRank.requirements.map((req, i) => (
            <div key={i} style={{ ...S.card, opacity: 0.45 }}>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "20px", height: "20px", borderRadius: "4px", border: "2px solid rgba(255,255,255,0.15)", flexShrink: 0 }} />
                <span style={{ fontSize: "14px", color: G.muted }}>{req}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function NotesTab({ notes, setNotes }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tag, setTag] = useState("General");
  const tags = ["General", "Technique", "Insight", "Goal", "Feedback"];
  const tagColors = { General: G.muted, Technique: "#cc2222", Insight: "#aaa", Goal: "#cc2222", Feedback: "#ff4444" };

  const saveNote = () => {
    if (!body.trim()) return;
    const updated = [{ id: Date.now(), title, body, tag, date: new Date().toLocaleDateString() }, ...notes];
    setNotes(updated); storeSave("notes", updated);
    setTitle(""); setBody(""); setTag("General");
  };
  const remove = (id) => { const u = notes.filter(n => n.id !== id); setNotes(u); storeSave("notes", u); };

  return (
    <div>
      <div style={S.card}>
        <div style={S.secTitle}>New Note</div>
        <div style={{ marginBottom: "10px" }}><label style={S.label}>Title (optional)</label><input style={S.input} value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Ikkyo breakthrough today" /></div>
        <div style={{ marginBottom: "10px" }}><label style={S.label}>Note</label><textarea style={{ ...S.input, minHeight: "90px", resize: "vertical", fontFamily: "inherit" }} value={body} onChange={e => setBody(e.target.value)} placeholder="What clicked today? What needs work?" /></div>
        <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "14px" }}>
          {tags.map(t => (
            <button key={t} onClick={() => setTag(t)} style={{ ...S.btnGhost, color: tag === t ? tagColors[t] : G.muted, background: tag === t ? tagColors[t] + "22" : "rgba(255,255,255,0.04)", border: "1px solid " + (tag === t ? tagColors[t] + "55" : G.cardBorder) }}>{t}</button>
          ))}
        </div>
        <button style={S.btn} onClick={saveNote}>Save Note</button>
      </div>
      {notes.length === 0 && <div style={{ textAlign: "center", color: G.muted, marginTop: "32px", fontSize: "14px" }}>Capture insights, breakthroughs, and goals here.</div>}
      {notes.map(n => (
        <div key={n.id} style={S.card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
            <div style={{ fontWeight: "600", fontSize: "15px" }}>{n.title || "Note"}</div>
            <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
              <span style={{ fontSize: "11px", color: tagColors[n.tag], background: tagColors[n.tag] + "22", padding: "2px 8px", borderRadius: "4px", fontWeight: "600" }}>{n.tag}</span>
              <button style={S.btnDanger} onClick={() => remove(n.id)}>x</button>
            </div>
          </div>
          <div style={{ fontSize: "13px", color: "#aaaacc", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{n.body}</div>
          <div style={{ fontSize: "11px", color: G.dim, marginTop: "8px" }}>{n.date}</div>
        </div>
      ))}
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [classes, setClasses] = useState([]);
  const [seminars, setSeminars] = useState([]);
  const [techniques, setTechniques] = useState(DEFAULT_TECHNIQUES);
  const [currentRank, setCurrentRank] = useState(0);
  const [rankChecked, setRankChecked] = useState({});
  const [notes, setNotes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [profileName, setProfileName] = useState("");
  const [dojoName, setDojoName] = useState("");
  const [editingDojo, setEditingDojo] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [editingName, setEditingName] = useState(false);

  useEffect(() => {
    const c = storeLoad("classes");
    const s = storeLoad("seminars");
    const t = storeLoad("techniques");
    const r = storeLoad("currentRank");
    const rc = storeLoad("rankChecked");
    const n = storeLoad("notes");
    const pn = storeLoad("profileName");
    const dn = storeLoad("dojoName");
    const pp = storeLoad("profilePhoto");
    if (c) setClasses(c);
    if (s) setSeminars(s);
    if (t) setTechniques(t);
    if (r !== null) setCurrentRank(r);
    if (rc) setRankChecked(rc);
    if (n) setNotes(n);
    if (pn) setProfileName(pn);
    if (dn) setDojoName(dn);
    if (pp) setProfilePhoto(pp);
    setLoaded(true);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setProfilePhoto(reader.result);
      storeSave("profilePhoto", reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveName = (val) => {
    setProfileName(val);
    storeSave("profileName", val);
    setEditingName(false);
  };

  const saveDojo = (val) => {
    setDojoName(val);
    storeSave("dojoName", val);
    setEditingDojo(false);
  };

  if (!loaded) return (
    <div style={{ ...S.app, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: G.gold, fontSize: "15px" }}>Loading your dojo journal...</div>
    </div>
  );

  const tabContent = [
    <ClassesTab classes={classes} setClasses={setClasses} currentRank={currentRank} />,
    <RankTab currentRank={currentRank} setCurrentRank={setCurrentRank} rankChecked={rankChecked} setRankChecked={setRankChecked} classes={classes} />,
    <TechniquesTab techniques={techniques} setTechniques={setTechniques} />,
    <NotesTab notes={notes} setNotes={setNotes} />,
    <SeminarsTab seminars={seminars} setSeminars={setSeminars} />,
  ];

  return (
    <div style={S.app}>
      {showShare && <ShareModal classes={classes} seminars={seminars} techniques={techniques} currentRank={currentRank} rankChecked={rankChecked} profileName={profileName} dojoName={dojoName} onClose={() => setShowShare(false)} />}
      <div style={S.header}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "14px" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
              <label style={{ cursor: "pointer" }}>
                <input type="file" accept="image/*" onChange={handlePhotoChange} style={{ display: "none" }} />
                {profilePhoto ? (
                  <img src={profilePhoto} alt="Profile" style={{ width: "72px", height: "72px", borderRadius: "50%", objectFit: "cover", border: "2px solid #cc2222" }} />
                ) : (
                  <div style={{ width: "72px", height: "72px", borderRadius: "50%", border: "2px dashed rgba(204,34,34,0.4)", display: "flex", alignItems: "center", justifyContent: "center", color: G.muted, fontSize: "11px", textAlign: "center" }}>
                    Add Photo
                  </div>
                )}
              </label>
              {editingName ? (
                <input
                  autoFocus
                  style={{ ...S.input, marginTop: "8px", textAlign: "center", fontSize: "14px", maxWidth: "160px" }}
                  defaultValue={profileName}
                  onBlur={(e) => saveName(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") saveName(e.target.value); }}
                  placeholder="Your name"
                />
              ) : (
                <div onClick={() => setEditingName(true)} style={{ marginTop: "8px", fontSize: "14px", fontWeight: "600", color: G.text, cursor: "pointer" }}>
                  {profileName || "Add your name"}
                </div>
              )}
              {editingDojo ? (
                <input
                  autoFocus
                  style={{ ...S.input, marginTop: "4px", textAlign: "center", fontSize: "12px", maxWidth: "160px" }}
                  defaultValue={dojoName}
                  onBlur={(e) => saveDojo(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") saveDojo(e.target.value); }}
                  placeholder="Your dojo"
                />
              ) : (
                <div onClick={() => setEditingDojo(true)} style={{ marginTop: "2px", fontSize: "12px", color: G.muted, cursor: "pointer" }}>
                  {dojoName || "Add your dojo"}
                </div>
              )}
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <h1 style={S.title}>Aikido Tracker</h1>
              <p style={S.subtitle}><strong style={{ color: "#fff" }}>United States Aikido Federation</strong><br />Progress Journal</p>
            </div>
            <button onClick={() => setShowShare(true)} style={{ ...S.btnGhost, marginTop: "10px" }}>Share</button>
          </div>
          <div style={S.tabs}>
            {TABS.map((tab, i) => <button key={i} style={S.tab(activeTab === i)} onClick={() => setActiveTab(i)}>{tab}</button>)}
          </div>
        </div>
      </div>
      <div style={S.body}>{tabContent[activeTab]}</div>
    </div>
  );
}
