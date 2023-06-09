from app import app, db, bcrypt
from models import User, Projects, OwnerUser, MatchedUsers
from lorem_text import lorem


if __name__ == '__main__':
    with app.app_context():
        print('Clearing db...')

        User.query.delete()
        Projects.query.delete()
        OwnerUser.query.delete()
        MatchedUsers.query.delete()

        print('Adding users...')

        

        users = [
            User(name='John Doe', username='johndoe', email='johndoe@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='New York, USA', experience=3, bio = lorem.paragraph()),
            User(name='Jane Doe', username='janedoe', email= 'janedoe@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='New York, USA', experience=3, bio = lorem.paragraph()),
            User(name= 'Kylo Ren', username='kyloren', email='kyloren@empire.org', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Coruscant', experience=10,bio = lorem.paragraph()),
            User(name='Martin Scorcese', username='ThePastaProducer', email='martinscorcese@amblin.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='New York, USA', experience=30, bio = lorem.paragraph()),
            User(name='Steven Spielberg', username='TheBeard', email='etnevermakesithomelol@gottem.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', experience=40, bio = lorem.paragraph()),
            User(name='Alice Johnson',username='alicejohnson',email='alicejohnson@gmail.com',password=bcrypt.generate_password_hash('password').decode('utf-8'),location='Chicago, IL',experience=2, bio = lorem.paragraph()),
            User(name='Lara Croft', username='laracroft', email= 'laracroft@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='London, UK', experience=8, bio = lorem.paragraph()),
            User(name='Quentin Tarantino', username='qtarantino', email='qtarantino@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', experience=30, bio = lorem.paragraph()),
            User(name='Christopher Nolan', username='cnolan', email='cnolan@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='London, UK', experience=20, bio = lorem.paragraph()),
            User(name='Alfred Hitchcock', username='ahitchcock', email='ahitchcock@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='London, UK', experience=40, bio = lorem.paragraph()),
            User(name='Francis Ford Coppola', username='ffcoppola', email='ffcoppola@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', experience=35, bio = lorem.paragraph()),
            User(name='Stanley Kubrick', username='skubrick', email='skubrick@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='New York, NY', experience=30, bio = lorem.paragraph()),
            User(name='Hayao Miyazaki', username='hmiyazaki', email='hmiyazaki@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Tokyo, Japan', experience=40, bio = lorem.paragraph()),
            User(name='Woody Allen', username='wallen', email='wallen@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='New York, NY', experience=50, bio = lorem.paragraph()),
            User(name='James Cameron', username='jcameron', email='jcameron@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', experience=40, bio = lorem.paragraph()),
            User(name='Spike Lee', username='slee', email='slee@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='New York, NY', experience=35, bio = lorem.paragraph()),
            User(name='Akira Kurosawa', username='akurosawa', email='akurosawa@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Tokyo, Japan', experience=30, bio = lorem.paragraph()),
            User(name='David Fincher', username='dfincher', email='dfincher@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', experience=25, bio = lorem.paragraph()),
            User(name='Tim Burton', username='tburton', email='tburton@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', experience=30, bio = lorem.paragraph()),
            User(name='Akira Kurosawa', username='akirakurosawa', email='akirakurosawa@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Tokyo, Japan', experience=30, bio = lorem.paragraph()),
            User(name='Yasujiro Ozu', username='yasujiroozu', email='yasujiroozu@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Tokyo, Japan', experience=25, bio = lorem.paragraph()),
            User(name='Jean-Luc Godard', username='jeanlucgodard', email='jeanlucgodard@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Paris, France', experience=35, bio = lorem.paragraph()),
            User(name='François Truffaut', username='francoistruffaut', email='francoistruffaut@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Paris, France', experience=30, bio = lorem.paragraph()),
            User(name='Claude Chabrol', username='claudechabrol', email='claudechabrol@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Paris, France', experience=25, bio = lorem.paragraph()),
            User(name='Federico Fellini', username='federicofellini', email='federicofellini@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Rome, Italy', experience=25, bio = lorem.paragraph()),
            User(name='Roberto Rossellini', username='robertorossellini', email='robertorossellini@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Rome, Italy', experience=30, bio = lorem.paragraph()),
            User(name='Vittorio De Sica', username='vittoriodesica', email='vittoriodesica@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Rome, Italy', experience=20, bio = lorem.paragraph()),
            User(name='Darrell Roodt', username='darrellroodt', email='darrellroodt@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Johannesburg, South Africa', experience=12, bio = lorem.paragraph()),
            User(name='Gavin Hood', username='gavinhood', email='gavinhood@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Johannesburg, South Africa', experience=14, bio = lorem.paragraph()),
            User(name='Zola Maseko', username='zolamaseko', email='zolamaseko@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Johannesburg, South Africa', experience=10, bio = lorem.paragraph()),
            User(name='Youssef Chahine', username='youssefchahine', email='youssefchahine@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Cairo, Egypt', experience=20, bio = lorem.paragraph()),
            User(name='Radwan El-Kashef', username='radwanelkashef', email='radwanelkashef@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Cairo, Egypt', experience=18, bio = lorem.paragraph()),
            User(name='Shadi Abdel Salam', username='shadiabdelsalam', email='shadiabdelsalam@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Cairo, Egypt', experience=15, bio = lorem.paragraph()),
            User(name='Kunle Afolayan', username='kunleafolayan', email='kunleafolayan@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Lagos, Nigeria', experience=15, bio = lorem.paragraph()),
            User(name='Niyi Akinmolayan', username='niyiakinmolayan', email='niyiakinmolayan@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Lagos, Nigeria', experience=10, bio = lorem.paragraph()),
            User(name='Genevieve Nnaji', username='genevievennaji', email='genevievennaji@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Lagos, Nigeria', experience=12,bio=lorem.paragraph()),
            User(name='Kemi Adetiba', username='kemiadetiba', email= "testtest@gmail.com", password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Lagos, Nigeria', experience=12)
        ]
        db.session.add_all(users)
        db.session.commit()

        print('Users seeded')
        print('Seeding OwnerUsers...')

        owner_users = [
            OwnerUser(name='Kathleen Kennedy', username='kathleenkennedy', email='kathleenkennedy@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', bio='Acclaimed film producer', experience=30),
            OwnerUser(name='Lucy Fisher', username='lucyfisher', email='lucyfisher@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', bio='Esteemed film producer', experience=25),
            OwnerUser(name='Thomas Langmann', username='thomaslangmann', email='thomaslangmann@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Paris, France', bio='Renowned film producer', experience=30),
            OwnerUser(name='Alik Sakharov', username='aliksakharov', email='aliksakharov@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Moscow, Russia', bio='Esteemed film producer', experience=20),
            OwnerUser(name='Adele Romanski', username='adeleromanski', email='adeleromanski@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='New York, USA', bio='Renowned film producer', experience=15),
            OwnerUser(name='Dede Gardner', username='dedegardner', email='dedegardner@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', bio='Acclaimed film producer', experience=20),
            OwnerUser(name='David Heyman', username='davidheyman', email='davidheyman@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='London, UK', bio='Esteemed film producer', experience=25),
            OwnerUser(name='Toshiaki Nakazawa', username='toshiakinakazawa', email='toshiakinakazawa@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Tokyo, Japan', bio='Renowned film producer', experience=30),
            OwnerUser(name='Pierre-Ange Le Pogam', username='pierreangelepogam', email='pierreangelepogam@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='Paris, France', bio='Acclaimed film producer', experience=20),
            OwnerUser(name='Amy Pascal', username='amypascal', email='amypascal@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', bio='Esteemed film producer', experience=25),
            OwnerUser(name='Jeremy Thomas', username='jeremythomas', email='jeremythomas@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='London, UK', bio='Renowned film producer', experience=30),
            OwnerUser(name='Effie Brown', username='effiebrown', email='effiebrown@gmail.com', password=bcrypt.generate_password_hash('password').decode('utf-8'), location='California, USA', bio='Acclaimed film producer', experience=15),
        ]
        db.session.add_all(owner_users)
        db.session.commit()


        print('OwnerUsers seeded')
        print('Seeding Projects...')

        projects = [
            Projects(title='Star Wars: The Force Awakens', description='The seventh installment in the Star Wars film series, serving as a sequel to Return of the Jedi.', owner_id=1, location='California, USA', genre='Action, Adventure, Fantasy', image='https://cdn.vox-cdn.com/thumbor/8csW_DT10d8--2ImLNy85u1y-bo=/0x0:1536x864/1200x800/filters:focal(337x270:581x514)/cdn.vox-cdn.com/uploads/chorus_image/image/48434499/tfa_poster_wide_header-1536x864-324397389357.0.0.jpg'),
            Projects(title='E.T. the Extra-Terrestrial', description='A science fiction film about a young boy who befriends an extraterrestrial, trying to help him return home.', owner_id=1, location='California, USA', genre='Adventure, Family, Sci-Fi', image='https://m.media-amazon.com/images/I/41GoJs6JlcL._AC_UF894,1000_QL80_.jpg'),
            Projects(title='The Great Gatsby', description='An adaptation of F. Scott Fitzgerald\'s novel depicting the decadent lifestyle of wealthy individuals in the 1920s.', owner_id=3, location='California, USA', genre='Drama, Romance', image='https://s3.amazonaws.com/adg-bucket/the-great-gatsby-by-f-scott-fitzgerald/3419-medium.jpg'),
            Projects(title='Memoirs of a Geisha', description='Based on the novel by Arthur Golden, the film follows the story of a young Japanese girl who becomes a geisha.', owner_id=3, location='California, USA', genre='Drama, Romance', image='https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/chameleon/title-movie/244790_MEMOIRS%20OF%20A%20GEISHA_1400x2100%20UV_Eng_0.jpg?itok=Vt01XTKw'),
            Projects(title='The Artist', description='A French romantic comedy-drama film in the style of a black-and-white silent film.', owner_id=3, location='Paris, France', genre='Comedy, Drama, Romance', image='https://filmconcertslive.com/wp-content/uploads/2016/11/Artist_still_poster-3-500x760.jpg'),
            Projects(title='The Revenant', description='A biographical western film based on the experiences of frontiersman Hugh Glass.', owner_id=4, location='California, USA', genre='Action, Adventure, Biography', image='https://lumiere-a.akamaihd.net/v1/images/revenant_584x800_6d98d1b6.jpeg?region=0%2C0%2C584%2C800'),
            Projects(title='Morris From America', description= 'A teenage African American rapper adapts to life in Heidelberg, Germany, alongside his widowed father and falls in love with a rebellious classmate. He struggles to belong and pursue his dreams of hip-hop stardom.', owner_id=5, location='New York, USA', genre='Comedy, Drama, Romance', image='https://m.media-amazon.com/images/M/MV5BNDgyMzU5MTc2Ml5BMl5BanBnXkFtZTgwMTYwNzcxOTE@._V1_.jpg'),
            Projects(title='Moonlight', description='A look at three defining chapters in the life of Chiron, a young black man growing up in Miami. His epic journey to manhood is guided by the kindness, support and love of the community that helps raise him.', owner_id=5, location='California, USA', genre='Drama', image='https://img4.hulu.com/user/v3/artwork/fc634fff-8a98-4138-9c4e-6486a6f33573?base_image_bucket_name=image_manager&base_image=92328b8d-508b-4c8c-8052-a725d7c7ccc5&region=US&format=jpeg&size=952x536'),
            Projects(title='12 Years a Slave', description='A historical drama based on the autobiography of Solomon Northup, a free black man who was kidnapped and sold into slavery in the 19th century.', owner_id=6, location='California, USA', genre='Biography, Drama, History', image='https://www.searchlightpictures.com/media/original_images/poster-50932b1e-abf0-4f17-8e1a-357fb191953f.jpg'),
            Projects(title='World War Z', description='An apocalyptic action horror film based on the novel by Max Brooks, depicting a global zombie pandemic and the efforts to stop it.', owner_id=6, location='London, UK', genre='Action, Horror, Sci-Fi', image='https://image.api.playstation.com/cdn/UP2746/CUSA14046_00/0sdmApE8KNjQkMY5y3PFa7KJzf7MIx2K.png'),
            Projects(title='Barbie', description='A live-action film adaptation based on the popular Barbie doll franchise, following the adventures of Barbie and her friends in a whimsical world.', owner_id=7, location='New York, USA', genre='Adventure, Family, Fantasy', image='https://cdn.shopify.com/s/files/1/0568/1132/3597/files/BB_MovieTrailer_Banner_M_640x@2x.jpg?v=1682628838'),
            Projects(title='Paddington Bear 3', description='The third installment in the delightful family film series following the lovable Paddington Bear on another charming adventure in London.', owner_id=7, location='London, UK', genre='Adventure, Comedy, Family', image='https://i.ytimg.com/vi/U0aFJEtO3c8/maxresdefault.jpg'),
            Projects(title='Wonka', description='A whimsical prequel to the beloved Willy Wonka story, delving into the origins of the eccentric chocolatier and his extraordinary journey in the world of candy-making.', owner_id=7, location='New York, USA', genre='Adventure, Family, Fantasy', image='https://socialjunkie.com/wp-content/uploads/2022/05/IMG_5026-1024x538.png'),
            Projects(title='13 Assassins', description='A samurai action film set in feudal Japan, where a group of thirteen assassins is assembled to take down a sadistic and corrupt lord.', owner_id=8, location='Tokyo, Japan', genre='Action, Drama', image='https://m.media-amazon.com/images/S/pv-target-images/e2f2c8e177ce339c53c5be4061fa12589ad3e4a3edc12dc4edadf890814de484._UR1920,1080_.jpg'),
            Projects(title='The Last Samurai', description='An American epic war film set in the 1870s, where a former US Army officer is hired by the Emperor of Japan to train the country\'s first army in the art of modern warfare.', owner_id=8, location='Tokyo, Japan', genre='Action, Drama, History', image='https://benjweinberg.files.wordpress.com/2020/03/1-997.jpg?w=1024'),
            Projects(title='Colour Me Kubrick', description='A comedy-drama film inspired by true events, following the misadventures of a man who impersonates the iconic filmmaker Stanley Kubrick.', owner_id=9, location='London, UK', genre='Comedy, Drama', image='https://images-na.ssl-images-amazon.com/images/S/pv-target-images/d17794207ea1010e0e498362e2970e1fd7789edfef73f19691736a6caacad534._UY500_UX667_RI_TTW_.jpg'),
            Projects(title='Spider-Man: Homecoming', description='A superhero film featuring the iconic Marvel character Spider-Man, as he navigates high school life while facing a new villain threatening his city.', owner_id=10, location='California, USA', genre='Action, Adventure, Sci-Fi', image='https://m.media-amazon.com/images/M/MV5BOGQ5YTM3YzctOTVmMC00OGIyLWFkZTYtMWYwOWZhMjA2MWMwXkEyXkFqcGdeQXVyMjUyMTE5MA@@._V1_FMjpg_UX1000_.jpg'),
            Projects(title='Little Women', description='A period drama film based on Louisa May Alcott\'s novel, following the lives of four sisters as they come of age in the aftermath of the American Civil War.', owner_id=10, location='California, USA', genre='Drama, Romance', image='https://www.sonypictures.com/sites/default/files/styles/max_560x840/public/title-key-art/DP_4944434_LittleWomen_Cover_2000x3000_US.jpg?itok=HOMWAysI'),
            Projects(title='The Last Emperor', description='An epic historical drama film depicting the life of Puyi, the last Emperor of China, from his early reign to his later life as a commoner.', owner_id=11, location='London, UK', genre='Biography, Drama, History', image='https://upload.wikimedia.org/wikipedia/en/e/e5/The_Last_Emperor_filmposter.jpg'),
            Projects(title='Merry Christmas, Mr. Lawrence', description='A war drama film set during World War II, exploring the complex relationships between British prisoners of war and their Japanese captors.', owner_id=11, location='London, UK', genre='Drama, War', image='https://cdn.posteritati.com/posters/000/000/064/152/merry-christmas-mr-lawrence-md-web.jpg'),
            Projects(title='Dear White People', description='A satirical comedy-drama film that follows the lives of several African-American students at an Ivy League college as they navigate issues of race, identity, and cultural appropriation.', owner_id=12, location='California, USA', genre='Comedy, Drama', image='https://images-na.ssl-images-amazon.com/images/S/pv-target-images/704a82d94ccdde01b8752e43375472d504d247ee0a21de6a712061e999ac2b50._UY500_UX667_RI_TTW_.jpg')
            ]

        db.session.add_all(projects)
        db.session.commit()

        print('Projects seeded')
        print('Seeding matched users/projects...')

        project_to_users = [
            MatchedUsers(project_id=1, user_id=1),
            MatchedUsers(project_id=1, user_id=2),
            MatchedUsers(project_id=8, user_id=3),
            MatchedUsers(project_id=1, user_id=30),
            MatchedUsers(project_id=20, user_id=30),
            MatchedUsers(project_id=5, user_id=6),
            MatchedUsers(project_id=10, user_id=30),
            MatchedUsers(project_id=21, user_id=17),
            MatchedUsers(project_id=12, user_id=18),
            MatchedUsers(project_id=1, user_id=28),
            MatchedUsers(project_id=17, user_id=20),
            MatchedUsers(project_id=12, user_id=21),
            MatchedUsers(project_id=4, user_id=22),
            MatchedUsers(project_id=2, user_id=35),
            MatchedUsers(project_id=3, user_id=24),
        ]


        db.session.add_all(project_to_users)
        db.session.commit()

        print('Matched users seeded')


        print('Seeding Complete!')
