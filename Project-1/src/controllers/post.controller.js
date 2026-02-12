import ImageKit, { toFile } from "@imagekit/nodejs";

export async function createPostController(req, res) {
  const client = new ImageKit({
    privateKey: process.env["IMAGEKIT_PRIVATE_KEY"],
  });

  console.log(req.body, req.file);

  const file = await client.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
  });

  res.send(file);
}
