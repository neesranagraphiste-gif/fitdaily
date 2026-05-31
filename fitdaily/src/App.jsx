import { useState, useEffect, useCallback } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const WORKOUT_PROGRAMS = {
  lundi: {
    label: "Lundi",
    focus: "Haut du corps",
    emoji: "💪",
    exercises: [
      { name: "Pompes classiques", sets: 4, reps: "15", rest: 60, calories: 8, desc: "Mains à largeur d'épaules, corps droit" },
      { name: "Pompes larges", sets: 3, reps: "12", rest: 60, calories: 7, desc: "Mains plus larges que les épaules" },
      { name: "Pompes triceps", sets: 3, reps: "10", rest: 60, calories: 6, desc: "Mains serrées sous la poitrine" },
      { name: "Dips sur chaise", sets: 4, reps: "12", rest: 60, calories: 7, desc: "Dos à la chaise, coudes vers l'arrière" },
      { name: "Pike push-ups", sets: 3, reps: "10", rest: 60, calories: 6, desc: "Corps en V inversé, fléchir les coudes" },
      { name: "Planche", sets: 4, reps: "45s", rest: 45, calories: 5, desc: "Corps rigide, abdos contractés" },
    ],
  },
  mardi: {
    label: "Mardi",
    focus: "Bas du corps",
    emoji: "🦵",
    exercises: [
      { name: "Squats", sets: 4, reps: "20", rest: 60, calories: 10, desc: "Pieds à largeur d'épaules, genoux alignés" },
      { name: "Fentes avant", sets: 3, reps: "12/jambe", rest: 60, calories: 9, desc: "Grand pas en avant, genou à 90°" },
      { name: "Squats sauté", sets: 3, reps: "15", rest: 60, calories: 12, desc: "Squat puis saut explosif" },
      { name: "Hip thrusts sol", sets: 4, reps: "20", rest: 45, calories: 8, desc: "Dos au sol, pousser les hanches vers le haut" },
      { name: "Mollets debout", sets: 4, reps: "25", rest: 45, calories: 5, desc: "Se lever sur la pointe des pieds" },
      { name: "Wall sit", sets: 3, reps: "45s", rest: 60, calories: 6, desc: "Dos au mur, cuisses parallèles au sol" },
    ],
  },
  mercredi: {
    label: "Mercredi",
    focus: "Cardio HIIT",
    emoji: "🔥",
    exercises: [
      { name: "Burpees", sets: 4, reps: "10", rest: 45, calories: 15, desc: "Sol → pompe → saut étoile" },
      { name: "Mountain climbers", sets: 4, reps: "30s", rest: 30, calories: 12, desc: "Position pompe, genoux vers la poitrine vite" },
      { name: "Jumping jacks", sets: 3, reps: "40", rest: 30, calories: 8, desc: "Sauts avec écart des bras et jambes" },
      { name: "High knees", sets: 4, reps: "30s", rest: 30, calories: 10, desc: "Course sur place, genoux hauts" },
      { name: "Squat jumps", sets: 3, reps: "15", rest: 45, calories: 12, desc: "Squat profond puis saut" },
      { name: "Planche dynamique", sets: 3, reps: "30s", rest: 30, calories: 8, desc: "Planche + toucher épaule alternée" },
    ],
  },
  jeudi: {
    label: "Jeudi",
    focus: "Core & Abdos",
    emoji: "⚡",
    exercises: [
      { name: "Crunchs", sets: 4, reps: "25", rest: 45, calories: 5, desc: "Dos au sol, mains aux tempes" },
      { name: "Planche latérale", sets: 3, reps: "30s/côté", rest: 45, calories: 5, desc: "Corps aligné sur le côté" },
      { name: "Russian twists", sets: 4, reps: "20", rest: 45, calories: 6, desc: "Pieds levés, rotation du buste" },
      { name: "Leg raises", sets: 4, reps: "15", rest: 45, calories: 6, desc: "Dos au sol, lever les jambes tendues" },
      { name: "Superman", sets: 3, reps: "15", rest: 45, calories: 4, desc: "Ventre au sol, lever bras et jambes" },
      { name: "Bicycle crunchs", sets: 3, reps: "20/côté", rest: 45, calories: 7, desc: "Alterner coude genou opposé" },
    ],
  },
  vendredi: {
    label: "Vendredi",
    focus: "Full Body",
    emoji: "🏋️",
    exercises: [
      { name: "Burpees pompes", sets: 4, reps: "8", rest: 60, calories: 14, desc: "Burpee classique + pompe au sol" },
      { name: "Squat + presse", sets: 4, reps: "15", rest: 60, calories: 10, desc: "Squat + extension bras vers le haut" },
      { name: "Fentes sautées", sets: 3, reps: "10/jambe", rest: 60, calories: 12, desc: "Alterner fentes avec saut" },
      { name: "Pompes + rotation", sets: 3, reps: "10", rest: 60, calories: 8, desc: "Pompe + ouverture latérale du bras" },
      { name: "Bear crawl", sets: 3, reps: "30s", rest: 45, calories: 10, desc: "À 4 pattes, avancer en gardant les genoux levés" },
      { name: "Étirements", sets: 1, reps: "5min", rest: 0, calories: 3, desc: "Bien s'étirer après l'effort" },
    ],
  },
  samedi: {
    label: "Samedi",
    focus: "Active Recovery",
    emoji: "🧘",
    exercises: [
      { name: "Marche rapide", sets: 1, reps: "20min", rest: 0, calories: 80, desc: "Rythme modéré, respiration nasale" },
      { name: "Yoga flow", sets: 1, reps: "15min", rest: 0, calories: 30, desc: "Enchaînement salutation au soleil" },
      { name: "Étirements complets", sets: 1, reps: "10min", rest: 0, calories: 15, desc: "Toutes les grandes chaînes musculaires" },
      { name: "Respiration profonde", sets: 3, reps: "10", rest: 0, calories: 2, desc: "Inspiration 4s, hold 4s, expiration 6s" },
    ],
  },
  dimanche: {
    label: "Dimanche",
    focus: "Repos",
    emoji: "😴",
    exercises: [],
  },
};

const FOOD_DB = [
  { name: "Œufs (1)", cal: 70, p: 6, g: 0.5, l: 5 },
  { name: "Blanc de poulet (100g)", cal: 165, p: 31, g: 0, l: 3.6 },
  { name: "Riz cuit (100g)", cal: 130, p: 2.7, g: 28, l: 0.3 },
  { name: "Flocons d'avoine (50g)", cal: 190, p: 6, g: 32, l: 3.5 },
  { name: "Banane (1)", cal: 95, p: 1.2, g: 23, l: 0.3 },
  { name: "Yaourt grec (150g)", cal: 130, p: 12, g: 6, l: 6 },
  { name: "Amandes (30g)", cal: 175, p: 6, g: 6, l: 15 },
  { name: "Salade verte (100g)", cal: 15, p: 1.3, g: 2, l: 0.2 },
  { name: "Tomates (100g)", cal: 18, p: 0.9, g: 3.5, l: 0.2 },
  { name: "Saumon (100g)", cal: 208, p: 20, g: 0, l: 13 },
  { name: "Pain complet (1 tranche)", cal: 70, p: 3, g: 13, l: 1 },
  { name: "Lentilles cuites (100g)", cal: 116, p: 9, g: 20, l: 0.4 },
  { name: "Brocoli (100g)", cal: 34, p: 2.8, g: 7, l: 0.4 },
  { name: "Pomme (1)", cal: 80, p: 0.4, g: 21, l: 0.2 },
  { name: "Fromage blanc 0% (100g)", cal: 45, p: 8, g: 4, l: 0.1 },
  { name: "Patate douce (100g)", cal: 86, p: 1.6, g: 20, l: 0.1 },
  { name: "Thon en boîte (100g)", cal: 116, p: 26, g: 0, l: 1 },
  { name: "Noix (30g)", cal: 196, p: 4.6, g: 4, l: 19 },
  { name: "Lait demi-écrémé (200ml)", cal: 92, p: 6.4, g: 9.4, l: 3.2 },
  { name: "Avocat (1/2)", cal: 120, p: 1.5, g: 6, l: 11 },
];

const DAYS = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
const DAY_LABELS = { lundi:"Lun", mardi:"Mar", mercredi:"Mer", jeudi:"Jeu", vendredi:"Ven", samedi:"Sam", dimanche:"Dim" };

// ─── MAIN APP ─────────────────────────────────────────────────────────────────

export default function SportApp() {
  const todayIdx = (new Date().getDay() + 6) % 7;
  const todayKey = DAYS[todayIdx];

  const [activeTab, setActiveTab] = useState("today");
  const [selectedDay, setSelectedDay] = useState(todayKey);
  const [completedSets, setCompletedSets] = useState({});
  const [calorieLog, setCalorieLog] = useState([]);
  const [searchFood, setSearchFood] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodQty, setFoodQty] = useState(1);
  const [weight, setWeight] = useState(75);
  const [height, setHeight] = useState(175);
  const [age, setAge] = useState(28);
  const [gender, setGender] = useState("homme");
  const [timer, setTimer] = useState(null);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [streak, setStreak] = useState(7);
  const [notification, setNotification] = useState(null);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [currentExIdx, setCurrentExIdx] = useState(0);

  const program = WORKOUT_PROGRAMS[selectedDay];
  const todayProgram = WORKOUT_PROGRAMS[todayKey];

  // BMR calculation
  const bmr = gender === "homme"
    ? 10 * weight + 6.25 * height - 5 * age + 5
    : 10 * weight + 6.25 * height - 5 * age - 161;
  const tdee = Math.round(bmr * 1.55);
  const targetCal = Math.round(tdee * 0.8);

  const totalCalEaten = calorieLog.reduce((s, f) => s + f.totalCal, 0);
  const calBurned = Object.keys(completedSets).reduce((sum, key) => {
    const [day, exIdx, setIdx] = key.split("-");
    if (day === selectedDay) {
      const ex = WORKOUT_PROGRAMS[day]?.exercises[parseInt(exIdx)];
      return sum + (ex?.calories || 0);
    }
    return sum;
  }, 0);
  const netCal = totalCalEaten - calBurned;

  // Timer logic
  useEffect(() => {
    let interval;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(s => s - 1), 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      showNotif("⏱️ Repos terminé ! Prochain set !");
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds]);

  const showNotif = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const startRest = (seconds) => {
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const toggleSet = (day, exIdx, setIdx, restTime) => {
    const key = `${day}-${exIdx}-${setIdx}`;
    setCompletedSets(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else {
        next[key] = true;
        if (restTime > 0) startRest(restTime);
        showNotif("✅ Set complété !");
      }
      return next;
    });
  };

  const isSetDone = (day, exIdx, setIdx) => !!completedSets[`${day}-${exIdx}-${setIdx}`];

  const exProgress = (day, exIdx, totalSets) => {
    let done = 0;
    for (let i = 0; i < totalSets; i++) if (isSetDone(day, exIdx, i)) done++;
    return done;
  };

  const dayProgress = (day) => {
    const prog = WORKOUT_PROGRAMS[day];
    if (!prog.exercises.length) return 100;
    let total = 0, done = 0;
    prog.exercises.forEach((ex, ei) => {
      total += ex.sets;
      for (let s = 0; s < ex.sets; s++) if (isSetDone(day, ei, s)) done++;
    });
    return total ? Math.round((done / total) * 100) : 0;
  };

  const filteredFoods = FOOD_DB.filter(f =>
    f.name.toLowerCase().includes(searchFood.toLowerCase())
  );

  const addFood = () => {
    if (!selectedFood) return;
    const item = {
      ...selectedFood,
      qty: foodQty,
      totalCal: Math.round(selectedFood.cal * foodQty),
      totalP: Math.round(selectedFood.p * foodQty * 10) / 10,
      totalG: Math.round(selectedFood.g * foodQty * 10) / 10,
      totalL: Math.round(selectedFood.l * foodQty * 10) / 10,
      id: Date.now(),
    };
    setCalorieLog(prev => [...prev, item]);
    setSelectedFood(null);
    setSearchFood("");
    setFoodQty(1);
    showNotif(`➕ ${item.name} ajouté !`);
  };

  const macroP = calorieLog.reduce((s, f) => s + f.totalP, 0);
  const macroG = calorieLog.reduce((s, f) => s + f.totalG, 0);
  const macroL = calorieLog.reduce((s, f) => s + f.totalL, 0);

  const todayDone = dayProgress(todayKey);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #0a0a0f 0%, #0f1a2e 50%, #0a0f1a 100%)",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      color: "#e8eaf6",
      overflowX: "hidden",
    }}>

      {/* NOTIFICATION */}
      {notification && (
        <div style={{
          position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)",
          background: "linear-gradient(135deg, #00d4aa, #0099ff)",
          color: "#fff", padding: "12px 24px", borderRadius: 50,
          fontWeight: 700, fontSize: 14, zIndex: 9999,
          boxShadow: "0 8px 32px rgba(0,212,170,0.4)",
          animation: "slideDown 0.3s ease",
        }}>{notification}</div>
      )}

      {/* TIMER OVERLAY */}
      {timerRunning && (
        <div style={{
          position: "fixed", bottom: 100, right: 20,
          background: "linear-gradient(135deg, #1a1a2e, #16213e)",
          border: "2px solid #00d4aa",
          borderRadius: 20, padding: "16px 24px", zIndex: 999,
          boxShadow: "0 8px 32px rgba(0,212,170,0.3)",
          textAlign: "center",
        }}>
          <div style={{ fontSize: 11, color: "#00d4aa", textTransform: "uppercase", letterSpacing: 2, marginBottom: 4 }}>REPOS</div>
          <div style={{ fontSize: 40, fontWeight: 900, color: "#fff", lineHeight: 1 }}>{timerSeconds}s</div>
          <button onClick={() => setTimerRunning(false)} style={{
            marginTop: 8, background: "transparent", border: "1px solid #ff4757",
            color: "#ff4757", borderRadius: 8, padding: "4px 12px", cursor: "pointer", fontSize: 11
          }}>Passer</button>
        </div>
      )}

      {/* HEADER */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "20px 20px 16px",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 11, color: "#00d4aa", textTransform: "uppercase", letterSpacing: 3, marginBottom: 4 }}>FIT DAILY</div>
            <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.5 }}>
              {todayProgram.emoji} {todayProgram.label.toUpperCase()}
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, color: "#7c83a0", marginBottom: 4 }}>Série active</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: "#ff6b35" }}>🔥 {streak}</div>
          </div>
        </div>

        {/* Progress bar today */}
        <div style={{ marginTop: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#7c83a0", marginBottom: 6 }}>
            <span>Progression aujourd'hui</span>
            <span style={{ color: "#00d4aa", fontWeight: 700 }}>{todayDone}%</span>
          </div>
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, height: 6 }}>
            <div style={{
              width: `${todayDone}%`, height: "100%", borderRadius: 10,
              background: "linear-gradient(90deg, #00d4aa, #0099ff)",
              transition: "width 0.5s ease",
            }} />
          </div>
        </div>
      </div>

      {/* NAV TABS */}
      <div style={{
        display: "flex", background: "rgba(255,255,255,0.03)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {[
          { key: "today", label: "Aujourd'hui", icon: "🏠" },
          { key: "week", label: "Programme", icon: "📅" },
          { key: "calories", label: "Nutrition", icon: "🥗" },
          { key: "stats", label: "Stats", icon: "📊" },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            flex: 1, padding: "12px 4px", background: "transparent", border: "none",
            color: activeTab === tab.key ? "#00d4aa" : "#7c83a0",
            fontSize: 10, fontWeight: activeTab === tab.key ? 700 : 500,
            cursor: "pointer", borderBottom: activeTab === tab.key ? "2px solid #00d4aa" : "2px solid transparent",
            transition: "all 0.2s",
          }}>
            <div style={{ fontSize: 18, marginBottom: 2 }}>{tab.icon}</div>
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding: "16px 16px 100px" }}>

        {/* ── TODAY TAB ── */}
        {activeTab === "today" && (
          <div>
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              gap: 10, marginBottom: 20,
            }}>
              {[
                { label: "Kcal cibles", value: targetCal, color: "#0099ff", sub: "objectif" },
                { label: "Kcal mangées", value: totalCalEaten, color: totalCalEaten > targetCal ? "#ff4757" : "#00d4aa", sub: "aujourd'hui" },
                { label: "Kcal brûlées", value: calBurned, color: "#ff6b35", sub: "sport" },
              ].map(card => (
                <div key={card.label} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 16,
                  padding: "14px 10px", border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: card.color }}>{card.value}</div>
                  <div style={{ fontSize: 9, color: "#7c83a0", marginTop: 2, textTransform: "uppercase", letterSpacing: 1 }}>{card.sub}</div>
                  <div style={{ fontSize: 9, color: "#4a4f6a", marginTop: 1 }}>{card.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
              <div style={{ fontWeight: 700, fontSize: 16 }}>
                {todayProgram.emoji} {todayProgram.focus}
              </div>
              <div style={{
                background: "linear-gradient(135deg, #00d4aa22, #0099ff22)",
                border: "1px solid #00d4aa44",
                borderRadius: 20, padding: "4px 12px",
                fontSize: 11, color: "#00d4aa",
              }}>
                ~60 min
              </div>
            </div>

            {todayProgram.exercises.length === 0 ? (
              <div style={{
                textAlign: "center", padding: "60px 20px",
                background: "rgba(255,255,255,0.03)", borderRadius: 20,
                border: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>😴</div>
                <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>Journée de repos</div>
                <div style={{ fontSize: 14, color: "#7c83a0" }}>Le repos fait partie de l'entraînement !<br />Profitez-en pour récupérer.</div>
              </div>
            ) : (
              todayProgram.exercises.map((ex, ei) => {
                const done = exProgress(todayKey, ei, ex.sets);
                const isDone = done === ex.sets;
                return (
                  <div key={ei} style={{
                    background: isDone ? "rgba(0,212,170,0.08)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isDone ? "rgba(0,212,170,0.3)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 16, padding: 16, marginBottom: 12,
                    transition: "all 0.3s",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{isDone ? "✅ " : ""}{ex.name}</div>
                        <div style={{ fontSize: 11, color: "#7c83a0", marginTop: 2 }}>{ex.desc}</div>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0 }}>
                        <div style={{ fontSize: 12, color: "#ff6b35", fontWeight: 700 }}>~{ex.calories * ex.sets} kcal</div>
                        <div style={{ fontSize: 11, color: "#7c83a0" }}>{ex.sets}×{ex.reps}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {Array.from({ length: ex.sets }).map((_, si) => (
                        <button key={si} onClick={() => toggleSet(todayKey, ei, si, ex.rest)} style={{
                          padding: "8px 16px", borderRadius: 10,
                          background: isSetDone(todayKey, ei, si)
                            ? "linear-gradient(135deg, #00d4aa, #0099ff)"
                            : "rgba(255,255,255,0.08)",
                          border: `1px solid ${isSetDone(todayKey, ei, si) ? "transparent" : "rgba(255,255,255,0.12)"}`,
                          color: isSetDone(todayKey, ei, si) ? "#fff" : "#7c83a0",
                          cursor: "pointer", fontSize: 12, fontWeight: 700,
                          transition: "all 0.2s",
                        }}>
                          Set {si + 1}
                        </button>
                      ))}
                    </div>
                    {done > 0 && done < ex.sets && (
                      <div style={{ marginTop: 8, fontSize: 11, color: "#00d4aa" }}>
                        {done}/{ex.sets} sets — repos {ex.rest}s
                        {!timerRunning && <button onClick={() => startRest(ex.rest)} style={{
                          marginLeft: 8, background: "#00d4aa22", border: "1px solid #00d4aa",
                          color: "#00d4aa", borderRadius: 8, padding: "2px 8px",
                          cursor: "pointer", fontSize: 10
                        }}>⏱ Lancer repos</button>}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── WEEK TAB ── */}
        {activeTab === "week" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 6, marginBottom: 20 }}>
              {DAYS.map((d, i) => {
                const prog = dayProgress(d);
                const isToday = d === todayKey;
                const isSel = d === selectedDay;
                return (
                  <button key={d} onClick={() => setSelectedDay(d)} style={{
                    background: isSel ? "linear-gradient(135deg, #00d4aa22, #0099ff22)" : "rgba(255,255,255,0.04)",
                    border: `1px solid ${isSel ? "#00d4aa" : "rgba(255,255,255,0.08)"}`,
                    borderRadius: 12, padding: "8px 2px", cursor: "pointer",
                    color: isToday ? "#00d4aa" : "#e8eaf6",
                    textAlign: "center",
                  }}>
                    <div style={{ fontSize: 9, marginBottom: 2, opacity: 0.7 }}>{DAY_LABELS[d]}</div>
                    <div style={{ fontSize: 16 }}>{WORKOUT_PROGRAMS[d].emoji}</div>
                    <div style={{
                      width: "60%", margin: "4px auto 0", height: 3, borderRadius: 2,
                      background: "rgba(255,255,255,0.1)"
                    }}>
                      <div style={{ width: `${prog}%`, height: "100%", borderRadius: 2, background: "#00d4aa" }} />
                    </div>
                  </button>
                );
              })}
            </div>

            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)", padding: 16, marginBottom: 16,
            }}>
              <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 4 }}>
                {program.emoji} {program.label} — {program.focus}
              </div>
              <div style={{ fontSize: 12, color: "#7c83a0" }}>
                {program.exercises.length} exercices • Progression : {dayProgress(selectedDay)}%
              </div>
            </div>

            {program.exercises.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#7c83a0" }}>
                <div style={{ fontSize: 40 }}>😴</div>
                <div style={{ marginTop: 12 }}>Repos & récupération</div>
              </div>
            ) : (
              program.exercises.map((ex, ei) => {
                const done = exProgress(selectedDay, ei, ex.sets);
                return (
                  <div key={ei} style={{
                    background: done === ex.sets ? "rgba(0,212,170,0.06)" : "rgba(255,255,255,0.03)",
                    border: `1px solid ${done === ex.sets ? "rgba(0,212,170,0.2)" : "rgba(255,255,255,0.06)"}`,
                    borderRadius: 14, padding: "14px 16px", marginBottom: 10,
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <div>
                        <div style={{ fontWeight: 700 }}>{done === ex.sets ? "✅ " : ""}{ex.name}</div>
                        <div style={{ fontSize: 11, color: "#7c83a0", marginTop: 2 }}>{ex.desc}</div>
                      </div>
                      <div style={{ textAlign: "right", fontSize: 12 }}>
                        <div style={{ color: "#ff6b35", fontWeight: 700 }}>~{ex.calories * ex.sets} kcal</div>
                        <div style={{ color: "#7c83a0" }}>{ex.sets}×{ex.reps}</div>
                        <div style={{ color: "#4a4f6a", fontSize: 10 }}>Repos {ex.rest}s</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                      {Array.from({ length: ex.sets }).map((_, si) => (
                        <button key={si} onClick={() => toggleSet(selectedDay, ei, si, ex.rest)} style={{
                          padding: "6px 14px", borderRadius: 8,
                          background: isSetDone(selectedDay, ei, si)
                            ? "linear-gradient(135deg, #00d4aa, #0099ff)"
                            : "rgba(255,255,255,0.07)",
                          border: "none", color: isSetDone(selectedDay, ei, si) ? "#fff" : "#7c83a0",
                          cursor: "pointer", fontSize: 11, fontWeight: 700,
                        }}>Set {si + 1}</button>
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* ── CALORIES TAB ── */}
        {activeTab === "calories" && (
          <div>
            {/* Summary */}
            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)", padding: 20, marginBottom: 16,
            }}>
              <div style={{ fontSize: 12, color: "#7c83a0", marginBottom: 4 }}>Bilan calorique du jour</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 900, color: netCal > targetCal ? "#ff4757" : "#00d4aa" }}>
                    {netCal}
                  </div>
                  <div style={{ fontSize: 11, color: "#7c83a0" }}>kcal nettes / {targetCal} objectif</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 12, color: "#4a4f6a" }}>+{totalCalEaten} mangées</div>
                  <div style={{ fontSize: 12, color: "#ff6b35" }}>-{calBurned} brûlées</div>
                </div>
              </div>
              <div style={{ marginTop: 12 }}>
                <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 8, height: 8 }}>
                  <div style={{
                    width: `${Math.min(100, (netCal / targetCal) * 100)}%`,
                    height: "100%", borderRadius: 8,
                    background: netCal > targetCal
                      ? "linear-gradient(90deg, #ff6b35, #ff4757)"
                      : "linear-gradient(90deg, #00d4aa, #0099ff)",
                    transition: "width 0.5s",
                  }} />
                </div>
              </div>
            </div>

            {/* Macros */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 20 }}>
              {[
                { label: "Protéines", value: macroP.toFixed(0), unit: "g", color: "#0099ff", target: Math.round(weight * 2) },
                { label: "Glucides", value: macroG.toFixed(0), unit: "g", color: "#ff6b35", target: Math.round(targetCal * 0.4 / 4) },
                { label: "Lipides", value: macroL.toFixed(0), unit: "g", color: "#ff4757", target: Math.round(targetCal * 0.3 / 9) },
              ].map(m => (
                <div key={m.label} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 16,
                  padding: 14, border: "1px solid rgba(255,255,255,0.06)",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: 20, fontWeight: 900, color: m.color }}>{m.value}<span style={{ fontSize: 12 }}>{m.unit}</span></div>
                  <div style={{ fontSize: 9, color: "#7c83a0", textTransform: "uppercase", letterSpacing: 1 }}>{m.label}</div>
                  <div style={{ fontSize: 9, color: "#4a4f6a" }}>/{m.target}g</div>
                </div>
              ))}
            </div>

            {/* Add food */}
            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)", padding: 16, marginBottom: 16,
            }}>
              <div style={{ fontWeight: 700, marginBottom: 12 }}>➕ Ajouter un aliment</div>
              <input
                value={searchFood}
                onChange={e => setSearchFood(e.target.value)}
                placeholder="Rechercher un aliment..."
                style={{
                  width: "100%", padding: "10px 14px", borderRadius: 10,
                  background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                  color: "#e8eaf6", fontSize: 14, outline: "none",
                  boxSizing: "border-box",
                }}
              />
              {searchFood && (
                <div style={{
                  marginTop: 8, maxHeight: 200, overflowY: "auto",
                  background: "rgba(0,0,0,0.4)", borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.08)",
                }}>
                  {filteredFoods.map(f => (
                    <button key={f.name} onClick={() => { setSelectedFood(f); setSearchFood(f.name); }} style={{
                      width: "100%", padding: "10px 14px", background: selectedFood?.name === f.name ? "rgba(0,212,170,0.15)" : "transparent",
                      border: "none", color: "#e8eaf6", cursor: "pointer", textAlign: "left",
                      display: "flex", justifyContent: "space-between", fontSize: 13,
                      borderBottom: "1px solid rgba(255,255,255,0.04)",
                    }}>
                      <span>{f.name}</span>
                      <span style={{ color: "#ff6b35", fontWeight: 700 }}>{f.cal} kcal</span>
                    </button>
                  ))}
                </div>
              )}
              {selectedFood && (
                <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ flex: 1, fontSize: 12, color: "#7c83a0" }}>
                    Quantité × {foodQty} = {Math.round(selectedFood.cal * foodQty)} kcal
                  </div>
                  <input type="number" min={0.5} step={0.5} value={foodQty}
                    onChange={e => setFoodQty(parseFloat(e.target.value) || 1)}
                    style={{
                      width: 60, padding: "8px", borderRadius: 8,
                      background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                      color: "#fff", fontSize: 14, textAlign: "center", outline: "none"
                    }}
                  />
                  <button onClick={addFood} style={{
                    padding: "8px 16px", borderRadius: 10,
                    background: "linear-gradient(135deg, #00d4aa, #0099ff)",
                    border: "none", color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
                  }}>Ajouter</button>
                </div>
              )}
            </div>

            {/* Log */}
            {calorieLog.length > 0 && (
              <div>
                <div style={{ fontWeight: 700, marginBottom: 10 }}>📋 Journal alimentaire</div>
                {calorieLog.map(item => (
                  <div key={item.id} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px", background: "rgba(255,255,255,0.03)",
                    borderRadius: 12, marginBottom: 8,
                    border: "1px solid rgba(255,255,255,0.05)",
                  }}>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{item.name}</div>
                      <div style={{ fontSize: 11, color: "#7c83a0" }}>
                        P:{item.totalP}g • G:{item.totalG}g • L:{item.totalL}g × {item.qty}
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                      <div style={{ fontSize: 15, fontWeight: 800, color: "#ff6b35" }}>{item.totalCal}</div>
                      <button onClick={() => setCalorieLog(prev => prev.filter(i => i.id !== item.id))} style={{
                        background: "rgba(255,71,87,0.2)", border: "none", color: "#ff4757",
                        borderRadius: 8, width: 28, height: 28, cursor: "pointer", fontSize: 14,
                      }}>×</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── STATS TAB ── */}
        {activeTab === "stats" && (
          <div>
            {/* Profile */}
            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)", padding: 20, marginBottom: 16,
            }}>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 16 }}>⚙️ Mon profil</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[
                  { label: "Poids (kg)", value: weight, set: setWeight, min: 40, max: 200 },
                  { label: "Taille (cm)", value: height, set: setHeight, min: 140, max: 220 },
                  { label: "Âge", value: age, set: setAge, min: 15, max: 80 },
                ].map(f => (
                  <div key={f.label}>
                    <div style={{ fontSize: 11, color: "#7c83a0", marginBottom: 4 }}>{f.label}</div>
                    <input type="number" min={f.min} max={f.max} value={f.value}
                      onChange={e => f.set(parseInt(e.target.value) || f.value)}
                      style={{
                        width: "100%", padding: "8px 12px", borderRadius: 10,
                        background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                        color: "#fff", fontSize: 16, fontWeight: 700, outline: "none",
                        boxSizing: "border-box"
                      }}
                    />
                  </div>
                ))}
                <div>
                  <div style={{ fontSize: 11, color: "#7c83a0", marginBottom: 4 }}>Genre</div>
                  <div style={{ display: "flex", gap: 6 }}>
                    {["homme", "femme"].map(g => (
                      <button key={g} onClick={() => setGender(g)} style={{
                        flex: 1, padding: "8px", borderRadius: 10,
                        background: gender === g ? "linear-gradient(135deg, #00d4aa, #0099ff)" : "rgba(255,255,255,0.06)",
                        border: "none", color: gender === g ? "#fff" : "#7c83a0",
                        cursor: "pointer", fontSize: 12, fontWeight: 700, textTransform: "capitalize",
                      }}>{g}</button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Metabolisme */}
            <div style={{
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16,
            }}>
              {[
                { label: "Métabolisme de base", value: Math.round(bmr), unit: "kcal/j", color: "#7c83a0", desc: "Au repos total" },
                { label: "Dépense totale (TDEE)", value: tdee, unit: "kcal/j", color: "#0099ff", desc: "Activité modérée" },
                { label: "Objectif perte de poids", value: targetCal, unit: "kcal/j", color: "#00d4aa", desc: "Déficit de 20%" },
                { label: "IMC estimé", value: (weight / Math.pow(height / 100, 2)).toFixed(1), unit: "", color: "#ff6b35", desc: "Indice de masse corporelle" },
              ].map(card => (
                <div key={card.label} style={{
                  background: "rgba(255,255,255,0.04)", borderRadius: 16,
                  border: "1px solid rgba(255,255,255,0.06)", padding: "16px 14px",
                }}>
                  <div style={{ fontSize: 22, fontWeight: 900, color: card.color }}>
                    {card.value}<span style={{ fontSize: 11 }}> {card.unit}</span>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 600, marginTop: 2 }}>{card.label}</div>
                  <div style={{ fontSize: 10, color: "#4a4f6a", marginTop: 2 }}>{card.desc}</div>
                </div>
              ))}
            </div>

            {/* Weekly progress */}
            <div style={{
              background: "rgba(255,255,255,0.04)", borderRadius: 20,
              border: "1px solid rgba(255,255,255,0.08)", padding: 20,
            }}>
              <div style={{ fontWeight: 700, marginBottom: 16 }}>📅 Progression de la semaine</div>
              {DAYS.map(d => {
                const prog = dayProgress(d);
                const p = WORKOUT_PROGRAMS[d];
                return (
                  <div key={d} style={{ marginBottom: 14 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4, fontSize: 12 }}>
                      <span>{p.emoji} <span style={{ color: d === todayKey ? "#00d4aa" : "#e8eaf6" }}>{p.label}</span> — {p.focus}</span>
                      <span style={{ fontWeight: 700, color: prog === 100 ? "#00d4aa" : "#7c83a0" }}>{prog}%</span>
                    </div>
                    <div style={{ background: "rgba(255,255,255,0.06)", borderRadius: 6, height: 6 }}>
                      <div style={{
                        width: `${prog}%`, height: "100%", borderRadius: 6,
                        background: prog === 100 ? "linear-gradient(90deg, #00d4aa, #0099ff)" : "linear-gradient(90deg, #ff6b35, #ff4757)",
                        transition: "width 0.5s",
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translate(-50%, -20px); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
        input::-webkit-inner-spin-button { opacity: 0.5; }
        * { -webkit-tap-highlight-color: transparent; }
      `}</style>
    </div>
  );
}
