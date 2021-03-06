const express = require('express');
const app = express();
const static = express.static(__dirname + '/public');  // serve static assets. All of our static assets, like css file, any client side javascript and any images website use will be stored in serve of public directory

const configRoutes = require('./routes');  // configure routes
const exphbs = require('express-handlebars');  //create instance of express-handlebars


const handlebarsInstance = exphbs.create({
  defaultLayout: 'main',  // 'main' is main template, like a master page, which is rapper contain every page
  // Specify helpers which are only registered on this instance.
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === 'number')
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));

      return new Handlebars.SafeString(JSON.stringify(obj));
    }
  }
});

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use;
app.use('/public', static);  // tell app to use the /public directory as static. Without this, /public/css/main.css will not have effect
app.use(express.json());  //❤ allow us to read the request body. Without this line, if you try to read request body, it will be undefined
app.use(express.urlencoded({ extended: true }));  // get form data
app.use(rewriteUnsupportedBrowserMethods);

app.engine('handlebars', handlebarsInstance.engine);;  // set up the engine by instance of handlebars. 'main' in { defaultLayout: 'main' } is main template, like a master page, which is rapper contain every page
app.set('view engine', 'handlebars');  // set 'view engine' to be 'handlebars'

configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});