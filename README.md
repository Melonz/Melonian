# Melonian ![Travis CI build](https://travis-ci.org/Melonz/Melonian.svg?branch=master)
[Work-in-progress] A lightweight-ish Eris bot, made for every Discord guild.

# What state is Melonian in?
Melonian is in an **early development stage**. It has very few commands, and needs some bug-fixing, but it works.

# Can I self-host Melonian?
You sure can! Here's a simple guide on how:

- Clone the repository, whether that'd be with GitHub Desktop, GitKraken, Git or any other things like that. Just make it Git based.
- Copy + paste `example-config.js` and rename it to `config.js`.
- Edit config.js for your needs.
- Make sure you have Node.js 6+, then run `npm install` in the Melonian folder.
- Run the bot with `node bot.js`.

If you have any questions, don't be afraid to ask!

# Can I help?
If you can contribute, don't hesitate to fork the repository and make a PR.

A couple of standards I expect, however:

- It follows the same coding style as mine
- All Promises used MUST have a ``.then`` and a ``.catch`` attached to them.

For example,

```js
msg.channel.createMessage("Hi");
```
``createMessage`` returns a Promise, so you have to do:

```js
msg.channel.createMessage("Hi").then (
	function hi() {
		console.log("it done");
	}
).catch (
	(reason) => {
		console.log(reason);
	}
);
```