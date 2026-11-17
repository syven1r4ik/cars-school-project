const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const { create } = require("express-handlebars");
const Datastore = require("@seald-io/nedb");

app.use(
	express.urlencoded({
		extended: true,
	}),
);

let models = ["CLA", "GLE", "S-Class", "G63", "Maybach"];

const coll = new Datastore({
	filename: "database/database.db",
	autoload: true,
});

const hbs = create({
	defaultLayout: "main.hbs",
	extname: ".hbs",
	helpers: {
		equals: (a, b) => a === b,
	},
});

app.get("/", (req, res) => {
	res.render("index.hbs");
});

app.get("/addCars", (req, res) => {
	res.render("add.hbs");
});

app.post("/add", (req, res) => {
	const { ub, benz, usz, naped } = req.body;
	let car = {
		model: models[Math.floor(Math.random() * models.length)],
		ubezpieczony: ub ? "TAK" : "NIE",
		benzyna: benz ? "TAK" : "NIE",
		uszkodzony: usz ? "TAK" : "NIE",
		naped: naped ? "TAK" : "NIE",
	};
	coll.insert(car, function (err, newDoc) {
		console.log(
			"dodano dokument (obiekt): ",
			newDoc,
			", unikalne id dokumentu: ",
			newDoc._id,
		);
		let context = { model: car.model, id: newDoc._id };
		res.render("add.hbs", context);
	});
});

app.get("/listCars", (req, res) => {
	coll.find({}, function (err, docs) {
		let context = { cars: docs };
		res.render("list.hbs", context);
	});
});

app.get("/deleteCars", (req, res) => {
	coll.find({}, function (err, docs) {
		let context = { cars: docs };
		res.render("delete.hbs", context);
	});
});

app.post("/deleteAll", (req, res) => {
	coll.remove({}, { multi: true }, function (err, numRemoved) {
		res.redirect("/deleteCars");
	});
});

app.post("/delete", (req, res) => {
	coll.remove({ _id: req.body.id }, function (err, numRemoved) {
		res.redirect("/deleteCars");
	});
});

app.post("/deleteSelected", (req, res) => {
	let selectedCars = [].concat(req.body.delete ? req.body.delete : []);
	if (selectedCars.length != 0) {
		selectedCars.forEach((id) => {
			coll.remove({ _id: id }, function (err, numRemoved) {
				console.log("usunięto: ", numRemoved);
			});
		});
		res.redirect("/deleteCars");
	}
});

app.get("/editCars", (req, res) => {
	coll.find({}, function (err, docs) {
		let context = { cars: docs };
		res.render("edit.hbs", context);
	});
});

app.get("/edit", (req, res) => {
	coll.find({}, function (err, docs) {
		let newCars = docs.map((car) => {
			return {
				...car,
				editing: car._id === req.query.id,
			};
		});
		let context = { cars: newCars };
		res.render("edit.hbs", context);
	});
});

app.post("/update", (req, res) => {
	coll.update(
		{ _id: req.body.id },
		{
			$set: {
				model: req.body.model,
				ubezpieczony: req.body.ub,
				benzyna: req.body.benz,
				uszkodzony: req.body.usz,
				naped: req.body.naped,
			},
		},
		function (err, numUpdated) {
			res.redirect("/editCars");
		},
	);
});

app.use(express.static("static"));

app.engine(".hbs", hbs.engine);
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "views"));

app.listen(PORT, () => {
	console.log("server started at " + PORT);
});
