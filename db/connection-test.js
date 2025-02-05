import pg from 'pg';
const { Client } = pg;

const client = new Client({
  host: 'demoendpoint.cluster-custom-cuwnoe3gsq9h.us-east-1.rds.amazonaws.com',
  user: 'postgres',
  password: 's25team10password',
  database: 's25-team10db',
  port: 5432,
})

try {
  await client.connect();
  console.log('Connected successfully!');
  
  // Test query
  const res = await client.query('SELECT NOW()');
  console.log('Query result:', res.rows[0]);
  
  await client.end();
} catch (err) {
  console.error('Connection error:', err);
  process.exit(1);
}