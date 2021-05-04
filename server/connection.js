const mongoose = require('mongoose')
const connection = mongoose.connect('mongodb://127.0.0.1:27017/testdb', {useNewUrlParser: true, useUnifiedTopology: true}); // var connection is a promise and the same is used to create a db as well

connection.then(()=>{console.log(`success`)}).catch((err)=>{console.log(`${err}`)}); // connection is successful

const sampleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
})

const Sample_collection = new mongoose.model('simple_crud_application',sampleSchema);

const create_n_insert = async (name,age)=>{
    try {
        const d = Sample_collection({
            name:name,
            age:age
        })
        const result = await Sample_collection.insertMany([d])
        return result;

    } catch (error) {
        console.log(error)
        return error;
    }
}

const find = async (name)=>{
    try {
        const data = await Sample_collection.findOne({'name':name});
        return data;

    } catch (error) {
        return error
    }

}

const findAll = async ()=>{
    try {
        const data = await Sample_collection.find();
        return data;

    } catch (error) {
        console.log(error)
        return error
    }
}

module.exports.add = create_n_insert;
module.exports.view = find;
module.exports.viewAll = findAll;