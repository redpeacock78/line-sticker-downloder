/*
Copyright (c) 2020 redpeacock78
This software is released under the MIT License, see LICENSE.
*/

import * as req from "request";
import * as fs from "fs-extra";
import { Command } from 'commander';
import axios, { AxiosResponse } from "axios";
import * as json from "./@types/sticker-json";
import { apng2gif } from "./@types/apng2gif";
const apng2gif: apng2gif = require("apng2gif");
const packageJson = require("../package.json")

const program = new Command();
program
  .version(packageJson.version, "-v, --version", "Output the version number")
  .name("lsdl")
  .usage("[options] [sticker_id]")
  .description("Download the data extracted from the LINE sticker.")
  .option(
    "-d, --dir <dir_name>",
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
  .on("--help", (): void => {
    console.log(
      `
Example:
  $ lsdl -a -g -s 11978
  $ lsdl -a -g -s -d line/ 11978
  $ lsdl https://store.line.me/stickershop/product/7457240/ja
  $ lsdl -d line/ https://store.line.me/stickershop/product/8290086/ja?from=sticker`
    );
  })
  .parse(process.argv);

const options = program.opts();

const sticker_id = Number(
  program.args[0].slice(0, 42) !== "https://store.line.me/stickershop/product/"
    ? program.args[0]
    : program.args[0].split("/")[5]
);
const info_url = `http://dl.stickershop.line.naver.jp/products/0/0/1/${sticker_id}/iphone/productInfo.meta`;
const info_url_2 = `http://dl.stickershop.line.naver.jp/products/0/0/2/${sticker_id}/iphone/productInfo.meta`;

const mkdir = (dir_neme: string): void => {
  fs.mkdirs(dir_neme, (err: Error): void => {
    err
      ? (): void => {
        return console.error(err);
      }
      : "";
  });
};

const image_dl = async (img_url: string, png: string, gif?: string): Promise<void> => {
  req(
    { method: "GET", url: img_url, encoding: null },
    (err: string, res: req.Response, body: req.RequestCallback): void => {
      !err && res.statusCode === 200
        ? fs.writeFile(png, body, "binary").then((): void => {
          !gif ? "" : apng2gif(png, gif);
        })
        : "";
    }
  );
};

const main = async (url: string): Promise<boolean> => {
  return await axios.get(url).then((resp: AxiosResponse<string>): true => {

    //Extract the ID and name of the sticker
    const get_json: json.StickerObkect = JSON.parse(JSON.stringify(resp.data));
    const title_en: string = get_json.title["en"]
      .replace(/ /g, "_")
      .replace(/\"/g, "");
    const stickers_obj: json.StickersData[] = get_json.stickers;
    const stickers_id: number[] = stickers_obj.reduce((x, y) => {
      x[y.id] = y.id;
      return x;
    }, []);

    stickers_id.filter((id: number): void => {
      // @ts-ignore
      const dir_name = `${options.dir}/${title_en}`;
      // @ts-ignore
      const png_dir: string = options.dir
        ? `${dir_name}/png`
        : `./${title_en}/png`;
      // @ts-ignore
      const _2x_png_dir: string = options.dir
        ? `${dir_name}/@2x_png`
        : `./${title_en}/@2x_png`;
      // @ts-ignore
      const key_png_dir: string = options.dir
        ? `${dir_name}/key_png`
        : `./${title_en}/key_png`;
      // @ts-ignore
      const _2x_key_png_dir: string = options.dir
        ? `${dir_name}/@2x_key_png`
        : `./${title_en}/@2x_key_png`;
      const dir_names: string[] = [
        png_dir,
        _2x_png_dir,
        key_png_dir,
        _2x_key_png_dir,
      ];
      // @ts-ignore
      const png_url: string = options.custom
        ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker.png`
        // @ts-ignore
        : options.manga
          ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker.png`
          : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker.png`;
      // @ts-ignore
      const _2x_png_url: string = options.custom
        ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker@2x.png`
        // @ts-ignore
        : options.manga
          ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker@2x.png`
          : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker@2x.png`;
      // @ts-ignore
      const key_png_url: string = options.custom
        ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker_key.png`
        // @ts-ignore
        : options.manga
          ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker_key.png`
          : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_key.png`;
      // @ts-ignore
      const _2x_key_png_url: string = options.custom
        ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/sticker_key@2x.png`
        // @ts-ignore
        : options.manga
          ? `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/base/plus/sticker_key@2x.png`
          : `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_key@2x.png`;
      Promise.resolve()
        .then((): void => {
          dir_names.filter((v: string): void => {
            mkdir(v);
          });
        })
        .then((): void => {
          image_dl(png_url, `${png_dir}/${id}.png`);
          image_dl(_2x_png_url, `${_2x_png_dir}/${id}@2x.png`);
          image_dl(key_png_url, `${key_png_dir}/${id}_key.png`);
          image_dl(
            _2x_key_png_url,
            `${_2x_key_png_dir}/${id}@2x_key.png`
          );
        });
    });

    //For animation
    // @ts-ignore
    options.animation
      ? stickers_id.filter((id: number): void => {
        // @ts-ignore
        const dir_name: string = options.dir
          // @ts-ignore
          ? `${options.dir}/${title_en}`
          : "";
        // @ts-ignore
        const a_png_dir: string = options.dir
          // @ts-ignore
          ? `${dir_name}/animation_png`
          : `./${title_en}/animation_png`;
        // @ts-ignore
        const _2x_a_png_dir: string = options.dir
          ? `${dir_name}/@2x_animation_png`
          : `./${title_en}/@2x_animation_png`;
        const gif_dir: string =
          // @ts-ignore
          options.dir && options.gif
            ? `${dir_name}/gif`
            // @ts-ignore
            : options.gif
              ? `./${title_en}/gif`
              : "";
        const _2x_gif_dir: string =
          // @ts-ignore
          options.dir && options.gif
            ? `${dir_name}/@2x_gif`
            // @ts-ignore
            : options.gif
              ? `./${title_en}/@2x_gif`
              : "";
        const a_png_dirs: string[] = [a_png_dir, _2x_a_png_dir];
        const gif_dirs: string[] = [gif_dir, _2x_gif_dir];
        const a_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_animation.png`;
        const _2x_a_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/iPhone/sticker_animation@2x.png`;
        Promise.resolve()
          .then((): void => {
            a_png_dirs.filter((v: string): void => {
              mkdir(v);
            });
            // @ts-ignore
            options.gif
              ? gif_dirs.filter((v: string): void => {
                mkdir(v);
              })
              : "";
          })
          .then((): void => {
            // @ts-ignore
            options.gif
              ? image_dl(
                a_png_url,
                `${a_png_dir}/${id}.png`,
                `${gif_dir}/${id}.gif`
              )
              : image_dl(a_png_url, `${a_png_dir}/${id}.png`);
            // @ts-ignore
            options.gif
              ? image_dl(
                _2x_a_png_url,
                `${_2x_a_png_dir}/${id}@2x.png`,
                `${_2x_gif_dir}/${id}@2x.gif`
              )
              : image_dl(
                _2x_a_png_url,
                `${_2x_a_png_dir}/${id}@2x.png`
              );
          });
      })
      : "";

    //For Effect
    // @ts-ignore
    options.effect
      ? stickers_id.filter((id: number): void => {
        // @ts-ignore
        const dir_name = `${options.dir}/${title_en}`;
        // @ts-ignore
        const e_png_dir: string = options.dir
          ? `${dir_name}/effect_png`
          : `./${title_en}/effect_png`;
        const gif_dir: string =
          // @ts-ignore
          options.dir && options.gif
            ? `${dir_name}/effect_gif`
            // @ts-ignore
            : options.gif
              ? `./${title_en}/effect_gif`
              : "";
        const e_png_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/android/sticker_popup.png`;
        Promise.resolve()
          .then((): void => {
            mkdir(e_png_dir);
            // @ts-ignore
            options.gif ? mkdir(gif_dir) : "";
          })
          .then((): void => {
            // @ts-ignore
            options.gif
              ? image_dl(
                e_png_url,
                `${e_png_dir}/${id}.png`,
                `${gif_dir}/${id}.gif`
              )
              : image_dl(e_png_url, `${e_png_dir}/${id}.png`);
          });
      })
      : "";

    //For sound
    // @ts-ignore
    options.sound
      ? stickers_id.filter((id: number): void => {
        // @ts-ignore
        const sound_dir: string = options.dir
          // @ts-ignore
          ? `${options.dir}/${title_en}/sound`
          : `./${title_en}/sound`;
        const sound_url = `https://stickershop.line-scdn.net/stickershop/v1/sticker/${id}/android/sticker_sound.m4a`;
        Promise.resolve()
          .then((): void => {
            mkdir(sound_dir);
          })
          .then((): void => {
            image_dl(sound_url, `${sound_dir}/${id}.m4a`);
          });
      })
      : "";
    return true;
  }).catch((): false => {
    return false;
  })
};

main(info_url).then((result: boolean): void => {
  if (result === false) {
    main(info_url_2).then((result_2: boolean): void => {
      if (result_2 === false) {
        process.on("exit", (): void => {
          console.error('lsdl: Sorry. An error has occurred :_(');
          console.error("Refer 'lsdl -h' or 'lsdl --help' for how to use the command.");
          process.exit(1);
        });
      }
    });
  }
});