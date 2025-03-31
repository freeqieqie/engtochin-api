const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'sql.wsfdb.cn',
  port: 3306,
  user: 'freeqieqieengtochin1',
  password: 'wyf6k2yx',
  database: 'freeqieqieengtochin1',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}).promise();

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    if (req.method === 'POST') {
      console.log('收到POST请求:', req.body);  // 添加日志
      const { student, taskTitle, timeUsed } = req.body;
      
      if (!student || !taskTitle || timeUsed === undefined) {
        console.error('数据不完整:', req.body);  // 添加错误日志
        return res.status(400).json({ error: '缺少必要的数据' });
      }

      const [result] = await pool.execute(
        'INSERT INTO training_records (student_name, task_title, time_used) VALUES (?, ?, ?)',
        [student, taskTitle, timeUsed]
      );
      
      res.status(200).json({ success: true, id: result.insertId });
    } else if (req.method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM training_records ORDER BY created_at DESC');
      res.status(200).json(rows);
    } else {
      res.status(405).json({ error: '不支持的请求方法' });
    }
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: error.message });
  }
};
