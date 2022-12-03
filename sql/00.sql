CREATE TABLE store (
    id INT GENERATED ALWAYS AS IDENTITY,
    store_name VARCHAR(20) NOT NULL,
    store_fee FLOAT NOT NULL DEFAULT 0.1,
    PRIMARY KEY(id)
);

CREATE TABLE product (
    id INT GENERATED ALWAYS AS IDENTITY,
    product_name VARCHAR(255) NOT NULL,
    product_value FLOAT NOT NULL,
    product_active BOOLEAN NOT NULL,
    store_id INT,
    PRIMARY KEY(id),
    CONSTRAINT fk_store_id
        FOREIGN KEY(store_id)
            REFERENCES store(id)
);

CREATE TABLE transaction (
    id INT GENERATED ALWAYS AS IDENTITY,
    store_id INT NOT NULL,
    product_id INT NOT NULL,
    transaction_date TIMESTAMP,
    severity VARCHAR(20) NOT NULL,
    PRIMARY KEY(id),
    CONSTRAINT fk_store_id
        FOREIGN KEY(store_id)
            REFERENCES store(id),
    CONSTRAINT fk_product_id
        FOREIGN KEY(product_id)
            REFERENCES product(id)
);

CREATE TABLE audit_log (
    id INT GENERATED ALWAYS AS IDENTITY,
    message VARCHAR (255),
    location VARCHAR(255),
    created_at TIMESTAMP,
    severity VARCHAR(20) NOT NULL,
    PRIMARY KEY(id)
);
