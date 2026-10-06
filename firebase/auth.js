import {live,fb,list} from './data.js';
const SUPER='thesnkgraphic@email.com',B='https://www.gstatic.com/firebasejs/10.12.2/';
const au=async()=>{const{app}=await fb(),m=await import(B+'firebase-auth.js');return{m,a:m.getAuth(app),app}};
const set=o=>sessionStorage.snk_s=JSON.stringify(o);
export async function login(e,p){
 if(live){const{m,a}=await au(),{s,db}=await fb(),c=await m.signInWithEmailAndPassword(a,e,p);
  if(c.user.email==SUPER)return set({role:'super'});
  const d=await s.getDoc(s.doc(db,'staff',c.user.uid));if(!d.exists()){await m.signOut(a);throw Error('No staff access')}
  return set({role:'member',mid:d.data().memberId})}
 if(e===SUPER&&p==='Admin@1234')return set({role:'super'});
 const t=(await list('team')).find(x=>x.email&&x.email==e&&x.pass==p);if(!t)throw Error('Wrong email or password');set({role:'member',mid:t.id})}
export async function session(){if(live){const{m,a}=await au();if(!await new Promise(r=>m.onAuthStateChanged(a,r)))return null}return JSON.parse(sessionStorage.snk_s||'null')}
export async function logout(){if(live){const{m,a}=await au();await m.signOut(a)}sessionStorage.removeItem('snk_s')}
export async function reset(e){if(!live)throw Error('Demo mode: password super admin theke change korun');const{m,a}=await au();await m.sendPasswordResetEmail(a,e)}
export async function createStaff(e,p,mid){const{m,app}=await au(),{s,db}=await fb(),{initializeApp}=await import(B+'firebase-app.js'),sa=m.getAuth(initializeApp(app.options,'sec'+Date.now())),c=await m.createUserWithEmailAndPassword(sa,e,p);await s.setDoc(s.doc(db,'staff',c.user.uid),{memberId:mid,email:e});await m.signOut(sa)}
