**😿 Cats won't render at the moment as the free 3 months trial on imgix ran out 😿**

# 500 cats

Just a stupid server-rendered React/TypeScript app. Demo at https://500cats.kattcorp.co.uk.

- TypeScript app
- Next.js (server-rendered, code splitting etc)
- Upload Images to S3
- List all added cats paginated
- Cursor-based pagination
- Use imgix for rezing images
- Start with low quality image placeholder, then load perfect-fitting image based on viewport
- Jest added for testing, although not much written.


## How to use it?  

First, you need to create a `local-env.sh`, based on `example-local.env`.


```
npm install  # to install dependencies
npm run dev  # to compile TypeScript files and to run next.js  
```  

Output JS files are aside the related TypeScript ones. If you use VSCode, which I highly recommend, it should automatically ignore any `*.js` files.

