import path from "path";
import glob from "glob";

const targetDir = path.join(process.cwd(), "public");

const minifyImages = async (deleteOriginal = true) => {
  const imagemin = (await import("imagemin")).default;
  const imageminWebp = (await import("imagemin-webp")).default;
  const fs = (await import("fs")).default;
  //
  // OG画像などを含めないように注意する
  const files = glob.sync(`${targetDir}/**/{lg,sm}/*.{jpg,png}`);
  let totalOriginalKb = 0;
  let totalResultKb = 0;
  //
  for await (const origin of files) {
    const destination = `${path.dirname(origin)}`;
    const quality = path.extname(origin) === "png" ? 80 : 70;
    const file = await fs.readFileSync(origin);
    const originalSize = Math.round((file.buffer.byteLength / 1024) * 10) / 10;

    const result = await imagemin([origin], {
      destination,
      plugins: [imageminWebp({ quality: quality })],
    });
    const resultSize = Math.round((result[0].data.buffer.byteLength / 1024) * 10) / 10;
    console.log(`${path.basename(origin)} [${originalSize}kb -> ${resultSize}kb]`);
    totalOriginalKb += originalSize;
    totalResultKb += resultSize;
    if (deleteOriginal) {
      fs.rmSync(origin);
    }
  }
  const totalOriginalMg = Math.round((totalOriginalKb / 1024) * 10) / 10;
  const totalResultMg = Math.round((totalResultKb / 1024) * 10) / 10;
  const resultRatio = Math.round((totalResultKb / totalOriginalKb) * 100 * 10) / 10;
  console.log(`total: ${totalOriginalMg}mb -> ${totalResultMg}mb (${resultRatio}%)`);
};

const rewriteCSS = async () => {
  const fs = (await import("fs")).default;
  //
  // 置き換えに対象のhtml/cssファイルを指定する
  const files = glob.sync(`${targetDir}**/*.css`);
  for await (const origin of files) {
    const data = await fs.readFileSync(origin, { encoding: "utf8" });
    const result = data.replace(/png/g, "webp").replace(/jpg/g, "webp");
    await fs.writeFileSync(origin, result, { encoding: "utf8" });
  }
};

(async () => {
  await minifyImages();
  await rewriteCSS();
})();
