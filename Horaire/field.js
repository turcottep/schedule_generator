function TimeSlot(startTime, endTime) {
  this.startTime = startTime;
  this.endTime = endTime;
}

function Field(name, index, nbSlots) {
  this.name = name;
  this.index = index;
  this.nbSlots = nbSlots;
  this.timeslots = [];

  for (var i = 0; i < nbSlots; i++) {
    this.timeslots.push(null);
  }

}

function scheduleGames(games, pitchs) {
  let nbFieldsUsed = 0;

  for (let k = 0; k < pitchs[0].nbSlots; k++) {
    // for (let j = games.length - 1; j >= 0; j--) {
    for (let j =0; j<games.length; j++){
      const game = games[j];
      if (game.timeIndex === k && !game.isBye) {
        i = k;
        placed = false;
        while (!placed) {
          //for (let p = pitchs.length - 1; p >= 0; p--) {
          for (let p =0; p<pitchs.length; p++){
            const pitch = pitchs[p];
            if (!pitch.timeslots[i]) {
              pitch.timeslots[i] = game;
              game.field = p;
              nbFieldsUsed = max(nbFieldsUsed, p+1);
              placed = true;
              break
            }
          }
          i++;
          break;
        }

      }

    }

  }

  return nbFieldsUsed;

}