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
  // Membuat ENUM type untuk role
  pgm.createType('user_role', ['Admin', 'Pegawai']);

  pgm.createTable('users', {
    id: {
      type: 'VARCHAR(255)',
      primaryKey: true,
      notNull: true,
    },
    name: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    email: {
      type: 'VARCHAR(50)',
      notNull: true
    },
    password: {
      type: 'VARCHAR(255)',
      notNull: true
    },
    role: {
      type: 'user_role',
      notNull: true,
      default: 'Pegawai'
    }
  })
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  // Menghapus tabel users terlebih dahulu
  pgm.dropTable('users');
  // Menghapus ENUM type setelah tabel dihapus
  pgm.dropType('user_role');

};
