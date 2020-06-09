function linkPhases(phases) {

    for (let i = 0; i < phases[0].teams.length; i++) {
        const team = phases[0].teams[i];
        for (let j = 0; j < team.phasePositions.length; j++) {
            const currentPhasePosition = team.phasePositions[j];
            const nextPhasePosition = team.phasePositions[j + 1];
            if(j < team.phasePositions.length - 1){
                phases[currentPhasePosition[0]].links[currentPhasePosition[1]] = nextPhasePosition;
            } else{
                phases[currentPhasePosition[0]].links[currentPhasePosition[1]] = [null, team.phasePositions[0][1]];
            }
        }
    }
}