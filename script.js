const groups={
  group1:["ali","zahra"],
  group2:["marzie","taha"],
  group3:["fateme","hasan"],
  group4:["mohadese","javad"],
};
let present={};
function openGroup(g){
  localStorage.setItem("currentGroup",g);
  window.location="group.html";
};
if
(location.pathname.includes("group.html")){
  const g=
localStorage.getItem("currentGroup");
document.getElementById("title").innerText="اعضای"+g;
  const members=groups[g];

  members.forEach(name=>present[name]=false);
  members.forEach(name=> {
    const div=document.createElement("div");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    const label= document.createElement("label");
    label.textContent=name;
    checkbox.addEventListener("change",()=>{present[name]=checkbox.checked;
  });
  div.appendChild(checkbox);
  div.appendChild(label);
  document.getElementById("members").appendChild(div);
  });
  window.finishAttendance=function() {
    const absent=members.filter(name=>present[name]===false);
    localStorage.setItem("absent",JSON.stringify(absent));
    window.location.href="result.html";
  }
}
if
(location.pathname.includes("result.html")){
  const list=JSON.parse(localStorage.getItem("absent")) ||[];
  const absentList=document.getElementById("absentList");
  list.forEach((n) => {
    const li=document.createElement("li");
    li.innerText=n;
    absentList.appendChild(li);
  });
}
function sendSms(){
  let phone="09132041094";
  let absents=JSON.parse(localStorage.getItem("absent"))||[];
  let text=`لیست غایبین:\n ${absents.join("\n")}`;
  let encode=encodeURIComponent(text);
  let url1=`sms:${phone}?body=${encode}`;
  let url2=`sms:${phone};?body=${encode}`;
  let url3=`sms:${phone}#Intent;scheme=sms;S.android.intent.extra.TEXT=${encode};end`;
  try {
  window.location.href=url1;
  setTimeout(()=>{
    window.location.href=url2;
  },300);
  setTimeout(()=>{
    window.location.href=url3;
  },600);
  } catch (e) {
    window.location.href=url3;
  }
}
