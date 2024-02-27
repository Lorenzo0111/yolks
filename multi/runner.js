const fs = require("fs");
const child_process = require("child_process");
const { promisify } = require("util");

const config = JSON.parse(
	fs.readFileSync("/home/container/config.json", "utf-8")
);

const processes = [];

async function main() {
	console.log("Starting all the bots...");
	for (const runner of config.bots) {
		console.log("Loading bot " + runner.name);
		if (runner.install) {
			console.log("Installing dependencies for " + runner.name);
			const split = runner.install.split(" ");
			const install = child_process.spawn(split[0], split.slice(1), {
				cwd: runner.dir,
				stdio: "inherit",
			});

			await promisify(install.on).bind(install)("exit");
			console.log("Installed dependencies for " + runner.name);
		}

		console.log("Starting " + runner.name);
		const ps = child_process.spawn(runner.cmd, [runner.file], {
			cwd: runner.dir,
			stdio: "inherit",
		});
		processes.push(ps);
	}
}

process.on("SIGINT", () => {
	for (const ps of processes) {
		ps.kill();
	}
	process.exit(0);
});

main().catch(console.error);
