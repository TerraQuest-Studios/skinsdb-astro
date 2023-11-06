export async function GET({ params, request }) {
    console.log(params); //....nothing here for some reason
    //console.log(request);
  
    if (true) {
      return new Response(JSON.stringify({}), {
        status: 404,
      });
    }
  
    return new Response(
      JSON.stringify(product), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }