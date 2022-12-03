const sql = require('../dal/database');

/**
 * @param {{
 *   message: string;
 *   location: string;
 *   severity: string;
 * }}
 *
 * @description Logs the specified object in the database.
 */
const auditLog = async ({
  message,
  location,
  severity,
}) => {
  try {
    await sql`
      INSERT INTO audit_log
      (
        message, location, severity, created_at
      )
      VALUES
      (
        ${message}, ${location}, ${severity}, NOW()::timestamp
      )
    `;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = {
  auditLog,
};
