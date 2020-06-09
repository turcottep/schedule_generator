const input = {
  numberOfTeams: 16,
  phases: [
    {
      type: "Pool Play",
      teams: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      poolSize: 4,
    },
    {
      type: "bracket",
      teams: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      bracketSize: 8,
    },
  ],
  startTime: "9:00", //Should be a timestamp
  endTime: "16:00", // Should be a timestamp
  gameLength: 2700, // Time in seconds
  pauseBetweenGames: 300, //Time in seconds
  numberOfFields: 12, //Number of available fields
};

const output = {
  phases: [
    {
      type: "Preranking",
      links: [
        [1, 0], // Le premier va à la première position du Pool A qui est à l'index 1
        [2, 0], // Le deuxieme va a la premiere position du Pool B qui est a l'index 1
        [3, 0],
        [4, 0],
        [4, 1],
        [3, 1],
        [2, 1],
        [1, 1],
        [1, 2],
        [2, 2],
        [3, 2],
        [4, 2],
        [4, 3],
        [3, 3],
        [2, 3],
        [1, 3],
      ],
    },
    {
      type: "Pool Play",
      links: [
        [5, 0], // Le premier va dans la phase 5 (Bracket 1-8) à la premiere position (index 0)
        [5, 7],
        [6, 0],
        [6, 7],
      ],
      games: [
        { teams: [0, 3], timeSlot: 0, field: 0 },
        { teams: [1, 2], timeSlot: 0, field: 1 },
        { teams: [0, 2], timeSlot: 1, field: 0 },
        { teams: [1, 3], timeSlot: 1, field: 1 },
        { teams: [0, 1], timeSlot: 2, field: 0 },
        { teams: [2, 3], timeSlot: 2, field: 1 },
      ],
    },
    {
      type: "Pool Play",
      links: [
        [5, 1],
        [5, 6],
        [6, 1],
        [6, 6],
      ],
      games: [
        { teams: [0, 3], timeSlot: 0, field: 2 },
        { teams: [1, 2], timeSlot: 0, field: 3 },
        { teams: [0, 2], timeSlot: 1, field: 2 },
        { teams: [1, 3], timeSlot: 1, field: 3 },
        { teams: [0, 1], timeSlot: 2, field: 2 },
        { teams: [2, 3], timeSlot: 2, field: 3 },
      ],
    },
    {
      type: "Pool Play",
      links: [
        [5, 2],
        [5, 5],
        [6, 2],
        [6, 5],
      ],
      games: [
        { teams: [0, 3], timeSlot: 0, field: 4 },
        { teams: [1, 2], timeSlot: 0, field: 5 },
        { teams: [0, 2], timeSlot: 1, field: 4 },
        { teams: [1, 3], timeSlot: 1, field: 5 },
        { teams: [0, 1], timeSlot: 2, field: 4 },
        { teams: [2, 3], timeSlot: 2, field: 5 },
      ],
    },
    {
      type: "Pool Play",
      links: [
        [5, 3],
        [5, 4],
        [6, 3],
        [6, 4],
      ],
      games: [
        { teams: [0, 3], timeSlot: 0, field: 6 },
        { teams: [1, 2], timeSlot: 0, field: 7 },
        { teams: [0, 2], timeSlot: 1, field: 6 },
        { teams: [1, 3], timeSlot: 1, field: 7 },
        { teams: [0, 1], timeSlot: 2, field: 6 },
        { teams: [2, 3], timeSlot: 2, field: 7 },
      ],
    },
    {
      type: "Bracket",
      links: [
        [null, 0], // Null = classement final
        [null, 1], // Null = classement final
        [null, 2],
        [null, 3],
        [null, 4],
        [null, 5],
        [null, 6],
        [null, 7],
      ],
      games: [
        { teams: [0, 7], timeSlot: 3, field: 0 },
        { teams: [1, 6], timeSlot: 3, field: 1 },
        { teams: [2, 5], timeSlot: 3, field: 2 },
        { teams: [3, 4], timeSlot: 3, field: 3 },
        { teams: [0, 3], timeSlot: 4, field: 0 },
        { teams: [1, 2], timeSlot: 4, field: 1 },
        { teams: [4, 7], timeSlot: 4, field: 2 },
        { teams: [5, 6], timeSlot: 4, field: 3 },
        { teams: [0, 1], timeSlot: 5, field: 0 },
        { teams: [2, 3], timeSlot: 5, field: 1 },
        { teams: [4, 5], timeSlot: 5, field: 2 },
        { teams: [6, 7], timeSlot: 5, field: 3 },
      ],
    },
    {
      type: "Bracket",
      links: [
        [null, 8],
        [null, 9],
        [null, 10],
        [null, 11],
        [null, 12],
        [null, 13],
        [null, 14],
        [null, 15],
      ],
      games: [
        { teams: [0, 7], timeSlot: 3, field: 4 },
        { teams: [1, 6], timeSlot: 3, field: 5 },
        { teams: [2, 5], timeSlot: 3, field: 6 },
        { teams: [3, 4], timeSlot: 3, field: 7 },
        { teams: [0, 3], timeSlot: 4, field: 4 },
        { teams: [1, 2], timeSlot: 4, field: 5 },
        { teams: [4, 7], timeSlot: 4, field: 6 },
        { teams: [5, 6], timeSlot: 4, field: 7 },
        { teams: [0, 1], timeSlot: 5, field: 4 },
        { teams: [2, 3], timeSlot: 5, field: 5 },
        { teams: [4, 5], timeSlot: 5, field: 6 },
        { teams: [6, 7], timeSlot: 5, field: 7 },
      ],
    },
  ],
  timeSlots: [
    {
      startTime: "9:00", // Dont use a string, use a timestamp
      endTime: "9:45", // Dont use a string, use a timestamp
    },
    {
      startTime: "9:50",
      endTime: "10:35",
    },
    {
      startTime: "10:40",
      endTime: "11:25",
    },
    {
      startTime: "11:30",
      endTime: "12:15",
    },
    {
      startTime: "12:20",
      endTime: "13:05",
    },
    {
      startTime: "13:10",
      endTime: "13:55",
    },
  ],
  numberOfFields: 8, // Number of used fields
};
