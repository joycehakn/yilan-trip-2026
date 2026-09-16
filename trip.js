const g=q=>`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
const a=q=>`https://maps.apple.com/?q=${encodeURIComponent(q)}`;
const link=(label,q,kind='google')=>`<a class="map" href="${kind==='apple'?a(q):g(q)}" target="_blank" rel="noopener">${label}</a>`;
const both=(place,parking,group)=>`${link('📍 景點',place)} ${link('🅿️ 停車',parking,group==='A'?'apple':'google')}`;
const rows=[
 {day:'DAY 1',date:'9/25',note:'會合・入住'},
 {t:'09:00',a:'🚙 <b>板橋出發</b>',b:'—'},
 {t:'上午',a:'👶 <b>機動休息，最多一站</b><br>① 石碇服務區｜10–15 分<br>② 坪林下坑子口溪｜15–25 分<br>③ 二龍之心｜20–30 分<br><em>寶寶睡著就不停</em>',b:'🚗 <b>大直 → 渡小月直達</b><br>目標 11:30–11:45 抵達'},
 {t:'12:00',common:true,title:'🍽️ A+B 會合｜渡小月',desc:'一起午餐',place:'渡小月 宜蘭',parking:'渡小月 宜蘭 停車場'},
 {t:'13:35–14:30',common:true,title:'🌳 冬山河親水公園',desc:'河邊＋草地｜寶寶睏了就縮短｜下雨取消',place:'冬山河親水公園',parking:'冬山河親水公園 停車場'},
 {t:'15:00',common:true,title:'🏡 晨露庄 Check-in',desc:'A：寶寶嘗試午睡，睡不著就田野散步<br>B：入住、休息／自由活動',place:'晨露庄 宜蘭',parking:'晨露庄 宜蘭'},
 {t:'晚上',a:'16:00 點心<br>18:00 洗澡<br>19:00 晚餐<br>20:30 寶寶睡覺',b:'🍽️ 一起晚餐<br>之後自由活動'},
 {day:'DAY 2',date:'9/26',note:'上午同行・下午分流'},
 {t:'09:30–11:30',common:true,title:'🦌 上午三選一',desc:'🥇 斑比山丘　② 宜農牧場　③ 梅花湖',places:[['斑比山丘','斑比山丘'],['宜農牧場','宜農牧場'],['梅花湖','梅花湖風景區']],parking:'斑比山丘 停車場'},
 {t:'12:00',common:true,title:'🍽️ 冬山／羅東午餐',desc:'一起午餐',place:'羅東美食',parking:'羅東 停車場'},
 {t:'13:15',a:'🚙 <b>回晨露庄</b>',b:'🚗 <b>開始自由行程</b>'},
 {t:'14:00–16:00',a:'😴 <b>寶寶午睡｜晨露庄</b><br>大人一起休息<br>寶寶沒睡 → 民宿附近活動',b:'☕ <b>休息或推薦行程</b><br>① 羅東林業文化園區｜14:00–15:30<br>'+both('羅東林業文化園區','羅東林業文化園區 停車場','B')+'<br>② 冬山老街＋車站｜14:00–15:40<br>'+both('冬山老街','冬山車站 停車場','B')},
 {t:'16:00',a:'👶 起床＋點心<br>前往生態綠舟',b:'🚗 直接前往生態綠舟'},
 {t:'16:20–17:30',common:true,title:'🌲 A+B 會合｜生態綠舟',desc:'森林＋草地＋冬山河',place:'冬山河生態綠舟',parking:'冬山河生態綠舟 停車場'},
 {t:'備案',a:'寶寶狀況不好 → 留晨露庄',b:'↩️ 回晨露庄會合'},
 {day:'DAY 3',date:'9/27',note:'全員同行・回程'},
 {t:'09:30',common:true,title:'🧳 晨露庄退房',desc:'整理行李後出發',place:'晨露庄 宜蘭',parking:'晨露庄 宜蘭'},
 {t:'09:45–12:00',common:true,title:'☀️ 宜蘭傳藝園區',desc:'11:30 表演｜12:00 園內午餐',place:'國立傳統藝術中心 宜蘭傳藝園區',parking:'宜蘭傳藝園區 遊客停車場'},
 {t:'🌧️ 雨天替代',common:true,title:'🏛️ 蘭陽博物館',desc:'10:00–12:00',place:'蘭陽博物館',parking:'蘭陽博物館 停車場'},
 {t:'13:30–14:30',common:true,title:'🏖️ 外澳沙灘',desc:'玩沙＋看海｜大雨或海況差取消',place:'外澳沙灘',parking:'外澳服務區 停車場'},
 {t:'14:30',a:'🚙 <b>外澳 → 板橋</b><br>寶寶車上午睡<br>目標 17:30 前到家',b:'🚗 <b>外澳 → 大直</b>'}
];
function cell(r,group,main){if(!r.common)return r[group.toLowerCase()]||'—';if(!main)return '<span class="同行">同行 ←</span>';let maps='';if(r.places)maps='<div class="links">'+r.places.map(([n,q])=>link('📍 '+n,q)).join(' ')+' '+link('🅿️ 停車',r.parking,group==='A'?'apple':'google')+'</div>';else maps='<div class="links">'+both(r.place,r.parking,group)+'</div>';return `<b>${r.title}</b><br>${r.desc}${maps}`}
function render(primary){const secondary=primary==='A'?'B':'A';const name={A:'🚙 A組｜親子組',B:'🚗 B組｜大人組'};let html=`<thead><tr><th>時間</th><th>${name[primary]}<small>完整行程</small></th><th>${name[secondary]}<small>右滑查看</small></th></tr></thead><tbody>`;for(const r of rows){if(r.day){html+=`<tr class="day"><td>${r.date}</td><td colspan="2"><b>${r.day}</b><span>${r.note}</span></td></tr>`;continue}html+=`<tr><th>${r.t}</th><td>${cell(r,primary,true)}</td><td>${cell(r,secondary,false)}</td></tr>`}document.querySelector('table').innerHTML=html+'</tbody>';document.querySelector('.viewname').textContent=name[primary];}
