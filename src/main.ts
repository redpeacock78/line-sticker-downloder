/*
Copyright (c) 2020 redpeacock78
This software is released under the MIT License, see LICENSE.
*/

import * as req from "request";
import * as fs from "fs-extra";
import * as program from "commander";
import { stringify } from "querystring";
const apng2gif = require("apng2gif");

program
  .version("1.2.4")
  .usage("[options] [sticker_id]")
  .option(
    "-d, --dir <dir>",
    "Specify the directory where the data is stored (default: ./)"
  )
  .option("-a, --animation", "Save the animation stickers as APNG")
  .option("-e, --effect", "Save the effect stickers as APNG")
  .option(
    "-g, --gif",
    "Convert animation stickers or effect stickers to GIF and save"
  )
  .option("-s, --sound", "Save sticker sounds with sound in m4a")
  .option(
    "-c, --custom",
    "Custom sticker download Only (cannot be used in conjunction with anything other than the -d option)"
  )
  .option(
    "-m, --manga",
    "Manga sticker download Only (cannot be used in conjunction with anything other than the -d option)"
  )
  .parse(process.argv);

const sticker_id: string[] = program.args;
const url = `http://dl.stickershop.line.naver.jp/products/0/0/1/${sticker_id}/iphone/productInfo.meta`;

const mkdir = (dir_neme: string): void => {
  fs.mkdirs(dir_neme, (err: Error): void => {
    if (err) return console.error(err);
  });
};

const image_dl = (img_url: string, png: string, gif: string): void => {
  req(
    { method: "GET", url: img_url, encoding: null },
    (err: string, res: req.Response, body: req.RequestCallback): void => {
      if (!err && res.statusCode === 200) {
        fs.writeFile(png, body, "binary").then((): void => {
          gif !== null ? apng2gif(png, gif) : "";
        });
      }
    }
  );
};

req(url, (err: string, body: req.Response): void | boolean => {
  if (err !== null) {
    console.error("error:", err);
    return false;
  }

  //Extract the ID and name of the sticker
  const get_json = JSON.parse(body.body);
  const title_en: string = get_json.title["en"]
    .replace(/ /g, "_")
    .replace(/\"/g, "");
  const stickers_obj: { id: number; width: number; height: number }[] =
    get_json.stickers;
  const stickers_id: string[] = stickers_obj.reduce((x, y) => {
    x[y.id] = y.id;
    return x;
  }, []);

  stickers_id.forEach((id: string): void => {
    const dir_name = `${program.dir}/${title_en}`;
    const png_dir: string = program.dir
      ? `${dir_name}/png`
      : `./${title_en}/png`;
    const _2x_png_dir: string = program.dir
      ? `${dir_name}/@2x_png`
      : `./${title_en}/@2x_png`;
    const key_png_dir: string = program.dir
      ? `${dir_name}/key_png`
      : `./${title_en}/key_png`;
    const _2x_key_png_dir: string = program.dir
      ? `${dir_name}/@2x_key_png`
      : `./${title_en}/@2x_key_png`;
    const dir_names: string[] = [
      png_dir,
      _2x_png_dir,
      key_png_dir,
      _2x_key_png_dir,
    ];
    const png_url: string = program.custom
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker.png`
      : program.manga
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker.png`
      : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker.png`;
    const _2x_png_url: string = program.custom
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker@2x.png`
      : program.manga
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker@2x.png`
      : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker@2x.png`;
    const key_png_url: string = program.custom
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker_key.png`
      : program.manga
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker_key.png`
      : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_key.png`;
    const _2x_key_png_url: string = program.custom
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker_key@2x.png`
      : program.manga
      ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker_key@2x.png`
      : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_key@2x.png`;
    Promise.resolve()
      .then((): void => {
        dir_names.forEach((v: string): void => {
          mkdir(v);
        });
      })
      .then((): void => {
        image_dl(png_url, `${png_dir}/${id}.png`, null);
        image_dl(_2x_png_url, `${_2x_png_dir}/${id}@2x.png`, null);
        image_dl(key_png_url, `${key_png_dir}/${id}_key.png`, null);
        image_dl(_2x_key_png_url, `${_2x_key_png_dir}/${id}@2x_key.png`, null);
      });
  });

  //For animation
  program.animation
    ? stickers_id.forEach((id: string): void => {
        const dir_name: string = program.dir
          ? `${program.dir}/${title_en}`
          : "";
        const a_png_dir: string = program.dir
          ? `${dir_name}/animation_png`
          : `./${title_en}/animation_png`;
        const _2x_a_png_dir: string = program.dir
          ? `${dir_name}/@2x_animation_png`
          : `./${title_en}/@2x_animation_png`;
        const gif_dir: string =
          program.dir && program.gif
            ? `${dir_name}/gif`
            : program.gif
            ? `./${title_en}/gif`
            : "";
        const _2x_gif_dir: string =
          program.dir && program.gif
            ? `${dir_name}/@2x_gif`
            : program.gif
            ? `./${title_en}/@2x_gif`
            : "";
        const a_png_dirs: string[] = [a_png_dir, _2x_a_png_dir];
        const gif_dirs: string[] = [gif_dir, _2x_gif_dir];
        const a_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_animation.png`;
        const _2x_a_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_animation@2x.png`;
        Promise.resolve()
          .then((): void => {
            a_png_dirs.forEach((v: string): void => {
              mkdir(v);
            });
            program.gif
              ? gif_dirs.forEach((v: string): void => {
                  mkdir(v);
                })
              : "";
          })
          .then((): void => {
            image_dl(
              a_png_url,
              `${a_png_dir}/${id}.png`,
              `${gif_dir}/${id}.gif`
            );
            image_dl(
              _2x_a_png_url,
              `${_2x_a_png_dir}/${id}@2x.png`,
              `${_2x_gif_dir}/${id}@2x.gif`
            );
          });
      })
    : "";

  //For Effect
  program.effect
    ? stickers_id.forEach((id: string): void => {
        const dir_name = `${program.dir}/${title_en}`;
        const e_png_dir: string = program.dir
          ? `${dir_name}/effect_png`
          : `./${title_en}/effect_png`;
        const gif_dir: string =
          program.dir && program.gif
            ? `${dir_name}/effect_gif`
            : program.gif
            ? `./${title_en}/effect_gif`
            : "";
        const e_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/android/sticker_popup.png`;
        Promise.resolve()
          .then((): void => {
            mkdir(e_png_dir);
            program.gif ? mkdir(gif_dir) : "";
          })
          .then((): void => {
            image_dl(
              e_png_url,
              `${e_png_dir}/${id}.png`,
              `${gif_dir}/${id}.gif`
            );
          });
      })
    : "";

  //For sound
  program.sound
    ? stickers_id.forEach((id: string): void => {
        const sound_dir: string = program.dir
          ? `${program.dir}/${title_en}/sound`
          : `./${title_en}/sound`;
        const sound_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/android/sticker_sound.m4a`;
        Promise.resolve()
          .then((): void => {
            mkdir(sound_dir);
          })
          .then((): void => {
            image_dl(sound_url, `${sound_dir}/${id}.m4a`, null);
          });
      })
    : "";
});
