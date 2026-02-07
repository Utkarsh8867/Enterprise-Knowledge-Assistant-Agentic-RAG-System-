import{r as p,a as I,R as L}from"./react-vendor-wGySg1uH.js";import{a as R}from"./axios-vendor-D5GkNzM3.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))c(a);new MutationObserver(a=>{for(const i of a)if(i.type==="childList")for(const d of i.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&c(d)}).observe(document,{childList:!0,subtree:!0});function l(a){const i={};return a.integrity&&(i.integrity=a.integrity),a.referrerPolicy&&(i.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?i.credentials="include":a.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(a){if(a.ep)return;a.ep=!0;const i=l(a);fetch(a.href,i)}})();var z={exports:{}},k={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var O=p,E=Symbol.for("react.element"),T=Symbol.for("react.fragment"),P=Object.prototype.hasOwnProperty,U=O.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,$={key:!0,ref:!0,__self:!0,__source:!0};function A(s,t,l){var c,a={},i=null,d=null;l!==void 0&&(i=""+l),t.key!==void 0&&(i=""+t.key),t.ref!==void 0&&(d=t.ref);for(c in t)P.call(t,c)&&!$.hasOwnProperty(c)&&(a[c]=t[c]);if(s&&s.defaultProps)for(c in t=s.defaultProps,t)a[c]===void 0&&(a[c]=t[c]);return{$$typeof:E,type:s,key:i,ref:d,props:a,_owner:U.current}}k.Fragment=T;k.jsx=A;k.jsxs=A;z.exports=k;var e=z.exports,b={},S=I;b.createRoot=S.createRoot,b.hydrateRoot=S.hydrateRoot;/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var q={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const F=s=>s.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase().trim(),o=(s,t)=>{const l=p.forwardRef(({color:c="currentColor",size:a=24,strokeWidth:i=2,absoluteStrokeWidth:d,className:u="",children:m,...f},x)=>p.createElement("svg",{ref:x,...q,width:a,height:a,stroke:c,strokeWidth:d?Number(i)*24/Number(a):i,className:["lucide",`lucide-${F(s)}`,u].join(" "),...f},[...t.map(([n,r])=>p.createElement(n,r)),...Array.isArray(m)?m:[m]]));return l.displayName=`${s}`,l};/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=o("Activity",[["path",{d:"M22 12h-4l-3 9L9 3l-3 9H2",key:"d5dnw9"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const B=o("AlertCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["line",{x1:"12",x2:"12",y1:"8",y2:"12",key:"1pkeuh"}],["line",{x1:"12",x2:"12.01",y1:"16",y2:"16",key:"4dfq90"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const H=o("BookOpen",[["path",{d:"M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z",key:"vv98re"}],["path",{d:"M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z",key:"1cyq3y"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const V=o("Bot",[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const X=o("Brain",[["path",{d:"M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z",key:"1mhkh5"}],["path",{d:"M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z",key:"1d6s00"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const K=o("CheckCircle2",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m9 12 2 2 4-4",key:"dzmm74"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Z=o("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const G=o("Cpu",[["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"9",y:"9",width:"6",height:"6",key:"o3kz5p"}],["path",{d:"M15 2v2",key:"13l42r"}],["path",{d:"M15 20v2",key:"15mkzm"}],["path",{d:"M2 15h2",key:"1gxd5l"}],["path",{d:"M2 9h2",key:"1bbxkp"}],["path",{d:"M20 15h2",key:"19e6y8"}],["path",{d:"M20 9h2",key:"19tzq7"}],["path",{d:"M9 2v2",key:"165o2o"}],["path",{d:"M9 20v2",key:"i2bqo8"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const C=o("Database",[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const W=o("FileText",[["path",{d:"M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z",key:"1nnpy2"}],["polyline",{points:"14 2 14 8 20 8",key:"1ew0cm"}],["line",{x1:"16",x2:"8",y1:"13",y2:"13",key:"14keom"}],["line",{x1:"16",x2:"8",y1:"17",y2:"17",key:"17nazh"}],["line",{x1:"10",x2:"8",y1:"9",y2:"9",key:"1a5vjj"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const J=o("Lightbulb",[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Q=o("RefreshCw",[["path",{d:"M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8",key:"v9h5vc"}],["path",{d:"M21 3v5h-5",key:"1q7to0"}],["path",{d:"M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16",key:"3uifl3"}],["path",{d:"M8 16H3v5",key:"1cv678"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Y=o("Send",[["path",{d:"m22 2-7 20-4-9-9-4Z",key:"1q3vgg"}],["path",{d:"M22 2 11 13",key:"nzbqef"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ee=o("Settings",[["path",{d:"M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",key:"1qme2f"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _=o("TrendingUp",[["polyline",{points:"22 7 13.5 15.5 8.5 10.5 2 17",key:"126l90"}],["polyline",{points:"16 7 22 7 22 13",key:"kwv8wd"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=o("Upload",[["path",{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4",key:"ih7n3h"}],["polyline",{points:"17 8 12 3 7 8",key:"t8dd8p"}],["line",{x1:"12",x2:"12",y1:"3",y2:"15",key:"widbto"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const te=o("XCircle",[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"m15 9-6 6",key:"1uzhvr"}],["path",{d:"m9 9 6 6",key:"z0biqf"}]]);/**
 * @license lucide-react v0.300.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ae=o("Zap",[["polygon",{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2",key:"45s27k"}]]),D="http://localhost:8000";let g=null;const N=()=>(g||(g=localStorage.getItem("session_id")),g),w=s=>{g=s,s?localStorage.setItem("session_id",s):localStorage.removeItem("session_id")},v=R.create({baseURL:D,headers:{"Content-Type":"application/json"}});v.interceptors.request.use(s=>{const t=N();return t&&(s.headers["X-Session-ID"]=t),s});v.interceptors.response.use(s=>{const t=s.headers["x-session-id"];return t&&t!==N()&&w(t),s});const ne=async()=>{try{return(await v.get("/health")).data}catch(s){throw console.error("Health check failed:",s),s}},re=async()=>{try{return(await v.get("/metrics")).data}catch(s){throw console.error("Failed to fetch metrics:",s),s}},ce=async s=>{try{const t=new FormData;return t.append("file",s),(await v.post("/upload-document",t,{headers:{"Content-Type":"multipart/form-data"}})).data}catch(t){throw console.error("Upload failed:",t),t}},ie=async s=>{try{return(await v.post("/ask",{query:s})).data}catch(t){throw console.error("Question failed:",t),t}},le=async()=>{try{const s=await v.post("/session/new");return w(s.data.session_id),s.data}catch(s){throw console.error("Failed to create session:",s),s}};window.addEventListener("beforeunload",()=>{if(N()){const s=`${D}/session/clear`,t=N();navigator.sendBeacon(s,JSON.stringify({headers:{"X-Session-ID":t}})),w(null)}});const oe=()=>{const[s,t]=p.useState([]),[l,c]=p.useState(""),[a,i]=p.useState(!1),d=p.useRef(null),u=()=>{var r;(r=d.current)==null||r.scrollIntoView({behavior:"smooth"})};p.useEffect(()=>{u()},[s]);const m=async r=>{if(r.preventDefault(),!l.trim()||a)return;const h=l.trim();c(""),t(y=>[...y,{type:"user",content:h}]),i(!0);try{const y=await ie(h);t(j=>[...j,{type:"assistant",content:y.answer,confidence:y.confidence,sources:y.sources||[]}])}catch{t(j=>[...j,{type:"assistant",content:"Sorry, I encountered an error. Please try again.",confidence:0,sources:[],error:!0}])}finally{i(!1)}},f=r=>r>=.85?"#10b981":r>=.7?"#f59e0b":"#ef4444",x=r=>r>=.85?"High Confidence":r>=.7?"Medium Confidence":"Low Confidence",n=r=>r>=.85?e.jsx(K,{className:"confidence-icon"}):r>=.7?e.jsx(_,{className:"confidence-icon"}):e.jsx(B,{className:"confidence-icon"});return e.jsxs("div",{className:"chat-interface",children:[e.jsx("div",{className:"chat-header",children:e.jsxs("div",{className:"chat-title",children:[e.jsx("div",{className:"chat-title-icon",children:e.jsx(V,{size:20})}),e.jsx("span",{children:"AI Assistant"})]})}),e.jsxs("div",{className:"chat-messages",children:[s.length===0&&e.jsxs("div",{className:"welcome-message",children:[e.jsx("div",{className:"welcome-icon",children:e.jsx(J,{size:40})}),e.jsx("h3",{children:"Welcome to Your Knowledge Assistant"}),e.jsx("p",{children:"Upload documents and ask me anything. I'll provide accurate answers with sources and confidence scores."})]}),s.map((r,h)=>e.jsx("div",{className:`message ${r.type}`,children:e.jsxs("div",{className:"message-content",children:[e.jsx("div",{className:"message-text",children:r.content}),r.confidence!==null&&r.confidence!==void 0&&e.jsxs("div",{className:"message-meta",children:[e.jsxs("div",{className:"confidence-badge",style:{backgroundColor:f(r.confidence)},children:[n(r.confidence),e.jsxs("span",{children:[x(r.confidence),": ",(r.confidence*100).toFixed(0),"%"]})]}),r.sources&&r.sources.length>0&&e.jsxs("div",{className:"sources",children:[e.jsxs("strong",{children:[e.jsx(H,{size:16}),"Sources Referenced"]}),e.jsx("ul",{children:r.sources.map((y,j)=>e.jsx("li",{children:y},j))})]})]})]})},h)),a&&e.jsx("div",{className:"message assistant",children:e.jsx("div",{className:"message-content",children:e.jsxs("div",{className:"typing-indicator",children:[e.jsxs("div",{className:"typing-dots",children:[e.jsx("div",{className:"typing-dot"}),e.jsx("div",{className:"typing-dot"}),e.jsx("div",{className:"typing-dot"})]}),e.jsx("span",{children:"AI is thinking..."})]})})}),e.jsx("div",{ref:d})]}),e.jsxs("form",{className:"chat-input-form",onSubmit:m,children:[e.jsx("input",{type:"text",value:l,onChange:r=>c(r.target.value),placeholder:"Ask a question about your documents...",disabled:a,className:"chat-input"}),e.jsxs("button",{type:"submit",disabled:a||!l.trim(),className:"send-button",children:[e.jsx(Y,{size:18}),e.jsx("span",{children:"Send"})]})]})]})},de=({onUploadSuccess:s})=>{const[t,l]=p.useState(!1),[c,a]=p.useState(null),[i,d]=p.useState(!1),u=n=>{n.preventDefault(),n.stopPropagation(),n.type==="dragenter"||n.type==="dragover"?d(!0):n.type==="dragleave"&&d(!1)},m=n=>{n.preventDefault(),n.stopPropagation(),d(!1),n.dataTransfer.files&&n.dataTransfer.files[0]&&x(n.dataTransfer.files[0])},f=n=>{n.preventDefault(),n.target.files&&n.target.files[0]&&x(n.target.files[0])},x=async n=>{if(!["application/pdf","application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/plain"].includes(n.type)){a({success:!1,message:"Invalid file type",details:"Please upload PDF, DOCX, or TXT files only"});return}l(!0),a(null);try{const h=await ce(n);a({success:!0,message:`Successfully uploaded ${h.filename}`,details:`Created ${h.chunks_created} chunks for processing`}),s&&s()}catch(h){a({success:!1,message:"Upload failed",details:h.message||"Please try again"})}finally{l(!1)}};return e.jsxs("div",{className:"document-upload-card",children:[e.jsxs("h3",{className:"card-title",children:[e.jsx("div",{className:"card-title-icon",children:e.jsx(W,{size:20})}),"Upload Documents"]}),e.jsxs("form",{className:`upload-area ${i?"drag-active":""}`,onDragEnter:u,onDragLeave:u,onDragOver:u,onDrop:m,onSubmit:n=>n.preventDefault(),children:[e.jsx("input",{type:"file",id:"file-upload",className:"file-input",onChange:f,accept:".pdf,.docx,.txt",disabled:t}),e.jsx("label",{htmlFor:"file-upload",className:"upload-label",children:t?e.jsxs("div",{className:"upload-loading",children:[e.jsx("div",{className:"upload-spinner"}),e.jsx("p",{className:"upload-text",children:"Processing your document..."}),e.jsx("div",{className:"upload-progress",children:e.jsx("div",{className:"upload-progress-bar"})})]}):e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"upload-icon-wrapper",children:e.jsx(se,{className:"upload-icon",size:28})}),e.jsxs("p",{className:"upload-text",children:[e.jsx("strong",{children:"Click to upload"})," or drag and drop"]}),e.jsx("p",{className:"upload-hint",children:"Supported formats"}),e.jsxs("div",{className:"file-types",children:[e.jsx("span",{className:"file-type-badge",children:"PDF"}),e.jsx("span",{className:"file-type-badge",children:"DOCX"}),e.jsx("span",{className:"file-type-badge",children:"TXT"})]})]})})]}),c&&e.jsxs("div",{className:`upload-status ${c.success?"success":"error"}`,children:[e.jsx("div",{className:"status-icon",children:c.success?e.jsx(Z,{size:20}):e.jsx(te,{size:20})}),e.jsxs("div",{className:"status-content",children:[e.jsx("p",{className:"status-message",children:c.message}),c.details&&e.jsx("p",{className:"status-details",children:c.details})]})]})]})},pe=({health:s,metrics:t})=>{var c,a,i;const l=()=>s!=null&&s.vector_store_size?Math.min(s.vector_store_size/100*100,100):0;return e.jsxs("div",{className:"system-stats-card",children:[e.jsxs("h3",{className:"card-title",children:[e.jsx("div",{className:"card-title-icon",children:e.jsx(M,{size:20})}),"System Status"]}),e.jsxs("div",{className:"stats-grid",children:[e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-icon",style:{background:"rgba(16, 185, 129, 0.15)"},children:e.jsx(ae,{size:22,style:{color:"#10b981"}})}),e.jsxs("div",{className:"stat-content",children:[e.jsx("p",{className:"stat-label",children:"Status"}),e.jsx("p",{className:"stat-value",children:(s==null?void 0:s.status)==="healthy"?e.jsxs("span",{className:"status-healthy",children:[e.jsx("span",{className:"status-pulse"}),"Online"]}):e.jsxs("span",{className:"status-error",children:[e.jsx("span",{className:"status-pulse"}),"Offline"]})})]})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-icon",style:{background:"rgba(59, 130, 246, 0.15)"},children:e.jsx(C,{size:22,style:{color:"#3b82f6"}})}),e.jsxs("div",{className:"stat-content",children:[e.jsx("p",{className:"stat-label",children:"Documents"}),e.jsxs("p",{className:"stat-value",children:[(s==null?void 0:s.vector_store_size)||0," chunks"]}),e.jsx("div",{className:"performance-bar",children:e.jsx("div",{className:"performance-fill",style:{width:`${l()}%`}})})]})]}),e.jsxs("div",{className:"stat-item",children:[e.jsx("div",{className:"stat-icon",style:{background:"rgba(139, 92, 246, 0.15)"},children:e.jsx(G,{size:22,style:{color:"#8b5cf6"}})}),e.jsxs("div",{className:"stat-content",children:[e.jsx("p",{className:"stat-label",children:"AI Model"}),e.jsx("p",{className:"stat-value",children:e.jsx("span",{className:"model-name",children:((c=s==null?void 0:s.model)==null?void 0:c.split("-").slice(0,2).join("-"))||"N/A"})})]})]})]}),t&&e.jsxs("div",{className:"metrics-details",children:[e.jsxs("h4",{children:[e.jsx("div",{className:"metrics-icon",children:e.jsx(ee,{size:12})}),"Configuration"]}),e.jsxs("div",{className:"metric-row",children:[e.jsxs("span",{className:"metric-label",children:[e.jsx(_,{size:14}),"Embedding Model"]}),e.jsx("span",{className:"metric-value",children:((i=(a=t.embedding_model)==null?void 0:a.split("/")[1])==null?void 0:i.substring(0,15))||"N/A"})]}),e.jsxs("div",{className:"metric-row",children:[e.jsxs("span",{className:"metric-label",children:[e.jsx(C,{size:14}),"Chunk Size"]}),e.jsx("span",{className:"metric-value",children:t.chunk_size})]}),e.jsxs("div",{className:"metric-row",children:[e.jsxs("span",{className:"metric-label",children:[e.jsx(M,{size:14}),"Top K Results"]}),e.jsx("span",{className:"metric-value",children:t.top_k})]})]}),!s&&e.jsxs("div",{className:"stats-loading",children:[e.jsx("div",{className:"stats-spinner"}),e.jsx("p",{style:{color:"var(--text-muted)",fontSize:"0.9rem"},children:"Loading system stats..."})]})]})};function me(){const[s,t]=p.useState(null),[l,c]=p.useState(null),[a,i]=p.useState(0),[d,u]=p.useState(!0);p.useEffect(()=>{m();const n=setInterval(m,1e4);return setTimeout(()=>u(!1),1500),()=>clearInterval(n)},[]);const m=async()=>{try{const[n,r]=await Promise.all([ne(),re()]);t(n),c(r)}catch(n){console.error("Error fetching system info:",n)}},f=()=>{m(),i(n=>n+1)},x=async()=>{try{await le(),i(n=>n+1),m(),window.location.reload()}catch(n){console.error("Failed to create new session:",n)}};return d?e.jsx("div",{className:"loading-overlay",children:e.jsx("div",{className:"loading-spinner"})}):e.jsxs("div",{className:"App",children:[e.jsx("div",{className:"particles",children:[...Array(20)].map((n,r)=>e.jsx("div",{className:"particle",style:{left:`${Math.random()*100}%`,animationDelay:`${Math.random()*20}s`,animationDuration:`${15+Math.random()*10}s`}},r))}),e.jsx("header",{className:"app-header",children:e.jsxs("div",{className:"header-content",children:[e.jsxs("div",{className:"header-left",children:[e.jsx("div",{className:"logo-icon",children:e.jsx(X,{size:28})}),e.jsxs("div",{className:"header-text",children:[e.jsx("h1",{children:"Enterprise Knowledge Assistant"}),e.jsx("p",{children:"Powered by Agentic RAG • Groq • LangGraph"})]})]}),e.jsxs("div",{className:"header-badge",children:[e.jsx("span",{className:"status-dot"}),e.jsx("span",{children:"System Online"})]}),e.jsxs("button",{className:"new-session-btn",onClick:x,title:"Start New Session",children:[e.jsx(Q,{size:18}),e.jsx("span",{children:"New Session"})]})]})}),e.jsxs("div",{className:"app-container",children:[e.jsxs("div",{className:"sidebar",children:[e.jsx(pe,{health:s,metrics:l}),e.jsx(de,{onUploadSuccess:f})]}),e.jsx("div",{className:"main-content",children:e.jsx(oe,{},a)})]})]})}const ue=b.createRoot(document.getElementById("root"));ue.render(e.jsx(L.StrictMode,{children:e.jsx(me,{})}));
