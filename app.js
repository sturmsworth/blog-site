const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const _ = require('lodash')
const ejs = require(`ejs`)

const homeStartingContent = "Almost everything is going to happen for you automatically - you don't have to spend any time working or worrying. Very easy to work these to death. All you have to learn here is how to have fun. Let's make some happy little clouds in our world. You can spend all day playing with mountains. This is the time to get out all your flustrations, much better than kicking the dog around the house or taking it out on your spouse."
const aboutContent = "These little son of a guns hide in your brush and you just have to push them out. When you do it your way you can go anywhere you choose. You got your heavy coat out yet? It's getting colder. This is gonna be a happy little seascape. No pressure. Just relax and watch it happen. If there's two big trees invariably sooner or later there's gonna be a little tree."
const contactContent = "In nature, dead trees are just as normal as live trees. At home you have unlimited time. So often we avoid running water, and running water is a lot of fun. We'll put a happy little sky in here. All you need to paint is a few tools, a little instruction, and a vision in your mind. Trees get lonely too, so we'll give him a little friend."
const posts = []


app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(`public`))
app.set(`view engine`, `ejs`)

app.get('/', (req, res) => {
    res.render('home', { homeStartingContent, posts })
})

app.get('/about', (req, res) => {
    res.render('about', { aboutContent })
})

app.get('/contact', (req, res) => {
    res.render('contact', { contactContent })
})

app.get('/compose', (req, res) => {
    res.render('compose')
})

app.get(`/posts/:postTitle`, (req, res) => {
    const requestedTitle = _.lowerCase(req.params.postTitle)
    posts.forEach((post) => {
        const postTitle = post.postTitle
        const postBody = post.postBody
        const storedTitle = _.lowerCase(post.postTitle.toLowerCase())
        if (requestedTitle === storedTitle) {
            res.render(`post`, { postTitle, postBody })
        }
    })
})

app.post('/compose', (req, res) => {
    const postTitle = req.body.postTitle
    const postBody = req.body.postBody
    const post = {
        postTitle,
        postBody
    }

    const addPost = (array) => {
        array.push(post)
    }

    addPost(posts)
    res.redirect('/')
})

app.listen(3000, () => {
    console.log(`we're live`)
})