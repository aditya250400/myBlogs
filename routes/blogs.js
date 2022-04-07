const express = require("express");
const router = express.Router();

const BlogControllers = require("../controllers/blogs");

const checkAuthenticationMiddleware = require("../middlewares/checkAuthentication");
router.get('/1', (req, res) => {
  res.render('1');
});
router.get('/2', (req, res) => {
  res.render('2');
});
router.get('/3', (req, res) => {
  res.render('3');
});
router.get('/4', (req, res) => {
  res.render('4');
});

// Go to blog page
router.get("/", checkAuthenticationMiddleware, BlogControllers.getBlogPage);

// Create a blog post
router.post("/", checkAuthenticationMiddleware, BlogControllers.createBlogPost);

// Go to blog detail page
router.get(
  "/:blog_id",
  checkAuthenticationMiddleware,
  BlogControllers.getBlogDetailPage
);


// Create a comment
router.post(
  "/:blog_id/comment",
  checkAuthenticationMiddleware,
  BlogControllers.createComment
);

module.exports = router;