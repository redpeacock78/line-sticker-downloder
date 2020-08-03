## line-stirker-downloder
### Install
```bash
$ npm install -g line-stirker-downloder
             or
$ yarn global add line-stirker-downloder
```
or
```bash
$ git clone https://github.com/redpeacock78/line-stirker-downloder
$ cd line-stirker-downloder/
$ npm install
      or
$ yarn install
$ tsc src/*.ts --outDir dist/
$ node install -g
      or
$ yarn global add
```
### Usage
```bash
$ lsdl -h
Usage: lsdl [options] [sticker_id]

Options:
  -V, --version    output the version number
  -a, --animation  With animation stickers (APNG)
  -g, --gif        With animation stickers (GIF)
  -s, --sound      With sound(animation) stickers sound (m4a)
  -d --dir <dir>   Specify the directory where you want to store the data
  -h, --help       display help for command

$ lsdl -a -g -s -d line/ 11978
$ tree line/
line/
└── Animated_POP_TEAM_EPIC_Sound_Stickers
    ├── @2x_animation_png
    │   ├── 67561910@2x.png
    │   ├── 67561911@2x.png
    │   ├── 67561912@2x.png
    │   ├── 67561913@2x.png
    │   ├── 67561914@2x.png
    │   ├── 67561915@2x.png
    │   ├── 67561916@2x.png
    │   ├── 67561917@2x.png
    │   ├── 67561918@2x.png
    │   ├── 67561919@2x.png
    │   ├── 67561920@2x.png
    │   ├── 67561921@2x.png
    │   ├── 67561922@2x.png
    │   ├── 67561923@2x.png
    │   ├── 67561924@2x.png
    │   ├── 67561925@2x.png
    │   ├── 67561926@2x.png
    │   ├── 67561927@2x.png
    │   ├── 67561928@2x.png
    │   ├── 67561929@2x.png
    │   ├── 67561930@2x.png
    │   ├── 67561931@2x.png
    │   ├── 67561932@2x.png
    │   └── 67561933@2x.png
    ├── @2x_gif
    │   ├── 67561910@2x.gif
    │   ├── 67561911@2x.gif
    │   ├── 67561912@2x.gif
    │   ├── 67561913@2x.gif
    │   ├── 67561914@2x.gif
    │   ├── 67561915@2x.gif
    │   ├── 67561916@2x.gif
    │   ├── 67561917@2x.gif
    │   ├── 67561918@2x.gif
    │   ├── 67561919@2x.gif
    │   ├── 67561920@2x.gif
    │   ├── 67561921@2x.gif
    │   ├── 67561922@2x.gif
    │   ├── 67561923@2x.gif
    │   ├── 67561924@2x.gif
    │   ├── 67561925@2x.gif
    │   ├── 67561926@2x.gif
    │   ├── 67561927@2x.gif
    │   ├── 67561928@2x.gif
    │   ├── 67561929@2x.gif
    │   ├── 67561930@2x.gif
    │   ├── 67561931@2x.gif
    │   ├── 67561932@2x.gif
    │   └── 67561933@2x.gif
    ├── @2x_key_png
    │   ├── 67561910@2x_key.png
    │   ├── 67561911@2x_key.png
    │   ├── 67561912@2x_key.png
    │   ├── 67561913@2x_key.png
    │   ├── 67561914@2x_key.png
    │   ├── 67561915@2x_key.png
    │   ├── 67561916@2x_key.png
    │   ├── 67561917@2x_key.png
    │   ├── 67561918@2x_key.png
    │   ├── 67561919@2x_key.png
    │   ├── 67561920@2x_key.png
    │   ├── 67561921@2x_key.png
    │   ├── 67561922@2x_key.png
    │   ├── 67561923@2x_key.png
    │   ├── 67561924@2x_key.png
    │   ├── 67561925@2x_key.png
    │   ├── 67561926@2x_key.png
    │   ├── 67561927@2x_key.png
    │   ├── 67561928@2x_key.png
    │   ├── 67561929@2x_key.png
    │   ├── 67561930@2x_key.png
    │   ├── 67561931@2x_key.png
    │   ├── 67561932@2x_key.png
    │   └── 67561933@2x_key.png
    ├── @2x_png
    │   ├── 67561910@2x.png
    │   ├── 67561911@2x.png
    │   ├── 67561912@2x.png
    │   ├── 67561913@2x.png
    │   ├── 67561914@2x.png
    │   ├── 67561915@2x.png
    │   ├── 67561916@2x.png
    │   ├── 67561917@2x.png
    │   ├── 67561918@2x.png
    │   ├── 67561919@2x.png
    │   ├── 67561920@2x.png
    │   ├── 67561921@2x.png
    │   ├── 67561922@2x.png
    │   ├── 67561923@2x.png
    │   ├── 67561924@2x.png
    │   ├── 67561925@2x.png
    │   ├── 67561926@2x.png
    │   ├── 67561927@2x.png
    │   ├── 67561928@2x.png
    │   ├── 67561929@2x.png
    │   ├── 67561930@2x.png
    │   ├── 67561931@2x.png
    │   ├── 67561932@2x.png
    │   └── 67561933@2x.png
    ├── animation_png
    │   ├── 67561910.png
    │   ├── 67561911.png
    │   ├── 67561912.png
    │   ├── 67561913.png
    │   ├── 67561914.png
    │   ├── 67561915.png
    │   ├── 67561916.png
    │   ├── 67561917.png
    │   ├── 67561918.png
    │   ├── 67561919.png
    │   ├── 67561920.png
    │   ├── 67561921.png
    │   ├── 67561922.png
    │   ├── 67561923.png
    │   ├── 67561924.png
    │   ├── 67561925.png
    │   ├── 67561926.png
    │   ├── 67561927.png
    │   ├── 67561928.png
    │   ├── 67561929.png
    │   ├── 67561930.png
    │   ├── 67561931.png
    │   ├── 67561932.png
    │   └── 67561933.png
    ├── gif
    │   ├── 67561910.gif
    │   ├── 67561911.gif
    │   ├── 67561912.gif
    │   ├── 67561913.gif
    │   ├── 67561914.gif
    │   ├── 67561915.gif
    │   ├── 67561916.gif
    │   ├── 67561917.gif
    │   ├── 67561918.gif
    │   ├── 67561919.gif
    │   ├── 67561920.gif
    │   ├── 67561921.gif
    │   ├── 67561922.gif
    │   ├── 67561923.gif
    │   ├── 67561924.gif
    │   ├── 67561925.gif
    │   ├── 67561926.gif
    │   ├── 67561927.gif
    │   ├── 67561928.gif
    │   ├── 67561929.gif
    │   ├── 67561930.gif
    │   ├── 67561931.gif
    │   ├── 67561932.gif
    │   └── 67561933.gif
    ├── key_png
    │   ├── 67561910_key.png
    │   ├── 67561911_key.png
    │   ├── 67561912_key.png
    │   ├── 67561913_key.png
    │   ├── 67561914_key.png
    │   ├── 67561915_key.png
    │   ├── 67561916_key.png
    │   ├── 67561917_key.png
    │   ├── 67561918_key.png
    │   ├── 67561919_key.png
    │   ├── 67561920_key.png
    │   ├── 67561921_key.png
    │   ├── 67561922_key.png
    │   ├── 67561923_key.png
    │   ├── 67561924_key.png
    │   ├── 67561925_key.png
    │   ├── 67561926_key.png
    │   ├── 67561927_key.png
    │   ├── 67561928_key.png
    │   ├── 67561929_key.png
    │   ├── 67561930_key.png
    │   ├── 67561931_key.png
    │   ├── 67561932_key.png
    │   └── 67561933_key.png
    ├── png
    │   ├── 67561910.png
    │   ├── 67561911.png
    │   ├── 67561912.png
    │   ├── 67561913.png
    │   ├── 67561914.png
    │   ├── 67561915.png
    │   ├── 67561916.png
    │   ├── 67561917.png
    │   ├── 67561918.png
    │   ├── 67561919.png
    │   ├── 67561920.png
    │   ├── 67561921.png
    │   ├── 67561922.png
    │   ├── 67561923.png
    │   ├── 67561924.png
    │   ├── 67561925.png
    │   ├── 67561926.png
    │   ├── 67561927.png
    │   ├── 67561928.png
    │   ├── 67561929.png
    │   ├── 67561930.png
    │   ├── 67561931.png
    │   ├── 67561932.png
    │   └── 67561933.png
    └── sound
        ├── 67561910.m4a
        ├── 67561911.m4a
        ├── 67561912.m4a
        ├── 67561913.m4a
        ├── 67561914.m4a
        ├── 67561915.m4a
        ├── 67561916.m4a
        ├── 67561917.m4a
        ├── 67561918.m4a
        ├── 67561919.m4a
        ├── 67561920.m4a
        ├── 67561921.m4a
        ├── 67561922.m4a
        ├── 67561923.m4a
        ├── 67561924.m4a
        ├── 67561925.m4a
        ├── 67561926.m4a
        ├── 67561927.m4a
        ├── 67561928.m4a
        ├── 67561929.m4a
        ├── 67561930.m4a
        ├── 67561931.m4a
        ├── 67561932.m4a
        └── 67561933.m4a

10 directories, 216 files

```
### LIcense
This source code is licensed MIT.