
// autocomlete for answers input


// lets take all the ingredients for all the levels

var ingredients = [];

for(var i = 0; i<level.length; i++) {
    ingredients.push(level[i].ingredients);
}

//lets flatten them

var flatten = _.flatten(ingredients);

//and remove dublicates 

var autocompleteTags = _.uniq(flatten);


