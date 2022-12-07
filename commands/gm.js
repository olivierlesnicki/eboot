// Specify the command
export const command = {
  name: "gm",
  type: 1,
  description: "GM!",
};

export default function commandHandler(interaction) {
  return {
    type: 4,
    content: "GM!",
  };
}
