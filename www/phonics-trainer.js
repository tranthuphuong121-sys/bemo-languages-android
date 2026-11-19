// BeMo 4.12: 24 từ luyện ghép âm, đáp án nhiễu ưu tiên âm dễ nhầm.
window.BEMO_PHONICS_TRAINER={render(root,profile,save){
const lessons=[
{word:'cat',parts:['c','a','t'],sounds:['/k/','/æ/','/t/'],meaning:'con mèo',hint:'C là /k/, A là /æ/, T là /t/. Đọc liền, không thêm âm ờ.'},
{word:'mat',parts:['m','a','t'],sounds:['/m/','/æ/','/t/'],meaning:'tấm thảm',hint:'Thay âm đầu bằng /m/, giữ vần -at.'},
{word:'hat',parts:['h','a','t'],sounds:['/h/','/æ/','/t/'],meaning:'cái mũ',hint:'Âm /h/ là luồng hơi nhẹ, không thêm âm ờ.'},
{word:'ship',parts:['sh','i','p'],sounds:['/ʃ/','/ɪ/','/p/'],meaning:'con tàu',hint:'Hai chữ sh tạo một âm /ʃ/; i đọc /ɪ/.'},
{word:'sheep',parts:['sh','ee','p'],sounds:['/ʃ/','/iː/','/p/'],meaning:'con cừu',hint:'ee tạo /iː/, khác i ngắn trong ship.'},
{word:'book',parts:['b','oo','k'],sounds:['/b/','/ʊ/','/k/'],meaning:'quyển sách',hint:'oo trong book đọc /ʊ/, không giống oo trong food.'},
{word:'cake',parts:['c','a_e','k'],sounds:['/k/','/eɪ/','/k/'],meaning:'bánh ngọt',hint:'e cuối câm; a chuyển thành /eɪ/.'},
{word:'thin',parts:['th','i','n'],sounds:['/θ/','/ɪ/','/n/'],meaning:'mỏng',hint:'th tạo /θ/: đưa đầu lưỡi gần răng, thổi nhẹ.'},
{word:'chin',parts:['ch','i','n'],sounds:['/tʃ/','/ɪ/','/n/'],meaning:'cằm',hint:'ch trong chin tạo âm /tʃ/.'},
{word:'rain',parts:['r','ai','n'],sounds:['/r/','/eɪ/','/n/'],meaning:'mưa',hint:'ai thường tạo /eɪ/ trong rain.'},
{word:'boat',parts:['b','oa','t'],sounds:['/b/','/əʊ/','/t/'],meaning:'thuyền',hint:'oa trong boat thường tạo /əʊ/ (giọng Anh).'},
{word:'night',parts:['n','igh','t'],sounds:['/n/','/aɪ/','/t/'],meaning:'đêm',hint:'igh tạo /aɪ/ trong night.'},
{word:'fish',parts:['f','i','sh'],sounds:['/f/','/ɪ/','/ʃ/'],meaning:'cá',hint:'sh ở cuối từ vẫn tạo âm /ʃ/.'},
{word:'food',parts:['f','oo','d'],sounds:['/f/','/uː/','/d/'],meaning:'thức ăn',hint:'oo trong food đọc /uː/, khác oo trong book.'},
{word:'moon',parts:['m','oo','n'],sounds:['/m/','/uː/','/n/'],meaning:'mặt trăng',hint:'oo trong moon đọc /uː/.'},
{word:'stop',parts:['s','t','o','p'],sounds:['/s/','/t/','/ɒ/','/p/'],meaning:'dừng lại',hint:'Đọc liền cụm phụ âm st, không chèn thêm nguyên âm.'},
{word:'sit',parts:['s','i','t'],sounds:['/s/','/ɪ/','/t/'],meaning:'ngồi',hint:'i trong sit là /ɪ/, khác ee trong seat.'},
{word:'seat',parts:['s','ea','t'],sounds:['/s/','/iː/','/t/'],meaning:'chỗ ngồi',hint:'ea trong seat là /iː/.'},
{word:'pin',parts:['p','i','n'],sounds:['/p/','/ɪ/','/n/'],meaning:'cái ghim',hint:'i ngắn /ɪ/.'},
{word:'pen',parts:['p','e','n'],sounds:['/p/','/e/','/n/'],meaning:'cái bút',hint:'e trong pen là /e/.'},
{word:'cap',parts:['c','a','p'],sounds:['/k/','/æ/','/p/'],meaning:'mũ lưỡi trai',hint:'a trong cap là /æ/.'},
{word:'cup',parts:['c','u','p'],sounds:['/k/','/ʌ/','/p/'],meaning:'cái cốc',hint:'u trong cup là /ʌ/.'},
{word:'shop',parts:['sh','o','p'],sounds:['/ʃ/','/ɒ/','/p/'],meaning:'cửa hàng',hint:'sh tạo /ʃ/.'},
{word:'chip',parts:['ch','i','p'],sounds:['/tʃ/','/ɪ/','/p/'],meaning:'miếng khoai chiên',hint:'ch tạo /tʃ/, khác sh /ʃ/.'}
];
let pos=0,correct=0,attempts=0,shown=false;const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
root.innerHTML=`<section class="panel"><span class="chip">PHONICS · NHÌN CHỮ TỰ ĐỌC</span><h2>🔡 Ghép chữ thành âm</h2><p class="muted">Hãy nhìn từ tiếng Anh và thử đọc trước. Chỉ mở gợi ý IPA sau khi đã thử. Quy tắc là gợi ý thường gặp, không đúng cho mọi từ.</p><p id="phonicsCount"></p><div class="details" style="text-align:center"><h2 id="phonicsWord" style="font-size:2.4rem;letter-spacing:.08em"></h2><p id="phonicsMeaning"></p><div id="phonicsParts" class="actions" style="justify-content:center" hidden></div><div class="actions" style="justify-content:center"><button id="phonicsHear">🔊 Nghe từ</button><button id="phonicsReveal" class="outline">👀 Hiện cách ghép âm</button><button id="phonicsReady" class="outline">✅ Đã thử đọc, làm bài kiểm tra</button></div><div id="phonicsHint" aria-live="polite"></div></div><h3>🧩 Tự kiểm tra: chọn cách đọc</h3><p class="muted">Chọn phiên âm đúng sau khi tự thử đọc từ.</p><div id="phonicsChoices" class="actions" hidden></div><p id="phonicsFeedback" role="status" aria-live="polite"></p><button id="phonicsNext" disabled>Câu tiếp →</button><p id="phonicsScore"></p></section>`;
const get=id=>root.querySelector('#'+id);
function speak(word){if(!('speechSynthesis' in window)){get('phonicsFeedback').textContent='Thiết bị không hỗ trợ giọng đọc.';return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(word);u.lang='en-GB';u.rate=.72;speechSynthesis.speak(u)}
function display(){const x=lessons[pos];shown=false;get('phonicsCount').textContent='Từ '+(pos+1)+'/'+lessons.length;get('phonicsWord').textContent=x.word.toUpperCase();get('phonicsMeaning').textContent=x.meaning;get('phonicsParts').hidden=true;get('phonicsParts').innerHTML=x.parts.map(p=>`<span class="chip">${escape(p)}</span>`).join('');get('phonicsChoices').hidden=true;get('phonicsHint').textContent='';get('phonicsFeedback').textContent='';get('phonicsNext').disabled=true;
const ipa=x.sounds.join(' + ');const candidates=lessons.filter(y=>y!==x&&y.sounds.length===x.sounds.length).map(y=>({ipa:y.sounds.join(' + '),distance:y.sounds.filter((sound,i)=>sound!==x.sounds[i]).length})).filter(y=>y.ipa!==ipa).sort((a,b)=>a.distance-b.distance);const distractors=[...new Set(candidates.map(y=>y.ipa))];const choices=[ipa,...distractors.slice(0,2)];for(let i=choices.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[choices[i],choices[j]]=[choices[j],choices[i]];}get('phonicsChoices').innerHTML=choices.map((c,i)=>`<button class="outline" data-choice="${i}">${escape(c)}</button>`).join('');get('phonicsChoices').querySelectorAll('button').forEach((b,i)=>b.onclick=()=>{if(get('phonicsNext').disabled===false)return;attempts++;const ok=choices[i]===ipa;if(ok)correct++;get('phonicsFeedback').textContent=(ok?'✓ Đúng! ':'Chưa đúng. ')+x.hint;get('phonicsNext').disabled=false;get('phonicsChoices').querySelectorAll('button').forEach(y=>y.disabled=true);profile.scores['en-phonics-blend']=Math.max(profile.scores['en-phonics-blend']||0,Math.round(correct/attempts*100));profile.done['en-phonics-'+x.word]=ok;save();get('phonicsScore').textContent='Đúng '+correct+'/'+attempts+' lượt.';});}
get('phonicsReady').onclick=()=>{get('phonicsChoices').hidden=false;get('phonicsReady').disabled=true;};get('phonicsReady').disabled=false;get('phonicsHear').onclick=()=>speak(lessons[pos].word);get('phonicsReveal').onclick=()=>{const x=lessons[pos];get('phonicsParts').hidden=false;get('phonicsHint').textContent=x.parts.map((p,i)=>p+' → '+x.sounds[i]).join('  ·  ')+'  |  '+x.hint;shown=true;};get('phonicsNext').onclick=()=>{pos=(pos+1)%lessons.length;display()};display();
}};
