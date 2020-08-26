declare namespace StickerJson {
  export interface StickerObkect {
    packageId: number;
    onSale: boolean;
    validDays: number;
    title: StickerTitle;
    author: StickerAuthor;
    price: StickerPrice[];
    stickers: StickersData[];
    hasAnimation: boolean;
    hasSound: boolean;
    stickerResourceType: string;
  }

  export interface StickerTitle {
    en: string;
    ja: string;
  }

  export interface StickerAuthor {
    en: string;
    ja: string;
    ko: string;
    "zh-Hans": string;
    "zh-Hant": string;
  }

  export interface StickerPrice {
    country: string;
    currency: string;
    symbol: string;
    price: number;
  }

  export interface StickersData {
    id: number;
    width: number;
    height: number;
    popup: StickersPopup;
  }

  export interface StickersPopup {
    width: number;
    height: number;
    valign: string;
    scaleType: string;
    layer: string;
  }
}

declare const StickerJson: StickerJson.StickerObkect;
export = StickerJson;
