var pool_names = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function Pool(name = "") {

    this.name = name;
    this.teams = [];

    this.add_team = function (team) {
        this.teams.push(team);
    }

    this.balance = function (phase_index) {
        for (let i = 0; i < this.teams.length; i++) {
            if (this.phase == PhaseType.pool_play) {

                if (this.teams[i].tag == "") {
                    this.teams[i].tag = this.name + str(i + 1);
                }
            } else if (this.phase == PhaseType.bracket) {
                if (this.teams[i].tag_bracket == "") {
                    this.teams[i].tag_bracket = this.name + str(i + 1);
                }
            }

            if ((this.teams.length) % 2 != 0) {
                dummy_team = Team(this.teams.length, "DummyTeam_", "Bye2", true);
                this.teams.push(dummy_team);
            }
            this.teams[i].phasePositions.push([phase_index, i]);
            this.teams[i].currentPosition = i;
        }
    }
}

function split_teams_to_pools(initialIndex, teams, nb_pools, pool_size, group_by_strength, pad_with_dummy_teams = false, phase = PhaseType.pool_play) {

    let pools = [];
    nb_teams = teams.length;
    for (let i = 0; i < nb_pools; i++) {
        pools.push(new Pool(pool_names[initialIndex + i]))
    }

    // adding dummy team to pools

    if (pad_with_dummy_teams) {
        let nb_dummy_teams = ceil(nb_teams / pool_size) * pool_size - nb_teams;
        let nb_dummy = 0;
        while (nb_dummy < nb_dummy_teams) {
            for (let i = pools.length - 1; i >= 0; i--) {
                pools[i].add_team(Team(nb_teams + i, "DummyTeam" + str(i), "Bye1", True))
                nb_dummy += 1
            }
            if (nb_dummy >= nb_dummy_teams) break;
        }
    }


    //Splitting teams into pools
    let j = 0;
    let i = 0;
    let direction = 1;
    let edge = false;
    if (group_by_strength) {
        //Pool A will be teams 1, 2, 3, 4...
        while (i < nb_pools) {
            pool = pools[i]
            if ((pool.teams.length) >= pool_size) {
                i += 1
            } else {
                pool.add_team(teams[j])
                j += 1
            }
        }
    } else {
        //Pool A will have team 1, Pool B team 2, Pool C team 3...
        while (j < teams.length) {
            if (i >= nb_pools - 1 && i <= 0) direction = 0;
            else if (i >= nb_pools - 1) direction = -1;
            else if (i <= 0) direction = 1;

            if (edge) teams_to_add = 2;
            else teams_to_add = 1;
            edge = false;

            for (let k = 0; k < teams_to_add; k++) {

                if (j >= teams.length) break
                // console.log("i = ", i, ", j =", j, ", direction =", direction, "edge = ", edge)

                pools[i].add_team(teams[j]);
                j += 1;
            }
            i += direction;

            if ((i <= 0 || i >= nb_pools - 1) && !edge) {
                edge = true;
            }


        }
    }

    // pool balance and tag generation
    for (let i = 0; i < pools.length; i++) {
        pools[i].balance(initialIndex + i);

    }
    return pools

}