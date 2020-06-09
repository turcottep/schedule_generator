function Game(timeIndex, pos1, pos2) {
  this.timeIndex = timeIndex;
  this.teams = [pos1, pos2];
  this.phaseIndex = null;
  this.time_slot = null;
  this.field = null;
  this.isBye = pos1 == -1 || pos2 == -1;
}

function generateGames(group, phaseType, initialTimeIndex) {
  switch (phaseType) {
    case PhaseType.poolPlay:
      return generateRoundRobin(group, initialTimeIndex);


    case PhaseType.bracket:
      return generateBracket([group], initialTimeIndex);


    default:
      break;
  }
}

function generateRoundRobin(pool, initialTimeIndex) {
  let nbRounds = (2 * Math.ceil(pool.teams.length / 2)) - 1;
  let games = [];
  let arr1 = [];
  let arr2 = [];

  for (let i = 0; i < pool.teams.length; i += 2) {
    arr1.push(pool.teams[i]);
    arr2.push(pool.teams[i + 1]);
  }

  // console.log("arr1", arr1);
  // console.log("arr2", arr2);
  for (let k = 0; k < nbRounds; k++) {
    if (k > 0) {
      // console.log("arr2", arr2);
      arr2.splice(0, 0, arr1.splice(1)[0])
      // console.log("arr2", arr2);
      arr1.push(arr2.pop())
    }


    for (let i = 0; i < arr1.length; i++) {
      let timeIndex = nbRounds - k - 1;
      games.push(new Game(initialTimeIndex + timeIndex, arr1[i].currentPosition, arr2[i].currentPosition))

    }
  }
  // console.log(games) 
  return [nbRounds, games];
}

function generateBracket(pool_bracket, initialTimeIndex) {
  let games_bracket = [];
  const nbTeams = pool_bracket[0].teams.length;
  let nbRounds = Math.floor(Math.log2(nbTeams));
  let index = Math.floor(nbTeams / 2);

  for (let i = 0; i < nbRounds; i++) {

    const pool_bracket_new = []
    for (const pool of pool_bracket) {

      const teams_bracket = pool.teams;
      for (let j = 0; j < Math.floor(teams_bracket.length / 2); j++) {
        team1 = teams_bracket[j]
        i2 = teams_bracket.length - j - 1
        team2 = teams_bracket[i2]
        games_bracket.push(new Game(initialTimeIndex + i, team1.currentPosition, team2.currentPosition))
        // console.log("i=", i, "j=", j, "index", index)
      }
      const pool1 = new Pool("1");
      pool1.teams = teams_bracket.slice(0, index);
      const pool2 = new Pool("2");
      pool2.teams = teams_bracket.slice(index, teams_bracket.length);

      pool_bracket_new.push(pool1);
      pool_bracket_new.push(pool2);
      // console.log("pool", pool_bracket_new);
    }

    index = Math.floor(index / 2);
    pool_bracket = pool_bracket_new;
  }

  return [nbRounds, games_bracket];
}