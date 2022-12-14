# DELETE existing tables
ProjectAsset.destroy_all
Project.destroy_all
Asset.destroy_all
User.destroy_all


# CREATE Users
puts "Seeding users..."
user1 = User.create(
  username: "emmett",
  password: "happy",
  email: "me@email.com",
  first_name: "Emmett",
  last_name: "Kochie"
)

user2 = User.create(
  username: "frida",
  password: "sweet",
  email: "me2@email.com",
  first_name: "Frida",
  last_name: "Kochie"
)

# CREATE Assets
puts "Seeding assets..."
asset1 = Asset.create(
  title: Faker::Hipster.word,
  description: Faker::Hipster.paragraph,
  source: Faker::GreekPhilosophers.name,
  tags: "one two three",
  user_id: user2.id,
  image_url: Faker::LoremFlickr.image
)

asset2 = Asset.create(
  title: Faker::Hipster.word,
  description: Faker::Hipster.paragraph,
  source: Faker::GreekPhilosophers.name,
  tags: "one two three",
  user_id: user2.id,
  image_url: Faker::LoremFlickr.image
)

asset3 = Asset.create(
  title: Faker::Hipster.word,
  description: Faker::Hipster.paragraph,
  source: Faker::GreekPhilosophers.name,
  tags: "one two three",
  user_id: user2.id,
  image_url: Faker::LoremFlickr.image
)

asset4 = Asset.create(
  title: Faker::Hipster.word,
  description: Faker::Hipster.paragraph,
  source: Faker::GreekPhilosophers.name,
  tags: "one two three",
  user_id: user2.id,
  image_url: Faker::LoremFlickr.image
)

asset5 = Asset.create(
  title: Faker::Hipster.word,
  description: Faker::Hipster.paragraph,
  source: Faker::GreekPhilosophers.name,
  tags: "one two three",
  user_id: user1.id,
  image_url: Faker::LoremFlickr.image
)

asset6 = Asset.create(
  title: Faker::Hipster.word,
  description: Faker::Hipster.paragraph,
  source: Faker::GreekPhilosophers.name,
  tags: "one two three",
  user_id: user1.id,
  image_url: Faker::LoremFlickr.image
)

# CREATE Projects
puts "Seeding projects..."
project1 = Project.create(
  proname: Faker::Hipster.word,
  prostatus: "new",
  summary: Faker::Hipster.paragraph,
  user_id: user1.id,
)

project2 = Project.create(
  proname: Faker::Hipster.word,
  prostatus: "new",
  summary: Faker::Hipster.paragraph,
  user_id: user2.id,
)

project3 = Project.create(
  proname: Faker::Hipster.word,
  prostatus: "new",
  summary: Faker::Hipster.paragraph,
  user_id: user2.id,
)

project4 = Project.create(
  proname: Faker::Hipster.word,
  prostatus: "new",
  summary: Faker::Hipster.paragraph,
  user_id: user1.id,
)

project5 = Project.create(
  proname: Faker::Hipster.word,
  prostatus: "new",
  summary: Faker::Hipster.paragraph,
  user_id: user2.id,
)

# CREATE ProjectAssets
puts "Seeding project assets..."
ProjectAsset.create(project_id: project1.id, asset_id: asset1.id)
ProjectAsset.create(project_id: project1.id, asset_id: asset2.id)
ProjectAsset.create(project_id: project1.id, asset_id: asset3.id)
ProjectAsset.create(project_id: project1.id, asset_id: asset4.id)
ProjectAsset.create(project_id: project1.id, asset_id: asset5.id)
ProjectAsset.create(project_id: project2.id, asset_id: asset3.id)
ProjectAsset.create(project_id: project2.id, asset_id: asset4.id)
ProjectAsset.create(project_id: project2.id, asset_id: asset5.id)
ProjectAsset.create(project_id: project2.id, asset_id: asset6.id)
ProjectAsset.create(project_id: project3.id, asset_id: asset1.id)
ProjectAsset.create(project_id: project3.id, asset_id: asset2.id)
ProjectAsset.create(project_id: project3.id, asset_id: asset3.id)
ProjectAsset.create(project_id: project4.id, asset_id: asset3.id)
ProjectAsset.create(project_id: project4.id, asset_id: asset4.id)
ProjectAsset.create(project_id: project4.id, asset_id: asset5.id)
ProjectAsset.create(project_id: project4.id, asset_id: asset6.id)
ProjectAsset.create(project_id: project4.id, asset_id: asset6.id)
ProjectAsset.create(project_id: project5.id, asset_id: asset2.id)
ProjectAsset.create(project_id: project5.id, asset_id: asset5.id)
ProjectAsset.create(project_id: project5.id, asset_id: asset6.id)

puts "Done seeding!"
