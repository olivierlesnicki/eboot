import getRawBody from "raw-body";
import nacl from "tweetnacl";

const DISCORD_APPLICATION_PUBLIC_KEY =
  process.env.DISCORD_APPLICATION_PUBLIC_KEY;

export default async function handler(req, res) {
  const signature = req.headers["x-signature-ed25519"];
  const timestamp = req.headers["x-signature-timestamp"];
  const body = (await getRawBody(req)).toString();

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + body.toString()),
    Buffer.from(signature, "hex"),
    Buffer.from(DISCORD_APPLICATION_PUBLIC_KEY, "hex")
  );

  if (!isVerified) {
    return res.status(401).send("Invalid request signature");
  }

  const interaction = JSON.parse(body);

  // Respond to PING
  if (interaction.type === 1) {
    return res.status(200).json({
      type: 1,
    });
  }

  const command = await import(`../commands/${interaction.data.name}.js`);
  let response = await command.default(interaction);

  return res.status(200).json(response);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
