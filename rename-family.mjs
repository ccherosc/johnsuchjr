import { rename } from 'fs/promises'
import { join } from 'path'

const dir = 'images/family'

const map = [
  ['DJI_20241128_160104_162.JPG',              'such-family-thanksgiving-gathering-2024.jpg'],
  ['image000001.JPG',                           'john-yve-renaissance-faire-costumes.jpg'],
  ['IMG_0643.JPG',                              'such-family-destin-florida-beach-vacation.jpg'],
  ['IMG_0648.jpeg',                             'john-such-son-prom-garden.jpg'],
  ['IMG_0696.jpeg',                             'john-such-jetski-marina-fistbump.jpg'],
  ['IMG_0821.jpeg',                             'john-such-son-birthday-celebration.jpg'],
  ['IMG_0850.jpeg',                             'john-such-friends-night-out.jpg'],
  ['IMG_1399.JPG',                              'john-such-black-belt-upstate-karate.jpg'],
  ['IMG_1564.JPG',                              'such-family-outdoor-restaurant-gathering.jpg'],
  ['IMG_1619.jpeg',                             'yve-such-renaissance-faire-face-paint.jpg'],
  ['IMG_1643.JPG',                              'john-yve-renaissance-faire-dragon.jpg'],
  ['IMG_1760.jpeg',                             'such-family-restaurant-silly-selfie.jpg'],
  ['IMG_2266.jpeg',                             'bryson-such-chess-game.jpg'],
  ['IMG_2382.jpeg',                             'john-such-halloween-beetlejuice.jpg'],
  ['IMG_2710.jpeg',                             'john-yve-brit-floyd-concert-2023.jpg'],
  ['IMG_3057.jpeg',                             'john-yve-halloween-mask-shopping.jpg'],
  ['IMG_3217.jpeg',                             'john-yve-lake-boat-day.jpg'],
  ['IMG_3477.jpeg',                             'jt-such-largemouth-bass-fishing.jpg'],
  ['IMG_4205.jpeg',                             'bryson-such-thanksgiving-turkey-hat.jpg'],
  ['IMG_4973.jpeg',                             'jt-bryson-such-outdoors-with-friends.jpg'],
  ['IMG_5104.JPG',                              'john-yve-such-date-night-dressed-up.jpg'],
  ['IMG_5220.jpeg',                             'john-such-son-prom-outdoor-portrait.jpg'],
  ['IMG_5330.jpeg',                             'john-such-portrait-headshot.jpg'],
  ['IMG_5624.jpeg',                             'jt-bryson-such-brothers-indoor.jpg'],
  ['IMG_6095.jpeg',                             'john-yve-such-christmas-plaza.jpg'],
  ['IMG_6202.jpeg',                             'john-jt-bryson-such-arcade-fun.jpg'],
  ['IMG_6214.jpeg',                             'john-such-sons-deck-outdoor.jpg'],
  ['IMG_6309.jpeg',                             'john-yve-such-outdoor-park-evening.jpg'],
  ['IMG_6528.jpeg',                             'john-bryson-such-golf-course.jpg'],
  ['IMG_6558.JPG',                              'such-grandparents-outdoor-portrait.jpg'],
  ['IMG_7954.jpeg',                             'john-jt-such-boat-marina-summer.jpg'],
  ['IMG_8704.jpeg',                             'john-yve-such-halloween-costumes.jpg'],
  ['IMG_8886.jpeg',                             'john-such-festival-performer-fun.jpg'],
  ['IMG_9466.JPG',                              'jt-bryson-such-young-boys-throwback.jpg'],
  ['IMG_9905.JPG',                              'such-grandparents-80th-birthday.jpg'],
  ['Resized_Resized_20230710_155824.JPG',       'jt-bryson-such-beach-pier-fishing.jpg'],
  ['placeholder.jpg',                            'placeholder.jpg'], // keep as-is
]

for (const [from, to] of map) {
  if (from === to) continue
  try {
    await rename(join(dir, from), join(dir, to))
    console.log(`✓ ${from} → ${to}`)
  } catch (e) {
    console.log(`✗ ${from}: ${e.message}`)
  }
}
console.log('Done.')
