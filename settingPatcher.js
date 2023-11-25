"use strict";var settingPatcher={};settingPatcher["isShow"]=function(mode,list){var s=mode.split(">");for(var i=0;i<list.length;i++){if((list[i]["path"].indexOf(s[0])!=-1)&&(list[i]["ext"]=="kar")){return true;}}
return false;};settingPatcher["getFileList"]=function(mode,list){var v=[];var s=mode.split(">");for(var i=0;i<list.length;i++){var f=new FileInfo(list[i]["path"],list[i]["buffer"]);if((list[i]["path"].indexOf(s[0])!=-1)&&(list[i]["ext"]=="kar")){v.push({"path":list[i]["path"],"ext":list[i]["ext"],"type":list[i]["type"],"index":list[i]["index"]});}}
return v;};settingPatcher["getOption"]=function(list,option){if(window["Kar"]){var o={};var s={};var c=0;var k=Object.keys(option).length;var readOption=function(t){var files=kar.getEntries();var l=(function(){for(var i=0;i<files.length;i++){if(files[i]["path"].startsWith(t)){return i;}}
return-1;})();if(l!=-1){kar.checkBuffer(l);var bf=files[l]["buffer"];var br=new BufferReader(bf);for(var n in option){var key=new ArrayBuffer().fromText(n).toStringDataJava();var p=br.match(key);if(p<br.length){br.seek(p+key.byteLength,0);var code=br.readByteJava();switch(code){case 0x74:option[n]=br.readText(br.readUint(2,false));break;case 0x7C:option[n]=br.readText(br.readInt(8,false));break;}}}}};for(var i=0;i<list.length;i++){var kar=new window["Kar"](new FileInfo("setting.kar",list[i]["buffer"]));readOption("setting");readOption("dict");readOption("serverlist");for(var n in option){if(!s[n]){if(option[n]){if(!o[n]){o[n]=option[n];}
else if(o[n]!=option[n]){o[n]="";s[n]=true;c+=1;}}}}
if(c==k){break;}}}
return o;};settingPatcher["setOption"]=function(buffer,option){if(window["Kar"]){var writeOption=function(o,t){var files=kar.getEntries();var l=(function(){for(var i=0;i<files.length;i++){if(files[i]["path"].startsWith(t)){return i;}}
return-1;})();if(l!=-1){kar.checkBuffer(l);var bf=files[l]["buffer"];var br=new BufferReader(bf);for(var n in o){if(o[n]){var key=new ArrayBuffer().fromText(n).toStringDataJava();var s=0;var p=bf.match(key);if(p<br.length){p+=key.byteLength;br.seek(p,0);s=p;var code=br.readByteJava();switch(code){case 0x74:br.seek(br.readUint(2,false));break;case 0x7C:br.seek(br.readInt(8,false));break;}
bf=new ArrayBuffer().concat(bf.getBuffer(0,s),new ArrayBuffer().fromText(o[n]).toStringDataJava(),bf.getBuffer(br.tell()));}}}
for(var i=0;i<files.length;i++){if(files[i]["path"].startsWith(t)){kar.addFile({"path":files[i]["path"],"buffer":bf});}}}
return o;};var kar=new window["Kar"](new FileInfo("setting.kar",buffer));writeOption(option,"setting");writeOption(option,"dict");writeOption(option,"serverlist");return kar.to();}};ModList["setting>setting"]={"isShow":settingPatcher["isShow"],"getFileList":settingPatcher["getFileList"]};ModList["setting>setting"]["option"]={"abuse.check":"","fcm.enabled":"","gpk.enabled":"","gameguard.enabled":"","memoryeditcheck.disabled":"","replay.skin.disabled":"","gmoperations":"","font.gothic.win32":"","font.gothic.macosx":""};ModList["setting>setting"]["getOption"]=settingPatcher["getOption"];ModList["setting>setting"]["modData"]=settingPatcher["setOption"];UpdateModList();UpdatePluginList("settingPatcher");