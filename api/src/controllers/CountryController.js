const { Country, Activity, Op } = require ('../db');
const axios = require('axios');

const getCountriesApi = async (req, res) => {
    try {
        const apiCountries = (await axios.get('https://restcountries.com/v3/all')).data;

        const toMyDb = apiCountries.map(async (country) => {
            const newCountry = {
                name: country.name.official,
                flag: country.flags[1],
                id: country.cca3,
                continent: country.region,
                capital: country.capital? country.capital[0] : "Not found",
                subregion: country.subregion? country.subregion : 'Not found',
                area: country.area,
                population: country.population
            };
            Country.findOrCreate({
                where: { id: country.cca3},
                defaults: newCountry
            });
            return newCountry;

        })
        return toMyDb;

       
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

const getCountriesDb = async (req, res) => {

    const name = req.query.name;
    const { id } = req.params;
    try {
        if(name) {
            const countryName = await Country.findAll({
                attributes: ["flag", "name", "continent", "id", "population", "area"],
                through: {
                    attributes: []
                },
                where: {
                    name: {
                        [Op.like]: `%${name}%`

                    }
                }
            })
            countryName.length ?
            res.send(countryName) :
            res.status(404).send('Country not found');
        } else if (id){
            const countryId = await Country.findAll({
                attributes: ["flag", "name", "continent", "id", "population", "area","capital","subregion"],
                through: {
                    attributes: []
                },
                where: {
                    id: {
                        [Op.like]: `%${id}%`
                    }
                },
                include: {
                    model: Activity,
                    attributes: ["id","name","difficulty","duration","season"],
                    through: {
                        attributes: []
                    }
                }
            })
            countryId.length ?
            res.send(countryId) :
            res.status(404).send('Country not found');
        } else {
            const countries = await Country.findAll();
            res.send(countries);
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error);
    }
}

module.exports = {
    getCountriesApi,
    getCountriesDb
}