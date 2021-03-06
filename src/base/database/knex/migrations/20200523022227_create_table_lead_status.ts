import { Transaction } from "knex";

import DB_TBLS from "../../../../modules/shared/DBTBL/TBL";

const { TABLE, COLS, ENUM: { STATUS } } = DB_TBLS.LEAD_STATUS;

exports.up = (trx: Transaction) => trx.schema
  .raw("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\"")
  .createTable(TABLE, (table) => {
    table.uuid(COLS.ID).primary().defaultTo(trx.raw("uuid_generate_v4()")).notNullable();
    table.uuid(COLS.LEAD_ID).references(DB_TBLS.LEAD.COLS.ID).inTable(DB_TBLS.LEAD.TABLE);
    table.enum(COLS.STATUS, [STATUS.PENDING, STATUS.ACTIVE, STATUS.BLOCKED])
      .defaultTo(STATUS.PENDING);
    table.timestamps(true, true);
  });

exports.down = (trx: Transaction) => trx.schema.dropTable(TABLE);
