const _ = require("lodash");

const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogs) => {
    const sum = blogs.reduce((prevValue, currentValue) => prevValue + currentValue.likes, 0);
    return sum;
}

const favoriteBlog = (blogs) => {
    return blogs.reduce((prevblog, currblog) =>
    prevblog.likes >= currblog.likes ? prevblog : currblog
  );
}

const mostBlogs = (blogs) => {
    const authorArr = _.chain(blogs)
        .groupBy("author")
        .map((blogs, author) => { return { author:author, blogs: blogs.length } })
        .maxBy((object)=>object.blogs)
        .value()
    
    // const groupedAuthors = _.groupBy(blogs,"author")
    // const authorWithBlogs= _.map(groupedAuthors,(blogs,author)=>{ return { author:author, blogs: blogs.length } })   
    // const maxBlogs = _.maxBy(authorWithBlogs, "blogs")
    // return maxBlogs
    return authorArr
}

const mostLikes = (blogs) => {
    const groupedAuthors = _.groupBy(blogs, "author")
    const authorWithLikes=_.map(groupedAuthors,(blogs,author)=>{ return { author:author, likes: blogs.reduce((prev,curr)=> prev+curr.likes,0) } }) 
    const maxLikes = _.maxBy(authorWithLikes, "likes")
    console.log(authorWithLikes)
    return maxLikes;
}
   
module.exports = {
    dummy,totalLikes,favoriteBlog,mostBlogs,mostLikes
}