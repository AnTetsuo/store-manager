<h1 align="left">Store Manager</h1>

###

<p align="left">API RESTful desenvolvida com express e mysql2 no módulo de Backend da Trybe.</p>

###

<h2 align="left">Sobre a Aplicação</h2>

###

<p>
Utilizando uma arquitetura em camadas (Model, Service e Controller) a aplicação realiza cadastro, consulta e edição de produtos e vendas. Abaixo um pequeno resumo de cada rota e endpoint desenvolvido nesse repositório
</p>


<details>
<summary>🐳 Rodando a aplicação com Docker </summary><br />


Clone o projeto, entre na raiz da aplicação e execute o comando 

```
docker-compose up -d
```

e a aplicação estará ouvindo na porta local 3001 no container `backend`, e o banco de dados MySQL estará exposto na porta 3306.

O seu docker-compose precisa estar na versão 1.29 ou superior.

</details>

## Rota Products
<details>
<summary><strong> GET /products</strong></summary><br />
Esse endpoint é responsável por retornar a lista de produtos cadastrados no serviço store_manager_db
<br />

+ cURL
    ```bash
    curl --request GET \
      --url 'http://localhost:3001/products'
    ```
+ RESPONSE:
    ```json
    [
      {
        "id": 1,
        "name": "Martelo de Thor"
      },
      {
        "id": 2,
        "name": "Traje de encolhimento"
      },
      {
        "id": 3,
        "name": "Escudo do CapitÃ£o AmÃ©rica"
      },
    ]
    ```
</details>

<details>
<summary><strong> GET /products/search</strong></summary><br />
Esse endpoint é responsável por retornar uma lista de produtos que incluam o termo de pesquisa passado como parâmetro "q" da requisição cadastrados no serviço store_manager_db

<br />

+ cURL

    ```bash
    curl --request GET \
      --url 'http://localhost:3001/products/search?q=Traje'
    ```

+ RESPONSE
  + Caso tenha algum match do termo com o campo `name`

    ```json
    [
      {
        "id": 2,
        "name": "Traje de encolhimento"
      }
    ]
    ```

  + Caso não tenha algum match do termo com o campo `name`

    ```json
    []
    ```

</details>

<details>
<summary><strong> GET /products/search/:id</strong></summary><br />
Esse endpoint é responsável por realizar uma pesquisa pelo id do produto no serviço store_manager_db

<br />

+ cURL

    ```bash
    curl --request GET \
      --url 'http://localhost:3001/products/1'
    ```

+ RESPONSE

    ```json
    {
      "id": 1,
      "name": "Martelo de Thor"
    }
    ```

+ ERRORS

    ```json
    {
      "message": "Product not found"
    }
    ```

</details>

<details>
<summary><strong>POST /products</strong></summary><br />
Esse endpoint é responsável por cadastrar um produto no store_manager_db

<br />

+ O Corpo da requisição deve conter a propriedade `name` com pelo menos 5 caracteres.

    ```json
    {
      "name": "Rounded Shield"
    }
    ```

+ cURL

    ```bash
    curl --request POST \
      --url http://localhost:3001/products \
      --header 'Content-Type: application/json' \
      --data '{
      "name": "Rounded Shield"
        }'
    ```

+ RESPONSE

    ```json
    {
      "id": 4,
      "name": "Rounded Shield"
    }
    ```
+ ERRORS
    + Caso a propriedade `name` não esteja presente no corpo da requisição

    ```json
    {
      "message": "\"name\" is required"
    }
    ```
    + Caso `name` não possua pelo menos 5 caracteres
    ```json
    {
      "message": "\"name\" length must be at least 5 characters long"
    }
    ```
</details>

<details>
<summary><strong>PUT /products/:id</strong></summary><br />
Esse endpoint é responsável por editar um produto já cadastrado no store_manager_db

<br />

+ O Corpo da requisição deve conter a propriedade `name` com pelo menos 5 caracteres.

  ```json
  {
    "name": "Square Shield"
  }
  ```

+ cURL

  ```bash
  curl --request PUT \
    --url http://localhost:3001/products/3 \
    --header 'Content-Type: application/json' \
    --data '{
    "name": "Square Shield"
    }'
  ```

+ RESPONSE

  ```json
  {
    "id": 3,
    "name": "Square Shield"
  }
  ```

+ ERRORS

    + Caso a propriedade `name` não esteja presente na requisição

    ```json
    {
      "message": "\"name\" is required"
    }
    ```
    + Caso `name` não possua pelo menos 5 caracteres
    ```json
    {
      "message": "\"name\" length must be at least 5 characters long"
    }
    ```
    + Caso o id do produto não seja encontrado no store_manager_db

    ```json
    {
      "message": "Product not found"
    }
    ```
</details>

<details>
<summary><strong>DELETE /products/:id</strong></summary><br />
Esse endpoint é responsável por deletar um produto já cadastrado no store_manager_db

<br />


+ Este endpoint não retorna uma resposta, porém indica que a operação foi bem sucedida com status 204

+ cURL

```bash
curl --request DELETE \
  --url 'http://localhost:3001/products/3' 
```

+ ERRORS

    + Caso o id do produto não seja encontrado no store_manager_db

    ```json
    {
      "message": "Product not found"
    }
    ```
</details>

## Rota Sales
<details>
<summary><strong> GET /sales</strong></summary><br />
Esse endpoint é responsável por retornar a lista de pedidos cadastrados no serviço store_manager_db

<br />

+ cURL

    ```bash
    curl --request GET \
      --url 'http://localhost:3001/sales'
    ```

+ RESPONSE

    ```json
    [
      {
        "saleId": 1,
        "productId": 1,
        "quantity": 5,
        "date": "2023-07-26T18:17:27.000Z"
      },
      {
        "saleId": 1,
        "productId": 2,
        "quantity": 10,
        "date": "2023-07-26T18:17:27.000Z"
      }
    ]
    ```

</details>

<details>
<summary><strong> GET /sales/:id</strong></summary><br />
Esse endpoint é responsável por buscar um pedido por id no serviço store_manager_db

<br />

+ cURL

    ```bash
    curl --request GET \
      --url 'http://localhost:3001/sales/1'
    ```

+ RESPONSE

    ```json
    [
      {
        "productId": 1,
        "quantity": 5,
        "date": "2023-07-26T18:17:27.000Z"
      },
      {
        "productId": 2,
        "quantity": 10,
        "date": "2023-07-26T18:17:27.000Z"
      }
    ]
    ```

</details>

<details>
<summary><strong>POST sales/</strong></summary><br />
Esse endpoint é responsável por cadastrar um pedido por id no serviço store_manager_db,
registrando a relação de produto e quantidade com o id do pedido

<br />

+ Exemplo do corpo da requisição

    ```json
    [
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]
    ```

+ cURL

    ```bash
    curl --request POST \
      --url http://localhost:3001/sales \
      --header 'Content-Type: application/json' \
      --data '[
      {
        "productId": 1,
        "quantity": 1
      },
      {
        "productId": 2,
        "quantity": 5
      }
    ]'
    ```

+ RESPONSE
    ```json
    {
      "id": 3,
      "itemsSold": [
        {
          "productId": 1,
          "quantity": 1
        },
        {
          "productId": 2,
          "quantity": 5
        }
      ]
    }
    ```

+ ERRORS
    + Caso algum produto não possua a chave obrigatória como `productId`, ou `quantity`

    ```json
    {"message": "\"quantity\" is required"}
    ```

    ```json
    {"message": "\"productId\" is required"}
    ```

    + Caso algum `productId` não esteja registrado no store_manager_db
    ```json
    {"message": "Product not found"}
    ```

    + Caso `quantity` seja um número igual ou menor a zero
    ```json
    {"message": "\"quantity\" must be greater than or equal to 1"}
    ```

</details>

<details>
<summary><strong>PUT sales/:saleId/products/:productId/quantity</strong></summary><br />
Esse endpoint é responsável por alterar a quantidade de um produto em um pedido já registrado

<br />

+ Exemplo do corpo da requisição

    ```json
    {
      "quantity": 20
    }
    ```

+ cURL

    ```bash
    curl --request PUT \
      --url http://localhost:3001/sales/1/products/1/quantity \
      --header 'Content-Type: application/json' \
      --data '{
      "quantity": 20
      }'
    ```

+ RESPONSE

    ```json
    {
      "productId": 1,
      "quantity": 2,
      "date": "2023-07-26T18:17:27.000Z",
      "saleId": 1
    }
    ```

+ ERRORS
    + Caso algum produto não possua a chave obrigatória `quantity`

    ```json
    {"message": "\"quantity\" is required"}
    ```

    + Caso `quantity` seja um número igual ou menor a zero
    ```json
    {"message": "\"quantity\" must be greater than or equal to 1"}
    ```

    + Caso algum `productId` não esteja registrado no store_manager_db
    ```json
    {"message": "Product not found"}
    ```

</details>

<details>
<summary><strong>DELETE  /sales/:id</strong></summary><br />
Esse endpoint é responsável por deletar um pedido já cadastrado no store_manager_db

<br />


+ RESPONSE: Este endpoint não retorna uma resposta, porém indica que a operação foi bem sucedida com status 204

+ cURL

```bash
curl --request DELETE \
  --url 'http://localhost:3001/sales/7'
```

+ ERRORS

    + Caso o id do pedido não seja encontrado no store_manager_db

    ```json
    {
      "message": "Product not found"
    }
    ```
</details>

## Desenvolvido com

###

<div align="left">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" height="40" alt="javascript logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" height="40" alt="nodejs logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" height="40" alt="express logo"  />
  <img width="12" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" height="40" alt="mysql logo"  />
  <img width="12">
</div>

###

###

<p align="center">
<font size=2>
Importante! Os arquivos de minha autoria estão nos diretórios <code>./backend/src</code> e <code> ./backend/tests</code> outros arquivos, como os responsáveis pela migrations e seeders do serviço store_manager_db que estão no diretório <code>./sql</code> são de autoria da Trybe
</font size=2>
</p>
