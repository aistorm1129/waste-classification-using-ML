# Documentação do Back-end do Aplicativo BrazRecicla - Classificação de Resíduos Baseado em Machine Learning

## 1. Introdução

Este projeto é uma API REST desenvolvida com **FastAPI** para classificar imagens de resíduos (vidro, metal, papel, plástico) usando rede neural convolucional e para gerenciar os feedbacks sobre as classificações feitas pelos dos usuários. A API foi projetada para ser modular, separando a lógica de classificação e feedback em diferentes rotas e conectando a um banco de dados **Supabase**.

## 2. Tecnologias Utilizadas

- **FastAPI**: Framework web para construir APIs rápidas e eficientes.
- **PyTorch**: Biblioteca de machine learning utilizada para a rede neural convolucional.
- **psycopg2**: Biblioteca para conexão com PostgreSQL (usada para conectar ao Supabase).
- **Supabase**: Banco de dados PostgreSQL na nuvem para armazenar feedbacks.
- **Railway**: Plataforma de hospedagem para a API.
- **Pillow**: Biblioteca para manipulação de imagens.
- **Uvicorn**: Servidor ASGI para rodar o FastAPI.

## 3. Instalação

Para rodar o projeto localmente, siga os passos abaixo:

1. Clone o repositório:  
   `git clone <https://github.com/camiwr/brazRecicla-back-end.git>`  
   `cd <nome-do-repositório>`
   
2. Instale as dependências:  
  `pip install -r requirements.txt`

3. Configure as variáveis de ambiente para a conexão com o Supabase no arquivo .env:  
  `SUPABASE_HOST=your-supabase-host`  
  `SUPABASE_DB=your-database-name`  
  `SUPABASE_USER=your-database-user`  
  `SUPABASE_PASSWORD=your-database-password`  

4. Execute a aplicação:  
   `uvicorn app:app --reload`

## 4. Rotas da API
### 4.1 Rota de Classificação de Imagem
* Endpoint: `/classify/`  
* Método: `POST`
* Descrição: Recebe uma imagem, processa-a com uma rede neural convolucional e o modelo treinado, e retorna a classe do resíduo (vidro, metal, papel, ou plástico).

Exemplo de Requisição:  
`curl -X POST "http://localhost:8000/classify/" -F "file=@path/to/your/image.jpg"` 

Exemplo de Resposta:  
`{
    "class": "vidro"
}`

### 4.2 Rota de Envio de Feedbacks
* Endpoint: `/feedbacks/`  
* Método: `POST` 
* Descrição: Envia um feedback com o nome do usuário, avaliação (1 a 5), comentário e a classe predita pela classificação da imagem.

Exemplo de Requisição:  
`curl -X POST "http://localhost:8000/feedbacks/" -H "Content-Type: application/json" -d '{
    "user_name": "João",
    "rating": 5,
    "comment": "Classificação excelente!",
    "class_predicted": "vidro"
}'` 

Exemplo de Resposta:  
`{
    "message": "Feedback enviado com sucesso!"
}`

### 4.3 Rota de Listagem de Feedbacks
* Endpoint: `/feedbacks/`  
* Método: `GET` 
* Descrição: Retorna todos os feedbacks armazenados no banco de dados.

Exemplo de Requisição:  
`curl -X GET "http://localhost:8000/feedbacks/"` 

Exemplo de Resposta:  
`[
    {
        "id": 1,
        "user_name": "João",
        "rating": 5,
        "comment": "Classificação excelente!",
        "class_predicted": "vidro",
        "created_at": "2024-10-10"
    }
]`

## 5. Conexão com o Banco de Dados

O banco de dados utilizado neste projeto é o **Supabase**, que é uma plataforma de backend como serviço (BaaS) baseada em PostgreSQL. Ele oferece um banco de dados escalável e seguro na nuvem, compatível com o PostgreSQL tradicional, permitindo a interação com queries SQL.

A conexão entre a API FastAPI e o banco de dados **Supabase** é realizada usando a biblioteca **psycopg2**, que é um adaptador popular para PostgreSQL em Python. Ele permite que você execute queries SQL diretamente a partir do seu código Python.

### 5.1 Configuração do Supabase

Primeiro, você precisará configurar um projeto no Supabase e obter as credenciais do banco de dados, incluindo:

- **Host**: O endereço do banco de dados fornecido pelo Supabase.
- **Database Name**: O nome do banco de dados que você criou no Supabase.
- **User**: O usuário do banco de dados (geralmente, o padrão é `postgres`).
- **Password**: A senha associada ao usuário do banco de dados.
- **Port**: O número da porta PostgreSQL (geralmente, 5432).

Essas informações podem ser obtidas no painel do Supabase em "Settings" > "Database" > "Connection String".

### 5.2 Configuração da Conexão com o Supabase

No arquivo `database.py`, a função `get_db_connection()` estabelece a conexão com o banco de dados Supabase utilizando o `psycopg2`. Esta função será chamada em diferentes partes da aplicação para criar e fechar a conexão com o banco de dados.

```python
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    conn = psycopg2.connect(
        host="your-supabase-host",        # O host do Supabase
        database="your-database-name",    # Nome do banco de dados
        user="your-database-user",        # Usuário do banco de dados
        password="your-database-password",# Senha do banco de dados
        port="5432",                      # Porta do PostgreSQL
        cursor_factory=RealDictCursor     # Retornar resultados como dicionários
    )
    return conn
```

### 5.3 Armazenamento de Feedbacks no Supabase
Os feedbacks são armazenados na tabela feedbacks do banco de dados Supabase. A estrutura da tabela inclui ps campos user_name, rating, comment, class_predicted e created_at, os mesmo que o usuario informa mais a data e um id unico para cada feedback.

## 6. Hospedagem no Railway
A API foi hospedada no Railway, uma plataforma simples e eficaz para implantar aplicativos. O arquivo Procfile é usado para configurar o deploy da aplicação:  
Exemplo de Procfile:  
`web: uvicorn app:app --host 0.0.0.0 --port $PORT`

## 7. Exemplos de Uso
* Classificação de Imagem: Envie uma imagem e receba a classe do resíduo.
* Envio de Feedback: Envie feedbacks sobre a classificação e armazene no banco de dados.
* Listagem de Feedbacks: Veja todos os feedbacks enviados para o sistema.

## 8. Referências

Aqui estão as documentações e fontes úteis utilizadas no desenvolvimento deste projeto:  

- [FastAPI Documentation:](https://fastapi.tiangolo.com/)  
  
  A documentação oficial do FastAPI, que cobre desde a instalação e configuração até exemplos avançados de uso. Também inclui boas práticas para criar APIs rápidas e eficientes.

- [Supabase Documentation:](https://supabase.io/docs)
  
  Documentação oficial do Supabase, com guias sobre como configurar um banco de dados, interagir com PostgreSQL, criar tabelas, e utilizar a autenticação e armazenamento oferecidos pelo Supabase.

- [PyTorch Documentation:](https://pytorch.org/docs/stable/index.html)
  
  Documentação oficial do PyTorch, abordando o uso da biblioteca para construir redes neurais, treinar modelos, e realizar inferências. Inclui exemplos práticos e tutoriais para iniciantes e usuários avançados.

- [Railway Documentation:](https://railway.app/docs)
  
  Documentação do Railway, uma plataforma de hospedagem que permite o deploy rápido e fácil de aplicações. Cobre a criação de serviços, configuração de variáveis de ambiente, e como conectar um projeto a um banco de dados.

- [Pillow Documentation:](https://pillow.readthedocs.io/en/stable/)
  
  Documentação da biblioteca Pillow, usada para manipulação de imagens no Python. Contém instruções para instalação e exemplos de como abrir, salvar e processar imagens.

- [psycopg2 Documentation:](https://www.psycopg.org/docs/)
  
  Documentação oficial do `psycopg2`, o adaptador mais popular para conectar o Python ao PostgreSQL. Cobre como configurar conexões, realizar consultas e transações de forma segura e eficiente.





