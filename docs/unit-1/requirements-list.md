# Lista de Requisitos Inicial

## Histórico de revisão
| Data       | Autor                                        | Modificações                      | Versão |
| ---------- | -------------------------------------------- | --------------------------------- | ------ |
| 11/02/2022 | [Luís Lins](https://github.com/luisgaboardi), [Lais Portela](https://github.com/laispa), [Ana Julia](https://github.com/aluzianobriceno), [Lara Murussi](https://github.com/klmurussi) | Adiciona primeira versão da lista de requisitos do Produto | 1.0 |
| 18/02/2022 | [Kathlyn Lara](https://github.com/klmurussi) | Padrão ABNT nas referências | 1.1 |

## Requisitos Funcionais

### O cliente deve conseguir se cadastrar no site da pousada 

- O cliente deve ser cadastrar no site, no qual deve dar o nome, data de nascimento, e-mail, senha, cpf, endereço e número de contato; 

- O cliente deve ser capaz de gerir as suas formas de pagamento 

- O cliente deve conseguir fazer login com a conta criada anteriormente; 

- O cliente deve conseguir editar os seus dados ou apagar a sua conta; 

- O cliente deve ser capaz de recuperar a sua senha através do e-mail. 

 

### O cliente deve conseguir cadastrar os seus pets 

- O cliente deve ser de cadastrar os seus pets, no qual o cliente deve registrar nome, raça, idade, sexo, foto, período de hospedagem e condições especiais do seu pet; 

- O cliente deve ser capaz de editar os dados do seu pet ou apagá-lo do site; 

- O cliente poderá ter acesso ao status dos animais; 

- O cliente poderá ter acesso as câmeras através do site; 

- O cliente poderá definir o dia de hospedagem do pet. 

 

### O administrador deve conseguir gerir funcionários e clientes  

- O administrador deve ser capaz de cadastrar funcionários, no qual ele deve registrar o e-mail, cpf, cargo do funcionário; 

- O administrador deve ser capaz de editar e apagar funcionários e clientes. 


###  O administrador deve conseguir alterar sua senha e atualizar os dados da sua conta (como e-mail e telefone) 

### O funcionário deve conseguir alterar sua senha e atualizar os dados da sua conta (como e-mail e telefone) 

- O funcionário pode gerir parte do sistema 

- O funcionário deve conseguir analisar e controlar o status dos pets hospedados na pousada; 

- O funcionário deve conseguir fornecer informações do status do animal ao cliente; 

 
### O administrador pode gerir todo o sistema 

- O administrador deve conseguir analisar e controlar o status dos pets hospedados na pousada; 

- O administrador deve conseguir descrever os serviços prestados pela pousada e seus respectivos preços no website para o cliente; 

- O administrador deve conseguir feedback informações do estado do animal ao cliente; 

- O administrador deve conseguir controlar as datas disponíveis para hospedagem; 

- O administrador deve conseguir informar se há espaço de convivência de animais; 

- O administrador deve ser capaz de controlar número de quartos e alas/seções habilitadas da pousada. 

### O sistema deve ser capaz de administrar a hospedagem dos pets 

- O sistema deve ser capaz de integrar as câmeras da pousada com o website para visualização do pet por parte do cliente; 

- O sistema deve impedir a hospedagens de pets de acordo com a disponibilidade da pousada, seja de data ou ocupação, sendo essa relacionada ou não ao tipo de animal; 


## Requisitos não-funcionais

### Requisito de segurança
- Deve ter segurança nas informações do cliente e da empresa (login); 

### Requisitos de Implementação
- O sistema deve ser feito no framework Angular e Django; 

- O sistema deve ser um site; 

- O sistema deve ser capaz de armazenar dados de forma persistente mediante o banco de dados SQLite; 

### Requisitos de Usabilidade
- O layout do sistema deve ser em português de fácil compreensão. 

## Referências Bibliográficas
1. MARSICANO, George. Requisitos de Software: Tipos e Característica de Requisitos. Brasília. 2021. Apresentação em PowerPoint. 36 slides, color, Material de aula do curso de Engenharia de Software da FGA/UNB. Disponível em: https://aprender3.unb.br/pluginfile.php/1624498/mod_resource/content/0/REQ_Aula%202.1%20-%20Introdu%C3%A7%C3%A3o%20a%20ER-atualizado.pdf. Acesso em: 18 fev 2022
2. SAFE 5 for Lean Enterprises. **SAFe**. 2021. Disponível em: https://www.scaledagileframework.com/. Acesso dia 11 de Fev de 2022.
