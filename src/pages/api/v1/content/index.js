import {db} from "../../../../lib/db";

export async function GET({ params, request }) {
  console.log("hiii");
  let urlParams = new URLSearchParams((new URL(request.url)).search); //....nothing here for some reason
  console.log(urlParams);

  let perPage = urlParams.get("per_page") || 20;
  perPage = parseInt(perPage) || 20;
  perPage = Math.min(1000, perPage);
  console.log(perPage);

  let page = urlParams.get("page") || 1;
  page = parseInt(page) || 1;
  page = Math.min(1000, page);
  console.log(page);

  let skins = await db.query(
    `SELECT cs.*, uf.display_name as author, cl.name as license FROM content_skins cs JOIN user_fields uf ON uf.id=cs.author JOIN content_licenses cl ON cs.license=cl.id LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
  );
  let skinsCount = await db.query(`SELECT COUNT(*) as count FROM content_skins`);

  let response;

  if(skins.length > 0) {
    response = {
      "success":true,
      "message":"who knows",
      "page":page,
      "pages": Math.ceil(skinsCount[0].count / perPage),
      "per_page":perPage,
      "skins": skins,
    };
  } else {
    response = {
      "success":false,
      "message":"no skins found",
      "page":page,
      "pages":0,
      "per_page":perPage,
      "skins": skins,
    }
  }

  if (false) {
    return new Response(JSON.stringify({}), {
      status: 404,
    });
  }

  return new Response(
    JSON.stringify(response), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    }
  );
}