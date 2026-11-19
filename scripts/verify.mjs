import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
const root=path.resolve(import.meta.dirname,'../www');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const assert=(ok,msg)=>{if(!ok)throw new Error(msg);};
const html=read('index.html'),sw=read('sw.js'),stories=read('stories.js');
const refs=[...html.matchAll(/(?:src|href)="([^"]+)"/g)].map(m=>m[1]).filter(s=>!s.startsWith('http')&&!s.startsWith('#'));
for(const ref of refs)assert(fs.existsSync(path.join(root,ref)),`Missing HTML asset: ${ref}`);
for(const file of ['app.js','data.js','pronunciation.js','phonics.js','challenge.js','reading-guide.js','stories.js','connectivity.js','backup.js','device-check.js','ipa-trainer.js','phonics-trainer.js','sw.js'])new vm.Script(read(file),{filename:file});
const lines=[...stories.matchAll(/title:'([^']+)',level:'[^']+',text:'([^']+)'/g)].map(m=>({title:m[1],sentences:m[2].split(/(?<=[.!?])\s+/).filter(Boolean)}));
assert(lines.length===6,`Expected six stories, found ${lines.length}`);
const total=lines.reduce((n,s)=>n+s.sentences.length,0);
assert(total===28,`Expected 28 sentences, found ${total}`);
const assets=[];
for(let si=0;si<lines.length;si++)for(let i=0;i<lines[si].sentences.length;i++)for(const type of ['sentences','scenes']){
 const name=`assets/${type}/s${si+1}-${i+1}.webp`,file=path.join(root,name);
 assert(fs.existsSync(file),`Missing illustration: ${name}`);
 const buf=fs.readFileSync(file);
 assert(buf.length>1000&&buf.toString('ascii',0,4)==='RIFF'&&buf.toString('ascii',8,12)==='WEBP',`Invalid WebP: ${name}`);
 assets.push(name);
}
assert(assets.length===56,'Expected 56 illustration assets');
const precache=[...sw.matchAll(/'([^']+)'/g)].map(m=>m[1]);
for(const name of [...refs,...assets])assert(precache.includes(name.startsWith('./')?name:'./'+name),`Not in offline cache: ${name}`);
assert(stories.includes('Linda puts on her boots and coat.'),'Linda name missing');
assert(!stories.includes('Mia puts on her boots'),'Old Mia name remains');
assert(html.includes('connectionStatus'),'Offline indicator missing');
console.log(`PASS: ${lines.length} stories, ${total} sentences, ${assets.length} valid WebP assets, all cached, JS syntax and Linda name`);

assert(html.includes("backupExport")&&html.includes("backupImport"),"Backup controls missing");
assert(read("backup.js").includes("bemo-languages-v1"),"Backup storage key mismatch");

assert(html.includes('deviceCheck')&&html.includes('deviceResults'),'Device diagnostics missing');
assert(read('sw.js').includes('./device-check.js'),'Device diagnostics not cached');

const ipa=read("ipa-trainer.js"),phonics=read("phonics-trainer.js");
assert(ipa.includes("sayPair(q.a,q.b)"),"Sequential A/B audio missing");
assert(ipa.includes("Math.random()<.5"),"Randomized same/different missing");
assert((phonics.match(/word:/g)||[]).length>=24,"Expected 24 phonics words");
console.log("PASS: IPA randomized comparisons, sequential audio, 24 phonics words");

assert(phonics.includes("get('phonicsChoices').hidden=true"),"Phonics choices must start hidden");
assert(phonics.includes("get('phonicsReady').onclick"),"Phonics read-first control missing");
console.log("PASS: read-first phonics hides IPA quiz answers until learner confirms attempt");

assert(phonics.includes("distance:y.sounds.filter"),"Phonics similar-sound distractors missing");
console.log("PASS: similar-sound phonics distractors");

const workflow=fs.readFileSync(path.resolve(root,'../.github/workflows/android-debug-apk.yml'),'utf8');
assert(workflow.includes('assembleDebug')&&workflow.includes('upload-artifact@v4')&&workflow.includes('npm run verify'),'APK CI workflow incomplete');
console.log('PASS: Android CI debug APK workflow configured (not executed)');

assert(workflow.includes('apksigner')&&workflow.includes('aapt')&&workflow.includes('sha256sum'), 'APK artifact verification missing');
assert(workflow.includes("com.bemo.languages"),'APK package identity check missing');
console.log('PASS: Android CI includes APK package, signing and SHA-256 checks (not executed)');
