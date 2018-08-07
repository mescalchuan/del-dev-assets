const readline = require("readline");
const fs = require("fs");
const os = require("os");
const path = require("path");

class DelDevAssets {
	constructor(options) {
		this.outputPath = options.outputPath;
		this.htmlName = options.htmlName;
		this.delNames = options.delNames;
	}
	apply(compiler) {
		compiler.plugin("done", stats => {
			const files = fs.readdirSync(this.outputPath);
			files.forEach(chunkName => {	
				const stats = fs.statSync(path.join(this.outputPath, chunkName));
				if(stats.isDirectory()) {
					const fileName = path.join(this.outputPath, chunkName, this.htmlName);
		 			const fRead = fs.createReadStream(fileName);
					const objReadline = readline.createInterface({
						input: fRead,
					})
					let str = "";
					objReadline.on("line", line => {
						let hasAssets = false;
						this.delNames.map(item => {
							if(!!(~line.indexOf(item))) {
								hasAssets = true;
							}
						})
						if(!hasAssets) {
							str += line + os.EOL;
						}
					});
				
					objReadline.on("close", () => {
						const fWrite = fs.createWriteStream(fileName);
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
