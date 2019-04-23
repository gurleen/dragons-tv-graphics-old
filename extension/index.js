'use strict';

var fs = require('fs')

module.exports = function (nodecg) {
	let rawData = fs.readFileSync('./team-info/drexel/softball.json');
	let homeTeam = JSON.parse(rawData);
	const homeTeamRep = nodecg.Replicant('homeTeamRep');
	homeTeamRep.value = homeTeam;
	nodecg.log.info('Home team set to' + homeTeam.teamInfo.schoolName);
};
