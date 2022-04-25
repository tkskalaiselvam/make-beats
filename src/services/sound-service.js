import { Howl } from "howler";

let howl = new Howl({
    src: ["sounds/public_sprite.mp3"],
    sprite: {
      cowbell: [0, 300],
      conga_hi: [400, 300],
      cymbal: [807, 3640],
      conga_mid: [4455, 202],
      conga_low: [4863, 343],
      hihat_open: [5268, 706],
      tom_hi: [6277, 206],
      maracas: [6684, 53],
      tom_mid: [7092, 263],
      hihat_closed: [7496, 90],
      tom_low: [7903, 370],
      clave: [8307, 44],
      clap: [8712, 208],
      snare: [9116, 137],
      rim: [9521, 36],
      kick: [9929, 390],
    },
  });

  const beatColors = ["red", "yellow", "green", "blue", "purple"];
  const channelColors = {
      kick: "red",
      snare: "green",
      hihat_open: "blue",
      tom_mid: "orange",
      clap:"yellow",
      rim:"fuchsia",
      cymbal:"lime",
      tom_low:"emerald",
      hihat_closed:"teal",
      cowbell:"cyan",
      tom_hi:"sky",
      conga_low:"indigo",
      conga_mid:"violet",
      conga_hi:"purple",
      maracas:"pink",
      clave:"rose"
  };

  export {howl,beatColors,channelColors};