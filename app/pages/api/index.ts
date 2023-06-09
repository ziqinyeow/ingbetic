import { NextApiRequest, NextApiResponse } from "next";
import { load } from "cheerio";

// https://www.marthastewart.com/1555257/pansy-pancakes
// https://www.marthastewart.com/345491/cranberry-apple-chutney
// https://www.recipelion.com/Italian-Recipes/Italian-Style-Ground-Beef-Skillet
// https://www.yummly.com/recipe/Parmesan-sage-roasted-turkey-breast-with-sage-gravy-297083 - Yummly not supported because cheerio is not crawler, use puppeteer
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.body;
  const response = await fetch(url);
  const body = await response.text();

  let $ = load(body);
  const ing = $("h1, h2, h3, h4, h5, h6, p, span").filter((_, el) => {
    const text = $(el).text().trim().toLowerCase();
    return text === "ingredients" || text === "ingredient";
  });

  const ul = $(ing).next();
  const list: any[] = [];
  $(ul)
    .children()
    .map((_, li: any) => {
      list.push(
        $(li)
          .text()
          .replace(/(\r\t\n|\n|\t|\r)/gm, "")
      );
    });

  if (list.length === 0) {
    const ul = $(ing).parent().nextUntil("div").children();
    $(ul)
      .children()
      .map((_, li: any) => {
        list.push(
          $(li)
            .text()
            .replace(/(\r\t\n|\n|\t|\r)/gm, "")
            .trim()
        );
      });
  }

  if (list.length === 0) {
    const ul = $(ing).parent().nextUntil("ul");
    $(ul)
      .children()
      .map((_, li: any) => {
        console.log($(li).text());
        list.push(
          $(li)
            .text()
            .replace(/(\r\t\n|\n|\t|\r)/gm, "")
            .trim()
        );
      });
  }

  //   if (list.length === 0) {
  //     const div = $(ing).parent().next();
  //     console.log($(ing).html());
  //     $(div)
  //       .children()
  //       .map((_, _div: any) => {
  //         console.log($(_div).find("li").children().remove().end().text());
  //       });
  //   }

  return res.status(200).json({ ok: true, list, text: list.join(", ") });
}
