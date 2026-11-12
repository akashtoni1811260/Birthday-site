/* ==========================================================
   EDIT THIS FILE to customize the whole site.
   Put your photos in the /assets folder and list them below.
   Missing photos automatically show a colorful placeholder.
   ========================================================== */

const SITE = {
  brand: "VINOFLIX",          // logo text, top left
  name: "VINO",               // big name in the hero
  age: "26th",                // shows as "HAPPY 23RD BIRTHDAY"
  season: "Season 26 ♡",
  tagline: "Her story continues.",
  badge: "BIRTHDAY SPECIAL",          // small label above the title
  topLine: "#1 in Birthdays Today",   // line under the title
  rating: "25+",                      // maturity box (like U/A 16+)
  year: "2026",
  tags: ["Heartfelt", "Funny", "Unforgettable"],
  starring: "Vino, Family, Friends",
  music: "assets/bgm.mp3",            // your birthday instrumental (mp3). If the file is missing, a built-in music-box tune plays
  slideSeconds: 4,   
  description:
    "A heartwarming story of love, laughter, friendship, family, and unforgettable memories. A little glimpse of the beautiful chaos that made her Season 26 worth remembering. ❤️",
  heroImage: "assets/hero.jpg",   // wide / landscape photo works best

  // Intro screen: "Who's watching?" Add as many profiles as you like.
  // avatar = square photo in /assets (a colored initial shows if the file is missing)
  introTitle: "Who's watching?",
  profiles: [
    { name: "Vino",  avatar: "assets/prof.jpg",  color: "#ff5d8f", welcome: "Happy birthday, Madam!!!." },
    { name: "Guest", avatar: "assets/guest.jpeg", color: "#8e54e9", welcome: "Welcome. Enjoy the memories." },
  ],

  // Each row = one shelf on the page. Add, remove or reorder freely.
  rows: [
    {
      id: "popular",
      rank: true,            // true = big Top-10 style numbers on this shelf
      nav: "Home",
      title: "Popular Moments",
      photos: [
        { src: "assets/img_1.jpg", caption: "Season 26, dressed in grace with a little extra sparkle" },
        { src: "assets/img_2.jpg", caption: "Main character energy" },
        { src: "assets/img_3.jpg", caption: "The occasion was special, but so was the outfit. ✨" },
        { src: "assets/img_4.jpg", caption: "Dressed like a dream, living my own fairytale" },
        { src: "assets/img_5.jpg", caption: "A little extra glam never hurt anybody" }
      ],
    },
    {
      id: "family",
      nav: "Family",
      title: "Vino & Her Family",
      photos: [
        { src: "assets/fam1.jpeg", caption: "Home ❤️" },
        { src: "assets/fam2.jpg", caption: "Naanga naalu peru engaluku bayam kidayathu" },
        { src: "assets/fam3.jpg", caption: "Group hug" },
        { src: "assets/fam4.jpg", caption: "Fam-cation!" },
        { src: "assets/fam5.jpg", caption: "Again naanga naalu peru" }
      ],
    },
    {
      id: "friends",
      nav: "Friends",
      title: "Friends",
      photos: [
        { src: "assets/frnd1.jpeg", caption: "Partners in crime" },
        { src: "assets/frnd2.jpg", caption: "black squad" },
        { src: "assets/frnd3.jpg", caption: "The bride and her favourite side character." },
        { src: "assets/frnd4.jpg", caption: "Some bonds never go out of style" },
        { src: "assets/frnd5.jpg", caption: "Old friends, timeless memories" }
      ],
    },
    {
      id: "loved",
      nav: "More info",
      title: "More me",
      photos: [
        { src: "assets/r1.jpg", caption: "A little tipsy, a lot iconic." },
        { src: "assets/r2.jpg", caption: "Goa" },
        { src: "assets/rec3.jpg", caption: "Capturing moments" },
        { src: "assets/rec4.jpg", caption: "Candid" },
        { src: "assets/rec5.jpg", caption: "Crazy mee" }
      ],
    },
    {
      id: "Saved",
      nav: "Saved",
      title: "Permanently saved",
      photos: [
        { src: "assets/pr1.jpg", caption: "Saved for forever" },
        { src: "assets/pr2.jpg", caption: "Never gets old" },
        { src: "assets/pr3.jpg", caption: "Cute candid" },
        { src: "assets/pr4.jpg", caption: "lost in words" },
        { src: "assets/pr5.jpg", caption: "Crazy stupid love" },
        { src: "assets/pr6.jpg", caption: "The spot" },
        { src: "assets/pr7.jpg", caption: "Us❤️ " },
      ],
    },
  ],

  closing: {
    nav: "Birthday Special",
    title: "Happy Birthday, Vino ❤️",
    text:
      "Season 26: The one with more laughter, endless memories, crazy adventures, unconditional love, and the people who make every moment special. Through every plot twist, every little chaos, and every new chapter, these are the friends and moments that make life beautiful. Could this season BE any better? ❤️",
    signature: "- With love, Ak",
  },
};
