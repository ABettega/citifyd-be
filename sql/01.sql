INSERT INTO store
    (store_name, store_fee)
VALUES
    ('Store 1', 10),
    ('Store 2', 5),
    ('Store 3', 1);

INSERT INTO product
    (product_name, product_value, product_active, store_id)
VALUES
    ('Toothpaste', 500, TRUE, 1),
    ('Toothpaste', 510, TRUE, 1),
    ('Toothpaste', 511, TRUE, 1),
    ('Toothpaste', 500, TRUE, 2),
    ('Toothpaste', 500, TRUE, 3),
    ('Toothbrush', 1500, TRUE, 1),
    ('Toothbrush', 1500, TRUE, 2),
    ('Toothbrush', 1500, TRUE, 3);

