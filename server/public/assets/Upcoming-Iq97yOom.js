import{u as i,j as t}from"./index-THQisTUv.js";import{i as o,a as c,A as l}from"./index-FPVDYwZJ.js";import{u as d,e as m}from"./react-icons.esm-r_eX_s1f.js";import{u as x,f as h}from"./helpers-4-jGBjxV.js";function u(){const s=i(),{mutate:a,isPending:e,error:r}=d({mutationKey:["Abort-Launch"],mutationFn:async n=>(await c.delete(`${l}/launches/${n}`)).data,onSuccess:()=>{s.invalidateQueries({queryKey:["Get-Launches"]})}});return o(r)&&console.error(r.message),{abortLaunch:a,isAbortingLaunch:e}}const L=()=>{const{launches:s}=x(),{abortLaunch:a}=u();return t.jsxs("div",{className:"mx-auto flex max-w-4xl flex-col gap-12 pt-24",children:[t.jsx("div",{className:"text-2xl",children:t.jsx("p",{children:"* Upcoming missions including both SpaceX launches and newly scheduled Space X rockets."})}),t.jsxs("table",{className:"text-lg",children:[t.jsx("thead",{className:"font-bold text-blue-200",children:t.jsxs("tr",{children:[t.jsx("th",{}),t.jsx("th",{className:"text-start",children:"No."}),t.jsx("th",{className:"text-start",children:"Date"}),t.jsx("th",{className:"text-start",children:"Mission "}),t.jsx("th",{className:"text-start",children:"Rocket"}),t.jsx("th",{className:"text-start",children:"Destination"})]})}),t.jsx("tbody",{className:"text-center",children:s==null?void 0:s.map(e=>e.upcoming&&e.destination&&t.jsxs("tr",{children:[t.jsx("td",{children:t.jsx("button",{onClick:()=>a(e.flightNumber),className:"pr-2 align-middle",children:t.jsx(m,{fontWeight:"600",color:"red",height:"16",width:"16"})})}),t.jsx("td",{className:"text-start font-normal",children:e.flightNumber}),t.jsx("td",{className:"text-start font-normal",children:h(e.launchDate)}),t.jsx("td",{className:"text-start font-normal",children:e.mission}),t.jsx("td",{className:"text-start font-normal",children:e.rocket}),t.jsx("td",{className:"text-start font-normal",children:e.destination})]},e.flightNumber))})]})]})};export{L as default};
