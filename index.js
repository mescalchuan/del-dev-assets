var readline = require("readline");
var fs = require("fs");
var os = require("os");
var path = require("path");

class DelDevAssets {
	constructor(options) {
		this.outputPath = options.outputPath;
		this.htmlName = options.htmlName;
		this.delNames = options.delNames;
	}
	apply(compiler) {
		compiler.plugin("done", stats => {
			var files = fs.readdirSync(this.outputPath);
			files.forEach(chunkName => {	
				var stats = fs.statSync(path.join(this.outputPath, chunkName));
				if(stats.isDirectory()) {
					var fileName = path.join(this.outputPath, chunkName, this.htmlName);
		 			var fRead = fs.createReadStream(fileName);
					var objReadline = readline.createInterface({
						input: fRead,
					})
					var str = "";
					objReadline.on('line', line => {
						var tmp = line;
						var hasAssets = false;
						this.delNames.map(item => {
							if(!!(~tmp.indexOf(item))) {
								hasAssets = true;
							}
						})
						if(!hasAssets) {
							//fWrite.write(tmp + os.EOL); // 下一行
							str += tmp + os.EOL;
						}
					});
				
					objReadline.on('close', ()=> {
						var fWrite = fs.createWriteStream(fileName);
						fWrite.write(str);			
					});
				}
			})
			
		});
		compiler.plugin("failed", error => {
			console.error("build error!");
			console.log(error);
			process.exit(0);
		})
	}
}

module.exports = DelDevAssets;
