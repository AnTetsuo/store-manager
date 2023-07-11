<h1 align="left">Store Manager</h1>

###

<p align="left">API RESTful desenvolvida com express e mysql2 no módulo de Backend da Trybe.</p>

###

<h2 align="left">Sobre a Aplicação</h2>

###

<p>
Utilizando uma arquitetura em camadas (Model, Service e Controller) a aplicação realiza cadastro, consulta e edição de produtos e vendas. Abaixo um pequeno resumo de cada rota e endpoint desenvolvido nesse repositório
</p>



+ <h3> Rota Products </h3>
    <details>
    <summary>
    <strong> GET /products</strong>
    </summary>
    <font size=2>
      Esse endpoint é responsável por retornar a lista de produtos cadastrados no serviço store_manager_db
    </font size=2>
    </details>

    <details>
    <summary>
    <strong> GET /products/search </strong>
    </summary>
    <font size=2>
      Esse endpoint é responsável por fazer uma busca passada por parâmetro da requisição
    </font size=2>
    </details>
    
    <details>
    <summary>
    <strong>GET /products/search/:id</strong>
    </summary>
    <font size=2>
      Esse endpoint é responsável por fazer uma busca com o id passado pela URL da requisição
    </font size=2>
    </details>

    <details>
    <summary><strong>POST /products</strong></summary>
    <font size=2>
      Esse endpoint é responsável por validar e realizar o cadastro de novos produtos no serviço store_manager_db.
    </font size=2>
    </details>

    <details>
    <summary>
    <strong>PUT /products/:id</strong>
    </summary>
    <font size=2>
      Esse endpoint é responsável por validar e atualizar um produto no serviço store_manager_db.
    </font size=2>
    </details>
    
    <details>
    <summary>
    <strong>DELETE /products/:Id</strong>
    </summary>
    <font size=2>
      Esse endpoint é responsável por remover um produto já cadastrado no serviço store_manager_db.
    </font size=2>
    </details>

+ <h3> Rota Sales </h3>
    <details>
    <summary>
    <strong> GET /sales</strong>
    </summary>
      <font size=2>
      Esse endpoint é responsável por retornar a lista de vendas cadastradas no serviço store_manager_db.
      </font size=2>
    </details>

    <details>
    <summary>
    <strong> GET /sales/:id</strong>
    </summary>
      <font size=2>
      Esse endpoint é responsável por retornar uma venda cadastrada no serviço store_manager_db pelo seu id.
      </font size=2>
    </details>

    <details>
    <summary>
    <strong> POST /sales</strong>
    </summary>
      <font size=2>
      Esse endpoint é responsável por cadastrar uma venda no serviço store_manager_db bem como a associação dos produtos dentro dessa venda. 
      </font size=2>
    </details>

    <details>
    <summary>
    <strong> PUT /sales/:id</strong>
    </summary>
      <font size=2>
      Esse endpoint é responsável por editar uma venda no serviço store_manager_db, podendo alterar a quantidade de um produto registrado na venda.
      </font size=2>
    </details>

    <details>
    <summary>
    <strong> DELETE /sales/:id</strong>
    </summary>
      <font size=2>
      Esse endpoint é responsável por remover uma venda no serviço store_manager_db bem como a associação dos produtos dentro dessa venda. 
      </font size=2>
    </details>

###

<p align="center">
<font size=2>
Importante! Os arquivos de minha autoria estão  <code>'./backend/src'</code> e <code> './backend/tests</code> outros arquivos, como os responsáveis pela migrations e seeders do serviço store_manager_db no diretŕoio <code>'./sql'</code> são de autoria da Trybe
</font size=2>
</p>