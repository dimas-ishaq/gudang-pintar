/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('items', {
    id: {
      type: 'VARCHAR(255)',
      primaryKey: true,
      notNull: true
    },
    transaction_id: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    product_id: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    quantity: {
      type: 'integer',
      notNull: true
    },
    price: {
      type: 'integer',
      notNull: true
    }
  });

  pgm.addConstraint('items', 'fk_items_transaction_id_transactions.id', {
    foreignKeys: {
      columns: 'transaction_id',
      references: 'transactions(id)',
      onDelete: 'CASCADE'
    }
  })

  pgm.addConstraint('items', 'fk_items_product_id_products.id', {
    foreignKeys: {
      columns: 'product_id',
      references: 'products(id)',
      onDelete: 'CASCADE',
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('items')
};
