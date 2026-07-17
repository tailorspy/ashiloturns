// Array with image details.

var paintings = [
  {
    file : "images/mona_lisa.png",
    artist : "Leonardo Da Vinci",
    title : "Mona Lisa",
    links : [
      "https://en.wikipedia.org/wiki/Mona_Lisa",
      "https://en.wikipedia.org/wiki/Leonardo_da_Vinci",
    ]
  },
  {
    file : "images/hell_courtesan.png",
    artist : "Kawanabe Kyosai",
    title : "Hell Courtesan",
    links : [
      "https://en.wikipedia.org/wiki/Hell_Courtesan",
      "https://en.wikipedia.org/wiki/Kawanabe_Ky%C5%8Dsai",
    ]
  },
  {
    file : "images/storm_on_the_sea_of_galilee.png",
    artist : "Rembrandt",
    title : "The Storm on the Sea of Galilee",
    links : [
      "https://en.wikipedia.org/wiki/The_Storm_on_the_Sea_of_Galilee",
      "https://en.wikipedia.org/wiki/Rembrandt",
    ]
  },
  {
    file : "images/girl_with_a_pearl_earring.png",
    artist : "Johannes_Vermeer",
    title : "Girl with a Pearl Earring",
    links : [
      "https://en.wikipedia.org/wiki/Girl_with_a_Pearl_Earring",
      "https://en.wikipedia.org/wiki/Johannes_Vermeer",
    ]
  },
  {
    file : "images/entrance_of_the_masked_dancers.png",
    artist : "Edgar Degas",
    title : "Entrance of the Masked Dancers",
    links : [
      "https://en.wikipedia.org/wiki/Edgar_Degas",
    ]
  },
  {
    file : "images/the_last_judgement.png",
    artist : "Michelangelo",
    title : "The Last Jedgment",
    links : [
      "https://en.wikipedia.org/wiki/The_Last_Judgment_(Michelangelo)",
      "https://en.wikipedia.org/wiki/Michelangelo",
    ]
  },
  {
    file : "images/saint_george_and_the_dragon.png",
    artist : "Raphael",
    title : "Saint George and the Dragon",
    links : [
      "https://en.wikipedia.org/wiki/Raphael",
    ]
  },
  {
    file : "images/night_revels.png",
    artist : "Gu Hongzhong",
    title : "Night Revels of Han Xizai",
    links : [
      "https://en.wikipedia.org/wiki/Gu_Hongzhong",
    ]
  },
  {
    file : "images/thirteen_emperor_scroll.png",
    artist : "Yam Liben",
    title : "Thirteen Emperor Scroll",
    links : [
      "https://commons.wikimedia.org/wiki/Thirteen_Emperors_Scroll",
      "https://en.wikipedia.org/wiki/Yan_Liben",
    ]
  },
  {
    file : "images/waterfall.png",
    artist : "Hokusai",
    title : "Kirifuri Waterfall at Kurokami Mountain",
    links : [
      "https://en.wikipedia.org/wiki/A_Tour_of_the_Waterfalls_of_the_Provinces",
      "https://en.wikipedia.org/wiki/Hokusai",
    ]
  },
  {
    file : "images/honoo.png",
    artist : "Uemura Shoen",
    title : "Honoo",
    links : [
      "https://en.wikipedia.org/wiki/Uemura_Sh%C5%8Den",
    ]
  },
  {
    file : "images/black_fan.png",
    artist : "Fujishima Takeji",
    title : "Black Fan",
    links : [
      "https://en.wikipedia.org/wiki/Fujishima_Takeji",
    ]
  },
  {
    file : "images/irises.png",
    artist : "Vincent van Gogh",
    title : "Vase with Irises Against a Yellow Background",
    links : [
      "https://en.wikipedia.org/wiki/Vase_with_Irises_Against_a_Yellow_Background",
      "https://en.wikipedia.org/wiki/Vincent_van_Gogh",
    ]
  },
  {
    file : "images/fifer.png",
    artist : "Edouard Manet",
    title : "The Fifer",
    links : [
      "https://en.wikipedia.org/wiki/The_Fifer",
      "https://en.wikipedia.org/wiki/%C3%89douard_Manet",
    ]
  },
  {
    file : "images/la_grenouillere.png",
    artist : "Claude Monet",
    title : "La Grenouillere",
    links : [
      "https://en.wikipedia.org/wiki/La_Grenouill%C3%A8re_(Monet)",
      "https://en.wikipedia.org/wiki/Claude_Monet",
    ]
  },
  {
    file : "images/the_scream.png",
    artist : "Edvard Munch",
    title : "The Scream",
    links : [
      "https://en.wikipedia.org/wiki/The_Scream",
      "https://en.wikipedia.org/wiki/Edvard_Munch",
    ]
  },
  {
    file : "images/american_gothic.png",
    artist : "Grant Wood",
    title : "American Gothic",
    links : [
      "https://en.wikipedia.org/wiki/American_Gothic",
      "https://en.wikipedia.org/wiki/Grant_Wood",
    ]
  },
  {
    file : "images/pallas_and_the_centaur.png",
    artist : "Sandro Botticelli",
    title : "Pallas and the Centaur",
    links : [
      "https://en.wikipedia.org/wiki/Pallas_and_the_Centaur",
      "https://en.wikipedia.org/wiki/Sandro_Botticelli",
    ]
  },
  {
    file : "images/lute_player.png",
    artist : "Caravaggio",
    title : "Lute Player",
    links : [
      "https://en.wikipedia.org/wiki/The_Lute_Player_(Caravaggio)",
      "https://en.wikipedia.org/wiki/Caravaggio",
    ]
  },
  {
    file : "images/old_woman_and_boy_with_candles.png",
    artist : "Peter Paul Rubens",
    title : "Old Woman and Boy with Candles",
    links : [
      "https://en.wikipedia.org/wiki/Peter_Paul_Rubens",
    ]
  },
  {
    file : "images/immaculate_conception.png",
    artist : "Diego Velazquez",
    title : "Immaculate Conception",
    links : [
      "https://en.wikipedia.org/wiki/Diego_Vel%C3%A1zquez",
    ]
  },
  {
    file : "images/still_life_with_a_curtain.png",
    artist : "Paul Cezanne",
    title : "Still Life with a Curtain",
    links : [
      "https://en.wikipedia.org/wiki/Paul_C%C3%A9zanne",
    ]
  },
  {
    file : "images/judith_slaying_holofemes.png",
    artist : "Artemisia Gentileschi",
    title : "Judith Slaying Holofernes",
    links : [
      "https://en.wikipedia.org/wiki/Judith_Slaying_Holofernes_(Artemisia_Gentileschi,_Florence)",
      "https://en.wikipedia.org/wiki/Artemisia_Gentileschi",
    ]
  },
  {
    file : "images/a_box_at_the_theater.png",
    artist : "A Box at the Theater (At the Concert)",
    title : "Pierre-Auguste Renoir",
    links : [
      "https://en.wikipedia.org/wiki/Pierre-Auguste_Renoir",
    ]
  },
];
