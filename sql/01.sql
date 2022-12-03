INSERT INTO store
    (store_name, store_fee)
VALUES
    ('Store 1', 0.1),
    ('Store 2', 0.05),
    ('Store 3', 0);

INSERT INTO product
    (product_name, product_value, store_id)
VALUES
    ('Toothpaste', 5, 1),
    ('Toothpaste', 5, 2),
    ('Toothpaste', 5, 3),
    ('Toothbrush', 15, 1),
    ('Toothbrush', 20, 2),
    ('Toothbrush', 25, 3);