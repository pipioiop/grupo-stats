//#region var/const declarations;
var lastNames = ["Um", "Dois", "Três", "Quatro", "Cinco", "Seis", "Sete", "Oito", "Nove", "Dez", "Onze", "Doze", "Treze", "Catorze", "Quinze", "Dezasseis"]
// Header
var btnLoadTeam = document.getElementById("head-team");
var btnLoadMatch = document.getElementById("head-match");
var btnSave = document.getElementById("head-save");
var btnExport = document.getElementById("head-export");
var lblLoadTeam = document.getElementById("lbl-head-team");
var lblLoadMatch = document.getElementById("lbl-head-match");
// Time
var clockMain = document.getElementById("clock-main");
var clockPlay = document.getElementById("clock-play");
var clockPer = document.getElementById("period");
var clockKickOff = document.getElementById("kick-off");
var clockBreak = document.getElementById("break");
var btnEndReg = document.getElementById("end-reg");
var clockPause = document.getElementById("pause");
var clockStop = document.getElementById("stoppage");
var btnLivres = document.getElementById("btn-livres");
var btnReplaceExpelled = document.getElementById("btn-replace-expelled");
var audioAlert = document.getElementById("audio-alert");
var secondsM = 0;
var minutesM = 0;
var secondsP = 0;
var minutesP = 0;
var IntervalM;
var IntervalP;
var livresColIdx = "F";
var livresHeaderRow = 13;
// Team
var txtHome = document.getElementById("home")
var txtAway = document.getElementById("away")

function clearStaminaAlerts() {
    for (var i = 1; i <= struct_general.nplay + struct_general.nsub; i++) {
        var el = document.getElementById("play" + i);
        if (el) el.classList.remove('warning-stamina');
    }
}
var txtHScore = document.getElementById("score-h")
var txtAScore = document.getElementById("score-a")
var btnP1 = document.getElementById("btn1");
var btnP2 = document.getElementById("btn2");
var btnP3 = document.getElementById("btn3");
var btnP4 = document.getElementById("btn4");
var btnP5 = document.getElementById("btn5");
var btnP6 = document.getElementById("btn6");
var btnP7 = document.getElementById("btn7");
var btnP8 = document.getElementById("btn8");
var btnP9 = document.getElementById("btn9");
var btnP10 = document.getElementById("btn10");
var btnP11 = document.getElementById("btn11");
var btnP12 = document.getElementById("btn12");
var btnP13 = document.getElementById("btn13");
var btnP14 = document.getElementById("btn14");
var btnP15 = document.getElementById("btn15");
var btnP16 = document.getElementById("btn16");
var btnGHPos = document.getElementById("goal-h-pos");
var btnGHNeg = document.getElementById("goal-h-neg");
var btnGAPos = document.getElementById("goal-a-pos");
var btnGANeg = document.getElementById("goal-a-neg");
//Metrics
var btnM1Lbl = document.getElementById("m1-lbl");
var btnM2Lbl = document.getElementById("m2-lbl");
var btnM3Lbl = document.getElementById("m3-lbl");
var btnM1H = document.getElementById("m1-h");
var btnM2H = document.getElementById("m2-h");
var btnM3H = document.getElementById("m3-h");
var btnM1A = document.getElementById("m1-a");
var btnM2A = document.getElementById("m2-a");
var btnM3A = document.getElementById("m3-a");
var btnM1ValH = document.getElementById("m1-val-h");
var btnM2ValH = document.getElementById("m2-val-h");
var btnM3ValH = document.getElementById("m3-val-h");
var btnM1ValA = document.getElementById("m1-val-a");
var btnM2ValA = document.getElementById("m2-val-a");
var btnM3ValA = document.getElementById("m3-val-a");
var btnM1PosH = document.getElementById("m1-pos-h");
var btnM2PosH = document.getElementById("m2-pos-h");
var btnM3PosH = document.getElementById("m3-pos-h");
var btnM1NegH = document.getElementById("m1-neg-h");
var btnM2NegH = document.getElementById("m2-neg-h");
var btnM3NegH = document.getElementById("m3-neg-h");
var btnM1PosA = document.getElementById("m1-pos-a");
var btnM2PosA = document.getElementById("m2-pos-a");
var btnM3PosA = document.getElementById("m3-pos-a");
var btnM1NegA = document.getElementById("m1-neg-a");
var btnM2NegA = document.getElementById("m2-neg-a");
var btnM3NegA = document.getElementById("m3-neg-a");

//Analysis
var tblAnl = document.getElementById("tbl-anl");

// Helper
const arrSum = arr => arr.reduce((a, b) => a + b, 0);
//#endregion

//#region  INITIALIZATION
//#region  Initialize Dictionaries
var struct_general = {  // Generic Container
    "nplay": 5,
    "nsub": 11,
    "per_lbl": ["1P", "2P", "AP1", "AP2"],
    "nper": 4,
    "per_time": [20, 20, 5, 5],
    "play_time": [0, 0, 0, 0],
    "metric_name": ["Remates", "Passes Incompletos", "Perdas de Bola"],
    "metric_val": [[0, 0], [0, 0], [0, 0]]
};
var struct_time = { // Time Container
    "period": clockPer.innerHTML,
    "clock_main": clockMain.innerHTML,
    "clock_play": clockMain.innerHTML,
    "kickofftgl": 0,
    "pausetgl": 0,
    "stoptgl": 0
}
var struct_match = { // Match Information Container
    "date": ['00', '00', '00'], // YYYY-MM-DD
    "location": "Estádio",
    "competition": "Competição",
    "stage": "Fase",
    "kickoff": ['00', '00'], // 00h:00
    "score": [0, 0], // Home, Away
    "teams": ["Equipa Casa", "Equipa Fora"],
    "initials": ["CASA", "FORA"]
}
var struct_team = { // Team Information Container
    "name": "Equipa",
    "tgl_home": 1,
    "players": []
}
for (var i = 0; i < (struct_general["nplay"] + struct_general["nsub"]); i++) {
    var pinfo = {
        "pid": i + 1,
        "nfirst": "Jogador",
        "nlast": lastNames[i],
        "pno": i + 1,
        "position": "",
        "selected": 0,
        "active": 0,
        "tplay": 0,
        "trest": 0,
        "totplay": 0,
        "totrest": 0,
        "cardState": 0, // 0: none, 1: yellow, 2: red/expelled
        "isLivre": false
    }
    if (i < struct_general["nplay"]) {
        pinfo.active = 1;
    }
    struct_team["players"].push(pinfo)
}
//#endregion
//#region Initialize Tables
var tbl_match = {
    "index": [1],
    "period": ["0"],
    "min_run": ["00"],
    "sec_run": ["00"],
    "min_eff": ["00"],
    "sec_eff": ["00"],
    "result": ["1-2-1"],
    "player_no1": [-1],
    "last_name1": [""],
    "player_no2": [-1],
    "last_name2": [""],
}
var tbl_metrics = {
    "index": [],
    "period": [],
    "min_run": [],
    "sec_run": [],
    "min_eff": [],
    "sec_eff": [],
    "team": [],
    "metric": [],
    "result": [],
    "total_home": [],
    "total_away": []
}
var tbl_period = {
    "Rotações": [],
    "Tempo de Jogo": [],
    "Tempo de Descanso": [],
    "Rácio J/D": [],
    "% Tempo Total": []
}
for (i = 0; i <= struct_general.nper; i++) {
    tbl_period["Rotações"].push([])
    tbl_period["Tempo de Jogo"].push([])
    tbl_period["Tempo de Descanso"].push([])
    tbl_period["Rácio J/D"].push([])
    tbl_period["% Tempo Total"].push([])
    for (p = 0; p < (struct_general.nplay + struct_general.nsub); p++) {
        tbl_period["Rotações"][i].push(0)
        tbl_period["Tempo de Jogo"][i].push(0)
        tbl_period["Tempo de Descanso"][i].push(0)
        tbl_period["Rácio J/D"][i].push(1.00)
        tbl_period["% Tempo Total"][i].push(0)
    }
}
//#endregion
//#endregion

//#region Clock Functions
btnEndReg.onclick = function () {
    if (!confirm("Tem a certeza que quer terminar o tempo regulamentar?")) return;
    clearInterval(IntervalM);
    clearInterval(IntervalP);
    clearStaminaAlerts();
    buttonEnable(clockKickOff, false);
    buttonEnable(clockBreak, false);
    buttonEnable(clockPause, false);
    buttonEnable(clockStop, false);
    buttonEnable(btnEndReg, false);

    // Permitir guardar e exportar após fim do tempo
    buttonEnable(btnSave, true);
    buttonEnable(btnExport, true);

    // Manter botões de métricas e golos ativos para ajustes finais
    toggleMatch(true);
    toggleMetrics(true);

    updateTime();
    var timeMain = parseClock(struct_time["clock_main"], 0);
    var timePlay = parseClock(struct_time["clock_play"], 0);
    tbl_match["index"].push(tbl_match["index"].length + 1)
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push("fim tempo regulamentar");
    tbl_match["player_no1"].push(-1);
    tbl_match["last_name1"].push("");
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");

    // Update analysis table
    updateAnlUITable();
}

clockKickOff.onclick = function () {
    if (struct_time.period < struct_general.nper) {
        struct_time["period"]++;
        clockPer.innerHTML = struct_time["period"];

        for (p = 0; p < struct_general.nplay + struct_general.nsub; p++) {
            if (struct_team.players[p].active == 1) {
                tbl_period["Rotações"][struct_time.period][p] = 1;
                tbl_period["Rotações"][0][p] += 1;
            } else {
                tbl_period["Rotações"][struct_time.period][p] = 0;
            }
            struct_team.players[p].tplay = 0;
            struct_team.players[p].trest = 0;
        }
        updateLiveVis();

        clearInterval(IntervalM);
        clearInterval(IntervalP);
        IntervalM = setInterval(startMain, 1000);
        IntervalP = setInterval(startPlay, 1000);

        // Update Line-Up
        for (var i = 0; i < struct_team.players.length; i++) {
            if (struct_team.players[i].active == 1) {
                var timeMain = parseClock(struct_time["clock_main"], 0);
                var timePlay = parseClock(struct_time["clock_play"], 0);
                tbl_match["index"].push(i + 2);
                tbl_match["period"].push(struct_time["period"]);
                tbl_match["min_run"].push(timeMain[0]);
                tbl_match["sec_run"].push(timeMain[1]);
                tbl_match["min_eff"].push(timePlay[0]);
                tbl_match["sec_eff"].push(timePlay[1]);
                tbl_match["result"].push("lineup");
                tbl_match["player_no1"].push(struct_team["players"][i]["pno"]);
                tbl_match["last_name1"].push(struct_team["players"][i]["nlast"]);
                tbl_match["player_no2"].push(-1);
                tbl_match["last_name2"].push("");
            }
        }
        // Update Match Table
        updateTime();
        var timeMain = parseClock(struct_time["clock_main"], 0);
        var timePlay = parseClock(struct_time["clock_play"], 0);
        tbl_match["index"].push(tbl_match["index"].length + 1)
        tbl_match["period"].push(struct_time["period"]);
        tbl_match["min_run"].push(timeMain[0]);
        tbl_match["sec_run"].push(timeMain[1]);
        tbl_match["min_eff"].push(timePlay[0]);
        tbl_match["sec_eff"].push(timePlay[1]);
        tbl_match["result"].push("kick off");
        tbl_match["player_no1"].push(-1);
        tbl_match["last_name1"].push("");
        tbl_match["player_no2"].push(-1);
        tbl_match["last_name2"].push("");

        // Update analysis table
        updateAnalysisTable();

        // Toggles
        struct_time.kickofftgl = 1;
        // Button Enables
        buttonEnable(clockKickOff, false)
        buttonEnable(clockBreak, true)
        buttonEnable(btnEndReg, true)
        buttonEnable(clockPause, true)
        buttonEnable(clockPause, true)
        buttonEnable(clockStop, true)
        buttonEnable(btnLoadTeam, false)
        buttonEnable(btnLoadMatch, false)
        buttonEnable(btnSave, false)
        buttonEnable(btnExport, false)
        toggleMatch(true)
        toggleMetrics(true)
        togglePlayers(true)
        // Button Aesthetics
        clockPer.classList.remove('break');
        clockMain.classList.remove('break');
        clockPlay.classList.remove('break');
        lblLoadTeam.classList.add('break');
        lblLoadMatch.classList.add('break');
    }
}
clockBreak.onclick = function () {
    if (!confirm("Tem a certeza que quer ir para o intervalo?")) return;
    clearInterval(IntervalM);
    clearInterval(IntervalP);
    clearStaminaAlerts();

    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"], 0);
    var timePlay = parseClock(struct_time["clock_play"], 0);
    tbl_match["index"].push(tbl_match["index"].length + 1)
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push("break");
    tbl_match["player_no1"].push(-1);
    tbl_match["last_name1"].push("");
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");

    // Update analysis table
    updateAnlUITable();

    minutesM = "0";
    secondsM = "0";
    displayClock(clockMain, minutesM, secondsM, 0, struct_time.period)

    minutesP = "0";
    secondsP = "0";
    displayClock(clockPlay, minutesP, secondsP, 1, struct_time.period)

    // Toggles
    struct_time["kickofftgl"] = 0;
    struct_time["pausetgl"] = 0;
    struct_time["stoptgl"] = 0;
    // Button Enables
    buttonEnable(clockKickOff, true)
    buttonEnable(clockBreak, false)
    buttonEnable(clockPause, false)
    buttonEnable(clockStop, false)
    buttonEnable(btnSave, true)
    buttonEnable(btnExport, true)
    toggleMatch(false)
    toggleMetrics(false)
    // Button Aesthetics
    clockPer.classList.add('break');
    clockMain.classList.add('break');
    clockPlay.classList.add('break');
    clockPause.classList.remove('toggle');
    clockStop.classList.remove('toggle');
    clockMain.classList.remove('pause');
    clockPlay.classList.remove('pause');
}
clockPause.onclick = function () {
    if (struct_time["pausetgl"] == 0) {
        clearInterval(IntervalM);
        clearInterval(IntervalP);

        struct_time["pausetgl"] = 1;

        buttonEnable(clockStop, false);
        buttonEnable(btnSave, true)

        clockPause.classList.add('toggle');
        clockMain.classList.add('pause');
        clockPlay.classList.add('pause');
    } else {
        IntervalM = setInterval(startMain, 1000);
        IntervalP = setInterval(startPlay, 1000);

        struct_time["pausetgl"] = 0;

        buttonEnable(btnLoadTeam, false)
        buttonEnable(btnLoadMatch, false)
        buttonEnable(clockStop, true)
        buttonEnable(btnSave, false)

        clockPause.classList.remove('toggle');
        clockMain.classList.remove('pause');
        clockPlay.classList.remove('pause');
        lblLoadTeam.classList.add('break');
        lblLoadMatch.classList.add('break');
    }
}
clockStop.onclick = function () {
    let tgl_string = "";
    if (struct_time["stoptgl"] == 0) {
        clearInterval(IntervalP);
        struct_time["stoptgl"] = 1;

        buttonEnable(clockPause, false)

        clockStop.classList.add('toggle');
        clockStop.classList.remove('playing');
        clockPlay.classList.add('pause');
        clockPlay.classList.add('stopped');
        clockPlay.classList.remove('playing');
        tgl_string = "paragem"
    } else {
        IntervalP = setInterval(startPlay, 1000);
        struct_time["stoptgl"] = 0;

        buttonEnable(clockPause, true)

        clockStop.classList.remove('toggle');
        clockStop.classList.add('playing');
        clockPlay.classList.remove('pause');
        clockPlay.classList.remove('stopped');
        clockPlay.classList.add('playing');
        tgl_string = "reinício"
    }
    // Update Match Table
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"], 0);
    var timePlay = parseClock(struct_time["clock_play"], 0);
    tbl_match["index"].push(tbl_match["index"].length + 1)
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push(tgl_string);
    tbl_match["player_no1"].push(-1);
    tbl_match["last_name1"].push("");
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");

    // Update analysis table
    updateAnlUITable();
}
function startMain() {
    secondsM++;

    if (secondsM > 59) {
        minutesM++;
        secondsM = 0;
    }

    displayClock(clockMain, minutesM, secondsM, 0, struct_time.period - 1)
}
function startPlay() {
    secondsP++;
    struct_general.play_time[struct_time.period - 1]++;

    if (secondsP > 59) {
        minutesP++;
        secondsP = 0;
    }
    for (i = 0; i < struct_team.players.length; i++) {
        if (struct_team.players[i].active == 1) {
            struct_team.players[i].tplay++;
            struct_team.players[i].totplay++;
            tbl_period["Tempo de Jogo"][struct_time.period][i]++;
            tbl_period["Tempo de Jogo"][0][i]++;
        } else {
            struct_team.players[i].trest++;
            struct_team.players[i].totrest++;
            tbl_period["Tempo de Descanso"][struct_time.period][i]++;
            tbl_period["Tempo de Descanso"][0][i]++;
        }
        updateWRPer(i)
    }
    updateLiveVis()
    updateAnlUITable()

    displayClock(clockPlay, minutesP, secondsP, 1, struct_time.period - 1)
}
function displayClock(clockTxt, minutes, seconds, mode, per) {
    if (per < struct_general.nper) {
        // mode: 0 - Main Clock, 1 - Play Clock
        if (mode == 0) {
            var minutesTxt = parseInt(minutes)
            var secondsTxt = parseInt(seconds)
            if (minutes <= 9) {
                minutesTxt = "0" + parseInt(minutes)
            }
            if (seconds <= 9) {
                secondsTxt = "0" + parseInt(seconds)
            }
            clockTxt.innerHTML = minutesTxt + ":" + secondsTxt;
        } else {
            var secondsTotal = 60 * struct_general.per_time[per] - (parseInt(seconds) + 60 * parseInt(minutes))
            if (secondsTotal <= 0) {
                clearStaminaAlerts();
            }

            if (secondsTotal >= 0) {
                clockTxt.innerHTML = setClock(secondsTotal)
            } else {
                var minutesTxt = Math.ceil(secondsTotal / 60);
                var secondsTxt = Math.abs(secondsTotal - 60 * minutesTxt);
                if (minutesTxt > -10) {
                    minutesTxt = "-0" + Math.abs(minutesTxt);
                }
                if (secondsTxt < 10) {
                    secondsTxt = "0" + secondsTxt;
                }
                clockTxt.innerHTML = minutesTxt + ":" + secondsTxt
            }
        }
    } else {
        clockTxt.innerHTML = "--:--"
    }
}
function parseClock(clockTxt, mode) {
    // 0: Main Clock, 1: Play Clock
    if (mode == 0) {
        clockArr = clockTxt.split(":");
        minutes = clockArr[0];
        seconds = clockArr[1];
    } else {
        clockArr = clockTxt.split(":");
        secondsTotal = 60 * struct_general.per_time[struct_time.period - 1] - (60 * parseInt(clockArr[0]) + parseInt(clockArr[1]));
        minutes = Math.floor(secondsTotal / 60);
        seconds = secondsTotal - 60 * minutes;
        if (minutes <= 9) {
            minutes = "0" + minutes;
        } else {
            minutes = minutes.toString();
        }
        if (seconds <= 9) {
            seconds = "0" + seconds;
        } else {
            seconds = seconds.toString();
        }
    }

    return [minutes, seconds]
}
function setClock(seconds) {
    minutes = Math.floor(seconds / 60);
    sec = seconds - 60 * minutes;
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    if (sec < 10) {
        sec = "0" + sec;
    }
    return minutes + ":" + sec
}
function updateTime() {
    struct_time["clock_main"] = clockMain.innerHTML;
    struct_time["clock_play"] = clockPlay.innerHTML;
    struct_time["period"] = clockPer.innerHTML;
}
//#endregion

//#region Analysis
function updateMatchDetailsUI() {
    var details = document.getElementById("match-details");
    if (details && details !== document.activeElement) {
        // Determine opponent name
        var opponentName = "";
        if (struct_team["tgl_home"] == 1) {
            // If I am Home, opponent is Away (index 1)
            opponentName = struct_match.teams[1];
        } else {
            // If I am Away, opponent is Home (index 0)
            opponentName = struct_match.teams[0];
        }
        var vsText = "VS: " + opponentName + " | ";
        var dateText = struct_match.date.join("-") + " | ";
        var kickoff_parts = struct_match.kickoff.map(p => p < 10 ? "0" + p : p);
        var timeText = kickoff_parts.join(":") + " | ";
        var locText = struct_match.location;
        details.innerHTML = (vsText + dateText + timeText + locText).toUpperCase();
    }
}

function updateAnlUITable() {
    tblAnl.innerHTML = "";

    var table = "";
    var metrics = Object.keys(tbl_period); // Rotations, Play Time, Rest Time, W/R
    var perlbl = struct_general.per_lbl;
    var cols = struct_team.players.length;

    // METRIC COLOR SCHEME
    metCol = [[104, 108, 115, 24, 160, 251],
    [104, 108, 115, 240, 65, 80], // Play Time: Slate -> Red
    [104, 108, 115, 79, 191, 111], // Rest Time: Slate -> Green
    [79, 191, 111, 24, 160, 251, 240, 65, 80], // WR Ratio: Green -> Blue --> Red
    [104, 108, 115, 24, 160, 251]] // % of Period Played: Slate -> Blue

    // TEAM ROW
    table += "<tr>";
    table += "<th style='background-color:black; text-align: right'>Equipa &nbsp &nbsp</th>";
    for (c = 0; c < cols; c++) {
        var p = struct_team.players[c];
        var displayName = p.nlast + (p.isLivre ? " ⭐" : "");
        table += "<th style='background-color:black'>" + displayName + "</th>";
    }
    table += "</tr>";
    table = addRowSpace(table);
    // DATA ROWS
    for (var p = 0; p <= struct_general.nper; p++) {
        for (m = 0; m < metrics.length; m++) {
            table += "<tr>";
            if (p == 0) {
                table += "<th style='background-color:black; text-align: right'>Jogo " + metrics[m] + " &nbsp &nbsp</th>";
            } else {
                table += "<th style='background-color:black; text-align: right'>" + perlbl[p - 1] + "_" + metrics[m] + " &nbsp &nbsp</th>";
            }

            for (c = 0; c < cols; c++) {
                cellData = tbl_period[metrics[m]][p][c]
                // GET METRIC FORMAT
                if (m == 1 || m == 2) { // Play/Rest Time
                    cellData = setClock(cellData)
                } else if (m == 4) { // % Played
                    cellData += "%"
                }
                cCol = 'black'
                if (m == 3) {
                    cCol = getCellColorWR(tbl_period[metrics[m]][p][c], metCol[m])
                } else {
                    cCol = getCellColor(tbl_period[metrics[m]][p], c, metCol[m])
                }

                table += "<th style=" +
                    "'background-color:" + cCol + ";" +
                    "color:var(--grey6);" +
                    "'>" + cellData + "</th>"
            }
            table += "</tr>";
        }
        table = addRowSpace(table);
        tblAnl.innerHTML = table;
        updateMatchDetailsUI();
    }

    function addRowSpace(table) {
        table += "<tr>";
        table += "<th style='background-color:var(--slate1)'></th>";
        for (c = 0; c < cols; c++) {
            table += "<th style='background-color:var(--slate1)'></th>";
        }
        table += "</tr>";

        return table;
    }
}
function getCellColor(dataArr, idx, rgb) {
    rVal = rgb[0] + (rgb[3] - rgb[0]) * (dataArr[idx] / (Math.max(...dataArr) + 0.01));
    gVal = rgb[1] + (rgb[4] - rgb[1]) * (dataArr[idx] / (Math.max(...dataArr) + 0.01));
    bVal = rgb[2] + (rgb[5] - rgb[2]) * (dataArr[idx] / (Math.max(...dataArr) + 0.01));

    return "rgb(" + rVal + "," + gVal + "," + bVal + ")"
}
function getCellColorWR(wr, rgbGBR) {
    rgb = [rgbGBR[3], rgbGBR[4], rgbGBR[5]];
    if (wr < 0.9) {
        rgb = [rgbGBR[0], rgbGBR[1], rgbGBR[2]];
    } else if (wr > 1.1) {
        rgb = [rgbGBR[6], rgbGBR[7], rgbGBR[8]];
    }
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"
}
function getVisColorWR(wr, rgbGBR) {
    rgb = [rgbGBR[3], rgbGBR[4], rgbGBR[5]];
    if (wr < 0.9) {
        rgb = [rgbGBR[0], rgbGBR[1], rgbGBR[2]];
    } else if (wr > 1.1) {
        rgb = [rgbGBR[6], rgbGBR[7], rgbGBR[8]];
    }
    return "rgb(" + rgb[0] + "," + rgb[1] + "," + rgb[2] + ")"
}
function updateLiveVis() {
    colG = [200, 200, 200, 79, 191, 111];
    colR = [200, 200, 200, 249, 92, 80];
    colGBR = [79, 191, 111, 24, 160, 251, 249, 92, 80];

    perno = struct_time.period;
    if (perno == 0) {
        perno = 1;
    }
    tPlayDat = getKeyArray(struct_team.players, "tplay")
    tRestDat = getKeyArray(struct_team.players, "trest")
    for (i = 1; i <= struct_general.nplay + struct_general.nsub; i++) {
        // STAMINA CHECK
        elPlayer = document.getElementById("play" + i);
        var isGR = struct_team.players[i - 1].position === "GR";

        if (!isGR && struct_team.players[i - 1].tplay >= 180 && struct_team.players[i - 1].active == 1) {
            elPlayer.classList.add('warning-stamina');
            if (struct_team.players[i - 1].tplay == 180) {
                audioAlert.play().catch(e => console.log("Audio play failed:", e));
            }
        } else {
            elPlayer.classList.remove('warning-stamina');
        }

        // GET CLOCK COLOR
        txtRot = document.getElementById("rot" + i);
        txtRot.innerHTML = tbl_period["Rotações"][perno][i - 1];

        txtClock = document.getElementById("time" + i);
        clockDat = struct_team.players[i - 1].tplay;
        cCol = getCellColor(tPlayDat, i - 1, colG)
        if (struct_team.players[i - 1].active == 0) {
            clockDat = struct_team.players[i - 1].trest;
            cCol = getCellColor(tRestDat, i - 1, colR)
        }
        txtClock.innerHTML = setClock(clockDat);
        txtClock.style.color = cCol;

        wrRatio = Math.round(100 * struct_team.players[i - 1].tplay / (struct_team.players[i - 1].trest + 1)) / 100;
        if (wrRatio >= 1) {

        }
        txtWR = document.getElementById("wr" + i);
        txtWR.innerHTML = wrRatio;
        txtWR.style.color = getVisColorWR(wrRatio, colGBR);

        txtTP = document.getElementById("tp" + i);
        txtTP.innerHTML = setClock(struct_team.players[i - 1].tplay);
        txtTR = document.getElementById("tr" + i);
        txtTR.innerHTML = setClock(struct_team.players[i - 1].trest);
    }
}
function updateWRPer(pno) {
    tplay = tbl_period["Tempo de Jogo"][struct_time.period][pno];
    trest = tbl_period["Tempo de Descanso"][struct_time.period][pno];
    wrRatio = Math.round(100 * tplay / (trest + 1)) / 100;
    perPlay = 100 * Math.round(100 * tplay / struct_general.play_time[struct_time.period - 1]) / 100;

    tbl_period["Rácio J/D"][struct_time.period][pno] = wrRatio;
    tbl_period["% Tempo Total"][struct_time.period][pno] = perPlay;

    // MATCH
    tplayM = tbl_period["Tempo de Jogo"][0][pno];
    trestM = tbl_period["Tempo de Descanso"][0][pno];
    timeM = struct_general.play_time.reduce((a, b) => a + b, 0)
    wrRatioM = Math.round(100 * tplayM / (trestM + 1)) / 100;
    perPlayM = 100 * Math.round(100 * tplayM / timeM) / 100;

    tbl_period["Rácio J/D"][0][pno] = wrRatioM;
    tbl_period["% Tempo Total"][0][pno] = perPlayM;
}
//#endregion

//#region Team Actions+Passing
function setSelected(i) {
    var p = struct_team["players"][i - 1];
    if (p.cardState == 2) {
        console.log("Jogador expulso não pode ser selecionado.");
        return;
    }
    el = document.getElementById("play" + i);
    if (p["selected"] == 0) {
        p["selected"] = 1;
        el.classList.add('selected');
    } else {
        p["selected"] = 0;
        el.classList.remove('selected');
    }
}
function checkSub() {
    var selArray = getKeyArray(struct_team["players"], "selected");
    if (arrSum(selArray) == 2) {
        switchPlayers(selArray);
    }
}
function switchPlayers(selArray) {
    var pID1 = getAllIndexes(selArray, 1)[0];
    var pID2 = getAllIndexes(selArray, 1)[1];

    var onID = pID1;
    var offID = pID2;
    var validSub = false;

    // Determine on and off
    if (struct_team.players[pID1].active == 0 && struct_team.players[pID2].active == 1) {
        onID = pID1;
        offID = pID2;
        validSub = true;
    } else if (struct_team.players[pID1].active == 1 && struct_team.players[pID2].active == 0) {
        onID = pID2;
        offID = pID1;
        validSub = true;
    }

    // Check if player to enter is expelled
    if (validSub && struct_team.players[onID].cardState == 2) {
        console.log("Não é permitido colocar um jogador expulso em campo.");
        validSub = false;
    }
    el1 = document.getElementById("play" + (onID + 1));
    el2 = document.getElementById("play" + (offID + 1));

    if (validSub) {
        struct_team["players"][offID]["active"] = 0;
        struct_team["players"][onID]["active"] = 1;

        // Update Analysis Table
        perno = struct_time["period"];
        if (struct_time.kickofftgl == 1) {
            tbl_period["Rotações"][perno][onID] += 1;
            tbl_period["Rotações"][0][onID] += 1;
        }

        // Update Live Vis
        struct_team.players[onID].tplay = 0;
        struct_team.players[offID].trest = 0;
        updateLiveVis();

        // Update Match Table
        if (struct_time.kickofftgl == 1) {
            updateTime();
            var timeMain = parseClock(struct_time["clock_main"], 0);
            var timePlay = parseClock(struct_time["clock_play"], 0);
            tbl_match["index"].push(tbl_match["index"].length + 1);
            tbl_match["period"].push(struct_time["period"]);
            tbl_match["min_run"].push(timeMain[0]);
            tbl_match["sec_run"].push(timeMain[1]);
            tbl_match["min_eff"].push(timePlay[0]);
            tbl_match["sec_eff"].push(timePlay[1]);
            tbl_match["result"].push("substituição");
            tbl_match["player_no1"].push(struct_team["players"][offID]["pno"]);
            tbl_match["last_name1"].push(struct_team["players"][offID]["nlast"]);
            tbl_match["player_no2"].push(struct_team["players"][onID]["pno"]);
            tbl_match["last_name2"].push(struct_team["players"][onID]["nlast"]);

            // Update analysis table
            updateAnalysisTable();
        }
        // Aesthetics
        el1.classList.add('active');
        el2.classList.remove('active');
        //checkSub();
        updateAnlUITable();
    }
    struct_team.players[onID].selected = 0;
    struct_team.players[offID].selected = 0;
    el1.classList.remove('selected');
    el2.classList.remove('selected');
}

btnP1.onclick = function () { setSelected(1); checkSub() }
btnP2.onclick = function () { setSelected(2); checkSub() }
btnP3.onclick = function () { setSelected(3); checkSub() }
btnP4.onclick = function () { setSelected(4); checkSub() }
btnP5.onclick = function () { setSelected(5); checkSub() }
btnP6.onclick = function () { setSelected(6); checkSub() }
btnP7.onclick = function () { setSelected(7); checkSub() }
btnP8.onclick = function () { setSelected(8); checkSub() }
btnP9.onclick = function () { setSelected(9); checkSub() }
btnP10.onclick = function () { setSelected(10); checkSub() }
btnP11.onclick = function () { setSelected(11); checkSub() }
btnP12.onclick = function () { setSelected(12); checkSub() }
btnP13.onclick = function () { setSelected(13); checkSub() }
btnP14.onclick = function () { setSelected(14); checkSub() }
btnP15.onclick = function () { setSelected(15); checkSub() }
btnP16.onclick = function () { setSelected(16); checkSub() }

// Card System Logic
var btnCardsGlobal = document.getElementById("btn-cards-global");
var modalCards = document.getElementById("modal-cards");
var modalPlayerName = document.getElementById("modal-player-name");
var modalBtnYellow = document.getElementById("modal-btn-yellow");
var modalBtnRed = document.getElementById("modal-btn-red");
var modalBtnCancel = document.getElementById("modal-btn-cancel");

btnCardsGlobal.onclick = function () {
    var pIdx = -1;
    for (var i = 0; i < struct_team.players.length; i++) {
        if (struct_team.players[i].selected == 1) {
            pIdx = i + 1;
            break;
        }
    }
    if (pIdx > 0) {
        var p = struct_team.players[pIdx - 1];
        if (p.cardState < 2) {
            modalPlayerName.innerHTML = "Jogador: " + p.pno + ". " + p.nlast;
            modalCards.style.display = "flex";
        }
    }
};

modalBtnCancel.onclick = function () { modalCards.style.display = "none"; };

modalBtnYellow.onclick = function () {
    var pIdx = -1;
    for (var i = 0; i < struct_team.players.length; i++) {
        if (struct_team.players[i].selected == 1) {
            pIdx = i + 1;
            break;
        }
    }
    applyCard(pIdx, "amarelo");
    modalCards.style.display = "none";
};

modalBtnRed.onclick = function () {
    var pIdx = -1;
    for (var i = 0; i < struct_team.players.length; i++) {
        if (struct_team.players[i].selected == 1) {
            pIdx = i + 1;
            break;
        }
    }
    applyCard(pIdx, "vermelho");
    modalCards.style.display = "none";
};

function applyCard(pIdx, color) {
    if (pIdx < 1) return;
    var p = struct_team.players[pIdx - 1];

    if (color == "amarelo") {
        if (p.cardState == 0) {
            p.cardState = 1;
            document.getElementById("yind" + pIdx).style.display = "block";
            addCardEvent(pIdx, "cartão amarelo");
        } else if (p.cardState == 1) {
            // Second yellow = red/expulsion
            p.cardState = 2;
            document.getElementById("rind" + pIdx).style.display = "block";
            addCardEvent(pIdx, "2º amarelo (vermelho)");
            expelPlayer(pIdx);
        }
    } else if (color == "vermelho") {
        p.cardState = 2;
        document.getElementById("rind" + pIdx).style.display = "block";
        addCardEvent(pIdx, "cartão vermelho direto");
        expelPlayer(pIdx);
    }
}

function addCardEvent(pIdx, resultText) {
    updateTime();
    var p = struct_team.players[pIdx - 1];
    var timeMain = parseClock(struct_time["clock_main"], 0);
    var timePlay = parseClock(struct_time["clock_play"], 0);

    tbl_match["index"].push(tbl_match["index"].length + 1);
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push(resultText);
    tbl_match["player_no1"].push(p.pno);
    tbl_match["last_name1"].push(p.nlast);
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");
    updateAnlUITable();
}

function expelPlayer(pIdx) {
    var p = struct_team.players[pIdx - 1];
    var el = document.getElementById("play" + pIdx);
    el.classList.add("expelled");

    // If active on field, force substitution out
    if (p.active == 1) {
        p.active = 0;
        updateLiveVis();
    }

    // Disable selection
    p.selected = 0;
    el.classList.remove("selected");
}

btnGHPos.onclick = function () {
    struct_match["score"][0]++
    txtHScore.innerHTML++;
    if (struct_team["tgl_home"] == 1) {
        addGoal("golo a favor");
    } else {
        addGoal("golo contra")
    }
}
btnGHNeg.onclick = function () {
    if (struct_match["score"][0] > 0) {
        struct_match["score"][0]--
        txtHScore.innerHTML--;
        if (struct_team["tgl_home"] == 1) {
            addGoal("golo anulado");
        } else {
            addGoal("golo anulado")
        }
    }
}
btnGAPos.onclick = function () {
    struct_match["score"][1]++
    txtAScore.innerHTML++;
    if (struct_team["tgl_home"] == 0) {
        addGoal("golo a favor");
    } else {
        addGoal("golo contra")
    }
}
btnGANeg.onclick = function () {
    if (struct_match["score"][1] > 0) {
        struct_match["score"][1]--
        txtAScore.innerHTML--;
        if (struct_team["tgl_home"] == 0) {
            addGoal("golo anulado");
        } else {
            addGoal("golo anulado")
        }
    }
}

function addGoal(lbl) {
    updateTime()
    var timeMain = parseClock(struct_time["clock_main"], 0);
    var timePlay = parseClock(struct_time["clock_play"], 0);
    tbl_match["index"].push(tbl_match["index"].length + 1);
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push(lbl);
    tbl_match["player_no1"].push(-1);
    tbl_match["last_name1"].push(-1);
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");

    // Update analysis table
    updateAnlUITable();
}

function addCard(pIdx, color) {
    updateTime();
    var p = struct_team.players[pIdx - 1];
    var timeMain = parseClock(struct_time["clock_main"], 0);
    var timePlay = parseClock(struct_time["clock_play"], 0);

    tbl_match["index"].push(tbl_match["index"].length + 1);
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push("cartão " + color);
    tbl_match["player_no1"].push(p.pno);
    tbl_match["last_name1"].push(p.nlast);
    tbl_match["player_no2"].push(-1);
    tbl_match["last_name2"].push("");

    // Update analysis table
    updateAnlUITable();
}

//#endregion

//#region Metrics
function addMetric(team, metric, result, total) {
    updateTime();
    var timeMain = parseClock(struct_time["clock_main"], 0);
    var timePlay = parseClock(struct_time["clock_play"], 0);
    tbl_metrics["index"].push(tbl_metrics["index"].length + 1);
    tbl_metrics["period"].push(struct_time["period"]);
    tbl_metrics["min_run"].push(timeMain[0]);
    tbl_metrics["sec_run"].push(timeMain[1]);
    tbl_metrics["min_eff"].push(timePlay[0]);
    tbl_metrics["sec_eff"].push(timePlay[1]);
    tbl_metrics["team"].push(team);
    tbl_metrics["metric"].push(metric);
    tbl_metrics["result"].push(result);
    tbl_metrics["total_home"].push(total[0]);
    tbl_metrics["total_away"].push(total[1]);
}

function metricChange(metricNo, teamNo, result, metVal, metLbl) {
    // Update metric labels
    struct_general.metric_name[metricNo] = metLbl.innerHTML;
    if (result == 1) {
        metVal.innerHTML++; // Update HTML value label
        struct_general.metric_val[metricNo][teamNo] = metVal.innerHTML; // Update structure value        
        addMetric(struct_match.teams[teamNo], struct_general.metric_name[metricNo], result, struct_general.metric_val[metricNo])
    } else {
        if (metVal.innerHTML > 0) {
            metVal.innerHTML--; // Update HTML value label
            struct_general.metric_val[metricNo][teamNo] = metVal.innerHTML; // Update structure value        
            addMetric(struct_match.teams[teamNo], struct_general.metric_name[metricNo], result, struct_general.metric_val[metricNo])
        }
    }
}

if (btnM1PosH) btnM1PosH.onclick = function () {
    metricChange(0, 0, 1, btnM1ValH, btnM1Lbl);
}
if (btnM1NegH) btnM1NegH.onclick = function () {
    metricChange(0, 0, -1, btnM1ValH, btnM1Lbl);
}
if (btnM1PosA) btnM1PosA.onclick = function () {
    metricChange(0, 1, 1, btnM1ValA, btnM1Lbl);
}
if (btnM1NegA) btnM1NegA.onclick = function () {
    metricChange(0, 1, -1, btnM1ValA, btnM1Lbl);
}
if (btnM2PosH) btnM2PosH.onclick = function () {
    metricChange(1, 0, 1, btnM2ValH, btnM2Lbl);
}
if (btnM2NegH) btnM2NegH.onclick = function () {
    metricChange(1, 0, -1, btnM2ValH, btnM2Lbl);
}
if (btnM2PosA) btnM2PosA.onclick = function () {
    metricChange(1, 1, 1, btnM2ValA, btnM2Lbl);
}
if (btnM2NegA) btnM2NegA.onclick = function () {
    metricChange(1, 1, -1, btnM2ValA, btnM2Lbl);
}
if (btnM3PosH) btnM3PosH.onclick = function () {
    metricChange(2, 0, 1, btnM3ValH, btnM3Lbl);
}
if (btnM3NegH) btnM3NegH.onclick = function () {
    metricChange(2, 0, -1, btnM3ValH, btnM3Lbl);
}
if (btnM3PosA) btnM3PosA.onclick = function () {
    metricChange(2, 1, 1, btnM3ValA, btnM3Lbl);
}
if (btnM3NegA) btnM3NegA.onclick = function () {
    metricChange(2, 1, -1, btnM3ValA, btnM3Lbl);
}

//#endregion

//#region Load Team
btnLoadTeam.onchange = function () { loadTeamInfo() };

function loadTeamInfo() {
    var files = btnLoadTeam.files || [];
    if (!files.length) return;
    var file = files[0];

    var reader = new FileReader();
    reader.onloadend = function (event) {
        var arrayBuffer = reader.result;

        var options = { type: 'array' };
        var workbook = XLSX.read(arrayBuffer, options);

        var sheetName = workbook.SheetNames[0]
        var sheet = workbook.Sheets[sheetName]

        var matchInfo = {};
        // Read Match Info (Rows 1-12 for robustness)
        for (var i = 1; i <= 12; i++) {
            if (sheet["A" + i] && sheet["B" + i]) {
                var key = sheet["A" + i]["v"];
                var val = sheet["B" + i]["v"];
                // Skip generic headers
                if (key === "CONFIGURAÇÃO DO JOGO" || key === "VALOR") continue;
                matchInfo[key] = val;
            }
        }
        var playerInfo = {
            "pid": [],
            "pno": [],
            "nfirst": [],
            "nlast": [],
            "position": [],
            "isLivre": []
        };

        // Find header row (Search for ID or NOME to find the player list start)
        livresHeaderRow = 13;
        var foundHeader = false;

        for (var i = 1; i <= 40; i++) {
            if (foundHeader) break;
            for (var colIdx = 0; colIdx < 5; colIdx++) { // Only look in first columns
                var col = String.fromCharCode(65 + colIdx);
                var cell = sheet[col + i];
                if (cell && cell.v) {
                    var cellVal = cell.v.toString().trim().toUpperCase();
                    if (cellVal.match(/^ID$|^NOME$|^PLAYER$|^JOGADOR$/)) {
                        livresHeaderRow = i;
                        foundHeader = true;
                        break;
                    }
                }
            }
        }

        // Read Player Info
        for (var i = livresHeaderRow + 1; i < 55; i++) {
            // Check if row exists (Column A is Player ID, essential)
            // Some people might leave Col A empty and use Col B (Number), so check both
            var rowEmpty = true;
            for (var c of ["A", "B", "C"]) {
                if (sheet[c + i] && sheet[c + i].v !== undefined && sheet[c + i].v !== "") {
                    rowEmpty = false;
                    break;
                }
            }
            if (rowEmpty) continue;

            var pid = (sheet["A" + i] && sheet["A" + i].v) ? sheet["A" + i].v : (i - livresHeaderRow);
            // Skip header rows if the user didn't follow the setup exactly
            if (pid === "ID" || pid === "Player ID" || pid === "LISTA DE JOGADORES") continue;

            playerInfo["pid"].push(pid);
            playerInfo["pno"].push(sheet["B" + i] ? sheet["B" + i].v : "");
            playerInfo["nfirst"].push(sheet["C" + i] ? sheet["C" + i].v : "");
            playerInfo["nlast"].push(sheet["D" + i] ? sheet["D" + i].v : "");
            playerInfo["position"].push(sheet["E" + i] ? sheet["E" + i].v : "");
            playerInfo["isLivre"].push(false);
        }

        alert("Equipa carregada com sucesso!");

        updateTeamInfo(matchInfo, playerInfo);
        updateAnlUITable();
    };
    reader.readAsArrayBuffer(file);
}
function updateTeamInfo(mInfo, pInfo) {
    // Match Info
    // Handle Date (String from Excel -> Array [YYYY, MM, DD])
    var dateVal = mInfo["Data"];
    if (typeof dateVal === 'string' && dateVal.includes('-')) {
        struct_match["date"] = dateVal.split('-');
    } else {
        // Fallback or if already array (unlikely from Excel string)
        struct_match["date"] = dateVal || ['00', '00', '00'];
    }

    // Handle Time (String from Excel -> Array [HH, MM])
    var timeVal = mInfo["Hora"];
    if (typeof timeVal === 'string' && timeVal.includes(':')) {
        struct_match["kickoff"] = timeVal.split(':');
    } else {
        struct_match["kickoff"] = timeVal || ['00', '00'];
    }

    struct_match["location"] = mInfo["Local"];
    struct_match["competition"] = mInfo["Competicao"];
    struct_match["stage"] = mInfo["Jornada"];

    struct_match["teams"] = [mInfo["Equipa Casa"], mInfo["Equipa Adversaria"]];
    struct_match["initials"] = [mInfo["Sigla Casa"], mInfo["Sigla Adversaria"]];

    // Team Info
    struct_team["name"] = mInfo["Equipa Analisada"];
    // Correct comparison to determine home/away toggle
    // Trim strings to avoid mismatch due to spaces
    var homeTeam = (mInfo["Equipa Casa"] || "").trim();
    var analyzedTeam = (mInfo["Equipa Analisada"] || "").trim();

    if (homeTeam == analyzedTeam) {
        struct_team["tgl_home"] = 1;
    } else {
        struct_team["tgl_home"] = 0;
    }
    // Reset Player Stats Arrays for new players
    // Calculate new total players
    var totalNewPlayers = pInfo["pid"].length;
    // Update struct_general to reflect new counts
    // Assume 5 field players (or max available if less)
    struct_general["nplay"] = Math.min(5, totalNewPlayers);
    struct_general["nsub"] = Math.max(0, totalNewPlayers - struct_general["nplay"]);

    // We need to Resize struct_team.players array first
    struct_team["players"] = [];
    for (var i = 0; i < totalNewPlayers; i++) {
        struct_team["players"].push({
            "pid": pInfo["pid"][i],
            "pno": pInfo["pno"][i],
            "nfirst": pInfo["nfirst"][i],
            "nlast": pInfo["nlast"][i],
            "position": pInfo["position"][i],
            "isLivre": pInfo["isLivre"][i],
            "tplay": 0,
            "trest": 0,
            "active": (i < struct_general["nplay"] ? 1 : 0),
            "yellow": 0,
            "red": 0,
            "blue": 0,
            "cardState": 0,
            "selected": 0,
            "totplay": 0,
            "totrest": 0
        });
    }

    // Now Reset tbl_period with correct dimensions
    // Reset object arrays
    tbl_period["Rotações"] = [];
    tbl_period["Tempo de Jogo"] = [];
    tbl_period["Tempo de Descanso"] = [];
    tbl_period["Rácio J/D"] = [];
    tbl_period["% Tempo Total"] = [];

    // Re-initialize for each period (including period 0 = Total)
    // Note: 'i' here represents period index (0 to nper)
    for (var i = 0; i <= struct_general.nper; i++) {
        tbl_period["Rotações"].push([]);
        tbl_period["Tempo de Jogo"].push([]);
        tbl_period["Tempo de Descanso"].push([]);
        tbl_period["Rácio J/D"].push([]);
        tbl_period["% Tempo Total"].push([]);

        // For each player
        for (var p = 0; p < totalNewPlayers; p++) {
            tbl_period["Rotações"][i].push(0);
            tbl_period["Tempo de Jogo"][i].push(0);
            tbl_period["Tempo de Descanso"][i].push(0);
            tbl_period["Rácio J/D"][i].push(1.00);
            tbl_period["% Tempo Total"][i].push(0);
        }
    }

    // Update Team UI Labels
    if (btnM1H) btnM1H.innerHTML = struct_match.initials[0];
    if (btnM2H) btnM2H.innerHTML = struct_match.initials[0];
    if (btnM3H) btnM3H.innerHTML = struct_match.initials[0];
    if (btnM1A) btnM1A.innerHTML = struct_match.initials[1];
    if (btnM2A) btnM2A.innerHTML = struct_match.initials[1];
    if (btnM3A) btnM3A.innerHTML = struct_match.initials[1];
    txtHome.innerHTML = struct_match.initials[0];
    txtAway.innerHTML = struct_match.initials[1];
    txtHome.style.fontSize = "2vh"
    txtAway.style.fontSize = "2vh"
    txtAway.style.fontSize = "2vh"

    // Update Player UI Labels
    updateLiveButtons();
}
//#endregion

//#region Load Match
btnLoadMatch.onchange = function () {
    let file = btnLoadMatch.files[0];
    let reader = new FileReader();
    reader.addEventListener('load', function (e) {
        let text = e.target.result;
        var match_data = JSON.parse(text);

        // UPDATE STRUCTURES
        struct_general = match_data["general"];
        struct_match = match_data["match"];
        struct_time = match_data["time"];
        struct_team = match_data["team"];
        tbl_match = match_data["tbl_match"];
        tbl_period = match_data["tbl_period"];
        tbl_metrics = match_data["tbl_metrics"];

        // UPDATE MINUTES + SECONDS        
        var timeMain = parseClock(struct_time["clock_main"], 0);
        var timePlay = parseClock(struct_time["clock_play"], 1);
        minutesM = timeMain[0];
        secondsM = timeMain[1];
        minutesP = timePlay[0];
        secondsP = timePlay[1];

        // UPDATE INFO
        updateAnlUITable();
        updateLiveVis();
        updateLiveButtons();
        clockPer.innerHTML = struct_time["period"];
        clockMain.innerHTML = struct_time["clock_main"];
        clockPlay.innerHTML = struct_time["clock_play"];
        txtHScore.innerHTML = struct_match["score"][0];
        txtAScore.innerHTML = struct_match["score"][1];
        // Update Team UI Labels
        txtHome.innerHTML = struct_match.initials[0];
        txtAway.innerHTML = struct_match.initials[1];
        txtHome.style.fontSize = "2vh"
        txtAway.style.fontSize = "2vh"
        if (typeof btnGH !== 'undefined' && btnGH) btnGH.innerHTML = struct_match.initials[0] + "\n Goal";
        if (typeof btnGA !== 'undefined' && btnGA) btnGA.innerHTML = struct_match.initials[1] + "\n Goal";
        if (btnM1Lbl) btnM1Lbl.innerHTML = struct_general.metric_name[0];
        if (btnM2Lbl) btnM2Lbl.innerHTML = struct_general.metric_name[1];
        if (btnM3Lbl) btnM3Lbl.innerHTML = struct_general.metric_name[2];
        if (btnM1ValH) btnM1ValH.innerHTML = struct_general.metric_val[0][0];
        if (btnM1ValA) btnM1ValA.innerHTML = struct_general.metric_val[0][1];
        if (btnM2ValH) btnM2ValH.innerHTML = struct_general.metric_val[1][0];
        if (btnM2ValA) btnM2ValA.innerHTML = struct_general.metric_val[1][1];
        if (btnM3ValH) btnM3ValH.innerHTML = struct_general.metric_val[2][0];
        if (btnM3ValA) btnM3ValA.innerHTML = struct_general.metric_val[2][1];

        // UPDATE ENABLES
        if (struct_time["pausetgl"] == 1) {
            buttonEnable(clockKickOff, false);
            buttonEnable(clockBreak, true);
            buttonEnable(clockPause, true);
            buttonEnable(clockStop, false);
            buttonEnable(btnSave, true);
            buttonEnable(btnExport, false);

            clockPause.classList.add('toggle');
            clockMain.classList.remove('break');
            clockPlay.classList.remove('break');
            clockPer.classList.remove('break');
            clockMain.classList.add('pause');
            clockPlay.classList.add('pause');

            togglePlayers(true);
            toggleMatch(true);
            toggleMetrics(true);
        } else {
            buttonEnable(btnExport, true);
        }
    });
    reader.readAsText(file);
};

function updateLiveButtons() {
    // Update Player UI Labels
    for (i = 0; i < struct_team.players.length; i++) {
        elName = document.getElementById('name' + (i + 1));
        var p = struct_team.players[i];
        if (document.activeElement !== elName) {
            elName.innerHTML = (p.nfirst + " " + p.nlast).trim();
        }

        elNo = document.getElementById('no' + (i + 1));
        if (document.activeElement !== elNo) {
            elNo.innerHTML = p.pno + '.';
        }

        elPos = document.getElementById('pos' + (i + 1));
        if (document.activeElement !== elPos) {
            elPos.innerHTML = struct_team.players[i].position;
        }

        // Update Star Indicator
        var elStar = document.getElementById('star' + (i + 1));
        if (elStar) {
            elStar.innerHTML = "⚽";
            elStar.className = "jersey-star " + (p.isLivre ? "active" : "inactive");

            // Re-attach listener once (using property to avoid duplicates)
            if (!elStar.onclickSet) {
                elStar.onclick = (function (idx) {
                    return function (e) {
                        e.stopPropagation(); // Don't trigger the card click

                        var p = struct_team.players[idx];
                        var isEntering = !p.isLivre;

                        if (isEntering) {
                            // Count current active players (excluding expelled)
                            var activeCount = struct_team.players.filter(pl => pl.active == 1).length;

                            // Count current unit selections
                            var fieldCount = 0;
                            var gkCount = 0;
                            for (var j = 0; j < struct_team.players.length; j++) {
                                if (struct_team.players[j].isLivre) {
                                    if (struct_team.players[j].position === "GR" || struct_team.players[j].position === "GK") {
                                        gkCount++;
                                    } else {
                                        fieldCount++;
                                    }
                                }
                            }

                            // Determine limit: if we have 4 on field, we can only select 3 field players (+1 GR)
                            var maxField = Math.min(4, activeCount - 1);
                            if (activeCount < 2) maxField = 1; // Fallback

                            // Check limits
                            if (p.position === "GR" || p.position === "GK") {
                                if (gkCount >= 1) {
                                    alert("Limite atingido: Só pode haver 1 Guarda-Redes na unidade de SUBSTITUIÇÃO.");
                                    return;
                                }
                            } else {
                                if (fieldCount >= maxField) {
                                    alert("Limite atingido: No máximo " + maxField + " jogadores de campo na unidade de SUBSTITUIÇÃO (baseado no número atual de jogadores em campo).");
                                    return;
                                }
                            }
                        }

                        p.isLivre = !p.isLivre;
                        updateLiveButtons();
                        updateAnlUITable();
                    };
                })(i);
                elStar.onclickSet = true;
            }
        }
    }
    for (i = 1; i <= struct_team.players.length; i++) {
        el = document.getElementById("play" + i)
        if (el.classList.contains('active')) {
            el.classList.remove('active');
        }
        if (struct_team.players[i - 1].active == 1) {
            el.classList.add('active');
        }
    }
}
//#endregion

//#region Save Match
btnSave.onclick = function () {
    updateTime();
    var struct = {
        "general": struct_general,
        "match": struct_match,
        "time": struct_time,
        "team": struct_team,
        "tbl_match": tbl_match,
        "tbl_metrics": tbl_metrics,
        "tbl_period": tbl_period
    }
    var blob = new Blob([JSON.stringify(struct)], { type: "text/plain;charset=utf-8" });
    var dateStr = struct_match["date"].join("-"); // Convert array to YYYY-MM-DD
    var fileName = struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + dateStr + ".txt";
    saveAs(blob, fileName);
}
//#endregion

//#region Export Data
function pushSheet(wb, name, data) {
    var ws = XLSX.utils.aoa_to_sheet(data);
    wb.SheetNames.push(name);
    wb.Sheets[name] = ws;

    return wb
}
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}

btnExport.onclick = function () {
    console.log('Export button clicked!');
    console.log('XLSX available:', typeof XLSX !== 'undefined');
    if (typeof XLSX === 'undefined') {
        alert("Erro: A biblioteca de exportação (XLSX) não foi carregada. Verifique a sua conexão à internet.");
        return;
    }
    if (typeof saveAs === 'undefined') {
        alert("Erro: A biblioteca de salvamento (FileSaver) não foi carregada. Verifique a sua conexão à internet.");
        return;
    }
    console.log('Export button clicked!');
    console.log('XLSX available:', typeof XLSX !== 'undefined');
    console.log('saveAs available:', typeof saveAs !== 'undefined');

    var head;
    var wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "BreakAway Futsal",
        Author: "Sport Performance Analytics Inc.",
        CreatedDate: new Date()
    };

    // Match Info Tab
    var dataMatchInfo = [];
    // Header
    dataMatchInfo.push(["Team Analyzed", "Date", "Location", "Competition", "Stage", "KickOff",
        "Home Team", "Away Team", "Home Initials", "Away Initials", "Goals (Home)", "Goals (Away)"]);
    var dateStr = struct_match["date"].join("-"); // Convert array to YYYY-MM-DD
    var kickoffStr = struct_match["kickoff"].join(":"); // Convert array to HH:MM
    dataMatchInfo.push([struct_team["name"], dateStr, struct_match["location"], struct_match["competition"],
    struct_match["stage"], kickoffStr, struct_match["teams"][0], struct_match["teams"][1],
    struct_match["initials"][0], struct_match["initials"][1], struct_match["score"][0], struct_match["score"][1]]);

    // Team Info Tab
    var dataTeamInfo = [];
    // Header
    dataTeamInfo.push(["Player ID", "Player No", "First Name", "Last Name", "Position"]);
    // Data
    for (var row = 0; row < struct_team["players"].length; row++) {
        dataTeamInfo.push([
            struct_team["players"][row]["pid"],
            struct_team["players"][row]["pno"],
            struct_team["players"][row]["nfirst"],
            struct_team["players"][row]["nlast"],
            struct_team["players"][row]["position"]
        ]);
    }

    // Match Events Tab
    var dataMatchEvents = [];
    // Header
    dataMatchEvents.push(Object.keys(tbl_match));
    // Data
    if (tbl_match["index"].length > 0) {
        for (var row = 0; row < tbl_match["index"].length; row++) {
            var datarow = [];
            for (var col = 0; col < Object.keys(tbl_match).length; col++) {
                datarow.push(tbl_match[Object.keys(tbl_match)[col]][row])
            }
            dataMatchEvents.push(datarow.slice());
        }
    }

    // Metrics Tab
    var dataMetrics = [];
    // Header
    dataMetrics.push(Object.keys(tbl_metrics));
    // Data
    if (tbl_metrics["index"].length > 0) {
        for (var row = 0; row < tbl_metrics["index"].length; row++) {
            var datarow = [];
            for (var col = 0; col < Object.keys(tbl_metrics).length; col++) {
                datarow.push(tbl_metrics[Object.keys(tbl_metrics)[col]][row])
            }
            dataMetrics.push(datarow.slice());
        }
    }

    // Playing Stats Tab
    var dataPlayEvents = [];
    var metrics = Object.keys(tbl_period); // Rotations, Play Time, Rest Time, W/R
    var perlbl = struct_general.per_lbl;
    // Header
    var headerrow = []
    headerrow.push('Jersey #')
    headerrow.push('Display Name')
    for (p = 0; p < struct_general.nper; p++) {
        for (m = 0; m < metrics.length; m++) {
            headerrow.push(perlbl[p] + '_' + metrics[m])
        }
    }
    dataPlayEvents.push(headerrow)
    // Data
    for (i = 0; i < struct_team.players.length; i++) {
        var datarow = [];
        datarow.push(struct_team.players[i].pno)
        datarow.push(struct_team.players[i].nlast)
        for (p = 0; p < struct_general.nper; p++) {
            for (m = 0; m < metrics.length; m++) {
                var cellValue = tbl_period[metrics[m]][p][i];
                if (metrics[m] == "Tempo de Jogo" || metrics[m] == "Tempo de Descanso") {
                    datarow.push(setClock(cellValue));
                } else if (metrics[m] == "% Tempo Total") {
                    datarow.push(cellValue + ".0%");
                } else {
                    datarow.push(cellValue);
                }
            }
        }
        dataPlayEvents.push(datarow.slice());
    }

    wb = pushSheet(wb, "Match Info", dataMatchInfo);
    wb = pushSheet(wb, "Team Info", dataTeamInfo);
    wb = pushSheet(wb, "Match Events", dataMatchEvents);
    wb = pushSheet(wb, "Metrics", dataMetrics);
    wb = pushSheet(wb, "Playing Stats", dataPlayEvents);

    // Export
    var dateStr = struct_match["date"].join("-"); // Convert array to YYYY-MM-DD
    var fileName = struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + dateStr + ".xlsx";
    var wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), fileName);

    /*
    // SAVE JSON
    saveAs(new Blob([JSON.stringify(dataMatchInfo)], {type: "text/plain;charset=utf-8"}),
        struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + "_matchinfo.txt");
    saveAs(new Blob([JSON.stringify(dataTeamInfo)], {type: "text/plain;charset=utf-8"}),
        struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + "_teaminfo.txt");
    saveAs(new Blob([JSON.stringify(dataMatchEvents)], {type: "text/plain;charset=utf-8"}),
        struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + "_matchevents.txt");
    saveAs(new Blob([JSON.stringify(dataMetrics)], {type: "text/plain;charset=utf-8"}),
        struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + "_metrics.txt");
    saveAs(new Blob([JSON.stringify(dataPlayEvents)], {type: "text/plain;charset=utf-8"}),
        struct_match["teams"][0] + "_" + struct_match["teams"][1] + "_" + struct_match["date"] + "_playevents.txt");
    */
};
//#endregion

//#region UI SET
window.onload = function () {
    toggleMatch(false);
    toggleMetrics(false);
    togglePlayers(true);
    buttonEnable(clockBreak, false);
    buttonEnable(btnEndReg, false);
    buttonEnable(clockPause, false);
    buttonEnable(clockStop, false);
    buttonEnable(btnSave, false);
    buttonEnable(btnExport, false);
    buttonEnable(btnLivres, false);
    updateAnlUITable();
    updateLiveVis();
}
//#endregion

function buttonEnable(button, tgl) {
    if (!button) return; // Prevent errors if button is null
    if (tgl) {
        button.disabled = false;
        button.classList.remove('disabled');
    } else {
        button.disabled = true;
        button.classList.add('disabled');
    }
}
function togglePlayers(tgl) {
    var prefix = 'play';
    for (var i = 1; i <= struct_general.nplay + struct_general.nsub; i++) {
        el = document.getElementById(prefix + i);
        buttonEnable(el, tgl)
    }
    var prefix = 'btn';
    for (var i = 1; i <= struct_general.nplay + struct_general.nsub; i++) {
        el = document.getElementById(prefix + i);
        buttonEnable(el, tgl)
    }
    buttonEnable(document.getElementById("btn-cards-global"), tgl);
    buttonEnable(document.getElementById("btn-livres"), tgl);
}
function toggleMatch(tgl) {
    buttonEnable(btnGHPos, tgl);
    buttonEnable(btnGHNeg, tgl);
    buttonEnable(btnGAPos, tgl);
    buttonEnable(btnGANeg, tgl);
    if (tgl == false) {
        txtHScore.classList.add("break");
        txtAScore.classList.add("break");
    } else {
        txtHScore.classList.remove("break");
        txtAScore.classList.remove("break");
    }
}
function toggleMetrics(tgl) {
    buttonEnable(btnM1PosH, tgl);
    buttonEnable(btnM1PosA, tgl);
    buttonEnable(btnM1NegH, tgl);
    buttonEnable(btnM1NegA, tgl);
    buttonEnable(btnM2PosH, tgl);
    buttonEnable(btnM2PosA, tgl);
    buttonEnable(btnM2NegH, tgl);
    buttonEnable(btnM2NegA, tgl);
    buttonEnable(btnM3PosH, tgl);
    buttonEnable(btnM3PosA, tgl);
    buttonEnable(btnM3NegH, tgl);
    buttonEnable(btnM3NegA, tgl);
    if (tgl == false) {
        if (btnM1ValH) btnM1ValH.classList.add("break");
        if (btnM1ValA) btnM1ValA.classList.add("break");
        if (btnM2ValH) btnM2ValH.classList.add("break");
        if (btnM2ValA) btnM2ValA.classList.add("break");
        if (btnM3ValH) btnM3ValH.classList.add("break");
        if (btnM3ValA) btnM3ValA.classList.add("break");
    } else {
        if (btnM1ValH) btnM1ValH.classList.remove("break");
        if (btnM1ValA) btnM1ValA.classList.remove("break");
        if (btnM2ValH) btnM2ValH.classList.remove("break");
        if (btnM2ValA) btnM2ValA.classList.remove("break");
        if (btnM3ValH) btnM3ValH.classList.remove("break");
        if (btnM3ValA) btnM3ValA.classList.remove("break");
    }
}
function getKeyArray(dictname, keyname) {
    var valueArray = [];
    for (i = 0; i < dictname.length; i++) {
        valueArray.push(dictname[i][keyname])
    }

    return valueArray
}
function getAllIndexes(arr, val) {
    var indexes = [];
    for (var i = 0; i < arr.length; i++)
        if (arr[i] == val)
            indexes.push(i);
    return indexes;
}

// Function to update the analysis table with match events
function updateAnalysisTable() {
    // Clear existing table
    tblAnl.innerHTML = "";

    // Create header row
    var headerRow = document.createElement("tr");
    headerRow.innerHTML = `
        <th style="padding: 0.5vh; text-align: center; border-bottom: 2px solid var(--grey5);">#</th>
        <th style="padding: 0.5vh; text-align: center; border-bottom: 2px solid var(--grey5);">Período</th>
        <th style="padding: 0.5vh; text-align: center; border-bottom: 2px solid var(--grey5);">Tempo</th>
        <th style="padding: 0.5vh; text-align: center; border-bottom: 2px solid var(--grey5);">Evento</th>
        <th style="padding: 0.5vh; text-align: center; border-bottom: 2px solid var(--grey5);">Jogador(es)</th>
    `;
    tblAnl.appendChild(headerRow);

    // Populate table with match events
    for (var i = 0; i < tbl_match.index.length; i++) {
        var row = document.createElement("tr");
        var timeStr = tbl_match.min_eff[i] + ":" + tbl_match.sec_eff[i];
        var playerStr = "";

        if (tbl_match.player_no1[i] !== -1) {
            playerStr = tbl_match.player_no1[i] + " - " + tbl_match.last_name1[i];
        }
        if (tbl_match.player_no2[i] !== -1) {
            if (playerStr !== "") playerStr += " ↔ ";
            playerStr += tbl_match.player_no2[i] + " - " + tbl_match.last_name2[i];
        }

        row.innerHTML = `
            <td style="padding: 0.5vh; text-align: center; border-bottom: 1px solid var(--grey4);">${tbl_match.index[i]}</td>
            <td style="padding: 0.5vh; text-align: center; border-bottom: 1px solid var(--grey4);">${tbl_match.period[i]}</td>
            <td style="padding: 0.5vh; text-align: center; border-bottom: 1px solid var(--grey4);">${timeStr}</td>
            <td style="padding: 0.5vh; text-align: left; border-bottom: 1px solid var(--grey4);">${tbl_match.result[i]}</td>
            <td style="padding: 0.5vh; text-align: left; border-bottom: 1px solid var(--grey4);">${playerStr}</td>
        `;
        tblAnl.appendChild(row);
    }
}

// Logic for automatic "LIVRES" substitution
if (btnLivres) {
    btnLivres.onclick = function () {
        var players = struct_team.players;
        var livresToEnter = [];
        var currentActiveGR = -1;

        // 1. Identify who should be in and out
        for (var i = 0; i < players.length; i++) {
            var p = players[i];
            if (p.active == 1 && (p.position === "GR" || p.position === "GK")) {
                currentActiveGR = i;
            }
            if (p.isLivre && p.cardState < 2) {
                livresToEnter.push(i);
            }
        }

        var totalToEnter = livresToEnter.length + (currentActiveGR !== -1 ? 1 : 0);
        if (!confirm("Deseja aplicar a unidade de SUBSTITUIÇÃO? (" + livresToEnter.length + " jogadores de campo entrarão, mantendo o GR)")) return;

        console.log("DEBUG LIVRES CLICK - GR Active: " + currentActiveGR + " | Livres found: " + livresToEnter.length);

        // If no GR found active, try to find any non-expelled GR
        if (currentActiveGR == -1) {
            for (var i = 0; i < players.length; i++) {
                if (players[i].position === "GR" && players[i].cardState < 2) {
                    currentActiveGR = i;
                    break;
                }
            }
        }

        if (livresToEnter.length === 0) {
            alert("Nenhum jogador marcado para 'LIVRES' no Excel.\n\n(Lembre-se de usar 'X' na coluna que detectamos: " + livresColIdx + ")");
            return;
        }

        // 2. Perform substitutions logic
        var hasChanges = false;
        var timeMain = parseClock(struct_time["clock_main"], 0);
        var timePlay = parseClock(struct_time["clock_play"], 0);

        for (var i = 0; i < players.length; i++) {
            var shouldBeActive = (i === currentActiveGR || livresToEnter.includes(i));
            var wasActive = players[i].active == 1;

            if (shouldBeActive && !wasActive) {
                // Player entering (was sub, now active)
                players[i].active = 1;
                players[i].tplay = 0;
                var perno = struct_time["period"];
                if (struct_time.kickofftgl == 1) {
                    tbl_period["Rotações"][perno][i] += 1;
                    tbl_period["Rotações"][0][i] += 1;

                    // Log entrance
                    logSub(timeMain, timePlay, -1, "", players[i].pno, players[i].nlast, "entrada (livres)");
                }
                hasChanges = true;
            } else if (!shouldBeActive && wasActive) {
                // Player exiting (was active, now sub, and NOT the GR)
                players[i].active = 0;
                players[i].trest = 0;
                if (struct_time.kickofftgl == 1) {
                    // Log exit
                    logSub(timeMain, timePlay, players[i].pno, players[i].nlast, -1, "", "saída (livres)");
                }
                hasChanges = true;
            } else if (shouldBeActive && wasActive) {
                // STAY ON FIELD: If they are already active and should be, do nothing (keep timer running)
            }
        }

        if (hasChanges) {
            updateLiveVis();
            updateLiveButtons();
            updateAnlUITable();
        }
    };
}

function logSub(timeMain, timePlay, pNo1, pName1, pNo2, pName2, result) {
    tbl_match["index"].push(tbl_match["index"].length + 1);
    tbl_match["period"].push(struct_time["period"]);
    tbl_match["min_run"].push(timeMain[0]);
    tbl_match["sec_run"].push(timeMain[1]);
    tbl_match["min_eff"].push(timePlay[0]);
    tbl_match["sec_eff"].push(timePlay[1]);
    tbl_match["result"].push(result);
    tbl_match["player_no1"].push(pNo1);
    tbl_match["last_name1"].push(pName1);
    tbl_match["player_no2"].push(pNo2);
    tbl_match["last_name2"].push(pName2);
}

if (btnReplaceExpelled) {
    btnReplaceExpelled.onclick = function () {
        var players = struct_team.players;
        var activeCount = players.filter(p => p.active == 1).length;

        if (activeCount >= 5) {
            alert("A equipa já tem 5 (ou mais) jogadores em campo.");
            return;
        }

        // Find selected substitute
        var selIdx = -1;
        for (var i = 0; i < players.length; i++) {
            if (players[i].selected == 1) {
                if (players[i].active == 1) {
                    alert("O jogador selecionado já está em campo.");
                    return;
                }
                if (players[i].cardState == 2) {
                    alert("Não pode colocar um jogador expulso em campo.");
                    return;
                }
                selIdx = i;
                break;
            }
        }

        if (selIdx == -1) {
            alert("Selecione primeiro um suplente (clicando no cartão) para entrar em campo.");
            return;
        }

        var p = players[selIdx];
        if (!confirm("Deseja colocar " + p.pno + ". " + p.nlast + " em campo para repor o 5º jogador?")) return;

        // Perform entry
        updateTime();
        var timeMain = parseClock(struct_time["clock_main"], 0);
        var timePlay = parseClock(struct_time["clock_play"], 0);

        p.active = 1;
        p.tplay = 0;
        p.selected = 0;
        document.getElementById("play" + (selIdx + 1)).classList.remove("selected");
        document.getElementById("play" + (selIdx + 1)).classList.add("active");

        var perno = struct_time["period"];
        if (struct_time.kickofftgl == 1) {
            tbl_period["Rotações"][perno][selIdx] += 1;
            tbl_period["Rotações"][0][selIdx] += 1;

            // Log entrance
            logSub(timeMain, timePlay, -1, "", p.pno, p.nlast, "entrada (pós-expulsão)");
            updateAnalysisTable();
        }

        updateLiveVis();
        updateLiveButtons();
        updateAnlUITable();
    };
}

// --- TEAM PRESETS SYSTEM ---
const PRESETS_KEY = 'futsal_team_presets';

function initPresetsUI() {
    const select = document.getElementById('preset-list');
    const btnSave = document.getElementById('btn-save-preset');
    const btnLoad = document.getElementById('btn-load-preset');
    const btnDelete = document.getElementById('btn-delete-preset');

    if (!select || !btnSave) return;

    select.innerHTML = '<option value="">Selecionar...</option>';
    const presets = JSON.parse(localStorage.getItem(PRESETS_KEY) || '{}');
    Object.keys(presets).sort().forEach(name => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });

    // Attach listeners once
    if (!btnSave.onclickSet) {
        btnSave.onclick = savePreset;
        btnSave.onclickSet = true;
    }
    if (!btnLoad.onclickSet) {
        btnLoad.onclick = () => {
            const name = select.value;
            if (name) loadPreset(name);
            else alert("Selecione uma predefinição na lista.");
        };
        btnLoad.onclickSet = true;
    }
    if (!btnDelete.onclickSet) {
        btnDelete.onclick = () => {
            const name = select.value;
            if (name) deletePreset(name);
            else alert("Selecione uma predefinição para apagar.");
        };
        btnDelete.onclickSet = true;
    }
}

function savePreset() {
    const nameInput = document.getElementById('preset-name');
    const name = nameInput.value.trim();
    if (!name) {
        alert("Introduza um nome para a predefinição.");
        return;
    }

    const presets = JSON.parse(localStorage.getItem(PRESETS_KEY) || '{}');
    if (presets[name] && !confirm("Já existe uma equipa com este nome. Pretende substituir?")) return;

    const teamData = struct_team.players.map(p => ({
        pno: p.pno,
        nfirst: p.nfirst,
        nlast: p.nlast,
        position: p.position,
        isLivre: p.isLivre
    }));

    presets[name] = teamData;
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));

    nameInput.value = "";
    initPresetsUI();
    alert("Equipa '" + name + "' salva com sucesso!");
}

function loadPreset(name) {
    const presets = JSON.parse(localStorage.getItem(PRESETS_KEY) || '{}');
    const teamData = presets[name];
    if (!teamData) return;

    if (!confirm("Carregar a equipa '" + name + "'? Isto irá substituir os dados atuais.")) return;

    for (let i = 0; i < struct_team.players.length; i++) {
        if (teamData[i]) {
            struct_team.players[i].pno = teamData[i].pno;
            struct_team.players[i].nfirst = teamData[i].nfirst;
            struct_team.players[i].nlast = teamData[i].nlast;
            struct_team.players[i].position = teamData[i].position;
            struct_team.players[i].isLivre = !!teamData[i].isLivre;
            struct_team.players[i].active = 0; // Reset active state on load
        }
    }

    // Force default active players (usually first 5)
    for (let i = 0; i < 16; i++) {
        const el = document.getElementById("play" + (i + 1));
        if (i < 5 && struct_team.players[i]) {
            struct_team.players[i].active = 1;
            if (el) el.classList.add("active");
        } else {
            if (struct_team.players[i]) struct_team.players[i].active = 0;
            if (el) el.classList.remove("active");
        }
    }

    updateLiveVis();
    updateLiveButtons();
    updateAnlUITable();
    alert("Equipa '" + name + "' carregada!");
}

function deletePreset(name) {
    if (!confirm("Tem a certeza que pretende apagar a predefinição '" + name + "'?")) return;
    const presets = JSON.parse(localStorage.getItem(PRESETS_KEY) || '{}');
    delete presets[name];
    localStorage.setItem(PRESETS_KEY, JSON.stringify(presets));
    initPresetsUI();
}

function initEditableListeners() {
    for (let i = 0; i < struct_team.players.length; i++) {
        const pIdx = i + 1;
        const elNo = document.getElementById('no' + pIdx);
        const elPos = document.getElementById('pos' + pIdx);
        const elName = document.getElementById('name' + pIdx);

        if (elNo) {
            elNo.addEventListener('input', () => {
                let val = elNo.innerText.replace('.', '').trim();
                struct_team.players[i].pno = parseInt(val) || 0;
            });
            elNo.addEventListener('click', (e) => e.stopPropagation());
        }
        if (elPos) {
            elPos.addEventListener('input', () => {
                struct_team.players[i].position = elPos.innerText.trim().toUpperCase();
            });
            elPos.addEventListener('click', (e) => e.stopPropagation());
        }
        if (elName) {
            elName.addEventListener('input', () => {
                let full = elName.innerText.trim();
                let parts = full.split(' ');
                if (parts.length > 1) {
                    struct_team.players[i].nfirst = parts[0];
                    struct_team.players[i].nlast = parts.slice(1).join(' ');
                } else {
                    struct_team.players[i].nfirst = "";
                    struct_team.players[i].nlast = full;
                }
            });
            elName.addEventListener('click', (e) => e.stopPropagation());
        }
    }
}

// Re-init presets on window load to ensure DOM is ready
window.addEventListener('load', () => {
    initPresetsUI();
    initEditableListeners();
});
// Also call it immediately in case script is deferred
initPresetsUI();
initEditableListeners();
