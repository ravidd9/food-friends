let users = [
    {
        firstName: "danny",
        lastName: "brudner",
        birthday: new Date(1993, 10, 24),
        email: "dannybrudner@gmail.com",
        password: "dannyb",
        profilePic: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg",
        interests: ["raptors", "kite surfing", "entreprenuership", "programming"],
        interestedFood : ["hamburger", "shawarma"]
    },
    {
        firstName: "yossi",
        lastName: "dagan",
        birthday: new Date(1990, 9, 24),
        email: "yossidagan@gmail.com",
        password: "yossid",
        profilePic: "https://images.pexels.com/photos/462680/pexels-photo-462680.jpeg",
        interests: ["nba", "beach", "css"],
        interestedFood : ["hamburger", "pancakes"]

    },
    {
        firstName: "ravid",
        lastName: "cohen",
        birthday: new Date(1991, 5, 24),
        email: "ravidcohen@gmail.com",
        password: "ravidc",
        profilePic: "https://images.pexels.com/photos/842548/pexels-photo-842548.jpeg",
        interests: ["coding", "soccer", "business"],
        interestedFood :  ["pancakes", "falafel"]

    },
    {
        firstName: "srul",
        lastName: "da",
        birthday: new Date(1989, 3, 10),
        email: "srulda@gmail.com",
        password: "sruld",
        profilePic: "https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg",
        interests: ["nba", "game of thrones", "plants"],
        interestedFood :  ["philly cheessteak", "falafel"]

    },
    {
        firstName: "paul",
        lastName: "greenham",
        birthday: new Date(1985, 2, 1),
        email: "paulgreenham@gmail.com",
        password: "paulg",
        profilePic: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg",
        interests: ["dungeons and dragons", "history"],
        interestedFood :  ["philly cheessteak", "shawarma"]

    },
    {
        firstName: "avishai",
        lastName: "peres",
        birthday: new Date(1990, 7, 15),
        email: "avishaiperes@gmail.com",
        password: "avishaip",
        profilePic: "https://images.pexels.com/photos/834863/pexels-photo-834863.jpeg",
        interests: ["game of thrones", "aepi"],
        interestedFood :  ["fried wings", "pizza"]

    },
    {
        firstName: "nadav",
        lastName: "spitzer",
        birthday: new Date(1988, 1, 4),
        email: "nadavspitzer@gmail.com",
        password: "nadavs",
        profilePic: "https://images.pexels.com/photos/1138903/pexels-photo-1138903.jpeg",
        interests: ["programming", "entrepreneurship", "game of thrones"],
        interestedFood :  ["pancakes", "pizza"]

    },
    {
        firstName: "jona",
        lastName: "farache",
        birthday: new Date(1990, 8, 14),
        email: "jonafarache@gmail.com",
        password: "jonaf",
        profilePic: "https://images.pexels.com/photos/1139743/pexels-photo-1139743.jpeg",
        interests: ["literature", "algorithms", "biking"],
        interestedFood :  ["fried wings", "falafel"]

    },
    {
        firstName: "hunter",
        lastName: "spydiek",
        birthday: new Date(1994, 6, 9),
        email: "hunterspydiek@gmail.com",
        password: "hunters",
        profilePic: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg",
        interests: ["literature", "theatre", "puns"],
        interestedFood :  ["shawarma", "falafel"]

    },
    {
        firstName: "corinne",
        lastName: "gotlieb",
        birthday: new Date(1993, 8, 1),
        email: "corinnegotlieb@gmail.com",
        password: "corinneg",
        profilePic: "https://images.pexels.com/photos/736716/pexels-photo-736716.jpeg",
        interests: ["pets", "coding", "education"],
        interestedFood :  ["hamburger", "pizza"]

    },
    {
        firstName: "chen",
        lastName: "chenkin",
        birthday: new Date(1993, 7, 5),
        email: "chenchenkin@gmail.com",
        password: "chenc",
        profilePic: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
        interests: ["soccer", "coding", "economics"],
        interestedFood :  ["hamburger", "falafel"]
    },
    {

        firstName: "reut",
        lastName: "ker",
        birthday: new Date(1993, 1, 7),
        email: "reutker@gmail.com",
        password: "reutk",
        profilePic: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg",
        interests: ["travel", "baking", "web"],
        interestedFood :  ["philly cheessteak", "fried wings"]

    },
    {
        firstName: "mor",
        lastName: "zluf",
        birthday: new Date(1991, 4, 13),
        email: "morzluf@gmail",
        password: "morz",
        profilePic: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
        interests: ["board games", "gaming", "sports"],
        interestedFood :  ["pizza", "shawarma"]

    },
    {
        firstName: "reuben",
        lastName: "colb",
        birthday: new Date(1993, 2, 14),
        email: "reubencolb@gmail.com",
        password: "reubenc",
        profilePic: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
        interests: ["blogging", "digital marketing"],
        interestedFood :  ["falafel", "shawarma"]

    }
]


let food = [
    {
        name: "hamburger",
        pic: "https://assets.epicurious.com/photos/57c5c6d9cf9e9ad43de2d96e/6:4/w_620%2Ch_413/the-ultimate-hamburger.jpg",
        description: "In the mood for a super juicy burger.",
        budget: 50
    },
    {
        name: "pancakes",
        pic: "https://cdn.apartmenttherapy.info/image/fetch/f_auto,q_auto:eco,c_fill,g_auto,w_760/https://storage.googleapis.com/gen-atmedia/3/2018/12/8cfbcbb2919742682345681d469b7417a73e4dfe.jpeg",
        description: "Something sweet, something awesome. Goes great with maple syrup.",
        budget: 30
    },
    {
        name: "shawarma",
        pic: "http://www.touryourway.com/uploadImages/systemFiles/51.jpg",
        description: "Need some of that middle eastern meat.",
        budget: 40
    },
    {
        name: "falafel",
        pic: "https://sogrimshavua.co.il/wp-content/uploads/2018/02/Falafel-Mediterranean.jpg",
        description: "Medirerranean specialty. Need some of that fried falafel.",
        budget: 20
    },
    {
        name: "philly cheessteak",
        pic: "https://files.mishloha.co.il/files/menu_food_pic/FIL_51061_636038327078664756.jpg ",
        description: "Need t be spoiled with a nice fat chilli pheese steak.",
        budget: 60
    },
    {
        name: "fried wings",
        pic: "https://img.mako.co.il/2016/05/18/dixipr_c.jpg",
        description: "In the mood for something spice, in the mood for some nice wiiings.",
        budget: 40
    },
    {
        name: "pizza",
        pic: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/bbq-pizza-318-1547837614.jpg",
        description: "Nothing beats a great pizza.",
        budget: 30
    }
]

// module.exports = users
// module.exports = food