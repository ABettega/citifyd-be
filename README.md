# citifyd-be
Back-End technical assessment for Citifyd.

The environment variables are stored in the accompanying .env file, which has not been added to .gitignore to ease testing.

There are stores and products already seeded.

### Database definition
#### General notes
All monetary values are stored as the lowest possible unit - cents. The API receives the values as floats or integers, but the values are saved in integers as cents.

#### store
- id (INT, PK)
- store_name (VARCHAR(255))
- store_fee (FLOAT, DEFAULT 10)

The store fee is stored as the percentage, so 10% is stored as 10, 1% is 1 and so forth.

#### product
- id (INT, PK)
- product_name (VARCHAR(255))
- product_value (INT)
- store_id (INT, FK (store))

As mentioned, the product value is stored as an integer, containing the cents.

#### transaction
- id (INT, PK)
- store_id (INT, FK (store))
- product_id (INT)
- product_name_at_transaction (VARCHAR(255))
- value_full (INT)
- value_store (INT)
- value_marketplace (INT)
- value_pay_gateway (INT)
- transaction_date (TIMESTAMP)

The product_id is NOT a Foreign Key, as it is not related to the existing value on the product table. The product name is saved as-is at transaction. If the product is deleted or has its name changed, the transaction history will NOT reflect the change. Same for the value. The math for the value is always correct - 1% for the pay gateway, the configured value (minus 1% for the pay gateway) for the marketplace, and the rest for the store.

#### audit_log
- id (INT, PK)
- message (VARCHAR (255))
- location (VARCHAR(255))
- created_at (TIMESTAMP)
- severity (VARCHAR(20))

This contains any changes made to any table, and also any errors that may occur in the application.
