**Implementar na API do SGP**
1ª Endpoint para Receber Dados do Formulário:
Criar um endpoint no servidor SGP que receba os dados (nome_cliente, email_cliente, celular_amigo) enviados pelo formulário.

2ª Validação dos Dados:
Verificar se os dados estão no formato correto e se o número do celular indicado realmente existe no banco de dados.

3ª Contagem de Indicações:
Contar quantas indicações foram feitas pelo cliente e validar se ele se qualifica para a gratuidade da mensalidade.

4ª Atualizar o Registro no Banco de Dados:
Se o cliente atingir o critério (ex: indicou 2 amigos que contrataram e instalaram o serviço), atualizar a mensalidade do cliente no banco de dados.

5ª Resposta da API:
A resposta deve informar se a operação foi bem-suced ou retornar erros, caso algo dê errado.

**Estrutura do Endpoint**
Vamos criar um endpoint /processar_indicacao que será acionado pelo formulário:

Dados Recebidos:

Nome do cliente
Email do cliente
Número de telefone do amigo indicado
Lógica no servidor:

Validar o número de telefone.
Verificar se o número está registrado no banco de dados.
Contar quantas indicações o cliente fez com sucesso.
Se atingir 2 indicações válidas, atualizar a mensalidade do cliente no banco de dados.

**Explicando a lógica:**
Validação de dados:

Confirma que os dados obrigatórios estão presentes no formulário.
Busca no banco:

Verifica se o celular do amigo está no banco de dados.
Contagem de indicações:

Conta quantas indicações o cliente fez.
Concessão da gratuidade:

Se atingir o limite de 2 indicações válidas, atualiza o campo mensalidade_pago.
