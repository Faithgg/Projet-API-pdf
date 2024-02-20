import mysql from 'mysql2';
import dotenv from 'dotenv'
dotenv.config()


const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  }).promise()

  export async function getPdfGenereteds() {
    const [rows] = await pool.query("SELECT * FROM historique")
    
    return rows;
  }

  export async function deletePdfGenereted(id:string) {
    const [rows] = await pool.query(`
    DELETE 
    FROM historique
    WHERE id = ${id}
    `)
    return true
  }
  
  export async function addPdfGenereted (type:string, name:string) {
    const [result] = await pool.query(`
    INSERT INTO historique (type, name)
    VALUES (?, ?)
    `, [type, name])
    return result
  }