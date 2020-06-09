function generateSchedule(input) {
    output = new Output();

    let teams = [];
    for (let i = 0; i < input.numberOfTeams; i++) {
        let team = new Team("team_" + String(i + 1), i);
        team.phasePositions.push([0, i]);
        teams.push(team);
    }

    preRankingPhase = new Phase();
    preRankingPhase.teams = teams;
    preRankingPhase.index = 0;
    output.phases.push(preRankingPhase);

    let phaseIndex = 1;
    let timeIndex = 0;
    for (const iphase of input.phases) {
        let phaseTeams = [];
        for (const teamIndex of iphase.teams) {
            phaseTeams.push(teams[teamIndex]);
        }
        if (iphase.groupSize > phaseTeams.length) throw ("desired group size bigger than actual group size");
        const [timeIndexNew, phases] = generatePhases(iphase.type, phaseTeams, iphase.groupSize, input.numberOfFields, 16, phaseIndex, timeIndex);
        for (const phase of phases) {
            output.phases.push(phase);
        }
        phaseIndex += phases.length;
        timeIndex += timeIndexNew;
    }

    linkPhases(output.phases);

    output.timeSlots = generateTimeSlots(input.startTime, input.endTime, timeIndex, input.gameLength, input.pauseBetweenGames);

    output.numberOfFields = generateFields(output.phases, input.numberOfFields, output.timeSlots.length);

    // for (const phase of output.phases) {
    //     console.log(phase.games);
    // }
    return output
}

function generateTimeSlots(startTime, maxEndTime, nbRounds, length, pause) {
    timeSlots = [];
    for (let i = 0; i < nbRounds; i++) {
        endTime = new Date(startTime.getTime());
        endTime.setSeconds(endTime.getSeconds() + length);

        timeSlots.push(new TimeSlot(new Date(startTime.getTime()), new Date(endTime.getTime())));
        startTime.setSeconds(endTime.getSeconds() + pause + length);

        if (endTime > maxEndTime) {
            throw("Game ends after max end time");
        }
    }
    return timeSlots
}

function generatePhases(phaseType, teams, groupSize, maxNbFields, maxNbSlots, initialIndex, initialTimeIndex) {
    phases = [];
    let nbTeams = teams.length;
    let groupByStrength = phaseType == PhaseType.bracket;
    let nbGroups = Math.trunc(nbTeams / groupSize);
    let gamesPerRound = Math.floor(groupSize / 2);
    let nbFields = min(gamesPerRound * nbGroups, maxNbFields);
    let nbRounds = 0;
    let optimalNbSlots = 0;
    if (phaseType === PhaseType.poolPlay) {
        nbRounds = 2 * Math.ceil(groupSize / 2) - 1;
        optimalNbSlots = Math.floor(gamesPerRound * nbGroups * nbRounds / nbFields);
        nbSlots = min(optimalNbSlots, maxNbSlots);
    } else if (phaseType == PhaseType.bracket) {
        nbRounds = Math.floor(Math.log2(groupSize));
        optimalNbSlots = Math.floor(gamesPerRound * nbGroups * nbRounds / nbFields);
        nbSlots = min(optimalNbSlots, maxNbSlots);
    }


    optimalNbTeams = Math.ceil(nbTeams / groupSize) * groupSize;
    nbDummyTeams = (optimalNbTeams - nbTeams);

    // console.log("group size", groupSize)
    // console.log("nb groups", nbGroups)
    // console.log("nb teams", nbTeams)
    // console.log("optimal nb teams", optimalNbTeams)
    // console.log("nb fields !WIP!", nbFields)
    // console.log("slots per field", nbSlots)
    // console.log("optimal nb slots !WIP!", optimalNbSlots)

    groups = split_teams_to_pools(initialIndex, teams, nbGroups, groupSize, groupByStrength, false, phaseType);
    // console.log(groups)

    let timeIndex = 0;

    for (let i = 0; i < groups.length; i++) {
        const group = groups[i];
        let phase = new Phase();
        phase.teams = group;
        phase.type = phaseType;
        phase.index = initialIndex + i;
        let timeIndexNew = 0;
        [timeIndexNew, phase.games] = generateGames(group, phaseType, initialTimeIndex);
        for (const game of phase.games) {
            game.phaseIndex = phase.index;
        }
        timeIndex = max(timeIndex, timeIndexNew);
        // console.log(phase);

        phases.push(phase);
    }

    return [nbRounds, phases];
}

function generateFields(phases, maxNbFields, maxNbSlots) {

    let nbFieldsUsed = 0;
    fields = []
    for (let i = 0; i < maxNbFields; i++) {
        fields.push(new Field("Terrain " + String(i + 1), i, maxNbSlots));
    }

    for (const phase of phases) {
        const nbFieldsNew = scheduleGames(phase.games, fields);
        nbFieldsUsed = max(nbFieldsUsed, nbFieldsNew);
    }
    console.log("fields =", fields);

    return nbFieldsUsed;
}