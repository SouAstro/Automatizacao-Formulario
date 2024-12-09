CREATE TABLE clientes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(255) NOT NULL,
    email_cliente VARCHAR(255) NOT NULL,
    mensalidade_pago BOOLEAN DEFAULT FALSE,
    celular VARCHAR(20) NOT NULL
);

CREATE TABLE indicacoes (
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT NOT NULL,
    celular_indicado VARCHAR(20) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES clientes(id)
);
