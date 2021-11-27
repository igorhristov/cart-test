import { client, Query, Field } from "@tilework/opus";

const getCategoryProducts = async (category) => {
  client.setEndpoint("http://localhost:4000/graphql");

  const queryCategory = new Query("category", true)
    .addArgument("input", "CategoryInput", { title: category })
    .addField(
      new Field("products", true).addFieldList([
        "id",
        "name",
        "inStock",
        "gallery",
        "attributes {id, items {value, id}}",
        "prices{amount}",
      ])
    );

  return await client.post(queryCategory);
};

export default getCategoryProducts;
