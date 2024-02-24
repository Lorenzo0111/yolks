const fs = require("fs");
const child_process = require("child_process");

const config = JSON.parse(
	fs.readFileSync("/home/container/config.json", "utf-8")
);

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
