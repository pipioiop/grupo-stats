@echo off
echo A Iniciar Futsal Stats...
echo Por favor nao feche esta janela enquanto usar a aplicacao.
start "" "http://localhost:8080"
call npx http-server -c-1 .
pause
