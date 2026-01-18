-- Seed data for pantry-staging database
-- 2 users, 5 recipes, 5 tags

-- Insert users
INSERT INTO users (id, username, email, password, created_at) VALUES
  (uuid_generate_v4(), 'chef_alice', 'alice@example.com', '$2a$10$example_hashed_password_1', NOW()),
  (uuid_generate_v4(), 'chef_bob', 'bob@example.com', '$2a$10$example_hashed_password_2', NOW());

-- Insert tags
INSERT INTO tags (id, name, created_at) VALUES
  (uuid_generate_v4(), 'Italian', NOW()),
  (uuid_generate_v4(), 'Vegetarian', NOW()),
  (uuid_generate_v4(), 'Quick & Easy', NOW()),
  (uuid_generate_v4(), 'Dessert', NOW()),
  (uuid_generate_v4(), 'Healthy', NOW());

-- Insert recipes (using subqueries to get user IDs)
INSERT INTO recipes (id, title, subtitle, description, content, creator_id, created_at) VALUES
  (
    uuid_generate_v4(),
    'Classic Margherita Pizza',
    'Simple and delicious',
    'A traditional Italian pizza with fresh tomatoes, mozzarella, and basil',
    'Ingredients:
- 1 pizza dough
- 200g fresh mozzarella
- 3-4 fresh tomatoes
- Fresh basil leaves
- Olive oil
- Salt

Instructions:
1. Preheat oven to 475°F
2. Roll out pizza dough
3. Top with sliced tomatoes and mozzarella
4. Bake for 10-12 minutes
5. Garnish with fresh basil and drizzle with olive oil',
    (SELECT id FROM users WHERE username = 'chef_alice'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Chocolate Chip Cookies',
    'The perfect cookie',
    'Soft and chewy chocolate chip cookies that everyone loves',
    'Ingredients:
- 2 1/4 cups all-purpose flour
- 1 tsp baking soda
- 1 cup butter, softened
- 3/4 cup granulated sugar
- 3/4 cup brown sugar
- 2 large eggs
- 2 cups chocolate chips

Instructions:
1. Preheat oven to 375°F
2. Mix dry ingredients
3. Cream butter and sugars
4. Add eggs and vanilla
5. Combine wet and dry ingredients
6. Fold in chocolate chips
7. Bake for 9-11 minutes',
    (SELECT id FROM users WHERE username = 'chef_alice'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Mediterranean Quinoa Bowl',
    'Fresh and nutritious',
    'A healthy bowl packed with vegetables and protein',
    'Ingredients:
- 1 cup quinoa
- 1 cucumber, diced
- 2 tomatoes, diced
- 1/2 red onion, sliced
- 1/2 cup feta cheese
- Kalamata olives
- Lemon vinaigrette

Instructions:
1. Cook quinoa according to package directions
2. Let cool to room temperature
3. Combine quinoa with vegetables
4. Top with feta and olives
5. Drizzle with lemon vinaigrette',
    (SELECT id FROM users WHERE username = 'chef_alice'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Spaghetti Carbonara',
    'Roman classic',
    'Creamy pasta dish with eggs, cheese, and pancetta',
    'Ingredients:
- 400g spaghetti
- 200g pancetta or bacon
- 4 large eggs
- 1 cup grated Parmesan
- Black pepper
- Salt

Instructions:
1. Cook pasta until al dente
2. Fry pancetta until crispy
3. Beat eggs with Parmesan
4. Toss hot pasta with pancetta
5. Remove from heat and mix in egg mixture
6. Season with black pepper',
    (SELECT id FROM users WHERE username = 'chef_bob'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Avocado Toast Deluxe',
    'Breakfast favorite',
    'Elevated avocado toast with poached eggs and microgreens',
    'Ingredients:
- 2 slices sourdough bread
- 2 ripe avocados
- 2 eggs
- Microgreens
- Red pepper flakes
- Lemon juice
- Salt and pepper

Instructions:
1. Toast bread until golden
2. Mash avocados with lemon juice
3. Poach eggs
4. Spread avocado on toast
5. Top with poached egg
6. Garnish with microgreens and red pepper flakes',
    (SELECT id FROM users WHERE username = 'chef_bob'),
    NOW()
  );

-- Link each recipe to all 5 tags
INSERT INTO recipes_tags (id, recipe_id, tag_id)
SELECT 
  uuid_generate_v4(),
  r.id,
  t.id
FROM recipes r
CROSS JOIN tags t
ORDER BY r.created_at, t.name;
