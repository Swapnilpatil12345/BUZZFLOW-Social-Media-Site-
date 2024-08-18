// require useful packages
const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require("uuid");
const methodOverride = require('method-override');


//setting paths for folders
app.set("view engine", "ejs");
// app.use(express.urlencoded({ extended: true }));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));



//store posts in an array for simplicity
let posts = [
  {
    username: "Virat Kohli",
    userId: uuidv4(),
    content: "Feeling incredibly grateful and motivated as we continue to push our limits on and off the field. The journey is challenging, but the support from all of you makes every moment worthwhile. Let's keep striving for excellence, embracing the hard work, and never losing sight of our goals. Remember, it’s not just about winning but also about giving your best every single day. Thank you for your constant encouragement and love. Stay positive and keep chasing your dreams! 💪🏏 #TeamIndia #Grateful #NeverGiveUp",
    likes: 10000,
  },
  {
    username: "Rohit Sharma",
    userId: uuidv4(),
    content: "Feeling incredibly grateful and motivated after our recent match! 🌟 The team’s hard work and dedication are truly paying off, and I’m proud of how we’re coming together on and off the field. Each game brings new challenges, but our spirit and teamwork keep us moving forward. A huge thank you to our fans for your unwavering support—it makes all the difference. Let’s keep pushing our limits and aim for greater heights! Onwards and upwards! 🏏💪 #Cricket #Teamwork #Gratitude",
    likes: 5000,
  },
  {
    username: "Ankit Awasti",
    userId: uuidv4(),
    content:
      "As we witness the unfolding situation in Bangladesh, it’s crucial to stay informed and understand the broader implications of recent events. The country is navigating complex challenges, from political dynamics to economic pressures and environmental concerns. Staying updated and empathetic towards the people affected is essential. Let’s delve into the details and analyze how these developments might shape the future of Bangladesh and the region. Join me as we break down the latest updates and discuss their potential impact. Stay tuned for a comprehensive analysis on my channel. 🌍📰 #Bangladesh #GlobalEvents #CurrentAffairs",
    likes: 2000,
  },
  {
    username: "Narendra Modi",
    userId: uuidv4(),
    content: "Today, I am filled with immense pride and optimism as we continue our journey toward a more prosperous and inclusive India. Together, we have made significant strides in areas like economic development, infrastructure, and social welfare. Our commitment to building a better nation is unwavering, and with the support of every citizen, we will overcome challenges and achieve our goals. Let us stay united in our efforts and continue working towards a brighter future for all. Your hard work and dedication are the cornerstone of our success. Thank you for your continued support and trust. 🇮🇳 #NewIndia #Progress #Unity",
    likes: 15000,
  },
];

//start the server on port 8080
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

//define routes
app.get("/posts", (req, res) => {
  res.render("index.ejs", { posts });
});
app.get("/posts/new", (req, res) => {
  res.render("new.ejs");
});
app.get("/posts/:id/edit",(req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.userId === id);
    console.log(post);
    res.render("edit.ejs",{post});
})
app.patch("/posts/:id",(req,res)=>{
  let  id  = req.params.id;
  console.log("id  =",id);
  let newContent= req.body.content;
  console.log(newContent);

  let post = posts.find((p)=>p.userId === id);
  post.content =newContent;
  console.log(post);
  res.redirect("/posts");
})
app.delete("/posts/:id",(req,res)=>{
  let id = req.params.id;
  posts= posts.filter((p)=>p.userId != id);
  res.redirect("/posts");
})
app.get("/posts/:id", (req, res) => {
  let { id } = req.params;
  console.log(`post id : ${id}`);

  // find post with id requested by user in posts array
  let found = posts.find((element) => element.userId === id);

  // if post found, render post.ejs with post data
  res.render("post.ejs", { post: found });
});
app.post("/posts/new", (req, res) => {
  let { username, content } = req.body;
  let likes = 0;
  let userId = uuidv4();
  posts.push({ username, userId, content, likes });
  res.redirect("/posts");
});

// action on post after clicking