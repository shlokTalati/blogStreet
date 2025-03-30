const {Category} = require('../model/categoryModel');

async function fetchAllCategories(){
    try {
        return await Category.find(); // Returns all the Categories
    } catch (err) {
        console.error(err);
        return null;
    }
}

async function fetchCategory(categoryId){
    try{
        return await Category.findOne({_id: categoryId});
    }

    catch(err){
        console.error(err);
        return null;
    }
}


module.exports = {fetchAllCategories, fetchCategory}