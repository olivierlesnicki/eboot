// Specify the command
export const command = {
  name: "gm",
  type: 1,
  description: "GM!",
};

export default async function commandHandler(interaction) {
  return {
    type: 4,
    data: {
      content: "GM!",
    },
  };
}
