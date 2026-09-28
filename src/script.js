const audio=document.getElementById("audio");
const playBtn=document.getElementById("playBtn");
const progress=document.getElementById("progress");
const progressTrack=document.querySelector(".progress-track");
const currentTimeEl=document.getElementById("currentTime");
const durationEl=document.getElementById("duration");
const currentEl=document.getElementById("current");
const previousEl=document.getElementById("previous");
const nextEl=document.getElementById("next");
const cover=document.getElementById("cover");
const app=document.querySelector(".app");

// lyrics
const lyrics=[
 {time:0,text:"..."},
 {time:5,text:"[instrumental intro]"},
 {time:44,text:"I know a place"},
 {time:54,text:"It's somewhere I go when I need to remember your face"},
 {time:65,text:"We get married in our heads"},
 {time:75,text:"Something to do while we try to recall how we met"},
 {time:84,text:"Do you think I have forgotten?"},
 {time:89,text:"Do you think I have forgotten?"},
 {time:94,text:"Do you think I have forgotten About you?"},
 {time:104,text:"You and I (Don't let go)"},
 {time:109,text:"We're alive (Don't let go)"},
 {time:114,text:"With nothing to do, I could lay and just look in your eyes"},
 {time:125,text:"Wait (Don't let go)"},
 {time:129,text:"And pretend (Don't let go, oh)"},
 {time:134,text:"Hold on and hope that we'll find our way back in the end (In the end)"},
 {time:145,text:"Do you think I havе forgotten?"},
 {time:149,text:"Do you think I havе forgotten?"},
 {time:154,text:"Do you think I have forgotten About you?"},
 {time:164,text:"Do you think I havе forgotten?"},
 {time:169,text:"Do you think I havе forgotten?"},
 {time:174,text:"Do you think I have forgotten About you?"},
 {time:185,text:"And there was something about you that now I can't remember"},
 {time:189,text:"It's the same damn thing that made my heart surrender"},
 {time:195,text:"And I'll miss you on a train, I'll miss you in the mornin'"},
 {time:200,text:"I never know what to think about"},
 {time:203,text:"I think about you (Don't let go)"},
 {time:209,text:"About you (Don't let go)"},
 {time:214,text:"Do you think I have forgotten About you?"},
 {time:224,text:"About you (Don't let go, oh)"},
 {time:229,text:"About you"},
 {time:234,text:"Do you think I have forgotten About you?"},
 {time:242,text:"[Instrumental Outro]"}
];

function formatTime(s){if(!Number.isFinite(s))return"0:00";return Math.floor(s/60)+":"+String(Math.floor(s%60)).padStart(2,"0")}
function updateLyrics(){
 const t=audio.currentTime;let i=0;
 for(let n=0;n<lyrics.length;n++){if(t>=lyrics[n].time)i=n;else break}
 currentEl.textContent=lyrics[i]?.text||"";
 previousEl.textContent=lyrics[i-1]?.text||"";
 nextEl.textContent=lyrics[i+1]?.text||"";
}
function updateProgress(){
 const p=audio.duration?(audio.currentTime/audio.duration)*100:0;
 progress.style.width=p+"%";currentTimeEl.textContent=formatTime(audio.currentTime);updateLyrics();
}
playBtn.addEventListener("click",async()=>{
 if(audio.paused){try{await audio.play()}catch(e){currentEl.textContent="Add music.mp3 to this folder"}}else audio.pause();
});
audio.addEventListener("play",()=>{playBtn.textContent="Ⅱ";app.classList.add("playing")});
audio.addEventListener("pause",()=>{playBtn.textContent="▶";app.classList.remove("playing")});
audio.addEventListener("loadedmetadata",()=>durationEl.textContent=formatTime(audio.duration));
audio.addEventListener("timeupdate",updateProgress);
progressTrack.addEventListener("click",e=>{
 if(!audio.duration)return;
 const r=progressTrack.getBoundingClientRect();
 audio.currentTime=((e.clientX-r.left)/r.width)*audio.duration;
});
async function loadCover(){
 try{
  const r=await fetch("https://itunes.apple.com/search?term=The%201975%20About%20You&entity=song&limit=1");
  const d=await r.json();
  if(d.results?.length)cover.src=d.results[0].artworkUrl100.replace("100x100","1000x1000");
 }catch(e){cover.src="1975.png"}
}
cover.addEventListener("error",()=>cover.src="1975.png");
loadCover();updateLyrics();
