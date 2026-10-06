import {live,fb} from './data.js';
const au=async()=>{const{app}=await fb(),m=await import('https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js');return{m,a:m.getAuth(app)}};
export async function login(e,p){if(live){const{m,a}=await au();await m.signInWithEmailAndPassword(a,e,p)}else if(e==='admin@snksupport.com'&&p==='Admin@1234')sessionStorage.snk_admin=1;else throw Error('Wrong email or password')}
export async function authed(){if(live){const{m,a}=await au();return new Promise(r=>m.onAuthStateChanged(a,u=>r(!!u)))}return!!sessionStorage.snk_admin}
export async function logout(){if(live){const{m,a}=await au();await m.signOut(a)}sessionStorage.removeItem('snk_admin')}
