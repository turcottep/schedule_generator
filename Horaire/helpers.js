function Input() {
    this.numberOfTeams = 0;
    this.phases = [];
    this.startTime = 0; //Should be a timestamp
    this.endTime = 0; // Should be a timestamp
    this.gameLength = 0; // Time in seconds
    this.pauseBetweenGames = 0; //Time in seconds
    this.numberOfFields = 0; //Number of available fields
}

function Output() {
    this.phases = [];
    this.timeSlots = []; //Should be a timestamp
    this.numberOfFields = 0; // Should be a timestamp
}

function Phase() {
    this.type = PhaseType.none;
    this.index = null;
    this.groupSize = null;
    this.teams = [];
    this.links = [];
    this.games = [];
}

var PhaseType = {
    none: 0,
    preRanking: 1,
    poolPlay: 2,
    crossOver: 3,
    bracket: 4
}

function Team(name = "noName", tag = "", dummy = false, tag_bracket = "") {
    this.name = name;
    this.phasePositions = [];
    this.currentPosition = null;
    this.tag = tag;
    this.tag_bracket = tag_bracket;
    this.is_dummy = dummy;
    this.nbPhases = 0;
}
