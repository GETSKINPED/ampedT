"use strict";var skinRedrawer={};skinRedrawer["getMyskin"]=function(buffer){if(buffer&&buffer.byteLength){if(window["Kar"]){var kar=new window["Kar"](new FileInfo(".skin",buffer));var files=kar.getEntries();for(var i=0;i<files.length;i++){kar.checkBuffer(i);if(files[i]["buffer"].byteLength){return files[i]["buffer"];}}}}};skinRedrawer["getHead"]=function(list){if(ModList["myskin>myskin"]&&ModList["myskin>myskin"]["getOption"]&&ModList["myskin>myskin"]["getOption"]["head"]){var myskinList=[];for(var i=0;i<list.length;i++){myskinList.push({"buffer":skinRedrawer["getMyskin"](list[i]["buffer"])});}
return ModList["myskin>myskin"]["getOption"]["head"](myskinList);}
return"";};skinRedrawer["getFace"]=function(list,index){if(ModList["myskin>myskin"]&&ModList["myskin>myskin"]["getOption"]&&ModList["myskin>myskin"]["getOption"]["face"+(index+1)]){var myskinList=[];for(var i=0;i<list.length;i++){myskinList.push({"buffer":skinRedrawer["getMyskin"](list[i]["buffer"])});}
return ModList["myskin>myskin"]["getOption"]["face"+(index+1)](myskinList);}
return"";};skinRedrawer["getFace1"]=function(list){return skinRedrawer["getFace"](list,0);};skinRedrawer["getFace2"]=function(list){return skinRedrawer["getFace"](list,1);};skinRedrawer["getFace3"]=function(list){return skinRedrawer["getFace"](list,2);};skinRedrawer["getFace4"]=function(list){return skinRedrawer["getFace"](list,3);};skinRedrawer["getFace5"]=function(list){return skinRedrawer["getFace"](list,4);};skinRedrawer["getFace6"]=function(list){return skinRedrawer["getFace"](list,5);};skinRedrawer["getFace7"]=function(list){return skinRedrawer["getFace"](list,6);};skinRedrawer["getBody"]=function(list){if(ModList["myskin>myskin"]&&ModList["myskin>myskin"]["getOption"]&&ModList["myskin>myskin"]["getOption"]["body"]){var myskinList=[];for(var i=0;i<list.length;i++){myskinList.push({"buffer":skinRedrawer["getMyskin"](list[i]["buffer"])});}
return ModList["myskin>myskin"]["getOption"]["body"](myskinList);}
return"";};skinRedrawer["setHead"]=function(buffer,head){if(window["Kar"]){var myskin;var kar=new window["Kar"](new FileInfo(".skin",buffer));var files=kar.getEntries();for(var i=0;i<files.length;i++){kar.checkBuffer(i);if(files[i]["buffer"].byteLength){myskin=files[i]["buffer"];break;}}
if(myskin){myskin=myskin.modData("myskin>myskin",{"head":head});for(var i=0;i<files.length;i++){if(files[i]["buffer"].byteLength){kar.addFile({"path":files[i]["path"],"buffer":myskin});}}
return kar.to();}}
return buffer.getBuffer();};skinRedrawer["setFace"]=function(buffer,face,index){if(window["Kar"]){var myskin;var kar=new window["Kar"](new FileInfo(".skin",buffer));var files=kar.getEntries();for(var i=0;i<files.length;i++){kar.checkBuffer(i);if(files[i]["buffer"].byteLength){myskin=files[i]["buffer"];break;}}
if(myskin){var option={};option["face"+(index+1)]=face;myskin=myskin.modData("myskin>myskin",option);for(var i=0;i<files.length;i++){if(files[i]["buffer"].byteLength){kar.addFile({"path":files[i]["path"],"buffer":myskin});}}
return kar.to();}}
return buffer.getBuffer();};skinRedrawer["setFace1"]=function(buffer,face){return skinRedrawer["setFace"](buffer,face,0);};skinRedrawer["setFace2"]=function(buffer,face){return skinRedrawer["setFace"](buffer,face,1);};skinRedrawer["setFace3"]=function(buffer,face){return skinRedrawer["setFace"](buffer,face,2);};skinRedrawer["setFace4"]=function(buffer,face){return skinRedrawer["setFace"](buffer,face,3);};skinRedrawer["setFace5"]=function(buffer,face){return skinRedrawer["setFace"](buffer,face,4);};skinRedrawer["setFace6"]=function(buffer,face){return skinRedrawer["setFace"](buffer,face,0);};skinRedrawer["setFace7"]=function(buffer,face){return skinRedrawer["setFace"](buffer,face,0);};skinRedrawer["setBody"]=function(buffer,body){if(window["Kar"]){var myskin;var kar=new window["Kar"](new FileInfo(".skin",buffer));var files=kar.getEntries();for(var i=0;i<files.length;i++){kar.checkBuffer(i);if(files[i]["buffer"].byteLength){myskin=files[i]["buffer"];break;}}
if(myskin){myskin=myskin.modData("myskin>myskin",{"body":body});for(var i=0;i<files.length;i++){if(files[i]["buffer"].byteLength){kar.addFile({"path":files[i]["path"],"buffer":myskin});}}
return kar.to();}}
return buffer.getBuffer();};ModList["skin>skin"]=ModList["skin>skin"]||{};ModList["skin>skin"]["option"]=ModList["skin>skin"]["option"]||{};ModList["skin>skin"]["option"]["head"]="";ModList["skin>skin"]["option"]["face1"]="";ModList["skin>skin"]["option"]["face2"]="";ModList["skin>skin"]["option"]["face3"]="";ModList["skin>skin"]["option"]["face4"]="";ModList["skin>skin"]["option"]["face5"]="";ModList["skin>skin"]["option"]["face6"]="";ModList["skin>skin"]["option"]["face7"]="";ModList["skin>skin"]["option"]["body"]="";ModList["skin>skin"]["getOption"]=ModList["skin>skin"]["getOption"]||{};ModList["skin>skin"]["getOption"]["head"]=skinRedrawer["getHead"];ModList["skin>skin"]["getOption"]["face1"]=skinRedrawer["getFace1"];ModList["skin>skin"]["getOption"]["face2"]=skinRedrawer["getFace2"];ModList["skin>skin"]["getOption"]["face3"]=skinRedrawer["getFace3"];ModList["skin>skin"]["getOption"]["face4"]=skinRedrawer["getFace4"];ModList["skin>skin"]["getOption"]["face5"]=skinRedrawer["getFace5"];ModList["skin>skin"]["getOption"]["face6"]=skinRedrawer["getFace6"];ModList["skin>skin"]["getOption"]["face7"]=skinRedrawer["getFace7"];ModList["skin>skin"]["getOption"]["body"]=skinRedrawer["getBody"];ModList["skin>skin"]["modData"]=ModList["skin>skin"]["modData"]||{};ModList["skin>skin"]["modData"]["head"]=skinRedrawer["setHead"];ModList["skin>skin"]["modData"]["face1"]=skinRedrawer["setFace1"];ModList["skin>skin"]["modData"]["face2"]=skinRedrawer["setFace2"];ModList["skin>skin"]["modData"]["face3"]=skinRedrawer["setFace3"];ModList["skin>skin"]["modData"]["face4"]=skinRedrawer["setFace4"];ModList["skin>skin"]["modData"]["face5"]=skinRedrawer["setFace5"];ModList["skin>skin"]["modData"]["face6"]=skinRedrawer["setFace6"];ModList["skin>skin"]["modData"]["face7"]=skinRedrawer["setFace7"];ModList["skin>skin"]["modData"]["body"]=skinRedrawer["setBody"];ModList["hskin>hskin"]=ModList["hskin>hskin"]||{};ModList["hskin>hskin"]["option"]=ModList["hskin>hskin"]["option"]||{};ModList["hskin>hskin"]["option"]["head"]="";ModList["hskin>hskin"]["option"]["face1"]="";ModList["hskin>hskin"]["option"]["face2"]="";ModList["hskin>hskin"]["option"]["face3"]="";ModList["hskin>hskin"]["option"]["face4"]="";ModList["hskin>hskin"]["option"]["face5"]="";ModList["hskin>hskin"]["option"]["face6"]="";ModList["hskin>hskin"]["option"]["face7"]="";ModList["hskin>hskin"]["option"]["body"]="";ModList["hskin>hskin"]["getOption"]=ModList["hskin>hskin"]["getOption"]||{};ModList["hskin>hskin"]["getOption"]["head"]=skinRedrawer["getHead"];ModList["hskin>hskin"]["getOption"]["face1"]=skinRedrawer["getFace1"];ModList["hskin>hskin"]["getOption"]["face2"]=skinRedrawer["getFace2"];ModList["hskin>hskin"]["getOption"]["face3"]=skinRedrawer["getFace3"];ModList["hskin>hskin"]["getOption"]["face4"]=skinRedrawer["getFace4"];ModList["hskin>hskin"]["getOption"]["face5"]=skinRedrawer["getFace5"];ModList["hskin>hskin"]["getOption"]["face6"]=skinRedrawer["getFace6"];ModList["hskin>hskin"]["getOption"]["face7"]=skinRedrawer["getFace7"];ModList["hskin>hskin"]["getOption"]["body"]=skinRedrawer["getBody"];ModList["hskin>hskin"]["modData"]=ModList["hskin>hskin"]["modData"]||{};ModList["hskin>hskin"]["modData"]["head"]=skinRedrawer["setHead"];ModList["hskin>hskin"]["modData"]["face1"]=skinRedrawer["setFace1"];ModList["hskin>hskin"]["modData"]["face2"]=skinRedrawer["setFace2"];ModList["hskin>hskin"]["modData"]["face3"]=skinRedrawer["setFace3"];ModList["hskin>hskin"]["modData"]["face4"]=skinRedrawer["setFace4"];ModList["hskin>hskin"]["modData"]["face5"]=skinRedrawer["setFace5"];ModList["hskin>hskin"]["modData"]["face6"]=skinRedrawer["setFace6"];ModList["hskin>hskin"]["modData"]["face7"]=skinRedrawer["setFace7"];ModList["hskin>hskin"]["modData"]["body"]=skinRedrawer["setBody"];ModList["hhskin>hhskin"]=ModList["hhskin>hhskin"]||{};ModList["hhskin>hhskin"]["option"]=ModList["hhskin>hhskin"]["option"]||{};ModList["hhskin>hhskin"]["option"]["head"]="";ModList["hhskin>hhskin"]["option"]["face1"]="";ModList["hhskin>hhskin"]["option"]["face2"]="";ModList["hhskin>hhskin"]["option"]["face3"]="";ModList["hhskin>hhskin"]["option"]["face4"]="";ModList["hhskin>hhskin"]["option"]["face5"]="";ModList["hhskin>hhskin"]["option"]["face6"]="";ModList["hhskin>hhskin"]["option"]["face7"]="";ModList["hhskin>hhskin"]["option"]["body"]="";ModList["hhskin>hhskin"]["getOption"]=ModList["hhskin>hhskin"]["getOption"]||{};ModList["hhskin>hhskin"]["getOption"]["head"]=skinRedrawer["getHead"];ModList["hhskin>hhskin"]["getOption"]["face1"]=skinRedrawer["getFace1"];ModList["hhskin>hhskin"]["getOption"]["face2"]=skinRedrawer["getFace2"];ModList["hhskin>hhskin"]["getOption"]["face3"]=skinRedrawer["getFace3"];ModList["hhskin>hhskin"]["getOption"]["face4"]=skinRedrawer["getFace4"];ModList["hhskin>hhskin"]["getOption"]["face5"]=skinRedrawer["getFace5"];ModList["hhskin>hhskin"]["getOption"]["face6"]=skinRedrawer["getFace6"];ModList["hhskin>hhskin"]["getOption"]["face7"]=skinRedrawer["getFace7"];ModList["hhskin>hhskin"]["getOption"]["body"]=skinRedrawer["getBody"];ModList["hhskin>hhskin"]["modData"]=ModList["hhskin>hhskin"]["modData"]||{};ModList["hhskin>hhskin"]["modData"]["head"]=skinRedrawer["setHead"];ModList["hhskin>hhskin"]["modData"]["face1"]=skinRedrawer["setFace1"];ModList["hhskin>hhskin"]["modData"]["face2"]=skinRedrawer["setFace2"];ModList["hhskin>hhskin"]["modData"]["face3"]=skinRedrawer["setFace3"];ModList["hhskin>hhskin"]["modData"]["face4"]=skinRedrawer["setFace4"];ModList["hhskin>hhskin"]["modData"]["face5"]=skinRedrawer["setFace5"];ModList["hhskin>hhskin"]["modData"]["face6"]=skinRedrawer["setFace6"];ModList["hhskin>hhskin"]["modData"]["face7"]=skinRedrawer["setFace7"];ModList["hhskin>hhskin"]["modData"]["body"]=skinRedrawer["setBody"];UpdateModList();UpdatePluginList("skinRedrawer");