const fs = require('fs');
fs.copyFile('Template_Jogo_Futsal.xlsx', 'Template_Equipa_Adversaria.xlsx', (err) => {
    if (err) throw err;
    console.log('Template_Equipa_Adversaria.xlsx created');
});
