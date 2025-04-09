const express = require('express');
const Car = require('../models/Car');
const router = express.Router();

/**
 * 📌 Récupérer toutes les voitures (avec image)
 * - Si une marque est fournie en query ?brand=Tesla, on filtre les voitures de cette marque.
 * - Sinon, on retourne toutes les voitures.
 */
router.get('/', async (req, res) => {
  try {
    const { brand } = req.query;

    const whereClause = brand ? { brand } : {};
    const cars = await Car.findAll({ where: whereClause });

    const carsWithImages = cars.map(car => ({
      ...car.toJSON(),
      imageUrl: `http://localhost:5000/images/${car.image}`
    }));

    res.json(carsWithImages);
  } catch (error) {
    console.error('Erreur récupération voitures :', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des voitures' });
  }
});

/**
 * 📌 Ajouter une voiture (admin uniquement)
 */
router.post('/', async (req, res) => {
  try {
    const { name, brand, max_speed, type, price_per_day, image } = req.body;
    const newCar = await Car.create({ name, brand, max_speed, type, price_per_day, image });
    res.status(201).json(newCar);
  } catch (error) {
    console.error('Erreur ajout voiture :', error);
    res.status(500).json({ error: 'Erreur lors de l’ajout de la voiture' });
  }
});

/**
 * 📌 Supprimer une voiture (admin uniquement)
 */
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Car.destroy({ where: { id: req.params.id } });

    if (deleted) {
      res.json({ message: 'Voiture supprimée' });
    } else {
      res.status(404).json({ error: 'Voiture non trouvée' });
    }
  } catch (error) {
    console.error('Erreur suppression voiture :', error);
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
});

module.exports = router;
