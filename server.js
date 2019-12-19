const express = require('express');
const path = require('path');

const app = express();
const port = 8888;

const rootDir = process.cwd();

app.set('view engine', 'html');

exports.index = function(req, res){
    res.render('index');
};

app.use('/static', express.static('static'));

app.get('/', (req, res) => res.sendFile(path.join(rootDir, '/static/index.html')));



const questions = [
    {
        question: "Какой тигр самый крупный?",
        answers: ['Амурский', 'Малазийский', 'Индийский', 'Суматранский'],
        correctAnswer: 0
    },
    {
        question: "Где живёт коала?",
        answers: ['В горной пещере', 'В бамбуковом лесу', 'В тропических лесах Новой Зеландии', 'На эвкалиптовом дереве'],
        correctAnswer: 3
    },
    {
        question: "Какого цвета хвост у зебры?",
        answers: ['Белый', 'Чёрный', 'Коричневый', 'Серый'],
        correctAnswer: 1
    },
    {
        question: "Какое животное самое быстрое?",
        answers: ['Лев', 'Зебра', 'Гепард', 'Сапсан'],
        correctAnswer: 2
    }
];

app.get("/test", (req, res) => {
    res.render('test', res.render('index'));
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
