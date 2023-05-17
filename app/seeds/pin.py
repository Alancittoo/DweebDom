from app.models import db, Pin, environment, SCHEMA
from sqlalchemy.sql import text

def seed_pins():
    pin1 = Pin(
        image_url = 'https://i.pinimg.com/236x/c0/37/c3/c037c3126d2a9eec910a8724aed0e8fa.jpg',
        title = 'Killua and Pepsi',
        description = 'Modern Hunter x Hunter',
        user_id = 1
    )
    pin2 = Pin(
        image_url = 'https://i.pinimg.com/originals/01/b6/4e/01b64e2500a03c4ccc366be8e48ff629.gif',
        title = 'Anime ?',
        description = 'I saw this and I was wondering which anime its from?',
        user_id = 1
    )
    pin3 = Pin(
        image_url = 'https://i.pinimg.com/originals/68/2c/2a/682c2a37425ebf4fbdb75917519f8cb5.gif',
        title = 'Nostalgic',
        description = 'Miss the old days',
        user_id = 1
    )
    pin4 = Pin(
        image_url = 'https://i.pinimg.com/originals/4e/af/4b/4eaf4b191d08b09368134f4f8939c277.gif',
        title = 'Madara',
        description = 'This guys is too badass',
        user_id = 1
    )
    pin5 = Pin(
        image_url = 'https://i.pinimg.com/originals/12/15/cf/1215cfe54d09014ca375975c540dbf79.gif',
        title = 'Can you guess this iconic anime?',
        description = '10 points to whoever can',
        user_id = 1
    )
    pin6 = Pin(
        image_url = 'https://i.pinimg.com/originals/7c/14/5c/7c145c8cb222823ce0ee82da30706b70.gif',
        title = 'Itachi Uchiha',
        description = 'The one and only goat',
        user_id = 1
    )
    pin7 = Pin(
        image_url = 'https://i.pinimg.com/236x/e0/20/be/e020bea99b4434b9e3b3cb2c60acae84.jpg',
        title = 'Cute and delicious ',
        description = 'Pikachu is my go to meal now',
        user_id = 1
    )
    pin8 = Pin(
        image_url = 'https://i.pinimg.com/236x/a2/45/24/a24524c60d6ea16adf8cf6aad6b45e77.jpg',
        title = 'What I want nowwww',
        description = 'who could you eat this with?',
        user_id = 1
    )
    pin9 = Pin(
        image_url = 'https://i.pinimg.com/236x/9f/71/d6/9f71d690475ae0b9ab6f381118326bff.jpg',
        title = 'This is heaven',
        description = 'this is gonna fill me for a whole day',
        user_id = 1
    )
    pin10 = Pin(
        image_url = 'https://i.pinimg.com/236x/b2/36/0b/b2360be490abf5703775d4620f7fe7bc.jpg',
        title = 'fruit bowl',
        description = 'fruits gotta be my favorite',
        user_id = 1
    )
    pin11 = Pin(
        image_url = 'https://i.pinimg.com/236x/a3/23/6b/a3236bdc38a4525c960fa85f0e92d557.jpg',
        title = 'chocolate strawberries',
        description = 'This has to be S+ tier',
        user_id = 1
    )
    pin12 = Pin(
        image_url = 'https://i.pinimg.com/236x/b1/43/5b/b1435bcffad70ee66a8b78ab8f73ed99.jpg',
        title = 'SQUIRT',
        description = 'YOU SO TOTALLY ROCK DUDE',
        user_id = 1
    )
    pin13 = Pin(
        image_url = 'https://i.pinimg.com/236x/87/da/5d/87da5dce0f38b58f6c836a6e03dd005b.jpg',
        title = 'Sleepy',
        description = 'he fell asleep on my book, the audacity',
        user_id = 1
    )
    pin14 = Pin(
        image_url = 'https://i.pinimg.com/236x/40/84/78/4084780614a0308288f32ed6002f82af.jpg',
        title = 'Oh no',
        description = '2 seconds after this picture he ran into me',
        user_id = 1
    )
    pin15 = Pin(
        image_url = 'https://i.pinimg.com/236x/5e/dd/fc/5eddfc98ee41619605ecc7037be2c08b.jpg',
        title = 'Mood',
        description = 'Me when the waiter walks past with food that isnt mine',
        user_id = 1
    )
    pin16 = Pin(
        image_url = 'https://i.pinimg.com/236x/0d/2f/57/0d2f57e33779c96833ceb2f2ed8bc819.jpg',
        title = 'Buff boy',
        description = 'I think homie forgot who the owner was',
        user_id = 1
    )
    pin17 = Pin(
        image_url = 'https://i.pinimg.com/236x/29/93/22/299322b79221960e29c2c1d24a939a87.jpg',
        title = 'this is my dog',
        description = 'again.. this is normal',
        user_id = 1
    )
    pin18 = Pin(
        image_url = 'https://i.pinimg.com/236x/40/ec/ac/40ecac4d95877a43e7325b1740e97121.jpg',
        title = 'lost cat',
        description = 'I dont want him please take hime',
        user_id = 1
    )
    pin19 = Pin(
        image_url = 'https://i.pinimg.com/236x/67/c4/34/67c4347f43b9cb000851302784db672b.jpg',
        title = 'Rare pic',
        description = 'this a rare pic of my ex',
        user_id = 1
    )
    pin19 = Pin(
        image_url = 'https://i.pinimg.com/236x/31/fc/01/31fc0130efe18af5f58d70ca2f11357b.jpg',
        title = 'cute but deadly',
        description = 'his halloween costume',
        user_id = 1
    )
    pin20 = Pin(
        image_url = 'https://i.pinimg.com/236x/6c/d2/90/6cd29067ec0e01bcf71a955a15ec7219.jpg',
        title = 'happened to me last night',
        description = 'consequences of being a night owl',
        user_id = 1
    )
    pin21 = Pin(
        image_url = 'https://i.pinimg.com/236x/99/e7/58/99e75891bfefb5f775705d45c3a490e0.jpg',
        title = 'Combo Inspo',
        description = 'What do yall think?',
        user_id = 2
    )
    pin22 = Pin(
        image_url = 'https://i.pinimg.com/236x/e3/73/83/e373830ff4d17cc47516193ff5fde453.jpg',
        title = 'I need',
        description = 'if anyone got a pair for sale hmu',
        user_id = 2
    )
    pin23 = Pin(
        image_url = 'https://i.pinimg.com/236x/e2/98/07/e2980746985fd2517e01527d4696add8.jpg',
        title = 'Best slippers',
        description = 'Pochita slippers',
        user_id = 2
    )
    pin24 = Pin(
        image_url = 'https://i.pinimg.com/474x/23/b9/eb/23b9eb60cc5151b938d60b318830626c.jpg',
        title = 'These are Clean',
        description = 'Def a top 5 of my pairs',
        user_id = 2
    )
    pin25 = Pin(
        image_url = 'https://i.pinimg.com/236x/bb/83/a0/bb83a0981bee1cf37ba822409df27b56.jpg',
        title = 'LOOKING FOR',
        description = 'if you got these pairs lmk',
        user_id = 2
    )
    pin26 = Pin(
        image_url = 'https://i.pinimg.com/236x/33/63/a4/3363a40754f621e0a0d78d27f1f42adf.jpg',
        title = 'The Hollow',
        description = "Hell's Paradise ",
        user_id = 2
    )
    pin27 = Pin(
        image_url = 'https://i.pinimg.com/236x/87/fc/f0/87fcf081efaa3ae942d4f3c9570aa912.jpg',
        title = 'Astro Man',
        description = 'Little cool design I made',
        user_id = 2
    )
    pin28 = Pin(
        image_url = 'https://i.pinimg.com/236x/0c/b7/50/0cb7508eb272220f48a70e76a7d45693.jpg',
        title = 'Gamer setup?',
        description = 'the dream is to get this',
        user_id = 2
    )
    pin29 = Pin(
        image_url = 'https://i.pinimg.com/236x/7d/5e/0e/7d5e0e20247b26da673844aac99f186e.jpg',
        title = 'Frank ',
        description = 'Wish he dropped more songs',
        user_id = 2
    )
    pin30 = Pin(
        image_url = 'https://i.pinimg.com/236x/af/99/7b/af997bd9ce063b60705e71b7c21b8198.jpg',
        title = 'Honestly true',
        description = 'Once my fav song comes on',
        user_id = 2
    )
    pin31 = Pin(
        image_url = 'https://i.pinimg.com/originals/58/1c/70/581c70082e55eb9f9b4e74f5947d44f4.gif',
        title = 'Jake bobbin his head',
        description = 'this a mood',
        user_id = 2
    )
    pin32 = Pin(
        image_url = 'https://i.pinimg.com/originals/4d/c0/82/4dc0827cb68453772d624b48c3c3f566.gif',
        title = 'Gambino',
        description = 'He so underrated ',
        user_id = 2
    )
    pin33 = Pin(
        image_url = 'https://i.pinimg.com/originals/94/6d/2a/946d2a3adb41c1805ef3c4475365cd92.gif',
        title = 'Oldschool',
        description = 'just something to post',
        user_id = 2
    )
    pin34 = Pin(
        image_url = 'https://i.pinimg.com/originals/24/5f/47/245f47339f19df87338b0609a8132f01.gif',
        title = 'In my own world',
        description = '',
        user_id = 2
    )
    pin35 = Pin(
        image_url = 'https://i.pinimg.com/236x/b3/2e/0e/b32e0e8503a5cddc2eb0c33e3ca0355a.jpg',
        title = 'Da whip',
        description = 'Yes this is me',
        user_id = 2
    )
    pin36 = Pin(
        image_url = 'https://i.pinimg.com/236x/df/09/80/df098022b2082e1ab3e90453d97b7cc0.jpg',
        title = 'Duo Kings',
        description = 'Name a better duo',
        user_id = 2
    )
    pin37 = Pin(
        image_url = 'https://i.pinimg.com/236x/85/a2/1e/85a21e94194df18634428784a80456b5.jpg',
        title = 'miss the streets',
        description = 'its so calming back in Japan',
        user_id = 2
    )
    pin37 = Pin(
        image_url = 'https://i.pinimg.com/236x/76/ed/8f/76ed8f337767c9214bcc6c373cb224be.jpg',
        title = 'This looks dope',
        description = 'Just a pic I took today and wanted to share',
        user_id = 2
    )
    pin38 = Pin(
        image_url = 'https://i.pinimg.com/236x/97/9e/40/979e401eb51f4c00c05d1d2046ddf5f3.jpg',
        title = 'This is amazing ',
        description = 'wish more people could experience this',
        user_id = 2
    )
    pin39 = Pin(
        image_url = 'https://i.pinimg.com/564x/ce/7f/19/ce7f1946aeca57615374bc9997ada57f.jpg',
        title = 'Old Games',
        description = 'They just dont make these kinda games anymore',
        user_id = 2
    )
    pin40 = Pin(
        image_url = 'https://i.pinimg.com/236x/d5/5b/6c/d55b6c725a66bd51dde099652c95cda4.jpg',
        title = 'OLDIES',
        description = 'How many games can you spot',
        user_id = 2
    )
    pin41 = Pin(
        image_url = 'https://i.pinimg.com/236x/c6/6b/63/c66b63803c16df76c7fdb232afa12b4f.jpg',
        title = 'New pc setup',
        description = 'Mightve gone overboard',
        user_id = 3
    )
    pin42 = Pin(
        image_url = 'https://i.pinimg.com/236x/da/dc/75/dadc75b09baaaa01275dfb186391d883.jpg',
        title = 'Dont stop',
        description = 'Keep Going',
        user_id = 3
    )
    pin43 = Pin(
        image_url = 'https://i.pinimg.com/236x/87/a3/fd/87a3fddf4d05cb9cd6b06f8bb1e258fa.jpg',
        title = 'Guess who',
        description = '15 points for guessing right',
        user_id = 3
    )
    pin44 = Pin(
        image_url = 'https://i.pinimg.com/originals/76/b2/76/76b276ee334fbfd5f417297b5cd2475a.gif',
        title = 'Jake understand',
        description = 'When I wanna be healthy but junk food too good',
        user_id = 3
    )
    pin45 = Pin(
        image_url = 'https://i.pinimg.com/originals/57/61/5b/57615b8c0092a66c1d4058b1692955cc.gif',
        title = 'Duck',
        description = 'Nothing to see here',
        user_id = 3
    )
    pin46 = Pin(
        image_url = 'https://i.pinimg.com/originals/bd/f8/66/bdf86634deed4a573d040fb64252f1b7.gif',
        title = 'Gecko',
        description = 'Dancing  gecko',
        user_id = 3
    )
    pin47 = Pin(
        image_url = 'https://i.pinimg.com/originals/66/28/6c/66286c21e00a4ef6707abb4bfe19dcb3.gif',
        title = 'My dance',
        description = 'I do this everywhere',
        user_id = 3
    )
    pin48 = Pin(
        image_url = 'https://i.pinimg.com/236x/d7/c9/94/d7c99442dffcda69e55e257fdf2fdede.jpg',
        title = 'OG',
        description = 'The era was amazing',
        user_id = 3
    )
    pin49 = Pin(
        image_url = 'https://i.pinimg.com/236x/fa/be/34/fabe3484adf6cb42eedb04c3873e189d.jpg',
        title = 'ASAP',
        description = 'He dont miss',
        user_id = 3
    )
    pin50 = Pin(
        image_url = 'https://i.pinimg.com/564x/c8/ff/6a/c8ff6a4d2a3102e883fa497c3558c8ed.jpg',
        title = 'Lil Uzi',
        description = 'one of the best',
        user_id = 3
    )

    data = [pin1, pin2, pin3, pin4, pin5, pin6, pin7, pin8, pin9, pin10, pin11, pin12, pin13, pin14, pin15, pin16, pin17, pin18, pin19, pin20, pin21, pin22, pin23, pin24, pin25, pin26, pin27, pin28, pin29, pin30, pin31, pin32, pin33, pin34, pin35, pin36, pin37, pin38, pin39, pin40, pin41, pin42, pin43, pin44, pin45, pin46, pin47, pin48, pin49, pin50]

    for pin_data in data:
        db.session.add(pin_data)

    db.session.commit()

def undo_pins():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
