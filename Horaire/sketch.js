function setup() {
  console.log("Schedule Generator")
  example1();
}

function example1() {
  poolPhase = new Phase();
  poolPhase.type = PhaseType.poolPlay;
  poolPhase.groupSize = 4;
  poolPhase.teams = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  bracketPhase = new Phase();
  bracketPhase.type = PhaseType.bracket;
  bracketPhase.groupSize = 8
  bracketPhase.teams = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  input = new Input();
  input.phases = [poolPhase, bracketPhase];
  input.startTime = new Date(0);
  input.startTime.setHours(9);
  input.endTime = new Date(0);
  input.endTime.setHours(16);
  input.numberOfTeams = 16;
  input.gameLength = 2700; // Time in seconds
  input.pauseBetweenGames = 300; //Time in seconds
  input.numberOfFields = 12; //Number of available fields

  output = generateSchedule(input);
  console.log(input);
  console.log(output);
}

function example2() {
  input = new Input();
  
  let poolPhase = new Phase();
  poolPhase.type = PhaseType.poolPlay;
  poolPhase.groupSize = 4;
  poolPhase.teams = [0, 7, 8, 15];
  input.phases.push(poolPhase);

  poolPhase = new Phase();
  poolPhase.type = PhaseType.poolPlay;
  poolPhase.groupSize = 4;
  poolPhase.teams = [1, 6, 9, 14];
  input.phases.push(poolPhase);

  poolPhase = new Phase();
  poolPhase.type = PhaseType.poolPlay;
  poolPhase.groupSize = 4;
  poolPhase.teams = [2, 5, 10, 13];
  input.phases.push(poolPhase);

  poolPhase = new Phase();
  poolPhase.type = PhaseType.poolPlay;
  poolPhase.groupSize = 4;
  poolPhase.teams = [3, 4, 11, 12];
  input.phases.push(poolPhase);

  let bracketPhase = new Phase();
  bracketPhase.type = PhaseType.bracket;
  bracketPhase.groupSize = 8;
  bracketPhase.teams = [0, 1, 2, 3, 4, 5, 6, 7];
  input.phases.push(bracketPhase);

  bracketPhase = new Phase();
  bracketPhase.type = PhaseType.bracket;
  bracketPhase.groupSize = 16;
  bracketPhase.teams = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  input.phases.push(bracketPhase);

  
  input.startTime = new Date(0);
  input.startTime.setHours(9);
  input.endTime = new Date(0);
  input.endTime.setHours(16);
  input.numberOfTeams = 16;
  input.gameLength = 2700; // Time in seconds
  input.pauseBetweenGames = 300; //Time in seconds
  input.numberOfFields = 12; //Number of available fields

  output = generateSchedule(input);
  console.log(input);
  console.log(output);
}