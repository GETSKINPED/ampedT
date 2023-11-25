"use strict";
window.resourceAnalyzer_scFunction = function(fileInfo) {
	this.empty = {
		"path": "",
		"buffer": new ArrayBuffer(),
		"time": 0
	};
	if (fileInfo && fileInfo.buffer && fileInfo.buffer.byteLength) {
		this.from(fileInfo);
	}
	else {
		this.new(fileInfo);
	}
};
resourceAnalyzer_scFunction.prototype.indexOf = function(path) {
	for (var i = 0; i < this.entries.length; i++) {
		if (this.entries[i]["path"] == path) {
			return i;
		}
	}
	return -1;
};
resourceAnalyzer_scFunction.prototype.getFolders = function(path) {
	var r = [];
	var s = 0;
	while (true) {
		var l = path.indexOf("/", s);
		if (l > 0) {
			r.push((r.length ? r[r.length - 1] : "") + path.slice(s, l + 1));
			s = l;
		}
		s += 1;
		if (l == -1) {
			break;
		}
	}
	return r;
};
resourceAnalyzer_scFunction.prototype.addFiles = function(files) {
	for (var i = 0; i < files.length; i++) {
		if (files[i]["path"]) {
			while (files[i]["path"][0] == "/") {
				files[i]["path"] = files[i]["path"].slice(1);
			}
		}
		var n = -1;
		var l = this.indexOf(files[i]["path"]);
		if (l != -1) {
			n = l;
			this.entries[n]["path"] = (files[i]["path"] ? files[i]["path"] : this.entries[n]["path"]);
			this.entries[n]["folders"] = this.getFolders(this.entries[n]["path"]);
			this.entries[n]["buffer"] = (files[i]["buffer"] ? files[i]["buffer"] : this.entries[n]["buffer"] || this.empty["buffer"]);
			this.entries[n]["time"] = (files[i]["time"] ? files[i]["time"] : this.entries[n]["time"]);
		}
		else {
			n = this.entries.length;
			this.entries[n] = {
				"index": n,
				"path": files[i]["path"],
				"folders": this.getFolders(files[i]["path"]),
				"buffer": files[i]["buffer"] || this.empty["buffer"],
				"time": files[i]["time"] || this.empty["time"]
			};
		}
		var f = [];
		for (var j = 0; j < this.entries[n]["folders"].length; j++) {
			var l = this.indexOf(this.entries[n]["folders"][j]);
			if (l == -1) {
				f.push({
					"index": this.entries.length,
					"path": this.entries[n]["folders"][j],
					"folders": this.getFolders(this.entries[n]["folders"][j]),
					"buffer": this.empty["buffer"],
					"time": this.empty["time"]
				});
			}
		}
		if (f.length) {
			this.entries.inserts(f, n);
		}
	}
	this.entries = this.entries.sort(SortPath);
	for (var i = 0; i < this.entries.length; i++) {
		this.entries[i]["index"] = i;
	}
	return this;
};
resourceAnalyzer_scFunction.prototype.addFile = function(file) {
	this.addFiles([file]);
	return this;
};
resourceAnalyzer_scFunction.prototype.checkBuffer = function(index) {
	if (!this.entries[index]["buffer"].byteLength) {
		if (this.buffer) {
			this.entries[index]["buffer"] = (this.entries[index]["buffer"].byteLength ? this.entries[index]["buffer"] : this.buffer.getBuffer(this.entries[index]["offset"], this.entries[index]["size"]));
		}
	}
	return this.entries[index]["buffer"];
};
resourceAnalyzer_scFunction.prototype.new = function(fileInfo) {
	if (fileInfo && fileInfo.buffer && fileInfo.buffer.byteLength) {
		this.buffer = fileInfo.buffer;
	}
	this.entries = [];
	return this;
};
resourceAnalyzer_scFunction.prototype.from = function(fileInfo) {
	this.new(fileInfo);
	this.kar = this.kar || (function() {
		if (window["Kar"]) {
			return new window["Kar"](new FileInfo(fileInfo.name + "." + fileInfo.ext, fileInfo.buffer));
		}
	})();
	if (this.kar) {
		var unComment = function(t) {
			var s = -1;
			var e = -1;
			while (true) {
				s = t.indexOf("/*", e + 1);
				if (s != -1) {
					e = t.indexOf("*/", s + 2);
					if (e != -1) {
						t = t.slice(0, s) + t.slice(e + 2);
						e = s;
					}
					else {
						e = s;
					}
				}
				else {
					break;
				}
			}
			var a = t.split("\n");
			for (var i = 0; i < a.length; i++) {
				var l = a[i].indexOf("//");
				if (l != -1) {
					a[i] = a[i].slice(0, l);
				}
			}
			return a.join("\n");
		};
		var getFunctionList = function(t) {
			t = t.replace(/\r/g, "\n").replace(/\n\n/g, "\n");
			var sc = (unComment(t) + "{").replace(/{/g, "{;").replace(/}/g, "");
			var v = [];
			var s = -1;
			var e = -1;
			while (true) {
				s = sc.indexOf(";", e + 1);
				if (s != -1) {
					e = sc.indexOf("(", s + 1);
					if (e != -1) {
						while (true) {
							var s2 = sc.indexOf(";", s + 1);
							if ((s2 != -1) && (s2 < e)) {
								s = s2;
							}
							else {
								break;
							}
						}
						var lr = sc.indexOf(")", e + 1);
						var lc = sc.indexOf(";", e + 1);
						var ll = sc.indexOf("{", e + 1);
						if ((lc > lr) && (lc < ll)) {
							var fc = sc.slice(s + 1, e).split("\n");
							fc = fc[fc.length - 1].replace(/\t/g, "").trim();
							if ((fc.indexOf("=") == -1) && (fc.indexOf("★") == -1)) {
								if ((fc != "if") && (fc != "else") && !fc.startsWith("else ")) {
									v.push(fc);
								}
							}
						}
					}
					else {
						break;
					}
				}
				else {
					break;
				}
			}
			return v;
		};
		var set = function(o, l) {
			if (o && o["source"]) {
				scsCount += 1;
				var f = getFunctionList(o["source"]);
				for (var i = 0; i < f.length; i++) {
					var n = f[i];
					table[n] = table[n] || [];
					if (!limitTable || (table[n].length < pathLimit)) {
						table[n].push(list.slice(0, l).join("//"));
					}
					totalCount += 1;
				}
			}
			else if (o && o["resources"]) {
				var resources = Util.getHashtableCore(o["resources"]);
				resCount += 1;
				var scripts = Util.getHashtableCore(o["scripts"]);
				for (var n in scripts) {
					list[l] = n;
					set(scripts[n], l + 1);
				}
				for (var n in resources) {
					if ((n.indexOf(".") != -1) && resources[n]) {
						list[l] = n;
						set(resources[n], l + 1);
					}
				}
			}
		};
		var files = [];
		var pathLimit = 100;
		var limitTable = true;
		var table = [];
		var list = [];
		var version = "";
		var fileCount = 0;
		var scCount = 0;
		var oaCount = 0;
		var aoaCount = 0;
		var ioaCount = 0;
		var poaCount = 0;
		var scsCount = 0;
		var resCount = 0;
		var totalCount = 0;
		var calCount = function(path) {
			if (!path.endsWith("/")) {
				fileCount += 1;
			}
			if (path.endsWith(".sc")) {
				scCount += 1;
			}
			if (path.endsWith(".oa")) {
				oaCount += 1;
			}
			if (path.endsWith(".aoa")) {
				aoaCount += 1;
			}
			if (path.endsWith(".ioa")) {
				ioaCount += 1;
			}
			if (path.endsWith(".poa")) {
				poaCount += 1;
			}
		};
		var date = new Date();
		for (var i = 0; i < this.kar.entries.length; i++) {
			calCount(this.kar.entries[i]["path"]);
			if (this.kar.entries[i]["path"] == "META-INF/ARCHIVE_VERSIONS.MF") {
				this.kar.checkBuffer(i);
				version = this.kar.entries[i]["buffer"].getText().extract("Version=", "\r\n");
				this.kar.entries[i]["buffer"] = new ArrayBuffer();
			}
			else if (this.kar.entries[i]["path"].endsWith(".sc") || this.kar.entries[i]["path"].endsWith(".oa") || this.kar.entries[i]["path"].endsWith(".aoa") || this.kar.entries[i]["path"].endsWith(".ioa") || this.kar.entries[i]["path"].endsWith(".poa")) {
				this.kar.checkBuffer(i);
				list[0] = this.kar.entries[i]["path"];
				set(new BufferReader(this.kar.entries[i]["buffer"]).readSerializableJava(), 1);
				this.kar.entries[i]["buffer"] = new ArrayBuffer();
			}
		}
		var keys = Object.keys(table).sort(function(a, b) {
			return a.localeCompare(b);
		});
		var info = [
			"//" + keys.length + " final result" + (keys.length > 1 ? "s" : "") + ", " + totalCount + " total result" + (totalCount > 1 ? "s" : "") + ";",
			"//analyze from " + scsCount + " script" + (scsCount > 1 ? "s" : "") + " include " + scCount + " sc file" + (scCount > 1 ? "s" : "") + " and " + (scsCount - scCount) + " other script" + (scsCount - scCount > 1 ? "s" : "") + " that from " + resCount + " resource" + (resCount > 1 ? "s" : "") + " include " + oaCount + " oa file" + (oaCount > 1 ? "s" : "") + ", " + aoaCount + " aoa file" + (aoaCount > 1 ? "s" : "") + ", " + ioaCount + " ioa file" + (ioaCount > 1 ? "s" : "") + ", " + poaCount + " poa file" + (poaCount > 1 ? "s" : "") + " and " + (resCount - oaCount - aoaCount - ioaCount - poaCount) + " other resource" + (resCount - oaCount - aoaCount - ioaCount - poaCount > 1 ? "s" : "") + " contain the above;",
			"//in " + fileInfo.path + (version ? " version " + version : "") + " within " + fileCount + " file" + (fileCount > 1 ? "s" : "") + ", " + this.kar.entries.length + " entrie" + (this.kar.entries.length > 1 ? "s" : "") + ";",
			"//cost " + ((new Date() - date) / 1000) + " seconds. "
		].join("\r\n");
		var analysisTime = new Date() - date;
		var list = (function() {
			date = new Date();
			var v = keys.slice(0);
			v.unshift(info);
			return v;
		})();
		var listTime = new Date() - date;
		var listPath = (function() {
			date = new Date();
			var v = keys.map(function(a) {
				table[a] = table[a].sort(function(a, b) {
					return a.localeCompare(b);
				});
				return a + "\t" + table[a].slice(0, pathLimit).join(",");
			});
			v.unshift("function\tpathList");
			v.unshift(info + "\r\n//path limit: " + pathLimit);
			return v;
		})();
		var listPathTime = new Date() - date;
		files.push({
			"index": 0,
			"path": "scFunctionList.txt",
			"buffer": new ArrayBuffer().fromText(list.join("\r\n"), "UTF-16", false),
			"time": listTime + analysisTime
		});
		files.push({
			"index": 1,
			"path": "scFunctionListPath.txt",
			"buffer": new ArrayBuffer().fromText(listPath.join("\r\n"), "UTF-16", false),
			"time": listPathTime + analysisTime
		});
		this.addFiles(files);
	}
	return this;
};
EtcMatch = Object.assign({"resourceAnalyzer_scFunction": function(fileInfo) {
	return (fileInfo.nameCore.indexOf("resource") != -1) && (fileInfo.ext == "kar");
}}, EtcMatch);
UpdatePluginList("resourceAnalyzer_scFunction");