# Nexus

Nexus é uma rede social simples desenvolvida com **HTML, CSS e JavaScript puro**, sem frameworks e sem back-end.

O projeto permite que o usuário crie uma conta, faça login, personalize seu perfil (foto, bio, música do dia) e navegue por um feed de posts com imagens, título, descrição e trechos de música. Toda a persistência de dados do usuário (conta, sessão e configurações de perfil) é feita através do **localStorage** do navegador.

## Índice

- [Funcionalidades](#funcionalidades)
- [Tema Claro/Escuro](#tema-claroescuro)
- [Tecnologias](#tecnologias)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Executar](#como-executar)
- [Limitações Conhecidas](#limitações-conhecidas)
- [Licença](#licença)
- [Autor](#autor)

## Funcionalidades

### Cadastro e Login
- Criação de conta de usuário
- Login com validação de credenciais
- Dados de cadastro (usuário/credenciais) armazenados no `localStorage`
- Sessão ativa do usuário logado também é persistida no `localStorage`

### Feed
- Exibição de posts com título, imagem e descrição
- Posts fixos (mock), pensados para simular um feed já povoado
- Suporte a **trechos de música** anexados a posts (ver seção abaixo)
- Modal de comentários por post

> ⚠️ O feed **não utiliza localStorage** para os posts. Novos posts criados pelo usuário são perdidos ao recarregar a página. Já as configurações de perfil (foto, bio, música do dia etc.) **são salvas** no `localStorage`.

### Perfil
- Edição de nome de usuário (@)
- Troca da foto de perfil
- Definição de uma **música do dia**, com título, autor e capa personalizados
- Edição de bio e "Trabalhos e competências"
- Configurações de segurança (autenticação em duas etapas, alertas de novo login, sessões ativas)
- Seleção de idioma (Português, English, Español)
- Todas as alterações são salvas no `localStorage` e persistem entre sessões

### Música nos posts
- Ao criar/editar um post é possível anexar um trecho de música
- Um modal permite selecionar o arquivo de áudio (upload)
- Após o upload, é possível **cortar/selecionar o trecho** desejado do áudio antes de anexá-lo ao post
- O post final exibe um player simples com o trecho escolhido

### Página Sobre (About)
- Informações institucionais sobre o Nexus, seus valores e propósito

## Tema Claro/Escuro

O Nexus conta com alternância de tema (claro/escuro), com a preferência do usuário salva no `localStorage` para persistir entre visitas.

> ⚠️ A troca de tema está disponível **apenas** nas páginas `index.html` e `about.html`. As demais páginas (`login`, `cadastro`, `feed`, `profile`) ainda não implementam essa alternância.

## Tecnologias

- **HTML5** — estruturação semântica e acessível das páginas
- **CSS3** — Flexbox, Grid, variáveis (`:root`), `clamp()` para responsividade fluida, media queries mobile-first
- **JavaScript** — manipulação de DOM, modais, upload/corte de áudio, lógica de autenticação
- **LocalStorage** — persistência de conta, sessão e configurações de perfil/tema

## Estrutura de Pastas

```
src/
├── assets/
│   ├── css/          # Uma folha de estilo por página (index.css, about.css,
│   │                 #  cadastro.css, login.css, feed.css, profile.css...)
│   │                 #  + global.css, usado apenas para transições de página
│   ├── img/           # Imagens, ícones e capas usadas nas páginas
│   ├── audio/          # Músicas pré-carregadas usadas nos posts do feed mock
│   └── js/             # Scripts (um por página + utilitários compartilhados)
├── pages/
│   ├── login.html
│   ├── cadastro.html
│   ├── feed.html
│   ├── about.html
│   └── profile.html
└── index.html           # Única página fora de pages/, ponto de entrada da aplicação
```

> **Observação sobre CSS:** cada folha de estilo de página é **totalmente independente** (contém seus próprios tokens de design em `:root`, resets e estilos base). O `global.css` é responsável **apenas** pelas transições entre páginas — nenhuma outra folha de estilo depende dele para funcionar.

## Como Executar

Como o projeto não possui back-end nem dependências, basta abrir o `index.html` em um navegador, ou servir a pasta com um servidor estático simples, por exemplo:

```bash
npx serve .
```

ou, com a extensão **Live Server** do VS Code, abrir `index.html` e clicar em "Go Live".

## Limitações Conhecidas

- Posts do feed **não persistem** entre recarregamentos de página (não usam `localStorage`)
- A alternância de tema claro/escuro só está implementada em `index.html` e `about.html`
- Não há back-end/banco de dados real: toda a "conta" do usuário existe apenas no `localStorage` do navegador utilizado, não sendo compartilhada entre dispositivos

## Licença

Este projeto está sob a licença **MIT**.

## Autor

Desenvolvido por **ArthurFreitasDev**.
