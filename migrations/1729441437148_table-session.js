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
  pgm.createTable('session', {
    user_id: {
      type: 'VARCHAR(255)',
      notNull: true,
      primaryKey: true,
    },
    refresh_token: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    role: {
      type: 'user_role',
      notNull: true
    }
  });

  pgm.addConstraint('session', 'fk_session.user_id_user.id', {
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
  pgm.dropTable('session')
};
