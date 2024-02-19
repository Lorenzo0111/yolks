const config = require("./config.json");
const child_process = require("child_process");

const processes = [];

for (const runner of config.bots) {
	const ps = child_process.spawn(runner.cmd, [runner.file], {
		cwd: runner.dir,
		stdio: "inherit",
	});
	processes.push(ps);
}

process.on("SIGINT", () => {
	for (const ps of processes) {
		ps.kill();
	}
	process.exit(0);
});
