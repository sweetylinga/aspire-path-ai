import bcrypt from "bcryptjs";

const password = "AspirePathAI@2025";

bcrypt.hash(password, 10).then((hash) => {
  console.log("Generated Hash:");
  console.log(hash);
  process.exit();
});