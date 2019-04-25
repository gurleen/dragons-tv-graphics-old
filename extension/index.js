'use strict';

var fs = require('fs')

module.exports = function (nodecg) {
	var currentPath = process.cwd();
	console.log(currentPath);
	let rawData = fs.readFileSync('bundles/dutv-graphics-package/extension/team-info/drexel/softball.json');
	let homeTeam = JSON.parse(rawData);
	const homeTeamRep = nodecg.Replicant('homeTeam');
	homeTeamRep.value = homeTeam;
	nodecg.log.info('Home team set to ' + homeTeam.teamInfo.schoolName + ' ' + homeTeam.teamInfo.teamName);
};
