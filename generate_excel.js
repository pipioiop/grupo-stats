const XLSX = require('xlsx');

// 1. Define Data
const matchInfo = [
    ["Home Team", "Nun'Álvares"],
    ["Home Display", "SL"],
    ["Away Team", "Nun'Álvares"],
    ["Away Display", "GNA"],
    ["Team Analyzed", "Nun'Álvares"],
    ["Match Date", "2025 12 13"],
    ["Competition", "LP"],
    ["Stage", "J10"],
    ["Location", "Pav. José Natário"],
    ["Kick Off Time", "18h:00"]
];

const players = [
    [1, 20, "a", "JÚLIA", "GR"],
    [2, 92, "a", "CAMILA", "FX"],
    [3, 11, "a", "JANA", "ALA"],
    [4, 70, "a", "KAKÁ", "ALA"],
    [5, 5, "a", "LÍDIA", "PV"],
    [6, 13, "a", "DINHA", "ALA"],
    [7, 21, "a", "INÊS", "PV"],
    [8, 9, "a", "FONSECA", "ALA/PV"],
    [9, 85, "a", "MARTINHA", "ALA/PV"],
    [10, 19, "a", "ANA", "ALA"],
    [11, 73, "a", "BELINHA", "GR"],
    [12, 15, "a", "JOANA", "GR"],
    [13, 1, "a", "ODETE", "FX/ALA"],
    [14, 8, "a", "LOIRA", "FIXO"],
    [15, 61, "a", "JOGA", "N/C"],
    [16, 62, "a", "JOGA", "N/C"]
];

// 2. Create Sheet Data
// Initialize with match info
const ws_data = [];
matchInfo.forEach(row => ws_data.push(row));

// Add empty rows to reach row 13 (index 12) for headers
while (ws_data.length < 12) {
    ws_data.push([]);
}

// Add headers at row 13
ws_data.push(["Number", "Player Number", "First Name", "Last Name (Display)", "Position"]);

// Add player data
players.forEach(player => ws_data.push(player));

// 3. Create Workbook and Worksheet
const wb = XLSX.utils.book_new();
const ws = XLSX.utils.aoa_to_sheet(ws_data);

// Append worksheet to workbook
XLSX.utils.book_append_sheet(wb, ws, "Team Template");

// 4. Write File
XLSX.writeFile(wb, "exemplo_equipa.xlsx");

console.log("exemplo_equipa.xlsx created successfully.");
