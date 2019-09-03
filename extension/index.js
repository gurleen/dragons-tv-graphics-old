'use strict';

var fs = require('fs')

module.exports = function (nodecg) {

	// HOME LTH DATA
	var currentPath = process.cwd();
	console.log(currentPath);
	let rawData = fs.readFileSync('bundles/dutv-graphics-package/extension/team-info/drexel/mens_lacrosse.json');
	let homeTeam = JSON.parse(rawData);
	const homeTeamRep = nodecg.Replicant('homeTeam');
	homeTeamRep.value = homeTeam;
	nodecg.log.info('Home team set to ' + homeTeam.teamInfo.schoolName + ' ' + homeTeam.teamInfo.teamName);


	// TIME/SCORE DATA
	const liveData = 'bundles/dutv-graphics-package/extension/livedata.json'
	const liveDataRep = nodecg.Replicant('liveData');
	nodecg.log.info(`Watching for file changes on ${liveData}`)
	fs.watch(liveData, (curr, prev) => {
		liveDataRep.value = JSON.parse(fs.readFileSync(liveData));
		// nodecg.log.info('New score data!');
		// nodecg.log.info(liveDataRep.value.clockStr);
	})
};
