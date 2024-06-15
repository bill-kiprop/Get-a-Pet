from db import cursor, conn

class Pets:
    TABLE_NAME = 'pets'
    def __init__(self, name,age,specie,breed,description,image):
        self.id = None
        self.name = name
        self.age = age
        self.specie= specie
        self.breed =breed
        self.image = image
        self.description = description
        
    
    def save(self):
        sql = f"""
        INSERT INTO {self.TABLE_NAME}(name, age,specie,breed,description,image)
        VALUES (?,?,?,?,?,?)
        """
        cursor.execute(sql,(self.name,self.age,self.specie,self.breed,self.description,self.image))
        conn.commit()
        self.id = cursor.lastrowid
        print(f"{self.name} is added successfully")


    
    def to_dict(self):
        return{
            "id":self.id,
            "name":self.name,
            "age": self.age,
            "specie": self.specie,
            "breed":self.breed,
            "description":self.description,
            "image":self.image
        }

    @classmethod
    def find_all(cls):
        sql = f"""
        SELECT * FROM {cls.TABLE_NAME}
"""
        rows = cursor.execute(sql).fetchall()

        return [
            cls.row_to_instance(row)for row in rows
        ]

    

 


    def delete(self):
        sql = f"""
        DELETE FROM {self.TABLE_NAME}
        WHERE id = ?
        """
        cursor.execute(sql, (self.id,))
        conn.commit()
        self.id = None
        print(f"{self.name} with id {self.id} deleted successfully!")



    @classmethod
    def row_to_instance(cls, row):
        if row == None:
            return None

        pet = cls(row[1],row[2],row[3],row[4],row[5],row[6]) 
        pet.id = row[0]

        return pet


    @classmethod
    def create_table(cls):
        sql = f"""
        CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME}(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL,
            specie VARCHAR NOT NULL,
            breed VARCHAR NOT NULL,
            description TEXT NOT NULL,
            image TEXT NOT NULL
        )
        """
        cursor.execute(sql)
        conn.commit()
        print("pets table created successfully")

    @classmethod
    def drop_table(cls):
        cursor.execute("DROP TABLE IF EXISTS pets")
        conn.commit()
    
# Pets.create_table()


# Pets.drop_table()

# pets_data = [
#     ('Lacy', 4, 'Dog', 'Toy Poodle',
#      'Lacy is a charming 4-year-old Toy Poodle with a heart full of love and a playful spirit. She has a gorgeous apricot-colored coat that’s soft and fluffy, perfect for snuggling. Lacy is incredibly friendly and loving, always eager to greet you with a wagging tail and a happy bark. She loves playing fetch, exploring the outdoors, and learning new tricks, especially when there are treats involved. After a day of play, Lacy loves to curl up on a cozy lap for some quality cuddle time. She is house-trained, spayed, and up-to-date on all her vaccinations. Lacy gets along well with other small dogs and would thrive in a home where she gets plenty of love, attention, and daily exercise.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBHPdSZx9sZ-r0SGcYbq3XaxAv5eMuNYPtsw&s'),
#     ('Bella', 3, 'Dog', 'Shih Tzu',
#      'Bella is a sweet 3-year-old Shih Tzu with a friendly demeanor and a love for cuddles. She has a beautiful black and white coat that is soft to the touch. Bella enjoys short walks, playing with her toys, and snuggling up on the couch. She is good with children and other pets, making her a great addition to any family. Bella is house-trained, spayed, and up-to-date on her vaccinations.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyFChE4h4GctpZnFCCqM4Vaz5s4iFah4VXxg&s'),
#     ('Max', 5, 'Cat', 'Siamese',
#      'Max is an elegant 5-year-old Siamese cat with striking blue eyes and a sleek, cream-colored coat. He is an affectionate cat who loves to be around people and enjoys gentle petting. Max is quite playful and enjoys chasing laser pointers and playing with feather toys. He is neutered, litter-trained, and up-to-date on all his vaccinations. Max would be a wonderful companion for someone looking for a loving and playful cat.', 'https://www.litter-robot.com/media/blog/alex-meier-siamese.jpg'),
#     ('Charlie', 2, 'Dog', 'Beagle',
#      'Charlie is a lively 2-year-old Beagle with a keen sense of smell and a love for outdoor adventures. He has a tricolor coat and a cheerful personality. Charlie is great with kids and enjoys playing fetch and going on long walks. He is house-trained, neutered, and up-to-date on his vaccinations.', 'https://www.animalbehaviorcollege.com/wp-content/uploads/2015/03/beagle.jpg'),
#     ('Daisy', 1, 'Dog', 'Labrador Retriever',
#      'Daisy is a friendly 1-year-old Labrador Retriever with a beautiful yellow coat. She is energetic, loves to swim, and enjoys playing with other dogs. Daisy is well-behaved, house-trained, spayed, and up-to-date on her vaccinations.', 'https://animalcarecentersmyrna.com/wp-content/uploads/2022/02/labradorretriever2.jpeg'),
#     ('Milo', 3, 'Dog', 'Dachshund',
#      'Milo is a curious 3-year-old Dachshund with a smooth, reddish-brown coat. He loves to dig and explore his surroundings. Milo is affectionate and enjoys being around people. He is house-trained, neutered, and up-to-date on his vaccinations.', 'https://www.thesprucepets.com/thmb/8UgAnzf_7o7i7qPPr528XtM0IW8=/2121x0/filters:no_upscale():strip_icc()/GettyImages-839279536-313d30c290584bc0a207bc6243263bd4.jpg'),
#     ('Luna', 2, 'Cat', 'Persian',
#      'Luna is a gorgeous 2-year-old Persian cat with a long, white coat and expressive blue eyes. She is calm, affectionate, and loves being pampered. Luna enjoys lounging in sunny spots and being brushed. She is spayed, litter-trained, and up-to-date on her vaccinations.', 'https://cdn.shopify.com/s/files/1/0589/8262/9516/t/23/assets/persian-cat-pictures-21hn32h4yempw0cu-1702031742033.jpg?v=1702031743'),
#     ('Rocky', 4, 'Dog', 'Boxer',
#      'Rocky is a strong and playful 4-year-old Boxer with a brindle coat and a loving nature. He enjoys playing with toys, running, and spending time with his family. Rocky is house-trained, neutered, and up-to-date on his vaccinations.', 'https://nedhardy.com/wp-content/uploads/2020/10/brindle_boxer_3.jpg'),
#     ('Coco', 5, 'Dog', 'Pomeranian',
#      'Coco is a fluffy 5-year-old Pomeranian with a lively personality and a golden-brown coat. She loves being the center of attention and enjoys playing with small toys. Coco is house-trained, spayed, and up-to-date on her vaccinations.', 'https://media.os.fressnapf.com/cms/2020/07/ratgeber_hund_rasse_portraits_zwergspitz_1200x527.jpg?t=seoimg_703'),
#     ('Simba', 6, 'Cat', 'Maine Coon',
#      'Simba is a majestic 6-year-old Maine Coon with a thick, brown tabby coat. He is gentle, friendly, and enjoys being around people. Simba likes to play with feather toys and climb cat trees. He is neutered, litter-trained, and up-to-date on his vaccinations.', 'https://www.pawtracks.com/wp-content/uploads/sites/2/2021/08/brown-tabby-maine-coon-cat-standing-outside.jpg?fit=1024%2C1024&p=1'),
#     ('Lola', 1, 'Dog', 'French Bulldog',
#      'Lola is an adorable 1-year-old French Bulldog with a fawn coat and a playful attitude. She loves cuddling and playing with her favorite chew toys. Lola is house-trained, spayed, and up-to-date on her vaccinations.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZpXThebF7ld4h23vsep_wpyHE3iQ2gFhOeg&s'),
#     ('Oscar', 3, 'Cat', 'British Shorthair',
#      'Oscar is a handsome 3-year-old British Shorthair with a plush, blue-gray coat. He is calm, affectionate, and enjoys lounging in comfortable spots. Oscar is neutered, litter-trained, and up-to-date on his vaccinations.', 'https://cdn.royalcanin-weshare-online.io/mVbc9noBBKJuub5qA7pQ/v3/bp-lot-2-british-shorthair-color-outdoor'),
#     ('Pinky', 2, 'Dog', 'Golden Retriever',
#      'Pinky is a sweet 2-year-old Golden Retriever with a shiny, golden coat. She is friendly, loves to play fetch, and enjoys being around people and other dogs. Bella is house-trained, spayed, and up-to-date on her vaccinations.', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3YNRu7aelgluNIXT1OXPXdS5Xr2TbFpPf8Q&s'),
#     ('Molly', 4, 'Dog', 'Shih Tzu',
#      'Molly is a charming 4-year-old Shih Tzu with a fluffy, white and tan coat. She loves to be pampered and enjoys short walks and playing with her toys. Molly is house-trained, spayed, and up-to-date on her vaccinations.', 'https://www.dogster.com/wp-content/uploads/2011/09/white-and-brown-Shih-tzu-standing-on-the-grass_Radoslaw-Zmudzinski-Pixabay.jpeg'),
#     ('Oliver', 5, 'Cat', 'Bengal',
#      'Oliver is an active 5-year-old Bengal cat with a striking spotted coat. He is curious, loves to climb, and enjoys interactive toys. Oliver is neutered, litter-trained, and up-to-date on his vaccinations.', 'https://www.thebengalcats.com/cdn/shop/products/WhatsAppImage2020-11-18at2.34.14AM_1.jpg?v=1684226681'),
#     ('Sophie', 3, 'Dog', 'Cocker Spaniel',
#      'Sophie is a gentle 3-year-old Cocker Spaniel with a beautiful, wavy, brown coat. She enjoys long walks, playing with her toys, and being around people. Sophie is house-trained, spayed, and up-to-date on her vaccinations.', 'https://i.ytimg.com/vi/KoMyBjd1DJo/maxresdefault.jpg'),
#     ('Haile', 4, 'Dog', 'German Shepherd',
#      'Haile is a loyal 4-year-old German Shepherd with a black and tan coat. He is intelligent, loves to play fetch, and enjoys long walks. Max is house-trained, neutered, and up-to-date on his vaccinations.', 'https://cdn.britannica.com/79/232779-050-6B0411D7/German-Shepherd-dog-Alsatian.jpg'),
#     ('Zoe', 2, 'Cat', 'Sphynx',
#      'Zoe is an affectionate 2-year-old Sphynx cat with a hairless, wrinkled, peach-colored skin. She is social, loves to snuggle, and enjoys being around people. Zoe is spayed, litter-trained, and up-to-date on her vaccinations.', 'https://cdn.shopify.com/s/files/1/0557/6936/6711/files/hairless_Sphynx_cat_1024x1024.jpg?v=1642999042'),
#     ('Buddy', 1, 'Dog', 'Border Collie',
#      'Buddy is an energetic 1-year-old Border Collie with a black and white coat. He is highly intelligent, loves to herd, and enjoys playing with his favorite ball. Buddy is house-trained, neutered, and up-to-date on his vaccinations.', 'https://assets-au-01.kc-usercontent.com/ab37095e-a9cb-025f-8a0d-c6d89400e446/7d32ba22-9406-4d24-ab18-1a8f7f8153e8/article-border-collie.jpg'),
# ]

# for pet_data in pets_data:
#     pet = Pets(*pet_data)  # Unpack the tuple into the Pets constructor
#     pet.save()

