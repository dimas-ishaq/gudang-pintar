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
  pgm.createType('transaction_type', ['sale', 'purchase']);
  pgm.createTable('transactions', {
    id: {
      type: 'VARCHAR(255)',
      primaryKey: true,
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    type: {
      type: 'transaction_type',
      notNull: true
    },
    date: {
      type: 'DATE',
      notNull: true,
    }
  })
  pgm.addConstraint('transactions', 'fk_transactions_user_id_users.id', {
    foreignKeys: {
      columns: 'user_id',
      references: 'users(id)',
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
  pgm.dropTable('transactions');
  pgm.dropType('transaction_type');
};
