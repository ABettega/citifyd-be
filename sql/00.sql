CREATE TABLE store (
    id INT GENERATED ALWAYS AS IDENTITY,
    store_name VARCHAR(255) NOT NULL,
    store_fee FLOAT NOT NULL DEFAULT 10,
    PRIMARY KEY(id)
);

CREATE TABLE product (
    id INT GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255) NOT NULL,
    product_value INTEGEr NOT NULL,
    store_id INT NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_store_id
        FOREIGN KEY(store_id)
            REFERENCES store(id)
);

CREATE TABLE transaction (
    id INT GENERATED ALWAYS AS IDENTITY,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    product_name_at_transaction VARCHAR(255) NOT NULL,
    value_full INTEGER NOT NULL,
    value_store INTEGER NOT NULL,
    value_marketplace INTEGER NOT NULL,
    value_pay_gateway INTEGER NOT NULL,
    transaction_date TIMESTAMP,
    PRIMARY KEY(id),
    CONSTRAINT fk_store_id
        FOREIGN KEY(store_id)
            REFERENCES store(id)
);

CREATE TABLE audit_log (
    id INT GENERATED ALWAYS AS IDENTITY,
    message VARCHAR (255),
    location VARCHAR(255),
    created_at TIMESTAMP,
    severity VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);
