"use strict";window.Tab=function(fileInfo){var buffer=fileInfo.buffer;var entries=[];var empty={"path":"","offset":0,"size":0,"buffer":new ArrayBuffer()};var indexOf=function(path){for(var i=0;i<entries.length;i++){if(entries[i]["path"]==path){return i;}}
return-1;};var getFolders=function(path){var r=[];var s=0;while(true){var l=path.indexOf("/",s);if(l>0){r.push((r.length?r[r.length-1]:"")+path.slice(s,l+1));s=l;}
s+=1;if(l==-1){break;}}
return r;};var add=function(file){if(file["path"]){while(file["path"][0]=="/"){file["path"]=file["path"].slice(1);}
var n=-1;var l=indexOf(file["path"]);if(l!=-1){n=l;entries[n]["offset"]=file["offset"]||entries[n]["offset"]||empty["offset"];entries[n]["size"]=file["size"]||entries[n]["size"]||empty["size"];entries[n]["buffer"]=file["buffer"]||entries[n]["buffer"]||empty["buffer"];}
else{n=entries.length;entries[n]={"index":n,"path":file["path"],"folders":getFolders(file["path"]),"offset":file["offset"]||empty["offset"],"size":file["size"]||empty["size"],"buffer":file["buffer"]||empty["buffer"]};}
var f=[];for(var i=0;i<entries[n]["folders"].length;i++){var l=indexOf(entries[n]["folders"][i]);if(l==-1){f.push({"index":entries.length,"path":entries[n]["folders"][i],"folders":getFolders(entries[n]["folders"][i]),"offset":entries[n]["offset"],"size":0,"buffer":entries[n]["buffer"]});}}
if(f.length){entries.inserts(f,n);}}};var checkBuffer=function(index){entries[index]["buffer"]=(entries[index]["buffer"].byteLength?entries[index]["buffer"]:buffer.getBuffer(entries[index]["offset"],entries[index]["size"]));return entries[index]["buffer"];};var clearBuffer=function(){if(buffer.byteLength){for(var i=0;i<entries.length;i++){checkBuffer(i);}
buffer=new ArrayBuffer();}};var toBuffer=function(){var pl=[{"n":"path","l":1},{"n":"buffer","l":4}];var fl=(function(){var v=[];for(var i=0;i<entries.length;i++){checkBuffer(i);v.push({"path":new ArrayBuffer().fromText(entries[i]["path"]),"buffer":entries[i]["buffer"]});}
return v;})();var l=0;l+=1;for(var i=0;i<pl.length;i++){l+=1;l+=pl[i]["n"].length;l+=1;}
for(var i=0;i<fl.length;i++){for(var j=0;j<pl.length;j++){l+=pl[j]["l"];l+=fl[i][pl[j]["n"]].byteLength;}}
var br=new BufferWriter(l);br.writeUint(1,pl.length);for(var i=0;i<pl.length;i++){br.writeUint(1,pl[i]["n"].length);br.writeText(pl[i]["n"]);br.writeUint(1,pl[i]["l"]);}
for(var i=0;i<fl.length;i++){for(var j=0;j<pl.length;j++){br.writeUint(pl[j]["l"],fl[i][pl[j]["n"]].byteLength,true);br.writeBuffer(fl[i][pl[j]["n"]]);}}
return br.toBuffer();};var addFiles=function(files){for(var i=0;i<files.length;i++){add(files[i]);}
entries=entries.sort(SortPath);for(var i=0;i<entries.length;i++){entries[i]["index"]=i;}
return this;};this.addFiles=function(files){clearBuffer();addFiles(files);return this;};this.addFile=function(file){this.addFiles([file]);return this;};this.checkBuffer=checkBuffer;this.getEntries=function(){return entries;};this.from=function(buffer){var files=[];var br=new BufferReader(buffer);var pl=[];var lp=br.readUint(1);for(var i=0;i<lp;i++){pl.push({"n":br.readText(br.readUint(1)),"l":br.readUint(1)});}
while(!br.eof()){var v={};for(var i=0;i<pl.length;i++){var lv=br.readUint(pl[i]["l"],true);switch(pl[i]["n"]){case"path":v[pl[i]["n"]]=br.readText(lv);break;case"buffer":v["offset"]=br.tell();v["size"]=lv;br.seek(lv);break;}}
files.push(v);}
entries=[];addFiles(files);return this;};this.to=function(){buffer=(buffer.byteLength?buffer:toBuffer());return buffer;};if(buffer.byteLength){this.from(buffer);}};SupportPkg.add("tab");UpdateAccept();OutputPkg.add("tab");UpdateAllFile();UpdatePluginList("tab");