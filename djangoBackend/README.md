# Pousada Animal - Backend

## Execução do Backend Localmente

### Requisitos
* Python versão *3.8* ou superior
* Gerenciador de pacotes Python *pip*

### Instruções
1. No diretório do Backend denominado _djangoBackend_, instale as depedências do projeto constadas no arquivo _requirements.txt_ com o seguinte comando em um terminal:
```
python3 -m pip install -r requirements.txt
```

2. No mesmo local, faça uma cópia do arquivo chamado _.env.dist_ e renomeie a cópia para _.env_. Nele, preencha com as informações secretas do Django (Entre em contato com a equipe).

3. No terminal, gere as migrações pendentes do Django com o comando abaixo:
```
python3 manage.py makemigrations
```

4. Passe as migrações para o banco de dados SQLite com o comando:
```
python3 manage.py migrate
```

5. Execute o projeto:
```
python3 manage.py runserver
```

6. Você verá algo como apresentado abaixo, isso significa que o servidor está rodando corretamente. Caso queira acessar o "frontend" da API, acesse o link da mensagem abaixo em um navegador:
```
Watching for file changes with StatReloader
Performing system checks...

System check identified no issues (0 silenced).
March 03, 2022 - 13:40:01
Django version 4.0.3, using settings 'djangoBackend.settings'
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```