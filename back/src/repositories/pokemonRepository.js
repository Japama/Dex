const db = require('../config/db');

const getPokemonList = async () => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Pokemons", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.rows);
            }
        });
    });
};

const getPokemonById = async (id) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Pokemons WHERE Id = $1", [id], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.rows);
            }
        });
    });
};

const getPokemonFilter = async (filter) => {
    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Pokemons WHERE Name ILIKE $1", [`%${filter}%`], (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results.rows);
            }
        });
    });
};

module.exports = {
    getPokemonList,
    getPokemonById,
    getPokemonFilter
};