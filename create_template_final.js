const XLSX = require('xlsx');

function createLIVRESTemplate(filename) {
    const ws_data = [
        ["Data", "2024-02-08"],              // Row 1
        ["Hora", "21:00"],                   // Row 2
        ["Local", "Pavilhão GNA"],           // Row 3
        ["Competicao", "Campeonato Nacional"], // Row 4
        ["Jornada", "12"],                  // Row 5
        ["Equipa Casa", "GNA FAFE"],         // Row 6
        ["Equipa Adversaria", "ADVERSARIO"],  // Row 7
        ["Sigla Casa", "GNA"],               // Row 8
        ["Sigla Adversaria", "ADV"],         // Row 9
        ["Equipa Analisada", "GNA FAFE"],    // Row 10
        [],                                  // Row 11
        [],                                  // Row 12
        ["ID", "Número", "Primeiro Nome", "Último Nome", "Posição", "Unidade SUBSTITUÍR (X)"], // Row 13 (Header)
        // Jogadores começam na linha 14
        [1, "", "", "", "GR", ""],       // Row 14
        [2, "", "", "", "FIXO", ""],
        [3, "", "", "", "ALA", ""],
        [4, "", "", "", "ALA", ""],
        [5, "", "", "", "PIVOT", ""],
        [6, "", "", "", "ALA", ""],
        [7, "", "", "", "ALA", ""],
        [8, "", "", "", "ALA", ""],
        [9, "", "", "", "ALA", ""],
        [10, "", "", "", "ALA", ""],
        [11, "", "", "", "ALA", ""],
        [12, "", "", "", "GR", ""],
        [13, "", "", "", "FIXO", ""],
        [14, "", "", "", "PIVOT", ""],
        [15, "", "", "", "ALA", ""],
        [16, "", "", "", "ALA", ""]
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(ws_data);

    // Ajustar largura das colunas
    const wscols = [
        { wch: 10 }, // A: ID
        { wch: 10 }, // B: Número
        { wch: 20 }, // C: Nome
        { wch: 25 }, // D: Apelido
        { wch: 15 }, // E: Posição
        { wch: 25 }  // F: LIVRES
    ];
    ws['!cols'] = wscols;

    XLSX.utils.book_append_sheet(wb, ws, "Equipa");
    XLSX.writeFile(wb, filename);
    console.log(`Excel ${filename} criado com suporte a Unidade SUBSTITUÍR.`);
}

createLIVRESTemplate("MODELO_EQUIPA_LIVRES.xlsx");
