const $=s=>document.querySelector(s);
const NATIVE=!!(window.Capacitor&&Capacitor.isNativePlatform&&Capacitor.isNativePlatform());
const LN=NATIVE?Capacitor.Plugins.LocalNotifications:null;
let NP="prompt";
const T={ar:{app:"ذكرني",date:"تذكير بتاريخ",week:"تذكير أسبوعي",set:"الإعدادات",search:"بحث في التذكيرات...",empty:"مفيش تذكيرات لسه",add:"+ إضافة تذكير",msg:"نص التذكير",d:"التاريخ",tm:"الوقت",day:"اليوم",save:"حفظ",cancel:"إلغاء",del:"حذف",edit:"تعديل",newr:"تذكير جديد",editr:"تعديل التذكير",conf:"هل أنت متأكد أنك تريد حذف هذا التذكير؟",act:"نشط",pau:"متوقف",pause:"إيقاف مؤقت",resume:"استئناف",pin:"تثبيت",snooze:"تأجيل",m10:"10 دقائق",m30:"30 دقيقة",h1:"ساعة",tom:"غداً",cust:"وقت مخصص",ok:"تم",rem:"افتكر: ",title:"ذكرني 🔔",ap:"المظهر",light:"فاتح",dark:"داكن",sys:"النظام",col:"لون التطبيق",lang:"اللغة",nt:"الإشعارات",allow:"السماح بالإشعارات",granted:"الإشعارات مفعّلة ✅",denied:"الإشعارات مرفوضة. التذكيرات تحتاج إذن الإشعارات، فعّلها من إعدادات المتصفح للموقع.",def:"لم يتم طلب الإذن بعد.",nosup:"المتصفح لا يدعم الإشعارات.",bad:"اكتب نص التذكير واختر وقتاً صحيحاً في المستقبل",warn:"ملاحظة: التنبيهات تعمل أثناء فتح هذه الصفحة."},
en:{app:"Zakkerni",date:"Date Reminder",week:"Weekly Reminder",set:"Settings",search:"Search reminders...",empty:"No reminders yet",add:"+ Add Reminder",msg:"Reminder text",d:"Date",tm:"Time",day:"Day",save:"Save",cancel:"Cancel",del:"Delete",edit:"Edit",newr:"New reminder",editr:"Edit reminder",conf:"Are you sure you want to delete this reminder?",act:"Active",pau:"Paused",pause:"Pause",resume:"Resume",pin:"Pin",snooze:"Snooze",m10:"10 minutes",m30:"30 minutes",h1:"1 hour",tom:"Tomorrow",cust:"Custom time",ok:"OK",rem:"Remember: ",title:"Zakkerni 🔔",ap:"Appearance",light:"Light",dark:"Dark",sys:"System",col:"App color",lang:"Language",nt:"Notifications",allow:"Allow notifications",granted:"Notifications enabled ✅",denied:"Notifications are blocked. Reminders need notification permission; enable it in your browser's site settings.",def:"Permission not requested yet.",nosup:"This browser doesn't support notifications.",bad:"Enter a reminder text and a valid future time",warn:"Note: alerts work while this page is open."}};
Object.assign(T.ar,{denied2:"الإشعارات مرفوضة. فعّلها من: إعدادات الموبايل ← التطبيقات ← ذكرني ← الإشعارات."});
Object.assign(T.en,{denied2:"Notifications are blocked. Enable them in: phone Settings → Apps → Zakkerni → Notifications."});
const COLORS=["#6750A4","#0B7A75","#C2185B","#E65100","#1565C0","#2E7D32"];
const ld=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))||d}catch(e){return d}};
let S=ld("zk_s",{theme:"system",color:COLORS[0],lang:"ar"}),R=ld("zk_r",[]),tab="date",Q="",AL=[];
const t=k=>T[S.lang][k];
const sv=()=>{try{localStorage.setItem("zk_s",JSON.stringify(S));localStorage.setItem("zk_r",JSON.stringify(R))}catch(e){}queueSync()};
const loc=()=>S.lang==="ar"?"ar-EG":"en-US";
const fd=ts=>new Date(ts).toLocaleDateString(loc(),{dateStyle:"long"});
const ft=ts=>new Date(ts).toLocaleTimeString(loc(),{timeStyle:"short"});
const dayName=i=>new Date(2024,0,7+i).toLocaleDateString(loc(),{weekday:"long"});
const esc=s=>s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pad=n=>String(n).padStart(2,"0");
function nextOcc(r,from){const d=new Date(from);d.setHours(r.h,r.m,0,0);d.setDate(d.getDate()+(r.day-d.getDay()+7)%7);if(d.getTime()<=from)d.setDate(d.getDate()+7);return d.getTime()}
function applyStyle(){const h=document.documentElement;h.dataset.theme=S.theme;h.style.setProperty("--p",S.color);h.lang=S.lang;h.dir=S.lang==="ar"?"rtl":"ltr";document.title=t("app")+" — Zakkerni"}
function render(){applyStyle();$("#hd").textContent=t("app")+" 🔔";
$("#nv").innerHTML=[["date","📅"],["week","🔁"],["set","⚙️"]].map(([k,i])=>`<button class="${tab===k?"on":""}" data-tab="${k}"><span>${i}</span>${t(k)}</button>`).join("");
$("#sw").style.display=tab==="set"?"none":"block";$("#q").placeholder=t("search");
tab==="set"?renderSet():renderList()}
function renderList(){let L=R.filter(r=>r.type===tab&&r.text.toLowerCase().includes(Q.toLowerCase()));
L.sort((a,b)=>(b.pin-a.pin)||((tab==="date"?a.at:a.next)-(tab==="date"?b.at:b.next)));
if(!L.length&&!Q){$("#mn").innerHTML=`<div class="empty"><div>🔔</div><p>${t("empty")}</p><button class="btn" data-a="new">${t("add")}</button></div>`;return}
$("#mn").innerHTML=L.map(r=>{const w=r.type==="week";return `<div class="card ${w&&!r.active?"off":""}"><div class="row"><div class="tt">${r.pin?"📌 ":""}${esc(r.text)}</div>${w?`<span class="chip ${r.active?"":"paused"}">${r.active?t("act"):t("pau")}</span>`:""}</div>
<div class="meta">${w?dayName(r.day)+" • "+ft(new Date(2024,0,1,r.h,r.m)):fd(r.at)+" • "+ft(r.at)}</div>
<div class="row" style="margin-top:6px"><button class="ic" title="${t("edit")}" data-a="edit" data-id="${r.id}">✏️</button><button class="ic" title="${t("del")}" data-a="del" data-id="${r.id}">🗑️</button><button class="ic" title="${t("pin")}" data-a="pin" data-id="${r.id}" style="${r.pin?"background:var(--bd)":""}">📌</button>${w?`<button class="ic" title="${r.active?t("pause"):t("resume")}" data-a="tog" data-id="${r.id}">${r.active?"⏸️":"▶️"}</button>`:""}</div></div>`}).join("")+`<button class="fab" data-a="new" aria-label="${t("add")}">+</button>`}
function renderSet(){const canAsk=NATIVE?(NP!=="granted"&&NP!=="denied"):("Notification"in window&&Notification.permission==="default");const nt=NATIVE?(NP==="granted"?t("granted"):NP==="denied"?t("denied2"):t("def")):!("Notification"in window)?t("nosup"):Notification.permission==="granted"?t("granted"):Notification.permission==="denied"?t("denied"):t("def");
$("#mn").innerHTML=`<h4>${t("ap")}</h4><div class="seg">${[["light","light"],["dark","dark"],["system","sys"]].map(([v,k])=>`<button class="${S.theme===v?"on":""}" data-th="${v}">${t(k)}</button>`).join("")}</div>
<h4>${t("col")}</h4><div class="sw">${COLORS.map(c=>`<i data-co="${c}" class="${S.color===c?"on":""}" style="background:${c}"></i>`).join("")}</div>
<h4>${t("lang")}</h4><div class="seg"><button class="${S.lang==="ar"?"on":""}" data-lg="ar">العربية</button><button class="${S.lang==="en"?"on":""}" data-lg="en">English</button></div>
<h4>${t("nt")}</h4><p>${nt}</p>${canAsk?`<br><button class="btn" data-a="perm">${t("allow")}</button>`:""}${NATIVE?"":`<p class="note">${t("warn")}</p>`}`}
function modal(h){$("#md").innerHTML=h;$("#ov").classList.add("show")}
function closeM(){$("#ov").classList.remove("show")}
function form(id){const r=R.find(x=>x.id===id),w=(r?r.type:tab)==="week";const d=r&&!w?new Date(r.at):new Date(Date.now()+3600e3);
const dv=`${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`,tv=r&&w?`${pad(r.h)}:${pad(r.m)}`:`${pad(d.getHours())}:${pad(d.getMinutes())}`;
modal(`<h3>${r?t("editr"):t("newr")}</h3><label>${t("msg")}</label><input id="f_t" value="${r?esc(r.text):""}" maxlength="120">
${w?`<label>${t("day")}</label><select id="f_d">${[0,1,2,3,4,5,6].map(i=>`<option value="${i}" ${r&&r.day===i||!r&&i===4?"selected":""}>${dayName(i)}</option>`).join("")}</select>`:`<label>${t("d")}</label><input type="date" id="f_d" value="${dv}">`}
<label>${t("tm")}</label><input type="time" id="f_m" value="${tv}">
<div class="acts"><button class="btn sec" data-a="close">${t("cancel")}</button><button class="btn" data-a="save" data-id="${id||""}" data-w="${w?1:0}">${t("save")}</button></div>`)}
function saveForm(id,w){const text=$("#f_t").value.trim(),tm=$("#f_m").value;if(!text||!tm)return alert(t("bad"));const[h,m]=tm.split(":").map(Number);let r=R.find(x=>x.id===id);
if(!r){r={id:Date.now()+Math.random(),nid:nextNid(),type:w?"week":"date",pin:false,active:true,created:Date.now()};R.push(r)}
r.text=text;r.h=h;r.m=m;r.snooze=null;
if(w){r.day=+$("#f_d").value;r.next=nextOcc(r,Date.now())}else{const[y,mo,da]=$("#f_d").value.split("-").map(Number);r.at=new Date(y,mo-1,da,h,m).getTime();if(!y||r.at<=Date.now()){if(!id)R.pop();return alert(t("bad"))}}
sv();closeM();render()}
function fire(r){if(NATIVE)return;AL.push({...r});try{if("Notification"in window&&Notification.permission==="granted")new Notification(t("title"),{body:t("rem")+r.text})}catch(e){}try{navigator.vibrate&&navigator.vibrate([200,100,200])}catch(e){}if(!$("#ov").classList.contains("show"))showAlert()}
function showAlert(){const a=AL[0];if(!a)return closeM();const w=a.type==="week";
modal(`<h3>${t("title")}</h3><p style="font-size:20px;margin:6px 0">${t("rem")}${esc(a.text)}</p><div class="acts"><button class="btn sec" data-a="snz">${t("snooze")}</button><button class="btn sec" data-a="${w?"apause":"adel"}">${w?t("pause"):t("del")}</button><button class="btn" data-a="dis">${t("ok")}</button></div>`)}
function snoozeMenu(){modal(`<h3>${t("snooze")}</h3><div class="seg" style="flex-direction:column">${[["m10",10],["m30",30],["h1",60],["tom",-1]].map(([k,v])=>`<button data-sn="${v}">${t(k)}</button>`).join("")}</div><label>${t("cust")}</label><input type="datetime-local" id="sn_c"><div class="acts"><button class="btn sec" data-a="alert">${t("cancel")}</button><button class="btn" data-sn="c">${t("save")}</button></div>`)}
function doSnooze(v){const a=AL[0];let ts;if(v==="c"){ts=new Date($("#sn_c").value).getTime();if(!ts||ts<=Date.now())return alert(t("bad"))}else if(+v<0){const d=new Date();d.setDate(d.getDate()+1);const hm=a.type==="week"?[a.h,a.m]:[new Date(a.at).getHours(),new Date(a.at).getMinutes()];d.setHours(hm[0],hm[1],0,0);ts=d.getTime()}else ts=Date.now()+v*60000;
if(a.type==="date"){R=R.filter(y=>y.id!==a.id);R.push({...a,at:ts})}else{const r=R.find(x=>x.id===a.id);if(r)r.snooze=ts}
AL.shift();sv();render();showAlert()}
function tick(){const n=Date.now();let ch=false;for(const r of [...R]){if(r.type==="date"){if(r.at<=n){fire(r);R=R.filter(x=>x!==r);ch=true}}else if(r.active){if(r.snooze&&r.snooze<=n){fire(r);r.snooze=null;ch=true}if(r.next<=n){fire(r);r.next=nextOcc(r,n);ch=true}}}if(ch){sv();if(tab!=="set")render()}}
document.addEventListener("click",e=>{const el=e.target.closest("[data-tab],[data-a],[data-th],[data-co],[data-lg],[data-sn]");if(!el)return;const D=el.dataset,id=D.id?+D.id:null,r=R.find(x=>x.id===id);
if(D.tab){tab=D.tab;Q="";$("#q").value="";render()}
else if(D.th){S.theme=D.th;sv();render()}else if(D.co){S.color=D.co;sv();render()}else if(D.lg){S.lang=D.lg;sv();render()}
else if(D.sn)doSnooze(D.sn);
else switch(D.a){case"new":form(null);break;case"edit":form(id);break;case"close":closeM();break;case"save":saveForm(id,D.w==="1");break;
case"del":modal(`<h3>${t("del")}</h3><p>${t("conf")}</p><div class="acts"><button class="btn sec" data-a="close">${t("cancel")}</button><button class="btn red" data-a="cdel" data-id="${id}">${t("del")}</button></div>`);break;
case"cdel":R=R.filter(x=>x.id!==id);sv();closeM();render();break;
case"pin":r.pin=!r.pin;sv();render();break;
case"tog":r.active=!r.active;r.snooze=null;if(r.active)r.next=nextOcc(r,Date.now());sv();render();break;
case"perm":if(NATIVE)LN.requestPermissions().then(p=>{NP=p.display;render()});else Notification.requestPermission().then(render);break;
case"snz":snoozeMenu();break;case"alert":showAlert();break;
case"dis":case"adel":AL.shift();showAlert();break;
case"apause":{const x=R.find(y=>y.id===AL[0].id);if(x){x.active=false;x.snooze=null;sv();render()}AL.shift();showAlert();break}}});
$("#q").addEventListener("input",e=>{Q=e.target.value;renderList()});
function nextNid(){S.nid=(S.nid||0)+1;return S.nid}
let syncT=null,syncing=Promise.resolve();
function queueSync(){if(!NATIVE)return;clearTimeout(syncT);syncT=setTimeout(()=>{syncing=syncing.then(syncAll).catch(()=>{})},300)}
async function syncAll(){
const pend=await LN.getPending();
if(pend.notifications.length)await LN.cancel({notifications:pend.notifications.map(n=>({id:n.id}))});
await LN.createChannel({id:"zk_reminders",name:t("app"),description:t("title"),importance:5,visibility:1,vibration:true});
await LN.registerActionTypes({types:[{id:"DATE",actions:[{id:"snooze",title:t("snooze")},{id:"delete",title:t("del")}]},{id:"WEEK",actions:[{id:"snooze",title:t("snooze")},{id:"pause",title:t("pause")}]}]});
const now=Date.now(),list=[];
for(const r of R){
const b={title:t("title"),body:t("rem")+r.text,channelId:"zk_reminders",actionTypeId:r.type==="week"?"WEEK":"DATE",extra:r};
if(r.type==="date"){if(r.at>now)list.push({...b,id:r.nid*4,schedule:{at:new Date(r.at),allowWhileIdle:true}})}
else if(r.active){list.push({...b,id:r.nid*4,schedule:{on:{weekday:r.day+1,hour:r.h,minute:r.m},allowWhileIdle:true}});
if(r.snooze&&r.snooze>now)list.push({...b,id:r.nid*4+1,schedule:{at:new Date(r.snooze),allowWhileIdle:true}})}}
if(list.length)await LN.schedule({notifications:list})}
function handleAction(ev){
const x=(ev.notification&&ev.notification.extra)||{},a=ev.actionId;if(!x.type)return;
const r=R.find(y=>y.id===x.id);
if(a==="snooze"){const rec=r||(x.type==="date"?{...x}:null);if(!rec)return;AL.unshift({...rec});snoozeMenu()}
else if(a==="delete"){R=R.filter(y=>y.id!==x.id);sv();render()}
else if(a==="pause"&&r){r.active=false;r.snooze=null;sv();render()}}
async function nativeInit(){
try{let p=await LN.checkPermissions();if(p.display==="prompt"||p.display==="prompt-with-rationale")p=await LN.requestPermissions();NP=p.display}catch(e){}
try{const e=await LN.checkExactNotificationSetting();if(e.exact_alarm==="denied")await LN.changeExactNotificationSetting()}catch(e){}
try{await LN.addListener("localNotificationActionPerformed",handleAction)}catch(e){}
queueSync();if(tab==="set")render()}
R.forEach(r=>{if(!r.nid)r.nid=nextNid()});sv();
render();tick();setInterval(tick,10000);document.addEventListener("visibilitychange",()=>{tick();if(!document.hidden)queueSync()});window.addEventListener("focus",queueSync);if(NATIVE)nativeInit();
