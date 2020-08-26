export interface apng2gif {
  (inputPath: string, outputPath?: string, options?: string | number): Promise<
    undefined
  >;
  (
    inputPath: string,
    outputPath?: string,
    options?: string | number
  ): undefined;
  sync(
    inputPath: string,
    outputPath?: string,
    options?: string | number
  ): undefined;
}
