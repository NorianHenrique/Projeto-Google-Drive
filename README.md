# Projeto Google Drive (Clone Simplificado)

Este projeto é um clone simplificado da interface e funcionalidades básicas do Google Drive, desenvolvido com React. Ele permite que os usuários façam login com suas contas Google e gerenciem seus arquivos, incluindo upload e visualização.

## 🚀 Tecnologias Utilizadas

* **Frontend**: React (JavaScript)
    * `react`: ^18.2.0
    * `react-dom`: ^18.2.0
    * `react-router-dom`: ^6.3.0
    * `react-icons`: ^4.4.0 (utilizado para ícones como pastas e download)
* **Backend/Autenticação/Armazenamento**: Firebase
    * `firebase`: ^8.2.2 (para Firestore, Authentication e Storage)

## Funcionalidades

* **Autenticação Google**: Os usuários podem fazer login usando suas contas Google.
* **Upload de Arquivos**: Capacidade de fazer upload de arquivos para o armazenamento do Firebase.
* **Visualização de Arquivos**: Exibe uma lista dos arquivos armazenados pelo usuário.
* **Classificação Visual de Arquivos**: Diferencia visualmente arquivos de vídeo (`video/mp4`) e imagens (`imagem/png`) ao exibir ícones específicos. Outros tipos de arquivo usam um ícone de download genérico.
* **Download de Arquivos**: Links diretos para o download dos arquivos armazenados.
* **Desconexão**: Opção para o usuário sair da sua conta.
