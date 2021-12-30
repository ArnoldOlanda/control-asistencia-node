const router=require("./routes")
const app=require('./config/server');

app.use('/',router)

app.listen(app.get("port"), () => {
  console.log(`App listening at http://localhost:${app.get("port")}`);
});