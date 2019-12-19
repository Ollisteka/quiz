const express = require('express');
const path = require('path');
const hbs = require("express-handlebars");

const app = express();
const port = 8888;

const rootDir = process.cwd();

app.set('view engine', 'html');

exports.index = function(req, res){
    res.render('index');
};

// Выбираем в качестве движка шаблонов Handlebars
app.set("view engine", "hbs");
// Настраиваем пути и дефолтный view
app.engine(
    "hbs",
    hbs({
        extname: "hbs",
        defaultView: "default",
        layoutsDir: path.join(rootDir, "/views/layouts/")
    })
);


app.use('/static', express.static('static'));

app.get('/', (req, res) => res.sendFile(path.join(rootDir, '/static/index.html')));



const questions = [
    {
        question: "Какой тигр самый крупный?",
        answers: ['Амурский', 'Малазийский', 'Индийский', 'Суматранский'],
        correctAnswer: 0,
        url: 'https://images.wallpaperscraft.ru/image/tigr_tigrenok_lezhat_para_zabota_56378_2560x1600.jpg',
        alt: 'Тигр'
    },
    {
        question: "Где живёт коала?",
        answers: ['В горной пещере', 'В бамбуковом лесу', 'В тропических лесах Новой Зеландии', 'На эвкалиптовом дереве'],
        correctAnswer: 3,
        url: 'https://www.1zoom.ru/big2/450/305570-blackangel.jpg',
        alt: 'Коала'
    },
    {
        question: "Какого цвета хвост у зебры?",
        answers: ['Белый', 'Чёрный', 'Коричневый', 'Серый'],
        correctAnswer: 1,
        url: 'https://www.1zoom.me/big2/11/136861-melisenta.jpg',
        alt: 'Зебра'
    },
    {
        question: "Какое животное самое быстрое?",
        answers: ['Лев', 'Зебра', 'Гепард', 'Сапсан'],
        correctAnswer: 2,
        url: 'https://avatars.mds.yandex.net/get-pdb/163339/5381ea36-1eea-441d-b069-12826bf6ead6/s1200',
        alt: 'Самое быстрое животное'
    }
];

app.get("/card", (req, res) => {
    res.render("card", {
        layout: "index",
        questions
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
