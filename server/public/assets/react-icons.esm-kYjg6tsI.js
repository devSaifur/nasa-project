var L=(r,e,t)=>{if(!e.has(r))throw TypeError("Cannot "+t)};var i=(r,e,t)=>(L(r,e,"read from private field"),t?t.call(r):e.get(r)),u=(r,e,t)=>{if(e.has(r))throw TypeError("Cannot add the same private member more than once");e instanceof WeakSet?e.add(r):e.set(r,t)},d=(r,e,t,s)=>(L(r,e,"write to private field"),s?s.call(r,t):e.set(r,t),t);var p=(r,e,t)=>(L(r,e,"access private method"),t);import{S as V,s as $,g as y,n as O,u as H,r as l}from"./index-mk5lP_6y.js";import{s as S}from"./index-MkM_wAIo.js";var h,n,C,c,w,m,g,M,E,j=(E=class extends V{constructor(e,t){super();u(this,w);u(this,g);u(this,h,void 0);u(this,n,void 0);u(this,C,void 0);u(this,c,void 0);d(this,n,void 0),d(this,h,e),this.setOptions(t),this.bindMethods(),p(this,w,m).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(e){var s;const t=this.options;this.options=i(this,h).defaultMutationOptions(e),$(t,this.options)||i(this,h).getMutationCache().notify({type:"observerOptionsUpdated",mutation:i(this,C),observer:this}),(s=i(this,C))==null||s.setOptions(this.options)}onUnsubscribe(){var e;this.hasListeners()||(e=i(this,C))==null||e.removeObserver(this)}onMutationUpdate(e){p(this,w,m).call(this),p(this,g,M).call(this,e)}getCurrentResult(){return i(this,n)}reset(){d(this,C,void 0),p(this,w,m).call(this),p(this,g,M).call(this)}mutate(e,t){var s;return d(this,c,t),(s=i(this,C))==null||s.removeObserver(this),d(this,C,i(this,h).getMutationCache().build(i(this,h),this.options)),i(this,C).addObserver(this),i(this,C).execute(e)}},h=new WeakMap,n=new WeakMap,C=new WeakMap,c=new WeakMap,w=new WeakSet,m=function(){var t;const e=((t=i(this,C))==null?void 0:t.state)??y();d(this,n,{...e,isPending:e.status==="pending",isSuccess:e.status==="success",isError:e.status==="error",isIdle:e.status==="idle",mutate:this.mutate,reset:this.reset})},g=new WeakSet,M=function(e){O.batch(()=>{var t,s,o,a,f,b,x,R;i(this,c)&&this.hasListeners()&&((e==null?void 0:e.type)==="success"?((s=(t=i(this,c)).onSuccess)==null||s.call(t,e.data,i(this,n).variables,i(this,n).context),(a=(o=i(this,c)).onSettled)==null||a.call(o,e.data,null,i(this,n).variables,i(this,n).context)):(e==null?void 0:e.type)==="error"&&((b=(f=i(this,c)).onError)==null||b.call(f,e.error,i(this,n).variables,i(this,n).context),(R=(x=i(this,c)).onSettled)==null||R.call(x,void 0,e.error,i(this,n).variables,i(this,n).context))),this.listeners.forEach(Z=>{Z(i(this,n))})})},E);function K(r,e){const t=H(e),[s]=l.useState(()=>new j(t,r));l.useEffect(()=>{s.setOptions(r)},[s,r]);const o=l.useSyncExternalStore(l.useCallback(f=>s.subscribe(O.batchCalls(f)),[s]),()=>s.getCurrentResult(),()=>s.getCurrentResult()),a=l.useCallback((f,b)=>{s.mutate(f,b).catch(I)},[s]);if(o.error&&S(s.options.throwOnError,[o.error]))throw o.error;return{...o,mutate:a,mutateAsync:o.mutate}}function I(){}function v(r,e){if(r==null)return{};var t={},s=Object.keys(r),o,a;for(a=0;a<s.length;a++)o=s[a],!(e.indexOf(o)>=0)&&(t[o]=r[o]);return t}var _=["color"],W=l.forwardRef(function(r,e){var t=r.color,s=t===void 0?"currentColor":t,o=v(r,_);return l.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:e}),l.createElement("path",{d:"M4.5 1C4.77614 1 5 1.22386 5 1.5V2H10V1.5C10 1.22386 10.2239 1 10.5 1C10.7761 1 11 1.22386 11 1.5V2H12.5C13.3284 2 14 2.67157 14 3.5V12.5C14 13.3284 13.3284 14 12.5 14H2.5C1.67157 14 1 13.3284 1 12.5V3.5C1 2.67157 1.67157 2 2.5 2H4V1.5C4 1.22386 4.22386 1 4.5 1ZM10 3V3.5C10 3.77614 10.2239 4 10.5 4C10.7761 4 11 3.77614 11 3.5V3H12.5C12.7761 3 13 3.22386 13 3.5V5H2V3.5C2 3.22386 2.22386 3 2.5 3H4V3.5C4 3.77614 4.22386 4 4.5 4C4.77614 4 5 3.77614 5 3.5V3H10ZM2 6V12.5C2 12.7761 2.22386 13 2.5 13H12.5C12.7761 13 13 12.7761 13 12.5V6H2ZM7 7.5C7 7.22386 7.22386 7 7.5 7C7.77614 7 8 7.22386 8 7.5C8 7.77614 7.77614 8 7.5 8C7.22386 8 7 7.77614 7 7.5ZM9.5 7C9.22386 7 9 7.22386 9 7.5C9 7.77614 9.22386 8 9.5 8C9.77614 8 10 7.77614 10 7.5C10 7.22386 9.77614 7 9.5 7ZM11 7.5C11 7.22386 11.2239 7 11.5 7C11.7761 7 12 7.22386 12 7.5C12 7.77614 11.7761 8 11.5 8C11.2239 8 11 7.77614 11 7.5ZM11.5 9C11.2239 9 11 9.22386 11 9.5C11 9.77614 11.2239 10 11.5 10C11.7761 10 12 9.77614 12 9.5C12 9.22386 11.7761 9 11.5 9ZM9 9.5C9 9.22386 9.22386 9 9.5 9C9.77614 9 10 9.22386 10 9.5C10 9.77614 9.77614 10 9.5 10C9.22386 10 9 9.77614 9 9.5ZM7.5 9C7.22386 9 7 9.22386 7 9.5C7 9.77614 7.22386 10 7.5 10C7.77614 10 8 9.77614 8 9.5C8 9.22386 7.77614 9 7.5 9ZM5 9.5C5 9.22386 5.22386 9 5.5 9C5.77614 9 6 9.22386 6 9.5C6 9.77614 5.77614 10 5.5 10C5.22386 10 5 9.77614 5 9.5ZM3.5 9C3.22386 9 3 9.22386 3 9.5C3 9.77614 3.22386 10 3.5 10C3.77614 10 4 9.77614 4 9.5C4 9.22386 3.77614 9 3.5 9ZM3 11.5C3 11.2239 3.22386 11 3.5 11C3.77614 11 4 11.2239 4 11.5C4 11.7761 3.77614 12 3.5 12C3.22386 12 3 11.7761 3 11.5ZM5.5 11C5.22386 11 5 11.2239 5 11.5C5 11.7761 5.22386 12 5.5 12C5.77614 12 6 11.7761 6 11.5C6 11.2239 5.77614 11 5.5 11ZM7 11.5C7 11.2239 7.22386 11 7.5 11C7.77614 11 8 11.2239 8 11.5C8 11.7761 7.77614 12 7.5 12C7.22386 12 7 11.7761 7 11.5ZM9.5 11C9.22386 11 9 11.2239 9 11.5C9 11.7761 9.22386 12 9.5 12C9.77614 12 10 11.7761 10 11.5C10 11.2239 9.77614 11 9.5 11Z",fill:s,fillRule:"evenodd",clipRule:"evenodd"}))}),B=["color"],X=l.forwardRef(function(r,e){var t=r.color,s=t===void 0?"currentColor":t,o=v(r,B);return l.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:e}),l.createElement("path",{d:"M4.93179 5.43179C4.75605 5.60753 4.75605 5.89245 4.93179 6.06819C5.10753 6.24392 5.39245 6.24392 5.56819 6.06819L7.49999 4.13638L9.43179 6.06819C9.60753 6.24392 9.89245 6.24392 10.0682 6.06819C10.2439 5.89245 10.2439 5.60753 10.0682 5.43179L7.81819 3.18179C7.73379 3.0974 7.61933 3.04999 7.49999 3.04999C7.38064 3.04999 7.26618 3.0974 7.18179 3.18179L4.93179 5.43179ZM10.0682 9.56819C10.2439 9.39245 10.2439 9.10753 10.0682 8.93179C9.89245 8.75606 9.60753 8.75606 9.43179 8.93179L7.49999 10.8636L5.56819 8.93179C5.39245 8.75606 5.10753 8.75606 4.93179 8.93179C4.75605 9.10753 4.75605 9.39245 4.93179 9.56819L7.18179 11.8182C7.35753 11.9939 7.64245 11.9939 7.81819 11.8182L10.0682 9.56819Z",fill:s,fillRule:"evenodd",clipRule:"evenodd"}))}),k=["color"],Y=l.forwardRef(function(r,e){var t=r.color,s=t===void 0?"currentColor":t,o=v(r,k);return l.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:e}),l.createElement("path",{d:"M11.4669 3.72684C11.7558 3.91574 11.8369 4.30308 11.648 4.59198L7.39799 11.092C7.29783 11.2452 7.13556 11.3467 6.95402 11.3699C6.77247 11.3931 6.58989 11.3355 6.45446 11.2124L3.70446 8.71241C3.44905 8.48022 3.43023 8.08494 3.66242 7.82953C3.89461 7.57412 4.28989 7.55529 4.5453 7.78749L6.75292 9.79441L10.6018 3.90792C10.7907 3.61902 11.178 3.53795 11.4669 3.72684Z",fill:s,fillRule:"evenodd",clipRule:"evenodd"}))}),U=["color"],z=l.forwardRef(function(r,e){var t=r.color,s=t===void 0?"currentColor":t,o=v(r,U);return l.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:e}),l.createElement("path",{d:"M8.84182 3.13514C9.04327 3.32401 9.05348 3.64042 8.86462 3.84188L5.43521 7.49991L8.86462 11.1579C9.05348 11.3594 9.04327 11.6758 8.84182 11.8647C8.64036 12.0535 8.32394 12.0433 8.13508 11.8419L4.38508 7.84188C4.20477 7.64955 4.20477 7.35027 4.38508 7.15794L8.13508 3.15794C8.32394 2.95648 8.64036 2.94628 8.84182 3.13514Z",fill:s,fillRule:"evenodd",clipRule:"evenodd"}))}),q=["color"],F=l.forwardRef(function(r,e){var t=r.color,s=t===void 0?"currentColor":t,o=v(r,q);return l.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:e}),l.createElement("path",{d:"M6.1584 3.13508C6.35985 2.94621 6.67627 2.95642 6.86514 3.15788L10.6151 7.15788C10.7954 7.3502 10.7954 7.64949 10.6151 7.84182L6.86514 11.8418C6.67627 12.0433 6.35985 12.0535 6.1584 11.8646C5.95694 11.6757 5.94673 11.3593 6.1356 11.1579L9.565 7.49985L6.1356 3.84182C5.94673 3.64036 5.95694 3.32394 6.1584 3.13508Z",fill:s,fillRule:"evenodd",clipRule:"evenodd"}))}),P=["color"],G=l.forwardRef(function(r,e){var t=r.color,s=t===void 0?"currentColor":t,o=v(r,P);return l.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:e}),l.createElement("path",{d:"M12.8536 2.85355C13.0488 2.65829 13.0488 2.34171 12.8536 2.14645C12.6583 1.95118 12.3417 1.95118 12.1464 2.14645L7.5 6.79289L2.85355 2.14645C2.65829 1.95118 2.34171 1.95118 2.14645 2.14645C1.95118 2.34171 1.95118 2.65829 2.14645 2.85355L6.79289 7.5L2.14645 12.1464C1.95118 12.3417 1.95118 12.6583 2.14645 12.8536C2.34171 13.0488 2.65829 13.0488 2.85355 12.8536L7.5 8.20711L12.1464 12.8536C12.3417 13.0488 12.6583 13.0488 12.8536 12.8536C13.0488 12.6583 13.0488 12.3417 12.8536 12.1464L8.20711 7.5L12.8536 2.85355Z",fill:s,fillRule:"evenodd",clipRule:"evenodd"}))}),Q=["color"],J=l.forwardRef(function(r,e){var t=r.color,s=t===void 0?"currentColor":t,o=v(r,Q);return l.createElement("svg",Object.assign({width:"15",height:"15",viewBox:"0 0 15 15",fill:"none",xmlns:"http://www.w3.org/2000/svg"},o,{ref:e}),l.createElement("path",{d:"M1.84998 7.49998C1.84998 4.66458 4.05979 1.84998 7.49998 1.84998C10.2783 1.84998 11.6515 3.9064 12.2367 5H10.5C10.2239 5 10 5.22386 10 5.5C10 5.77614 10.2239 6 10.5 6H13.5C13.7761 6 14 5.77614 14 5.5V2.5C14 2.22386 13.7761 2 13.5 2C13.2239 2 13 2.22386 13 2.5V4.31318C12.2955 3.07126 10.6659 0.849976 7.49998 0.849976C3.43716 0.849976 0.849976 4.18537 0.849976 7.49998C0.849976 10.8146 3.43716 14.15 7.49998 14.15C9.44382 14.15 11.0622 13.3808 12.2145 12.2084C12.8315 11.5806 13.3133 10.839 13.6418 10.0407C13.7469 9.78536 13.6251 9.49315 13.3698 9.38806C13.1144 9.28296 12.8222 9.40478 12.7171 9.66014C12.4363 10.3425 12.0251 10.9745 11.5013 11.5074C10.5295 12.4963 9.16504 13.15 7.49998 13.15C4.05979 13.15 1.84998 10.3354 1.84998 7.49998Z",fill:s,fillRule:"evenodd",clipRule:"evenodd"}))});export{z as C,J as R,F as a,W as b,X as c,Y as d,G as e,K as u};
