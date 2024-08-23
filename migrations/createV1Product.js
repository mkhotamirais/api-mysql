import db from "../config/db.js";
import "dotenv/config";
import fs from "fs";

export const run = async () => {
  try {
    const connection = await db.getConnection();

    const [rows] = await connection.query(
      `SELECT COUNT(*) as count FROM information_schema.tables WHERE table_schema = '${process.env.DB_NAME}' AND table_name = 'Customer'`
    );

    if (rows[0].count === 0) {
      const migration = fs.readFileSync("./migrations/migrate_v1product.sql", "utf-8");
      await connection.query(migration);
      console.log("Table Customer created successfully");

      const seeder = fs.readFileSync("./seeders/seed_v1product.sql", "utf-8");
      await connection.query(seeder);
      console.log("Customer data seeded successfully");
    } else {
      console.log("Table v1product already exist");
    }
    connection.release();
  } catch (error) {
    console.error("Error running migration or seeder:", error.message);
  }
};
