import * as D from '../../firebase/data.js';
const $=(s,r=document)=>r.querySelector(s),esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let S,TEAM=[],FAQ=[],cur,stop=()=>{};
const av=m=>m.photo?`<img src="${m.photo}" alt="">`:esc(m.name.split(' ').map(w=>w[0]).slice(0,2).join(''));
const add=(who,t)=>{const b=$('#messages');b.insertAdjacentHTML('beforeend',`<div class="bubble ${who}">${esc(t)}</div>`);b.scrollTop=1e9};
function ask(q){q=q.trim();if(!q)return;add('user',q);const s=q.toLowerCase(),h=FAQ.find(f=>f.k.split(',').some(w=>w.trim()&&s.includes(w.trim())));setTimeout(()=>add('bot',h?h.a:'That’s outside my basic Q&A. Please pick a person from the Support Team below and chat with them.'),500)}
const dlg=document.createElement('dialog');
dlg.innerHTML='<div class="dh"><b id="dName"></b><button class="btn ghost sm" id="dClose">✕</button></div><div id="dMsgs" class="dmsgs"></div><form id="dForm"><input id="dIn" placeholder="Type a message…" autocomplete="off"><button class="btn primary">Send</button></form>';
document.body.append(dlg);
const sid=localStorage.snk_sid||(localStorage.snk_sid=crypto.randomUUID());
function openChat(id){cur=TEAM.find(m=>m.id==id);$('#dName').textContent=cur.name;dlg.showModal();stop();stop=D.watch(sid,ms=>{const b=$('#dMsgs');b.innerHTML=ms.map(m=>`<div class="bubble ${m.from!='visitor'?'bot':'user'}">${esc(m.text)}</div>`).join('')||'<small>Say hi 👋</small>';b.scrollTop=1e9})}
function call(id){const p=TEAM.find(m=>m.id==id).phone||S.phone;p?location.href='tel:'+p:alert('Phone number not set yet.')}
async function init(){
 [S,TEAM,FAQ]=await Promise.all([D.getSettings(),D.list('team'),D.list('faq')]);
 $('#siteName').textContent=$('#footerName').textContent=S.name;$('#siteTagline').textContent=S.tagline;document.title=S.name+' · '+S.tagline;
 if(S.logo){$('#brandMark').innerHTML=`<img src="${S.logo}" alt="">`;$('link[rel=icon]').href=S.logo}else $('#brandMark').textContent=S.name[0];
 $('#year').textContent=new Date().getFullYear();if(S.apkUrl){const a=$('#apkBtn');a.href=S.apkUrl;a.classList.remove('hidden')}
 $('#teamGrid').innerHTML=TEAM.map(m=>`<div class="tm panel"><div class="tm-id"><div class="av">${av(m)}</div><div><b>${esc(m.name)}</b><small>${esc(m.role||'')}</small>${(x=>`<span class="st" style="--c:${x[1]}">${x[0]}${m.statusNote?' · '+esc(m.statusNote):''}</span>`)(D.STATUS[m.status]||D.STATUS.available)}</div></div><p>${esc(m.blurb||'')}</p><div class="two"><button class="btn primary" data-chat="${m.id}">Chat</button><button class="btn" data-call="${m.id}" ${m.status&&m.status!='available'?'disabled':''}>Call</button></div></div>`).join('');
}
document.addEventListener('click',e=>{const t=e.target.closest('[data-chat],[data-call],[data-q]');if(!t)return;if(t.dataset.chat)openChat(t.dataset.chat);else if(t.dataset.call)call(t.dataset.call);else ask(t.dataset.q)});
$('#chatForm').onsubmit=e=>{e.preventDefault();ask($('#chatInput').value);$('#chatInput').value=''};
$('#dForm').onsubmit=e=>{e.preventDefault();const v=$('#dIn').value.trim();if(!v)return;D.send(sid,{from:'visitor',text:v,member:cur.name,mid:cur.id});$('#dIn').value=''};
$('#dClose').onclick=()=>{stop();dlg.close()};
let ip;addEventListener('beforeinstallprompt',e=>{e.preventDefault();ip=e;$('#installBtn').classList.remove('hidden')});
$('#installBtn').onclick=()=>{ip?.prompt();$('#installBtn').classList.add('hidden')};
if('serviceWorker'in navigator)navigator.serviceWorker.register('sw.js');
init();
