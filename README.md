### SIMPLE QUIZ GAME



#### Example 

http://theoneyouarelookingfor.com/quizgame/


#### To get started

1. Compile scss
2. edit js/exampleLevels.js

Rename exampleLevels.js to levels.js required

If you plan on using with leaderboards


1. edit js/ajaxFsExample.js 

Rename to ajaxFs.js required. As well as you'll need to set up database. Mongolabs works just fine with this.

After set up in `js/app.js` change `leaderboards` to `true`.

#### How it works?

For example you'll have your level 1 cocktail:

```
{
	name: 'Cocktail name 1',
	ingredients: ['vodka', 'juice', 'lime wedge']
}
```

It will return on first level only 2 ingredients and the third one will be the right answer.
