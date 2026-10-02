import {readFile,writeFile,mkdir,cp} from 'node:fs/promises';
import {spawnSync} from 'node:child_process';
import {fileURLToPath} from 'node:url';
import path from 'node:path';
const project=path.dirname(fileURLToPath(import.meta.url)),output=path.resolve(project,'../../assets');
function run(cmd,args){const r=spawnSync(cmd,args,{cwd:project,stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)process.exit(r.status??1);}
const source=await readFile(path.join(project,'index.html'),'utf8');
const mobileStyle=`<style>
html,body{width:720px;height:1000px}.poster{padding:40px 40px 0}.masthead{font-size:16px}.edition{font-size:12px}.mark{width:32px;height:32px}.wordmark{gap:10px}
.stage{display:block;height:850px}.identity{margin-top:0;padding-top:45px}h1{font-size:100px;line-height:1.18}.role{font-size:23px;margin-top:20px}
.sculpture{width:637px;height:450px;right:0;top:365px}.world-inner{transform:scale(.74)}.footer{padding:0;height:70px}.footer a{font-size:23px;gap:10px}.footer img{width:23px;height:23px}
</style>`;
await mkdir(path.join(project,'mobile'),{recursive:true});
await cp(path.join(project,'assets'),path.join(project,'mobile/assets'),{recursive:true});
await cp(path.join(project,'hyperframes.json'),path.join(project,'mobile/hyperframes.json'));
await writeFile(path.join(project,'mobile/index.html'),source.replace('html,body{width:1200px;height:640px;', 'html,body{width:720px;height:1000px;').replace('content="width=1200, initial-scale=1"','content="width=720, initial-scale=1"').replace('data-width="1200" data-height="640"','data-width="720" data-height="1000"').replace('</head>',mobileStyle+'</head>'));
if(process.argv.includes('--prepare'))process.exit(0);
run('npx',['--yes','hyperframes@0.8.107','check']);run('npx',['--yes','hyperframes@0.8.107','check','mobile']);
if(process.argv.includes('--check'))process.exit(0);
await mkdir(output,{recursive:true});await mkdir(path.join(project,'renders'),{recursive:true});
for(const [dir,name,width,sourceWidth,sourceHeight] of [['.','signal',960,1200,640],['mobile','signal-mobile',540,720,1000]]){
 const raw=path.join(project,'renders',name+'.mp4');
 run('npx',['--yes','hyperframes@0.8.107','render',dir,'--format','mp4','--fps','15','--quality','delivery','--crf','0','--workers','2','--output',raw]);
 run('ffmpeg',['-v','error','-y','-i',raw,'-filter_complex',`crop=iw:ih-70:0:0,fps=12,scale=${width}:-1:flags=lanczos,split[a][b];[a]palettegen=max_colors=128:reserve_transparent=1[p];[b][p]paletteuse=dither=none:diff_mode=rectangle`,'-loop','0',path.join(output,name+'.gif')]);
 // The reduced-motion still shows the complete phrase during its reading pause.
 run('ffmpeg',['-v','error','-y','-ss','2','-i',path.join(output,name+'.gif'),'-frames:v','1',path.join(output,name+'.png')]);
 for(const [i,label] of ['work','design','linkedin','email'].entries())run('ffmpeg',['-v','error','-y','-i',raw,'-vf',`crop=${sourceWidth/4}:70:${i*sourceWidth/4}:${sourceHeight-70},scale=${width/4}:-1:flags=lanczos`,'-frames:v','1',path.join(output,`${name}-link-${label}.png`)]);
}
