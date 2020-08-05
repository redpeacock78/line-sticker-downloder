const req = require("request");
const fs = require("fs-extra");
const program = require("commander");
const apng2gif = require("apng2gif");

program
  .version("1.1.2")
  .usage("[options] [sticker_id]")
  .option("-a, --animation", "With animation stickers (APNG)")
  .option("-g, --gif", "With animation stickers (GIF)")
  .option("-s, --sound", "With sound(animation) stickers sound (m4a)")
  .option(
    "-d --dir <dir>",
    "Specify the directory where you want to store the data"
  )
  .option("-c, --custom", "Custom sticker download Only")
  .option("-m, --manga", "Mange sticker download Only")
  .parse(process.argv);

const sticker_id = program.args;
const url = `http://dl.stickershop.line.naver.jp/products/0/0/1/${sticker_id}/iphone/productInfo.meta`;

req(url, (err: string, body) => {
  if (err !== null) {
    console.error("error:", err);
    return false;
  }

  //Extract the ID and name of the sticker
  const get_json = JSON.parse(body.body);
  const title_en: string = get_json.title["en"]
    .replace(/ /g, "_")
    .replace(/\"/g, "");
  const stickers_obj: string[] = get_json.stickers;
  const stickers_id: string[] = [];
  for (let i = 0; i < stickers_obj.length; i++) {
    stickers_id[i] = stickers_obj[i]["id"];
  }

  //Creating a storage directory
  let png_dir: string;
  let _2x_png_dir: string;
  let key_png_dir: string;
  let _2x_key_png_dir: string;
  if (program.dir) {
    const dir_name = `${program.dir}/${title_en}`;
    png_dir = `${dir_name}/png`;
    _2x_png_dir = `${dir_name}/@2x_png`;
    key_png_dir = `${dir_name}/key_png`;
    _2x_key_png_dir = `${dir_name}/@2x_key_png`;
  } else {
    png_dir = `./${title_en}/png`;
    _2x_png_dir = `./${title_en}/@2x_png`;
    key_png_dir = `./${title_en}/key_png`;
    _2x_key_png_dir = `./${title_en}/@2x_key_png`;
  }

  fs.mkdirs(png_dir, (err: string) => {
    if (err) return console.error(err);
  });
  fs.mkdirs(_2x_png_dir, (err: string) => {
    if (err) return console.error(err);
  });
  fs.mkdirs(key_png_dir, (err: string) => {
    if (err) return console.error(err);
  });
  fs.mkdirs(_2x_key_png_dir, (err: string) => {
    if (err) return console.error(err);
  });

  //Download the sticker from the extracted ID and save it
  for (let i = 0; i < stickers_id.length; i++) {
    const id: string = stickers_id[i];

    let png_url: string;
    let _2x_png_url: string;
    let key_png_url: string;
    let _2x_key_png_url: string;
    if (program.custom) {
      png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker.png`;
      _2x_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker@2x.png`;
      key_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker_key.png`;
      _2x_key_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker_key@2x.png`;
    } else if (program.manga) {
      png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker.png`;
      _2x_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker@2x.png`;
      key_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker_key.png`;
      _2x_key_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker_key@2x.png`;
    } else {
      png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker.png`;
      _2x_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker@2x.png`;
      key_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_key.png`;
      _2x_key_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_key@2x.png`;
    }

    req(
      { method: "GET", url: png_url, encoding: null },
      (err: string, res, body) => {
        if (!err && res.statusCode === 200) {
          fs.writeFile(`${png_dir}/${id}.png`, body, "binary");
        }
      }
    );
    req(
      { method: "GET", url: _2x_png_url, encoding: null },
      (err: string, res, body) => {
        if (!err && res.statusCode === 200) {
          fs.writeFile(`${_2x_png_dir}/${id}@2x.png`, body, "binary");
        }
      }
    );
    req(
      { method: "GET", url: key_png_url, encoding: null },
      (err: string, res, body) => {
        if (!err && res.statusCode === 200) {
          fs.writeFile(`${key_png_dir}/${id}_key.png`, body, "binary");
        }
      }
    );
    req(
      { method: "GET", url: _2x_key_png_url, encoding: null },
      (err: string, res, body) => {
        if (!err && res.statusCode === 200) {
          fs.writeFile(`${_2x_key_png_dir}/${id}@2x_key.png`, body, "binary");
        }
      }
    );
  }

  //For animation
  if (program.animation) {
    for (let i = 0; i < stickers_id.length; i++) {
      const id: string = stickers_id[i];

      let a_png_dir: string;
      let _2x_a_png_dir: string;
      let gif_dir: string;
      let _2x_gif_dir: string;
      if (program.dir) {
        const dir_name = `${program.dir}/${title_en}`;
        a_png_dir = `${dir_name}/animation_png`;
        _2x_a_png_dir = `${dir_name}/@2x_animation_png`;
        if (program.gif) {
          const dir_name = `${program.dir}/${title_en}`;
          gif_dir = `${dir_name}/gif`;
          _2x_gif_dir = `${dir_name}/@2x_gif`;
        }
      } else {
        a_png_dir = `./${title_en}/animation_png`;
        _2x_a_png_dir = `./${title_en}/@2x_animation_png`;
        if (program.gif) {
          gif_dir = `./${title_en}/gif`;
          _2x_gif_dir = `./${title_en}/@2x_gif`;
        }
      }

      const a_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_animation.png`;
      const _2x_a_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_animation@2x.png`;

      fs.mkdirs(a_png_dir, (err: string) => {
        if (err) return console.error(err);
      });
      fs.mkdirs(_2x_a_png_dir, (err: string) => {
        if (err) return console.error(err);
      });
      if (program.gif) {
        fs.mkdirs(gif_dir, (err: string) => {
          if (err) return console.error(err);
        });
        fs.mkdirs(_2x_gif_dir, (err: string) => {
          if (err) return console.error(err);
        });
      }

      const image_dl = (img_url: string, png: string, gif: string) => {
        req(
          { method: "GET", url: img_url, encoding: null },
          (err: string, res, body) => {
            if (!err && res.statusCode === 200) {
              Promise.resolve()
                .then(fs.writeFileSync(png, body, "binary"))
                .then(() => {
                  if (program.gif) {
                    apng2gif(png, gif);
                  }
                });
            }
          }
        );
      };

      image_dl(a_png_url, `${a_png_dir}/${id}.png`, `${gif_dir}/${id}.gif`);
      image_dl(
        _2x_a_png_url,
        `${_2x_a_png_dir}/${id}@2x.png`,
        `${_2x_gif_dir}/${id}@2x.gif`
      );
    }
  }

  //For sound
  if (program.sound) {
    for (let i = 0; i < stickers_id.length; i++) {
      const id: string = stickers_id[i];

      let sound_dir: string;
      if (program.dir) {
        sound_dir = `${program.dir}/${title_en}/sound`;
      } else {
        sound_dir = `./${title_en}/sound`;
      }

      const sound_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/android/sticker_sound.m4a`;

      fs.mkdirs(sound_dir, (err: string) => {
        if (err) return console.error(err);
      });

      req(
        { method: "GET", url: sound_url, encoding: null },
        (err: string, res, body) => {
          if (!err && res.statusCode === 200) {
            fs.writeFile(`${sound_dir}/${id}.m4a`, body, "binary");
          }
        }
      );
    }
  }
});
