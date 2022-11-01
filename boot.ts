
function masterEntry() {
  //   console.log("this run on master process");
}

function workerEntry() {
  //   console.log("this run on worker process");
}

module.exports = {
  masterEntry,
  workerEntry,
};
