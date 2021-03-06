const express = require('express');
const path = require('path');
const hbs = require("express-handlebars");

const app = express();
const port = 8888;

const rootDir = process.cwd();

const leaderboard = {};

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

app.get('/leaderboard', (req, res) => {
    let sortedLeaderboard = [];
    for (const user in leaderboard) {
        sortedLeaderboard.push({username: user, score: leaderboard[user]})
    }
    sortedLeaderboard = sortedLeaderboard.sort((a, b) => b.score - a.score);
    res.render("leaderboard", {
        layout: "index",
        leaderboard: sortedLeaderboard
    });
});

// todo разбить на POST
app.get("/quiz", (req, res) => {
    const args = Array.from(Object.keys(req.query));

    if (args.filter(x => x.match(/question-\d/)).length === 0) {
        res.render("card", {
            layout: "index",
            questions
        });
        return;
    }

    const query = req.query;
    let correctAnswers = 0;
    for (let i = 0; i < questions.length; i++) {
        const userAnswer = query[`question-${i}`];
        if (parseInt(userAnswer) === questions[i].correctAnswer) {
            correctAnswers++;
        }
    }

    if (query.username && (!leaderboard[query.username] || correctAnswers > leaderboard[query.username])) {
        leaderboard[query.username] = correctAnswers;
    }

    res.render("result", {
        layout: "index",
        correctAnswers
    });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
