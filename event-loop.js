console.time("this is time");

const fs = require("fs");
const crypto = require("crypto");
const start = Date.now();
// process.env.UV_THREADPOOL_SIZE = 1;

setTimeout(() => console.log("Timer 1 finished\n---"), 0); //runs second because appears above setImmediate and outside of I/O
setImmediate(() => console.log("Immediate 1 finished\n---")); //runs third because appears below timeout and outside of I/O

fs.readFile("test-file.txt", () => {
	console.log("I/O finished"); // first to run wen callback is done
	console.log("------------");

	setTimeout(() => console.log("Timer 2 finished\n---"), 0); //fourth to run when callback is done
	setTimeout(() => {
		console.log("Timer 3 finished\n---");
		console.timeEnd("this is time");
	}, 3000); //fifth (last) to run when callback is done
	setImmediate(() => console.log("Immediate 2 finished\n---")); //third to run when callback is done because it runs once per tick

	process.nextTick(() => console.log("Process.nextTick\n---")); //second to run when callback is done because nextTick runs immediately

	crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
	console.log(Date.now() - start, "sync password encrypted");

	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
	crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () => {
		console.log(Date.now() - start, "password encrypted");
	});
});

console.log("Hello from the top level code\n---"); //runs first because top level code

