"use strict";var myskinUsurper={};myskinUsurper["getUserID"]=function(list){var userID="";for(var i=0;i<list.length;i++){if(list[i]["buffer"]&&list[i]["buffer"].byteLength&&list[i]["buffer"].startsWith(Header["NewSkinData"]["header"])){var ser=list[i]["buffer"].unserializeSer();if(!isUndefined(ser["userID"])){if(userID==""){userID=ser["userID"];}
else if(userID!=ser["userID"]){userID="";break;}}}}
return userID;};myskinUsurper["setUserID"]=function(buffer,userID){if(buffer.startsWith(Header["NewSkinData"]["header"])){var ser=buffer.unserializeSer();if(!isUndefined(ser["userID"])){var key=new ArrayBuffer().fromText(ser["userID"]).toStringDataJava();var p=buffer.lastMatch(key);if(p>-1){return new ArrayBuffer().concat(buffer.getBuffer(0,p-key.byteLength+1),new ArrayBuffer().fromText(userID).toStringDataJava(),buffer.getBuffer(p+1));}}}
return buffer.getBuffer();};ModList["myskin>myskin"]=ModList["myskin>myskin"]||{};ModList["myskin>myskin"]["option"]=ModList["myskin>myskin"]["option"]||{};ModList["myskin>myskin"]["option"]["userID"]="";ModList["myskin>myskin"]["getOption"]=ModList["myskin>myskin"]["getOption"]||{};ModList["myskin>myskin"]["getOption"]["userID"]=myskinUsurper["getUserID"];ModList["myskin>myskin"]["modData"]=ModList["myskin>myskin"]["modData"]||{};ModList["myskin>myskin"]["modData"]["userID"]=myskinUsurper["setUserID"];UpdateModList();UpdatePluginList("myskinUsurper");