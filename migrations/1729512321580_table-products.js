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
  pgm.createTable('products', {
    id: {
      type: 'VARCHAR(255)',
      primaryKey: true,
      notNull: true,
    },
    name: {
      type: 'VARCHAR(255)',
      notNull: true,
    },
    category_id: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    price: {
      type: 'integer',
      notNull: true
    },
    stock: {
      type: 'integer',
      notNull: true
    },
    description: {
      type: 'TEXT',
      notNull: false
    },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp')
    }
  });

  pgm.addConstraint('products', 'fk_products_category_id_categories.id', {
    foreignKeys: {
      columns: 'category_id',
      references: 'categories(id)',
      onDelete: 'CASCADE'
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('products')
};
