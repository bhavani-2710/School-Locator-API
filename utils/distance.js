function getDistance(lat1, lon1, lat2, lon2) {
  const toRad = (x) => (x * Math.PI) / 180; // Converts degrees to radians. Required because trigonometric functions in JS use radians.
  const R = 6371; // Radius of Earth in kilometers (used for distance output in km).

  // Difference in latitude and longitude, converted to radians.
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  // Haversine formula's core logic: calculates the square of half the chord length between the points.
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // Converts that chord length into an angular distance in radians.
  return R * c; // Distance in kilometers // Final distance in kilometers by multiplying angular distance with Earth's radius.
}

module.exports = getDistance;
