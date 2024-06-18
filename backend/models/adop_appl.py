from db import cursor, conn

class Adopt_applctn:
    TABLE_NAME = 'adoption'

    def __init__(self, name, phone, pet_id, street, city, zip):
        self.id = None
        self.name = name
        self.phone = phone
        self.pet_id = pet_id
        self.street = street
        self.city = city
        self.zip = zip

    def save(self):
        sql = f"""
        INSERT INTO {self.TABLE_NAME} (name, phone, pet_id, street, city, zip)
        VALUES (?, ?, ?, ?, ?, ?)
        """
        cursor.execute(sql, (self.name, self.phone, self.pet_id, self.street, self.city, self.zip))
        conn.commit()
        self.id = cursor.lastrowid
        return self

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "phone": self.phone,
            "pet_id": self.pet_id,
            "street": self.street,
            "city": self.city,
            "zip_code": self.zip
        }

    @classmethod
    def create_table(cls):
        sql = f"""
        CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone INTEGER UNIQUE NOT NULL,
            pet_id INTEGER NOT NULL REFERENCES pets(id),
            street TEXT NOT NULL,
            city TEXT NOT NULL,
            zip TEXT NOT NULL
        )
        """
        cursor.execute(sql)
        conn.commit()
        print("Adoption table created successfully!")

    @classmethod
    def drop_table(cls):
        cursor.execute(f"DROP TABLE IF EXISTS {cls.TABLE_NAME} ")
        conn.commit()

Adopt_applctn.drop_table()
# Adopt_applctn.create_table()