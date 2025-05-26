const db = require('../db');
const getDistance = require('../utils/distance');

exports.addSchool = (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  // Basic validation
  if (!name || !address || isNaN(latitude) || isNaN(longitude)) {
    return res.status(400).json({ error: 'Invalid input data' });
  }

  const sql = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
  db.query(sql, [name, address, latitude, longitude], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'School added successfully', schoolId: result.insertId });
  });
};

exports.listSchools = (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLon = parseFloat(req.query.longitude);
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  if (isNaN(userLat) || isNaN(userLon)) {
    return res.status(400).json({ error: 'Invalid latitude or longitude' });
  }

  db.query('SELECT * FROM schools', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });

    const schoolsWithDistance = results.map((school) => {
      const distance = getDistance(userLat, userLon, school.latitude, school.longitude);
      return { ...school, distance: parseFloat(distance.toFixed(2)) };
    });

    // Ascending sort (nearest schools first)
    schoolsWithDistance.sort((a, b) => a.distance - b.distance);

    // Optional pagination
    const startIndex = (page - 1) * limit;
    const paginatedSchools = schoolsWithDistance.slice(startIndex, startIndex + limit);

    res.json({
      currentPage: page,
      totalSchools: schoolsWithDistance.length,
      limit: limit,
      schools: paginatedSchools,
    });
  });
};

