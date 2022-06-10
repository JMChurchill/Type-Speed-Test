class Sentence {
  constructor() {
    this.verbs = [];
    this.nouns = [];
    this.adjectives = [];
    this.adverbs = [];
    this.prepositions = [];

    this.original;
    this.originalInsensitive;
  }

  // get data from schemas
  getData = async () => {
    this.adjectives = await fetch("../schemas/adjectives.json").then(
      (results) => results.json()
    );
    this.adverbs = await fetch("../schemas/adverbs.json").then((results) =>
      results.json()
    );
    this.nouns = await fetch("../schemas/nouns.json").then((results) =>
      results.json()
    );
    this.prepositions = await fetch("../schemas/prepositions.json").then(
      (results) => results.json()
    );
    this.verbs = await fetch("../schemas/verbs.json").then((results) =>
      results.json()
    );
  };

  // generate sentence
  generate = async (letter = "") => {
    // get data if arrays are empty
    if (
      this.adjectives.length == 0 ||
      this.adverbs.length == 0 ||
      this.nouns.length == 0 ||
      this.prepositions.length == 0 ||
      this.verbs.length == 0
    ) {
      await this.getData();
    }
    // generate sentence containing the specified letter
    if (letter != null && letter != "") {
      //filter to contain letter
      this.adjectives = this.adjectives.filter((x) => x.includes(letter));
      this.adverbs = this.adverbs.filter((x) => x.includes(letter));
      this.nouns = this.nouns.filter((x) => x.includes(letter));
      this.prepositions = this.prepositions.filter((x) => x.includes(letter));
      this.verbs = this.verbs.filter((x) => x.includes(letter));

      //order by occurance of selected letter
      this.adjectives = this.adjectives.sort(function (a, b) {
        return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
      });
      this.adverbs = this.adverbs.sort(function (a, b) {
        return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
      });
      this.nouns = this.nouns.sort(function (a, b) {
        return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
      });
      this.prepositions = this.prepositions.sort(function (a, b) {
        return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
      });
      this.verbs = this.verbs.sort(function (a, b) {
        return (b.match(/a/g) || []).length - (a.match(/a/g) || []).length;
      });
    }

    // get random number based on array size
    const randFrom = (arr) => {
      // if letter specified random number should be closer to 1 as specified letter occurs more in words at start of array
      if (letter != null && letter != "") {
        var result = Math.random();
        result =
          result * result * result * result * result * result * result * result;
        result *= arr.length - 1;
        return (result = Math.floor(result));
      } else {
        return Math.floor(Math.random() * arr.length - 1);
      }
    };

    let adj3 = randFrom(this.adjectives);
    let adj1 = randFrom(this.adjectives);
    let adj5 = randFrom(this.adjectives);
    let adv1 = randFrom(this.adverbs);
    let adv2 = randFrom(this.adverbs);
    let nou1 = randFrom(this.nouns);
    let nou2 = randFrom(this.nouns);
    let nou3 = randFrom(this.nouns);
    let nou4 = randFrom(this.nouns);
    let pre1 = randFrom(this.prepositions);
    let ver1 = randFrom(this.verbs);
    let ver2 = randFrom(this.verbs);

    // create sentence
    let content =
      "The " +
      this.adjectives[adj1] +
      " " +
      this.nouns[nou1] +
      " " +
      this.adverbs[adv1] +
      " " +
      this.verbs[ver1] +
      " because some " +
      this.nouns[nou2] +
      " " +
      this.adverbs[adv2] +
      " " +
      this.verbs[ver2] +
      " " +
      this.prepositions[pre1] +
      " a " +
      this.adjectives[adj3] +
      " " +
      this.nouns[nou3] +
      " which, became a " +
      this.adjectives[adj5] +
      " " +
      this.nouns[nou4] +
      ".";
    this.original = document.getElementById("toType").innerText = content;
    this.originalInsensitive = document
      .getElementById("toType")
      .innerText.toLowerCase();
  };
}

const sent = new Sentence();
