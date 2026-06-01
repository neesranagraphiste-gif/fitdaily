import { useState, useEffect } from "react";

const WORKOUT_PROGRAMS = {
  lundi: { label: "Lundi", focus: "Haut du corps", emoji: "💪", exercises: [
    { name: "Pompes classiques", sets: 4, reps: "15", rest: 60, calories: 8, desc: "Mains a largeur d'epaules, corps droit" },
    { name: "Pompes larges", sets: 3, reps: "12", rest: 60, calories: 7, desc: "Mains plus larges que les epaules" },
    { name: "Pompes triceps", sets: 3, reps: "10", rest: 60, calories: 6, desc: "Mains serrees sous la poitrine" },
    { name: "Dips sur chaise", sets: 4, reps: "12", rest: 60, calories: 7, desc: "Dos a la chaise, coudes vers l'arriere" },
    { name: "Pike push-ups", sets: 3, reps: "10", rest: 60, calories: 6, desc: "Corps en V inverse, flechir les coudes" },
    { name: "Planche", sets: 4, reps: "45s", rest: 45, calories: 5, desc: "Corps rigide, abdos contractes" },
  ]},
  mardi: { label: "Mardi", focus: "Bas du corps", emoji: "🦵", exercises: [
    { name: "Squats", sets: 4, reps: "20", rest: 60, calories: 10, desc: "Pieds a largeur d'epaules, genoux alignes" },
    { name: "Fentes avant", sets: 3, reps: "12/jambe", rest: 60, calories: 9, desc: "Grand pas en avant, genou a 90" },
    { name: "Squats saute", sets: 3, reps: "15", rest: 60, calories: 12, desc: "Squat puis saut explosif" },
    { name: "Hip thrusts sol", sets: 4, reps: "20", rest: 45, calories: 8, desc: "Dos au sol, pousser les hanches vers le haut" },
    { name: "Mollets debout", sets: 4, reps: "25", rest: 45, calories: 5, desc: "Se lever sur la pointe des pieds" },
    { name: "Wall sit", sets: 3, reps: "45s", rest: 60, calories: 6, desc: "Dos au mur, cuisses paralleles au sol" },
  ]},
  mercredi: { label: "Mercredi", focus: "Cardio HIIT", emoji: "🔥", exercises: [
    { name: "Burpees", sets: 4, reps: "10", rest: 45, calories: 15, desc: "Sol pompe saut etoile" },
    { name: "Mountain climbers", sets: 4, reps: "30s", rest: 30, calories: 12, desc: "Position pompe, genoux vers la poitrine vite" },
    { name: "Jumping jacks", sets: 3, reps: "40", rest: 30, calories: 8, desc: "Sauts avec ecart des bras et jambes" },
    { name: "High knees", sets: 4, reps: "30s", rest: 30, calories: 10, desc: "Course sur place, genoux hauts" },
    { name: "Squat jumps", sets: 3, reps: "15", rest: 45, calories: 12, desc: "Squat profond puis saut" },
    { name: "Planche dynamique", sets: 3, reps: "30s", rest: 30, calories: 8, desc: "Planche toucher epaule alternee" },
  ]},
  jeudi: { label: "Jeudi", focus: "Core & Abdos", emoji: "⚡", exercises: [
    { name: "Crunchs", sets: 4, reps: "25", rest: 45, calories: 5, desc: "Dos au sol, mains aux tempes" },
    { name: "Planche laterale", sets: 3, reps: "30s/cote", rest: 45, calories: 5, desc: "Corps aligne sur le cote" },
    { name: "Russian twists", sets: 4, reps: "20", rest: 45, calories: 6, desc: "Pieds leves, rotation du buste" },
    { name: "Leg raises", sets: 4, reps: "15", rest: 45, calories: 6, desc: "Dos au sol, lever les jambes tendues" },
    { name: "Superman", sets: 3, reps: "15", rest: 45, calories: 4, desc: "Ventre au sol, lever bras et jambes" },
    { name: "Bicycle crunchs", sets: 3, reps: "20/cote", rest: 45, calories: 7, desc: "Alterner coude genou oppose" },
  ]},
  vendredi: { label: "Vendredi", focus: "Full Body", emoji: "🏋️", exercises: [
    { name: "Burpees pompes", sets: 4, reps: "8", rest: 60, calories: 14, desc: "Burpee classique + pompe au sol" },
    { name: "Squat + presse", sets: 4, reps: "15", rest: 60, calories: 10, desc: "Squat + extension bras vers le haut" },
    { name: "Fentes sautees", sets: 3, reps: "10/jambe", rest: 60, calories: 12, desc: "Alterner fentes avec saut" },
    { name: "Pompes + rotation", sets: 3, reps: "10", rest: 60, calories: 8, desc: "Pompe + ouverture laterale du bras" },
    { name: "Bear crawl", sets: 3, reps: "30s", rest: 45, calories: 10, desc: "A 4 pattes, avancer en gardant les genoux leves" },
    { name: "Etirements", sets: 1, reps: "5min", rest: 0, calories: 3, desc: "Bien s'etirer apres l'effort" },
  ]},
  samedi: { label: "Samedi", focus: "Active Recovery", emoji: "🧘", exercises: [
    { name: "Marche rapide", sets: 1, reps: "20min", rest: 0, calories: 80, desc: "Rythme modere, respiration nasale" },
    { name: "Yoga flow", sets: 1, reps: "15min", rest: 0, calories: 30, desc: "Enchainement salutation au soleil" },
    { name: "Etirements complets", sets: 1, reps: "10min", rest: 0, calories: 15, desc: "Toutes les grandes chaines musculaires" },
    { name: "Respiration profonde", sets: 3, reps: "10", rest: 0, calories: 2, desc: "Inspiration 4s, hold 4s, expiration 6s" },
  ]},
  dimanche: { label: "Dimanche", focus: "Repos", emoji: "😴", exercises: [] },
};

const DEFAULT_FOODS = [
  { id: "d1", name: "Oeufs (1)", cal: 70, p: 6, g: 0.5, l: 5, unit: "unite", custom: false },
  { id: "d2", name: "Blanc de poulet (100g)", cal: 165, p: 31, g: 0, l: 3.6, unit: "100g", custom: false },
  { id: "d3", name: "Riz cuit (100g)", cal: 130, p: 2.7, g: 28, l: 0.3, unit: "100g", custom: false },
  { id: "d4", name: "Flocons d'avoine (50g)", cal: 190, p: 6, g: 32, l: 3.5, unit: "50g", custom: false },
  { id: "d5", name: "Banane (1)", cal: 95, p: 1.2, g: 23, l: 0.3, unit: "unite", custom: false },
  { id: "d6", name: "Yaourt grec (150g)", cal: 130, p: 12, g: 6, l: 6, unit: "150g", custom: false },
  { id: "d7", name: "Amandes (30g)", cal: 175, p: 6, g: 6, l: 15, unit: "30g", custom: false },
  { id: "d8", name: "Saumon (100g)", cal: 208, p: 20, g: 0, l: 13, unit: "100g", custom: false },
  { id: "d9", name: "Lentilles cuites (100g)", cal: 116, p: 9, g: 20, l: 0.4, unit: "100g", custom: false },
  { id: "d10", name: "Brocoli (100g)", cal: 34, p: 2.8, g: 7, l: 0.4, unit: "100g", custom: false },
  { id: "d11", name: "Pomme (1)", cal: 80, p: 0.4, g: 21, l: 0.2, unit: "unite", custom: false },
  { id: "d12", name: "Fromage blanc 0% (100g)", cal: 45, p: 8, g: 4, l: 0.1, unit: "100g", custom: false },
  { id: "d13", name: "Thon en boite (100g)", cal: 116, p: 26, g: 0, l: 1, unit: "100g", custom: false },
  { id: "d14", name: "Avocat (1/2)", cal: 120, p: 1.5, g: 6, l: 11, unit: "unite", custom: false },
  { id: "d15", name: "Pain complet (1 tranche)", cal: 70, p: 3, g: 13, l: 1, unit: "tranche", custom: false },
];

const DAYS = ["lundi","mardi","mercredi","jeudi","vendredi","samedi","dimanche"];
const DAY_LABELS = { lundi:"Lun", mardi:"Mar", mercredi:"Mer", jeudi:"Jeu", vendredi:"Ven", samedi:"Sam", dimanche:"Dim" };
const LS = {
  get: (k, fb) => { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : fb; } catch { return fb; } },
  set: (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};

const EMPTY_RECIPE = { name: "", servings: 2, category: "Dejeuner", ingredients: [], steps: [], notes: "" };
const CATEGORIES = ["Petit-dejeuner", "Dejeuner", "Diner", "Collation", "Pre-entrainement", "Post-entrainement"];

const GOAL_TYPES = ["Perte de poids", "Maintien du poids", "Prise de masse", "Amelioration cardio", "Renforcement musculaire"];

function StatsTab({ weight, setWeight, height, setHeight, age, setAge, gender, setGender, bmr, tdee, targetCal, netCal, totalCalEaten, calBurned, dayProgress, todayKey, DAYS, inp, card }) {
  const [goals, setGoals] = useState(() => LS.get("goals", {
    type: "Perte de poids",
    targetWeight: "",
    startWeight: "",
    startDate: new Date().toISOString().split("T")[0],
    weeklyTarget: 0.5,
    notes: "",
  }));
  const [weightLog, setWeightLog] = useState(() => LS.get("weightLog", []));
  const [editingGoal, setEditingGoal] = useState(false);
  const [newWeight, setNewWeight] = useState("");

  useEffect(() => { LS.set("goals", goals); }, [goals]);
  useEffect(() => { LS.set("weightLog", weightLog); }, [weightLog]);

  const saveGoal = (updates) => { setGoals(prev => ({ ...prev, ...updates })); setEditingGoal(false); };

  const addWeightEntry = () => {
    const val = parseFloat(newWeight);
    if (!val || val < 30 || val > 300) return;
    const entry = { date: new Date().toISOString().split("T")[0], weight: val, id: Date.now() };
    setWeightLog(prev => {
      const filtered = prev.filter(e => e.date !== entry.date);
      return [...filtered, entry].sort((a,b) => a.date.localeCompare(b.date));
    });
    setNewWeight("");
  };

  const imc = (weight / Math.pow(height / 100, 2)).toFixed(1);
  const imcStatus = imc < 18.5 ? { label:"Sous-poids", color:"#0099ff" } : imc < 25 ? { label:"Normal", color:"#00d4aa" } : imc < 30 ? { label:"Surpoids", color:"#ff6b35" } : { label:"Obesite", color:"#ff4757" };

  const lastWeight = weightLog.length > 0 ? weightLog[weightLog.length - 1].weight : null;
  const firstWeight = weightLog.length > 0 ? weightLog[0].weight : null;
  const weightDiff = lastWeight && firstWeight ? (lastWeight - firstWeight).toFixed(1) : null;

  // Indicateur calorique
  const calOk = totalCalEaten > 0 && netCal <= targetCal && netCal >= targetCal * 0.7;
  const calOver = netCal > targetCal;
  const calUnder = totalCalEaten > 0 && netCal < targetCal * 0.7;
  const calEmpty = totalCalEaten === 0;
  let calStatus, calColor, calBg, calIcon;
  if (calEmpty) { calStatus = "Aucun repas enregistre aujourd'hui"; calColor = "#7c83a0"; calBg = "rgba(255,255,255,0.04)"; calIcon = "⏳"; }
  else if (calOk) { calStatus = "Parfait ! Vous etes dans votre objectif."; calColor = "#00d4aa"; calBg = "rgba(0,212,170,0.08)"; calIcon = "✅"; }
  else if (calOver) { calStatus = `Depassement de ${netCal - targetCal} kcal. Reduisez un peu.`; calColor = "#ff4757"; calBg = "rgba(255,71,87,0.08)"; calIcon = "🔴"; }
  else if (calUnder) { calStatus = `Apport trop bas (${netCal} kcal). Mangez davantage !`; calColor = "#ff6b35"; calBg = "rgba(255,107,53,0.08)"; calIcon = "⚠️"; }

  const daysElapsed = goals.startDate ? Math.floor((new Date() - new Date(goals.startDate)) / (1000*60*60*24)) : 0;
  const expectedLoss = goals.weeklyTarget ? (daysElapsed / 7 * goals.weeklyTarget).toFixed(1) : null;
  const actualLoss = weightDiff ? Math.abs(weightDiff) : null;
  const onTrack = actualLoss && expectedLoss ? parseFloat(actualLoss) >= parseFloat(expectedLoss) * 0.8 : null;

  return (
    <div>
      {/* INDICATEUR CALORIQUE DU JOUR */}
      <div style={{ background:calBg, border:`1px solid ${calColor}44`, borderRadius:20, padding:20, marginBottom:16 }}>
        <div style={{ fontSize:11, color:calColor, textTransform:"uppercase", letterSpacing:2, fontWeight:700, marginBottom:8 }}>Bilan calorique</div>
        <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:12 }}>
          <div style={{ fontSize:36 }}>{calIcon}</div>
          <div>
            <div style={{ fontSize:24, fontWeight:900, color:calColor }}>{calEmpty ? "--" : netCal} <span style={{ fontSize:13, fontWeight:500, color:"#7c83a0" }}>/ {targetCal} kcal</span></div>
            <div style={{ fontSize:13, color:calColor, marginTop:2 }}>{calStatus}</div>
          </div>
        </div>
        {!calEmpty && (
          <div>
            <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:10, height:10, marginBottom:8 }}>
              <div style={{ width:`${Math.min(100, (netCal/targetCal)*100)}%`, height:"100%", borderRadius:10, background:calOk?"linear-gradient(90deg,#00d4aa,#0099ff)":calOver?"linear-gradient(90deg,#ff6b35,#ff4757)":"linear-gradient(90deg,#ff6b35,#ffaa00)", transition:"width 0.5s" }} />
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
              {[{label:"Manges",value:totalCalEaten,color:"#e8eaf6"},{label:"Brules sport",value:calBurned,color:"#ff6b35"},{label:"Net",value:netCal,color:calColor}].map(s => (
                <div key={s.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"8px", textAlign:"center" }}>
                  <div style={{ fontSize:16, fontWeight:900, color:s.color }}>{s.value}</div>
                  <div style={{ fontSize:9, color:"#7c83a0", textTransform:"uppercase" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* OBJECTIF */}
      <div style={{ ...card }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
          <div style={{ fontWeight:800, fontSize:16 }}>🎯 Mon objectif</div>
          <button onClick={() => setEditingGoal(!editingGoal)} style={{ background:editingGoal?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.07)", border:"none", color:editingGoal?"#fff":"#7c83a0", borderRadius:10, padding:"6px 14px", cursor:"pointer", fontSize:12, fontWeight:700 }}>{editingGoal ? "Sauvegarder" : "Modifier"}</button>
        </div>

        {editingGoal ? (
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <div style={{ fontSize:11, color:"#7c83a0", marginBottom:8 }}>Type d'objectif</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                {GOAL_TYPES.map(t => (
                  <button key={t} onClick={() => setGoals(p => ({...p, type:t}))} style={{ padding:"7px 12px", borderRadius:20, cursor:"pointer", fontSize:11, fontWeight:700, background:goals.type===t?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.07)", border:"none", color:goals.type===t?"#fff":"#7c83a0" }}>{t}</button>
                ))}
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
              <div><div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Poids de depart (kg)</div><input type="number" step="0.1" value={goals.startWeight} onChange={e => setGoals(p => ({...p,startWeight:e.target.value}))} placeholder="Ex: 85" style={inp} /></div>
              <div><div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Poids cible (kg)</div><input type="number" step="0.1" value={goals.targetWeight} onChange={e => setGoals(p => ({...p,targetWeight:e.target.value}))} placeholder="Ex: 75" style={inp} /></div>
              <div><div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Date de debut</div><input type="date" value={goals.startDate} onChange={e => setGoals(p => ({...p,startDate:e.target.value}))} style={inp} /></div>
              <div>
                <div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Objectif hebdo (kg/sem)</div>
                <select value={goals.weeklyTarget} onChange={e => setGoals(p => ({...p,weeklyTarget:parseFloat(e.target.value)}))} style={{ ...inp, cursor:"pointer" }}>
                  {[0.25,0.5,0.75,1].map(v => <option key={v} value={v}>{v} kg/semaine</option>)}
                </select>
              </div>
            </div>
            <div><div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Notes / motivation</div><textarea value={goals.notes} onChange={e => setGoals(p => ({...p,notes:e.target.value}))} placeholder="Pourquoi je fais ca, ma motivation..." rows={2} style={{ ...inp, resize:"none" }} /></div>
            <button onClick={() => setEditingGoal(false)} style={{ padding:"12px", borderRadius:12, background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", fontWeight:800, cursor:"pointer", fontSize:14 }}>Enregistrer l'objectif</button>
          </div>
        ) : (
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:16 }}>
              <div style={{ width:48, height:48, borderRadius:16, background:"linear-gradient(135deg,#00d4aa22,#0099ff22)", border:"1px solid #00d4aa44", display:"flex", alignItems:"center", justifyContent:"center", fontSize:24 }}>
                {goals.type==="Perte de poids"?"⬇️":goals.type==="Prise de masse"?"⬆️":goals.type==="Maintien du poids"?"⚖️":"🏃"}
              </div>
              <div>
                <div style={{ fontWeight:800, fontSize:16 }}>{goals.type}</div>
                {goals.startDate && <div style={{ fontSize:11, color:"#7c83a0", marginTop:2 }}>Depuis le {new Date(goals.startDate).toLocaleDateString("fr-FR")} ({daysElapsed} jours)</div>}
              </div>
            </div>

            {goals.startWeight && goals.targetWeight && (
              <div style={{ marginBottom:16 }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#7c83a0", marginBottom:6 }}>
                  <span>{goals.startWeight} kg</span>
                  <span style={{ color:"#00d4aa", fontWeight:700 }}>Cible : {goals.targetWeight} kg</span>
                </div>
                {(() => {
                  const start = parseFloat(goals.startWeight);
                  const target = parseFloat(goals.targetWeight);
                  const current = lastWeight || weight;
                  const total = Math.abs(start - target);
                  const done = Math.abs(start - current);
                  const pct = Math.min(100, Math.round((done / total) * 100));
                  const remaining = Math.abs(current - target).toFixed(1);
                  const isOnTrack = onTrack !== null ? onTrack : true;
                  return (
                    <div>
                      <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:10, height:12, marginBottom:8 }}>
                        <div style={{ width:`${pct}%`, height:"100%", borderRadius:10, background:isOnTrack?"linear-gradient(90deg,#00d4aa,#0099ff)":"linear-gradient(90deg,#ff6b35,#ff4757)", transition:"width 0.5s", position:"relative" }}>
                          {pct > 10 && <div style={{ position:"absolute", right:6, top:"50%", transform:"translateY(-50%)", fontSize:8, fontWeight:900, color:"#fff" }}>{pct}%</div>}
                        </div>
                      </div>
                      <div style={{ display:"flex", justifyContent:"space-between", fontSize:11 }}>
                        <span style={{ color:isOnTrack?"#00d4aa":"#ff4757", fontWeight:700 }}>{isOnTrack?"✅ En bonne voie !":"⚠️ A accelerer"}</span>
                        <span style={{ color:"#7c83a0" }}>Encore {remaining} kg</span>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}

            {goals.notes && <div style={{ background:"rgba(0,212,170,0.06)", borderRadius:12, padding:"10px 14px", fontSize:13, color:"#a8b0c8", fontStyle:"italic", borderLeft:"3px solid #00d4aa" }}>{goals.notes}</div>}

            {expectedLoss && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:14 }}>
                <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"12px", textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:900, color:"#0099ff" }}>{expectedLoss} kg</div>
                  <div style={{ fontSize:10, color:"#7c83a0", marginTop:2 }}>Perte attendue</div>
                </div>
                <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"12px", textAlign:"center" }}>
                  <div style={{ fontSize:18, fontWeight:900, color:onTrack?"#00d4aa":"#ff4757" }}>{actualLoss ? `${actualLoss} kg` : "-- kg"}</div>
                  <div style={{ fontSize:10, color:"#7c83a0", marginTop:2 }}>Perte reelle</div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* SUIVI DU POIDS */}
      <div style={{ ...card }}>
        <div style={{ fontWeight:800, fontSize:16, marginBottom:14 }}>⚖️ Suivi du poids</div>
        <div style={{ display:"flex", gap:8, marginBottom:14 }}>
          <input type="number" step="0.1" value={newWeight} onChange={e => setNewWeight(e.target.value)} placeholder="Votre poids aujourd'hui (kg)" style={{ ...inp, flex:1 }} />
          <button onClick={addWeightEntry} disabled={!newWeight} style={{ padding:"10px 16px", borderRadius:10, background:newWeight?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.08)", border:"none", color:newWeight?"#fff":"#4a4f6a", cursor:newWeight?"pointer":"not-allowed", fontWeight:700, fontSize:13, flexShrink:0 }}>+ Ajouter</button>
        </div>
        {weightLog.length > 0 ? (
          <div>
            {weightDiff !== null && (
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", background:parseFloat(weightDiff)<0?"rgba(0,212,170,0.08)":"rgba(255,71,87,0.08)", border:`1px solid ${parseFloat(weightDiff)<0?"rgba(0,212,170,0.3)":"rgba(255,71,87,0.3)"}`, borderRadius:12, padding:"10px 14px", marginBottom:12 }}>
                <div><div style={{ fontSize:12, color:"#7c83a0" }}>Evolution depuis le debut</div><div style={{ fontSize:20, fontWeight:900, color:parseFloat(weightDiff)<0?"#00d4aa":"#ff4757" }}>{parseFloat(weightDiff)>0?"+":""}{weightDiff} kg</div></div>
                <div style={{ fontSize:32 }}>{parseFloat(weightDiff)<0?"📉":"📈"}</div>
              </div>
            )}
            <div style={{ maxHeight:200, overflowY:"auto" }}>
              {[...weightLog].reverse().map((entry, idx) => (
                <div key={entry.id} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:idx===0?"rgba(0,212,170,0.06)":"rgba(255,255,255,0.03)", borderRadius:10, marginBottom:6, border:`1px solid ${idx===0?"rgba(0,212,170,0.2)":"rgba(255,255,255,0.05)"}` }}>
                  <div>
                    <div style={{ fontSize:13, fontWeight:idx===0?700:500 }}>{idx===0?"Derniere mesure : ":""}{entry.weight} kg</div>
                    <div style={{ fontSize:11, color:"#7c83a0" }}>{new Date(entry.date).toLocaleDateString("fr-FR")}</div>
                  </div>
                  <button onClick={() => setWeightLog(prev => prev.filter(e => e.id!==entry.id))} style={{ background:"rgba(255,71,87,0.15)", border:"none", color:"#ff4757", borderRadius:8, width:26, height:26, cursor:"pointer", fontSize:12 }}>x</button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ textAlign:"center", padding:"20px 0", color:"#7c83a0", fontSize:13 }}>Entrez votre poids regulierement pour suivre votre evolution</div>
        )}
      </div>

      {/* PROFIL */}
      <div style={{ ...card }}>
        <div style={{ fontWeight:800, fontSize:16, marginBottom:16 }}>⚙️ Mon profil</div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          {[{label:"Poids (kg)",value:weight,set:setWeight,min:40,max:200},{label:"Taille (cm)",value:height,set:setHeight,min:140,max:220},{label:"Age",value:age,set:setAge,min:15,max:80}].map(f => (
            <div key={f.label}><div style={{ fontSize:11, color:"#7c83a0", marginBottom:4 }}>{f.label}</div><input type="number" min={f.min} max={f.max} value={f.value} onChange={e => f.set(parseInt(e.target.value)||f.value)} style={{ ...inp, fontSize:16, fontWeight:700 }} /></div>
          ))}
          <div>
            <div style={{ fontSize:11, color:"#7c83a0", marginBottom:4 }}>Genre</div>
            <div style={{ display:"flex", gap:6 }}>
              {["homme","femme"].map(g => <button key={g} onClick={() => setGender(g)} style={{ flex:1, padding:"8px", borderRadius:10, background:gender===g?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.06)", border:"none", color:gender===g?"#fff":"#7c83a0", cursor:"pointer", fontSize:12, fontWeight:700, textTransform:"capitalize" }}>{g}</button>)}
            </div>
          </div>
        </div>
      </div>

      {/* METABOLISME */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
        {[{label:"Metabolisme de base",value:Math.round(bmr),unit:"kcal/j",color:"#7c83a0",desc:"Au repos total"},{label:"Depense totale",value:tdee,unit:"kcal/j",color:"#0099ff",desc:"Activite moderee"},{label:"Objectif calorique",value:targetCal,unit:"kcal/j",color:"#00d4aa",desc:"Deficit 20% pour maigrir"},{label:"IMC",value:imc,unit:"",color:imcStatus.color,desc:imcStatus.label}].map(c => (
          <div key={c.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, border:"1px solid rgba(255,255,255,0.06)", padding:"16px 14px" }}>
            <div style={{ fontSize:22, fontWeight:900, color:c.color }}>{c.value}<span style={{ fontSize:11 }}> {c.unit}</span></div>
            <div style={{ fontSize:12, fontWeight:600, marginTop:2 }}>{c.label}</div>
            <div style={{ fontSize:10, color:c.desc===imcStatus.label?imcStatus.color:"#4a4f6a", marginTop:2, fontWeight:c.desc===imcStatus.label?700:400 }}>{c.desc}</div>
          </div>
        ))}
      </div>

      {/* SEMAINE */}
      <div style={{ ...card }}>
        <div style={{ fontWeight:700, marginBottom:16 }}>Progression de la semaine</div>
        {DAYS.map(d => {
          const prog = dayProgress(d); const p = WORKOUT_PROGRAMS[d];
          return (
            <div key={d} style={{ marginBottom:14 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4, fontSize:12 }}>
                <span>{p.emoji} <span style={{ color:d===todayKey?"#00d4aa":"#e8eaf6" }}>{p.label}</span> — {p.focus}</span>
                <span style={{ fontWeight:700, color:prog===100?"#00d4aa":"#7c83a0" }}>{prog}%</span>
              </div>
              <div style={{ background:"rgba(255,255,255,0.06)", borderRadius:6, height:6 }}>
                <div style={{ width:`${prog}%`, height:"100%", borderRadius:6, background:prog===100?"linear-gradient(90deg,#00d4aa,#0099ff)":"linear-gradient(90deg,#ff6b35,#ff4757)", transition:"width 0.5s" }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function SportApp() {
  const todayIdx = (new Date().getDay() + 6) % 7;
  const todayKey = DAYS[todayIdx];

  const [activeTab, setActiveTab] = useState("today");
  const [selectedDay, setSelectedDay] = useState(todayKey);
  const [completedSets, setCompletedSets] = useState(() => LS.get("completedSets", {}));
  const [calorieLog, setCalorieLog] = useState(() => LS.get("calorieLog", []));
  const [customFoods, setCustomFoods] = useState(() => LS.get("customFoods", []));
  const [recipes, setRecipes] = useState(() => LS.get("recipes", []));
  const [searchFood, setSearchFood] = useState("");
  const [selectedFood, setSelectedFood] = useState(null);
  const [foodQty, setFoodQty] = useState(1);
  const [weight, setWeight] = useState(() => LS.get("weight", 75));
  const [height, setHeight] = useState(() => LS.get("height", 175));
  const [age, setAge] = useState(() => LS.get("age", 28));
  const [gender, setGender] = useState(() => LS.get("gender", "homme"));
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);
  const [notification, setNotification] = useState(null);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", unit: "100g", cal: "", p: "", g: "", l: "" });
  const [productTab, setProductTab] = useState("search");

  // Recettes state
  const [recipeView, setRecipeView] = useState("list"); // list | create | detail
  const [editingRecipe, setEditingRecipe] = useState(null);
  const [viewingRecipe, setViewingRecipe] = useState(null);
  const [recipeForm, setRecipeForm] = useState(EMPTY_RECIPE);
  const [ingSearch, setIngSearch] = useState("");
  const [ingQty, setIngQty] = useState(1);
  const [ingSelected, setIngSelected] = useState(null);
  const [newStepText, setNewStepText] = useState("");
  const [recipeFilter, setRecipeFilter] = useState("Tout");

  useEffect(() => { LS.set("completedSets", completedSets); }, [completedSets]);
  useEffect(() => { LS.set("calorieLog", calorieLog); }, [calorieLog]);
  useEffect(() => { LS.set("customFoods", customFoods); }, [customFoods]);
  useEffect(() => { LS.set("recipes", recipes); }, [recipes]);
  useEffect(() => { LS.set("weight", weight); }, [weight]);
  useEffect(() => { LS.set("height", height); }, [height]);
  useEffect(() => { LS.set("age", age); }, [age]);
  useEffect(() => { LS.set("gender", gender); }, [gender]);

  const allFoods = [...DEFAULT_FOODS, ...customFoods];
  const bmr = gender === "homme" ? 10*weight+6.25*height-5*age+5 : 10*weight+6.25*height-5*age-161;
  const tdee = Math.round(bmr * 1.55);
  const targetCal = Math.round(tdee * 0.8);
  const totalCalEaten = calorieLog.reduce((s, f) => s + f.totalCal, 0);
  const calBurned = Object.keys(completedSets).reduce((sum, key) => {
    const parts = key.split("-");
    if (parts[0] === todayKey) { const ex = WORKOUT_PROGRAMS[parts[0]]?.exercises[parseInt(parts[1])]; return sum + (ex?.calories || 0); }
    return sum;
  }, 0);
  const netCal = totalCalEaten - calBurned;
  const macroP = calorieLog.reduce((s, f) => s + f.totalP, 0);
  const macroG = calorieLog.reduce((s, f) => s + f.totalG, 0);
  const macroL = calorieLog.reduce((s, f) => s + f.totalL, 0);

  useEffect(() => {
    let iv;
    if (timerRunning && timerSeconds > 0) iv = setInterval(() => setTimerSeconds(s => s-1), 1000);
    else if (timerSeconds === 0 && timerRunning) { setTimerRunning(false); showNotif("Repos termine !"); }
    return () => clearInterval(iv);
  }, [timerRunning, timerSeconds]);

  const showNotif = (msg) => { setNotification(msg); setTimeout(() => setNotification(null), 3000); };
  const startRest = (s) => { setTimerSeconds(s); setTimerRunning(true); };

  const toggleSet = (day, exIdx, setIdx, restTime) => {
    const key = `${day}-${exIdx}-${setIdx}`;
    setCompletedSets(prev => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else { next[key] = true; if (restTime > 0) startRest(restTime); showNotif("Set complete !"); }
      return next;
    });
  };

  const isSetDone = (day, ei, si) => !!completedSets[`${day}-${ei}-${si}`];
  const exProgress = (day, ei, total) => { let d=0; for(let i=0;i<total;i++) if(isSetDone(day,ei,i)) d++; return d; };
  const dayProgress = (day) => {
    const p = WORKOUT_PROGRAMS[day];
    if (!p.exercises.length) return 100;
    let total=0, done=0;
    p.exercises.forEach((ex,ei) => { total+=ex.sets; for(let s=0;s<ex.sets;s++) if(isSetDone(day,ei,s)) done++; });
    return total ? Math.round((done/total)*100) : 0;
  };

  const filteredFoods = allFoods.filter(f => f.name.toLowerCase().includes(searchFood.toLowerCase()));
  const filteredIngFoods = allFoods.filter(f => f.name.toLowerCase().includes(ingSearch.toLowerCase()));

  const addFoodToLog = () => {
    if (!selectedFood) return;
    const item = { ...selectedFood, qty: foodQty, totalCal: Math.round(selectedFood.cal*foodQty), totalP: Math.round(selectedFood.p*foodQty*10)/10, totalG: Math.round(selectedFood.g*foodQty*10)/10, totalL: Math.round(selectedFood.l*foodQty*10)/10, logId: Date.now() };
    setCalorieLog(prev => [...prev, item]);
    setSelectedFood(null); setSearchFood(""); setFoodQty(1);
    showNotif("Aliment ajoute !");
  };

  const saveCustomProduct = () => {
    if (!newProduct.name || !newProduct.cal) return;
    const product = { id: `c_${Date.now()}`, name: newProduct.name, unit: newProduct.unit, cal: parseFloat(newProduct.cal)||0, p: parseFloat(newProduct.p)||0, g: parseFloat(newProduct.g)||0, l: parseFloat(newProduct.l)||0, custom: true };
    setCustomFoods(prev => [...prev, product]);
    setNewProduct({ name:"", unit:"100g", cal:"", p:"", g:"", l:"" });
    setShowAddProduct(false);
    showNotif(`"${product.name}" enregistre !`);
  };

  // Recettes helpers
  const recipeCalPerServing = (recipe) => {
    const total = recipe.ingredients.reduce((s, ing) => s + ing.totalCal, 0);
    return Math.round(total / (recipe.servings || 1));
  };
  const recipeTotals = (recipe) => ({
    cal: recipe.ingredients.reduce((s, i) => s + i.totalCal, 0),
    p: recipe.ingredients.reduce((s, i) => s + i.totalP, 0),
    g: recipe.ingredients.reduce((s, i) => s + i.totalG, 0),
    l: recipe.ingredients.reduce((s, i) => s + i.totalL, 0),
  });

  const addIngredientToRecipe = () => {
    if (!ingSelected) return;
    const ing = {
      ...ingSelected,
      qty: ingQty,
      totalCal: Math.round(ingSelected.cal * ingQty),
      totalP: Math.round(ingSelected.p * ingQty * 10) / 10,
      totalG: Math.round(ingSelected.g * ingQty * 10) / 10,
      totalL: Math.round(ingSelected.l * ingQty * 10) / 10,
      ingId: Date.now(),
    };
    setRecipeForm(prev => ({ ...prev, ingredients: [...prev.ingredients, ing] }));
    setIngSelected(null); setIngSearch(""); setIngQty(1);
  };

  const removeIngredient = (ingId) => setRecipeForm(prev => ({ ...prev, ingredients: prev.ingredients.filter(i => i.ingId !== ingId) }));

  const addStep = () => {
    if (!newStepText.trim()) return;
    setRecipeForm(prev => ({ ...prev, steps: [...prev.steps, { id: Date.now(), text: newStepText.trim() }] }));
    setNewStepText("");
  };

  const removeStep = (id) => setRecipeForm(prev => ({ ...prev, steps: prev.steps.filter(s => s.id !== id) }));

  const saveRecipe = () => {
    if (!recipeForm.name || recipeForm.ingredients.length === 0) { showNotif("Nom et ingredients requis !"); return; }
    if (editingRecipe) {
      setRecipes(prev => prev.map(r => r.id === editingRecipe ? { ...recipeForm, id: editingRecipe } : r));
      showNotif("Recette mise a jour !");
    } else {
      setRecipes(prev => [...prev, { ...recipeForm, id: `r_${Date.now()}` }]);
      showNotif("Recette enregistree !");
    }
    setRecipeForm(EMPTY_RECIPE); setRecipeView("list"); setEditingRecipe(null);
  };

  const deleteRecipe = (id) => { setRecipes(prev => prev.filter(r => r.id !== id)); showNotif("Recette supprimee"); };

  const addRecipeToLog = (recipe) => {
    const tot = recipeTotals(recipe);
    const perServing = recipe.servings || 1;
    const item = {
      id: recipe.id, name: `${recipe.name} (1 portion)`, unit: "portion",
      totalCal: Math.round(tot.cal / perServing),
      totalP: Math.round(tot.p / perServing * 10) / 10,
      totalG: Math.round(tot.g / perServing * 10) / 10,
      totalL: Math.round(tot.l / perServing * 10) / 10,
      logId: Date.now(),
    };
    setCalorieLog(prev => [...prev, item]);
    showNotif(`${recipe.name} ajoute au journal !`);
  };

  const startEditRecipe = (recipe) => {
    setRecipeForm({ ...recipe });
    setEditingRecipe(recipe.id);
    setRecipeView("create");
  };

  const filteredRecipes = recipes.filter(r => recipeFilter === "Tout" || r.category === recipeFilter);

  const program = WORKOUT_PROGRAMS[selectedDay];
  const todayProgram = WORKOUT_PROGRAMS[todayKey];
  const todayDone = dayProgress(todayKey);

  const inp = { width:"100%", padding:"10px 14px", borderRadius:10, background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.12)", color:"#e8eaf6", fontSize:14, outline:"none", boxSizing:"border-box" };
  const card = { background:"rgba(255,255,255,0.04)", borderRadius:20, border:"1px solid rgba(255,255,255,0.08)", padding:16, marginBottom:16 };

  return (
    <div style={{ minHeight:"100vh", background:"linear-gradient(135deg,#0a0a0f 0%,#0f1a2e 50%,#0a0f1a 100%)", fontFamily:"'DM Sans','Segoe UI',sans-serif", color:"#e8eaf6", overflowX:"hidden" }}>

      {notification && <div style={{ position:"fixed", top:20, left:"50%", transform:"translateX(-50%)", background:"linear-gradient(135deg,#00d4aa,#0099ff)", color:"#fff", padding:"12px 24px", borderRadius:50, fontWeight:700, fontSize:14, zIndex:9999, whiteSpace:"nowrap", boxShadow:"0 8px 32px rgba(0,212,170,0.4)" }}>{notification}</div>}

      {timerRunning && (
        <div style={{ position:"fixed", bottom:100, right:20, background:"linear-gradient(135deg,#1a1a2e,#16213e)", border:"2px solid #00d4aa", borderRadius:20, padding:"16px 24px", zIndex:999, textAlign:"center" }}>
          <div style={{ fontSize:11, color:"#00d4aa", textTransform:"uppercase", letterSpacing:2, marginBottom:4 }}>REPOS</div>
          <div style={{ fontSize:40, fontWeight:900, color:"#fff", lineHeight:1 }}>{timerSeconds}s</div>
          <button onClick={() => setTimerRunning(false)} style={{ marginTop:8, background:"transparent", border:"1px solid #ff4757", color:"#ff4757", borderRadius:8, padding:"4px 12px", cursor:"pointer", fontSize:11 }}>Passer</button>
        </div>
      )}

      {/* MODAL AJOUT PRODUIT */}
      {showAddProduct && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.85)", zIndex:8888, display:"flex", alignItems:"flex-end" }}>
          <div style={{ width:"100%", background:"linear-gradient(180deg,#0f1a2e,#0a0a0f)", borderRadius:"24px 24px 0 0", padding:24, paddingBottom:40, maxHeight:"92vh", overflowY:"auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
              <div style={{ fontWeight:800, fontSize:18 }}>Nouveau produit</div>
              <button onClick={() => setShowAddProduct(false)} style={{ background:"rgba(255,255,255,0.1)", border:"none", color:"#fff", borderRadius:10, width:32, height:32, cursor:"pointer", fontSize:18 }}>x</button>
            </div>
            <div style={{ fontSize:12, color:"#7c83a0", marginBottom:20 }}>Reportez les valeurs de l'etiquette nutritionnelle.</div>
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div><div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Nom du produit *</div><input value={newProduct.name} onChange={e => setNewProduct(p => ({...p,name:e.target.value}))} placeholder="Ex: Skyr Lidl..." style={inp} /></div>
              <div>
                <div style={{ fontSize:11, color:"#7c83a0", marginBottom:8 }}>Unite de reference</div>
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  {["100g","100ml","1 portion","1 unite"].map(u => <button key={u} onClick={() => setNewProduct(p => ({...p,unit:u}))} style={{ padding:"8px 14px", borderRadius:10, cursor:"pointer", fontSize:12, fontWeight:600, background:newProduct.unit===u?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.07)", border:"none", color:newProduct.unit===u?"#fff":"#7c83a0" }}>{u}</button>)}
                </div>
              </div>
              <div><div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Calories (kcal) *</div><input type="number" min="0" value={newProduct.cal} onChange={e => setNewProduct(p => ({...p,cal:e.target.value}))} placeholder="Ex: 65" style={inp} /></div>
              <div>
                <div style={{ fontSize:11, color:"#7c83a0", marginBottom:8 }}>Macronutriments (g)</div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                  {[{label:"Proteines",key:"p"},{label:"Glucides",key:"g"},{label:"Lipides",key:"l"}].map(f => (
                    <div key={f.key}><div style={{ fontSize:10, color:"#7c83a0", marginBottom:6 }}>{f.label}</div><input type="number" min="0" step="0.1" value={newProduct[f.key]} onChange={e => setNewProduct(p => ({...p,[f.key]:e.target.value}))} style={{ ...inp, fontSize:13 }} /></div>
                  ))}
                </div>
              </div>
              <button onClick={saveCustomProduct} disabled={!newProduct.name||!newProduct.cal} style={{ padding:16, borderRadius:14, fontWeight:800, fontSize:15, cursor:newProduct.name&&newProduct.cal?"pointer":"not-allowed", background:newProduct.name&&newProduct.cal?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.08)", border:"none", color:newProduct.name&&newProduct.cal?"#fff":"#4a4f6a" }}>
                Enregistrer dans ma base
              </button>
            </div>
          </div>
        </div>
      )}

      {/* HEADER */}
      <div style={{ background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.08)", padding:"20px 20px 16px" }}>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <div>
            <div style={{ fontSize:11, color:"#00d4aa", textTransform:"uppercase", letterSpacing:3, marginBottom:4 }}>FIT DAILY</div>
            <div style={{ fontSize:22, fontWeight:800 }}>{todayProgram.emoji} {todayProgram.label.toUpperCase()}</div>
          </div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontSize:11, color:"#7c83a0", marginBottom:4 }}>Serie active</div>
            <div style={{ fontSize:24, fontWeight:900, color:"#ff6b35" }}>7</div>
          </div>
        </div>
        <div style={{ marginTop:14 }}>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#7c83a0", marginBottom:6 }}>
            <span>Progression aujourd'hui</span><span style={{ color:"#00d4aa", fontWeight:700 }}>{todayDone}%</span>
          </div>
          <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:10, height:6 }}>
            <div style={{ width:`${todayDone}%`, height:"100%", borderRadius:10, background:"linear-gradient(90deg,#00d4aa,#0099ff)", transition:"width 0.5s" }} />
          </div>
        </div>
      </div>

      {/* NAV */}
      <div style={{ display:"flex", background:"rgba(255,255,255,0.03)", borderBottom:"1px solid rgba(255,255,255,0.06)" }}>
        {[{key:"today",label:"Auj.",icon:"🏠"},{key:"week",label:"Sport",icon:"💪"},{key:"calories",label:"Nutrition",icon:"🥗"},{key:"recipes",label:"Recettes",icon:"👨‍🍳"},{key:"stats",label:"Stats",icon:"📊"}].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{ flex:1, padding:"10px 2px", background:"transparent", border:"none", color:activeTab===tab.key?"#00d4aa":"#7c83a0", fontSize:9, fontWeight:activeTab===tab.key?700:500, cursor:"pointer", borderBottom:activeTab===tab.key?"2px solid #00d4aa":"2px solid transparent" }}>
            <div style={{ fontSize:16, marginBottom:2 }}>{tab.icon}</div>{tab.label}
          </button>
        ))}
      </div>

      <div style={{ padding:"16px 16px 100px" }}>

        {/* TODAY */}
        {activeTab === "today" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:20 }}>
              {[{label:"Cibles",value:targetCal,color:"#0099ff",sub:"kcal objectif"},{label:"Mangees",value:totalCalEaten,color:totalCalEaten>targetCal?"#ff4757":"#00d4aa",sub:"kcal aujourd'hui"},{label:"Brulees",value:calBurned,color:"#ff6b35",sub:"kcal sport"}].map(c => (
                <div key={c.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:"14px 10px", border:"1px solid rgba(255,255,255,0.06)", textAlign:"center" }}>
                  <div style={{ fontSize:20, fontWeight:900, color:c.color }}>{c.value}</div>
                  <div style={{ fontSize:9, color:"#7c83a0", marginTop:2 }}>{c.sub}</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <div style={{ fontWeight:700, fontSize:16 }}>{todayProgram.emoji} {todayProgram.focus}</div>
              <div style={{ background:"rgba(0,212,170,0.1)", border:"1px solid rgba(0,212,170,0.3)", borderRadius:20, padding:"4px 12px", fontSize:11, color:"#00d4aa" }}>~60 min</div>
            </div>
            {todayProgram.exercises.length === 0 ? (
              <div style={{ textAlign:"center", padding:"60px 20px", background:"rgba(255,255,255,0.03)", borderRadius:20, border:"1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize:60 }}>😴</div>
                <div style={{ fontSize:20, fontWeight:800, marginTop:16 }}>Journee de repos</div>
                <div style={{ fontSize:14, color:"#7c83a0", marginTop:8 }}>Le repos fait partie de l'entrainement !</div>
              </div>
            ) : todayProgram.exercises.map((ex,ei) => {
              const done = exProgress(todayKey,ei,ex.sets);
              const isDone = done===ex.sets;
              return (
                <div key={ei} style={{ background:isDone?"rgba(0,212,170,0.08)":"rgba(255,255,255,0.04)", border:`1px solid ${isDone?"rgba(0,212,170,0.3)":"rgba(255,255,255,0.06)"}`, borderRadius:16, padding:16, marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                    <div><div style={{ fontWeight:700, fontSize:15 }}>{isDone?"✅ ":""}{ex.name}</div><div style={{ fontSize:11, color:"#7c83a0", marginTop:2 }}>{ex.desc}</div></div>
                    <div style={{ textAlign:"right", flexShrink:0 }}><div style={{ fontSize:12, color:"#ff6b35", fontWeight:700 }}>~{ex.calories*ex.sets} kcal</div><div style={{ fontSize:11, color:"#7c83a0" }}>{ex.sets}x{ex.reps}</div></div>
                  </div>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    {Array.from({length:ex.sets}).map((_,si) => (
                      <button key={si} onClick={() => toggleSet(todayKey,ei,si,ex.rest)} style={{ padding:"8px 16px", borderRadius:10, background:isSetDone(todayKey,ei,si)?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.08)", border:`1px solid ${isSetDone(todayKey,ei,si)?"transparent":"rgba(255,255,255,0.12)"}`, color:isSetDone(todayKey,ei,si)?"#fff":"#7c83a0", cursor:"pointer", fontSize:12, fontWeight:700 }}>Set {si+1}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* WEEK */}
        {activeTab === "week" && (
          <div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:6, marginBottom:20 }}>
              {DAYS.map(d => {
                const prog = dayProgress(d); const isSel = d===selectedDay;
                return (
                  <button key={d} onClick={() => setSelectedDay(d)} style={{ background:isSel?"rgba(0,212,170,0.1)":"rgba(255,255,255,0.04)", border:`1px solid ${isSel?"#00d4aa":"rgba(255,255,255,0.08)"}`, borderRadius:12, padding:"8px 2px", cursor:"pointer", color:d===todayKey?"#00d4aa":"#e8eaf6", textAlign:"center" }}>
                    <div style={{ fontSize:9, marginBottom:2, opacity:0.7 }}>{DAY_LABELS[d]}</div>
                    <div style={{ fontSize:16 }}>{WORKOUT_PROGRAMS[d].emoji}</div>
                    <div style={{ width:"60%", margin:"4px auto 0", height:3, borderRadius:2, background:"rgba(255,255,255,0.1)" }}>
                      <div style={{ width:`${prog}%`, height:"100%", borderRadius:2, background:"#00d4aa" }} />
                    </div>
                  </button>
                );
              })}
            </div>
            <div style={{ ...card }}>
              <div style={{ fontWeight:800, fontSize:18 }}>{program.emoji} {program.label} — {program.focus}</div>
              <div style={{ fontSize:12, color:"#7c83a0", marginTop:4 }}>{program.exercises.length} exercices • {dayProgress(selectedDay)}% complete</div>
            </div>
            {program.exercises.length === 0 ? (
              <div style={{ textAlign:"center", padding:"40px 0", color:"#7c83a0" }}><div style={{ fontSize:40 }}>😴</div><div style={{ marginTop:12 }}>Repos</div></div>
            ) : program.exercises.map((ex,ei) => {
              const done = exProgress(selectedDay,ei,ex.sets);
              return (
                <div key={ei} style={{ background:done===ex.sets?"rgba(0,212,170,0.06)":"rgba(255,255,255,0.03)", border:`1px solid ${done===ex.sets?"rgba(0,212,170,0.2)":"rgba(255,255,255,0.06)"}`, borderRadius:14, padding:"14px 16px", marginBottom:10 }}>
                  <div style={{ display:"flex", justifyContent:"space-between" }}>
                    <div><div style={{ fontWeight:700 }}>{done===ex.sets?"✅ ":""}{ex.name}</div><div style={{ fontSize:11, color:"#7c83a0", marginTop:2 }}>{ex.desc}</div></div>
                    <div style={{ textAlign:"right", fontSize:12 }}><div style={{ color:"#ff6b35", fontWeight:700 }}>~{ex.calories*ex.sets} kcal</div><div style={{ color:"#7c83a0" }}>{ex.sets}x{ex.reps}</div></div>
                  </div>
                  <div style={{ display:"flex", gap:6, marginTop:10, flexWrap:"wrap" }}>
                    {Array.from({length:ex.sets}).map((_,si) => (
                      <button key={si} onClick={() => toggleSet(selectedDay,ei,si,ex.rest)} style={{ padding:"6px 14px", borderRadius:8, background:isSetDone(selectedDay,ei,si)?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.07)", border:"none", color:isSetDone(selectedDay,ei,si)?"#fff":"#7c83a0", cursor:"pointer", fontSize:11, fontWeight:700 }}>Set {si+1}</button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* CALORIES */}
        {activeTab === "calories" && (
          <div>
            <div style={{ ...card }}>
              <div style={{ fontSize:12, color:"#7c83a0", marginBottom:4 }}>Bilan calorique du jour</div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end" }}>
                <div><div style={{ fontSize:36, fontWeight:900, color:netCal>targetCal?"#ff4757":"#00d4aa" }}>{netCal}</div><div style={{ fontSize:11, color:"#7c83a0" }}>kcal nettes / {targetCal} objectif</div></div>
                <div style={{ textAlign:"right" }}><div style={{ fontSize:12, color:"#4a4f6a" }}>+{totalCalEaten} mangees</div><div style={{ fontSize:12, color:"#ff6b35" }}>-{calBurned} brulees</div></div>
              </div>
              <div style={{ marginTop:12, background:"rgba(255,255,255,0.08)", borderRadius:8, height:8 }}>
                <div style={{ width:`${Math.min(100,(netCal/targetCal)*100)}%`, height:"100%", borderRadius:8, background:netCal>targetCal?"linear-gradient(90deg,#ff6b35,#ff4757)":"linear-gradient(90deg,#00d4aa,#0099ff)", transition:"width 0.5s" }} />
              </div>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:16 }}>
              {[{label:"Proteines",value:macroP.toFixed(0),color:"#0099ff",target:Math.round(weight*2)},{label:"Glucides",value:macroG.toFixed(0),color:"#ff6b35",target:Math.round(targetCal*0.4/4)},{label:"Lipides",value:macroL.toFixed(0),color:"#ff4757",target:Math.round(targetCal*0.3/9)}].map(m => (
                <div key={m.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:16, padding:14, border:"1px solid rgba(255,255,255,0.06)", textAlign:"center" }}>
                  <div style={{ fontSize:20, fontWeight:900, color:m.color }}>{m.value}<span style={{ fontSize:12 }}>g</span></div>
                  <div style={{ fontSize:9, color:"#7c83a0", textTransform:"uppercase", letterSpacing:1 }}>{m.label}</div>
                  <div style={{ fontSize:9, color:"#4a4f6a" }}>/{m.target}g</div>
                </div>
              ))}
            </div>
            <div style={{ display:"flex", gap:8, marginBottom:16 }}>
              {[{key:"search",label:"Ajouter"},{key:"myproducts",label:`Mes produits (${customFoods.length})`}].map(t => (
                <button key={t.key} onClick={() => setProductTab(t.key)} style={{ flex:1, padding:"10px", borderRadius:12, cursor:"pointer", fontSize:12, fontWeight:700, background:productTab===t.key?"rgba(0,212,170,0.1)":"rgba(255,255,255,0.04)", border:`1px solid ${productTab===t.key?"#00d4aa":"rgba(255,255,255,0.08)"}`, color:productTab===t.key?"#00d4aa":"#7c83a0" }}>{t.label}</button>
              ))}
            </div>

            {productTab === "search" && (
              <div>
                <div style={{ ...card }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <div style={{ fontWeight:700 }}>Rechercher un aliment</div>
                    <button onClick={() => setShowAddProduct(true)} style={{ background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", borderRadius:10, padding:"6px 12px", cursor:"pointer", fontSize:11, fontWeight:700 }}>+ Nouveau</button>
                  </div>
                  <input value={searchFood} onChange={e => setSearchFood(e.target.value)} placeholder="Rechercher..." style={inp} />
                  {searchFood && (
                    <div style={{ marginTop:8, maxHeight:200, overflowY:"auto", background:"rgba(0,0,0,0.4)", borderRadius:10, border:"1px solid rgba(255,255,255,0.08)" }}>
                      {filteredFoods.length === 0
                        ? <div style={{ padding:16, textAlign:"center", color:"#7c83a0", fontSize:13 }}>Aucun resultat — <button onClick={() => setShowAddProduct(true)} style={{ background:"none", border:"none", color:"#00d4aa", cursor:"pointer", fontWeight:700 }}>creer ce produit ?</button></div>
                        : filteredFoods.map(f => (
                          <button key={f.id} onClick={() => { setSelectedFood(f); setSearchFood(f.name); }} style={{ width:"100%", padding:"10px 14px", background:selectedFood?.id===f.id?"rgba(0,212,170,0.15)":"transparent", border:"none", color:"#e8eaf6", cursor:"pointer", textAlign:"left", display:"flex", justifyContent:"space-between", fontSize:13, borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                            <span>{f.custom?"⭐ ":""}{f.name}</span>
                            <span style={{ color:"#ff6b35", fontWeight:700 }}>{f.cal} kcal</span>
                          </button>
                        ))
                      }
                    </div>
                  )}
                  {selectedFood && (
                    <div style={{ marginTop:12 }}>
                      <div style={{ background:"rgba(0,212,170,0.06)", border:"1px solid rgba(0,212,170,0.2)", borderRadius:12, padding:12, marginBottom:10, fontSize:12 }}>
                        <div style={{ fontWeight:700, marginBottom:4 }}>{selectedFood.name}</div>
                        <div style={{ color:"#7c83a0" }}>x{foodQty} = <span style={{ color:"#ff6b35", fontWeight:700 }}>{Math.round(selectedFood.cal*foodQty)} kcal</span></div>
                      </div>
                      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                        <div style={{ fontSize:12, color:"#7c83a0" }}>Qte :</div>
                        <input type="number" min={0.5} step={0.5} value={foodQty} onChange={e => setFoodQty(parseFloat(e.target.value)||1)} style={{ width:70, padding:"8px", borderRadius:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", fontSize:14, textAlign:"center", outline:"none" }} />
                        <button onClick={addFoodToLog} style={{ flex:1, padding:"10px", borderRadius:10, background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:13 }}>Ajouter</button>
                      </div>
                    </div>
                  )}
                </div>
                {calorieLog.length > 0 && (
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
                      <div style={{ fontWeight:700 }}>Journal du jour</div>
                      <button onClick={() => { if(window.confirm("Vider le journal ?")) setCalorieLog([]); }} style={{ background:"rgba(255,71,87,0.15)", border:"1px solid rgba(255,71,87,0.3)", color:"#ff4757", borderRadius:8, padding:"4px 10px", cursor:"pointer", fontSize:11 }}>Effacer</button>
                    </div>
                    {calorieLog.map(item => (
                      <div key={item.logId} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 14px", background:"rgba(255,255,255,0.03)", borderRadius:12, marginBottom:8, border:"1px solid rgba(255,255,255,0.05)" }}>
                        <div><div style={{ fontSize:13, fontWeight:600 }}>{item.name}</div><div style={{ fontSize:11, color:"#7c83a0" }}>P:{item.totalP}g G:{item.totalG}g L:{item.totalL}g</div></div>
                        <div style={{ display:"flex", gap:10, alignItems:"center" }}>
                          <div style={{ fontSize:15, fontWeight:800, color:"#ff6b35" }}>{item.totalCal}</div>
                          <button onClick={() => setCalorieLog(prev => prev.filter(i => i.logId!==item.logId))} style={{ background:"rgba(255,71,87,0.2)", border:"none", color:"#ff4757", borderRadius:8, width:28, height:28, cursor:"pointer" }}>x</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {productTab === "myproducts" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <div style={{ fontWeight:700 }}>Mes produits perso</div>
                  <button onClick={() => setShowAddProduct(true)} style={{ background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", borderRadius:10, padding:"8px 14px", cursor:"pointer", fontSize:12, fontWeight:700 }}>+ Ajouter</button>
                </div>
                {customFoods.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"50px 20px", background:"rgba(255,255,255,0.03)", borderRadius:20, border:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize:48 }}>📦</div>
                    <div style={{ fontWeight:700, marginTop:16, marginBottom:8 }}>Aucun produit</div>
                    <div style={{ fontSize:13, color:"#7c83a0", marginBottom:20 }}>Ajoutez vos produits du quotidien depuis l'etiquette.</div>
                    <button onClick={() => setShowAddProduct(true)} style={{ background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", borderRadius:12, padding:"12px 24px", cursor:"pointer", fontWeight:700 }}>Ajouter un produit</button>
                  </div>
                ) : customFoods.map(f => (
                  <div key={f.id} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:16, padding:"14px 16px", marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                      <div style={{ flex:1 }}><div style={{ fontWeight:700 }}>⭐ {f.name}</div><div style={{ fontSize:11, color:"#7c83a0", marginTop:3 }}>/{f.unit} — P:{f.p}g G:{f.g}g L:{f.l}g</div></div>
                      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                        <div style={{ fontSize:18, fontWeight:900, color:"#ff6b35" }}>{f.cal}<span style={{ fontSize:10 }}> kcal</span></div>
                        <button onClick={() => { setCustomFoods(prev => prev.filter(x => x.id!==f.id)); showNotif("Supprime"); }} style={{ background:"rgba(255,71,87,0.2)", border:"none", color:"#ff4757", borderRadius:8, width:30, height:30, cursor:"pointer" }}>🗑</button>
                      </div>
                    </div>
                    <button onClick={() => { setSelectedFood(f); setProductTab("search"); setSearchFood(f.name); }} style={{ marginTop:10, width:"100%", padding:"8px", borderRadius:10, background:"rgba(0,212,170,0.1)", border:"1px solid rgba(0,212,170,0.2)", color:"#00d4aa", cursor:"pointer", fontSize:12, fontWeight:700 }}>Ajouter au journal</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* RECETTES */}
        {activeTab === "recipes" && (
          <div>
            {recipeView === "list" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                  <div style={{ fontWeight:800, fontSize:18 }}>Mes Recettes</div>
                  <button onClick={() => { setRecipeForm(EMPTY_RECIPE); setEditingRecipe(null); setRecipeView("create"); }} style={{ background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", borderRadius:12, padding:"10px 16px", cursor:"pointer", fontWeight:700, fontSize:13 }}>+ Nouvelle recette</button>
                </div>

                {/* Filtres categorie */}
                <div style={{ display:"flex", gap:8, overflowX:"auto", paddingBottom:8, marginBottom:16 }}>
                  {["Tout", ...CATEGORIES].map(cat => (
                    <button key={cat} onClick={() => setRecipeFilter(cat)} style={{ padding:"6px 14px", borderRadius:20, cursor:"pointer", fontSize:11, fontWeight:700, whiteSpace:"nowrap", background:recipeFilter===cat?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.07)", border:"none", color:recipeFilter===cat?"#fff":"#7c83a0", flexShrink:0 }}>{cat}</button>
                  ))}
                </div>

                {filteredRecipes.length === 0 ? (
                  <div style={{ textAlign:"center", padding:"60px 20px", background:"rgba(255,255,255,0.03)", borderRadius:20, border:"1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize:56 }}>👨‍🍳</div>
                    <div style={{ fontWeight:800, fontSize:18, marginTop:16, marginBottom:8 }}>Aucune recette</div>
                    <div style={{ fontSize:13, color:"#7c83a0", marginBottom:20 }}>Creez vos recettes healthy et calculez automatiquement leurs apports caloriques.</div>
                    <button onClick={() => { setRecipeForm(EMPTY_RECIPE); setEditingRecipe(null); setRecipeView("create"); }} style={{ background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", borderRadius:12, padding:"12px 24px", cursor:"pointer", fontWeight:700 }}>Creer ma premiere recette</button>
                  </div>
                ) : filteredRecipes.map(recipe => {
                  const tot = recipeTotals(recipe);
                  const perServing = Math.round(tot.cal / (recipe.servings || 1));
                  return (
                    <div key={recipe.id} style={{ background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:20, padding:16, marginBottom:14 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10 }}>
                        <div style={{ flex:1 }}>
                          <div style={{ fontWeight:800, fontSize:16 }}>{recipe.name}</div>
                          <div style={{ fontSize:11, color:"#00d4aa", marginTop:2 }}>{recipe.category} • {recipe.servings} portion{recipe.servings>1?"s":""}</div>
                          <div style={{ fontSize:11, color:"#7c83a0", marginTop:2 }}>{recipe.ingredients.length} ingredients • {recipe.steps.length} etapes</div>
                        </div>
                        <div style={{ textAlign:"right", flexShrink:0 }}>
                          <div style={{ fontSize:22, fontWeight:900, color:"#ff6b35" }}>{perServing}</div>
                          <div style={{ fontSize:10, color:"#7c83a0" }}>kcal/portion</div>
                        </div>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:6, marginBottom:12 }}>
                        {[{label:"P",value:(tot.p/(recipe.servings||1)).toFixed(1),color:"#0099ff"},{label:"G",value:(tot.g/(recipe.servings||1)).toFixed(1),color:"#ff6b35"},{label:"L",value:(tot.l/(recipe.servings||1)).toFixed(1),color:"#ff4757"}].map(m => (
                          <div key={m.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"6px", textAlign:"center" }}>
                            <span style={{ color:m.color, fontWeight:700, fontSize:13 }}>{m.value}g</span>
                            <span style={{ color:"#7c83a0", fontSize:10 }}> {m.label}</span>
                          </div>
                        ))}
                      </div>
                      <div style={{ display:"flex", gap:8 }}>
                        <button onClick={() => { setViewingRecipe(recipe); setRecipeView("detail"); }} style={{ flex:2, padding:"9px", borderRadius:10, background:"rgba(0,212,170,0.1)", border:"1px solid rgba(0,212,170,0.2)", color:"#00d4aa", cursor:"pointer", fontSize:12, fontWeight:700 }}>Voir la recette</button>
                        <button onClick={() => addRecipeToLog(recipe)} style={{ flex:2, padding:"9px", borderRadius:10, background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", cursor:"pointer", fontSize:12, fontWeight:700 }}>+ Journal</button>
                        <button onClick={() => startEditRecipe(recipe)} style={{ flex:1, padding:"9px", borderRadius:10, background:"rgba(255,255,255,0.07)", border:"none", color:"#7c83a0", cursor:"pointer", fontSize:12 }}>✏️</button>
                        <button onClick={() => { if(window.confirm("Supprimer cette recette ?")) deleteRecipe(recipe.id); }} style={{ flex:1, padding:"9px", borderRadius:10, background:"rgba(255,71,87,0.15)", border:"none", color:"#ff4757", cursor:"pointer", fontSize:12 }}>🗑</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* DETAIL RECETTE */}
            {recipeView === "detail" && viewingRecipe && (
              <div>
                <button onClick={() => setRecipeView("list")} style={{ background:"rgba(255,255,255,0.07)", border:"none", color:"#e8eaf6", borderRadius:12, padding:"8px 16px", cursor:"pointer", fontSize:13, marginBottom:16, display:"flex", alignItems:"center", gap:6 }}>← Retour</button>
                <div style={{ fontWeight:800, fontSize:22, marginBottom:4 }}>{viewingRecipe.name}</div>
                <div style={{ fontSize:12, color:"#00d4aa", marginBottom:16 }}>{viewingRecipe.category} • {viewingRecipe.servings} portion{viewingRecipe.servings>1?"s":""}</div>

                {/* Recap nutritionnel */}
                <div style={{ ...card }}>
                  <div style={{ fontSize:12, color:"#7c83a0", marginBottom:10, fontWeight:700 }}>Apports par portion</div>
                  {(() => {
                    const tot = recipeTotals(viewingRecipe);
                    const s = viewingRecipe.servings || 1;
                    return (
                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr", gap:10 }}>
                        {[{label:"Calories",value:Math.round(tot.cal/s),unit:"kcal",color:"#ff6b35"},{label:"Proteines",value:(tot.p/s).toFixed(1),unit:"g",color:"#0099ff"},{label:"Glucides",value:(tot.g/s).toFixed(1),unit:"g",color:"#ff6b35"},{label:"Lipides",value:(tot.l/s).toFixed(1),unit:"g",color:"#ff4757"}].map(m => (
                          <div key={m.label} style={{ background:"rgba(255,255,255,0.04)", borderRadius:12, padding:"10px 6px", textAlign:"center" }}>
                            <div style={{ fontSize:18, fontWeight:900, color:m.color }}>{m.value}<span style={{ fontSize:10 }}>{m.unit}</span></div>
                            <div style={{ fontSize:9, color:"#7c83a0", marginTop:2 }}>{m.label}</div>
                          </div>
                        ))}
                      </div>
                    );
                  })()}
                </div>

                {/* Ingredients */}
                <div style={{ fontWeight:700, fontSize:16, marginBottom:12 }}>Ingredients</div>
                <div style={{ ...card }}>
                  {viewingRecipe.ingredients.map((ing, idx) => (
                    <div key={ing.ingId} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", paddingBottom:10, marginBottom:10, borderBottom:idx<viewingRecipe.ingredients.length-1?"1px solid rgba(255,255,255,0.06)":"none" }}>
                      <div>
                        <div style={{ fontSize:14, fontWeight:600 }}>{ing.name}</div>
                        <div style={{ fontSize:11, color:"#7c83a0" }}>{ing.qty} x {ing.unit}</div>
                      </div>
                      <div style={{ fontSize:14, fontWeight:700, color:"#ff6b35" }}>{ing.totalCal} kcal</div>
                    </div>
                  ))}
                </div>

                {/* Etapes */}
                {viewingRecipe.steps.length > 0 && (
                  <div>
                    <div style={{ fontWeight:700, fontSize:16, marginBottom:12 }}>Preparation</div>
                    {viewingRecipe.steps.map((step, idx) => (
                      <div key={step.id} style={{ display:"flex", gap:14, marginBottom:14 }}>
                        <div style={{ width:32, height:32, borderRadius:50, background:"linear-gradient(135deg,#00d4aa,#0099ff)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:14, flexShrink:0 }}>{idx+1}</div>
                        <div style={{ background:"rgba(255,255,255,0.04)", borderRadius:14, padding:"12px 14px", flex:1, fontSize:14, lineHeight:1.5, border:"1px solid rgba(255,255,255,0.06)" }}>{step.text}</div>
                      </div>
                    ))}
                  </div>
                )}

                {viewingRecipe.notes && (
                  <div style={{ ...card, background:"rgba(255,107,53,0.06)", border:"1px solid rgba(255,107,53,0.2)" }}>
                    <div style={{ fontSize:12, color:"#ff6b35", fontWeight:700, marginBottom:6 }}>Notes</div>
                    <div style={{ fontSize:13, lineHeight:1.5 }}>{viewingRecipe.notes}</div>
                  </div>
                )}

                <button onClick={() => addRecipeToLog(viewingRecipe)} style={{ width:"100%", padding:16, borderRadius:16, background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", fontWeight:800, cursor:"pointer", fontSize:15, marginTop:8 }}>
                  Ajouter au journal du jour
                </button>
              </div>
            )}

            {/* CREATION RECETTE */}
            {recipeView === "create" && (
              <div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
                  <div style={{ fontWeight:800, fontSize:18 }}>{editingRecipe ? "Modifier" : "Nouvelle recette"}</div>
                  <button onClick={() => { setRecipeView("list"); setEditingRecipe(null); }} style={{ background:"rgba(255,255,255,0.07)", border:"none", color:"#e8eaf6", borderRadius:10, padding:"6px 14px", cursor:"pointer", fontSize:12 }}>Annuler</button>
                </div>

                {/* Infos de base */}
                <div style={{ ...card }}>
                  <div style={{ fontWeight:700, marginBottom:14 }}>Informations generales</div>
                  <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                    <div>
                      <div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Nom de la recette *</div>
                      <input value={recipeForm.name} onChange={e => setRecipeForm(p => ({...p,name:e.target.value}))} placeholder="Ex: Bowl proteine poulet riz..." style={inp} />
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                      <div>
                        <div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Nombre de portions</div>
                        <input type="number" min="1" max="20" value={recipeForm.servings} onChange={e => setRecipeForm(p => ({...p,servings:parseInt(e.target.value)||1}))} style={{ ...inp }} />
                      </div>
                      <div>
                        <div style={{ fontSize:11, color:"#7c83a0", marginBottom:6 }}>Categorie</div>
                        <select value={recipeForm.category} onChange={e => setRecipeForm(p => ({...p,category:e.target.value}))} style={{ ...inp, cursor:"pointer" }}>
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ingredients */}
                <div style={{ ...card }}>
                  <div style={{ fontWeight:700, marginBottom:14 }}>Ingredients ({recipeForm.ingredients.length})</div>

                  {recipeForm.ingredients.length > 0 && (
                    <div style={{ marginBottom:14 }}>
                      {recipeForm.ingredients.map(ing => (
                        <div key={ing.ingId} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 12px", background:"rgba(0,212,170,0.06)", borderRadius:10, marginBottom:6, border:"1px solid rgba(0,212,170,0.15)" }}>
                          <div>
                            <div style={{ fontSize:13, fontWeight:600 }}>{ing.name}</div>
                            <div style={{ fontSize:11, color:"#7c83a0" }}>x{ing.qty} {ing.unit} — {ing.totalCal} kcal</div>
                          </div>
                          <button onClick={() => removeIngredient(ing.ingId)} style={{ background:"rgba(255,71,87,0.2)", border:"none", color:"#ff4757", borderRadius:8, width:28, height:28, cursor:"pointer", flexShrink:0 }}>x</button>
                        </div>
                      ))}
                      <div style={{ background:"rgba(255,107,53,0.08)", borderRadius:10, padding:"8px 12px", fontSize:12, color:"#ff6b35", fontWeight:700 }}>
                        Total : {recipeForm.ingredients.reduce((s,i) => s+i.totalCal, 0)} kcal pour {recipeForm.servings} portion{recipeForm.servings>1?"s":""} = {Math.round(recipeForm.ingredients.reduce((s,i) => s+i.totalCal, 0) / recipeForm.servings)} kcal/portion
                      </div>
                    </div>
                  )}

                  <div style={{ fontSize:11, color:"#7c83a0", marginBottom:8 }}>Ajouter un ingredient</div>
                  <input value={ingSearch} onChange={e => setIngSearch(e.target.value)} placeholder="Rechercher dans vos aliments..." style={{ ...inp, marginBottom:8 }} />
                  {ingSearch && (
                    <div style={{ maxHeight:180, overflowY:"auto", background:"rgba(0,0,0,0.4)", borderRadius:10, border:"1px solid rgba(255,255,255,0.08)", marginBottom:8 }}>
                      {filteredIngFoods.length === 0
                        ? <div style={{ padding:12, textAlign:"center", color:"#7c83a0", fontSize:12 }}>Aucun resultat</div>
                        : filteredIngFoods.map(f => (
                          <button key={f.id} onClick={() => { setIngSelected(f); setIngSearch(f.name); }} style={{ width:"100%", padding:"9px 14px", background:ingSelected?.id===f.id?"rgba(0,212,170,0.15)":"transparent", border:"none", color:"#e8eaf6", cursor:"pointer", textAlign:"left", display:"flex", justifyContent:"space-between", fontSize:12, borderBottom:"1px solid rgba(255,255,255,0.04)" }}>
                            <span>{f.custom?"⭐ ":""}{f.name}</span>
                            <span style={{ color:"#ff6b35", fontWeight:700 }}>{f.cal} kcal</span>
                          </button>
                        ))
                      }
                    </div>
                  )}
                  {ingSelected && (
                    <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                      <div style={{ fontSize:12, color:"#7c83a0", flexShrink:0 }}>Qte :</div>
                      <input type="number" min={0.5} step={0.5} value={ingQty} onChange={e => setIngQty(parseFloat(e.target.value)||1)} style={{ width:70, padding:"8px", borderRadius:8, background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", color:"#fff", fontSize:14, textAlign:"center", outline:"none" }} />
                      <span style={{ fontSize:11, color:"#7c83a0" }}>{ingSelected.unit}</span>
                      <button onClick={addIngredientToRecipe} style={{ flex:1, padding:"9px", borderRadius:10, background:"linear-gradient(135deg,#00d4aa,#0099ff)", border:"none", color:"#fff", fontWeight:700, cursor:"pointer", fontSize:12 }}>Ajouter</button>
                    </div>
                  )}
                </div>

                {/* Etapes */}
                <div style={{ ...card }}>
                  <div style={{ fontWeight:700, marginBottom:14 }}>Etapes de preparation</div>
                  {recipeForm.steps.length > 0 && (
                    <div style={{ marginBottom:14 }}>
                      {recipeForm.steps.map((step, idx) => (
                        <div key={step.id} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
                          <div style={{ width:28, height:28, borderRadius:50, background:"linear-gradient(135deg,#00d4aa,#0099ff)", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:900, fontSize:12, flexShrink:0 }}>{idx+1}</div>
                          <div style={{ flex:1, background:"rgba(255,255,255,0.04)", borderRadius:10, padding:"8px 12px", fontSize:13, lineHeight:1.5 }}>{step.text}</div>
                          <button onClick={() => removeStep(step.id)} style={{ background:"rgba(255,71,87,0.2)", border:"none", color:"#ff4757", borderRadius:8, width:28, height:28, cursor:"pointer", flexShrink:0 }}>x</button>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ fontSize:11, color:"#7c83a0", marginBottom:8 }}>Ajouter une etape</div>
                  <textarea value={newStepText} onChange={e => setNewStepText(e.target.value)} placeholder="Ex: Faire cuire le riz 12 minutes a l'eau bouillante salée..." rows={3} style={{ ...inp, resize:"none", lineHeight:1.5 }} />
                  <button onClick={addStep} disabled={!newStepText.trim()} style={{ marginTop:8, width:"100%", padding:"10px", borderRadius:10, background:newStepText.trim()?"rgba(0,212,170,0.15)":"rgba(255,255,255,0.05)", border:`1px solid ${newStepText.trim()?"rgba(0,212,170,0.3)":"rgba(255,255,255,0.08)"}`, color:newStepText.trim()?"#00d4aa":"#4a4f6a", cursor:newStepText.trim()?"pointer":"not-allowed", fontWeight:700, fontSize:13 }}>+ Ajouter cette etape</button>
                </div>

                {/* Notes */}
                <div style={{ ...card }}>
                  <div style={{ fontWeight:700, marginBottom:10 }}>Notes (optionnel)</div>
                  <textarea value={recipeForm.notes} onChange={e => setRecipeForm(p => ({...p,notes:e.target.value}))} placeholder="Conseils, variantes, astuces..." rows={3} style={{ ...inp, resize:"none", lineHeight:1.5 }} />
                </div>

                <button onClick={saveRecipe} disabled={!recipeForm.name||recipeForm.ingredients.length===0} style={{ width:"100%", padding:16, borderRadius:16, background:recipeForm.name&&recipeForm.ingredients.length>0?"linear-gradient(135deg,#00d4aa,#0099ff)":"rgba(255,255,255,0.08)", border:"none", color:recipeForm.name&&recipeForm.ingredients.length>0?"#fff":"#4a4f6a", fontWeight:800, cursor:recipeForm.name&&recipeForm.ingredients.length>0?"pointer":"not-allowed", fontSize:15 }}>
                  {editingRecipe ? "Mettre a jour la recette" : "Enregistrer la recette"}
                </button>
              </div>
            )}
          </div>
        )}

        {/* STATS */}
        {activeTab === "stats" && (
          <StatsTab
            weight={weight} setWeight={setWeight}
            height={height} setHeight={setHeight}
            age={age} setAge={setAge}
            gender={gender} setGender={setGender}
            bmr={bmr} tdee={tdee} targetCal={targetCal}
            netCal={netCal} totalCalEaten={totalCalEaten} calBurned={calBurned}
            dayProgress={dayProgress} todayKey={todayKey} DAYS={DAYS}
            inp={inp} card={card}
          />
        )}

      </div>
      <style>{`* { -webkit-tap-highlight-color: transparent; } input::-webkit-inner-spin-button { opacity: 0.5; } select option { background: #0f1a2e; }`}</style>
    </div>
  );
}
