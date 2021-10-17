const router=require("./routes")
const app=require('./config/server');

app.use('/',router)

app.listen(app.get("port"), () => {
  console.log(`Example app listening at http://localhost:${app.get("port")}`);
});