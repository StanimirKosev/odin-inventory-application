#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);

var async = require("async");
var Book = require("./models/book");
var Genre = require("./models/genre");

var mongoose = require("mongoose");
var mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

var genres = [];
var books = [];

function genreCreate(name, description, cb) {
  genreDetail = {
    name: name,
    description: description,
  };

  var genre = new Genre(genreDetail);
  genre.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Genre: " + genre);
    genres.push(genre);
    cb(null, genre);
  });
}

function bookCreate(
  title,
  summary,
  isbn,
  author,
  price,
  numInStock,
  genre,
  cb
) {
  bookdetail = {
    title: title,
    summary: summary,
    isbn: isbn,
    author: author,
    price: price,
    numInStock: numInStock,
  };
  if (genre != false) bookdetail.genre = genre;

  var book = new Book(bookdetail);
  book.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Book: " + book);
    books.push(book);
    cb(null, book);
  });
}

function createGenre(cb) {
  async.series(
    [
      function (callback) {
        genreCreate(
          "Economics",
          "Economics is a social science concerned with the factors that determine the production, distribution, and consumption of goods and services. The term economics comes from the Ancient Greek οἰκονομία from οἶκος (oikos, 'house') and νόμος (nomos, 'custom' or 'law'), hence 'rules of the house (hold for good management)'. 'Political economy' was the earlier name for the subject, but economists in the late 19th century suggested 'economics' as a shorter term for 'economic science' to establish itself as a separate discipline outside of political science and other social science",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "Self Help",
          "Self-help, or self-improvement, is a self-guided improvement—economically, intellectually, or emotionally—often with a substantial psychological basis. Many different self-help groupings exist and each has its own focus, techniques, associated beliefs, proponents and in some cases, leaders. 'Self-help culture, particularly Twelve-Step culture, has provided some of our most robust new language: recovery, dysfunctional families, and codependency.'",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "Literature",
          "Literature is the art of written works. The two most basic written literary categories include fiction and non-fiction, although 'literature' in popular use can also mean a sub-genre of fiction called literary fiction.",
          callback
        );
      },
      function (callback) {
        genreCreate(
          "Nonfiction",
          "Nonfiction is an account or representation of a subject which is presented as fact. This presentation may be accurate or not; that is, it can give either a true or a false account of the subject in question. However, it is generally assumed that the authors of such accounts believe them to be truthful at the time of their composition. Note that reporting the beliefs of others in a nonfiction format is not necessarily an endorsement of the ultimate veracity of those beliefs, it is simply saying that it is true that people believe that (for such topics as mythology, religion). Nonfiction can also be written about fiction, giving information about these other works.",
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

function createBooks(cb) {
  async.parallel(
    [
      function (callback) {
        bookCreate(
          "The Almanack of Naval Ravikant: A Guide to Wealth and Happiness",
          "Getting rich is not just about luck; happiness is not just a trait we are born with. These aspirations may seem out of reach, but building wealth and being happy are skills we can learn.",
          "9781544514208",
          "Eric Jorgenson",
          "$28.13",
          12,
          [genres[1]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "The Bitcoin Standard: The Decentralized Alternative to Central Banking",
          "Bitcoin is the newest technology for money—find out how it fits in the future.",
          "9781119473862",
          "Saifedean Ammous",
          "$13.89",
          27,
          [genres[0]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "12 Rules for Life: An Antidote to Chaos",
          "What does everyone in the modern world need to know? Renowned psychologist Jordan B. Peterson's answer to this most difficult of questions uniquely combines the hard-won truths of ancient tradition with the stunning revelations of cutting-edge scientific research.",
          "9780345816023",
          "Jordan B. Peterson",
          "$14.99",
          99,
          [genres[1]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Beyond Order: 12 More Rules For Life",
          "The sequel to 12 Rules for Life offers further guidance on the periolus path of modern life.",
          "9780593084649",
          "Jordan B. Peterson",
          "$19.29",
          24,
          [genres[1]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "The Changing World Order: Why Nations Succeed and Fail",
          "From the #1 New York Times bestselling author of Principles and legendary investor Ray Dalio, who has spent half a century studying global markets, The Changing World Order examines history’s most turbulent economic and political periods to reveal why the times ahead will likely be radically different from those we’ve experienced in our lifetimes.",
          "9781982160272",
          "Ray Dalio",
          "$21.00",
          30,
          [genres[0]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "The Psychology of Money",
          "Doing well with money isn’t necessarily about what you know. It’s about how you behave. And behavior is hard to teach, even to really smart people.",
          "9781544514208",
          "Morgan Housel",
          "$20.10",
          45,
          [genres[0]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Extreme Ownership: How U.S. Navy SEALs Lead and Win",
          "Sent to the most violent battlefield in Iraq, Jocko Willink and Leif Babin’s SEAL task unit faced a seemingly impossible mission: help U.S. forces secure Ramadi, a city deemed “all but lost.” In gripping firsthand accounts of heroism, tragic loss, and hard-won victories in SEAL Team Three’s Task Unit Bruiser, they learned that leadership—at every level—is the most important factor in whether a team succeeds or fails.",
          "9781544514208",
          "Jocko Willink ",
          "$14.49",
          51,
          [genres[1]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Deep Work: Rules for Focused Success in a Distracted World",
          "One of the most valuable skills in our economy is becoming increasingly rare. If you master this skill, you'll achieve extraordinary results.",
          "9781455586691",
          "Cal Newport",
          "$14.99",
          19,
          [genres[3]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Why We Sleep: Unlocking the Power of Sleep and Dreams",
          "Neuroscientist and sleep expert Matthew Walker provides a revolutionary exploration of sleep, examining how it affects every aspect of our physical and mental well-being. ",
          "9781534514158",
          "Matthew Walker",
          "$17.79",
          85,
          [genres[3]],
          callback
        );
      },
      function (callback) {
        bookCreate(
          "Crime and Punishment",
          "Raskolnikov, a destitute and desperate former student, wanders through the slums of St Petersburg and commits a random murder without remorse or regret.",
          "9780143058144",
          "Fyodor Dostoevsky",
          "$10.79",
          12,
          [genres[2]],
          callback
        );
      },
    ],
    // optional callback
    cb
  );
}

async.series(
  [createGenre, createBooks],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("Books: " + books);
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
