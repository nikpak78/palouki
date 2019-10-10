

const path = require('path');
const { paginate } = require('gatsby-awesome-pagination');


exports.createPages = async ({ actions, graphql }) => {
 const { createPage } = actions;
 
 const articles = await graphql(`
   {
     allNodeArticle {
       nodes {
         id
         title
         path {
           alias
         }
       }
     }
   }
 `);


 paginate({
  createPage,
  items: articles.data.allNodeArticle.nodes,
  itemsPerPage: 5,
  pathPrefix: '/blog',
  component: path.resolve(`src/templates/blog.js`),
});
 
 articles.data.allNodeArticle.nodes.map(articleData =>
   createPage({
     path: articleData.path.alias,
     component: path.resolve(`src/templates/article.js`),
     context: {
       ArticleId: articleData.id,
     },
   })
 );
}

