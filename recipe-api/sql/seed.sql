-- Seed data for pantry-staging database
-- 2 users, 5 recipes, 5 tags

-- Insert users
INSERT INTO users (id, username, email, password, created_at) VALUES
  (uuid_generate_v4(), 'chef_alice', 'alice@example.com', '$2a$10$example_hashed_password_1', NOW()),
  (uuid_generate_v4(), 'chef_bob', 'bob@example.com', '$2a$10$example_hashed_password_2', NOW());
  (uuid_generate_v4(), 'chef_phil', 'phil@example.com', '$2a$10$example_hashed_password_3', NOW());

-- Insert tags
INSERT INTO tags (id, name, created_at) VALUES
  (uuid_generate_v4(), 'Italian', NOW()),
  (uuid_generate_v4(), 'Vegetarian', NOW()),
  (uuid_generate_v4(), 'Quick & Easy', NOW()),
  (uuid_generate_v4(), 'Dessert', NOW()),
  (uuid_generate_v4(), 'Healthy', NOW());

-- Insert recipes (using subqueries to get user IDs)
INSERT INTO recipes (id, title, content, creator_id, created_at) VALUES
  (
    uuid_generate_v4(),
    'Classic Margherita Pizza',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ingredients"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1 pizza dough"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"200g fresh mozzarella"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"3-4 fresh tomatoes"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Fresh basil leaves"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Olive oil"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Salt"}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Instructions"}]},{"type":"orderedList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Preheat oven to 475°F"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Roll out pizza dough"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Top with sliced tomatoes and mozzarella"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bake for 10-12 minutes"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Garnish with fresh basil and drizzle with olive oil"}]}]}]}]}'::jsonb,
    (SELECT id FROM users WHERE username = 'chef_alice'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Chocolate Chip Cookies',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ingredients"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"2 1/4 cups all-purpose flour"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1 tsp baking soda"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1 cup butter, softened"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"3/4 cup granulated sugar"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"3/4 cup brown sugar"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"2 large eggs"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"2 cups chocolate chips"}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Instructions"}]},{"type":"orderedList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Preheat oven to 375°F"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Mix dry ingredients"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Cream butter and sugars"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Add eggs and vanilla"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Combine wet and dry ingredients"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Fold in chocolate chips"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Bake for 9-11 minutes"}]}]}]}]}'::jsonb,
    (SELECT id FROM users WHERE username = 'chef_alice'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Mediterranean Quinoa Bowl',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ingredients"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1 cup quinoa"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1 cucumber, diced"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"2 tomatoes, diced"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1/2 red onion, sliced"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1/2 cup feta cheese"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Kalamata olives"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Lemon vinaigrette"}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Instructions"}]},{"type":"orderedList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Cook quinoa according to package directions"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Let cool to room temperature"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Combine quinoa with vegetables"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Top with feta and olives"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Drizzle with lemon vinaigrette"}]}]}]}]}'::jsonb,
    (SELECT id FROM users WHERE username = 'chef_alice'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Spaghetti Carbonara',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ingredients"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"400g spaghetti"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"200g pancetta or bacon"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"4 large eggs"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"1 cup grated Parmesan"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Black pepper"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Salt"}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Instructions"}]},{"type":"orderedList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Cook pasta until al dente"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Fry pancetta until crispy"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Beat eggs with Parmesan"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Toss hot pasta with pancetta"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Remove from heat and mix in egg mixture"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Season with black pepper"}]}]}]}]}'::jsonb,
    (SELECT id FROM users WHERE username = 'chef_bob'),
    NOW()
  ),
  (
    uuid_generate_v4(),
    'Avocado Toast Deluxe',
    '{"type":"doc","content":[{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Ingredients"}]},{"type":"bulletList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"2 slices sourdough bread"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"2 ripe avocados"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"2 eggs"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Microgreens"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Red pepper flakes"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Lemon juice"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Salt and pepper"}]}]}]},{"type":"heading","attrs":{"level":2},"content":[{"type":"text","text":"Instructions"}]},{"type":"orderedList","content":[{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Toast bread until golden"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Mash avocados with lemon juice"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Poach eggs"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Spread avocado on toast"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Top with poached egg"}]}]},{"type":"listItem","content":[{"type":"paragraph","content":[{"type":"text","text":"Garnish with microgreens and red pepper flakes"}]}]}]}]}'::jsonb,
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
