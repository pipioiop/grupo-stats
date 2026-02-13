const XLSX = require('xlsx');

// Função para criar o workbook
function createTemplate(filename, isHome) {
    const matchInfo = [
        ["Data", "AAAA-MM-DD"],
        ["Local", "Escreva o Local"],
        ["Competicao", "Nome da Competição"],
        ["Jornada", "Fase Regular"],
        ["Hora", "HH:MM"],
        ["Equipa Casa", "Nome da Equipa Casa"],
        ["Equipa Adversaria", "Nome da Equipa Adversária"],
        ["Sigla Casa", "Sigla Casa (ex: SLB)"],
        ["Sigla Adversaria", "Sigla Adv (ex: SCP)"],
        ["Equipa Analisada", isHome ? "Nome da Equipa Casa" : "Nome da Equipa Adversária"]
    ];

    // Players
    const players = [
        [1, 1, "Nome", "Apelido", "GR"],
        [2, 2, "Nome", "Apelido", "FIXO"],
        [3, 3, "Nome", "Apelido", "ALA"],
        [4, 4, "Nome", "Apelido", "ALA"],
        [5, 5, "Nome", "Apelido", "PIVOT"],
        [6, 6, "Nome", "Apelido", "PIVOT"],
        [7, 7, "Nome", "Apelido", "ALA"],
        [8, 8, "Nome", "Apelido", "ALA"],
        [9, 12, "Nome", "Apelido", "GR"],
        [10, 10, "Nome", "Apelido", "ALA"],
        [11, 11, "Nome", "Apelido", "ALA"],
        [12, 13, "Nome", "Apelido", "FIXO"],
        [13, 14, "Nome", "Apelido", "PIVOT"],
        [14, 15, "Nome", "Apelido", "ALA"],
        [15, 16, "Nome", "Apelido", "ALA"],
        [16, 17, "Nome", "Apelido", "FIXO"]
    ];

    const ws_data = [];
    matchInfo.forEach(row => ws_data.push(row));
    while (ws_data.length < 12) {
        ws_data.push([]);
    }
    ws_data.push(["Player ID", "Number", "First Name", "Last Name", "Position"]);
    players.forEach(p => ws_data.push(p));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    XLSX.utils.book_append_sheet(wb, ws, "Setup");
    XLSX.writeFile(wb, filename);
    console.log(`${filename} created successfully.`);
}

createTemplate("Template_Equipa_Casa.xlsx", true);
createTemplate("Template_Equipa_Visitante.xlsx", false);
