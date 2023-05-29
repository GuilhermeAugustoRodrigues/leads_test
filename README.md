# Leads2b Fullstack challenge

## Como você adicionaria um email de notificação para os usuários sempre que um colaborador for inserido ou  atualizado com competências que são aderentes a um projeto existente na base?

Criaria uma classe para lidar com envio de e-mails que implementaria a biblioteca NodeMailer por ser uma biblioteca popular e simples.
Nessa classe teria o método para envio de e-mail que seria chamado no backend, tanto na criação quanto na atualização dentro de EmployeeSkillController caso a competência em questão fosse relevante a algum projeto.
No e-mail eu informaria o nome do colaborador, o projeto e a competência adicionada.

## Como você faria o deploy desta aplicação?

Utilizaria o Docker Swarm por ser uma solução do Docker, mais fácil de configurar e usar pois usa conceitos semelhantes aos do Docker Compose, por ser um casos de uso mais simples.
Oferece uma abordagem simples e direta para a orquestração de containers.

> Adicionar a formulário para criar novos colaboradores ✓

> Criar endpoint para excluir um colaborador do banco de dados ✓

## Problemas encontrados

### Back-end

Falta de padrão, como por exemplo:<br>Alguns lugares usam:
```js
// app/server/src/controllers/AuthController.js

if (!identification || !password) {
    return res.forbidden('Credenciais não informadas');
}
```

Enquanto outros usam:
```js
// app/server/src/controllers/AuthController.js
if (!user) { return res.forbidden('Esta conta não existe.'); }
```

Trechos de código de alta complexidade o que pode dificultar a leitura e correções necessárias.<br>
Recomendo a utilização de uma extensão como CodeMetrics.

Criaria uma classe HelperController onde ficariam os métodos comuns para minimizar a duplicidade de código entre as controllers.

### Front-end

Sugiro a criação de componentes para trechos de código repetidos, como ProjectCreate e ProjectEdit. Com isso em mente criei os componentes BaseIndex, BaseForm que foram utilizados nos respectivos componentes para redução de duplicidade.

Existem vários problemas de responsividade nas telas.

### Ambos

Muitas mensagens hard-coded. Por exemplo:

```js
// app/server/src/controllers/AuthController.js

if (!identification || !password) {
    return res.forbidden('Credenciais não informadas');
}
```

Recomendo a utilização de alguma biblioteca como a `i18n-node` para o back-end e `vue-i18n` para o front-end.

Uso desnecessário de `let`, o que vai contra as melhores práticas.