"use strict";var ssoaUnprotector={};ssoaUnprotector["transData"]=function(tag,buffer){var s=tag.split("^");var kar=(function(){if(window["Kar"]){return new window["Kar"](new FileInfo("."+s[0],buffer));}})();if(kar){var files=kar.getEntries();for(var i=0;i<files.length;i++){kar.checkBuffer(i);if(files[i]["buffer"].byteLength){return files[i]["buffer"];}}}};TransList["ssoa^mysoa"]={"transData":ssoaUnprotector["transData"]};UpdateTransList();UpdatePluginList("ssoaUnprotector");