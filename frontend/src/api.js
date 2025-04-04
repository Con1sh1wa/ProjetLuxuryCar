import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// ✅ Envoi du rôle aussi
export const registerUser = async (username, email, password, role = 'user') => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, {
      username,
      email,
      password,
      role, // 🔥 C'est ça qui manquait !
    });
    return response.data;
  } catch (error) {
    console.error('Erreur register:', error.response?.data || error.message);
    return { error: error.response?.data?.error || 'Erreur inconnue' };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, { email, password });
    return response.data;
  } catch (error) {
    console.error('Erreur login:', error.response?.data || error.message);
    return { error: error.response?.data?.error || 'Erreur inconnue' };
  }
};

export const getCars = async (brand = '') => {
  try {
    const response = await axios.get(`${API_URL}/cars?brand=${brand}`);
    console.log('Réponse API pour les voitures:', response); // Log la réponse complète
    return response.data; // Renvoie seulement les données JSON
  } catch (error) {
    console.error('Erreur chargement voitures:', error);
    return [];
  }
};

export const getReservations = async () => {
  try {
    const response = await axios.get(`${API_URL}/reservations`);
    return response.data;
  } catch (error) {
    console.error('Erreur chargement réservations:', error);
    return [];
  }
};

// ✅ Modifié : retourne aussi l'erreur serveur
export const createReservation = async (userName, carId, startDate, endDate, totalPrice) => {
  try {
    const response = await axios.post(`${API_URL}/reservations`, {
      user_name: userName,
      car_id: carId,
      start_date: startDate,
      end_date: endDate,
      total_price: totalPrice,
    });
    return response.data;
  } catch (error) {
    console.error('Erreur réservation:', error.response?.data?.error || error.message);
    return { error: error.response?.data?.error || 'Erreur inconnue' };
  }
};

export const getUserReservations = async (username) => {
  try {
    const response = await axios.get(`${API_URL}/reservations/user/${username}`);
    return response.data;
  } catch (error) {
    console.error('Erreur chargement réservations utilisateur:', error);
    return [];
  }
};
