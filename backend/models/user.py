from db import cursor, conn

class User:
    TABLE_NAME = 'users'

    def __init__(self, name, phone ,address,bio,image):
        self.id = None
        self.name =name
        self.phone = phone
        self.address = address
        self.bio = bio
        self.image = image

    def save(self):
        sql = f"""
        INSERT INTO {self.TABLE_NAME}(name, phone, address, bio ,image)
        VALUES(?,?,?,?,?)
        """
        cursor.execute(sql,(self.name,self.phone,self.address,self.bio,self.image))
        conn.commit()
        self.id = cursor.lastrowid
        return self
    

    def to_dict(self):
        return{
            'id': self.id,
            "name": self.name,
            "phone":self.phone,
            "address":self.address,
            "bio":self.bio,
            "image": self.image
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
    
    @classmethod
    def find_one(cls, id):
        sql =f'''
        SELECT * FROM {cls.TABLE_NAME}
        WHERE id = ?
        '''
        row = cursor.execute(sql, (id ,)).fetchone()
        return cls.row_to_instance(row)


    @classmethod
    def row_to_instance(cls,row):
        if row == None:
            return None
        
        user = cls(row[1],row[2],row[3],row[4],row[5])
        user.id = row[0]

        return user 


    @classmethod
    def drop_table(cls):
        cursor.execute(f"DROP TABLE IF EXISTS {cls.TABLE_NAME}")
        conn.commit()

    @classmethod
    def create_table(cls):
        sql = f"""
            CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME}(
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone INTEGER NOT NULL UNIQUE,
            address TEXT NOT NULL,
            bio TEXT NOT NULL,
            image VARCHAR NOT NULL 

            )

        """
        cursor.execute(sql)
        conn.commit()
        print('users table created')

# User.create_table()  
# # User.drop_table()  

# users_data = [
#     ('John Doe', 1234567890, '123 Main St', 'A brief bio of John', 'https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671116.jpg?size=338&ext=jpg&ga=GA1.1.1141335507.1718582400&semt=ais_user'),
#     ('Jane Smith', 2345678901, '456 Elm St', 'A brief bio of Jane', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5cs2a6mC1TEzyK0pbHWTd9phxroNBdNQwN05w_YQ-yZ-cMu5oaQLBKFiDs_zgWAQJ3N0&usqp=CAU'),
#     ('Jim Beam', 3456789012, '789 Oak St', 'A brief bio of Jim', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLljN7sbq1RgM_oT85l-VSYiMZ2C_zzkLkjZ4gIV7ivI-Miu5dnZLTFQQRN2pDL0ojYpQ&usqp=CAU')
# ]
# # Adding users to the database
# for user_data in users_data:
#     user = User(*user_data)
#     user.save()
#     print(f'Added user: {user.name}')
    