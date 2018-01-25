# Melonian ![Travis CI build](https://travis-ci.org/TheRandomMelon/Melonian.svg?branch=master)
[Work-in-progress] A lightweight-ish Eris bot, made for every Discord guild.

# What state is Melonian in?
Melonian is in an **early development stage**. It has very few commands, and needs some bug-fixing, but it works.

# Can I self-host Melonian?
You sure can! Heck, I'll even write a tutorial soon.

# Can I help?
If you can contribute, don't hesitate to fork the repository and make a PR.

A couple of standards I expect, however:

- It follows the same coding style as mine
- All Promises used MUST have a ``.then`` and a ``.catch`` attached to them.

For example,

```js
msg.channel.send("Hi");
```
``send`` returns a Promise, so you have to do:

```js
msg.channel.send("Hi").then (
	function hi() {
		console.log("it done");
	}
).catch (
	(reason) => {
		console.log(`Oh oh, an error: ${reason}`);
	}
);
```
