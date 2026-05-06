import { useState } from "react";

// 質問（10問） const QUESTIONS = [ { id: "budget", title: "予算", options: ["low","mid","high","ultra"] }, { id: "usage", title: "用途", options: ["game","camera","sns","work"] }, { id: "battery", title: "バッテリー", options: ["any","normal","long"] }, { id: "size", title: "サイズ", options: ["compact","standard","large"] }, { id: "brand", title: "ブランド", options: ["google","samsung","sony","any"] }, { id: "gameLevel", title: "ゲームの重さ", options: ["heavy","light","none"] }, { id: "cameraLevel", title: "カメラ", options: ["pro","normal","none"] }, { id: "display", title: "画面性能", options: ["144","120","60"] }, { id: "weight", title: "重さ", options: ["light","any"] }, { id: "ui", title: "UI", options: ["simple","custom"] } ];

// 機種（20個） const PHONES = [ { name: "Pixel 9", price:"mid", usage:["camera","sns"], brand:["google","any"] }, { name: "Pixel 9 Pro", price:"high", usage:["camera"], brand:["google","any"] }, { name: "Pixel 8a", price:"mid", usage:["sns"], brand:["google","any"] }, { name: "Galaxy S25", price:"high", usage:["sns"], brand:["samsung","any"] }, { name: "Galaxy S25 Ultra", price:"ultra", usage:["camera"], brand:["samsung","any"] }, { name: "Galaxy S24 FE", price:"mid", usage:["sns"], brand:["samsung","any"] }, { name: "Xperia 1 VI", price:"ultra", usage:["camera"], brand:["sony","any"] }, { name: "Xperia 10 VI", price:"mid", usage:["sns"], brand:["sony","any"] }, { name: "ROG Phone 8", price:"ultra", usage:["game"] }, { name: "POCO F6", price:"mid", usage:["game"] }, { name: "Xiaomi 13T Pro", price:"high", usage:["game"] }, { name: "Xiaomi 14", price:"ultra", usage:["camera"] }, { name: "Redmi Note 13", price:"low", usage:["sns"] }, { name: "Redmi Note 13 Pro+", price:"low", usage:["camera"] }, { name: "Nothing Phone 2a", price:"low", usage:["sns"] }, { name: "Nothing Phone 1", price:"mid", usage:["sns"] }, { name: "AQUOS sense8", price:"mid", usage:["sns"] }, { name: "OPPO Reno11 A", price:"mid", usage:["sns"] }, { name: "moto g64", price:"low", usage:["sns"] }, { name: "Motorola Edge 50", price:"mid", usage:["work"] } ];

function scorePhone(phone, answers){ let score = 0; if(phone.price === answers.budget) score += 30; if(phone.usage?.includes(answers.usage)) score += 40; if(answers.brand && phone.brand?.includes(answers.brand)) score += 10; if(answers.usage === "game" && !phone.usage?.includes("game")) score -= 20; return score; }

export default function App(){ const [step,setStep] = useState(0); const [answers,setAnswers] = useState({}); const [result,setResult] = useState(null);

const current = QUESTIONS[step];

const select = (val)=>{ const newAns = {...answers,[current.id]:val}; setAnswers(newAns);

if(step+1 >= QUESTIONS.length){
  const ranked = PHONES.map(p=>({...p,score:scorePhone(p,newAns)}))
    .sort((a,b)=>b.score-a.score)
    .slice(0,3);
  setResult(ranked);
}else{
  setStep(step+1);
}

};

if(result){ return ( <div style={{padding:20}}> <h1>診断結果</h1> {result.map((p,i)=>( <div key={i} style={{margin:"10px 0"}}> #{i+1} {p.name} ({p.score}pt) </div> ))} </div> ); }

return ( <div style={{padding:20}}> <h1>{current.title}</h1> {current.options.map(o=> ( <button key={o} onClick={()=>select(o)} style={{display:"block",margin:"10px"}}> {o} </button> ))} </div> ); }
