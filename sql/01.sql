INSERT INTO store
    (store_name, store_fee)
VALUES
    ('Store 1', 10),
    ('Store 2', 5),
    ('Store 3', 1);

INSERT INTO product
    (product_name, product_value, product_active, store_id)
VALUES
    ('Toothpaste', 5, TRUE, 1),
    ('Toothpaste', 5, TRUE, 2),
    ('Toothpaste', 5, TRUE, 3),
    ('Toothbrush', 15, TRUE, 1),
    ('Toothbrush', 15, TRUE, 2),
    ('Toothbrush', 15, TRUE, 3);
