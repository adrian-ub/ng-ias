import Dexie, { Table } from 'dexie';

import { CategoryModel } from '@domain/models/category/category.model';
import { RecipeModel } from '@domain/models/recipe/recipe.model';
import { IngredientModel } from '@domain/models/ingredient/ingredient.model';

export class AppDB extends Dexie {
  categories!: Table<CategoryModel, number>;
  recipes!: Table<
    Omit<RecipeModel, 'category' | 'ingredients'> & {
      categoryId: number;
      ingredients: Array<{ ingredientId: number; amount: string }>;
    },
    number
  >;
  ingredients!: Table<IngredientModel, number>;

  constructor() {
    super('recipesIAS');
    this.version(3).stores({
      categories: '++id',
      recipes: '++id',
      ingredients: '++id',
    });
    this.on('populate', () => this.populate());
  }

  async populate() {
    await this.bulkAddCategories();
    await this.bulkIngredients();
    await this.bulkAddRecipes();
  }

  private async bulkAddRecipes() {
    await db.recipes.bulkAdd([
      {
        id: 122,
        categoryId: 3,
        title: 'Galletas de avena',
        photoUrl:
          'https://www.texanerin.com/content/uploads/2019/06/nobake-chocolate-cookies-1-650x975.jpg',
        time: 15,
        ingredients: [
          { ingredientId: 0, amount: '200ml' },
          { ingredientId: 1, amount: '5g' },
          { ingredientId: 2, amount: '300g' },
        ],
        description:
          '-- Start with cleaned and peeled russet potatoes that you have cut into 3/8-inch match sticks. Place in bowl of very cold water: keep rinsing and changing the water until the water is clear; drain thoroughly and dry with paper towels or a clean lint-free kitchen towel.\n\n -- Meanwhile, you preheat your hot oil to 350 degrees F. Place prepared taters in oil and cook about 5 minutes. They will have that blond-tone color to them. \n\n -- Note: Once you add cold potatoes to the hot oil, the temperature of your oil is going to drop - you want it to be somewhere between 330 - 325 degrees F. \n\n -- Remove from oil; drain and cool. Now - either refrigerate until ready to finish cooking, or cool completely and freeze up to 3 months. To freeze properly - place completely cooled fries in single layer on tray and place in freezer until frozen. Then bag them.\n\n -- To finish cooking - preheat your oil to 400* F. Add your cold fries (which will drop the oil temp - which is fine because you want it near the 375 degrees F. temp) and cook a few minutes until done. Lightly salt them and shake well so that the salt distributes well and they are not salty.',
        isFavorite: false,
      },
      {
        id: 3,
        categoryId: 4,
        title: 'Batido triple',
        photoUrl:
          'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/delish-how-to-make-a-smoothie-horizontal-1542310071.png?crop=0.803xw:0.923xh;0.116xw,0.00510xh&resize=768:*',
        time: 10,
        ingredients: [
          { ingredientId: 59, amount: '1' },
          { ingredientId: 60, amount: '1/2 lbs' },
          { ingredientId: 61, amount: '1/2 liters' },
        ],
        description:
          'In a blender, combine all ingredients and blend until smooth. Then divide between 2 cups and top with blackberries, if desired.',
        isFavorite: false,
      },
      {
        id: 2,
        categoryId: 3,
        title: 'Galletas Veganas',
        photoUrl:
          'https://www.texanerin.com/content/uploads/2018/06/no-bake-lactation-cookies-1-650x975.jpg',
        time: 30,
        ingredients: [
          { ingredientId: 0, amount: '2 quarts' },
          { ingredientId: 16, amount: '1' },
          { ingredientId: 12, amount: '1 cup' },
          { ingredientId: 18, amount: '1 cup' },
          { ingredientId: 19, amount: '1 teaspoon' },
          { ingredientId: 1, amount: '2 teaspoons' },
          { ingredientId: 4, amount: '1/4 teaspoons' },
          { ingredientId: 7, amount: '1/8 teaspoons' },
          { ingredientId: 20, amount: '1/2 teaspoons' },
          { ingredientId: 21, amount: '4' },
        ],
        description:
          '-- Beat the egg and then combine it with water in a bowl. Stir. Combine the flour, salt, MSG, pepper, onion powder and garlic powder in a gallon size zip lock bag. Pound each of the breast filets until about 1/4-inch thick. Then cut into bite sized pieces. Coat each piece with the flour mixture by shaking in the zip lock bag. Remove and coat in the egg mixture. Then coat in the flour mixture again. Shake to coat. Deep fry at 375 degrees for 10-12 minutes, until browned and crispy.',
        isFavorite: false,
      },
      {
        id: 4,
        categoryId: 3,
        title: 'Galletas De Calabaza',
        photoUrl:
          'https://www.texanerin.com/content/uploads/2018/11/pumpkin-spice-cookies-4-650x975.jpg',
        time: 45,
        ingredients: [
          { ingredientId: 0, amount: '2 tablespoons' },
          { ingredientId: 22, amount: '1/2' },
          { ingredientId: 23, amount: '2 tablespoons' },
          { ingredientId: 7, amount: '2 cloves' },
          { ingredientId: 3, amount: '1 teaspoon' },
          { ingredientId: 24, amount: '1 tablespoon' },
          { ingredientId: 25, amount: '1 lb' },
          { ingredientId: 1, amount: '2 teaspoons' },
          { ingredientId: 4, amount: '2 teaspoons' },
          { ingredientId: 26, amount: '15 oz' },
          { ingredientId: 27, amount: '8' },
          { ingredientId: 28, amount: '2' },
          { ingredientId: 29, amount: '1 cup' },
        ],
        description:
          '-- In a medium pot over medium heat, heat 1 tablespoon oil. Add onion and cook until soft, 5 minutes. Add garlic and cook until fragrant, 1 minute more. Add tomato paste and stir to coat onion and garlic. Add ground beef and cook, breaking up meat with a wooden spoon, until no longer pink, 6 minutes. Drain fat.\n\n -- Return beef to pot and season with chili powder, paprika, salt, and pepper. Add tomato sauce and kidney beans. Bring to a boil, then reduce heat and let simmer 15 minutes. Add some chili to center of each tortilla, leaving room to fold in edges. Top with Fritos, then cheddar. Fold edges of tortillas toward the center, creating pleats. Invert Crunchwraps so pleats are on the bottom and stay together.\n\n -- In medium skillet over medium heat, heat remaining tablespoon oil. Add a Crunchwrap seam side down and cook until tortilla is golden, 3 to 5 minutes per side. Repeat with remaining Crunchwraps',
        isFavorite: false,
      },
      {
        id: 1,
        categoryId: 3,
        title: 'Brownies',
        photoUrl:
          'https://www.texanerin.com/content/uploads/2018/01/coconut-flour-brownies-1-650x975.jpg',
        time: 30,
        ingredients: [
          { ingredientId: 1, amount: '2 tablespoons' },
          { ingredientId: 3, amount: '1 tablespoon' },
          { ingredientId: 4, amount: '1 teaspoon' },
          { ingredientId: 5, amount: '1/2 teaspoons' },
          { ingredientId: 6, amount: '1/2 teaspoons' },
          { ingredientId: 7, amount: '1/2 teaspoons' },
          { ingredientId: 8, amount: '1/2 teaspoons' },
          { ingredientId: 9, amount: '1/2 teaspoons' },
          { ingredientId: 10, amount: '1/2 teaspoons' },
          { ingredientId: 11, amount: '1/2 teaspoons' },
          { ingredientId: 12, amount: '1/2 cups' },
          { ingredientId: 13, amount: '1 tablespoon' },
          { ingredientId: 14, amount: '1 tablespoon' },
          {
            ingredientId: 15,
            amount: '2 breasts, 2 thighs, 2 drumsticks, 2 wings',
          },
          { ingredientId: 16, amount: '1' },
          { ingredientId: 17, amount: '2 quarts' },
        ],
        description:
          '-- Preheat fryer to 350°F. Thoroughly mix together all spices. Combine spices with flour, brown sugar and salt. Dip chicken pieces in egg white to lightly coat them, then transfer to flour mixture. Turn a few times and make sure the flour mix is really stuck to the chicken.\n\n -- Repeat with all the chicken pieces. Let chicken pieces rest for 5 minutes so crust has a chance to dry a bit. Fry chicken in batches. Breasts and wings should take 12-14 minutes, and legs and thighs will need a few more minutes. Chicken pieces are done when a meat thermometer inserted into the thickest part reads 165°F. Let chicken drain on a few paper towels when it comes out of the fryer. Serve hot.',
        isFavorite: false,
      },
      {
        id: 5,
        categoryId: 1,
        title: 'Tacos de pescado',
        photoUrl:
          'https://hips.hearstapps.com/hmg-prod/images/190307-fish-tacos-112-1553283299.jpg',
        time: 35,
        ingredients: [
          { ingredientId: 30, amount: 'jucie of 1 ' },
          { ingredientId: 24, amount: '2 teaspoons' },
          { ingredientId: 0, amount: '3 tablespoons' },
          { ingredientId: 3, amount: '1 teaspoon' },
          { ingredientId: 31, amount: '1/2 teaspoons' },
          { ingredientId: 32, amount: '1/2 teaspoons' },
          { ingredientId: 4, amount: '2 teaspoons' },
          { ingredientId: 33, amount: '1/2 lb' },
          { ingredientId: 27, amount: '8' },
          { ingredientId: 14, amount: '2 teasponns' },
          { ingredientId: 34, amount: '1' },
        ],
        description:
          '-- In a medium shallow bowl, whisk together olive oil, lime juice, paprika, chili powder, cumin, and cayenne. Add cod, tossing until evenly coated. Let marinate 15 minutes. Meanwhile, make slaw: In a large bowl, whisk together mayonnaise, lime juice, cilantro, and honey. Stir in cabbage, corn, and jalapeño. Season with salt and pepper.\n\n -- In a large nonstick skillet over medium-high heat, heat vegetable oil. Remove cod from marinade and season both sides of each filet with salt and pepper. Add fish flesh side-down. Cook until opaque and cooked through, 3 to 5 minutes per side.\n\n -- Let rest 5 minutes before flaking with a fork. Assemble tacos: Serve fish over grilled tortillas with corn slaw and avocado. Squeeze lime juice on top and garnish with sour cream. ',
        isFavorite: false,
      },
      {
        id: 999,
        categoryId: 1,
        title: 'Fajitas de pollo',
        photoUrl:
          'https://tmbidigitalassetsazure.blob.core.windows.net/secure/RMS/attachments/37/1200x1200/Flavorful-Chicken-Fajitas_EXPS_GHBZ18_12540_B08_15_8b.jpg',
        time: 35,
        ingredients: [
          { ingredientId: 9, amount: '1/2 teaspoons' },
          { ingredientId: 0, amount: '4 tablespoons' },
          { ingredientId: 1, amount: '1/2 teaspoons' },
          { ingredientId: 30, amount: '2 tablespoons' },
          { ingredientId: 31, amount: '1 teaspoon' },
          { ingredientId: 7, amount: '1 teaspoon' },
          { ingredientId: 24, amount: '1/2 teaspoons' },
          { ingredientId: 3, amount: '1/2 teaspoons' },
          { ingredientId: 21, amount: '1 pound' },
          { ingredientId: 22, amount: '1/2 cup' },
          { ingredientId: 27, amount: '6' },
          { ingredientId: 36, amount: '4' },
          { ingredientId: 37, amount: '1/2' },
          { ingredientId: 38, amount: '1/2' },
        ],
        description:
          '-- In a large bowl, combine 2 tablespoons oil, lemon juice and seasonings; add the chicken. Turn to coat; cover. Refrigerate for 1-4 hours In a large skillet, saute peppers and onions in remaining oil until crisp-tender. Remove and keep warm. Drain chicken, discarding marinade. In the same skillet, cook chicken over medium-high heat for 5-6 minutes or until no longer pink.\n\n -- Return pepper mixture to pan; heat through. Spoon filling down the center of tortillas; fold in half. Serve with toppings as desired.',
        isFavorite: false,
      },
      {
        id: 6,
        categoryId: 2,
        title: 'Pizza Búfalo',
        photoUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
        time: 50,
        ingredients: [
          { ingredientId: 39, amount: '1 lb' },
          { ingredientId: 40, amount: '1 cup' },
          { ingredientId: 41, amount: '1/2 cup' },
          { ingredientId: 42, amount: '1/4 cup' },
          { ingredientId: 43, amount: '2 tablespoons' },
          { ingredientId: 44, amount: '1/2 cup' },
          { ingredientId: 7, amount: '1/4 teaspoons' },
          { ingredientId: 5, amount: '1/4 teaspoons' },
          { ingredientId: 30, amount: '1/4 teaspoons' },
          { ingredientId: 45, amount: '2 oz' },
          { ingredientId: 12, amount: 'for dusting' },
          { ingredientId: 4, amount: '1/2 teaspoons' },
          { ingredientId: 47, amount: '2' },
          { ingredientId: 46, amount: '9 oz' },
        ],
        description:
          '-- Place a rack in upper third of oven. Place a large cast-iron skillet on rack and preheat oven to 500° (or as high as your oven will go). Place pizza dough in a large bowl, pour a little oil over, and turn to coat. Cover bowl with plastic and let dough proof at room temperature while pan and oven heat up.\n\n -- Meanwhile, cook hot sauce, marinara sauce, and butter in a medium saucepan over medium heat, stirring occasionally, until butter is melted. Stir in cream, reduce heat to low, and simmer, stirring occasionally, until slightly thickened and warmed through, about 10 minutes. Heat 1 Tbsp. oil in a large skillet over medium-high. Add chicken, toss to coat, then add ¼ cup Buffalo sauce.\n\n -- Cook chicken, tossing occasionally, until heated through, about 2 minutes. Reduce heat and simmer, stirring often, until chicken is well coated and sauce is slightly thickened, about 5 minutes. Meanwhile, whisk yogurt, lemon juice, celery salt, garlic powder, ¼ cup blue cheese, ½ tsp. pepper, and 2 Tbsp. water in a small bowl, adding more water if sauce seems too thick (it should be pourable); set aside.\n\n -- Turn out dough onto a lightly floured work surface. Shape with your hands into a round that’s slightly larger than the cast-iron skillet you’re using. Take hot skillet out of oven (watch that handle!) and place on a heatproof surface. Add a little flour to pan. Lay dough in skillet, then work edges of dough up sides of skillet with your fingertips (use a rubber spatula or wooden spoon if you’re nervous about touching the hot pan). Drizzle a little oil around inside edge of pan so that it trickles behind and underneath dough, which will encourage browning and help it release.\n\n -- Spread about ⅓ cup Buffalo sauce over dough. Arrange mozzarella over, then top with remaining ¼ cup blue cheese. Arrange chicken mixture on top. Bake pizza on top rack until crust and cheese are nicely browned, 15–20 minutes. Transfer skillet to stovetop (again, watch that handle!) and let pizza rest a few minutes. Using a spatula, slide pizza onto a cutting board or platter. Arrange celery over, then top with reserved blue cheese dressing. Season with pepper, then drizzle with oil.',
        isFavorite: false,
      },
      {
        id: 0,
        categoryId: 0,
        title: 'Lasaña Clásica',
        photoUrl:
          'https://plus.unsplash.com/premium_photo-1671559021019-0268c54511b8?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        time: 15,
        ingredients: [
          { ingredientId: 0, amount: '200ml' },
          { ingredientId: 1, amount: '5g' },
          { ingredientId: 2, amount: '300g' },
        ],
        description:
          '-- Start with cleaned and peeled russet potatoes that you have cut into 3/8-inch match sticks. Place in bowl of very cold water: keep rinsing and changing the water until the water is clear; drain thoroughly and dry with paper towels or a clean lint-free kitchen towel.\n\n -- Meanwhile, you preheat your hot oil to 350 degrees F. Place prepared taters in oil and cook about 5 minutes. They will have that blond-tone color to them. \n\n -- Note: Once you add cold potatoes to the hot oil, the temperature of your oil is going to drop - you want it to be somewhere between 330 - 325 degrees F. \n\n -- Remove from oil; drain and cool. Now - either refrigerate until ready to finish cooking, or cool completely and freeze up to 3 months. To freeze properly - place completely cooled fries in single layer on tray and place in freezer until frozen. Then bag them.\n\n -- To finish cooking - preheat your oil to 400* F. Add your cold fries (which will drop the oil temp - which is fine because you want it near the 375 degrees F. temp) and cook a few minutes until done. Lightly salt them and shake well so that the salt distributes well and they are not salty.',
        isFavorite: false,
      },
      {
        id: 7,
        categoryId: 2,
        title: 'Espagueti Carbonara',
        photoUrl:
          'https://images.unsplash.com/photo-1588013273468-315fd88ea34c?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        time: 15,
        ingredients: [
          { ingredientId: 48, amount: '50g' },
          { ingredientId: 49, amount: '100g' },
          { ingredientId: 50, amount: '350g' },
          { ingredientId: 51, amount: '2 plump' },
          { ingredientId: 42, amount: '50g' },
          { ingredientId: 16, amount: '3' },
          { ingredientId: 1, amount: '2 teaspoons' },
          { ingredientId: 4, amount: '2 teaspoons' },
        ],
        description:
          '-- Put the egg yolks into a bowl, finely grate in the Parmesan, season with pepper, then mix well with a fork and put to one side. Cut any hard skin off the pancetta and set aside, then chop the meat. Cook the spaghetti in a large pan of boiling salted water until al dente.\n\n -- Meanwhile, rub the pancetta skin, if you have any, all over the base of a medium frying pan (this will add fantastic flavour, or use 1 tablespoon of oil instead), then place over a medium-high heat. Peel the garlic, then crush with the palm of your hand, add it to the pan and leave it to flavour the fat for 1 minute. Stir in the pancetta, then cook for 4 minutes, or until it starts to crisp up. Pick out and discard the garlic from the pan, then, reserving some of the cooking water, drain and add the spaghetti.\n\n -- Toss well over the heat so it really soaks up all that lovely flavour, then remove the pan from the heat. Add a splash of the cooking water and toss well, season with pepper, then pour in the egg mixture – the pan will help to cook the egg gently, rather than scrambling it. Toss well, adding more cooking water until it’s lovely and glossy. Serve with a grating of Parmesan and an extra twist of pepper.',
        isFavorite: false,
      },
      {
        id: 8,
        categoryId: 2,
        title: 'Lasaña',
        photoUrl: 'https://images8.alphacoders.com/817/817353.jpg',
        time: 60,
        ingredients: [
          { ingredientId: 36, amount: '1 large' },
          { ingredientId: 25, amount: '1 pound' },
          { ingredientId: 51, amount: '5 cloves' },
          { ingredientId: 52, amount: '1 pound' },
          { ingredientId: 53, amount: '1 pound' },
          { ingredientId: 54, amount: '1 28 ounce can' },
          { ingredientId: 23, amount: '2 6 ounce can' },
          { ingredientId: 55, amount: '2 tablespoons' },
          { ingredientId: 56, amount: '1/4 cup' },
          { ingredientId: 10, amount: '1/2 cup' },
          { ingredientId: 1, amount: '1/2 teaspoons' },
          { ingredientId: 58, amount: '1 teaspoon' },
          { ingredientId: 4, amount: '1/4 teaspoons' },
          { ingredientId: 16, amount: '1 large' },
          { ingredientId: 46, amount: '1 pound' },
          { ingredientId: 48, amount: '1 cup' },
          { ingredientId: 57, amount: '30 ounces' },
        ],
        description:
          '-- Cook noodles according to package directions; drain. Meanwhile, in a Dutch oven, cook sausage, beef and onion over medium heat 8-10 minutes or until meat is no longer pink, breaking up meat into crumbles. Add garlic; cook 1 minute. Drain. Stir in tomatoes, tomato paste, water, sugar, 3 tablespoons parsley, basil, fennel, 1/2 teaspoon salt and pepper; bring to a boil. Reduce heat; simmer, uncovered, 30 minutes, stirring occasionally. In a small bowl, mix egg, ricotta cheese, and remaining parsley and salt. Preheat oven to 375°. Spread 2 cups meat sauce into an ungreased 13x9-in. baking dish. Layer with 3 noodles and a third of the ricotta mixture. Sprinkle with 1 cup mozzarella cheese and 2 tablespoons Parmesan cheese.\n\n -- Repeat layers twice. Top with remaining meat sauce and cheeses (dish will be full). Bake, covered, 25 minutes. Bake, uncovered, 25 minutes longer or until bubbly. Let stand 15 minutes before serving.',
        isFavorite: false,
      },
    ]);
  }

  private async bulkAddCategories() {
    await db.categories.bulkAdd([
      {
        id: 0,
        name: 'Pizza',
        photoUrl:
          'https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 1,
        name: 'Comida Mexicana',
        photoUrl:
          'https://images.unsplash.com/photo-1582169296194-e4d644c48063?q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
      {
        id: 2,
        name: 'Comida Italiana',
        photoUrl:
          'https://images.unsplash.com/photo-1533777324565-a040eb52facd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80',
      },
      {
        id: 3,
        name: 'Galletas',
        photoUrl:
          'https://images.unsplash.com/photo-1560910615-9eaa2e704e63?q=80&w=1000&ixlib=rb-4.0.3',
      },
      {
        id: 4,
        name: 'Batidos',
        photoUrl:
          'https://images.unsplash.com/photo-1502741224143-90386d7f8c82?q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      },
    ]);
  }

  private async bulkIngredients() {
    await db.ingredients.bulkAdd([
      {
        id: 0,
        name: 'Oil',
        photoUrl:
          'https://ak7.picdn.net/shutterstock/videos/27252067/thumb/11.jpg',
      },
      {
        id: 1,
        name: 'Salt',
        photoUrl:
          'https://image.freepik.com/free-photo/sea-salt-wooden-bowl-isolated-white-background_29402-416.jpg',
      },
      {
        id: 2,
        name: 'Russet potatoes',
        photoUrl:
          'http://www.valleyspuds.com/wp-content/uploads/Russet-Potatoes-cut.jpg',
      },
      {
        id: 3,
        name: 'Paprika',
        photoUrl:
          'https://image.freepik.com/free-photo/red-chilli-pepper-powder-isolated-white-background_55610-28.jpg',
      },
      {
        id: 4,
        name: 'Black Pepper',
        photoUrl:
          'https://ak0.picdn.net/shutterstock/videos/26741680/thumb/1.jpg',
      },
      {
        id: 5,
        name: 'Celery salt',
        photoUrl:
          'https://www.hasiroglugurme.com/images/urunler/Koftelik-Esmer-Bulgur-resim-297.jpg',
      },
      {
        id: 6,
        name: 'Dried sage',
        photoUrl:
          'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/Esxjvv7/super-slow-motion-dried-sage-falling-on-white-background_n1xg2gxzg__F0000.png',
      },
      {
        id: 7,
        name: 'Garlic powder',
        photoUrl:
          'https://us.123rf.com/450wm/belchonock/belchonock1808/belchonock180818180/106007144-bowl-of-dry-garlic-powder-on-white-background.jpg?ver=6',
      },
      {
        id: 8,
        name: 'Ground allspice',
        photoUrl:
          'https://www.savoryspiceshop.com/content/mercury_modules/cart/items/2/6/9/2695/allspice-berries-jamaican-ground-1.jpg',
      },
      {
        id: 9,
        name: 'Dried oregano',
        photoUrl: 'https://frutascharito.es/886-large_default/oregano.jpg',
      },
      {
        id: 10,
        name: 'Dried basil',
        photoUrl:
          'https://www.honeychop.com/wp-content/uploads/2015/09/Dried-Mint.png',
      },
      {
        id: 11,
        name: 'Dried marjoram',
        photoUrl:
          'https://images-na.ssl-images-amazon.com/images/I/71YATIBqBYL._SX355_.jpg',
      },
      {
        id: 12,
        name: 'All-purpose flour',
        photoUrl:
          'https://images.assetsdelivery.com/compings_v2/seregam/seregam1309/seregam130900036.jpg',
      },
      {
        id: 13,
        name: 'Brown sugar',
        photoUrl:
          'https://d2v9y0dukr6mq2.cloudfront.net/video/thumbnail/BALQTtekliuc6iu4u/rotating-brown-sugar-in-a-white-container-on-white-background_sis0xtbyl_thumbnail-full01.png',
      },
      {
        id: 14,
        name: 'Kosher salt',
        photoUrl:
          'https://d1yn1kh78jj1rr.cloudfront.net/image/preview/r64-6MxPQjlatyfjp/storyblocks-top-view-of-ceramic-salt-cellar-with-coarse-grained-sea-salt-isolated-on-white-background_SPzKionPuV_SB_PM.jpg',
      },
      {
        id: 15,
        name: 'Whole chicken',
        photoUrl:
          'https://image.shutterstock.com/image-photo/two-raw-chicken-drumsticks-isolated-260nw-632125991.jpg',
      },
      {
        id: 16,
        name: 'Eggs',
        photoUrl:
          'https://image.shutterstock.com/image-photo/egg-whites-yolk-cup-isolated-260nw-1072453787.jpg',
      },
      {
        id: 17,
        name: 'Quarts neutral oil',
        photoUrl:
          'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fimg1.cookinglight.timeinc.net%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F4_3_horizontal_-_1200x900%2Fpublic%2Fgettyimages-464433694_0.jpg%3Fitok%3DK42YR2GV&w=400&c=sc&poi=face&q=85',
      },
      {
        id: 18,
        name: 'Water',
        photoUrl:
          'https://ak1.picdn.net/shutterstock/videos/829561/thumb/11.jpg',
      },
      {
        id: 19,
        name: 'Onion Powder',
        photoUrl:
          'https://image.shutterstock.com/image-photo/mixed-spices-isolated-on-white-260nw-662383828.jpg',
      },
      {
        id: 20,
        name: 'MSG',
        photoUrl:
          'https://img.freepik.com/free-photo/monosodium-glutamate-wood-spoon-white-background_55883-399.jpg?size=626&ext=jpg',
      },
      {
        id: 21,
        name: 'Chicken Breast',
        photoUrl:
          'https://us.123rf.com/450wm/utima/utima1602/utima160200063/53405187-raw-chicken-breast-fillets.jpg?ver=6',
      },
      {
        id: 22,
        name: 'Onion chopped',
        photoUrl: 'https://s3.envato.com/files/246703499/IMG_1752_5.jpg',
      },
      {
        id: 23,
        name: 'Tomato paste',
        photoUrl:
          'http://d3e1m60ptf1oym.cloudfront.net/45bab59a-363c-11e1-ab4e-bf4c2e0bb026/PANELA_xgaplus.jpg',
      },
      {
        id: 24,
        name: 'Chilli Powder',
        photoUrl:
          'https://us.123rf.com/450wm/nuttapong/nuttapong1505/nuttapong150500009/40458002-paprika-powder-isolated-on-white-background.jpg?ver=6',
      },
      {
        id: 25,
        name: 'Ground Beef',
        photoUrl:
          'https://images.radio.com/kmoxam/s3fs-public/styles/nts_image_cover_tall_775x425/public/dreamstime_s_39607998.jpg?XCM.w1UGOp9sVKkWGQZe7_JIsRddxoIK&itok=3M6KcFLH&c=73fb6497175b4c1a5c79e3ede816656a',
      },
      {
        id: 26,
        name: 'Can kidney beans, rinsed and drained ',
        photoUrl:
          'https://www.seriouseats.com/images/2014/04/20140414-pile-of-beans-primary-1500x1125.jpg',
      },
      {
        id: 27,
        name: 'Large Tortillas',
        photoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/5/56/NCI_flour_tortillas.jpg',
      },
      {
        id: 28,
        name: 'Firtos',
        photoUrl:
          'https://previews.123rf.com/images/ksena32/ksena321510/ksena32151000090/45863494-fried-fish-on-a-white-background.jpg',
      },
      {
        id: 29,
        name: 'Shredded cheddar',
        photoUrl:
          'https://image.shutterstock.com/image-photo/top-view-small-bowl-filled-260nw-284460308.jpg',
      },
      {
        id: 30,
        name: 'Lime',
        photoUrl:
          'https://ak8.picdn.net/shutterstock/videos/23271748/thumb/1.jpg',
      },

      {
        id: 31,
        name: 'Ground cumin',
        photoUrl:
          'https://image.shutterstock.com/image-photo/pile-cumin-powder-isolated-on-260nw-1193262853.jpg',
      },
      {
        id: 32,
        name: 'Cayenne pepper',
        photoUrl:
          'https://ak7.picdn.net/shutterstock/videos/11461337/thumb/1.jpg',
      },
      {
        id: 33,
        name: 'Flaky white fish',
        photoUrl:
          'https://image.shutterstock.com/image-photo/roach-river-fish-isolated-on-260nw-277764143.jpg',
      },
      {
        id: 34,
        name: 'Avocado',
        photoUrl:
          'https://www.redwallpapers.com/public/redwallpapers-large-thumb/avocado-cut-stone-leaves-white-background-free-stock-photos-images-hd-wallpaper.jpg',
      },
      {
        id: 35,
        name: 'Red Pepper Flakes',
        photoUrl:
          'https://as1.ftcdn.net/jpg/02/06/55/10/500_F_206551074_mVczUrAWOSMaw8kR48FQDQBqDw47jCtL.jpg',
      },
      {
        id: 36,
        name: 'Onions',
        photoUrl: 'http://www.allwhitebackground.com/images/2/2650.jpg',
      },
      {
        id: 37,
        name: 'Green Pepper',
        photoUrl:
          'https://ak9.picdn.net/shutterstock/videos/4055509/thumb/1.jpg',
      },
      {
        id: 38,
        name: 'Red Pepper',
        photoUrl:
          'https://ak9.picdn.net/shutterstock/videos/10314179/thumb/1.jpg',
      },
      {
        id: 39,
        name: 'Pizza dough',
        photoUrl:
          'https://image.shutterstock.com/image-photo/fresh-raw-dough-pizza-bread-260nw-518950903.jpg',
      },
      {
        id: 40,
        name: 'Ketchup sauce',
        photoUrl:
          'https://st2.depositphotos.com/5262887/11050/i/950/depositphotos_110501208-stock-photo-ketchup-bowl-isolated-on-white.jpg',
      },
      {
        id: 41,
        name: 'Hot Sauce',
        photoUrl:
          'https://media.istockphoto.com/photos/opened-can-of-spaghetti-sauce-on-a-white-background-picture-id497704752?k=6&m=497704752&s=612x612&w=0&h=JnL54buYu1Z3fGtd8uNdjFxiAKwlxoDluD6jbIfSaZI=',
      },
      {
        id: 42,
        name: 'Butter',
        photoUrl:
          'https://redrockstoffee.com/media/2016/11/AdobeStock_76417550.jpeg',
      },
      {
        id: 43,
        name: 'Heavy Cream',
        photoUrl:
          'https://media.istockphoto.com/photos/mayonnaise-in-bowl-isolated-on-white-background-picture-id614981116?k=6&m=614981116&s=612x612&w=0&h=LtbsI2HQXOTERYuP9YJ2PJfRF3W6DcyZ798fxMcQWC0=',
      },
      {
        id: 44,
        name: 'whole-milk plain yogurt',
        photoUrl:
          'https://st.depositphotos.com/2757384/3317/i/950/depositphotos_33170129-stock-photo-pouring-a-glass-of-milk.jpg',
      },
      {
        id: 45,
        name: 'Chesse',
        photoUrl:
          'https://ak7.picdn.net/shutterstock/videos/3619997/thumb/1.jpg',
      },
      {
        id: 46,
        name: 'Mozzarella',
        photoUrl:
          'https://t3.ftcdn.net/jpg/02/06/73/98/500_F_206739841_suPu6qDPHlowFqx9qo8fLqV8sNevL2g3.jpg',
      },
      {
        id: 47,
        name: 'celery stalks',
        photoUrl:
          'https://cdn4.eyeem.com/thumb/6d1b3957c7caa9b73c3e0f820ef854b931808139-1538043742765/w/750',
      },
      {
        id: 48,
        name: 'Parmesan Chesse',
        photoUrl:
          'https://ak7.picdn.net/shutterstock/videos/3721877/thumb/1.jpg',
      },
      {
        id: 49,
        name: 'pancetta',
        photoUrl:
          'https://previews.123rf.com/images/onlyfabrizio/onlyfabrizio1606/onlyfabrizio160600002/60198502-raw-stripes-of-pancetta-stesa-on-a-white-background.jpg',
      },
      {
        id: 50,
        name: 'Spaghetti',
        photoUrl:
          'https://previews.123rf.com/images/mfron/mfron1204/mfron120400098/13306773-bunch-of-spaghetti-nudeln-isoliert-auf-wei%C3%9Fem-hintergrund.jpg',
      },
      {
        id: 51,
        name: 'Garlic',
        photoUrl:
          'https://image.freepik.com/free-photo/fresh-garlic-white-background_1339-17012.jpg',
      },
      {
        id: 52,
        name: 'Lasagna noodles',
        photoUrl:
          'https://previews.123rf.com/images/velkol/velkol1110/velkol111000004/11083085-an-image-of-raw-lasagna-on-white-background.jpg',
      },
      {
        id: 53,
        name: 'Italian sauce',
        photoUrl:
          'https://previews.123rf.com/images/arinahabich/arinahabich1504/arinahabich150400858/38827029-raw-italian-sausage-on-a-white-background-.jpg',
      },
      {
        id: 54,
        name: 'Crushed Tomatoes',
        photoUrl:
          'https://previews.123rf.com/images/merkulovnik/merkulovnik1406/merkulovnik140600100/28751626-crushed-tomato-isolated-on-white-background.jpg',
      },
      {
        id: 55,
        name: 'Sugar',
        photoUrl:
          'https://previews.123rf.com/images/sommai/sommai1411/sommai141100034/33199985-sugar-cubes-in-a-bowl-isolated-on-white-background.jpg',
      },
      {
        id: 56,
        name: 'minced fresh parsley',
        photoUrl:
          'https://t4.ftcdn.net/jpg/02/15/78/05/240_F_215780551_Eid0xpP1M2fokvuEcvJj8uqhROLJkb3p.jpg',
      },
      {
        id: 57,
        name: 'ricotta cheese',
        photoUrl:
          'https://previews.123rf.com/images/barkstudio/barkstudio1608/barkstudio160800351/61418602-ricotta-cheese-into-a-bowl-in-white-background.jpg',
      },
      {
        id: 58,
        name: ' fennel seed',
        photoUrl:
          'https://previews.123rf.com/images/pinkomelet/pinkomelet1710/pinkomelet171000227/88851299-close-up-the-fennel-seed-on-white-background.jpg',
      },
      {
        id: 59,
        name: 'Banana',
        photoUrl:
          'https://www.conservationmagazine.org/wp-content/uploads/2013/04/sterile-banana.jpg',
      },
      {
        id: 60,
        name: 'Frozen Straberries',
        photoUrl:
          'https://www.cascadianfarm.com/wp-content/uploads/2018/12/Strawberries_Main_0218.png',
      },
      {
        id: 61,
        name: 'Greek Yogurt',
        photoUrl:
          'http://images.media-allrecipes.com/userphotos/960x960/3758635.jpg',
      },
    ]);
  }
}

export const db = new AppDB();
