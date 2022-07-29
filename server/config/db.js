process.env.PORT = process.env.PORT || 5000;
process.env.NODE_ENV = process.env.NODE_ENV || "dev";

if (process.env.NODE_ENV === "dev") {
  process.env.URLDB =
    "mongodb+srv://Navi026:L4LL4v3M43str4@cluster0.v5gql.mongodb.net/SocialNetwork?retryWrites=true&w=majority";
} else {
  process.env.URLDB =
    "mongodb+srv://Navi026:L4LL4v3M43str4@cluster0.v5gql.mongodb.net/SocialNetwork?retryWrites=true&w=majority";
}

process.middlewares = [];
