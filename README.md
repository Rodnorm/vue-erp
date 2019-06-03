# vue-erp

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```
Integrantes do grupo:

Bruna Sayuri
Luana Monteiro
Jonas Ribeiro
Rodrigo Normando

Disciplina: Aplicativos Integrados de processos empresariais
Docente: Alexandre Igosheff

Links da aplicação:

Respositório do Github: https://github.com/Rodnorm/vue-erp
Link do projeto online: https://rodnorm.github.io/vue-erp/

Passo 1 -

Ver Produtos: Mostra os produtos cadastrados no sistema.
Criar Pedido: Cria um pedido da atualização de estoque.
Trocar perfil: Simula a troca de perfil entre um usuário normal e um usuário com autorizações de administrador

Passo 2 - 
Botão ‘Ver produtos’ acionado: Uma tabela com os produtos cadastrados é exibida.
Botão ‘Esconder produtos’: esconde os produtos mostrados na  tabela.

Passo 3 - 
Tela de criação de pedidos: os campos são ‘nome’, ‘nome do produto’, ‘quantidade’ e ‘email’.
Ao preencher os dados e clicar em enviar um email é enviado para o administrador com uma notificação de nova requisição, para que este possa aprovar ou recusar.

Passo 4 - 
Tela com o perfil de administrador
Há uma lista com os pedidos já realizados
Há uma lista com os fornecedores

Na tabela de pedidos há as seguintes informações: ‘nome do produto’, ‘descrição’, ‘quantidade requerida’, ‘quantidade no estoque’, ‘origem do pedido’, ‘aprovado’.

Na tabela de fornecedores há as seguintes informações: ‘nome do fornecedor’, ‘contato’ e ‘produtos fornecidos’.

Caso alguma alteração na coluna ‘aprovado’ seja feita, é possível salvar as alterações e finalizar.

Passo 5 - 
Tela de histórico: Exibe de forma sucinta as informações das requisições já utilizadas.

Tecnologias utilizadas:
VueJs, Firebase e Sendgrid